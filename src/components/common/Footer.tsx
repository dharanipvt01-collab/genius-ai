import React from 'react';
import { Shield, PhoneCall, ExternalLink, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200/80 pt-12 pb-8 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-100">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
                <Shield className="w-4 h-4 fill-white/20 stroke-white" />
              </div>
              <span className="text-lg font-black tracking-tight text-slate-900">Genius AI</span>
            </div>
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
              "Detect. Connect. Predict. Protect."
            </p>
            <p className="text-xs text-slate-500 max-w-md leading-relaxed">
              Genius AI is an AI-powered Digital Risk Intelligence Platform that connects suspicious digital identities, websites, apps, messages, and evidence to uncover potential threat campaigns, explain risk, forecast emerging patterns, and guide users from suspicion to lawful action.
            </p>
          </div>

          {/* Quick Platform Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Platform Modules
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/analyze" className="hover:text-blue-600 transition-colors">Universal Threat Analyzer</Link></li>
              <li><Link to="/threat-graph" className="hover:text-blue-600 transition-colors">AI Threat Graph</Link></li>
              <li><Link to="/campaigns" className="hover:text-blue-600 transition-colors">Campaign Discovery</Link></li>
              <li><Link to="/evidence" className="hover:text-blue-600 transition-colors">Evidence Vault</Link></li>
              <li><Link to="/safety-center" className="hover:text-blue-600 transition-colors">Safety Navigator</Link></li>
              <li><Link to="/prepare-complaint" className="hover:text-blue-600 transition-colors">Prepare Complaint</Link></li>
            </ul>
          </div>

          {/* Official Law Enforcement Reporting Info */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Lawful Action & Helpline
            </h4>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-900 font-semibold">
                <PhoneCall className="w-4 h-4 text-rose-600" />
                <span>Cybercrime Helpline: <strong>1930</strong></span>
              </div>
              <p className="text-[11px] text-slate-500 leading-normal">
                If monetary loss has occurred, dial 1930 immediately to initiate rapid transaction freezing.
              </p>
              <a
                href="https://www.cybercrime.gov.in/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline pt-1"
              >
                <span>National Portal (NCRP)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer & Transparency */}
        <div className="pt-6 space-y-3">
          <div className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-200/60 text-[11px] text-amber-900 leading-relaxed">
            <strong>Legal and Regulatory Disclaimer:</strong> Genius AI provides general cybersecurity information, algorithmic risk scoring, and evidentiary correlation for risk intelligence purposes. Genius AI is not a government website and is not affiliated with I4C, NCRP, law enforcement agencies, or police authorities. Risk ratings are platform assessments and do not determine legal liability.
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
            <span>&copy; {new Date().getFullYear()} Genius AI Intelligence Platform. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <Link to="/safety-center" className="hover:underline">Legal Information</Link>
              <Link to="/settings" className="hover:underline">Privacy & Security</Link>
              <span>Built for High-Stakes Threat Protection</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
