import React, { useState } from 'react';
import { Megaphone, Sparkles, RefreshCw, Copy, Check, Target, TrendingUp, Search, FileText } from 'lucide-react';

export const MarketingStudio: React.FC = () => {
  const [productName, setProductName] = useState('Intuitiva IA Platform');
  const [targetAudience, setTargetAudience] = useState('Devs, Agências de Software, Empreendedores Digitais e Startups');
  const [campaignGoal, setCampaignGoal] = useState('Conversão direta, vendas de licenças SaaS e geração de leads altamente qualificados');
  const [format, setFormat] = useState('Landing Page Copy + Anúncios Meta/Google Ads + Sequência de E-mails AIDA');

  const [marketingResult, setMarketingResult] = useState<string>(`
**Estratégia de Marketing & Copywriting - Intuitiva IA**

### 1. Headline Principal (Promessa Irresistível)
> "Transforme ideias em software completo em minutos com uma equipe multidisciplinar de Inteligência Artificial Full Stack."

### 2. Anúncio Meta Ads (Facebook & Instagram)
**Texto Principal:**
Cansado de gerenciar múltiplos freelancers ou perder tempo configurando servidores, APIs e telas? 🚀
A **Intuitiva IA** atua como seu desenvolvedor Front-end, Back-end, especialista em Cloud, Designer e Copywriter em uma única plataforma.

✅ Gerador de Código Limpo (React, Node.js, Express)
✅ Automações e Agentes Inteligentes
✅ Arquitetura de Sistemas & Segurança de Dados

👉 Clique em Saiba Mais e experimente gratuitamente!

### 3. Estrutura AIDA para Landing Page
- **Atenção**: Headline de alto impacto e vídeo demonstrativo da IA gerando um aplicativo do zero.
- **Interesse**: Lista de especialidades (20+ áreas técnicas reunidas em um único lugar).
- **Desejo**: Casos reais de empresas acelerando o desenvolvimento de 3 semanas para 2 horas.
- **Ação**: Botão CTA destacado: "Começar Agora Sem Custos".
`);

  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerateMarketing = async () => {
    if (!productName.trim() || isGenerating) return;

    setIsGenerating(true);
    try {
      const res = await fetch('/api/marketing-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product: productName,
          targetAudience,
          goal: campaignGoal,
          format,
        }),
      });

      const data = await res.json();
      if (res.ok && data.marketingResult) {
        setMarketingResult(data.marketingResult);
      } else {
        throw new Error(data.error || 'Falha ao gerar cópia');
      }
    } catch (err: any) {
      console.error('Erro no Marketing Studio:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(marketingResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] bg-slate-950 overflow-hidden">
      {/* Studio Header */}
      <div className="bg-slate-900 border-b border-slate-800 p-4 px-6 flex flex-wrap items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-600/10 border border-indigo-500/20 rounded-xl text-indigo-400">
            <Megaphone className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              Intuitiva IA - Marketing & Copywriter Studio
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-semibold">
                High Conversion Copy
              </span>
            </h2>
            <p className="text-xs text-slate-400">Geração de textos persuasivos, anúncios, estratégias de tráfego, SEO e funis de venda.</p>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="px-3.5 py-1.5 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copiado!' : 'Copiar Copy'}</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Form Panel */}
        <div className="w-full lg:w-96 bg-slate-900/60 border-r border-slate-800/80 p-5 overflow-y-auto space-y-4 shrink-0">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Produto ou Serviço</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full bg-slate-950 text-slate-100 border border-slate-800 rounded-xl p-2.5 text-xs outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Público Alvo Almejado</label>
            <textarea
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              rows={3}
              className="w-full bg-slate-950 text-slate-100 border border-slate-800 rounded-xl p-2.5 text-xs outline-none focus:border-indigo-500 resize-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Objetivo da Campanha</label>
            <input
              type="text"
              value={campaignGoal}
              onChange={(e) => setCampaignGoal(e.target.value)}
              className="w-full bg-slate-950 text-slate-100 border border-slate-800 rounded-xl p-2.5 text-xs outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Formatos Desejados</label>
            <input
              type="text"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full bg-slate-950 text-slate-100 border border-slate-800 rounded-xl p-2.5 text-xs outline-none focus:border-indigo-500"
            />
          </div>

          <button
            onClick={handleGenerateMarketing}
            disabled={!productName.trim() || isGenerating}
            className={`w-full py-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
              productName.trim() && !isGenerating
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Gerando Estratégia de Vendas...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Gerar Peças de Marketing</span>
              </>
            )}
          </button>
        </div>

        {/* Output Panel */}
        <div className="flex-1 bg-slate-950 p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md text-slate-200 text-sm whitespace-pre-wrap leading-relaxed">
            {marketingResult}
          </div>
        </div>
      </div>
    </div>
  );
};
