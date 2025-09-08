/**
 * Gradient Chart Component
 * 
 * Animated SVG line chart with gradient fill and stroke, grid lines, and smooth curves
 * 
 * @example
 * ```tsx
 * <GradientChart 
 *   data={chartData} 
 *   width={343} 
 *   height={178}
 *   labels={["High", "Medium", "Low"]}
 * />
 * ```
 */
import React, { useMemo, useRef, useEffect, useState } from "react";
import { View } from "react-native";
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Path,
  Rect,
  Line,
  Circle,
  Text as SvgText,
} from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  interpolate,
  Easing,
} from "react-native-reanimated";

/**
 * Chart point type
 * 
 * Represents a single point on the chart with coordinates and color
 */
type Pt = { x: number; y: number; color: string };

/**
 * Gradient chart component props
 * 
 * Defines the interface for gradient chart component properties
 */
type Props = {
  /** Array of chart points with coordinates and colors */
  data: Pt[];
  /** Chart width in pixels (default: 343) */
  width?: number;
  /** Chart height in pixels (default: 178) */
  height?: number;
  /** Padding around chart content (default: 34) */
  padding?: number;
  /** Maximum Y value for scaling (auto-calculated if not provided) */
  yMax?: number;
  /** Number of grid rows (default: 3) */
  gridRows?: number;
  /** Labels for Y-axis from top to bottom (default: ["High", "Medium", "Low"]) */
  labels?: [string, string, string];
  /** Left gutter for labels (default: 72) */
  labelGutter?: number;
  /** Right gutter for chart area (default: 20) */
  rightGutter?: number;
  /** Stroke width for the line (default: 3) */
  strokeWidth?: number;
  /** Radius of the end dot (default: 8) */
  dotRadius?: number;
  /** Animation durations in milliseconds */
  durations?: { ui?: number; line?: number; delayBetween?: number };
};

/**
 * Utility function to clamp value between min and max
 * 
 * @param v - Value to clamp
 * @param a - Minimum value
 * @param b - Maximum value
 * @returns Clamped value
 */
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

/**
 * Build smooth SVG path using Catmull-Rom spline converted to cubic Bezier
 * 
 * Creates smooth curves between points for better visual appearance
 * 
 * @param points - Array of points with x, y coordinates
 * @param tension - Curve tension factor (default: 0.5)
 * @returns SVG path string
 */
function buildSmoothPath(points: { x: number; y: number }[], tension = 0.5) {
  if (!points.length) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
  const p = points;
  let d = `M ${p[0].x} ${p[0].y}`;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] || p[i];
    const p1 = p[i];
    const p2 = p[i + 1];
    const p3 = p[i + 2] || p[i + 1];
    const t = tension;
    const cp1x = p1.x + ((p2.x - p0.x) / 6) * t * 3;
    const cp1y = p1.y + ((p2.y - p0.y) / 6) * t * 3;
    const cp2x = p2.x - ((p3.x - p1.x) / 6) * t * 3;
    const cp2y = p2.y - ((p3.y - p1.y) / 6) * t * 3;
    d += ` C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${p2.x} ${p2.y}`;
  }
  return d;
}

/**
 * Animated SVG components for React Native Reanimated
 * 
 * Wraps SVG elements to enable animated properties
 */
const ARect = Animated.createAnimatedComponent(Rect);
const ALine = Animated.createAnimatedComponent(Line);
const APath = Animated.createAnimatedComponent(Path);
const ACircle = Animated.createAnimatedComponent(Circle);

/**
 * Gradient Chart Component
 * 
 * Renders an animated SVG line chart with gradient fill and stroke
 * Features smooth curves, grid lines, labels, and sequential animations
 * 
 * @param data - Array of chart points with coordinates and colors
 * @param width - Chart width in pixels (default: 343)
 * @param height - Chart height in pixels (default: 178)
 * @param padding - Padding around chart content (default: 34)
 * @param yMax - Maximum Y value for scaling (auto-calculated if not provided)
 * @param gridRows - Number of grid rows (default: 3)
 * @param labels - Labels for Y-axis from top to bottom (default: ["High", "Medium", "Low"])
 * @param labelGutter - Left gutter for labels (default: 72)
 * @param rightGutter - Right gutter for chart area (default: 20)
 * @param strokeWidth - Stroke width for the line (default: 3)
 * @param dotRadius - Radius of the end dot (default: 8)
 * @param durations - Animation durations in milliseconds
 * @returns JSX element with animated chart
 */
