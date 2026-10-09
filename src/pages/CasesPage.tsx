import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Plus, ShieldAlert, ArrowRight, Loader2, Clock, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';
import { Case } from '../types';
import { RiskBadge } from '../components/common/RiskBadge';
import { EmptyState } from '../components/common/EmptyState';

export const CasesPage: React.FC = () => {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newLoss, setNewLoss] = useState('0');
  const [creating, setCreating] = useState(false);

  const fetchCases = async () => {
    try {
      const data = await api.getCases();
      setCases(data);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCases();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    try {
      await api.createCase({
        title: newTitle,
        description: newDesc,
        financial_loss: parseFloat(newLoss) || 0.0,
      });
      setShowCreateModal(false);
      setNewTitle('');
      setNewDesc('');
      setNewLoss('0');
      fetchCases();
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Investigation Cases
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track active security dossiers, preserve evidence trails, and compile NCRP complaints.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm inline-flex items-center gap-2 self-start sm:self-auto transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Investigation Case</span>
        </button>
      </div>

      {/* Case List */}
      {loading ? (
        <div className="py-20 text-center">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-2" />
          <span className="text-xs text-slate-500 font-semibold">Loading case dossiers...</span>
        </div>
      ) : cases.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No Active Cases Yet"
          description="Create an investigation case to organize suspicious indicators, link forensic screenshots, and prepare compliant reports."
          actionButton={{
            label: "Create First Case",
            onClick: () => setShowCreateModal(true)
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cases.map((c) => (
            <Link
              key={c.id}
              to={`/cases/${c.id}`}
              className="p-6 bg-white rounded-3xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                    {c.case_reference}
                  </span>
                  <RiskBadge level={c.risk_level} size="sm" />
                </div>

                <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                  {c.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                  {c.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] font-semibold text-slate-500 capitalize bg-slate-100 px-2 py-0.5 rounded-md">
                  Status: {c.status.replace('_', ' ')}
                </span>
                <span className="font-bold text-blue-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  <span>View Case</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Create Case Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 space-y-4">
            <h3 className="text-base font-black text-slate-900">Initiate New Investigation Case</h3>
            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Case Title
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Bank Customer Support Impersonation SMS & Phishing"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Incident Description
                </label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Describe what occurred, any communication received, and dates"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Reported Financial Loss (₹, optional)
                </label>
                <input
                  type="number"
                  value={newLoss}
                  onChange={(e) => setNewLoss(e.target.value)}
                  placeholder="0"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500/20 font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-sm flex items-center gap-2"
                >
                  {creating && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>Create Case Dossier</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
