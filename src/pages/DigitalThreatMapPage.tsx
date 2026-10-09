import React, { useState } from 'react';
import { Globe, MapPin, AlertTriangle, Shield, Info, ArrowRight } from 'lucide-react';
import { RiskBadge } from '../components/common/RiskBadge';

export const DigitalThreatMapPage: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<any | null>(null);

  const clusters = [
    { city: 'Chennai', threat_count: 42, critical: 8, dominant_type: 'Banking SMS Phishing', coordinates: { x: 55, y: 78 } },
    { city: 'Bengaluru', threat_count: 68, critical: 14, dominant_type: 'Social Media Impersonation', coordinates: { x: 42, y: 74 } },
    { city: 'Hyderabad', threat_count: 39, critical: 7, dominant_type: 'Electricity Bill Disconnection Lures', coordinates: { x: 48, y: 60 } },
    { city: 'Mumbai', threat_count: 85, critical: 22, dominant_type: 'Investment & Crypto Schemes', coordinates: { x: 28, y: 56 } },
    { city: 'Delhi NCR', threat_count: 76, critical: 18, dominant_type: 'Trojanized Support APKs', coordinates: { x: 38, y: 28 } },
  ];

  const active = selectedCity || clusters[1]; // default Bengaluru

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-blue-600" />
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Geospatial Threat Map
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Cluster telemetry mapping regional adversary campaigns and dominant scam vectors.
        </p>
      </div>

      {/* Mandatory Regulatory Transparency Notice */}
      <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <strong>Demonstration Intelligence Disclaimer:</strong> The geographic threat clusters displayed below represent simulated synthetic telemetry for demonstration and architectural showcase purposes. Genius AI does not claim real-time nationwide telemetry feeds without authenticated enterprise sensor integrations.
        </div>
      </div>

      {/* Map & Cluster Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* SVG Interactive Map Area */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800">
            <span>Regional Hotspot Sensors</span>
            <span className="text-slate-400 font-mono">5 Metropolitan Hubs</span>
          </div>

          <div className="relative aspect-4/3 bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden flex items-center justify-center p-6">
            {/* Subtle stylized radar background grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-40" />

            {/* Clusters on Canvas */}
            {clusters.map((c, idx) => {
              const isSelected = active.city === c.city;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedCity(c)}
                  className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-125 z-10"
                  style={{ left: `${c.coordinates.x}%`, top: `${c.coordinates.y}%` }}
                >
                  <div className="relative flex items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-rose-400 opacity-60" />
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shadow-md font-bold text-xs ${
                      isSelected
                        ? 'bg-rose-600 text-white border-white scale-110 ring-4 ring-rose-200'
                        : 'bg-white text-rose-700 border-rose-500'
                    }`}>
                      {c.critical}
                    </div>
                  </div>
                  <span className="absolute top-9 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-bold px-2 py-0.5 rounded-md bg-white/90 border border-slate-200 shadow-2xs text-slate-800">
                    {c.city}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected City Detail Card */}
        <div className="lg:col-span-5 bg-white p-7 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900">{active.city} Cluster</h3>
                <p className="text-xs text-slate-500">Regional sensor telemetry</p>
              </div>
            </div>
            <RiskBadge level="high" size="sm" />
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Total Active Signals</span>
                <span className="text-2xl font-black text-slate-900 font-mono mt-1 block">{active.threat_count}</span>
              </div>
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
                <span className="text-[10px] font-bold uppercase text-rose-700 block">Critical Vectors</span>
                <span className="text-2xl font-black text-rose-700 font-mono mt-1 block">{active.critical}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Dominant Regional Modus Operandi</span>
              <span className="font-bold text-slate-900 text-sm">{active.dominant_type}</span>
              <p className="text-[11px] text-slate-500 pt-1 leading-normal">
                High frequency of targeted lookalikes exploiting local language banking and public utility payment frameworks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
