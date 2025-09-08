/**
 * Line Gradient Chart Component
 * 
 * Renders an animated gradient line chart with energy level data
 * 
 * @example
 * ```tsx
 * <LineGradientChart data={energyLevelData} />
 * ```
 */
import { StyleSheet } from 'react-native';
import React, { useMemo, useCallback } from 'react';
import { processChartData } from '@/utils/chartHelpers';
import GradientChart from '@/components/ui/GradientChart';
import Animated from 'react-native-reanimated';
import { useFadeInAnimation } from '@/hooks/useFadeInAnimation';
import { useScaleAnimation } from '@/hooks/useScaleAnimation';

/**
 * Line gradient chart component props
 * 
 * Defines the interface for line gradient chart component properties
 */
interface LineGradientChartProps {
  /** Array of energy level data objects */
  data: any[];
}

/**
 * Line Gradient Chart Component
 * 
 * Renders an animated gradient line chart with scale and fade animations
 * Only renders when data is available and not empty
 * 
 * @param data - Array of energy level data objects
 * @returns JSX element or null if no data available
 */
export default function LineGradientChart({ data }: LineGradientChartProps) {
  // Process raw data into chart-ready format
  const processedData = useMemo(() => processChartData(data), [data]);

  // Memoize animation configurations to prevent recreation
  const scaleAnimationConfig = useMemo(() => ({
    delay: 0,
    duration: 600,
    initialScale: 0.8,
    finalScale: 1,
  }), []);

  const fadeAnimationConfig = useMemo(() => ({
    delay: 0,
    duration: 800,
  }), []);

  // Scale animation for container (bounce effect)
  const { animatedStyle: containerStyle } = useScaleAnimation(scaleAnimationConfig);

  // Fade animation for chart content
  const { animatedStyle: chartStyle } = useFadeInAnimation(fadeAnimationConfig);

  // Don't render if no data available
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <Animated.View style={chartStyle}>
        <GradientChart data={processedData} />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%' },
});
