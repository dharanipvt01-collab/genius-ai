import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ShieldAlert, FileText, Database, Compass, Eye, Activity, ShieldCheck, X, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface CommandPaletteProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ 
  isOpen: propIsOpen, 
  onClose: propOnClose 
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = propIsOpen !== undefined ? propIsOpen : internalOpen;
  const onClose = () => {
    if (propOnClose) propOnClose();
    setInternalOpen(false);
  };

  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { role, switchRole } = useAuth();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setInternalOpen(prev => !prev);
        if (propOnClose && propIsOpen) {
          propOnClose();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, propIsOpen, propOnClose]);

  if (!isOpen) return null;

  const commands = [
    { label: 'Universal Threat Analyzer', desc: 'Scan social profile, URL, APK, or SMS', path: '/analyze', icon: ShieldAlert, cat: 'Action' },
    { label: 'Digital Safety Dashboard', desc: 'Personal cyber safety index and recommendations', path: '/dashboard', icon: Activity, cat: 'Navigation' },
    { label: 'Threat Intelligence Graph', desc: 'Interactive node network and correlation topology', path: '/threat-graph', icon: Eye, cat: 'Intelligence' },
    { label: 'Threat Campaigns', desc: 'Discovered coordinated fraud campaigns', path: '/campaigns', icon: Zap, cat: 'Intelligence' },
    { label: 'Evidence Vault', desc: 'SHA-256 sealed digital forensic items', path: '/evidence', icon: Database, cat: 'Evidence' },
    { label: 'Investigation Cases', desc: 'Manage open security cases and timelines', path: '/cases', icon: FileText, cat: 'Cases' },
    { label: 'Safety Navigator', desc: 'Decision tree: What should I do now?', path: '/safety-center', icon: Compass, cat: 'Guidance' },
    { label: 'Prepare Complaint for NCRP', desc: 'Generate official law enforcement report dossier', path: '/prepare-complaint', icon: ShieldCheck, cat: 'Action' },
    { label: 'Analyst Command Center', desc: 'SOC telemetry, threat queue & clusters map', path: '/command-center', icon: Activity, cat: 'Analyst' },
    { label: 'Brand Protection', desc: 'Monitored brand identity & lookalikes', path: '/brand-protection', icon: ShieldCheck, cat: 'Analyst' },
    { label: 'AI Threat Forecast', desc: 'Predict emerging pattern trends', path: '/threat-forecast', icon: Zap, cat: 'Analyst' },
    { label: 'Genius AI Copilot', desc: 'Dedicated analyst inquiry interface', path: '/copilot', icon: Search, cat: 'Analyst' },
  ];

  const filtered = commands.filter(c =>
    c.label.toLowerCase().includes(query.toLowerCase()) ||
    c.desc.toLowerCase().includes(query.toLowerCase()) ||
    c.cat.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, feature name, or indicator... (ESC to close)"
            className="flex-1 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-hidden"
            autoFocus
          />
          <button onClick={onClose} className="p-1 rounded-md text-slate-400 hover:text-slate-700">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-500">
              No matching commands or navigation targets found.
            </div>
          ) : (
            filtered.map((cmd, idx) => {
              const Icon = cmd.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(cmd.path)}
                  className="w-full p-2.5 rounded-xl flex items-center justify-between text-left hover:bg-slate-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{cmd.label}</div>
                      <div className="text-xs text-slate-500">{cmd.desc}</div>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-500">
                    {cmd.cat}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Use <strong>&uarr; &darr;</strong> to navigate, <strong>Enter</strong> to select</span>
          <div className="flex items-center gap-2 text-slate-500">
            <span>Customer Defense OS</span>
            <span>&middot;</span>
            <span className="font-semibold text-blue-600">Helpline: 1930</span>
          </div>
        </div>
      </div>
    </div>
  );
};
