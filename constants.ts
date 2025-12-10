import { Deal, DealStage, DealSource, Activity, Website, Organization, Contact, Company } from './types';

export const MOCK_DEALS: Deal[] = [
  {
    id: '1',
    title: 'Implementação Enterprise Q4',
    leadName: 'Ana Silva',
    companyName: 'Tech Solutions Lda',
    email: 'ana.silva@techsolutions.pt',
    phone: '+351 912 345 678',
    value: 1500,
    stage: DealStage.NEW,
    source: DealSource.GOOGLE_ADS,
    createdAt: '2023-10-25T10:00:00Z',
    lastActivity: '2023-10-25T10:00:00Z',
    owner: 'João M.',
    notes: 'Interessada no plano Enterprise.',
  },
  {
    id: '2',
    title: 'Renovação de Contrato Anual',
    leadName: 'Carlos Ferreira',
    companyName: 'Restaurante O Porto',
    email: 'carlos@oporto.pt',
    phone: '+351 933 444 555',
    value: 500,
    stage: DealStage.CONTACTED,
    source: DealSource.META_ADS,
    createdAt: '2023-10-20T14:30:00Z',
    lastActivity: '2023-10-21T09:00:00Z',
    owner: 'Maria S.',
    notes: 'Precisa de validação do sócio.',
  },
  {
    id: '3',
    title: 'Novo Projeto de Consultoria',
    leadName: 'Beatriz Costa',
    companyName: 'Startup Inov',
    email: 'b.costa@inov.io',
    phone: '+351 966 777 888',
    value: 5000,
    stage: DealStage.NEGOTIATION,
    source: DealSource.REFERRAL,
    createdAt: '2023-10-15T11:20:00Z',
    lastActivity: '2023-10-24T16:45:00Z',
    owner: 'João M.',
    notes: 'Enviada proposta v2.',
  },
  {
    id: '4',
    title: 'Venda de Licença Pro',
    leadName: 'Duarte Pires',
    companyName: 'Imobiliária Lux',
    email: 'duarte@luxre.pt',
    phone: '+351 911 222 333',
    value: 2500,
    stage: DealStage.WON,
    source: DealSource.ORGANIC,
    createdAt: '2023-10-01T09:00:00Z',
    lastActivity: '2023-10-10T15:00:00Z',
    owner: 'Maria S.',
    notes: 'Contrato assinado.',
  },
   {
    id: '5',
    title: 'Upgrade de Plano',
    leadName: 'Jorge Mendes',
    companyName: 'JM Consulting',
    email: 'jorge@jmconsulting.pt',
    phone: '+351 919 888 777',
    value: 1200,
    stage: DealStage.LOST,
    source: DealSource.GOOGLE_ADS,
    createdAt: '2023-09-28T10:00:00Z',
    lastActivity: '2023-10-05T11:00:00Z',
    owner: 'João M.',
    notes: 'Achou o preço elevado.',
  }
];

export const MOCK_ACTIVITIES: Activity[] = [
  { id: '101', type: 'call', description: 'Ligar para Ana Silva', date: '2023-10-27T10:00:00Z', completed: false, dealId: '1' },
  { id: '102', type: 'meeting', description: 'Demo com Startup Inov', date: '2023-10-27T14:00:00Z', completed: false, dealId: '3' },
  { id: '103', type: 'email', description: 'Enviar contrato Imobiliária Lux', date: '2023-10-26T09:00:00Z', completed: true, dealId: '4' },
];

export const MOCK_WEBSITES: Website[] = [
  { id: 'w1', name: 'Site Institucional', url: 'https://minhaempresa.pt', snippetId: 'snip_001', leadCount: 145 },
  { id: 'w2', name: 'Landing Page Promo', url: 'https://promo.minhaempresa.pt', snippetId: 'snip_002', leadCount: 89 },
];

export const MOCK_ORGANIZATIONS: Organization[] = [
  { id: 'org_1', name: 'Managlead HQ', plan: 'Pro', logoInitial: 'M' },
  { id: 'org_2', name: 'Startup Studio', plan: 'Free', logoInitial: 'S' },
  { id: 'org_3', name: 'Investments Co', plan: 'Enterprise', logoInitial: 'I' },
];

export const MOCK_CONTACTS: Contact[] = [
  { id: 'c1', name: 'Ana Silva', email: 'ana.silva@techsolutions.pt', phone: '+351 912 345 678', role: 'CEO', companyId: 'comp1' },
  { id: 'c2', name: 'Carlos Ferreira', email: 'carlos@oporto.pt', phone: '+351 933 444 555', role: 'Owner', companyId: 'comp2' },
  { id: 'c3', name: 'Beatriz Costa', email: 'b.costa@inov.io', phone: '+351 966 777 888', role: 'CTO', companyId: 'comp3' },
  { id: 'c4', name: 'Duarte Pires', email: 'duarte@luxre.pt', phone: '+351 911 222 333', role: 'Agent', companyId: 'comp4' },
  { id: 'c5', name: 'Jorge Mendes', email: 'jorge@jmconsulting.pt', phone: '+351 919 888 777', role: 'Consultant', companyId: 'comp5' },
];

export const MOCK_COMPANIES: Company[] = [
  { id: 'comp1', name: 'Tech Solutions Lda', industry: 'Technology', website: 'techsolutions.pt' },
  { id: 'comp2', name: 'Restaurante O Porto', industry: 'Hospitality', website: 'oporto.pt' },
  { id: 'comp3', name: 'Startup Inov', industry: 'Technology', website: 'inov.io' },
  { id: 'comp4', name: 'Imobiliária Lux', industry: 'Real Estate', website: 'luxre.pt' },
  { id: 'comp5', name: 'JM Consulting', industry: 'Consulting', website: 'jmconsulting.pt' },
];

export const STAGE_COLORS: Record<DealStage, string> = {
  [DealStage.NEW]: 'bg-blue-100 text-blue-800 border-blue-200',
  [DealStage.CONTACTED]: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  [DealStage.NEGOTIATION]: 'bg-purple-100 text-purple-800 border-purple-200',
  [DealStage.WON]: 'bg-green-100 text-green-800 border-green-200',
  [DealStage.LOST]: 'bg-red-100 text-red-800 border-red-200',
};

export const SOURCE_ICONS: Record<DealSource, string> = {
  [DealSource.GOOGLE_ADS]: 'G',
  [DealSource.META_ADS]: 'M',
  [DealSource.ORGANIC]: 'O',
  [DealSource.REFERRAL]: 'R',
};