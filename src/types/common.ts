/**
 * Common Types
 * 
 * Shared type definitions used across the application
 * 
 * @example
 * ```typescript
 * import { DateItem, EnergyLevelData, ApiError } from '@/types/common';
 * ```
 */

// ============================================================================
// API Types
// ============================================================================

/**
 * Energy level data interface
 * 
 * Represents energy level data for a specific day
 */
export interface EnergyLevelData {
  /** Unique identifier in DD-MM-YYYY format */
  id: string;
  /** Date in YYYY-MM-DD format */
  date: string;
  /** Timestamp when data was created */
  timestamp: number;
  /** Raw energy level data points */
  rawData: EnergyLevelPoint[];
}

/**
 * Energy level point interface
 * 
 * Represents a single energy level measurement
 */
export interface EnergyLevelPoint {
  /** Time in HH:MM format */
  date: string;
  /** Energy level value */
  value: 'Low' | 'Medium' | 'High';
}

/**
 * API error interface
 * 
 * Represents an error response from API
 */
export interface ApiError {
  /** HTTP status code */
  status: number;
  /** Error message */
  message: string;
}

// ============================================================================
// Date Types
// ============================================================================

/**
 * Date item interface
 * 
 * Represents a single date option in the date selector
 */
export interface DateItem {
  /** Unique identifier in DD-MM-YYYY format */
  id: string;
  /** Display label (day number) */
  label: string;
  /** Formatted value (DD/MM/YY) */
  value: string;
  /** Date string (DD/MM/YY) */
  date: string;
}

// ============================================================================
// Chart Types
// ============================================================================

/**
 * Chart point interface
 * 
 * Represents a single point on the chart with coordinates and metadata
 */
export interface ChartPoint {
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
  /** Numeric value for the point */
  value: number;
  /** Original string value */
  originalValue: string;
}

/**
 * Chart configuration interface
 * 
 * Defines dimensions and padding for chart rendering
 */
export interface ChartConfig {
  /** Chart width in pixels */
  width: number;
  /** Chart height in pixels */
  height: number;
  /** Padding around the chart */
  padding: number;
}

// ============================================================================
// Animation Types
// ============================================================================

/**
 * Animation direction type
 * 
 * Available directions for slide animations
 */
export type AnimationDirection = 'left' | 'right' | 'top' | 'bottom';

/**
 * Animation easing type
 * 
 * Available easing functions for animations
 */
export type AnimationEasing = 'linear' | 'ease' | 'quad' | 'cubic' | 'back';

// ============================================================================
// Component Props Types
// ============================================================================

/**
 * Base component props interface
 * 
 * Common props shared across components
 */
export interface BaseComponentProps {
  /** Optional test ID for testing */
  testID?: string;
  /** Optional children */
  children?: React.ReactNode;
}

/**
 * Animated component props interface
 * 
 * Props for components that support animations
 */
export interface AnimatedComponentProps extends BaseComponentProps {
  /** Whether the component should be animated */
  animated?: boolean;
}

// ============================================================================
// Store Types
// ============================================================================

/**
 * Base store state interface
 * 
 * Common properties shared across all stores
 */
export interface BaseStoreState {
  /** Loading state */
  isLoading: boolean;
  /** Error message if any */
  error: string | null;
}

/**
 * App store state interface
 * 
 * Defines the shape of the app store state and actions
 */
export interface AppState {
  /** Whether the app has been fully initialized */
  isInitialized: boolean;
  /** Global loading state for app operations */
  isLoading: boolean;
  /** Set initialization status */
  setInitialized: (value: boolean) => void;
  /** Set loading state */
  setLoading: (value: boolean) => void;
  /** Initialize the app with async operations */
  initializeApp: () => Promise<void>;
}

/**
 * Dates store state interface
 * 
 * Defines the shape of the dates store state and actions
 */
export interface DatesState extends BaseStoreState {
  /** Array of available dates for selection */
  dates: DateItem[];
  /** Currently selected date or null if none selected */
  selectedDate: DateItem | null;
  /** Load available dates from API */
  loadDates: () => Promise<void>;
  /** Select a date by ID */
  selectDate: (id: string) => void;
}

/**
 * Energy level store state interface
 * 
 * Defines the shape of the energy level store state and actions
 */
export interface EnergyLevelState extends BaseStoreState {
  /** Current energy level data or null if not loaded */
  energyData: EnergyLevelData | null;
  /** Load energy data for specific day */
  loadEnergyData: (dayId: string) => Promise<void>;
  /** Clear current error state */
  clearError: () => void;
  /** Clear all data and errors */
  clearData: () => void;
}

// ============================================================================
// Utility Types
// ============================================================================

/**
 * Optional type utility
 * 
 * Makes all properties of T optional
 */
export type Optional<T> = {
  [P in keyof T]?: T[P];
};

/**
 * Required type utility
 * 
 * Makes all properties of T required
 */
export type Required<T> = {
  [P in keyof T]-?: T[P];
};

/**
 * Partial type utility
 * 
 * Makes all properties of T partial
 */
export type Partial<T> = {
  [P in keyof T]?: T[P];
};

/**
 * Pick type utility
 * 
 * Picks specific properties from T
 */
export type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

/**
 * Omit type utility
 * 
 * Omits specific properties from T
 */
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// ============================================================================
// Constants
// ============================================================================

/**
 * Energy level values
 * 
 * Available energy level options
 */
export const ENERGY_LEVELS = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
} as const;

/**
 * Animation directions
 * 
 * Available animation directions
 */
export const ANIMATION_DIRECTIONS = {
  LEFT: 'left',
  RIGHT: 'right',
  TOP: 'top',
  BOTTOM: 'bottom',
} as const;

/**
 * Animation easings
 * 
 * Available animation easing functions
 */
export const ANIMATION_EASINGS = {
  LINEAR: 'linear',
  EASE: 'ease',
  QUAD: 'quad',
  CUBIC: 'cubic',
  BACK: 'back',
} as const;

// ============================================================================
// Type Guards
// ============================================================================

/**
 * Type guard for EnergyLevelData
 * 
 * @param obj - Object to check
 * @returns True if object is EnergyLevelData
 */
export function isEnergyLevelData(obj: any): obj is EnergyLevelData {
  return (
    obj &&
    typeof obj.id === 'string' &&
    typeof obj.date === 'string' &&
    typeof obj.timestamp === 'number' &&
    Array.isArray(obj.rawData)
  );
}

/**
 * Type guard for DateItem
 * 
 * @param obj - Object to check
 * @returns True if object is DateItem
 */
export function isDateItem(obj: any): obj is DateItem {
  return (
    obj &&
    typeof obj.id === 'string' &&
    typeof obj.label === 'string' &&
    typeof obj.value === 'string' &&
    typeof obj.date === 'string'
  );
}

/**
 * Type guard for ApiError
 * 
 * @param obj - Object to check
 * @returns True if object is ApiError
 */
export function isApiError(obj: any): obj is ApiError {
  return (
    obj &&
    typeof obj.status === 'number' &&
    typeof obj.message === 'string'
  );
}
