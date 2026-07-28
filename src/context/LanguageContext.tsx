import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇧🇷' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'zh', name: 'Chinese', nativeName: '中文 (简体)', flag: '🇨🇳' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱' }
];

// Comprehensive Translation Dictionaries
const translations: Record<string, Record<string, string>> = {
  // Português (Default base)
  pt: {
    // Landing & Hero
    "hero_title": "Crie com a Intuitiva IA",
    "hero_subtitle": "Crie aplicativos e sites completos conversando diretamente com a IA",
    "hero_placeholder": "Peça à Intuitiva IA para criar uma landing page para o meu...",
    "btn_build": "Construir",
    "btn_design": "Design",
    "btn_plan": "Planejar",
    "btn_login": "Entrar",
    "btn_signup": "Começar agora",
    "nav_solutions": "Soluções",
    "nav_resources": "Recursos",
    "nav_community": "Comunidade",
    "nav_enterprise": "Empresarial",
    "nav_pricing": "Preços",
    "nav_security": "Segurança",
    "footer_rights": "© 2026 Intuitiva IA • Todos os direitos reservados",
    "footer_privacy": "Privacidade",
    "footer_terms": "Termos",
    "footer_docs": "Documentação",

    // Auth Modal
    "auth_welcome_title": "Bem-vindo à Intuitiva IA",
    "auth_login_subtitle": "Acesse sua conta para continuar seus projetos",
    "auth_register_subtitle": "Crie sua conta e comece a construir na velocidade da luz",
    "auth_email": "Endereço de E-mail",
    "auth_password": "Sua Senha",
    "auth_name": "Seu Nome Completo",
    "auth_continue": "Continuar com e-mail",
    "auth_no_account": "Não tem uma conta?",
    "auth_has_account": "Já possui uma conta?",
    "auth_register_link": "Cadastre-se grátis",
    "auth_login_link": "Faça login",

    // Header & Workspace
    "system_title": "Sistema Operacional de Desenvolvimento Web",
    "iam_permissions": "Permissões IAM",
    "credit_balance": "Saldo Créditos",
    "prompt_master": "PROMPT MESTRE",
    "logout": "Sair",

    // Sidebar
    "side_home": "Início da Agente",
    "side_builder": "Estúdio Web Builder",
    "side_code": "Editor de Código",
    "side_themes": "Temas & Interfaces",
    "side_import": "Importar Referência",
    "side_chat": "Assistente IA Chat",
    "side_billing": "Faturamento & Planos",
    "side_agents": "Agentes Especializados",
    "side_marketing": "Estratégia & Marketing",
    "side_arch": "Arquitetura & Sistemas",
    "side_guides": "Guias das Plataformas",
    "side_overview": "Visão Geral de Recursos",
    "side_upgrade": "Upgrade de Plano",

    // Home Prompt Console
    "home_welcome": "Olá",
    "home_what_build": "O que você deseja construir hoje?",
    "home_input_placeholder": "Descreva o site, app ou SaaS que você quer que a Intuitiva IA crie em segundos...",
    "home_start_btn": "Gerar Projeto",
    "home_recent": "Projetos Recentes",
    "home_view_all": "Ver todos"
  },

  // English
  en: {
    "hero_title": "Build with Intuitiva IA",
    "hero_subtitle": "Create full apps and websites by chatting directly with AI",
    "hero_placeholder": "Ask Intuitiva IA to create a landing page for my...",
    "btn_build": "Build",
    "btn_design": "Design",
    "btn_plan": "Plan",
    "btn_login": "Log in",
    "btn_signup": "Get started",
    "nav_solutions": "Solutions",
    "nav_resources": "Resources",
    "nav_community": "Community",
    "nav_enterprise": "Enterprise",
    "nav_pricing": "Pricing",
    "nav_security": "Security",
    "footer_rights": "© 2026 Intuitiva IA • All rights reserved",
    "footer_privacy": "Privacy",
    "footer_terms": "Terms",
    "footer_docs": "Documentation",

    "auth_welcome_title": "Welcome to Intuitiva IA",
    "auth_login_subtitle": "Access your account to continue your projects",
    "auth_register_subtitle": "Create your account and build at lightning speed",
    "auth_email": "Email Address",
    "auth_password": "Your Password",
    "auth_name": "Full Name",
    "auth_continue": "Continue with email",
    "auth_no_account": "Don't have an account?",
    "auth_has_account": "Already have an account?",
    "auth_register_link": "Sign up free",
    "auth_login_link": "Log in",

    "system_title": "Web Development Operating System",
    "iam_permissions": "IAM Permissions",
    "credit_balance": "Credit Balance",
    "prompt_master": "MASTER PROMPT",
    "logout": "Log out",

    "side_home": "Agent Home",
    "side_builder": "Web Builder Studio",
    "side_code": "Code Editor",
    "side_themes": "Themes & UI",
    "side_import": "Import Reference",
    "side_chat": "AI Chat Assistant",
    "side_billing": "Billing & Plans",
    "side_agents": "Specialized Agents",
    "side_marketing": "Strategy & Marketing",
    "side_arch": "Architecture & Systems",
    "side_guides": "Platform Guides",
    "side_overview": "Capabilities Overview",
    "side_upgrade": "Upgrade Plan",

    "home_welcome": "Hello",
    "home_what_build": "What would you like to build today?",
    "home_input_placeholder": "Describe the website, app, or SaaS you want Intuitiva IA to create in seconds...",
    "home_start_btn": "Generate Project",
    "home_recent": "Recent Projects",
    "home_view_all": "View all"
  },

  // Spanish
  es: {
    "hero_title": "Crea con Intuitiva IA",
    "hero_subtitle": "Crea aplicaciones y sitios web completos conversando directamente con IA",
    "hero_placeholder": "Pide a Intuitiva IA que cree una página de inicio para mi...",
    "btn_build": "Construir",
    "btn_design": "Diseño",
    "btn_plan": "Planificar",
    "btn_login": "Iniciar sesión",
    "btn_signup": "Comenzar gratis",
    "nav_solutions": "Soluciones",
    "nav_resources": "Recursos",
    "nav_community": "Comunidad",
    "nav_enterprise": "Empresarial",
    "nav_pricing": "Precios",
    "nav_security": "Seguridad",
    "footer_rights": "© 2026 Intuitiva IA • Todos los derechos reservados",
    "footer_privacy": "Privacidad",
    "footer_terms": "Términos",
    "footer_docs": "Documentación",

    "auth_welcome_title": "Bienvenido a Intuitiva IA",
    "auth_login_subtitle": "Accede a tu cuenta para continuar con tus proyectos",
    "auth_register_subtitle": "Crea tu cuenta y construye a la velocidad de la luz",
    "auth_email": "Correo electrónico",
    "auth_password": "Tu contraseña",
    "auth_name": "Nombre completo",
    "auth_continue": "Continuar con correo",
    "auth_no_account": "¿No tienes cuenta?",
    "auth_has_account": "¿Ya tienes una cuenta?",
    "auth_register_link": "Regístrate gratis",
    "auth_login_link": "Iniciar sesión",

    "system_title": "Sistema Operativo de Desarrollo Web",
    "iam_permissions": "Permisos IAM",
    "credit_balance": "Saldo de Créditos",
    "prompt_master": "PROMPT MAESTRO",
    "logout": "Cerrar sesión",

    "side_home": "Inicio del Agente",
    "side_builder": "Estudio Web Builder",
    "side_code": "Editor de Código",
    "side_themes": "Temas e Interfaces",
    "side_import": "Importar Referencia",
    "side_chat": "Asistente IA Chat",
    "side_billing": "Facturación y Planes",
    "side_agents": "Agentes Especializados",
    "side_marketing": "Estrategia y Marketing",
    "side_arch": "Arquitectura y Sistemas",
    "side_guides": "Guías de Plataforma",
    "side_overview": "Visión General",
    "side_upgrade": "Mejorar Plan",

    "home_welcome": "Hola",
    "home_what_build": "¿Qué deseas construir hoy?",
    "home_input_placeholder": "Describe el sitio web, app o SaaS que deseas que Intuitiva IA cree en segundos...",
    "home_start_btn": "Generar Proyecto",
    "home_recent": "Proyectos Recientes",
    "home_view_all": "Ver todos"
  },

  // French
  fr: {
    "hero_title": "Créez avec Intuitiva IA",
    "hero_subtitle": "Créez des applications et sites web complets en discutant directement avec l'IA",
    "hero_placeholder": "Demandez à Intuitiva IA de créer une page d'accueil pour mon...",
    "btn_build": "Construire",
    "btn_design": "Design",
    "btn_plan": "Planifier",
    "btn_login": "Connexion",
    "btn_signup": "Commencer",
    "nav_solutions": "Solutions",
    "nav_resources": "Ressources",
    "nav_community": "Communauté",
    "nav_enterprise": "Entreprise",
    "nav_pricing": "Tarifs",
    "nav_security": "Sécurité",
    "footer_rights": "© 2026 Intuitiva IA • Tous droits réservés",
    "footer_privacy": "Confidentialité",
    "footer_terms": "Conditions",
    "footer_docs": "Documentation",

    "auth_welcome_title": "Bienvenue sur Intuitiva IA",
    "auth_login_subtitle": "Accédez à votre compte pour continuer vos projets",
    "auth_register_subtitle": "Créez votre compte et développez à la vitesse de la lumière",
    "auth_email": "Adresse E-mail",
    "auth_password": "Votre Mot de passe",
    "auth_name": "Nom complet",
    "auth_continue": "Continuer par e-mail",
    "auth_no_account": "Vous n'avez pas de compte ?",
    "auth_has_account": "Vous avez déjà un compte ?",
    "auth_register_link": "Inscrivez-vous gratuitement",
    "auth_login_link": "Se connecter",

    "system_title": "Système d'Exploitation de Développement Web",
    "iam_permissions": "Permissions IAM",
    "credit_balance": "Solde de Crédits",
    "prompt_master": "PROMPT MAÎTRE",
    "logout": "Déconnexion",

    "side_home": "Accueil Agent",
    "side_builder": "Studio Web Builder",
    "side_code": "Éditeur de Code",
    "side_themes": "Thèmes et Interfaces",
    "side_import": "Importer Référence",
    "side_chat": "Assistant IA Chat",
    "side_billing": "Facturation & Abonnements",
    "side_agents": "Agents Spécialisés",
    "side_marketing": "Stratégie & Marketing",
    "side_arch": "Architecture & Systèmes",
    "side_guides": "Guides de Plateforme",
    "side_overview": "Aperçu des Fonctionnalités",
    "side_upgrade": "Changer d'abonnement",

    "home_welcome": "Bonjour",
    "home_what_build": "Que souhaitez-vous créer aujourd'hui ?",
    "home_input_placeholder": "Décrivez le site, l'application ou le SaaS que vous souhaitez qu'Intuitiva IA génère...",
    "home_start_btn": "Générer le Projet",
    "home_recent": "Projets Récents",
    "home_view_all": "Voir tout"
  },

  // German
  de: {
    "hero_title": "Bauen mit Intuitiva IA",
    "hero_subtitle": "Erstellen Sie Apps und Websites durch direktes Chatten mit KI",
    "hero_placeholder": "Bitten Sie Intuitiva IA, eine Landingpage zu erstellen für...",
    "btn_build": "Bauen",
    "btn_design": "Design",
    "btn_plan": "Planen",
    "btn_login": "Anmelden",
    "btn_signup": "Jetzt starten",
    "nav_solutions": "Lösungen",
    "nav_resources": "Ressourcen",
    "nav_community": "Community",
    "nav_enterprise": "Unternehmen",
    "nav_pricing": "Preise",
    "nav_security": "Sicherheit",
    "footer_rights": "© 2026 Intuitiva IA • Alle Rechte vorbehalten",
    "footer_privacy": "Datenschutz",
    "footer_terms": "AGB",
    "footer_docs": "Dokumentation",

    "auth_welcome_title": "Willkommen bei Intuitiva IA",
    "auth_login_subtitle": "Melden Sie sich an, um an Ihren Projekten weiterzuarbeiten",
    "auth_register_subtitle": "Erstellen Sie ein Konto und bauen Sie in Lichtgeschwindigkeit",
    "auth_email": "E-Mail-Adresse",
    "auth_password": "Ihr Passwort",
    "auth_name": "Vollständiger Name",
    "auth_continue": "Mit E-Mail fortfahren",
    "auth_no_account": "Noch kein Konto?",
    "auth_has_account": "Bereits ein Konto?",
    "auth_register_link": "Kostenlos registrieren",
    "auth_login_link": "Anmelden",

    "system_title": "Betriebssystem für Webentwicklung",
    "iam_permissions": "IAM-Berechtigungen",
    "credit_balance": "Guthaben",
    "prompt_master": "MASTER PROMPT",
    "logout": "Abmelden",

    "side_home": "Agenten-Startseite",
    "side_builder": "Web Builder Studio",
    "side_code": "Code-Editor",
    "side_themes": "Themes & UI",
    "side_import": "Referenz importieren",
    "side_chat": "KI-Chat-Assistent",
    "side_billing": "Abrechnung & Pläne",
    "side_agents": "Spezialisierte Agenten",
    "side_marketing": "Strategie & Marketing",
    "side_arch": "Architektur & Systeme",
    "side_guides": "Plattform-Guides",
    "side_overview": "Funktionsübersicht",
    "side_upgrade": "Plan upgraden",

    "home_welcome": "Hallo",
    "home_what_build": "Was möchten Sie heute bauen?",
    "home_input_placeholder": "Beschreiben Sie die Website, App oder SaaS, die Intuitiva IA erstellen soll...",
    "home_start_btn": "Projekt generieren",
    "home_recent": "Neueste Projekte",
    "home_view_all": "Alle anzeigen"
  },

  // Italian
  it: {
    "hero_title": "Crea con Intuitiva IA",
    "hero_subtitle": "Crea app e siti web completi chattando direttamente con l'IA",
    "hero_placeholder": "Chiedi a Intuitiva IA di creare una landing page per il mio...",
    "btn_build": "Crea",
    "btn_design": "Design",
    "btn_plan": "Pianifica",
    "btn_login": "Accedi",
    "btn_signup": "Inizia ora",
    "nav_solutions": "Soluzioni",
    "nav_resources": "Risorse",
    "nav_community": "Community",
    "nav_enterprise": "Aziende",
    "nav_pricing": "Prezzi",
    "nav_security": "Sicurezza",
    "footer_rights": "© 2026 Intuitiva IA • Tutti i diritti riservati",
    "footer_privacy": "Privacy",
    "footer_terms": "Termini",
    "footer_docs": "Documentazione",

    "auth_welcome_title": "Benvenuto in Intuitiva IA",
    "auth_login_subtitle": "Accedi al tuo account per continuare i tuoi progetti",
    "auth_register_subtitle": "Crea il tuo account e sviluppa alla velocità della luce",
    "auth_email": "Indirizzo Email",
    "auth_password": "La tua Password",
    "auth_name": "Nome Completo",
    "auth_continue": "Continua con e-mail",
    "auth_no_account": "Non hai un account?",
    "auth_has_account": "Hai già un account?",
    "auth_register_link": "Registrati gratis",
    "auth_login_link": "Accedi",

    "system_title": "Sistema Operativo per Sviluppo Web",
    "iam_permissions": "Permessi IAM",
    "credit_balance": "Saldo Crediti",
    "prompt_master": "PROMPT MASTER",
    "logout": "Esci",

    "side_home": "Home Agente",
    "side_builder": "Studio Web Builder",
    "side_code": "Editor di Codice",
    "side_themes": "Temi e Interfacce",
    "side_import": "Importa Riferimento",
    "side_chat": "Assistente IA Chat",
    "side_billing": "Fatturazione e Piani",
    "side_agents": "Agenti Specializzati",
    "side_marketing": "Strategia e Marketing",
    "side_arch": "Architettura e Sistemi",
    "side_guides": "Guide Piattaforma",
    "side_overview": "Panoramica Funzionalità",
    "side_upgrade": "Aggiorna Piano",

    "home_welcome": "Ciao",
    "home_what_build": "Cosa vorresti creare oggi?",
    "home_input_placeholder": "Descrivi il sito web, app o SaaS che vuoi che Intuitiva IA crei in pochi secondi...",
    "home_start_btn": "Genera Progetto",
    "home_recent": "Progetti Recenti",
    "home_view_all": "Vedi tutti"
  },

  // Japanese
  ja: {
    "hero_title": "Intuitiva IA で開発する",
    "hero_subtitle": "AIと会話するだけでアプリやWebサイトを瞬時に作成できます",
    "hero_placeholder": "Intuitiva IAにランディングページの作成を依頼...",
    "btn_build": "構築",
    "btn_design": "デザイン",
    "btn_plan": "計画",
    "btn_login": "ログイン",
    "btn_signup": "無料で始める",
    "nav_solutions": "ソリューション",
    "nav_resources": "リソース",
    "nav_community": "コミュニティ",
    "nav_enterprise": "エンタープライズ",
    "nav_pricing": "料金プラン",
    "nav_security": "セキュリティ",
    "footer_rights": "© 2026 Intuitiva IA • 全著作権所有",
    "footer_privacy": "プライバシー",
    "footer_terms": "利用規約",
    "footer_docs": "ドキュメント",

    "auth_welcome_title": "Intuitiva IA へようこそ",
    "auth_login_subtitle": "アカウントにアクセスしてプロジェクトを続行",
    "auth_register_subtitle": "アカウントを作成して高速開発を開始",
    "auth_email": "メールアドレス",
    "auth_password": "パスワード",
    "auth_name": "お名前",
    "auth_continue": "メールアドレスで続行",
    "auth_no_account": "アカウントをお持ちでないですか？",
    "auth_has_account": "すでにアカウントをお持ちですか？",
    "auth_register_link": "無料登録",
    "auth_login_link": "ログイン",

    "system_title": "Web開発オペレーティングシステム",
    "iam_permissions": "IAM権限",
    "credit_balance": "クレジット残高",
    "prompt_master": "マスタープロンプト",
    "logout": "ログアウト",

    "side_home": "エージェントホーム",
    "side_builder": "Webビルダースタジオ",
    "side_code": "コードエディター",
    "side_themes": "テーマ＆UI",
    "side_import": "リファレンスインポート",
    "side_chat": "AIチャットアシスタント",
    "side_billing": "請求・プラン",
    "side_agents": "専門エージェント",
    "side_marketing": "マーケティング戦略",
    "side_arch": "アーキテクチャ・システム",
    "side_guides": "プラットフォームガイド",
    "side_overview": "機能概要",
    "side_upgrade": "プランをアップグレード",

    "home_welcome": "こんにちは",
    "home_what_build": "今日何を構築したいですか？",
    "home_input_placeholder": "Intuitiva IAに作成してほしいWebサイトやAppの概要を入力...",
    "home_start_btn": "プロジェクトを生成",
    "home_recent": "最近のプロジェクト",
    "home_view_all": "すべて見る"
  },

  // Chinese
  zh: {
    "hero_title": "使用 Intuitiva IA 创造",
    "hero_subtitle": "与 AI 直接对话，轻松构建完整的应用和网站",
    "hero_placeholder": "要求 Intuitiva IA 为我创建一个着陆页...",
    "btn_build": "构建",
    "btn_design": "设计",
    "btn_plan": "规划",
    "btn_login": "登录",
    "btn_signup": "立即开始",
    "nav_solutions": "解决方案",
    "nav_resources": "资源",
    "nav_community": "社区",
    "nav_enterprise": "企业",
    "nav_pricing": "价格",
    "nav_security": "安全",
    "footer_rights": "© 2026 Intuitiva IA • 保留所有权利",
    "footer_privacy": "隐私政策",
    "footer_terms": "服务条款",
    "footer_docs": "文档",

    "auth_welcome_title": "欢迎来到 Intuitiva IA",
    "auth_login_subtitle": "登录您的账户以继续您的项目",
    "auth_register_subtitle": "创建账户，体验闪电般的开发速度",
    "auth_email": "电子邮箱",
    "auth_password": "密码",
    "auth_name": "全名",
    "auth_continue": "使用邮箱继续",
    "auth_no_account": "还没有账户？",
    "auth_has_account": "已有账户？",
    "auth_register_link": "免费注册",
    "auth_login_link": "登录",

    "system_title": "Web 开发操作系统",
    "iam_permissions": "IAM 权限",
    "credit_balance": "积分余额",
    "prompt_master": "大师提示词",
    "logout": "退出登录",

    "side_home": "智能体主页",
    "side_builder": "Web 构建工作室",
    "side_code": "代码编辑器",
    "side_themes": "主题与界面",
    "side_import": "导入参考",
    "side_chat": "AI 聊天助手",
    "side_billing": "账单与套餐",
    "side_agents": "专业智能体",
    "side_marketing": "营销与策略",
    "side_arch": "架构与系统",
    "side_guides": "平台指南",
    "side_overview": "功能总览",
    "side_upgrade": "升级套餐",

    "home_welcome": "你好",
    "home_what_build": "今天你想构建什么？",
    "home_input_placeholder": "描述您希望 Intuitiva IA 在几秒钟内创建的网站或应用...",
    "home_start_btn": "生成项目",
    "home_recent": "最近的项目",
    "home_view_all": "查看全部"
  }
};

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (code: string) => void;
  t: (key: string, defaultText?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('intuitiva_language');
    const found = SUPPORTED_LANGUAGES.find((l) => l.code === saved);
    return found || SUPPORTED_LANGUAGES[0]; // Português as default
  });

  const setLanguage = (code: string) => {
    const target = SUPPORTED_LANGUAGES.find((l) => l.code === code);
    if (target) {
      setCurrentLanguageState(target);
      localStorage.setItem('intuitiva_language', code);
    }
  };

  const t = (key: string, defaultText?: string): string => {
    const langCode = currentLanguage.code;
    const dict = translations[langCode] || translations.pt;
    if (dict && dict[key]) {
      return dict[key];
    }
    // Fallback to Portuguese or default text
    if (translations.pt[key]) {
      return translations.pt[key];
    }
    return defaultText || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
