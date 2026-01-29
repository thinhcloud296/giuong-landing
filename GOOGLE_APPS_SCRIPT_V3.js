// =============================================
// GOOGLE APPS SCRIPT - Hanabedding Order System
// Version 3.0 - Theo pattern script cũ hoạt động được
// =============================================

// Cấu hình tên sheet
var SHEET_DONHANG = 'DonHang';

// Hàm xử lý POST request
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    if (data.type === 'order') {
      saveOrder(ss, data);
    } else {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        message: 'Invalid type'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Data saved successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log("Error: " + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Lưu đơn hàng
function saveOrder(ss, data) {
  var sheet = ss.getSheetByName(SHEET_DONHANG);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_DONHANG);
    sheet.appendRow(['Thời gian', 'Họ tên', 'SĐT', 'Địa chỉ', 'Sản phẩm', 'Màu sắc', 'Kích thước', 'Số lượng', 'Đơn giá', 'Tổng tiền', 'Ghi chú']);
  }
  
  // Format thông tin từ items
  var products = [];
  var colors = [];
  var sizes = [];
  var quantities = [];
  var unitPrices = [];
  
  if (data.items && data.items.length > 0) {
    data.items.forEach(function(item) {
      products.push(item.name || '');
      colors.push(item.color || '');
      sizes.push(item.size || '');
      quantities.push(item.quantity || 1);
      unitPrices.push(formatCurrency(item.unitPrice));
    });
  }
  
  sheet.appendRow([
    new Date().toLocaleString('vi-VN'),
    data.name || '',
    data.phone || '',
    data.address || '',
    products.join('\n'),
    colors.join('\n'),
    sizes.join('\n'),
    quantities.join('\n'),
    unitPrices.join('\n'),
    formatCurrency(data.total),
    data.note || ''
  ]);
}

// Format tiền VND
function formatCurrency(amount) {
  if (!amount) return '';
  return Math.round(amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ';
}

// Test function - kiểm tra API hoạt động
function doGet() {
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    message: 'Hanabedding API is working!'
  })).setMimeType(ContentService.MimeType.JSON);
}

// Test doPost với dữ liệu mẫu
function testDoPost() {
  var testData = {
    type: "order",
    name: "Nguyễn Văn A",
    phone: "0764265775",
    address: "123 Nguyễn Huệ, Q1, TP.HCM",
    items: [{
      name: "Giường Sọc Dọc",
      color: "Xám",
      size: "1m6 x 2m",
      quantity: 1,
      unitPrice: 3699000
    }],
    total: 3699000,
    note: "Giao buổi sáng"
  };
  
  var e = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  var result = doPost(e);
  Logger.log(result.getContent());
}
