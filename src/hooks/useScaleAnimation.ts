import { useEffect } from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';

/**
 * Scale animation hook
 * 
 * Provides scale animation with optional delay and custom easing
 * 
 * @param delay - Animation delay in milliseconds (default: 0)
 * @param duration - Animation duration in milliseconds (default: 600)
 * @param initialScale - Starting scale value (default: 0.8)
 * @param finalScale - Ending scale value (default: 1)
 * @param easing - Easing function (default: Easing.out(Easing.back(1.1)))
 * 
 * @returns Object with animated style and scale value
 * 
 * @example
 * ```tsx
 * const { animatedStyle } = useScaleAnimation({ delay: 200 });
 * return <Animated.View style={animatedStyle}>Content</Animated.View>;
 * ```
 */

interface UseScaleAnimationProps {
  delay?: number;
  duration?: number;
  initialScale?: number;
  finalScale?: number;
  easing?: any;
}

export function useScaleAnimation({
  delay = 0,
  duration = 600,
  initialScale = 0.8,
  finalScale = 1,
  easing = Easing.out(Easing.back(1.1)),
}: UseScaleAnimationProps = {}) {
  const scale = useSharedValue(initialScale);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withDelay(
      delay,
      withTiming(finalScale, {
        duration,
        easing,
      })
    );
    opacity.value = withDelay(
      delay,
      withTiming(1, {
        duration,
        easing: Easing.out(Easing.cubic),
      })
    );
  }, [delay, duration, initialScale, finalScale, easing]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return {
    animatedStyle,
    scale,
    opacity,
  };
}
