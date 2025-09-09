/**
 * App Store
 * 
 * Zustand store for managing global app state and initialization
 * 
 * @example
 * ```typescript
 * const { isInitialized, isLoading, initializeApp } = useAppStore();
 * await initializeApp();
 * ```
 */
import { create } from 'zustand';
import { delay } from '@/utils/delay';
import { AppState } from '@/types/common';

/**
 * App store hook
 * 
 * Provides global app state management and initialization logic
 * 
 * @returns AppState object with initialization status and actions
 */
export const useAppStore = create<AppState>((set, get) => ({
  isInitialized: false,
  isLoading: true,
  
  /**
   * Set initialization status
   * 
   * @param value - Whether the app is initialized
   */
  setInitialized: (value: boolean) => set({ isInitialized: value }),
  
  /**
   * Set loading state
   * 
   * @param value - Whether the app is in loading state
   */
  setLoading: (value: boolean) => set({ isLoading: value }),
  
  /**
   * Initialize the app with async operations
   * 
   * Simulates app initialization with 2-second delay
   * Sets initialized to true and loading to false on success
   * 
   * @throws Logs error and sets loading to false on failure
   */
  initializeApp: async () => {
    set({ isLoading: true });
    
    try {
      await delay(2000);
      
      set({ isInitialized: true, isLoading: false });
    } catch (error) {
      console.error('App initialization failed:', error);
      set({ isLoading: false });
    }
  },
}));
