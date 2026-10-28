# Script Tạo Folder Structure Cho Room Images

## 📁 **Cấu Trúc Folder Đề Xuất**

### **1. Folder Chính: `public/rooms/`**

```
public/
├── rooms/
│   ├── bathroom/          # Phòng tắm
│   │   ├── samples/       # Mẫu phòng
│   │   │   ├── thumb-1.jpg
│   │   │   ├── thumb-2.jpg
│   │   │   ├── thumb-3.jpg
│   │   │   └── ...
│   │   └── designed/      # Phòng đã thiết kế
│   │       ├── thumb-1.jpg
│   │       ├── thumb-2.jpg
│   │       ├── thumb-3.jpg
│   │       └── ...
│   ├── living/            # Phòng khách
│   │   ├── samples/
│   │   │   ├── thumb-1.jpg
│   │   │   ├── thumb-2.jpg
│   │   │   └── ...
│   │   └── designed/
│   │       ├── thumb-1.jpg
│   │       ├── thumb-2.jpg
│   │       └── ...
│   ├── kitchen/           # Phòng bếp
│   │   ├── samples/
│   │   └── designed/
│   ├── bedroom/           # Phòng ngủ
│   │   ├── samples/
│   │   └── designed/
│   ├── outdoor/           # Ngoài trời
│   │   ├── samples/
│   │   └── designed/
│   ├── other/             # Khác
│   │   ├── samples/
│   │   └── designed/
│   └── mixed/             # Ảnh tổng hợp cho "Tất cả"
│       ├── thumb-1.jpg
│       ├── thumb-2.jpg
│       └── ...
```

## 🚀 **Cách Tạo Folder Structure**

### **Option 1: Tạo Thủ Công**
1. Tạo folder `public/rooms/`
2. Tạo các subfolder theo cấu trúc trên
3. Upload ảnh vào từng folder tương ứng

### **Option 2: Sử Dụng Script (Windows)**
Tạo file `create-rooms-folders.bat`:

```batch
@echo off
echo Creating room folders structure...

mkdir "public\rooms"
mkdir "public\rooms\bathroom"
mkdir "public\rooms\bathroom\samples"
mkdir "public\rooms\bathroom\designed"
mkdir "public\rooms\living"
mkdir "public\rooms\living\samples"
mkdir "public\rooms\living\designed"
mkdir "public\rooms\kitchen"
mkdir "public\rooms\kitchen\samples"
mkdir "public\rooms\kitchen\designed"
mkdir "public\rooms\bedroom"
mkdir "public\rooms\bedroom\samples"
mkdir "public\rooms\bedroom\designed"
mkdir "public\rooms\outdoor"
mkdir "public\rooms\outdoor\samples"
mkdir "public\rooms\outdoor\designed"
mkdir "public\rooms\other"
mkdir "public\rooms\other\samples"
mkdir "public\rooms\other\designed"
mkdir "public\rooms\mixed"

echo Folder structure created successfully!
pause
```

### **Option 3: Sử Dụng PowerShell**
Tạo file `create-rooms-folders.ps1`:

```powershell
# Create room folders structure
$basePath = "public/rooms"
$categories = @("bathroom", "living", "kitchen", "bedroom", "outdoor", "other")
$types = @("samples", "designed")

# Create base folder
New-Item -ItemType Directory -Path $basePath -Force

# Create category folders
foreach ($category in $categories) {
    $categoryPath = "$basePath/$category"
    New-Item -ItemType Directory -Path $categoryPath -Force
    
    # Create type folders for each category
    foreach ($type in $types) {
        $typePath = "$categoryPath/$type"
        New-Item -ItemType Directory -Path $typePath -Force
    }
}

# Create mixed folder for "all" category
New-Item -ItemType Directory -Path "$basePath/mixed" -Force

Write-Host "Folder structure created successfully!"
```

## 📝 **Quy Tắc Đặt Tên File**

### **1. Naming Convention**
- **Format**: `thumb-{number}.jpg`
- **Examples**: 
  - `thumb-1.jpg`
  - `thumb-2.jpg`
  - `thumb-3.jpg`

