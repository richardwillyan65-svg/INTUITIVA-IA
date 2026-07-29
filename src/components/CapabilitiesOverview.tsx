import React, { useState } from 'react';
import {
  PLATFORM_CATEGORIES,
  ALL_300_FEATURES,
  SYSTEM_ARCHITECTURE_DIAGRAM,
  PlatformFeatureItem
} from '../data/platform300Specs';
import { CORE_AI_RESOURCES, CoreAiCategoryGroup } from '../data/coreAiFeatures';
import {
  LayoutGrid,
  CheckCircle2,
  Sparkles,
  Search,
  Code2,
  Bot,
  Zap,
  Database,
  Cloud,
  Palette,
  ShieldCheck,
  BarChart3,
  Smartphone,
  CreditCard,
  Wrench,
  Image as ImageIcon,
  History,
  Upload,
  Copy,
  Check,
  ArrowRight,
  Cpu,
  Layers,
  Terminal,
  Download,
  BookOpen,
  Sliders,
  ListFilter
} from 'lucide-react';

interface CapabilitiesOverviewProps {
  onSelectPrompt?: (prompt: string) => void;
  onNavigateTab?: (tab: string) => void;
}

export const CapabilitiesOverview: React.FC<CapabilitiesOverviewProps> = ({
  onSelectPrompt,
  onNavigateTab
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'core_resources' | 'matrix' | 'architecture'>('core_resources');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [copiedSpecJSON, setCopiedSpecJSON] = useState(false);

  const iconMap: Record<string, any> = {
    Sparkles: Sparkles,
    Palette: Palette,
    Code2: Code2,
    Bot: Bot,
    Smartphone: Smartphone,
    Database: Database,
    ShieldCheck: ShieldCheck,
    Cloud: Cloud,
    CreditCard: CreditCard,
    Wrench: Wrench,
    Image: ImageIcon,
    Search: Search,
    History: History,
    Upload: Upload,
    BarChart3: BarChart3,
    Layers: Layers,
    Zap: Zap
  };

  // Filter 300+ features
  const filtered300Features = ALL_300_FEATURES.filter((feat) => {
    const matchesCategory = selectedCategory === 'all' || feat.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      feat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feat.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feat.promptExample.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Filter core AI resources
  const filteredCoreGroups = CORE_AI_RESOURCES.map((group) => {
    const matchingItems = group.items.filter((item) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.promptExample.toLowerCase().includes(q)
      );
    });
    return { ...group, items: matchingItems };
  }).filter((group) => group.items.length > 0);

  const handleExecutePrompt = (prompt: string) => {
    if (onSelectPrompt) {
      onSelectPrompt(prompt);
    } else if (onNavigateTab) {
      onNavigateTab('webbuilder');
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleExportFullSpecJSON = () => {
    const specData = {
      platform: 'Intuitiva IA - Multi-Agent AI Web & Mobile Studio',
      version: '3.0 Professional Spec',
      coreResources: CORE_AI_RESOURCES,
      total300Features: ALL_300_FEATURES.length,
      categories: PLATFORM_CATEGORIES,
      architecture: SYSTEM_ARCHITECTURE_DIAGRAM,
      features: ALL_300_FEATURES
    };

    const jsonString = JSON.stringify(specData, null, 2);
    navigator.clipboard.writeText(jsonString);
    setCopiedSpecJSON(true);
    setTimeout(() => setCopiedSpecJSON(false), 2500);
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] bg-slate-950 overflow-y-auto p-4 md:p-8 text-slate-100 font-sans">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto w-full mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 p-6 rounded-2xl border border-indigo-500/20 shadow-2xl">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Plataforma de IA de Alto Desempenho</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Principais Recursos da Inteligência Artificial
            </h1>
            <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
              Crie interfaces, sistemas SaaS, e-commerce, bancos de dados Supabase/PostgreSQL, logins sociais, responsividade e deploy automático via prompts e chat interativo.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={handleExportFullSpecJSON}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer border border-indigo-400/30"
            >
              {copiedSpecJSON ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Especificação Copiada (JSON)!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Exportar Especificação</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mode Navigation Tabs */}
      <div className="max-w-7xl mx-auto w-full mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex flex-wrap items-center gap-2 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setViewMode('core_resources')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              viewMode === 'core_resources'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Principais Recursos da IA</span>
          </button>

          <button
            onClick={() => setViewMode('matrix')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              viewMode === 'matrix'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Matriz 300+ Recursos</span>
          </button>

          <button
            onClick={() => setViewMode('architecture')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              viewMode === 'architecture'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Arquitetura de Sistema</span>
          </button>
        </div>

        {/* Search Bar */}
        {viewMode !== 'architecture' && (
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar em todos os recursos da IA..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        )}
      </div>

      {/* VIEW MODE 1: CORE RESOURCES LISTED BY CATEGORY (Requested by user) */}
      {viewMode === 'core_resources' && (
        <div className="max-w-7xl mx-auto w-full space-y-8">
          {filteredCoreGroups.length === 0 ? (
            <div className="text-center py-12 bg-slate-900/50 rounded-2xl border border-slate-800">
              <p className="text-slate-400 text-sm">Nenhum recurso encontrado para "{searchQuery}".</p>
            </div>
          ) : (
            filteredCoreGroups.map((group) => {
              const IconComponent = iconMap[group.iconName] || Sparkles;
              return (
                <div key={group.id} className="space-y-4">
                  {/* Category Header */}
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{group.emoji}</span>
                      <div>
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                          <span>{group.categoryName}</span>
                          <span className="text-xs font-semibold bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded-full border border-indigo-500/20">
                            {group.items.length} {group.items.length === 1 ? 'item' : 'itens'}
                          </span>
                        </h2>
                        <p className="text-slate-400 text-xs">{group.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Grid of Items in this Category */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {group.items.map((item) => (
                      <div
                        key={item.id}
                        className="bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-4 flex flex-col justify-between gap-3 hover:shadow-xl hover:shadow-indigo-950/20 transition-all group"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="font-bold text-white text-sm group-hover:text-indigo-300 transition-colors flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                              <span>{item.title}</span>
                            </h3>
                          </div>
                          <p className="text-slate-400 text-xs leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        {/* Interactive Prompt Box */}
                        <div className="pt-2 border-t border-slate-800/80 space-y-2">
                          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 text-[11px] text-slate-300 font-mono line-clamp-2">
                            "{item.promptExample}"
                          </div>

                          <div className="flex items-center justify-between gap-2">
                            <button
                              onClick={() => handleCopyCode(item.promptExample)}
                              className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              {copiedCode === item.promptExample ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                  <span className="text-emerald-400 font-bold">Copiado!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>Copiar Prompt</span>
                                </>
                              )}
                            </button>

                            <button
                              onClick={() => handleExecutePrompt(item.promptExample)}
                              className="px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white text-xs font-bold rounded-lg border border-indigo-500/30 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                            >
                              <span>Executar com IA</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* VIEW MODE 2: MATRIX OF 300+ FEATURES */}
      {viewMode === 'matrix' && (
        <div className="max-w-7xl mx-auto w-full space-y-6">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Todas as Categorias ({ALL_300_FEATURES.length})
            </button>

            {PLATFORM_CATEGORIES.map((cat) => {
              const IconComp = iconMap[cat.icon] || Sparkles;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  <span>
                    {cat.name} ({cat.itemCount})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Results Summary Counter */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>
              Exibindo <strong className="text-white">{filtered300Features.length}</strong> de{' '}
              <strong className="text-white">{ALL_300_FEATURES.length}</strong> recursos prontos
            </span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              100% Operacional na Intuitiva IA
            </span>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered300Features.map((feat) => (
              <div
                key={feat.id}
                className="bg-slate-900/90 border border-slate-800/90 hover:border-indigo-500/50 rounded-2xl p-4 flex flex-col justify-between gap-3 hover:shadow-xl hover:shadow-indigo-950/30 transition-all group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono font-bold bg-slate-800 text-indigo-400 px-2 py-0.5 rounded border border-slate-700/60">
                      {feat.code}
                    </span>
                    <span className="text-[10px] font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-sm group-hover:text-indigo-300 transition-colors">
                    {feat.title}
                  </h3>

                  <p className="text-slate-400 text-xs leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                {/* Prompt Example Box & Execution Button */}
                <div className="pt-2 border-t border-slate-800/80 space-y-2">
                  <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 text-[11px] text-slate-300 font-mono line-clamp-2 relative group/prompt">
                    "{feat.promptExample}"
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleCopyCode(feat.promptExample)}
                      className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      {copiedCode === feat.promptExample ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copiar Prompt</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleExecutePrompt(feat.promptExample)}
                      className="px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white text-xs font-bold rounded-lg border border-indigo-500/30 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <span>Executar com IA</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW MODE 3: SYSTEM ARCHITECTURE DIAGRAM */}
      {viewMode === 'architecture' && (
        <div className="max-w-5xl mx-auto w-full space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="p-3 bg-indigo-600/10 border border-indigo-500/20 rounded-xl text-indigo-400">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  {SYSTEM_ARCHITECTURE_DIAGRAM.title}
                </h2>
                <p className="text-slate-400 text-xs">
                  Arquitetura distribuída resiliente desenvolvida para produção, alta escala e isolamento.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {SYSTEM_ARCHITECTURE_DIAGRAM.layers.map((layer, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950 border border-slate-800/80 rounded-xl p-5 hover:border-indigo-500/40 transition-all space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-sm flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full bg-gradient-to-r ${layer.color}`} />
                      {layer.name}
                    </h3>
                    <span className="text-[10px] font-mono bg-slate-900 text-slate-400 px-2 py-0.5 rounded border border-slate-800">
                      Camada {idx + 1}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {layer.techs.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1 bg-slate-900 text-slate-200 border border-slate-800 rounded-lg text-xs font-semibold flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-indigo-950/30 border border-indigo-500/20 rounded-xl text-xs text-slate-300 leading-relaxed flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-1">
                  Resiliência Multi-Modelo Gemini com Fallback Automático:
                </strong>
                O servidor Express executa chamadas otimizadas pelo SDK <code>@google/genai</code> com motor de resiliência automatizado (Gemini 3.6 Flash -&gt; Gemini 2.5 Flash -&gt; Gemini 1.5 Flash), garantindo 100% de disponibilidade em momentos de alta demanda.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
