# Design Spec: Website Dịch Vụ Quay Video Moto Đêm Cầu Ba Sơn (Dream Moto Night Ride)

**Ngày khởi tạo:** 2026-08-13
**Trạng thái:** Chờ phê duyệt từ khách hàng

---

## 1. Tổng Quan & Mục Tiêu Dự Án
Xây dựng website đơn trang (Landing Page) phong cách **TikTok / Reels** dành riêng cho dịch vụ chở khách trải nghiệm & quay video mô tô phân khối lớn vào ban đêm tại khu vực Cầu Ba Sơn & Đô thị mới Thủ Thiêm.
Website phục vụ 2 mục đích:
1. Trang đích tiếp cận khách hàng trên TikTok / Facebook Ads.
2. "Menu dịch vụ điện tử" để nhân viên gửi trực tiếp qua Zalo/FB Inbox khi khách cần tư vấn.

---

## 2. Phân Tích & Cải Tiến Từ Kế Hoạch Nhỏ Ban Đầu

### Ý Tưởng Ban Đầu Của Khách:
`VIDEO HERO` -> `5 TREND` -> `CLIP KHÁCH THẬT` -> `GIÁ/GÓI` -> `REVIEW` -> `QUY TRÌNH` -> `FAQ` -> `ZALO ĐẶT LỊCH`
*Tỷ lệ:* 70% Video/Hình ảnh - 30% Nội dung chữ.

### Điểm Cải Tiến & Bổ Sung Độc Đáo:
1. **Giao diện Dark Mode Neon / Midnight Cyberpunk:** Tái hiện không khí rực rỡ đêm Cầu Ba Sơn với ánh sáng đèn đường, đèn xe mô tô & tháp Landmark 81.
2. **TikTok-Style 9:16 Vertical Video Carousel:** Cho phép khách lướt 5 Trend mượt mà trên di động như ứng dụng TikTok native:
   - *Trend 1: Cinematic Night Cruiser*
   - *Trend 2: Couple Night City*
   - *Trend 3: Cyberpunk Speed & Light Trails*
   - *Trend 4: POV Rider & Camera Tracking*
   - *Trend 5: Solo Badass & Cool Pose*
3. **Bộ Tính Giá & Chọn Gói Thông Minh (Interactive Price Calculator):** Khách chọn xe (Z1000, BMW S1000RR, Ducati...), chọn loại clip và nhận báo giá tức thì.
4. **Bản Đồ Các Góc Quay Huyền Thoại (Spot Map):** Trực quan hóa các điểm check-in (Chân cầu Ba Sơn, Đỉnh cầu ngắm tháp, Đường Thủ Thiêm).
5. **Chọn Slot Khung Giờ Đêm (Slot Picker):** Giúp khách giữ chỗ vào các khung giờ vàng (19h30 - 23h30).
6. **Zalo Deep Link Auto-Fill:** Bấm "Đặt Lịch" tự chuyển sang ứng dụng Zalo với cú pháp tin nhắn tạo sẵn.

---

## 3. Kiến Trúc Trang & Công Nghệ

- **Cấu trúc File dự kiến:**
  - `index.html` - HTML5 chuẩn SEO & Semantic layout.
  - `style.css` - CSS Design System Cyberpunk Night Theme, Flexbox/Grid, Responsive.
  - `app.js` - Logic lướt TikTok trend, tính giá tự động, chọn slot & Zalo link.

---

## 4. Xác Nhận & Bước Tiếp Theo
Cần phản hồi phê duyệt thiết kế từ khách hàng trước khi triển khai code.
