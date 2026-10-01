import React from 'react';

interface DonutSlice {
  label: string;
  value: number;
  color: string;
}

interface SimpleDonutChartProps {
  data: DonutSlice[];
  size?: number;
  thickness?: number;
}

export const SimpleDonutChart: React.FC<SimpleDonutChartProps> = ({
  data,
  size = 180,
  thickness = 24,
}) => {
  const total = data.reduce((acc, curr) => acc + curr.value, 0);
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulatedPercent = 0;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      {/* SVG Donut */}
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#f1f5f9"
            strokeWidth={thickness}
          />
          {/* Slices */}
          {data.map(slice => {
            const percent = total > 0 ? slice.value / total : 0;
            const strokeDashoffset = circumference * (1 - percent);
            const rotation = accumulatedPercent * 360;
            accumulatedPercent += percent;

            return (
              <circle
                key={slice.label}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke={slice.color}
                strokeWidth={thickness}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                style={{
                  transformOrigin: '50% 50%',
                  transform: `rotate(${rotation}deg)`,
                  transition: 'stroke-dashoffset 0.5s ease',
                }}
              />
            );
          })}
        </svg>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-bold text-slate-800 tabular-nums">{total}</span>
          <span className="text-[10px] uppercase font-semibold text-slate-400">Total</span>
        </div>
      </div>

      {/* Legend list */}
      <div className="flex-1 space-y-2 min-w-0">
        {data.map(slice => {
          const percent = total > 0 ? Math.round((slice.value / total) * 100) : 0;
          return (
            <div key={slice.label} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 truncate pr-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: slice.color }} />
                <span className="font-medium text-slate-700 truncate">{slice.label}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="font-bold text-slate-900 tabular-nums">{slice.value}</span>
                <span className="text-slate-400 text-[11px] tabular-nums w-8 text-right">{percent}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
