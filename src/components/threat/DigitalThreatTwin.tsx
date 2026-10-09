import React, { useState } from 'react';
import { Cpu, Fingerprint, ShieldAlert, Share2, Clock, FileCheck, Layers, ChevronRight, Activity } from 'lucide-react';
import { RiskBadge } from '../common/RiskBadge';

interface DigitalThreatTwinProps {
  threatId?: string;
  indicator?: string;
  riskScore?: number;
  riskLevel?: string;
  className?: string;
}

export const DigitalThreatTwin: React.FC<DigitalThreatTwinProps> = ({
  threatId = 'THR-HDFC-9102',
  indicator = 'https://instagram.com/hdfc_bank_support_24x7_official',
  riskScore = 93,
  riskLevel = 'critical',
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'identity' | 'relationships' | 'evidence' | 'timeline'>('overview');

  const twinDimensions = [
    { id: 'identity', label: 'Identity Mimicry', icon: Fingerprint, metric: '93% match', status: 'Divergent Suffix' },
    { id: 'relationships', label: 'Ecosystem Graph', icon: Share2, metric: '5 connected nodes', status: 'Phishing Funnel' },
    { id: 'evidence', label: 'Forensic Evidence', icon: FileCheck, metric: '8 SHA-256 items', status: 'Sealed & Hashed' },
    { id: 'timeline', label: 'Event Telemetry', icon: Clock, metric: '4 progression stages', status: 'Active Campaign' },
    { id: 'risk', label: 'Aggregated Exposure', icon: ShieldAlert, metric: `${riskScore}/100 Critical`, status: 'Immediate Risk' },
  ];

  return (
    <div className={`p-6 bg-white rounded-3xl border border-slate-200/90 shadow-sm relative overflow-hidden ${className}`}>
      {/* Background Subtle Digital Aura */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-50/50 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black text-slate-900 tracking-tight">
                Digital Threat Twin
              </h3>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                Signature Twin OS
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              Subject: {threatId} &bull; {indicator}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <RiskBadge level={riskLevel} size="md" />
          <div className="px-3 py-1 rounded-xl bg-slate-100 text-slate-800 text-xs font-extrabold font-mono">
            {riskScore} / 100
          </div>
        </div>
      </div>

      {/* Main Interactive Twin Architecture Canvas */}
      <div className="relative my-8 py-6 flex flex-col items-center justify-center">
        {/* Center Twin Core */}
        <div className="relative z-20 w-36 h-36 rounded-3xl bg-slate-900 text-white p-3 flex flex-col items-center justify-center text-center shadow-xl border-4 border-white ring-8 ring-blue-50">
          <Activity className="w-7 h-7 text-blue-400 mb-1 animate-pulse" />
          <span className="text-xs font-black tracking-wider uppercase text-blue-300">
            Threat Twin
          </span>
          <span className="text-[10px] text-slate-400 font-mono mt-0.5">
            Active Synthesis
          </span>
          <span className="mt-2 text-xs font-black text-rose-400">
            {riskScore}% Severity
          </span>
        </div>

        {/* Orbital Satellite Modules */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full mt-8 relative z-10">
          {twinDimensions.slice(0, 4).map((dim) => {
            const Icon = dim.icon;
            return (
              <div
                key={dim.id}
                onClick={() => setActiveTab(dim.id as any)}
                className="p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50/50 border border-slate-200/80 hover:border-blue-300 cursor-pointer transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-1.5 rounded-lg bg-white shadow-2xs group-hover:text-blue-600 transition-colors">
                    <Icon className="w-4 h-4 text-slate-600 group-hover:text-blue-600" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    Module
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-900 mb-0.5">
                  {dim.label}
                </div>
                <div className="text-[11px] font-semibold text-blue-600 font-mono">
                  {dim.metric}
                </div>
                <div className="text-[10px] text-slate-500 mt-1 truncate">
                  {dim.status}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Threat Twin Synthesis Summary */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-800">
          <span>Synthesized Forensic Blueprint</span>
          <span className="text-blue-600 font-semibold">Continuous Signal Synchronization</span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          The Genius AI Digital Threat Twin constructs a real-time behavioural facsimile of the adversary infrastructure. 
          By unifying social impersonation, lookalike domains, SMS delivery channels, and trojanized payloads into a single entity model, 
          investigators can analyze root indicators without activating weaponized payloads.
        </p>
      </div>
    </div>
  );
};
