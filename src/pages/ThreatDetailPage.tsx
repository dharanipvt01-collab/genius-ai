import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Shield, ArrowLeft, Cpu, Share2, Fingerprint, Clock, FileText,
  Sparkles, AlertCircle, Loader2, ArrowRight
} from 'lucide-react';
import { api } from '../services/api';
import { ThreatAnalysis, ThreatGraphData, IdentityDNA } from '../types';
import { DigitalThreatTwin } from '../components/threat/DigitalThreatTwin';
import { ThreatIntelligenceGraph } from '../components/threat/ThreatIntelligenceGraph';
import { DigitalIdentityDNA } from '../components/threat/DigitalIdentityDNA';
import { ThreatTimeline } from '../components/threat/ThreatTimeline';
import { InvestigationSequenceModal } from '../components/threat/InvestigationSequenceModal';
import { RiskBadge } from '../components/common/RiskBadge';
import { DemoModeBanner } from '../components/common/DemoModeBanner';

export const ThreatDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [threat, setThreat] = useState<ThreatAnalysis | null>(null);
  const [graphData, setGraphData] = useState<ThreatGraphData | null>(null);
  const [dnaData, setDnaData] = useState<IdentityDNA | null>(null);
  const [activeTab, setActiveTab] = useState<'twin' | 'graph' | 'dna' | 'timeline'>('twin');
  const [isInvestigating, setIsInvestigating] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    let mounted = true;

    Promise.all([
      api.getThreat(id).catch(() => null),
      api.getThreatGraph(id).catch(() => null),
      api.getThreatDNA(id).catch(() => null)
    ]).then(([t, g, d]) => {
      if (mounted) {
        setThreat(t);
        setGraphData(g);
        setDnaData(d);
        setLoading(false);
      }
    });

    return () => { mounted = false; };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
          <p className="text-xs font-semibold text-slate-500">Loading threat intelligence dossier...</p>
        </div>
      </div>
    );
  }

  const indicator = threat?.submitted_indicator || 'https://instagram.com/hdfc_bank_support_24x7_official';
  const riskScore = threat?.risk_score || 93;
  const riskLevel = threat?.risk_level || 'critical';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {threat?.id || id}
              </h1>
              <RiskBadge level={riskLevel} size="md" />
              <DemoModeBanner isDemo={threat?.is_demo ?? true} provenance={threat?.provenance} />
            </div>
            <p className="text-xs font-mono text-slate-500 truncate max-w-xl mt-0.5">
              Subject Indicator: {indicator}
            </p>
          </div>
        </div>

        {/* Large Investigation CTA */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsInvestigating(true)}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 inline-flex items-center gap-2 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Investigate with Genius AI</span>
          </button>

          <Link
            to="/prepare-complaint"
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs inline-flex items-center gap-1.5 transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Prepare Complaint</span>
          </Link>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        {[
          { id: 'twin', label: 'Digital Threat Twin', icon: Cpu },
          { id: 'graph', label: 'Threat Intelligence Graph', icon: Share2 },
          { id: 'dna', label: 'Digital Identity DNA', icon: Fingerprint },
          { id: 'timeline', label: 'Telemetry Timeline', icon: Clock },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tab View */}
      {activeTab === 'twin' && (
        <DigitalThreatTwin
          threatId={threat?.id || id}
          indicator={indicator}
          riskScore={riskScore}
          riskLevel={riskLevel}
        />
      )}

      {activeTab === 'graph' && (
        <ThreatIntelligenceGraph data={graphData || undefined} />
      )}

      {activeTab === 'dna' && (
        <DigitalIdentityDNA data={dnaData || undefined} />
      )}

      {activeTab === 'timeline' && (
        <ThreatTimeline />
      )}

      {/* Investigation Modal */}
      <InvestigationSequenceModal
        indicator={indicator}
        isOpen={isInvestigating}
        onClose={() => setIsInvestigating(false)}
      />
    </div>
  );
};
