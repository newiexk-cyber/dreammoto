/**
 * Tiệm Ảnh Trái Thơm - Hệ thống Script giao diện và tính năng Concept nâng cao
 * Tác giả: NHATLAM
 * Chức năng: Tạo giao diện Landing Page chuyên nghiệp, lọc danh mục, xem album ảnh dạng Lightbox, đăng ký lịch tư vấn/chụp ảnh.
 */

(function () {
    // Cấu hình linh hoạt cho Webcake / Landing Page tĩnh
    const CONFIG = {
        webhookUrl: "", // Nhập link Webhook (Google Sheets, Pancake POS) để gửi data khách hàng
        redirectUrl: "", // Đường dẫn trang Cảm ơn nếu muốn chuyển hướng
        targetId: "w-naljqcdc", // ID phần tử trên Webcake để chèn giao diện
        // 🔑 ID của Google Sheet quản lý concept (nhân viên sửa tại đây)
        // Lấy từ URL: https://docs.google.com/spreadsheets/d/1Sv3pxheEfamWKTSY96vwzQOi8bXK_lqJ1wB_wnZefCU/edit?gid=43962598
        sheetId: "1Sv3pxheEfamWKTSY96vwzQOi8bXK_lqJ1wB_wnZefCU",
        sheetGid: "43962598", // GID tab sheet quản lý concept
        sheetName: "đồng bộ concept" // Tên tab sheet của bạn
    };

    // 1. Dữ liệu từng Concept cụ thể (mỗi card = 1 concept riêng biệt)
    const CONCEPTS = [
        // ─── NỮ TÍNH ───────────────────────────────────────────────
        {
            id: 1, title: "Nàng Thơ Hoa Đào", category: "nutinh",
            tag: "Nữ Tính", icon: "🌸", iconColor: "#ff758f", bgColor: "rgba(255,117,143,0.1)",
            images: [
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80",
                "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80",
                "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80",
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
                "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
                "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&q=80",
                "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
                "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
                "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&q=80"
            ],
            description: "Tôn vinh nét dịu dàng, trong trẻo của phái đẹp. Bối cảnh hoa anh đào rực rỡ, rèm trắng đón nắng mai nhẹ nhàng kết hợp váy lụa bồng bềnh giúp bạn hóa thân thành nàng thơ mộng."
        },
        {
            id: 2, title: "Tiên Nữ Mùa Hè", category: "nutinh",
            tag: "Nữ Tính", icon: "🌸", iconColor: "#ff758f", bgColor: "rgba(255,117,143,0.1)",
            images: [
                "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80",
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
                "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80",
                "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
                "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
                "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&q=80",
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
                "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
                "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&q=80"
            ],
            description: "Vẻ đẹp trong veo mùa hè với váy trắng, ánh nắng vàng và những đóa hoa dại khoe sắc. Concept nhẹ nhàng, tươi tắn và đầy sức sống."
        },
        {
            id: 3, title: "Áo Dài Phố Cổ", category: "nutinh",
            tag: "Nữ Tính", icon: "👗", iconColor: "#e6b800", bgColor: "rgba(230,184,0,0.1)",
            images: [
                "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?w=800&q=80",
                "https://images.unsplash.com/photo-1588001400947-6385aef4ab0e?w=400&q=80",
                "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=400&q=80",
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
                "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80",
                "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80",
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
                "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
                "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&q=80",
                "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80"
            ],
            description: "Tà áo dài thướt tha giữa những con phố rêu phong cổ kính, hoa giấy đỏ rực và đèn lồng lung linh — vẻ đẹp thuần Việt đầy hoài niệm."
        },
        {
            id: 4, title: "Cổ Trang Tiên Tử", category: "nutinh",
            tag: "Nữ Tính", icon: "🏮", iconColor: "#7209b7", bgColor: "rgba(114,9,183,0.1)",
            images: [
                "https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&q=80",
                "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=400&q=80",
                "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400&q=80",
                "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?w=400&q=80",
                "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=400&q=80",
                "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&q=80",
                "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=400&q=80",
                "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80",
                "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&q=80",
                "https://images.unsplash.com/photo-1472214222555-d4e5fbf4ea6e?w=400&q=80"
            ],
            description: "Hóa thân thành tiên tử chốn bồng lai với hán phục thêu họa tiết tỉ mỉ, trâm cài lấp lánh và quạt giấy cổ kính giữa không gian mây khói huyền ảo."
        },
        // ─── CÁ TÍNH ───────────────────────────────────────────────
        {
            id: 5, title: "Street Style Noir", category: "catinh",
            tag: "Cá Tính", icon: "⭐", iconColor: "#b5179e", bgColor: "rgba(181,23,158,0.1)",
            images: [
                "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
                "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&q=80",
                "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
                "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80",
                "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&q=80",
                "https://images.unsplash.com/photo-1496449903678-c8dd7459a22b?w=400&q=80",
                "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=400&q=80",
                "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&q=80",
                "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?w=400&q=80",
                "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&q=80"
            ],
            description: "Cool ngầu và phá cách giữa đường phố đêm. Trang phục da bóng bẩy, vest đen sắc sảo, makeup mắt khói cuốn hút — thể hiện trọn vẹn cá tính độc đáo của bạn."
        },
        {
            id: 6, title: "Punk & Edgy", category: "catinh",
            tag: "Cá Tính", icon: "⭐", iconColor: "#b5179e", bgColor: "rgba(181,23,158,0.1)",
            images: [
                "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
                "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&q=80",
                "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&q=80",
                "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&q=80",
                "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?w=400&q=80",
                "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&q=80",
                "https://images.unsplash.com/photo-1496449903678-c8dd7459a22b?w=400&q=80",
                "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&q=80",
                "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=400&q=80",
                "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80"
            ],
            description: "Phong cách Punk mạnh mẽ, nổi loạn với phụ kiện sắc bén, tóc sáng tạo và biểu cảm đầy nội lực. Dành cho người dám là chính mình."
        },
        {
            id: 7, title: "Noel Mùa Đông", category: "catinh",
            tag: "Cá Tính", icon: "🎄", iconColor: "#d62828", bgColor: "rgba(214,40,40,0.1)",
            images: [
                "https://images.unsplash.com/photo-1545048702-79362596cdc9?w=800&q=80",
                "https://images.unsplash.com/photo-1577043848358-4638accd988c?w=400&q=80",
                "https://images.unsplash.com/photo-1512474929763-f43c802e374c?w=400&q=80",
                "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&q=80",
                "https://images.unsplash.com/photo-1482862549707-f63cb32c5fd9?w=400&q=80",
                "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&q=80",
                "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=400&q=80",
                "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80",
                "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&q=80",
                "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&q=80"
            ],
            description: "Concept Noel ngập tràn sắc đỏ an lành. Cây thông lấp lánh, lò sưởi ấm cúng và mũ len xinh xắn tạo nên bức ảnh mùa Giáng Sinh đáng nhớ."
        },
        // ─── COUPLE ───────────────────────────────────────────────
        {
            id: 8, title: "Hoàng Hôn Đôi Lứa", category: "couple",
            tag: "Couple", icon: "💖", iconColor: "#ff477e", bgColor: "rgba(255,71,126,0.1)",
            images: [
                "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80",
                "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80",
                "https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?w=400&q=80",
                "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&q=80",
                "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=400&q=80",
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
                "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80",
                "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80",
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80"
            ],
            description: "Ghi lại những khoảnh khắc tình yêu tự nhiên, ấm áp dưới ánh hoàng hôn vàng rực. Từ cái nắm tay siết chặt đến những nụ cười không che giấu được."
        },
        {
            id: 9, title: "Café Tình Yêu", category: "couple",
            tag: "Couple", icon: "💖", iconColor: "#ff477e", bgColor: "rgba(255,71,126,0.1)",
            images: [
                "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
                "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&q=80",
                "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=400&q=80",
                "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&q=80",
                "https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?w=400&q=80",
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
                "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80",
                "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80"
            ],
            description: "Buổi hẹn nhẹ nhàng bên tách cà phê thơm nồng. Không gian quán nhỏ ấm cúng, ánh đèn vàng và bầu không khí riêng tư tạo nên những khoảnh khắc ngọt ngào."
        },
        {
            id: 10, title: "Tết Đoàn Viên", category: "couple",
            tag: "Couple", icon: "🧧", iconColor: "#e63946", bgColor: "rgba(230,57,70,0.1)",
            images: [
                "https://images.unsplash.com/photo-1610471926615-d4e5fbf4ea6e?w=800&q=80",
                "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&q=80",
                "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&q=80",
                "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=400&q=80",
                "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80",
                "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&q=80",
                "https://images.unsplash.com/photo-1472214222555-d4e5fbf4ea6e?w=400&q=80",
                "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&q=80",
                "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&q=80",
                "https://images.unsplash.com/photo-1500627869374-13cd993b1115?w=400&q=80"
            ],
            description: "Phông nền đỏ hoa đào rạng rỡ, lì xì may mắn, áo dài tân thời — couple đón Tết trong không gian truyền thống ấm áp và đầy tình yêu thương."
        },
        // ─── GIA ĐÌNH ───────────────────────────────────────────────
        {
            id: 11, title: "Gia Đình Hạnh Phúc", category: "giadinh",
            tag: "Gia Đình", icon: "🏠", iconColor: "#f77f00", bgColor: "rgba(247,127,0,0.1)",
            images: [
                "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=80",
                "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&q=80",
                "https://images.unsplash.com/photo-1542037104857-ffbe04840d67?w=400&q=80",
                "https://images.unsplash.com/photo-1581579438747-1dc8d1e0ca96?w=400&q=80",
                "https://images.unsplash.com/photo-1484665754804-74b091211472?w=400&q=80",
                "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&q=80",
                "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&q=80",
                "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=400&q=80",
                "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&q=80",
                "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80"
            ],
            description: "Những nụ cười hạnh phúc, cái ôm đầy yêu thương giữa các thành viên trong gia đình. Chụp tự nhiên, ghi lại những khoảnh khắc bình dị mà trân quý nhất."
        },
        {
            id: 12, title: "Picnic Gia Đình", category: "giadinh",
            tag: "Gia Đình", icon: "🏠", iconColor: "#f77f00", bgColor: "rgba(247,127,0,0.1)",
            images: [
                "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80",
                "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&q=80",
                "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80",
                "https://images.unsplash.com/photo-1542037104857-ffbe04840d67?w=400&q=80",
                "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=400&q=80",
                "https://images.unsplash.com/photo-1581579438747-1dc8d1e0ca96?w=400&q=80",
                "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&q=80",
                "https://images.unsplash.com/photo-1484665754804-74b091211472?w=400&q=80",
                "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&q=80",
                "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&q=80"
            ],
            description: "Cả nhà cùng picnic trên thảm cỏ xanh mướt dưới bầu trời trong xanh. Tấm chăn kẻ sọc, giỏ mây đựng đồ ăn và tiếng cười rộn ràng — khoảnh khắc bình yên tuyệt vời."
        },
        // ─── KỶ YẾU ───────────────────────────────────────────────
        {
            id: 13, title: "Kỷ Yếu Sân Trường", category: "kyyeu",
            tag: "Kỷ Yếu", icon: "🎓", iconColor: "#2a9d8f", bgColor: "rgba(42,157,143,0.1)",
            images: [
                "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
                "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&q=80",
                "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&q=80",
                "https://images.unsplash.com/photo-1525921429624-479b6c294a40?w=400&q=80",
                "https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?w=400&q=80",
                "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&q=80",
                "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&q=80",
                "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
                "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&q=80",
                "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80"
            ],
            description: "Lưu giữ khoảnh khắc thanh xuân rực rỡ dưới nắng sân trường. Áo đồng phục, mũ cử nhân, bóng bay rực rỡ — những khoảnh khắc cuối cấp không bao giờ quên."
        },
        {
            id: 14, title: "Kỷ Yếu Studio", category: "kyyeu",
            tag: "Kỷ Yếu", icon: "🎓", iconColor: "#2a9d8f", bgColor: "rgba(42,157,143,0.1)",
            images: [
                "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80",
                "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&q=80",
                "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&q=80",
                "https://images.unsplash.com/photo-1525921429624-479b6c294a40?w=400&q=80",
                "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=400&q=80",
                "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
                "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&q=80",
                "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&q=80",
                "https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?w=400&q=80",
                "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80"
            ],
            description: "Chân dung kỷ yếu chuyên nghiệp tại studio với ánh sáng được kiểm soát hoàn hảo. Ảnh rõ nét, màu sắc chân thực, tôn lên vẻ đẹp tự nhiên của từng bạn."
        },
        // ─── PROFILE ───────────────────────────────────────────────
        {
            id: 15, title: "Business Portrait", category: "profile",
            tag: "Profile", icon: "👤", iconColor: "#4361ee", bgColor: "rgba(67,97,238,0.1)",
            images: [
                "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80",
                "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
                "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
                "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
                "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80",
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
                "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80",
                "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80",
                "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&q=80"
            ],
            description: "Chân dung doanh nhân chuyên nghiệp, tự tin. Ánh sáng studio cao cấp tôn lên khí chất uy tín, phục vụ cho hồ sơ năng lực và thương hiệu cá nhân."
        },
        {
            id: 16, title: "Ngoại Cảnh Tự Nhiên", category: "profile",
            tag: "Profile", icon: "🍃", iconColor: "#4f772d", bgColor: "rgba(79,119,45,0.1)",
            images: [
                "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80",
                "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=400&q=80",
                "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=80",
                "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&q=80",
                "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&q=80",
                "https://images.unsplash.com/photo-1500627869374-13cd993b1115?w=400&q=80",
                "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80",
                "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80",
                "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&q=80",
                "https://images.unsplash.com/photo-1472214222555-d4e5fbf4ea6e?w=400&q=80"
            ],
            description: "Chân dung ngoại cảnh giữa thiên nhiên khoáng đạt. Đồi thông mộng mơ, cánh đồng hoa hay bờ hồ hoàng hôn mang lại vẻ đẹp lãng mạn và đầy sức sống."
        },
        {
            id: 17, title: "Studio Tối Giản", category: "profile",
            tag: "Profile", icon: "📷", iconColor: "#1d3557", bgColor: "rgba(29,53,87,0.1)",
            images: [
                "https://images.unsplash.com/photo-1554080353-a576cf803bda?w=800&q=80",
                "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&q=80",
                "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80",
                "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=400&q=80",
                "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=400&q=80",
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
                "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80",
                "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80",
                "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&q=80"
            ],
            description: "Chân dung nghệ thuật trên phông nền đơn sắc xám/đen/trắng. Tập trung vào đường nét khuôn mặt, biểu cảm tự nhiên và hiệu ứng ánh sáng chuyên sâu."
        }
    ];

    const STYLES = `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600;1,700&family=Be+Vietnam+Pro:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600&display=swap');

        :root {
            --tiemanh-font: 'Plus Jakarta Sans', 'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            --tiemanh-serif: 'Plus Jakarta Sans', 'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            --tiemanh-cursive: 'Plus Jakarta Sans', 'Be Vietnam Pro', sans-serif;
            
            --tiemanh-primary: #fbc02d;
            --tiemanh-primary-dark: #f9a825;
            --tiemanh-primary-light: #fff59d;
            
            --tiemanh-dark: #1e1e24;
            --tiemanh-dark-soft: #2d2d35;
            --tiemanh-bg: #fffbf0;
            --tiemanh-text: #3c3c43;
            --tiemanh-text-light: #7c7c8a;
            --tiemanh-white: #ffffff;
            
            --tiemanh-shadow-sm: 0 4px 10px rgba(0, 0, 0, 0.03);
            --tiemanh-shadow-md: 0 10px 30px rgba(0, 0, 0, 0.06);
            --tiemanh-shadow-lg: 0 20px 40px rgba(251, 192, 45, 0.15);
            --tiemanh-transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
            --tiemanh-border-radius: 16px;
        }

        #tiemanh-root,
        #tiemanh-root *,
        #tiemanh-root button,
        #tiemanh-root input,
        #tiemanh-root select,
        #tiemanh-root textarea,
        .tiemanh-lightbox-overlay,
        .tiemanh-lightbox-overlay *,
        .tiemanh-modal-overlay,
        .tiemanh-modal-overlay * {
            font-family: 'Plus Jakarta Sans', 'Be Vietnam Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        #tiemanh-root {
            background-color: var(--tiemanh-bg);
            color: var(--tiemanh-text);
            margin: 0;
            padding: 0;
            line-height: 1.6;
            min-height: 100vh;
            overflow-x: hidden;
            position: relative;
        }

        /* Lớp họa tiết lưới chấm studio mờ ảo nghệ thuật */
        .tiemanh-bg-pattern {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: radial-gradient(rgba(251, 192, 45, 0.25) 1.2px, transparent 1.2px);
            background-size: 30px 30px;
            pointer-events: none;
            z-index: 0;
            mask-image: radial-gradient(ellipse at 50% 30%, black 50%, transparent 90%);
            -webkit-mask-image: radial-gradient(ellipse at 50% 30%, black 50%, transparent 90%);
        }

        /* Các vệt sáng màu Mesh Gradient mềm mại trôi nổi sinh động */
        .tiemanh-bg-blob {
            position: absolute;
            border-radius: 50%;
            filter: blur(80px);
            opacity: 0.48;
            z-index: 0;
            pointer-events: none;
        }
        .tiemanh-bg-blob.yellow-top {
            width: 650px;
            height: 650px;
            background: radial-gradient(circle, #ffe082 0%, #ffca28 40%, rgba(255,202,40,0) 70%);
            top: -120px;
            left: -150px;
            animation: floatBlob1 16s infinite alternate ease-in-out;
        }
        .tiemanh-bg-blob.pink-right {
            width: 600px;
            height: 600px;
            background: radial-gradient(circle, #ff80ab 0%, #ff4081 40%, rgba(255,64,129,0) 70%);
            top: 40px;
            right: -120px;
            animation: floatBlob2 18s infinite alternate ease-in-out;
        }
        .tiemanh-bg-blob.peach-center {
            width: 550px;
            height: 550px;
            background: radial-gradient(circle, #ffcc80 0%, #ffa726 35%, rgba(255,167,38,0) 70%);
            top: 420px;
            left: 20%;
            animation: floatBlob3 20s infinite alternate ease-in-out;
        }
        .tiemanh-bg-blob.purple-bottom {
            width: 500px;
            height: 500px;
            background: radial-gradient(circle, #e1bee7 0%, #ba68c8 35%, rgba(186,104,200,0) 70%);
            top: 950px;
            right: 5%;
            animation: floatBlob1 22s infinite alternate ease-in-out;
        }

        @keyframes floatBlob1 {
            0% { transform: translate(0px, 0px) scale(1); }
            100% { transform: translate(60px, 40px) scale(1.15); }
        }
        @keyframes floatBlob2 {
            0% { transform: translate(0px, 0px) scale(1); }
            100% { transform: translate(-50px, 50px) scale(1.12); }
        }
        @keyframes floatBlob3 {
            0% { transform: translate(0px, 0px) scale(1); }
            100% { transform: translate(40px, -40px) scale(1.18); }
        }

        /* Các ngôi sao lấp lánh & bụi sáng nghệ thuật trôi trong không gian */
        .tiemanh-sparkle-item {
            position: absolute;
            color: #fbc02d;
            font-size: 18px;
            pointer-events: none;
            z-index: 1;
            opacity: 0.75;
            animation: sparkleGlow 4s infinite alternate ease-in-out;
        }
        .tiemanh-sparkle-item.s1 { top: 110px; left: 6%; font-size: 24px; animation-delay: 0s; color: #ffa000; }
        .tiemanh-sparkle-item.s2 { top: 160px; left: 40%; font-size: 18px; animation-delay: 1.2s; color: #ff4081; }
        .tiemanh-sparkle-item.s3 { top: 70px; right: 8%; font-size: 22px; animation-delay: 0.6s; color: #fbc02d; }
        .tiemanh-sparkle-item.s4 { top: 490px; left: 4%; font-size: 19px; animation-delay: 2.1s; color: #ff80ab; }
        .tiemanh-sparkle-item.s5 { top: 460px; right: 6%; font-size: 22px; animation-delay: 1.8s; color: #ffa726; }
        
        @keyframes sparkleGlow {
            0% { transform: scale(0.8) translateY(0px) rotate(0deg); opacity: 0.35; }
            50% { transform: scale(1.25) translateY(-10px) rotate(15deg); opacity: 0.95; }
            100% { transform: scale(0.9) translateY(-18px) rotate(30deg); opacity: 0.45; }
        }

        /* 1. Header (Navbar) */
        .tiemanh-navbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 18px 8%;
            background: rgba(255, 251, 240, 0.85);
            backdrop-filter: blur(15px);
            position: sticky;
            top: 0;
            z-index: 1000;
            border-bottom: 1px solid rgba(251, 192, 45, 0.15);
            transition: var(--tiemanh-transition);
        }
        .tiemanh-navbar.scrolled {
            padding: 12px 8%;
            box-shadow: var(--tiemanh-shadow-sm);
        }
        .tiemanh-logo {
            display: flex;
            align-items: center;
            gap: 12px;
            text-decoration: none;
            cursor: pointer;
        }
        .tiemanh-logo img, .tiemanh-logo-icon {
            width: 42px;
            height: 42px;
            filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
        }
        .tiemanh-logo-text {
            font-family: var(--tiemanh-serif);
            font-weight: 800;
            color: var(--tiemanh-dark);
            font-size: 22px;
            letter-spacing: -0.5px;
            display: flex;
            flex-direction: column;
            line-height: 1.1;
        }
        .tiemanh-logo-sub {
            font-family: var(--tiemanh-font);
            font-size: 11px;
            color: var(--tiemanh-primary-dark);
            letter-spacing: 2px;
            text-transform: uppercase;
            font-weight: 600;
        }
        .tiemanh-menu {
            display: flex;
            gap: 32px;
            list-style: none;
            margin: 0;
            padding: 0;
        }
        .tiemanh-menu-item a {
            text-decoration: none;
            color: var(--tiemanh-dark);
            font-weight: 600;
            font-size: 14.5px;
            letter-spacing: 0.5px;
            transition: var(--tiemanh-transition);
            position: relative;
            padding: 6px 0;
        }
        .tiemanh-menu-item a::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 3px;
            background-color: var(--tiemanh-primary);
            border-radius: 2px;
            transition: var(--tiemanh-transition);
        }
        .tiemanh-menu-item.active a, .tiemanh-menu-item a:hover {
            color: var(--tiemanh-primary-dark);
        }
        .tiemanh-menu-item.active a::after {
            width: 100%;
        }
        .tiemanh-btn-primary {
            background: linear-gradient(135deg, var(--tiemanh-primary), #ffb300);
            color: var(--tiemanh-dark) !important;
            border: none;
            border-radius: 30px;
            padding: 11px 24px;
            font-weight: 700;
            font-size: 14px;
            letter-spacing: 0.5px;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            cursor: pointer;
            box-shadow: 0 6px 16px rgba(251, 192, 45, 0.25);
            transition: var(--tiemanh-transition);
            text-decoration: none;
        }
        .tiemanh-btn-primary:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(251, 192, 45, 0.4);
        }
        .tiemanh-btn-primary:active {
            transform: translateY(-1px);
        }

        /* 2. Hero Section */
        .tiemanh-hero {
            display: grid;
            grid-template-columns: 1fr 1.35fr;
            gap: 50px;
            align-items: center;
            padding: 60px 6% 75px 6%;
            background: transparent;
            position: relative;
            z-index: 1;
        }
        .tiemanh-hero::after {
            content: '';
            position: absolute;
            width: 180px;
            height: 180px;
            background: radial-gradient(circle, rgba(255, 235, 59, 0.25) 0%, rgba(255, 255, 255, 0) 70%);
            top: 20%;
            left: 5%;
            pointer-events: none;
        }
        .tiemanh-hero-left {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        .tiemanh-hero-slogan-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: linear-gradient(135deg, #fffbeb, #fef3c7);
            color: #b45309;
            font-size: 13px;
            font-weight: 800;
            padding: 7px 18px;
            border-radius: 50px;
            letter-spacing: 0.5px;
            border: 1px solid rgba(245, 158, 11, 0.35);
            box-shadow: 0 4px 12px rgba(251, 192, 45, 0.2);
            width: fit-content;
        }
        .tiemanh-hero-subtitle {
            font-family: var(--tiemanh-font);
            font-size: 16px;
            font-weight: 700;
            color: var(--tiemanh-primary-dark);
            margin: 0;
            text-transform: uppercase;
            letter-spacing: 2.5px;
            line-height: 1.2;
        }
        .tiemanh-hero-title {
            font-family: var(--tiemanh-serif);
            font-size: 62px;
            font-weight: 900;
            line-height: 1.1;
            background: linear-gradient(135deg, #4a1525 0%, #c2185b 50%, #ffa000 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin: 0;
            letter-spacing: -2px;
            text-transform: uppercase;
        }
        .tiemanh-hero-desc {
            font-size: 16px;
            color: var(--tiemanh-text-light);
            margin: 0;
            max-width: 520px;
            line-height: 1.7;
        }
        .tiemanh-hero-btns {
            display: flex;
            gap: 16px;
            margin-top: 10px;
            flex-wrap: wrap;
        }
        .tiemanh-btn-secondary {
            background: rgba(255, 255, 255, 0.95);
            color: var(--tiemanh-dark) !important;
            border: 1.5px solid rgba(251, 192, 45, 0.45);
            border-radius: 30px;
            padding: 11px 24px;
            font-weight: 700;
            font-size: 14px;
            letter-spacing: 0.3px;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.04);
            backdrop-filter: blur(8px);
            transition: var(--tiemanh-transition);
            text-decoration: none;
        }
        .tiemanh-btn-secondary:hover {
            background: #ffffff;
            border-color: var(--tiemanh-primary-dark);
            color: var(--tiemanh-primary-dark) !important;
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(251, 192, 45, 0.3);
        }
        .tiemanh-btn-secondary:active {
            transform: translateY(-1px);
        }

        /* Khung hiển thị bộ 3 Concept Hot Trending cao cấp */
        .tiemanh-hero-right {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
        }
        .tiemanh-hot-showcase {
            opacity: 0;
            background: linear-gradient(145deg, rgba(255, 255, 255, 0.98), rgba(255, 251, 235, 0.94));
            border: 2px solid rgba(251, 192, 45, 0.5);
            border-radius: 28px;
            padding: 26px 24px 24px 24px;
            box-shadow: 
                0 25px 60px rgba(251, 192, 45, 0.22),
                0 8px 25px rgba(0, 0, 0, 0.04),
                0 0 0 1px rgba(255, 255, 255, 0.9) inset;
            width: 100%;
            backdrop-filter: blur(12px);
            position: relative;
            box-sizing: border-box;
            transition: box-shadow 0.4s ease, border-color 0.4s ease, opacity 0.4s ease-in-out;
        }
        .tiemanh-hot-showcase.loaded {
            opacity: 1;
        }
        .tiemanh-hot-showcase:hover {
            box-shadow: 
                0 30px 70px rgba(251, 192, 45, 0.28),
                0 10px 30px rgba(0, 0, 0, 0.06);
            border-color: rgba(251, 192, 45, 0.7);
        }
        .hot-showcase-header {
            text-align: center;
            margin-bottom: 22px;
        }
        .hot-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: linear-gradient(135deg, #e65100 0%, #ff9800 100%);
            color: #ffffff;
            font-size: 12px;
            font-weight: 800;
            padding: 6px 18px;
            border-radius: 50px;
            letter-spacing: 1px;
            text-transform: uppercase;
            box-shadow: 0 4px 14px rgba(230, 81, 0, 0.35);
            margin-bottom: 8px;
            animation: pulseGlow 2.5s infinite alternate ease-in-out;
        }
        @keyframes pulseGlow {
            0% { transform: scale(1); box-shadow: 0 4px 14px rgba(230, 81, 0, 0.35); }
            100% { transform: scale(1.05); box-shadow: 0 6px 22px rgba(230, 81, 0, 0.55); }
        }
        .hot-showcase-title {
            font-family: var(--tiemanh-serif);
            font-size: 23px;
            font-weight: 800;
            color: var(--tiemanh-dark);
            margin: 0;
            letter-spacing: 0.5px;
        }
        .hot-concepts-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 18px;
            width: 100%;
        }
        .polaroid-card {
            background: #ffffff;
            padding: 12px 12px 16px 12px;
            border-radius: 18px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
            border: 1.5px solid rgba(251, 192, 45, 0.25);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            cursor: pointer;
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            overflow: hidden;
            width: 100%;
            box-sizing: border-box;
        }
        
        /* Hiệu ứng bồng bềnh so le nhẹ nhàng, nhịp điệu sinh động */
        .polaroid-card.p1 {
            animation: gentleFloat1 5s infinite alternate ease-in-out;
        }
        .polaroid-card.p2 {
            animation: gentleFloat2 5.6s infinite alternate ease-in-out 0.4s;
        }
        .polaroid-card.p3 {
            animation: gentleFloat3 5.2s infinite alternate ease-in-out 0.8s;
        }
        
        @keyframes gentleFloat1 {
            0% { transform: translateY(0px); }
            100% { transform: translateY(-7px); }
        }
        @keyframes gentleFloat2 {
            0% { transform: translateY(0px); }
            100% { transform: translateY(-10px); }
        }
        @keyframes gentleFloat3 {
            0% { transform: translateY(0px); }
            100% { transform: translateY(-6px); }
        }

        .polaroid-card img {
            width: 100%;
            aspect-ratio: 9 / 16;
            height: auto;
            object-fit: cover;
            border-radius: 12px;
            border: 1px solid rgba(0, 0, 0, 0.04);
            transition: transform 0.45s ease;
        }
        .polaroid-card:hover img {
            transform: scale(1.07);
        }
        .polaroid-caption {
            font-family: var(--tiemanh-font);
            font-weight: 800;
            font-size: 14px;
            text-align: center;
            margin-top: 12px;
            color: var(--tiemanh-dark);
            letter-spacing: 0.5px;
            text-transform: uppercase;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 100%;
            box-sizing: border-box;
            transition: color 0.3s ease;
        }
        .polaroid-caption::after {
            content: '✨ Xem album ➔';
            display: block;
            font-size: 11px;
            font-weight: 600;
            color: var(--tiemanh-primary-dark);
            text-transform: none;
            letter-spacing: 0;
            margin-top: 3px;
            opacity: 0.9;
            transition: transform 0.3s ease, color 0.3s ease;
        }
        
        /* Hiệu ứng khi rê chuột (Hover) */
        .polaroid-card:hover {
            animation: none !important;
            transform: translateY(-12px) scale(1.04) !important;
            box-shadow: 0 20px 45px rgba(251, 192, 45, 0.45), 0 8px 20px rgba(0, 0, 0, 0.08) !important;
            border-color: rgba(251, 192, 45, 0.95);
            z-index: 10;
        }
        .polaroid-card:hover .polaroid-caption {
            color: var(--tiemanh-primary-dark);
        }
        .polaroid-card:hover .polaroid-caption::after {
            transform: translateX(3px);
            color: #d84315;
        }

        /* Hiệu ứng Skeleton Loading sang trọng khi đang tải dữ liệu Google Sheets */
        .polaroid-card.loading-skeleton {
            pointer-events: none;
            border-color: rgba(251, 192, 45, 0.2);
            background: #ffffff;
        }
        .skeleton-img {
            width: 100%;
            aspect-ratio: 9 / 16;
            border-radius: 12px;
            background: linear-gradient(90deg, #f5f2ea 25%, #fff9e6 50%, #f5f2ea 75%);
            background-size: 200% 100%;
            animation: skeletonShimmer 1.4s infinite linear;
        }
        .skeleton-text {
            width: 65%;
            height: 14px;
            border-radius: 6px;
            margin-top: 12px;
            background: linear-gradient(90deg, #f5f2ea 25%, #fff9e6 50%, #f5f2ea 75%);
            background-size: 200% 100%;
            animation: skeletonShimmer 1.4s infinite linear;
        }
        @keyframes skeletonShimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
        }

        /* 3. Category Filter Bar */
        .tiemanh-section-container,
        .tiemanh-banggia-sec,
        .tiemanh-quytrinh-sec,
        .tiemanh-chinhanh-sec,
        .tiemanh-footer {
            scroll-margin-top: 0; /* Offset xử lý thủ công trong JS */
        }
        .tiemanh-section-container {
            padding: 24px 8% 60px; /* Top gọn để không có khoảng trắng khi scroll tới */
        }
        /* Wrapper tạo hiệu ứng fade ở 2 cạnh gợi ý còn nội dung */
        .tiemanh-filter-scroll-wrap {
            position: relative;
            width: 100%;
        }
        .tiemanh-filter-scroll-wrap::before,
        .tiemanh-filter-scroll-wrap::after {
            display: none !important;
        }

        .tiemanh-filter-bar {
            display: flex;
            flex-wrap: nowrap;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scroll-behavior: smooth;
            scrollbar-width: none;
            gap: 10px;
            padding: 6px 12px 10px 12px;
            margin-bottom: 0px;
            justify-content: flex-start;
        }
        .tiemanh-filter-bar::-webkit-scrollbar { display: none; }
        .tiemanh-filter-group {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            width: 100%;
        }
        .tiemanh-filter-label {
            font-size: 13px;
            font-weight: 700;
            color: var(--tiemanh-text);
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
            opacity: 0.7;
            padding-left: 4px;
        }
        .tiemanh-filter-pill {
            background: var(--tiemanh-white);
            color: var(--tiemanh-text);
            border: 1.5px solid #f1f5f9;
            border-radius: 25px;
            height: 40px;
            padding: 0 20px;
            font-weight: 700;
            font-size: 13.5px;
            cursor: pointer;
            transition: all 0.25s cubic-bezier(0.165, 0.84, 0.44, 1);
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
            flex-shrink: 0;
            white-space: nowrap;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
        }
        .tiemanh-filter-pill:hover {
            background: #fffdf5;
            border-color: rgba(251, 192, 45, 0.6);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(251, 192, 45, 0.2);
        }
        .tiemanh-filter-pill.active {
            background: linear-gradient(135deg, var(--tiemanh-primary), #ffa000);
            color: #1e1e24;
            border-color: transparent;
            font-weight: 800;
            box-shadow: 0 6px 18px rgba(251, 192, 45, 0.35);
            transform: translateY(-1px);
        }

        /* 4. Concept Cards Grid */
        .tiemanh-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 30px;
        }
        .tiemanh-card {
            background: #ffffff;
            border-radius: 22px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
            overflow: hidden;
            border: 1.5px solid rgba(251, 192, 45, 0.22);
            transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            cursor: pointer;
            position: relative;
            height: 100%;
        }
        .tiemanh-card:hover {
            transform: translateY(-10px) scale(1.015);
            box-shadow: 0 22px 45px rgba(251, 192, 45, 0.28), 0 8px 20px rgba(0, 0, 0, 0.06);
            border-color: rgba(251, 192, 45, 0.85);
        }

        /* Collage inside card */
        .collage-wrapper {
            display: grid;
            grid-template-columns: 1.85fr 1fr;
            gap: 6px;
            height: 380px;
            padding: 8px;
            background: #fffdf5;
            overflow: hidden;
            border-radius: 20px 20px 0 0;
            position: relative;
        }
        .collage-main-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 14px 4px 4px 14px;
            transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .collage-side {
            display: grid;
            grid-template-rows: 1fr 1fr;
            gap: 6px;
        }
        .collage-side-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .collage-side-img.top {
            border-radius: 4px 14px 4px 4px;
        }
        .collage-side-img.bottom {
            border-radius: 4px 4px 14px 4px;
        }
        .tiemanh-card:hover .collage-main-img, 
        .tiemanh-card:hover .collage-side-img {
            transform: scale(1.05);
        }

        /* Card Content footer - Balanced & Uniform Layout */
        .tiemanh-card-footer {
            padding: 16px 18px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            background: #ffffff;
            position: relative;
            z-index: 2;
            border-top: 1px solid rgba(251, 192, 45, 0.15);
            min-height: 86px;
            box-sizing: border-box;
        }
        .tiemanh-card-meta {
            display: flex;
            align-items: center;
            gap: 12px;
            flex: 1;
            min-width: 0;
        }
        .tiemanh-card-icon-box {
            width: 42px;
            height: 42px;
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            background: #fff8e1;
            box-shadow: 0 3px 8px rgba(0, 0, 0, 0.04);
            transition: var(--tiemanh-transition);
            flex-shrink: 0;
        }
        .tiemanh-card:hover .tiemanh-card-icon-box {
            transform: scale(1.08) rotate(4deg);
        }
        .tiemanh-card-title-box {
            display: flex;
            flex-direction: column;
            gap: 5px;
            min-width: 0;
        }
        .tiemanh-card-title {
            font-family: var(--tiemanh-serif);
            font-weight: 800;
            font-size: 16px;
            color: var(--tiemanh-dark);
            margin: 0;
            line-height: 1.25;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            transition: color 0.3s ease;
        }
        .tiemanh-card:hover .tiemanh-card-title {
            color: var(--tiemanh-primary-dark);
        }
        .tiemanh-card-badges {
            display: flex;
            flex-wrap: wrap;
            gap: 4px;
            align-items: center;
        }
        .tiemanh-card-badge {
            font-size: 11px;
            font-weight: 700;
            padding: 2.5px 8px;
            border-radius: 6px;
            display: inline-flex;
            align-items: center;
            gap: 3px;
            white-space: nowrap;
            letter-spacing: 0.2px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }
        .tiemanh-card-badge.branch-badge {
            color: #c2410c;
            background: #ffedd5;
        }
        .tiemanh-filter-bar.active-drag {
            cursor: grabbing !important;
            cursor: -webkit-grabbing !important;
            user-select: none;
        }

        /* Đồng nhất & Cân đối các nút bấm trên Card */
        .tiemanh-card-actions {
            display: flex;
            align-items: center;
            gap: 8px;
            flex-shrink: 0;
            width: 100%;
        }
        .tiemanh-card-btn {
            height: 36px;
            padding: 0 15px;
            border-radius: 18px;
            background: linear-gradient(135deg, #fbc02d, #f59e0b);
            border: none;
            color: #1e1e24;
            font-size: 12px;
            font-weight: 700;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            flex-grow: 1;
            justify-content: center;
            gap: 6px;
            white-space: nowrap;
            box-shadow: 0 3px 10px rgba(251, 192, 45, 0.28);
            transition: all 0.25s ease;
        }
        .tiemanh-card-btn:hover,
        .tiemanh-card:hover .tiemanh-card-btn {
            background: linear-gradient(135deg, #f59e0b, #d97706);
            color: #ffffff;
            box-shadow: 0 5px 15px rgba(245, 158, 11, 0.4);
            transform: translateY(-2px);
        }
        .tiemanh-card-arrow {
            font-size: 12px;
            transition: transform 0.25s ease;
        }
        .tiemanh-card:hover .tiemanh-card-arrow {
            transform: translateX(3px);
        }

        /* Nút Cuộn Lên Đầu Trang (Back to Top) */
        .tiemanh-back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: #1e293b;
            color: #fbbf24;
            border: 2px solid #fbbf24;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
            font-weight: 900;
            cursor: pointer;
            z-index: 99999;
            box-shadow: 0 8px 25px rgba(0,0,0,0.3);
            opacity: 0;
            visibility: hidden;
            transform: translateY(20px);
            transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .tiemanh-back-to-top.show {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }
        .tiemanh-back-to-top:hover {
            background: #fbbf24;
            color: #0f172a;
            transform: translateY(-4px);
            box-shadow: 0 12px 30px rgba(251, 191, 36, 0.4);
        }

        /* Nút Tải ảnh & Sao chép Link trong Lightbox */
        .tiemanh-lightbox-actions {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-top: 16px;
        }
        .tiemanh-lightbox-download-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            background: linear-gradient(135deg, var(--tiemanh-primary), #f59e0b);
            color: #1e1e24;
            border: none;
            padding: 12px 24px;
            border-radius: 25px;
            font-weight: 800;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 6px 18px rgba(251, 192, 45, 0.35);
            width: 100%;
        }
        .tiemanh-lightbox-download-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(251, 192, 45, 0.5);
        }
        .tiemanh-lightbox-booking-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            background: linear-gradient(135deg, #f59e0b, #d97706);
            color: #1e293b;
            border: none;
            padding: 11px 20px;
            border-radius: 25px;
            font-weight: 700;
            font-size: 13.5px;
            cursor: pointer;
            transition: all 0.3s ease;
            width: 100%;
            margin-bottom: 10px;
            box-shadow: 0 4px 14px rgba(245, 158, 11, 0.3);
        }
        .tiemanh-lightbox-booking-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(245, 158, 11, 0.5);
            filter: brightness(1.1);
        }
        .tiemanh-lightbox-share-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            background: rgba(255, 255, 255, 0.08);
            color: #f8fafc;
            border: 1px solid rgba(255, 255, 255, 0.2);
            padding: 11px 20px;
            border-radius: 25px;
            font-weight: 700;
            font-size: 13.5px;
            cursor: pointer;
            transition: all 0.3s ease;
            width: 100%;
        }
        .tiemanh-lightbox-share-btn:hover {
            background: rgba(255, 255, 255, 0.18);
            border-color: rgba(255, 255, 255, 0.4);
            transform: translateY(-2px);
        }

        /* Popup Zalo CTA & Dedicated Zalo Modal */
        .tiemanh-modal-quick-contact {
            background: #eff6ff;
            border: 1px solid #bfdbfe;
            border-radius: 14px;
            padding: 14px;
            margin-bottom: 18px;
            text-align: center;
        }
        .quick-contact-title {
            font-size: 13px;
            font-weight: 700;
            color: #1e40af;
            margin-bottom: 8px;
        }
        .tiemanh-zalo-direct-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            background: #0068ff;
            color: #ffffff !important;
            padding: 11px 18px;
            border-radius: 25px;
            font-weight: 800;
            font-size: 13.5px;
            text-decoration: none;
            box-shadow: 0 4px 14px rgba(0, 104, 255, 0.3);
            transition: all 0.25s ease;
        }
        .tiemanh-zalo-direct-btn:hover {
            background: #0054cc;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 104, 255, 0.45);
        }
        .tiemanh-modal-divider {
            display: flex;
            align-items: center;
            text-align: center;
            margin: 14px 0 4px 0;
            color: #94a3b8;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.5px;
        }
        .tiemanh-modal-divider::before, .tiemanh-modal-divider::after {
            content: '';
            flex: 1;
            border-bottom: 1px dashed #cbd5e1;
        }
        .tiemanh-modal-divider span {
            padding: 0 10px;
        }

        /* Floating Zalo Button (Nằm thẳng đứng phía trên nút Back to top) */
        .tiemanh-zalo-floating-btn {
            position: fixed;
            bottom: 92px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #ffffff;
            border: 2px solid #0068ff;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 8px 25px rgba(0, 104, 255, 0.35);
            z-index: 99999;
            transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
            padding: 0;
            overflow: hidden;
        }
        .tiemanh-zalo-floating-btn:hover {
            transform: translateY(-4px) scale(1.08);
            box-shadow: 0 12px 30px rgba(0, 104, 255, 0.65);
        }
        .zalo-pulse-ring {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border: 2px solid #0068ff;
            animation: zaloRingPulse 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
            pointer-events: none;
        }
        @keyframes zaloRingPulse {
            0% { transform: scale(0.95); opacity: 0.8; }
            50% { transform: scale(1.45); opacity: 0; }
            100% { transform: scale(1.45); opacity: 0; }
        }
        @keyframes zaloRingPulse {
            0% { transform: scale(0.95); opacity: 0.8; }
            50% { transform: scale(1.4); opacity: 0; }
            100% { transform: scale(1.4); opacity: 0; }
        }

        /* Dedicated Zalo Modal Card */
        .tiemanh-zalo-modal-card {
            background: #ffffff;
            border-radius: 24px;
            width: 90%;
            max-width: 440px;
            overflow: hidden;
            box-shadow: 0 25px 60px rgba(0, 0, 0, 0.35);
            animation: modalFadeIn 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
            position: relative;
        }
        .zalo-card-header {
            background: linear-gradient(135deg, #0068ff, #004ecc);
            padding: 22px 24px;
            color: #ffffff;
            display: flex;
            align-items: center;
            gap: 14px;
            position: relative;
        }
        .zalo-header-avatar-box {
            position: relative;
            width: 48px;
            height: 48px;
            background: #ffffff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 26px;
            flex-shrink: 0;
            box-shadow: 0 4px 10px rgba(0,0,0,0.15);
        }
        .zalo-online-status {
            position: absolute;
            bottom: 1px;
            right: 1px;
            width: 12px;
            height: 12px;
            background: #22c55e;
            border: 2px solid #ffffff;
            border-radius: 50%;
        }
        .zalo-header-info h4 {
            margin: 0;
            font-size: 17px;
            font-weight: 800;
            color: #ffffff;
        }
        .zalo-header-info p {
            margin: 4px 0 0 0;
            font-size: 12px;
            color: rgba(255,255,255,0.85);
            display: flex;
            align-items: center;
            gap: 5px;
        }
        .zalo-header-info .online-dot {
            color: #4ade80;
            font-size: 12px;
        }
        .tiemanh-zalo-modal-card .tiemanh-modal-close-btn {
            color: #ffffff;
            opacity: 0.85;
        }
        .tiemanh-zalo-modal-card .tiemanh-modal-close-btn:hover {
            color: #ffffff;
            opacity: 1;
        }
        .zalo-card-body {
            padding: 24px;
            display: flex;
            flex-direction: column;
            gap: 18px;
        }
        .zalo-chat-message {
            background: #f8fafc;
            border-radius: 16px;
            padding: 16px 18px;
            border: 1px solid #e2e8f0;
            color: #334155;
            font-size: 14px;
            line-height: 1.6;
        }
        .zalo-chat-message p {
            margin: 0 0 8px 0;
        }
        .zalo-chat-message p:last-child {
            margin-bottom: 0;
        }
        .tiemanh-zalo-popup-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            background: linear-gradient(135deg, #0068ff, #0052d9);
            color: #ffffff !important;
            padding: 15px 24px;
            border-radius: 30px;
            font-weight: 800;
            font-size: 14.5px;
            text-decoration: none;
            box-shadow: 0 8px 24px rgba(0, 104, 255, 0.4);
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 0.3px;
        }
        .tiemanh-zalo-popup-btn img {
            width: 24px;
            height: 24px;
            object-fit: contain;
        }
        .tiemanh-zalo-popup-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 30px rgba(0, 104, 255, 0.55);
            background: linear-gradient(135deg, #0054cc, #003fa8);
        }
        .zalo-card-hotline {
            text-align: center;
            font-size: 13px;
            color: #64748b;
        }
        .zalo-card-hotline a {
            color: #0068ff;
            text-decoration: none;
            margin-left: 4px;
            font-size: 14px;
        }

        /* Dòng note / Bubble hướng dẫn chỉa vào nút Zalo */
        .tiemanh-zalo-guide-tooltip {
            position: fixed !important;
            bottom: 154px !important;
            right: 20px !important;
            background: linear-gradient(135deg, #ffffff 0%, #fffbeb 100%) !important;
            color: #1e1e24 !important;
            padding: 12px 16px !important;
            border-radius: 16px !important;
            box-shadow: 0 12px 30px rgba(251, 192, 45, 0.25), 0 4px 10px rgba(0,0,0,0.08) !important;
            z-index: 2147483640 !important; /* Cực kỳ cao để đè mọi thứ */
            font-size: 13.5px !important;
            line-height: 1.4 !important;
            width: 250px !important;
            border: 2px solid #fbc02d !important;
            animation: tooltipFloat 2s ease-in-out infinite !important;
            transition: all 0.3s ease !important;
            cursor: default;
        }
        .tiemanh-zalo-guide-tooltip .guide-close-btn {
            position: absolute;
            top: 4px;
            right: 4px;
            font-size: 15px;
            color: #64748b;
            cursor: pointer;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            line-height: 0;
            padding-bottom: 2px;
            border-radius: 50%;
            transition: background 0.2s, color 0.2s;
        }
        .tiemanh-zalo-guide-tooltip .guide-close-btn:hover {
            background: #f1f5f9;
            color: #475569;
        }
        .tiemanh-zalo-guide-tooltip .guide-content {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            padding-right: 12px;
        }
        .tiemanh-zalo-guide-tooltip .guide-icon {
            font-size: 22px;
            animation: wave 1.5s ease-in-out infinite alternate;
        }
        .tiemanh-zalo-guide-tooltip .guide-text {
            display: flex;
            flex-direction: column;
        }
        .tiemanh-zalo-guide-tooltip .guide-text strong {
            color: #d97706;
            font-weight: 700;
        }
        .tiemanh-zalo-guide-tooltip .guide-text span {
            color: #475569;
            font-size: 12.5px;
        }
        .tiemanh-zalo-guide-tooltip .guide-arrow {
            position: absolute;
            bottom: -10px;
            right: 35px;
            width: 0;
            height: 0;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-top: 10px solid #fbc02d;
        }
        .tiemanh-zalo-guide-tooltip .guide-arrow::after {
            content: '';
            position: absolute;
            bottom: 2px;
            left: -8px;
            width: 0;
            height: 0;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            border-top: 8px solid #fffbeb;
        }
        @keyframes tooltipFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
        }
        @keyframes wave {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(15deg); }
        }

        /* CSS cho Zalo Popup cải tiến */
        .zalo-selected-badge {
            background: #fff9e6;
            border: 1px dashed #fbc02d;
            padding: 8px 12px;
            border-radius: 12px;
            font-size: 13px;
            color: #d97706;
            margin-bottom: 5px;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .zalo-quick-actions {
            display: flex;
            gap: 10px;
            margin-top: 5px;
        }
        .zalo-quick-btn {
            flex: 1;
            padding: 10px;
            border-radius: 12px;
            border: 1px solid #cbd5e1;
            background: #f8fafc;
            font-size: 12.5px;
            font-weight: 700;
            color: #475569;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            transition: all 0.2s;
        }
        .zalo-quick-btn:hover {
            background: #e2e8f0 !important;
            color: #1e293b !important;
            border-color: #94a3b8;
        }

        /* CSS cho Phân trang */
        .tiemanh-pagination {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            margin-top: 50px;
            margin-bottom: 20px;
        }
        .tiemanh-page-btn {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 1px solid #e2e8f0;
            background: #ffffff;
            color: #475569;
            font-size: 14px;
            font-weight: 700;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
            box-shadow: 0 4px 6px rgba(0,0,0,0.02);
        }
        .tiemanh-page-btn:hover {
            border-color: #fbc02d;
            color: #d97706;
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(251, 192, 45, 0.15);
        }
        .tiemanh-page-btn.active {
            background: linear-gradient(135deg, #fbc02d 0%, #f57f17 100%) !important;
            color: #ffffff !important;
            border-color: #fbc02d !important;
            box-shadow: 0 8px 20px rgba(251, 192, 45, 0.4) !important;
        }
        .tiemanh-page-btn.disabled {
            opacity: 0.4;
            cursor: not-allowed;
            pointer-events: none;
        }

        /* 5. CTA Section */
        .tiemanh-cta-panel {
            background: linear-gradient(135deg, #fff9e6 0%, #fff3cc 100%);
            border-radius: 24px;
            padding: 40px 60px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 50px 0;
            box-shadow: 0 10px 25px rgba(251, 192, 45, 0.08);
            border: 1px solid rgba(251, 192, 45, 0.15);
            position: relative;
            overflow: hidden;
        }
        .tiemanh-cta-left {
            display: flex;
            align-items: center;
            gap: 25px;
            position: relative;
            z-index: 2;
        }
        .tiemanh-cta-mascot {
            font-size: 64px;
            line-height: 1;
            filter: drop-shadow(0 6px 8px rgba(0,0,0,0.1));
            animation: bounce 3s ease-in-out infinite;
        }
        .tiemanh-cta-textbox {
            display: flex;
            flex-direction: column;
            gap: 6px;
        }
        .tiemanh-cta-title {
            font-family: var(--tiemanh-serif);
            font-weight: 800;
            font-size: 24px;
            color: var(--tiemanh-dark);
            margin: 0;
        }
        .tiemanh-cta-desc {
            font-size: 15px;
            color: var(--tiemanh-text-light);
            margin: 0;
        }
        .tiemanh-cta-btn {
            position: relative;
            z-index: 2;
        }
        @keyframes bounce {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(5deg); }
        }

        /* 6. Footer */
        .tiemanh-footer {
            background: var(--tiemanh-dark);
            color: #d1d1d6;
            padding: 80px 8% 40px 8%;
            border-top: 5px solid var(--tiemanh-primary);
        }
        .tiemanh-footer-grid {
            display: grid;
            grid-template-columns: 1.2fr 0.8fr 1.2fr;
            gap: 50px;
            margin-bottom: 60px;
        }
        .tiemanh-footer-col {
            display: flex;
            flex-direction: column;
            gap: 22px;
        }
        .tiemanh-footer-logo .tiemanh-logo-text {
            color: var(--tiemanh-white);
        }
        .tiemanh-footer-desc {
            font-size: 13.5px;
            color: #8e8e93;
            line-height: 1.7;
            margin: 0;
        }
        .tiemanh-footer-title {
            font-size: 15px;
            font-weight: 700;
            color: var(--tiemanh-white);
            letter-spacing: 1px;
            text-transform: uppercase;
            position: relative;
            padding-bottom: 8px;
        }
        .tiemanh-footer-title::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 30px;
            height: 2px;
            background-color: var(--tiemanh-primary);
        }
        .tiemanh-footer-links {
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        .tiemanh-footer-links li a {
            color: #a2a2a9;
            text-decoration: none;
            font-size: 14px;
            transition: var(--tiemanh-transition);
        }
        .tiemanh-footer-links li a:hover {
            color: var(--tiemanh-primary);
            padding-left: 5px;
        }
        .tiemanh-footer-contacts {
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            gap: 14px;
            font-size: 14px;
        }
        .tiemanh-footer-contacts li {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            color: #a2a2a9;
        }
        .tiemanh-footer-contacts li span.icon {
            color: var(--tiemanh-primary);
            font-size: 16px;
        }
        .tiemanh-footer-contacts li.address-line {
            display: flex;
            align-items: flex-start;
        }
        .tiemanh-footer-socials {
            display: flex;
            gap: 12px;
            margin-top: 15px;
        }
        .tiemanh-social-icon {
            width: 38px;
            height: 38px;
            background: rgba(255,255,255,0.05);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--tiemanh-white);
            text-decoration: none;
            font-size: 18px;
            transition: var(--tiemanh-transition);
        }
        .tiemanh-social-icon:hover {
            background: var(--tiemanh-primary);
            color: var(--tiemanh-dark);
            transform: translateY(-3px);
        }
        .tiemanh-footer-bottom {
            padding-top: 30px;
            border-top: 1px solid rgba(255,255,255,0.06);
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 13px;
            color: #636366;
        }

        /* 7. Premium Lightbox Modal */
        .tiemanh-lightbox-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(15, 15, 18, 0.96);
            z-index: 2000;
            display: none;
            opacity: 0;
            transition: opacity 0.3s ease;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(10px);
        }
        .tiemanh-lightbox-overlay.active {
            display: flex;
            opacity: 1;
        }
        .tiemanh-lightbox-container {
            width: 90%;
            max-width: 1200px;
            height: 85vh;
            display: grid;
            grid-template-columns: 1.4fr 0.6fr;
            background: var(--tiemanh-dark);
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 25px 60px rgba(0,0,0,0.5);
            border: 1px solid rgba(255,255,255,0.05);
            position: relative;
        }
        .tiemanh-lightbox-viewer {
            position: relative;
            background: #000;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            height: 100%;
        }
        .tiemanh-lightbox-img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            transition: transform 0.3s ease;
            cursor: zoom-in;
        }
        .tiemanh-lightbox-img.zoomed {
            transform: scale(1.6);
            cursor: zoom-out;
        }
        .tiemanh-lightbox-close {
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(0,0,0,0.5);
            color: var(--tiemanh-white);
            border: none;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            font-size: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            line-height: 0;
            padding-bottom: 4px;
            cursor: pointer;
            z-index: 10;
            transition: var(--tiemanh-transition);
        }
        .tiemanh-lightbox-close:hover {
            background: var(--tiemanh-primary);
            color: var(--tiemanh-dark);
        }
        .tiemanh-lightbox-arrow {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(0,0,0,0.4);
            color: var(--tiemanh-white);
            border: none;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            font-size: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 10;
            transition: var(--tiemanh-transition);
        }
        .tiemanh-lightbox-arrow:hover {
            background: var(--tiemanh-primary);
            color: var(--tiemanh-dark);
        }
        .tiemanh-lightbox-arrow.left { left: 20px; }
        .tiemanh-lightbox-arrow.right { right: 20px; }
        
        .tiemanh-lightbox-panel {
            padding: 40px;
            color: #d1d1d6;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            overflow-y: auto;
            border-left: 1px solid rgba(255,255,255,0.05);
        }
        .tiemanh-lightbox-cat {
            font-family: var(--tiemanh-font);
            color: var(--tiemanh-primary);
            font-size: 15px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            margin-bottom: 8px;
        }
        .tiemanh-lightbox-title {
            font-family: var(--tiemanh-serif);
            font-size: 28px;
            font-weight: 800;
            color: var(--tiemanh-white);
            margin: 0 0 16px 0;
            line-height: 1.3;
            letter-spacing: -0.3px;
        }
        .tiemanh-lightbox-desc {
            font-size: 14.5px;
            line-height: 1.7;
            color: #a2a2a9;
            margin-bottom: 30px;
        }
        .tiemanh-lightbox-thumb-container {
            display: flex;
            gap: 8px;
            margin-bottom: 20px;
            overflow-x: auto;
            padding-bottom: 6px;
            scrollbar-width: thin;
            scrollbar-color: var(--tiemanh-primary) rgba(255,255,255,0.05);
            scroll-snap-type: x mandatory;
            flex-shrink: 0;
        }
        .tiemanh-lightbox-thumb-container::-webkit-scrollbar {
            height: 4px;
        }
        .tiemanh-lightbox-thumb-container::-webkit-scrollbar-track {
            background: rgba(255,255,255,0.05);
            border-radius: 2px;
        }
        .tiemanh-lightbox-thumb-container::-webkit-scrollbar-thumb {
            background: var(--tiemanh-primary);
            border-radius: 2px;
        }
        .tiemanh-lightbox-thumb {
            width: 68px;
            height: 68px;
            border-radius: 8px;
            object-fit: cover;
            cursor: pointer;
            border: 2px solid transparent;
            transition: var(--tiemanh-transition);
            flex-shrink: 0;
            scroll-snap-align: start;
        }
        .tiemanh-lightbox-thumb.active, .tiemanh-lightbox-thumb:hover {
            border-color: var(--tiemanh-primary);
            transform: scale(1.08);
        }
        .tiemanh-lightbox-img-counter {
            font-size: 12px;
            color: rgba(255,255,255,0.4);
            margin-bottom: 12px;
            letter-spacing: 1px;
        }

        /* 8. Booking Form Modal */
        .tiemanh-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(15, 15, 18, 0.6);
            backdrop-filter: blur(8px);
            z-index: 3000;
            display: none;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        .tiemanh-modal-overlay.active {
            display: flex;
            opacity: 1;
        }
        .tiemanh-modal-content {
            background: var(--tiemanh-white);
            border-radius: 20px;
            width: 90%;
            max-width: 500px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.15);
            overflow: hidden;
            border: 1px solid rgba(251, 192, 45, 0.15);
            position: relative;
            transform: scale(0.9);
            transition: transform 0.3s ease;
        }
        .tiemanh-modal-overlay.active .tiemanh-modal-content {
            transform: scale(1);
        }
        .tiemanh-modal-header {
            background: linear-gradient(135deg, var(--tiemanh-primary), #ffb300);
            padding: 24px 30px;
            position: relative;
            color: var(--tiemanh-dark);
        }
        .tiemanh-modal-title {
            font-family: var(--tiemanh-serif);
            font-size: 22px;
            font-weight: 800;
            margin: 0;
            text-transform: uppercase;
        }
        .tiemanh-modal-subtitle {
            font-size: 12.5px;
            margin-top: 5px;
            opacity: 0.8;
            font-weight: 500;
        }
        .tiemanh-modal-close-btn {
            position: absolute;
            top: 24px;
            right: 25px;
            background: rgba(0,0,0,0.08);
            border: none;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            font-size: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            line-height: 0;
            padding-bottom: 2px;
            cursor: pointer;
            transition: var(--tiemanh-transition);
        }
        .tiemanh-modal-close-btn:hover {
            background: var(--tiemanh-dark);
            color: var(--tiemanh-white);
        }
        .tiemanh-modal-body {
            padding: 30px;
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
        .tiemanh-form-group {
            margin-bottom: 20px;
            display: flex;
            flex-direction: column;
            gap: 6px;
        }
        .tiemanh-form-group label {
            font-size: 13.5px;
            font-weight: 700;
            color: var(--tiemanh-dark);
        }
        .tiemanh-form-control {
            border: 1.5px solid rgba(0,0,0,0.08);
            border-radius: 10px;
            padding: 12px 16px;
            font-family: var(--tiemanh-font);
            font-size: 14.5px;
            transition: var(--tiemanh-transition);
        }
        .tiemanh-form-control:focus {
            outline: none;
            border-color: var(--tiemanh-primary-dark);
            box-shadow: 0 0 8px rgba(251, 192, 45, 0.2);
            background-color: #fffdf7;
        }
        .tiemanh-submit-btn {
            width: 100%;
            padding: 14px;
            border-radius: 12px;
            background: linear-gradient(135deg, var(--tiemanh-primary), #ffa000);
            color: var(--tiemanh-dark);
            border: none;
            font-weight: 700;
            font-size: 15px;
            cursor: pointer;
            box-shadow: 0 6px 15px rgba(251, 192, 45, 0.2);
            transition: var(--tiemanh-transition);
            margin-top: 10px;
        }
        .tiemanh-submit-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(251, 192, 45, 0.35);
        }

        /* Success screen inside Modal */
        .tiemanh-success-box {
            text-align: center;
            padding: 40px 20px;
            display: none;
            flex-direction: column;
            align-items: center;
            gap: 18px;
        }
        .tiemanh-success-icon {
            font-size: 64px;
            animation: pop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .tiemanh-success-title {
            font-family: var(--tiemanh-serif);
            font-size: 24px;
            font-weight: 800;
            color: var(--tiemanh-dark);
            margin: 0;
        }
        .tiemanh-success-desc {
            font-size: 14.5px;
            color: var(--tiemanh-text-light);
            margin: 0;
        }
        @keyframes pop {
            0% { transform: scale(0); }
            100% { transform: scale(1); }
        }

        /* 4. Bảng giá Section */
        .tiemanh-banggia-sec {
            padding: 24px 8% 80px; /* Top gọn để không có khoảng trắng khi scroll tới */
            background-color: #fffbf0;
            text-align: center;
        }
        .tiemanh-sec-header {
            margin-bottom: 50px;
        }
        .tiemanh-sec-subtitle {
            font-family: var(--tiemanh-font);
            font-size: 14px;
            font-weight: 700;
            color: var(--tiemanh-primary-dark);
            margin: 0;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        .tiemanh-sec-title {
            font-family: var(--tiemanh-serif);
            font-size: 42px;
            font-weight: 800;
            margin: 10px 0 0 0;
            color: var(--tiemanh-dark);
            text-transform: uppercase;
            letter-spacing: -1px;
            position: relative;
            padding-bottom: 10px;
        }
        .tiemanh-sec-title::after {
            content: '';
            display: block;
            width: 50px;
            height: 3px;
            background: linear-gradient(90deg, var(--tiemanh-primary), #ffa000);
            margin: 12px auto 0 auto;
            border-radius: 2px;
        }
        /* Bảng giá Responsive: Desktop hiển thị 3 cột đủ 100%, Mobile kéo trượt Carousel */
        .tiemanh-pricing-carousel-wrapper {
            position: relative;
            max-width: 1200px;
            margin: 40px auto 0 auto;
            padding: 0 15px;
        }
        .tiemanh-pricing-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
            padding: 20px 0 30px 0;
            align-items: stretch;
        }
        .tiemanh-price-card {
            background-color: #ffffff;
            border-radius: 25px;
            padding: 35px 24px;
            box-shadow: 0 10px 30px rgba(244, 63, 94, 0.06);
            transition: var(--tiemanh-transition);
            border: 2px solid #fbcfe8;
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            align-items: stretch;
            text-align: left;
            box-sizing: border-box;
            height: 100%;
        }

        /* Nút điều hướng Carousel */
        .tiemanh-pricing-nav-btn {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: #ffffff;
            color: #0f172a;
            border: 2px solid rgba(251, 192, 45, 0.5);
            box-shadow: 0 6px 16px rgba(0,0,0,0.12);
            font-size: 20px;
            font-weight: 800;
            display: flex;
            align-items: center;
            justify-content: center;
            line-height: 0;
            padding-bottom: 2px;
            cursor: pointer;
            z-index: 10;
            transition: all 0.25s ease;
        }
        .tiemanh-pricing-nav-btn:hover {
            background: var(--tiemanh-primary);
            border-color: var(--tiemanh-primary);
            transform: translateY(-50%) scale(1.1);
        }
        .tiemanh-pricing-nav-btn.prev { left: -15px; }
        .tiemanh-pricing-nav-btn.next { right: -15px; }

        .tiemanh-pricing-dots {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            margin-top: 15px;
        }
        .tiemanh-pricing-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #cbd5e1;
            border: none;
            cursor: pointer;
            transition: all 0.25s ease;
            padding: 0;
        }
        .tiemanh-pricing-dot.active {
            background: var(--tiemanh-primary);
            width: 28px;
            border-radius: 12px;
        }

        /* Ẩn nút mũi tên và dots trên màn hình lớn Desktop vì đã hiện đủ 3 gói */
        @media (min-width: 992px) {
            .tiemanh-pricing-nav-btn {
                display: none !important;
            }
            .tiemanh-pricing-dots {
                display: none !important;
            }
        }

        /* Chuyển sang Carousel vuốt trượt trên Mobile & Tablet (< 992px) */
        @media (max-width: 991px) {
            .tiemanh-pricing-carousel-wrapper {
                padding: 0 10px;
            }
            .tiemanh-pricing-grid {
                display: flex;
                align-items: stretch !important; /* Kéo giãn chiều cao cả 3 card bằng nhau 100% */
                gap: 16px;
                overflow-x: auto;
                scroll-snap-type: x mandatory;
                scroll-behavior: smooth;
                padding: 20px 10px 30px 10px;
                -webkit-overflow-scrolling: touch;
                scrollbar-width: none;
                cursor: grab;
                user-select: none;
            }
            .tiemanh-pricing-grid::-webkit-scrollbar { display: none; }
            .tiemanh-pricing-grid.active-drag { cursor: grabbing !important; scroll-behavior: auto !important; }
            .tiemanh-price-card {
                flex: 0 0 78%;
                min-width: 280px;
                scroll-snap-align: center;
                height: auto !important; /* Đảm bảo flex stretch hoạt động kéo giãn chiều cao */
            }
            .tiemanh-pricing-nav-btn {
                display: flex !important;
            }
            .tiemanh-pricing-dots {
                display: flex !important;
            }
        }
        .tiemanh-price-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 18px 38px rgba(244, 63, 94, 0.12);
            border-color: #f43f5e;
        }
        .tiemanh-price-card.featured {
            border: 3px solid #fbbf24 !important;
            background: #ffffff;
            box-shadow: 0 18px 38px rgba(245, 158, 11, 0.15) !important;
        }
        .tiemanh-price-card.featured:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 42px rgba(245, 158, 11, 0.25) !important;
            border-color: #f59e0b !important;
        }
        .tiemanh-price-badge {
            position: absolute;
            top: 20px;
            right: -32px;
            background-color: #fbbf24;
            color: #5c1d30;
            font-size: 11px;
            font-weight: 800;
            padding: 4px 35px;
            transform: rotate(45deg);
            text-transform: uppercase;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
            letter-spacing: 0.5px;
        }
        .tiemanh-price-card h3 {
            font-family: var(--tiemanh-serif);
            font-size: 22px;
            font-weight: 800;
            margin: 0 0 15px 0;
            color: #5c1d30;
            text-align: center;
        }
        .tiemanh-price-tag {
            font-family: var(--tiemanh-serif);
            font-size: 32px;
            font-weight: 800;
            color: #5c1d30;
            margin-bottom: 25px;
            text-align: center;
        }
        .tiemanh-price-tag span {
            font-size: 16px;
            font-weight: 500;
            color: #7d4458;
        }
        .tiemanh-price-features {
            list-style: none;
            padding: 0 0 0 10px;
            margin: 0 0 20px 0;
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 100%;
        }
        .tiemanh-price-features li {
            font-size: 14.5px;
            color: #4a2834;
            display: list-item;
            list-style-type: disc;
            margin-left: 15px;
            text-align: left;
        }
        .price-desc-highlight {
            font-size: 13.5px;
            color: #5c1d30;
            margin-top: 15px;
            padding-top: 15px;
            border-top: 1px dashed #f8cbd4;
            line-height: 1.5;
        }
        .price-desc-fit {
            font-size: 13px;
            color: #7d4458;
            margin-top: 8px;
            line-height: 1.4;
        }
        .price-best-seller {
            background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
            color: #ffffff;
            font-weight: 800;
            font-size: 12.5px;
            padding: 6px 20px;
            border-radius: 20px;
            text-align: center;
            margin: 18px auto 0 auto;
            width: fit-content;
            box-shadow: 0 4px 12px rgba(245, 158, 11, 0.35);
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        /* 5. Quy trình Section */
        .tiemanh-quytrinh-sec {
            padding: 24px 8% 80px; /* Top gọn */
            background-color: #fffdf6;
            text-align: center;
        }
        .tiemanh-steps-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 30px;
            margin-top: 40px;
            position: relative;
        }
        .tiemanh-step-card {
            background-color: var(--tiemanh-white);
            border-radius: 16px;
            padding: 35px 25px;
            box-shadow: var(--tiemanh-shadow-sm);
            transition: var(--tiemanh-transition);
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
        }
        .tiemanh-step-card:hover {
            transform: translateY(-5px);
        }
        .tiemanh-step-number {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--tiemanh-primary);
            color: var(--tiemanh-dark);
            font-family: var(--tiemanh-serif);
            font-size: 20px;
            font-weight: 800;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
            box-shadow: 0 4px 10px rgba(251, 192, 45, 0.3);
        }
        .tiemanh-step-card h4 {
            font-family: var(--tiemanh-serif);
            font-size: 18px;
            margin: 0 0 10px 0;
            color: var(--tiemanh-dark);
        }
        .tiemanh-step-card p {
            font-size: 13.5px;
            color: var(--tiemanh-text-light);
            margin: 0;
            line-height: 1.5;
        }

        /* 6. Feedback Section */
        .tiemanh-feedback-sec {
            padding: 80px 8%;
            background-color: #fffbf0;
            text-align: center;
        }
        .tiemanh-feedback-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin-top: 40px;
        }
        .tiemanh-feedback-card {
            background-color: var(--tiemanh-white);
            border-radius: 16px;
            padding: 35px;
            box-shadow: var(--tiemanh-shadow-sm);
            text-align: left;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        .tiemanh-feedback-quote {
            font-size: 15px;
            line-height: 1.6;
            color: var(--tiemanh-text);
            margin-bottom: 25px;
            font-style: italic;
        }
        .tiemanh-feedback-user {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        .tiemanh-feedback-avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            object-fit: cover;
            background-color: #eee;
        }
        .tiemanh-feedback-info h5 {
            font-family: var(--tiemanh-serif);
            font-size: 15px;
            margin: 0;
            color: var(--tiemanh-dark);
        }
        .tiemanh-feedback-info span {
            font-size: 12px;
            color: var(--tiemanh-text-light);
        }
        
        /* 7. Chi nhánh Section */
        .tiemanh-chinhanh-sec {
            padding: 80px 8%;
            background-color: #fffdf6;
            text-align: center;
        }
        .tiemanh-branches-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 30px;
            margin-top: 40px;
        }
        .tiemanh-branch-card {
            background-color: var(--tiemanh-white);
            border-radius: 22px;
            padding: 35px 26px;
            box-shadow: var(--tiemanh-shadow-sm);
            transition: var(--tiemanh-transition);
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            border: 1.5px solid #f1f5f9;
            justify-content: space-between;
        }
        .tiemanh-branch-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 16px 35px rgba(251, 192, 45, 0.18);
            border-color: rgba(251, 192, 45, 0.6);
        }
        .tiemanh-branch-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            margin-bottom: 12px;
        }
        .tiemanh-branch-icon {
            font-size: 32px;
            margin-bottom: 0;
        }
        .tiemanh-branch-tag {
            font-size: 11px;
            font-weight: 700;
            background: #fff8e1;
            color: #b45309;
            padding: 3px 10px;
            border-radius: 12px;
            border: 1px solid rgba(245, 158, 11, 0.2);
        }
        .tiemanh-branch-card h4 {
            font-size: 18.5px;
            font-weight: 800;
            margin: 8px 0 12px 0;
            color: var(--tiemanh-dark);
        }
        .tiemanh-branch-card p {
            font-size: 14px;
            color: var(--tiemanh-text);
            margin: 0 0 8px 0;
            line-height: 1.55;
        }
        .tiemanh-branch-card .hotline {
            font-weight: 700;
            color: #d97706;
            font-size: 14.5px;
            margin-bottom: 14px;
        }
        .tiemanh-branch-map-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            background: #f8fafc;
            border: 1.5px solid #e2e8f0;
            color: #1e293b;
            padding: 10px 18px;
            border-radius: 25px;
            font-size: 13px;
            font-weight: 700;
            text-decoration: none;
            margin-top: auto;
            width: 100%;
            box-sizing: border-box;
            transition: all 0.25s ease;
        }
        .tiemanh-branch-map-btn:hover {
            background: linear-gradient(135deg, var(--tiemanh-primary), #ffa000);
            border-color: transparent;
            color: #1e1e24;
            transform: translateY(-2px);
            box-shadow: 0 6px 18px rgba(251, 192, 45, 0.35);
        }

        /* 9. Tối ưu hóa toàn diện giao diện trên Mobile & Tablet */
        @media (max-width: 1024px) {
            .tiemanh-navbar { padding: 16px 4%; }
            .tiemanh-hero { grid-template-columns: 1fr; padding: 40px 4%; gap: 30px; text-align: center; }
            .tiemanh-hero-left { align-items: center; }
            .tiemanh-hero-title { font-size: 46px; }
            .tiemanh-hero-btns { justify-content: center; }
            .tiemanh-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
            .tiemanh-section-container { padding: 40px 4%; }
            .tiemanh-footer-grid { grid-template-columns: repeat(2, 1fr); }
            .tiemanh-lightbox-container { grid-template-columns: 1fr; height: 90vh; }
            .tiemanh-lightbox-panel { border-left: none; border-top: 1px solid rgba(255,255,255,0.05); padding: 25px; }
            .tiemanh-lightbox-thumb-container { margin-bottom: 20px; }
        }

        @media (max-width: 768px) {
            /* Khoảng cách & cỡ chữ thanh thoát, không bị ngợp */
            .tiemanh-sec-title, .tiemanh-section-title { font-size: 24px; }
            .tiemanh-section-subtitle { font-size: 12px; letter-spacing: 1.5px; }
            .tiemanh-section-desc { font-size: 13.5px; margin-bottom: 22px; line-height: 1.5; }
            .tiemanh-section-container { padding: 25px 14px; }
            .tiemanh-banggia-sec, .tiemanh-quytrinh-sec, .tiemanh-feedback-sec, .tiemanh-chinhanh-sec { padding: 20px 14px 40px; }

            /* Header & Navbar gọn gàng */
            .tiemanh-navbar { flex-direction: column; gap: 10px; padding: 12px 14px; }
            .tiemanh-menu { 
                gap: 16px; 
                flex-wrap: nowrap; 
                justify-content: flex-start; 
                overflow-x: auto; 
                width: 100%; 
                padding: 4px 10px;
                -webkit-overflow-scrolling: touch;
                scrollbar-width: none; /* Firefox */
                -ms-overflow-style: none; /* IE and Edge */
            }
            .tiemanh-menu::-webkit-scrollbar {
                display: none; /* Chrome, Safari, Opera */
            }
            .tiemanh-menu-item {
                flex-shrink: 0;
            }
            .tiemanh-menu-item a { font-size: 13.5px; padding: 4px 0; }
            .tiemanh-btn-primary { padding: 9px 18px; font-size: 13px; }

            /* Hero Section cực kỳ thoáng mắt */
            .tiemanh-hero { grid-template-columns: 1fr; text-align: center; gap: 20px; padding: 24px 14px 18px 14px; }
            .tiemanh-hero-left { gap: 12px; }
            .tiemanh-hero-subtitle { font-size: 12px; letter-spacing: 2px; }
            .tiemanh-hero-title { font-size: 34px; line-height: 1.15; }
            .tiemanh-hero-desc { font-size: 13.5px; line-height: 1.55; max-width: 100%; }
            .tiemanh-hero-btns { gap: 10px; width: 100%; justify-content: center; }
            .tiemanh-hero-btns button { flex: 1; max-width: 175px; padding: 10px 12px; font-size: 12px; justify-content: center; }

            /* Khung gợi ý 3 Polaroid nổi bật gọn nhẹ */
            .tiemanh-hero-right { width: 100%; height: auto; }
            .tiemanh-hot-showcase { padding: 12px 8px 10px 8px; border-radius: 16px; }
            .hot-showcase-title { font-size: 14px; margin-bottom: 8px; }
            .hot-badge { font-size: 9px; padding: 3px 8px; margin-bottom: 3px; }
            .hot-concepts-grid { gap: 6px; }
            .polaroid-card { padding: 4px 4px 7px 4px; border-radius: 12px; }
            .polaroid-card img { border-radius: 8px; }
            .polaroid-caption { font-size: 10.5px; margin-top: 4px; font-weight: 700; }
            .polaroid-caption::after { font-size: 8.5px; margin-top: 1px; }

            /* Bộ lọc vuốt ngang Mobile — tối ưu touch */
            .tiemanh-filter-wrapper { margin-bottom: 18px; gap: 6px; }
            .tiemanh-filter-group { align-items: flex-start; }
            .tiemanh-filter-label { font-size: 11.5px; padding-left: 4px; margin-bottom: 6px; }
            .tiemanh-filter-bar {
                padding: 4px 8px 10px 8px;
                gap: 8px;
            }
            .tiemanh-filter-pill {
                padding: 7px 16px;
                font-size: 13px;
                border-radius: 20px;
            }

            /* Lưới Concept Card trên Mobile: 1 cột thoáng đãng, tỉ lệ chuẩn */
            .tiemanh-grid { grid-template-columns: 1fr; gap: 20px; }
            .tiemanh-card { border-radius: 18px; }
            .collage-wrapper { height: 285px; padding: 6px; border-radius: 16px 16px 0 0; gap: 5px; }
            .collage-main-img { border-radius: 10px 3px 3px 10px; }
            .collage-side { gap: 5px; }
            .collage-side-img.top { border-radius: 3px 10px 3px 3px; }
            .collage-side-img.bottom { border-radius: 3px 3px 10px 3px; }
            .tiemanh-card-footer { 
                padding: 12px 14px 14px 14px; 
                flex-direction: column; 
                align-items: stretch; 
                gap: 12px; 
                min-height: auto; 
            }
            .tiemanh-card-meta { width: 100%; }
            .tiemanh-card-icon-box { width: 36px; height: 36px; font-size: 16px; border-radius: 10px; }
            .tiemanh-card-title { font-size: 14.5px; }
            .tiemanh-card-badge { font-size: 10.5px; padding: 2px 7px; }
            .tiemanh-card-btn { padding: 8px 10px; font-size: 12px; width: 100%; display: flex; justify-content: center; }

            /* Các khối danh sách khác */
            .tiemanh-pricing-grid, .tiemanh-steps-container, .tiemanh-feedback-grid, .tiemanh-branches-grid {
                grid-template-columns: 1fr;
                gap: 18px;
            }
            .tiemanh-price-card { padding: 26px 18px; border-radius: 18px; }
            .tiemanh-step-card { padding: 22px 16px; border-radius: 16px; }
            .tiemanh-branch-card { padding: 22px 16px; border-radius: 18px; }

            /* CTA Section */
            .tiemanh-cta-panel { flex-direction: column; text-align: center; gap: 18px; padding: 24px 16px; margin: 25px 0; border-radius: 18px; }
            .tiemanh-cta-left { flex-direction: column; gap: 10px; }
            .tiemanh-cta-left h3 { font-size: 19px; }
            .tiemanh-cta-left p { font-size: 13px; }

            /* Footer */
            .tiemanh-footer { padding: 35px 16px 20px 16px; }
            .tiemanh-footer-grid { grid-template-columns: 1fr; gap: 25px; }
            .tiemanh-footer-bottom { flex-direction: column; gap: 10px; text-align: center; font-size: 12px; }

            /* Modal Booking & Lightbox */
            .tiemanh-modal-content { width: 94%; padding: 22px 16px; border-radius: 18px; max-height: 90vh; }
            .tiemanh-modal-header h3 { font-size: 19px; }
            .tiemanh-form-group input, .tiemanh-form-group select, .tiemanh-form-group textarea { padding: 10px 12px; font-size: 13px; }
            .tiemanh-lightbox-arrow { width: 38px; height: 38px; font-size: 16px; }
            .tiemanh-lightbox-arrow.left { left: 10px; }
            .tiemanh-lightbox-arrow.right { right: 10px; }
        }

        @media (max-width: 420px) {
            .tiemanh-hero-title { font-size: 30px; }
            .collage-wrapper { height: 250px; }
            .hot-showcase-title { font-size: 13px; }
            .polaroid-caption { font-size: 9.5px; }
        }

        /* Nhãn Best Seller lấp lánh sang trọng */
        .tiemanh-card {
            position: relative;
        }
        .concept-best-badge {
            position: absolute;
            top: 15px;
            left: 15px;
            background: linear-gradient(135deg, #ef4444 0%, #f97316 100%);
            color: #ffffff;
            font-size: 11px;
            font-weight: 800;
            padding: 5px 12px;
            border-radius: 50px;
            z-index: 10;
            display: inline-flex;
            align-items: center;
            gap: 4px;
            box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
            letter-spacing: 0.5px;
            text-transform: uppercase;
            animation: badgePulse 2s infinite alternate ease-in-out;
        }

        @keyframes badgePulse {
            0% { transform: scale(1); box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4); }
            100% { transform: scale(1.05); box-shadow: 0 6px 16px rgba(239, 68, 68, 0.6); }
        }

        /* Badge trên Polaroid card ở Hero banner */
        .polaroid-card {
            position: relative;
        }
        .polaroid-best-badge {
            position: absolute;
            top: 10px;
            left: 10px;
            background: #ef4444;
            color: #ffffff;
            font-size: 10px;
            font-weight: 800;
            padding: 3px 8px;
            border-radius: 4px;
            z-index: 5;
            box-shadow: 0 2px 6px rgba(239, 68, 68, 0.3);
            text-transform: uppercase;
        }

        /* --- CẤU HÌNH TYPOGRAPHY BOLD HIỆN ĐẠI (SỬ DỤNG PHÔNG MẶC ĐỊNH, KHÔNG LO BỊ CHẶN FONT) --- */
        .tiemanh-hero-title-new {
            font-size: 56px;
            font-weight: 800;
            line-height: 1.15; /* Tăng từ 1.05 lên 1.15 để chữ không bị đè dòng */
            color: #2e0813;
            margin: 0 0 24px 0;
            display: flex;
            flex-direction: column;
            gap: 12px; /* Tăng khoảng cách giữa các dòng chữ cho thoáng */
            align-items: flex-start;
            font-family: 'Plus Jakarta Sans', 'Be Vietnam Pro', sans-serif;
        }
        .tiemanh-hero-title-new .title-serif {
            font-size: 52px;
            font-weight: 800;
            letter-spacing: 0.5px; /* Giãn chữ ra thay vì co âm */
            text-transform: uppercase;
            color: #2e0813;
            font-family: inherit;
        }
        .tiemanh-hero-title-new .title-script {
            font-size: 78px;
            font-weight: 900;
            color: #d97706; /* Màu vàng hổ phách sẫm */
            line-height: 1; /* Tăng line-height cho thoải mái */
            margin-left: 0;
            letter-spacing: -0.5px; /* Giãn ra đáng kể để dễ thở */
            text-transform: uppercase;
            text-shadow: 0 4px 15px rgba(217, 119, 6, 0.12);
            font-family: inherit;
            display: inline-block;
        }
        .tiemanh-hero-title-new .title-serif-sub {
            font-size: 44px;
            font-weight: 700;
            align-self: flex-start;
            margin-left: 80px; /* Đẩy lùi sang phải nhiều hơn cho thoáng */
            text-transform: lowercase;
            color: #5c3d46; /* Màu nâu nhạt hơn */
            font-family: inherit;
            letter-spacing: 0.5px;
        }
        .tiemanh-hero-desc {
            color: #5c3d46 !important; /* Đổi màu chữ mô tả sẫm dễ đọc */
            font-size: 15.5px;
            max-width: 520px;
            line-height: 1.75;
        }

        /* Khung thông số Stats */
        .tiemanh-hero-stats {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
            margin: 28px 0;
            width: 100%;
            max-width: 480px;
        }
        .stat-item {
            display: flex;
            align-items: center;
            gap: 12px;
            background: #ffffff; /* Nền trắng tinh tế nổi bật */
            border: 1.5px solid rgba(251, 192, 45, 0.25); /* Viền vàng sẫm nhẹ */
            padding: 10px 14px;
            border-radius: 14px;
            box-shadow: 0 4px 15px rgba(251, 192, 45, 0.08); /* Đổ bóng nhẹ */
            backdrop-filter: blur(8px);
            transition: all 0.3s ease;
        }
        .stat-item:hover {
            background: #fffbeb; /* Vàng kem cực nhạt khi hover */
            border-color: rgba(245, 158, 11, 0.4);
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(251, 192, 45, 0.15);
        }
        .stat-icon {
            font-size: 16px;
            background: rgba(251, 192, 45, 0.15);
            width: 34px;
            height: 34px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            color: #b45309; /* Vàng cam sẫm */
        }
        .stat-info {
            display: flex;
            flex-direction: column;
            gap: 1px;
        }
        .stat-num {
            font-size: 15px;
            font-weight: 800;
            color: #2e0813; /* Nâu đậm sắc nét */
            font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .stat-label {
            font-size: 11px;
            color: #5c3d46; /* Nâu xám sẫm */
            font-family: 'Be Vietnam Pro', sans-serif;
            text-transform: none;
        }

        /* Nút Hero mới */
        .tiemanh-btn-primary-new {
            background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
            color: #2e0813 !important;
            font-weight: 800;
            border: none;
            padding: 14px 28px;
            border-radius: 100px;
            font-size: 13px;
            letter-spacing: 0.5px;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            box-shadow: 0 10px 25px rgba(245, 158, 11, 0.25);
            transition: all 0.3s ease;
            text-transform: uppercase;
            font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .tiemanh-btn-primary-new:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 28px rgba(245, 158, 11, 0.4);
            filter: brightness(1.05);
        }
        .tiemanh-btn-secondary-new {
            background: transparent;
            color: #2e0813 !important; /* Đổi màu chữ sang nâu đậm */
            font-weight: 700;
            border: 2px solid rgba(46, 8, 19, 0.25); /* Viền nâu mờ */
            padding: 12px 26px;
            border-radius: 100px;
            font-size: 13px;
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
            font-family: 'Plus Jakarta Sans', sans-serif;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
        }
        .tiemanh-btn-secondary-new:hover {
            background: rgba(46, 8, 19, 0.05);
            border-color: #2e0813;
            color: #2e0813 !important;
            transform: translateY(-2px);
        }

        /* Phản hồi di động cho Hero mới */
        @media (max-width: 991px) {
            .tiemanh-hero-title-new {
                font-size: 38px;
                align-items: center;
                text-align: center;
                margin: 0 0 20px 0;
            }
            .tiemanh-hero-title-new .title-serif {
                font-size: 36px;
            }
            .tiemanh-hero-title-new .title-script {
                font-size: 58px;
                margin-left: 0;
            }
            .tiemanh-hero-title-new .title-serif-sub {
                font-size: 32px;
                margin-left: 0;
                align-self: center;
            }
            .tiemanh-hero-stats {
                grid-template-columns: repeat(2, 1fr);
                gap: 10px;
                margin: 20px 0;
                max-width: 100%;
            }
            .stat-item {
                padding: 8px 10px;
            }
            .tiemanh-hero-btns {
                flex-direction: column;
                width: 100%;
                gap: 10px;
            }
            .tiemanh-btn-primary-new, .tiemanh-btn-secondary-new {
                width: 100%;
                justify-content: center;
                box-sizing: border-box;
            }
        }
    `;

    // 2. Chèn Google Fonts và CSS vào trang
    const preconnect1 = document.createElement('link');
    preconnect1.rel = 'preconnect';
    preconnect1.href = 'https://fonts.googleapis.com';
    document.head.appendChild(preconnect1);

    const preconnect2 = document.createElement('link');
    preconnect2.rel = 'preconnect';
    preconnect2.href = 'https://fonts.gstatic.com';
    preconnect2.crossOrigin = 'anonymous';
    document.head.appendChild(preconnect2);

    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600;1,700&family=Be+Vietnam+Pro:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600&family=Prata&family=Charm:wght@700&family=Dancing+Script:wght@700&display=swap';
    document.head.appendChild(fontLink);

    const styleTag = document.createElement("style");
    styleTag.innerHTML = STYLES;
    document.head.appendChild(styleTag);

    // 3. Cấu trúc giao diện HTML hoàn chỉnh
    const HTML_STRUCTURE = `
        <div id="tiemanh-root">
            <!-- Lớp nền họa tiết lưới chấm studio nghệ thuật -->
            <div class="tiemanh-bg-pattern"></div>

            <!-- Các vệt sáng màu Mesh Gradient mềm mại trôi nổi sinh động -->
            <div class="tiemanh-bg-blob yellow-top"></div>
            <div class="tiemanh-bg-blob pink-right"></div>
            <div class="tiemanh-bg-blob peach-center"></div>
            <div class="tiemanh-bg-blob purple-bottom"></div>

            <!-- Các hạt bụi sáng & sao lấp lánh nghệ thuật -->
            <div class="tiemanh-sparkle-item s1">✦</div>
            <div class="tiemanh-sparkle-item s2">✨</div>
            <div class="tiemanh-sparkle-item s3">★</div>
            <div class="tiemanh-sparkle-item s4">✦</div>
            <div class="tiemanh-sparkle-item s5">✨</div>

            <!-- Header (Navbar) -->
            <header class="tiemanh-navbar" id="tiemanh-navbar">
                <a class="tiemanh-logo" id="logoLink">
                    <div class="tiemanh-logo-icon">🍍</div>
                    <div class="tiemanh-logo-text">
                        <span>Tiệm Ảnh</span>
                        <span class="tiemanh-logo-sub">Trái Thơm</span>
                    </div>
                </a>
                <ul class="tiemanh-menu">
                    <li class="tiemanh-menu-item active"><a href="#" id="menuTrangChu">Trang chủ</a></li>
                    <li class="tiemanh-menu-item"><a href="#" id="menuConcept">Concept</a></li>
                    <li class="tiemanh-menu-item"><a href="#" id="menuBangGia">Bảng giá</a></li>
                    <li class="tiemanh-menu-item"><a href="#" id="menuQuyTrinh">Quy trình</a></li>
                    <li class="tiemanh-menu-item"><a href="#" id="menuChiNhanh">Chi nhánh</a></li>
                    <li class="tiemanh-menu-item"><a href="#" id="menuLienHe">Liên hệ</a></li>
                </ul>
            </header>

            <!-- Hero Section với 3 ảnh Polaroid nổi bật từ Concept thực tế của Studio -->
            <section class="tiemanh-hero">
                <div class="tiemanh-hero-left">
                    <h1 class="tiemanh-hero-title-new">
                        <span class="title-serif">Chụp lại</span>
                        <span class="title-script">giấc mơ</span>
                        <span class="title-serif-sub">của bạn</span>
                    </h1>
                    <p class="tiemanh-hero-desc">
                        Tiệm ảnh Trái Thơm – Nơi lưu giữ những khoảnh khắc thanh xuân rực rỡ và cảm xúc nhất của bạn.
                    </p>
                    
                    <!-- Stats Section (Thông số) -->
                    <div class="tiemanh-hero-stats">
                        <div class="stat-item">
                            <div class="stat-icon">📍</div>
                            <div class="stat-info">
                                <span class="stat-num">5+</span>
                                <span class="stat-label">chi nhánh</span>
                            </div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-icon">👥</div>
                            <div class="stat-info">
                                <span class="stat-num">30.000+</span>
                                <span class="stat-label">khách hàng</span>
                            </div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-icon">⭐</div>
                            <div class="stat-info">
                                <span class="stat-num">4.9★</span>
                                <span class="stat-label">đánh giá</span>
                            </div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-icon">📸</div>
                            <div class="stat-info">
                                <span class="stat-num">5 năm+</span>
                                <span class="stat-label">kinh nghiệm</span>
                            </div>
                        </div>
                    </div>

                    <div class="tiemanh-hero-btns">
                        <button class="tiemanh-btn-primary-new" id="btnHeroDatLich">📅 ĐẶT LỊCH NGAY</button>
                        <button class="tiemanh-btn-secondary-new" id="btnHeroExplore">XEM CONCEPT</button>
                    </div>
                </div>
                <div class="tiemanh-hero-right">
                    <!-- Khung bộ 3 Concept Hot Trending độc lập -->
                    <div class="tiemanh-hot-showcase">
                        <div class="hot-showcase-header">
                            <div class="hot-badge">🔥 CONCEPT HOT TRONG TUẦN</div>
                            <h3 class="hot-showcase-title">Gợi Ý Nổi Bật Hôm Nay</h3>
                        </div>
                        <div class="hot-concepts-grid">
                            <div class="polaroid-card p1 loading-skeleton">
                                <div class="skeleton-img"></div>
                                <div class="skeleton-text"></div>
                            </div>
                            <div class="polaroid-card p2 loading-skeleton">
                                <div class="skeleton-img"></div>
                                <div class="skeleton-text"></div>
                            </div>
                            <div class="polaroid-card p3 loading-skeleton">
                                <div class="skeleton-img"></div>
                                <div class="skeleton-text"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Main Filter & Grid Content -->
            <section class="tiemanh-section-container" id="filterBar">
                <!-- Filter bar -->
                <!-- Bộ lọc kép: Chi nhánh & Chủ đề -->
                <div class="tiemanh-filter-group" style="margin-bottom: 20px;">
                    <div class="tiemanh-filter-label">📍 Chọn Chi nhánh:</div>
                    <div class="tiemanh-filter-scroll-wrap">
                        <div class="tiemanh-filter-bar" id="branchFilterBar">
                            <button class="tiemanh-filter-pill active" data-branch="all">Tất cả</button>
                        </div>
                    </div>
                </div>

                <div class="tiemanh-filter-group" style="margin-bottom: 40px;">
                    <div class="tiemanh-filter-label">📸 Chọn Chủ đề:</div>
                    <div class="tiemanh-filter-scroll-wrap">
                        <div class="tiemanh-filter-bar" id="themeFilterBar">
                            <button class="tiemanh-filter-pill active" data-theme="all">Tất cả</button>
                        </div>
                    </div>
                </div>

                <!-- Concept cards grid -->
                <div class="tiemanh-grid" id="conceptGrid"></div>
                <!-- Pagination -->
                <div class="tiemanh-pagination" id="tiemanhPagination"></div>

            </section>

            <!-- Bảng giá Section với chuyển động kéo ngang & vòng lặp 3 gói -->
            <section class="tiemanh-banggia-sec" id="banggiaSection">
                <div class="tiemanh-sec-header">
                    <h5 class="tiemanh-sec-subtitle">Tiệm Ảnh Trái Thơm</h5>
                    <h2 class="tiemanh-sec-title">BẢNG GIÁ CHỤP ẢNH CÁ NHÂN</h2>
                    <p style="font-size: 15px; font-style: italic; color: #7d4458; margin-top: -10px; margin-bottom: 25px; text-align: center;">
                        Bảng giá dành cho 1 người, áp dụng ưu đãi duy nhất trong tháng này
                    </p>
                </div>
                <div class="tiemanh-pricing-carousel-wrapper">
                    <button class="tiemanh-pricing-nav-btn prev" id="pricingPrevBtn" title="Gói trước">❮</button>
                    <button class="tiemanh-pricing-nav-btn next" id="pricingNextBtn" title="Gói tiếp theo">❯</button>
                    <div class="tiemanh-pricing-grid" id="pricingSlider">
                        <!-- Gói Thanh Xuân -->
                        <div class="tiemanh-price-card" data-pkg="0">
                            <h3>GÓI THANH XUÂN</h3>
                            <div class="tiemanh-price-tag">750.000 <span>đ</span></div>
                            <ul class="tiemanh-price-features">
                                <li>01 concept tự chọn</li>
                                <li>01 trang phục</li>
                                <li>05 ảnh chỉnh sửa</li>
                                <li>Thời gian chụp 30-45 phút</li>
                                <li>Nhận full ảnh gốc trong 24h</li>
                            </ul>
                            <div class="price-desc-highlight">⏰ Khách hàng <strong>chụp trải nghiệm nhanh</strong></div>
                            <div class="price-desc-fit">⭐ <strong>Phù hợp:</strong> Chụp kỷ niệm, sinh nhật.</div>
                        </div>

                        <!-- Gói Toả Sáng -->
                        <div class="tiemanh-price-card featured" data-pkg="1">
                            <div class="tiemanh-price-badge">Bán chạy</div>
                            <h3>🌸 GÓI TOẢ SÁNG</h3>
                            <div class="tiemanh-price-tag">1.250.000 <span>đ</span></div>
                            <ul class="tiemanh-price-features">
                                <li>02 concept tự chọn</li>
                                <li>02 trang phục</li>
                                <li>10 ảnh chỉnh sửa</li>
                                <li>Thời gian chụp 60 -90 phút</li>
                                <li>Nhận full ảnh gốc trong 24h</li>
                                <li>Tặng 01 ảnh in để bàn 13x18cm 🎁</li>
                            </ul>
                            <div class="price-desc-highlight">⚠️ <strong>Tiết kiệm</strong> hơn khi chụp nhiều concept</div>
                            <div class="price-desc-fit">⭐ <strong>Phù hợp:</strong> Chụp ảnh cá nhân, Beauty, Sinh nhật, Profile.</div>
                            <div class="price-best-seller">🔥 Best Seller 🔥</div>
                        </div>

                        <!-- Gói Hào Quang -->
                        <div class="tiemanh-price-card" data-pkg="2">
                            <h3>👑 GÓI HÀO QUANG</h3>
                            <div class="tiemanh-price-tag">2.490.000 <span>đ</span></div>
                            <ul class="tiemanh-price-features">
                                <li>03 concept tự chọn</li>
                                <li>03 trang phục</li>
                                <li>20 ảnh chỉnh sửa</li>
                                <li>Thời gian chụp 90-120 phút</li>
                                <li>Make up V.I.P ( Take care full set)</li>
                                <li>Nhận full ảnh gốc trong 24h</li>
                                <li>Quay video hậu trường 🎁</li>
                                <li>Tặng 01 ảnh lớn 20x30cm 🎁</li>
                                <li>Ưu tiên chọn lịch giờ vàng</li>
                            </ul>
                            <div class="price-desc-highlight">🍍 Khách hàng thích trải nghiệm <strong>cao cấp</strong>, ekip sẽ <strong>chăm sóc kỹ từng chi tiết</strong></div>
                            <div class="price-desc-fit">🍍 <strong>Phù hợp:</strong> tất cả các concept chụp ảnh dịp quan trọng cần chỉn chu đầu tư.</div>
                        </div>
                    </div>
                    <!-- Dots phân trang 3 gói -->
                    <div class="tiemanh-pricing-dots" id="pricingDots">
                        <button class="tiemanh-pricing-dot" data-index="0" title="Gói Thanh Xuân"></button>
                        <button class="tiemanh-pricing-dot active" data-index="1" title="Gói Toả Sáng"></button>
                        <button class="tiemanh-pricing-dot" data-index="2" title="Gói Hào Quang"></button>
                    </div>
                </div>
            </section>

            <!-- Quy trình Section -->
            <section class="tiemanh-quytrinh-sec" id="quytrinhSection">
                <div class="tiemanh-sec-header">
                    <h5 class="tiemanh-sec-subtitle">Quy trình chuyên nghiệp</h5>
                    <h2 class="tiemanh-sec-title">Các Bước Thực Hiện</h2>
                </div>
                <div class="tiemanh-steps-container">
                    <div class="tiemanh-step-card">
                        <div class="tiemanh-step-number">1</div>
                        <h4>Tư vấn concept</h4>
                        <p>Lắng nghe mong muốn, gợi ý trang phục, địa điểm chụp phù hợp với tính cách.</p>
                    </div>
                    <div class="tiemanh-step-card">
                        <div class="tiemanh-step-number">2</div>
                        <h4>Đặt lịch & cọc</h4>
                        <p>Xác nhận ngày chụp, thời gian trang điểm và chuẩn bị trang phục chu đáo.</p>
                    </div>
                    <div class="tiemanh-step-card">
                        <div class="tiemanh-step-number">3</div>
                        <h4>Buổi chụp ảnh</h4>
                        <p>Nhiếp ảnh gia hướng dẫn tạo dáng tự nhiên, chụp trong không gian thoải mái.</p>
                    </div>
                    <div class="tiemanh-step-card">
                        <div class="tiemanh-step-number">4</div>
                        <h4>Chọn & Nhận ảnh</h4>
                        <p>Khách hàng tự chọn ảnh ưng ý để chỉnh sửa da, ánh sáng và nhận ảnh gốc.</p>
                    </div>
                </div>
            </section>

            <!-- Chi nhánh Section -->
            <!-- Chi nhánh Section -->
            <section class="tiemanh-chinhanh-sec" id="chinhanhSection">
                <div class="tiemanh-sec-header">
                    <h5 class="tiemanh-sec-subtitle">Hệ thống phòng chụp</h5>
                    <h2 class="tiemanh-sec-title">Danh Sách Chi Nhánh</h2>
                    <p style="font-size: 15px; font-style: italic; color: #7d4458; margin-top: -8px; margin-bottom: 25px; text-align: center;">
                        "Lưu Giữ Thanh Xuân – Tỏa Sáng Nét Riêng" • Hệ thống 6 phòng chụp hiện đại trên toàn quốc
                    </p>
                </div>
                <div class="tiemanh-branches-grid">
                    <!-- Chi nhánh Quận 1 -->
                    <div class="tiemanh-branch-card">
                        <div class="tiemanh-branch-header">
                            <div class="tiemanh-branch-icon">📍</div>
                            <span class="tiemanh-branch-tag">Trụ sở chính</span>
                        </div>
                        <h4>Chi Nhánh Quận 1 – TP. HCM</h4>
                        <p>🏠 214/19/21 Nguyễn Văn Nguyễn, Phường Tân Định, Quận 1, TP. Hồ Chí Minh</p>
                        <p class="hotline">📞 <a href="tel:0908447308" style="color:inherit;text-decoration:none;font-weight:700;">0908 447 308</a> – <a href="tel:0866723499" style="color:inherit;text-decoration:none;font-weight:700;">0866 723 499</a></p>
                        <a href="https://maps.google.com/?q=214/19/21+Nguy%E1%BB%85n+V%C4%83n+Nguy%E1%BB%85n,+Ph%C6%B0%E1%BB%9Dng+T%C3%A2n+%C4%90%E1%BB%8Bnh,+Qu%E1%BA%ADn+1,+TP.+H%E1%BB%93+Ch%C3%AD+Minh" target="_blank" rel="noopener" class="tiemanh-branch-map-btn" title="Xem vị trí và chỉ đường trên Google Maps">
                            <span>🗺️ Xem trên Google Maps</span>
                            <span class="arrow">➔</span>
                        </a>
                    </div>

                    <!-- Chi nhánh Thủ Đức -->
                    <div class="tiemanh-branch-card">
                        <div class="tiemanh-branch-header">
                            <div class="tiemanh-branch-icon">📍</div>
                            <span class="tiemanh-branch-tag">TP. Hồ Chí Minh</span>
                        </div>
                        <h4>Chi Nhánh Thủ Đức</h4>
                        <p>🏠 81 Chương Dương, Phường Linh Chiểu, TP. Thủ Đức, TP. Hồ Chí Minh</p>
                        <p class="hotline">📞 <a href="tel:0366367438" style="color:inherit;text-decoration:none;font-weight:700;">036 636 7438</a> (Hotline Studio)</p>
                        <a href="https://maps.google.com/?q=81+Ch%C6%B0%C6%A1ng+D%C6%B0%C6%A1ng,+Ph%C6%B0%E1%BB%9Dng+Linh+Chi%E1%BB%83u,+Th%E1%BB%A7+%C4%90%E1%BB%A9c,+TP.+H%E1%BB%93+Ch%C3%AD+Minh" target="_blank" rel="noopener" class="tiemanh-branch-map-btn" title="Xem vị trí và chỉ đường trên Google Maps">
                            <span>🗺️ Xem trên Google Maps</span>
                            <span class="arrow">➔</span>
                        </a>
                    </div>

                    <!-- Chi nhánh Đà Nẵng -->
                    <div class="tiemanh-branch-card">
                        <div class="tiemanh-branch-header">
                            <div class="tiemanh-branch-icon">📍</div>
                            <span class="tiemanh-branch-tag">Đà Nẵng</span>
                        </div>
                        <h4>Chi Nhánh Đà Nẵng</h4>
                        <p>🏠 62 Nại Nam, Phường Hòa Cường Bắc, Quận Hải Châu, Đà Nẵng</p>
                        <p class="hotline">📞 <a href="tel:0337733455" style="color:inherit;text-decoration:none;font-weight:700;">0337 733 455</a></p>
                        <a href="https://maps.google.com/?q=62+N%E1%BA%A1i+Nam,+Ph%C6%B0%E1%BB%9Dng+H%C3%B2a+C%C6%B0%E1%BB%9Dng+B%E1%BA%AFc,+H%E1%BA%A3i+Ch%C3%A2u,+%C4%90%C3%A0+N%E1%BA%B5ng" target="_blank" rel="noopener" class="tiemanh-branch-map-btn" title="Xem vị trí và chỉ đường trên Google Maps">
                            <span>🗺️ Xem trên Google Maps</span>
                            <span class="arrow">➔</span>
                        </a>
                    </div>

                    <!-- Chi nhánh Biên Hòa -->
                    <div class="tiemanh-branch-card">
                        <div class="tiemanh-branch-header">
                            <div class="tiemanh-branch-icon">📍</div>
                            <span class="tiemanh-branch-tag">Đồng Nai</span>
                        </div>
                        <h4>Chi Nhánh Biên Hòa – Đồng Nai</h4>
                        <p>🏠 Số 8, Đường N1 (song song đường Võ Thị Sáu), Phường Thống Nhất, Biên Hòa</p>
                        <p class="hotline">📞 <a href="tel:0366444426" style="color:inherit;text-decoration:none;font-weight:700;">0366 444 426</a></p>
                        <a href="https://maps.google.com/?q=S%E1%BB%91+8,+%C4%90%C6%B0%E1%BB%9Dng+N1,+Ph%C6%B0%E1%BB%9Dng+Th%E1%BB%91ng+Nh%E1%BA%A5t,+Bi%C3%AAn+H%C3%B2a,+%C4%90%E1%BB%93ng+Nai" target="_blank" rel="noopener" class="tiemanh-branch-map-btn" title="Xem vị trí và chỉ đường trên Google Maps">
                            <span>🗺️ Xem trên Google Maps</span>
                            <span class="arrow">➔</span>
                        </a>
                    </div>

                    <!-- Chi nhánh Cần Thơ -->
                    <div class="tiemanh-branch-card">
                        <div class="tiemanh-branch-header">
                            <div class="tiemanh-branch-icon">📍</div>
                            <span class="tiemanh-branch-tag">Cần Thơ</span>
                        </div>
                        <h4>Chi Nhánh Cần Thơ</h4>
                        <p>🏠 A12 Đường Số 1, Khu Dân Cư Nam Long, Cần Thơ</p>
                        <p class="hotline">📞 <a href="tel:0949533251" style="color:inherit;text-decoration:none;font-weight:700;">0949 533 251</a></p>
                        <a href="https://maps.google.com/?q=A12+%C4%90%C6%B0%E1%BB%9Dng+S%E1%BB%91+1,+Khu+D%C3%A2n+C%C6%B0+Nam+Long,+C%E1%BA%A7n+Th%C6%A1" target="_blank" rel="noopener" class="tiemanh-branch-map-btn" title="Xem vị trí và chỉ đường trên Google Maps">
                            <span>🗺️ Xem trên Google Maps</span>
                            <span class="arrow">➔</span>
                        </a>
                    </div>

                    <!-- Chi nhánh Bình Dương -->
                    <div class="tiemanh-branch-card">
                        <div class="tiemanh-branch-header">
                            <div class="tiemanh-branch-icon">📍</div>
                            <span class="tiemanh-branch-tag">Bình Dương</span>
                        </div>
                        <h4>Chi Nhánh Bình Dương</h4>
                        <p>🏠 6 Đường Số 3, Phường Phú Hòa, TP. Thủ Dầu Một, Bình Dương</p>
                        <p class="hotline">📞 <a href="tel:0367416058" style="color:inherit;text-decoration:none;font-weight:700;">0367 416 058</a></p>
                        <a href="https://maps.google.com/?q=6+%C4%90%C6%B0%E1%BB%9Dng+S%E1%BB%91+3,+Ph%C6%B0%E1%BB%9Dng+Ph%C3%BA+H%C3%B2a,+Th%E1%BB%A7+D%E1%BA%A7u+M%E1%BB%99t,+B%C3%ACnh+D%C6%B0%C6%A1ng" target="_blank" rel="noopener" class="tiemanh-branch-map-btn" title="Xem vị trí và chỉ đường trên Google Maps">
                            <span>🗺️ Xem trên Google Maps</span>
                            <span class="arrow">➔</span>
                        </a>
                    </div>
                </div>
            </section>

            <!-- Footer -->
            <footer class="tiemanh-footer" id="tiemanh-footer">
                <div class="tiemanh-footer-grid">
                    <div class="tiemanh-footer-col">
                        <a class="tiemanh-logo tiemanh-footer-logo">
                            <div class="tiemanh-logo-icon">🍍</div>
                            <div class="tiemanh-logo-text">
                                <span>Tiệm Ảnh</span>
                                <span class="tiemanh-logo-sub" style="color: var(--tiemanh-primary);">Trái Thơm</span>
                            </div>
                        </a>
                        <p class="tiemanh-footer-desc">
                            Chụp lại ước mơ và lưu giữ từng khoảnh khắc thanh xuân rực rỡ trọn vẹn của bạn. Dịch vụ chụp ảnh nghệ thuật chỉn chu, tận tâm và chuyên nghiệp hàng đầu.
                        </p>
                        <div class="tiemanh-footer-socials">
                            <a href="https://facebook.com" target="_blank" class="tiemanh-social-icon" title="Facebook">f</a>
                            <a href="https://instagram.com" target="_blank" class="tiemanh-social-icon" title="Instagram">📸</a>
                            <a href="https://tiktok.com" target="_blank" class="tiemanh-social-icon" title="TikTok">🎵</a>
                            <a href="https://zalo.me/3453208760470152361" target="_blank" class="tiemanh-social-icon" title="Zalo">💬</a>
                        </div>
                    </div>

                    <div class="tiemanh-footer-col">
                        <h4 class="tiemanh-footer-title">Khám Phá</h4>
                        <ul class="tiemanh-footer-links">
                            <li><a href="#banggiaSection">Bảng báo giá dịch vụ</a></li>
                            <li><a href="#quytrinhSection">Quy trình chụp ảnh</a></li>
                            <li><a href="#chinhanhSection">Hệ thống chi nhánh</a></li>
                            <li><a href="#filterBar">Bộ sưu tập 100+ Concept</a></li>
                            <li><a href="https://zalo.me/3453208760470152361" target="_blank">Tư vấn nhanh qua Zalo</a></li>
                        </ul>
                    </div>
                    <div class="tiemanh-footer-col">
                        <h4 class="tiemanh-footer-title">Liên Hệ & Chi Nhánh</h4>
                        <ul class="tiemanh-footer-contacts">
                            <li><span class="icon">📞</span> <span>Hotline: <a href="tel:0908447308" style="color:var(--tiemanh-primary);text-decoration:none;font-weight:700;">0908 447 308</a></span></li>
                            <li><span class="icon">💬</span> <span>Zalo: <a href="https://zalo.me/3453208760470152361" target="_blank" style="color:var(--tiemanh-primary);text-decoration:none;font-weight:700;">Nhắn tin qua Zalo OA</a></span></li>
                            <li><span class="icon">✉️</span> <span>Email: tiemanhtraithom@gmail.com</span></li>
                            <li class="address-line"><span class="icon">📍</span> <span>CS Quận 1: 214/19/21 Nguyễn Văn Nguyễn, P. Tân Định, Q.1</span></li>
                            <li class="address-line"><span class="icon">📍</span> <span>CS Thủ Đức: 81 Chương Dương, P. Linh Chiểu, TP. Thủ Đức</span></li>
                            <li class="address-line"><span class="icon">📍</span> <span>CS Bình Dương: 6 Đường Số 3, P. Phú Hòa, TP. Thủ Dầu Một</span></li>
                            <li class="address-line"><span class="icon">📍</span> <span>CS Biên Hòa: Số 8, Đường N1, P. Thống Nhất, Biên Hòa</span></li>
                            <li class="address-line"><span class="icon">📍</span> <span>CS Cần Thơ: A12 Đường Số 1, KDC Nam Long, Cần Thơ</span></li>
                            <li class="address-line"><span class="icon">📍</span> <span>CS Đà Nẵng: 62 Nại Nam, P. Hòa Cường Bắc, Q. Hải Châu</span></li>
                        </ul>
                    </div>
                </div>
                <div class="tiemanh-footer-bottom">
                    <span>© 2026 Tiệm Ảnh Trái Thơm. All rights reserved.</span>
                    <span>Thiết kế bởi NHATLAM 💛</span>
                </div>
            </footer>

            <!-- Nút cuộn lên đầu trang -->
            <button id="tiemanhBackToTop" class="tiemanh-back-to-top" title="Cuộn lên đầu trang">⬆</button>

            <!-- Dòng Note / Tooltip chỉa vào nút Zalo hướng dẫn khách hàng -->
            <div class="tiemanh-zalo-guide-tooltip" id="zaloGuideTooltip">
                <span class="guide-close-btn" id="zaloGuideCloseBtn" title="Đóng hướng dẫn">✕</span>
                <div class="guide-content">
                    <span class="guide-icon">🍍</span>
                    <div class="guide-text">
                        <strong>Tư Vấn & Đặt Lịch Chụp!</strong>
                        <span>Nhấp vào đây để nhận báo giá & xem concept ngay 👇</span>
                    </div>
                </div>
                <div class="guide-arrow"></div>
            </div>

            <!-- Nút Nổi Zalo Chat (Nằm thẳng đứng phía trên nút Back to top) -->
            <button class="tiemanh-zalo-floating-btn" id="zaloFloatingBtn" title="Chat Zalo với Tiệm Ảnh Trái Thơm">
                <div class="zalo-pulse-ring"></div>
                <svg width="44" height="44" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="48" fill="#FFFFFF"/>
                    <!-- Nét trăng lưỡi liềm màu xanh Zalo -->
                    <path d="M48 12C28.5 12 12 28.5 12 48C12 55.2 14.2 61.9 18 67.5L14 86L32.2 81.6C36.9 84.4 42.3 86 48 86C32 84 20 70 20 53C20 34.5 34.5 20 53 20C62 20 70.2 23.5 76.5 29.5C70.5 18.8 59.8 12 48 12Z" fill="#0068FF"/>
                    <circle cx="54" cy="52" r="32" stroke="#CBD5E1" stroke-width="1.2" stroke-dasharray="3 3"/>
                    <text x="54" y="60" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="24" font-weight="700" fill="#0068FF" text-anchor="middle" letter-spacing="-0.5px">Zalo</text>
                </svg>
            </button>

            <!-- Dedicated Zalo Popup Modal -->
            <div class="tiemanh-modal-overlay" id="zaloModal">
                <div class="tiemanh-zalo-modal-card">
                    <div class="zalo-card-header">
                        <div class="zalo-header-avatar-box" style="font-size: 28px; display: flex; align-items: center; justify-content: center; background: #fffbeb;">
                            🍍
                            <span class="zalo-online-status"></span>
                        </div>
                        <div class="zalo-header-info">
                            <h4>Tiệm Ảnh Trái Thơm</h4>
                            <p><span class="online-dot">●</span> Đang online • Phản hồi trong 1-3 phút</p>
                        </div>
                        <button class="tiemanh-modal-close-btn" id="zaloModalCloseBtn">&times;</button>
                    </div>
                    <div class="zalo-card-body">
                        <!-- Badge thông tin dịch vụ quan tâm (Concept / Gói dịch vụ) -->
                        <div class="zalo-selected-badge" id="zaloSelectedBadge" style="display: none;">
                            <span class="badge-icon">🍍</span> <strong>Dịch vụ quan tâm:</strong> <span id="zaloBadgeText">...</span>
                        </div>
                        <div class="zalo-chat-message">
                            <p>Xin chào bạn! 💕 Cảm ơn bạn đã ghé thăm <strong>Tiệm Ảnh Trái Thơm</strong>.</p>
                            <p>Bạn đang quan tâm đến <strong>Concept nào</strong> hoặc muốn nhận <strong>Báo giá ưu đãi trong tháng này</strong>? Ekip Trái Thơm đã sẵn sàng hỗ trợ bạn ngay!</p>
                        </div>
                        <a href="https://zalo.me/3453208760470152361" target="_blank" class="tiemanh-zalo-popup-btn" id="zaloPopupDirectBtn">
                            <svg width="26" height="26" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="50" cy="50" r="48" fill="#FFFFFF"/>
                                <path d="M48 12C28.5 12 12 28.5 12 48C12 55.2 14.2 61.9 18 67.5L14 86L32.2 81.6C36.9 84.4 42.3 86 48 86C32 84 20 70 20 53C20 34.5 34.5 20 53 20C62 20 70.2 23.5 76.5 29.5C70.5 18.8 59.8 12 48 12Z" fill="#0068FF"/>
                                <text x="54" y="60" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="24" font-weight="700" fill="#0068FF" text-anchor="middle" letter-spacing="-0.5px">Zalo</text>
                            </svg>
                            <span>CHAT ZALO ĐẶT LỊCH & TƯ VẤN NGAY</span>
                        </a>
                        <!-- Cụm 2 nút hành động nhanh tiện ích -->
                        <div class="zalo-quick-actions">
                            <button class="zalo-quick-btn pricing" id="zaloQuickPricingBtn">
                                🍍 Xem Bảng Giá
                            </button>
                            <button class="zalo-quick-btn branch" id="zaloQuickBranchBtn">
                                📍 Xem Chi Nhánh
                            </button>
                        </div>
                        <div class="zalo-card-hotline">
                            <span>📞 Hoặc gọi Hotline trực tiếp:</span>
                            <a href="tel:0908447308"><strong>0908 447 308</strong></a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Lightbox Modal -->
            <div class="tiemanh-lightbox-overlay" id="lightboxOverlay">
                <button class="tiemanh-lightbox-close" id="lightboxClose">&times;</button>
                
                <div class="tiemanh-lightbox-container">
                    <div class="tiemanh-lightbox-viewer">
                        <button class="tiemanh-lightbox-arrow left" id="lightboxPrev">&#10094;</button>
                        <img src="" alt="Full view" class="tiemanh-lightbox-img" id="lightboxImg">
                        <button class="tiemanh-lightbox-arrow right" id="lightboxNext">&#10095;</button>
                    </div>
                    <div class="tiemanh-lightbox-panel">
                        <div>
                            <div class="tiemanh-lightbox-cat" id="lightboxCat"></div>
                            <h2 class="tiemanh-lightbox-title" id="lightboxTitle"></h2>
                            <p class="tiemanh-lightbox-desc" id="lightboxDesc"></p>
                        </div>
                        <div>
                            <div style="font-weight: 700; margin-bottom: 12px; color: var(--tiemanh-white); font-size: 13.5px; text-transform: uppercase; letter-spacing: 0.5px;">BỘ SƯU TẬP ẢNH MẪU:</div>
                            <div class="tiemanh-lightbox-img-counter" id="lightboxImgCounter">1 / 10</div>
                            <div class="tiemanh-lightbox-thumb-container" id="lightboxThumbs"></div>
                            <div class="tiemanh-lightbox-actions">
                                <button class="tiemanh-lightbox-booking-btn" id="lightboxBookBtn" title="Đặt lịch chụp & Tư vấn trực tiếp qua Zalo">
                                    <span>🍍 Đặt Lịch & Tư Vấn Ngay</span>
                                </button>
                                <button class="tiemanh-lightbox-share-btn" id="lightboxShareBtn" title="Sao chép đường link trực tiếp dẫn tới concept này" style="width: 100%;">
                                    <span>🔗 Sao chép link Concept</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Booking Modal Form -->
            <div class="tiemanh-modal-overlay" id="bookingModal">
                <div class="tiemanh-modal-content">
                    <div class="tiemanh-modal-header">
                        <h3 class="tiemanh-modal-title" id="modalTitle">Đặt Lịch Hẹn & Tư Vấn</h3>
                        <p class="tiemanh-modal-subtitle">Trái Thơm luôn sẵn sàng lắng nghe và hỗ trợ bạn chu đáo nhất!</p>
                        <button class="tiemanh-modal-close-btn" id="modalCloseBtn">&times;</button>
                    </div>
                    
                    <!-- Khung kết nối Zalo OA trực tiếp 1-click -->
                    <div class="tiemanh-modal-quick-contact">
                        <p class="quick-contact-title">⚡ Nhắn tin tư vấn trực tiếp qua Zalo Official:</p>
                        <a href="https://zalo.me/3453208760470152361" target="_blank" class="tiemanh-zalo-direct-btn">
                            <span>💬</span>
                            <span>Chat Zalo Tư Vấn Trực Tiếp (0908 447 308)</span>
                        </a>
                        <div class="tiemanh-modal-divider"><span>HOẶC ĐỂ LẠI THÔNG TIN ĐỂ EKIP GỌI LẠI</span></div>
                    </div>

                    <!-- Form đăng ký -->
                    <form class="tiemanh-modal-body" id="bookingForm">
                        <div class="tiemanh-form-group">
                            <label for="formName">Họ và tên của bạn *</label>
                            <input type="text" id="formName" class="tiemanh-form-control" placeholder="Ví dụ: Nguyễn Thùy Linh" required>
                        </div>
                        <div class="tiemanh-form-group">
                            <label for="formPhone">Số điện thoại liên hệ *</label>
                            <input type="tel" id="formPhone" class="tiemanh-form-control" placeholder="Ví dụ: 0908xxxxxx" required>
                        </div>
                        <div class="tiemanh-form-group">
                            <label for="formConcept">Lựa chọn Concept mẫu</label>
                            <select id="formConcept" class="tiemanh-form-control">
                                <option value="none">Tự chọn concept riêng / Chưa quyết định</option>
                                ${CONCEPTS.map(c => `<option value="${c.title}">${c.title}</option>`).join("")}
                            </select>
                        </div>
                        <div class="tiemanh-form-group">
                            <label for="formBranch">Chi nhánh mong muốn</label>
                            <select id="formBranch" class="tiemanh-form-control">
                                <option value="Q1">Chi nhánh Quận 1 – TP. HCM</option>
                                <option value="TD">Chi nhánh Thủ Đức – TP. HCM</option>
                                <option value="DN">Chi nhánh Đà Nẵng</option>
                                <option value="BH">Chi nhánh Biên Hòa – Đồng Nai</option>
                                <option value="CT">Chi nhánh Cần Thơ</option>
                                <option value="BD">Chi nhánh Bình Dương</option>
                            </select>
                        </div>
                        <button type="submit" class="tiemanh-submit-btn">GỬI YÊU CẦU ĐẶT LỊCH</button>
                    </form>

                    <!-- Success screen -->
                    <div class="tiemanh-success-box" id="successBox">
                        <div class="tiemanh-success-icon">🎉</div>
                        <h4 class="tiemanh-success-title">Gửi Đăng Ký Thành Công!</h4>
                        <p class="tiemanh-success-desc">
                            Cảm ơn bạn đã lựa chọn Tiệm Ảnh Trái Thơm. Ekip tư vấn viên của chúng tôi sẽ gọi điện hỗ trợ tư vấn chi tiết cho bạn trong vòng 15-30 phút tới nhé!
                        </p>
                        <a href="https://zalo.me/3453208760470152361" target="_blank" class="tiemanh-zalo-direct-btn" style="margin-bottom: 12px;">
                            <span>💬</span>
                            <span>Mở Zalo Nhắn Tin Với Tiệm Ngay</span>
                        </a>
                        <button class="tiemanh-btn-primary" id="successCloseBtn" style="padding: 10px 30px; width: 100%;">Đóng Cửa Sổ</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // 4. Khởi tạo gắn giao diện lên trang
    function init() {
        // Giữ nguyên dữ liệu dự phòng ban đầu để hiển thị ngay lập tức khi chờ kết nối Google Sheets

        // Tự động ghi đè chiều cao của khung Webcake để không bị giới hạn chiều cao ảnh
        if (CONFIG.targetId) {
            const targetEl = document.getElementById(CONFIG.targetId);
            if (targetEl) {
                targetEl.style.height = "auto";
                targetEl.style.minHeight = "auto";
                targetEl.style.padding = "0";
            }
            const overrideStyle = document.createElement("style");
            overrideStyle.innerHTML = `#${CONFIG.targetId} { height: auto !important; min-height: auto !important; padding: 0 !important; }`;
            document.head.appendChild(overrideStyle);
        }

        const rootContainer = document.getElementById("tiemanh-container") || document.getElementById(CONFIG.targetId);
        if (rootContainer) {
            // 🔥 Webcake Overlay Mode: Phủ toàn màn hình, che hết nội dung Webcake cũ
            const isInsideWebcake = document.body.children.length > 2; // Webcake đã có nhiều phần tử
            if (isInsideWebcake) {
                rootContainer.style.cssText = `
                    position: fixed !important;
                    top: 0 !important; left: 0 !important;
                    width: 100vw !important; height: 100vh !important;
                    z-index: 2147483647 !important;
                    overflow-y: auto !important;
                    overflow-x: hidden !important;
                    background: #0d0d0d;
                    -webkit-overflow-scrolling: touch;
                `;
                // Ngăn cuộn trang gốc Webcake
                document.body.style.overflow = "hidden";
            }
            rootContainer.innerHTML = HTML_STRUCTURE;
        } else {
            const body = document.body;
            if (body) {
                const isEmpty = body.innerText.trim().length <= 50;
                if (isEmpty) {
                    body.innerHTML = HTML_STRUCTURE;
                } else {
                    const div = document.createElement("div");
                    div.id = "tiemanh-container";
                    div.style.cssText = `
                        position: fixed !important;
                        top: 0 !important; left: 0 !important;
                        width: 100vw !important; height: 100vh !important;
                        z-index: 2147483647 !important;
                        overflow-y: auto !important; overflow-x: hidden !important;
                        background: #0d0d0d;
                    `;
                    div.innerHTML = HTML_STRUCTURE;
                    body.style.overflow = "hidden";
                    body.appendChild(div);
                }
            }
        }


        window.addEventListener("scroll", function () {
            const navbar = document.getElementById("tiemanh-navbar");
            if (navbar) {
                if (window.scrollY > 50) {
                    navbar.classList.add("scrolled");
                } else {
                    navbar.classList.remove("scrolled");
                }
            }
        });

        // Đặt tên theo đúng Tag chính cho các concept ban đầu
        CONCEPTS.forEach(c => {
            c.themes = extractMultiTagsSmart(c.tag || c.theme, c.title, c.description);
            c.title = c.themes[0] || "Nàng Thơ";
        });

        // Chờ tải dữ liệu thực tế từ Google Sheets (tránh nháy ảnh mẫu không phù hợp)
        fetchConceptsFromSheets();
        setupInteractions();
    }

    // Hàm chuyển Google Drive share link → thumbnail URL ổn định (không bị chặn cross-origin)
    function driveToDirectUrl(url) {
        if (!url) return url;

        // Helper: trích xuất FILE_ID và trả về thumbnail URL
        function toThumbnail(fileId) {
            return `https://drive.google.com/thumbnail?id=${fileId}&sz=w800`;
        }

        // Dạng: drive.google.com/file/d/FILE_ID
        const m1 = url.match(/drive\.google\.com\/file\/d\/([^/&#?]+)/);
        if (m1) return toThumbnail(m1[1]);

        // Dạng: drive.google.com/open?id=FILE_ID
        const m2 = url.match(/drive\.google\.com\/open\?id=([^&#?]+)/);
        if (m2) return toThumbnail(m2[1]);

        // Dạng: drive.google.com/uc?export=view&id=FILE_ID hoặc uc?id=FILE_ID
        const m3 = url.match(/id=([^&#?]+)/);
        if (m3 && url.includes("drive.google.com")) return toThumbnail(m3[1]);

        return url;
    }


    // Bộ sưu tập ảnh mẫu chất lượng cao để hiển thị nếu thư mục Drive của bạn đang trống
    const DEFAULT_PLACEHOLDERS = {
        "NANGTHO": [
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80",
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80",
            "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80"
        ],
        "COTRANG": [
            "https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&q=80",
            "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=400&q=80",
            "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=400&q=80"
        ],
        "BEAUTY": [
            "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80",
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
            "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80"
        ],
        "NGOAICANH": [
            "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80",
            "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=400&q=80",
            "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=80"
        ],
        "NOEL": [
            "https://images.unsplash.com/photo-1545048702-79362596cdc9?w=800&q=80",
            "https://images.unsplash.com/photo-1577043848358-4638accd988c?w=400&q=80",
            "https://images.unsplash.com/photo-1512474929763-f43c802e374c?w=400&q=80"
        ],
        "SEXY": [
            "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=80",
            "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&q=80",
            "https://images.unsplash.com/photo-1496449903678-c8dd7459a22b?w=400&q=80"
        ],
        "SINHNHAT": [
            "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&q=80",
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80",
            "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=400&q=80"
        ],
        "TET": [
            "https://images.unsplash.com/photo-1610471926615-d4e5fbf4ea6e?w=800&q=80",
            "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&q=80",
            "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&q=80"
        ],
        "GENERAL": [
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80",
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
            "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80"
        ]
    };

    // Hàm chuẩn hóa chữ để so khớp placeholder
    function cleanTextForMatching(text) {
        if (!text) return "";
        return String(text)
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/[^A-Z0-9]/gi, "")
            .toUpperCase();
    }

    // Hàm đặt tên Concept chuẩn tối giản: Dùng đúng tên Tag chính
    function formatSmartTitle(rawTitle, themeName) {
        return themeName && themeName !== "Tất cả" ? themeName : "Nàng Thơ";
    }

    // Hàm dọn dẹp các từ DONE, DONEE khỏi tên concept/chủ đề khi hiển thị trên web
    function cleanTitle(title) {
        if (!title) return "";
        return title
            .replace(/^(DONE+E*|DONEE*)\s*[-_]*\s*/gi, "")
            .replace(/\s*[-_]*\s*(DONE+E*|DONEE*)$/gi, "")
            .trim();
    }

    // Hàm chuẩn hóa và gộp nhóm các tên chủ đề trùng nhau hoặc viết sai chính tả
    function normalizeThemeName(theme) {
        if (!theme) return "";
        let clean = String(theme).normalize("NFD")
            .replace(/^(CONCEPT|CONEPT)\s*[-_]*\s*/gi, "") // Xóa CONCEPT, CONEPT
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/Đ/g, "D")
            .replace(/đ/g, "d")
            .replace(/[^A-Z0-9]/gi, "")
            .toUpperCase();

        // Gộp nhóm về chuẩn chủ đề chính + các mùa
        if (clean === "COTRANG" || clean === "HANPHUC" || clean === "COPHUC") return "Cổ Trang";
        if (clean === "AODAI" || clean === "AODAIYEM" || clean === "AODAIVAYEM" || clean === "YEM" || clean === "TRUYENTHONG") return "Áo Dài";
        if (clean === "NGOAICANH" || clean === "NATURE") return "Ngoại Cảnh";
        if (clean === "SINHNHAT" || clean === "PARTY" || clean === "BIRTHDAY") return "Sinh Nhật";
        if (clean === "NANGTHO" || clean === "THO" || clean === "TIENNU" || clean === "NUTINH" || clean === "DIUDANG") return "Nàng Thơ";
        if (clean === "KYYEU") return "Kỷ Yếu";
        if (clean === "GIADINH") return "Gia Đình";
        if (clean === "BEAUTY" || clean === "CHANDUNG" || clean === "PROFILE" || clean === "LOOKBOOK") return "Beauty";
        if (clean === "SEXY" || clean === "QUYENRU") return "Sexy";
        if (clean === "CATINH" || clean === "STREET" || clean === "STREETSTYLE" || clean === "NANGDONG" || clean === "BIEN" || clean === "BIENHINH") return "Cá Tính";
        if (clean === "COUPLE" || clean === "BANTHAN" || clean === "DOI") return "Couple";

        // Nhóm Mùa & Lễ Hội
        if (clean === "MUAXUAN" || clean === "XUAN") return "Mùa Xuân";
        if (clean === "MUAHE" || clean === "HE" || clean === "SUMMER") return "Mùa Hè";
        if (clean === "MUATHU" || clean === "THU" || clean === "AUTUMN") return "Mùa Thu";
        if (clean === "MUADONG" || clean === "DONG" || clean === "WINTER") return "Mùa Đông";
        if (clean === "NOEL" || clean === "NOELDO" || clean === "GIANGSINH") return "Noel";
        if (clean === "TET" || clean === "TETNGUYENDAN") return "Tết";
        if (clean === "TRUNGTHU") return "Trung Thu";
        if (clean === "INDOOR") return "Indoor";

        // Nếu tên khác lạ, tự động viết hoa chữ cái đầu các từ
        return String(theme).normalize("NFC").trim()
            .replace(/^(CONCEPT|CONEPT)\s*[-_]*\s*/gi, "")
            .split(' ')
            .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
            .join(' ');
    }

    // Hàm trích xuất Tag CHUẨN (Hỗ trợ nạp trực tiếp danh sách phân tách bởi dấu phẩy từ Sheet, hoặc tự động bóc tách từ khóa nếu trống)
    function extractMultiTagsSmart(rawTheme, rawTitle, rawDesc) {
        // Nếu có rawTheme (chủ đề do người dùng nhập từ Sheet), phân tách bằng dấu phẩy và trả về trực tiếp
        if (rawTheme && String(rawTheme).trim().length > 0) {
            return String(rawTheme)
                .split(",")
                .map(t => t.trim())
                .filter(Boolean);
        }

        // Nếu hoàn toàn không có chủ đề, mặc định là "Concept"
        return ["Concept"];
    }


    // Hàm lấy Icon và Màu sắc chủ đạo tương ứng với 9 Chủ Đề Chuẩn
    function getThemeInfo(themeName) {
        const clean = cleanTextForMatching(themeName);
        if (clean.includes("NANGTHO") || clean.includes("THO") || clean.includes("TIENNU")) {
            return { icon: "🌸", color: "#ff758f", bg: "rgba(255,117,143,0.12)" };
        }
        if (clean.includes("COTRANG") || clean.includes("HANPHUC") || clean.includes("KIMONO")) {
            return { icon: "🏮", color: "#7209b7", bg: "rgba(114,9,183,0.12)" };
        }
        if (clean.includes("AODAI") || clean.includes("YEM")) {
            return { icon: "👗", color: "#d97706", bg: "rgba(217,119,6,0.12)" };
        }
        if (clean.includes("BEAUTY") || clean.includes("CHANDUNG") || clean.includes("PROFILE")) {
            return { icon: "👤", color: "#2563eb", bg: "rgba(37,99,235,0.12)" };
        }
        if (clean.includes("SINHNHAT") || clean.includes("BIRTHDAY") || clean.includes("SN")) {
            return { icon: "🎂", color: "#d97706", bg: "rgba(217,119,6,0.12)" };
        }
        if (clean.includes("CATINH") || clean.includes("SEXY") || clean.includes("STREET")) {
            return { icon: "🔥", color: "#dc2626", bg: "rgba(220,38,38,0.12)" };
        }
        if (clean.includes("BIEN") || clean.includes("OCEAN") || clean.includes("BEACH")) {
            return { icon: "🌊", color: "#0284c7", bg: "rgba(2,132,199,0.12)" };
        }
        if (clean.includes("COUPLE") || clean.includes("DOI") || clean.includes("BANTHAN")) {
            return { icon: "💖", color: "#db2777", bg: "rgba(219,39,119,0.12)" };
        }
        if (clean.includes("NOEL") || clean.includes("GIANGSINH")) {
            return { icon: "🎄", color: "#dc2626", bg: "rgba(220,38,38,0.12)" };
        }
        if (clean.includes("TET") || clean.includes("XUAN")) {
            return { icon: "🧧", color: "#ea580c", bg: "rgba(234,88,12,0.12)" };
        }
        return { icon: "🍍", color: "#f59e0b", bg: "rgba(245,158,11,0.12)" };
    }

    // Hàm chuẩn hóa tên chi nhánh (Đổi Q1, Quận 1 thành Quận 1-TPHCM)
    function normalizeBranchName(name, slug) {
        const raw = String(name || slug || "").normalize("NFC").trim();
        const s = raw.toUpperCase();
        if (s === "Q1" || s === "QUAN 1" || s === "QUẬN 1" || s === "TATT Q1" || s === "Q.1" || s.startsWith("Q1") || s.startsWith("QUẬN 1")) {
            return "Quận 1-TPHCM";
        }
        if (s.includes("THU DUC") || s.includes("THỦ ĐỨC")) return "Thủ Đức";
        if (s.includes("DA NANG") || s.includes("ĐÀ NẴNG")) return "Đà Nẵng";
        if (s.includes("CAN THO") || s.includes("CẦN THƠ")) return "Cần Thơ";
        if (s.includes("BIEN HOA") || s.includes("BIÊN HÒA")) return "Biên Hòa";
        if (s.includes("BINH DUONG") || s.includes("BÌNH DƯƠNG")) return "Bình Dương";
        return raw || "Concept";
    }

    // Phân tích dòng dữ liệu từ Google Sheets sang Object Concept chuẩn
    function parseSheetsRow(obj, rowIdx) {
        // Kiểm tra hộp kiểm Ẩn/Hiện (status/Ẩn === TRUE -> Ẩn concept khỏi web)
        const isHidden = (
            String(obj.status || obj['Ẩn'] || '').toUpperCase() === 'TRUE' ||
            String(obj.status || '').toUpperCase() === 'AN' ||
            String(obj.status || '') === '0' ||
            String(obj.active || '').toUpperCase() === 'FALSE'
        );

        // Trích xuất Tag chủ đề đa tag từ cột Chủ đề/theme
        const cleanedThemes = extractMultiTagsSmart(obj.theme || obj['Chủ đề'], obj.title || obj['Tên concept'] || obj.concept, obj.description || obj['Mô tả']);
        const primaryTheme = cleanedThemes[0] || "Nàng Thơ";
        const themeInfo = getThemeInfo(primaryTheme);

        const cleanedBranch = normalizeBranchName(obj.tag || obj.branch || obj.category || obj['Chi nhánh'], obj.category);
        const cleanedTitle = obj['Tên concept'] || obj.title || primaryTheme;

        // Tập hợp các ảnh thật từ img1 -> img12 từ Google Sheets (mới hỗ trợ 12 ảnh)
        let realImages = [];
        for (let n = 1; n <= 12; n++) {
            const imgVal = driveToDirectUrl(obj[`img${n}`]);
            if (imgVal) realImages.push(imgVal);
        }

        const hasRealImages = realImages.length > 0;
        let images = [...realImages];

        // Nếu concept chưa có ảnh trên Drive thì mới dự phòng ảnh placeholder
        if (images.length === 0) {
            const titleNorm = cleanTextForMatching(cleanedTitle);
            let fallbackKey = "GENERAL";
            for (const key in DEFAULT_PLACEHOLDERS) {
                if (titleNorm.includes(key)) {
                    fallbackKey = key;
                    break;
                }
            }
            images = DEFAULT_PLACEHOLDERS[fallbackKey];
        }

        const bgColor = obj.bgColor ? obj.bgColor.replace(/-/g, ",") : themeInfo.bg;
        const iconColor = obj.iconColor || themeInfo.color;
        const icon = obj.icon || themeInfo.icon;

        const isBestSeller = String(obj['Best Seller'] || obj.bestseller || '').toUpperCase() === 'TRUE';

        return {
            id: parseInt(obj.id || obj.concept_id || obj['STT']) || rowIdx + 1,
            branch: obj.branch || obj['Chi nhánh'] || "",
            theme: primaryTheme,
            themes: cleanedThemes, // Danh sách tất cả các tag
            title: cleanedTitle,
            category: obj.category || "nutinh",
            tag: cleanedBranch,
            icon: icon,
            iconColor: iconColor,
            bgColor: bgColor,
            description: obj.description || obj['Mô tả'] || "",
            images: images,
            hasRealImages: hasRealImages,
            isHidden: isHidden,
            isBestSeller: isBestSeller
        };
    }

    // Xử lý dữ liệu nhận được từ Google Sheets JSONP (Hỗ trợ Multi-tag đa chủ đề)
    function handleSheetsData(data) {
        try {
            const rows = data.table.rows;
            if (!rows || rows.length === 0) return;

            const cols = data.table.cols.map(c => (c.label || c.id || "").trim());
            const parsed = rows.map((row, rowIdx) => {
                const obj = {};
                row.c.forEach((cell, ci) => {
                    const colName = cols[ci] || "";
                    // Chuẩn hóa Unicode NFC trực tiếp khi nạp cell từ Google Sheets
                    obj[colName] = cell ? String(cell.v ?? "").normalize("NFC").trim() : "";
                });

                const concept = parseSheetsRow(obj, rowIdx);
                if (concept.isHidden) return null;
                return concept;
            }).filter(Boolean);

            if (parsed.length > 0) {
                CONCEPTS.length = 0;
                // Xáo trộn ngẫu nhiên toàn bộ concept để không bị cố định vị trí
                const randomizedConcepts = shuffleArray([...parsed]);
                randomizedConcepts.forEach(c => CONCEPTS.push(c));
                currentFiltered = [...CONCEPTS];
                setupGallery();
                randomizeHeroPolaroids(); // Cập nhật lại Polaroid stack ngẫu nhiên từ Sheets
                renderFilterBar();
                checkUrlAndOpenConcept();
                console.log(`[TiệmẢnh] ✅ Đã tải và xáo trộn ${parsed.length} concept ngẫu nhiên từ Google Sheets.`);
            }
        } catch (e) {
            console.warn("[TiệmẢnh] Lỗi xử lý dữ liệu từ Google Sheets:", e);
        }
    }

    // Hàm xáo trộn ngẫu nhiên mảng chuẩn (Fisher-Yates Shuffle)
    function shuffleArray(arr) {
        const copy = [...arr];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    }

    // Hàm chọn 3 concept từ bộ dữ liệu thật của studio để đưa lên Hero banner
    // Hàm lựa chọn 3 concept cho Hero Polaroid (Ưu tiên Best Seller)
    function selectHeroConcepts(concepts) {
        if (!concepts || concepts.length === 0) return [];
        // Chỉ chọn các concept có ảnh thật từ Google Sheets của studio (tuyệt đối không lấy ảnh mẫu)
        let realConcepts = concepts.filter(c => c.hasRealImages && c.images && c.images.length > 0 && !c.images[0].includes("unsplash"));
        if (realConcepts.length === 0) {
            realConcepts = concepts.filter(c => c.hasRealImages);
        }
        if (realConcepts.length === 0) {
            realConcepts = concepts;
        }

        // Tách Best Seller và Concept thường
        const bestSellers = realConcepts.filter(c => c.isBestSeller);
        const normals = realConcepts.filter(c => !c.isBestSeller);

        let selected = [];

        // Trộn ngẫu nhiên Best Seller và lấy tối đa 3
        const shuffledBest = [...bestSellers].sort(() => 0.5 - Math.random());
        selected = shuffledBest.slice(0, 3);

        // Nếu thiếu thì bù đắp bằng các bộ thường trộn ngẫu nhiên
        if (selected.length < 3) {
            const shuffledNormal = [...normals].sort(() => 0.5 - Math.random());
            const needed = 3 - selected.length;
            selected = selected.concat(shuffledNormal.slice(0, needed));
        }

        return selected.slice(0, 3);
    }

    function randomizeHeroPolaroids() {
        if (!CONCEPTS || CONCEPTS.length === 0) return;
        const polaroids = document.querySelectorAll(".polaroid-card");
        if (polaroids.length === 0) return;

        const selected = selectHeroConcepts(CONCEPTS);
        if (selected.length === 0) return;

        polaroids.forEach((card, i) => {
            if (i < selected.length) {
                const concept = selected[i];
                card.classList.remove("loading-skeleton");
                
                // Thêm nhãn ngọn lửa nhỏ nếu bộ concept là Best Seller
                const flameHtml = concept.isBestSeller ? `<span class="polaroid-best-badge">🔥 Hot</span>` : "";

                card.innerHTML = `
                    ${flameHtml}
                    <img src="${concept.images[0]}" alt="${concept.title}">
                    <div class="polaroid-caption">${concept.title}</div>
                `;

                // Gán sự kiện click để mở trực tiếp Lightbox của concept tương ứng
                card.onclick = (e) => {
                    e.preventDefault();
                    openLightbox(concept);
                };
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        });
        const showcase = document.querySelector(".tiemanh-hot-showcase");
        if (showcase) showcase.classList.add("loaded");
    }

    // 4b. Tải dữ liệu concept từ Google Sheets (CMS dạng bảng đơn - JSONP để bypass CORS)
    async function fetchConceptsFromSheets() {
        if (!CONFIG.sheetId) return;
        const gidParam = CONFIG.sheetGid ? `&gid=${CONFIG.sheetGid}` : "";
        const apiUrl = `https://docs.google.com/spreadsheets/d/${CONFIG.sheetId}/gviz/tq?tqx=out:json${gidParam}`;

        // Định nghĩa callback toàn cục để Google Sheets gọi vào
        window.google = window.google || {};
        window.google.visualization = window.google.visualization || {};
        window.google.visualization.Query = window.google.visualization.Query || {};

        let hasLoaded = false;
        window.google.visualization.Query.setResponse = function (response) {
            hasLoaded = true;
            handleSheetsData(response);
            const scriptTag = document.getElementById("tiemanh-sheets-jsonp");
            if (scriptTag) scriptTag.remove();
        };

        // Nhúng thẻ script để load dữ liệu (vượt qua hoàn toàn lỗi CORS của trình duyệt)
        const oldScript = document.getElementById("tiemanh-sheets-jsonp");
        if (oldScript) oldScript.remove();

        const script = document.createElement("script");
        script.id = "tiemanh-sheets-jsonp";
        script.src = apiUrl;
        script.onerror = function () {
            console.warn("[TiệmẢnh] Không thể kết nối Google Sheets (Sheet có thể đang bị đặt Riêng tư / 401). Đang hiển thị danh sách concept mặc định.");
            if (!hasLoaded) {
                currentFiltered = [...CONCEPTS];
                setupGallery();
                randomizeHeroPolaroids();
                renderFilterBar();
            }
        };
        document.head.appendChild(script);

        // Fallback Timeout: Nếu sau 3 giây Sheet không phản hồi, tự động render concept để không bị trắng trang
        setTimeout(() => {
            if (!hasLoaded) {
                console.warn("[TiệmẢnh] Quá thời gian chờ Google Sheet, tự động hiển thị dữ liệu dự phòng.");
                currentFiltered = [...CONCEPTS];
                setupGallery();
                randomizeHeroPolaroids();
                renderFilterBar();
            }
        }, 3000);
    }



    // 5. Quản lý danh sách Concept, Phân trang và Bộ Lọc (Lọc kép)
    let currentFiltered = [...CONCEPTS];
    let selectedBranch = "all";
    let selectedTheme = "all";
    let currentPage = 1;
    const ITEMS_PER_PAGE = 6;
    let activePricingScrollFn = null; // Lưu hàm cuộn bảng giá di động

    function setupGallery() {
        const grid = document.getElementById("conceptGrid");
        if (!grid) return;

        grid.innerHTML = "";

        // Tính toán phân trang
        const totalPages = Math.ceil(currentFiltered.length / ITEMS_PER_PAGE);
        if (currentPage > totalPages) currentPage = Math.max(1, totalPages);
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const pageConcepts = currentFiltered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

        // Intersection Observer để lazy load ảnh khi xuất hiện trong viewport
        const imgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute("data-src");
                    if (src) {
                        img.src = src;
                        img.removeAttribute("data-src");
                        img.style.background = "";
                    }
                    observer.unobserve(img);
                }
            });
        }, { rootMargin: "200px 0px", threshold: 0.01 });

        pageConcepts.forEach((concept, index) => {
            const card = document.createElement("div");
            card.className = "tiemanh-card";
            card.setAttribute("data-id", concept.id);

            const img0 = concept.images[0] || "";
            const img1 = concept.images[1] || "";
            const img2 = concept.images[2] || "";
            const placeholderStyle = "background:linear-gradient(135deg,#f0f0f0,#e0e0e0);min-height:80px;";

            const themesList = (concept.themes && concept.themes.length > 0) ? concept.themes : [concept.theme || "Nàng Thơ"];
            const filteredThemesList = themesList.filter(t => {
                const cleanT = t.trim().toUpperCase();
                return cleanT !== "CONCEPT" && cleanT !== "CONEPT";
            });
            const badgesHtml = filteredThemesList.map(t => {
                const info = getThemeInfo(t);
                return `<span class="tiemanh-card-badge" style="background:${info.bg};color:${info.color};">${info.icon} ${t}</span>`;
            }).join("");

            const bestSellerHtml = concept.isBestSeller ? `<span class="concept-best-badge">🔥 Best Seller</span>` : "";

            card.innerHTML = `
                ${bestSellerHtml}
                <div class="collage-wrapper">
                    <img data-src="${img0}" class="collage-main-img" alt="${concept.title}" style="${img0 ? placeholderStyle : 'display:none'}">
                    <div class="collage-side">
                        <img data-src="${img1}" class="collage-side-img top" alt="${concept.title}" style="${img1 ? placeholderStyle : 'display:none'}">
                        <img data-src="${img2}" class="collage-side-img bottom" alt="${concept.title}" style="${img2 ? placeholderStyle : 'display:none'}">
                    </div>
                </div>
                <div class="tiemanh-card-footer">
                    <div class="tiemanh-card-meta">
                        <div class="tiemanh-card-icon-box" style="background: ${concept.bgColor}; color: ${concept.iconColor};">
                            ${concept.icon}
                        </div>
                        <div class="tiemanh-card-title-box">
                            <h4 class="tiemanh-card-title">${concept.title}</h4>
                            <div class="tiemanh-card-badges">
                                ${badgesHtml}
                                <span class="tiemanh-card-badge branch-badge">📍 ${concept.tag || concept.category}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Lazy load từng ảnh khi vào viewport
            card.querySelectorAll("img[data-src]").forEach(img => {
                if (img.getAttribute("data-src")) {
                    imgObserver.observe(img);
                }
            });

            // Click mở Lightbox
            card.addEventListener("click", () => {
                openLightbox(concept);
            });
            grid.appendChild(card);
        });

        // Vẽ thanh phân trang
        const paginationContainer = document.getElementById("tiemanhPagination");
        if (paginationContainer) {
            if (totalPages <= 1) {
                paginationContainer.innerHTML = "";
            } else {
                let html = "";

                // Nút Prev
                html += `<button class="tiemanh-page-btn prev ${currentPage === 1 ? 'disabled' : ''}" data-page="${currentPage - 1}">❮</button>`;

                const maxVisiblePages = 5;
                let startPage = Math.max(1, currentPage - 2);
                let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

                if (endPage - startPage + 1 < maxVisiblePages) {
                    startPage = Math.max(1, endPage - maxVisiblePages + 1);
                }

                // Trang đầu tiên và dấu ba chấm bên trái
                if (startPage > 1) {
                    html += `<button class="tiemanh-page-btn" data-page="1">1</button>`;
                    if (startPage > 2) {
                        html += `<span style="color:#94a3b8; font-weight:700; padding:0 8px; display:inline-block; align-self:center; user-select:none;">...</span>`;
                    }
                }

                // Các trang ở giữa
                for (let i = startPage; i <= endPage; i++) {
                    html += `<button class="tiemanh-page-btn ${currentPage === i ? 'active' : ''}" data-page="${i}">${i}</button>`;
                }

                // Dấu ba chấm bên phải và trang cuối cùng
                if (endPage < totalPages) {
                    if (endPage < totalPages - 1) {
                        html += `<span style="color:#94a3b8; font-weight:700; padding:0 8px; display:inline-block; align-self:center; user-select:none;">...</span>`;
                    }
                    html += `<button class="tiemanh-page-btn" data-page="${totalPages}">${totalPages}</button>`;
                }

                // Nút Next
                html += `<button class="tiemanh-page-btn next ${currentPage === totalPages ? 'disabled' : ''}" data-page="${currentPage + 1}">❯</button>`;

                paginationContainer.innerHTML = html;

                // Gắn sự kiện click bằng Event Delegation (Ủy quyền sự kiện) đảm bảo luôn hoạt động ổn định
                if (!paginationContainer.hasListener) {
                    paginationContainer.hasListener = true;
                    paginationContainer.addEventListener("click", (e) => {
                        const btn = e.target.closest(".tiemanh-page-btn");
                        if (!btn || btn.classList.contains("disabled")) return;

                        const targetPage = parseInt(btn.getAttribute("data-page"));
                        if (targetPage && targetPage !== currentPage) {
                            currentPage = targetPage;

                            // Cuộn mượt lên vị trí lọc/danh sách concept (được bọc try-catch an toàn)
                            try {
                                const filterBar = document.getElementById("filterBar") || document.getElementById("conceptGrid");
                                if (filterBar) {
                                    smoothScrollToSection(filterBar.id);
                                }
                            } catch (err) {
                                console.warn("Lỗi cuộn trang:", err);
                            }

                            setupGallery();
                        }
                    });
                }
            }
        }
    }


    // 6. Trình xem ảnh Lightbox
    let activeConcept = null;
    let activeImgIdx = 0;
    let isZoomed = false;

    function openLightbox(concept) {
        activeConcept = concept;
        activeImgIdx = 0;
        isZoomed = false;

        const overlay = document.getElementById("lightboxOverlay");
        const lightboxImg = document.getElementById("lightboxImg");
        const lightboxCat = document.getElementById("lightboxCat");
        const lightboxTitle = document.getElementById("lightboxTitle");
        const lightboxDesc = document.getElementById("lightboxDesc");
        const thumbsContainer = document.getElementById("lightboxThumbs");

        if (!overlay || !lightboxImg) return;

        const filteredThemes = (concept.themes || []).filter(t => {
            const cleanT = t.trim().toUpperCase();
            return cleanT !== "CONCEPT" && cleanT !== "CONEPT";
        });
        const displayThemes = filteredThemes.length > 0 ? filteredThemes.join(" • ") : (concept.tag || "");
        lightboxCat.textContent = displayThemes ? `CONCEPT ${displayThemes.toUpperCase()}` : "CONCEPT NGHỆ THUẬT";
        lightboxTitle.textContent = concept.title;

        let desc = String(concept.description || "").trim();
        if (desc.toLowerCase().startsWith("concept done")) {
            desc = desc.replace(/^(concept done|concept done mẫu|concept)\s*/gi, "").trim();
            desc = desc.charAt(0).toUpperCase() + desc.slice(1);
            desc = `Bộ ảnh ${desc}. Được đầu tư kỹ lưỡng từ trang phục, ánh sáng và bối cảnh độc quyền tại Tiệm Ảnh Trái Thơm.`;
        } else if (!desc) {
            desc = `Bộ ảnh ${concept.title} được đầu tư kỹ lưỡng từ trang phục, makeup và bối cảnh nghệ thuật độc quyền tại Tiệm Ảnh Trái Thơm.`;
        }
        lightboxDesc.textContent = desc;

        // Cập nhật zoom state về mặc định
        lightboxImg.className = "tiemanh-lightbox-img";

        // Tạo danh sách ảnh thu nhỏ (Thumbnails)
        thumbsContainer.innerHTML = "";
        const totalImages = concept.images.length;
        concept.images.forEach((imgUrl, idx) => {
            const thumb = document.createElement("img");
            thumb.src = imgUrl;
            thumb.alt = `${concept.title} - Ảnh ${idx + 1}`;
            thumb.className = `tiemanh-lightbox-thumb ${idx === 0 ? "active" : ""}`;
            thumb.title = `Ảnh ${idx + 1} / ${totalImages}`;
            thumb.addEventListener("click", () => {
                selectLightboxImage(idx);
            });
            thumbsContainer.appendChild(thumb);
        });

        // Cập nhật bộ đếm
        const counter = document.getElementById("lightboxImgCounter");
        if (counter) counter.textContent = `1 / ${totalImages}`;

        // Set ảnh chính hiển thị ban đầu
        if (concept.images && concept.images.length > 0) {
            lightboxImg.src = concept.images[0];
        }

        // Cập nhật URL Deep Link để người xem có link riêng tới concept này
        try {
            const url = new URL(window.location.href);
            url.searchParams.set("concept", concept.id);
            window.history.replaceState({ conceptId: concept.id }, "", url.toString());
        } catch (e) {
            window.location.hash = `concept-${concept.id}`;
        }

        overlay.classList.add("active");
    }

    function closeLightbox() {
        const overlay = document.getElementById("lightboxOverlay");
        if (overlay) overlay.classList.remove("active");
        try {
            const url = new URL(window.location.href);
            url.searchParams.delete("concept");
            window.history.replaceState({}, "", url.pathname + (url.search ? url.search : ""));
        } catch (e) { }
    }

    function selectLightboxImage(idx) {
        if (!activeConcept) return;
        activeImgIdx = idx;
        isZoomed = false;

        const lightboxImg = document.getElementById("lightboxImg");
        lightboxImg.src = activeConcept.images[idx];
        lightboxImg.className = "tiemanh-lightbox-img";

        // Cập nhật bộ đếm
        const counter = document.getElementById("lightboxImgCounter");
        if (counter) counter.textContent = `${idx + 1} / ${activeConcept.images.length}`;

        // Cuộn thumbnail đang active vào vùng nhìn thấy
        const thumbs = document.querySelectorAll(".tiemanh-lightbox-thumb");
        thumbs.forEach((t, i) => {
            if (i === idx) {
                t.classList.add("active");
                t.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
            } else {
                t.classList.remove("active");
            }
        });
    }

    function prevLightboxImage() {
        if (!activeConcept) return;
        let newIdx = activeImgIdx - 1;
        if (newIdx < 0) newIdx = activeConcept.images.length - 1;
        selectLightboxImage(newIdx);
    }

    // eslint-disable-next-line no-unused-vars
    function nextLightboxImage() {
        if (!activeConcept) return;
        let newIdx = (activeImgIdx + 1) % activeConcept.images.length;
        selectLightboxImage(newIdx);
    }

    // 7. Hộp thoại Đăng Ký Tư Vấn
    function openBookingModal(defaultConcept = "none") {
        const modal = document.getElementById("bookingModal");
        const conceptSelect = document.getElementById("formConcept");
        const form = document.getElementById("bookingForm");
        const success = document.getElementById("successBox");

        if (!modal) return;

        // Reset form
        if (form && success) {
            form.style.display = "flex";
            success.style.display = "none";
            form.reset();
        }

        if (conceptSelect && defaultConcept !== "none") {
            conceptSelect.value = defaultConcept;
        }

        modal.classList.add("active");
    }

    function closeBookingModal() {
        const modal = document.getElementById("bookingModal");
        if (modal) modal.classList.remove("active");
    }

    // Hiệu ứng pháo hoa giấy Confetti đơn giản khi gửi form thành công
    function triggerConfetti() {
        const duration = 2.5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 25, spread: 360, ticks: 50, zIndex: 9999 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 20 * (timeLeft / duration);

            // Tạo các mẩu confetti giả lập bằng DOM
            for (let i = 0; i < particleCount; i++) {
                const conf = document.createElement("div");
                conf.style.position = "fixed";
                conf.style.width = randomInRange(6, 12) + "px";
                conf.style.height = randomInRange(6, 12) + "px";
                conf.style.background = ["#fbc02d", "#ff758f", "#ff477e", "#2a9d8f", "#4361ee"][Math.floor(Math.random() * 5)];
                conf.style.borderRadius = "50%";
                conf.style.left = randomInRange(0, 100) + "vw";
                conf.style.top = "-10px";
                conf.style.zIndex = "9999";
                conf.style.opacity = "0.8";

                document.body.appendChild(conf);

                // Animate rơi xuống
                const anim = conf.animate([
                    { transform: "translateY(0) rotate(0deg)", opacity: 0.8 },
                    { transform: `translateY(110vh) translateX(${randomInRange(-150, 150)}px) rotate(${randomInRange(0, 720)}deg)`, opacity: 0 }
                ], {
                    duration: randomInRange(1500, 2500),
                    easing: "cubic-bezier(0.1, 0.8, 0.3, 1)"
                });

                anim.onfinish = () => conf.remove();
            }
        }, 150);
    }

    // 8. Đăng ký tương tác sự kiện
    function setupInteractions() {
        // Đăng ký sự kiện lọc danh mục
        setupFilterEvents();

        // Đóng mở Lightbox
        const lightboxOverlay = document.getElementById("lightboxOverlay");
        const lightboxClose = document.getElementById("lightboxClose");
        const lightboxPrev = document.getElementById("lightboxPrev");
        const lightboxNext = document.getElementById("lightboxNext");
        const lightboxImg = document.getElementById("lightboxImg");

        if (lightboxClose) {
            lightboxClose.addEventListener("click", closeLightbox);
        }

        if (lightboxOverlay) {
            // Click ra ngoài đóng
            lightboxOverlay.addEventListener("click", (e) => {
                if (e.target === lightboxOverlay) {
                    closeLightbox();
                }
            });
        }

        // Prev / Next Lightbox
        if (lightboxPrev) lightboxPrev.addEventListener("click", prevLightboxImage);
        if (lightboxNext) lightboxNext.addEventListener("click", nextLightboxImage);

        // Zoom hình ảnh chính trong Lightbox
        if (lightboxImg) {
            lightboxImg.addEventListener("click", () => {
                isZoomed = !isZoomed;
                if (isZoomed) {
                    lightboxImg.classList.add("zoomed");
                } else {
                    lightboxImg.classList.remove("zoomed");
                }
            });

            // 🔥 Thêm chức năng vuốt (Swipe) trên Mobile
            let touchStartX = 0;
            let touchEndX = 0;
            lightboxImg.addEventListener("touchstart", (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            lightboxImg.addEventListener("touchend", (e) => {
                touchEndX = e.changedTouches[0].screenX;
                const diffX = touchEndX - touchStartX;
                // Ngưỡng vuốt tối thiểu là 50px
                if (Math.abs(diffX) > 50) {
                    if (diffX < 0) {
                        nextLightboxImage(); // Vuốt sang trái -> Xem ảnh tiếp theo
                    } else {
                        prevLightboxImage(); // Vuốt sang phải -> Xem ảnh trước đó
                    }
                }
            }, { passive: true });
        }

        // Nhấp nút Đặt lịch trên Lightbox panel
        const lightboxBookBtn = document.getElementById("lightboxBookBtn");
        if (lightboxBookBtn) {
            lightboxBookBtn.addEventListener("click", () => {
                if (lightboxOverlay) lightboxOverlay.classList.remove("active");
                if (activeConcept) {
                    openZaloModal(`Concept: ${activeConcept.title}`);
                } else {
                    openZaloModal("Đặt Lịch Chụp Ảnh");
                }
            });
        }



        // Bấm các nút mở Zalo modal thay thế cho booking modal
        const btnDatLichHeader = document.getElementById("btnDatLichHeader");
        const btnHeroTuVan = document.getElementById("btnHeroTuVan");
        const btnCtaTuVan = document.getElementById("btnCtaTuVan");

        if (btnDatLichHeader) btnDatLichHeader.addEventListener("click", () => openZaloModal("Đặt Lịch Chụp Ảnh"));
        if (btnHeroTuVan) btnHeroTuVan.addEventListener("click", () => openZaloModal("Tư Vấn Concept & Đặt Lịch"));
        if (btnCtaTuVan) btnCtaTuVan.addEventListener("click", () => openZaloModal("Đăng Ký Nhận Ưu Đãi Tháng Này"));

        // Bấm nút đóng booking modal (vẫn giữ để tránh lỗi tham chiếu)
        const modalCloseBtn = document.getElementById("modalCloseBtn");
        const successCloseBtn = document.getElementById("successCloseBtn");
        const bookingModal = document.getElementById("bookingModal");

        if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeBookingModal);
        if (successCloseBtn) successCloseBtn.addEventListener("click", closeBookingModal);
        if (bookingModal) {
            bookingModal.addEventListener("click", (e) => {
                if (e.target === bookingModal) closeBookingModal();
            });
        }

        // Xử lý Popup Zalo chuyên nghiệp cải tiến
        const zaloModal = document.getElementById("zaloModal");
        const zaloModalCloseBtn = document.getElementById("zaloModalCloseBtn");
        const zaloFloatingBtn = document.getElementById("zaloFloatingBtn");
        const zaloQuickPricingBtn = document.getElementById("zaloQuickPricingBtn");
        const zaloQuickBranchBtn = document.getElementById("zaloQuickBranchBtn");
        const zaloGuideTooltip = document.getElementById("zaloGuideTooltip");
        const zaloGuideCloseBtn = document.getElementById("zaloGuideCloseBtn");

        function openZaloModal(contextText = "") {
            const badge = document.getElementById("zaloSelectedBadge");
            const badgeText = document.getElementById("zaloBadgeText");

            if (contextText && badge && badgeText) {
                badgeText.textContent = contextText;
                badge.style.display = "flex";
            } else if (badge) {
                badge.style.display = "none";
            }

            if (zaloModal) zaloModal.classList.add("active");
        }

        function closeZaloModal() {
            if (zaloModal) zaloModal.classList.remove("active");
        }

        if (zaloFloatingBtn) zaloFloatingBtn.addEventListener("click", () => openZaloModal());
        if (zaloModalCloseBtn) zaloModalCloseBtn.addEventListener("click", closeZaloModal);
        if (zaloModal) {
            zaloModal.addEventListener("click", (e) => {
                if (e.target === zaloModal) closeZaloModal();
            });
        }

        // Click 2 nút nhanh trong Zalo Modal
        if (zaloQuickPricingBtn) {
            zaloQuickPricingBtn.addEventListener("click", () => {
                closeZaloModal();
                smoothScrollToSection("banggiaSection");
            });
        }
        if (zaloQuickBranchBtn) {
            zaloQuickBranchBtn.addEventListener("click", () => {
                closeZaloModal();
                smoothScrollToSection("chinhanhSection");
            });
        }

        // Xử lý tooltip hướng dẫn chỉa vào Zalo
        if (zaloGuideCloseBtn && zaloGuideTooltip) {
            zaloGuideCloseBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                zaloGuideTooltip.style.opacity = "0";
                zaloGuideTooltip.style.transform = "translateY(15px) scale(0.9)";
                setTimeout(() => { zaloGuideTooltip.style.display = "none"; }, 300);
            });
        }


        // Submit form đặt lịch
        const bookingForm = document.getElementById("bookingForm");
        const successBox = document.getElementById("successBox");
        if (bookingForm && successBox) {
            bookingForm.addEventListener("submit", async (e) => {
                e.preventDefault();

                // Thu thập thông tin khách hàng nhập
                const name = document.getElementById("formName")?.value || document.getElementById("bookingName")?.value || "";
                const phone = document.getElementById("formPhone")?.value || document.getElementById("bookingPhone")?.value || "";
                const concept = document.getElementById("formConcept")?.value || document.getElementById("bookingConcept")?.value || "";
                const branch = document.getElementById("formBranch")?.value || document.getElementById("bookingBranch")?.value || "";
                const note = document.getElementById("formNote")?.value || document.getElementById("bookingNote")?.value || "";

                const formData = {
                    name: name,
                    phone: phone,
                    concept: concept,
                    branch: branch,
                    note: note,
                    submittedAt: new Date().toLocaleString("vi-VN"),
                    sourceUrl: window.location.href,
                    userAgent: navigator.userAgent
                };

                // Phát Custom Event cho Webcake / Pancake tracking pixel (FB Pixel, GTM, Tiktok Pixel, v.v.)
                const trackingEvent = new CustomEvent("tiemanh-booking-success", { detail: formData });
                window.dispatchEvent(trackingEvent);

                // Gửi thông tin sang Webhook (nếu cấu hình webhookUrl)
                if (CONFIG && CONFIG.webhookUrl) {
                    try {
                        await fetch(CONFIG.webhookUrl, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(formData),
                            mode: "cors"
                        });
                    } catch (err) {
                        console.error("Gửi dữ liệu đặt lịch sang webhook thất bại:", err);
                    }
                }

                // Chuyển hướng sang trang Cảm ơn hoặc hiện Popup Confetti thành công
                if (CONFIG && CONFIG.redirectUrl) {
                    window.location.href = CONFIG.redirectUrl;
                } else {
                    // Ẩn form, hiện success screen
                    bookingForm.style.display = "none";
                    successBox.style.display = "flex";
                    // Nổ pháo hoa giấy chúc mừng
                    triggerConfetti();
                }
            });
        }

        // Một số nút menu phụ hoặc logo để cuộn lên trên cùng
        const logoLinks = document.querySelectorAll(".tiemanh-logo");
        logoLinks.forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
            });
        });

        // Hàm cuộn mượt thông minh (hỗ trợ cả cuộn cửa sổ và cuộn Webcake overlay)
        function smoothScrollToSection(targetId) {
            if (!targetId) {
                window.scrollTo({ top: 0, behavior: "smooth" });
                const c = document.getElementById("tiemanh-container") || document.getElementById(CONFIG.targetId);
                if (c) c.scrollTo({ top: 0, behavior: "smooth" });
                return;
            }

            const targetEl = document.getElementById(targetId);
            if (!targetEl) return;

            const navbar = document.getElementById("tiemanh-navbar");
            const navHeight = navbar ? navbar.offsetHeight : 70;

            // Tính vị trí section so với document
            const rect = targetEl.getBoundingClientRect();
            const absoluteTop = window.pageYOffset + rect.top;

            // Cuộn window đến section (trừ chiều cao navbar sticky để nội dung không bị che)
            window.scrollTo({ top: Math.max(0, absoluteTop - navHeight), behavior: "smooth" });

            // Cũng thử cuộn container nếu trang nhúng trong div scrollable (Webcake iframe)
            const container = document.getElementById("tiemanh-container") || document.getElementById(CONFIG.targetId);
            if (container && getComputedStyle(container).overflowY !== "visible") {
                let el = targetEl;
                let topPos = 0;
                while (el && el !== container) {
                    topPos += el.offsetTop;
                    el = el.offsetParent;
                }
                container.scrollTo({ top: Math.max(0, topPos - navHeight), behavior: "smooth" });
            }

            // GẮN CHẶT MOBILE CAROUSEL GÓI TOẢ SÁNG
            if (targetId === "banggiaSection" && window.innerWidth <= 991 && activePricingScrollFn) {
                setTimeout(() => {
                    activePricingScrollFn(1);
                }, 300);
            }
        }

        // Xử lý cuộn mượt cho toàn bộ Menu Header
        const menuScrollLinks = [
            { id: "menuTrangChu", targetId: null }, // null tức là cuộn lên top
            { id: "menuConcept", targetId: "filterBar" },
            { id: "menuBangGia", targetId: "banggiaSection" },
            { id: "menuQuyTrinh", targetId: "quytrinhSection" },
            { id: "menuChiNhanh", targetId: "chinhanhSection" },
            { id: "menuLienHe", targetId: "tiemanh-footer" }
        ];

        menuScrollLinks.forEach(link => {
            const el = document.getElementById(link.id);
            if (el) {
                el.addEventListener("click", (e) => {
                    e.preventDefault();

                    // Loại bỏ class active ở tất cả menu items
                    document.querySelectorAll(".tiemanh-menu-item").forEach(item => {
                        item.classList.remove("active");
                    });

                    // Thêm class active cho thẻ cha li
                    el.closest(".tiemanh-menu-item")?.classList.add("active");

                    smoothScrollToSection(link.targetId);
                });
            }
        });

        // Bấm chọn từ bảng giá sẽ tự động mở modal Zalo và điền gói tương ứng
        const priceBtns = document.querySelectorAll(".btn-price-select");
        priceBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                const conceptName = btn.getAttribute("data-concept") || "";
                openZaloModal("Gói: " + conceptName);
            });
        });

        // Xử lý nút bấm trên Hero Section
        const btnHeroDatLich = document.getElementById("btnHeroDatLich");
        if (btnHeroDatLich) {
            btnHeroDatLich.addEventListener("click", (e) => {
                e.preventDefault();
                openZaloModal("Đặt Lịch Chụp Ảnh");
            });
        }

        const btnHeroExplore = document.getElementById("btnHeroExplore");
        if (btnHeroExplore) {
            btnHeroExplore.addEventListener("click", (e) => {
                e.preventDefault();
                smoothScrollToSection("filterBar");
            });
        }



        // Xử lý nút Sao chép Link Concept
        const lightboxShareBtn = document.getElementById("lightboxShareBtn");
        if (lightboxShareBtn) {
            lightboxShareBtn.addEventListener("click", () => {
                if (!activeConcept) return;
                const shareUrl = new URL(window.location.href);
                shareUrl.searchParams.set("concept", activeConcept.id);
                const fullLink = shareUrl.toString();

                function showCopiedStatus() {
                    const originalHtml = lightboxShareBtn.innerHTML;
                    lightboxShareBtn.innerHTML = "<span>✅ Đã sao chép link!</span>";
                    lightboxShareBtn.style.background = "#10b981";
                    lightboxShareBtn.style.borderColor = "#10b981";
                    lightboxShareBtn.style.color = "#ffffff";
                    setTimeout(() => {
                        lightboxShareBtn.innerHTML = originalHtml;
                        lightboxShareBtn.style.background = "";
                        lightboxShareBtn.style.borderColor = "";
                        lightboxShareBtn.style.color = "";
                    }, 2200);
                }

                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(fullLink).then(() => showCopiedStatus()).catch(() => {
                        copyFallback(fullLink);
                    });
                } else {
                    copyFallback(fullLink);
                }

                function copyFallback(text) {
                    const temp = document.createElement("input");
                    temp.value = text;
                    document.body.appendChild(temp);
                    temp.select();
                    document.execCommand("copy");
                    document.body.removeChild(temp);
                    showCopiedStatus();
                }
            });
        }

        // Kích hoạt nút cuộn lên đầu trang (Back to top)
        setupBackToTop();

        // Kiểm tra URL xem khách có vào bằng link concept riêng không
        checkUrlAndOpenConcept();

        // Kích hoạt Bảng giá (sử dụng bảng giá tĩnh định nghĩa trực tiếp trong file HTML bên trên)
        setupPricingCarousel();

        // Xử lý cuộn mượt cho các liên kết ở Footer
        const footerLinks = document.querySelectorAll(".tiemanh-footer-links a");
        footerLinks.forEach(link => {
            link.addEventListener("click", (e) => {
                const href = link.getAttribute("href");
                if (href && href.startsWith("#")) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    if (targetId === "banggiaSection") smoothScrollToSection("banggiaSection");
                    else if (targetId === "quytrinhSection") smoothScrollToSection("quytrinhSection");
                    else if (targetId === "chinhanhSection") smoothScrollToSection("chinhanhSection");
                    else if (targetId === "filterBar") smoothScrollToSection("filterBar");
                }
            });
        });
    }

    // Hàm kiểm tra đường link chia sẻ concept riêng khi người dùng truy cập
    function checkUrlAndOpenConcept() {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const conceptParam = urlParams.get("concept");
            const hashMatch = window.location.hash.match(/concept-(\d+)/);
            const targetId = conceptParam || (hashMatch ? hashMatch[1] : null);

            if (targetId && CONCEPTS && CONCEPTS.length > 0) {
                const targetConcept = CONCEPTS.find(c => String(c.id) === String(targetId));
                if (targetConcept) {
                    setTimeout(() => {
                        openLightbox(targetConcept);
                        const targetCard = document.querySelector(`[data-id="${targetId}"]`);
                        if (targetCard) {
                            targetCard.scrollIntoView({ behavior: "smooth", block: "center" });
                        }
                    }, 400);
                }
            }
        } catch (err) {
            console.warn("Lỗi kiểm tra link concept:", err);
        }
    }



    // Hàm quản lý nút Cuộn lên đầu trang (Back to top)
    function setupBackToTop() {
        const btn = document.getElementById("tiemanhBackToTop");
        if (!btn) return;

        function checkScroll() {
            const scrollY = window.scrollY || document.documentElement.scrollTop || (document.getElementById("tiemanh-container") ? document.getElementById("tiemanh-container").scrollTop : 0);
            if (scrollY > 350) {
                btn.classList.add("show");
            } else {
                btn.classList.remove("show");
            }
        }

        window.addEventListener("scroll", checkScroll, { passive: true });
        const container = document.getElementById("tiemanh-container");
        if (container) container.addEventListener("scroll", checkScroll, { passive: true });

        btn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            if (container) container.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // Hàm quản lý Bảng giá Carousel kéo trượt & vòng lặp 3 gói
    function setupPricingCarousel() {
        const slider = document.getElementById("pricingSlider");
        const prevBtn = document.getElementById("pricingPrevBtn");
        const nextBtn = document.getElementById("pricingNextBtn");
        const dots = document.querySelectorAll(".tiemanh-pricing-dot");
        if (!slider) return;

        let currentIndex = 1; // Mặc định ở gói Toả Sáng (Best seller)
        const totalCards = 3;

        function scrollToPackage(index) {
            // Vòng lặp giữa 3 gói giá (0 -> 1 -> 2 -> 0)
            currentIndex = (index + totalCards) % totalCards;
            const cards = slider.querySelectorAll(".tiemanh-price-card");
            const card = cards[currentIndex];
            if (card) {
                // Tính toán vị trí cuộn ngang chuẩn xác để căn giữa card trên mobile
                const sliderWidth = slider.clientWidth;
                const cardWidth = card.offsetWidth;
                const cardOffsetLeft = card.offsetLeft;
                const targetScrollLeft = cardOffsetLeft - (sliderWidth - cardWidth) / 2;
                slider.scrollTo({ left: Math.max(0, targetScrollLeft), behavior: "smooth" });
            }
            dots.forEach((d, i) => {
                d.classList.toggle("active", i === currentIndex);
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener("click", () => {
                scrollToPackage(currentIndex - 1);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                scrollToPackage(currentIndex + 1);
            });
        }

        dots.forEach(dot => {
            dot.addEventListener("click", () => {
                const idx = parseInt(dot.getAttribute("data-index")) || 0;
                scrollToPackage(idx);
            });
        });

        // Hỗ trợ kéo chuột mượt mà
        enableDragScroll(slider);

        // Cập nhật dot active khi người dùng vuốt/kéo trên mobile/desktop
        slider.addEventListener("scroll", () => {
            const scrollLeft = slider.scrollLeft;
            const cardWidth = slider.querySelector(".tiemanh-price-card")?.offsetWidth || 300;
            const approxIndex = Math.round(scrollLeft / (cardWidth + 25));
            const safeIndex = Math.max(0, Math.min(approxIndex, totalCards - 1));
            dots.forEach((d, i) => {
                d.classList.toggle("active", i === safeIndex);
            });
            currentIndex = safeIndex;
        }, { passive: true });

        // Tự động cuộn đến gói Tỏa Sáng (index 1) trên mobile khi trang web được tải
        setTimeout(() => {
            scrollToPackage(1);
        }, 1000);

        activePricingScrollFn = scrollToPackage; // Lưu lại tham chiếu hàm cuộn
    }

    // Hàm kích hoạt kéo chuột mượt mà (Drag to Scroll) cho PC và hỗ trợ cảm ứng Mobile
    function enableDragScroll(slider) {
        if (!slider || slider.hasDragListener) return;
        slider.hasDragListener = true;
        let isDown = false;
        let startX;
        let scrollLeft;
        let isDragging = false;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            isDragging = false;
            slider.classList.add('active-drag');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active-drag');
        });
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active-drag');
            setTimeout(() => { isDragging = false; }, 50);
        });
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 1.5;
            if (Math.abs(walk) > 4) isDragging = true;
            slider.scrollLeft = scrollLeft - walk;
        });

        // Ngăn chặn click nhầm khi đang kéo trượt
        slider.addEventListener('click', (e) => {
            if (isDragging) {
                e.stopPropagation();
                e.preventDefault();
            }
        }, true);
    }

    // 9. Hàm hỗ trợ vẽ lại Bộ lọc & Sự kiện động (Hỗ trợ bộ lọc kép thông minh & Multi-tag)
    function renderFilterBar() {
        const branchBar = document.getElementById("branchFilterBar");
        const themeBar = document.getElementById("themeFilterBar");
        if (!branchBar) return;

        // 1. Trích xuất các chi nhánh duy nhất từ dữ liệu thực tế (cột Chi nhánh)
        const branches = [{ slug: "all", name: "Tất cả" }];
        const seenBranches = new Set();
        CONCEPTS.forEach(c => {
            const branchName = c.tag || c.branch;
            if (branchName && !seenBranches.has(branchName)) {
                seenBranches.add(branchName);
                branches.push({ slug: branchName, name: branchName });
            }
        });

        // Vẽ danh sách chi nhánh
        if (branches.length > 1) {
            branchBar.innerHTML = branches.map(b =>
                `<button class="tiemanh-filter-pill ${b.slug === selectedBranch ? 'active' : ''}" data-branch="${b.slug}">${b.name}</button>`
            ).join("");
        }

        // 2. Vẽ lại thanh Chủ đề dựa theo chi nhánh đang chọn
        renderThemeFilterBar();

        setupFilterEvents();

        // Kích hoạt kéo chuột mượt mà cho cả 2 thanh bộ lọc
        enableDragScroll(branchBar);
        enableDragScroll(themeBar);
    }

    // Hàm vẽ lại bộ lọc chủ đề tự động quét từ dữ liệu Sheet (không code cứng)
    function renderThemeFilterBar() {
        const themeBar = document.getElementById("themeFilterBar");
        if (!themeBar) return;

        // Trích xuất các chủ đề duy nhất từ c.themes thực tế của các concept, chèn sẵn nút Best Seller ở đầu
        const themes = [
            { slug: "all", name: "Tất cả", icon: "🍍" },
            { slug: "bestseller", name: "Best Seller", icon: "🔥" }
        ];
        const seenThemes = new Set();
        
        CONCEPTS.forEach(c => {
            if (c.themes) {
                c.themes.forEach(t => {
                    const cleanT = t.trim().toUpperCase();
                    // Loại bỏ tag "Concept" hoặc "Conept" làm rác bộ lọc
                    if (cleanT === "CONCEPT" || cleanT === "CONEPT") return;

                    if (t && !seenThemes.has(cleanT)) {
                        seenThemes.add(cleanT);
                        const info = getThemeInfo(t);
                        themes.push({ slug: t, name: t, icon: info.icon });
                    }
                });
            }
        });

        // Vẽ danh sách chủ đề đồng bộ kèm icon trực quan
        themeBar.innerHTML = themes.map(t =>
            `<button class="tiemanh-filter-pill ${t.slug === selectedTheme ? 'active' : ''}" data-theme="${t.slug}">
                <span>${t.icon}</span> <span>${t.name}</span>
            </button>`
        ).join("");

        enableDragScroll(themeBar);
    }

    function setupFilterEvents() {
        const branchPills = document.querySelectorAll("#branchFilterBar .tiemanh-filter-pill");
        const themePills = document.querySelectorAll("#themeFilterBar .tiemanh-filter-pill");

        // Sự kiện lọc Chi nhánh
        branchPills.forEach(pill => {
            pill.onclick = () => {
                branchPills.forEach(p => p.classList.remove("active"));
                pill.classList.add("active");
                selectedBranch = pill.getAttribute("data-branch");
                applyDoubleFilter();
            };
        });

        // Sự kiện lọc Chủ đề
        themePills.forEach(pill => {
            pill.onclick = () => {
                themePills.forEach(p => p.classList.remove("active"));
                pill.classList.add("active");
                selectedTheme = pill.getAttribute("data-theme");
                applyDoubleFilter();
            };
        });
    }

    function applyDoubleFilter() {
        currentPage = 1;
        const filtered = CONCEPTS.filter(c => {
            // Lọc theo Chi nhánh (so khớp với tag/branch)
            const matchBranch = (selectedBranch === "all" || c.tag === selectedBranch || c.branch === selectedBranch);

            // Kiểm tra so khớp chủ đề hoặc bộ lọc Best Seller
            let matchTheme = false;
            if (selectedTheme === "all") {
                matchTheme = true;
            } else if (selectedTheme === "bestseller") {
                matchTheme = c.isBestSeller;
            } else {
                matchTheme = c.themes && c.themes.some(t => t.toUpperCase() === selectedTheme.toUpperCase());
            }

            return matchBranch && matchTheme;
        });

        // Tự động xáo trộn ngẫu nhiên các concept để giao diện luôn tươi mới, sinh động
        currentFiltered = shuffleArray([...filtered]);

        const grid = document.getElementById("conceptGrid");
        if (grid) {
            grid.style.opacity = "0";
            setTimeout(() => {
                setupGallery();
                grid.style.opacity = "1";
            }, 200);
        }
    }

    // 10. Khởi chạy hệ thống sau khi DOM load (chỉ chạy trong môi trường trình duyệt, bỏ qua khi chạy test Node.js)
    if (typeof window !== 'undefined' && typeof document !== 'undefined' && !(typeof global !== 'undefined' && global.IS_TEST_ENVIRONMENT)) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", init);
        } else {
            init();
        }
    }

    // Export các hàm để chạy Unit Test bằng Node.js nếu ở môi trường test
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = {
            parseSheetsRow,
            normalizeBranchName,
            extractMultiTagsSmart,
            selectHeroConcepts
        };
    }
})();