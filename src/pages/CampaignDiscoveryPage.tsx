import React, { useState, useEffect } from 'react';
import { Zap, ShieldAlert, Globe, MessageSquare, Smartphone, ArrowRight, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';
import { ThreatCampaign } from '../types';
import { RiskBadge } from '../components/common/RiskBadge';

export const CampaignDiscoveryPage: React.FC = () => {
  const [campaigns, setCampaigns] = useState<ThreatCampaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    api.getCampaigns()
      .then((camps) => {
        if (mounted) setCampaigns(camps);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => { mounted = false; };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-500" />
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Potential Threat Campaigns
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Genius AI correlates isolated indicators into multi-asset threat patterns sharing infrastructure, typography, and delivery mechanisms.
        </p>
      </div>

      {/* Campaign Cards */}
      {loading ? (
        <div className="py-20 text-center">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-2" />
          <span className="text-xs text-slate-500 font-semibold">Correlating campaign clusters...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {campaigns.map((camp) => (
            <div
              key={camp.id}
              className="p-7 bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-md">
                      {camp.id}
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-mono">
                      {camp.confidence}% Confidence
                    </span>
                  </div>
                  <RiskBadge level={camp.risk_level} size="sm" />
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {camp.title}
                  </h3>
                  <div className="text-xs text-blue-600 font-semibold mt-0.5">
                    Target: {camp.primary_brand}
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {camp.description}
                </p>

                {/* Shared Indicators List */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Shared Indicators & Signature Patterns:
                  </div>
                  <ul className="space-y-1.5 text-slate-700">
                    {camp.shared_indicators.map((ind, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span>{ind}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">
                  Correlated Entities: <strong>{camp.entities_count} items</strong>
                </span>
                <span className="text-slate-400 text-[11px]">
                  Potential Coordinated Pattern
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Ethical Principle Banner */}
      <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-600 text-center">
        <strong>Attribution Standard:</strong> Genius AI identifies potential coordinated threat patterns based on observable infrastructure overlap. We do not assert definitive legal actor attribution without judicial subpoena verification.
      </div>
    </div>
  );
};
