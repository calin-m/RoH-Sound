import { describe, it, expect, beforeEach } from 'vitest';
import { useProductStore, COLORWAYS } from './useProductStore';

describe('useProductStore', () => {
  beforeEach(() => {
    useProductStore.getState().resetProductStore();
  });

  it('initializes with default RoH Sound product state', () => {
    const state = useProductStore.getState();
    expect(state.selectedColor).toBe('titanium');
    expect(state.selectedAngle).toBe('front');
    expect(state.ancMode).toBe('ultra');
    expect(state.isSpatialActive).toBe(true);
    expect(state.spatialAngle).toBe(45);
    expect(state.isPlayingDemo).toBe(false);
    expect(state.isDrawerOpen).toBe(false);
    expect(state.quantity).toBe(1);
    expect(state.activeSpecTab).toBe('acoustics');
  });

  it('updates colorway and reflects metadata', () => {
    useProductStore.getState().setColor('emerald');
    expect(useProductStore.getState().selectedColor).toBe('emerald');
    expect(COLORWAYS.emerald.name).toBe('Forest Emerald');
  });

  it('updates view angle and ANC modes', () => {
    useProductStore.getState().setAngle('side');
    expect(useProductStore.getState().selectedAngle).toBe('side');

    useProductStore.getState().setAncMode('transparency');
    expect(useProductStore.getState().ancMode).toBe('transparency');
  });

  it('toggles spatial audio and updates spatial angle', () => {
    useProductStore.getState().toggleSpatial();
    expect(useProductStore.getState().isSpatialActive).toBe(false);

    useProductStore.getState().setSpatialAngle(180);
    expect(useProductStore.getState().spatialAngle).toBe(180);
  });

  it('toggles sound demo playback', () => {
    useProductStore.getState().togglePlayDemo();
    expect(useProductStore.getState().isPlayingDemo).toBe(true);
    useProductStore.getState().togglePlayDemo();
    expect(useProductStore.getState().isPlayingDemo).toBe(false);
  });

  it('manages cart drawer, warranty toggle, and engraving limit', () => {
    useProductStore.getState().setDrawerOpen(true);
    expect(useProductStore.getState().isDrawerOpen).toBe(true);

    useProductStore.getState().toggleWarranty();
    expect(useProductStore.getState().hasExtendedWarranty).toBe(true);

    useProductStore.getState().setEngravingText('CALIN - ROH SOUND 2026 EDITION EXTRA');
    // Limits to 20 chars
    expect(useProductStore.getState().engravingText.length).toBeLessThanOrEqual(20);
  });

  it('clamps quantity between 1 and 5', () => {
    useProductStore.getState().setQuantity(0);
    expect(useProductStore.getState().quantity).toBe(1);

    useProductStore.getState().setQuantity(10);
    expect(useProductStore.getState().quantity).toBe(5);

    useProductStore.getState().setQuantity(3);
    expect(useProductStore.getState().quantity).toBe(3);
  });

  it('updates active technical spec tab', () => {
    useProductStore.getState().setActiveSpecTab('battery');
    expect(useProductStore.getState().activeSpecTab).toBe('battery');
  });

  it('resets to initial state properly', () => {
    useProductStore.getState().setColor('silver');
    useProductStore.getState().setQuantity(4);
    useProductStore.getState().resetProductStore();
    expect(useProductStore.getState().selectedColor).toBe('titanium');
    expect(useProductStore.getState().quantity).toBe(1);
  });
});
