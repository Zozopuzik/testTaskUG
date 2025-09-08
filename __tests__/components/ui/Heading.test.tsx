/**
 * Tests for Heading component
 */
import React from 'react';
import { render } from '@testing-library/react-native';
import Heading from '../../../src/components/ui/Heading';

describe('Heading', () => {
  it('should render with title', () => {
    const { getByText } = render(<Heading title="Test Heading" />);
    
    expect(getByText('Test Heading')).toBeTruthy();
  });

  it('should render with different title', () => {
    const { getByText } = render(<Heading title="Energy Level" />);
    
    expect(getByText('Energy Level')).toBeTruthy();
  });

  it('should render with empty title', () => {
    const { getByText } = render(<Heading title="" />);
    
    expect(getByText('')).toBeTruthy();
  });

  it('should have correct styling', () => {
    const { getByText } = render(<Heading title="Test" />);
    const titleElement = getByText('Test');
    
    expect(titleElement).toHaveStyle({
      fontSize: 24,
      fontWeight: '700',
      color: '#fff',
    });
  });
});
