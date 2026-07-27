import React, { useState } from 'react';
import {
  Bot,
  Zap,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  Workflow,
  Globe,
  Terminal,
  Layers,
  ArrowRight
} from 'lucide-react';

export const AgentStudio: React.FC = () => {
  const [agentName, setAgentName] = useState('Agente Qualificador de Leads');
  const [agentGoal, setAgentGoal] = useState('Analisar solicitações de clientes, extrair dados fundamentais (orçamento, prazo, segmento) e classificar prioridade no CRM.');
  const [triggerType, setTriggerType] = useState('Webhook de Formulário / API');
  const [targetPlatform, setTargetPlatform] = useState<'Google AI Studio' | 'Replit' | 'Lovable' | 'Vercel' | 'WordPress'>('Google AI Studio');
  
  const [agentResult, setAgentResult] = useState<string>(`
**Arquitetura do Agente Gerada pela Intuitiva IA**

### 1. System Instruction do Agente
\`\`\`text
Você é o Agente Qualificador da Intuitiva IA. Seu objetivo é analisar mensagens de potenciais clientes, extrair:
- Nome do contato
- Orçamento estimado
- Tipo de projeto (Web, Mobile, IA, Automação)
- Urgência (Alta, Média, Baixa)

Retorne SEMPRE em formato JSON estruturado:
{
  "qualified": boolean,
  "score": number, // 0 a 100
  "summary": string,
  "recommendedAction": string
}
\`\`\`

### 2. Fluxo de Automação
1. **Trigger**: Evento HTTP POST no webhook \`/api/webhook/lead\`
2. **Processamento**: Intuitiva IA chama a API Gemini com o prompt do cliente.
3. **Decisão**: Se \`score > 70\`, envia notificação imediata para equipe de vendas.
4. **Armazenamento**: Salva o lead qualificado no banco PostgreSQL / Supabase.
`);

  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerateAgent = async () => {
    if (!agentGoal.trim() || isGenerating) return;

    setIsGenerating(true);
    try {
      const res = await fetch('/api/generate-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: agentName,
          goal: agentGoal,
          trigger: triggerType,
          targetPlatform,
        }),
      });

      const data = await res.json();
      if (res.ok && data.agentResult) {
        setAgentResult(data.agentResult);
      } else {
        throw new Error(data.error || 'Falha ao criar agente');
      }
    } catch (err: any) {
      console.error('Erro no Agent Studio:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyResult = () => {
    navigator.clipboard.writeText(agentResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] bg-slate-950 overflow-hidden">
      {/* Studio Banner */}
      <div className="bg-slate-900 border-b border-slate-800 p-4 px-6 flex flex-wrap items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-600/10 border border-indigo-500/20 rounded-xl text-indigo-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              Intuitiva IA - Agentes & Automação Studio
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-semibold">
                Autonomous Workflows
              </span>
            </h2>
            <p className="text-xs text-slate-400">Criação de agentes autônomos, chatbots, extratores de dados e conectores de APIs.</p>
          </div>
        </div>

        <button
          onClick={handleCopyResult}
          className="px-3.5 py-1.5 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copiado!' : 'Copiar Agente'}</span>
        </button>
      </div>

      {/* Main Split Content */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Config Form Panel */}
        <div className="w-full lg:w-96 bg-slate-900/60 border-r border-slate-800/80 p-5 overflow-y-auto space-y-4 shrink-0">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Nome do Agente</label>
            <input
              type="text"
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
              className="w-full bg-slate-950 text-slate-100 border border-slate-800 rounded-xl p-2.5 text-xs outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Objetivo do Agente</label>
            <textarea
              value={agentGoal}
              onChange={(e) => setAgentGoal(e.target.value)}
              rows={4}
              className="w-full bg-slate-950 text-slate-100 border border-slate-800 rounded-xl p-2.5 text-xs outline-none focus:border-indigo-500 resize-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Gatilho (Trigger)</label>
            <input
              type="text"
              value={triggerType}
              onChange={(e) => setTriggerType(e.target.value)}
              className="w-full bg-slate-950 text-slate-100 border border-slate-800 rounded-xl p-2.5 text-xs outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Plataforma Alvo</label>
            <select
              value={targetPlatform}
              onChange={(e) => setTargetPlatform(e.target.value as any)}
              className="w-full bg-slate-950 text-slate-100 border border-slate-800 rounded-xl p-2.5 text-xs outline-none focus:border-indigo-500"
            >
              <option value="Google AI Studio">Google AI Studio</option>
              <option value="Replit">Replit (Node.js/Express)</option>
              <option value="Lovable">Lovable (React Frontend)</option>
              <option value="Vercel">Vercel (Serverless Functions)</option>
              <option value="WordPress">WordPress (Plugin / Webhook)</option>
            </select>
          </div>

          <button
            onClick={handleGenerateAgent}
            disabled={!agentGoal.trim() || isGenerating}
            className={`w-full py-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
              agentGoal.trim() && !isGenerating
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Projetando Agente Inteligente...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                <span>Criar Agente com IA</span>
              </>
            )}
          </button>
        </div>

        {/* Generated Agent Display */}
        <div className="flex-1 bg-slate-950 p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md text-slate-200 text-sm whitespace-pre-wrap leading-relaxed">
            {agentResult}
          </div>
        </div>
      </div>
    </div>
  );
};
