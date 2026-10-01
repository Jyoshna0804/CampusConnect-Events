import React, { useState } from 'react';

interface BarDataPoint {
  label: string;
  value: number;
  secondaryValue?: number;
}

interface SimpleBarChartProps {
  data: BarDataPoint[];
  primaryColor?: string;
  secondaryColor?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  height?: number;
}

export const SimpleBarChart: React.FC<SimpleBarChartProps> = ({
  data,
  primaryColor = '#6366f1',
  secondaryColor = '#ec4899',
  primaryLabel = 'Registrations',
  secondaryLabel = 'Attended',
  height = 200,
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const maxValue = Math.max(
    ...data.flatMap(d => [d.value, d.secondaryValue || 0]),
    10
  );

  return (
    <div className="w-full">
      {/* Legend */}
      <div className="flex items-center gap-4 mb-3 text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: primaryColor }} />
          <span>{primaryLabel}</span>
        </div>
        {secondaryLabel && (
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: secondaryColor }} />
            <span>{secondaryLabel}</span>
          </div>
        )}
      </div>

      {/* Chart Canvas */}
      <div className="flex items-end gap-3 sm:gap-6 pt-6 pb-2 px-2 border-b border-slate-200" style={{ height: `${height}px` }}>
        {data.map((item, idx) => {
          const primaryHeightPercent = (item.value / maxValue) * 100;
          const secondaryHeightPercent = item.secondaryValue ? (item.secondaryValue / maxValue) * 100 : 0;
          const isHovered = hoveredIdx === idx;

          return (
            <div
              key={item.label}
              className="relative flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Tooltip */}
              {isHovered && (
                <div className="absolute -top-10 z-20 px-2 py-1 bg-slate-900 text-white rounded text-[11px] whitespace-nowrap shadow-md pointer-events-none">
                  <span className="font-bold">{item.label}:</span> {item.value} {primaryLabel}
                  {item.secondaryValue !== undefined && ` · ${item.secondaryValue} ${secondaryLabel}`}
                </div>
              )}

              {/* Bars container */}
              <div className="flex items-end gap-1 w-full justify-center h-full">
                <div
                  className="w-3 sm:w-5 rounded-t-md transition-all duration-300 group-hover:opacity-90"
                  style={{
                    height: `${Math.max(4, primaryHeightPercent)}%`,
                    backgroundColor: primaryColor,
                  }}
                />
                {item.secondaryValue !== undefined && (
                  <div
                    className="w-3 sm:w-5 rounded-t-md transition-all duration-300 group-hover:opacity-90"
                    style={{
                      height: `${Math.max(4, secondaryHeightPercent)}%`,
                      backgroundColor: secondaryColor,
                    }}
                  />
                )}
              </div>

              {/* Label */}
              <span className="mt-2 text-[11px] font-medium text-slate-500 truncate max-w-full">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
