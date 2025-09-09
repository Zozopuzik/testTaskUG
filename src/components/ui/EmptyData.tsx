/**
 * Empty Data Component
 *
 * Displays a card with sad emoji and message when no data is available
 *
 * @example
 * ```tsx
 * <EmptyData message="No energy data available" />
 * ```
 */
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { LinearGradient } from 'react-native-linear-gradient';

import { BaseComponentProps } from '@/types/common';

/**
 * Empty data component props
 */
interface EmptyDataProps extends BaseComponentProps {
  /** Custom message to display */
  message?: string;
  /** Custom emoji to display */
  emoji?: string;
}

/**
 * Empty Data Component
 *
 * Renders a card with sad emoji and message when no data is available
 *
 * @param message - Custom message to display (default: "No data available")
 * @param emoji - Custom emoji to display (default: "😔")
 * @returns JSX element with empty state card
 */
export default function EmptyData({
  message = 'No data available',
  emoji = '😔',
}: EmptyDataProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.message}>{message}</Text>
      <Text style={styles.subtitle}>Try selecting a different date</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  /** Main container with padding */

  /** Card with gradient background and rounded corners */
  card: {
    borderRadius: 16,
    width: '100%',
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  /** Large emoji text */
  emoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  /** Main message text */
  message: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  /** Subtitle text with hint */
  subtitle: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
