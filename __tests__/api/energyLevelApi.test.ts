/**
 * Tests for energy level API
 */
import { energyLevelApi } from '../../src/api/energyLevelApi';

// Mock the delay utility
jest.mock('../../src/utils/delay', () => ({
  delay: jest.fn().mockResolvedValue(undefined),
}));

describe('energyLevelApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getEnergyLevel', () => {
    it('should return energy data for valid day ID', async () => {
      const dayId = '22-01-2025';
      const result = await energyLevelApi.getEnergyLevel(dayId);

      expect(result).toHaveProperty('id', dayId);
      expect(result).toHaveProperty('date');
      expect(result).toHaveProperty('timestamp');
      expect(result).toHaveProperty('rawData');
      expect(Array.isArray(result.rawData)).toBe(true);
    });

    it('should return data with correct structure for valid day', async () => {
      const dayId = '22-01-2025';
      const result = await energyLevelApi.getEnergyLevel(dayId);

      expect(typeof result.id).toBe('string');
      expect(typeof result.date).toBe('string');
      expect(typeof result.timestamp).toBe('number');
      expect(Array.isArray(result.rawData)).toBe(true);
    });

    it('should return rawData with correct structure', async () => {
      const dayId = '22-01-2025';
      const result = await energyLevelApi.getEnergyLevel(dayId);

      expect(result.rawData?.length).toBeGreaterThan(0);
      
      result.rawData?.forEach(item => {
        expect(item).toHaveProperty('date');
        expect(item).toHaveProperty('value');
        expect(typeof item.date).toBe('string');
        expect(typeof item.value).toBe('string');
        expect(['Low', 'Medium', 'High']).toContain(item.value);
      });
    });

    it('should throw error for invalid day ID', async () => {
      const invalidDayId = '25-01-2025';

      try {
        await energyLevelApi.getEnergyLevel(invalidDayId);
        fail('Expected function to throw');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should throw error with correct structure for invalid day', async () => {
      const invalidDayId = '25-01-2025';

      try {
        await energyLevelApi.getEnergyLevel(invalidDayId);
        fail('Expected function to throw');
      } catch (error: any) {
        expect(error).toHaveProperty('status', 404);
        expect(error).toHaveProperty('message');
        expect(error.message).toContain(invalidDayId);
      }
    });

    it('should call delay utility', async () => {
      const { delay } = require('../../src/utils/delay');
      const dayId = '22-01-2025';
      
      await energyLevelApi.getEnergyLevel(dayId);
      
      expect(delay).toHaveBeenCalledWith(800);
    });

    it('should return different timestamps on multiple calls', async () => {
      const dayId = '22-01-2025';
      const result1 = await energyLevelApi.getEnergyLevel(dayId);
      
      // Wait a bit to ensure different timestamps
      await new Promise<void>(resolve => setTimeout(resolve, 10));
      
      const result2 = await energyLevelApi.getEnergyLevel(dayId);

      expect(result1.timestamp).not.toBe(result2.timestamp);
    });

    it('should throw error for empty string day ID', async () => {
      try {
        await energyLevelApi.getEnergyLevel('');
        fail('Expected function to throw');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should throw error for null/undefined day ID', async () => {
      try {
        await energyLevelApi.getEnergyLevel(null as any);
        fail('Expected function to throw');
      } catch (error) {
        expect(error).toBeDefined();
      }

      try {
        await energyLevelApi.getEnergyLevel(undefined as any);
        fail('Expected function to throw');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should return consistent data for same day ID', async () => {
      const dayId = '22-01-2025';
      const result1 = await energyLevelApi.getEnergyLevel(dayId);
      const result2 = await energyLevelApi.getEnergyLevel(dayId);

      expect(result1.id).toBe(result2.id);
      expect(result1.date).toBe(result2.date);
      expect(result1.rawData).toEqual(result2.rawData);
    });
  });
});
