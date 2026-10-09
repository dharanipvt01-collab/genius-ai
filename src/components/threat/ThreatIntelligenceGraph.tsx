import React, { useState } from 'react';
import { Shield, Globe, Smartphone, MessageSquare, Award, FileCheck, Filter, ZoomIn, ZoomOut, RotateCcw, X, ArrowRight } from 'lucide-react';
import { ThreatGraphData, ThreatGraphNode } from '../../types';
import { RiskBadge } from '../common/RiskBadge';

interface ThreatIntelligenceGraphProps {
  data?: ThreatGraphData;
  onSelectNode?: (node: ThreatGraphNode) => void;
  className?: string;
}

export const ThreatIntelligenceGraph: React.FC<ThreatIntelligenceGraphProps> = ({
  data,
  onSelectNode,
  className = ''
}) => {
  const [selectedNode, setSelectedNode] = useState<ThreatGraphNode | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Default rich fallback graph data if none provided
  const fallbackNodes: ThreatGraphNode[] = [
    {
      id: 'node-brand',
      type: 'brand',
      label: 'Official HDFC Bank',
      entity_type: 'brand',
      risk_level: 'safe',
      risk_score: 5,
      evidence_count: 3,
      status: 'verified',
      details: 'Registered corporate trademark and DNS authority for HDFC Bank.',
      timestamp: '2026-10-09 09:00'
    },
    {
      id: 'node-profile',
      type: 'profile',
      label: 'Impersonation Support Profile',
      entity_type: 'social_profile',
      risk_level: 'critical',
      risk_score: 93,
      evidence_count: 5,
      status: 'flagged',
      details: 'Unverified Instagram account mimicking 24x7 customer care directing users to external links.',
      timestamp: '2026-10-09 09:14'
    },
    {
      id: 'node-url',
      type: 'url',
      label: 'Credential Phishing Portal',
      entity_type: 'url',
      risk_level: 'critical',
      risk_score: 96,
      evidence_count: 4,
      status: 'active_phish',
      details: 'Lookalike hostname hdfc-bank-verification-login.top hosted on non-standard TLD harvesting PIN & OTP.',
      timestamp: '2026-10-09 09:21'
    },
    {
      id: 'node-message',
      type: 'message',
      label: 'Urgency Lure SMS',
      entity_type: 'message',
      risk_level: 'high',
      risk_score: 89,
      evidence_count: 3,
      status: 'circulating',
      details: 'Deceptive SMS warning of account suspension to induce quick unverified click.',
      timestamp: '2026-10-09 09:25'
    },
    {
      id: 'node-app',
      type: 'app',
      label: 'Trojanized Support APK',
      entity_type: 'app',
      risk_level: 'critical',
      risk_score: 97,
      evidence_count: 2,
      status: 'unverified_package',
      details: 'Sideloaded payload requesting accessibility services and SMS interception permissions.',
      timestamp: '2026-10-09 09:29'
    }
  ];

  const fallbackEdges = [
    { id: 'e1', source: 'node-profile', target: 'node-brand', label: 'impersonates', confidence: 95 },
    { id: 'e2', source: 'node-profile', target: 'node-url', label: 'directs to bio link', confidence: 93 },
    { id: 'e3', source: 'node-message', target: 'node-url', label: 'distributes URL', confidence: 90 },
    { id: 'e4', source: 'node-url', target: 'node-app', label: 'hosts download', confidence: 94 },
  ];

  const nodes = data?.nodes || fallbackNodes;
  const edges = data?.edges || fallbackEdges;

  // Position nodes spatially in an elegant tree/DAG layout
  const nodePositions: Record<string, { x: number; y: number }> = {
    'node-brand': { x: 120, y: 190 },
    'node-profile': { x: 380, y: 100 },
    'node-url': { x: 620, y: 190 },
    'node-message': { x: 380, y: 300 },
    'node-app': { x: 860, y: 190 },
  };

  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'brand': return Award;
      case 'profile':
      case 'social_profile': return Shield;
      case 'url': return Globe;
      case 'message': return MessageSquare;
      case 'app': return Smartphone;
      default: return FileCheck;
    }
  };

  const filteredNodes = nodes.filter(n => {
    if (filterType === 'all') return true;
    if (filterType === 'profiles') return n.entity_type.includes('profile');
    if (filterType === 'urls') return n.entity_type.includes('url');
    if (filterType === 'apps') return n.entity_type.includes('app');
    if (filterType === 'messages') return n.entity_type.includes('message');
    if (filterType === 'brands') return n.entity_type.includes('brand');
    return true;
  });

  const handleNodeClick = (node: ThreatGraphNode) => {
    setSelectedNode(node);
    if (onSelectNode) onSelectNode(node);
  };

  return (
    <div className={`relative bg-slate-50/50 rounded-2xl border border-slate-200 overflow-hidden ${className}`}>
      {/* Top Filter and Controls Bar */}
      <div className="p-3 sm:p-4 bg-white border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {['all', 'profiles', 'urls', 'apps', 'messages', 'brands'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterType(cat)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                filterType === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Zoom controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.15, 1.4))}
            className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoomLevel(prev => Math.max(prev - 0.15, 0.7))}
            className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoomLevel(1)}
            className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200"
            title="Reset Zoom"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Interactive Graph Canvas Area */}
      <div className="relative min-h-[460px] overflow-auto p-4 flex items-center justify-center">
        <div
          className="relative w-[1000px] h-[400px] transition-transform duration-200 origin-center"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* SVG Connector Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <marker
                id="arrowhead"
                markerWidth="8"
                markerHeight="8"
                refX="6"
                refY="4"
                orient="auto"
              >
                <polygon points="0 0, 8 4, 0 8" fill="#94A3B8" />
              </marker>
            </defs>
            {edges.map((e, idx) => {
              const src = nodePositions[e.source] || { x: 200, y: 200 };
              const tgt = nodePositions[e.target] || { x: 500, y: 200 };
              const midX = (src.x + tgt.x) / 2;
              const midY = (src.y + tgt.y) / 2;
              return (
                <g key={idx}>
                  <path
                    d={`M ${src.x} ${src.y} Q ${midX} ${midY - 20} ${tgt.x} ${tgt.y}`}
                    fill="none"
                    stroke="#94A3B8"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    markerEnd="url(#arrowhead)"
                  />
                  <rect
                    x={midX - 45}
                    y={midY - 22}
                    width="90"
                    height="18"
                    rx="9"
                    fill="white"
                    stroke="#E2E8F0"
                  />
                  <text
                    x={midX}
                    y={midY - 10}
                    textAnchor="middle"
                    fill="#475569"
                    fontSize="10"
                    fontWeight="600"
                  >
                    {e.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Graph Nodes */}
          {filteredNodes.map((n) => {
            const pos = nodePositions[n.id] || { x: 200, y: 200 };
            const Icon = getIcon(n.entity_type);
            const isSelected = selectedNode?.id === n.id;

            return (
              <div
                key={n.id}
                onClick={() => handleNodeClick(n)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300"
                style={{ left: pos.x, top: pos.y }}
              >
                <div className={`w-48 p-3 rounded-2xl bg-white border shadow-md hover:shadow-lg transition-all ${
                  isSelected
                    ? 'border-blue-600 ring-4 ring-blue-100 scale-105'
                    : 'border-slate-200 hover:border-slate-300'
                }`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                      <Icon className="w-4 h-4" />
                    </div>
                    <RiskBadge level={n.risk_level} size="sm" />
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-1">
                    {n.label}
                  </h4>
                  <div className="text-[10px] text-slate-400 font-medium capitalize mt-0.5">
                    {n.entity_type.replace('_', ' ')} &bull; {n.evidence_count} evidence items
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Node Detail Slide-in Panel */}
      {selectedNode && (
        <div className="p-5 bg-white border-t border-slate-200 animate-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-bold text-slate-900">{selectedNode.label}</span>
                <RiskBadge level={selectedNode.risk_level} size="sm" />
              </div>
              <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                {selectedNode.details}
              </p>
            </div>
            <button
              onClick={() => setSelectedNode(null)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-50">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Risk Score</span>
              <span className="text-sm font-extrabold text-slate-900">{selectedNode.risk_score} / 100</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Evidence Sealed</span>
              <span className="text-sm font-extrabold text-slate-900">{selectedNode.evidence_count} items (SHA-256)</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Telemetry Status</span>
              <span className="text-sm font-extrabold text-blue-600 capitalize">{selectedNode.status.replace('_', ' ')}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">First Detected</span>
              <span className="text-xs font-semibold text-slate-700">{selectedNode.timestamp}</span>
            </div>
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="px-4 py-2.5 bg-slate-100/60 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
        <span>Click any node to inspect evidentiary connections and risk markers.</span>
        <span>Threat connections represent algorithmic signal correlations.</span>
      </div>
    </div>
  );
};
