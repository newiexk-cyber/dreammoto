/**
 * DREAM MOTO NIGHT RIDE - WEBCAKE & GITHUB CDN PLUG & PLAY SCRIPT
 * 
 * Tác giả: DREAM MOTO TEAM
 * Mục đích: Nhúng trực tiếp vào Webcake Landing Page thông qua GitHub CDN (jsDelivr / GitHub Raw)
 * 
 * Hướng dẫn nhúng vào Webcake:
 * 1. Thêm 1 thẻ HTML/Custom Code trên Webcake: <div id="dream-moto-root"></div>
 * 2. Thêm thẻ Script bên dưới: 
 *    <script src="https://cdn.jsdelivr.net/gh/USERNAME/REPO@main/DreamMotoNight/dream-moto-webcake.js"></script>
 */

(function () {
  // Cấu hình linh hoạt cho Webcake
  window.DREAM_MOTO_CONFIG = window.DREAM_MOTO_CONFIG || {
    targetId: "dream-moto-root", // ID phần tử trên Webcake để chèn ứng dụng
    zaloPhone: "0900000000",
    shopName: "Dream Moto Sài Gòn",
    spotLocation: "Cầu Ba Son - Thủ Thiêm"
  };

  // 1. Tự động chèn Google Fonts & CSS Cyberpunk
  function injectStyles() {
    if (document.getElementById("dream-moto-fonts")) return;

    const fontLink = document.createElement("link");
    fontLink.id = "dream-moto-fonts";
    fontLink.rel = "stylesheet";
    fontLink.href = "https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,400;0,600;0,700;0,800;0,900;1,400;1,700&family=Chakra+Petch:wght@600;700;900&display=swap";
    document.head.appendChild(fontLink);

    const faLink = document.createElement("link");
    faLink.rel = "stylesheet";
    faLink.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
    document.head.appendChild(faLink);
  }

  // 2. Chạy ứng dụng khi DOM tải xong
  function initWebcakeApp() {
    injectStyles();

    const targetElem = document.getElementById(window.DREAM_MOTO_CONFIG.targetId) || document.body;
    if (!targetElem) return;

    console.log("🚀 Dream Moto Webcake Script Loaded Successfully!");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initWebcakeApp);
  } else {
    initWebcakeApp();
  }
})();
