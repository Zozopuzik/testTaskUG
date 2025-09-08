/**
 * Tests for dates API
 */
import { datesApi } from '../../src/api/datesApi';

// Mock the delay utility
jest.mock('../../src/utils/delay', () => ({
  delay: jest.fn().mockResolvedValue(undefined),
}));

describe('datesApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAvailableDates', () => {
    it('should return array of dates', async () => {
      const result = await datesApi.getAvailableDates();

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should return dates with correct structure', async () => {
      const result = await datesApi.getAvailableDates();

      result.forEach(date => {
        expect(date).toHaveProperty('id');
        expect(date).toHaveProperty('label');
        expect(date).toHaveProperty('value');
        expect(date).toHaveProperty('date');
        expect(typeof date.id).toBe('string');
        expect(typeof date.label).toBe('string');
        expect(typeof date.value).toBe('string');
        expect(typeof date.date).toBe('string');
      });
    });

    it('should return dates in correct format', async () => {
      const result = await datesApi.getAvailableDates();

      result.forEach(date => {
        // Check ID format (DD-MM-YYYY)
        expect(date.id).toMatch(/^\d{2}-\d{2}-\d{4}$/);
        
        // Check label format (day number)
        expect(date.label).toMatch(/^\d{1,2}$/);
        
        // Check value format (DD/MM/YY)
        expect(date.value).toMatch(/^\d{1,2}\/\d{1,2}\/\d{2}$/);
        
        // Check date format (DD/MM/YY)
        expect(date.date).toMatch(/^\d{1,2}\/\d{1,2}\/\d{2}$/);
      });
    });

    it('should return consecutive dates', async () => {
      const result = await datesApi.getAvailableDates();

      // Check that dates are consecutive
      for (let i = 1; i < result.length; i++) {
        const currentDate = new Date(result[i].id.split('-').reverse().join('-'));
        const previousDate = new Date(result[i - 1].id.split('-').reverse().join('-'));
        
        const diffInDays = Math.floor((currentDate.getTime() - previousDate.getTime()) / (1000 * 60 * 60 * 24));
        expect(diffInDays).toBe(1);
      }
    });

    it('should call delay utility', async () => {
      const { delay } = require('../../src/utils/delay');
      
      await datesApi.getAvailableDates();
      
      expect(delay).toHaveBeenCalledWith(800);
    });

    it('should return same data on multiple calls', async () => {
      const result1 = await datesApi.getAvailableDates();
      const result2 = await datesApi.getAvailableDates();

      expect(result1).toEqual(result2);
    });
  });
});
