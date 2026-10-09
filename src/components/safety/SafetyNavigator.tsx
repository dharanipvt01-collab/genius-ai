import React, { useState } from 'react';
import { Compass, PhoneCall, ExternalLink, ShieldCheck, AlertTriangle, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SafetyNavigator: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [step, setStep] = useState<'root' | 'lost_money' | 'no_money' | 'clicked_link'>('root');

  const reset = () => setStep('root');

  return (
    <div className={`p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-sm ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900">
              Safety Navigator
            </h3>
            <p className="text-xs text-slate-500">
              What should I do now? Interactive lawful response guide
            </p>
          </div>
        </div>

        {step !== 'root' && (
          <button
            onClick={reset}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Start Over</span>
          </button>
        )}
      </div>

      {/* Decision Tree Content */}
      <div className="py-6">
        {step === 'root' && (
          <div className="space-y-6">
            <div className="text-center max-w-md mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                Step 1 of 2
              </span>
              <h4 className="text-lg font-bold text-slate-900 mt-3 mb-1">
                Did you experience any financial loss or unauthorized debit?
              </h4>
              <p className="text-xs text-slate-500">
                Choose the situation that best matches what happened to receive exact actionable guidance.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
              {/* Option: YES */}
              <button
                onClick={() => setStep('lost_money')}
                className="p-5 rounded-2xl border-2 border-rose-200 bg-rose-50/40 hover:bg-rose-50 hover:border-rose-400 text-left transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black uppercase text-rose-700 bg-rose-100 px-2 py-0.5 rounded-md">
                      YES
                    </span>
                    <AlertTriangle className="w-5 h-5 text-rose-600 group-hover:scale-110 transition-transform" />
                  </div>
                  <h5 className="text-sm font-bold text-slate-900 mb-1">
                    Money was transferred or debited
                  </h5>
                  <p className="text-xs text-slate-600 leading-normal">
                    UPI, net banking, or debit card transaction was unauthorizedly executed.
                  </p>
                </div>
                <div className="mt-4 text-xs font-bold text-rose-700 flex items-center gap-1">
                  <span>Emergency steps</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>

              {/* Option: NO */}
              <button
                onClick={() => setStep('no_money')}
                className="p-5 rounded-2xl border-2 border-blue-200 bg-blue-50/30 hover:bg-blue-50 hover:border-blue-400 text-left transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black uppercase text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md">
                      NO
                    </span>
                    <ShieldCheck className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                  </div>
                  <h5 className="text-sm font-bold text-slate-900 mb-1">
                    No financial transaction occurred
                  </h5>
                  <p className="text-xs text-slate-600 leading-normal">
                    I only received a suspicious message, saw an impersonator, or opened a link.
                  </p>
                </div>
                <div className="mt-4 text-xs font-bold text-blue-700 flex items-center gap-1">
                  <span>Preventative action</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Branch: Financial Loss Occurred */}
        {step === 'lost_money' && (
          <div className="space-y-6 max-w-2xl mx-auto animate-in fade-in duration-200">
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-rose-950">Immediate Priority: Dial 1930</h4>
                  <p className="text-xs text-rose-800">
                    The golden hour protocol freezes fraudulent funds across Indian banks.
                  </p>
                </div>
              </div>
              <a
                href="tel:1930"
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs"
              >
                Call 1930 Now
              </a>
            </div>

            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Recommended Action Sequence
              </h5>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs text-slate-700">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center shrink-0 text-[11px]">1</span>
                  <div>
                    <strong>Dial 1930 immediately:</strong> Provide your account details, transaction timestamp, and UPI reference ID to trigger rapid inter-bank freeze.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center shrink-0 text-[11px]">2</span>
                  <div>
                    <strong>Preserve transaction evidence:</strong> Capture clear screenshots of your bank SMS, UPI debit confirmation, and account statement.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center shrink-0 text-[11px]">3</span>
                  <div>
                    <strong>Prepare your cybercrime complaint:</strong> Use Genius AI's Complaint Generator to format a formal evidentiary summary.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center shrink-0 text-[11px]">4</span>
                  <div>
                    <strong>Submit on official portal:</strong> File the complaint directly on the National Cyber Crime Reporting Portal.
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Link
                to="/prepare-complaint"
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold inline-flex items-center gap-2 shadow-xs"
              >
                <span>Prepare Complaint Dossier</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://www.cybercrime.gov.in/"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 text-xs font-semibold inline-flex items-center gap-1.5"
              >
                <span>Continue to Official NCRP</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {/* Branch: No Financial Loss */}
        {step === 'no_money' && (
          <div className="space-y-6 max-w-2xl mx-auto animate-in fade-in duration-200">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-emerald-950">Great: Financial Risk Mitigated</h4>
                  <p className="text-xs text-emerald-800">
                    Follow defensive hygiene to prevent identity or credential exposure.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs text-slate-700">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Do not click suspicious links or download attachments:</strong> Ensure no APKs or remote desktop apps (AnyDesk, TeamViewer) were installed.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Preserve the evidence:</strong> Store the sender number, full URL, or profile link in the Genius AI Evidence Vault for threat graph mapping.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Report on the platform:</strong> Flag the fake profile or spam SMS through your social media app or carrier DND mechanism.
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Link
                to="/analyze"
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold inline-flex items-center gap-2 shadow-xs"
              >
                <span>Analyze Another Indicator</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/evidence"
                className="px-4 py-2 rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 text-xs font-semibold"
              >
                Store in Evidence Vault
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Mandatory Disclaimer */}
      <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400 text-center">
        General digital safety guidance. This does not constitute legal counsel or judicial instruction.
      </div>
    </div>
  );
};
