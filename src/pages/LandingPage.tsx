import React from 'react';
import { Link } from 'react-router-dom';
import {
  Shield, Sparkles, ArrowRight, CheckCircle2, Eye, Share2,
  TrendingUp, Compass, Cpu, Fingerprint, Lock, ShieldAlert, Award
} from 'lucide-react';
import { InteractiveThreatHero } from '../components/threat/InteractiveThreatHero';
import { useAuth } from '../context/AuthContext';

export const LandingPage: React.FC = () => {
  const { user, role } = useAuth();

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 border-b border-slate-200/60 bg-gradient-to-b from-white via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Next-Generation Digital Risk Intelligence</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.08]">
                Detect. Connect. <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                  Predict. Protect.
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed">
                Genius AI doesn't just detect digital threats. It connects the evidence, discovers potential threat campaigns, explains the risk, predicts emerging patterns, and guides users from suspicion to lawful action.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  to={user ? '/analyze' : '/signup'}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all hover:shadow-lg inline-flex items-center justify-center gap-2.5 group"
                >
                  <span>Analyze a Threat</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to={user ? (role === 'analyst' ? '/command-center' : '/dashboard') : '/signin'}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-200 shadow-2xs transition-all inline-flex items-center justify-center gap-2"
                >
                  <span>Explore Genius AI</span>
                </Link>
              </div>

              {/* Key Trust Signals */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Explainable AI Risk Engine</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Digital Threat Twin</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>NCRP Aligned Guidance</span>
                </div>
              </div>
            </div>

            {/* Right Hero Interactive Visual */}
            <div className="lg:col-span-5 flex justify-center">
              <InteractiveThreatHero />
            </div>
          </div>
        </div>
      </section>

      {/* From Suspicion to Lawful Action Transformation Flow */}
      <section className="py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
              Full Lifecycle Intelligence
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3">
              From Suspicion to Lawful Action
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Transform ambiguous online encounters into structured, actionable, and legally preserved intelligence.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 text-center text-xs">
            {[
              { step: '01', title: 'Suspicion', desc: 'Received lure or encounter' },
              { step: '02', title: 'Detection', desc: 'Multi-factor signal analysis' },
              { step: '03', title: 'Evidence', desc: 'Cryptographic SHA-256 seal' },
              { step: '04', title: 'Correlation', desc: 'Threat Graph & Twin links' },
              { step: '05', title: 'Risk Score', desc: '0-100 explainable index' },
              { step: '06', title: 'Safety Guide', desc: 'Decision-tree navigator' },
              { step: '07', title: 'Complaint', desc: 'Formatted dossier preview' },
              { step: '08', title: 'Official NCRP', desc: 'Direct portal & 1930 helpline' },
            ].map((st, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60 hover:border-blue-300 hover:bg-blue-50/30 transition-colors">
                <div className="text-[10px] font-black text-blue-600 font-mono mb-1">{st.step}</div>
                <div className="font-bold text-slate-900 mb-0.5">{st.title}</div>
                <div className="text-[10px] text-slate-500 leading-tight">{st.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Futuristic Differentiators Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              A Futuristic AI Security Operating System
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Engineered with Apple-level simplicity for normal citizens and enterprise depth for cybersecurity analysts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1: Digital Threat Twin */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Digital Threat Twin</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dynamic digital facsimile of the threat ecosystem combining identity mimicry, lookalike URLs, mobile payloads, messages, timeline telemetry, and risk indices into an interactive behavioral model.
              </p>
            </div>

            {/* Feature 2: Threat Intelligence Graph */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                <Share2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">AI Threat Graph</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Connects official brand assets, fake profiles, lookalike hosting domains, SMS lure messages, and sideloaded Android APKs in a fluid spatial graph with evidentiary filters.
              </p>
            </div>

            {/* Feature 3: Digital Identity DNA */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                <Fingerprint className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Digital Identity DNA</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Proprietary behavioral fingerprint comparison matching username structure, domain hierarchy, logo silhouettes, urgency tones, and support routing against authenticated corporate baselines.
              </p>
            </div>

            {/* Feature 4: Threat Campaign Discovery */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Threat Campaign Detection</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automatically clusters isolated malicious entities that share infrastructure, typography, or delivery mechanisms into Potential Coordinated Threat Patterns without reckless attribution.
              </p>
            </div>

            {/* Feature 5: AI Threat Forecast */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">AI Threat Forecast</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Predicts emerging adversary vector pivots across 7 to 14 days, highlighting transitions from generic SMS lures to conversational social media support impersonation and weaponized APKs.
              </p>
            </div>

            {/* Feature 6: Safety Navigator & Official Reporting */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Safety Navigator & NCRP</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Step-by-step decision trees guiding immediate emergency response (Helpline 1930), cryptographic evidence hashing, and seamless formatting for the National Cyber Crime Reporting Portal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="w-14 h-14 rounded-3xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-500/25">
            <Shield className="w-7 h-7 fill-white/20 stroke-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Ready to secure your digital presence?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            Experience the next era of digital risk intelligence. Test simulated scenarios or connect your digital indicators today.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/signup"
              className="px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all inline-flex items-center gap-2"
            >
              <span>Get Started with Genius AI</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/signin"
              className="px-8 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm transition-all"
            >
              Sign In to Existing Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
