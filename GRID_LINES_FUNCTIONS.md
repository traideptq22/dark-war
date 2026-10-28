# Grid Lines Functions - Tạm thời bị vô hiệu hóa

## 📍 Vị trí trong code

File: `app/components/room/WallAreaCanvas.vue`

Hàm chính: `drawWallGridTrapezoid()`

## 🔧 Các hàm vẽ grid đã bị comment:

### 1. **drawVerticalGridLines_Perspective()**
- **Dòng:** ~1908-1991
- **Chức năng:** Vẽ các đường grid dọc (vertical) với hiệu ứng perspective (hội tụ về vanishing point)
- **Bật lại:** Bỏ comment khối `/* GRID LINES DISABLED ... END GRID LINES */` đầu tiên

### 2. **drawHorizontalGridLines_Perspective()**
- **Dòng:** ~1993-2020
- **Chức năng:** Vẽ các đường grid ngang (horizontal) song song với cạnh trên/dưới
- **Bật lại:** Bỏ comment khối `/* GRID LINES DISABLED ... END GRID LINES */` thứ hai

## 🎨 Cấu hình grid lines:

### Màu sắc (đã định nghĩa sẵn):
```typescript
switch (area.GUID) {
  case 'L': // Left wall
    gridColor = '#87CEEB';      // Sky blue
    break;
  case 'M': // Middle wall
    gridColor = '#404040';       // Dark gray (grout color)
    break;
  case 'R': // Right wall
    gridColor = '#FF6B6B';      // Red
    break;
  // ... other walls
}
```

### Độ dày đường kẻ:
```typescript
const gridLineWidth = area.GUID === 'M' ? 0.5 : 2; // M: mỏng (grout), others: dày hơn
ctx.lineWidth = gridLineWidth;
ctx.globalAlpha = 0.8; // Hơi trong suốt
```

## 📐 Logic tính grid:

### Số lượng ô:
- **Vertical:** `fullTilesX` ô đầy đủ + `partialRightRatio` ô partial bên phải
- **Horizontal:** `fullTilesY` ô đầy đủ + `partialTopRatio` ô partial bên trên

### Công thức:
```typescript
const exactTilesX = area.BaseWidth / (actualTileRateWidth * configWidth);
const exactTilesY = area.BaseHeight / (actualTileRateHeight * configHeight);

const fullTilesX = Math.floor(exactTilesX);
const fullTilesY = Math.floor(exactTilesY);

const partialRightRatio = exactTilesX - fullTilesX;
const partialTopRatio = exactTilesY - fullTilesY;
```

## 🔓 Cách bật lại:

### Bước 1: Mở file
```
app/components/room/WallAreaCanvas.vue
```

### Bước 2: Tìm dòng
```
// === DRAW VERTICAL LINES (converging to vanishing point) ===
// TEMPORARILY DISABLED - Uncomment to enable grid lines
```

### Bước 3: Bỏ comment
Xóa dòng `/* GRID LINES DISABLED` và `END GRID LINES */` ở **CẢ 2 KHỐI**:
- Khối 1: Vertical lines (~dòng 1911-1991)
- Khối 2: Horizontal lines (~dòng 1996-2020)

### Bước 4: Save và refresh browser

## ⚙️ Tùy chỉnh:

### Thay đổi màu grid cho tường M:
```typescript
case 'M':
  gridColor = '#YOUR_COLOR_HERE'; // Thay đổi màu
  break;
```

### Thay đổi độ dày:
```typescript
const gridLineWidth = area.GUID === 'M' ? 0.3 : 1.5; // Tùy chỉnh
```

### Thay đổi độ trong suốt:
```typescript
ctx.globalAlpha = 0.6; // 0.0 (trong suốt) - 1.0 (đục)
```

## 📝 Ghi chú:

- Grid lines hiện đang BỊ TẮT để tile texture hiển thị rõ ràng hơn
- Khi bật lại, grid sẽ vẽ **SAU** tile texture (nằm trên cùng)
- Grid tính toán theo **kích thước thật** của tile đã chọn (Width x Height từ tiles_config.json)
- Vanishing point tự động tính toán cho hiệu ứng perspective 3D

---

**Ngày tạo:** 2025-10-16  
**Trạng thái:** DISABLED (tắt)  
**Lý do:** Grid lines không cần thiết khi đã có tile texture hiển thị

