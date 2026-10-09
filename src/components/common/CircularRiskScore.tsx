import React from 'react';

interface CircularRiskScoreProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
  className?: string;
}

export const CircularRiskScore: React.FC<CircularRiskScoreProps> = ({
  score,
  size = 120,
  strokeWidth = 10,
  showLabel = true,
  className = ''
}) => {
  const normalizedScore = Math.max(0, Math.min(100, score));
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (normalizedScore / 100) * circumference;

  let strokeColor = '#10B981'; // Green
  let label = 'Low Risk';
  let textColor = 'text-emerald-700';

  if (normalizedScore >= 80) {
    strokeColor = '#DC2626'; // Red
    label = 'Critical Risk';
    textColor = 'text-rose-600';
  } else if (normalizedScore >= 60) {
    strokeColor = '#EA580C'; // Orange
    label = 'High Risk';
    textColor = 'text-orange-600';
  } else if (normalizedScore >= 30) {
    strokeColor = '#F59E0B'; // Amber
    label = 'Medium Risk';
    textColor = 'text-amber-600';
  }

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E2E8F0"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Animated Value Ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-extrabold tracking-tight text-slate-900 leading-none">
            {normalizedScore}
          </span>
          <span className="text-[10px] uppercase font-semibold text-slate-400 mt-1">
            out of 100
          </span>
        </div>
      </div>

      {showLabel && (
        <div className="mt-3 text-center">
          <span className={`text-sm font-bold uppercase tracking-wider ${textColor}`}>
            {label}
          </span>
        </div>
      )}
    </div>
  );
};
