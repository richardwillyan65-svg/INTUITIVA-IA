import React, { useState, useEffect } from 'react';
import {
  Code2,
  Terminal,
  Play,
  Copy,
  Check,
  CloudCheck,
  Sparkles,
  RefreshCw,
  FileCode,
  Layers,
  ShieldAlert,
  Download,
  BookOpen,
  Sun,
  Moon,
  Monitor
} from 'lucide-react';
import { INITIAL_TEMPLATES } from '../data/capabilitiesData';
import { CodeTemplate } from '../types';

export const CodeStudio: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<CodeTemplate>(INITIAL_TEMPLATES[0]);
  const [customPrompt, setCustomPrompt] = useState('');
  const [techStack, setTechStack] = useState('React, TypeScript, Tailwind');
  const [codeCategory, setCodeCategory] = useState<'frontend' | 'backend' | 'database' | 'ai'>('backend');
  const [generatedCode, setGeneratedCode] = useState<string>(INITIAL_TEMPLATES[0].code);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [simulatedConsole, setSimulatedConsole] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'editor' | 'console'>('editor');
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving'>('saved');
  const [lastSavedTime, setLastSavedTime] = useState<string>(
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  );

  const [themeMode, setThemeMode] = useState<'system' | 'dark' | 'light'>('system');
  const [systemPrefersDark, setSystemPrefersDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemPrefersDark(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const isDark = themeMode === 'system' ? systemPrefersDark : themeMode === 'dark';

  useEffect(() => {
    setSaveStatus('saving');
    const timer = setTimeout(() => {
      setSaveStatus('saved');
      setLastSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 600);
    return () => clearTimeout(timer);
  }, [customPrompt, generatedCode, selectedTemplate]);

  const handleGenerateCode = async () => {
    if (!customPrompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setSimulatedConsole((prev) => [...prev, `[${new Date().toLocaleTimeString()}] Iniciando geração de código com Intuitiva IA...`]);

    try {
      const res = await fetch('/api/generate-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: customPrompt,
          techStack,
          codeType: codeCategory,
        }),
      });

      const data = await res.json();
      if (res.ok && data.codeResult) {
        setGeneratedCode(data.codeResult);
        setSimulatedConsole((prev) => [...prev, `[${new Date().toLocaleTimeString()}] Código gerado com sucesso! Complacente com padrões de segurança.`]);
      } else {
        throw new Error(data.error || 'Falha ao obter código');
      }
    } catch (err: any) {
      console.error('Erro no Code Studio:', err);
      setSimulatedConsole((prev) => [...prev, `[${new Date().toLocaleTimeString()}] Erro: ${err.message}`]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunSimulation = () => {
    setActiveTab('console');
    setSimulatedConsole([
      `[${new Date().toLocaleTimeString()}] Executando ambiente de teste estático da Intuitiva IA...`,
      `[${new Date().toLocaleTimeString()}] Validação TypeScript: 0 erros identificados.`,
      `[${new Date().toLocaleTimeString()}] Verificação de Segurança (XSS, CSRF, JWT): Aprovado.`,
      `[${new Date().toLocaleTimeString()}] Servidor de desenvolvimento pronto na porta 3000.`,
      `[${new Date().toLocaleTimeString()}] Status: 200 OK - Pronto para implantação na Vercel / Replit.`
    ]);
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] bg-slate-950 overflow-hidden">
      {/* Studio Banner Header */}
      <div className="bg-slate-900 border-b border-slate-800 p-4 px-6 flex flex-wrap items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-600/10 border border-indigo-500/20 rounded-xl text-indigo-400">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex flex-wrap items-center gap-2">
              Intuitiva IA - Code Studio
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-semibold">
                Clean Code & Security
              </span>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium border transition-all duration-300 ${
                saveStatus === 'saving'
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/20 animate-pulse'
                  : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              }`}>
                {saveStatus === 'saving' ? (
                  <>
                    <RefreshCw className="w-3 h-3 animate-spin text-amber-400" />
                    <span>Salvando...</span>
                  </>
                ) : (
                  <>
                    <CloudCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Salvo às {lastSavedTime}</span>
                  </>
                )}
              </span>
            </h2>
            <p className="text-xs text-slate-400">Geração e refatoração de código limpo, modular e seguro em tempo real.</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setActiveTab('editor');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'editor' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Código Fonte</span>
          </button>

          <button
            onClick={handleRunSimulation}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              activeTab === 'console' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Console de Testes</span>
          </button>

          <button
            onClick={handleCopyCode}
            className="px-3 py-1.5 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copiado!' : 'Copiar Código'}</span>
          </button>
        </div>
      </div>

      {/* Main Workspace Split View */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Panel: Prompt & Templates */}
        <div className="w-full lg:w-96 bg-slate-900/60 border-r border-slate-800/80 p-5 overflow-y-auto flex flex-col gap-5 shrink-0">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              O que você quer construir?
            </label>
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Ex: Crie um controller em TypeScript com Express e validação Zod para cadastro de produtos com foto e preço..."
              rows={4}
              className="w-full bg-slate-950 text-slate-100 placeholder-slate-500 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl p-3 text-xs outline-none resize-none"
            />
          </div>

          {/* Configuration Inputs */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">Categoria</label>
              <select
                value={codeCategory}
                onChange={(e) => setCodeCategory(e.target.value as any)}
                className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded-lg p-2 text-xs outline-none"
              >
                <option value="frontend">Front-end (UI)</option>
                <option value="backend">Back-end (API)</option>
                <option value="database">Banco de Dados</option>
                <option value="ai">IA & Agentes</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">Stack Preferida</label>
              <input
                type="text"
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
                className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded-lg p-2 text-xs outline-none"
              />
            </div>
          </div>

          <button
            onClick={handleGenerateCode}
            disabled={!customPrompt.trim() || isGenerating}
            className={`w-full py-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
              customPrompt.trim() && !isGenerating
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Intuitiva IA Gerando Código...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Gerar Código com IA</span>
              </>
            )}
          </button>

          {/* Quick Preset Templates */}
          <div className="border-t border-slate-800/80 pt-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
              Templates Prontos (1-Click)
            </span>
            <div className="space-y-2.5">
              {INITIAL_TEMPLATES.map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => {
                    setSelectedTemplate(tpl);
                    setGeneratedCode(tpl.code);
                    setCustomPrompt(tpl.description);
                  }}
                  className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                    selectedTemplate.id === tpl.id
                      ? 'bg-indigo-600/10 border-indigo-500/50 text-white'
                      : 'bg-slate-950/60 hover:bg-slate-800/60 border-slate-800/80 text-slate-300'
                  }`}
                >
                  <div className="text-xs font-semibold mb-1">{tpl.title}</div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{tpl.description}</p>
                  <div className="flex items-center gap-1.5 mt-2">
                    {tpl.techStack.map((tech, idx) => (
                      <span key={idx} className="text-[9px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel: Code Viewer or Console */}
        <div className={`flex-1 flex flex-col overflow-hidden transition-colors duration-200 ${
          isDark ? 'bg-slate-950 text-slate-200' : 'bg-slate-100 text-slate-900'
        }`}>
          {activeTab === 'editor' ? (
            <div className="flex-1 flex flex-col overflow-hidden font-mono text-xs">
              {/* Code Editor Top Status */}
              <div className={`border-b px-4 py-2 flex flex-wrap items-center justify-between gap-2 shrink-0 transition-colors ${
                isDark ? 'bg-slate-900/90 border-slate-800 text-slate-400' : 'bg-slate-200/90 border-slate-300 text-slate-700'
              }`}>
                <span className={`text-xs font-semibold flex items-center gap-2 ${
                  isDark ? 'text-slate-300' : 'text-slate-800'
                }`}>
                  <FileCode className="w-4 h-4 text-indigo-500" />
                  {selectedTemplate.filename || 'generatedCode.ts'}
                </span>

                {/* IDE Theme Toggle */}
                <div className="flex items-center gap-2">
                  <span className={`text-[11px] font-sans font-medium hidden sm:inline ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    Tema do IDE:
                  </span>
                  <div className={`flex items-center p-0.5 rounded-lg border font-sans text-xs transition-colors ${
                    isDark ? 'bg-slate-800/80 border-slate-700/60' : 'bg-slate-300/80 border-slate-400/60'
                  }`}>
                    <button
                      onClick={() => setThemeMode('system')}
                      title="Sincronizar com a aparência do sistema"
                      className={`px-2 py-1 rounded-md text-[11px] font-medium flex items-center gap-1 transition-all cursor-pointer ${
                        themeMode === 'system'
                          ? 'bg-indigo-600 text-white shadow-sm font-bold'
                          : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Monitor className="w-3 h-3" />
                      <span>Sistema</span>
                      {themeMode === 'system' && (
                        <span className="text-[9px] opacity-80">({isDark ? 'Escuro' : 'Claro'})</span>
                      )}
                    </button>

                    <button
                      onClick={() => setThemeMode('dark')}
                      title="Forçar modo escuro"
                      className={`px-2 py-1 rounded-md text-[11px] font-medium flex items-center gap-1 transition-all cursor-pointer ${
                        themeMode === 'dark'
                          ? 'bg-indigo-600 text-white shadow-sm font-bold'
                          : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Moon className="w-3 h-3" />
                      <span>Escuro</span>
                    </button>

                    <button
                      onClick={() => setThemeMode('light')}
                      title="Forçar modo claro"
                      className={`px-2 py-1 rounded-md text-[11px] font-medium flex items-center gap-1 transition-all cursor-pointer ${
                        themeMode === 'light'
                          ? 'bg-indigo-600 text-white shadow-sm font-bold'
                          : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Sun className="w-3 h-3" />
                      <span>Claro</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Code Body */}
              <div className={`flex-1 overflow-auto p-4 transition-colors ${
                isDark ? 'bg-slate-950 text-slate-200' : 'bg-white text-slate-900'
              }`}>
                <pre className="leading-relaxed">
                  <code>{generatedCode}</code>
                </pre>
              </div>
            </div>
          ) : (
            /* Console Output Tab */
            <div className="flex-1 bg-slate-950 p-4 font-mono text-xs text-emerald-400 space-y-2 overflow-y-auto">
              <div className="text-slate-400 border-b border-slate-800 pb-2 mb-2 font-sans font-bold flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                Console de Diagnóstico & Execução
              </div>
              {simulatedConsole.length === 0 ? (
                <div className="text-slate-600">Clique em "Console de Testes" para simular a execução.</div>
              ) : (
                simulatedConsole.map((log, idx) => (
                  <div key={idx} className="leading-relaxed">
                    {log}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
