/**
 * Simplified tests for datesStore
 */
import { act, renderHook } from '@testing-library/react-native';
import { useDatesStore } from '../../src/stores/datesStore';

// Mock the datesApi
jest.mock('../../src/api/datesApi', () => ({
  datesApi: {
    getAvailableDates: jest.fn(),
  },
}));

// Mock the delay utility
jest.mock('../../src/utils/delay', () => ({
  delay: jest.fn().mockResolvedValue(undefined),
}));

describe('datesStore', () => {
  const mockDates = [
    { id: '20-01-2025', label: '20', value: '20/01/25', date: '20/01/25' },
    { id: '21-01-2025', label: '21', value: '21/01/25', date: '21/01/25' },
    { id: '22-01-2025', label: '22', value: '22/01/25', date: '22/01/25' },
  ];

  beforeEach(() => {
    // Reset store state before each test
    useDatesStore.setState({
      dates: [],
      selectedDate: null,
      isLoading: false,
      error: null,
    });
  });

  it('should have initial state', () => {
    const { result } = renderHook(() => useDatesStore());

    expect(result.current.dates).toEqual([]);
    expect(result.current.selectedDate).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should have all required methods', () => {
    const { result } = renderHook(() => useDatesStore());

    expect(typeof result.current.loadDates).toBe('function');
    expect(typeof result.current.selectDate).toBe('function');
  });

  it('should load dates successfully', async () => {
    const { datesApi } = require('../../src/api/datesApi');
    datesApi.getAvailableDates.mockResolvedValueOnce(mockDates);

    const { result } = renderHook(() => useDatesStore());

    await act(async () => {
      await result.current.loadDates();
    });

    expect(result.current.dates).toEqual(mockDates);
    expect(result.current.selectedDate).toEqual(mockDates[1]); // 21-01-2025 (yesterday)
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should select date successfully', () => {
    const { result } = renderHook(() => useDatesStore());

    // Set up dates first
    act(() => {
      useDatesStore.setState({ dates: mockDates });
    });

    act(() => {
      result.current.selectDate('21-01-2025');
    });

    expect(result.current.selectedDate).toEqual(mockDates[1]);
    expect(result.current.error).toBeNull();
  });

  it('should handle selectDate with invalid ID', () => {
    const { result } = renderHook(() => useDatesStore());

    // Set up dates first
    act(() => {
      useDatesStore.setState({ dates: mockDates });
    });

    act(() => {
      result.current.selectDate('invalid-id');
    });

    expect(result.current.selectedDate).toBeNull();
    expect(result.current.error).toBe('Date not found');
    expect(result.current.isLoading).toBe(false);
  });
});
