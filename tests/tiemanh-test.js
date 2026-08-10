const assert = require('assert');

// Đánh dấu môi trường test để ngăn file JS chạy init() ngay lập tức
global.IS_TEST_ENVIRONMENT = true;

// Giả lập môi trường trình duyệt tối giản để tránh lỗi khi load script
global.window = {};
global.document = {
  readyState: 'complete',
  addEventListener: () => {},
  getElementById: () => null,
  querySelectorAll: () => [],
  createElement: () => ({
    setAttribute: () => {},
    style: {}
  }),
  head: {
    appendChild: () => {}
  },
  body: {
    appendChild: () => {}
  }
};

// Load code từ custom-tiemanh.js
const tiemanh = require('../custom-tiemanh.js');

console.log("Chạy kiểm thử logic phân tích dòng Sheet...");

// Test Case 1: Phân tích dòng dữ liệu Sheet chuẩn
const mockRowData = {
  "STT": "1",
  "Chi nhánh": "Quận 1",
  "Chủ đề": "Nữ Tính, Ngoại Cảnh",
  "Tên concept": "Nàng Thơ Hoa Đào",
  "Mô tả": "Bộ ảnh nàng thơ nhẹ nhàng",
  "Ẩn": "FALSE",
  "Best Seller": "TRUE",
  "img1": "https://drive.google.com/file/d/image_id_1/view",
  "img2": "https://drive.google.com/file/d/image_id_2/view",
  "Folder ID": "folder_id_123"
};

const parsed = tiemanh.parseSheetsRow(mockRowData, 0);

assert.strictEqual(parsed.id, 1, "ID phải là 1");
assert.strictEqual(parsed.tag, "Quận 1-TPHCM", "Chi nhánh phải được chuẩn hóa thành Quận 1-TPHCM");
assert.deepStrictEqual(parsed.themes, ["Nữ Tính", "Ngoại Cảnh"], "Chủ đề phải được phân tách thành mảng");
assert.strictEqual(parsed.title, "Nàng Thơ Hoa Đào", "Tên concept phải đúng");
assert.strictEqual(parsed.description, "Bộ ảnh nàng thơ nhẹ nhàng", "Mô tả phải đúng");
assert.strictEqual(parsed.isHidden, false, "Concept không bị ẩn");
assert.strictEqual(parsed.isBestSeller, true, "Concept là Best Seller");
assert.strictEqual(parsed.images[0], "https://drive.google.com/thumbnail?id=image_id_1&sz=w800", "Link ảnh 1 phải được chuyển thành trực tiếp");
assert.strictEqual(parsed.images[1], "https://drive.google.com/thumbnail?id=image_id_2&sz=w800", "Link ảnh 2 phải được chuyển thành trực tiếp");
assert.strictEqual(parsed.images.length, 2, "Chỉ lấy các ảnh có dữ liệu");

console.log("Tất cả kiểm thử đạt yêu cầu!");
