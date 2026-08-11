# Tài liệu thiết kế: Đồng bộ Google Sheets - Google Drive & Tích hợp Website Concept nâng cao

Tài liệu này mô tả chi tiết thiết kế hệ thống quản lý Concept ảnh cho Tiệm Ảnh Trái Thơm, kết hợp tự động hóa từ Google Drive sang Google Sheets bằng Google Apps Script và tối ưu hiển thị danh sách concept trên Website.

## 1. Cấu trúc Google Sheet (Database)

Bảng quản lý concept trên Google Sheet sẽ được cấu trúc lại như sau (các chữ cái tương ứng với cột):

| Cột | Tên Cột | Kiểu dữ liệu | Người nhập | Mô tả |
| :---: | :--- | :--- | :--- | :--- |
| **A** | `STT` | Số nguyên | Tự động (Script) | ID tự sinh tăng dần cho từng concept. |
| **B** | `Chi nhánh` | Chuỗi văn bản | Tự động (Script) | Tên thư mục Chi nhánh trên Drive (vết làm tag & bộ lọc). |
| **C** | `Chủ đề` | Chuỗi văn bản | Thủ công (User) | Nhập các chủ đề, cách nhau bởi dấu phẩy (Ví dụ: `Nữ Tính, Ngoại Cảnh`). |
| **D** | `Tên concept` | Chuỗi văn bản | Tự động (Script) | Tên thư mục Concept trên Drive. |
| **E** | `Mô tả` | Đoạn văn bản | Thủ công (User) | Mô tả bộ concept hiển thị trên Lightbox. |
| **F** | `Ẩn` | Checkbox (TRUE/FALSE) | Thủ công (User) | Tích chọn `TRUE` để ẩn concept khỏi web. |
| **G** | `Best Seller` | Checkbox (TRUE/FALSE) | Thủ công (User) | Tích chọn `TRUE` để gắn nhãn nổi bật và ưu tiên đưa lên Hero Polaroid. |
| **H** | `img1` | Link hình ảnh | Tự động (Script) | Link ảnh bìa chính của concept. |
| **I ➔ S**| `img2` ➔ `img12`| Link hình ảnh | Tự động (Script) | Link các ảnh phụ tiếp theo của concept. |
| **T** | `Folder ID` | Chuỗi văn bản | Tự động (Script) | ID thư mục của concept trên Drive để làm khóa đối chiếu. |

---

## 2. Thiết kế Google Apps Script (Drive ➔ Sheet Auto Sync)

Mã nguồn Apps Script dưới đây sẽ được tích hợp vào Google Sheet để tự động quét Drive và cập nhật dữ liệu.

