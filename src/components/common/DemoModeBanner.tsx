import React from 'react';
import { Info, Sparkles } from 'lucide-react';

interface DemoModeBannerProps {
  isDemo?: boolean;
  provenance?: string;
  className?: string;
}

export const DemoModeBanner: React.FC<DemoModeBannerProps> = ({
  isDemo = true,
  provenance,
  className = ''
}) => {
  if (!isDemo && provenance === 'live_analysis') {
    return (
      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold ${className}`}>
        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
        <span>Live Sensor Telemetry Verified</span>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50/80 border border-blue-200/80 text-blue-900 text-xs font-medium ${className}`}>
      <Info className="w-3.5 h-3.5 text-blue-600 shrink-0" />
      <span>Simulated Intelligence (Demonstration Telemetry)</span>
    </div>
  );
};
