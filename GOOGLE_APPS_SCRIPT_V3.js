// =============================================
// GOOGLE APPS SCRIPT - Hanabedding Order System
// Version 5.0 - With Facebook Conversions API
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

// ===== FACEBOOK CONVERSIONS API CONFIG =====
const FB_PIXEL_ID = '1538147883919686';
const FB_ACCESS_TOKEN = 'EAARpTsjUBtgBQloWDxzlkNQaQmKDa2yxTyfe0xe9FazNned1bXzIyfwOKTjWnBqgc1t1otZALgeLrhdEWYgiYNZCUPeFPe1rIyes8BGVF4sSYtP7GfEwkOoMeem7TVGMzbjXEleB5CfaS6RPkpf9TYwV63qG93ywAZCroha4cKgbZC87coYezjieyou6ZBQZDZD';
const FB_API_VERSION = 'v18.0';

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
    
    // Gửi event đến Facebook Conversions API
    try {
      sendFacebookConversionEvent(data);
      Logger.log('Facebook CAPI: Event sent successfully');
    } catch (fbError) {
      Logger.log('Facebook CAPI Error: ' + fbError.toString());
    }
    
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
      message: 'Hanabedding API v5.0 with Facebook CAPI is working!',
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

// ===== FACEBOOK CONVERSIONS API =====
function sendFacebookConversionEvent(data) {
  const url = `https://graph.facebook.com/${FB_API_VERSION}/${FB_PIXEL_ID}/events?access_token=${FB_ACCESS_TOKEN}`;
  
  // Hash phone number for privacy (SHA256)
  const phone = data.sdt || data.phone || '';
  const hashedPhone = hashSHA256(formatPhoneE164(phone));
  
  // Hash name for privacy
  const name = data.hoTen || data.name || '';
  const hashedName = hashSHA256(name.toLowerCase().trim());
  
  // Get product info
  const sanPham = data.sanPham || '';
  const tongTien = data.tongTien || data.donGia || 0;
  
  // Create event data
  const eventData = {
    data: [
      {
        event_name: 'Purchase',
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        event_source_url: 'https://hanabedding.vn',
        user_data: {
          ph: [hashedPhone],
          fn: [hashedName],
          country: [hashSHA256('vn')],
          client_user_agent: 'GoogleAppsScript/1.0'
        },
        custom_data: {
          currency: 'VND',
          value: tongTien,
          content_name: sanPham,
          content_category: 'Giường bọc da',
          content_type: 'product',
          contents: [
            {
              id: sanPham,
              quantity: 1,
              item_price: tongTien
            }
          ]
        }
      },
      {
        event_name: 'Lead',
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        event_source_url: 'https://hanabedding.vn',
        user_data: {
          ph: [hashedPhone],
          fn: [hashedName],
          country: [hashSHA256('vn')],
          client_user_agent: 'GoogleAppsScript/1.0'
        },
        custom_data: {
          currency: 'VND',
          value: tongTien,
          content_name: sanPham,
          content_category: 'Giường bọc da'
        }
      }
    ]
  };
  
  // Send to Facebook
  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(eventData),
    muteHttpExceptions: true
  };
  
  const response = UrlFetchApp.fetch(url, options);
  const responseCode = response.getResponseCode();
  const responseText = response.getContentText();
  
  Logger.log('Facebook CAPI Response Code: ' + responseCode);
  Logger.log('Facebook CAPI Response: ' + responseText);
  
  if (responseCode !== 200) {
    throw new Error('Facebook CAPI Error: ' + responseText);
  }
  
  return JSON.parse(responseText);
}

// Hash SHA256 for Facebook CAPI
function hashSHA256(input) {
  if (!input) return '';
  const rawHash = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, input);
  return rawHash.map(byte => ('0' + (byte & 0xFF).toString(16)).slice(-2)).join('');
}

// Format phone to E.164 (Vietnam)
function formatPhoneE164(phone) {
  if (!phone) return '';
  // Remove all non-digits
  let cleaned = phone.replace(/\D/g, '');
  // Convert 0xxx to 84xxx
  if (cleaned.startsWith('0')) {
    cleaned = '84' + cleaned.substring(1);
  }
  // Add + if not present
  if (!cleaned.startsWith('84')) {
    cleaned = '84' + cleaned;
  }
  return cleaned;
}

// Test Facebook CAPI
function testFacebookCAPI() {
  const testData = {
    hoTen: 'Test CAPI User',
    sdt: '0764265775',
    diaChi: '123 Test Address',
    sanPham: 'Giường Sọc Dọc',
    mauSac: 'Xám',
    kichThuoc: '1m6 x 2m',
    tongTien: 3699000
  };
  
  try {
    const result = sendFacebookConversionEvent(testData);
    Logger.log('✅ Facebook CAPI Test Success: ' + JSON.stringify(result));
    SpreadsheetApp.getUi().alert('✅ Facebook CAPI Test thành công!\n\nResponse: ' + JSON.stringify(result));
  } catch (error) {
    Logger.log('❌ Facebook CAPI Test Error: ' + error.toString());
    SpreadsheetApp.getUi().alert('❌ Facebook CAPI Test lỗi!\n\n' + error.toString());
  }
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