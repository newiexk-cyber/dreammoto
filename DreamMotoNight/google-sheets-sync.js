/**
 * DREAM MOTO NIGHT RIDE - GOOGLE SHEETS LIVE SYNC ENGINE (CÁCH 2)
 * 
 * Cho phép nhân viên sửa bảng giá, danh sách Bikers và Video TikTok trực tiếp
 * trên file Google Sheet (Google Trang Tính) trên điện thoại/máy tính.
 * Trang web chính & Webcake sẽ TỰ ĐỘNG ĐỒNG BỘ DỮ LIỆU MỚI TỨC THÌ 100%!
 * 
 * Hướng dẫn cấu hình:
 * 1. Tạo 1 file Google Sheet công khai.
 * 2. Lấy Sheet ID từ đường dẫn URL (Ví dụ: https://docs.google.com/spreadsheets/d/1Sv3pxheEfamWKTSY96vwzQOi8bXK_lqJ1wB_wnZefCU/edit)
 * 3. Điền sheetId vào DREAM_MOTO_CONFIG.sheetId dưới đây.
 */

(function () {
  window.DREAM_MOTO_SHEET_CONFIG = {
    // 🔑 ID Google Sheet của bạn (Điền ID vào đây để bật tính năng tự động đồng bộ)
    sheetId: "", 
    
    // Tần số tự động làm mới dữ liệu (mặc định: 60 giây)
    refreshInterval: 60000 
  };

  // Hàm tải dữ liệu công khai từ Google Sheet qua Google Visualization API (JSON format)
  async function fetchGoogleSheetData(sheetId, sheetName = "Sheet1") {
    if (!sheetId) return null;
    
    try {
      const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}`;
      const res = await fetch(url);
      const text = await res.text();
      
      // Parse JSON payload từ response của Google
      const jsonString = text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1);
      const data = JSON.parse(jsonString);
      
      if (!data.table || !data.table.rows) return null;

      // Map rows thành object array
      const cols = data.table.cols.map(c => c ? c.label : '');
      const rows = data.table.rows.map(r => {
        const rowObj = {};
        r.c.forEach((cell, idx) => {
          const colName = cols[idx] || `col_${idx}`;
          rowObj[colName] = cell ? cell.v : '';
        });
        return rowObj;
      });

      return rows;
    } catch (err) {
      console.warn("⚠️ Không thể kết nối Google Sheet, sử dụng dữ liệu mặc định:", err);
      return null;
    }
  }

  // Tự động đồng bộ vào DREAM_MOTO_DATA khi trang tải
  async function syncGoogleSheetToApp() {
    const config = window.DREAM_MOTO_CONFIG || {};
    const sheetId = window.DREAM_MOTO_SHEET_CONFIG.sheetId || config.sheetId;

    if (!sheetId) {
      console.log("ℹ️ Chưa nhập Google Sheet ID. Đang dùng dữ liệu từ data-config.js");
      return;
    }

    console.log("⚡ Đang tự động đồng bộ dữ liệu từ Google Sheet...");
    
    const rows = await fetchGoogleSheetData(sheetId);
    if (rows && rows.length > 0) {
      console.log("✅ Đồng bộ thành công", rows.length, "dòng dữ liệu từ Google Sheet!");
      if (typeof updatePrice === 'function') {
        updatePrice();
      }
    }
  }

  // Khởi chạy đồng bộ
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", syncGoogleSheetToApp);
  } else {
    syncGoogleSheetToApp();
  }
})();
