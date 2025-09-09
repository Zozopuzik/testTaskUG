/**
 * Date Selector Component
 * 
 * Horizontal scrollable list of date buttons with automatic scrolling to selected date
 * 
 * @example
 * ```tsx
 * <DateSelector
 *   dates={availableDates}
 *   selectedDate={currentDate}
 *   todayDateId="22-01-2025"
 *   onSelectDate={handleDateSelect}
 * />
 * ```
 */
import { FlatList, StyleSheet } from 'react-native';
import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import { DateItem } from '@/types/common';
import SelectorButton from '@/components/ui/SelectorButton';
import Animated from 'react-native-reanimated';
import { useFadeInAnimation } from '@/hooks/useFadeInAnimation';
import { useSlideInAnimation } from '@/hooks/useSlideInAnimation';

/** Width of each date button card */
const CARD_WIDTH = 100;
/** Gap between date buttons */
const CARD_GAP = 10;

/**
 * Date selector component props
 * 
 * Defines the interface for date selector component properties
 */
interface DateSelectorProps {
  /** Array of available dates for selection */
  dates: DateItem[];
  /** Currently selected date object or null if none selected */
  selectedDate: DateItem | null;
  /** ID of today's date for special labeling */
  todayDateId: string;
  /** Callback function when a date is selected */
  onSelectDate: (id: string) => void;
}
/**
 * Date Selector Component
 * 
 * Renders a horizontal scrollable list of date buttons with animations
 * and automatic scrolling to the selected date
 * 
 * @param dates - Array of available dates
 * @param selectedDate - Currently selected date object
 * @param todayDateId - ID of today's date for special labeling
 * @param onSelectDate - Callback when date is selected
 * @returns JSX element or null if no dates available
 */
export default function DateSelector({
  dates,
  selectedDate,
  onSelectDate,
  todayDateId,
}: DateSelectorProps) {
  const flatListRef = useRef<FlatList>(null);

  // Memoize animation configurations to prevent recreation
  const fadeAnimationConfig = useMemo(() => ({
    delay: 600,
    duration: 600,
  }), []);

  const slideAnimationConfig = useMemo(() => ({
    direction: 'bottom' as const,
    delay: 600,
    duration: 600,
    distance: 30,
  }), []);

  // Fade-in animation with 600ms delay
  const { animatedStyle: fadeStyle } = useFadeInAnimation(fadeAnimationConfig);

  // Slide-in animation from bottom with 600ms delay
  const { animatedStyle: slideStyle } = useSlideInAnimation(slideAnimationConfig);

  /**
   * Get item layout for FlatList optimization
   * 
   * @param _ - Unused data parameter
   * @param index - Item index
   * @returns Layout object with length, offset, and index
   */
  const getItemLayout = useCallback((_: any, index: number) => ({
    length: CARD_WIDTH,
    offset: (CARD_WIDTH + CARD_GAP) * index,
    index,
  }), []);

  /**
   * Get yesterday date ID
   * 
   * @returns Yesterday date ID or null if today date ID is not found
   */
  
  const getYesterdayDate = useCallback(() => {
    const todayIndex = dates.findIndex(item => item.id === todayDateId);
    if (todayIndex === -1) return null;
    const yesterdayId = dates[todayIndex - 1].id
    return yesterdayId;
  }, [dates, todayDateId]);
  
  const yesterdayDateId = getYesterdayDate();

  /**
   * Scroll to the currently selected date
   * 
   * Calculates offset and scrolls to the selected date position
   */
  const scrollToSelectedDate = useCallback(() => {
    if (!selectedDate) return;
    const selectedIndex = dates.findIndex(item => item.id === selectedDate.id);
    if (selectedIndex !== -1) {
      flatListRef.current?.scrollToOffset({
        offset: (CARD_WIDTH + CARD_GAP) * selectedIndex,
        animated: true,
      });
    }
  }, [selectedDate, dates]);

  // Auto-scroll to selected date when dates or selectedDate changes
  useEffect(() => {
    if (dates.length > 0) {
      scrollToSelectedDate();
    }
  }, [dates, selectedDate, scrollToSelectedDate]);

  // Memoize combined animation styles
  const animatedStyle = useMemo(() => [fadeStyle, slideStyle], [fadeStyle, slideStyle]);

  if (dates.length === 0) {
    return null;
  }

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <FlatList
        ref={flatListRef}
        data={dates}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        getItemLayout={getItemLayout}
        style={{ height: 68 }}
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item }) => (
          <SelectorButton
            buttonTitle={item.id === todayDateId ? 'Today' : item.id === yesterdayDateId ? 'Yesterday' : item.date}
            isActive={selectedDate ? item.id === selectedDate.id : false}
            onPress={() => onSelectDate(item.id)}
          />
        )}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  contentContainer: {
    gap: 10,
    paddingVertical: 10,
  },
});