### Mã nguồn Google Apps Script:
```javascript
// Cấu hình ID thư mục gốc chứa toàn bộ chi nhánh trên Google Drive của bạn
const ROOT_FOLDER_ID = "1NPnZ-KHeJb4HY3pumreapPrwbs2UXzvn"; 

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu("🍇 Đồng bộ Tiệm Ảnh")
    .addItem("🔄 Đồng bộ dữ liệu từ Drive", "syncDriveToSheets")
    .addItem("🛠️ Khởi tạo bảng trắng tinh", "runInitialization")
    .addToUi();
}

function runInitialization() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  initializeHeaders(sheet);
  SpreadsheetApp.getUi().alert("Khởi tạo thành công", "Đã chèn hàng tiêu đề cột thành công. Bây giờ bạn có thể nhấn 'Đồng bộ dữ liệu từ Drive'!", SpreadsheetApp.getUi().ButtonSet.OK);
}

function syncDriveToSheets() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const ui = SpreadsheetApp.getUi();
  
  if (!ROOT_FOLDER_ID || ROOT_FOLDER_ID === "YOUR_GOOGLE_DRIVE_FOLDER_ID_HERE") {
    ui.alert("Lỗi cấu hình", "Vui lòng mở Trình biên tập kịch bản (Extensions > Apps Script) và cập nhật ROOT_FOLDER_ID bằng ID thư mục Google Drive của bạn.", ui.ButtonSet.OK);
    return;
  }
  
  try {
    const rootFolder = DriveApp.getFolderById(ROOT_FOLDER_ID);
    const branchFolders = rootFolder.getFolders();
    
    // 1. Đọc dữ liệu hiện tại trên Sheet để đối chiếu tránh ghi đè
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    const headers = values[0] || [];
    
    // Tìm vị trí các cột chính (0-indexed)
    const colIdx = {
      stt: headers.indexOf("STT"),
      branch: headers.indexOf("Chi nhánh"),
      theme: headers.indexOf("Chủ đề"),
      title: headers.indexOf("Tên concept"),
      desc: headers.indexOf("Mô tả"),
      hide: headers.indexOf("Ẩn"),
      best: headers.indexOf("Best Seller"),
      folderId: headers.indexOf("Folder ID"),
      imgStart: headers.indexOf("img1")
    };
    
    // Nếu chưa có header chuẩn thì tạo header mới
    if (colIdx.stt === -1 || colIdx.folderId === -1 || colIdx.imgStart === -1) {
      initializeHeaders(sheet);
      SpreadsheetApp.flush();
      ui.alert("Khởi tạo Sheet", "Đã thiết lập lại tiêu đề cột chuẩn. Hãy nhấn nút Đồng bộ một lần nữa.", ui.ButtonSet.OK);
      return;
    }
    
    // Tạo Map từ dữ liệu hiện tại để tra cứu nhanh bằng Folder ID (Lưu chỉ số index của hàng trong mảng values)
    const sheetDataMap = new Map(); // Key: FolderID, Value: index (0-indexed)
    // Tạo Set chứa các Folder ID đã có ảnh sẵn trên Sheet để bỏ qua quét ảnh
    const existingFolderIdsWithImages = new Set();
    for (let r = 1; r < values.length; r++) {
      const fId = values[r][colIdx.folderId];
      if (fId) {
        sheetDataMap.set(fId, r);
        const img1 = values[r][colIdx.imgStart];
        if (img1) {
          existingFolderIdsWithImages.add(fId);
        }
      }
    }
    
    let sttCounter = sheetDataMap.size;
    const processedFolderIds = new Set();
    
    // 2. Gọi đệ quy quét tất cả các thư mục chứa ảnh (Concept) bên dưới các Chi nhánh
    const conceptFoldersList = [];
    while (branchFolders.hasNext()) {
      const branchFolder = branchFolders.next();
      const branchName = branchFolder.getName();
      findConceptFoldersRecursive(branchFolder, branchName, conceptFoldersList, existingFolderIdsWithImages);
    }
    
    let newRowsCount = 0;
    
    // Duyệt qua toàn bộ danh sách concept đệ quy tìm thấy
    for (const concept of conceptFoldersList) {
      const conceptId = concept.folderId;
      const conceptName = concept.conceptName;
      processedFolderIds.add(conceptId);
      
      if (sheetDataMap.has(conceptId)) {
        // A. Nếu đã tồn tại: Chỉ cập nhật các link ảnh và thông tin tự động trực tiếp trên mảng values
        const r = sheetDataMap.get(conceptId);
        values[r][colIdx.branch] = concept.branchName;
        values[r][colIdx.title] = conceptName;
        
        // Nếu KHÔNG bỏ qua quét ảnh (concept mới có thay đổi hoặc chưa có ảnh) thì mới cập nhật 12 cột ảnh
        if (!concept.skipImageScan) {
          const imgUrls = [];
          for (let i = 0; i < 12; i++) {
            if (i < concept.images.length) {
              imgUrls.push(`https://drive.google.com/file/d/${concept.images[i]}/view`);
            } else {
              imgUrls.push("");
            }
          }
          for (let i = 0; i < 12; i++) {
            values[r][colIdx.imgStart + i] = imgUrls[i];
          }
        }
      } else {
        // B. Nếu chưa tồn tại (Concept mới): Chuẩn bị dòng mới và push trực tiếp vào mảng values
        sttCounter++;
        const newRow = new Array(headers.length).fill("");
        newRow[colIdx.stt] = values.length; // Lấy STT tiếp theo dựa trên số lượng dòng hiện tại
        newRow[colIdx.branch] = concept.branchName;
        newRow[colIdx.theme] = "";       // Nhập thủ công
        newRow[colIdx.title] = conceptName;
        newRow[colIdx.desc] = "";        // Nhập thủ công
        newRow[colIdx.hide] = false;     // Mặc định hiện
        newRow[colIdx.best] = false;     // Mặc định không nổi bật
        
        // Điền link ảnh (vì là mới nên chắc chắn quét đầy đủ)
        const imgUrls = [];
        for (let i = 0; i < 12; i++) {
          if (i < concept.images.length) {
            imgUrls.push(`https://drive.google.com/file/d/${concept.images[i]}/view`);
          } else {
            imgUrls.push("");
          }
        }
        for (let i = 0; i < 12; i++) {
          newRow[colIdx.imgStart + i] = imgUrls[i];
        }
        newRow[colIdx.folderId] = conceptId;
        
        values.push(newRow);
        newRowsCount++;
      }
    }
    
    // 3. Xử lý các Concept bị xóa trên Drive: Tích chọn Ẩn (Cột F) trực tiếp trên mảng values
    for (const [fId, r] of sheetDataMap.entries()) {
      if (!processedFolderIds.has(fId)) {
        values[r][colIdx.hide] = true;
      }
    }
    
    // 🔥 GHI TOÀN BỘ DỮ LIỆU ĐÃ CẬP NHẬT/THÊM MỚI XUỐNG SHEET CHỈ BẰNG MỘT LỆNH DUY NHẤT (Batch Write)
    sheet.getRange(1, 1, values.length, headers.length).setValues(values);
    
    // 4. Định dạng lại bảng tính (chèn Checkbox cho các dòng mới)
    applySheetFormatting(sheet, 2, values.length);
    
    ui.alert("Đồng bộ hoàn tất", `Đồng bộ thành công bằng kịch bản tối ưu!\n- Tổng số concept trên Drive: ${conceptFoldersList.length}\n- Thêm mới: ${newRowsCount} concept.\n- Cập nhật lại hình ảnh của các concept cũ.\n- Đã tự động ẩn các concept bị xóa trên Drive.`, ui.ButtonSet.OK);
    
  } catch (error) {
    let msg = "Có lỗi xảy ra: " + error.toString();
    if (error.toString().includes("quy tắc xác thực") || error.toString().includes("validation")) {
      msg += "\n\n💡 Mẹo khắc phục: Lỗi này do quy tắc xác thực (Data Validation) của cột C (Chủ đề) đang bật chế độ 'Từ chối nhập'. Bạn chỉ cần bôi đen cột C > Vào Dữ liệu > Xác thực dữ liệu > Tùy chọn nâng cao > Chọn 'Hiển thị cảnh báo' thay vì 'Từ chối nhập' là sẽ đồng bộ bình thường!";
    }
    ui.alert("Lỗi đồng bộ", msg, ui.ButtonSet.OK);
  }
}

