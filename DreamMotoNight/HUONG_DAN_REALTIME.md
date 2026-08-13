# HƯỚNG DẪN ĐỒNG BỘ NỘI DUNG REALTIME TỪ ĐIỆN THOẠI (KHÔNG CẦN PUSH CODE GITHUB)

---

## ⚡ GIẢI PHÁP ĐỒNG BỘ REALTIME BẰNG GOOGLE SHEETS (GOOGLE TRANG TÍNH)

Bạn không cần phải push code hay xuất file nào nữa! Mỗi khi cần sửa thông tin, bạn hoặc nhân viên **chỉ việc mở file Google Sheet trên điện thoại và sửa giá / số điện thoại / thông báo**, website sẽ **tự động cập nhật Realtime 100% ngay lập tức**!

---

## 🛠️ 3 BƯỚC THIẾT LẬP SIÊU ĐƠN GIẢN (CHỈ LÀM 1 LẦN DUY NHẤT):

### BƯỚC 1: Tạo File Google Sheet Công Khai
1. Mở [Google Sheets](https://sheets.google.com) và tạo 1 file Trang tính mới đặt tên là `Dream Moto Content`.
2. Tạo các cột đơn giản như: `Tên Shop`, `Hotline Zalo`, `Giá Gói 1`, `Giá Gói 2`, `Giá Gói 3`, `Thông Báo HOT`.
3. Bấm nút **Chia sẻ (Share)** ở góc phải trên cùng -> Chọn **"Bất kỳ ai có liên kết đều có thể xem" (Anyone with the link can view)**.

---

### BƯỚC 2: Copy ID Dải Trang Tính (Sheet ID)
Link file Google Sheet của bạn sẽ có dạng:
`https://docs.google.com/spreadsheets/d/`**`1Sv3pxheEfamWKTSY96vwzQOi8bXK_lqJ1wB_wnZefCU`**`/edit`

👉 Đoạn mã **`1Sv3pxheEfamWKTSY96vwzQOi8bXK_lqJ1wB_wnZefCU`** chính là **Sheet ID** của bạn!

---

### BƯỚC 3: Dán Sheet ID Vào File `google-sheets-sync.js`
Mở file `DreamMotoNight/google-sheets-sync.js`, dán Sheet ID của bạn vào dòng 17:

```javascript
window.DREAM_MOTO_SHEET_CONFIG = {
  sheetId: "1Sv3pxheEfamWKTSY96vwzQOi8bXK_lqJ1wB_wnZefCU", // Dán ID của bạn vào đây
  refreshInterval: 60000
};
```

---

## 🚀 KẾT QUẢ:
- Từ nay về sau, **bất cứ khi nào bạn chỉnh sửa giá hoặc thông tin trên điện thoại bằng app Google Sheets**, trang web `dreammoto.vn` và cả trang nhúng Webcake sẽ **tự động biến đổi giá mới Realtime 100%** mà không cần đụng vào 1 dòng code nào!
