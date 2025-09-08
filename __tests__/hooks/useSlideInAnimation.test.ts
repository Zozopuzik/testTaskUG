/**
 * Tests for useSlideInAnimation hook
 */
import { renderHook } from '@testing-library/react-native';
import { useSlideInAnimation } from '../../src/hooks/useSlideInAnimation';

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

describe('useSlideInAnimation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return animated style and translate values', () => {
    const { result } = renderHook(() => useSlideInAnimation());

    expect(result.current).toHaveProperty('animatedStyle');
    expect(result.current).toHaveProperty('translateX');
    expect(result.current).toHaveProperty('translateY');
    expect(result.current).toHaveProperty('opacity');
  });

  it('should use default values when no props provided', () => {
    const { result } = renderHook(() => useSlideInAnimation());

    expect(result.current.animatedStyle).toBeDefined();
    expect(result.current.translateX).toBeDefined();
    expect(result.current.translateY).toBeDefined();
    expect(result.current.opacity).toBeDefined();
  });

  it('should handle left direction', () => {
    const { result } = renderHook(() => 
      useSlideInAnimation({ direction: 'left' })
    );

    expect(result.current.animatedStyle).toBeDefined();
    expect(result.current.translateX).toBeDefined();
    expect(result.current.translateY).toBeDefined();
    expect(result.current.opacity).toBeDefined();
  });

  it('should handle right direction', () => {
    const { result } = renderHook(() => 
      useSlideInAnimation({ direction: 'right' })
    );

    expect(result.current.animatedStyle).toBeDefined();
    expect(result.current.translateX).toBeDefined();
    expect(result.current.translateY).toBeDefined();
    expect(result.current.opacity).toBeDefined();
  });

  it('should handle top direction', () => {
    const { result } = renderHook(() => 
      useSlideInAnimation({ direction: 'top' })
    );

    expect(result.current.animatedStyle).toBeDefined();
    expect(result.current.translateX).toBeDefined();
    expect(result.current.translateY).toBeDefined();
    expect(result.current.opacity).toBeDefined();
  });

  it('should handle bottom direction', () => {
    const { result } = renderHook(() => 
      useSlideInAnimation({ direction: 'bottom' })
    );

    expect(result.current.animatedStyle).toBeDefined();
    expect(result.current.translateX).toBeDefined();
    expect(result.current.translateY).toBeDefined();
    expect(result.current.opacity).toBeDefined();
  });

  it('should accept custom delay', () => {
    const { result } = renderHook(() => 
      useSlideInAnimation({ delay: 500 })
    );

    expect(result.current.animatedStyle).toBeDefined();
    expect(result.current.translateX).toBeDefined();
    expect(result.current.translateY).toBeDefined();
    expect(result.current.opacity).toBeDefined();
  });

  it('should accept custom duration', () => {
    const { result } = renderHook(() => 
      useSlideInAnimation({ duration: 1000 })
    );

    expect(result.current.animatedStyle).toBeDefined();
    expect(result.current.translateX).toBeDefined();
    expect(result.current.translateY).toBeDefined();
    expect(result.current.opacity).toBeDefined();
  });

  it('should accept custom distance', () => {
    const { result } = renderHook(() => 
      useSlideInAnimation({ distance: 50 })
    );

    expect(result.current.animatedStyle).toBeDefined();
    expect(result.current.translateX).toBeDefined();
    expect(result.current.translateY).toBeDefined();
    expect(result.current.opacity).toBeDefined();
  });

  it('should accept all custom props', () => {
    const { result } = renderHook(() => 
      useSlideInAnimation({
        direction: 'right',
        delay: 200,
        duration: 800,
        distance: 40,
      })
    );

    expect(result.current.animatedStyle).toBeDefined();
    expect(result.current.translateX).toBeDefined();
    expect(result.current.translateY).toBeDefined();
    expect(result.current.opacity).toBeDefined();
  });

  it('should return animated style with opacity and transform properties', () => {
    const { result } = renderHook(() => useSlideInAnimation());

    expect(result.current.animatedStyle).toHaveProperty('opacity');
    expect(result.current.animatedStyle).toHaveProperty('transform');
  });

  it('should handle zero delay', () => {
    const { result } = renderHook(() => 
      useSlideInAnimation({ delay: 0 })
    );

    expect(result.current.animatedStyle).toBeDefined();
    expect(result.current.translateX).toBeDefined();
    expect(result.current.translateY).toBeDefined();
    expect(result.current.opacity).toBeDefined();
  });

  it('should handle zero duration', () => {
    const { result } = renderHook(() => 
      useSlideInAnimation({ duration: 0 })
    );

    expect(result.current.animatedStyle).toBeDefined();
    expect(result.current.translateX).toBeDefined();
    expect(result.current.translateY).toBeDefined();
    expect(result.current.opacity).toBeDefined();
  });

  it('should handle zero distance', () => {
    const { result } = renderHook(() => 
      useSlideInAnimation({ distance: 0 })
    );

    expect(result.current.animatedStyle).toBeDefined();
    expect(result.current.translateX).toBeDefined();
    expect(result.current.translateY).toBeDefined();
    expect(result.current.opacity).toBeDefined();
  });
});
