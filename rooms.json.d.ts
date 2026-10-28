// Type definitions for rooms.json
export interface RoomItem {
  id: string;
  name: string;
  image: string;
  description: string;
}

export interface RoomCategory {
  name: string;
  icon: string;
  samples: RoomItem[];
  designed: RoomItem[];
}

export interface RoomConfig {
  rooms: {
    [key: string]: RoomCategory;
  };
  categories: {
    id: string;
    name: string;
    icon: string;
  }[];
}

// Type for room type selection
export type RoomType = 'samples' | 'designed';

// Type for category ID
export type CategoryId = 'all' | 'bathroom' | 'living' | 'kitchen' | 'bedroom' | 'outdoor';
