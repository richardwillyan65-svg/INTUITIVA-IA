export type SpecialtyType = 
  | 'all'
  | 'frontend'
  | 'backend'
  | 'fullstack'
  | 'ai'
  | 'automation'
  | 'database'
  | 'seo'
  | 'design'
  | 'marketing'
  | 'security'
  | 'cloud'
  | 'analytics';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  specialty?: SpecialtyType;
  codeBlocks?: {
    language: string;
    code: string;
    filename?: string;
  }[];
}

export interface CodeTemplate {
  id: string;
  title: string;
  category: 'frontend' | 'backend' | 'database' | 'ai' | 'automation';
  techStack: string[];
  description: string;
  code: string;
  filename: string;
}

export interface AgentConfig {
  id: string;
  name: string;
  role: string;
  goal: string;
  systemPrompt: string;
  trigger: string;
  targetPlatform: 'Google AI Studio' | 'Replit' | 'Lovable' | 'Vercel' | 'WordPress';
  status: 'active' | 'draft' | 'testing';
  updatedAt: string;
}

export interface MarketingCampaign {
  id: string;
  productName: string;
  targetAudience: string;
  goal: string;
  headline: string;
  copy: string;
  adFormats: string[];
  seoKeywords: string[];
}

export interface ArchitectureSpec {
  id: string;
  projectName: string;
  stack: string[];
  dbSchema: string;
  diagramAscii: string;
  securityChecklist: string[];
  cloudDeployGuide: string;
}

export interface PlatformGuide {
  id: string;
  name: string;
  category: 'Frontend/UI' | 'Backend/Compute' | 'Deploy/Cloud' | 'AI Assistant' | 'CMS/E-commerce';
  description: string;
  features: string[];
  iconName: string;
  badge: string;
  recommendedWorkflow: string;
}

export interface UserCredits {
  balance: number;
  planName: 'Gratuito' | 'Pro' | 'Business';
  monthlyRenewalDate: string;
  history: {
    id: string;
    description: string;
    amount: number;
    type: 'credit' | 'debit';
    date: string;
  }[];
}

export interface CreditPlan {
  id: 'free' | 'pro' | 'business';
  name: string;
  price: string;
  credits: number;
  badge?: string;
  popular?: boolean;
  features: string[];
}

export interface DomainCheck {
  domain: string;
  available: boolean;
  pricePerYear?: string;
  extension: '.com.br' | '.com' | '.app' | '.intuitiva.app';
  type: 'subdomain' | 'custom';
}

export interface PublishedProject {
  id: string;
  title: string;
  domain: string;
  status: 'published' | 'building' | 'failed';
  publishedAt: string;
  sslActive: boolean;
  visits: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  plan: 'Gratuito' | 'Pro' | 'Business';
  credits: number;
  isLoggedIn: boolean;
}

