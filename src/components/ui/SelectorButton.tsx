import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

/**
 * SelectorButton component
 * 
 * A toggleable button with active/inactive states for selection interfaces
 * 
 * @param buttonTitle - Text content to display on the button
 * @param isActive - Whether the button is in active state
 * @param onPress - Callback function when button is pressed
 * 
 * @example
 * ```tsx
 * <SelectorButton 
 *   buttonTitle="Today" 
 *   isActive={true} 
 *   onPress={() => selectDate('today')} 
 * />
 * 
 * <SelectorButton 
 *   buttonTitle="22/01/25" 
 *   isActive={false} 
 *   onPress={() => selectDate('22-01-2025')} 
 * />
 * ```
 */

interface SelectorButtonProps {
  buttonTitle: string;
  isActive: boolean;
  onPress: () => void;
}

const btnColor = {
  inactive: '#C1C6FF1A',
  active: '#7E45FB59',
};

const btnTextColor = {
  inactive: '#fff',
  active: '#9C6FFF',
};

export default function SelectorButton({
  buttonTitle,
  isActive,
  onPress,
}: SelectorButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.buttonInactive,
        { backgroundColor: isActive ? btnColor.active : btnColor.inactive },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.buttonTitle,
          { color: isActive ? btnTextColor.active : btnTextColor.inactive },
        ]}
      >
        {buttonTitle}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonInactive: {
    width: 100,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    borderRadius: 16,
  },

  buttonTitle: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '500',
    letterSpacing: 0.16,
    textTransform: 'uppercase',
  },
});
