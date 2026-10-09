import React, { useState } from 'react';
import { Shield, Globe, Smartphone, MessageSquare, Award, FileCheck, AlertTriangle } from 'lucide-react';
import { RiskBadge } from '../common/RiskBadge';

interface HeroNode {
  id: string;
  label: string;
  category: string;
  threatType: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  aiStatus: string;
  icon: any;
  angle: number; // in degrees
  distance: number; // in px
}

export const InteractiveThreatHero: React.FC = () => {
  const [activeNode, setActiveNode] = useState<HeroNode | null>(null);

  const nodes: HeroNode[] = [
    {
      id: 'profile',
      label: 'Social Profile',
      category: 'Identity',
      threatType: 'Potential Impersonation',
      riskLevel: 'critical',
      aiStatus: 'Flagged by Identity DNA (92% likeness)',
      icon: Shield,
      angle: 0,
      distance: 140
    },
    {
      id: 'website',
      label: 'Lookalike URL',
      category: 'Web Perimeter',
      threatType: 'Credential Phishing',
      riskLevel: 'high',
      aiStatus: 'Suspicious TLD .top with typosquatting',
      icon: Globe,
      angle: 60,
      distance: 155
    },
    {
      id: 'app',
      label: 'Mobile App',
      category: 'Binary Payload',
      threatType: 'Trojanized Support APK',
      riskLevel: 'critical',
      aiStatus: 'SMS interception permission detected',
      icon: Smartphone,
      angle: 120,
      distance: 145
    },
    {
      id: 'message',
      label: 'Scam Message',
      category: 'Transmission',
      threatType: 'Urgency Lure SMS',
      riskLevel: 'high',
      aiStatus: 'Deceptive KYC expiry pressure template',
      icon: MessageSquare,
      angle: 180,
      distance: 150
    },
    {
      id: 'brand',
      label: 'Official Brand',
      category: 'Asset Authority',
      threatType: 'Protected Trademark Target',
      riskLevel: 'low',
      aiStatus: 'Cryptographic DNSSEC baseline active',
      icon: Award,
      angle: 240,
      distance: 140
    },
    {
      id: 'evidence',
      label: 'Forensic Vault',
      category: 'Integrity',
      threatType: 'Sealed Artifacts',
      riskLevel: 'low',
      aiStatus: '8 evidence items with SHA-256 seals',
      icon: FileCheck,
      angle: 300,
      distance: 150
    }
  ];

  return (
    <div className="relative w-full max-w-lg aspect-square mx-auto flex items-center justify-center p-4">
      {/* Soft Background Concentric Radar Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[360px] h-[360px] rounded-full border border-blue-100/60 bg-blue-50/20" />
        <div className="absolute w-[260px] h-[260px] rounded-full border border-slate-200/50" />
        <div className="absolute w-[160px] h-[160px] rounded-full border border-blue-200/60 animate-pulse-subtle" />
      </div>

      {/* Connection SVG Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {nodes.map((n) => {
          const rad = (n.angle * Math.PI) / 180;
          const cx = 256;
          const cy = 256;
          const x = cx + Math.cos(rad) * n.distance;
          const y = cy + Math.sin(rad) * n.distance;
          const isHovered = activeNode?.id === n.id;
          return (
            <line
              key={n.id}
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke={isHovered ? '#2563EB' : 'url(#lineGrad)'}
              strokeWidth={isHovered ? 2.5 : 1.5}
              strokeDasharray={isHovered ? 'none' : '4 4'}
              className="transition-all duration-300"
            />
          );
        })}
      </svg>

      {/* Center Master Node: Genius AI */}
      <div className="relative z-10 w-28 h-28 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-xl shadow-blue-500/20 flex flex-col items-center justify-center text-white text-center p-2 border-2 border-white cursor-pointer hover:scale-105 transition-transform group">
        <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center mb-1 backdrop-blur-xs">
          <Shield className="w-5 h-5 fill-white/40 stroke-white" />
        </div>
        <span className="text-xs font-black tracking-tight leading-none">Genius AI</span>
        <span className="text-[9px] font-medium text-blue-100 tracking-wider uppercase mt-1">
          Security Brain
        </span>
      </div>

      {/* Orbiting Threat Nodes */}
      {nodes.map((n) => {
        const rad = (n.angle * Math.PI) / 180;
        const x = Math.cos(rad) * n.distance;
        const y = Math.sin(rad) * n.distance;
        const Icon = n.icon;
        const isHovered = activeNode?.id === n.id;

        return (
          <div
            key={n.id}
            onMouseEnter={() => setActiveNode(n)}
            onMouseLeave={() => setActiveNode(null)}
            className="absolute z-20 cursor-pointer transition-all duration-300"
            style={{
              transform: `translate(${x}px, ${y}px)`,
            }}
          >
            <div className={`p-3 rounded-2xl bg-white border shadow-md flex items-center justify-center gap-2 transition-all duration-200 ${
              isHovered
                ? 'border-blue-500 ring-4 ring-blue-100 scale-110 shadow-lg'
                : 'border-slate-200/80 hover:border-slate-300'
            }`}>
              <div className={`p-1.5 rounded-lg ${
                n.riskLevel === 'critical' ? 'bg-rose-50 text-rose-600' :
                n.riskLevel === 'high' ? 'bg-orange-50 text-orange-600' :
                'bg-blue-50 text-blue-600'
              }`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-800 pr-1">
                {n.label}
              </span>
            </div>
          </div>
        );
      })}

      {/* Hover Detail Modal Overlay */}
      {activeNode && (
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 z-30 w-72 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200 p-3.5 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-slate-900">{activeNode.label}</span>
            <RiskBadge level={activeNode.riskLevel} size="sm" />
          </div>
          <div className="text-xs font-semibold text-blue-600 mb-1">
            {activeNode.threatType}
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            {activeNode.aiStatus}
          </p>
        </div>
      )}
    </div>
  );
};
