# 📋 Yêu cầu Chi tiết Dự án Room Visualizer

## 🎯 Phân nhóm yêu cầu theo độ ưu tiên và độ khó

---

## 📱 NHÓM 1: GIAO DIỆN CƠ BẢN (Dễ → Trung bình)

### 1.1. Header & Logo ⭐ (Dễ)
- [ ] **Logo**: Phóng to kích thước, bỏ chữ "Sao Vàng"
- [ ] **Ảnh nền header**: Thay ảnh mới
- [ ] **Menu**: 
  - Bỏ "Kênh phân phối"
  - Sắp xếp lại: Trang chủ → Sản phẩm → Dự án → Giới thiệu → Tin tức → Liên hệ
- [ ] **Hiệu ứng lật**: Rà soát và tối ưu (giảm lag, thống nhất thời gian/độ trễ)

**Cần cung cấp:**
- ✅ Logo mới (SVG/PNG nền trong suốt, không chữ "Sao Vàng")
- ✅ Ảnh nền header chất lượng cao
- ✅ Thời gian hiệu ứng mong muốn (ms)

---

### 1.2. Footer ⭐ (Dễ)
- [ ] Cập nhật liên kết icon mạng xã hội:
  - Facebook
  - YouTube
  - TikTok (nếu có)
  - Zalo OA (nếu có)
- [ ] Kiểm tra `target="_blank"` và `rel="noopener noreferrer"`

**Cần cung cấp:**
- ✅ Link Facebook page
- ✅ Link YouTube channel
- ✅ Link TikTok (nếu có)
- ✅ Link Zalo OA (nếu có)

---

### 1.3. Liên hệ nhanh (Mobile-first) ⭐⭐ (Dễ)
- [ ] **Nút gọi điện thoại**: 
  - Click mở ứng dụng gọi trực tiếp (`tel:...`)
  - Hiển thị rõ trên mobile
- [ ] **Nút/CTA Zalo**: 
  - Click mở chat Zalo (`zalo.me/...`)
  - Kiểm tra deep-link iOS/Android
  - Fallback web nếu không cài app
- [ ] **Vị trí**: Fixed button hoặc floating action button

