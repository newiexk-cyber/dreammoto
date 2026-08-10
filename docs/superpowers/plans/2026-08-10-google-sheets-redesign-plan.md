# Google Sheets Redesign & Web Concept Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Cấu trúc lại Google Sheet quản lý concept, viết Google Apps Script đồng bộ tự động từ Drive sang Sheet (tối đa 12 ảnh, ràng buộc 1-12), cập nhật logic Web để hỗ trợ lọc đa chủ đề (dấu phẩy), tự động sinh bộ lọc chi nhánh/chủ đề, lọc ẩn và hiển thị ngọn lửa 🔥 Best Seller ưu tiên trên Hero Polaroid.

**Architecture:** Sử dụng Google Apps Script trên Sheet để cập nhật link Drive trực tiếp và các thông tin tự động, bảo vệ các cột chỉnh sửa thủ công (`Chủ đề`, `Mô tả`, `Ẩn`, `Best Seller`). Phía Web, cập nhật hàm xử lý dữ liệu Sheets JSONP, viết CSS nhãn ngọn lửa và bổ sung logic ngẫu nhiên ưu tiên Best Seller trên Hero Polaroid.

**Tech Stack:** HTML, Javascript, CSS, Google Apps Script, Google Sheets API.

## Global Constraints
- Cột A: STT, B: Chi nhánh, C: Chủ đề (nhiều tag phân tách bởi dấu phẩy `,`), D: Tên concept, E: Mô tả, F: Ẩn, G: Best Seller, H-S: img1-img12, T: Folder ID.
- Chỉ đồng bộ concept có từ 1 đến 12 ảnh. Nhiều hơn hoặc ít hơn thì không đồng bộ.
- Ưu tiên hiển thị Best Seller trên 3 Polaroid nổi bật (Hero banner), thiếu thì bù ngẫu nhiên concept thường.
- Hiển thị icon ngọn lửa 🔥 nhấp nháy cho Best Seller trên card danh sách.

---

### Task 1: Thiết lập cấu trúc kiểm thử cục bộ (Test Scaffolding)

**Files:**
- Create: `tests/tiemanh-test.js`

**Interfaces:**
- Consumes: Node.js runtime
- Produces: Môi trường chạy unit test cục bộ không cần trình duyệt để kiểm thử TDD cho các hàm logic xử lý dữ liệu.

- [ ] **Step 1: Viết test kiểm tra khung kiểm thử hoạt động (Failing Test)**
  
  Tạo tệp `tests/tiemanh-test.js` kiểm tra một assertion đơn giản để đảm bảo framework chạy được và báo lỗi:
  ```javascript
  const assert = require('assert');
  console.log("Chạy kiểm thử...");
  // Test đơn giản cố tình fail để xác minh TDD Red
  assert.strictEqual(1, 2, "Test framework hoạt động - Cố tình báo lỗi");
  ```

- [ ] **Step 2: Chạy kiểm thử để xác nhận lỗi (Verify RED)**
  
  Chạy lệnh: `node tests/tiemanh-test.js`  
  Xác nhận: Có lỗi `AssertionError: 1 === 2` xảy ra.

- [ ] **Step 3: Sửa test và viết helper assertions cơ bản (Pass Test)**
  
  Cập nhật `tests/tiemanh-test.js` với các test case giả lập cho hàm bóc tách dữ liệu và logic:
  ```javascript
  const assert = require('assert');
  console.log("Khung kiểm thử đã sẵn sàng!");
  assert.strictEqual(1, 1);
  ```

- [ ] **Step 4: Chạy kiểm thử để xác nhận thành công (Verify GREEN)**
  
  Chạy lệnh: `node tests/tiemanh-test.js`  
  Xác nhận: Không có lỗi nào xảy ra và in ra dòng chữ "Khung kiểm thử đã sẵn sàng!".

- [ ] **Step 5: Commit**
  
  ```bash
  git add tests/tiemanh-test.js
  git commit -m "test: setup basic test scaffolding for tiemanh"
  ```

---

### Task 2: Logic xử lý dữ liệu Sheets (Multi-theme, Branch & Best Seller logic)

**Files:**
- Modify: `custom-tiemanh.js:3632-3722` (hàm `handleSheetsData`)
- Test: `tests/tiemanh-test.js`

**Interfaces:**
- Consumes: Dữ liệu JSON raw từ API Google Sheets
- Produces: Mảng `CONCEPTS` được chuẩn hóa chứa các trường `themes`, `tag` (chi nhánh), `isBestSeller`, `images` (tối đa 12 ảnh).

- [ ] **Step 1: Viết test kiểm tra logic phân tích dữ liệu từ Sheet (Failing Test)**
  
  Thêm các test case vào `tests/tiemanh-test.js` để kiểm thử hàm `parseSheetsRow` giả định (ta sẽ bóc tách logic này ra để dễ test):
  ```javascript
  // Viết assertions mong muốn cho hàm parseRow:
  // 1. Tách chủ đề dấu phẩy: "Nữ Tính, Ngoại Cảnh" -> ["Nữ Tính", "Ngoại Cảnh"]
  // 2. Nhận diện Best Seller: "TRUE" -> true
  // 3. Nhận diện Ẩn: "TRUE" -> isHidden = true
  // 4. Thu thập ảnh: img1 đến img12
  ```

