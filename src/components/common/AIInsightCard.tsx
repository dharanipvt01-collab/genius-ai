import React from 'react';
import { Sparkles, AlertCircle, Compass, Share2, TrendingUp } from 'lucide-react';

interface AIInsightCardProps {
  type: 'insight' | 'why_it_matters' | 'action' | 'connection' | 'forecast';
  title?: string;
  description: string;
  badge?: string;
  actionButton?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export const AIInsightCard: React.FC<AIInsightCardProps> = ({
  type,
  title,
  description,
  badge,
  actionButton,
  className = ''
}) => {
  const config = {
    insight: {
      defaultTitle: 'Genius AI Insight',
      icon: Sparkles,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50/60',
      borderColor: 'border-blue-200/80',
    },
    why_it_matters: {
      defaultTitle: 'Why this matters',
      icon: AlertCircle,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50/60',
      borderColor: 'border-purple-200/80',
    },
    action: {
      defaultTitle: 'Recommended Action',
      icon: Compass,
      iconColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50/60',
      borderColor: 'border-emerald-200/80',
    },
    connection: {
      defaultTitle: 'Potential Connection',
      icon: Share2,
      iconColor: 'text-indigo-600',
      bgColor: 'bg-indigo-50/60',
      borderColor: 'border-indigo-200/80',
    },
    forecast: {
      defaultTitle: 'Emerging Pattern',
      icon: TrendingUp,
      iconColor: 'text-amber-600',
      bgColor: 'bg-amber-50/60',
      borderColor: 'border-amber-200/80',
    },
  }[type];

  const IconComponent = config.icon;

  return (
    <div className={`p-4 rounded-xl border ${config.bgColor} ${config.borderColor} transition-all hover:shadow-sm ${className}`}>
      <div className="flex items-start justify-between gap-3 mb-1.5">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-white shadow-xs">
            <IconComponent className={`w-4 h-4 ${config.iconColor}`} />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-800">
            {title || config.defaultTitle}
          </span>
        </div>
        {badge && (
          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/80 border border-slate-200 text-slate-600">
            {badge}
          </span>
        )}
      </div>

      <p className="text-sm text-slate-700 leading-relaxed pl-7">
        {description}
      </p>

      {actionButton && (
        <div className="mt-3 pl-7">
          <button
            onClick={actionButton.onClick}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1"
          >
            {actionButton.label} &rarr;
          </button>
        </div>
      )}
    </div>
  );
};
