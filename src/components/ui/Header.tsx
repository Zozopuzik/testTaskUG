import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated from 'react-native-reanimated'
import { useFadeInAnimation } from '@/hooks/useFadeInAnimation'
import { useSlideInAnimation } from '@/hooks/useSlideInAnimation'

/**
 * Header component
 * 
 * Displays a centered title with fade-in and slide-down animation
 * 
 * @param title - Text content to display in the header
 * @param animated - Whether to show slide-in animation (default: true)
 * 
 * @example
 * ```tsx
 * <Header title="My Analytics" />
 * <Header title="Energy Level" />
 * ```
 */

interface HeaderProps {
    title: string,
    animated?: boolean,
}

export default function Header({ title, animated = true }: HeaderProps) {
  const { animatedStyle: fadeStyle } = useFadeInAnimation({
    delay: animated ? 200 : 0,
    duration: 600,
  });

  const { animatedStyle: slideStyle } = useSlideInAnimation({
    direction: 'top',
    delay: animated ? 200 : 0,
    duration: 600,
    distance: 20,
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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 14,
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        color: '#fff',
        letterSpacing: -0.32,
        lineHeight: 20,
    }
})