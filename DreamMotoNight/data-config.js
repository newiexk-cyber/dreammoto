/**
 * DREAM MOTO NIGHT RIDE - CẤU HÌNH DỮ LIỆU TĨNH (DATA CONFIGURATION)
 * 
 * ĐÂY LÀ KHU VỰC QUẢN LÝ NỘI DUNG CỦA WEBSITE:
 * Bạn hoặc nhân viên có thể thay đổi Tiêu đề Hero, Mô tả, Các Dịch Vụ Dream Moto, 
 * Thông tin Liên hệ, Hệ thống Chi nhánh, Hotline, Địa chỉ, link video, hình ảnh, thông tin biker & bảng giá dễ dàng.
 */

const DREAM_MOTO_DATA = {
  // 1. THÔNG TIN CHUNG, HERO BANNER & HỆ THỐNG CHI NHÁNH / FOOTER CREDIT
  shopInfo: {
    name: "Dream Moto Sài Gòn",
    zaloPhone: "0900000000",
    spotLocation: "Cầu Ba Son - Thủ Thiêm",
    announcementText: "⚡ <strong>HOT:</strong> Tối nay chỉ còn <span class=\"highlight-badge\">3 slot trống</span> tại Cầu Ba Son! Đặt lịch ngay để giữ giờ đẹp.",
    
    // Tiêu Đề & Mô Tả Hero Banner
    heroTitle: "CHỞ KHÁCH NGẮM CẢNH & QUAY VIDEO MÔ TÔ ĐÊM TẠI CẦU BA SON",
    heroSubtitle: "Trải nghiệm cảm giác vi vu mô tô phân khối lớn lướt qua ánh đèn lung linh Cầu Ba Son & Landmark 81. Sở hữu ngay video 4K chất lượng chuẩn TikTok viral!",
    
    // Thông Tin Liên Hệ & Footer Credit 3 Cột
    footerBio: "Chụp lại ước mơ và lưu giữ từng khoảnh khắc vi vu đêm rực rỡ trọn vẹn của bạn. Dịch vụ quay video mô tô 4K nghệ thuật chỉn chu, tận tâm và chuyên nghiệp hàng đầu.",
    websiteUrl: "https://dreammoto.vn",
    tiktokId: "Dreammoto.vn",
    hotline: "0908 447 308",
    email: "contact@dreammoto.vn",
    zaloOaText: "Nhắn tin qua Zalo OA",
    address: "214/19/21 Nguyễn Văn Nguyễn, P. Tân Định, Q. 1, TP.HCM",
    
    // Danh sách Hệ thống Chi nhánh / Điểm đón
    branches: [
      { id: "cs1", name: "CS Quận 1: 214/19/21 Nguyễn Văn Nguyễn, P. Tân Định, Q. 1, TP.HCM" }
    ],

    // 3 Con Số Thống Kê Nổi Bật
    stats: [
      { number: "500+", text: "Khách Đã Trải Nghiệm" },
      { number: "10M+", text: "Lượt View TikTok" },
      { number: "4.9/5 ⭐", text: "Đánh Giá Hài Lòng" }
    ],

    defaultSlot: "21:30",
    heroVideoUrl: "https://assets.mixkit.co/videos/preview/mixkit-top-view-of-motorcycles-driving-on-a-highway-41551-large.mp4",
    realtimeBucketId: "6a7d6d84f5f4af5e290fc5b9",
    realtimeSyncUrl: "https://api.jsonbin.io/v3/b/6a7d6d84f5f4af5e290fc5b9/latest",
    cloudProvider: "jsonbin",
    realtimeApiKey: "$2a$10$Mmh6NI6dUk94/7tUva9OoOyXilXqCovJO3UBZx4KQYWk2r1YljDWe"
  },


  // 2. CÁC DỊCH VỤ DREAM MOTO (CHUẨN THEO WEBSITE CHÍNH THỨC DREAMMOTO.VN)
  servicesShowcase: [
    {
      id: "service-1",
      num: "# 1",
      title: "Dịch Vụ Rước Cờ Quảng Bá",
      desc: "Biến lời chúc, hình ảnh hoặc thương hiệu của bạn thành tâm điểm giữa phố đêm Sài Gòn.",
      features: [
        "Thiết kế & in cờ theo yêu cầu",
        "Moto rước cờ diễu hành trên đường phố",
        "Phù hợp sinh nhật, cầu hôn & kỷ niệm",
        "Nhận quảng bá thương hiệu & sự kiện",
        "Có quay video hành trình làm kỷ niệm"
      ],
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-top-view-of-motorcycles-driving-on-a-highway-41551-large.mp4"
    },
    {
      id: "service-2",
      num: "# 2",
      title: "Dịch Vụ Chở Khách & Quay Video 4K Mô Tô Đêm",
      desc: "Trải nghiệm cảm giác vi vu mô tô phân khối lớn lướt qua ánh đèn lung linh Cầu Ba Son & Landmark 81.",
      features: [
        "Tài xế Biker chuyên nghiệp, lái xe an toàn",
        "Góc quay tracking bám đuổi & slow-motion triệu views",
        "Quay video 4K chất lượng phim điện ảnh",
        "Nhận trọn bộ file gốc HD ngay sau buổi quay",
        "Tặng 10 ảnh chỉnh sửa màu Cyberpunk sắc nét"
      ],
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-cyclist-riding-a-bicycle-on-a-city-street-at-night-42867-large.mp4"
    },
    {
      id: "service-3",
      num: "# 3",
      title: "Hộ Tống & Diễu Hành Đoàn Mô Tô Sự Kiện",
      desc: "Tổ chức rước đoàn mô tô phân khối lớn, hộ tống sự kiện, quay phim quảng cáo thương hiệu chuyên nghiệp.",
      features: [
        "Đội ngũ xe PKL đông đảo (Z1000, BMW S1000RR, Ducati)",
        "Hộ tống & diễu hành theo lộ trình yêu cầu",
        "Ekip quay phim góc cao Flycam / Drone",
        "Phù hợp khai trương, ra mắt sản phẩm & Roadshow",
        "Hỗ trợ xin phép & đảm bảo an toàn lộ trình"
      ],
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-motorcycle-rider-driving-fast-on-the-highway-41552-large.mp4"
    },
    {
      id: "service-4",
      num: "# 4",
      title: "Cho Thuê Trang Phục & Nón Fullface Chụp Ảnh",
      desc: "Trang bị đầy đủ mũ bảo hiểm fullface cao cấp (AGV, Shoei) và áo khoác da chất chơi để lên hình đẹp nhất.",
      features: [
        "Nón bảo hiểm fullface cao cấp nhiều mẫu mã",
        "Áo khoác da Biker chuyên nghiệp hợp thời trang",
        "Găng tay, bảo hộ đầy đủ đi kèm",
        "Hỗ trợ chỉnh sửa trang phục chuẩn gu trước khi bấm máy"
      ],
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-motorcyclist-putting-on-leather-gloves-41555-large.mp4"
    },
    {
      id: "service-5",
      num: "# 5",
      title: "Thiết Kế Tour Đêm Sài Gòn Theo Yêu Cầu",
      desc: "Lựa chọn các cung đường đẹp nhất như Cầu Ba Son, hầm Thủ Thiêm, bến Bạch Đằng hoặc Landmark 81.",
      features: [
        "Thiết kế lộ trình riêng theo sở thích cá nhân",
        "Dừng chân chụp hình tại các điểm check-in nổi tiếng",
        "Chủ động thời gian xuất phát và kết thúc",
        "Có xe dẫn đoàn bảo đảm lộ trình thông suốt"
      ],
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-car-driving-on-a-street-with-neon-lights-at-night-42871-large.mp4"
    }
  ],

  // 3. DANH SÁCH 3 GÓC QUAY HUYỀN THOẠI CẦU BA SON (SPOT MAP)
  spots: [
    {
      id: "spot-1",
      title: "1. Đỉnh Cầu Ba Son",
      desc: "Góc view trực diện tháp Landmark 81 rực rỡ và tòa tháp Bitexco đằng xa. Nơi tạo nên các bản slow-motion triệu views.",
      icon: "fa-bridge",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-top-view-of-motorcycles-driving-on-a-highway-41551-large.mp4"
    },
    {
      id: "spot-2",
      title: "2. Chân Cầu Bến Bạch Đằng",
      desc: "Ánh đèn phản chiếu mặt sông Sài Gòn cùng làn gió mát rượi. Lý tưởng cho phong cách Chill & Romantic.",
      icon: "fa-water",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-cyclist-riding-a-bicycle-on-a-city-street-at-night-42867-large.mp4"
    },
    {
      id: "spot-3",
      title: "3. Đại Lộ Thủ Thiêm Đêm",
      desc: "Đường rộng thoáng, ánh đèn đường chạy dài tắp tắp. Hoàn hảo để xe tăng tốc lướt gió và tạo hiệu ứng vệt sáng light trails.",
      icon: "fa-road",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-fast-driving-on-a-highway-at-night-42872-large.mp4"
    }
  ],

  // 4. DANH SÁCH ĐỘI NGŨ BIKERS
  bikers: [
    {
      id: "biker-tuan",
      name: "Rider Tuấn Motor",
      role: "Captain & Chuyên Gia Phân Khối Lớn",
      expBadge: "6 Năm PKL",
      statusClass: "",
      ringColorClass: "",
      iconClass: "",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-top-view-of-motorcycles-driving-on-a-highway-41551-large.mp4",
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
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-motorcycle-rider-driving-fast-on-the-highway-41552-large.mp4",
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
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-car-driving-on-a-street-with-neon-lights-at-night-42871-large.mp4",
      bio: "Thân thiện, lịch sự và cực kỳ tâm lý với khách nữ & các cặp đôi. Xe Ducati Panigale đỏ nổi bật nhất Cầu Ba Son đêm.",
      tags: [
        { icon: "fa-motorcycle", text: "Ducati Panigale" },
        { icon: "fa-star text-gold", text: "4.9/5 (150+ Lượt)" },
        { icon: "fa-users", text: "Couple Favorite" }
      ]
    }
  ],

  // 5. DANH SÁCH DÒNG XE & PHỤ PHÍ
  bikes: [
    { id: "z1000", name: "Kawasaki Z1000", extraPrice: 0, sub: "Naked Bike hầm hố, tiếng pô gầm vang" },
    { id: "s1000rr", name: "BMW S1000RR", extraPrice: 50000, sub: "Superbike cá mập kiệt tác công nghệ (+50k)" },
    { id: "ducati", name: "Ducati Panigale V4", extraPrice: 50000, sub: "Đỏ Italia sang chảnh, thần thái cá tính (+50k)" },
    { id: "harley", name: "Harley-Davidson Custom", extraPrice: 100000, sub: "Phong cách Đô trưởng ngầu chất (+100k)" }
  ],

  // 6. DANH SÁCH GÓI DỊCH VỤ & GIÁ
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
