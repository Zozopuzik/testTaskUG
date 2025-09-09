import { useEffect } from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';

/**
 * Fade-in animation hook
 * 
 * Provides fade-in animation with optional delay and custom easing
 * 
 * @param delay - Animation delay in milliseconds (default: 0)
 * @param duration - Animation duration in milliseconds (default: 600)
 * @param initialOpacity - Starting opacity value (default: 0)
 * @param finalOpacity - Ending opacity value (default: 1)
 * 
 * @returns Object with animated style and opacity value
 * 
 * @example
 * ```tsx
 * const { animatedStyle } = useFadeInAnimation({ delay: 200 });
 * return <Animated.View style={animatedStyle}>Content</Animated.View>;
 * ```
 */

import { BaseComponentProps } from '@/types/common';

interface UseFadeInAnimationProps extends BaseComponentProps {
  delay?: number;
  duration?: number;
  initialOpacity?: number;
  finalOpacity?: number;
}

export function useFadeInAnimation({
  delay = 0,
  duration = 600,
  initialOpacity = 0,
  finalOpacity = 1,
}: UseFadeInAnimationProps = {}) {
  const opacity = useSharedValue(initialOpacity);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withTiming(finalOpacity, {
        duration,
        easing: Easing.out(Easing.cubic),
      })
    );
  }, [delay, duration, initialOpacity, finalOpacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return {
    animatedStyle,
    opacity,
  };
}
