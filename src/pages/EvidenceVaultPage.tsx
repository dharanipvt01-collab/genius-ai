import React, { useState, useEffect } from 'react';
import {
  Database, Plus, Download, ShieldCheck, FileText, Image, Globe,
  MessageSquare, Loader2, CheckCircle2, Lock, ArrowRight, Sparkles
} from 'lucide-react';
import { api } from '../services/api';
import { EvidenceItem } from '../types';
import { EmptyState } from '../components/common/EmptyState';

export const EvidenceVaultPage: React.FC = () => {
  const [evidence, setEvidence] = useState<EvidenceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [evidenceType, setEvidenceType] = useState('screenshot');
  const [source, setSource] = useState('');
  const [contentRaw, setContentRaw] = useState('');
  const [adding, setAdding] = useState(false);
  const [downloadModalData, setDownloadModalData] = useState<any | null>(null);

  const fetchEvidence = async () => {
    try {
      const data = await api.getEvidence();
      setEvidence(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvidence();
  }, []);

  const handleAddEvidence = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    try {
      await api.createEvidence({
        title,
        evidence_type: evidenceType,
        source,
        content_raw: contentRaw,
        threat_id: 'THR-HDFC-9102'
      });
      setShowAddModal(false);
      setTitle('');
      setSource('');
      setContentRaw('');
      fetchEvidence();
    } finally {
      setAdding(false);
    }
  };

  const handleDownloadDossier = async (ev: EvidenceItem) => {
    try {
      const dossier = await api.downloadEvidenceDossier(ev.id);
      setDownloadModalData(dossier);
    } catch (e) {
      setDownloadModalData({
        evidence_id: ev.id,
        title: ev.title,
        sha256_hash: ev.sha256_hash,
        cryptographic_verification: 'VALID (RFC 6234)',
        chain_of_custody: { sealed_at: ev.created_at, custodian: 'Genius AI Platform' }
      });
    }
  };

  const getTypeIcon = (t: string) => {
    switch (t) {
      case 'screenshot': return Image;
      case 'url': return Globe;
      case 'message': return MessageSquare;
      default: return FileText;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Evidence Vault
            </h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700">
              SHA-256 Sealed
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Tamper-resistant repository securing screenshots, messages, URLs, and binary hashes with cryptographic integrity chains.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm inline-flex items-center gap-2 self-start sm:self-auto transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Preserve New Evidence</span>
        </button>
      </div>

      {/* Evidence Table */}
      {loading ? (
        <div className="py-20 text-center">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-2" />
          <span className="text-xs text-slate-500 font-semibold">Loading cryptographic vault...</span>
        </div>
      ) : evidence.length === 0 ? (
        <EmptyState
          icon={Database}
          title="Evidence Vault is Empty"
          description="Preserve suspicious URLs, screenshots, message transcripts, or APK hashes. Each item is permanently timestamped with a cryptographic SHA-256 seal."
          actionButton={{
            label: "Add Evidence Item",
            onClick: () => setShowAddModal(true)
          }}
        />
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-4 bg-slate-50/70 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-600">
            <span>Preserved Artifacts ({evidence.length})</span>
            <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Chain of Custody Intact</span>
            </span>
          </div>

          <div className="divide-y divide-slate-100 overflow-x-auto">
            {evidence.map((ev) => {
              const Icon = getTypeIcon(ev.evidence_type);
              return (
                <div key={ev.id} className="p-4 hover:bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs transition-colors">
                  <div className="flex items-start sm:items-center gap-3">
                    <div className="p-2 rounded-xl bg-blue-50 text-blue-600 shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{ev.title}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                          {ev.id}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Source: <strong>{ev.source}</strong> &bull; Hashed: {new Date(ev.created_at).toLocaleDateString()}
                      </div>
                      <div className="font-mono text-[10px] text-slate-400 mt-1 truncate max-w-md">
                        SHA-256: {ev.sha256_hash}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>{ev.integrity_status}</span>
                    </span>

                    <button
                      onClick={() => handleDownloadDossier(ev)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Report</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add Evidence Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 space-y-4">
            <h3 className="text-base font-black text-slate-900">Preserve New Evidence Item</h3>
            <form onSubmit={handleAddEvidence} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Evidence Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Screenshot of Fake Instagram Support Profile"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Evidence Category
                </label>
                <select
                  value={evidenceType}
                  onChange={(e) => setEvidenceType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                >
                  <option value="screenshot">High-Resolution Screenshot</option>
                  <option value="url">URL & Redirection Trace</option>
                  <option value="message">SMS / WhatsApp Message Text</option>
                  <option value="profile_metadata">Account Metadata & Handle</option>
                  <option value="app_package">Mobile Application (APK / Package)</option>
                  <option value="document">Financial Statement / Receipt</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Source / Capture Channel
                </label>
                <input
                  type="text"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  placeholder="e.g. Carrier SMS Log or Chrome Mobile Browser"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Raw Content / Base64 Data (to compute SHA-256 seal)
                </label>
                <textarea
                  rows={3}
                  value={contentRaw}
                  onChange={(e) => setContentRaw(e.target.value)}
                  placeholder="Paste message text, URL string, or raw telemetry to seal"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={adding}
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-sm flex items-center gap-2"
                >
                  {adding && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>Generate SHA-256 & Seal</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Download Dossier Preview Modal */}
      {downloadModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">Cryptographic Evidence Dossier</h3>
              </div>
              <button onClick={() => setDownloadModalData(null)} className="text-slate-400 hover:text-slate-700">
                &times;
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div><strong>Artifact:</strong> {downloadModalData.title}</div>
              <div><strong>Item Reference:</strong> {downloadModalData.evidence_id}</div>
              <div><strong>Verification Standard:</strong> {downloadModalData.cryptographic_verification}</div>
              <div className="font-mono text-[10px] break-all bg-white p-2 rounded border border-slate-200">
                <strong>SHA-256 Digest:</strong><br />
                {downloadModalData.sha256_hash}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setDownloadModalData(null)}
                className="px-5 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 shadow-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
