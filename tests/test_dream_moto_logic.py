import os
import unittest
import urllib.parse

PROJECT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "DreamMotoNight"))

def calculate_price_python(bike_extra, service_price, addons_price):
    return (bike_extra or 0) + (service_price or 0) + (addons_price or 0)

def generate_zalo_link_python(phone_number, bike_name, service_name, slot_time, total_price, biker_name=None):
    formatted_price = f"{total_price:,}đ".replace(",", ".")
    biker_str = f"\n- Biker Yêu Thích: {biker_name}" if biker_name else ""
    message = f"Chào Dream Moto! Tôi muốn đặt dịch vụ Quay Video Moto Đêm Cầu Ba Son:\n- Dòng Xe: {bike_name}\n- Gói Dịch Vụ: {service_name}{biker_str}\n- Khung Giờ: {slot_time} Tối Nay\n- Tổng Giá Dự Kiến: {formatted_price}\n\nTư vấn và giữ slot giúp tôi nhé!"
    encoded = urllib.parse.quote(message)
    return f"https://zalo.me/{phone_number}?text={encoded}"

class TestDreamMotoWebsite(unittest.TestCase):

    def test_project_structure_exists(self):
        index_path = os.path.join(PROJECT_DIR, "index.html")
        style_path = os.path.join(PROJECT_DIR, "style.css")
        app_path = os.path.join(PROJECT_DIR, "app.js")
        config_path = os.path.join(PROJECT_DIR, "data-config.js")
        admin_path = os.path.join(PROJECT_DIR, "admin", "index.html")
        webcake_path = os.path.join(PROJECT_DIR, "dream-moto-webcake.js")
        sheet_sync_path = os.path.join(PROJECT_DIR, "google-sheets-sync.js")
        
        self.assertTrue(os.path.exists(index_path), "index.html should exist")
        self.assertTrue(os.path.exists(style_path), "style.css should exist")
        self.assertTrue(os.path.exists(app_path), "app.js should exist")
        self.assertTrue(os.path.exists(config_path), "data-config.js should exist")
        self.assertTrue(os.path.exists(admin_path), "admin/index.html should exist")
        self.assertTrue(os.path.exists(webcake_path), "dream-moto-webcake.js should exist")
        self.assertTrue(os.path.exists(sheet_sync_path), "google-sheets-sync.js should exist")

    def test_admin_credit_contact_fields(self):
        admin_path = os.path.join(PROJECT_DIR, "admin", "index.html")
        with open(admin_path, "r", encoding="utf-8") as f:
            content = f.read()

        self.assertIn("cfgWebsiteUrl", content)
        self.assertIn("cfgTiktokId", content)
        self.assertIn("cfgHotline", content)
        self.assertIn("cfgAddress", content)

    def test_admin_pure_drag_drop_clean_ui(self):
        admin_path = os.path.join(PROJECT_DIR, "admin", "index.html")
        with open(admin_path, "r", encoding="utf-8") as f:
            content = f.read()

        self.assertIn("media-dropzone", content)
        self.assertIn("handleDropMedia", content)
        self.assertIn("processMediaFile", content)

    def test_data_config_credit_contact_info(self):
        config_path = os.path.join(PROJECT_DIR, "data-config.js")
        with open(config_path, "r", encoding="utf-8") as f:
            content = f.read()

        self.assertIn("websiteUrl", content)
        self.assertIn("tiktokId", content)
        self.assertIn("hotline", content)
        self.assertIn("address", content)
        self.assertIn("servicesShowcase", content)
        self.assertIn("Dịch Vụ Rước Cờ Quảng Bá", content)

    def test_google_sheet_sync_script(self):
        sheet_sync_path = os.path.join(PROJECT_DIR, "google-sheets-sync.js")
        with open(sheet_sync_path, "r", encoding="utf-8") as f:
            content = f.read()

        self.assertIn("DREAM_MOTO_SHEET_CONFIG", content)
        self.assertIn("fetchGoogleSheetData", content)

    def test_webcake_script_content(self):
        webcake_path = os.path.join(PROJECT_DIR, "dream-moto-webcake.js")
        with open(webcake_path, "r", encoding="utf-8") as f:
            content = f.read()

        self.assertIn("DREAM_MOTO_CONFIG", content)
        self.assertIn("dream-moto-root", content)

    def test_index_html_credit_section(self):
        index_path = os.path.join(PROJECT_DIR, "index.html")
        with open(index_path, "r", encoding="utf-8") as f:
            content = f.read()

        self.assertIn('id="footerBioText"', content)
        self.assertIn('id="footerHotline"', content)
        self.assertIn('id="footerEmail"', content)
        self.assertIn('id="footerCS1"', content)

    def test_biker_profiles_rendered(self):
        config_path = os.path.join(PROJECT_DIR, "data-config.js")
        with open(config_path, "r", encoding="utf-8") as f:
            content = f.read()

        self.assertIn("Rider Tuấn Motor", content)
        self.assertIn("Rider Hoàng Speed", content)
        self.assertIn("Rider Bảo Ducati", content)

    def test_style_css_theme(self):
        style_path = os.path.join(PROJECT_DIR, "style.css")
        with open(style_path, "r", encoding="utf-8") as f:
            content = f.read()

        self.assertIn("--neon-gold", content)
        self.assertIn("--neon-cyan", content)
        self.assertIn("--bg-card", content)
        self.assertIn(".credit-section", content)

    def test_app_js_functions(self):
        app_path = os.path.join(PROJECT_DIR, "app.js")
        with open(app_path, "r", encoding="utf-8") as f:
            content = f.read()

        self.assertIn("calculatePrice", content)
        self.assertIn("generateZaloLink", content)
        self.assertIn("creditWebsite", content)

    def test_price_calculator_logic(self):
        self.assertEqual(calculate_price_python(0, 299000, 0), 299000)
        self.assertEqual(calculate_price_python(50000, 449000, 30000), 529000)

    def test_zalo_link_encoding_with_biker(self):
        link = generate_zalo_link_python("0900000000", "BMW S1000RR", "Gói 2: 4K VIP", "21:30", 529000, "Rider Tuấn Motor")
        self.assertTrue(link.startswith("https://zalo.me/0900000000?text="))
        self.assertIn("Rider%20Tu%E1%BA%A5n%20Motor", link)

    def test_video_modal_html_structure(self):
        index_path = os.path.join(PROJECT_DIR, "index.html")
        with open(index_path, "r", encoding="utf-8") as f:
            content = f.read()

        self.assertIn('id="videoModal"', content)
        self.assertIn('id="modalVideoPlayer"', content)

    def test_biker_quick_select_buttons_in_html(self):
        index_path = os.path.join(PROJECT_DIR, "index.html")
        with open(index_path, "r", encoding="utf-8") as f:
            content = f.read()

        self.assertIn('btn-select-biker', content)

    def test_app_js_new_interactive_handlers(self):
        app_path = os.path.join(PROJECT_DIR, "app.js")
        with open(app_path, "r", encoding="utf-8") as f:
            content = f.read()

        self.assertIn("initBikerQuickSelect", content)
        self.assertIn("initVideoModal", content)

    def test_style_css_modal_styles(self):
        style_path = os.path.join(PROJECT_DIR, "style.css")
        with open(style_path, "r", encoding="utf-8") as f:
            content = f.read()

        self.assertIn(".video-modal", content)

if __name__ == "__main__":
    unittest.main()

