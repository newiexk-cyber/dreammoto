# Hướng Dẫn Kết Nối GitHub Vui Với Webcake (Dream Moto Night Ride)

Tài liệu này hướng dẫn bạn cách đẩy file JavaScript lên **GitHub** và nhúng vào **Webcake Landing Page** tương tự dự án *Tiệm Ảnh Trái Thơm* trước đây của bạn.

---

## 📌 Quy Trình 3 Bước Tích Hợp Webcake + GitHub CDN

### Bước 1: Push Thư Mục `DreamMotoNight` Lên Repo GitHub
1. Mở Terminal / Git Bash và push branch chứa code lên GitHub:
   ```bash
   git checkout main
   git pull origin main
   git merge feat/dream-moto-night-landingpage
   git push origin main
   ```
2. Bạn sẽ có các file công khai trên repo GitHub (Ví dụ: `https://github.com/TênUser/TênRepo/blob/main/DreamMotoNight/dream-moto-webcake.js`).

---

### Bước 2: Lấy Link CDN Tải Siêu Nhanh Qua jsDelivr
Chuyển đổi URL GitHub thành CDN bằng dịch vụ miễn phí jsDelivr:

- **Link File JS Webcake:**
  `https://cdn.jsdelivr.net/gh/TênUser/TênRepo@main/DreamMotoNight/dream-moto-webcake.js`

- **Link File Data Config:**
  `https://cdn.jsdelivr.net/gh/TênUser/TênRepo@main/DreamMotoNight/data-config.js`

---

### Bước 3: Nhúng Vào Webcake Landing Page Editor
Trong trình thiết kế Webcake:

1. Kéo 1 phần tử **Mã HTML / Custom Code** vào vị trí muốn hiển thị ứng dụng và đặt ID:
   ```html
   <div id="dream-moto-root"></div>
   ```

2. Thêm thẻ nhúng Script trong phần **Mã Javascript Cuối Trang (Body Script)** của Webcake:
   ```html
   <script src="https://cdn.jsdelivr.net/gh/TênUser/TênRepo@main/DreamMotoNight/data-config.js"></script>
   <script src="https://cdn.jsdelivr.net/gh/TênUser/TênRepo@main/DreamMotoNight/dream-moto-webcake.js"></script>
   ```

---

## 💡 Ưu Điểm Của Mô Hình Này Cho Webcake:
- ⚡ **Siêu Nhanh & Nhẹ:** Toàn bộ giao diện TikTok Slider, Biker Team, Bảng Tính Giá & Link Zalo được nạp qua CDN jsDelivr với tốc độ 0.05s.
- 🔄 **Cập Nhật Tự Động:** Mỗi khi bạn chỉnh sửa file `data-config.js` hay `app.js` và push lên GitHub, Webcake sẽ tự động nhận giao diện & thông tin mới nhất mà không cần mở lại trình chỉnh sửa Webcake!
