import type { DateItem } from '@/types/common';
import { dateSData } from '@/mocks/datesData';
import { delay } from '@/utils/delay';

/**
 * Dates API
 *
 * Provides methods to fetch available dates for the date selector
 */

/**
 * Get available dates for date selection
 *
 * @returns Promise with array of available dates
 *
 * @example
 * ```typescript
 * const dates = await datesApi.getAvailableDates();
 * console.log(dates[0].id); // '01-01-2025'
 * ```
 */

export const datesApi = {
  getAvailableDates: async (): Promise<DateItem[]> => {
    await delay(800);
    return dateSData;
  },
};
