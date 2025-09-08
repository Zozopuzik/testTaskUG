/**
 * Tests for DateSelector component
 */
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DateSelector from '../../../src/components/features/DateSelector';
import { DateItem } from '../../../src/mocks/datesData';

// Mock the animation hooks
jest.mock('../../../src/hooks/useFadeInAnimation', () => ({
  useFadeInAnimation: () => ({
    animatedStyle: { opacity: 1 },
  }),
}));

jest.mock('../../../src/hooks/useSlideInAnimation', () => ({
  useSlideInAnimation: () => ({
    animatedStyle: { transform: [{ translateY: 0 }] },
  }),
}));

const mockDates: DateItem[] = [
  { id: '20-01-2025', label: '20', value: '20/01/25', date: '20/01/25' },
  { id: '21-01-2025', label: '21', value: '21/01/25', date: '21/01/25' },
  { id: '22-01-2025', label: '22', value: '22/01/25', date: '22/01/25' },
  { id: '23-01-2025', label: '23', value: '23/01/25', date: '23/01/25' },
];

describe('DateSelector', () => {
  const mockOnSelectDate = jest.fn();

  beforeEach(() => {
    mockOnSelectDate.mockClear();
  });

  it('should render with dates', () => {
    const { getByText } = render(
      <DateSelector
        dates={mockDates}
        selectedDate={mockDates[1]}
        todayDateId="22-01-2025"
        onSelectDate={mockOnSelectDate}
      />
    );
    
    expect(getByText('Yesterday')).toBeTruthy();
    expect(getByText('Today')).toBeTruthy();
    expect(getByText('23/01/25')).toBeTruthy();
  });

  it('should render with empty dates array', () => {
    const { queryByText } = render(
      <DateSelector
        dates={[]}
        selectedDate={null}
        todayDateId="22-01-2025"
        onSelectDate={mockOnSelectDate}
      />
    );
    
    expect(queryByText('Today')).toBeNull();
  });

  it('should call onSelectDate when button is pressed', () => {
    const { getByText } = render(
      <DateSelector
        dates={mockDates}
        selectedDate={mockDates[1]}
        todayDateId="22-01-2025"
        onSelectDate={mockOnSelectDate}
      />
    );
    
    const todayButton = getByText('Today');
    fireEvent.press(todayButton);
    
    expect(mockOnSelectDate).toHaveBeenCalledWith('22-01-2025');
  });

  it('should show correct labels for today and yesterday', () => {
    const { getByText } = render(
      <DateSelector
        dates={mockDates}
        selectedDate={mockDates[1]}
        todayDateId="22-01-2025"
        onSelectDate={mockOnSelectDate}
      />
    );
    
    expect(getByText('Yesterday')).toBeTruthy();
    expect(getByText('Today')).toBeTruthy();
  });

  it('should show date strings for other days', () => {
    const { getByText } = render(
      <DateSelector
        dates={mockDates}
        selectedDate={mockDates[1]}
        todayDateId="22-01-2025"
        onSelectDate={mockOnSelectDate}
      />
    );
    
    expect(getByText('20/01/25')).toBeTruthy();
    expect(getByText('23/01/25')).toBeTruthy();
  });

  it('should handle null selectedDate', () => {
    const { getByText } = render(
      <DateSelector
        dates={mockDates}
        selectedDate={null}
        todayDateId="22-01-2025"
        onSelectDate={mockOnSelectDate}
      />
    );
    
    expect(getByText('Today')).toBeTruthy();
  });

  it('should render FlatList with correct props', () => {
    const { getByText } = render(
      <DateSelector
        dates={mockDates}
        selectedDate={mockDates[1]}
        todayDateId="22-01-2025"
        onSelectDate={mockOnSelectDate}
      />
    );
    
    // Note: FlatList doesn't have testID by default, so we check if it renders
    expect(getByText('Today')).toBeTruthy();
  });
});
