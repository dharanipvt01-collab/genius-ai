import React from 'react';
import { Clock, CheckCircle2 } from 'lucide-react';

interface TimelineEvent {
  time: string;
  event: string;
  actor?: string;
}

interface ThreatTimelineProps {
  events?: TimelineEvent[];
  className?: string;
}

export const ThreatTimeline: React.FC<ThreatTimelineProps> = ({
  events,
  className = ''
}) => {
  const defaultEvents: TimelineEvent[] = [
    { time: '09:14 AM', event: 'Suspicious profile detected by automated scanner' },
    { time: '09:17 AM', event: 'Brand similarity identified against HDFC Bank registered trademarks (95%)' },
    { time: '09:21 AM', event: 'Suspicious redirect URL discovered in bio link (*.support-care.top)' },
    { time: '09:25 AM', event: 'Related scam SMS message detected sharing identical redirect hostname' },
    { time: '09:28 AM', event: 'Threat campaign correlation generated (CMP-BANK-SUPPORT-01)' },
    { time: '09:31 AM', event: 'Forensic evidence package prepared with SHA-256 cryptographic seals' }
  ];

  const items = events && events.length > 0 ? events : defaultEvents;

  return (
    <div className={`p-6 bg-white rounded-2xl border border-slate-200 ${className}`}>
      <div className="flex items-center gap-2.5 mb-6">
        <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
          <Clock className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900">Investigation Timeline</h3>
          <p className="text-xs text-slate-500">Chronological telemetry sequence</p>
        </div>
      </div>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
        {items.map((it, idx) => (
          <div key={idx} className="relative group">
            {/* Timeline Dot */}
            <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-white border-2 border-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-xs font-mono font-bold text-blue-600">{it.time}</span>
              {it.actor && (
                <span className="text-[10px] text-slate-400 font-medium">{it.actor}</span>
              )}
            </div>
            <p className="text-xs font-semibold text-slate-800 mt-0.5 leading-relaxed">
              {it.event}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
