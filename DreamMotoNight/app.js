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

function generateZaloBookingText(bikeName, serviceName, slotTime, totalPrice, bikerName) {
  const cfg = getShopConfig();
  const formattedPrice = totalPrice.toLocaleString('vi-VN') + "đ";

  const helmetAddon = document.getElementById("addonHelmet");
  const jacketAddon = document.getElementById("addonJacket");
  const addons = [];
  if (helmetAddon && helmetAddon.checked) addons.push("Nón Fullface AGV/Shoei (+30k)");
  if (jacketAddon && jacketAddon.checked) addons.push("Áo khoác da Biker Style (+50k)");
  const addonText = addons.length > 0 ? addons.join(", ") : "Không có";

  return `🏍️ ĐẶT LỊCH VI VU MÔ TÔ ĐÊM SÀI GÒN - DREAM MOTO 🏍️
-----------------------------------
▪ Dòng xe chọn: ${bikeName}
▪ Gói dịch vụ: ${serviceName}
▪ Biker đồng hành: ${bikerName || 'Rider Tuấn Motor'}
▪ Khung giờ chọn: ${slotTime || '21:30'} Đêm nay
▪ Phụ kiện kèm: ${addonText}
▪ Tổng chi phí dự kiến: ${formattedPrice}
-----------------------------------
📌 Điểm đón: ${cfg.spotLocation || 'Cầu Ba Son'} (${cfg.address || '214/19/21 Nguyễn Văn Nguyễn, Q.1'})
Tôi muốn đặt lịch giờ này, shop tư vấn giữ chỗ cho tôi nhé!`;
}

function generateZaloLink(bikeName, serviceName, slotTime, totalPrice, bikerName) {
  const cfg = getShopConfig();
  const message = generateZaloBookingText(bikeName, serviceName, slotTime, totalPrice, bikerName);
  const cleanPhone = (cfg.hotline || cfg.zaloPhone || "0908447308").replace(/[^0-9]/g, '');
  return `https://zalo.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
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

  // Update Zalo deep link (Tự động nạp sẵn 100% nội dung vào ô chat Zalo, mở ra bấm Gửi ngay!)
  if (zaloBtn) {
    const bookingMsg = generateZaloBookingText(selectedBike.name, selectedService.name, selectedSlot, totalPrice, selectedBiker);
    const cfg = getShopConfig();
    const cleanPhone = (cfg.hotline || cfg.zaloPhone || "0908447308").replace(/[^0-9]/g, '');
    zaloBtn.href = `https://zalo.me/${cleanPhone}?text=${encodeURIComponent(bookingMsg)}`;
    zaloBtn.target = "_blank";
    zaloBtn.onclick = null;
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

function initBikerQuickSelect() {
  const bikerButtons = document.querySelectorAll(".btn-select-biker");
  bikerButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const card = btn.closest(".biker-card");
      if (card) {
        const nameElem = card.querySelector("h3");
        if (nameElem) {
          selectBikerInCalc(nameElem.innerText.trim());
        }
      }
    });
  });
}

// Cyberpunk Video Lightbox Engine
function openVideoModal(videoUrl, caption) {
  const modal = document.getElementById("videoModal");
  const player = document.getElementById("modalVideoPlayer");
  const captionElem = document.getElementById("modalVideoCaption");

  if (!modal || !player) return;

  player.src = videoUrl;
  if (captionElem) captionElem.innerText = caption || "Preview Clip Dream Moto";

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  player.play().catch(() => { });
}

function closeVideoModal() {
  const modal = document.getElementById("videoModal");
  const player = document.getElementById("modalVideoPlayer");

  if (!modal || !player) return;

  player.pause();
  player.src = "";
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
}

function initVideoModal() {
  const modal = document.getElementById("videoModal");
  if (!modal) return;

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeVideoModal();
    }
  });
}

function creditWebsite() {
  const cfg = getShopConfig();
  return cfg.websiteUrl || "https://dreammoto.vn";
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

// Dynamic UI Renderers for Realtime Sync
function applyShopInfo() {
  if (typeof DREAM_MOTO_DATA === 'undefined' || !DREAM_MOTO_DATA.shopInfo) return;
  const info = DREAM_MOTO_DATA.shopInfo;

  // Announcement Bar
  const announceText = document.querySelector(".announcement-text");
  if (announceText && info.announcementText) announceText.innerHTML = info.announcementText;

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
    if (cs2Elem) cs2Elem.style.display = info.branches[1] ? 'inline' : 'none';
    if (cs3Elem) cs3Elem.style.display = info.branches[2] ? 'inline' : 'none';
  }
}

function renderBikers() {
  const container = document.getElementById("bikersGrid");
  if (!container || typeof DREAM_MOTO_DATA === 'undefined' || !DREAM_MOTO_DATA.bikers) return;

  container.innerHTML = DREAM_MOTO_DATA.bikers.map(b => `
    <div class="biker-card">
      <div class="biker-header">
        <div class="biker-avatar-box">
          <div class="biker-avatar-ring ${b.ringColorClass || ''}"></div>
          <div class="biker-avatar-icon ${b.iconClass || ''}"><i class="fa-solid fa-user-ninja"></i></div>
        </div>
        <div class="biker-status ${b.statusClass || ''}"><i class="fa-solid fa-shield-halved"></i> ${b.expBadge || 'PKL Biker'}</div>
      </div>
      <div class="biker-body">
        <h3>${b.name}</h3>
        <span class="biker-role">${b.role}</span>
        <p class="biker-bio">${b.bio}</p>
        
        <div class="biker-tags">
          ${(b.tags || []).map(t => `
            <span class="biker-tag"><i class="fa-solid ${t.icon || 'fa-motorcycle'}"></i> ${t.text}</span>
          `).join('')}
        </div>
      </div>
      <div class="biker-footer">
        <button class="btn-select-biker">
          <i class="fa-solid fa-check"></i> Chọn Đồng Hành Với ${b.name.replace("Rider ", "")}
        </button>
      </div>
    </div>
  `).join('');

  initBikerQuickSelect();
}

