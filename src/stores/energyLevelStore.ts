/**
 * Energy Level Store
 * 
 * Zustand store for managing energy level data, loading states, and errors
 * 
 * @example
 * ```typescript
 * const { energyData, isLoading, loadEnergyData } = useEnergyLevelStore();
 * await loadEnergyData('22-01-2025');
 * ```
 */
import { create } from 'zustand';
import { EnergyLevelData, ApiError } from '@api/energyLevelApi';

/**
 * Energy level store state interface
 * 
 * Defines the shape of the energy level store state and actions
 */
interface EnergyLevelState {
  /** Current energy level data or null if not loaded */
  energyData: EnergyLevelData | null;
  /** Loading state for energy data requests */
  isLoading: boolean;
  /** API error if data loading failed */
  error: ApiError | null;
  /** Load energy data for specific day */
  loadEnergyData: (dayId: string) => Promise<void>;
  /** Clear current error state */
  clearError: () => void;
  /** Clear all data and errors */
  clearData: () => void;
}

/**
 * Energy level store hook
 * 
 * Provides state management for energy level data with async loading
 * 
 * @returns EnergyLevelState object with data, loading state, and actions
 */
export const useEnergyLevelStore = create<EnergyLevelState>((set, get) => ({
  energyData: null,
  isLoading: false,
  error: null,

  /**
   * Load energy data for specific day
   * 
   * @param dayId - Date ID in DD-MM-YYYY format
   * @throws ApiError if loading fails
   */
  loadEnergyData: async (dayId: string) => {
    set({ isLoading: true, error: null });

    try {
      const { energyLevelApi } = await import('@api/energyLevelApi');
    
      const data = await energyLevelApi.getEnergyLevel(dayId);
      set({ 
        energyData: data, 
        isLoading: false,
        error: null 
      });
    } catch (error) {
      const apiError = error as ApiError;
      
      set({ 
        energyData: null,
        isLoading: false,
        error: apiError 
      });
    }
  },

  /**
   * Clear current error state
   * 
   * Resets error to null without affecting data
   */
  clearError: () => {
    set({ error: null });
  },

  /**
   * Clear all data and errors
   * 
   * Resets store to initial state
   */
  clearData: () => {
    set({ 
      energyData: null, 
      error: null 
    });
  },
}));
