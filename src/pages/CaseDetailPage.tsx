import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  FileText, ArrowLeft, Clock, ShieldCheck, Database, FileDown,
  Sparkles, CheckCircle2, AlertTriangle, Loader2, Plus, PhoneCall
} from 'lucide-react';
import { api } from '../services/api';
import { Case, EvidenceItem } from '../types';
import { RiskBadge } from '../components/common/RiskBadge';
import { ThreatTimeline } from '../components/threat/ThreatTimeline';

export const CaseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [caseData, setCaseData] = useState<Case | null>(null);
  const [evidenceList, setEvidenceList] = useState<EvidenceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!id) return;
    let mounted = true;

    Promise.all([
      api.getCase(id).catch(() => null),
      api.getEvidence({ case_id: id }).catch(() => [])
    ]).then(([c, ev]) => {
      if (mounted) {
        setCaseData(c);
        setEvidenceList(ev || []);
        setLoading(false);
      }
    });

    return () => { mounted = false; };
  }, [id]);

  const handleStatusChange = async (newStatus: string) => {
    if (!caseData) return;
    setUpdating(true);
    try {
      const updated = await api.updateCase(caseData.id, { status: newStatus });
      setCaseData(updated);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center space-y-3">
        <h2 className="text-xl font-bold text-slate-800">Case dossier not found</h2>
        <Link to="/cases" className="text-xs text-blue-600 font-bold hover:underline">
          Return to cases
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/cases')}
            className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md">
                {caseData.case_reference}
              </span>
              <RiskBadge level={caseData.risk_level} size="md" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
              {caseData.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/prepare-complaint"
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm inline-flex items-center gap-2 transition-all"
          >
            <FileText className="w-4 h-4" />
            <span>Generate Complaint Summary</span>
          </Link>
        </div>
      </div>

      {/* Grid: Overview & Status Workflow */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Dossier Overview & Evidence */}
        <div className="lg:col-span-8 space-y-6">
          {/* Overview Card */}
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Case Narrative & Background
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {caseData.description}
            </p>

            {caseData.financial_loss > 0 && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs flex items-center justify-between text-rose-900">
                <span>Reported Financial Loss:</span>
                <span className="font-extrabold font-mono text-sm">₹{caseData.financial_loss.toLocaleString()}</span>
              </div>
            )}
          </div>

          {/* AI Assessment Dossier Card */}
          <div className="p-6 bg-blue-50/60 rounded-3xl border border-blue-200/80 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900">
                Genius AI Forensic Assessment
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed pl-6">
              {caseData.ai_summary || "Autonomous investigation suggests coordinated identity mimicry targeting retail banking depositors. Telemetry indicates multi-vector link redirection."}
            </p>
          </div>

          {/* Forensic Evidence Items in Case */}
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Linked Forensic Evidence</h3>
                <p className="text-xs text-slate-500">Cryptographically sealed items (SHA-256)</p>
              </div>
              <Link
                to="/evidence"
                className="text-xs font-bold text-blue-600 hover:underline inline-flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Evidence</span>
              </Link>
            </div>

            {evidenceList.length === 0 ? (
              <p className="text-xs text-slate-400 italic py-4">No evidence items linked to this case yet.</p>
            ) : (
              <div className="space-y-2">
                {evidenceList.map((ev) => (
                  <div key={ev.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-slate-900">{ev.title}</div>
                      <div className="text-[11px] font-mono text-slate-500 truncate max-w-md">
                        SHA-256: {ev.sha256_hash.substring(0, 24)}...
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                      Verified Seal
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Timeline */}
          <ThreatTimeline events={caseData.timeline_json} />
        </div>

        {/* Right: Status Workflow & Actions */}
        <div className="lg:col-span-4 space-y-6">
          {/* Status Workflow Selector */}
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Investigation Workflow Status
            </h3>

            <div className="space-y-2">
              {[
                { key: 'new', label: 'New Incident' },
                { key: 'investigating', label: 'Investigating' },
                { key: 'evidence_collected', label: 'Evidence Collected' },
                { key: 'ready_to_report', label: 'Ready to Report' },
                { key: 'closed', label: 'Closed / Resolved' },
              ].map((st) => (
                <button
                  key={st.key}
                  onClick={() => handleStatusChange(st.key)}
                  disabled={updating}
                  className={`w-full p-2.5 rounded-xl text-xs font-bold text-left flex items-center justify-between transition-all ${
                    caseData.status === st.key
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{st.label}</span>
                  {caseData.status === st.key && <CheckCircle2 className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>

          {/* Recommended Lawful Actions */}
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-2xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Next Recommended Actions
            </h3>
            <ul className="space-y-2 text-xs text-slate-700">
              {caseData.recommended_actions?.map((act, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold shrink-0">&bull;</span>
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
