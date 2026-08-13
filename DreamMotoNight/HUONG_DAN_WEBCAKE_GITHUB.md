# Hướng Dẫn Quy Trình Cập Nhật Nội Dung (Dream Moto Night Ride)

Tài liệu này giải thích rõ 2 cách cập nhật nội dung (Giá gói, Biker, Video TikTok) cho trang web chính và Webcake.

---

## 🔄 CÁCH 1: Cập Nhật Qua Admin Local + Push GitHub (Mặc định)

1. **Chỉnh Sửa:** Bạn mở trang Admin [DreamMotoNight/admin/index.html](file:///c:/memay/DreamMotoNight/admin/index.html) trên máy tính (Nhập PIN: `123456`).
2. **Xuất File:** Sửa xong bấm nút **"LƯU & XUẤT FILE DATA-CONFIG.JS"** để tải file `data-config.js` mới về.
3. **Push GitHub:** Chép đè file `data-config.js` vào thư mục dự án và gõ lệnh:
   ```bash
   git add DreamMotoNight/data-config.js
   git commit -m "Cập nhật bảng giá & biker mới"
   git push origin main
   ```
4. **Kết quả:** Trang web chính (hoặc trang Webcake của bạn) sẽ **tự động nhảy dữ liệu mới** nhờ liên kết jsDelivr CDN mà **không cần đụng lại Webcake!**

---

## ⚡ CÁCH 2: Tự Động 100% KHÔNG CẦN GÕ LỆNH GIT PUSH (Dành Cho Nhân Viên)

Nếu bạn muốn nhân viên chỉ cần thao tác trên di động/máy tính mà **không cần biết gõ lệnh Git Push**:

### 🌟 2.1. Đăng Nhập Admin Online (Decap CMS / Netlify CMS)
- Khi bạn đưa web lên host (Netlify / GitHub Pages), bạn truy cập link `domain-cua-ban.com/admin/`.
- Nhân viên vào trang Admin này trên mạng, sửa giá -> Bấm **Save** -> **Hệ thống tự động commit & push lên GitHub giúp bạn 100%!**

### 📊 2.2. Kết Nối Google Sheet (Google Trang Tính)
- Cho phép nhân viên gõ giá tiền hoặc link video vào 1 file Google Sheet trên điện thoại.
- Trang web tự nạp dữ liệu từ Google Sheet về hiển thị tức thì.
