import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Bot,
  User,
  Sparkles,
  Copy,
  Check,
  Code2,
  Zap,
  Trash2,
  RefreshCw,
  Terminal,
  Layers,
  ArrowRight,
  Globe,
  Rocket,
  MessageSquare
} from 'lucide-react';
import { ChatMessage, SpecialtyType } from '../types';
import { SPECIALTIES_LIST } from '../data/capabilitiesData';

interface ChatStudioProps {
  onStartBuild?: (prompt: string) => void;
}

export const ChatStudio: React.FC<ChatStudioProps> = ({ onStartBuild }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'assistant',
      content: `Olá! Eu sou a **Intuitiva IA**, sua Inteligência Artificial Full Stack e Sistema Operacional de Desenvolvimento Web.

Atuo como uma equipe multidisciplinar completa de tecnologia:
- **Desenvolvimento Web**: Front-end, Back-end, Full Stack (React, Node.js, Express, Next.js, Python).
- **Banco de Dados & Cloud**: PostgreSQL, MongoDB, Firebase, Vercel, Replit, Cloudflare.
- **Agentes & Automações**: Workflows, Webhooks, integrações de APIs e assistentes inteligentes.
- **Marketing, Design & SEO**: Copywriting, Funis de vendas, Meta/Google Ads, UX/UI.

Como posso ajudar no seu projeto hoje? Selecione uma especialidade ou escolha uma opção de criação rápida abaixo!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);


  const [inputPrompt, setInputPrompt] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<SpecialtyType>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (customPrompt?: string) => {
    const promptToUse = customPrompt || inputPrompt;
    if (!promptToUse.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: promptToUse,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      specialty: selectedSpecialty,
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!customPrompt) setInputPrompt('');
    setIsLoading(true);

    try {
      const historyForApi = messages.concat(userMessage).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: historyForApi,
          specialty: selectedSpecialty !== 'all' ? selectedSpecialty : undefined,
        }),
      });

      const data = await res.json();

      let replyContent = '';
      if (res.ok && data.text) {
        replyContent = data.text;
      } else if (data.fallbackText) {
        replyContent = data.fallbackText;
      } else {
        replyContent = 'A Intuitiva IA processou sua solicitação com sucesso. Se precisar de ajustes finos no código ou na estratégia, me avise!';
      }

      const assistantMessage: ChatMessage = {
        id: `ast-${Date.now()}`,
        role: 'assistant',
        content: replyContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        specialty: selectedSpecialty,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error('Erro na conversa:', err);
      const errorMessage: ChatMessage = {
        id: `ast-err-${Date.now()}`,
        role: 'assistant',
        content: `**Intuitiva IA - Resposta:**\nOcorreu uma instabilidade na comunicação com a API. Certifique-se de que a variável de ambiente \`GEMINI_API_KEY\` foi configurada nos Secrets. \n\nSua pergunta foi: "${promptToUse}"`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyCode = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const quickPrompts = [
    { label: 'Crie uma API Express com JWT em TS', specialty: 'backend' },
    { label: 'Crie um Dashboard React + Tailwind', specialty: 'frontend' },
    { label: 'Esquema PostgreSQL para E-commerce', specialty: 'database' },
    { label: 'Copy de Vendas & Anúncios para SaaS', specialty: 'marketing' },
    { label: 'Arquitetura Serverless em Cloud Run', specialty: 'cloud' },
  ];

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] bg-slate-950 overflow-hidden">
      {/* Top Filter Bar */}
      <div className="bg-slate-900/80 border-b border-slate-800 p-3 px-6 flex items-center justify-between gap-4 shrink-0 overflow-x-auto">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-indigo-400" />
            Especialidade:
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setSelectedSpecialty('all')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                selectedSpecialty === 'all'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
              }`}
            >
              Visão Geral
            </button>
            {SPECIALTIES_LIST.slice(0, 6).map((spec) => (
              <button
                key={spec.id}
                onClick={() => setSelectedSpecialty(spec.id as SpecialtyType)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                  selectedSpecialty === spec.id
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                }`}
              >
                {spec.name.replace('Especialista em ', '').replace('Desenvolvedor ', '')}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => setMessages([messages[0]])}
          title="Limpar histórico da conversa"
          className="text-slate-400 hover:text-rose-400 p-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {messages.map((msg) => {
          const isAssistant = msg.role === 'assistant';
          return (
            <div
              key={msg.id}
              className={`flex gap-4 max-w-4xl ${
                isAssistant ? 'mr-auto' : 'ml-auto flex-row-reverse'
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white shadow-md ${
                  isAssistant
                    ? 'bg-gradient-to-tr from-indigo-600 to-blue-600 shadow-indigo-500/20 border border-indigo-400/30'
                    : 'bg-slate-800 border border-slate-700'
                }`}
              >
                {isAssistant ? <Bot className="w-5 h-5 text-indigo-100" /> : <User className="w-5 h-5 text-slate-300" />}
              </div>

              {/* Message Content Bubble */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-slate-200">
                    {isAssistant ? 'Intuitiva IA' : 'Você'}
                  </span>
                  <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                  {msg.specialty && msg.specialty !== 'all' && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-medium">
                      {msg.specialty}
                    </span>
                  )}
                </div>

                <div
                  className={`p-4 rounded-2xl border text-sm leading-relaxed whitespace-pre-wrap ${
                    isAssistant
                      ? 'bg-slate-900/90 border-slate-800 text-slate-200 shadow-sm'
                      : 'bg-indigo-600 text-white border-indigo-500 shadow-sm shadow-indigo-600/20'
                  }`}
                >
                  {/* Message Text */}
                  {msg.content}
                </div>

                {/* Quick Copy Action if response has code */}
                {isAssistant && msg.content.includes('```') && (
                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => handleCopyCode(msg.content, msg.id)}
                      className="text-xs text-slate-400 hover:text-indigo-400 flex items-center gap-1 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copiar Resposta</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex gap-4 max-w-4xl mr-auto">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-600 flex items-center justify-center text-white shadow-md animate-pulse">
              <Bot className="w-5 h-5 text-indigo-100" />
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl text-sm text-slate-400 flex items-center gap-3">
              <RefreshCw className="w-4 h-4 animate-spin text-indigo-400" />
              <span>Intuitiva IA está processando sua solução full stack...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts Pill Bar */}
      <div className="px-6 py-2 bg-slate-950 border-t border-slate-900 overflow-x-auto no-scrollbar flex items-center gap-2">
        <span className="text-[11px] font-semibold text-slate-400 whitespace-nowrap">Sugestões rápidas:</span>
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => {
              setSelectedSpecialty(qp.specialty as SpecialtyType);
              handleSendMessage(qp.label);
            }}
            className="text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-indigo-500/40 px-3 py-1 rounded-lg transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5"
          >
            <span>{qp.label}</span>
            <ArrowRight className="w-3 h-3 text-slate-500" />
          </button>
        ))}
      </div>

      {/* Input Form Bar */}
      <div className="p-4 bg-slate-900/90 border-t border-slate-800 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-3 max-w-5xl mx-auto"
        >
          <div className="relative flex-1">
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="Descreva o código, automação, sistema, landing page ou dúvida para a Intuitiva IA..."
              className="w-full bg-slate-950 text-slate-100 placeholder-slate-500 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-3.5 text-sm outline-none transition-all pr-10"
            />
          </div>

          <button
            type="submit"
            disabled={!inputPrompt.trim() || isLoading}
            className={`px-5 py-3.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              inputPrompt.trim() && !isLoading
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <span>Enviar</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
