/**
 * Dates Data Mock
 * 
 * Mock data for available dates in the date selector
 * Provides interface and sample data for date selection functionality
 * 
 * @example
 * ```typescript
 * import { DateItem, dateSData } from '@/mocks/datesData';
 * const selectedDate = dateSData.find(date => date.id === '22-01-2025');
 * ```
 */

import { DateItem } from '@/types/common';

/**
 * Mock dates data
 * 
 * Array of available dates for the date selector component
 * Covers 9 consecutive days in January 2025
 */
export const dateSData: DateItem[] = [
  { id: '18-01-2025', label: '18', value: '18/01/25', date: '18/01/25' },
  { id: '19-01-2025', label: '19', value: '19/01/25', date: '19/01/25' },
  { id: '20-01-2025', label: '20', value: '20/01/25', date: '20/01/25' },
  { id: '21-01-2025', label: '21', value: '21/01/25', date: '21/01/25' },
  { id: '22-01-2025', label: '22', value: '22/01/25', date: '22/01/25' },
  { id: '23-01-2025', label: '23', value: '23/01/25', date: '23/01/25' },
  { id: '24-01-2025', label: '24', value: '24/01/25', date: '24/01/25' },
  { id: '25-01-2025', label: '25', value: '25/01/25', date: '25/01/25' },
  { id: '26-01-2025', label: '26', value: '26/01/25', date: '26/01/25' },
];