### **2. Image Specifications**
- **Format**: JPG hoặc PNG
- **Size**: 400x300px (4:3 ratio)
- **Quality**: High quality, optimized for web
- **File Size**: < 200KB per image

### **3. Content Guidelines**
- **Samples**: Ảnh mẫu phòng có sẵn
- **Designed**: Ảnh phòng đã được thiết kế
- **Mixed**: Ảnh tổng hợp cho category "Tất cả"

## 🔧 **Code Implementation**

### **Updated Functions**
```typescript
const loadRoomImages = (category: RoomCategory, type: RoomType): void => {
  const categoryPath = category.id === 'all' ? 'all' : category.id;
  const typePath = type === 'samples' ? 'samples' : 'designed';
  
  // Set image paths based on category and type
  if (category.id === 'all') {
    // For 'all' category, show mixed images
    selectedCategoryImage.value = '/rooms/mixed/thumb-1.jpg';
  } else {
    // For specific categories
    selectedCategoryImage.value = `/rooms/${categoryPath}/${typePath}/thumb-1.jpg`;
  }
};
```

### **Template Usage**
```vue
<!-- Image Grid for 2 columns -->
<div class="image-grid">
  <div class="image-item">
    <img 
      v-if="selectedCategoryImage" 
      :src="selectedCategoryImage" 
      :alt="selectedCategory.name"
    />
    <div v-else class="placeholder-text">
      Hình ảnh {{ selectedCategory.name }} 1
    </div>
  </div>
  <div class="image-item">
    <img 
      v-if="selectedCategoryImage" 
      :src="selectedCategoryImage" 
      :alt="selectedCategory.name"
    />
    <div v-else class="placeholder-text">
      Hình ảnh {{ selectedCategory.name }} 2
    </div>
  </div>
</div>
```

## 📋 **Checklist Tạo Folder**

### **Bước 1: Tạo Base Structure**
- [ ] Tạo folder `public/rooms/`
- [ ] Tạo folder cho từng category
- [ ] Tạo subfolder `samples/` và `designed/`
- [ ] Tạo folder `mixed/` cho category "Tất cả"

### **Bước 2: Upload Images**
- [ ] Upload ảnh phòng tắm vào `bathroom/samples/` và `bathroom/designed/`
- [ ] Upload ảnh phòng khách vào `living/samples/` và `living/designed/`
- [ ] Upload ảnh phòng bếp vào `kitchen/samples/` và `kitchen/designed/`
- [ ] Upload ảnh phòng ngủ vào `bedroom/samples/` và `bedroom/designed/`
- [ ] Upload ảnh ngoài trời vào `outdoor/samples/` và `outdoor/designed/`
- [ ] Upload ảnh khác vào `other/samples/` và `other/designed/`
- [ ] Upload ảnh tổng hợp vào `mixed/`

### **Bước 3: Test Implementation**
- [ ] Test load ảnh cho từng category
- [ ] Test switch giữa samples và designed
- [ ] Test responsive design
- [ ] Test fallback cho missing images

## 🎯 **Lợi Ích Của Cấu Trúc Này**

### **1. Organization**
- Dễ quản lý và tìm kiếm ảnh
- Phân loại rõ ràng theo category và type
- Scalable cho việc thêm ảnh mới

### **2. Performance**
- Lazy loading có thể implement dễ dàng
- Caching hiệu quả
- Optimized file structure

### **3. Maintenance**
- Dễ dàng update ảnh
- Clear naming convention
- Consistent structure

### **4. Development**
- Easy to implement dynamic loading
- Type-safe paths
- Flexible for future enhancements

## 🚀 **Next Steps**

1. **Tạo folder structure** theo hướng dẫn trên
2. **Upload ảnh** vào từng folder tương ứng
3. **Test implementation** để đảm bảo hoạt động đúng
4. **Optimize images** cho web performance
5. **Add more images** khi cần thiết

Cấu trúc này sẽ giúp bạn quản lý ảnh room một cách có tổ chức và dễ dàng tích hợp vào Room Visualizer! 🎨✨
