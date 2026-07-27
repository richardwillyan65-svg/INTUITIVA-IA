import React, { useState } from 'react';
import {
  Zap,
  Globe,
  CreditCard,
  Server,
  CheckCircle2,
  ShieldCheck,
  Search,
  ArrowRight,
  TrendingUp,
  History,
  Lock,
  Sparkles,
  ExternalLink,
  DollarSign,
  Layers,
  AlertCircle
} from 'lucide-react';
import { CreditPlan, DomainCheck, PublishedProject } from '../types';

export const BillingStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'credits' | 'domains' | 'hosting' | 'plans'>('credits');
  const [domainQuery, setDomainQuery] = useState('');
  const [isCheckingDomain, setIsCheckingDomain] = useState(false);
  const [domainSearchResult, setDomainSearchResult] = useState<DomainCheck | null>(null);
  const [creditsBalance, setCreditsBalance] = useState(2500);

  const creditPlans: CreditPlan[] = [
    {
      id: 'free',
      name: 'Plano Gratuito',
      price: 'R$ 0 / mês',
      credits: 500,
      badge: 'Iniciante',
      features: [
        '500 créditos mensais renováveis',
        'Subdomínio gratuito .intuitiva.app',
        'Suporte a IA Lovable / Replit Mode',
        'Exportação básica de código ZIP',
        'Hospedagem compartilhada'
      ]
    },
    {
      id: 'pro',
      name: 'Plano Pro',
      price: 'R$ 97 / mês',
      credits: 5000,
      badge: 'Mais Popular',
      popular: true,
      features: [
        '5.000 créditos mensais acumuláveis',
        'Até 3 domínios personalizados (.com.br / .com)',
        'Deploy com 1-clique (Vercel / Cloud Run)',
        'SSL Grátis e CDN Global Cloudflare',
        'Prioridade de processamento na IA',
        'Suporte técnico prioritário'
      ]
    },
    {
      id: 'business',
      name: 'Plano Business',
      price: 'R$ 297 / mês',
      credits: 20000,
      badge: 'Para Agências & Devs',
      features: [
        '20.000 créditos mensais',
        'Domínios personalizados ilimitados',
        'Banco de dados PostgreSQL / Supabase dedicado',
        'Agentes de IA multidisciplinares simultâneos',
        'Acesso à API de automação da Intuitiva IA',
        'Gerente de conta exclusivo'
      ]
    }
  ];

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

  const handleSearchDomain = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domainQuery.trim()) return;

    setIsCheckingDomain(true);
    setTimeout(() => {
      const isFree = domainQuery.toLowerCase().includes('intuitiva');
      setDomainSearchResult({
        domain: domainQuery.toLowerCase().replace(/[^a-z0-9-]/g, '') + (isFree ? '.intuitiva.app' : '.com.br'),
        available: true,
        pricePerYear: isFree ? 'Grátis' : 'R$ 49,90 / ano',
        extension: isFree ? '.intuitiva.app' : '.com.br',
        type: isFree ? 'subdomain' : 'custom'
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
              Módulo de Publicação, Domínios & Créditos
              <span className="text-xs font-semibold px-2.5 py-0.5 bg-indigo-500/10 text-indigo-400 rounded-full border border-indigo-500/20">
                Core v1.0
              </span>
            </h2>
            <p className="text-xs text-slate-400 max-w-xl mt-1">
              Gerencie a publicação dos seus sites em tempo real, registre domínios personalizados, contrate hospedagem escalável e acompanhe seu saldo de créditos.
            </p>
          </div>
        </div>

        {/* Current Balance Widget */}
        <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 flex items-center gap-4 shrink-0 shadow-inner">
          <div>
            <div className="text-[11px] uppercase font-bold text-slate-400">Saldo Atual</div>
            <div className="text-2xl font-black text-amber-300 flex items-center gap-1">
              <span>{creditsBalance.toLocaleString('pt-BR')}</span>
              <span className="text-xs font-semibold text-slate-400">CR</span>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('plans')}
            className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs transition-colors cursor-pointer"
          >
            Adicionar Créditos
          </button>
        </div>
      </div>

      {/* Navigation Subtabs */}
      <div className="flex bg-slate-900/80 p-1.5 rounded-xl border border-slate-800/80 max-w-2xl">
        <button
          onClick={() => setActiveTab('credits')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'credits' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Créditos & Consumo</span>
        </button>

        <button
          onClick={() => setActiveTab('domains')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'domains' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Domínios</span>
        </button>

        <button
          onClick={() => setActiveTab('hosting')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'hosting' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Server className="w-3.5 h-3.5" />
          <span>Publicação & SSL</span>
        </button>

        <button
          onClick={() => setActiveTab('plans')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeTab === 'plans' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>Planos & Recarga</span>
        </button>
      </div>

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
              Histórico Recente de Consumo
            </h3>

            <div className="space-y-3 pt-2">
              <div className="p-3 bg-slate-950/80 border border-slate-800/80 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-200">Geração do Site "Clínica Intuitiva Health"</div>
                  <div className="text-[10px] text-slate-500">Hoje às 14:20 • Modo Lovable AI</div>
                </div>
                <span className="font-bold text-rose-400">- 300 CR</span>
              </div>

              <div className="p-3 bg-slate-950/80 border border-slate-800/80 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-200">Deploy com SSL e CDN na Vercel</div>
                  <div className="text-[10px] text-slate-500">Hoje às 14:25 • Servidor Global</div>
                </div>
                <span className="font-bold text-rose-400">- 50 CR</span>
              </div>

              <div className="p-3 bg-slate-950/80 border border-slate-800/80 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-200">Bônus de Boas-Vindas Intuitiva IA</div>
                  <div className="text-[10px] text-slate-500">Crédito Inicial Automático</div>
                </div>
                <span className="font-bold text-emerald-400">+ 2.850 CR</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Pesquisa e Conexão de Domínios */}
      {activeTab === 'domains' && (
        <div className="space-y-6 max-w-4xl">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Globe className="w-4 h-4 text-indigo-400" />
              Pesquisar Disponibilidade de Domínio
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Você pode usar nosso subdomínio gratuito ilimitado (ex: <code className="text-indigo-300">seusite.intuitiva.app</code>) ou conectar/registrar seu próprio domínio personalizado.
            </p>

            <form onSubmit={handleSearchDomain} className="flex gap-2">
              <input
                type="text"
                value={domainQuery}
                onChange={(e) => setDomainQuery(e.target.value)}
                placeholder="Digite o nome desejado (ex: minhaempresa)"
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                disabled={isCheckingDomain || !domainQuery.trim()}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isCheckingDomain ? 'Verificando...' : 'Verificar Domínio'}
              </button>
            </form>

            {domainSearchResult && (
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between text-xs mt-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <div>
                    <div className="font-bold text-white text-sm">{domainSearchResult.domain}</div>
                    <div className="text-[11px] text-slate-400">
                      Status: Disponível para registro imediato
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-emerald-400 text-sm">{domainSearchResult.pricePerYear}</span>
                  <button
                    onClick={() => alert(`Iniciando registro do domínio ${domainSearchResult.domain}...`)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    Conectar Agora
                  </button>
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

      {/* Tab 4: Planos & Recarga de Créditos */}
      {activeTab === 'plans' && (
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="text-lg font-bold text-white">Escolha o Plano Ideal para seu Projeto</h3>
            <p className="text-xs text-slate-400">
              Desbloqueie mais créditos mensais, domínios personalizados e prioridade na fila de execução de agentes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {creditPlans.map((plan) => (
              <div
                key={plan.id}
                className={`bg-slate-900 border rounded-2xl p-6 flex flex-col justify-between space-y-6 relative transition-all ${
                  plan.popular
                    ? 'border-indigo-500 shadow-xl shadow-indigo-500/10 bg-gradient-to-b from-indigo-950/20 to-slate-900'
                    : 'border-slate-800'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] uppercase font-extrabold px-3 py-1 rounded-full border border-indigo-400 shadow-md">
                    Mais Recomendado
                  </span>
                )}

                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">{plan.badge}</span>
                    <h4 className="text-lg font-bold text-white">{plan.name}</h4>
                  </div>

                  <div className="border-b border-slate-800/80 pb-4">
                    <span className="text-2xl font-black text-white">{plan.price}</span>
                    <div className="text-xs text-amber-300 font-bold mt-1">+{plan.credits.toLocaleString()} Créditos / mês</div>
                  </div>

                  <ul className="space-y-2 text-xs text-slate-300">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleBuyCredits(plan.credits, plan.price)}
                  className={`w-full py-3 rounded-xl font-bold text-xs transition-colors cursor-pointer ${
                    plan.popular
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  Assinar Plano
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
