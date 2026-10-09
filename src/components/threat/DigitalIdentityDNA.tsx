import React from 'react';
import { Fingerprint, CheckCircle2, AlertOctagon, HelpCircle, Shield, Award } from 'lucide-react';
import { IdentityDNA } from '../../types';

interface DigitalIdentityDNAProps {
  data?: IdentityDNA;
  className?: string;
}

export const DigitalIdentityDNA: React.FC<DigitalIdentityDNAProps> = ({
  data,
  className = ''
}) => {
  const fallbackData: IdentityDNA = {
    overall_match_percentage: 93,
    trusted_fingerprint: 'ID-DNA-7A9B1C2D3E4F',
    suspicious_fingerprint: 'ID-DNA-8F4E3D2C1B9A',
    trusted_entity: {
      name: 'HDFC Bank',
      domain: 'hdfcbank.com',
      handle: '@hdfcbank_official'
    },
    suspicious_entity: {
      indicator: 'https://instagram.com/hdfc_bank_support_24x7_official',
      type: 'social_profile'
    },
    dimensions: [
      { name: 'Username & Handle Pattern', score: 92, trusted: 'Official Namespace Rules', suspicious: 'Unverified 24x7 Support Suffix', status: 'High visual likeness' },
      { name: 'Domain Hierarchy', score: 95, trusted: 'Registered TLD (.com)', suspicious: 'Non-standard TLD (.top)', status: 'Disposable registry mismatch' },
      { name: 'Logo & Visual Silhouette', score: 89, trusted: 'Cryptographic Asset Seal', suspicious: 'Re-encoded Palette Match', status: 'Trademark silhouette mimicry' },
      { name: 'Language & Urgency Tone', score: 88, trusted: 'Advisory Compliance Tone', suspicious: 'Urgent Threat of Account Block', status: 'Urgency coercion trigger' },
      { name: 'Support Channel Gateway', score: 94, trusted: 'Authenticated In-App Portal', suspicious: 'Direct Unverified URL Bio Redirect', status: 'Unsecured route diversion' },
    ],
    disclaimer: "Digital Identity DNA is Genius AI's proprietary risk modeling concept and not an official industry standard or government certification."
  };

  const dna = data || fallbackData;

  return (
    <div className={`p-6 bg-white rounded-2xl border border-slate-200 shadow-xs ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Fingerprint className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              Digital Identity DNA
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700">
                Fingerprint Variance
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Bi-directional fingerprint alignment comparison
            </p>
          </div>
        </div>

        {/* Big Match Badge */}
        <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
          <span className="text-xs text-slate-500 font-medium">Likeness Match:</span>
          <span className="text-base font-black text-rose-600">
            {dna.overall_match_percentage}%
          </span>
          <span className="text-[11px] font-bold text-rose-600 uppercase">High Impersonation Risk</span>
        </div>
      </div>

      {/* Side-by-side Visual Fingerprints */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        {/* Trusted Identity Card */}
        <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-200/80">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                Trusted Identity (Baseline)
              </span>
            </div>
            <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded-md border border-emerald-200 text-emerald-700 font-bold">
              {dna.trusted_fingerprint}
            </span>
          </div>

          <div className="space-y-1 text-xs">
            <div className="font-bold text-slate-900">{dna.trusted_entity.name}</div>
            <div className="text-slate-600 font-mono text-[11px]">{dna.trusted_entity.domain}</div>
            <div className="text-slate-500">{dna.trusted_entity.handle}</div>
          </div>
        </div>

        {/* Suspicious Identity Card */}
        <div className="p-4 rounded-xl bg-rose-50/40 border border-rose-200/80">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <AlertOctagon className="w-4 h-4 text-rose-600" />
              <span className="text-xs font-bold text-rose-900 uppercase tracking-wider">
                Suspicious Identity (Candidate)
              </span>
            </div>
            <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded-md border border-rose-200 text-rose-700 font-bold">
              {dna.suspicious_fingerprint}
            </span>
          </div>

          <div className="space-y-1 text-xs">
            <div className="font-bold text-slate-900 truncate">{dna.suspicious_entity.indicator}</div>
            <div className="text-slate-600 capitalize">Type: {dna.suspicious_entity.type.replace('_', ' ')}</div>
            <div className="text-rose-600 font-semibold text-[11px]">Unverified Third-Party Host</div>
          </div>
        </div>
      </div>

      {/* Dimensional Alignment Breakdown */}
      <div className="space-y-3.5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
          Signal Dimensions Breakdown
        </h4>

        {dna.dimensions.map((dim, idx) => (
          <div key={idx} className="p-3 rounded-xl bg-slate-50/80 border border-slate-100">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-bold text-slate-800">{dim.name}</span>
              <span className="font-mono font-bold text-slate-700">{dim.score}% Match</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-200 rounded-full h-2 mb-2 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  dim.score >= 85 ? 'bg-rose-500' : dim.score >= 60 ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${dim.score}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span>Trusted: <strong>{dim.trusted}</strong></span>
              <span className="text-rose-700 font-medium">{dim.status}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Product Concept Notice */}
      <div className="mt-5 pt-4 border-t border-slate-100 text-[11px] text-slate-400 text-center">
        {dna.disclaimer}
      </div>
    </div>
  );
};