// Hàm duyệt đệ quy từ thư mục chi nhánh xuống để tìm các thư mục chứa ảnh (Concept)
function findConceptFoldersRecursive(folder, branchName, conceptFoldersList, existingFolderIdsWithImages) {
  const folderId = folder.getId();
  const folderName = folder.getName();
  
  // Nếu thư mục đã tồn tại trên Sheet và đã có ảnh ➔ Bỏ qua việc quét file ảnh bên trong để tăng tốc 100 lần!
  if (existingFolderIdsWithImages.has(folderId)) {
    conceptFoldersList.push({
      folderId: folderId,
      conceptName: folderName,
      branchName: branchName,
      images: [],
      skipImageScan: true
    });
  } else {
    // Quét file ảnh bình thường
    const files = folder.getFiles();
    const images = [];
    const allowedExtensions = ["jpg", "jpeg", "png", "webp", "heic"];
    
    while (files.hasNext()) {
      const file = files.next();
      const ext = file.getName().split('.').pop().toLowerCase();
      if (allowedExtensions.includes(ext)) {
        images.push(file.getId());
      }
    }
    
    if (images.length >= 1) {
      images.sort();
      conceptFoldersList.push({
        folderId: folderId,
        conceptName: folderName,
        branchName: branchName,
        images: images,
        skipImageScan: false
      });
    }
  }
  
  // Luôn đi đến tận cùng - duyệt đệ quy qua toàn bộ các thư mục con bên dưới
  const subFolders = folder.getFolders();
  while (subFolders.hasNext()) {
    const subFolder = subFolders.next();
    findConceptFoldersRecursive(subFolder, branchName, conceptFoldersList, existingFolderIdsWithImages);
  }
}

