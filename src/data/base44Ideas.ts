export interface Base44Idea {
  id: string;
  category: 'SaaS' | 'IA & Automations' | 'E-commerce & Business' | 'Dashboards & Analytics' | 'Marketing & Funnels' | 'Utilities & Tools';
  title: string;
  description: string;
  badge: string;
  prompt: string;
  tags: string[];
}

export const BASE44_IDEAS_LIST: Base44Idea[] = [
  {
    id: 'b44-1',
    category: 'SaaS',
    title: 'Gerador de Landing Pages e Sites de Vendas em 1-Clique',
    description: 'Crie landing pages de alta conversão com copywriting gerado por IA, seções adaptativas e integração com WhatsApp.',
    badge: 'SaaS Builder',
    prompt: 'Crie uma aplicação SaaS completa para geração instantânea de Landing Pages responsivas com Tailwind CSS, seções de garantia, FAQ sanfonado, depoimentos, botão de checkout flutuante e pré-visualização ao vivo.',
    tags: ['React', 'Tailwind', 'SaaS', 'Copywriting']
  },
  {
    id: 'b44-2',
    category: 'IA & Automations',
    title: 'Agente de Atendimento ao Cliente Multicanal com RAG',
    description: 'Assistente inteligente que lê documentos PDF/TXT e responde dúvidas de clientes com tom humanizado.',
    badge: 'AI Agent',
    prompt: 'Desenvolva um painel para treinamento e execução de Agente de IA de Suporte ao Cliente com histórico de conversas, leitor de documentos em tempo real, respostas por áudio e respostas rápidas predefinidas.',
    tags: ['Gemini', 'RAG', 'Suporte', 'Audio']
  },
  {
    id: 'b44-3',
    category: 'E-commerce & Business',
    title: 'Plataforma E-commerce Múltiplos Vendedores',
    description: 'Loja virtual com carrinho interativo, catálogo filtrável, avaliação de produtos e gestão de estoque.',
    badge: 'E-commerce',
    prompt: 'Crie uma loja virtual completa estilo Shopify com catálogo de produtos, busca em tempo real, filtro por categoria e preço, carrinho de compras persitente e simulador de frete e cupom de desconto.',
    tags: ['Shopify-Style', 'Cart', 'E-commerce']
  },
  {
    id: 'b44-4',
    category: 'Dashboards & Analytics',
    title: 'Dashboard de Metricas Financeiras & MRR (Estilo Stripe)',
    description: 'Painel analítico com gráficos interativos, previsão de receita recorrente, indicador de churn e exportação CSV.',
    badge: 'FinTech',
    prompt: 'Desenvolva um Dashboard Financeiro estilo Stripe com gráficos de MRR, ARR, Churn Rate, LTV, filtro de períodos (7d, 30d, 12m) e tabela de transações recentes com status em cores.',
    tags: ['Recharts', 'Finance', 'Dashboard']
  },
  {
    id: 'b44-5',
    category: 'Utilities & Tools',
    title: 'Editor e Gravador de Áudio & Comando de Voz IA',
    description: 'Gravador de áudio no navegador com sintetizador de voz (TTS), reconhecimento de fala (STT) e leitor de texto.',
    badge: 'Voice AI',
    prompt: 'Crie um estúdio de áudio interativo no navegador com gravação por microfone, player de síntese de voz (TTS) com regulagem de velocidade e voz, visualizador de ondas sonoras e transcrição ao vivo.',
    tags: ['WebSpeech', 'Audio', 'Voice']
  },
  {
    id: 'b44-6',
    category: 'Marketing & Funnels',
    title: 'Criador de Anúncios e Análise de Campanha Meta/Google',
    description: 'Ferramenta para geração de copies de anúncios, variação de títulos, cálculo de ROI e sugestão de público-alvo.',
    badge: 'Marketing',
    prompt: 'Crie uma ferramenta para profissionais de tráfego pago que gera copies para Meta Ads e Google Ads, variando por gatilho mental (Dor, Desejo, Urgência), com calculadora de ROI e gerador de UTMs.',
    tags: ['Copywriting', 'Ads', 'ROI']
  },
  {
    id: 'b44-7',
    category: 'SaaS',
    title: 'Gerenciador de Projetos Kanban & Automação de Tarefas',
    description: 'Quadro Kanban interativo estilo Trello/Linear com drag and drop, prioridades, datas limite e IA organizadora.',
    badge: 'Productivity',
    prompt: 'Desenvolva um sistema estilo Trello/Linear com colunas Kanban (A Fazer, Em Progresso, Revisão, Concluído), atalhos de teclado, tags de prioridade e sugestão de divisão de tarefas por IA.',
    tags: ['Kanban', 'Trello', 'Tasks']
  },
  {
    id: 'b44-8',
    category: 'IA & Automations',
    title: 'Analisador e Extrator de Arquivos & Documentos',
    description: 'Carregue arquivos do armazenamento (Imagens, Código, CSV, TXT) e receba relatórios analíticos em segundos.',
    badge: 'File AI',
    prompt: 'Crie um módulo de upload e análise de arquivos com drag and drop que lê arquivos de texto/código/CSV/JSON do armazenamento do usuário, renderiza pré-visualizações e gera resumos explicativos com IA.',
    tags: ['Upload', 'Files', 'Parser']
  }
];
