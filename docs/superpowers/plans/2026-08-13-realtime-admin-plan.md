# Implementation Plan - Realtime Admin Portal & Webcake Auto Sync

Kế hoạch triển khai tính năng đồng bộ Realtime cho trang web quản trị và giao diện landing page chính (bao gồm phiên bản nhúng trên Webcake).

## 1. Mục tiêu
- Tích hợp tính năng lưu dữ liệu cấu hình lên Cloud Key-Value Store trực tiếp từ Admin Portal.
- Tự động nạp dữ liệu từ Cloud khi tải trang landing page (kể cả trên Webcake).
- Đảm bảo cơ chế tự động fallback dùng file tĩnh `data-config.js` nếu Cloud gặp sự cố hoặc chưa cấu hình.

## 2. Chi tiết các bước triển khai

### Bước 1: Viết Unit Test kiểm tra lỗi cấu trúc dữ liệu mới (TDD Red Phase)
- Sửa file `tests/test_dream_moto_logic.py` để bổ sung các test cases sau:
  - `test_realtime_sync_fields_in_data_config`: Kiểm tra file `data-config.js` có chứa `realtimeBucketId` và `realtimeSyncUrl`.
  - `test_app_js_has_sync_realtime_data_function`: Kiểm tra file `app.js` có chứa hàm `syncRealtimeData`.
  - `test_webcake_js_has_sync_realtime_data_function`: Kiểm tra file `dream-moto-webcake.js` có chứa hàm `syncRealtimeData`.

### Bước 2: Bổ sung cấu hình vào `data-config.js`
- Thêm trường `realtimeBucketId: "dream-moto-night-default-key"` và `realtimeSyncUrl: "https://kvdb.io/9k8Kx4z8X3s7s6s9/dream_moto_config"` vào object `DREAM_MOTO_DATA.shopInfo`.

### Bước 3: Cập nhật ứng dụng chính `app.js`
- Triển khai hàm `syncRealtimeData()` thực hiện `fetch` dữ liệu từ `realtimeSyncUrl`.
- Khi lấy được dữ liệu, ghi đè toàn bộ `DREAM_MOTO_DATA` và gọi hàm `updatePrice()` cùng `renderServicesShowcase()` để hiển thị ngay lập tức.
- Gọi `syncRealtimeData()` ngay khi bắt đầu tải trang (trước các tiến trình render tĩnh).

### Bước 4: Cập nhật script nhúng Webcake `dream-moto-webcake.js`
- Tích hợp tương tự cơ chế `syncRealtimeData()` để khi nhúng trên Webcake, trang web luôn hiển thị dữ liệu mới nhất được chỉnh sửa từ trang quản trị.

### Bước 5: Cập nhật giao diện Admin Portal `admin/index.html`
- Bổ sung tab **"ĐỒNG BỘ REALTIME"**.
- Thiết kế giao diện hiển thị thông số `Bucket ID`, nút **"LƯU REALTIME"** và nút **"TẢI DỮ LIỆU TỪ MÂY"**.
- Viết JS thực hiện POST/PUT lên URL lưu trữ đám mây khi bấm lưu.
- Hiển thị thông báo Toast neon đẹp mắt khi lưu thành công.

### Bước 6: Chạy kiểm thử tự động (TDD Green Phase)
- Chạy:
  ```bash
  python -m unittest tests/test_dream_moto_logic.py
  ```
- Xác nhận 100% test case màu xanh (Green).

### Bước 7: Thực hiện Commit Git
- Commit riêng rẽ với thông điệp: `"Tích hợp tính năng đồng bộ Realtime qua Cloud Key-Value API"`
