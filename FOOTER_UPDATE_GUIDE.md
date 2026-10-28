# 📄 Hướng dẫn Cập nhật Footer - FooterWidget.vue

## ✅ Đã cập nhật thành công!

File `app/components/layouts/landing/FooterWidget.vue` đã được bổ sung đầy đủ:
- ✅ Icons Facebook & YouTube (đã có)
- ✅ Icons TikTok & Zalo OA (mới thêm)
- ✅ Thông tin liên hệ đầy đủ (Phone, Email, Zalo, Giờ làm việc)
- ✅ Tất cả lấy dữ liệu từ `app/app.config.ts`

---

## 🎨 Các Social Media đã có

### Icons hiện tại (4 nút):

| Platform | Icon | Màu nền | Link từ |
|----------|------|---------|---------|
| **Facebook** | `pi pi-facebook` | Blue (#3b82f6) | `appConfig.contact.facebook` |
| **YouTube** | `pi pi-youtube` | Red (#dc2626) | `appConfig.contact.youtube` |
| **TikTok** | `pi pi-tiktok` | Black | `appConfig.contact.tiktok` |
| **Zalo OA** | `pi pi-comments` | Blue (#3b82f6) | `appConfig.contact.zaloOA` |

### Thông tin liên hệ:

| Loại | Icon | Dữ liệu từ |
|------|------|------------|
| **Hotline** | `pi pi-phone` | `appConfig.contact.phone` |
| **Email** | `pi pi-envelope` | `appConfig.contact.email` |
| **Chat Zalo** | `pi pi-comments` | `appConfig.contact.zalo` |
| **Giờ làm việc** | `pi pi-clock` | `appConfig.company.workingHours` |

---

## 🔧 Cách cập nhật Links

### Sửa file `app/app.config.ts`:

```typescript
export default defineAppConfig({
  contact: {
    // ✅ Phone (đã có)
    phone: '0913910209',
    phoneLink: 'tel:0913910209',
    
    // 👇 Cập nhật các link này
    facebook: 'https://facebook.com/your-real-page',    // ← Đổi link thật
    youtube: 'https://youtube.com/@your-channel',       // ← Đổi link thật
    tiktok: 'https://tiktok.com/@your-account',         // ← Đổi link thật
    zaloOA: 'https://zalo.me/your-oa-id',               // ← Đổi link thật
    email: 'your-email@domain.com',                     // ← Đổi email thật
    zalo: 'https://zalo.me/0913910209',                 // ✅ Đã có
  },
  
  company: {
    workingHours: 'Thứ 2 - Chủ nhật: 8:00 - 18:00',    // ← Sửa nếu cần
  }
})
```

**Sau khi sửa:**
- Dev mode: Lưu file (Ctrl+S) → Tự động reload ⚡
- Production: Chạy `npm run build`

---

## 📱 Features đã có

### ✅ Security & SEO:
- Tất cả external links có `target="_blank"`
- Tất cả có `rel="noopener noreferrer"`
- Icons có `aria-label` cho accessibility

### ✅ UX:
- Hover effect: Scale 1.1x khi hover
- Icons clickable với màu đúng brand
- Phone/Email/Zalo links có thể click
- Responsive design

### ✅ Fallback:
- Nếu không có link trong config → hiển thị `#`
- Nếu không có data → hiển thị giá trị mặc định

---

## 🎯 Hiển thị hiện tại

### Footer sẽ hiển thị:

```
┌─────────────────────────────────────────────────────┐
│ CÔNG TY TNHH TẬP ĐOÀN SAO VÀNG CERAMICS            │
│                                                     │
│ Lô 17, Cụm Công Nghiệp Lại Yên, Xã Sơn Đồng...    │
│                                                     │
│ ┌──────────────────┐  ┌──────────────────────┐    │
│ │ 📞 Hotline        │  │ 🕐 Giờ làm việc      │    │
│ │ 0913 910 209      │  │ Thứ 2 - CN: 8-18h    │    │
│ │                   │  │                       │    │
│ │ ✉️ Email          │  │ 💬 Chat Zalo         │    │
│ │ info@sao...       │  │ 0913 910 209         │    │
│ └──────────────────┘  └──────────────────────┘    │
│                                                     │
│ [FB] [YT] [TT] [Zalo] ← 4 nút social media        │
│                                                     │
│ © 2025 CERAMICS GOLD STAR GROUP...                 │
└─────────────────────────────────────────────────────┘
```

---

## 🚀 Test Checklist

### Desktop:
- [ ] 4 icons social media hiển thị đúng
- [ ] Hover effect hoạt động (scale + đổi màu)
- [ ] Click Facebook → mở tab mới đúng page
- [ ] Click YouTube → mở tab mới đúng channel
- [ ] Click TikTok → mở tab mới đúng account
- [ ] Click Zalo → mở tab mới đúng OA
- [ ] Phone link có thể click
- [ ] Email link mở mail app

### Mobile:
- [ ] Icons đủ lớn để tap (48x48px)
- [ ] Phone link mở app gọi điện
- [ ] Email link mở app email
- [ ] Zalo link mở app Zalo (nếu cài)
- [ ] Layout responsive (stack vertical)

### Browsers:
- [ ] Chrome
- [ ] Firefox  
- [ ] Safari
- [ ] Edge

---

## 🎨 Customization

### Thêm icon mới:

```vue
<!-- Trong FooterWidget.vue -->
<a :href="appConfig.contact?.instagram || '#'"
  target="_blank"
  rel="noopener noreferrer"
  class="w-12 h-12 bg-pink-600 hover:bg-pink-700 rounded-lg flex items-center justify-center transition-colors transform hover:scale-110"
  aria-label="Instagram">
  <i class="pi pi-instagram text-white"></i>
</a>
```

### Đổi màu icon:

```vue
<!-- Ví dụ: Đổi TikTok thành màu tím -->
class="w-12 h-12 bg-purple-600 hover:bg-purple-700 ..."
```

---

## 📋 Links cần cập nhật

### ⚠️ Links TẠM (cần thay):

- [ ] **Facebook**: `https://facebook.com/saovangceramic`
- [ ] **YouTube**: `https://youtube.com/@saovangceramic`
- [ ] **TikTok**: `https://tiktok.com/@saovangceramic`
- [ ] **Zalo OA**: `https://zalo.me/saovangceramic`
- [ ] **Email**: `info@saovangceramic.vn`

### ✅ Links THẬT (đã có):

- [x] **Phone**: `0913910209`
- [x] **Zalo Chat**: `https://zalo.me/0913910209`

---

## 💡 Lưu ý

### Zalo OA vs Zalo Chat:
- **Zalo Chat** (`appConfig.contact.zalo`): Chat cá nhân - `https://zalo.me/0913910209`
- **Zalo OA** (`appConfig.contact.zaloOA`): Official Account - `https://zalo.me/saovangceramic`

Nếu không có OA, icon Zalo OA sẽ dùng link Zalo Chat thay thế.

### Email format:
- Email có `mailto:` prefix tự động
- Click sẽ mở email client mặc định

### Phone format:
- Phone có `tel:` prefix
- Click trên mobile sẽ mở app gọi điện

---

## 🔗 Files liên quan

- **Config chính**: `app/app.config.ts`
- **Footer component**: `app/components/layouts/landing/FooterWidget.vue`
- **Contact JSON**: `config/contact.json` (backup)
- **Docs**: `CONTACT_CONFIG.md`, `FOOTER_USAGE.md`

---

## ✨ Tóm tắt thay đổi

### Đã thêm:
- ✅ 2 icons mới: TikTok + Zalo OA
- ✅ 4 thông tin liên hệ: Phone, Email, Zalo, Giờ làm việc
- ✅ Tất cả lấy từ `app.config.ts` (hot reload)
- ✅ Fallback values nếu không có config
- ✅ Security attributes (`target`, `rel`)

### Không thay đổi:
- ✅ Layout gốc giữ nguyên
- ✅ Animations giữ nguyên
- ✅ Background image giữ nguyên
- ✅ Copyright section giữ nguyên

---

**Cập nhật**: ${new Date().toLocaleDateString('vi-VN')}

