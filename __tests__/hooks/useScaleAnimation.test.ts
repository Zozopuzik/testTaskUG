/**
 * Tests for useScaleAnimation hook
 */
import { renderHook } from '@testing-library/react-native';
import { useScaleAnimation } from '../../src/hooks/useScaleAnimation';

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => ({
  useSharedValue: jest.fn((value) => ({ value })),
  useAnimatedStyle: jest.fn((fn) => fn()),
  withTiming: jest.fn((value) => value),
  withDelay: jest.fn((delay, value) => value),
  Easing: {
    out: jest.fn((easing) => easing),
    cubic: jest.fn(),
    back: jest.fn((value) => value),
  },
}));

describe('useScaleAnimation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return animated style and scale value', () => {
    const { result } = renderHook(() => useScaleAnimation());

    expect(result.current).toHaveProperty('animatedStyle');
    expect(result.current).toHaveProperty('scale');
    expect(result.current).toHaveProperty('opacity');
  });

  it('should use default values when no props provided', () => {
    const { result } = renderHook(() => useScaleAnimation());

    expect(result.current.animatedStyle).toBeDefined();
    expect(result.current.scale).toBeDefined();
    expect(result.current.opacity).toBeDefined();
  });

  it('should accept custom delay', () => {
    const { result } = renderHook(() => 
      useScaleAnimation({ delay: 500 })
    );

    expect(result.current.animatedStyle).toBeDefined();
    expect(result.current.scale).toBeDefined();
    expect(result.current.opacity).toBeDefined();
  });

  it('should accept custom duration', () => {
    const { result } = renderHook(() => 
      useScaleAnimation({ duration: 1000 })
    );

    expect(result.current.animatedStyle).toBeDefined();
    expect(result.current.scale).toBeDefined();
    expect(result.current.opacity).toBeDefined();
  });

  it('should accept custom initial scale', () => {
    const { result } = renderHook(() => 
      useScaleAnimation({ initialScale: 0.5 })
    );

    expect(result.current.animatedStyle).toBeDefined();
    expect(result.current.scale).toBeDefined();
    expect(result.current.opacity).toBeDefined();
  });

  it('should accept custom final scale', () => {
    const { result } = renderHook(() => 
      useScaleAnimation({ finalScale: 1.2 })
    );

    expect(result.current.animatedStyle).toBeDefined();
    expect(result.current.scale).toBeDefined();
    expect(result.current.opacity).toBeDefined();
  });

  it('should accept custom easing', () => {
    const customEasing = jest.fn();
    const { result } = renderHook(() => 
      useScaleAnimation({ easing: customEasing })
    );

    expect(result.current.animatedStyle).toBeDefined();
    expect(result.current.scale).toBeDefined();
    expect(result.current.opacity).toBeDefined();
  });

  it('should accept all custom props', () => {
    const customEasing = jest.fn();
    const { result } = renderHook(() => 
      useScaleAnimation({
        delay: 200,
        duration: 800,
        initialScale: 0.3,
        finalScale: 1.5,
        easing: customEasing,
      })
    );

    expect(result.current.animatedStyle).toBeDefined();
    expect(result.current.scale).toBeDefined();
    expect(result.current.opacity).toBeDefined();
  });

  it('should return animated style with opacity and transform properties', () => {
    const { result } = renderHook(() => useScaleAnimation());

    expect(result.current.animatedStyle).toHaveProperty('opacity');
    expect(result.current.animatedStyle).toHaveProperty('transform');
  });

  it('should handle zero delay', () => {
    const { result } = renderHook(() => 
      useScaleAnimation({ delay: 0 })
    );

    expect(result.current.animatedStyle).toBeDefined();
    expect(result.current.scale).toBeDefined();
    expect(result.current.opacity).toBeDefined();
  });

  it('should handle zero duration', () => {
    const { result } = renderHook(() => 
      useScaleAnimation({ duration: 0 })
    );

    expect(result.current.animatedStyle).toBeDefined();
    expect(result.current.scale).toBeDefined();
    expect(result.current.opacity).toBeDefined();
  });

  it('should handle scale values less than 1', () => {
    const { result } = renderHook(() => 
      useScaleAnimation({ 
        initialScale: 0.1, 
        finalScale: 0.9 
      })
    );

    expect(result.current.animatedStyle).toBeDefined();
    expect(result.current.scale).toBeDefined();
    expect(result.current.opacity).toBeDefined();
  });

  it('should handle scale values greater than 1', () => {
    const { result } = renderHook(() => 
      useScaleAnimation({ 
        initialScale: 1.5, 
        finalScale: 2.0 
      })
    );

    expect(result.current.animatedStyle).toBeDefined();
    expect(result.current.scale).toBeDefined();
    expect(result.current.opacity).toBeDefined();
  });
});
