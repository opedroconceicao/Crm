export enum DealStage {
  NEW = 'Novo',
  CONTACTED = 'Contactado',
  NEGOTIATION = 'Em Negociação',
  WON = 'Ganho',
  LOST = 'Perdido',
}

export enum DealSource {
  GOOGLE_ADS = 'Google Ads',
  META_ADS = 'Meta Ads',
  ORGANIC = 'Orgânico',
  REFERRAL = 'Referência',
}

export interface Activity {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'task';
  description: string;
  date: string; // ISO string
  completed: boolean;
  dealId?: string;
}

export interface Deal {
  id: string;
  title: string; // New field for Deal Name
  leadName: string;
  companyName: string;
  email: string;
  phone: string;
  value: number;
  stage: DealStage;
  source: DealSource;
  createdAt: string;
  lastActivity: string;
  owner: string;
  notes?: string;
}

export interface Website {
  id: string;
  url: string;
  name: string;
  snippetId: string;
  leadCount: number;
}

export interface PipelineStats {
  stage: string;
  count: number;
  value: number;
}

export interface Organization {
  id: string;
  name: string;
  plan: string;
  logoInitial: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  companyId: string;
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  website: string;
}