/**
 * Splash Screen
 *
 * Animated splash screen with logo, glowing effects, and app initialization
 * Features complex animations including scaling, rotation, pulsing, and glowing
 *
 * @example
 * ```tsx
 * <SplashScreen />
 * ```
 */
import React, { useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppStore } from '@stores/appStore';
import BackgroundGradient from '@/components/ui/BackgroundGradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'react-native-linear-gradient';

/** Screen dimensions for responsive design */
const { width, height } = Dimensions.get('window');

/**
 * Splash Screen Component
 *
 * Renders an animated splash screen with:
 * - Animated logo with scaling, rotation, and pulsing effects
 * - Glowing background with color transitions
 * - Text slide-in animation
 * - Automatic navigation to Home screen after 3 seconds
 *
 * Manages app initialization and navigation flow
 *
 * @returns JSX element with complete splash screen layout
 */
function SplashScreen() {
  const navigation = useNavigation();
  const { initializeApp } = useAppStore();

  // Animation values for different effects
  const logoScale = useSharedValue(0); // Logo scaling animation
  const logoOpacity = useSharedValue(0); // Logo fade-in animation
  const logoRotation = useSharedValue(0); // Logo rotation animation
  const pulseScale = useSharedValue(1); // Pulsing effect scale
  const glowOpacity = useSharedValue(0); // Glowing background opacity
  const textOpacity = useSharedValue(0); // Text fade-in animation
  const textTranslateY = useSharedValue(30); // Text slide-up animation

  /**
   * Start complex animation sequence
   *
   * Orchestrates multiple animations with different timings:
   * - Logo appears with scale, opacity, and rotation (200ms delay)
   * - Pulsing effect starts after logo appears (1000ms delay)
   * - Glowing background with breathing effect (1200ms delay)
   * - Text slides in from bottom (1500ms delay)
   */
  const startAnimations = useCallback(() => {
    try {
      // Logo entrance animation with bounce effect
      logoScale.value = withDelay(
        200,
        withTiming(1, { duration: 800, easing: Easing.out(Easing.back(1.2)) }),
      );
      logoOpacity.value = withDelay(200, withTiming(1, { duration: 600 }));
      logoRotation.value = withDelay(
        200,
        withTiming(360, { duration: 1000, easing: Easing.out(Easing.cubic) }),
      );

      // Continuous pulsing effect
      pulseScale.value = withDelay(
        1000,
        withRepeat(
          withSequence(
            withTiming(1.1, {
              duration: 1000,
              easing: Easing.inOut(Easing.sin),
            }),
            withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.sin) }),
          ),
          -1,
          true,
        ),
      );

      // Breathing glow effect
      glowOpacity.value = withDelay(
        1200,
        withRepeat(
          withSequence(
            withTiming(0.8, {
              duration: 1500,
              easing: Easing.inOut(Easing.sin),
            }),
            withTiming(0.3, {
              duration: 1500,
              easing: Easing.inOut(Easing.sin),
            }),
          ),
          -1,
          true,
        ),
      );

      // Text entrance animation
      textOpacity.value = withDelay(1500, withTiming(1, { duration: 600 }));
      textTranslateY.value = withDelay(
        1500,
        withTiming(0, { duration: 600, easing: Easing.out(Easing.cubic) }),
      );
    } catch (error) {
      console.log('Animation error:', error);
    }
  }, []);

  /**
   * Initialize animations and app on component mount
   *
   * Starts complex animation sequence and navigates to Home after 3 seconds
   */
  useEffect(() => {
    // Start animations immediately
    startAnimations();

    // Wait for animations to complete and initialize app
    const timer = setTimeout(async () => {
      await initializeApp();
      navigation.navigate('Home' as never);
    }, 3000);

    return () => clearTimeout(timer);
  }, [initializeApp, navigation, startAnimations]);

  /**
   * Animated style for logo with scaling, rotation, and pulsing
   *
   * Combines multiple animation values for complex logo effects
   */
  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: logoScale.value * pulseScale.value },
      { rotate: `${logoRotation.value}deg` },
    ],
    opacity: logoOpacity.value,
  }));

  /**
   * Animated style for glowing background effect
   *
   * Creates breathing glow effect with opacity and scale changes
   */
  const glowAnimatedStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
    transform: [{ scale: pulseScale.value }],
  }));

  /**
   * Animated style for text with fade and slide effects
   *
   * Creates smooth text entrance animation
   */
  const textAnimatedStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: textTranslateY.value }],
  }));

  return (
    <View style={styles.container}>
      {/* Background gradient with app theme colors */}
      <BackgroundGradient colors={['#070709', '#161038']} />

      {/* Animated glowing background with breathing effect */}
      <Animated.View style={[styles.glowContainer, glowAnimatedStyle]}>
        <LinearGradient
          colors={['#31E1FD20', '#9666FF20', '#FF539520']}
          style={styles.glowGradient}
        />
      </Animated.View>

      {/* Animated logo with scaling, rotation, and pulsing */}
      <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
        <LinearGradient
          colors={['#31E1FD', '#9666FF', '#FF5395']}
          style={styles.logoGradient}
        >
          <Text style={styles.logoText}>⚡</Text>
        </LinearGradient>
      </Animated.View>

      {/* Animated text with slide-in effect */}
      <Animated.View style={textAnimatedStyle}>
        <Text style={styles.title}>testTaskUG</Text>
        <Text style={styles.subtitle}>Energy Analytics</Text>
      </Animated.View>
    </View>
  );
}

/**
 * Styles for Splash Screen
 *
 * Defines layout and visual styling for the animated splash screen components
 */
const styles = StyleSheet.create({
  /** Main container with centered content */
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#070709',
  },
  /** Glowing background container with oversized dimensions */
  glowContainer: {
    position: 'absolute',
    width: width * 1.5,
    height: height * 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  /** Glowing gradient with circular shape */
  glowGradient: {
    width: '100%',
    height: '100%',
    borderRadius: width * 0.75,
  },
  /** Logo container with bottom margin */
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  /** Logo gradient with shadow and glow effects */
  logoGradient: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#31E1FD',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 20,
  },
  /** Logo text with large font size */
  logoText: {
    fontSize: 60,
    color: '#fff',
    fontWeight: 'bold',
  },
  /** Main title with glow effect */
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: '#31E1FD',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  /** Subtitle with accent color and letter spacing */
  subtitle: {
    fontSize: 16,
    color: '#9666FF',
    textAlign: 'center',
    fontWeight: '300',
    letterSpacing: 2,
  },
});

export default SplashScreen;
