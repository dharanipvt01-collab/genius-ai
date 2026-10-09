import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Filter, Search, Loader2, ArrowRight, Eye, RefreshCw } from 'lucide-react';
import { api } from '../services/api';
import { ThreatAnalysis } from '../types';
import { RiskBadge } from '../components/common/RiskBadge';

export const ThreatQueuePage: React.FC = () => {
  const [threats, setThreats] = useState<ThreatAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const fetchThreats = async () => {
    setLoading(true);
    try {
      const data = await api.getThreats({
        risk_level: riskFilter !== 'all' ? riskFilter : undefined,
        entity_type: typeFilter !== 'all' ? typeFilter : undefined
      });
      setThreats(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchThreats();
  }, [riskFilter, typeFilter]);

  const filteredThreats = threats.filter(t =>
    t.submitted_indicator.toLowerCase().includes(search.toLowerCase()) ||
    t.id.toLowerCase().includes(search.toLowerCase()) ||
    t.entity_type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Threat Intelligence Queue
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Prioritized intake stream for triage, forensic analysis, and campaign attribution.
          </p>
        </div>

        <button
          onClick={fetchThreats}
          className="p-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-2 self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Queue</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white rounded-3xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        {/* Search */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search indicator or ID..."
            className="w-full text-xs text-slate-800 bg-transparent focus:outline-hidden"
          />
        </div>

        {/* Severity Filters */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-bold text-slate-400 mr-1">Risk:</span>
          {['all', 'critical', 'high', 'medium', 'low'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setRiskFilter(lvl)}
              className={`px-3 py-1 rounded-xl text-xs font-bold capitalize transition-all ${
                riskFilter === lvl
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>

        {/* Type Filters */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-bold text-slate-400 mr-1">Type:</span>
          {['all', 'social_profile', 'url', 'app', 'message'].map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1 rounded-xl text-xs font-bold capitalize transition-all ${
                typeFilter === t
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="py-20 text-center">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-2" />
          <span className="text-xs text-slate-500 font-semibold">Loading queue items...</span>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 font-bold uppercase tracking-wider text-slate-500 text-[10px]">
                <th className="py-3.5 px-4">Threat ID</th>
                <th className="py-3.5 px-4">Submitted Indicator</th>
                <th className="py-3.5 px-4">Entity Type</th>
                <th className="py-3.5 px-4">Risk Level</th>
                <th className="py-3.5 px-4">Risk Score</th>
                <th className="py-3.5 px-4">Campaign Cluster</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredThreats.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-600">
                    {t.id}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-900 max-w-xs truncate">
                    {t.submitted_indicator}
                  </td>
                  <td className="py-3.5 px-4 capitalize text-slate-600">
                    {t.entity_type.replace('_', ' ')}
                  </td>
                  <td className="py-3.5 px-4">
                    <RiskBadge level={t.risk_level} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 font-mono font-extrabold text-slate-800">
                    {t.risk_score} / 100
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                    {t.campaign_id || 'Isolated Threat'}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      to={`/threats/${t.id}`}
                      className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold inline-flex items-center gap-1 transition-colors"
                    >
                      <span>Inspect</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
