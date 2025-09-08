/**
 * Tests for chart helper utilities
 */
// Mock d3-shape before importing chartHelpers
jest.mock('d3-shape', () => ({
  line: () => ({
    x: () => ({
      y: () => ({
        curve: () => (points: any[]) => {
          if (!points || points.length === 0) return '';
          return points.map((point: any, index: number) => 
            index === 0 ? `M${point.x},${point.y}` : `L${point.x},${point.y}`
          ).join('');
        }
      })
    })
  }),
  curveBasis: 'basis'
}));

import {
  processChartData,
  generateGridLines,
  buildLinePath,
} from '../../src/utils/chartHelpers';

describe('chartHelpers', () => {
  describe('processChartData', () => {
    it('should process energy level data correctly', () => {
      const mockData = [
        { value: 'High' },
        { value: 'Medium' },
        { value: 'Low' },
      ];

      const result = processChartData(mockData);

      expect(result).toHaveLength(3);
      expect(result[0]).toEqual({
        x: 0,
        y: 2,
        color: '#31E1FD',
      });
      expect(result[1]).toEqual({
        x: 1,
        y: 1,
        color: '#9666FF',
      });
      expect(result[2]).toEqual({
        x: 2,
        y: 0,
        color: '#FF5395',
      });
    });

    it('should handle empty array', () => {
      const result = processChartData([]);
      expect(result).toEqual([]);
    });

    it('should handle unknown energy levels', () => {
      const mockData = [
        { value: 'Unknown' },
        { value: 'High' },
      ];

      const result = processChartData(mockData);

      expect(result[0]).toEqual({
        x: 0,
        y: 0,
        color: '#9666FF',
      });
      expect(result[1]).toEqual({
        x: 1,
        y: 2,
        color: '#31E1FD',
      });
    });
  });

  describe('generateGridLines', () => {
    it('should generate sorted grid lines', () => {
      const mockData = [
        { value: 'High' },
        { value: 'Low' },
        { value: 'Medium' },
        { value: 'High' },
      ];

      const result = generateGridLines(mockData);

      expect(result).toEqual(['Low', 'Medium', 'High']);
    });

    it('should handle empty array', () => {
      const result = generateGridLines([]);
      expect(result).toEqual([]);
    });

    it('should handle single item', () => {
      const mockData = [{ value: 'Medium' }];
      const result = generateGridLines(mockData);
      expect(result).toEqual(['Medium']);
    });
  });

  describe('buildLinePath', () => {
    it('should build SVG path for valid points', () => {
      const points = [
        { x: 0, y: 1 },
        { x: 1, y: 2 },
        { x: 2, y: 0 },
      ];
      const width = 300;
      const height = 200;

      const result = buildLinePath(points, width, height);

      expect(result).toBeTruthy();
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should return empty string for empty points', () => {
      const result = buildLinePath([], 300, 200);
      expect(result).toBe('');
    });

    it('should return empty string for invalid dimensions', () => {
      const points = [{ x: 0, y: 1 }];
      const result = buildLinePath(points, 0, 200);
      expect(result).toBe('');
    });

    it('should handle single point', () => {
      const points = [{ x: 0, y: 1 }];
      const width = 300;
      const height = 200;

      const result = buildLinePath(points, width, height);

      expect(result).toBeTruthy();
      expect(typeof result).toBe('string');
    });

    it('should handle normalized data (y <= 1)', () => {
      const points = [
        { x: 0, y: 0.5 },
        { x: 1, y: 0.8 },
        { x: 2, y: 0.2 },
      ];
      const width = 300;
      const height = 200;

      const result = buildLinePath(points, width, height);

      expect(result).toBeTruthy();
      expect(typeof result).toBe('string');
    });
  });
});
