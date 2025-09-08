/**
 * Dates Store
 * 
 * Zustand store for managing available dates and selected date state
 * 
 * @example
 * ```typescript
 * const { dates, selectedDate, loadDates, selectDate } = useDatesStore();
 * await loadDates();
 * selectDate('22-01-2025');
 * ```
 */
import { create } from 'zustand';
import { DateItem } from '@/mocks/datesData';
import { datesApi } from '@/api/datesApi';

/**
 * Dates store state interface
 * 
 * Defines the shape of the dates store state and actions
 */
interface DatesState {
  /** Array of available dates for selection */
  dates: DateItem[];
  /** Currently selected date or null if none selected */
  selectedDate: DateItem | null;
  /** Loading state for dates requests */
  isLoading: boolean;
  /** Error message if dates loading failed */
  error: string | null;
  /** Load available dates from API */
  loadDates: () => Promise<void>;
  /** Select a date by ID */
  selectDate: (id: string) => void;
}

/**
 * Dates store hook
 * 
 * Provides state management for available dates and date selection
 * 
 * @returns DatesState object with dates, selected date, and actions
 */
export const useDatesStore = create<DatesState>((set, get) => ({
  dates: [],
  selectedDate: {
    id: '22-01-2025',
    label: '22',
    value: '22/01/25',
    date: '22/01/25',
  },
  isLoading: false,
  error: null,

  /**
   * Load available dates from API
   * 
   * Fetches dates and sets default selected date to '21-01-2025' (yesterday) or first available
   * 
   * @throws Sets error state if API call fails
   */
  loadDates: async () => {
    set({ isLoading: true, error: null });

    try {
      const dates = await datesApi.getAvailableDates();
      // Find and set selectedDate to yesterday (21-01-2025) instead of today
      const defaultSelectedDate = dates.find(date => date.id === '21-01-2025') || dates[0];
      set({ dates, selectedDate: defaultSelectedDate, isLoading: false });
    } catch (error) {
      set({ 
        error: 'Failed to load dates', 
        isLoading: false 
      });
    }
  },

  /**
   * Select a date by ID
   * 
   * @param id - Date ID in DD-MM-YYYY format
   * @throws Sets error state if date not found
   */
  selectDate: (id: string) => {
    const date = get().dates.find((date) => date.id === id);
    if (!date) {
      set({ error: 'Date not found', isLoading: false });
      return;
    }
    set({ selectedDate: date, error: null });
  }
}));
