import React, { useState, useEffect } from 'react';
import { TrendingUp, Sparkles, Clock, AlertTriangle, ArrowRight, Loader2, ShieldCheck, Activity } from 'lucide-react';
import { api } from '../services/api';
import { ThreatForecastData } from '../types';

export const ThreatForecastPage: React.FC = () => {
  const [forecast, setForecast] = useState<ThreatForecastData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    api.getForecast()
      .then((f) => {
        if (mounted) setForecast(f);
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
          <TrendingUp className="w-5 h-5 text-indigo-600" />
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            AI Threat Forecast
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Predictive horizon forecasting adversary vector transitions and emerging social engineering patterns.
        </p>
      </div>

      {loading ? (
        <div className="py-20 text-center">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-2" />
          <span className="text-xs text-slate-500 font-semibold">Synthesizing predictive models...</span>
        </div>
      ) : forecast ? (
        <div className="space-y-6">
          {/* Main Alert Card */}
          <div className="p-8 bg-gradient-to-r from-purple-50 via-white to-blue-50 rounded-3xl border border-purple-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
                  Emerging Pattern Detected
                </span>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-2">
                  {forecast.pattern_name}
                </h2>
                <p className="text-xs text-slate-600 max-w-2xl mt-1 leading-relaxed">
                  {forecast.summary}
                </p>
              </div>

              <div className="flex items-center gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Forecast Confidence</div>
                  <div className="text-xl font-black text-purple-700 font-mono">{forecast.confidence}%</div>
                </div>
                <div className="h-8 w-px bg-slate-200 mx-1" />
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Trend Velocity</div>
                  <div className="text-xl font-black text-rose-600 capitalize">{forecast.predicted_trend}</div>
                </div>
              </div>
            </div>

            {/* Next Probable Vector Callout */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Potential Next Attack Vector
              </span>
              <span className="font-bold text-rose-700 text-sm">
                {forecast.potential_next_vector}
              </span>
            </div>
          </div>

          {/* Timeline Progression Card */}
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              Pattern Evolutionary Trajectory
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {forecast.timeline_points.map((tp, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-blue-600">{tp.phase}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600">
                      {tp.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 font-medium pt-1">
                    {tp.pattern}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Vector Metrics Table */}
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              Vector Activity Forecast Index
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {forecast.vector_metrics.map((vm, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="text-xs font-bold text-slate-800 truncate">{vm.vector}</div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xl font-black text-slate-900 font-mono">{vm.forecast}</span>
                    <span className={`text-xs font-bold font-mono ${vm.trend.startsWith('+') ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {vm.trend}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400">Baseline Index: {vm.current}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Mandatory Disclaimer */}
          <div className="p-4 rounded-2xl bg-slate-100 text-[11px] text-slate-500 text-center">
            {forecast.disclaimer}
          </div>
        </div>
      ) : null}
    </div>
  );
};
