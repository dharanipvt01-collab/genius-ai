import {
  User, ThreatAnalysis, ThreatGraphData, IdentityDNA,
  ThreatCampaign, Case, EvidenceItem, BrandProtection, ThreatForecastData
} from '../types';

const API_BASE_URL = ((import.meta as any).env?.VITE_API_URL) || 'http://localhost:8000/api';

class ApiService {
  private getHeaders(): HeadersInit {
    const token = localStorage.getItem('genius_ai_token');
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = { ...this.getHeaders(), ...(options.headers || {}) };

    try {
      const response = await fetch(url, { ...options, headers });
      if (!response.ok) {
        if (response.status === 401) {
          // Token expired or invalid
          localStorage.removeItem('genius_ai_token');
          localStorage.removeItem('genius_ai_user');
        }
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || errorData.error || `Request failed with status ${response.status}`);
      }
      return await response.json();
    } catch (error: any) {
      console.warn(`[Genius AI API Error] on ${endpoint}:`, error.message);
      throw error;
    }
  }

  // Authentication
  async register(data: any) {
    return this.request<{ access_token: string; refresh_token: string; user: User }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async login(data: any) {
    return this.request<{ access_token: string; refresh_token: string; user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getMe() {
    return this.request<User>('/auth/me');
  }

  async updateProfile(data: any) {
    return this.request<User>('/auth/me', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async forgotPassword(email: string) {
    return this.request<{ message: string; demo_reset_token?: string }>('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async resetPassword(token: string, new_password: string) {
    return this.request<{ message: string }>('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, new_password }),
    });
  }

  // Dashboard
  async getCustomerDashboard() {
    return this.request<any>('/dashboard/customer');
  }

  async getAnalystDashboard() {
    return this.request<any>('/dashboard/analyst');
  }

  // Threats
  async analyzeThreat(data: { entity_type: string; indicator: string; context_note?: string; is_demo_scenario?: boolean }) {
    return this.request<ThreatAnalysis>('/threats/analyze', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getThreats(params: { risk_level?: string; entity_type?: string } = {}) {
    const q = new URLSearchParams();
    if (params.risk_level) q.append('risk_level', params.risk_level);
    if (params.entity_type) q.append('entity_type', params.entity_type);
    return this.request<ThreatAnalysis[]>(`/threats?${q.toString()}`);
  }

  async getThreat(id: string) {
    return this.request<ThreatAnalysis>(`/threats/${id}`);
  }

  async getThreatGraph(id: string) {
    return this.request<ThreatGraphData>(`/threats/${id}/graph`);
  }

  async getThreatDNA(id: string) {
    return this.request<IdentityDNA>(`/threats/${id}/dna`);
  }

  async getThreatTwin(id: string) {
    return this.request<any>(`/threats/${id}/twin`);
  }

  // Cases
  async getCases() {
    return this.request<Case[]>('/cases');
  }

  async getCase(id: string) {
    return this.request<Case>(`/cases/${id}`);
  }

  async createCase(data: { title: string; description: string; threat_id?: string; financial_loss?: number; risk_level?: string }) {
    return this.request<Case>('/cases', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateCase(id: string, data: any) {
    return this.request<Case>(`/cases/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Evidence
  async getEvidence(params: { case_id?: string; threat_id?: string } = {}) {
    const q = new URLSearchParams();
    if (params.case_id) q.append('case_id', params.case_id);
    if (params.threat_id) q.append('threat_id', params.threat_id);
    return this.request<EvidenceItem[]>(`/evidence?${q.toString()}`);
  }

  async createEvidence(data: any) {
    return this.request<EvidenceItem>('/evidence', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async downloadEvidenceDossier(id: string) {
    return this.request<any>(`/evidence/${id}/download-dossier`);
  }

  // Campaigns
  async getCampaigns() {
    return this.request<ThreatCampaign[]>('/campaigns');
  }

  async getCampaign(id: string) {
    return this.request<any>(`/campaigns/${id}`);
  }

  // Brands
  async getBrands() {
    return this.request<BrandProtection[]>('/brands');
  }

  async createBrand(data: any) {
    return this.request<BrandProtection>('/brands', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Investigations & Copilot
  async runAutonomousInvestigation(data: { indicator: string; entity_type?: string }) {
    return this.request<any>('/investigations/autonomous', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async queryCopilot(data: { query: string; threat_id?: string; case_id?: string; conversation_history?: any[] }) {
    return this.request<any>('/copilot/query', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getForecast() {
    return this.request<ThreatForecastData>('/forecast');
  }

  // Reports
  async generateIncidentReport(data: { threat_id?: string; case_id?: string }) {
    return this.request<any>('/reports/incident-report', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async prepareComplaintSummary(data: { threat_id?: string; case_id?: string; user_statement?: string; financial_loss?: number; transaction_reference?: string }) {
    return this.request<any>('/reports/complaint-summary', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Demo
  async getDemoScenarios() {
    return this.request<any[]>('/demo/scenarios');
  }

  async loadDemoScenario(key: string) {
    return this.request<any>(`/demo/load-scenario/${key}`, {
      method: 'POST',
    });
  }

  // Audit
  async getAuditLogs() {
    return this.request<any[]>('/audit');
  }
}

export const api = new ApiService();
