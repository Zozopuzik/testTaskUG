/**
 * Tests for SelectorButton component
 */
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SelectorButton from '../../../src/components/ui/SelectorButton';

describe('SelectorButton', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    mockOnPress.mockClear();
  });

  it('should render with title', () => {
    const { getByText } = render(
      <SelectorButton
        buttonTitle="Test Button"
        isActive={false}
        onPress={mockOnPress}
      />
    );
    
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('should render as active when isActive is true', () => {
    const { getByText } = render(
      <SelectorButton
        buttonTitle="Active Button"
        isActive={true}
        onPress={mockOnPress}
      />
    );
    
    expect(getByText('Active Button')).toBeTruthy();
  });

  it('should render as inactive when isActive is false', () => {
    const { getByText } = render(
      <SelectorButton
        buttonTitle="Inactive Button"
        isActive={false}
        onPress={mockOnPress}
      />
    );
    
    expect(getByText('Inactive Button')).toBeTruthy();
  });

  it('should call onPress when pressed', () => {
    const { getByText } = render(
      <SelectorButton
        buttonTitle="Test Button"
        isActive={false}
        onPress={mockOnPress}
      />
    );
    
    const button = getByText('Test Button');
    fireEvent.press(button);
    
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('should render with different titles', () => {
    const { getByText } = render(
      <SelectorButton
        buttonTitle="Today"
        isActive={false}
        onPress={mockOnPress}
      />
    );
    
    expect(getByText('Today')).toBeTruthy();
  });

  it('should render with different titles', () => {
    const { getByText } = render(
      <SelectorButton
        buttonTitle="Today"
        isActive={false}
        onPress={mockOnPress}
      />
    );
    
    expect(getByText('Today')).toBeTruthy();
  });
});
