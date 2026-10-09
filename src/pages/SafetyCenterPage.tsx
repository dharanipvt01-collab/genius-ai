import React from 'react';
import { Compass, PhoneCall, ExternalLink, ShieldCheck, AlertTriangle, ArrowRight, Shield, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SafetyNavigator } from '../components/safety/SafetyNavigator';

export const SafetyCenterPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
          <Compass className="w-3.5 h-3.5 text-blue-600" />
          <span>Safety & Lawful Action Center</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Defensive Guidance & Lawful Response
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Navigate digital threat encounters calmly and systematically. Genius AI helps you understand your immediate rights, evidence requirements, and official escalation pathways.
        </p>
      </div>

      {/* Emergency Helpline Callout Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-rose-50 via-rose-100/50 to-white border border-rose-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-md">
            <PhoneCall className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-700">
                National Cyber Crime Helpline
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-200 text-rose-900">
                24x7 Emergency
              </span>
            </div>
            <h3 className="text-lg font-black text-slate-900 mt-0.5">
              Dial <span className="text-rose-600">1930</span> Immediately
            </h3>
            <p className="text-xs text-slate-600 max-w-xl mt-0.5">
              If fraudulent money transfer or unauthorized debit has occurred within the last 2 hours, calling 1930 triggers the Indian Cyber Crime Coordination Centre (I4C) automated inter-bank freeze.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href="tel:1930"
            className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm"
          >
            Call 1930 Now
          </a>
          <a
            href="https://www.cybercrime.gov.in/"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 font-semibold text-xs hover:bg-slate-50 inline-flex items-center gap-1.5"
          >
            <span>NCRP Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Interactive Safety Navigator Decision Tree */}
      <SafetyNavigator />

      {/* Educational Guidelines Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-2xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
            <Lock className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">1. Golden Rule: Never Share OTP</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Bank executives and government officials will never request your One-Time Password, card PIN, or ask you to install remote screen-sharing tools.
          </p>
        </div>

        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-2xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">2. Verify In-App Only</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Never click update links inside unsolicited SMS alerts. Always log in directly via the official banking app downloaded from Google Play or Apple App Store.
          </p>
        </div>

        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-2xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
            <Compass className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">3. Preserve Before Deleting</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Before blocking fraudulent accounts, capture clear screenshots and save full redirect URLs in the Evidence Vault to facilitate law enforcement prosecution.
          </p>
        </div>
      </div>
    </div>
  );
};