function initializeHeaders(sheet) {
  sheet.clear();
  const headers = [
    "STT", "Chi nhánh", "Chủ đề", "Tên concept", "Mô tả", "Ẩn", "Best Seller", 
    "img1", "img2", "img3", "img4", "img5", "img6", "img7", "img8", "img9", "img10", "img11", "img12", 
    "Folder ID"
  ];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#FFF3CD").setHorizontalAlignment("center");
  sheet.setFrozenRows(1);
}

// Hàm thiết lập hộp kiểm (checkbox) cột Ẩn và cột Best Seller
function applySheetFormatting(sheet, startRow, endRow) {
  if (startRow > endRow) return;
  
  // 1. Hộp kiểm cột F (Ẩn)
  const hideRange = sheet.getRange(startRow, 6, endRow - startRow + 1, 1);
  hideRange.insertCheckboxes();
  
  // 2. Hộp kiểm cột G (Best Seller)
  const bestRange = sheet.getRange(startRow, 7, endRow - startRow + 1, 1);
  bestRange.insertCheckboxes();
}

// Hàm hỗ trợ chọn nhiều chủ đề (Multi-select) từ Dropdown cột C (Chủ đề)
function onEdit(e) {
  const sheet = e.source.getActiveSheet();
  const range = e.range;
  
  // Chỉ kích hoạt khi chỉnh sửa cột C (Chủ đề) từ dòng 2 trở đi
  if (range.getColumn() === 3 && range.getRow() > 1) {
    const newValue = e.value;
    const oldValue = e.oldValue;
    
    // Nếu xóa ô thì giữ nguyên
    if (!newValue) return;
    
    // Nếu đã có giá trị cũ trong ô
    if (oldValue) {
      const oldParts = oldValue.split(",").map(p => p.trim());
      const idx = oldParts.indexOf(newValue);
      
      if (idx === -1) {
        // Nếu chọn chủ đề mới -> Nối tiếp vào
        range.setValue(oldValue + ", " + newValue);
      } else {
        // Nếu chọn chủ đề đã có -> Xóa chủ đề đó đi (Toggle)
        const filteredParts = oldParts.filter(p => p !== newValue);
        range.setValue(filteredParts.join(", "));
      }
    }
  }
}
```

---

## 3. Thiết kế Website Frontend (JS & CSS)

### 3.1. Phân tích Dữ liệu Sheet (`custom-tiemanh.js`)
*   **Trích xuất chủ đề (Theme)**: Đọc từ ô "Chủ đề" (Cột C), nếu có dấu phẩy `,` thì thực hiện:
    `const themes = obj.theme ? obj.theme.split(",").map(t => t.trim()) : ["Nàng Thơ"];`
*   **Chi nhánh (Branch)**: Đọc từ cột "Chi nhánh" (Cột B) để làm nhãn tag và lưu trữ bộ lọc.
*   **Ẩn Concept**: Nếu cột `Ẩn` có giá trị `TRUE`, concept sẽ bị loại bỏ khỏi danh sách tải lên web.
*   **Ảnh minh họa**: Hỗ trợ quét đầy đủ 12 cột ảnh từ `img1` đến `img12` (thay vì 10 ảnh như trước).

### 3.2. Tự động sinh thanh Bộ Lọc (Filter Bar)
*   **Không code cứng**: Web sẽ duyệt qua tất cả concept thực tế tải từ Google Sheets:
    - Thu thập tất cả các giá trị độc nhất trong cột `Chi nhánh` để tự động render danh sách lọc Chi nhánh.
    - Thu thập tất cả các giá trị độc nhất trong mảng `themes` sau khi tách dấu phẩy để tự động render danh sách lọc Chủ đề.

### 3.3. Thuật toán chọn 3 Polaroid ngẫu nhiên nổi bật (Hero Banner)
```javascript
function randomizeHeroPolaroids() {
    if (!CONCEPTS || CONCEPTS.length === 0) return;
    const polaroids = document.querySelectorAll(".polaroid-card");
    if (polaroids.length === 0) return;

    // Lọc ra các bộ ảnh có ảnh thật của studio
    const realConcepts = CONCEPTS.filter(c => c.hasRealImages && c.images && c.images.length > 0 && !c.images[0].includes("unsplash"));
    
    // Ưu tiên các bộ Best Seller
    const bestSellerCandidates = realConcepts.filter(c => c.isBestSeller);
    const normalCandidates = realConcepts.filter(c => !c.isBestSeller);
    
    let selected = [];
    
    // 1. Trộn ngẫu nhiên Best Seller
    const shuffledBest = [...bestSellerCandidates].sort(() => 0.5 - Math.random());
    selected = shuffledBest.slice(0, 3);
    
    // 2. Nếu thiếu (ít hơn 3), bù đắp bằng các bộ ảnh thường ngẫu nhiên
    if (selected.length < 3) {
        const shuffledNormal = [...normalCandidates].sort(() => 0.5 - Math.random());
        const needed = 3 - selected.length;
        selected = selected.concat(shuffledNormal.slice(0, needed));
    }
    
    // Ghi đè hiển thị lên 3 Polaroid
    polaroids.forEach((card, i) => {
        if (i < selected.length) {
            const concept = selected[i];
            card.classList.remove("loading-skeleton");
            
            // Thêm nhãn ngọn lửa nhỏ nếu là Best Seller
            const flameHtml = concept.isBestSeller ? `<span class="polaroid-best-badge">🔥 Hot</span>` : "";
            
            card.innerHTML = `
                ${flameHtml}
                <img src="${concept.images[0]}" alt="${concept.title}">
                <div class="polaroid-caption">${concept.title}</div>
            `;
            card.onclick = (e) => {
                e.preventDefault();
                openLightbox(concept);
            };
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
}
```

### 3.4. Hiển thị Nhãn Best Seller trên Card Concept và CSS
Vẽ đè nhãn `🔥 Best Seller` lên góc trên cùng bên trái của card concept:
```css
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
```

---

## 4. Kế hoạch xác minh (Verification Plan)

### Kiểm thử thủ công:
1. **Kiểm tra Apps Script trên Google Sheets**:
   - Chạy hàm khởi tạo `initializeHeaders` để tạo các cột từ A đến T.
   - Thêm các thư mục chi nhánh và concept mẫu trên Drive (có số lượng ảnh lần lượt là: 0 ảnh, 5 ảnh, 12 ảnh, 15 ảnh).
   - Nhấn "Đồng bộ dữ liệu từ Drive" và kiểm tra:
     - Thư mục 0 ảnh và 15 ảnh phải bị bỏ qua (ràng buộc 1-12 ảnh).
     - Thư mục 5 ảnh và 12 ảnh được tạo dòng, điền đầy đủ STT, Tên, Chi nhánh, Link hình ảnh và Folder ID.
   - Chỉnh sửa thủ công cột "Chủ đề", "Mô tả", tích chọn "Best Seller" trên Sheet.
   - Chạy lại đồng bộ và kiểm tra: các cột chỉnh sửa thủ công không bị mất dữ liệu, các cột ảnh được cập nhật đầy đủ.
2. **Kiểm tra Website**:
   - Mở website lên và kiểm tra xem danh sách bộ lọc chi nhánh và chủ đề có tự động sinh đúng theo dữ liệu trên Sheet hay không.
   - Tích chọn "Best Seller" cho 2 bộ concept trên sheet, kiểm tra Hero Banner có hiển thị đúng 2 bộ này kèm ngọn lửa và 1 bộ thường ngẫu nhiên khác hay không.
   - Kiểm tra nhãn Best Seller `🔥 Best Seller` có xuất hiện và nhấp nháy trên card danh sách hay không.
   - Tích chọn "Ẩn" trên Sheet và tải lại trang, xác nhận bộ concept đó biến mất hoàn toàn khỏi giao diện.
