import React, { useState } from 'react';
import { Bot, Send, Sparkles, User, ShieldAlert, FileText, CheckCircle2, PhoneCall } from 'lucide-react';
import { api } from '../services/api';

export const CopilotPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string; recs?: string[] }>>([
    {
      role: 'assistant',
      text: "Genius AI Investigation Copilot online. I have live access to your active threat records, Threat Twin models, and Evidence Vault. How can I assist your investigation today?",
      recs: [
        "Why is this account high risk?",
        "Find related threats.",
        "Summarize this investigation.",
        "Prepare an incident report."
      ]
    }
  ]);

  const handleSend = async (qText?: string) => {
    const text = qText || query;
    if (!text.trim() || loading) return;

    setMessages(prev => [...prev, { role: 'user', text }]);
    setQuery('');
    setLoading(true);

    try {
      const res = await api.queryCopilot({
        query: text,
        threat_id: 'THR-HDFC-9102'
      });
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: res.response,
          recs: res.recommended_actions
        }
      ]);
    } catch (e: any) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: "I don't have enough verified evidence in the current database records to determine that. Please review active indicators in the Threat Queue."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const promptPills = [
    "Why is this account high risk?",
    "Find related threats.",
    "Summarize this investigation.",
    "What evidence should I collect?",
    "Prepare an incident report.",
    "Compare this profile with the official identity.",
    "Show me the most important indicators."
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-blue-600" />
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Genius AI Investigation Copilot
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Grounded conversational intelligence assistant for cybersecurity analysts. Never fabricates evidence.
        </p>
      </div>

      {/* Suggested Prompt Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs scrollbar-none">
        {promptPills.map((pill, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(pill)}
            className="px-3 py-1.5 rounded-full bg-white border border-slate-200 hover:border-blue-400 text-slate-700 font-semibold whitespace-nowrap shadow-2xs transition-colors hover:text-blue-600"
          >
            {pill}
          </button>
        ))}
      </div>

      {/* Chat Area */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[520px]">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex gap-3.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {m.role === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-[80%] rounded-2xl p-4 text-xs leading-relaxed ${
                m.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-xs'
                  : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-bl-xs'
              }`}>
                <p className="whitespace-pre-line text-sm">{m.text}</p>

                {m.recs && m.recs.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-200 space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                      Recommended Next Actions:
                    </span>
                    <ul className="space-y-1 text-slate-700">
                      {m.recs.map((r, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-1.5">
                          <span className="text-blue-600 font-bold">&bull;</span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {m.role === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-slate-400 pl-11">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
              <span>Grounded Copilot is querying application telemetry...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-200 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask Copilot to explain risk, correlate threats, or draft reports..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 text-slate-900"
            />
            <button
              type="submit"
              disabled={!query.trim() || loading}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs disabled:opacity-50 flex items-center gap-1.5 transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>Inquire</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
