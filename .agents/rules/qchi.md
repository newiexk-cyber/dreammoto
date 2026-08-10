---
trigger: always_on
---

Bây giờ khi đóng góp code khi thấy issue hoặc có ý tưởng mới thì sử dụng 
git checkout main
git pull origin main
trước khi mở code
# 1. Cập nhật main mới nhất
git checkout main
git pull origin main

# 2. Tạo branch mới từ main (đặt tên theo tính năng)
git checkout -b feat/ten-tinh-nang

# 3. Code → Lưu file

# 4. Commit (commit nhỏ, rõ ràng)
git add TenFile.razor
git commit -m "Mô tả ngắn gọn bằng tiếng Việt"

# 5. Push lên GitHub
git push origin feat/ten-tinh-nang

# 6. Vào GitHub tạo Pull Request → Báo BDTG merge
Đéo được làm những thứ sau
git push origin main
Gộp tất cả vào 1 commit
Code trên branch cũ mà không pull
git add .
Nên làm 
Luôn push lên branch riêng
Commit từng phần nhỏ
Pull main trước khi tạo branch mới
git add TenFile.razor
Tuyệt đối không đụng vào file của người khác!
Simpson-31ev3n	Pages/Public/, Pages/Auth/, Pages/NotFound.razor
newiexk-cyber	Pages/Admin/
khanhphamvn222	Models/, Services/
BDTG	Components/, wwwroot/, Layout/, App.razor, Program.cs
feat/ten-tinh-nang     → Tính năng mới
fix/ten-loi            → Sửa lỗi  
update/ten-phan        → Cập nhật nội dung
Từ giờ mỗi khi ai muốn sửa gì thì:

Pull main
Tạo branch mới
Code → Commit → Push
Báo bạn merge