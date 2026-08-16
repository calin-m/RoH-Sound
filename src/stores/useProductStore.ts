import { create } from 'zustand';

export type ProductColorway = 'midnight' | 'silver' | 'titanium' | 'emerald';
export type Colorway = ProductColorway;
export type AncMode = 'transparency' | 'balanced' | 'ultra';
export type ANCMode = AncMode;
export type ViewAngle = 'front' | 'angle' | 'side';

export interface ColorwayDetail {
  id: ProductColorway;
  name: string;
  description: string;
  primaryColor: string;
  accentColor: string;
  bgGlow: string;
}

export const COLORWAYS: Record<ProductColorway, ColorwayDetail> = {
  midnight: {
    id: 'midnight',
    name: 'Obsidian Midnight',
    description: 'Deep matte acoustic composite with brushed gold resonant ring',
    primaryColor: '#0F1117',
    accentColor: '#F59E0B',
    bgGlow: 'rgba(245, 158, 11, 0.15)',
  },
  silver: {
    id: 'silver',
    name: 'Alabaster Silver',
    description: 'Aerospace-grade satin aluminum with Arctic white protein leather',
    primaryColor: '#E2E8F0',
    accentColor: '#38BDF8',
    bgGlow: 'rgba(56, 189, 248, 0.15)',
  },
  titanium: {
    id: 'titanium',
    name: 'Champagne Titanium',
    description: 'Gunmetal forged titanium with acoustic copper core dampening',
    primaryColor: '#334155',
    accentColor: '#FB923C',
    bgGlow: 'rgba(251, 146, 60, 0.15)',
  },
  emerald: {
    id: 'emerald',
    name: 'Forest Emerald',
    description: 'Satin forest emerald anodized shell with champagne brass hardware',
    primaryColor: '#064E3B',
    accentColor: '#10B981',
    bgGlow: 'rgba(16, 185, 129, 0.15)',
  },
};

export interface ProductState {
  selectedColor: ProductColorway;
  selectedAngle: ViewAngle;
  viewAngle: ViewAngle;
  ancMode: AncMode;
  isSpatialActive: boolean;
  spatialAngle: number;
  isPlayingDemo: boolean;
  isDrawerOpen: boolean;
  engravingText: string;
  hasExtendedWarranty: boolean;
  quantity: number;
  activeSpecTab: 'acoustics' | 'connectivity' | 'battery' | 'materials';

  // Actions
  setColor: (color: ProductColorway) => void;
  setSelectedColor: (color: ProductColorway) => void;
  setAngle: (angle: ViewAngle) => void;
  setViewAngle: (angle: ViewAngle) => void;
  setAncMode: (mode: AncMode) => void;
  toggleSpatial: () => void;
  setSpatialAngle: (angle: number) => void;
  togglePlayDemo: () => void;
  toggleDemoPlayback: () => void;
  setDrawerOpen: (open: boolean) => void;
  setEngravingText: (text: string) => void;
  toggleWarranty: () => void;
  setHasExtendedWarranty: (has: boolean) => void;
  setQuantity: (qty: number) => void;
  setActiveSpecTab: (tab: 'acoustics' | 'connectivity' | 'battery' | 'materials') => void;
  resetProductStore: () => void;
}

const initialState = {
  selectedColor: 'midnight' as ProductColorway,
  selectedAngle: 'front' as ViewAngle,
  viewAngle: 'front' as ViewAngle,
  ancMode: 'ultra' as AncMode,
  isSpatialActive: true,
  spatialAngle: 45,
  isPlayingDemo: false,
  isDrawerOpen: false,
  engravingText: '',
  hasExtendedWarranty: false,
  quantity: 1,
  activeSpecTab: 'acoustics' as const,
};

export const useProductStore = create<ProductState>((set) => ({
  ...initialState,

  setColor: (selectedColor) => set({ selectedColor }),
  setSelectedColor: (selectedColor) => set({ selectedColor }),
  setAngle: (angle) => set({ selectedAngle: angle, viewAngle: angle }),
  setViewAngle: (angle) => set({ selectedAngle: angle, viewAngle: angle }),
  setAncMode: (ancMode) => set({ ancMode }),
  toggleSpatial: () => set((state) => ({ isSpatialActive: !state.isSpatialActive })),
  setSpatialAngle: (spatialAngle) => set({ spatialAngle }),
  togglePlayDemo: () => set((state) => ({ isPlayingDemo: !state.isPlayingDemo })),
  toggleDemoPlayback: () => set((state) => ({ isPlayingDemo: !state.isPlayingDemo })),
  setDrawerOpen: (isDrawerOpen) => set({ isDrawerOpen }),
  setEngravingText: (engravingText) => set({ engravingText: engravingText.slice(0, 20) }),
  toggleWarranty: () => set((state) => ({ hasExtendedWarranty: !state.hasExtendedWarranty })),
  setHasExtendedWarranty: (hasExtendedWarranty) => set({ hasExtendedWarranty }),
  setQuantity: (quantity) => set({ quantity: Math.max(1, Math.min(5, quantity)) }),
  setActiveSpecTab: (activeSpecTab) => set({ activeSpecTab }),
  resetProductStore: () => set(initialState),
}));
