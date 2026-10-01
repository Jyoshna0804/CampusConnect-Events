import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  change?: string;
  colorScheme: 'purple' | 'indigo' | 'blue' | 'pink' | 'emerald' | 'amber';
  subtitle?: string;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon: Icon,
  change,
  colorScheme,
  subtitle,
  onClick,
}) => {
  const schemeStyles = {
    purple: {
      bgIcon: 'bg-purple-100 text-purple-600',
      borderHover: 'hover:border-purple-300',
      gradientBar: 'from-purple-500 to-indigo-500',
    },
    indigo: {
      bgIcon: 'bg-indigo-100 text-indigo-600',
      borderHover: 'hover:border-indigo-300',
      gradientBar: 'from-indigo-500 to-blue-500',
    },
    blue: {
      bgIcon: 'bg-blue-100 text-blue-600',
      borderHover: 'hover:border-blue-300',
      gradientBar: 'from-blue-500 to-cyan-500',
    },
    pink: {
      bgIcon: 'bg-pink-100 text-pink-600',
      borderHover: 'hover:border-pink-300',
      gradientBar: 'from-pink-500 to-rose-500',
    },
    emerald: {
      bgIcon: 'bg-emerald-100 text-emerald-600',
      borderHover: 'hover:border-emerald-300',
      gradientBar: 'from-emerald-500 to-teal-500',
    },
    amber: {
      bgIcon: 'bg-amber-100 text-amber-600',
      borderHover: 'hover:border-amber-300',
      gradientBar: 'from-amber-500 to-orange-500',
    },
  }[colorScheme];

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${
        schemeStyles.borderHover
      } ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${schemeStyles.gradientBar}`} />
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold tracking-wide text-slate-500 uppercase">{label}</span>
        <div className={`p-2.5 rounded-xl ${schemeStyles.bgIcon}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-3xl font-bold tracking-tight text-slate-900 tabular-nums">
          {value}
        </span>
        {change && (
          <span className="text-xs font-medium text-emerald-600 flex items-center">
            {change}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="mt-1.5 text-xs text-slate-500 line-clamp-1">{subtitle}</p>
      )}
    </div>
  );
};
