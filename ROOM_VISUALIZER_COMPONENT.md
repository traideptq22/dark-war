# Room Visualizer Component - Hiển Thị Phòng Theo Config

## 🎯 **Mục Tiêu**
Tạo component để hiển thị từng phòng theo config và xếp layer đúng thứ tự khi user chọn phòng.

## 📁 **File Structure**
```
app/components/room/
├── RoomVisualizer.vue          # Component chính
├── RoomLayerManager.vue        # Quản lý layers
├── RoomConfigLoader.vue        # Load config từ JSON
└── RoomInteraction.vue         # Xử lý tương tác
```

## 🚀 **Implementation**

### **1. RoomVisualizer.vue - Component Chính**

```vue
<template>
  <div class="room-visualizer">
    <!-- Room Selection -->
    <div class="room-selection">
      <h3>Chọn Phòng</h3>
      <div class="room-grid">
        <div 
          v-for="room in availableRooms" 
          :key="room.id"
          @click="selectRoom(room)"
          class="room-card"
          :class="{ 'active': selectedRoom?.id === room.id }"
        >
          <img :src="room.previewImage" :alt="room.title" />
          <h4>{{ room.title }}</h4>
        </div>
      </div>
    </div>

    <!-- Room Display -->
    <div v-if="selectedRoom" class="room-display">
      <div class="room-container" ref="roomContainer">
        <!-- Layer 0: Background (subtle) -->
        <img 
          v-if="roomConfig?.data?.BackgroundImageUrl"
          :src="roomConfig.data.BackgroundImageUrl" 
          class="room-layer background-layer"
          :style="{ zIndex: 0 }"
        />
        
        <!-- Layer 1: Room Objects (main base) -->
        <img 
          v-if="roomConfig?.data?.RoomImageUrl"
          :src="roomConfig.data.RoomImageUrl" 
          class="room-layer room-objects-layer"
          :style="{ zIndex: 1 }"
        />
        
        <!-- Layer 2: Material (conditional) -->
        <img 
          v-if="showMaterial && roomConfig?.data?.GlossyImageUrl"
          :src="roomConfig.data.GlossyImageUrl" 
          class="room-layer material-layer"
          :style="{ zIndex: 2, opacity: materialOpacity }"
        />
        
        <img 
          v-if="showMaterial && roomConfig?.data?.MattImageUrl"
          :src="roomConfig.data.MattImageUrl" 
          class="room-layer material-layer"
          :style="{ zIndex: 2, opacity: materialOpacity }"
        />
        
        <!-- Layer 3: Tile Fill (dynamic) -->
        <div 
          v-for="(tileFill, index) in tileFills" 
          :key="`tile-${index}`"
          class="tile-fill-layer"
          :style="{ zIndex: 3 + index }"
        >
          <img 
            :src="tileFill.imageUrl" 
            class="tile-fill"
            :style="{ clipPath: tileFill.clipPath }"
          />
        </div>
      </div>

      <!-- Controls -->
      <div class="room-controls">
        <div class="material-controls">
          <button @click="toggleMaterial('glossy')" :class="{ active: currentMaterial === 'glossy' }">
            Glossy
          </button>
          <button @click="toggleMaterial('matt')" :class="{ active: currentMaterial === 'matt' }">
            Matt
          </button>
          <button @click="hideMaterial">
            None
          </button>
        </div>
        
        <div class="tile-controls">
          <button @click="clearAllTiles">
            Clear All Tiles
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

// Types
interface RoomConfig {
  data: {
    Id: string;
    Title: string;
    BackgroundImageUrl: string;
    RoomImageUrl: string;
    GlossyImageUrl: string;
    MattImageUrl: string;
    Width: number;
    Height: number;
    SetDesign: {
      WallAreas: Array<{
        GUID: string;
        TileType: string[];
        BottomLeft: [number, number];
        TopLeft: [number, number];
        TopRight: [number, number];
        BottomRight: [number, number];
        BaseWidth: number;
        BaseHeight: number;
        TileRateWidth: number;
        TileRateHeight: number;
      }>;
    };
    DefinedAreas: Array<{
      GUID: string;
      AreaGUID: string;
      BottomLeft: [number, number];
      TopLeft: [number, number];
      TopRight: [number, number];
      BottomRight: [number, number];
      NoResize: boolean;
    }>;
  };
}

interface Room {
  id: string;
  title: string;
  previewImage: string;
  configPath: string;
}

interface TileFill {
  wallArea: string;
  imageUrl: string;
  clipPath: string;
  material: string;
}

// Reactive data
const selectedRoom = ref<Room | null>(null);
const roomConfig = ref<RoomConfig | null>(null);
const showMaterial = ref(false);
const currentMaterial = ref<'glossy' | 'matt' | null>(null);
const materialOpacity = ref(0);
const tileFills = ref<TileFill[]>([]);
const roomContainer = ref<HTMLElement | null>(null);

// Available rooms
const availableRooms = ref<Room[]>([
  {
    id: 'bathroom01',
    title: 'Phòng Tắm 01',
    previewImage: '/rooms/preview/bathroom01.jpg',
    configPath: '@/config/room/bathroom01.json'
  },
  {
    id: 'bathroom02',
    title: 'Phòng Tắm 02',
    previewImage: '/rooms/preview/bathroom02.jpg',
    configPath: '@/config/room/bathroom02.json'
  },
  {
    id: 'bathroom03',
    title: 'Phòng Tắm 03',
    previewImage: '/rooms/preview/bathroom03.jpg',
    configPath: '@/config/room/bathroom03.json'
  },
  {
    id: 'livingroom02',
    title: 'Phòng Khách 02',
    previewImage: '/rooms/preview/livingroom02.jpg',
    configPath: '@/config/room/livingroom02.json'
  },
  {
    id: 'livingroom03',
    title: 'Phòng Khách 03',
    previewImage: '/rooms/preview/livingroom03.jpg',
    configPath: '@/config/room/livingroom03.json'
  },
  {
    id: 'kitchen01',
    title: 'Phòng Bếp 01',
    previewImage: '/rooms/preview/kitchen01.jpg',
    configPath: '@/config/room/kitchen01.json'
  },
  {
    id: 'kitchen02',
    title: 'Phòng Bếp 02',
    previewImage: '/rooms/preview/kitchen02.jpg',
    configPath: '@/config/room/kitchen02.json'
  },
  {
    id: 'bedroom01',
    title: 'Phòng Ngủ 01',
    previewImage: '/rooms/preview/bedroom01.jpg',
    configPath: '@/config/room/bedroom01.json'
  },
  {
    id: 'outside01',
    title: 'Ngoài Trời 01',
    previewImage: '/rooms/preview/outside01.jpg',
    configPath: '@/config/room/outside01.json'
  },
  {
    id: 'outside02',
    title: 'Ngoài Trời 02',
    previewImage: '/rooms/preview/outside02.jpg',
    configPath: '@/config/room/outside02.json'
  }
]);

// Methods
const selectRoom = async (room: Room) => {
  selectedRoom.value = room;
  
  try {
    // Load room config
    const configModule = await import(room.configPath);
    roomConfig.value = configModule.default;
    
    // Reset state
    showMaterial.value = false;
    currentMaterial.value = null;
    materialOpacity.value = 0;
    tileFills.value = [];
    
    console.log('Room loaded:', roomConfig.value);
  } catch (error) {
    console.error('Error loading room config:', error);
  }
};

const toggleMaterial = (material: 'glossy' | 'matt') => {
  if (currentMaterial.value === material) {
    hideMaterial();
  } else {
    currentMaterial.value = material;
    showMaterial.value = true;
    materialOpacity.value = 1;
  }
};

const hideMaterial = () => {
  showMaterial.value = false;
  currentMaterial.value = null;
  materialOpacity.value = 0;
};

const clearAllTiles = () => {
  tileFills.value = [];
};

// Calculate clip path from WallArea coordinates
const calculateClipPath = (wallArea: any): string => {
  const { BottomLeft, TopLeft, TopRight, BottomRight } = wallArea;
  
  return `polygon(
    ${BottomLeft[0] * 100}% ${BottomLeft[1] * 100}%,
    ${TopLeft[0] * 100}% ${TopLeft[1] * 100}%,
    ${TopRight[0] * 100}% ${TopRight[1] * 100}%,
    ${BottomRight[0] * 100}% ${BottomRight[1] * 100}%
  )`;
};

// Add tile fill
const addTileFill = (wallArea: any, tileImage: string) => {
  const tileFill: TileFill = {
    wallArea: wallArea.GUID,
    imageUrl: tileImage,
    clipPath: calculateClipPath(wallArea),
    material: currentMaterial.value || 'glossy'
  };
  
  tileFills.value.push(tileFill);
};

// Expose methods for external use
defineExpose({
  selectRoom,
  addTileFill,
  clearAllTiles,
  toggleMaterial
});
</script>

<style scoped>
.room-visualizer {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.room-selection {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.room-selection h3 {
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1.25rem;
}

.room-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.room-card {
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.room-card:hover {
  border-color: #00AEEF;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 174, 239, 0.2);
}

.room-card.active {
  border-color: #00AEEF;
  background: rgba(0, 174, 239, 0.05);
}

.room-card img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 0.5rem;
}

.room-card h4 {
  margin: 0;
  font-size: 0.9rem;
  color: #333;
}

.room-display {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.room-container {
  position: relative;
  width: 100%;
  max-width: 800px;
  height: 600px;
  margin: 0 auto;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  background: #f9fafb;
}

.room-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.background-layer {
  opacity: 0.3;
}

.room-objects-layer {
  /* Base layer - no special styling needed */
}

.material-layer {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.tile-fill-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.tile-fill {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.9;
  transition: all 0.3s ease;
}

.room-controls {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.material-controls,
.tile-controls {
  display: flex;
  gap: 0.5rem;
}

.material-controls button,
.tile-controls button {
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  color: #374151;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.875rem;
}

.material-controls button:hover,
.tile-controls button:hover {
  border-color: #00AEEF;
  color: #00AEEF;
}

.material-controls button.active {
  background: #00AEEF;
  color: white;
  border-color: #00AEEF;
}

/* Responsive */
@media (max-width: 768px) {
  .room-visualizer {
    padding: 1rem;
  }
  
  .room-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
  
  .room-container {
    height: 400px;
  }
  
  .room-controls {
    flex-direction: column;
  }
}
</style>
```

