# Room Visualizer System

## 🎯 **Tổng Quan**
Hệ thống Room Visualizer cho phép hiển thị và tương tác với các phòng theo config JSON, với khả năng xếp layer đúng thứ tự và áp dụng gạch vào vùng tường.

## 📁 **Cấu Trúc File**

```
app/components/room/
├── RoomVisualizer.vue          # Component chính
├── RoomLayerManager.vue         # Quản lý layers
├── RoomInteraction.vue          # Xử lý tương tác
└── RoomConfigLoader.vue         # Load config từ JSON

config/room/
├── bathroom01.json             # Config phòng tắm 01
├── bathroom02.json             # Config phòng tắm 02
├── bathroom03.json             # Config phòng tắm 03
├── livingroom02.json           # Config phòng khách 02
├── livingroom03.json           # Config phòng khách 03
├── kitchen01.json              # Config phòng bếp 01
├── kitchen02.json              # Config phòng bếp 02
├── bedroom01.json               # Config phòng ngủ 01
├── outside01.json               # Config ngoài trời 01
└── outside02.json               # Config ngoài trời 02

public/rooms/
├── preview/                    # Ảnh preview phòng
│   ├── bathroom01.jpg
│   ├── bathroom02.jpg
│   └── ...
└── products/                   # Ảnh sản phẩm phòng
    ├── bathroom/
    │   ├── 01/
    │   │   ├── background.jpg
    │   │   ├── room.png
    │   │   ├── glossy.jpg
    │   │   └── matt.jpg
    │   └── ...
    └── ...
```

## 🎨 **Layer Structure**

### **Thứ Tự Layer (Z-Index):**
1. **Background Layer** (Z: 0) - Ảnh nền
2. **Room Objects Layer** (Z: 1) - Vật thể phòng (đã xóa phông)
3. **Material Layer** (Z: 2) - Chất liệu gạch (Glossy/Matt)
4. **Tile Fill Layer** (Z: 3+) - Gạch được chọn để fill

### **Cách Hoạt Động:**
```
┌─────────────────────────────────────┐
│ 4. Tile Fill Layer (Top Layer)      │ ← Gạch được chọn để fill
├─────────────────────────────────────┤
│ 3. Material Layer (Glossy/Matt)     │ ← Chất liệu gạch
├─────────────────────────────────────┤
│ 2. Room Objects Layer (Base)         │ ← Vật thể phòng đã xóa phông
├─────────────────────────────────────┤
│ 1. Background Layer (Subtle)         │ ← Ảnh nền (opacity: 0.3)
└─────────────────────────────────────┘
```

## 🚀 **Cách Sử Dụng**

### **1. Import Component**
```vue
<template>
  <div class="room-page">
    <RoomVisualizer />
  </div>
</template>

<script setup>
import RoomVisualizer from '@/components/room/RoomVisualizer.vue';
</script>
```

### **2. Chọn Phòng**
- Click vào phòng trong grid để load config
- Hệ thống sẽ tự động load các layer theo thứ tự

### **3. Quản Lý Layers**
- Sử dụng RoomLayerManager để bật/tắt từng layer
- Điều chỉnh opacity của từng layer

### **4. Tương Tác**
- Chọn chất liệu (Glossy/Matt/None)
- Chọn gạch từ tile grid
- Chọn vùng tường từ wall areas
- Áp dụng gạch vào vùng tường

## 🔧 **API Methods**

### **RoomVisualizer.vue**
```typescript
// Exposed methods
defineExpose({
  selectRoom,           // Chọn phòng
  handleApplyTile,     // Áp dụng gạch
  handleClearAll,      // Xóa tất cả gạch
  handleMaterialSelected // Chọn chất liệu
});
```

### **RoomLayerManager.vue**
```typescript
// Exposed methods
defineExpose({
  addTileLayer,        // Thêm tile layer
  removeTileLayer,     // Xóa tile layer
  toggleLayer          // Bật/tắt layer
});
```

### **RoomInteraction.vue**
```typescript
// Exposed methods
defineExpose({
  setWallAreas,        // Set wall areas
  selectMaterial,      // Chọn chất liệu
  selectTile,          // Chọn gạch
  selectWallArea       // Chọn vùng tường
});
```

## 📋 **Config JSON Structure**

