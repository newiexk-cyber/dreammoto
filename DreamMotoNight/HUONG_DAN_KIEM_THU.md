# Hướng Dẫn Kiểm Thử & Xem Thử Website Đầy Đủ (Dream Moto Night Ride)

Tài liệu này hướng dẫn chi tiết các cách để bạn kiểm tra, xem thử giao diện và test toàn bộ tính năng của dự án **Dream Moto Night Ride**.

---

## 🚀 CÁCH 1: Chạy Server Tĩnh Tự Động 1-Click (Khuyên Dùng)

1. Mở thư mục dự án `DreamMotoNight`.
2. Nhấp đúp vào file **`start-preview.bat`**.
3. Mở trình duyệt (Chrome, Safari, Edge, Cốc Cốc) và truy cập các liên kết:
   - 🌐 **Trang Web Chính:** [http://localhost:8000](http://localhost:8000)
   - 🛡️ **Trang Admin Portal Giai Đoạn 3:** [http://localhost:8000/admin/](http://localhost:8000/admin/) *(Mã PIN đăng nhập: **`123456`**)*

---

## 📂 CÁCH 2: Mở Trực Tiếp File HTML
Bạn có thể nhấp đúp trực tiếp vào các file HTML trong thư mục:
- [index.html](file:///c:/memay/DreamMotoNight/index.html) - Mở trang web chính.
- [admin/index.html](file:///c:/memay/DreamMotoNight/admin/index.html) - Mở trang Admin Portal.

---

## 📱 CÁCH 3: Test Giao Diện Điện Thoại & Link Zalo Auto-Fill

1. Khi đang xem web trên trình duyệt (`http://localhost:8000`), nhấn phím **F12** (hoặc chuột phải -> Chọn **Inspect / Kiểm tra**).
2. Nhấn biểu tượng **Điện thoại (Device Toolbar)** hoặc phím tắt `Ctrl + Shift + M`.
3. Chọn thiết bị (iPhone 14 Pro, Samsung S22...) để kiểm tra:
   - **Hero Banner Video Background:** Video chạy nền autoloop tự động lặp lại, giảm sáng 65% để giữ chữ rõ ràng.
   - **5 Hot Trends TikTok:** Thử bấm các tab 1 đến 5 để chuyển đổi 5 phong cách quay.
   - **Đội Ngũ Bikers Đêm:** Thử bấm *"Chọn Đồng Hành Với Tuấn/Hoàng/Bảo"* -> Hệ thống tự chọn Biker trong bảng tính giá.
   - **Bảng Tính Giá Thông Minh:** Thử đổi xe (Z1000, BMW S1000RR, Ducati...), đổi gói dịch vụ, tích chọn phụ kiện -> Tổng giá tiền tự nhảy realtime.
   - **Nút "ĐẶT LỊCH NGAY QUA ZALO":** Bấm nút để kiểm tra link Zalo tự động tạo nội dung tin nhắn sẵn.

---

## 🧪 CÁCH 4: Chạy Bộ Test Tự Động (Unit Tests)

Mở Terminal / PowerShell tại thư mục `c:\memay` và chạy câu lệnh:
```bash
python -m unittest tests/test_dream_moto_logic.py
```
Kết quả báo `OK (11 tests)` chứng minh 100% logic tính giá, mã hóa Zalo link, cấu hình tĩnh và Admin Portal đều hoạt động hoàn hảo.