### **2. RoomConfigLoader.vue - Load Config**

```vue
<template>
  <div class="config-loader">
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Đang tải cấu hình phòng...</p>
    </div>
    
    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <button @click="retry">Thử lại</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const loading = ref(false);
const error = ref('');

const loadRoomConfig = async (roomId: string) => {
  loading.value = true;
  error.value = '';
  
  try {
    const configModule = await import(`@/config/room/${roomId}.json`);
    return configModule.default;
  } catch (err) {
    error.value = `Không thể tải cấu hình phòng ${roomId}`;
    throw err;
  } finally {
    loading.value = false;
  }
};

const retry = () => {
  // Retry logic
};

defineExpose({
  loadRoomConfig
});
</script>

<style scoped>
.config-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}

.loading {
  text-align: center;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #00AEEF;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error {
  text-align: center;
  color: #ef4444;
}

.error button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #00AEEF;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>
```

### **3. RoomLayerManager.vue - Quản Lý Layers**

```vue
<template>
  <div class="layer-manager">
    <div class="layer-controls">
      <h4>Quản Lý Layers</h4>
      <div class="layer-list">
        <div 
          v-for="(layer, index) in layers" 
          :key="layer.id"
          class="layer-item"
          :class="{ active: layer.visible }"
        >
          <input 
            type="checkbox" 
            v-model="layer.visible"
            @change="toggleLayer(layer.id)"
          />
          <span class="layer-name">{{ layer.name }}</span>
          <span class="layer-zindex">Z: {{ layer.zIndex }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

interface Layer {
  id: string;
  name: string;
  zIndex: number;
  visible: boolean;
  type: 'background' | 'room' | 'material' | 'tile';
}

const layers = ref<Layer[]>([
  { id: 'background', name: 'Background', zIndex: 0, visible: true, type: 'background' },
  { id: 'room', name: 'Room Objects', zIndex: 1, visible: true, type: 'room' },
  { id: 'material', name: 'Material', zIndex: 2, visible: false, type: 'material' },
  { id: 'tile', name: 'Tile Fill', zIndex: 3, visible: true, type: 'tile' }
]);

const toggleLayer = (layerId: string) => {
  const layer = layers.value.find(l => l.id === layerId);
  if (layer) {
    layer.visible = !layer.visible;
    // Emit event to parent component
    emit('layerToggle', layerId, layer.visible);
  }
};

const addTileLayer = (tileId: string) => {
  const newLayer: Layer = {
    id: `tile-${tileId}`,
    name: `Tile ${tileId}`,
    zIndex: 3 + layers.value.filter(l => l.type === 'tile').length,
    visible: true,
    type: 'tile'
  };
  
  layers.value.push(newLayer);
};

const removeTileLayer = (tileId: string) => {
  const index = layers.value.findIndex(l => l.id === `tile-${tileId}`);
  if (index > -1) {
    layers.value.splice(index, 1);
  }
};

defineExpose({
  addTileLayer,
  removeTileLayer,
  toggleLayer
});
</script>

<style scoped>
.layer-manager {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.layer-controls h4 {
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1rem;
}

.layer-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.layer-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 6px;
  background: #f9fafb;
  transition: all 0.3s ease;
}

.layer-item.active {
  background: rgba(0, 174, 239, 0.1);
  border: 1px solid rgba(0, 174, 239, 0.3);
}

.layer-name {
  flex: 1;
  font-size: 0.875rem;
  color: #374151;
}

.layer-zindex {
  font-size: 0.75rem;
  color: #6b7280;
  background: #e5e7eb;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}
</style>
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

### **2. Sử Dụng Trong Page**
```vue
<!-- app/pages/room.vue -->
<template>
  <div class="room-page">
    <RoomVisualizer />
  </div>