function renderBikesInCalc() {
  const container = document.getElementById("bikeOptions");
  if (!container || typeof DREAM_MOTO_DATA === 'undefined' || !DREAM_MOTO_DATA.bikes) return;

  container.innerHTML = DREAM_MOTO_DATA.bikes.map((bk, idx) => `
    <div class="option-card ${idx === 0 ? 'active' : ''}" data-type="bike" data-value="${bk.id}" data-price="${bk.extraPrice}">
      <div class="opt-name">${bk.name}</div>
      <div class="opt-sub">${bk.sub}</div>
    </div>
  `).join('');

  const bikeOptions = container.querySelectorAll('.option-card');
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

  if (DREAM_MOTO_DATA.bikes[0]) {
    selectedBike = { name: DREAM_MOTO_DATA.bikes[0].name, extraPrice: DREAM_MOTO_DATA.bikes[0].extraPrice };
  }
}

function renderServicesInCalc() {
  const container = document.getElementById("serviceOptions");
  if (!container || typeof DREAM_MOTO_DATA === 'undefined' || !DREAM_MOTO_DATA.services) return;

  container.innerHTML = DREAM_MOTO_DATA.services.map((s, idx) => `
    <div class="option-card ${idx === 0 ? 'active' : ''}" data-type="service" data-value="${s.id}" data-price="${s.price}">
      ${s.isPopular ? `<div class="opt-badge">KHUYÊN DÙNG</div>` : ''}
      <div class="opt-name">${s.name}</div>
      <div class="opt-price">${s.price.toLocaleString('vi-VN')}đ</div>
      <div class="opt-sub">${s.sub}</div>
    </div>
  `).join('');

  const serviceOptions = container.querySelectorAll('.option-card');
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

  if (DREAM_MOTO_DATA.services[0]) {
    selectedService = { name: DREAM_MOTO_DATA.services[0].name, price: DREAM_MOTO_DATA.services[0].price };
  }
}

async function syncRealtimeData() {
  if (typeof DREAM_MOTO_DATA === 'undefined' || !DREAM_MOTO_DATA.shopInfo) return;
  const syncUrl = DREAM_MOTO_DATA.shopInfo.realtimeSyncUrl;
  if (!syncUrl) return;

  try {
    const res = await fetch(syncUrl);
    if (!res.ok) throw new Error("Fetch failed");
    const remoteData = await res.json();

    if (remoteData && remoteData.shopInfo) {
      DREAM_MOTO_DATA.shopInfo = remoteData.shopInfo;
      if (remoteData.servicesShowcase) DREAM_MOTO_DATA.servicesShowcase = remoteData.servicesShowcase;
      if (remoteData.spots) DREAM_MOTO_DATA.spots = remoteData.spots;
      if (remoteData.bikers) DREAM_MOTO_DATA.bikers = remoteData.bikers;
      if (remoteData.bikes) DREAM_MOTO_DATA.bikes = remoteData.bikes;
      if (remoteData.services) DREAM_MOTO_DATA.services = remoteData.services;

      console.log("⚡ Realtime Sync: Dynamic config loaded from cloud!");

      applyShopInfo();
      renderBikers();
      renderBikesInCalc();
      renderServicesInCalc();
      if (typeof renderServicesShowcase === 'function') renderServicesShowcase();
      updatePrice();
    }
  } catch (err) {
    console.warn("⚠️ Fallback: Could not sync realtime data, using local static data-config.js:", err);
  }
}

// Render CÁC DỊCH VỤ DREAM MOTO (Chuẩn theo website dreammoto.vn)
function renderServicesShowcase() {
  const container = document.getElementById("servicesShowcaseList");
  if (!container) return;

  const list = (typeof DREAM_MOTO_DATA !== 'undefined' && DREAM_MOTO_DATA.servicesShowcase)
    ? DREAM_MOTO_DATA.servicesShowcase
    : [];

  container.innerHTML = list.map((srv, idx) => `
  <div class="service-showcase-card">
    <div class="service-media-side">
      <video autoplay loop muted playsinline controls class="service-video-player">
        <source src="${srv.videoUrl}" type="video/mp4">
      </video>
    </div>
    <div class="service-text-side">
      <div class="service-num">${srv.num || `# ${idx + 1}`}</div>
      <h3 class="service-item-title">${srv.title}</h3>
      <p class="service-item-desc">${srv.desc}</p>
      <ul class="service-feature-checklist">
        ${(srv.features || []).map(feat => `
          <li><i class="fa-solid fa-check text-gold"></i> ${feat}</li>
        `).join("")}
      </ul>
      <a href="#calculator" class="btn btn-primary btn-glow btn-service-action">
        <i class="fa-solid fa-calendar-check"></i> TƯ VẤN & ĐẶT LỊCH
      </a>
    </div>
  </div>
`).join("");
}

// Initialize Event Listeners when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // Render initial static content instantly
  applyShopInfo();
  renderBikers();
  renderBikesInCalc();
  renderServicesInCalc();
  renderServicesShowcase();

  // Trigger async realtime sync from cloud
  syncRealtimeData();

  // FAQ Accordions
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(q => {
    q.addEventListener('click', () => {
      const parent = q.parentElement;
      parent.classList.toggle('active');
    });
  });

  // Initialize new interactive engines
  initBikerQuickSelect();
  initVideoModal();

  // Initial calculation
  updatePrice();
});

// Export functions for node/python testing if required
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { calculatePrice, generateZaloLink, getShopConfig };
}
