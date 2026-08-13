# HƯỚNG DẪN DỰ ÁN DREAM MOTO NIGHT RIDE

Dự án **Dream Moto Night Ride** là giải pháp website tĩnh (HTML/CSS/JS) cao cấp, được thiết kế theo phong cách Cyberpunk Neon tối ưu cho trải nghiệm di động. Website cho phép khách hàng đặt lịch quay video mô tô đêm tại Cầu Ba Son qua Zalo.

---

## 📁 1. Cấu Trúc Mã Nguồn

Toàn bộ dự án nằm trọn vẹn trong thư mục `DreamMotoNight/`:

*   **`index.html`**: Giao diện Landing Page chính (Hero Video, Các Dịch Vụ, Biker, Tính Giá, Footer 3 Cột).
*   **`style.css`**: Bộ thiết kế giao diện Cyberpunk Neon Đêm Sài Gòn & modal video 9:16.
*   **`app.js`**: Logic tính giá tự động, đính kèm thông tin đặt lịch vào deep link Zalo & fetch dữ liệu realtime.
*   **`data-config.js`**: Cấu hình tĩnh ban đầu của Shop (Hotline, Zalo, Bikers, Gói Dịch Vụ).
*   **`dream-moto-webcake.js`**: Phiên bản Script nhúng Plug-and-Play cho Webcake.
*   **`admin/index.html`**: Trang quản trị trực quan (Admin Portal) bảo mật bằng mã PIN.

---

## 🌐 2. Tích Hợp Vào Webcake (Nhúng 1 Dòng Code)

Để nhúng toàn bộ giao diện website Dream Moto vào Landing Page của bạn trên Webcake:

1.  Mở thiết kế Landing Page trên **Webcake**.
2.  Thêm một phần tử HTML (Custom Code) tại nơi muốn hiển thị ứng dụng:
    ```html
    <div id="dream-moto-root"></div>
    ```
3.  Vào phần **Cài đặt trang** -> **Mã Javascript (Header / Body)** và dán dòng mã nhúng sau:
    ```html
    <script src="https://cdn.jsdelivr.net/gh/newiexk-cyber/dreammoto@main/DreamMotoNight/dream-moto-webcake.js"></script>
    ```

---

## 🛠️ 3. Quản Trị Realtime Trực Tuyến (Không Cần Chạm Code)

Hệ thống hỗ trợ đồng bộ dữ liệu đám mây thời gian thực (Realtime Cloud Sync) giúp bạn hoặc nhân viên Sales thay đổi bảng giá, video hay hotline tức thời:

1.  **Truy cập trang Quản Trị:** `https://newiexk-cyber.github.io/dreammoto/DreamMotoNight/admin/`
2.  **Đăng nhập:** Nhập mã PIN bảo mật **`123456`**.
3.  **Chỉnh sửa dữ liệu:** 
    *   **Zalo & Hotline:** Cập nhật số điện thoại chốt đơn của shop.
    *   **Quản lý Bikers / TikTok Trends / Góc Quay:** Thêm, sửa, xóa, hoặc Kéo-Thả file Ảnh/Video để thay đổi clip mẫu.
    *   **Quản lý Giá & Xe:** Điều chỉnh giá gói chụp và phụ phí cho từng dòng xe mô tô.
4.  **Lưu dữ liệu:** Chuyển qua tab **"Đồng Bộ Realtime"** và bấm nút **"ĐẨY LÊN MÂY (LƯU REALTIME)"**.

👉 *Sau khi bấm lưu, toàn bộ các phiên bản Web chính và trang nhúng trên Webcake sẽ tự động cập nhật ngay lập tức mà không cần push Git.*

---

## 🛠️ 4. Kiểm Thử Hệ Thống

Dự án đi kèm bộ kiểm thử tự động viết bằng Python. Để chạy kiểm thử:
```bash
python -m unittest tests/test_dream_moto_logic.py
```
*(Xác nhận tất cả các trường dữ liệu và logic tính giá, tạo link Zalo hoạt động chuẩn xác).*