### **Room Config Example:**
```json
{
  "data": {
    "Id": "bathroom01",
    "Title": "Phòng Tắm 01",
    "BackgroundImageUrl": "/rooms/products/bathroom/01/background.jpg",
    "RoomImageUrl": "/rooms/products/bathroom/01/room.png",
    "GlossyImageUrl": "/rooms/products/bathroom/01/glossy.jpg",
    "MattImageUrl": "/rooms/products/bathroom/01/matt.jpg",
    "Width": 1920,
    "Height": 1440,
    "SetDesign": {
      "WallAreas": [
        {
          "GUID": "wall-001",
          "TileType": ["ceramic", "porcelain"],
          "BottomLeft": [0.0, 0.0],
          "TopLeft": [0.0, 1.0],
          "TopRight": [0.27275, 1.0],
          "BottomRight": [0.27275, 0.0],
          "BaseWidth": 523.68,
          "BaseHeight": 1440.0,
          "TileRateWidth": 1.0,
          "TileRateHeight": 1.0
        }
      ]
    }
  }
}
```

## 🎨 **Styling**

### **CSS Variables:**
```css
:root {
  --sv-primary-blue: #00AEEF;
  --sv-secondary-blue: #0078D4;
  --sv-gold: #FFB300;
  --sv-gold-dark: #E6A200;
}
```

### **Responsive Design:**
- Desktop: Grid 2 columns cho controls
- Mobile: Grid 1 column cho controls
- Room container: 800px (desktop), 400px (mobile)

## 🔄 **Workflow**

### **1. Load Room:**
```javascript
// User click chọn phòng
selectRoom(room) → loadRoomConfig(room.configPath) → updateLayers()
```

### **2. Apply Material:**
```javascript
// User chọn chất liệu
selectMaterial('glossy') → showMaterialLayer() → updateOpacity()
```

### **3. Apply Tile:**
```javascript
// User áp dụng gạch
selectTile(tile) + selectWallArea(area) → applyTile() → createTileFill()
```

### **4. Layer Management:**
```javascript
// User toggle layer
toggleLayer(layerId) → updateLayerOpacity() → re-render()
```

## 🎯 **Tính Năng**

### **✅ Đã Implement:**
- **Room Selection**: Chọn phòng từ grid
- **Config Loading**: Load config từ JSON files
- **Layer Management**: Xếp layer đúng thứ tự
- **Material Toggle**: Bật/tắt Glossy/Matt
- **Tile Fill**: Thêm gạch vào vùng tường
- **Responsive Design**: Tối ưu cho mobile
- **Interactive Controls**: Panel điều khiển

### **🎨 Layer Features:**
- **Background Layer**: Ảnh nền với opacity 0.3
- **Room Objects Layer**: Vật thể phòng đã xóa phông
- **Material Layer**: Chất liệu gạch (Glossy/Matt)
- **Tile Fill Layer**: Gạch được chọn với clip-path

### **🔧 Interactive Features:**
- **Material Selection**: Glossy, Matt, None
- **Tile Selection**: Grid gạch mẫu
- **Wall Area Selection**: Danh sách vùng tường
- **Apply Tile**: Áp dụng gạch vào vùng tường
- **Clear All**: Xóa tất cả gạch
- **Reset Room**: Reset về trạng thái ban đầu

## 🚀 **Cách Chạy**

### **1. Development:**
```bash
npm run dev
```

### **2. Build:**
```bash
npm run build
```

### **3. Preview:**
```bash
npm run preview
```

## 📝 **Notes**

### **Layer Order Logic:**
- **BackgroundImageUrl**: Layer 0 (subtle background)
- **RoomImageUrl**: Layer 1 (main base - đã xóa phông)
- **GlossyImageUrl/MattImageUrl**: Layer 2 (material)
- **Tile Fill**: Layer 3+ (dynamic)

### **Clip Path Calculation:**
```javascript
const calculateClipPath = (wallArea) => {
  const { BottomLeft, TopLeft, TopRight, BottomRight } = wallArea;
  return `polygon(
    ${BottomLeft[0] * 100}% ${BottomLeft[1] * 100}%,
    ${TopLeft[0] * 100}% ${TopLeft[1] * 100}%,
    ${TopRight[0] * 100}% ${TopRight[1] * 100}%,
    ${BottomRight[0] * 100}% ${BottomRight[1] * 100}%
  )`;
};
```

### **Responsive Breakpoints:**
- **Desktop**: > 768px
- **Mobile**: ≤ 768px

Hệ thống Room Visualizer đã sẵn sàng để sử dụng! 🎨✨
