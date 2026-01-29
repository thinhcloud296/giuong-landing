// =============================================
// GOOGLE APPS SCRIPT - Hanabedding Order System
// Version 4.0 - Simple & Working
// =============================================
// 
// HƯỚNG DẪN CÀI ĐẶT:
// 1. Mở Google Sheets mới tại: https://sheets.google.com
// 2. Extensions → Apps Script
// 3. Xóa code mặc định, copy toàn bộ code này vào
// 4. Lưu (Ctrl+S), đặt tên project: "Hanabedding Orders"
// 5. Chạy function setupSheet() một lần:
//    - Chọn function "setupSheet" từ dropdown
//    - Click Run (▶)
//    - Authorize khi được hỏi
// 6. Deploy → New deployment:
//    - Type: Web app
//    - Execute as: Me
//    - Who has access: Anyone
// 7. Click Deploy, copy URL và paste vào website
// =============================================

// Tên sheet
const SHEET_NAME = 'DonHang';

// ===== XỬ LÝ POST REQUEST =====
function doPost(e) {
  // Log để debug
  Logger.log('=== POST Request Received ===');
  
  try {
    // Parse dữ liệu
    const jsonString = e.postData.contents;
    Logger.log('Raw data: ' + jsonString);
    
    const data = JSON.parse(jsonString);
    Logger.log('Parsed data: ' + JSON.stringify(data));
    
    // Lưu vào sheet
    const result = saveOrder(data);
    Logger.log('Save result: ' + JSON.stringify(result));
    
    // Response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Đơn hàng đã được lưu!',
        row: result.row
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log('ERROR: ' + error.toString());
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ===== XỬ LÝ GET REQUEST (Test API) =====
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      success: true,
      message: 'Hanabedding API v4.0 is working!',
      time: new Date().toLocaleString('vi-VN')
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ===== LƯU ĐƠN HÀNG =====
function saveOrder(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  
  // Tạo sheet nếu chưa có
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow([
      'Thời gian', 'Họ tên', 'SĐT', 'Địa chỉ',
      'Sản phẩm', 'Màu sắc', 'Kích thước',
      'Số lượng', 'Đơn giá', 'Tổng tiền', 'Ghi chú'
    ]);
    sheet.getRange(1, 1, 1, 11).setFontWeight('bold').setBackground('#c9a66b');
  }
  
  // Lấy thông tin sản phẩm
  let sanPham = '', mauSac = '', kichThuoc = '', soLuong = 1, donGia = 0, tongTien = 0;
  
  // Format 1: Có items array
  if (data.items && data.items.length > 0) {
    const item = data.items[0];
    sanPham = item.name || '';
    mauSac = item.color || '';
    kichThuoc = item.size || '';
    soLuong = item.quantity || 1;
    donGia = item.unitPrice || 0;
    tongTien = data.total || donGia;
  } 
  // Format 2: Dữ liệu trực tiếp
  else {
    sanPham = data.sanPham || '';
    mauSac = data.mauSac || '';
    kichThuoc = data.kichThuoc || '';
    soLuong = data.soLuong || 1;
    donGia = data.donGia || 0;
    tongTien = data.tongTien || donGia;
  }
  
  // Format tiền
  const formatMoney = (num) => {
    if (!num) return '';
    return Number(num).toLocaleString('vi-VN') + 'đ';
  };
  
  // Thêm row
  const newRow = [
    new Date().toLocaleString('vi-VN'),
    data.hoTen || data.name || '',
    data.sdt || data.phone || '',
    data.diaChi || data.address || '',
    sanPham,
    mauSac,
    kichThuoc,
    soLuong,
    formatMoney(donGia),
    formatMoney(tongTien),
    data.ghiChu || data.note || ''
  ];
  
  sheet.appendRow(newRow);
  
  return { row: sheet.getLastRow(), data: newRow };
}

// ===== SETUP SHEET (Chạy 1 lần) =====
function setupSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Xóa sheet cũ nếu có
  let oldSheet = ss.getSheetByName(SHEET_NAME);
  if (oldSheet) {
    ss.deleteSheet(oldSheet);
    Logger.log('Đã xóa sheet cũ');
  }
  
  // Tạo sheet mới
  const sheet = ss.insertSheet(SHEET_NAME);
  
  // Header
  const headers = [
    'Thời gian', 'Họ tên', 'SĐT', 'Địa chỉ',
    'Sản phẩm', 'Màu sắc', 'Kích thước',
    'Số lượng', 'Đơn giá', 'Tổng tiền', 'Ghi chú'
  ];
  sheet.appendRow(headers);
  
  // Format header
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#c9a66b');
  headerRange.setFontColor('#1a1614');
  headerRange.setHorizontalAlignment('center');
  
  // Set column widths
  sheet.setColumnWidth(1, 160);  // Thời gian
  sheet.setColumnWidth(2, 150);  // Họ tên
  sheet.setColumnWidth(3, 120);  // SĐT
  sheet.setColumnWidth(4, 280);  // Địa chỉ
  sheet.setColumnWidth(5, 140);  // Sản phẩm
  sheet.setColumnWidth(6, 100);  // Màu sắc
  sheet.setColumnWidth(7, 100);  // Kích thước
  sheet.setColumnWidth(8, 80);   // Số lượng
  sheet.setColumnWidth(9, 120);  // Đơn giá
  sheet.setColumnWidth(10, 120); // Tổng tiền
  sheet.setColumnWidth(11, 200); // Ghi chú
  
  // Freeze header
  sheet.setFrozenRows(1);
  
  Logger.log('✅ Sheet đã được tạo thành công!');
  SpreadsheetApp.getUi().alert('✅ Sheet "DonHang" đã được tạo thành công!');
}

// ===== TEST FUNCTIONS =====
function testSaveOrder() {
  const testData = {
    hoTen: 'Test User - ' + new Date().toLocaleTimeString('vi-VN'),
    sdt: '0764265775',
    diaChi: '123 Nguyễn Huệ, Q1, TP.HCM',
    sanPham: 'Giường Sọc Dọc',
    mauSac: 'Xám',
    kichThuoc: '1m6 x 2m',
    soLuong: 1,
    donGia: 3699000,
    tongTien: 3699000,
    ghiChu: 'Test trực tiếp'
  };
  
  const result = saveOrder(testData);
  Logger.log('✅ Test result: ' + JSON.stringify(result));
}

function testDoPost() {
  const testData = {
    hoTen: 'Test doPost - ' + new Date().toLocaleTimeString('vi-VN'),
    sdt: '0987654321',
    diaChi: 'Test Address doPost',
    sanPham: 'Giường Vuông',
    mauSac: 'Xám Đậm',
    kichThuoc: '1m8 x 2m',
    soLuong: 1,
    donGia: 3999000,
    tongTien: 3999000,
    ghiChu: 'Test doPost function'
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log('✅ doPost result: ' + result.getContent());
}