export type UserRole = 'citizen' | 'analyst' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
}

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface RiskBreakdown {
  brand_similarity: number;
  username_similarity: number;
  url_similarity: number;
  content_risk: number;
  identity_signals: number;
}

export interface ThreatSignal {
  category: string;
  signal: string;
  weight: number;
  description: string;
  flags?: string[];
}

export interface ThreatAnalysis {
  id: string;
  owner_id: string;
  entity_type: 'social_profile' | 'url' | 'app' | 'message' | 'email' | 'phone' | 'username';
  submitted_indicator: string;
  status: 'active' | 'mitigated' | 'investigating' | 'false_positive';
  risk_score: number;
  risk_level: RiskLevel;
  confidence: number;
  explanation: string;
  breakdown: RiskBreakdown;
  signals: ThreatSignal[];
  recommended_actions: string[];
  is_demo: boolean;
  provenance: string;
  campaign_id?: string;
  created_at: string;
  updated_at: string;
}

export interface ThreatGraphNode {
  id: string;
  type: string;
  label: string;
  entity_type: string;
  risk_level: RiskLevel | 'safe';
  risk_score: number;
  evidence_count: number;
  status: string;
  details: string;
  timestamp: string;
}

export interface ThreatGraphEdge {
  id: string;
  source: string;
  target: string;
  label: string;
  type: string;
  confidence: number;
  provenance: string;
}

export interface ThreatGraphData {
  threat_id: string;
  nodes: ThreatGraphNode[];
  edges: ThreatGraphEdge[];
  summary: {
    total_nodes: number;
    total_edges: number;
    high_risk_nodes: number;
    primary_threat_type: string;
    coordination_pattern: string;
    disclaimer: string;
  };
}

export interface IdentityDNADimension {
  name: string;
  score: number;
  trusted: string;
  suspicious: string;
  status: string;
}

export interface IdentityDNA {
  overall_match_percentage: number;
  trusted_fingerprint: string;
  suspicious_fingerprint: string;
  trusted_entity: {
    name: string;
    domain: string;
    handle: string;
  };
  suspicious_entity: {
    indicator: string;
    type: string;
  };
  dimensions: IdentityDNADimension[];
  disclaimer: string;
}

export interface ThreatCampaign {
  id: string;
  title: string;
  description: string;
  confidence: number;
  status: 'active' | 'emerging' | 'contained';
  primary_brand: string;
  shared_indicators: string[];
  risk_level: RiskLevel;
  entities_count: number;
  created_at: string;
  updated_at: string;
}

export interface Case {
  id: string;
  owner_id: string;
  case_reference: string;
  title: string;
  description: string;
  status: 'new' | 'investigating' | 'evidence_collected' | 'ready_to_report' | 'closed';
  risk_level: RiskLevel;
  primary_threat_id?: string;
  financial_loss: number;
  timeline_json: Array<{ time: string; event: string; actor?: string }>;
  ai_summary?: string;
  recommended_actions: string[];
  created_at: string;
  updated_at: string;
}

export interface EvidenceItem {
  id: string;
  case_id?: string;
  threat_id?: string;
  owner_id: string;
  evidence_type: 'screenshot' | 'url' | 'message' | 'profile_metadata' | 'app_package' | 'document';
  title: string;
  source: string;
  storage_key: string;
  metadata_json: Record<string, any>;
  sha256_hash: string;
  integrity_status: 'verified' | 'tamper_checked';
  created_at: string;
}

export interface BrandProtection {
  id: string;
  brand_name: string;
  official_domain: string;
  official_handles: string[];
  logo_fingerprint?: string;
  risk_score: number;
  risk_status: 'safe' | 'monitored' | 'elevated' | 'critical';
  detected_lookalikes_count: number;
  identity_dna_json: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface ThreatForecastData {
  pattern_name: string;
  current_risk: string;
  predicted_trend: string;
  potential_next_vector: string;
  confidence: number;
  timeline_points: Array<{ phase: string; pattern: string; status: string }>;
  vector_metrics: Array<{ vector: string; current: number; forecast: number; trend: string }>;
  summary: string;
  disclaimer: string;
}
