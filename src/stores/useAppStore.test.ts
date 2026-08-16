import { describe, it, expect, beforeEach } from 'vitest';
import { useAppStore } from './useAppStore';

describe('useAppStore', () => {
  beforeEach(() => {
    useAppStore.getState().resetStore();
  });

  it('initializes with default state', () => {
    const state = useAppStore.getState();
    expect(state.themeMode).toBe('system');
    expect(state.sidebarOpen).toBe(false);
    expect(state.notificationsEnabled).toBe(true);
    expect(state.activeModal).toBeNull();
    expect(state.searchQuery).toBe('');
  });

  it('updates theme mode', () => {
    useAppStore.getState().setThemeMode('dark');
    expect(useAppStore.getState().themeMode).toBe('dark');

    useAppStore.getState().setThemeMode('light');
    expect(useAppStore.getState().themeMode).toBe('light');
  });

  it('toggles sidebar state', () => {
    expect(useAppStore.getState().sidebarOpen).toBe(false);
    useAppStore.getState().toggleSidebar();
    expect(useAppStore.getState().sidebarOpen).toBe(true);
    useAppStore.getState().toggleSidebar();
    expect(useAppStore.getState().sidebarOpen).toBe(false);
  });

  it('sets sidebar open explicitly', () => {
    useAppStore.getState().setSidebarOpen(true);
    expect(useAppStore.getState().sidebarOpen).toBe(true);
  });

  it('sets notifications enabled state', () => {
    useAppStore.getState().setNotificationsEnabled(false);
    expect(useAppStore.getState().notificationsEnabled).toBe(false);
  });

  it('manages modal open and close state', () => {
    useAppStore.getState().openModal('test-modal');
    expect(useAppStore.getState().activeModal).toBe('test-modal');

    useAppStore.getState().closeModal();
    expect(useAppStore.getState().activeModal).toBeNull();
  });

  it('updates search query', () => {
    useAppStore.getState().setSearchQuery('enterprise query');
    expect(useAppStore.getState().searchQuery).toBe('enterprise query');
  });

  it('resets store to initial state', () => {
    useAppStore.getState().setThemeMode('dark');
    useAppStore.getState().toggleSidebar();
    useAppStore.getState().setNotificationsEnabled(false);
    useAppStore.getState().openModal('modal-1');
    useAppStore.getState().setSearchQuery('test');

    useAppStore.getState().resetStore();

    const state = useAppStore.getState();
    expect(state.themeMode).toBe('system');
    expect(state.sidebarOpen).toBe(false);
    expect(state.notificationsEnabled).toBe(true);
    expect(state.activeModal).toBeNull();
    expect(state.searchQuery).toBe('');
  });
});
