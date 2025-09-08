/**
 * Tests for useFadeInAnimation hook
 */
import { renderHook } from '@testing-library/react-native';
import { useFadeInAnimation } from '../../src/hooks/useFadeInAnimation';

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => ({
  useSharedValue: jest.fn((value) => ({ value })),
  useAnimatedStyle: jest.fn((fn) => fn()),
  withTiming: jest.fn((value) => value),
  withDelay: jest.fn((delay, value) => value),
  Easing: {
    out: jest.fn((easing) => easing),
    cubic: jest.fn(),
  },
}));

describe('useFadeInAnimation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return animated style and opacity value', () => {
    const { result } = renderHook(() => useFadeInAnimation());

    expect(result.current).toHaveProperty('animatedStyle');
    expect(result.current).toHaveProperty('opacity');
  });

  it('should use default values when no props provided', () => {
    const { result } = renderHook(() => useFadeInAnimation());

    expect(result.current.animatedStyle).toBeDefined();
    expect(result.current.opacity).toBeDefined();
  });

  it('should accept custom delay', () => {
    const { result } = renderHook(() => 
      useFadeInAnimation({ delay: 500 })
    );

    expect(result.current.animatedStyle).toBeDefined();
    expect(result.current.opacity).toBeDefined();
  });

  it('should accept custom duration', () => {
    const { result } = renderHook(() => 
      useFadeInAnimation({ duration: 1000 })
    );

    expect(result.current.animatedStyle).toBeDefined();
    expect(result.current.opacity).toBeDefined();
  });

  it('should accept custom initial opacity', () => {
    const { result } = renderHook(() => 
      useFadeInAnimation({ initialOpacity: 0.5 })
    );

    expect(result.current.animatedStyle).toBeDefined();
    expect(result.current.opacity).toBeDefined();
  });

  it('should accept custom final opacity', () => {
    const { result } = renderHook(() => 
      useFadeInAnimation({ finalOpacity: 0.8 })
    );

    expect(result.current.animatedStyle).toBeDefined();
    expect(result.current.opacity).toBeDefined();
  });

  it('should accept all custom props', () => {
    const { result } = renderHook(() => 
      useFadeInAnimation({
        delay: 200,
        duration: 800,
        initialOpacity: 0.2,
        finalOpacity: 0.9,
      })
    );

    expect(result.current.animatedStyle).toBeDefined();
    expect(result.current.opacity).toBeDefined();
  });

  it('should return animated style with opacity property', () => {
    const { result } = renderHook(() => useFadeInAnimation());

    expect(result.current.animatedStyle).toHaveProperty('opacity');
  });

  it('should handle zero delay', () => {
    const { result } = renderHook(() => 
      useFadeInAnimation({ delay: 0 })
    );

    expect(result.current.animatedStyle).toBeDefined();
    expect(result.current.opacity).toBeDefined();
  });

  it('should handle zero duration', () => {
    const { result } = renderHook(() => 
      useFadeInAnimation({ duration: 0 })
    );

    expect(result.current.animatedStyle).toBeDefined();
    expect(result.current.opacity).toBeDefined();
  });
});
