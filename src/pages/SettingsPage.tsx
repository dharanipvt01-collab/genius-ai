import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { 
  User, Shield, Key, Bell, Cpu, Lock, Sliders, 
  CheckCircle2, RefreshCw, Smartphone, Globe, AlertCircle, Database
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { user, switchRole, updateProfile } = useAuth();
  const { addToast } = useNotifications();

  const [name, setName] = useState(user?.name || '');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [criticalSmsAlerts, setCriticalSmsAlerts] = useState(false);
  const [evidenceHashing, setEvidenceHashing] = useState(true);
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'ai'>('profile');
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateProfile(name);
      addToast('Profile updated successfully', 'success');
    } catch {
      addToast('Failed to update profile', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Sliders className="w-6 h-6 text-blue-600" /> Customer Account & Security
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your personal digital protection settings, credentials, and evidence safeguards.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-4">
        {[
          { id: 'profile', label: 'Customer Profile', icon: User },
          { id: 'security', label: 'Security & Evidence', icon: Lock },
          { id: 'ai', label: 'AI Risk Engine', icon: Cpu },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 px-2 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors ${
                isActive
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
            <h2 className="text-base font-semibold text-slate-800">Identity Details</h2>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Full Legal / Display Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Normalized Email Address</label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full px-3 py-2 border border-slate-100 bg-slate-50 rounded-lg text-sm text-slate-500 cursor-not-allowed"
                />
                <p className="text-xs text-slate-400 mt-1">Verified primary account address.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Assigned Privilege Tier</label>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-800 rounded-full text-xs font-medium uppercase tracking-wider">
                  <Shield className="w-3.5 h-3.5 text-blue-600" />
                  {user?.role || 'Citizen'}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Database User UUID</span>
                  <span className="font-mono text-xs text-slate-700 select-all">{user?.id || '—'}</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Account Registered At</span>
                  <span className="text-xs text-slate-700">
                    {user?.created_at ? new Date(user.created_at).toLocaleString() : 'Active Session'}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors disabled:opacity-50"
                >
                  {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
              <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-slate-600" /> Verification Status
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your identity is anchored with SHA-256 cryptographic session verification. Audit trails record analysis queries for defense evidence preservation.
              </p>
              <div className="flex items-center gap-2 text-xs font-medium text-emerald-600">
                <CheckCircle2 className="w-4 h-4" /> Cryptographic Signatures Active
              </div>
            </div>

            <div className="bg-blue-50/60 border border-blue-200/60 rounded-xl p-5 space-y-2">
              <h3 className="text-sm font-semibold text-blue-900">Digital Risk Protection Plan</h3>
              <p className="text-xs text-blue-800/80 leading-relaxed">
                Genius AI Professional Suite. 24/7 campaign discovery and impersonation radar active.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Security & Evidence Tab */}
      {activeTab === 'security' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
          <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
            <Lock className="w-5 h-5 text-slate-700" /> Cryptographic & Evidence Safeguards
          </h2>
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-start justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div>
                <h4 className="text-sm font-medium text-slate-900">SHA-256 Chain of Custody Seals</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Automatically calculate and preserve cryptographic integrity hashes on all uploaded evidence files.
                </p>
              </div>
              <input
                type="checkbox"
                checked={evidenceHashing}
                onChange={(e) => setEvidenceHashing(e.target.checked)}
                className="mt-1 h-4 w-4 text-blue-600 rounded border-slate-300"
              />
            </div>

            <div className="flex items-start justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div>
                <h4 className="text-sm font-medium text-slate-900">Instant Email Threat Notifications</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Receive alerts when a campaign targeting your protected brands or digital footprint is detected.
                </p>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="mt-1 h-4 w-4 text-blue-600 rounded border-slate-300"
              />
            </div>

            <div className="flex items-start justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div>
                <h4 className="text-sm font-medium text-slate-900">Critical Threat Escalation (SMS/Helpline)</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Priority alert for high-confidence financial scams with immediate National Cyber Crime helpline advice.
                </p>
              </div>
              <input
                type="checkbox"
                checked={criticalSmsAlerts}
                onChange={(e) => setCriticalSmsAlerts(e.target.checked)}
                className="mt-1 h-4 w-4 text-blue-600 rounded border-slate-300"
              />
            </div>
          </div>
        </div>
      )}

      {/* AI Engine Tab */}
      {activeTab === 'ai' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-slate-800 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-blue-600" /> AI Provider & Inference Engine
            </h2>
            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold rounded-full flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Hybrid Inference Ready
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/40 space-y-2">
              <div className="text-xs font-semibold text-blue-800 uppercase tracking-wider flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-blue-600" /> Upstream LLM: Google Gemini
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Configured with <code>GEMINI_API_KEY</code> environment variable. Provides deep reasoning for multi-vector threat campaigns and Copilot natural language queries.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Database className="w-4 h-4 text-slate-600" /> Deterministic Heuristic Engine
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Zero-downtime offline fallback: Levenshtein distance, homoglyph unicode scanning, NLP urgency pattern filters, and graph clustering execute locally without external dependencies.
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-100/70 rounded-lg text-xs text-slate-600 space-y-1">
            <p className="font-semibold text-slate-800">Zero Hallucination Protocol Active:</p>
            <p>Every risk score (0-100) is grounded in concrete explainable signals with documented evidence indicators.</p>
          </div>
        </div>
      )}
    </div>
  );
};
