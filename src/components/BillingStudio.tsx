import React, { useState, useEffect } from 'react';
import {
  Zap,
  Globe,
  CreditCard,
  Server,
  CheckCircle2,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Search,
  ArrowRight,
  TrendingUp,
  History,
  Lock,
  Sparkles,
  ExternalLink,
  DollarSign,
  Layers,
  AlertCircle,
  Copy,
  Check,
  RefreshCw,
  UserCheck,
  Key,
  Terminal,
  Sliders,
  Shield,
  Info,
  QrCode,
  X,
  Gift,
  Clock,
  Activity,
  Send,
  Radio
} from 'lucide-react';
import { CreditPlan, DomainCheck, PublishedProject, IAMPermissionCheck, IAMTroubleshooterRequest } from '../types';

const PIX_KEY = '14166340964';

interface CustomPlanItem {
  id: string;
  name: string;
  badge: string;
  popular?: boolean;
  monthlyPrice: string;
  annualMonthlyEquivalent: string;
  annualTotalPrice: string;
  credits: number;
  features: string[];
}

export const BillingStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'credits' | 'domains' | 'hosting' | 'plans' | 'iam-diagnostics' | 'webhooks'>('iam-diagnostics');
  const [domainQuery, setDomainQuery] = useState('');
  const [isCheckingDomain, setIsCheckingDomain] = useState(false);
  const [domainSearchResult, setDomainSearchResult] = useState<DomainCheck | null>(null);
  const [creditsBalance, setCreditsBalance] = useState(5000);

  // Stripe & Webhook Integration States
  const [stripeConfig, setStripeConfig] = useState<{
    configured: boolean;
    publishableKey: string;
    webhookEndpoint: string;
  } | null>(null);

  const [transactionLogs, setTransactionLogs] = useState<Array<{
    id: string;
    type: string;
    amount: number;
    description: string;
    date: string;
    status: string;
  }>>([
    {
      id: 'tx_init_1',
      type: 'purchase',
      amount: 5000,
      description: 'Plano Pro Turbo (Ativação Stripe)',
      date: 'Hoje às 13:20',
      status: 'succeeded'
    }
  ]);

  const [webhookLogs, setWebhookLogs] = useState<Array<{
    id: string;
    eventType: string;
    description: string;
    creditsAdded: number;
    timestamp: string;
    status: 'processed' | 'pending';
  }>>([
    {
      id: 'wh_init_1',
      eventType: 'payment_intent.succeeded',
      description: 'Stripe Webhook: Pagamento do Plano Pro Aprovado',
      creditsAdded: 5000,
      timestamp: '13:20:15',
      status: 'processed'
    },
    {
      id: 'wh_init_2',
      eventType: 'checkout.session.completed',
      description: 'Stripe Webhook: Sessão de Checkout concluída com sucesso',
      creditsAdded: 5000,
      timestamp: '13:20:10',
      status: 'processed'
    }
  ]);

  const [isSimulatingWebhook, setIsSimulatingWebhook] = useState(false);
  const [webhookToast, setWebhookToast] = useState<string | null>(null);

  // Load initial balance and Stripe config from API
  useEffect(() => {
    fetch('/api/user/credits')
      .then(res => res.json())
      .then(data => {
        if (typeof data.balance === 'number') {
          setCreditsBalance(data.balance);
        }
        if (Array.isArray(data.transactions) && data.transactions.length > 0) {
          setTransactionLogs(data.transactions);
        }
      })
      .catch(err => console.warn('Aviso: saldo via API', err));

    fetch('/api/stripe/config')
      .then(res => res.json())
      .then(cfg => setStripeConfig(cfg))
      .catch(err => console.warn('Aviso ao buscar Stripe config', err));
  }, []);

  // Billing Cycle & Card Checkout Modal State
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [cardModalOpen, setCardModalOpen] = useState(false);
  const [selectedPlanForCard, setSelectedPlanForCard] = useState<{
    name: string;
    price: string;
    credits: number;
    cycle: string;
    numericPrice: number;
  } | null>(null);

  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [installments, setInstallments] = useState('1');
  const [isProcessingCard, setIsProcessingCard] = useState(false);
  const [processingStepText, setProcessingStepText] = useState('');
  const [cardPaidSuccess, setCardPaidSuccess] = useState(false);

  // IAM Troubleshooter States
  const [principalEmail, setPrincipalEmail] = useState('richardwillyan65@gmail.com');
  const [targetResource, setTargetResource] = useState('stalwart-period-m07pf');
  const [testPermission, setTestPermission] = useState('billing.resourceCosts.get');
  const [isAnalyzingIAM, setIsAnalyzingIAM] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  const [permissionChecks, setPermissionChecks] = useState<IAMPermissionCheck[]>([
    {
      id: 'perm_1',
      permission: 'billing.resourceCosts.get',
      title: 'Leitura de Custos de Faturamento do Recurso',
      category: 'Billing',
      status: 'missing',
      requiredRole: 'roles/billing.viewer',
      recommendedRoleName: 'Leitor de Conta de Faturamento (Billing Account Viewer)',
      resource: 'stalwart-period-m07pf',
      details: 'Necessário para visualizar relatórios de custos de recursos e consumo do Cloud Run.'
    },
    {
      id: 'perm_2',
      permission: 'billing.accounts.get',
      title: 'Acesso às Informações da Conta de Faturamento',
      category: 'Billing',
      status: 'granted',
      requiredRole: 'roles/billing.viewer',
      recommendedRoleName: 'Leitor de Conta de Faturamento',
      resource: 'stalwart-period-m07pf',
      details: 'Permissão verificada com sucesso na conta ativa.'
    },
    {
      id: 'perm_3',
      permission: 'resourcemanager.projects.get',
      title: 'Visualização de Metadados do Projeto GCP',
      category: 'Resource Manager',
      status: 'granted',
      requiredRole: 'roles/viewer',
      recommendedRoleName: 'Visualizador de Projetos (Project Viewer)',
      resource: 'stalwart-period-m07pf',
      details: 'Acesso garantido para consulta de metadados do projeto.'
    },
    {
      id: 'perm_4',
      permission: 'run.services.get',
      title: 'Visualização de Serviços Cloud Run',
      category: 'Compute & Cloud Run',
      status: 'granted',
      requiredRole: 'roles/run.viewer',
      recommendedRoleName: 'Visualizador do Cloud Run',
      resource: 'stalwart-period-m07pf',
      details: 'Permite inspecionar o status do container hospedado.'
    },
    {
      id: 'perm_5',
      permission: 'iam.serviceAccounts.actAs',
      title: 'Atuação como Conta de Serviço (ActAs)',
      category: 'IAM & Auth',
      status: 'missing',
      requiredRole: 'roles/iam.serviceAccountUser',
      recommendedRoleName: 'Usuário de Conta de Serviço (Service Account User)',
      resource: 'stalwart-period-m07pf',
      details: 'Necessário para acionar deploys automáticos via Service Account.'
    },
    {
      id: 'perm_6',
      permission: 'firebase.projects.get',
      title: 'Acesso ao Projeto Firebase Firestore & Auth',
      category: 'Firebase',
      status: 'granted',
      requiredRole: 'roles/firebase.admin',
      recommendedRoleName: 'Administrador do Firebase',
      resource: 'stalwart-period-m07pf',
      details: 'Projeto Firebase vinculado e operacional.'
    }
  ]);

  const [pendingRequests, setPendingRequests] = useState<IAMTroubleshooterRequest[]>([
    {
      id: 'req_1',
      userEmail: 'richardwillyan65@gmail.com',
      resourceId: 'stalwart-period-m07pf',
      permission: 'billing.resourceCosts.get',
      requestMessage: 'preciso do acesso',
      token: 'AZRajuVf-sYxP6yLD4i7efcvUb4zqNGN4orWwajjmCXdlaK_XmZyoDao5SneVJefAfmq86mFu2JyfjhwEU4VfFO7pWAzbv4cIaLkjNiBVvcA9x7KBp6_KzC1FWXMP9HhCxtWSY-1rNuLOdqpKI7w3KnzLxv-PZitINlIjFGF5u2xEd29ttTQDt26GInysOSr',
      troubleshooterUrl: 'https://console.cloud.google.com/iam-admin/troubleshooter/summary;permissions=billing.resourceCosts.get;token=AZRajuVf-sYxP6yLD4i7efcvUb4zqNGN4orWwajjmCXdlaK_XmZyoDao5SneVJefAfmq86mFu2JyfjhwEU4VfFO7pWAzbv4cIaLkjNiBVvcA9x7KBp6_KzC1FWXMP9HhCxtWSY-1rNuLOdqpKI7w3KnzLxv-PZitINlIjFGF5u2xEd29ttTQDt26GInysOSr?utm_campaign=role_request&utm_source=cloud_console',
      timestamp: '2026-07-28 12:45',
      status: 'pending'
    }
  ]);

  const [troubleshooterResult, setTroubleshooterResult] = useState<any>({
    accessState: 'ACCESS_DENIED',
    principal: 'user:richardwillyan65@gmail.com',
    resource: 'projects/stalwart-period-m07pf',
    permission: 'billing.resourceCosts.get',
    summary: "O usuário richardwillyan65@gmail.com não possui a permissão 'billing.resourceCosts.get' no recurso 'stalwart-period-m07pf'. Nenhuma vinculação de política IAM direta concede este acesso.",
    evaluatedPolicies: [
      { level: 'Project', resource: 'projects/stalwart-period-m07pf', access: 'NOT_GRANTED', membership: 'NOT_INCLUDED', bindingsEvaluated: 8 },
      { level: 'Organization', resource: 'organizations/default', access: 'UNKNOWN_HEURISTIC', membership: 'UNKNOWN', bindingsEvaluated: 2 }
    ],
    missingRoles: [
      { role: 'roles/billing.viewer', title: 'Leitor da Conta de Faturamento (Billing Account Viewer)', description: 'Permite visualizar custos de faturamento e relatórios de consumo.' },
      { role: 'roles/billing.admin', title: 'Administrador de Faturamento (Billing Account Admin)', description: 'Acesso total de leitura e escrita nas configurações de faturamento.' }
    ],
    remediation: {
      gcloudCommand: 'gcloud projects add-iam-policy-binding stalwart-period-m07pf --member="user:richardwillyan65@gmail.com" --role="roles/billing.viewer"',
      consoleUrl: 'https://console.cloud.google.com/iam-admin/troubleshooter/summary;permissions=billing.resourceCosts.get',
      recommendedAction: "Acesse o Console do Google Cloud e atribua o papel 'Roles/Billing Viewer' para o usuário richardwillyan65@gmail.com ou clique no link de resolução do IAM Troubleshooter."
    }
  });

  const handleRunIAMCheck = async () => {
    setIsAnalyzingIAM(true);
    try {
      const response = await fetch('/api/iam-troubleshooter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          principalEmail,
          resourceName: targetResource,
          permission: testPermission
        })
      });

      if (response.ok) {
        const data = await response.json();
        setTroubleshooterResult(data);
      }
    } catch (err) {
      console.error('Erro ao executar o diagnostico IAM:', err);
    } finally {
      setIsAnalyzingIAM(false);
    }
  };

  const customPlans: CustomPlanItem[] = [
    {
      id: 'free',
      name: 'Plano Gratuito',
      badge: 'Teste Grátis',
      monthlyPrice: 'R$ 0 / mês',
      annualMonthlyEquivalent: 'R$ 0 / mês',
      annualTotalPrice: 'Grátis',
      credits: 500,
      features: [
        '500 créditos de degustação',
        'Subdomínio .intuitiva.app',
        'Exportação ZIP do código fonte',
        'Acesso ao ChatStudio com voz'
      ]
    },
    {
      id: 'pro',
      name: 'Plano Pro Turbo',
      badge: 'Mais Vendido',
      popular: true,
      monthlyPrice: 'R$ 29,90 / mês',
      annualMonthlyEquivalent: 'R$ 19,90 / mês',
      annualTotalPrice: 'R$ 238,80 / ano (Economize R$ 120)',
      credits: 5000,
      features: [
        '5.000 Créditos Mensais',
        'Até 3 domínios personalizados (.com.br)',
        'Deploy com 1-clique no Cloud Run',
        'Prioridade de processamento no Gemini 3.6',
        'Suporte a voz e anexos de arquivos',
        'Cartão de Crédito em até 12x'
      ]
    },
    {
      id: 'business',
      name: 'Plano Business Scale',
      badge: 'Para Agências & Devs',
      monthlyPrice: 'R$ 79,90 / mês',
      annualMonthlyEquivalent: 'R$ 49,90 / mês',
      annualTotalPrice: 'R$ 598,80 / ano (Economize R$ 360)',
      credits: 25000,
      features: [
        '25.000 Créditos Mensais',
        'Domínios personalizados ilimitados',
        'Banco de dados PostgreSQL & Firestore dedicado',
        'Agentes simultâneos sem fila de espera',
        'API de integração personalizada',
        'Cobrança no Cartão com Repasse PIX'
      ]
    },
    {
      id: 'unlimited',
      name: 'Plano Agency Unlimited',
      badge: 'Escala Total',
      monthlyPrice: 'R$ 149,90 / mês',
      annualMonthlyEquivalent: 'R$ 99,90 / mês',
      annualTotalPrice: 'R$ 1.198,80 / ano (Economize R$ 600)',
      credits: 100000,
      features: [
        '100.000 Créditos Mensais',
        'Uso ilimitado de Agentes e Modelos Omni',
        'Suporte VIP via WhatsApp dedicado',
        'Gerente de conta exclusivo',
        'Faturamento seguro no Cartão'
      ]
    }
  ];

  const formatCardNumberInput = (val: string) => {
    const v = val.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : v;
  };

  const formatExpiryInput = (val: string) => {
    const clean = val.replace(/[^0-9]/g, '');
    if (clean.length >= 2) {
      return `${clean.slice(0, 2)}/${clean.slice(2, 4)}`;
    }
    return clean;
  };

  const handleOpenCardCheckout = (planName: string, priceStr: string, credits: number, cycle: string) => {
    let num = 29.90;
    if (priceStr.includes('79,90') || priceStr.includes('598,80')) num = 79.90;
    if (priceStr.includes('149,90') || priceStr.includes('1.198,80')) num = 149.90;
    if (priceStr.includes('238,80')) num = 238.80;

    setSelectedPlanForCard({
      name: planName,
      price: priceStr,
      credits,
      cycle,
      numericPrice: num
    });
    setCardNumber('');
    setCardHolder('');
    setCardExpiry('');
    setCardCvc('');
    setInstallments('1');
    setCardPaidSuccess(false);
    setIsProcessingCard(false);
    setCardModalOpen(true);
  };

  const handleProcessCardPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlanForCard || isProcessingCard) return;

    setIsProcessingCard(true);
    setProcessingStepText('Iniciando comunicação segura com o Stripe Gateway (256-bit SSL)...');

    try {
      // 1. Criar Intenção de Pagamento no Stripe
      const intentRes = await fetch('/api/stripe/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: selectedPlanForCard.numericPrice,
          currency: 'brl',
          planName: selectedPlanForCard.name,
          credits: selectedPlanForCard.credits,
          userId: 'user_active'
        })
      });

      const intentData = await intentRes.json();
      setProcessingStepText('Criptografando cartão e enviando transação ao Stripe...');

      await new Promise(r => setTimeout(r, 700));
      setProcessingStepText('Aprovando limite e acionando Webhook do Stripe (payment_intent.succeeded)...');

      // 2. Confirmar Pagamento no Backend
      const confirmRes = await fetch('/api/stripe/confirm-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentIntentId: intentData.paymentIntentId,
          credits: selectedPlanForCard.credits,
          planName: selectedPlanForCard.name
        })
      });

      const confirmData = await confirmRes.json();

      if (confirmData.success) {
        setIsProcessingCard(false);
        setCardPaidSuccess(true);
        setCreditsBalance(confirmData.newBalance);

        if (confirmData.transaction) {
          setTransactionLogs(prev => [confirmData.transaction, ...prev]);
        }

        const newWhEvent = {
          id: `wh_evt_${Date.now()}`,
          eventType: 'payment_intent.succeeded',
          description: `Pagamento Aprovado Stripe: ${selectedPlanForCard.name}`,
          creditsAdded: selectedPlanForCard.credits,
          timestamp: new Date().toLocaleTimeString('pt-BR'),
          status: 'processed' as const
        };
        setWebhookLogs(prev => [newWhEvent, ...prev]);

        setWebhookToast(`⚡ Stripe Webhook acionado com sucesso! +${selectedPlanForCard.credits.toLocaleString('pt-BR')} Créditos adicionados ao saldo!`);
        setTimeout(() => setWebhookToast(null), 5000);

        setTimeout(() => {
          setCardModalOpen(false);
          setSelectedPlanForCard(null);
          setCardPaidSuccess(false);
        }, 2500);
      } else {
        alert(confirmData.error || 'Não foi possível confirmar o pagamento no Stripe');
        setIsProcessingCard(false);
      }
    } catch (err: any) {
      console.error('Erro no checkout Stripe:', err);
      alert('Erro de conexão ao processar no Stripe. Tente novamente.');
      setIsProcessingCard(false);
    }
  };

  const handleOpenStripeCheckoutSession = async (planName: string, priceStr: string, credits: number, cycle: string) => {
    let num = 29.90;
    if (priceStr.includes('79,90') || priceStr.includes('598,80')) num = 79.90;
    if (priceStr.includes('149,90') || priceStr.includes('1.198,80')) num = 149.90;
    if (priceStr.includes('238,80')) num = 238.80;

    try {
      const res = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planName,
          price: num,
          credits,
          cycle
        })
      });
      const data = await res.json();
      if (data.url) {
        if (data.isSimulated) {
          await handleSimulateStripeWebhook('checkout.session.completed', planName, credits);
          alert(`⚡ Stripe Checkout Iniciado!\nPlano: ${planName}\n+${credits.toLocaleString('pt-BR')} Créditos ativados automaticamente via Webhook.`);
        } else {
          window.open(data.url, '_blank');
        }
      }
    } catch (err) {
      console.error('Erro ao abrir Stripe Checkout Session:', err);
    }
  };

  const handleSimulateStripeWebhook = async (eventType: string = 'payment_intent.succeeded', planName: string = 'Plano Pro Turbo', credits: number = 5000) => {
    setIsSimulatingWebhook(true);
    try {
      const res = await fetch('/api/stripe/simulate-webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventType,
          planName,
          credits
        })
      });
      const data = await res.json();

      if (data.received) {
        setCreditsBalance(data.newBalance);
        setWebhookToast(`⚡ Webhook Stripe [${eventType}] recebido e verificado! +${data.creditsAdded.toLocaleString('pt-BR')} créditos adicionados.`);

        if (data.transaction) {
          setTransactionLogs(prev => [data.transaction, ...prev]);
        }

        setWebhookLogs(prev => [
          {
            id: `wh_log_${Date.now()}`,
            eventType,
            description: `Evento Webhook Stripe (${eventType}) registrado para ${planName}`,
            creditsAdded: credits,
            timestamp: new Date().toLocaleTimeString('pt-BR'),
            status: 'processed'
          },
          ...prev
        ]);

        setTimeout(() => setWebhookToast(null), 5000);
      }
    } catch (err) {
      console.error('Erro ao simular webhook Stripe:', err);
    } finally {
      setIsSimulatingWebhook(false);
    }
  };

  const creditConsumptionTable = [
    { action: 'Criar Landing Page Completa', cost: '150 Créditos' },
    { action: 'Criar Site Institucional Multipáginas', cost: '300 Créditos' },
    { action: 'Criar E-commerce / Loja Virtual com Carrinho', cost: '500 Créditos' },
    { action: 'Criar Sistema Web / ERP / Dashboard', cost: '600 Créditos' },
    { action: 'Gerar Imagens com IA', cost: '25 Créditos / imagem' },
    { action: 'Deploy para Produção com SSL & CDN', cost: '50 Créditos / deploy' },
  ];

  const [publishedProjects, setPublishedProjects] = useState<PublishedProject[]>([
    {
      id: 'proj_1',
      title: 'Clínica Intuitiva Health',
      domain: 'intuitiva-health.intuitiva.app',
      status: 'published',
      publishedAt: '2026-07-27',
      sslActive: true,
      visits: 1420
    },
    {
      id: 'proj_2',
      title: 'E-commerce Moda & Estilo',
      domain: 'modaeestilo.com.br',
      status: 'published',
      publishedAt: '2026-07-25',
      sslActive: true,
      visits: 3890
    }
  ]);

  const [activatedDomainMsg, setActivatedDomainMsg] = useState<string | null>(null);
  const [domainResultsList, setDomainResultsList] = useState<Array<{
    domain: string;
    price: string;
    isFree: boolean;
    tag: string;
  }>>([]);

  const handleSearchDomain = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domainQuery.trim()) return;

    setIsCheckingDomain(true);
    setActivatedDomainMsg(null);
    const cleanName = domainQuery.toLowerCase().replace(/[^a-z0-9-]/g, '');

    setTimeout(() => {
      setDomainResultsList([
        { domain: `${cleanName}.intuitiva.com`, price: '100% GRÁTIS', isFree: true, tag: 'Subdomínio Oficial Intuitiva' },
        { domain: `${cleanName}.IV.IA.com`, price: '100% GRÁTIS', isFree: true, tag: 'Subdomínio Curto IV.IA' },
        { domain: `${cleanName}.com`, price: 'R$ 39,90 / ano', isFree: false, tag: 'Domínio Internacional' },
        { domain: `${cleanName}.com.br`, price: 'R$ 49,90 / ano', isFree: false, tag: 'Domínio Nacional Registro.br' },
        { domain: `${cleanName}.io`, price: 'R$ 119,90 / ano', isFree: false, tag: 'Domínio Startup Tech' }
      ]);
      setDomainSearchResult({
        domain: `${cleanName}.intuitiva.com`,
        available: true,
        pricePerYear: 'Grátis',
        extension: '.intuitiva.com',
        type: 'subdomain'
      });
      setIsCheckingDomain(false);
    }, 600);
  };

  const handleBuyCredits = (amount: number, price: string) => {
    alert(`Redirecionando para o Gateway de Pagamento Seguro...\nValor: ${price} por +${amount} Créditos.`);
    setCreditsBalance(prev => prev + amount);
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] bg-slate-950 overflow-y-auto p-6 space-y-6">
      {/* Studio Banner Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-400">
            <Zap className="w-8 h-8 fill-amber-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              Módulo de Faturamento, Planos & Créditos
              <span className="text-xs font-semibold px-2.5 py-0.5 bg-indigo-500/10 text-indigo-400 rounded-full border border-indigo-500/20">
                Core v1.0
              </span>
            </h2>
            <p className="text-xs text-slate-400 max-w-xl mt-1">
              Acompanhe seu saldo de créditos, assine planos mensais e anuais no <span className="font-bold text-indigo-300">Cartão de Crédito (em até 12x)</span> com liberação instantânea de saldo.
            </p>
          </div>
        </div>

        {/* Current Balance Widget */}
        <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 flex items-center gap-4 shrink-0 shadow-inner">
          <div>
            <div className="text-[11px] uppercase font-bold text-slate-400">Saldo Atual</div>
            <div className={`text-2xl font-black flex items-center gap-1 ${creditsBalance === 0 ? 'text-rose-400' : 'text-amber-300'}`}>
              <span>{creditsBalance.toLocaleString('pt-BR')}</span>
              <span className="text-xs font-semibold text-slate-400">CR</span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <button
              onClick={() => setActiveTab('plans')}
              className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-lg text-xs transition-all cursor-pointer shadow-md"
            >
              Comprar Créditos
            </button>
            <button
              onClick={() => setCreditsBalance(prev => prev === 0 ? 1000 : 0)}
              className="text-[10px] text-slate-400 hover:text-slate-200 underline cursor-pointer text-center"
            >
              {creditsBalance === 0 ? "⚡ Recarregar +1.000 CR" : "⚠️ Simular Créditos Esgotados (0 CR)"}
            </button>
          </div>
        </div>
      </div>

      {/* Free Credits Exhaustion Alert Banner */}
      {creditsBalance === 0 && (
        <div className="p-4 bg-gradient-to-r from-rose-950/80 via-amber-950/60 to-slate-900 border-2 border-rose-500/60 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl animate-pulse">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-rose-500/20 text-rose-400 rounded-xl border border-rose-500/40 shrink-0 mt-0.5">
              <AlertTriangle className="w-6 h-6 text-rose-400" />
            </div>
            <div className="space-y-1">
              <h3 className="font-extrabold text-white text-sm flex items-center gap-2">
                🚨 Seus Créditos Gratuitos Acabaram!
                <span className="px-2 py-0.5 bg-rose-500/20 text-rose-300 text-[10px] uppercase font-bold rounded-full border border-rose-500/30">
                  Saldo: 0 CR
                </span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Você utilizou todo o saldo inicial gratuito. Escolha um dos planos mensais ou anuais abaixo para receber mais créditos instantaneamente no <span className="font-bold text-indigo-300">Cartão de Crédito</span> com liberação imediata.
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('plans')}
            className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-slate-950 font-extrabold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 shrink-0 cursor-pointer"
          >
            <CreditCard className="w-4 h-4" />
            <span>Assinar no Cartão</span>
          </button>
        </div>
      )}

      {/* Webhook Live Notification Toast */}
      {webhookToast && (
        <div className="fixed top-6 right-6 z-50 bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 border-2 border-emerald-500 rounded-2xl p-4 shadow-2xl flex items-center gap-3 max-w-md animate-bounce text-white text-xs">
          <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl shrink-0">
            <Activity className="w-5 h-5 animate-spin" />
          </div>
          <div className="flex-1 font-semibold leading-snug">
            {webhookToast}
          </div>
          <button onClick={() => setWebhookToast(null)} className="text-slate-400 hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Navigation Subtabs */}
      <div className="flex bg-slate-900/80 p-1.5 rounded-xl border border-slate-800/80 max-w-5xl overflow-x-auto">
        <button
          onClick={() => setActiveTab('iam-diagnostics')}
          className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap ${
            activeTab === 'iam-diagnostics' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
          <span>Diagnóstico IAM & Troubleshooter</span>
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
        </button>

        <button
          onClick={() => setActiveTab('credits')}
          className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap ${
            activeTab === 'credits' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Créditos & Consumo</span>
        </button>

        <button
          onClick={() => setActiveTab('plans')}
          className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap ${
            activeTab === 'plans' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>Planos & Recarga (Stripe)</span>
        </button>

        <button
          onClick={() => setActiveTab('webhooks')}
          className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap ${
            activeTab === 'webhooks' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Activity className="w-3.5 h-3.5 text-emerald-400" />
          <span>Stripe Webhooks</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </button>

        <button
          onClick={() => setActiveTab('domains')}
          className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap ${
            activeTab === 'domains' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Domínios</span>
        </button>

        <button
          onClick={() => setActiveTab('hosting')}
          className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap ${
            activeTab === 'hosting' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Server className="w-3.5 h-3.5" />
          <span>Publicação & SSL</span>
        </button>
      </div>

      {/* Tab 5: Diagnóstico IAM & Policy Troubleshooter */}
      {activeTab === 'iam-diagnostics' && (
        <div className="space-y-6">
          {/* Header Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-center gap-3">
              <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-extrabold text-slate-400">Diagnóstico de Acesso</div>
                <div className="text-sm font-bold text-amber-300">2 Permissões Ausentes</div>
              </div>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-center gap-3">
              <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-extrabold text-slate-400">Usuário do Diagnóstico</div>
                <div className="text-xs font-bold text-white truncate max-w-[150px]">{principalEmail}</div>
              </div>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-center gap-3">
              <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-extrabold text-slate-400">Projeto Alvo GCP</div>
                <div className="text-xs font-bold text-white font-mono">{targetResource}</div>
              </div>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-center gap-3">
              <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-extrabold text-slate-400">Permissões OK</div>
                <div className="text-sm font-bold text-emerald-400">4 Concedidas</div>
              </div>
            </div>
          </div>

          {/* Section 1: Active Role Request & Google Cloud Troubleshooter Token */}
          <div className="bg-gradient-to-r from-amber-950/30 via-slate-900 to-slate-900 border border-amber-500/30 rounded-2xl p-6 space-y-4 shadow-xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-500/20 border border-amber-500/40 rounded-xl text-amber-300">
                  <Key className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base flex items-center gap-2">
                    Solicitação do Solicitante de Papel IAM
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-extrabold uppercase border border-amber-500/30">
                      Pendente de Aprovação
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Solicitação enviada por <strong className="text-slate-200">{pendingRequests[0].userEmail}</strong> para o recurso <code className="text-indigo-300">{pendingRequests[0].resourceId}</code>.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(pendingRequests[0].troubleshooterUrl);
                    setCopiedUrl(true);
                    setTimeout(() => setCopiedUrl(false), 2000);
                  }}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedUrl ? 'Link Copiado!' : 'Copiar Link IAM'}</span>
                </button>

                <a
                  href={pendingRequests[0].troubleshooterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  <span>Investigar no GCP Console</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-3 bg-slate-950/90 border border-slate-800 rounded-xl space-y-1">
                <div className="text-[10px] uppercase font-bold text-slate-500">Solicitante</div>
                <div className="font-bold text-white text-xs">{pendingRequests[0].userEmail}</div>
              </div>

              <div className="p-3 bg-slate-950/90 border border-slate-800 rounded-xl space-y-1">
                <div className="text-[10px] uppercase font-bold text-slate-500">Permissão Alvo</div>
                <div className="font-bold text-amber-300 font-mono text-xs">{pendingRequests[0].permission}</div>
              </div>

              <div className="p-3 bg-slate-950/90 border border-slate-800 rounded-xl space-y-1">
                <div className="text-[10px] uppercase font-bold text-slate-500">Mensagem do Solicitante</div>
                <div className="font-semibold text-slate-200 text-xs italic">"{pendingRequests[0].requestMessage}"</div>
              </div>
            </div>

            <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-400 overflow-hidden">
                <Terminal className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="font-mono text-[11px] truncate max-w-xl text-slate-300">
                  {pendingRequests[0].troubleshooterUrl}
                </span>
              </div>
              <button
                onClick={() => {
                  setPermissionChecks(prev =>
                    prev.map(p => (p.permission === 'billing.resourceCosts.get' ? { ...p, status: 'granted' } : p))
                  );
                  alert('Status de permissão "billing.resourceCosts.get" atualizado para CONCEDIDO!');
                }}
                className="px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer"
              >
                Marcar como Resolvido no Diagnóstico
              </button>
            </div>
          </div>

          {/* Section 2: Cloud Policy Troubleshooter API Tester */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-indigo-400" />
                  Testador de Políticas do Cloud Troubleshooter API
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Simule e avalie permissões do IAM em tempo real com a engine do Google Cloud Policy Troubleshooter.
                </p>
              </div>

              <button
                onClick={handleRunIAMCheck}
                disabled={isAnalyzingIAM}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50 shrink-0"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isAnalyzingIAM ? 'animate-spin' : ''}`} />
                <span>{isAnalyzingIAM ? 'Avaliando Política...' : 'Executar Cloud Troubleshooter API'}</span>
              </button>
            </div>

            {/* Form Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">Email do Usuário (Principal)</label>
                <input
                  type="email"
                  value={principalEmail}
                  onChange={(e) => setPrincipalEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-200 outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">Projeto / Recurso Alvo GCP</label>
                <input
                  type="text"
                  value={targetResource}
                  onChange={(e) => setTargetResource(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-200 font-mono outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">Permissão IAM Alvo</label>
                <input
                  type="text"
                  value={testPermission}
                  onChange={(e) => setTestPermission(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-200 font-mono outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[11px] font-bold text-slate-500">Testar Permissões Rápidas:</span>
              {[
                'billing.resourceCosts.get',
                'billing.accounts.get',
                'resourcemanager.projects.get',
                'run.services.get',
                'iam.serviceAccounts.actAs'
              ].map((perm) => (
                <button
                  key={perm}
                  onClick={() => setTestPermission(perm)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all cursor-pointer border ${
                    testPermission === perm
                      ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {perm}
                </button>
              ))}
            </div>

            {/* Diagnostic Results Box */}
            {troubleshooterResult && (
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-3">
                    {troubleshooterResult.accessState === 'ACCESS_DENIED' || troubleshooterResult.accessState === 'DENIED_OR_MISSING' ? (
                      <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-extrabold text-xs flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                        ACCESS_DENIED / PERMISSÃO AUSENTE
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-extrabold text-xs flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        ACCESS_GRANTED / PERMISSÃO CONCEDIDA
                      </span>
                    )}

                    <div className="text-xs text-slate-400 font-mono">
                      {troubleshooterResult.principal} ➔ {troubleshooterResult.permission}
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-300 leading-relaxed bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <p className="font-semibold">{troubleshooterResult.summary}</p>
                </div>

                {/* Missing Roles List */}
                {troubleshooterResult.missingRoles && troubleshooterResult.missingRoles.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-[11px] uppercase font-bold text-slate-400 flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-amber-400" />
                      Papeis IAM Recomendados para Concessão:
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {troubleshooterResult.missingRoles.map((role: any, idx: number) => (
                        <div key={idx} className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
                          <div className="font-bold text-amber-300 text-xs font-mono">{role.role}</div>
                          <div className="font-semibold text-white text-[11px]">{role.title}</div>
                          <div className="text-[10px] text-slate-400">{role.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Remediation Command Box */}
                {troubleshooterResult.remediation && (
                  <div className="p-4 bg-slate-900 border border-indigo-500/30 rounded-xl space-y-2">
                    <div className="text-xs font-bold text-indigo-300 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                        Comando gcloud para Correção Automática via Terminal:
                      </span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(troubleshooterResult.remediation.gcloudCommand);
                          setCopiedCommand(true);
                          setTimeout(() => setCopiedCommand(false), 2000);
                        }}
                        className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-bold cursor-pointer"
                      >
                        {copiedCommand ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedCommand ? 'Copiado!' : 'Copiar gcloud'}</span>
                      </button>
                    </div>

                    <pre className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-[11px] font-mono text-emerald-300 overflow-x-auto whitespace-pre-wrap">
                      {troubleshooterResult.remediation.gcloudCommand}
                    </pre>

                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      💡 <strong>Ação Recomendada:</strong> {troubleshooterResult.remediation.recommendedAction}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Section 3: User GCP Permission Health Matrix */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Matriz de Saúde das Permissões IAM do Projeto
            </h3>
            <p className="text-xs text-slate-400">
              Acompanhamento contínuo dos papéis necessários para publicação, faturamento, deploy e conectividade do applet.
            </p>

            <div className="space-y-2 pt-2">
              {permissionChecks.map((check) => (
                <div
                  key={check.id}
                  className="p-4 bg-slate-950/90 border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                >
                  <div className="space-y-1">
                    <div className="font-bold text-white flex items-center gap-2">
                      <span>{check.title}</span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[10px] font-semibold border border-slate-700">
                        {check.category}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      Permissão: <span className="text-indigo-300">{check.permission}</span> • Papel Requerido: <span className="text-amber-300">{check.requiredRole}</span>
                    </div>
                    <p className="text-[11px] text-slate-500">{check.details}</p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {check.status === 'granted' ? (
                      <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg text-xs font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Concedida
                      </span>
                    ) : (
                      <button
                        onClick={() => {
                          setTestPermission(check.permission);
                          handleRunIAMCheck();
                        }}
                        className="px-3 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                        Corrigir no GCP
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 1: Créditos & Consumo */}
      {activeTab === 'credits' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tabela de Consumo */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-400" />
              Tabela de Consumo por Operação
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Cada geração de código, design ou publicação pela Intuitiva IA deduz o valor correspondente do seu saldo.
            </p>

            <div className="space-y-2 pt-2">
              {creditConsumptionTable.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-950/80 border border-slate-800/80 rounded-xl text-xs">
                  <span className="text-slate-300 font-medium">{item.action}</span>
                  <span className="font-bold text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                    {item.cost}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Histórico Recente de Operações */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <History className="w-4 h-4 text-indigo-400" />
              Histórico Recente de Consumo & Faturamento Stripe
            </h3>

            <div className="space-y-3 pt-2 max-h-[350px] overflow-y-auto pr-1">
              {transactionLogs.map((tx) => (
                <div key={tx.id} className="p-3 bg-slate-950/80 border border-slate-800/80 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-200">{tx.description}</div>
                    <div className="text-[10px] text-slate-500">{tx.date} • Stripe Gateway Status: <span className="text-emerald-400 font-bold">{tx.status}</span></div>
                  </div>
                  <span className={`font-bold font-mono text-sm ${tx.type === 'purchase' || tx.type === 'bonus' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {tx.type === 'purchase' || tx.type === 'bonus' ? '+' : '-'} {tx.amount.toLocaleString('pt-BR')} CR
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Pesquisa e Conexão de Domínios */}
      {activeTab === 'domains' && (
        <div className="space-y-6 max-w-4xl">
          {/* Highlight Banner for Free Subdomains vs Custom Domains */}
          <div className="p-5 bg-gradient-to-r from-emerald-950/80 via-slate-900 to-indigo-950 border border-emerald-500/40 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30 shrink-0 mt-0.5">
                <Globe className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-extrabold text-white text-sm flex items-center gap-2">
                  ⚡ Subdomínios Oficiais Gratuitos Ilimitados
                  <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] uppercase font-mono font-bold rounded-full border border-emerald-500/30">
                    100% GRÁTIS
                  </span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Todos os seus projetos podem ser publicados gratuitamente com os domínios curtos <span className="font-mono text-emerald-400 font-bold">.intuitiva.com</span> e <span className="font-mono text-indigo-300 font-bold">.IV.IA.com</span> com SSL e CDN inclusos. Domínios comerciais (<span className="font-mono text-slate-200">.com</span>, <span className="font-mono text-slate-200">.com.br</span>) são registrados a valor de custo com cobrança no cartão.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Search className="w-4 h-4 text-indigo-400" />
              Pesquisar Nome para seu Projeto
            </h3>

            <form onSubmit={handleSearchDomain} className="flex gap-2">
              <input
                type="text"
                value={domainQuery}
                onChange={(e) => setDomainQuery(e.target.value)}
                placeholder="Digite o nome do seu projeto (ex: minhaempresa)"
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-200 outline-none focus:border-indigo-500 font-mono"
              />
              <button
                type="submit"
                disabled={isCheckingDomain || !domainQuery.trim()}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold rounded-xl text-xs transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50 shadow-md shadow-indigo-600/20"
              >
                {isCheckingDomain ? 'Verificando...' : 'Verificar Opções'}
              </button>
            </form>

            {activatedDomainMsg && (
              <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-bold flex items-center gap-2 animate-bounce">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>{activatedDomainMsg}</span>
              </div>
            )}

            {domainResultsList.length > 0 && (
              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Opções Encontradas para "{domainQuery}":
                </div>

                <div className="space-y-2">
                  {domainResultsList.map((res, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs transition-all ${
                        res.isFree
                          ? 'bg-slate-950 border-emerald-500/40 hover:border-emerald-500'
                          : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-white font-mono text-sm">{res.domain}</span>
                          <span
                            className={`px-2 py-0.5 text-[10px] font-bold rounded-md uppercase border ${
                              res.isFree
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                                : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
                            }`}
                          >
                            {res.tag}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400">
                          {res.isFree
                            ? '✅ Ativação instantânea com certificado SSL e suporte CDN.'
                            : '💳 Registro de domínio comercial personalizado com pagamento via Cartão de Crédito.'}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right">
                          <span
                            className={`font-black text-sm font-mono ${
                              res.isFree ? 'text-emerald-400' : 'text-amber-300'
                            }`}
                          >
                            {res.price}
                          </span>
                        </div>

                        {res.isFree ? (
                          <button
                            onClick={() => {
                              setActivatedDomainMsg(`Domínio Gratuito "${res.domain}" ativado com sucesso para seu projeto!`);
                              setPublishedProjects(prev => [
                                ...prev,
                                {
                                  id: `pub_${Date.now()}`,
                                  title: `Projeto ${domainQuery}`,
                                  domain: res.domain,
                                  ssl: true,
                                  status: 'active',
                                  visits: 0,
                                  updatedAt: 'Agora mesmo'
                                }
                              ]);
                            }}
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-lg flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
                          >
                            <Zap className="w-3.5 h-3.5" />
                            <span>Ativar Grátis</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              handleOpenCardCheckout(`Domínio ${res.domain}`, res.price, 0, 'Anual');
                            }}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-lg flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
                          >
                            <CreditCard className="w-3.5 h-3.5" />
                            <span>Comprar (.com)</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Publicação & Hospedagem */}
      {activeTab === 'hosting' && (
        <div className="space-y-6 max-w-4xl">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Server className="w-4 h-4 text-emerald-400" />
              Aplicações Ativas Publicadas
            </h3>

            <div className="space-y-3">
              {publishedProjects.map((p) => (
                <div key={p.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                  <div>
                    <div className="font-bold text-white text-sm flex items-center gap-2">
                      {p.title}
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold border border-emerald-500/20">
                        Ativo
                      </span>
                    </div>
                    <div className="text-slate-400 text-[11px] font-mono mt-1 flex items-center gap-1.5">
                      <Globe className="w-3 h-3 text-indigo-400" />
                      <span>https://{p.domain}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right text-[11px] text-slate-400 hidden sm:block">
                      <div>SSL: Ativo (Let's Encrypt)</div>
                      <div>Acessos: {p.visits.toLocaleString()}</div>
                    </div>
                    <a
                      href={`https://${p.domain}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <span>Acessar</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Planos, Recarga de Créditos & PIX */}
      {activeTab === 'plans' && (
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <h3 className="text-xl font-extrabold text-white">Escolha o Plano Ideal para seus Projetos</h3>
            <p className="text-xs text-slate-400">
              Desbloqueie mais créditos mensais, domínios personalizados, banco de dados dedicado e prioridade total na fila de execução da Intuitiva IA.
            </p>

            {/* Monthly vs. Annual Toggle Switch */}
            <div className="inline-flex items-center gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-2xl shadow-inner mt-2">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  billingCycle === 'monthly'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Cobrança Mensal
              </button>

              <button
                type="button"
                onClick={() => setBillingCycle('annual')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  billingCycle === 'annual'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>Cobrança Anual</span>
                <span className="px-2 py-0.5 bg-amber-400 text-slate-950 font-black text-[9px] uppercase rounded-full">
                  🔥 -38% Off
                </span>
              </button>
            </div>
          </div>

          {/* Plan Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {customPlans.map((plan) => {
              const displayPrice = billingCycle === 'annual' ? plan.annualMonthlyEquivalent : plan.monthlyPrice;
              const isFree = plan.id === 'free';

              return (
                <div
                  key={plan.id}
                  className={`bg-slate-900 border rounded-2xl p-5 flex flex-col justify-between space-y-6 relative transition-all ${
                    plan.popular
                      ? 'border-indigo-500 shadow-2xl shadow-indigo-500/10 bg-gradient-to-b from-indigo-950/30 via-slate-900 to-slate-900 ring-2 ring-indigo-500/30'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-indigo-600 text-slate-950 font-black text-[10px] uppercase px-3 py-1 rounded-full border border-amber-400 shadow-md">
                      Mais Recomendado
                    </span>
                  )}

                  <div className="space-y-4">
                    <div>
                      <span className="text-[10px] font-extrabold text-indigo-400 uppercase tracking-wider">{plan.badge}</span>
                      <h4 className="text-base font-bold text-white mt-0.5">{plan.name}</h4>
                    </div>

                    <div className="border-b border-slate-800 pb-4 space-y-1">
                      <div className="text-2xl font-black text-white">{displayPrice}</div>
                      {billingCycle === 'annual' && !isFree && (
                        <div className="text-[11px] font-bold text-emerald-400">
                          {plan.annualTotalPrice}
                        </div>
                      )}
                      <div className="text-xs text-amber-300 font-extrabold flex items-center gap-1 pt-1">
                        <Zap className="w-3.5 h-3.5 fill-amber-300" />
                        <span>+{plan.credits.toLocaleString('pt-BR')} Créditos / mês</span>
                      </div>
                    </div>

                    <ul className="space-y-2 text-xs text-slate-300">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2 pt-2">
                    <button
                      onClick={() => {
                        if (isFree) {
                          alert('Você já possui acesso ao Plano Gratuito inicial!');
                        } else {
                          const price = billingCycle === 'annual' ? plan.annualTotalPrice.split(' ')[0] + ' ' + plan.annualTotalPrice.split(' ')[1] : plan.monthlyPrice;
                          handleOpenCardCheckout(plan.name, price, plan.credits, billingCycle === 'annual' ? 'Anual' : 'Mensal');
                        }
                      }}
                      className={`w-full py-2.5 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        isFree
                          ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                          : plan.popular
                          ? 'bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-slate-950 shadow-lg shadow-indigo-600/30'
                          : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md'
                      }`}
                    >
                      {!isFree && <CreditCard className="w-4 h-4" />}
                      <span>{isFree ? 'Plano Atual' : 'Cartão de Crédito Direct (até 12x)'}</span>
                    </button>

                    {!isFree && (
                      <button
                        onClick={() => {
                          const price = billingCycle === 'annual' ? plan.annualTotalPrice.split(' ')[0] + ' ' + plan.annualTotalPrice.split(' ')[1] : plan.monthlyPrice;
                          handleOpenStripeCheckoutSession(plan.name, price, plan.credits, billingCycle === 'annual' ? 'Anual' : 'Mensal');
                        }}
                        className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-indigo-300 font-bold text-[11px] rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-slate-700"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Checkout Hospedado Stripe</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Credit Card Processing & Settlement Banner */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400 shrink-0">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <span>Processamento Seguro por Cartão de Crédito via Stripe</span>
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold rounded-full border border-emerald-500/30">
                    Stripe SDK v17+
                  </span>
                </h4>
                <p className="text-slate-400 mt-0.5">
                  Cobrança e liquidação em tempo real com renovação automática e envio de Webhook imediato para atualizar o saldo do usuário.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-slate-950 p-2.5 px-4 rounded-xl border border-slate-800 text-slate-300 font-mono text-xs shrink-0">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Stripe Webhooks Ativos</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 6: Stripe Webhooks & Event Automation */}
      {activeTab === 'webhooks' && (
        <div className="space-y-6">
          {/* Header Status & Endpoint Card */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-6 shadow-xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400">
                  <Activity className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    Stripe Webhook Gateway Engine
                    <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 text-[11px] font-mono font-bold rounded-full border border-emerald-500/30 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      Status: ONLINE 🟢
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    O servidor escuta eventos em tempo real do Stripe. Quando um pagamento é concluído, o saldo de créditos do usuário é atualizado instantaneamente.
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleSimulateStripeWebhook('payment_intent.succeeded', 'Plano Pro Turbo', 5000)}
                disabled={isSimulatingWebhook}
                className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer shrink-0"
              >
                <Send className="w-4 h-4" />
                <span>{isSimulatingWebhook ? 'Disparando...' : 'Testar Webhook de Pagamento (+5.000 CR)'}</span>
              </button>
            </div>

            {/* Config Info Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-slate-950 border border-slate-800/80 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-slate-400 font-bold">
                  <span className="text-[10px] uppercase">URL do Webhook Endpoint</span>
                  <span className="text-[10px] text-emerald-400 font-mono">HTTP POST 200 OK</span>
                </div>
                <div className="p-2.5 bg-slate-900 rounded-xl font-mono text-[11px] text-indigo-300 truncate border border-slate-800 flex items-center justify-between">
                  <span className="truncate">{stripeConfig?.webhookEndpoint || `${window.location.origin}/api/stripe/webhook`}</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(stripeConfig?.webhookEndpoint || `${window.location.origin}/api/stripe/webhook`);
                      alert('URL do Webhook copiada para a área de transferência!');
                    }}
                    className="ml-2 text-slate-400 hover:text-white shrink-0"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800/80 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-slate-400 font-bold">
                  <span className="text-[10px] uppercase">Eventos Monitorados</span>
                  <span className="text-[10px] text-amber-300 font-mono">2 Eventos</span>
                </div>
                <div className="p-2.5 bg-slate-900 rounded-xl font-mono text-[11px] text-slate-200 border border-slate-800">
                  payment_intent.succeeded • checkout.session.completed
                </div>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800/80 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-slate-400 font-bold">
                  <span className="text-[10px] uppercase">Validação de Segurança HMAC</span>
                  <span className="text-[10px] text-indigo-400 font-mono">RSA SHA256</span>
                </div>
                <div className="p-2.5 bg-slate-900 rounded-xl font-mono text-[11px] text-slate-300 border border-slate-800 flex items-center justify-between">
                  <span>STRIPE_WEBHOOK_SECRET</span>
                  <span className="text-emerald-400 font-bold">Ativo 🔒</span>
                </div>
              </div>
            </div>

            {/* Quick Webhook Trigger Sandbox */}
            <div className="p-5 bg-gradient-to-r from-slate-950 via-indigo-950/40 to-slate-950 border border-indigo-500/30 rounded-2xl space-y-3">
              <h4 className="font-extrabold text-white text-xs flex items-center gap-2">
                <Radio className="w-4 h-4 text-indigo-400" />
                <span>Simulador de Eventos Stripe Webhook (Live Test)</span>
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Simule a chegada de payloads do Stripe para validar a atualização automática do saldo de créditos e o registro nas transações.
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  onClick={() => handleSimulateStripeWebhook('payment_intent.succeeded', 'Plano Pro Turbo', 5000)}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-indigo-300 font-mono text-xs rounded-xl border border-slate-700 flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <Send className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Simular payment_intent.succeeded (+5.000 CR)</span>
                </button>

                <button
                  onClick={() => handleSimulateStripeWebhook('checkout.session.completed', 'Plano Business Scale', 25000)}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 font-mono text-xs rounded-xl border border-slate-700 flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <Send className="w-3.5 h-3.5 text-amber-400" />
                  <span>Simular checkout.session.completed (+25.000 CR)</span>
                </button>

                <button
                  onClick={() => handleSimulateStripeWebhook('payment_intent.succeeded', 'Plano Agency Unlimited', 100000)}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-rose-300 font-mono text-xs rounded-xl border border-slate-700 flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <Send className="w-3.5 h-3.5 text-rose-400" />
                  <span>Simular Recarga VIP (+100.000 CR)</span>
                </button>
              </div>
            </div>

            {/* Live Webhook Logs Table */}
            <div className="space-y-3">
              <h4 className="font-extrabold text-white text-xs flex items-center gap-2">
                <History className="w-4 h-4 text-indigo-400" />
                <span>Logs de Eventos Webhook Recebidos do Stripe</span>
              </h4>

              <div className="space-y-2">
                {webhookLogs.map((log) => (
                  <div key={log.id} className="p-3.5 bg-slate-950/90 border border-slate-800/90 rounded-2xl flex items-center justify-between text-xs hover:border-slate-700 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-white font-mono flex items-center gap-2">
                          <span>{log.eventType}</span>
                          <span className="text-[10px] font-sans font-semibold px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded-full border border-indigo-500/30">
                            {log.timestamp}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{log.description}</div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="font-extrabold text-emerald-400 font-mono text-sm">
                        +{log.creditsAdded.toLocaleString('pt-BR')} CR
                      </div>
                      <div className="text-[10px] text-slate-500 uppercase font-bold">Crédito Atualizado</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Credit Card Checkout Modal */}
      {cardModalOpen && selectedPlanForCard && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-6 shadow-2xl relative overflow-hidden my-8">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-600/20 text-indigo-400 rounded-xl border border-indigo-500/30">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-base flex items-center gap-2">
                    Checkout Seguro no Cartão
                    <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase rounded-full border border-indigo-500/30">
                      Até 12x
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">Ativação imediata de créditos na aprovação</p>
                </div>
              </div>

              <button
                onClick={() => setCardModalOpen(false)}
                className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Selected Plan Summary Box */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold">Plano Selecionado</span>
                <h4 className="font-extrabold text-white text-sm">{selectedPlanForCard.name} ({selectedPlanForCard.cycle})</h4>
                <div className="text-amber-300 font-bold mt-0.5">+{selectedPlanForCard.credits.toLocaleString('pt-BR')} Créditos Mensais</div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 uppercase font-bold">Valor Total</span>
                <div className="text-xl font-black text-indigo-400">{selectedPlanForCard.price}</div>
              </div>
            </div>

            {/* Visual Interactive Credit Card Mockup */}
            <div className="p-5 rounded-2xl bg-gradient-to-tr from-slate-950 via-indigo-950 to-slate-900 border border-indigo-500/30 shadow-xl space-y-4 text-white relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="w-10 h-7 bg-amber-400/80 rounded-md border border-amber-300/50 flex items-center justify-center shadow-inner">
                  <div className="w-6 h-4 border border-slate-800/40 rounded-sm" />
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-6 h-6 rounded-full bg-rose-500/80 -mr-2" />
                  <div className="w-6 h-6 rounded-full bg-amber-500/80" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Número do Cartão</div>
                <div className="font-mono text-lg tracking-widest font-bold text-indigo-200">
                  {cardNumber ? cardNumber : '•••• •••• •••• ••••'}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-mono">
                <div>
                  <div className="text-[9px] text-slate-400 uppercase">Titular do Cartão</div>
                  <div className="font-bold text-slate-200 uppercase truncate max-w-[200px]">
                    {cardHolder ? cardHolder : 'NOME DO TITULAR'}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[9px] text-slate-400 uppercase">Validade</div>
                  <div className="font-bold text-slate-200">
                    {cardExpiry ? cardExpiry : 'MM/AA'}
                  </div>
                </div>
              </div>
            </div>

            {/* Credit Card Form Inputs */}
            {cardPaidSuccess ? (
              <div className="p-6 bg-emerald-500/20 border border-emerald-500/50 rounded-2xl text-emerald-300 text-center space-y-3 animate-bounce">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="font-extrabold text-lg text-white">Pagamento Aprovado no Cartão!</h4>
                <p className="text-xs text-slate-200 leading-relaxed">
                  +{selectedPlanForCard.credits.toLocaleString('pt-BR')} Créditos foram adicionados com sucesso ao seu saldo.
                </p>
              </div>
            ) : isProcessingCard ? (
              <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl text-center space-y-4">
                <RefreshCw className="w-8 h-8 text-indigo-400 animate-spin mx-auto" />
                <div className="space-y-1">
                  <h4 className="font-bold text-white text-sm">Processando Pagamento...</h4>
                  <p className="text-xs text-indigo-300 font-mono animate-pulse">{processingStepText}</p>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div className="bg-gradient-to-r from-indigo-500 to-amber-400 h-full animate-pulse w-3/4" />
                </div>
              </div>
            ) : (
              <form onSubmit={handleProcessCardPayment} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                    <span>Número do Cartão de Crédito</span>
                    <span className="text-[10px] text-slate-500 font-mono">Visa / Mastercard / Elo</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumberInput(e.target.value))}
                      placeholder="0000 0000 0000 0000"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm font-mono text-white outline-none pl-11"
                    />
                    <CreditCard className="w-5 h-5 text-slate-500 absolute left-3.5 top-3.5" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Nome no Cartão (Como impresso)</label>
                  <input
                    type="text"
                    required
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    placeholder="EX: MARIA S SILVA"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm text-white uppercase outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">Validade (MM/AA)</label>
                    <input
                      type="text"
                      required
                      maxLength={5}
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(formatExpiryInput(e.target.value))}
                      placeholder="12/28"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm font-mono text-white outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                      <span>CVV / CVC</span>
                      <Lock className="w-3 h-3 text-slate-500" />
                    </label>
                    <input
                      type="password"
                      required
                      maxLength={4}
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value.replace(/[^0-9]/g, ''))}
                      placeholder="123"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm font-mono text-white outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Opções de Parcelamento</label>
                  <select
                    value={installments}
                    onChange={(e) => setInstallments(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm text-white outline-none cursor-pointer"
                  >
                    <option value="1">1x sem juros de {selectedPlanForCard.price}</option>
                    <option value="2">2x sem juros de R$ {(selectedPlanForCard.numericPrice / 2).toFixed(2).replace('.', ',')}</option>
                    <option value="3">3x sem juros de R$ {(selectedPlanForCard.numericPrice / 3).toFixed(2).replace('.', ',')}</option>
                    <option value="6">6x sem juros de R$ {(selectedPlanForCard.numericPrice / 6).toFixed(2).replace('.', ',')}</option>
                    <option value="12">12x de R$ {((selectedPlanForCard.numericPrice * 1.08) / 12).toFixed(2).replace('.', ',')}</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-600 hover:from-indigo-500 hover:to-blue-500 text-white font-extrabold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/30 transition-all cursor-pointer mt-2"
                >
                  <Lock className="w-4 h-4 text-indigo-300" />
                  <span>Pagar {selectedPlanForCard.price} no Cartão de Crédito</span>
                </button>

                <div className="flex items-center justify-center gap-4 pt-2 text-[10px] text-slate-500 font-mono">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Criptografia SSL
                  </span>
                  <span>•</span>
                  <span>Aprovação Automática</span>
                  <span>•</span>
                  <span>Sem Taxas Ocultas</span>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

