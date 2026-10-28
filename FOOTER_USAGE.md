# 📄 Hướng dẫn sử dụng Footer Component

## 🎯 Tổng quan

Footer component đã được tạo với đầy đủ thông tin liên hệ và social media links. Dữ liệu được lấy từ `app/app.config.ts` để dễ dàng cập nhật.

---

## 🚀 Cách sử dụng

### 1. Import vào Layout

```vue
<!-- app/layouts/default.vue hoặc app/layouts/pages.vue -->
<template>
  <div>
    <header>...</header>
    
    <main>
      <slot />
    </main>
    
    <Footer />
  </div>
</template>

<script setup>
// Component tự động import nhờ Nuxt auto-import
</script>
```

### 2. Component đã có sẵn tại

```
app/components/layouts/Footer.vue
```

---

## 📱 Social Media Links đã cấu hình

### ✅ Đã có trong `app/app.config.ts`:

| Platform | Link | Icon | Trạng thái |
|----------|------|------|------------|
| **Facebook** | `https://facebook.com/saovangceramic` | `pi pi-facebook` | ⚠️ Link tạm |
| **YouTube** | `https://youtube.com/@saovangceramic` | `pi pi-youtube` | ⚠️ Link tạm |
| **TikTok** | `https://tiktok.com/@saovangceramic` | `pi pi-tiktok` | ⚠️ Link tạm |
| **Zalo OA** | `https://zalo.me/saovangceramic` | `pi pi-comments` | ⚠️ Link tạm |
| **Zalo Chat** | `https://zalo.me/0913910209` | `pi pi-comments` | ✅ Link thật |
| **Phone** | `tel:0913910209` | `pi pi-phone` | ✅ Link thật |
| **Email** | `mailto:info@saovangceramic.vn` | `pi pi-envelope` | ⚠️ Email tạm |

---

## 🔧 Cập nhật Links thật

### Cách 1: Sửa trong `app/app.config.ts` (KHUYẾN NGHỊ)

```typescript
// File: app/app.config.ts
export default defineAppConfig({
  contact: {
    // Cập nhật links thật tại đây
    facebook: 'https://facebook.com/your-real-page',
    youtube: 'https://youtube.com/@your-real-channel',
    tiktok: 'https://tiktok.com/@your-real-account',
    zaloOA: 'https://zalo.me/your-real-oa-id',
    email: 'your-real-email@domain.com',
  }
})
```

**Sau khi sửa:**
- Development: Lưu file → Tự động reload ⚡
- Production: Lưu file → `npm run build`

### Cách 2: Sửa trong `config/contact.json`

```json
{
  "contact": {
    "facebook": "https://facebook.com/your-real-page",
    "youtube": "https://youtube.com/@your-real-channel",
    "tiktok": "https://tiktok.com/@your-real-account",
    "zaloOA": "https://zalo.me/your-real-oa-id"
  }
}
```

**Sau khi sửa:** Restart server hoặc rebuild

---

## 🎨 Footer Features

### ✅ Đã có:

1. **Company Info**
   - Tên công ty
   - Mô tả ngắn
   - Logo (có thể thêm)

2. **Contact Info**
   - Số điện thoại (click để gọi)
   - Email (click để mở mail)
   - Địa chỉ (cần cập nhật)
   - Giờ làm việc

3. **Quick Links**
   - Trang chủ
   - Sản phẩm
   - Giới thiệu
   - Thiết kế cá nhân

4. **Social Media Icons**
   - Facebook (màu xanh Facebook)
   - YouTube (màu đỏ YouTube)
   - TikTok (màu đen)
   - Zalo OA (màu xanh Zalo)
   - Hover effect đẹp mắt
   - Open in new tab
   - Security: `rel="noopener noreferrer"`

5. **Copyright**
   - Tự động cập nhật năm hiện tại

---

## 📋 Checklist cập nhật Link thật

### Bước 1: Thu thập thông tin

- [ ] Link Facebook Page chính thức
- [ ] Link YouTube Channel chính thức
- [ ] Link TikTok account (nếu có)
- [ ] Zalo OA ID hoặc link (nếu có)
- [ ] Email hỗ trợ khách hàng
- [ ] Địa chỉ showroom đầy đủ
- [ ] Giờ làm việc chính xác

### Bước 2: Cập nhật vào config