- [ ] **Step 2: Chạy kiểm thử để xác nhận lỗi (Verify RED)**
  
  Chạy lệnh: `node tests/tiemanh-test.js`  
  Xác nhận: Lỗi do hàm `parseRow` chưa được import hoặc chưa được định nghĩa.

- [ ] **Step 3: Cập nhật hàm `handleSheetsData` trong `custom-tiemanh.js` và hàm bổ trợ**
  
  Sửa đổi hàm `handleSheetsData` trong `custom-tiemanh.js` để phân tích các cột mới (STT, Chi nhánh, Chủ đề, Tên concept, Mô tả, Ẩn, Best Seller, img1-img12). Trích xuất logic phân tích hàng sang hàm `parseSheetsRow` để có thể export/test được.
  
- [ ] **Step 4: Chạy kiểm thử để xác nhận thành công (Verify GREEN)**
  
  Chạy lệnh: `node tests/tiemanh-test.js`  
  Xác nhận: Tất cả các test cases của `parseSheetsRow` đều vượt qua thành công.

- [ ] **Step 5: Commit**
  
  ```bash
  git add custom-tiemanh.js tests/tiemanh-test.js
  git commit -m "feat: update sheet parsing logic with multi-themes and bestseller support"
  ```

---

### Task 3: Cập nhật logic Hero Polaroid và Bộ Lọc Tự Động

**Files:**
- Modify: `custom-tiemanh.js:3735-3749` (hàm `randomizeHeroPolaroids`), hàm render bộ lọc và render card
- Test: `tests/tiemanh-test.js`

**Interfaces:**
- Consumes: Mảng `CONCEPTS` đã được cập nhật logic ở Task 2
- Produces: 3 ảnh Polaroid nổi bật hiển thị trên Hero banner (ưu tiên Best Seller), nhãn ngọn lửa 🔥 trên Card, và thanh bộ lọc Chi nhánh/Chủ đề sinh tự động.

- [ ] **Step 1: Viết test cho thuật toán chọn ngẫu nhiên Polaroid (Failing Test)**
  
  Thêm test case vào `tests/tiemanh-test.js` kiểm tra hàm `selectHeroConcepts(concepts)`:
  - Nếu có 4 bộ Best Seller, hàm phải chọn ngẫu nhiên đúng 3 bộ trong số đó.
  - Nếu chỉ có 1 bộ Best Seller, hàm phải chọn bộ đó và bù thêm 2 bộ thường.
  - Nếu không có bộ Best Seller nào, hàm phải chọn ngẫu nhiên 3 bộ thường.

- [ ] **Step 2: Chạy kiểm thử để xác nhận lỗi (Verify RED)**
  
  Chạy lệnh: `node tests/tiemanh-test.js`  
  Xác nhận: Lỗi do hàm `selectHeroConcepts` chưa được định nghĩa.

- [ ] **Step 3: Triển khai logic trong `custom-tiemanh.js`**
  
  - Định nghĩa hàm `selectHeroConcepts` và cập nhật hàm `randomizeHeroPolaroids` để sử dụng nó.
  - Cập nhật hàm tạo thanh bộ lọc (`renderFilterBar` hoặc tương tự) để quét và lấy danh sách chi nhánh/chủ đề duy nhất thay vì code cứng.
  - Cập nhật CSS hiển thị nhãn ngọn lửa nhấp nháy cho Best Seller và mini tag chi nhánh.

- [ ] **Step 4: Chạy kiểm thử để xác nhận thành công (Verify GREEN)**
  
  Chạy lệnh: `node tests/tiemanh-test.js`  
  Xác nhận: Hàm `selectHeroConcepts` hoạt động đúng 100% các trường hợp kiểm thử.

- [ ] **Step 5: Commit**
  
  ```bash
  git add custom-tiemanh.js tests/tiemanh-test.js
  git commit -m "feat: implement best seller priority on hero polaroids and auto filters generation"
  ```

---

### Task 4: Kiểm thử tích hợp và bàn giao Apps Script

**Files:**
- Modify: `docs/superpowers/specs/2026-08-10-google-sheets-redesign-design.md` (nếu cần tinh chỉnh hướng dẫn)
- Test: Chạy thử trên trình duyệt cục bộ với index.html

- [ ] **Step 1: Viết kiểm thử tích hợp (Failing Test)**
  
  Tạo tệp mock dữ liệu Sheets dạng JSONP để chạy thử trực tiếp trên trình duyệt hoặc giả lập nạp hoàn tất toàn bộ luồng mà không bị lỗi.

- [ ] **Step 2: Chạy và xác nhận lỗi**
  
  Chạy thử trên trình duyệt (mở `index.html`) và kiểm tra xem có bất kỳ lỗi JS console nào không.

- [ ] **Step 3: Sửa lỗi tích hợp**
  
  Sửa các lỗi CSS hiển thị lệch nhãn ngọn lửa, đảm bảo nhãn ngọn lửa động co giãn tốt trên thiết bị di động.

- [ ] **Step 4: Chạy thử và xác nhận hiển thị hoàn hảo**
  
  Mở trang web, kiểm tra trực quan các thẻ nhãn Best Seller lấp lánh ở góc ảnh, danh sách lọc chi nhánh tự động cập nhật, 3 ảnh Polaroid hiển thị chính xác.

- [ ] **Step 5: Commit**
  
  ```bash
  git commit -m "feat: complete integration testing for google sheets concept sync"
  ```
