import React from 'react';
import { RegistrationStatus } from '../../types';
import { Clock, CheckCircle2, XCircle, Award } from 'lucide-react';

interface StatusBadgeProps {
  status: RegistrationStatus;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

  switch (status) {
    case 'Approved':
      return (
        <span className={`inline-flex items-center gap-1.5 font-medium rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 ${sizeClasses}`}>
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Approved</span>
        </span>
      );
    case 'Pending':
      return (
        <span className={`inline-flex items-center gap-1.5 font-medium rounded-md bg-amber-50 text-amber-700 border border-amber-200 ${sizeClasses}`}>
          <Clock className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
          <span>Pending</span>
        </span>
      );
    case 'Rejected':
      return (
        <span className={`inline-flex items-center gap-1.5 font-medium rounded-md bg-rose-50 text-rose-700 border border-rose-200 ${sizeClasses}`}>
          <XCircle className="w-3.5 h-3.5 text-rose-600" />
          <span>Rejected</span>
        </span>
      );
    case 'Completed':
      return (
        <span className={`inline-flex items-center gap-1.5 font-medium rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 ${sizeClasses}`}>
          <Award className="w-3.5 h-3.5 text-indigo-600" />
          <span>Completed</span>
        </span>
      );
    default:
      return null;
  }
};
