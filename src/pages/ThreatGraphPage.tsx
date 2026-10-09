import React, { useState, useEffect } from 'react';
import { Share2, ArrowLeft, Loader2, Sparkles, Filter, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { ThreatGraphData } from '../types';
import { ThreatIntelligenceGraph } from '../components/threat/ThreatIntelligenceGraph';

export const ThreatGraphPage: React.FC = () => {
  const navigate = useNavigate();
  const [graphData, setGraphData] = useState<ThreatGraphData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    api.getThreatGraph('THR-HDFC-9102')
      .then((g) => {
        if (mounted) setGraphData(g);
      })
      .catch(() => {})
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => { mounted = false; };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              AI Threat Intelligence Graph
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Interactive relationship network connecting brands, impersonator profiles, phishing gates, SMS lures, and mobile APKs.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700">
            Multi-Node Topological Graph
          </span>
        </div>
      </div>

      {/* Main Fullscreen Interactive Graph */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-2 sm:p-6 space-y-4">
        <ThreatIntelligenceGraph data={graphData || undefined} />
      </div>

      {/* Forensic Information Box */}
      <div className="p-5 rounded-3xl bg-blue-50/50 border border-blue-200 text-xs text-blue-900 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Topological Graph Analysis:</strong> Genius AI utilizes automated graph generation to correlate observed telemetry. Clicking any node provides instantaneous entity attribution, evidence provenance, and verified indicators. Connections represent signal similarities and do not constitute confirmed criminal indictment.
        </div>
      </div>
    </div>
  );
};
