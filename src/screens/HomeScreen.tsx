/**
 * Home Screen
 * 
 * Main application screen displaying energy analytics with date selection and chart
 * Features animated components and data loading from stores
 * 
 * @example
 * ```tsx
 * <HomeScreen />
 * ```
 */
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useDatesStore } from '@/stores/datesStore';
import { useEnergyLevelStore } from '@/stores/energyLevelStore';

import BackgroundGradient from '@/components/ui/BackgroundGradient';
import Header from '@/components/ui/Header';
import Gap from '@/components/ui/Gap';
import Heading from '@/components/ui/Heading';
import DateSelector from '@/components/features/DateSelector';
import LineGradientChart from '@/components/features/LineGradientChart';
import EmptyData from '@/components/ui/EmptyData';

/** Today's date ID for special labeling in date selector (actually yesterday) */
const TODAY_DATE_ID = '22-01-2025';

/**
 * Home Screen Component
 * 
 * Renders the main analytics screen with:
 * - Animated header and heading
 * - Date selector with horizontal scrolling
 * - Energy level chart with gradient visualization
 * 
 * Manages data loading and state synchronization between stores
 * 
 * @returns JSX element with complete home screen layout
 */
function HomeScreen() {
  // Dates store for date selection functionality
  const { dates, selectedDate, isLoading, error, loadDates, selectDate } =
    useDatesStore();
  
  // Energy level store for chart data
  const { 
    energyData, 
    isLoading: isEnergyLoading, 
    error: energyError, 
    loadEnergyData 
  } = useEnergyLevelStore();

  // Load dates on mount
  useEffect(() => {
    loadDates();
  }, []);

  // Load energy data when selectedDate changes
  useEffect(() => {
    if (selectedDate && !isEnergyLoading) {
      loadEnergyData(selectedDate.id);
    }
  }, [selectedDate?.id]);

  const chartData = energyData?.rawData || [];
  const shouldShowDateSelector = !isLoading && selectedDate;
  const shouldShowChart = !isEnergyLoading && energyData && chartData.length > 0;
  const shouldShowEmptyData = !isEnergyLoading && selectedDate && (!energyData || chartData.length === 0);

  return (
    <SafeAreaView style={styles.container}>
      {/* Background gradient with app theme colors */}
      <BackgroundGradient colors={['#070709', '#161038']} />
      
      {/* Main content with consistent spacing */}
      <Gap size={20} direction="vertical" paddingHorizontal={16}>
        {/* Animated header with fade and slide effects */}
        <Header title="My analytics" />
        
        {/* Animated heading with slide-in from left */}
        <Heading title="Energy level" />
        
        {/* Date selector - only show when dates are loaded */}
        {shouldShowDateSelector && (
          <DateSelector
            dates={dates}
            selectedDate={selectedDate}
            onSelectDate={selectDate}
            todayDateId={TODAY_DATE_ID}
          />
        )}
        
        {/* Energy chart - only show when data is loaded */}
        {shouldShowChart && (
          <LineGradientChart 
            data={chartData} 
          />
        )}
        
        {/* Empty data state - show when no data available */}
        {shouldShowEmptyData && (
          <EmptyData 
            message="No energy data for this date"
            emoji="😔"
          />
        )}
      </Gap>
    </SafeAreaView>
  );
}

/**
 * Styles for Home Screen
 * 
 * Defines layout and visual styling for the home screen components
 */
const styles = StyleSheet.create({
  /** Main container with full screen height */
  container: {
    flex: 1,
  },
  /** Title text styling (unused - kept for reference) */
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  /** Subtitle text styling (unused - kept for reference) */
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  /** Error text styling (unused - kept for reference) */
  errorText: {
    color: '#ff6b6b',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  /** Energy text styling (unused - kept for reference) */
  energyText: {
    color: '#9C6FFF',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: '600',
  },
});

export default HomeScreen;