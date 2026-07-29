export interface CoreAiFeatureItem {
  id: string;
  title: string;
  description: string;
  promptExample: string;
}

export interface CoreAiCategoryGroup {
  id: string;
  categoryName: string;
  emoji: string;
  iconName: string;
  description: string;
  items: CoreAiFeatureItem[];
}

export const CORE_AI_RESOURCES: CoreAiCategoryGroup[] = [
  {
    id: 'interfaces',
    categoryName: 'Criação de interfaces',
    emoji: '🎨',
    iconName: 'Palette',
    description: 'Interfaces visuais completas, modernas e adaptáveis para qualquer segmento.',
    items: [
      {
        id: 'ui-01',
        title: 'Landing Pages',
        description: 'Páginas promocionais de alta conversão com Hero, Prova Social, Tabela de Preços e CTA.',
        promptExample: 'Crie uma Landing Page moderna para um software SaaS de IA com tema escuro e botões neon.'
      },
      {
        id: 'ui-02',
        title: 'Dashboards',
        description: 'Painéis administrativos com gráficos interativos, KPIs, filtros e tabelas dinâmicas.',
        promptExample: 'Crie um Dashboard de vendas com gráficos de receita em tempo real e lista de transações recentes.'
      },
      {
        id: 'ui-03',
        title: 'SaaS',
        description: 'Plataformas SaaS completas com autenticação, gestão de planos, assinaturas e área do cliente.',
        promptExample: 'Crie um SaaS de gestão de tarefas em equipe com fluxo de Kanban e relatórios.'
      },
      {
        id: 'ui-04',
        title: 'E-commerce',
        description: 'Lojas virtuais com catálogo de produtos, busca com autocompletar, carrinho e checkout.',
        promptExample: 'Crie uma loja virtual de roupas com filtros por tamanho, cor, carrinho de compras e cálculo de frete.'
      },
      {
        id: 'ui-05',
        title: 'Blogs',
        description: 'Portais de notícias e artigos com suporte a Markdown, categorias, tempo de leitura e busca.',
        promptExample: 'Crie um Blog de tecnologia com leitor de artigos em Markdown, busca e artigos relacionados.'
      },
      {
        id: 'ui-06',
        title: 'Portais',
        description: 'Portais corporativos ou educacionais com múltiplas seções, cursos e suporte ao usuário.',
        promptExample: 'Crie um portal de membros de curso online com progresso de aulas e downloads.'
      },
      {
        id: 'ui-07',
        title: 'Sistemas Administrativos',
        description: 'Paineis de controle internos (Backoffice) com CRUD de usuários, logs e permissões.',
        promptExample: 'Crie um sistema administrativo para gestão de estoque e emissão de relatórios.'
      },
      {
        id: 'ui-08',
        title: 'Interfaces Responsivas',
        description: 'Design adaptável que se ajusta perfeitamente a qualquer resolução de tela sem quebrar layout.',
        promptExample: 'Otimize todo o layout para ser 100% responsivo em telas mobile de 375px e desktop 4K.'
      },
      {
        id: 'ui-09',
        title: 'Componentes Modernos',
        description: 'Componentes reusáveis estilizados com Tailwind CSS, Framer Motion e Lucide Icons.',
        promptExample: 'Adicione cards com efeito Glassmorphism, bordas suaves e transições ao passar o mouse.'
      }
    ]
  },

  {
    id: 'ai_engine',
    categoryName: 'Inteligência Artificial (IA)',
    emoji: '🤖',
    iconName: 'Bot',
    description: 'Capacidades avançadas do motor de IA para criar, editar, depurar e otimizar código.',
    items: [
      {
        id: 'ia-01',
        title: 'Gera código a partir de prompts',
        description: 'Transforma descrições em linguagem natural em aplicações web/mobile completas e funcionais.',
        promptExample: 'Gere uma aplicação completa de CRM para corretores de imóveis com lista de clientes e funil.'
      },
      {
        id: 'ia-02',
        title: 'Modifica projetos por conversa',
        description: 'Altere estilos, adicione seções e refine regras de negócio através de chat contínuo.',
        promptExample: 'Altere a cor primária para azul cobalto e adicione uma nova seção de depoimentos dos clientes.'
      },
      {
        id: 'ia-03',
        title: 'Corrige bugs',
        description: 'Identifica e corrige erros de sintaxe, estado nulo, falhas de lógica e exceções do navegador.',
        promptExample: 'Analise o formulário atual, corrija o erro no envio e valide o e-mail obrigatoriamente.'
      },
      {
        id: 'ia-04',
        title: 'Refatora código',
        description: 'Reorganiza arquivos, melhora a legibilidade, remove duplicações e aplica boas práticas.',
        promptExample: 'Refatore o componente principal dividindo os botões e os modais em arquivos separados dentro de /src/components.'
      },
      {
        id: 'ia-05',
        title: 'Cria novas funcionalidades',
        description: 'Expande o projeto existente com novas abas, integrações com APIs e relatórios.',
        promptExample: 'Adicione a funcionalidade de exportação de dados da tabela para PDF e CSV.'
      },
      {
        id: 'ia-06',
        title: 'Explica o código gerado',
        description: 'Fornece explicações detalhadas em português sobre a arquitetura e funcionamento do código.',
        promptExample: 'Explique detalhadamente como o estado global do projeto foi estruturado em TypeScript.'
      }
    ]
  },

  {
    id: 'code_gen',
    categoryName: 'Geração de Código',
    emoji: '💻',
    iconName: 'Code2',
    description: 'Linguagens, frameworks e tecnologias modernas suportadas nativamente pela plataforma.',
    items: [
      {
        id: 'cg-01',
        title: 'React',
        description: 'Desenvolvimento em React 18+ com componentes funcionais, hooks customizados e JSX.',
        promptExample: 'Construa a interface utilizando componentes funcionais React e useState/useEffect.'
      },
      {
        id: 'cg-02',
        title: 'Next.js',
        description: 'Geração compatível com Next.js (App Router), Server Components e rotas /api.',
        promptExample: 'Converta esta estrutura para a sintaxe do Next.js 14 App Router.'
      },
      {
        id: 'cg-03',
        title: 'TypeScript',
        description: 'Tipagem estática forte, interfaces, tipos genéricos e enums para prevenção de erros.',
        promptExample: 'Defina todas as interfaces TypeScript para a entidade de Usuário, Pedido e Produto.'
      },
      {
        id: 'cg-04',
        title: 'HTML',
        description: 'Estruturação semântica limpa com tags acessíveis (header, main, section, footer, nav).',
        promptExample: 'Garanta a utilização de HTML5 semântico com marcas para acessibilidade (aria-labels).'
      },
      {
        id: 'cg-05',
        title: 'CSS',
        description: 'Estilização customizada, variáveis CSS, animações keyframes e layout flexbox/grid.',
        promptExample: 'Crie um estilo com efeito de iluminação suave e cantos arredondados.'
      },
      {
        id: 'cg-06',
        title: 'Tailwind CSS',
        description: 'Classes utilitárias rápidas, suporte a dark mode e design altamente responsivo.',
        promptExample: 'Estilize toda a página usando estritamente utilitários do Tailwind CSS v4.'
      },
      {
        id: 'cg-07',
        title: 'JavaScript',
        description: 'Lógica moderna em JS ES6+, async/await, métodos de array e manipulação do DOM.',
        promptExample: 'Crie uma função utilitária em JavaScript para formatar valores monetários em Reais (R$).'
      }
    ]
  },

  {
    id: 'database',
    categoryName: 'Banco de Dados',
    emoji: '🗄️',
    iconName: 'Database',
    description: 'Integração completa com bancos de dados relacionais e em nuvem para armazenamento seguro.',
    items: [
      {
        id: 'db-01',
        title: 'Integração com Supabase',
        description: 'Conectividade com projeto Supabase, cliente JS e sincronização de dados ao vivo.',
        promptExample: 'Integre o cliente do Supabase para realizar consultas na tabela de mensagens.'
      },
      {
        id: 'db-02',
        title: 'PostgreSQL',
        description: 'Modelagem de dados relacional com suporte a tabelas, chaves estrangeiras e índices.',
        promptExample: 'Crie o schema SQL para um banco PostgreSQL de e-commerce com tabelas de clientes e pedidos.'
      },
      {
        id: 'db-03',
        title: 'CRUD automático',
        description: 'Criação, Leitura, Atualização e Exclusão automáticas de registros em banco de dados.',
        promptExample: 'Gere os formulários e funções de CRUD completo para gerenciar produtos.'
      },
      {
        id: 'db-04',
        title: 'Autenticação',
        description: 'Persistência de sessões de usuário com tokens JWT, cookies seguros e regras de autorização.',
        promptExample: 'Adicione controle de rotas protegidas que exigem usuário autenticado no Supabase.'
      },
      {
        id: 'db-05',
        title: 'Upload de arquivos',
        description: 'Envio de imagens, documentos e mídias para buckets de storage (Supabase Storage / Firebase).',
        promptExample: 'Crie um componente de upload de fotos de avatar integrado ao bucket de armazenamento.'
      },
      {
        id: 'db-06',
        title: 'Regras de acesso',
        description: 'Row Level Security (RLS) e políticas de acesso restritas por ID de usuário.',
        promptExample: 'Configure regras RLS para que usuários acessem exclusivamente seus próprios dados.'
      }
    ]
  },

  {
    id: 'login_auth',
    categoryName: 'Login & Autenticação',
    emoji: '🔐',
    iconName: 'ShieldCheck',
    description: 'Sistemas de login social e tradicional com gestão flexível de usuários e sessões.',
    items: [
      {
        id: 'auth-01',
        title: 'Google Login',
        description: 'Autenticação OAuth rápida com 1-click através de contas do Google.',
        promptExample: 'Adicione botão de "Entrar com Google" integrado com pop-up de autenticação OAuth.'
      },
      {
        id: 'auth-02',
        title: 'GitHub Login',
        description: 'Login para desenvolvedores via credenciais do GitHub.',
        promptExample: 'Adicione botão de autenticação social via GitHub.'
      },
      {
        id: 'auth-03',
        title: 'E-mail e senha',
        description: 'Login tradicional com e-mail/senha, validação, recuperação de senha e redefinição.',
        promptExample: 'Crie uma tela de login e cadastro com e-mail, senha e validação de força da senha.'
      },
      {
        id: 'auth-04',
        title: 'Controle de usuários',
        description: 'Níveis de permissão (Admin, Editor, Cliente), perfis de usuário e bloqueio de acesso.',
        promptExample: 'Crie uma área restrita que exibe opções adicionais apenas para usuários do tipo Admin.'
      }
    ]
  },

  {
    id: 'responsiveness',
    categoryName: 'Responsividade',
    emoji: '📱',
    iconName: 'Smartphone',
    description: 'Visualização perfeita e navegabilidade fluida em todas as resoluções e dispositivos.',
    items: [
      {
        id: 'resp-01',
        title: 'Desktop',
        description: 'Layouts amplos em alta resolução (1440px+), barras laterais fixas e navegação estendida.',
        promptExample: 'Ajuste a visualização desktop com sidebar fixa e área central expansível.'
      },
      {
        id: 'resp-02',
        title: 'Tablet',
        description: 'Adaptação mediana (768px-1024px) com grades de 2 colunas e menus retráteis.',
        promptExample: 'Organize os cards de métricas em uma grade de 2 colunas para telas de tablet.'
      },
      {
        id: 'resp-03',
        title: 'Celular',
        description: 'Visualização otimizada para smartphones com menu hambúrguer e botões touch de 44px+.',
        promptExample: 'Transforme o menu de navegação superior em um gaveta lateral (drawer) para celulares.'
      }
    ]
  },

  {
    id: 'deploy',
    categoryName: 'Deploy & Publicação',
    emoji: '⚡',
    iconName: 'Cloud',
    description: 'Hospedagem rápida, compilação de código e publicação instantânea em nuvem.',
    items: [
      {
        id: 'dep-01',
        title: 'Publicação rápida',
        description: 'Deploy em 1-click gerando link público seguro com suporte a HTTPS automático.',
        promptExample: 'Gere os arquivos de build otimizados prontos para publicação em nuvem.'
      },
      {
        id: 'dep-02',
        title: 'Integração com plataformas de hospedagem',
        description: 'Conexão direta com Vercel, Netlify, Cloud Run, Cloudflare e Railway.',
        promptExample: 'Crie os arquivos de configuração vercel.json e netlify.toml para hospedagem.'
      },
      {
        id: 'dep-03',
        title: 'Geração de builds',
        description: 'Compilação sem erros com minificação de arquivos, bundling e otimização de assets.',
        promptExample: 'Execute a verificação de build e confirme que não há erros de compilação no TypeScript.'
      }
    ]
  },

  {
    id: 'components',
    categoryName: 'Componentes UI',
    emoji: '🧩',
    iconName: 'Layers',
    description: 'Biblioteca vasta de componentes prontos para montagem de interfaces ricas.',
    items: [
      {
        id: 'comp-01',
        title: 'Botões',
        description: 'Botões variados (primário, secundário, outline, com ícone, estados de carregamento).',
        promptExample: 'Crie uma biblioteca de botões nos estilos Primário, Secundário, Perigo e Ghost.'
      },
      {
        id: 'comp-02',
        title: 'Formulários',
        description: 'Inputs, selects, checkboxes, switches de ativação, sliders e upload de arquivos.',
        promptExample: 'Monte um formulário completo de contato com campos para Nome, E-mail, Assunto e Mensagem.'
      },
      {
        id: 'comp-03',
        title: 'Tabelas',
        description: 'Tabelas responsivas com paginação, ordenação, busca e exportação de relatórios.',
        promptExample: 'Crie uma tabela de vendas com colunas id, cliente, valor, status e data.'
      },
      {
        id: 'comp-04',
        title: 'Gráficos',
        description: 'Visualizações de dados com Recharts (Linha, Barra, Pizza, Área, Dispersão).',
        promptExample: 'Adicione um gráfico de área de faturamento mensal com comparativo do ano anterior.'
      },
      {
        id: 'comp-05',
        title: 'Cards',
        description: 'Cartões para produtos, artigos, estatísticas e perfis com efeitos hover.',
        promptExample: 'Desenvolva cards de estatística com ícone em destaque, valor numérico e variação percentual.'
      },
      {
        id: 'comp-06',
        title: 'Modais',
        description: 'Janelas sobrepostas acessíveis para confirmações, formulários rápidos e previews.',
        promptExample: 'Crie um modal de confirmação antes de excluir qualquer item permanentemente.'
      },
      {
        id: 'comp-07',
        title: 'Menus',
        description: 'Navegação superior, barras laterais dobráveis, menus dropdown e breadcrumbs.',
        promptExample: 'Crie uma barra lateral retrátil com ícones para navegação entre as páginas.'
      },
      {
        id: 'comp-08',
        title: 'Calendários',
        description: 'Agendadores interativos com datas, horários e marcação de compromissos.',
        promptExample: 'Insira um calendário de agendamento de reuniões com seleção de horários disponíveis.'
      },
      {
        id: 'comp-09',
        title: 'Dashboards',
        description: 'Estruturas de painel integrando todos os componentes com métricas ao vivo.',
        promptExample: 'Combine gráficos, tabela de transações e cards de resumo em um dashboard executivo.'
      }
    ]
  },

  {
    id: 'integrations',
    categoryName: 'Integrações',
    emoji: '🔌',
    iconName: 'Zap',
    description: 'Conectividade com serviços externos, APIs de terceiros e repositórios.',
    items: [
      {
        id: 'int-01',
        title: 'APIs REST',
        description: 'Consumo de endpoints RESTful com tratamento de dados JSON, cabeçalhos e erros.',
        promptExample: 'Crie uma integração com API REST externa de previsão do tempo utilizando fetch.'
      },
      {
        id: 'int-02',
        title: 'Webhooks',
        description: 'Recepção de notificações assíncronas em tempo real sobre pagamentos e eventos.',
        promptExample: 'Crie um endpoint de rota para receber eventos de webhook de confirmação de pagamento.'
      },
      {
        id: 'int-03',
        title: 'Supabase',
        description: 'Conexão nativa com Supabase para dados, autenticação e real-time subscriptions.',
        promptExample: 'Configure a integração com o cliente Supabase utilizando variáveis de ambiente.'
      },
      {
        id: 'int-04',
        title: 'Exportação Automática para GitHub',
        description: 'Exportação direta de projetos com criação de repositórios, estrutura de arquivos e commits automáticos via API REST.',
        promptExample: 'Exportar o projeto WebBuilderStudio diretamente para a minha conta do GitHub com commit automático.'
      },
      {
        id: 'int-05',
        title: 'Serviços Externos',
        description: 'Conexão com Stripe, Mercado Pago, OpenAI, Resend, Twilio e Google APIs.',
        promptExample: 'Integre o checkout transparente do Stripe ou Mercado Pago para recebimento via PIX.'
      }
    ]
  },

  {
    id: 'dev_features',
    categoryName: 'Recursos para Desenvolvedores',
    emoji: '🎯',
    iconName: 'Wrench',
    description: 'Padrões de engenharia limpos que garantem total autonomia de código e manutenção.',
    items: [
      {
        id: 'dev-01',
        title: 'Estrutura organizada',
        description: 'Arquitetura de diretórios clara (/src/components, /src/types, /src/data).',
        promptExample: 'Organize a estrutura de diretórios separando páginas, componentes, tipos e dados.'
      },
      {
        id: 'dev-02',
        title: 'Componentes reutilizáveis',
        description: 'Componentes isolados que aceitam propriedades e tratadores de eventos.',
        promptExample: 'Crie um componente reutilizável de CardDeProduto que aceita título, preço e imagem via props.'
      },
      {
        id: 'dev-03',
        title: 'Código editável',
        description: 'Código 100% human-readable sem minificação ou empacotamento proprietário.',
        promptExample: 'Gere um código fonte limpo e legível com comentários explicativos.'
      },
      {
        id: 'dev-04',
        title: 'Git',
        description: 'Compatibilidade com repositórios Git, branches e histórico de commits.',
        promptExample: 'Prepare o repositório com arquivo .gitignore adequado para pacotes Node e builds.'
      },
      {
        id: 'dev-05',
        title: 'TypeScript',
        description: 'Interfaces estritamente definidas sem o uso do tipo generic "any".',
        promptExample: 'Aplique verificação de tipos rigorosa com TypeScript em todos os arquivos.'
      },
      {
        id: 'dev-06',
        title: 'Tailwind CSS',
        description: 'Estilização direta com Tailwind v4 garantindo customização rápida.',
        promptExample: 'Utilize classes utilitárias do Tailwind CSS para ajustar cores, paddings e animações.'
      }
    ]
  },

  {
    id: 'editing',
    categoryName: 'Edição & Customização',
    emoji: '🛠️',
    iconName: 'Sparkles',
    description: 'Flexibilidade total para modificar qualquer aspecto do projeto através do assistente.',
    items: [
      {
        id: 'edit-01',
        title: 'Alterar qualquer página por prompt',
        description: 'Solicite alterações visuais ou funcionais em qualquer tela da sua aplicação.',
        promptExample: 'Altere o layout da página de configurações para incluir preferência de tema escuro/claro.'
      },
      {
        id: 'edit-02',
        title: 'Adicionar páginas',
        description: 'Crie novas telas e seções instantaneamente mantendo o mesmo estilo visual.',
        promptExample: 'Adicione uma nova página de "Política de Privacidade" e adicione o link no rodapé.'
      },
      {
        id: 'edit-03',
        title: 'Excluir componentes',
        description: 'Remova seções ou elementos indesejados da tela sem comprometer a estrutura.',
        promptExample: 'Remova o carrossel secundário da página inicial.'
      },
      {
        id: 'edit-04',
        title: 'Criar novas telas',
        description: 'Construa telas inteiras como Dashboard, Perfil do Usuário e Configurações.',
        promptExample: 'Crie uma nova tela de Perfil do Usuário com foto, nome, bio e histórico de compras.'
      },
      {
        id: 'edit-05',
        title: 'Modificar estilos',
        description: 'Altere arredondamento de bordas, sombras, opacidade e espaçamentos.',
        promptExample: 'Modifique os cards para usar bordas arredondadas rounded-2xl e sombra suave.'
      },
      {
        id: 'edit-06',
        title: 'Trocar cores e fontes',
        description: 'Substitua paletas de cores primárias/secundárias e tipografias com 1 comando.',
        promptExample: 'Troque a paleta de cores para um azul petróleo (#004d40) e aplique a fonte Inter.'
      }
    ]
  }
];
