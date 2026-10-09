import React from 'react';
import { ShieldCheck, LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionButton?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = ShieldCheck,
  title,
  description,
  actionButton
}) => {
  return (
    <div className="p-10 rounded-2xl border border-dashed border-slate-200 bg-white/60 text-center flex flex-col items-center justify-center my-6">
      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-base font-bold text-slate-900 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mb-4 leading-relaxed">{description}</p>
      {actionButton && (
        <button
          onClick={actionButton.onClick}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm transition-all"
        >
          {actionButton.label}
        </button>
      )}
    </div>
  );
};