export default function LineGradientChartAnimated({
  data,
  width = 343,
  height = 178,
  padding = 34,
  yMax,
  gridRows = 3,
  labels = ["High", "Medium", "Low"],
  labelGutter = 72,
  rightGutter = 20,
  strokeWidth = 3,
  dotRadius = 8,
  durations = { ui: 400, line: 1200, delayBetween: 120 },
}: Props) {
  // Sort points by x-coordinate for proper line drawing
  const pts = useMemo(() => (data ?? []).slice().sort((a, b) => a.x - b.x), [data]);

  // Calculate X domain (min/max x values)
  const domainX = useMemo(
    () => ({ min: pts[0]?.x ?? 0, max: pts[pts.length - 1]?.x ?? 1 }),
    [pts],
  );
  
  // Calculate Y domain (min/max y values)
  const domainY = useMemo(
    () => ({ min: 0, max: yMax ?? Math.max(1, ...pts.map((p) => p.y)) }),
    [pts, yMax],
  );

  // Chart dimensions
  const W = width;
  const H = height;
  const innerW = W - padding  - labelGutter - rightGutter;
  const innerH = H - padding * 2;

  /**
   * Scale X coordinate to chart position
   * 
   * @param x - Data x coordinate
   * @returns Scaled x position in pixels
   */
  const scaleX = (x: number) =>
    padding +
    labelGutter +
    ((x - domainX.min) / (domainX.max - domainX.min || 1)) * innerW;

  /**
   * Scale Y coordinate to chart position
   * 
   * @param y - Data y coordinate
   * @returns Scaled y position in pixels
   */
  const scaleY = (y: number) =>
    padding +
    innerH -
    (clamp(y, domainY.min, domainY.max) / (domainY.max - domainY.min || 1)) *
      innerH;

  // Project data points to chart coordinates
  const proj = pts.map((p) => ({ x: scaleX(p.x), y: scaleY(p.y), color: p.color }));

  // Generate smooth line path
  const linePath = useMemo(() => buildSmoothPath(proj), [proj]);
  
  // Generate area fill path (line + bottom closure)
  const areaPath = useMemo(() => {
    if (!proj.length) return "";
    const first = proj[0];
    const last = proj[proj.length - 1];
    return `${buildSmoothPath(proj)} L ${last.x} ${padding + innerH} L ${first.x} ${
      padding + innerH
    } Z`;
  }, [proj, innerH, padding]);

  // Generate gradient stops for stroke based on data points
  const strokeStops = useMemo(() => {
    const span = domainX.max - domainX.min || 1;
    return pts.map((p) => ({
      offset: ((p.x - domainX.min) / span) * 100,
      color: p.color,
    }));
  }, [pts, domainX]);

  const last = proj[proj.length - 1];

  // Generate grid rows and labels
  const rows = useMemo(() => {
    return Array.from({ length: gridRows }, (_, i) => {
      const frac = i / (gridRows - 1); // 0..1
      const yVal = domainY.max - frac * (domainY.max - domainY.min);
      return { y: scaleY(yVal), label: labels[i] ?? "" };
    });
  }, [gridRows, labels, domainY, scaleY]);

  // === ANIMATIONS ===
  const uiOpacity = useSharedValue(0);    // Card + grid lines
  const progress = useSharedValue(0);     // Line drawing progress 0..1

  // Path length for dash animation (from ref Path)
  const pathRef = useRef<any>(null);
  const [pathLen, setPathLen] = useState(0);

  /**
   * Start sequential animation sequence: UI -> Line
   * 
   * 1. Fade in UI elements (card, grid, labels)
   * 2. Calculate path length and animate line drawing
   */
  useEffect(() => {
    uiOpacity.value = 0;
    progress.value = 0;

    // 1) Fade in UI elements
    uiOpacity.value = withTiming(1, {
      duration: durations.ui,
      easing: Easing.out(Easing.cubic),
    });

    // 2) After small delay, calculate length and draw line
    const id = requestAnimationFrame(() => {
      const len = pathRef.current?.getTotalLength?.() ?? 0;
      setPathLen(len);
      // Delay between phases
      setTimeout(() => {
        progress.value = withTiming(1, {
          duration: durations.line,
          easing: Easing.out(Easing.cubic),
        });
      }, durations.delayBetween);
    });

    return () => cancelAnimationFrame(id);
  }, [linePath, durations, uiOpacity, progress]);

  // Common opacity animation for UI elements
  const uiProps = useAnimatedProps(() => ({ opacity: uiOpacity.value }));

  // Line: dashoffset from len -> 0 (drawing effect)
  const lineProps = useAnimatedProps(() => {
    const len = pathLen || 1;
    const dashOffset = interpolate(progress.value, [0, 1], [len, 0]);
    return {
      strokeDasharray: [len, len] as unknown as string,
      strokeDashoffset: dashOffset,
    };
  }, [pathLen]);

  // Fill: appears together with line
  const fillProps = useAnimatedProps(() => ({ opacity: progress.value }));

  return (
    <View style={{ width: W, height: H }}>
      <Svg width={W} height={H}>
      <Defs>
          {/* stroke gradient left→right */}
          <LinearGradient id="strokeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            {strokeStops.map((s, i) => (
              <Stop key={i} offset={`${s.offset}%`} stopColor={s.color} />
          ))}
        </LinearGradient>

          {/* fill gradient bottom→top */}
          <LinearGradient id="fillGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <Stop offset="0%" stopColor="#FF5395" stopOpacity={0.22} />
            <Stop offset="50%" stopColor="#9666FF" stopOpacity={0.18} />
            <Stop offset="100%" stopColor="#31E1FD" stopOpacity={0.12} />
        </LinearGradient>
      </Defs>

        {/* Card background (appears) */}
        <ARect
          animatedProps={uiProps}
          x={0}
          y={0}
          width={W}
          height={H}
          rx={22}
          fill="rgba(193, 198, 255, 0.06)"
        />

        {/* Grid and Labels (appear together with card) */}
        {rows.map((r, i) => (
          <React.Fragment key={i}>
            <ALine
              animatedProps={uiProps}
              x1={padding + labelGutter}
              x2={W - padding - rightGutter}
              y1={r.y}
              y2={r.y}
              stroke="#7C7C8A"
              strokeDasharray="8 8"
              strokeWidth={1}
              opacity={0.35}
            />
            {/* SvgText doesn't support animatedProps - manage common uiOpacity through group opacity Rect/Line;
                text is drawn statically, but visually appears together with the background (since the background appears under it).
                If you need to actually "fade" the text, you can wrap it in <G opacity={uiOpacity.value} /> through reanimated v3 group props. */}
            <SvgText
              x={padding}
              y={r.y - 8}
              fill="#BDBDC7"
              fontSize={16}
              textAnchor="start"
              opacity={0.9}
            >
              {r.label}
            </SvgText>
          </React.Fragment>
        ))}

        {/* FILL UNDER CURVE — appears with progress */}
        <APath d={areaPath} fill="url(#fillGrad)" animatedProps={fillProps} />

        {/* LINE — "drawn" from left to right */}
        <APath
          ref={pathRef}
          d={linePath}
          stroke="url(#strokeGrad)"
          strokeWidth={strokeWidth}
        fill="none"
          strokeLinecap="round"
          animatedProps={lineProps}
        />

        {/* CIRCLE AT END — appears after the line */}
        {last && (
          <ACircle
            cx={last.x}
            cy={last.y}
            r={dotRadius}
            fill={last.color}
            animatedProps={fillProps}
          />
        )}
    </Svg>  
    </View>
  );
}
