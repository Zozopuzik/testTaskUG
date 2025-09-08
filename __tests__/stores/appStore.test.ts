/**
 * Tests for appStore
 */
import { act, renderHook } from '@testing-library/react-native';
import { useAppStore } from '../../src/stores/appStore';

// Mock the delay utility
jest.mock('../../src/utils/delay', () => ({
  delay: jest.fn().mockResolvedValue(undefined),
}));

describe('appStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useAppStore.setState({
      isInitialized: false,
      isLoading: true,
    });
  });

  it('should have initial state', () => {
    const { result } = renderHook(() => useAppStore());

    expect(result.current.isInitialized).toBe(false);
    expect(result.current.isLoading).toBe(true);
  });

  it('should have all required methods', () => {
    const { result } = renderHook(() => useAppStore());

    expect(typeof result.current.setInitialized).toBe('function');
    expect(typeof result.current.setLoading).toBe('function');
    expect(typeof result.current.initializeApp).toBe('function');
  });

  it('should set initialized state', () => {
    const { result } = renderHook(() => useAppStore());

    act(() => {
      result.current.setInitialized(true);
    });

    expect(result.current.isInitialized).toBe(true);
  });

  it('should set loading state', () => {
    const { result } = renderHook(() => useAppStore());

    act(() => {
      result.current.setLoading(false);
    });

    expect(result.current.isLoading).toBe(false);
  });

  it('should initialize app successfully', async () => {
    const { result } = renderHook(() => useAppStore());

    await act(async () => {
      await result.current.initializeApp();
    });

    expect(result.current.isInitialized).toBe(true);
    expect(result.current.isLoading).toBe(false);
  });

  it('should set loading to true during initialization', async () => {
    const { result } = renderHook(() => useAppStore());

    // Start initialization
    const initPromise = act(async () => {
      await result.current.initializeApp();
    });

    // Check that loading is true during initialization
    expect(result.current.isLoading).toBe(true);

    // Wait for completion
    await initPromise;
  });

  it('should handle initialization error', async () => {
    const { delay } = require('../../src/utils/delay');
    delay.mockRejectedValueOnce(new Error('Initialization failed'));

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    const { result } = renderHook(() => useAppStore());

    await act(async () => {
      await result.current.initializeApp();
    });

    expect(result.current.isInitialized).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(consoleSpy).toHaveBeenCalledWith('App initialization failed:', expect.any(Error));

    consoleSpy.mockRestore();
  });

  it('should call delay with correct duration', async () => {
    const { delay } = require('../../src/utils/delay');

    const { result } = renderHook(() => useAppStore());

    await act(async () => {
      await result.current.initializeApp();
    });

    expect(delay).toHaveBeenCalledWith(2000);
  });

  it('should maintain state between multiple calls', async () => {
    const { result } = renderHook(() => useAppStore());

    // First initialization
    await act(async () => {
      await result.current.initializeApp();
    });

    expect(result.current.isInitialized).toBe(true);
    expect(result.current.isLoading).toBe(false);

    // Reset and initialize again
    act(() => {
      result.current.setInitialized(false);
    });

    await act(async () => {
      await result.current.initializeApp();
    });

    expect(result.current.isInitialized).toBe(true);
    expect(result.current.isLoading).toBe(false);
  });
});
