import React, { useState } from 'react';
import { Network, Database, Shield, Cloud, Sparkles, RefreshCw, Copy, Check, Terminal } from 'lucide-react';

export const ArchitectureStudio: React.FC = () => {
  const [projectName, setProjectName] = useState('SaaS Plataforma de IA Multi-tenant');
  const [expectedScale, setExpectedScale] = useState('50.000 requisições diárias / 5.000 usuários ativos');
  const [dbPreference, setDbPreference] = useState('PostgreSQL com Prisma ORM + Redis Cache');
  const [cloudPreference, setCloudPreference] = useState('Google Cloud Run / Vercel + Cloudflare CDN');

  const [architectureResult, setArchitectureResult] = useState<string>(`
**Projeto de Arquitetura de Sistemas & Cloud Security - Intuitiva IA**

### 1. Esquema do Banco de Dados (PostgreSQL DDL)
\`\`\`sql
-- Tabela de Organizações (Multi-tenant)
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Usuários com RBAC
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'member', -- admin, member, viewer
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Logs de Uso de IA
CREATE TABLE ai_usage_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  tokens_used INT NOT NULL,
  model_alias VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
\`\`\`

### 2. Diagrama Conceitual da Arquitetura
\`\`\`text
[ Cliente (Browser / Mobile) ]
             │ (HTTPS / TLS 1.3 via Cloudflare CDN)
             ▼
[ Reverse Proxy Nginx / Express ] ──► (Rate Limiting + CORS)
             │
             ├──► [ Auth Module (JWT / OAuth 2.0) ]
             ├──► [ Intuitiva IA Gemini Agent Service ]
             │
             ▼
[ Database Layer: PostgreSQL + Redis Cache ]
\`\`\`

### 3. Checklist de Segurança e Conformidade
- [x] **Autenticação**: Tokens JWT assinados com HS256 e tempo de expiração curto (8h) + Refresh Token.
- [x] **Proteção contra SQL Injection**: Uso de ORM parametrizado (Prisma / Drizzle / SQL preparado).
- [x] **Sanitização XSS/CSRF**: Headers Helmet habilitados, Content Security Policy e sanitização de inputs.
- [x] **Rate Limiting**: Limite de 100 requisições/minuto por IP no Express/Cloudflare.
`);

  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerateArchitecture = async () => {
    if (!projectName.trim() || isGenerating) return;

    setIsGenerating(true);
    try {
      const res = await fetch('/api/system-architect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectName,
          expectedScale,
          dbPreference,
          cloudPreference,
        }),
      });

      const data = await res.json();
      if (res.ok && data.architectureResult) {
        setArchitectureResult(data.architectureResult);
      } else {
        throw new Error(data.error || 'Falha ao projetar arquitetura');
      }
    } catch (err: any) {
      console.error('Erro no Architecture Studio:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(architectureResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] bg-slate-950 overflow-hidden">
      {/* Studio Banner */}
      <div className="bg-slate-900 border-b border-slate-800 p-4 px-6 flex flex-wrap items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-600/10 border border-indigo-500/20 rounded-xl text-indigo-400">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              Intuitiva IA - Arquitetura de Sistemas & Cloud Security
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-semibold">
                Enterprise Grade
              </span>
            </h2>
            <p className="text-xs text-slate-400">Modelagem de bancos de dados, diagramas de rede, Docker, Kubernetes e checklists de segurança.</p>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="px-3.5 py-1.5 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copiado!' : 'Copiar Arquitetura'}</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Form Panel */}
        <div className="w-full lg:w-96 bg-slate-900/60 border-r border-slate-800/80 p-5 overflow-y-auto space-y-4 shrink-0">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Nome do Projeto</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full bg-slate-950 text-slate-100 border border-slate-800 rounded-xl p-2.5 text-xs outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Escala Esperada</label>
            <input
              type="text"
              value={expectedScale}
              onChange={(e) => setExpectedScale(e.target.value)}
              className="w-full bg-slate-950 text-slate-100 border border-slate-800 rounded-xl p-2.5 text-xs outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Banco de Dados Preferido</label>
            <input
              type="text"
              value={dbPreference}
              onChange={(e) => setDbPreference(e.target.value)}
              className="w-full bg-slate-950 text-slate-100 border border-slate-800 rounded-xl p-2.5 text-xs outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Cloud / Host Preferido</label>
            <input
              type="text"
              value={cloudPreference}
              onChange={(e) => setCloudPreference(e.target.value)}
              className="w-full bg-slate-950 text-slate-100 border border-slate-800 rounded-xl p-2.5 text-xs outline-none focus:border-indigo-500"
            />
          </div>

          <button
            onClick={handleGenerateArchitecture}
            disabled={!projectName.trim() || isGenerating}
            className={`w-full py-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
              projectName.trim() && !isGenerating
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Projetando Arquitetura...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Projetar Arquitetura com IA</span>
              </>
            )}
          </button>
        </div>

        {/* Output Panel */}
        <div className="flex-1 bg-slate-950 p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md text-slate-200 text-sm whitespace-pre-wrap leading-relaxed font-mono">
            {architectureResult}
          </div>
        </div>
      </div>
    </div>
  );
};
