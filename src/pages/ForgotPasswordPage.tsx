import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowLeft, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { api } from '../services/api';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [demoToken, setDemoToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await api.forgotPassword(email);
      setSuccessMsg('Password reset instructions have been generated.');
      if (res.demo_reset_token) {
        setDemoToken(res.demo_reset_token);
      }
    } catch (err: any) {
      setError(err.message || 'Could not process password reset.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200/80 p-8">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md">
              <Shield className="w-5 h-5 fill-white/20 stroke-white" />
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tight">Genius AI</span>
          </Link>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Reset password</h2>
          <p className="text-xs text-slate-500 mt-1">
            Enter your email to receive recovery instructions
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {successMsg ? (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{successMsg}</span>
            </div>

            {demoToken && (
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs space-y-2">
                <div className="font-bold text-blue-900">Demo Reset Token Generated:</div>
                <div className="font-mono text-[11px] bg-white p-2 rounded-lg border border-blue-200 select-all">
                  {demoToken}
                </div>
                <Link
                  to={`/reset-password?token=${demoToken}`}
                  className="block text-center py-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors"
                >
                  Proceed to Reset Password
                </Link>
              </div>
            )}

            <Link
              to="/signin"
              className="w-full py-2.5 rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 text-xs font-semibold flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Sign In</span>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all text-slate-900"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Send Reset Link'}
            </button>

            <div className="text-center pt-2">
              <Link to="/signin" className="text-xs font-semibold text-slate-500 hover:text-slate-800 inline-flex items-center gap-1.5">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Sign in</span>
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
