/**
 * DREAM MOTO NIGHT RIDE - PURE STATIC WEBSITE ENGINE
 * 
 * Nguồn dữ liệu tĩnh được nạp tự động từ `data-config.js` (DREAM_MOTO_DATA).
 * Giúp bạn quản lý toàn bộ video trend, bảng giá, danh sách dòng xe & bikers
 * chỉ bằng cách chỉnh sửa file `data-config.js` cực kỳ đơn giản!
 */

// Safe reference to static data config
function getShopConfig() {
  if (typeof DREAM_MOTO_DATA !== 'undefined' && DREAM_MOTO_DATA.shopInfo) {
    return DREAM_MOTO_DATA.shopInfo;
  }
  return {
    name: "Dream Moto Sài Gòn",
    zaloPhone: "0900000000",
    spotLocation: "Cầu Ba Son - Thủ Thiêm",
    defaultSlot: "21:30"
  };
}

// Core Calculation Logic Functions (Pure Static Functions)
function calculatePrice(bikeExtra, servicePrice, addonsPrice) {
  const bike = parseInt(bikeExtra, 10) || 0;
  const service = parseInt(servicePrice, 10) || 0;
  const addons = parseInt(addonsPrice, 10) || 0;
  return bike + service + addons;
}

function generateZaloLink(bikeName, serviceName, slotTime, totalPrice, bikerName) {
  const cfg = getShopConfig();
  const formattedPrice = totalPrice.toLocaleString('vi-VN') + "đ";
  const bikerText = bikerName ? `\n- Biker Yêu Thích: ${bikerName}` : '';
  
  const message = `Chào ${cfg.name}! Tôi muốn đặt dịch vụ Quay Video Moto Đêm ${cfg.spotLocation}:
- Dòng Xe: ${bikeName}
- Gói Dịch Vụ: ${serviceName}${bikerText}
- Khung Giờ: ${slotTime} Tối Nay
- Tổng Giá Dự Kiến: ${formattedPrice}

Tư vấn và giữ slot giúp tôi nhé!`;

  return `https://zalo.me/${cfg.zaloPhone}?text=${encodeURIComponent(message)}`;
}

