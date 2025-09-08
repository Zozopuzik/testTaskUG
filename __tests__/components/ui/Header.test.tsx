/**
 * Tests for Header component
 */
import React from 'react';
import { render } from '@testing-library/react-native';
import Header from '../../../src/components/ui/Header';

describe('Header', () => {
  it('should render with title', () => {
    const { getByText } = render(<Header title="Test Title" />);
    
    expect(getByText('Test Title')).toBeTruthy();
  });

  it('should render with different title', () => {
    const { getByText } = render(<Header title="My Analytics" />);
    
    expect(getByText('My Analytics')).toBeTruthy();
  });

  it('should render with empty title', () => {
    const { getByText } = render(<Header title="" />);
    
    expect(getByText('')).toBeTruthy();
  });

  it('should have correct styling', () => {
    const { getByText } = render(<Header title="Test" />);
    const titleElement = getByText('Test');
    
    expect(titleElement).toHaveStyle({
      fontSize: 16,
      fontWeight: '500',
      color: '#fff',
    });
  });
});
