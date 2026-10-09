import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield, AlertTriangle, ShieldCheck, Activity, ArrowRight,
  Sparkles, Compass, FileCheck, PhoneCall, CheckCircle2, ChevronRight, Zap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { CircularRiskScore } from '../components/common/CircularRiskScore';
import { RiskBadge } from '../components/common/RiskBadge';
import { AIInsightCard } from '../components/common/AIInsightCard';

export const CustomerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    api.getCustomerDashboard()
      .then((res) => {
        if (mounted) setData(res);
      })
      .catch(() => {})
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => { mounted = false; };
  }, []);

  const scoreData = data?.safety_score || {
    score: 82,
    status: 'Good',
    strongest_area: 'Account Security',
    improvement_opportunity: 'Suspicious-link exposure',
    disclaimer: "This is Genius AI's platform score and NOT an official government security rating.",
    components: [
      { name: 'Account Security', score: 90, status: 'Strong' },
      { name: 'Link Safety', score: 74, status: 'Needs Review' },
      { name: 'Scam Exposure', score: 80, status: 'Good' },
      { name: 'Privacy Exposure', score: 85, status: 'Good' },
      { name: 'Identity Protection', score: 88, status: 'Strong' },
    ]
  };

  const stats = data?.stats || {
    active_threats: 2,
    protected_accounts: 4,
    investigations: 1,
    evidence_items: 3
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Good morning, {user?.name || 'Citizen'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
            Your Digital Safety Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Genius AI monitors your exposed indicators and surfaces real-time threat intelligence.
          </p>
        </div>

        <Link
          to="/analyze"
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm shadow-blue-500/20 inline-flex items-center gap-2 self-start sm:self-auto transition-all"
        >
          <Sparkles className="w-4 h-4" />
          <span>Analyze a New Indicator</span>
        </Link>
      </div>

      {/* Main Intelligence Alert Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50/50 to-white border border-blue-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                Genius AI has detected
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 font-mono">
                Immediate Review
              </span>
            </div>
            <p className="text-sm font-bold text-slate-900 mt-0.5">
              2 high-risk signals &bull; 4 suspicious indicators &bull; 1 potential impersonation
            </p>
            <p className="text-xs text-slate-600 mt-0.5">
              A lookalike social profile imitating your bank's customer service has been correlated to an active credential phishing domain.
            </p>
          </div>
        </div>

        <Link
          to="/analyze"
          className="px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-blue-700 font-bold text-xs border border-blue-200 shadow-2xs inline-flex items-center gap-1.5 shrink-0 self-start md:self-auto transition-colors"
        >
          <span>View Intelligence</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Primary Grid: Digital Safety Score & Telemetry Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Personal Cyber Safety Score Card */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-black text-slate-900">
                Personal Cyber Safety Score
              </h3>
              <p className="text-xs text-slate-500">
                Continuous evaluation of exposed handles, link safety, and social engineering risks
              </p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700">
              {scoreData.status} Safety Rating
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            {/* Circular Gauge */}
            <div className="sm:col-span-5 flex justify-center">
              <CircularRiskScore
                score={scoreData.score}
                size={140}
                strokeWidth={12}
                showLabel={false}
              />
            </div>

            {/* Findings & Suggestions */}
            <div className="sm:col-span-7 space-y-3">
              <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-200/60 text-xs">
                <span className="font-bold text-emerald-900 block mb-0.5">Strongest Dimension:</span>
                <span className="text-slate-700">Your strongest area is <strong>{scoreData.strongest_area}</strong> (90%). No multi-factor bypasses observed.</span>
              </div>

              <div className="p-3 rounded-xl bg-amber-50/50 border border-amber-200/60 text-xs">
                <span className="font-bold text-amber-900 block mb-0.5">Improvement Opportunity:</span>
                <span className="text-slate-700">Your biggest improvement opportunity is <strong>{scoreData.improvement_opportunity}</strong>. 2 unverified links were clicked this month.</span>
              </div>
            </div>
          </div>

          {/* Component Scores Bar Chart list */}
          <div className="pt-2 border-t border-slate-100 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Score Component Breakdown
            </span>
            <div className="space-y-2.5">
              {scoreData.components.map((comp: any, idx: number) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">{comp.name}</span>
                    <span className="font-mono font-bold text-slate-600">{comp.score}/100</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        comp.score >= 85 ? 'bg-emerald-500' : comp.score >= 70 ? 'bg-blue-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${comp.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mandatory Disclaimer */}
          <p className="text-[11px] text-slate-400 pt-2 border-t border-slate-100 italic">
            {scoreData.disclaimer}
          </p>
        </div>

        {/* Right Column: Key Metrics & Quick Actions */}
        <div className="lg:col-span-5 space-y-6">
          {/* 4 Stats Cards */}
          <div className="grid grid-cols-2 gap-3.5">
            <Link
              to="/analyze"
              className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-blue-400 transition-colors group"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Active Threats
              </span>
              <span className="text-2xl font-black text-rose-600 mt-1 block">
                {stats.active_threats}
              </span>
              <span className="text-[11px] text-slate-500 group-hover:text-blue-600 transition-colors">
                View detections &rarr;
              </span>
            </Link>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Protected Accounts
              </span>
              <span className="text-2xl font-black text-slate-900 mt-1 block">
                {stats.protected_accounts}
              </span>
              <span className="text-[11px] text-emerald-600 font-semibold">
                Perimeter secured
              </span>
            </div>

            <Link
              to="/cases"
              className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-blue-400 transition-colors group"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Open Cases
              </span>
              <span className="text-2xl font-black text-slate-900 mt-1 block">
                {stats.investigations}
              </span>
              <span className="text-[11px] text-slate-500 group-hover:text-blue-600 transition-colors">
                Track investigations &rarr;
              </span>
            </Link>

            <Link
              to="/evidence"
              className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-blue-400 transition-colors group"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Evidence Vault
              </span>
              <span className="text-2xl font-black text-blue-600 mt-1 block">
                {stats.evidence_items}
              </span>
              <span className="text-[11px] text-slate-500 group-hover:text-blue-600 transition-colors">
                SHA-256 sealed &rarr;
              </span>
            </Link>
          </div>

          {/* Quick Action Navigation Panels */}
          <div className="space-y-3">
            <Link
              to="/safety-center"
              className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 shadow-2xs flex items-center justify-between group transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Safety Navigator</h4>
                  <p className="text-[11px] text-slate-500">"What should I do now?" step-by-step guidance</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/prepare-complaint"
              className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 shadow-2xs flex items-center justify-between group transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Prepare Complaint</h4>
                  <p className="text-[11px] text-slate-500">Generate formatted dossier for official NCRP filing</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Helpline quick widget */}
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-rose-950">Lost Money to Cyber Fraud?</h4>
                  <p className="text-[11px] text-rose-800">Helpline <strong>1930</strong> operates 24x7 for fund freezing</p>
                </div>
              </div>
              <a
                href="tel:1930"
                className="px-3 py-1.5 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 transition-colors"
              >
                Call 1930
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
