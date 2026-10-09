import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldAlert, Globe, Smartphone, MessageSquare, Mail, Phone,
  UserCheck, Sparkles, Loader2, ArrowRight, CheckCircle2, AlertCircle,
  Eye, Cpu, Fingerprint, RefreshCw, FileText
} from 'lucide-react';
import { api } from '../services/api';
import { ThreatAnalysis } from '../types';
import { CircularRiskScore } from '../components/common/CircularRiskScore';
import { RiskBadge } from '../components/common/RiskBadge';
import { AIInsightCard } from '../components/common/AIInsightCard';
import { DemoModeBanner } from '../components/common/DemoModeBanner';

export const UniversalAnalyzerPage: React.FC = () => {
  const [entityType, setEntityType] = useState<string>('social_profile');
  const [indicator, setIndicator] = useState('');
  const [contextNote, setContextNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [threatResult, setThreatResult] = useState<ThreatAnalysis | null>(null);
  const [selectedDemoScenario, setSelectedDemoScenario] = useState('');
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const entityTabs = [
    { id: 'social_profile', label: 'Social Profile', icon: UserCheck, placeholder: 'e.g. https://instagram.com/hdfc_bank_support_24x7_official' },
    { id: 'url', label: 'Website / URL', icon: Globe, placeholder: 'e.g. hxxps://hdfc-bank-verification-login.top/kyc-update' },
    { id: 'app', label: 'Mobile App', icon: Smartphone, placeholder: 'e.g. HDFCSecureQuickSupport_v4.2.apk or package name' },
    { id: 'message', label: 'Scam Message', icon: MessageSquare, placeholder: 'Paste SMS, WhatsApp lure text or email message body' },
    { id: 'email', label: 'Email Address', icon: Mail, placeholder: 'e.g. security-update@hdfc-support-notice.com' },
    { id: 'phone', label: 'Phone Number', icon: Phone, placeholder: 'e.g. +91 98100 51914 or sender header VM-HDFCBK' },
    { id: 'username', label: 'Username', icon: UserCheck, placeholder: 'e.g. @sbi_customer_care_quick' },
  ];

  const analysisSteps = [
    'Collecting signals & network metadata',
    'Analyzing identity & brand trademark assets',
    'Checking visual likeness & character homoglyphs',
    'Evaluating multi-factor risk exposure',
    'Building interactive Threat Graph topology',
    'Generating explainable AI assessment',
  ];

  const demoScenarios = [
    { key: 'fake_bank_support', label: 'Scenario 1: Fake Bank Support Profile', type: 'social_profile', value: 'https://instagram.com/hdfc_bank_support_24x7_official' },
    { key: 'phishing_website', label: 'Scenario 2: Lookalike Phishing Website', type: 'url', value: 'hxxps://hdfc-bank-verification-login.top/kyc-update' },
    { key: 'scam_sms', label: 'Scenario 3: Emergency KYC Suspension SMS', type: 'message', value: 'Dear Customer, your HDFC Bank account will be blocked today due to pending PAN/KYC. Click immediately: hxxps://hdfc-bank-verification-login.top/kyc-update to prevent debit restriction.' },
    { key: 'suspicious_app', label: 'Scenario 4: Suspicious Android APK', type: 'app', value: 'HDFCSecureQuickSupport_v4.2.apk' },
    { key: 'coordinated_campaign', label: 'Scenario 5: Coordinated Impersonation Campaign', type: 'social_profile', value: 'https://twitter.com/hdfc_care_support_24x7' },
    { key: 'brand_protection', label: 'Scenario 6: Brand Protection Surveillance', type: 'url', value: 'hxxps://hdfc-support-portal.vip/login' },
  ];

  const handleSelectDemo = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const key = e.target.value;
    setSelectedDemoScenario(key);
    const found = demoScenarios.find(s => s.key === key);
    if (found) {
      setEntityType(found.type);
      setIndicator(found.value);
      setError(null);
    }
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!indicator.trim()) {
      setError('Please provide a URL, profile handle, message, or indicator to analyze.');
      return;
    }

    setError(null);
    setLoading(true);
    setCurrentStep(0);
    setThreatResult(null);

    // Step animation sequence
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < analysisSteps.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 400);

    try {
      const res = await api.analyzeThreat({
        entity_type: entityType,
        indicator: indicator.trim(),
        context_note: contextNote,
        is_demo_scenario: !!selectedDemoScenario
      });
      clearInterval(interval);
      setThreatResult(res);
    } catch (err: any) {
      clearInterval(interval);
      setError(err.message || "Genius AI couldn't complete the analysis. Please verify the indicator and try again.");
    } finally {
      setLoading(false);
    }
  };

  const currentTab = entityTabs.find(t => t.id === entityType) || entityTabs[0];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Universal Threat Analyzer</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Analyze Anything with Genius AI
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Paste a suspicious URL, social profile link, message, phone number, username, or package to uncover hidden signals, calculate risk, and connect the evidence.
        </p>
      </div>

      {/* Main Analyzer Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        {/* Top Demo Quick-Load Select Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
            <RefreshCw className="w-4 h-4 text-blue-600" />
            <span>Load Pre-Configured Demo Threat:</span>
          </div>

          <select
            value={selectedDemoScenario}
            onChange={handleSelectDemo}
            className="text-xs font-semibold px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="">-- Choose a Demo Scenario --</option>
            {demoScenarios.map((sc) => (
              <option key={sc.key} value={sc.key}>
                {sc.label}
              </option>
            ))}
          </select>
        </div>

        {/* Entity Type Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {entityTabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = entityType === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setEntityType(tab.id);
                  setError(null);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Error message */}
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleAnalyze} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Submit Indicator for Inspection
            </label>
            {entityType === 'message' ? (
              <textarea
                rows={4}
                value={indicator}
                onChange={(e) => setIndicator(e.target.value)}
                placeholder={currentTab.placeholder}
                required
                className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all text-slate-900"
              />
            ) : (
              <input
                type="text"
                value={indicator}
                onChange={(e) => setIndicator(e.target.value)}
                placeholder={currentTab.placeholder}
                required
                className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all text-slate-900 font-mono"
              />
            )}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Optional Context / What made you suspicious?
            </label>
            <input
              type="text"
              value={contextNote}
              onChange={(e) => setContextNote(e.target.value)}
              placeholder="e.g. Sent via SMS claiming my account will be restricted unless I click within 24h"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all text-slate-900"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-60 group"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Genius AI is Analyzing...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-blue-200 group-hover:rotate-12 transition-transform" />
                <span>Analyze with Genius AI</span>
              </>
            )}
          </button>
        </form>

        {/* Step-by-Step Progress Animation Box */}
        {loading && (
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                <span>Investigation Phase: {analysisSteps[currentStep]}</span>
              </span>
              <span className="text-blue-600 font-mono">{currentStep + 1} / {analysisSteps.length}</span>
            </div>

            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / analysisSteps.length) * 100}%` }}
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 text-[11px] text-slate-500">
              {analysisSteps.map((st, i) => (
                <div key={i} className={`flex items-center gap-1.5 ${i <= currentStep ? 'text-blue-700 font-semibold' : 'opacity-40'}`}>
                  {i < currentStep ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  ) : i === currentStep ? (
                    <Loader2 className="w-3.5 h-3.5 text-blue-600 animate-spin shrink-0" />
                  ) : (
                    <div className="w-3 h-3 rounded-full border border-slate-300 shrink-0" />
                  )}
                  <span className="truncate">{st}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Results Section */}
      {threatResult && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-8 animate-in fade-in zoom-in-95 duration-200">
          {/* Top Result Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2.5 mb-1">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">
                  Analysis Dossier
                </h3>
                <RiskBadge level={threatResult.risk_level} size="md" />
                <DemoModeBanner isDemo={threatResult.is_demo} provenance={threatResult.provenance} />
              </div>
              <p className="text-xs font-mono text-slate-500 truncate max-w-xl">
                Indicator: {threatResult.submitted_indicator}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate(`/threats/${threatResult.id}`)}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 shadow-xs inline-flex items-center gap-1.5"
              >
                <span>View Full Threat Twin</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Risk Score & Component Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Circular Gauge */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Explainable Risk Score
              </span>
              <CircularRiskScore score={threatResult.risk_score} size={150} strokeWidth={14} />
              <div className="mt-3 text-[11px] text-slate-500 font-medium text-center">
                Confidence: <strong>{threatResult.confidence}%</strong> &bull; Non-Accusatory Classification
              </div>
            </div>

            {/* Score Breakdown Bars */}
            <div className="md:col-span-8 space-y-3.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Multi-Factor Breakdown
              </h4>

              <div className="space-y-3">
                {[
                  { label: 'Brand Similarity', score: threatResult.breakdown?.brand_similarity || 90 },
                  { label: 'Username & Handle Similarity', score: threatResult.breakdown?.username_similarity || 85 },
                  { label: 'URL / Domain Risk', score: threatResult.breakdown?.url_similarity || 95 },
                  { label: 'Content & Pressure Risk', score: threatResult.breakdown?.content_risk || 80 },
                  { label: 'Identity Signals Divergence', score: threatResult.breakdown?.identity_signals || 92 },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-700">{item.label}</span>
                      <span className="font-mono font-bold text-slate-900">{item.score}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          item.score >= 80 ? 'bg-rose-500' : item.score >= 60 ? 'bg-orange-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Explanation Card */}
          <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900">
                Why Genius AI thinks this is risky
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed pl-6">
              {threatResult.explanation}
            </p>
          </div>

          {/* Detected Observable Signals List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Observable Forensic Signals ({threatResult.signals?.length || 0})
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {threatResult.signals?.map((sig, sIdx) => (
                <div key={sIdx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{sig.category}</span>
                    <span className="text-[10px] font-mono text-blue-600 font-bold">Weight: {sig.weight}</span>
                  </div>
                  <div className="text-slate-700 font-medium">{sig.signal}</div>
                  <div className="text-slate-500 text-[11px] leading-snug">{sig.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Actions Sequence */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Recommended Lawful Actions
            </h4>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-700">
              {threatResult.recommended_actions?.map((act, aIdx) => (
                <div key={aIdx} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 text-[11px]">
                    {aIdx + 1}
                  </span>
                  <span>{act}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Action Buttons for Next Steps */}
          <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={() => navigate(`/threats/${threatResult.id}`)}
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs inline-flex items-center gap-2"
            >
              <Cpu className="w-4 h-4" />
              <span>Open Threat Twin</span>
            </button>

            <Link
              to="/prepare-complaint"
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs inline-flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>Prepare NCRP Complaint</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
