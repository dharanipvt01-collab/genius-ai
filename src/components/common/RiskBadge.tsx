import React from 'react';
import { RiskLevel } from '../../types';

interface RiskBadgeProps {
  level: RiskLevel | 'safe' | string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ level, size = 'md', className = '' }) => {
  const normLevel = level.toLowerCase();

  let styles = 'bg-slate-100 text-slate-700 border-slate-200';
  let dotColor = 'bg-slate-400';
  let label = level.toUpperCase();

  if (normLevel === 'low' || normLevel === 'safe') {
    styles = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    dotColor = 'bg-emerald-500';
    label = normLevel === 'safe' ? 'VERIFIED SAFE' : 'LOW RISK';
  } else if (normLevel === 'medium') {
    styles = 'bg-amber-50 text-amber-700 border-amber-200';
    dotColor = 'bg-amber-500';
    label = 'MEDIUM RISK';
  } else if (normLevel === 'high') {
    styles = 'bg-orange-50 text-orange-700 border-orange-200';
    dotColor = 'bg-orange-500';
    label = 'HIGH RISK';
  } else if (normLevel === 'critical') {
    styles = 'bg-rose-50 text-rose-700 border-rose-200';
    dotColor = 'bg-rose-500';
    label = 'CRITICAL RISK';
  }

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-semibold',
  }[size];

  return (
    <span className={`inline-flex items-center rounded-full border ${styles} ${sizeClasses} ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor} animate-pulse`} />
      {label}
    </span>
  );
};
