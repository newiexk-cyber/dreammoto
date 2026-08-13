# Hướng Dẫn Quản Lý & Upload Trang Web Tĩnh (Dream Moto Night Ride)

Trang web **Dream Moto Night Ride** được thiết kế **100% dạng Trang Web Tĩnh (Pure Static Web - HTML/CSS/JS)**. 
- ⚡ **Ưu điểm:** Tải siêu nhanh, không cần máy chủ (Server Backend) phức tạp, không mất phí duy trì hệ thống, hoạt động cực mượt trên điện thoại khi khách mở từ Inbox Zalo/TikTok/Facebook.

---

## 1. Xem Thử Trang Web Trên Máy Tính (Local Preview)
- **Cách 1 (Nhanh nhất):** Nhấp đôi trực tiếp vào file `start-preview.bat` trong thư mục `DreamMotoNight`. Sau đó mở trình duyệt truy cập `http://localhost:8000`.
- **Cách 2:** Mở trực tiếp file [index.html](file:///c:/memay/DreamMotoNight/index.html) bằng bất kỳ trình duyệt nào (Chrome, Safari, Edge, Cốc Cốc).

---

## 2. Cách Đổi Số Điện Thoại Zalo / Giá Gói / Thông Tin
Bạn chỉ cần mở file [app.js](file:///c:/memay/DreamMotoNight/app.js) và chỉnh sửa ngay ở phần **`DREAM_MOTO_CONFIG`** ở đầu file:

```javascript
const DREAM_MOTO_CONFIG = {
  zaloPhone: "0900000000", // <-- Đổi số điện thoại Zalo chốt đơn tại đây
  shopName: "Dream Moto Sài Gòn",
  spotLocation: "Cầu Ba Sơn - Thủ Thiêm",
  // ...
};
```

---

## 3. Hướng Dẫn Đưa Lên Mạng Miễn Phí (Deploy Options)

### 🚀 Option 1: GitHub Pages (Miễn phí 100% vĩnh viễn)
1. Push toàn bộ code thư mục `DreamMotoNight` lên một repo GitHub (Ví dụ: `dream-moto-night`).
2. Vào **Settings** -> **Pages** -> Chọn Branch `main` (hoặc `feat/dream-moto-night-landingpage`) -> Bấm **Save**.
3. Bạn sẽ nhận được 1 link dạng: `https://ten-ban.github.io/dream-moto-night/`

### ⚡ Option 2: Netlify Drop (Kéo thả ăn ngay trong 10 giây)
1. Truy cập `https://app.netlify.com/drop`.
2. Kéo cả thư mục `DreamMotoNight` thả vào trang web.
3. Nhận ngay 1 link chạy công khai trên mạng cực xịn!

### 📲 Cách Dùng Làm "Digital Sales Kit" (Menu gửi qua Inbox):
Khi có khách nhắn inbox hỏi: *"Shop ơi cho mình xin bảng giá / thông tin gói quay mô tô Cầu Ba Sơn với ạ"*.
Nhân viên chỉ cần copy duy nhất link web đã upload trên và gửi cho khách:
> *"Dạ chào bạn, bạn xem menu clip mẫu 4K, 5 trend hot nhất, bảng giá và chọn giờ ở đây giúp shop nha: [Link Web Tĩnh Của Bạn]"*
Khách tự xem, tự tính tiền và bấm nút Đặt qua Zalo!
