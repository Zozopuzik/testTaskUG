import { View } from 'react-native';
import React, { ReactNode } from 'react';

/**
 * Gap component
 * 
 * Creates consistent spacing between child elements with flexible direction and padding
 * 
 * @param size - Gap size between children (default: 20)
 * @param direction - Layout direction: 'horizontal' or 'vertical' (default: 'vertical')
 * @param paddingHorizontal - Horizontal padding for the container (default: 0)
 * @param paddingVertical - Vertical padding for the container (default: 0)
 * @param children - Child elements to be spaced
 * 
 * @example
 * ```tsx
 * <Gap size={16} direction="vertical">
 *   <Text>First item</Text>
 *   <Text>Second item</Text>
 * </Gap>
 * 
 * <Gap size={8} direction="horizontal" paddingHorizontal={16}>
 *   <Button title="Cancel" />
 *   <Button title="Save" />
 * </Gap>
 * ```
 */

import { BaseComponentProps } from '@/types/common';

interface GapProps extends BaseComponentProps {
  size: number;
  direction: 'horizontal' | 'vertical';
  paddingHorizontal?: number;
  paddingVertical?: number;
}

export default function Gap({
  size = 20,
  direction = 'vertical',
  paddingHorizontal = 0,
  paddingVertical = 0,
  children,
  testID,
}: GapProps) {
  return (
    <View
      testID={testID}
      style={[
        {
          flexDirection: direction === 'vertical' ? 'column' : 'row',
          gap: size,
          paddingHorizontal: paddingHorizontal,
          paddingVertical: paddingVertical,
        },
      ]}
    >
      {children}
    </View>
  );
}