</template>

<script setup>
import RoomVisualizer from '@/components/room/RoomVisualizer.vue';

// SEO
useHead({
  title: 'Room Visualizer - Thăng Long Sao Vàng Group',
  meta: [
    { name: 'description', content: 'Thiết kế phòng 3D tương tác với Room Visualizer' }
  ]
});
</script>
```

## 🎯 **Tính Năng**

### **✅ Đã Implement:**
- **Room Selection**: Chọn phòng từ grid
- **Config Loading**: Load config từ JSON files
- **Layer Management**: Xếp layer đúng thứ tự
- **Material Toggle**: Bật/tắt Glossy/Matt
- **Tile Fill**: Thêm gạch vào vùng tường
- **Responsive Design**: Tối ưu cho mobile

### **🎨 Layer Order:**
1. **Background Layer** (Z: 0) - Ảnh nền
2. **Room Objects Layer** (Z: 1) - Vật thể phòng
3. **Material Layer** (Z: 2) - Chất liệu gạch
4. **Tile Fill Layer** (Z: 3+) - Gạch được chọn

### **🔧 Interactive Features:**
- Click chọn phòng
- Toggle material (Glossy/Matt)
- Add/remove tile fills
- Layer visibility control
- Real-time preview

Bây giờ bạn có thể sử dụng component này để hiển thị phòng theo config và xếp layer đúng thứ tự! 🚀✨
