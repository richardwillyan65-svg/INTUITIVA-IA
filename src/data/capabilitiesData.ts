import { CodeTemplate, PlatformGuide } from '../types';

export const SPECIALTIES_LIST = [
  { id: 'frontend', name: 'Desenvolvedor Front-end', desc: 'React, Next.js, Vue, Tailwind CSS, Framer Motion', icon: 'Layout' },
  { id: 'backend', name: 'Desenvolvedor Back-end', desc: 'Node.js, Express, NestJS, Python, FastAPI, PHP', icon: 'Server' },
  { id: 'fullstack', name: 'Desenvolvedor Full Stack', desc: 'Aplicações end-to-end, REST, GraphQL, PWAs', icon: 'Layers' },
  { id: 'ai', name: 'Especialista em IA', desc: 'Agentes de IA, LLMs, Gemini API, RAG, Prompt Engineering', icon: 'Bot' },
  { id: 'automation', name: 'Especialista em Automações', desc: 'Webhooks, Workflows, Scraping, Automações de APIs', icon: 'Zap' },
  { id: 'database', name: 'Especialista em Banco de Dados', desc: 'PostgreSQL, MongoDB, Firebase, Supabase, Redis', icon: 'Database' },
  { id: 'cloud', name: 'Especialista em Cloud', desc: 'Vercel, Netlify, Railway, Render, Cloudflare, AWS', icon: 'Cloud' },
  { id: 'design', name: 'Especialista em UX/UI & Design', desc: 'Interfaces modernas, Design Systems, Protótipos', icon: 'Palette' },
  { id: 'marketing', name: 'Especialista em Marketing & Copy', desc: 'Funis de venda, Copywriting, Google Ads, Meta Ads', icon: 'Megaphone' },
  { id: 'seo', name: 'Especialista em SEO', desc: 'SEO técnico, Otimização on-page, Performance Web', icon: 'Search' },
  { id: 'security', name: 'Especialista em Segurança', desc: 'JWT, OAuth, Criptografia, XSS, CSRF, Sanitização', icon: 'ShieldCheck' },
  { id: 'analytics', name: 'Analista de Dados', desc: 'Dashboards, Visualizações D3/Recharts, Métricas', icon: 'BarChart3' },
];

export const PLATFORMS_GUIDE: PlatformGuide[] = [
  {
    id: 'lovable',
    name: 'Lovable',
    category: 'Frontend/UI',
    description: 'Criação de interfaces modernas, layouts premium, componentes React reutilizáveis e dashboards rápidos.',
    badge: 'UI & React',
    iconName: 'Sparkles',
    features: ['Componentes React modularizados', 'Layouts responsivos Tailwind', 'Formulários dinâmicos', 'Design System moderno'],
    recommendedWorkflow: 'Gere o código dos componentes React + Tailwind na Intuitiva IA e importe diretamente na sua aplicação Lovable.'
  },
  {
    id: 'replit',
    name: 'Replit',
    category: 'Backend/Compute',
    description: 'Ambiente completo para rodar servidores Express, APIs, banco de dados PostgreSQL e execução de código em tempo real.',
    badge: 'Full Stack & Runtime',
    iconName: 'Terminal',
    features: ['APIs Node.js / Express', 'Conexão com PostgreSQL/SQLite', 'Autenticação JWT', 'Deploy de APIs REST'],
    recommendedWorkflow: 'Solicite scripts de backend e rotas Express na Intuitiva IA e cole direto no seu arquivo server.js no Replit.'
  },
  {
    id: 'vercel',
    name: 'Vercel',
    category: 'Deploy/Cloud',
    description: 'Plataforma líder para deploy continuo, domínios customizados, SSL automático, CDN global e funções Serverless.',
    badge: 'Global Deploy',
    iconName: 'Globe',
    features: ['SSL e CDN instantâneos', 'Variáveis de ambiente seguras', 'Next.js & Vite SPA', 'Serverless Functions'],
    recommendedWorkflow: 'Compile o build da aplicação React na Intuitiva IA e vincule seu repositório GitHub para auto-deploy na Vercel.'
  },
  {
    id: 'google-ai-studio',
    name: 'Google AI Studio',
    category: 'AI Assistant',
    description: 'Criação de assistentes de IA com modelos Gemini 3.6 Flash & 3.1 Pro, processamento de linguagem natural e funções.',
    badge: 'Gemini Engine',
    iconName: 'BrainCircuit',
    features: ['Integração com @google/genai SDK', 'Chamada de funções (Tool Calling)', 'System Instructions', 'Suporte a Multimodalidade'],
    recommendedWorkflow: 'A Intuitiva IA já roda integrada com o Gemini no servidor com suporte total a chamadas de API nativas.'
  },
  {
    id: 'wordpress',
    name: 'WordPress',
    category: 'CMS/E-commerce',
    description: 'Criação de temas sob medida, plugins customizados, WooCommerce, Elementor e estratégias de SEO avançadas.',
    badge: 'CMS & E-commerce',
    iconName: 'FileText',
    features: ['PHP & WordPress Hooks', 'Custom Post Types & ACF', 'WooCommerce Extensions', 'SEO técnico e Schema.org'],
    recommendedWorkflow: 'Peça trechos PHP (functions.php) ou novos blocos Gutenberg/Elementor criados sob medida pela Intuitiva IA.'
  }
];

