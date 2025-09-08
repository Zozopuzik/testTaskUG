import { StyleSheet, Text } from 'react-native'
import React from 'react'
import Animated from 'react-native-reanimated'
import { useFadeInAnimation } from '@/hooks/useFadeInAnimation'
import { useSlideInAnimation } from '@/hooks/useSlideInAnimation'

/**
 * Heading component
 * 
 * Displays a large title with optional slide-in animation from the left
 * 
 * @param title - Text content to display as heading
 * @param animated - Whether to show slide-in animation (default: true)
 * 
 * @example
 * ```tsx
 * <Heading title="Energy Level" />
 * <Heading title="Analytics" animated={false} />
 * ```
 */

interface HeadingProps {
    title: string,
    animated?: boolean,
}
export default function Heading({ title, animated = true }: HeadingProps) {
  const { animatedStyle: fadeStyle } = useFadeInAnimation({
    delay: animated ? 400 : 0,
    duration: 600,
  });

  const { animatedStyle: slideStyle } = useSlideInAnimation({
    direction: 'left',
    delay: animated ? 400 : 0,
    duration: 600,
    distance: 30,
  });

  const animatedStyle = animated ? [fadeStyle, slideStyle] : {};

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Text style={styles.title}>{title}</Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    title: {
        fontSize: 24,
        lineHeight: 30,
        fontWeight: '700',
        color: '#fff',
        letterSpacing: 0.34,
    }
})