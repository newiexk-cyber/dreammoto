/**
 * DREAM MOTO NIGHT RIDE - CẤU HÌNH DỮ LIỆU TĨNH (DATA CONFIGURATION)
 * 
 * ĐÂY LÀ KHU VỰC QUẢN LÝ NỘI DUNG CỦA WEBSITE:
 * Bạn hoặc nhân viên chỉ cần chỉnh sửa, thêm bớt các dòng trong file này 
 * là Giao diện Website sẽ TỰ ĐỘNG CẬP NHẬT tương ứng!
 */

const DREAM_MOTO_DATA = {
  // 1. THÔNG TIN CHUNG, ZALO & VIDEO HERO BACKGROUND
  shopInfo: {
    name: "Dream Moto Sài Gòn",
    zaloPhone: "0900000000",
    spotLocation: "Cầu Ba Son - Thủ Thiêm",
    announcementText: "⚡ <strong>HOT:</strong> Tối nay chỉ còn <span class=\"highlight-badge\">3 slot trống</span> tại Cầu Ba Son! Đặt lịch ngay để giữ giờ đẹp.",
    defaultSlot: "21:30",
    // Video chạy nền Hero Banner (tự động lặp lại autoloop, giảm sáng 65% tôn chữ)
    heroVideoUrl: "https://assets.mixkit.co/videos/preview/mixkit-top-view-of-motorcycles-driving-on-a-highway-41551-large.mp4"
  },

  // 2. DANH SÁCH 5 HOT TRENDS TIKTOK (Thêm/Sửa/Xóa video tại đây)
  trends: [
    {
      id: "trend-1",
      title: "Slow-Motion Lướt Đêm Cầu Ba Son",
      style: "Cinematic Night Cruiser",
      badge: "HOT 1",
      views: "1.2M views",
      gradientClass: "gradient-1",
      desc: "Góc quay máy chuyên nghiệp, hiệu ứng màu mờ ảo huyền bí chuẩn phim điện ảnh."
    },
    {
      id: "trend-2",
      title: "Đồ Đôi Vi Vu Đêm Sài Gòn",
      style: "Couple Night City",
      badge: "POPULAR",
      views: "890K views",
      gradientClass: "gradient-2",
      desc: "Trải nghiệm cùng người yêu/bạn thân, ngắm trọn ánh đèn Landmark 81 từ góc tựa vai ngầu đét."
    },
    {
      id: "trend-3",
      title: "Vệt Sáng Đèn Đêm & Ánh Đèn Neon",
      style: "Cyberpunk Speed & Flare",
      badge: "CYBER",
      views: "650K views",
      gradientClass: "gradient-3",
      desc: "Hiệu ứng ánh sáng futuristic, tốc độ và đường chuyền màu bão hòa huyền ảo."
    },
    {
      id: "trend-4",
      title: "Góc Chân Thực Như Chính Bạn Lái",
      style: "POV Rider & Tracking",
      badge: "POV",
      views: "1.5M views",
      gradientClass: "gradient-4",
      desc: "Góc máy tracking bám đuổi song song & góc nhìn từ vai người ngồi sau đầy phấn khích."
    },
    {
      id: "trend-5",
      title: "Thần Thái Chủ Xe & Siêu Xe",
      style: "Solo Badass & Cool Pose",
      badge: "COOL",
      views: "720K views",
      gradientClass: "gradient-5",
      desc: "Quay tĩnh & động khoe trọn outfit, nón bảo hiểm cao cấp và dáng xe phân khối lớn."
    }
  ],

  // 3. DANH SÁCH ĐỘI NGŨ BIKERS (Thêm/Sửa Biker mới tại đây)
  bikers: [
    {
      id: "biker-tuan",
      name: "Rider Tuấn Motor",
      role: "Captain & Chuyên Gia Phân Khối Lớn",
      expBadge: "6 Năm PKL",
      statusClass: "",
      ringColorClass: "",
      iconClass: "",
      bio: "Kinh nghiệm lái Kawasaki Z1000 & BMW S1000RR lướt đêm. Kỹ năng hướng dẫn bạn góc đứng & góc ngồi chuẩn nam thần/mỹ nữ.",
      tags: [
        { icon: "fa-motorcycle", text: "Kawasaki Z1000" },
        { icon: "fa-star text-gold", text: "4.9/5 (210+ Lượt)" },
        { icon: "fa-video", text: "Edit TikTok Fast" }
      ]
    },
    {
      id: "biker-hoang",
      name: "Rider Hoàng Speed",
      role: "Đạo Diễn Góc Quay Slow-Mo & Tracking",
      expBadge: "Cameraman VIP",
      statusClass: "cyan-status",
      ringColorClass: "cyan-ring",
      iconClass: "cyan-bg",
      bio: "5 năm chinh phục các cung đường đêm Sài Gòn. Chuyên gia bắt trọn góc mặt thần thái & hiệu ứng vệt sáng Cyberpunk đỉnh cao.",
      tags: [
        { icon: "fa-motorcycle", text: "BMW S1000RR" },
        { icon: "fa-star text-gold", text: "5.0/5 (180+ Lượt)" },
        { icon: "fa-wand-magic-sparkles", text: "Color Colorist" }
      ]
    },
    {
      id: "biker-bao",
      name: "Rider Bảo Ducati",
      role: "Specialist Couple & Romantic Ride",
      expBadge: "Chuyên Gói Đôi",
      statusClass: "magenta-status",
      ringColorClass: "magenta-ring",
      iconClass: "magenta-bg",
      bio: "Thân thiện, lịch sự và cực kỳ tâm lý với khách nữ & các cặp đôi. Xe Ducati Panigale đỏ nổi bật nhất Cầu Ba Son đêm.",
      tags: [
        { icon: "fa-motorcycle", text: "Ducati Panigale" },
        { icon: "fa-star text-gold", text: "4.9/5 (150+ Lượt)" },
        { icon: "fa-users", text: "Couple Favorite" }
      ]
    }
  ],

  // 4. DANH SÁCH DÒNG XE & PHỤ PHÍ
  bikes: [
    { id: "z1000", name: "Kawasaki Z1000", extraPrice: 0, sub: "Naked Bike hầm hố, tiếng pô gầm vang" },
    { id: "s1000rr", name: "BMW S1000RR", extraPrice: 50000, sub: "Superbike cá mập kiệt tác công nghệ (+50k)" },
    { id: "ducati", name: "Ducati Panigale V4", extraPrice: 50000, sub: "Đỏ Italia sang chảnh, thần thái cá tính (+50k)" },
    { id: "harley", name: "Harley-Davidson Custom", extraPrice: 100000, sub: "Phong cách Đô trưởng ngầu chất (+100k)" }
  ],

  // 5. DANH SÁCH GÓI DỊCH VỤ & GIÁ
  services: [
    { id: "goi1", name: "Gói 1: TikTok Basic", price: 299000, isPopular: false, sub: "15s - 30s Video TikTok Edit chuẩn trend + Nhận file gốc ngay" },
    { id: "goi2", name: "Gói 2: 4K Cinematic VIP", price: 449000, isPopular: true, sub: "Video 4K Chỉnh Màu Chuyên Nghiệp + 10 Ảnh Chụp Đêm Chỉnh Sửa" },
    { id: "goi3", name: "Gói 3: Couple Night Special", price: 699000, isPopular: false, sub: "Dành cho 2 người (2 xe song song / chở đôi) + 2 Video Edit + Ảnh Đôi" }
  ]
};

// Export for node environment testing if present
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DREAM_MOTO_DATA };
}
