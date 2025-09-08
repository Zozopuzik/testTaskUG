/**
 * Tests for EmptyData component
 */
import React from 'react';
import { render } from '@testing-library/react-native';
import EmptyData from '../../../src/components/ui/EmptyData';

describe('EmptyData', () => {
  it('should render with default props', () => {
    const { getByText } = render(<EmptyData />);
    
    expect(getByText('No data available')).toBeTruthy();
    expect(getByText('😔')).toBeTruthy();
    expect(getByText('Try selecting a different date')).toBeTruthy();
  });

  it('should render with custom message', () => {
    const { getByText } = render(
      <EmptyData message="No energy data for this date" />
    );
    
    expect(getByText('No energy data for this date')).toBeTruthy();
    expect(getByText('😔')).toBeTruthy();
    expect(getByText('Try selecting a different date')).toBeTruthy();
  });

  it('should render with custom emoji', () => {
    const { getByText } = render(
      <EmptyData emoji="😢" />
    );
    
    expect(getByText('No data available')).toBeTruthy();
    expect(getByText('😢')).toBeTruthy();
    expect(getByText('Try selecting a different date')).toBeTruthy();
  });

  it('should render with custom message and emoji', () => {
    const { getByText } = render(
      <EmptyData message="Custom message" emoji="🤷‍♂️" />
    );
    
    expect(getByText('Custom message')).toBeTruthy();
    expect(getByText('🤷‍♂️')).toBeTruthy();
    expect(getByText('Try selecting a different date')).toBeTruthy();
  });

  it('should have correct styling', () => {
    const { getByText } = render(<EmptyData />);
    
    const emoji = getByText('😔');
    const message = getByText('No data available');
    const subtitle = getByText('Try selecting a different date');
    
    expect(emoji).toHaveStyle({
      fontSize: 48,
      marginBottom: 16,
    });
    
    expect(message).toHaveStyle({
      fontSize: 18,
      fontWeight: '600',
      color: '#fff',
      textAlign: 'center',
      marginBottom: 8,
    });
    
    expect(subtitle).toHaveStyle({
      fontSize: 14,
      color: '#999',
      textAlign: 'center',
      fontStyle: 'italic',
    });
  });
});
