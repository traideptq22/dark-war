# 📸 Save & Share Feature - Guide

## 🎯 Mục đích

Feature **Save & Share** cho phép user:
1. **Save**: Lưu toàn bộ thiết kế phòng (all layers merged) thành file PNG và tải xuống
2. **Send**: Chia sẻ thiết kế qua Web Share API (mobile) hoặc tải xuống để share manual

---

## 🏗️ Architecture

### **Components:**

```
RoomVisualizer.vue (Parent)
├── WallAreaCanvas.vue (Canvas vẽ gạch)
├── SaveShareNavigator.vue (Sidebar Save/Share)
└── TileSelector.vue (Popup chọn gạch)
```

### **Layer Stack khi Capture:**

```
┌─────────────────────────────────────────┐
│  Matt (Z: 56) - Darken overlay         │ ✅ Captured
├─────────────────────────────────────────┤
│  Glossy (Z: 55) - Reflection           │ ✅ Captured
├─────────────────────────────────────────┤
│  room.png (Z: 50) - Furniture          │ ✅ Captured
├─────────────────────────────────────────┤
│  WallAreaCanvas (Z: 40) - Tiles        │ ✅ Captured
├─────────────────────────────────────────┤
│  background.jpg (Z: 0) - Background    │ ✅ Captured
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  TileSelector (Z: 5001)                │ ❌ NOT Captured (ignored)
│  AppTopbar (Z: 5000)                   │ ❌ NOT Captured (ignored)
│  SaveShareNavigator (Z: 4999)          │ ❌ NOT Captured (ignored)
│  RoomNavigator (Z: 4999)               │ ❌ NOT Captured (ignored)
└─────────────────────────────────────────┘
```

---

## 🔧 Implementation Details

### **1. SaveShareNavigator.vue**

**Props:**
- `isOpen: boolean` - Hiển thị/ẩn sidebar

**Emits:**
- `close()` - Đóng sidebar
- `save()` - Trigger save image
- `send()` - Trigger share

**Styling:**
- Z-index: `4999` (dưới AppTopbar nhưng trên canvas)
- Slide từ bên phải (`right: -400px` → `right: 0`)
- Gradient background: `#667eea` → `#764ba2`
- 2 action cards: Save (purple) và Send (pink)

---

### **2. RoomVisualizer.vue - Capture Logic**

#### **A. html2canvas Configuration:**

```typescript
const canvas = await html2canvas(roomContainer.value, {
  backgroundColor: '#ffffff',      // White background
  scale: 2,                        // 2x resolution (high quality)
  logging: false,                  // No console logs
  useCORS: true,                   // Allow cross-origin images
  allowTaint: true,                // Allow tainted canvas
  removeContainer: false,          // Keep original DOM
  imageTimeout: 0,                 // No timeout for image loading
  ignoreElements: (element) => {   // Ignore UI elements
    return element.classList.contains('tile-selector-wrapper') ||
           element.classList.contains('app-topbar') ||
           element.classList.contains('save-share-navigator') ||
           element.classList.contains('room-navigator') ||
           element.hasAttribute('data-html2canvas-ignore');
  }
});
```

#### **B. Save Flow:**

```
User clicks "Lưu ảnh"
  ↓
handleSave() called
  ↓
html2canvas(roomContainer) → Capture all layers
  ↓
canvas.toBlob() → Convert to PNG blob
  ↓
Create download link with timestamp filename
  ↓
Auto-download: "bedroom_2025-10-16T14-30-45.png"
  ↓
Cleanup URL object
```

#### **C. Send/Share Flow:**

```
User clicks "Chia sẻ"
  ↓
handleSend() called
  ↓
html2canvas(roomContainer) → Capture all layers
  ↓
canvas.toBlob() → Convert to PNG blob
  ↓
Check if Web Share API available?
  ├─ YES (Mobile/Modern browser)
  │   ↓
  │   navigator.share({ files: [image] })
  │   ↓
  │   Native share dialog (WhatsApp, Email, etc.)
  │
  └─ NO (Desktop/Old browser)
      ↓
      fallbackShare() → Auto-download
      ↓
      Alert: "Ảnh đã tải xuống, bạn có thể chia sẻ manual"
```

