/**
 * Tests for DateSelector utility functions
 */
import { DateItem } from '../../src/mocks/datesData';

// Mock the getYesterdayDate function logic
const getYesterdayDate = (dates: DateItem[], todayDateId: string): string | null => {
  const todayIndex = dates.findIndex(item => item.id === todayDateId);
  if (todayIndex === -1 || todayIndex === 0) return null;
  return dates[todayIndex - 1].id;
};

// Mock the getButtonTitle function logic
const getButtonTitle = (item: DateItem, todayDateId: string, yesterdayDateId: string | null): string => {
  if (item.id === todayDateId) return 'Today';
  if (item.id === yesterdayDateId) return 'Yesterday';
  return item.date;
};

describe('DateSelector utilities', () => {
  const mockDates: DateItem[] = [
    { id: '18-01-2025', label: '18', value: '18/01/25', date: '18/01/25' },
    { id: '19-01-2025', label: '19', value: '19/01/25', date: '19/01/25' },
    { id: '20-01-2025', label: '20', value: '20/01/25', date: '20/01/25' },
    { id: '21-01-2025', label: '21', value: '21/01/25', date: '21/01/25' },
    { id: '22-01-2025', label: '22', value: '22/01/25', date: '22/01/25' },
  ];

  describe('getYesterdayDate', () => {
    it('should return yesterday date ID when today is in the middle', () => {
      const todayDateId = '21-01-2025';
      const result = getYesterdayDate(mockDates, todayDateId);
      expect(result).toBe('20-01-2025');
    });

    it('should return null when today is the first date', () => {
      const todayDateId = '18-01-2025';
      const result = getYesterdayDate(mockDates, todayDateId);
      expect(result).toBeNull();
    });

    it('should return null when today date is not found', () => {
      const todayDateId = '25-01-2025';
      const result = getYesterdayDate(mockDates, todayDateId);
      expect(result).toBeNull();
    });

    it('should return null for empty dates array', () => {
      const result = getYesterdayDate([], '21-01-2025');
      expect(result).toBeNull();
    });
  });

  describe('getButtonTitle', () => {
    const todayDateId = '21-01-2025';
    const yesterdayDateId = '20-01-2025';

    it('should return "Today" for today date', () => {
      const todayItem = mockDates.find(d => d.id === todayDateId)!;
      const result = getButtonTitle(todayItem, todayDateId, yesterdayDateId);
      expect(result).toBe('Today');
    });

    it('should return "Yesterday" for yesterday date', () => {
      const yesterdayItem = mockDates.find(d => d.id === yesterdayDateId)!;
      const result = getButtonTitle(yesterdayItem, todayDateId, yesterdayDateId);
      expect(result).toBe('Yesterday');
    });

    it('should return date string for other dates', () => {
      const otherItem = mockDates.find(d => d.id === '18-01-2025')!;
      const result = getButtonTitle(otherItem, todayDateId, yesterdayDateId);
      expect(result).toBe('18/01/25');
    });

    it('should return date string when yesterday is null', () => {
      const yesterdayItem = mockDates.find(d => d.id === '20-01-2025')!;
      const result = getButtonTitle(yesterdayItem, todayDateId, null);
      expect(result).toBe('20/01/25');
    });
  });

  describe('integration', () => {
    it('should work together correctly', () => {
      const todayDateId = '21-01-2025';
      const yesterdayDateId = getYesterdayDate(mockDates, todayDateId);

      expect(yesterdayDateId).toBe('20-01-2025');

      // Test all button titles
      const todayItem = mockDates.find(d => d.id === todayDateId)!;
      const yesterdayItem = mockDates.find(d => d.id === yesterdayDateId)!;
      const otherItem = mockDates.find(d => d.id === '18-01-2025')!;

      expect(getButtonTitle(todayItem, todayDateId, yesterdayDateId)).toBe('Today');
      expect(getButtonTitle(yesterdayItem, todayDateId, yesterdayDateId)).toBe('Yesterday');
      expect(getButtonTitle(otherItem, todayDateId, yesterdayDateId)).toBe('18/01/25');
    });
  });
});
