import { useEffect } from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';

/**
 * Slide-in animation hook
 * 
 * Provides slide-in animation from specified direction with optional delay
 * 
 * @param direction - Slide direction: 'left', 'right', 'top', 'bottom' (default: 'left')
 * @param delay - Animation delay in milliseconds (default: 0)
 * @param duration - Animation duration in milliseconds (default: 600)
 * @param distance - Slide distance in pixels (default: 30)
 * 
 * @returns Object with animated style and translate values
 * 
 * @example
 * ```tsx
 * const { animatedStyle } = useSlideInAnimation({ direction: 'left', delay: 400 });
 * return <Animated.View style={animatedStyle}>Content</Animated.View>;
 * ```
 */

interface UseSlideInAnimationProps {
  direction?: 'left' | 'right' | 'top' | 'bottom';
  delay?: number;
  duration?: number;
  distance?: number;
}

export function useSlideInAnimation({
  direction = 'left',
  delay = 0,
  duration = 600,
  distance = 30,
}: UseSlideInAnimationProps = {}) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    // Set initial position based on direction
    switch (direction) {
      case 'left':
        translateX.value = -distance;
        break;
      case 'right':
        translateX.value = distance;
        break;
      case 'top':
        translateY.value = -distance;
        break;
      case 'bottom':
        translateY.value = distance;
        break;
    }

    // Animate to final position
    translateX.value = withDelay(
      delay,
      withTiming(0, {
        duration,
        easing: Easing.out(Easing.cubic),
      })
    );
    translateY.value = withDelay(
      delay,
      withTiming(0, {
        duration,
        easing: Easing.out(Easing.cubic),
      })
    );
    opacity.value = withDelay(
      delay,
      withTiming(1, {
        duration,
        easing: Easing.out(Easing.cubic),
      })
    );
  }, [direction, delay, duration, distance]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  return {
    animatedStyle,
    translateX,
    translateY,
    opacity,
  };
}
