import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity, ShieldAlert, Zap, FileText, Database, Award,
  ArrowRight, TrendingUp, Globe, Loader2, Sparkles, Filter
} from 'lucide-react';
import { api } from '../services/api';
import { ThreatAnalysis, ThreatCampaign } from '../types';
import { RiskBadge } from '../components/common/RiskBadge';
import { ThreatIntelligenceGraph } from '../components/threat/ThreatIntelligenceGraph';

export const AnalystCommandCenter: React.FC = () => {
  const [metrics, setMetrics] = useState<any>(null);
  const [threats, setThreats] = useState<ThreatAnalysis[]>([]);
  const [campaigns, setCampaigns] = useState<ThreatCampaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    Promise.all([
      api.getAnalystDashboard().catch(() => null),
      api.getThreats().catch(() => []),
      api.getCampaigns().catch(() => [])
    ]).then(([dash, ths, camps]) => {
      if (mounted) {
        setMetrics(dash?.metrics || {
          active_threats: 18,
          critical_threats: 7,
          potential_campaigns: 2,
          investigations: 5,
          evidence_items: 14,
          brands_protected: 3
        });
        setThreats(ths || []);
        setCampaigns(camps || []);
        setLoading(false);
      }
    });

    return () => { mounted = false; };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
              Cybersecurity Command Center
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
            Genius AI Security Command Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time adversary telemetry, correlation clustering, brand defense, and threat forecasts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/threat-queue"
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs inline-flex items-center gap-1.5 transition-colors"
          >
            <span>Threat Queue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 6 Key Command Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {[
          { label: 'Active Threats', value: metrics?.active_threats || 18, color: 'text-slate-900', icon: ShieldAlert },
          { label: 'Critical Threats', value: metrics?.critical_threats || 7, color: 'text-rose-600', icon: ShieldAlert },
          { label: 'Potential Campaigns', value: metrics?.potential_campaigns || 2, color: 'text-purple-600', icon: Zap },
          { label: 'Investigations', value: metrics?.investigations || 5, color: 'text-blue-600', icon: FileText },
          { label: 'Evidence Items', value: metrics?.evidence_items || 14, color: 'text-slate-900', icon: Database },
          { label: 'Brands Protected', value: metrics?.brands_protected || 3, color: 'text-emerald-600', icon: Award },
        ].map((m, idx) => {
          const Icon = m.icon;
          return (
            <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider">{m.label}</span>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className={`text-2xl font-black ${m.color} font-mono mt-0.5`}>
                {m.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mid Section: Interactive Threat Graph Preview & Live Campaign Discovery */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Threat Graph Canvas Preview */}
        <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Live Threat Intelligence Graph
              </h3>
              <p className="text-xs text-slate-500">
                Spatial entity relationships across active campaigns
              </p>
            </div>
            <Link
              to="/threat-graph"
              className="text-xs font-bold text-blue-600 hover:underline inline-flex items-center gap-1"
            >
              <span>Full Graph</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <ThreatIntelligenceGraph />
        </div>

        {/* Right Column: Emerging Threat Forecast & Discovered Campaign */}
        <div className="lg:col-span-4 space-y-6">
          {/* AI Threat Forecast Card */}
          <div className="p-6 bg-gradient-to-br from-indigo-50/60 via-white to-purple-50/40 rounded-3xl border border-indigo-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-indigo-600 text-white">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900">
                  AI Threat Forecast
                </h4>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-rose-100 text-rose-700">
                Increasing
              </span>
            </div>

            <div>
              <div className="text-xs font-bold text-slate-900">
                Multi-Stage Customer Support Impersonation
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Adversaries pivoting from SMS spam to conversational Instagram/WhatsApp support impersonation directing victims to trojanized APKs.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs flex items-center justify-between">
              <span className="text-slate-500">Predictive Confidence:</span>
              <span className="font-extrabold font-mono text-purple-700">78% Confidence</span>
            </div>

            <Link
              to="/threat-forecast"
              className="block text-center py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs transition-colors"
            >
              Inspect Emerging Trajectory &rarr;
            </Link>
          </div>

          {/* Potential Campaign Cluster Card */}
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Coordinated Campaign
                </h4>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-mono">
                87% Match
              </span>
            </div>

            <div className="text-xs font-bold text-slate-900">
              CMP-BANK-SUPPORT-01 (Banking Funnel)
            </div>

            <p className="text-xs text-slate-500 leading-normal">
              6 social profiles, 3 disposable domains, and 2 SMS gateways sharing lookalike typography and UPI payment redirect gates.
            </p>

            <Link
              to="/campaigns"
              className="text-xs font-bold text-blue-600 hover:underline inline-flex items-center gap-1 pt-1"
            >
              <span>Explore Campaign Dossier</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Threat Queue Table Preview */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Recent Threats Queue</h3>
            <p className="text-xs text-slate-500">Live triage stream evaluated across sensor network</p>
          </div>
          <Link
            to="/threat-queue"
            className="text-xs font-bold text-blue-600 hover:underline inline-flex items-center gap-1"
          >
            <span>View Full Queue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-slate-100 overflow-x-auto text-xs">
          {threats.slice(0, 5).map((t) => (
            <div key={t.id} className="py-3.5 flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-blue-600 text-[11px]">{t.id}</span>
                <span className="font-semibold text-slate-900 truncate max-w-md">{t.submitted_indicator}</span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[10px] font-semibold uppercase text-slate-400">{t.entity_type.replace('_', ' ')}</span>
                <RiskBadge level={t.risk_level} size="sm" />
                <span className="font-mono font-bold text-slate-800">{t.risk_score}/100</span>
                <Link
                  to={`/threats/${t.id}`}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px]"
                >
                  Triage
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