// Global State
let selectedBike = { name: "Kawasaki Z1000", extraPrice: 0 };
let selectedService = { name: "Gói 1: TikTok Basic", price: 299000 };
let selectedSlot = "21:30";
let selectedBiker = "Rider Tuấn Motor";

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

  // Dynamic Hero Video Background Autoloop Loader & Text Content Loader
  if (typeof DREAM_MOTO_DATA !== 'undefined' && DREAM_MOTO_DATA.shopInfo) {
    const info = DREAM_MOTO_DATA.shopInfo;
    
    // Video Background
    if (info.heroVideoUrl) {
      const videoSource = document.getElementById("heroVideoSource");
      const videoElem = document.getElementById("heroVideoBg");
      if (videoSource && videoElem) {
        videoSource.src = info.heroVideoUrl;
        videoElem.load();
      }
    }

    // Hero Title & Subtitle
    const heroTitleElem = document.getElementById("heroTitle");
    const heroSubtitleElem = document.getElementById("heroSubtitle");
    if (heroTitleElem && info.heroTitle) heroTitleElem.innerHTML = info.heroTitle;
    if (heroSubtitleElem && info.heroSubtitle) heroSubtitleElem.innerHTML = info.heroSubtitle;

    // Hero Stats
    if (info.stats && info.stats.length >= 3) {
      const s1n = document.getElementById("stat1Num");
      const s1t = document.getElementById("stat1Txt");
      const s2n = document.getElementById("stat2Num");
      const s2t = document.getElementById("stat2Txt");
      const s3n = document.getElementById("stat3Num");
      const s3t = document.getElementById("stat3Txt");

      if (s1n) s1n.innerHTML = info.stats[0].number;
      if (s1t) s1t.innerHTML = info.stats[0].text;
      if (s2n) s2n.innerHTML = info.stats[1].number;
      if (s2t) s2t.innerHTML = info.stats[1].text;
      if (s3n) s3n.innerHTML = info.stats[2].number;
      if (s3t) s3t.innerHTML = info.stats[2].text;
    }

    // Credit Contact Information & 3-Column Footer Loader
    const credWeb = document.getElementById("creditWebsite");
    const credTik = document.getElementById("creditTiktok");
    const credHot = document.getElementById("creditHotline");
    const credAdr = document.getElementById("creditAddress");

    if (credWeb && info.websiteUrl) {
      credWeb.textContent = info.websiteUrl;
      credWeb.href = info.websiteUrl;
    }
    if (credTik && info.tiktokId) credTik.textContent = info.tiktokId;
    if (credHot && info.hotline) {
      credHot.textContent = info.hotline;
      credHot.href = `tel:${info.hotline.replace(/[^0-9]/g, '')}`;
    }
    if (credAdr && info.address) credAdr.textContent = info.address;

    // Premium 3-Column Footer Loader
    const bioElem = document.getElementById("footerBioText");
    const hotElem = document.getElementById("footerHotline");
    const emailElem = document.getElementById("footerEmail");
    const cs1Elem = document.getElementById("footerCS1");
    const cs2Elem = document.getElementById("footerCS2");
    const cs3Elem = document.getElementById("footerCS3");

    if (bioElem && info.footerBio) bioElem.textContent = info.footerBio;
    if (hotElem && info.hotline) hotElem.textContent = info.hotline;
    if (emailElem && info.email) emailElem.textContent = info.email;

    if (info.branches && info.branches.length >= 1) {
      if (cs1Elem && info.branches[0]) cs1Elem.textContent = info.branches[0].name;
      if (cs2Elem && info.branches[1]) cs2Elem.textContent = info.branches[1].name;
      if (cs3Elem && info.branches[2]) cs3Elem.textContent = info.branches[2].name;
    }
  }

  // Render TikTok Trends (Chỉ phát 1 video active duy nhất khi bấm chọn, tránh nặng 4G & giật lag)
  function renderTrends() {
    const grid = document.getElementById("trendsGrid");
    if (!grid || typeof DREAM_MOTO_DATA === 'undefined') return;

    grid.innerHTML = DREAM_MOTO_DATA.trends.map((t, idx) => `
      <div class="trend-card ${t.gradientClass} ${idx === 0 ? 'active' : ''}" id="card-${t.id}" onclick="selectTrendCard('${t.id}')">
        <span class="trend-badge">${t.badge}</span>
        
        <!-- Background Media Preview -->
        <div class="trend-video-wrapper">
          ${t.videoUrl ? `
            <video class="trend-video-elem" id="vid-${t.id}" ${idx === 0 ? 'autoplay' : ''} loop muted playsinline>
              <source src="${t.videoUrl}" type="video/mp4">
            </video>
          ` : ''}
          <div class="trend-video-overlay"></div>
        </div>

        <div class="trend-card-content">
          <span class="trend-style">${t.style}</span>
          <h3 class="trend-title">${t.title}</h3>
          <p class="trend-desc">${t.desc}</p>
          <div class="trend-card-footer">
            <span class="trend-views"><i class="fa-solid fa-fire text-gold"></i> ${t.views}</span>
            <button class="btn-select-trend">
              <i class="fa-solid fa-play"></i> Xem Trend
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  window.selectTrendCard = function(trendId) {
    document.querySelectorAll('.trend-card').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.trend-video-elem').forEach(v => {
      v.pause();
    });

    const activeCard = document.getElementById(`card-${trendId}`);
    const activeVid = document.getElementById(`vid-${trendId}`);

    if (activeCard) activeCard.classList.add('active');
    if (activeVid) {
      activeVid.play().catch(()=>{});
    }
  };

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
  module.exports = { calculatePrice, generateZaloLink, getShopConfig };
}
