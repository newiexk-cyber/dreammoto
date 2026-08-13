/**
 * DREAM MOTO NIGHT RIDE - PURE STATIC WEBSITE ENGINE
 * 
 * BẢNG CẤU HÌNH TRANG WEB TĨNH (STATIC CONFIGURATION):
 * Bạn có thể chỉnh sửa giá, số điện thoại Zalo, danh sách xe, gói dịch vụ
 * và danh sách Bikers ngay tại đây mà không cần can thiệp vào code HTML phức tạp.
 */

const DREAM_MOTO_CONFIG = {
  zaloPhone: "0900000000",
  shopName: "Dream Moto Sài Gòn",
  spotLocation: "Cầu Ba Sơn - Thủ Thiêm",
  defaultSlot: "21:30",
  defaultBiker: "Rider Tuấn Motor",
  
  // Cấu hình bảng giá mặc định
  defaultBike: { name: "Kawasaki Z1000", extraPrice: 0 },
  defaultService: { name: "Gói 1: TikTok Basic", price: 299000 }
};

// Core Calculation Logic Functions (Pure Static Functions)
function calculatePrice(bikeExtra, servicePrice, addonsPrice) {
  const bike = parseInt(bikeExtra, 10) || 0;
  const service = parseInt(servicePrice, 10) || 0;
  const addons = parseInt(addonsPrice, 10) || 0;
  return bike + service + addons;
}

function generateZaloLink(bikeName, serviceName, slotTime, totalPrice, bikerName) {
  const phoneNumber = DREAM_MOTO_CONFIG.zaloPhone || "0900000000";
  const formattedPrice = totalPrice.toLocaleString('vi-VN') + "đ";
  const bikerText = bikerName ? `\n- Biker Yêu Thích: ${bikerName}` : '';
  
  const message = `Chào ${DREAM_MOTO_CONFIG.shopName}! Tôi muốn đặt dịch vụ Quay Video Moto Đêm ${DREAM_MOTO_CONFIG.spotLocation}:
- Dòng Xe: ${bikeName}
- Gói Dịch Vụ: ${serviceName}${bikerText}
- Khung Giờ: ${slotTime} Tối Nay
- Tổng Giá Dự Kiến: ${formattedPrice}

Tư vấn và giữ slot giúp tôi nhé!`;

  return `https://zalo.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

// Global State
let selectedBike = { ...DREAM_MOTO_CONFIG.defaultBike };
let selectedService = { ...DREAM_MOTO_CONFIG.defaultService };
let selectedSlot = DREAM_MOTO_CONFIG.defaultSlot;
let selectedBiker = DREAM_MOTO_CONFIG.defaultBiker;

function updatePrice() {
  const helmetAddon = document.getElementById("addonHelmet");
  const jacketAddon = document.getElementById("addonJacket");
  
  let addonTotal = 0;
  if (helmetAddon && helmetAddon.checked) addonTotal += parseInt(helmetAddon.value, 10);
  if (jacketAddon && jacketAddon.checked) addonTotal += parseInt(jacketAddon.value, 10);

  const totalPrice = calculatePrice(selectedBike.extraPrice, selectedService.price, addonTotal);
  const formattedPrice = totalPrice.toLocaleString('vi-VN') + "đ";

  // Update DOM displays
  const priceDisplay = document.getElementById("totalPriceDisplay");
  const mobilePriceDisplay = document.getElementById("mobilePriceDisplay");
  const sumBike = document.getElementById("sumBike");
  const sumService = document.getElementById("sumService");
  const sumBiker = document.getElementById("sumBiker");
  const zaloBtn = document.getElementById("zaloBookingBtn");

  if (priceDisplay) priceDisplay.innerText = formattedPrice;
  if (mobilePriceDisplay) mobilePriceDisplay.innerText = formattedPrice;
  if (sumBike) sumBike.innerText = selectedBike.name;
  if (sumService) sumService.innerText = selectedService.name;
  if (sumBiker) sumBiker.innerText = selectedBiker;

  // Update Zalo deep link
  if (zaloBtn) {
    zaloBtn.href = generateZaloLink(selectedBike.name, selectedService.name, selectedSlot, totalPrice, selectedBiker);
  }
}

// Helper function to select Biker from Profile card
function selectBikerInCalc(bikerName) {
  selectedBiker = bikerName;
  const calcSec = document.getElementById('calculator');
  if (calcSec) {
    calcSec.scrollIntoView({ behavior: 'smooth' });
  }
  updatePrice();
}

// Helper function to select trend from card click
function selectTrendInCalc(trendName) {
  selectedService.name = `Gói TikTok: ${trendName}`;
  const calcSec = document.getElementById('calculator');
  if (calcSec) {
    calcSec.scrollIntoView({ behavior: 'smooth' });
  }
  updatePrice();
}

// Initialize Event Listeners when DOM is ready
document.addEventListener("DOMContentLoaded", () => {

  // Option Cards Selection (Bike & Service)
  const bikeOptions = document.querySelectorAll('#bikeOptions .option-card');
  bikeOptions.forEach(card => {
    card.addEventListener('click', () => {
      bikeOptions.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const name = card.querySelector('.opt-name').innerText;
      const extraPrice = parseInt(card.getAttribute('data-price'), 10) || 0;
      selectedBike = { name, extraPrice };
      updatePrice();
    });
  });

  const serviceOptions = document.querySelectorAll('#serviceOptions .option-card');
  serviceOptions.forEach(card => {
    card.addEventListener('click', () => {
      serviceOptions.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const name = card.querySelector('.opt-name').innerText;
      const price = parseInt(card.getAttribute('data-price'), 10) || 299000;
      selectedService = { name, price };
      updatePrice();
    });
  });

  // Slot Picker Chips
  const slotChips = document.querySelectorAll('#slotChips .slot-chip');
  slotChips.forEach(chip => {
    chip.addEventListener('click', () => {
      slotChips.forEach(s => s.classList.remove('active'));
      chip.classList.add('active');
      selectedSlot = chip.getAttribute('data-slot') || "21:30";
      updatePrice();
    });
  });

  // Trend Tabs Switcher
  const trendTabs = document.querySelectorAll('#trendTabs .tab-btn');
  const trendCards = document.querySelectorAll('#trendsGrid .trend-card');
  
  trendTabs.forEach((tab, idx) => {
    tab.addEventListener('click', () => {
      trendTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      trendCards.forEach(c => c.style.display = 'none');
      if (trendCards[idx]) {
        trendCards[idx].style.display = 'block';
      }
    });
  });

  // FAQ Accordions
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(q => {
    q.addEventListener('click', () => {
      const parent = q.parentElement;
      parent.classList.toggle('active');
    });
  });

  // Initial calculation
  updatePrice();
});

// Export functions for node/python testing if required
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { calculatePrice, generateZaloLink, DREAM_MOTO_CONFIG };
}
