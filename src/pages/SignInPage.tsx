import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Shield, Eye, EyeOff, Loader2, AlertCircle, Sparkles, 
  UserCheck, CheckCircle2, ArrowRight, Lock, Key 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const SignInPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectParam = (location.state as any)?.from?.pathname;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !password) {
      setError('Please enter both your registered email address and password.');
      return;
    }

    setLoading(true);
    try {
      await login(cleanEmail, password);
      const targetPath = redirectParam || '/dashboard';
      navigate(targetPath, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Invalid email address or password. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleInstantDemoLogin = async () => {
    setEmail('citizen@geniusai.io');
    setPassword('CitizenPass2026!');
    setError(null);
    setLoading(true);
    try {
      await login('citizen@geniusai.io', 'CitizenPass2026!');
      navigate(redirectParam || '/dashboard', { replace: true });
    } catch (err: any) {
      setError(err.message || 'Demo authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-100/60 to-slate-50 flex flex-col justify-center items-center px-4 py-12 selection:bg-blue-100 selection:text-blue-900">
      {/* Brand Header */}
      <div className="w-full max-w-md text-center mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
        <div className="inline-flex items-center justify-center gap-2 mb-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/25 ring-4 ring-blue-50">
            <Shield className="w-6 h-6 fill-white/20 stroke-white" />
          </div>
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Genius AI</h1>
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mt-1">
          Detect &middot; Connect &middot; Predict &middot; Protect
        </p>
        <p className="text-xs text-slate-500 mt-1.5 max-w-xs mx-auto">
          AI-Powered Digital Risk Intelligence & Personal Cyber Defense
        </p>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-200/90 p-8 sm:p-10 animate-in fade-in zoom-in-95 duration-200">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Customer Sign In</h2>
          <p className="text-xs text-slate-500 mt-1">
            Access your personal safety score, threat twin, and evidence vault
          </p>
        </div>

        {/* 1-Click Instant Demo Login Banner */}
        <div className="mb-6 p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-2.5">
          <div className="flex items-center justify-between text-xs font-semibold text-blue-900">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Instant Test Access</span>
            </div>
            <span className="text-[10px] font-bold text-blue-700 bg-white px-2 py-0.5 rounded-full border border-blue-200 shadow-2xs">
              Pre-Seeded
            </span>
          </div>
          <button
            type="button"
            onClick={handleInstantDemoLogin}
            disabled={loading}
            className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-blue-600 hover:text-white text-slate-800 text-xs font-bold border border-slate-200 hover:border-blue-600 shadow-xs transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <UserCheck className="w-4 h-4 text-blue-600 group-hover:text-white transition-colors" />
            <span>1-Click Customer Demo Sign In</span>
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span className="leading-relaxed">{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. sarah@example.com"
              required
              autoComplete="email"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all text-slate-900 bg-white placeholder:text-slate-400"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Password
              </label>
              <Link to="/forgot-password" tabIndex={-1} className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                autoComplete="current-password"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all text-slate-900 pr-10 bg-white placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
              />
              <span className="text-xs text-slate-600">Remember this browser</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying Credentials...</span>
              </>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Security Assurance Badge */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] text-slate-400">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Encrypted Database Storage &middot; Argon2/Bcrypt Secured</span>
        </div>

        {/* Footer */}
        <div className="mt-4 text-center text-xs text-slate-500">
          New to Genius AI?{' '}
          <Link to="/signup" className="font-bold text-blue-600 hover:underline">
            Create an account
          </Link>
        </div>
      </div>

      {/* Trust & Safety Disclaimer */}
      <div className="mt-8 text-center text-[11px] text-slate-400 max-w-sm">
        Independent AI Digital Risk Protection Platform &middot; All sessions cryptographically verified
      </div>
    </div>
  );
};
