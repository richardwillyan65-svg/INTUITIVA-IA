export interface ThemeItem {
  id: string;
  title: string;
  category: string;
  description: string;
  style: 'Dark Glass' | 'Minimal White' | 'Gradient Cyber' | 'Luxury Gold' | 'Vibrant Modern' | 'Corporate Tech';
  rating: number;
  downloads: number;
  badge?: string;
  previewBg: string;
  primaryColor: string;
  tags: string[];
  promptToBuild: string;
}

export const THEME_CATEGORIES = [
  'Todos',
  'SaaS & Inteligência Artificial',
  'E-commerce & Lojas',
  'Restaurantes & Gastronomia',
  'Saúde, Clínicas & Estética',
  'Imobiliárias & Arquitetura',
  'Advocacia & Jurídico',
  'Educação & Cursos',
  'Fitness & Personal',
  'Finanças & Cripto',
  'Agências & Marketing',
  'Eventos & Shows',
  'Mobile Apps & Tech'
] as const;

const categoryTemplates: { cat: string; prefix: string; bg: string; color: string; style: ThemeItem['style'] }[] = [
  { cat: 'SaaS & Inteligência Artificial', prefix: 'Intelli', bg: 'from-indigo-950 via-slate-900 to-purple-950', color: '#6366f1', style: 'Dark Glass' },
  { cat: 'E-commerce & Lojas', prefix: 'StoreFront', bg: 'from-amber-950 via-slate-900 to-rose-950', color: '#f59e0b', style: 'Vibrant Modern' },
  { cat: 'Restaurantes & Gastronomia', prefix: 'Gourmet', bg: 'from-orange-950 via-slate-900 to-red-950', color: '#f97316', style: 'Vibrant Modern' },
  { cat: 'Saúde, Clínicas & Estética', prefix: 'MedHealth', bg: 'from-teal-950 via-slate-900 to-cyan-950', color: '#14b8a6', style: 'Minimal White' },
  { cat: 'Imobiliárias & Arquitetura', prefix: 'UrbanSpace', bg: 'from-slate-950 via-zinc-900 to-stone-900', color: '#0ea5e9', style: 'Luxury Gold' },
  { cat: 'Advocacia & Jurídico', prefix: 'LexJuris', bg: 'from-blue-950 via-slate-900 to-slate-950', color: '#3b82f6', style: 'Corporate Tech' },
  { cat: 'Educação & Cursos', prefix: 'EduMaster', bg: 'from-emerald-950 via-slate-900 to-teal-950', color: '#10b981', style: 'Vibrant Modern' },
  { cat: 'Fitness & Personal', prefix: 'FitPower', bg: 'from-rose-950 via-slate-900 to-red-950', color: '#f43f5e', style: 'Gradient Cyber' },
  { cat: 'Finanças & Cripto', prefix: 'CryptoPay', bg: 'from-yellow-950 via-slate-900 to-amber-950', color: '#eab308', style: 'Gradient Cyber' },
  { cat: 'Agências & Marketing', prefix: 'CreativeStudio', bg: 'from-purple-950 via-slate-900 to-fuchsia-950', color: '#d946ef', style: 'Dark Glass' },
  { cat: 'Eventos & Shows', prefix: 'StageLive', bg: 'from-cyan-950 via-slate-900 to-blue-950', color: '#06b6d4', style: 'Gradient Cyber' },
  { cat: 'Mobile Apps & Tech', prefix: 'AppSphere', bg: 'from-indigo-950 via-slate-900 to-slate-950', color: '#818cf8', style: 'Dark Glass' }
];

const subTypes = [
  'Pro Dashboard', 'Landing Page AI', 'Portal Completo', 'App Web Responsivo',
  'Hub de Serviços', 'Plataforma Premium', 'UI Kit Avançado', 'SISTEMA SaaS',
  'Template Minimalista', 'Checkout de Alta Conversão', 'Design System Ultra',
  'Painel Administrativo', 'Landing Page 3D', 'Marketplace B2B', 'Vitrine Virtual',
  'Aplicativo PWA', 'Next-Gen Interface', 'Experiência Imersiva', 'Hub de Clientes',
  'Engine de Automação', 'Catálogo Interativo', 'Rede de Membros', 'Solução Enterprise',
  'Layout Neon', 'Dark Mode Luxury', 'Glassmorphism Flow', 'Flat Clean Design',
  'Micro-SaaS Portal', 'Plataforma Omnichannel', 'Dashboard de Vendas', 'Central de Atendimento',
  'LMS Educacional', 'Booking Engine', 'Workflow Manager', 'Comunidade VIP'
];

// Generate 412 rich themes dynamically
export const GENERATED_THEMES: ThemeItem[] = Array.from({ length: 412 }).map((_, index) => {
  const catObj = categoryTemplates[index % categoryTemplates.length];
  const subType = subTypes[index % subTypes.length];
  const idNum = index + 1;
  const rating = Number((4.7 + (index % 4) * 0.1).toFixed(1));
  const downloads = 120 + (index * 37) % 3800;

  const isPopular = index % 7 === 0;
  const isNew = index % 5 === 0;

  const title = `${catObj.prefix} ${subType} #${idNum}`;
  const description = `Tema completo pré-configurado para ${catObj.cat.toLowerCase()} com componentes interativos, responsividade nativa, integração com IA e otimização para altas conversões.`;

  return {
    id: `theme-${idNum}`,
    title,
    category: catObj.cat,
    description,
    style: catObj.style,
    rating,
    downloads,
    badge: isPopular ? '🔥 Mais Baixado' : isNew ? '✨ Lançamento' : undefined,
    previewBg: catObj.bg,
    primaryColor: catObj.color,
    tags: [catObj.cat.split(' ')[0], subType.split(' ')[0], 'IA-Ready', 'Dark Mode', 'Responsivo'],
    promptToBuild: `Crie um site profissional com a identidade visual do tema ${title}, voltado para ${catObj.cat}. Inclua seção hero com CTA, grade de serviços/produtos, depoimentos, tabela de preços e formulário de contato inteligente.`
  };
});