```typescript
// app/app.config.ts
export default defineAppConfig({
  contact: {
    phone: '0913910209',
    phoneLink: 'tel:0913910209',
    email: '[EMAIL THẬT]', // ← Thay đổi
    
    facebook: '[FACEBOOK URL THẬT]', // ← Thay đổi
    youtube: '[YOUTUBE URL THẬT]', // ← Thay đổi
    tiktok: '[TIKTOK URL THẬT]', // ← Thay đổi
    
    zalo: 'https://zalo.me/0913910209',
    zaloOA: '[ZALO OA URL THẬT]', // ← Thay đổi
  },
  
  company: {
    name: 'Công ty Gạch Sao Vàng',
    address: '[ĐỊA CHỈ SHOWROOM THẬT]', // ← Thay đổi
    workingHours: '[GIỜ LÀM VIỆC THẬT]', // ← Thay đổi
  }
})
```

### Bước 3: Kiểm tra

- [ ] Dev: Chạy `npm run dev` và kiểm tra footer
- [ ] Click từng link social để đảm bảo đúng
- [ ] Test trên mobile (especially call/Zalo links)
- [ ] Kiểm tra icon hiển thị đúng
- [ ] Verify hover effects

### Bước 4: Deploy

- [ ] Build: `npm run build`
- [ ] Kiểm tra trên staging
- [ ] Deploy lên production
- [ ] Test lại tất cả links trên thiết bị thật

---

## 🎯 Icon Reference (PrimeIcons)

Footer đang dùng PrimeIcons, các icon có sẵn:

| Icon | Class | Màu |
|------|-------|-----|
| Facebook | `pi pi-facebook` | #1877F2 |
| YouTube | `pi pi-youtube` | #FF0000 |
| TikTok | `pi pi-tiktok` | #000000 |
| Zalo/Comments | `pi pi-comments` | #0068FF |
| Phone | `pi pi-phone` | #10B981 |
| Email | `pi pi-envelope` | #6B7280 |
| Instagram | `pi pi-instagram` | #E4405F |
| Twitter/X | `pi pi-twitter` | #1DA1F2 |

### Thêm icon mới:

```vue
<a href="..." class="social-btn instagram">
  <i class="pi pi-instagram"></i>
</a>
```

```css
.social-btn.instagram:hover {
  background: #E4405F;
}
```

---

## 🔗 Links tạm hiện tại

**⚠️ CẦN THAY BẰNG LINKS THẬT:**

1. **Facebook**: `https://facebook.com/saovangceramic`
   - Đây là link giả định, cần thay bằng page thật

2. **YouTube**: `https://youtube.com/@saovangceramic`
   - Đây là link giả định, cần thay bằng channel thật

3. **TikTok**: `https://tiktok.com/@saovangceramic`
   - Đây là link giả định, cần thay bằng account thật

4. **Zalo OA**: `https://zalo.me/saovangceramic`
   - Đây là link giả định, cần thay bằng OA thật

5. **Email**: `info@saovangceramic.vn`
   - Đây là email giả định, cần thay bằng email thật

---

## 🚨 Lưu ý quan trọng

### Security
- ✅ Tất cả external links đều có `target="_blank"`
- ✅ Tất cả đều có `rel="noopener noreferrer"` (chống security risks)

### SEO
- ✅ Icons có `aria-label` cho accessibility
- ✅ Links có meaningful text cho screen readers

### Performance
- ✅ CSS optimized với transitions
- ✅ Hover effects mượt mà
- ✅ Responsive design (mobile-first)

### Mobile
- ✅ Phone link mở app gọi điện
- ✅ Email link mở app email
- ✅ Social links test trên iOS/Android
- ✅ Touch-friendly button size (45px)

---

## 📱 Test Checklist

### Desktop
- [ ] Hover effects hoạt động mượt
- [ ] All links open in new tab
- [ ] Icons display correctly
- [ ] Layout responsive

### Mobile
- [ ] Phone link opens dialer
- [ ] Email link opens mail app
- [ ] Social icons tappable (45px min)
- [ ] Footer stacks properly
- [ ] No horizontal scroll

### Browsers
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

---

## 🎨 Customization

### Đổi màu chủ đạo

```css
/* Trong Footer.vue */
.footer {
  /* Gradient background */
  background: linear-gradient(135deg, #YOUR_COLOR_1 0%, #YOUR_COLOR_2 100%);
}

.footer-title::after {
  /* Accent color */
  background: linear-gradient(90deg, #YOUR_ACCENT_COLOR, transparent);
}
```

### Thêm section mới

```vue
<!-- Trong Footer.vue template -->
<div class="footer-section">
  <h3 class="footer-title">Section mới</h3>
  <!-- Nội dung -->
</div>
```

---

**Cập nhật cuối:** {{ new Date().toLocaleDateString('vi-VN') }}

