# Tóm Tắt Cập Nhật Float Phone Button

## Thay Đổi Thực Hiện

### 1. **Cập Nhật Số Điện Thoại**
- **Trước**: Hiển thị số cố định `0109972821`
- **Sau**: Sử dụng số từ config `appConfig.contact?.phone || '0975139039'`

### 2. **Thêm Chức Năng Gọi Điện Trực Tiếp**
- **Trước**: Chỉ có chức năng `goToContact` (scroll đến phần liên hệ)
- **Sau**: Thêm chức năng `goToPhone` (gọi điện trực tiếp)

### 3. **Import App Config**
- Thêm `const appConfig = useAppConfig()` để truy cập thông tin liên hệ

## Code Thay Đổi

### **Template**
```vue
<!-- Trước -->
<Button raised :label="isScrolled ? '' : '0109972821'" rounded @click="goToContact" icon="pi pi-phone">

<!-- Sau -->
<Button raised :label="isScrolled ? '' : appConfig.contact?.phone || '0975139039'" rounded @click="goToPhone" icon="pi pi-phone">
```

### **Script**
```javascript
// Thêm app config
const appConfig = useAppConfig();

// Thêm function gọi điện
const goToPhone = () => {
  const phoneNumber = appConfig.contact?.phone || '0975139039';
  const phoneLink = appConfig.contact?.phoneLink || `tel:${phoneNumber}`;
  window.location.href = phoneLink;
};
```

## Chức Năng Mới

### ✅ **Gọi Điện Trực Tiếp**
- Click vào button sẽ mở ứng dụng gọi điện
- Sử dụng `tel:` protocol
- Tự động điền số điện thoại từ config

### ✅ **Dynamic Phone Number**
- Số điện thoại được lấy từ `app.config.ts`
- Fallback về số mặc định nếu config không có
- Dễ dàng thay đổi số điện thoại từ config

### ✅ **Responsive Display**
- Mobile: Hiển thị số điện thoại đầy đủ
- Desktop: Chỉ hiển thị icon (khi scrolled)

## Lợi Ích

### 🎯 **User Experience**
- Khách hàng có thể gọi điện trực tiếp
- Không cần copy/paste số điện thoại
- Tăng tỷ lệ chuyển đổi liên hệ

### 🔧 **Maintainability**
- Số điện thoại được quản lý tập trung
- Thay đổi một lần, áp dụng toàn bộ
- Dễ dàng cập nhật thông tin liên hệ

### 📱 **Mobile Friendly**
- Tối ưu cho thiết bị di động
- Tích hợp với ứng dụng gọi điện
- UX trực quan và tiện lợi

## File Được Cập Nhật

- `app/components/layouts/landing/TopbarWidget.vue`
  - Cập nhật template button
  - Thêm function `goToPhone`
  - Import `useAppConfig`

## Kết Quả

Float phone button giờ đây sẽ:
- Hiển thị số điện thoại từ config (0975139039)
- Cho phép gọi điện trực tiếp khi click
- Tự động cập nhật khi thay đổi config
- Tăng trải nghiệm người dùng và tỷ lệ liên hệ