---

## 📱 Usage

### **Opening Save/Share:**

Từ bất kỳ component nào, gọi:

```typescript
// Get ref to RoomVisualizer
const roomVisualizerRef = ref<InstanceType<typeof RoomVisualizer>>();

// Open Save/Share navigator
roomVisualizerRef.value?.openSaveShare();
```

### **Example Integration (AppTopbar):**

```vue
<template>
  <button @click="openSaveShare">
    <i class="pi pi-save"></i>
    Lưu & Chia sẻ
  </button>
</template>

<script setup>
const roomVisualizerRef = inject('roomVisualizerRef');

const openSaveShare = () => {
  roomVisualizerRef.value?.openSaveShare();
};
</script>
```

---

## 🎨 Captured Output

**File format:** PNG (lossless, high quality)  
**Resolution:** 2x original (e.g., 1920x1440 → 3840x2880)  
**Filename:** `{RoomTitle}_{Timestamp}.png`  
**Example:** `bedroom_2025-10-16T14-30-45.png`

**Includes:**
- ✅ Background image
- ✅ Tile textures (from WallAreaCanvas)
- ✅ Furniture/objects (room.png)
- ✅ Glossy overlay (lighting effects)
- ✅ Matt overlay (shadow effects)

**Excludes:**
- ❌ TileSelector popup
- ❌ AppTopbar
- ❌ SaveShareNavigator
- ❌ RoomNavigator
- ❌ Any element with `.data-html2canvas-ignore` attribute

---

## 🔍 Troubleshooting

### **Issue 1: Images not loading in capture**

**Cause:** CORS policy blocking external images  
**Fix:** Ensure `useCORS: true` and `allowTaint: true` in html2canvas config

### **Issue 2: UI elements visible in captured image**

**Cause:** UI not properly ignored  
**Fix:** Add class name to `ignoreElements` function:

```typescript
ignoreElements: (element) => {
  return element.classList.contains('your-ui-class') || ...
}
```

### **Issue 3: Low quality image**

**Cause:** Scale too low  
**Fix:** Increase `scale` parameter (default: 2, max recommended: 3)

### **Issue 4: Canvas too large (out of memory)**

**Cause:** Very high resolution + scale  
**Fix:** Reduce scale to 1.5 or 1, or resize room container before capture

---

## 🚀 Future Enhancements

1. **Email Integration:**
   - Add email form in SendCard
   - Backend API to send email with attachment

2. **Social Media:**
   - Direct integration with Facebook, Instagram APIs
   - Generate shareable link

3. **Watermark:**
   - Add company logo/watermark to captured image

4. **Multiple Formats:**
   - Support JPEG (smaller file size)
   - Support PDF (printable)

5. **Cloud Save:**
   - Save to user's cloud storage (Google Drive, Dropbox)
   - Project versioning

---

## 📦 Dependencies

```json
{
  "html2canvas": "^1.4.1"
}
```

**Install:**
```bash
npm install html2canvas
```

**Types:**
```typescript
// Add to tsconfig.json if needed
{
  "compilerOptions": {
    "types": ["html2canvas"]
  }
}
```

---

## ✅ Checklist

- [x] SaveShareNavigator component created
- [x] html2canvas installed
- [x] Save function implemented
- [x] Send/Share function implemented (with fallback)
- [x] UI elements properly ignored in capture
- [x] High-quality output (2x scale)
- [x] Filename with timestamp
- [ ] Add button to AppTopbar to open SaveShareNavigator
- [ ] Test on mobile (Web Share API)
- [ ] Test with various room sizes
- [ ] Add loading spinner during capture

---

**Created:** 2025-10-16  
**Version:** 1.0.0

