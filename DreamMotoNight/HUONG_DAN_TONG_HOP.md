# HƯỚNG DẪN TỔNG HỢP: PUSH GITHUB, TÍCH HỢP WEBCAKE & QUẢN TRỊ WEBSITE

---

## 📁 1. TÓM TẮT CÁC FILE CẦN PUSH LÊN GITHUB REPOSITORY

Tất cả các file đã hoàn thiện nằm trọn vẹn trong thư mục **`DreamMotoNight/`**:

| Tên File | Vai Trò & Chức Năng |
| :--- | :--- |
| **`index.html`** | Trang giao diện chính (Hero Banner, Các Dịch Vụ, Biker, Tính Giá, Footer 3 Cột) |
| **`style.css`** | Bộ thiết kế giao diện Cyberpunk Neon Đêm Sài Gòn |
| **`app.js`** | Bộ xử lý tính giá tự động & đính sẵn đơn hàng vào Zalo |
| **`data-config.js`** | Bộ quản lý nội dung tĩnh (Bảng giá, hotline, địa chỉ, video) |
| **`google-sheets-sync.js`** | Script kết nối Google Sheets đồng bộ giá live tự động |
| **`dream-moto-webcake.js`** | Script tích hợp Webcake 1-Click |
| **`admin/index.html`** | Trang Quản Trị Admin Portal (Giao diện Kéo - Thả file 100%) |

### 💻 Các Lệnh Git Để Push Lên GitHub:
```bash
git checkout main
git pull origin main
git checkout -b feat/dream-moto-night-landingpage
git add DreamMotoNight/
git commit -m "Hoàn thiện 100% dự án Dream Moto Night Ride"
git push origin feat/dream-moto-night-landingpage
```

---

## 🌐 2. CÁCH TÍCH HỢP VÀO WEBCAKE (NHÚNG 1 DÒNG CODE)

Nếu bạn thiết kế Landing Page bằng **Webcake**, bạn không cần dựng lại từ đầu. Chỉ cần dán 1 dòng script CDN vào Webcake:

1. Mở trang quản trị **Webcake** -> Chọn Landing Page của bạn.
2. Vào **Cài đặt trang** -> Chọn mục **Mã Javascript (Header / Body)**.
3. Chèn dòng mã sau (Thay `TÊN_GITHUB` và `TÊN_REPO` của bạn vào):

```html
<script src="https://cdn.jsdelivr.net/gh/TÊN_GITHUB/TÊN_REPO/DreamMotoNight/dream-moto-webcake.js"></script>
```
👉 *Hệ thống sẽ tự động hiển thị nguyên khối giao diện Dream Moto Night Ride lên trang Webcake của bạn mượt mà 100%!*

---

## 🛠️ 3. CÁCH QUẢN TRỊ NỘI DUNG & BẢNG GIÁ WEB

Bạn có **2 CÁCH QUẢN TRỊ** cực kỳ linh hoạt và dễ dàng:

### CÁCH 1: Dùng Trang Admin Portal (Kéo - Thả File Trực Quan)
1. Truy cập trang Admin: `https://TÊN_GITHUB.github.io/TÊN_REPO/DreamMotoNight/admin/` (Hoặc mở file `DreamMotoNight/admin/index.html`).
2. Nhập mã PIN đăng nhập: **`123456`** (Hoặc bấm Enter).
3. Tại đây bạn có thể:
   - Thay đổi **Tiêu đề Hero, Hotline Zalo, Địa chỉ shop**.
   - **Kéo & Thả trực tiếp file Video / Ảnh** cho từng dịch vụ và Biker.
   - Thay đổi giá từng gói dịch vụ & phụ phí xe mô tô.
4. Bấm nút **`LƯU & XUẤT FILE DATA-CONFIG.JS`** -> Chép đè file `data-config.js` lên GitHub là web live sẽ tự động cập nhật ngay!

---

### CÁCH 2: Đồng Bộ Tự Động Bằng Google Sheets (Realtime Live Sync)
- Đã tích hợp sẵn file `google-sheets-sync.js`.
- Bạn chỉ cần nhập ID bảng tính Google Sheet của shop vào file `google-sheets-sync.js`.
- Mỗi khi nhân viên thay đổi giá hoặc số điện thoại trên Google Sheet, website sẽ **tự động cập nhật giá mới ngay lập tức** mà không cần sửa dòng code nào!
