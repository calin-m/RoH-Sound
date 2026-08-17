/**
 * Central Motion Design Configuration
 * Single source of truth for modern minimalistic animations across the entire application.
 * Edit properties here to adjust easing, timing, distances, and replay behavior globally.
 */

export interface MotionConfig {
  /** Animation duration in milliseconds */
  duration: number;
  /** Modern minimalistic cubic-bezier easing curve for mechanical deceleration */
  easing: string;
  /** Initial offset distance in pixels */
  distance: number;
  /** Milliseconds delay between consecutive staggered child elements */
  staggerInterval: number;
  /** IntersectionObserver threshold for triggering reveal */
  threshold: number;
  /**
   * If false, continuously replays entrance animations whenever elements
   * enter the viewport, jump via navigation, or switch back to the browser tab.
   */
  once: boolean;
}

export const MOTION_CONFIG: MotionConfig = {
  duration: 700,
  easing: 'cubic-bezier(0.16, 1, 0.3, 1)', // Modern minimalistic editorial ease-out
  distance: 24,
  staggerInterval: 75,
  threshold: 0.1,
  once: true,
};
