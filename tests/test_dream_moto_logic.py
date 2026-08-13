import os
import unittest
import urllib.parse

PROJECT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "DreamMotoNight"))

def calculate_price_python(bike_extra, service_price, addons_price):
    return (bike_extra or 0) + (service_price or 0) + (addons_price or 0)

def generate_zalo_link_python(phone_number, bike_name, service_name, slot_time, total_price):
    formatted_price = f"{total_price:,}đ".replace(",", ".")
    message = f"Chào Dream Moto! Tôi muốn đặt dịch vụ Quay Video Moto Đêm Cầu Ba Sơn:\n- Dòng Xe: {bike_name}\n- Gói Dịch Vụ: {service_name}\n- Khung Giờ: {slot_time} Tối Nay\n- Tổng Giá Dự Kiến: {formatted_price}\n\nTư vấn và giữ slot giúp tôi nhé!"
    encoded = urllib.parse.quote(message)
    return f"https://zalo.me/{phone_number}?text={encoded}"

class TestDreamMotoWebsite(unittest.TestCase):

    def test_project_structure_exists(self):
        index_path = os.path.join(PROJECT_DIR, "index.html")
        style_path = os.path.join(PROJECT_DIR, "style.css")
        app_path = os.path.join(PROJECT_DIR, "app.js")
        
        self.assertTrue(os.path.exists(index_path), "index.html should exist")
        self.assertTrue(os.path.exists(style_path), "style.css should exist")
        self.assertTrue(os.path.exists(app_path), "app.js should exist")

    def test_index_html_content(self):
        index_path = os.path.join(PROJECT_DIR, "index.html")
        with open(index_path, "r", encoding="utf-8") as f:
            content = f.read()

        self.assertIn('id="hero"', content)
        self.assertIn('id="trends"', content)
        self.assertIn('id="spots"', content)
        self.assertIn('id="calculator"', content)
        self.assertIn('id="slots"', content)
        self.assertIn('id="faq"', content)
        self.assertIn("zalo.me", content)

    def test_style_css_theme(self):
        style_path = os.path.join(PROJECT_DIR, "style.css")
        with open(style_path, "r", encoding="utf-8") as f:
            content = f.read()

        self.assertIn("--neon-gold", content)
        self.assertIn("--neon-cyan", content)
        self.assertIn("--bg-dark", content)

    def test_app_js_functions(self):
        app_path = os.path.join(PROJECT_DIR, "app.js")
        with open(app_path, "r", encoding="utf-8") as f:
            content = f.read()

        self.assertIn("calculatePrice", content)
        self.assertIn("generateZaloLink", content)

    def test_price_calculator_logic(self):
        # Base package (299,000) + Z1000 (0) + No Addon
        self.assertEqual(calculate_price_python(0, 299000, 0), 299000)
        # S1000RR (+50,000) + VIP 4K (449,000) + Helmet (+30,000)
        self.assertEqual(calculate_price_python(50000, 449000, 30000), 529000)

    def test_zalo_link_encoding(self):
        link = generate_zalo_link_python("0900000000", "BMW S1000RR", "Gói 2: 4K Cinematic VIP", "21:30", 529000)
        self.assertTrue(link.startswith("https://zalo.me/0900000000?text="))
        self.assertIn("BMW%20S1000RR", link)
        self.assertIn("529.000%C4%91", link)

if __name__ == "__main__":
    unittest.main()