export const INITIAL_TEMPLATES: CodeTemplate[] = [
  {
    id: 'tpl-express-jwt',
    title: 'API Express com JWT & Sanitização',
    category: 'backend',
    techStack: ['Node.js', 'Express', 'JWT', 'TypeScript'],
    description: 'API REST robusta com middleware de autenticação, tratamento de erros global e validação de tokens JWT.',
    filename: 'authServer.ts',
    code: `import express from 'express';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'intuitiva-ia-super-secret-key';

// Middleware de Autenticação Segura
function authenticateToken(req: any, res: any, next: any) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Acesso negado: Token ausente' });

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.status(403).json({ error: 'Token inválido ou expirado' });
    req.user = user;
    next();
  });
}

// Rota de Login (Geração de Token)
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }

  // Validação fictícia do usuário
  const user = { id: 'usr_123', email, role: 'admin' };
  const token = jwt.sign(user, JWT_SECRET, { expiresIn: '8h' });

  res.json({ message: 'Autenticado com sucesso via Intuitiva IA', token, user });
});

// Rota Protegida
app.get('/api/dashboard', authenticateToken, (req: any, res) => {
  res.json({
    message: 'Dados confidenciais carregados com segurança',
    userInfo: req.user,
    timestamp: new Date().toISOString()
  });
});

app.listen(3000, () => console.log('Servidor Intuitiva IA rodando na porta 3000'));`
  },
  {
    id: 'tpl-react-dashboard',
    title: 'Dashboard Responsivo em Tailwind + React',
    category: 'frontend',
    techStack: ['React 19', 'Tailwind CSS', 'Lucide React'],
    description: 'Painel administrativo moderno com cartões estatísticos, gráficos conceituais e atalhos rápidos.',
    filename: 'IntuitivaDashboard.tsx',
    code: `import React from 'react';
import { Activity, Users, DollarSign, ArrowUpRight, TrendingUp } from 'lucide-react';

export default function IntuitivaDashboard() {
  const stats = [
    { title: 'Receita Total', value: 'R$ 148.500', change: '+14.2%', icon: DollarSign, positive: true },
    { title: 'Usuários Ativos', value: '12.840', change: '+28.4%', icon: Users, positive: true },
    { title: 'Taxa de Conversão', value: '3.62%', change: '+1.1%', icon: Activity, positive: true },
    { title: 'Performance da IA', value: '99.8%', change: '+0.4%', icon: TrendingUp, positive: true },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <header className="mb-8 flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Intuitiva IA - Painel de Controle
          </h1>
          <p className="text-slate-400 text-sm">Monitoramento de métricas e inteligência em tempo real</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
          <span>Novo Projeto</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="bg-slate-900 border border-slate-800 p-5 rounded-xl hover:border-indigo-500/50 transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="text-slate-400 text-sm font-medium">{item.title}</span>
                <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{item.value}</div>
              <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                {item.change} <span className="text-slate-500 font-normal">vs. mês anterior</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}`
  },
  {
    id: 'tpl-gemini-agent',
    title: 'Integração Server-Side @google/genai',
    category: 'ai',
    techStack: ['TypeScript', '@google/genai', 'Express'],
    description: 'Padrão recomendado para chamar modelos Gemini 3.6 Flash via rotas protegidas no servidor.',
    filename: 'geminiService.ts',
    code: `import { GoogleGenAI } from '@google/genai';

// Instanciação segura no servidor
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

export async function processAgentRequest(userPrompt: string, systemRule: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemRule,
        temperature: 0.7,
      },
    });

    return {
      success: true,
      resultText: response.text,
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    console.error('Erro na chamada Gemini:', error);
    throw new Error('Falha no processamento da Intuitiva IA: ' + error.message);
  }
}`
  }
];
