import React, { useState } from 'react';
import {
  FileText, ExternalLink, Download, PhoneCall, CheckCircle2,
  AlertTriangle, Copy, Check, Sparkles, Shield, Loader2
} from 'lucide-react';
import { api } from '../services/api';

export const PrepareComplaintPage: React.FC = () => {
  const [userStatement, setUserStatement] = useState(
    'On October 9th, 2026, I received an SMS claiming my bank account would be restricted immediately. The message directed me to an unverified customer care portal asking for my banking PIN and OTP.'
  );
  const [lossAmount, setLossAmount] = useState('0');
  const [txRef, setTxRef] = useState('UPI/2026/TX99120');
  const [threatIndicator, setThreatIndicator] = useState('https://instagram.com/hdfc_bank_support_24x7_official');
  const [loading, setLoading] = useState(false);
  const [complaintDossier, setComplaintDossier] = useState<any | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.prepareComplaintSummary({
        user_statement: userStatement,
        financial_loss: parseFloat(lossAmount) || 0.0,
        transaction_reference: txRef,
        threat_id: 'THR-HDFC-9102'
      });
      setComplaintDossier(res);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (complaintDossier?.structured_markdown) {
      navigator.clipboard.writeText(complaintDossier.structured_markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadFile = () => {
    if (!complaintDossier) return;
    const blob = new Blob([complaintDossier.structured_markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `GeniusAI_Complaint_${complaintDossier.complaint_reference}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      {/* Page Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
          <FileText className="w-3.5 h-3.5 text-blue-600" />
          <span>Official Complaint Preparation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Prepare a Cybercrime Complaint
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Genius AI structures your technical evidence, indicators, and narrative into a standard complaint template formatted for official filing on the National Cyber Crime Reporting Portal.
        </p>
      </div>

      {/* Mandatory Regulatory Transparency Notice */}
      <div className="p-4 sm:p-5 rounded-3xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start gap-3.5 shadow-2xs">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Important Regulatory Disclosure:</strong> Genius AI is an independent cybersecurity technology platform and is <strong>not a government website</strong>. Genius AI is not affiliated with the Indian Cyber Crime Coordination Centre (I4C), National Cyber Crime Reporting Portal (NCRP), or state police authorities. Use this compiled dossier to lodge your lawful complaint on the official government portal.
        </div>
      </div>

      {/* Input Preparation Form */}
      <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
          Incident Telemetry & Particulars
        </h3>

        <form onSubmit={handleGenerate} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Suspected Indicator (URL / Handle / Sender ID)
              </label>
              <input
                type="text"
                value={threatIndicator}
                onChange={(e) => setThreatIndicator(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                Reported Financial Loss (₹, enter 0 if none)
              </label>
              <input
                type="number"
                value={lossAmount}
                onChange={(e) => setLossAmount(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Transaction ID / UPI Reference / Bank UTR (if debited)
            </label>
            <input
              type="text"
              value={txRef}
              onChange={(e) => setTxRef(e.target.value)}
              placeholder="e.g. UPI/2026/918230912 or Bank Ref 910283719"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Chronological Narrative / Your Statement
            </label>
            <textarea
              rows={4}
              value={userStatement}
              onChange={(e) => setUserStatement(e.target.value)}
              placeholder="Describe exactly when and how you were contacted, what was claimed, and any actions taken"
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs leading-relaxed focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>Generate Complaint Summary Dossier</span>
          </button>
        </form>
      </div>

      {/* Generated Dossier Preview */}
      {complaintDossier && (
        <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-black text-slate-900">
                  Complaint Dossier Ready ({complaintDossier.complaint_reference})
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Formatted to align with the National Cyber Crime Reporting Portal (NCRP) input fields.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Text'}</span>
              </button>

              <button
                onClick={handleDownloadFile}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download Markdown Report</span>
              </button>
            </div>
          </div>

          {/* Dossier Markdown Display Box */}
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-800 whitespace-pre-wrap overflow-x-auto leading-relaxed max-h-96">
            {complaintDossier.structured_markdown}
          </div>

          {/* Official Escalation CTAs */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-1">
                Official Law Enforcement Filing
              </div>
              <p className="text-xs text-slate-700 leading-normal">
                Take this formatted text and attach your preserved Evidence Vault files on the official government website.
              </p>
            </div>

            <a
              href="https://www.cybercrime.gov.in/"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-md shadow-blue-500/20 inline-flex items-center gap-2 shrink-0 transition-all"
            >
              <span>Continue to Official NCRP</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
