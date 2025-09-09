import { energyLevelData } from '@mocks/energyLevelData';
import { delay } from '@/utils/delay';
import { EnergyLevelData, ApiError } from '@/types/common';

/**
 * Energy level API
 *
 * Provides methods to fetch energy level data for specific days
 */
/**
 * Get energy level data for a specific day
 *
 * @param dayId - The ID of the day to fetch data for
 * @returns Promise with energy level data
 *
 * @example
 * ```typescript
 * const data = await energyLevelApi.getEnergyLevel('22');
 * console.log(data.energyLevel); // 75
 * ```
 */
export const energyLevelApi = {
  getEnergyLevel: async (dayId: string): Promise<EnergyLevelData> => {
    // Simulate API delay
    await delay(800);

    // Check if dayId is '22-01-2025' (January 22, 2025) - today's date
    if (dayId === '22-01-2025') {
      // Return mock data for January 22, 2025
      const mockData: EnergyLevelData = {
        id: dayId,
        date: '2025-01-22',
        timestamp: Date.now(),
        rawData: energyLevelData,
      };

      return mockData;
    }

    // Return 404 error for other dates
    const error: ApiError = {
      status: 404,
      message: `Energy level data not found for day ${dayId}`,
    };

    throw error;
  },
};
