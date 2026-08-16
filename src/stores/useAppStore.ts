import { create } from 'zustand';

export type ThemeMode = 'system' | 'light' | 'dark';

export interface AppState {
  themeMode: ThemeMode;
  sidebarOpen: boolean;
  notificationsEnabled: boolean;
  activeModal: string | null;
  searchQuery: string;
  setThemeMode: (mode: ThemeMode) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
  setSearchQuery: (query: string) => void;
  resetStore: () => void;
}

const initialState = {
  themeMode: 'system' as ThemeMode,
  sidebarOpen: false,
  notificationsEnabled: true,
  activeModal: null as string | null,
  searchQuery: '',
};

export const useAppStore = create<AppState>((set) => ({
  ...initialState,
  setThemeMode: (mode) => set({ themeMode: mode }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setNotificationsEnabled: (enabled) => set({ notificationsEnabled: enabled }),
  openModal: (modalId) => set({ activeModal: modalId }),
  closeModal: () => set({ activeModal: null }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  resetStore: () => set(initialState),
}));
