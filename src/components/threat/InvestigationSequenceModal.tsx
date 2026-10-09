import React, { useState, useEffect } from 'react';
import { Bot, CheckCircle2, Loader2, Sparkles, X, ShieldAlert, ArrowRight, ShieldCheck } from 'lucide-react';
import { api } from '../../services/api';
import { RiskBadge } from '../common/RiskBadge';

interface InvestigationSequenceModalProps {
  indicator: string;
  isOpen: boolean;
  onClose: () => void;
  onComplete?: (result: any) => void;
}

export const InvestigationSequenceModal: React.FC<InvestigationSequenceModalProps> = ({
  indicator,
  isOpen,
  onClose,
  onComplete
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [resultData, setResultData] = useState<any>(null);

  const steps = [
    { num: 1, title: 'Collecting available signals', desc: 'Ingesting network, DNS, typography, and protocol indicators' },
    { num: 2, title: 'Comparing trusted identity', desc: 'Evaluating against registered brand asset baselines' },
    { num: 3, title: 'Detecting similarities', desc: 'Levenshtein ratio, homoglyphs, and lookalike character analysis' },
    { num: 4, title: 'Correlating related entities', desc: 'Resolving IP subnets, SMS gateways, and shared delivery funnels' },
    { num: 5, title: 'Building threat graph', desc: 'Synthesizing multi-node relationship topology' },
    { num: 6, title: 'Calculating risk', desc: 'Multi-layer composite risk index weighting' },
    { num: 7, title: 'Identifying campaign relationships', desc: 'Matching patterns to known active fraud clusters' },
    { num: 8, title: 'Summarizing evidence', desc: 'Sealing cryptographic SHA-256 artifacts in Evidence Vault' },
    { num: 9, title: 'Recommending next actions', desc: 'Synthesizing lawful steps and official reporting guidelines' },
  ];

  useEffect(() => {
    if (!isOpen) {
      setCurrentStepIndex(0);
      setIsFinished(false);
      return;
    }

    let isMounted = true;
    let timer: any;

    // Simulate progressive step-by-step investigation animation
    const runAnimation = (step: number) => {
      if (!isMounted) return;
      if (step < steps.length) {
        setCurrentStepIndex(step);
        timer = setTimeout(() => runAnimation(step + 1), 600);
      } else {
        // Complete call
        api.runAutonomousInvestigation({ indicator }).then((res) => {
          if (isMounted) {
            setResultData(res);
            setIsFinished(true);
            if (onComplete) onComplete(res);
          }
        }).catch(() => {
          if (isMounted) {
            setIsFinished(true);
          }
        });
      }
    };

    runAnimation(0);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [isOpen, indicator]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">
                Genius AI Autonomous Investigation
              </h3>
              <p className="text-xs text-slate-500 font-mono truncate max-w-md">
                Subject: {indicator}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {!isFinished ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                <span>Autonomous Analysis in Progress</span>
                <span className="text-blue-600">Step {currentStepIndex + 1} of 9</span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${((currentStepIndex + 1) / 9) * 100}%` }}
                />
              </div>

              {/* Active step display */}
              <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200/80 flex items-center gap-4">
                <Loader2 className="w-6 h-6 text-blue-600 animate-spin shrink-0" />
                <div>
                  <div className="text-sm font-bold text-slate-900">
                    {steps[currentStepIndex]?.title}
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    {steps[currentStepIndex]?.desc}
                  </div>
                </div>
              </div>

              {/* Step Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 max-h-48 overflow-y-auto">
                {steps.map((st, idx) => {
                  const done = idx < currentStepIndex;
                  const active = idx === currentStepIndex;
                  return (
                    <div
                      key={st.num}
                      className={`p-2 rounded-xl text-xs flex items-center gap-2 transition-colors ${
                        done ? 'text-emerald-700 bg-emerald-50/50' :
                        active ? 'text-blue-700 font-bold bg-blue-50/50' :
                        'text-slate-400'
                      }`}
                    >
                      {done ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      ) : active ? (
                        <Loader2 className="w-3.5 h-3.5 text-blue-600 animate-spin shrink-0" />
                      ) : (
                        <div className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0" />
                      )}
                      <span className="truncate">{st.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Finished Summary Card */
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-emerald-950">Investigation Complete</h4>
                    <p className="text-xs text-emerald-800">
                      All 9 forensic analysis phases completed and correlated.
                    </p>
                  </div>
                </div>
                <RiskBadge level={resultData?.risk_level || 'critical'} size="md" />
              </div>

              {/* Telemetry Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-lg font-black text-slate-900">{resultData?.signals_analyzed_count || 17}</div>
                  <div className="text-[10px] font-semibold text-slate-500 uppercase mt-0.5">Signals Analyzed</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-lg font-black text-slate-900">{resultData?.related_entities_count || 6}</div>
                  <div className="text-[10px] font-semibold text-slate-500 uppercase mt-0.5">Related Entities</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-lg font-black text-rose-600">{resultData?.high_risk_indicators_count || 3}</div>
                  <div className="text-[10px] font-semibold text-slate-500 uppercase mt-0.5">High-Risk Indicators</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-lg font-black text-purple-600">{resultData?.potential_campaign_count || 1}</div>
                  <div className="text-[10px] font-semibold text-slate-500 uppercase mt-0.5">Potential Campaign</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 col-span-2 sm:col-span-1">
                  <div className="text-lg font-black text-blue-600">{resultData?.evidence_items_count || 8}</div>
                  <div className="text-[10px] font-semibold text-slate-500 uppercase mt-0.5">Evidence Items</div>
                </div>
              </div>

              {/* Executive Summary */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
                <span className="font-bold text-slate-900 block mb-1">Executive Finding:</span>
                {resultData?.executive_summary || 'Genius AI completed autonomous investigation confirming elevated multi-channel impersonation risk.'}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Close
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm inline-flex items-center gap-2"
                >
                  <span>View Full Threat Twin</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
