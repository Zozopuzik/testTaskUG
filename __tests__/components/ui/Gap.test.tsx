/**
 * Tests for Gap component
 */
import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import Gap from '../../../src/components/ui/Gap';

describe('Gap', () => {
  it('should render children', () => {
    const { getByText } = render(
      <Gap size={10} direction="vertical">
        <Text>Test Content</Text>
      </Gap>
    );
    
    expect(getByText('Test Content')).toBeTruthy();
  });

  it('should render with vertical direction', () => {
    const { getByTestId } = render(
      <Gap size={20} direction="vertical" testID="gap">
        <Text>Test</Text>
      </Gap>
    );
    
    const gapElement = getByTestId('gap');
    expect(gapElement).toHaveStyle({
      flexDirection: 'column',
      gap: 20,
    });
  });

  it('should render with horizontal direction', () => {
    const { getByTestId } = render(
      <Gap size={15} direction="horizontal" testID="gap">
        <Text>Test</Text>
      </Gap>
    );
    
    const gapElement = getByTestId('gap');
    expect(gapElement).toHaveStyle({
      flexDirection: 'row',
      gap: 15,
    });
  });

  it('should apply paddingHorizontal when provided', () => {
    const { getByTestId } = render(
      <Gap size={10} direction="vertical" paddingHorizontal={16} testID="gap">
        <Text>Test</Text>
      </Gap>
    );
    
    const gapElement = getByTestId('gap');
    expect(gapElement).toHaveStyle({
      paddingHorizontal: 16,
    });
  });

  it('should render without paddingHorizontal', () => {
    const { getByTestId } = render(
      <Gap size={10} direction="vertical" testID="gap">
        <Text>Test</Text>
      </Gap>
    );
    
    const gapElement = getByTestId('gap');
    expect(gapElement).toHaveStyle({
      paddingHorizontal: 0,
    });
  });
});
