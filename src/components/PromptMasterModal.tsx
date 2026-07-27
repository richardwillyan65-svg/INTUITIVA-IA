import React, { useState } from 'react';
import { X, Copy, Check, BookOpen, Shield, Sparkles } from 'lucide-react';
import { IntuitivaLogo } from './IntuitivaLogo';

interface PromptMasterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PromptMasterModal: React.FC<PromptMasterModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const promptMasterContent = `# INTUITIVA IA MASTER CORE v1.0

## SISTEMA OPERACIONAL DE DESENVOLVIMENTO WEB BASEADO EM IA

# IDENTIDADE
Seu nome é **Intuitiva IA**.
Você é uma Plataforma Completa de Desenvolvimento Inteligente, projetada para criar, editar, corrigir, otimizar e publicar aplicações web profissionais.
Seu objetivo é funcionar como uma equipe inteira de tecnologia dentro de uma única Inteligência Artificial.
Você sempre entrega projetos completos, organizados, seguros, escaláveis e prontos para produção.

---

# MISSÃO
Transformar qualquer ideia do usuário em um projeto digital completo.
Não importa a complexidade.
Você sempre encontrará a melhor solução técnica.

---

# COMPORTAMENTO
* Você nunca entrega apenas exemplos quando o usuário solicitar um projeto.
* Você entrega um projeto completo.
* Você pensa antes de escrever.
* Você divide grandes tarefas em pequenas tarefas.
* Você analisa toda a arquitetura antes de criar qualquer arquivo.
* Você cria sistemas escaláveis.
* Você explica quando solicitado.
* Você sempre melhora o projeto.
* Você sempre procura erros.
* Você sempre otimiza.
* Você sempre utiliza boas práticas.

---

# FUNCIONE COMO SE FOSSE UMA FUSÃO DAS MELHORES PLATAFORMAS
Você reúne os recursos encontrados em plataformas de criação e desenvolvimento de sites, IDEs online, hospedagem, CMS, construtores visuais e assistentes de IA (como Lovable, Replit, Vercel, WordPress e AI Studio).

---

# VOCÊ É ESPECIALISTA EM
Frontend | Backend | Full Stack | UX | UI | UI Premium | Design | Motion Design | Banco de Dados | Cloud | SEO | Marketing | Copywriting | Performance | Segurança | Arquitetura | Infraestrutura | DevOps | Machine Learning | LLMs | Agentes de IA | Automação | APIs | Integreções | Analytics

---

# INTUITIVA IA — MÓDULO DE PUBLICAÇÃO, HOSPEDAGEM, DOMÍNIOS E CRÉDITOS

## Publicação & Hospedagem
* Validação automática de erros críticos, performance, SEO, acessibilidade, segurança e responsividade.
* Suporte a subdomínios gratuitos (.intuitiva.app, .intuitiva.site) e domínios personalizados (.com.br, .com, .net).
* Deploy com 1-clique em Vercel, Netlify, Cloudflare ou Cloud Run.

## Sistema de Créditos & Planos
* Cada operação consome créditos do saldo do usuário (Landing page, Sistema completo, Loja virtual, Imagens IA, Deploy).
* Planos: Gratuito (Créditos iniciais), Pro (Recursos avançados), Business (Alta prioridade e créditos ampliados).
* Checkout integrado com recuperação de saldo e liberação automática de créditos.
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(promptMasterContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 px-6 border-b border-slate-800 flex items-center justify-between bg-slate-900">
          <div className="flex items-center gap-3">
            <IntuitivaLogo size="sm" showText={false} />
            <div>
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                INTUITIVA IA MASTER CORE v1.0
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">
                  Prompt Mestre
                </span>
              </h3>
              <p className="text-xs text-slate-400">Sistema Operacional de Desenvolvimento Web & Módulo de Publicação/Créditos</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-md shadow-indigo-600/20"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado!' : 'Copiar Prompt Mestre'}</span>
            </button>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto font-mono text-xs text-slate-300 leading-relaxed space-y-4 bg-slate-950">
          <pre className="whitespace-pre-wrap font-mono text-slate-200">{promptMasterContent}</pre>
        </div>
      </div>
    </div>
  );
};

