import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot, User, PhoneCall, ShieldCheck, AlertTriangle } from 'lucide-react';
import { api } from '../../services/api';

interface Message {
  sender: 'user' | 'assistant';
  text: string;
  recommendations?: string[];
  riskLevel?: string;
  helplineNotice?: boolean;
}

export const GlobalAIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'assistant',
      text: "Hello, I am Genius AI, your digital risk intelligence assistant. You can ask me to evaluate suspicious messages, verify lookalike links, guide lawful evidence preservation, or advise on reporting.",
      recommendations: [
        "Paste a suspicious message or URL",
        "Ask what to do if money was debited",
        "Prepare cybercrime evidence"
      ]
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg: Message = { sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await api.queryCopilot({
        query,
        conversation_history: messages.slice(-4).map(m => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.text
        }))
      });

      const qLower = query.toLowerCase();
      let riskLevel: string | undefined = undefined;
      let helpline = false;

      if (qLower.includes('bank') || qLower.includes('blocked') || qLower.includes('money') || qLower.includes('debit') || qLower.includes('otp')) {
        riskLevel = 'HIGH';
        helpline = true;
      }

      const assistantMsg: Message = {
        sender: 'assistant',
        text: res.response,
        recommendations: res.recommended_actions,
        riskLevel,
        helplineNotice: helpline
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'assistant',
          text: "I don't have enough verified evidence to determine that from the current records. Please paste the exact URL, profile link, or message in the Universal Analyzer.",
          recommendations: [
            "Paste indicator in Universal Analyzer",
            "Preserve message screenshot"
          ]
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-blue-500/25 group ${isOpen ? 'scale-0 pointer-events-none' : 'scale-100'}`}
        aria-label="Ask Genius AI"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-300 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
        </span>
        <Sparkles className="w-4 h-4 text-blue-200 group-hover:rotate-12 transition-transform" />
        <span className="text-sm font-semibold tracking-wide">Ask Genius AI</span>
      </button>

      {/* Slide-out Intelligence Panel */}
      {isOpen && (
        <div className="fixed inset-y-0 right-0 w-full sm:w-[440px] bg-white border-l border-slate-200 shadow-2xl z-50 flex flex-col transition-all duration-300">
          {/* Header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 backdrop-blur-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 leading-tight">Genius AI Copilot</h3>
                <p className="text-[11px] text-slate-500">Autonomous Digital Safety Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-xs'
                    : 'bg-slate-100 text-slate-800 rounded-bl-xs border border-slate-200/60'
                }`}>
                  {m.riskLevel && (
                    <div className="mb-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 text-xs font-bold">
                      <AlertTriangle className="w-3 h-3" />
                      Risk: {m.riskLevel}
                    </div>
                  )}

                  <p className="whitespace-pre-line">{m.text}</p>

                  {m.recommendations && m.recommendations.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-200/80 space-y-1.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block">
                        Recommended Actions:
                      </span>
                      <ul className="space-y-1 text-xs text-slate-700">
                        {m.recommendations.map((rec, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-1.5">
                            <span className="text-blue-600 font-bold shrink-0">{rIdx + 1}.</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {m.helplineNotice && (
                    <div className="mt-3 p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <PhoneCall className="w-4 h-4 text-rose-600 shrink-0" />
                        <span>Financial fraud helpline: <strong>1930</strong></span>
                      </div>
                      <a
                        href="https://www.cybercrime.gov.in"
                        target="_blank"
                        rel="noreferrer"
                        className="underline font-semibold text-[11px]"
                      >
                        NCRP Portal
                      </a>
                    </div>
                  )}
                </div>

                {m.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-3 items-center text-slate-500 text-xs pl-10">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-600 animate-bounce" />
                <span className="inline-block w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]" />
                <span className="inline-block w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]" />
                <span>Genius AI is evaluating observable signals...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-4 py-2 bg-slate-50/60 border-t border-slate-100 flex gap-1.5 overflow-x-auto text-[11px]">
            <button
              onClick={() => handleSend("I received a message saying my bank account will be blocked.")}
              className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-blue-400 whitespace-nowrap transition-colors"
            >
              Bank blocked message
            </button>
            <button
              onClick={() => handleSend("Did you find related threats to this bank account?")}
              className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-blue-400 whitespace-nowrap transition-colors"
            >
              Find related threats
            </button>
            <button
              onClick={() => handleSend("What evidence should I collect for cybercrime police?")}
              className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-blue-400 whitespace-nowrap transition-colors"
            >
              Evidence checklist
            </button>
          </div>

          {/* Input Footer */}
          <div className="p-3 border-t border-slate-200 bg-white">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Genius AI anything about a threat or safety..."
                className="flex-1 px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="p-2 rounded-lg bg-blue-600 text-white disabled:opacity-40 hover:bg-blue-700 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <p className="text-[10px] text-slate-400 text-center mt-2">
              Genius AI provides general digital risk intelligence and does not replace official legal or law enforcement processes.
            </p>
          </div>
        </div>
      )}
    </>
  );
};
