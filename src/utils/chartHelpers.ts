
/**
 * Chart helper utilities for generating SVG paths and processing data
 * 
 * Provides functions for processing energy level data, generating grid lines,
 * and creating SVG paths for charts using d3-shape
 * 
 * @example
 * ```typescript
 * const processedData = processChartData(energyData);
 * const gridLines = generateGridLines(energyData);
 * const path = buildLinePath(processedData, width, height);
 * ```
 */
import * as d3 from 'd3-shape';

/**
 * Chart point interface
 * 
 * Represents a single point on the chart with coordinates and metadata
 */
export interface ChartPoint {
  x: number;
  y: number;
  value: number;
  originalValue: string;
}

/**
 * Chart configuration interface
 * 
 * Defines dimensions and padding for chart rendering
 */
export interface ChartConfig {
  width: number;
  height: number;
  padding: number;
}


/** Energy level ordering for sorting */
const ORDER = { Low: 1, Medium: 2, High: 3 } as const;

/**
 * Converts energy level string to numeric value
 * 
 * @param value - Energy level string ('High', 'Medium', 'Low')
 * @returns Numeric value for chart positioning
 */
const getEnergyValue = (value: string): number => {
  switch (value) {
    case 'High': return 2;
    case 'Medium': return 1;
    case 'Low': return 0;
    default: return 0;
  }
};

/**
 * Gets color for energy level point
 * 
 * @param value - Energy level string ('High', 'Medium', 'Low')
 * @returns Hex color code for the energy level
 */
const getEnergyColor = (value: string): string => {
  switch (value) {
    case 'High': return '#31E1FD';
    case 'Medium': return '#9666FF';
    case 'Low': return '#FF5395';
    default: return '#9666FF';
  }
};

/**
 * Processes raw energy data into chart-ready format
 * 
 * Converts energy level strings to numeric values and adds colors
 * 
 * @param data - Array of energy level objects with 'value' property
 * @returns Array of chart points with x, y coordinates and colors
 * 
 * @example
 * ```typescript
 * const data = [{ value: 'High' }, { value: 'Medium' }];
 * const processed = processChartData(data);
 * // Result: [{ x: 0, y: 2, color: '#31E1FD' }, { x: 1, y: 1, color: '#9666FF' }]
 * ```
 */
export const processChartData = (data: any[]): any[] => {
  return data.map((item, index) => {
    return {
      x: index,
      y: getEnergyValue(item.value),
      color: getEnergyColor(item.value),
    };
  });
};

/**
 * Generates sorted grid lines from energy data
 * 
 * Extracts unique energy levels and sorts them by priority
 * 
 * @param data - Array of energy level objects
 * @returns Sorted array of unique energy level strings
 * 
 * @example
 * ```typescript
 * const data = [{ value: 'High' }, { value: 'Low' }, { value: 'Medium' }];
 * const gridLines = generateGridLines(data);
 * // Result: ['Low', 'Medium', 'High']
 * ```
 */
export const generateGridLines = (data: any[]): any[] => {
  const gridLines = [];
  for (const element of data) {
    gridLines.push(element?.value);
  }
  const uniqueValues = Array.from(new Set(gridLines));
  return uniqueValues.sort((a, b) => ORDER[a as keyof typeof ORDER] - ORDER[b as keyof typeof ORDER]);
};

/**
 * Builds SVG path string for line chart using d3-shape
 * 
 * Creates a smooth curved line path from chart points with automatic scaling
 * 
 * @param points - Array of chart points with x, y coordinates
 * @param width - Chart width in pixels
 * @param height - Chart height in pixels
 * @returns SVG path string or empty string if invalid input
 * 
 * @example
 * ```typescript
 * const points = [{ x: 0, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 0 }];
 * const path = buildLinePath(points, 300, 200);
 * // Result: "M0,100L150,50L300,200"
 * ```
 */
export function buildLinePath(
  points: { x: number; y: number }[],
  width: number,
  height: number
): string {
  if (!points?.length || !width || !height) return '';

  // Auto-scale: if max value <= 1, treat as normalized data
  const maxY = Math.max(...points.map(p => p.y));
  const yMax = maxY <= 1 ? 1 : maxY;
  const yMin = Math.min(...points.map(p => p.y));

  // X coordinate function: distribute points evenly across width
  const xFn = (_d: any, i: number) =>
    (i / Math.max(1, points.length - 1)) * width;

  // Y coordinate function: scale to height with proper orientation
  const yFn = (d: { y: number }) =>
    height - ((d.y - yMin) / Math.max(1e-6, (yMax - yMin))) * height;

  // Create smooth curved line using d3
  const line = d3.line<{ x: number; y: number }>()
    .x(xFn)
    .y(yFn)
    .curve(d3.curveBasis);

  return line(points) || '';
}


