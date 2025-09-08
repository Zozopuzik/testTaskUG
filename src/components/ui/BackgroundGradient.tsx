import { StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import React from 'react'



/**
 * Background gradient component
 * 
 * Renders a full-screen gradient background with customizable colors and angle
 * 
 * @param colors - Array of colors for the gradient
 * @param customAngle - Gradient angle in degrees (default: 180)
 * 
 * @example
 * ```tsx
 * <BackgroundGradient colors={['#070709', '#161038']} />
 * <BackgroundGradient colors={['#ff0000', '#00ff00']} customAngle={45} />
 * ```
 */


interface BackgroundGradientProps {
    colors: string[],
    customAngle?: number,
}


export default function BackgroundGradient({ colors=['#070709', '#161038'], customAngle = 180 }: BackgroundGradientProps) {
  return (
    <LinearGradient
      colors={[...colors]}
      style={styles.gradient}
      useAngle={true}
      angle={customAngle}
    />
  )
}

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }
})