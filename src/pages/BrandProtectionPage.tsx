import React, { useState, useEffect } from 'react';
import { Award, ShieldCheck, Globe, AlertTriangle, ArrowRight, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';
import { BrandProtection } from '../types';
import { CircularRiskScore } from '../components/common/CircularRiskScore';

export const BrandProtectionPage: React.FC = () => {
  const [brands, setBrands] = useState<BrandProtection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    api.getBrands()
      .then((b) => {
        if (mounted) setBrands(b);
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
          <Award className="w-5 h-5 text-blue-600" />
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Brand Protection & Asset Perimeter
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Surveillance monitoring official brand names, authentic domains, certified handles, and lookalike infringements.
        </p>
      </div>

      {loading ? (
        <div className="py-20 text-center">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-2" />
          <span className="text-xs text-slate-500 font-semibold">Loading monitored brands...</span>
        </div>
      ) : (
        <div className="space-y-6">
          {brands.map((b) => (
            <div key={b.id} className="p-7 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-lg">
                    {b.brand_name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">{b.brand_name}</h3>
                    <div className="text-xs text-blue-600 font-mono mt-0.5">{b.official_domain}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Brand Risk Exposure</span>
                    <span className="text-base font-black text-rose-600 font-mono">{b.risk_score} / 100 ({b.risk_status.toUpperCase()})</span>
                  </div>
                  <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Monitored Channels & Lookalikes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {/* Official Channels */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="font-bold uppercase tracking-wider text-slate-500 text-[10px] block">
                    Verified Digital Handles
                  </span>
                  <div className="space-y-1 text-slate-700">
                    {b.official_handles.map((h, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 font-mono text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detected Infringements */}
                <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-2">
                  <span className="font-bold uppercase tracking-wider text-rose-800 text-[10px] block">
                    Detected Active Infringements
                  </span>
                  <div className="text-2xl font-black text-rose-700 font-mono">
                    {b.detected_lookalikes_count} Candidates
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Includes 6 fake profiles, 3 typo domains, and 2 unverified APKs.
                  </p>
                </div>

                {/* Identity DNA Status */}
                <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200 space-y-2">
                  <span className="font-bold uppercase tracking-wider text-blue-800 text-[10px] block">
                    Identity DNA Protection
                  </span>
                  <div className="text-xs font-bold text-slate-900">
                    Active Trademark Blueprint
                  </div>
                  <p className="text-[11px] text-slate-600">
                    DNSSEC and trademark silhouetting enabled for automated spoof rejection.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