**Cần cung cấp:**
- ✅ Số điện thoại (đã có: 0913910209)
- ✅ Link Zalo (đã có: https://zalo.me/0913910209)
- ❓ Icon/màu sắc ưa thích cho nút Zalo
- ❓ Vị trí hiển thị nút (góc phải, góc trái, bottom bar?)

---

### 1.4. Trang "Giới thiệu" ⭐⭐ (Trung bình)
- [ ] **Căn chỉnh layout**: About Us & Về thương hiệu (gọn và cân đối)
- [ ] **Video YouTube**: 
  - Nhúng video khai trương lên đầu trang
  - Responsive 16:9
- [ ] **Tóm tắt giới thiệu**: Đoạn mở đầu ngắn gọn

**Cần cung cấp:**
- ✅ Link YouTube video khai trương
- ✅ Nội dung tóm tắt giới thiệu (văn bản)
- ❓ Ảnh/hình ảnh bổ sung cho trang giới thiệu

---

### 1.5. Trang chủ ⭐⭐ (Trung bình)
- [ ] **Khối "Tin tức nổi bật"**: 
  - Hiển thị 3-6 bài nổi bật
  - Layout grid/carousel
- [ ] **Khối "Giới thiệu tóm tắt"**: 
  - Đoạn ngắn giới thiệu
  - Nút "Xem thêm" → chuyển đến trang Giới thiệu

**Cần cung cấp:**
- ✅ Danh sách tin tức nổi bật (tiêu đề, ảnh thumbnail, link, ngày đăng)
- ✅ Nội dung tóm tắt cho trang chủ
- ❓ Số lượng tin hiển thị (3, 4, 6?)
- ❓ Kiểu hiển thị (Grid hay Carousel?)

---

### 1.6. Đối tác ⭐⭐ (Trung bình)
- [ ] **Thêm section "Logo đối tác"**:
  - Carousel hoặc lưới logo
  - Link đến website đối tác (nếu có)
  - Tối ưu ảnh, lazy-load

**Cần cung cấp:**
- ✅ Logo đối tác (PNG/SVG nền trong suốt)
- ✅ Tên đối tác
- ✅ Link website đối tác (tùy chọn)
- ❓ Thứ tự ưu tiên hiển thị

---

## 🛍️ NHÓM 2: TRANG SẢN PHẨM (Trung bình → Khó)

### 2.1. Danh sách sản phẩm ⭐⭐⭐ (Trung bình)
- [ ] **Hiển thị sản phẩm**:
  - Ảnh phối cảnh
  - Ảnh sản phẩm (tile)
  - Mã sản phẩm
  - Kích thước
  - Màu sắc
- [ ] **Layout**: Grid responsive (mobile: 1-2 cột, desktop: 3-4 cột)
- [ ] **Lazy loading**: Tối ưu tải ảnh

**Cần cung cấp:**
- ✅ Danh sách sản phẩm đầy đủ:
  - Mã sản phẩm
  - Tên sản phẩm
  - Ảnh sản phẩm (tile) - chất lượng cao
  - Ảnh phối cảnh (showroom)
  - Kích thước (cm hoặc mm)
  - Màu sắc (tên màu + mã màu hex nếu có)
  - Giá (nếu hiển thị)
  - Mô tả ngắn

---

### 2.2. Bộ lọc sản phẩm ⭐⭐⭐ (Trung bình)
- [ ] **Filter theo màu sắc**: 
  - Color picker/dropdown
  - Multi-select
- [ ] **Filter theo kích thước**:
  - Dropdown/checkbox
- [ ] **URL params**: Hỗ trợ SEO (e.g., `/products?color=white&size=60x60`)
- [ ] **Reset filter**: Nút xóa bộ lọc

**Cần cung cấp:**
- ✅ Danh sách màu sắc có sẵn (tên + mã màu)
- ✅ Danh sách kích thước có sẵn
- ❓ Có cho phép lọc theo giá không?
- ❓ Có category/danh mục sản phẩm không?

---

### 2.3. Trang chi tiết sản phẩm ⭐⭐⭐ (Trung bình → Khó)
- [ ] **Thông tin sản phẩm**:
  - Gallery ảnh (ảnh sản phẩm + ảnh phối cảnh)
  - Mô tả chi tiết
  - Thông số kỹ thuật
  - Mã sản phẩm / Kích thước
- [ ] **Gợi ý phối cảnh**: 
  - Ảnh inspiration/showroom
- [ ] **Sản phẩm liên quan**: 
  - Hiển thị 4-6 sản phẩm tương tự
- [ ] **Breadcrumb**: Điều hướng (Trang chủ > Sản phẩm > Chi tiết)
- [ ] **CTA**: 
  - Nút "Thiết kế với sản phẩm này" → chuyển sang Room Designer
  - Nút "Liên hệ tư vấn"

**Cần cung cấp:**
- ✅ Dữ liệu đầy đủ cho từng sản phẩm (xem 2.1)
- ✅ Ảnh phối cảnh chất lượng cao (nhiều góc nhìn)
- ❓ Thông tin kỹ thuật cụ thể (độ hút nước, độ cứng, xuất xứ...)?
- ❓ Chứng nhận/giấy tờ sản phẩm?

---

## 🎨 NHÓM 3: CHỨC NĂNG TRỰC QUAN HÓA PHÒNG (Khó → Rất khó)

### 3.1. Cải tiến giao diện Room Designer ⭐⭐⭐ (Trung bình)
- [ ] **Đổi nhãn**: "Tự thiết kế" → "Thiết kế cá nhân"
- [ ] **UI/UX**:
  - Toolbar rõ ràng hơn
  - Hướng dẫn sử dụng (tooltip/tutorial)
  - Loading state khi switch texture

---

### 3.2. Chức năng thiết kế phòng ⭐⭐⭐⭐ (Khó)
- [ ] **Chọn tường**: 
  - Click chọn tường để ốp gạch
  - Highlight tường đang chọn
- [ ] **Ốp gạch**: 
  - Chọn sản phẩm từ danh sách
  - Apply texture lên tường
  - Preview real-time
- [ ] **Thay mẫu**: 
  - Đổi gạch dễ dàng
  - Undo/Redo
- [ ] **Tính năng bổ sung**:
  - Zoom in/out
  - Rotate view (nếu 3D)
  - Pan/drag canvas

**Cần cung cấp:**
- ✅ **Texture gạch chuẩn tỉ lệ** (PNG/JPG):
  - Kích thước file texture (recommend 512x512 hoặc 1024x1024)
  - Seamless texture (lặp lại không thấy đường nối)
  - Đúng tỉ lệ thực tế sản phẩm
  - Format: PNG 24-bit hoặc JPG chất lượng cao
- ✅ Mapping giữa sản phẩm và texture file
- ❓ Có cần hiển thị kích thước thực tế trên tường không?
- ❓ Có cần tính diện tích gạch cần dùng không?

---

### 3.3. Lưu và xuất ảnh ⭐⭐⭐ (Trung bình)
- [ ] **Xuất ảnh**: 
  - Nút "Lưu ảnh" 
  - Export canvas → PNG/JPEG
  - Độ phân giải tùy chọn (HD, Full HD, 4K)
- [ ] **Watermark**: Thêm logo/text (tùy chọn)
- [ ] **Download**: Tự động download file

**Cần cung cấp:**
- ❓ Có cần watermark không? (logo + text gì?)
- ❓ Độ phân giải mặc định (1920x1080, 3840x2160...)?
- ❓ Format ưu tiên (PNG hay JPEG)?

---

### 3.4. Gửi ảnh đã thiết kế ⭐⭐⭐⭐ (Khó)
- [ ] **Nút "Gửi thiết kế"**:
  - Form nhập thông tin: Tên, SĐT, Email, Ghi chú
  - Đính kèm ảnh đã thiết kế
  - Danh sách sản phẩm đã chọn
- [ ] **Gửi qua**:
  - Email (SMTP hoặc API service)
  - Zalo (share link hoặc API)
  - Lưu vào database để admin xem
- [ ] **Xác nhận**: Thông báo gửi thành công

**Cần cung cấp:**
- ❓ Email nhận thiết kế (admin email)?
- ❓ Có tích hợp Zalo API không? (cần Zalo OA App ID)
- ❓ Có cần lưu lịch sử thiết kế của khách không?
- ❓ Template email như thế nào?

---

## 🔧 NHÓM 4: TỐI ƯU & TRIỂN KHAI (Trung bình)

### 4.1. Tối ưu hiệu năng ⭐⭐⭐ (Trung bình)
- [ ] **Tối ưu ảnh**: 
  - WebP format
  - Lazy loading
  - Responsive images (srcset)
- [ ] **Core Web Vitals**:
  - Kiểm tra CLS (Cumulative Layout Shift)
  - Kiểm tra LCP (Largest Contentful Paint)
  - Tối ưu FID/INP
- [ ] **Code splitting**: Chunk size optimization

---

### 4.2. SEO ⭐⭐ (Dễ → Trung bình)
- [ ] **Meta tags**: Title, Description, Keywords
- [ ] **Open Graph**: OG tags cho social share
- [ ] **Sitemap**: Generate sitemap.xml
- [ ] **Robots.txt**: Cấu hình crawl
- [ ] **Structured Data**: JSON-LD cho sản phẩm

**Cần cung cấp:**
- ❓ Meta description cho từng trang
- ❓ Keywords chính
- ❓ OG image (ảnh đại diện khi share)

---

### 4.3. Kiểm thử ⭐⭐⭐ (Trung bình)
- [ ] **Cross-browser**: Chrome, Firefox, Safari, Edge
- [ ] **Cross-device**: Mobile, Tablet, Desktop
- [ ] **Responsive**: Breakpoints (320px, 768px, 1024px, 1440px)
- [ ] **Link testing**: Tất cả link call/Zalo/social trên thiết bị thật

---

### 4.4. Triển khai ⭐⭐ (Trung bình)
- [ ] **Build static**: `npm run generate`
- [ ] **Staging**: Kiểm tra trên môi trường staging
- [ ] **Production**: Deploy lên production
- [ ] **Monitoring**: Setup analytics, error tracking

---

## 📊 TỔNG HỢP DỮ LIỆU CẦN CUNG CẤP

### ✅ ĐÃ CÓ:
- Số điện thoại: 0913910209
- Link Zalo: https://zalo.me/0913910209

### ❗ CẦN BỔ SUNG NGAY:

#### 1. **Assets (Ảnh/Logo/Media)**
- [ ] Logo mới (SVG/PNG, không chữ "Sao Vàng")
- [ ] Ảnh nền header chất lượng cao
- [ ] Link YouTube video khai trương
- [ ] Logo đối tác (PNG/SVG)

#### 2. **Links & Social Media**
- [ ] Link Facebook Page
- [ ] Link YouTube Channel
- [ ] Link TikTok (nếu có)
- [ ] Link Zalo OA (nếu có)
- [ ] Website đối tác (nếu có)

#### 3. **Nội dung văn bản**
- [ ] Tóm tắt giới thiệu (cho trang chủ)
- [ ] Nội dung trang Giới thiệu (full)
- [ ] Danh sách tin tức nổi bật (tiêu đề, mô tả, ảnh, link)
- [ ] Meta description cho SEO

#### 4. **Dữ liệu sản phẩm** (QUAN TRỌNG)
- [ ] **Thông tin cơ bản**:
  - Mã sản phẩm
  - Tên sản phẩm
  - Kích thước (cm/mm)
  - Màu sắc (tên + mã hex)
  - Giá (nếu hiển thị)
  - Mô tả ngắn + chi tiết
  - Thông số kỹ thuật

- [ ] **Hình ảnh**:
  - Ảnh sản phẩm (tile) - chất lượng cao
  - Ảnh phối cảnh (showroom/inspiration)
  - **Texture file** cho Room Designer:
    - PNG/JPG seamless texture
    - Kích thước: 512x512 hoặc 1024x1024
    - Đúng tỉ lệ thực tế

#### 5. **Cấu hình chức năng**
- [ ] Email nhận thiết kế từ khách hàng
- [ ] Zalo OA App ID (nếu tích hợp API)
- [ ] Watermark cho ảnh xuất (logo + text)
- [ ] Độ phân giải ảnh xuất mặc định

#### 6. **Thông tin đối tác**
- [ ] Tên đối tác
- [ ] Logo đối tác
- [ ] Link website
- [ ] Thứ tự ưu tiên

---

## 🎯 LỘ TRÌNH THỰC HIỆN ĐỀ XUẤT

### **Phase 1: Giao diện cơ bản** (1-2 tuần)
1. Header & Logo ✅
2. Footer & Social Links ✅
3. Liên hệ nhanh (Call + Zalo) ✅
4. Trang Giới thiệu ✅
5. Trang chủ (Tin nổi bật + Giới thiệu) ✅

### **Phase 2: Trang sản phẩm** (2-3 tuần)
1. Danh sách sản phẩm ✅
2. Bộ lọc sản phẩm ✅
3. Trang chi tiết sản phẩm ✅
4. Đối tác ✅

### **Phase 3: Room Designer** (3-4 tuần)
1. Cải tiến UI/UX ✅
2. Chức năng thiết kế (chọn tường, ốp gạch) ✅
3. Lưu và xuất ảnh ✅
4. Gửi thiết kế ✅

### **Phase 4: Tối ưu & Deploy** (1 tuần)
1. Tối ưu hiệu năng ✅
2. SEO ✅
3. Kiểm thử ✅
4. Triển khai ✅

---

## ❓ CÂU HỎI CẦN LÀM RÕ

1. **Về sản phẩm**:
   - Có bao nhiêu sản phẩm? (ước tính)
   - Có phân danh mục không? (gạch ốp tường, gạch lát nền, gạch trang trí...)
   - Có hiển thị giá không?
   - Có tính năng so sánh sản phẩm không?

2. **Về Room Designer**:
   - 2D hay 3D?
   - Có template phòng sẵn không? (phòng khách, phòng ngủ, phòng tắm...)
   - Có cần tính diện tích gạch cần dùng không?
   - Có chức năng lưu dự án để chỉnh sửa sau không?

3. **Về tích hợp**:
   - Có tích hợp thanh toán online không?
   - Có cần chatbot/live chat không?
   - Có cần đa ngôn ngữ (Tiếng Việt + Tiếng Anh)?

4. **Về quản trị**:
   - Có cần admin panel để quản lý sản phẩm không?
   - Có cần quản lý đơn hàng/yêu cầu tư vấn không?
   - Có cần báo cáo/thống kê không?

---

## 📞 Liên hệ đã cấu hình
- **Zalo**: https://zalo.me/0913910209
- **Phone**: 0913910209 (tel:0913910209)
- **Facebook**: [Cần cung cấp]
- **YouTube**: [Cần cung cấp]

---

**Ghi chú**: Document này sẽ được cập nhật liên tục khi có thêm thông tin.

