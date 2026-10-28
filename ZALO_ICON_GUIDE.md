# 🎨 Hướng dẫn sử dụng Zalo Icon SVG

## ✅ Đã hoàn thành

### 1. **Tạo ZaloIcon Component** ✅
   - File: `app/components/icons/ZaloIcon.vue`
   - SVG chất lượng cao từ bạn cung cấp
   - Props: `size` và `className` để customize

### 2. **Đã áp dụng vào Footer** ✅
   - `FooterWidget.vue`:
     - ✅ Nút Zalo OA (nền trắng, icon màu)
     - ✅ Icon Zalo Chat (trong phần Contact Info)
   - `ContactLinks.vue`:
     - ✅ Nút Chat Zalo (icon trắng trên nền xanh)

---

## 🎨 ZaloIcon Component

### Cách sử dụng:

```vue
<template>
  <!-- Basic usage -->
  <ZaloIcon />
  
  <!-- Custom size -->
  <ZaloIcon :size="32" />
  
  <!-- With custom class -->
  <ZaloIcon :size="24" class="my-custom-class" />
</template>
```

### Props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `string \| number` | `24` | Kích thước icon (px) |
| `className` | `string` | `''` | CSS class tùy chỉnh |

---

## 📍 Các nơi đã sử dụng

### 1. **FooterWidget.vue** (Main Footer)

#### Zalo OA Button:
```vue
<!-- Nút Zalo OA - nền trắng -->
<a href="..." class="w-12 h-12 bg-white hover:bg-gray-100 ...">
  <ZaloIcon :size="28" />
</a>
```

#### Zalo Chat Info:
```vue
<!-- Trong Contact Info -->
<div class="flex items-center mb-3">
  <div class="w-8 mr-3">
    <ZaloIcon :size="24" />
  </div>
  <div>
    <p class="text-sm text-gray-300">Chat Zalo</p>
    <a href="...">0913 910 209</a>
  </div>
</div>
```

### 2. **ContactLinks.vue** (Quick Contact)

```vue
<!-- Nút Chat Zalo - icon trắng trên nền xanh -->
<a href="..." class="contact-btn zalo">
  <ZaloIcon :size="20" class="zalo-icon" />
  Chat Zalo
</a>
```

```css
.zalo-icon {
  filter: brightness(0) invert(1); /* Làm icon trắng */
}
```

---

## 🎨 Styling Options

### Option 1: Icon màu gốc (nền trắng/sáng)
```vue
<div class="bg-white p-2 rounded">
  <ZaloIcon :size="24" />
</div>
```

### Option 2: Icon trắng (nền tối)
```vue
<div class="bg-blue-600 p-2 rounded">
  <ZaloIcon :size="24" class="text-white" style="filter: brightness(0) invert(1)" />
</div>
```

### Option 3: Icon với màu custom
```vue
<ZaloIcon :size="24" style="filter: hue-rotate(45deg)" />
```

---

## 🔄 So sánh với PrimeIcons

### Trước (PrimeIcons):
```vue
<i class="pi pi-comments"></i>
```
- ❌ Icon chung chung (không đặc trưng Zalo)
- ❌ Giống icon chat thông thường

### Sau (SVG Custom):
```vue
<ZaloIcon :size="24" />
```
- ✅ Icon chính thức của Zalo
- ✅ Nhận diện thương hiệu cao
- ✅ Chất lượng cao, không bị vỡ
- ✅ Customize dễ dàng

---

## 📦 Mở rộng

### Tạo icon SVG khác tương tự:

```vue
<!-- app/components/icons/TikTokIcon.vue -->
<template>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 48 48"
    :width="size"
    :height="size"
    :class="className"
  >
    <!-- SVG paths here -->
  </svg>
</template>

<script setup lang="ts">
interface Props {
  size?: string | number
  className?: string
}

withDefaults(defineProps<Props>(), {
  size: 24,
  className: ''
})
</script>
```

### Sử dụng:
```vue
<TikTokIcon :size="28" />
```

---

## 🎯 Checklist

### Hiển thị trong Footer:
- [x] Zalo OA button (nền trắng, 48x48px)
- [x] Zalo Chat info (24x24px)
- [x] Hover effect hoạt động
- [x] Link đúng từ config

### Hiển thị trong ContactLinks:
- [x] Chat Zalo button
- [x] Icon màu trắng trên nền xanh
- [x] Hover effect scale

### Responsive:
- [x] Desktop: Hiển thị đầy đủ
- [x] Mobile: Icon đủ lớn để tap
- [x] Tablet: Layout cân đối

---

## 💡 Tips

### 1. **Điều chỉnh màu icon:**
```css
/* Icon trắng */
filter: brightness(0) invert(1);

/* Icon đen */
filter: brightness(0);

/* Icon xám */
filter: grayscale(1);

/* Icon màu custom */
filter: hue-rotate(180deg);
```

### 2. **Responsive size:**
```vue
<ZaloIcon 
  :size="isMobile ? 20 : 28" 
/>
```

### 3. **Conditional rendering:**
```vue
<ZaloIcon 
  v-if="showZaloIcon"
  :size="24" 
/>
```

---

## 📸 Preview

### FooterWidget (Main Footer):
```
┌─────────────────────────────────────┐
│ CÔNG TY TNHH TẬP ĐOÀN SAO VÀNG...  │
│                                     │
│ 📞 0913 910 209    🕐 8h - 18h     │
│ ✉️ info@...        [Zalo] 0913...  │
│                                     │
│ [FB] [YT] [TT] [Zalo SVG]          │
└─────────────────────────────────────┘
```

### ContactLinks:
```
┌──────────────────────────────────────┐
│ [Zalo SVG] Chat Zalo                 │
│ [FB] Facebook                        │  
│ [Phone] 0913 910 209                 │
└──────────────────────────────────────┘
```

---

## 🔗 Files liên quan

- **Component**: `app/components/icons/ZaloIcon.vue`
- **Sử dụng trong**:
  - `app/components/layouts/landing/FooterWidget.vue`
  - `app/components/ContactLinks.vue`
- **Config**: `app/app.config.ts`

---

## ✨ Kết quả

✅ **Icon Zalo chuyên nghiệp** - Dùng SVG chính thức  
✅ **Dễ sử dụng** - Component reusable  
✅ **Responsive** - Tự động scale theo size  
✅ **Customize** - Props linh hoạt  
✅ **Nhất quán** - Hiển thị đồng bộ khắp website  

---

**Cập nhật**: ${new Date().toLocaleDateString('vi-VN')}

