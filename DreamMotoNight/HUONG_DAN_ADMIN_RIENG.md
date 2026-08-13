# HƯỚNG DẪN TẠO TRANG ADMIN QUẢN TRỊ THÀNH 1 WEBSITE RIÊNG ĐỘC LẬP (VD: admin.dreammoto.vn)

---

## 🌟 3 CÁCH TÁCH TRANG ADMIN THÀNH 1 WEB RIÊNG ĐỘC LẬP

### CÁCH 1: Dùng Subdomain Riêng Cho Trang Admin (Khuyên Dùng)
Ví dụ: Web chính là `dreammoto.vn`, web quản trị riêng là **`admin.dreammoto.vn`** hoặc **`cms.dreammoto.vn`**.

#### Các bước thực hiện:
1. Đẩy dự án lên **GitHub Pages** hoặc **Netlify / Vercel**.
2. Trên trình quản lý tên miền (như Tên Miền PA Vietnam, MatBao, Cloudflare):
   - Tạo 1 bản ghi CNAME: `admin` -> trỏ về `TÊN_ACCOUNT.github.io` (hoặc link Netlify).
3. Trong cài đặt Domain của GitHub Pages / Netlify:
   - Thêm Custom Domain: `admin.dreammoto.vn` trỏ trọn vẹn vào thư mục `admin/`.
👉 **Kết quả:** Nhân viên mở `https://admin.dreammoto.vn`, gõ PIN `123456` là mở bảng quản trị kéo thả riêng biệt!

---

### CÁCH 2: Tạo Repository GitHub Riêng Cho Admin (Ví dụ: `dream-moto-admin`)
Nếu bạn muốn tách hẳn code web khách và code trang quản trị thành 2 dự án riêng trên GitHub:

1. Tạo một Repository mới trên GitHub tên là **`dream-moto-admin`**.
2. Đưa các file trong thư mục `DreamMotoNight/admin/` lên repository này.
3. Bật tính năng **GitHub Pages** (Settings -> Pages -> Select Branch `main`).
👉 **Kết quả:** Bạn sở hữu 1 trang web quản trị độc lập tại đường link: `https://TÊN_ACCOUNT.github.io/dream-moto-admin/`.

---

### CÁCH 3: Quản Trị Tự Động Lưu Lên GitHub Bằng Decap CMS (Không Cần Xuất File)
Dự án đã tích hợp sẵn **Decap CMS / Netlify CMS** trong thư mục `admin/config.yml`:

1. Kết nối trang `admin/` với Netlify Identity (Miễn phí 100%).
2. Mỗi khi bạn kéo thả Ảnh/Video hoặc sửa Giá trên trang Admin, Netlify CMS sẽ **tự động Commit & Save thẳng lên GitHub** mà bạn không cần phải tải file `data-config.js` rồi chép đè thủ công nữa!
