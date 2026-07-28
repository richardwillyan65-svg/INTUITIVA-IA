import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Search,
  Filter,
  Eye,
  Zap,
  Star,
  Download,
  Check,
  X,
  Monitor,
  Tablet,
  Smartphone,
  Copy,
  ExternalLink,
  LayoutGrid,
  Layers,
  Palette
} from 'lucide-react';
import { GENERATED_THEMES, THEME_CATEGORIES, ThemeItem } from '../data/themesCatalog';

interface ThemesStudioProps {
  onSelectTheme: (themePrompt: string) => void;
}

export const ThemesStudio: React.FC<ThemesStudioProps> = ({ onSelectTheme }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStyleFilter, setSelectedStyleFilter] = useState<string>('Todos');
  const [activePreviewTheme, setActivePreviewTheme] = useState<ThemeItem | null>(null);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);

  // Filter themes
  const filteredThemes = useMemo(() => {
    return GENERATED_THEMES.filter((theme) => {
      const matchesCategory = selectedCategory === 'Todos' || theme.category === selectedCategory;
      const matchesStyle = selectedStyleFilter === 'Todos' || theme.style === selectedStyleFilter;
      const matchesSearch =
        searchQuery.trim() === '' ||
        theme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        theme.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        theme.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesStyle && matchesSearch;
    });
  }, [selectedCategory, selectedStyleFilter, searchQuery]);

  const handleUseTheme = (theme: ThemeItem) => {
    onSelectTheme(theme.promptToBuild);
  };

  const handleCopyPrompt = (theme: ThemeItem) => {
    navigator.clipboard.writeText(theme.promptToBuild);
    setCopiedPromptId(theme.id);
    setTimeout(() => setCopiedPromptId(null), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 text-slate-100 p-4 md:p-6 space-y-6">
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border border-indigo-500/30 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-extrabold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Catálogo Oficial • +400 Temas de IA</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Galeria de Temas & Prévias em Tempo Real
            </h1>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Explore nossa biblioteca com mais de 400 temas pré-projetados para SaaS, E-commerce, Clínicas, Imobiliárias e Apps. Visualize a prévia ao vivo em qualquer dispositivo e aplique no Criador IA com 1-clique.
            </p>
          </div>

          {/* Quick Counter Badge */}
          <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl text-center space-y-1 shrink-0">
            <div className="text-3xl font-black text-indigo-400 font-mono">
              {filteredThemes.length} / 412
            </div>
            <div className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">
              Temas Disponíveis
            </div>
          </div>
        </div>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar entre +400 temas (ex: Dashboard, Clínica, Cripto, Dark Glass)..."
              className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-2xl px-4 py-3 text-xs text-slate-100 outline-none pl-11 shadow-inner transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-slate-500 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Style Selector */}
          <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
            <Filter className="w-4 h-4 text-indigo-400" />
            <select
              value={selectedStyleFilter}
              onChange={(e) => setSelectedStyleFilter(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-2xl px-3.5 py-3 text-xs text-slate-200 outline-none font-semibold cursor-pointer"
            >
              <option value="Todos">Todos os Estilos Visuais</option>
              <option value="Dark Glass">Dark Glassmorphism</option>
              <option value="Minimal White">Minimalista Clean</option>
              <option value="Gradient Cyber">Cyberpunk / Neon</option>
              <option value="Luxury Gold">Luxury Premium</option>
              <option value="Vibrant Modern">Cores Vibrantes</option>
              <option value="Corporate Tech">Tech Corporativo</option>
            </select>
          </div>
        </div>

        {/* Category Pills Slider */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {THEME_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/20'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border-slate-800 hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Themes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredThemes.slice(0, 48).map((theme) => (
          <div
            key={theme.id}
            className="bg-slate-900 border border-slate-800 hover:border-indigo-500/60 rounded-2xl p-4 flex flex-col justify-between space-y-4 group transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 relative overflow-hidden"
          >
            {/* Theme Badge */}
            {theme.badge && (
              <span className="absolute top-3 left-3 bg-slate-950/90 text-amber-300 border border-amber-500/30 font-black text-[10px] uppercase px-2.5 py-0.5 rounded-full z-10 shadow-md">
                {theme.badge}
              </span>
            )}

            {/* Simulated Live Visual Card Canvas */}
            <div
              className={`w-full h-40 rounded-xl bg-gradient-to-br ${theme.previewBg} p-3 flex flex-col justify-between border border-slate-700/50 relative overflow-hidden group-hover:scale-[1.02] transition-transform`}
            >
              {/* Fake UI Header Bar */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[9px] font-mono font-bold text-slate-300/80 bg-slate-950/60 px-2 py-0.5 rounded">
                  {theme.style}
                </span>
              </div>

              {/* Fake UI Graphic Mockup */}
              <div className="space-y-1.5 my-auto">
                <div className="h-3 w-3/4 bg-white/30 rounded" />
                <div className="h-2 w-1/2 bg-white/20 rounded" />
                <div className="flex items-center gap-1.5 pt-2">
                  <div className="h-5 w-12 bg-indigo-500/60 rounded text-[8px] flex items-center justify-center font-bold text-white">
                    VER
                  </div>
                  <div className="h-5 w-8 bg-white/10 rounded" />
                </div>
              </div>

              {/* Hover Overlay Button */}
              <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                <button
                  onClick={() => setActivePreviewTheme(theme)}
                  className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 shadow-lg transition-transform cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Prévia Ao Vivo</span>
                </button>
              </div>
            </div>

            {/* Card Information */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-indigo-400 font-bold uppercase truncate max-w-[150px]">
                  {theme.category}
                </span>
                <div className="flex items-center gap-1 text-amber-300 font-bold">
                  <Star className="w-3 h-3 fill-amber-300" />
                  <span>{theme.rating}</span>
                </div>
              </div>

              <h3 className="font-extrabold text-white text-sm line-clamp-1">{theme.title}</h3>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {theme.description}
              </p>

              {/* Tag Pills */}
              <div className="flex flex-wrap gap-1 pt-1">
                {theme.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 bg-slate-950 text-slate-400 border border-slate-800 rounded-md text-[10px] font-mono"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Card Action Buttons */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setActivePreviewTheme(theme)}
                className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-slate-400" />
                <span>Prévia</span>
              </button>

              <button
                onClick={() => handleUseTheme(theme)}
                className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md shadow-indigo-600/20"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Usar na IA</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Note */}
      <div className="text-center py-6 border-t border-slate-800/80 space-y-2">
        <p className="text-xs text-slate-400">
          Exibindo temas recomendados para a sua seleção. Total no acervo: <strong className="text-white font-mono">412 temas</strong>.
        </p>
      </div>

      {/* Live Preview Modal */}
      {activePreviewTheme && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-3 md:p-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-5xl w-full h-[90vh] flex flex-col shadow-2xl relative overflow-hidden">
            {/* Modal Top Bar */}
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 rounded-xl">
                  <Palette className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-sm md:text-base flex items-center gap-2">
                    {activePreviewTheme.title}
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-mono border border-slate-700">
                      {activePreviewTheme.style}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">{activePreviewTheme.category}</p>
                </div>
              </div>

              {/* Device Frame View Switches */}
              <div className="hidden sm:flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 gap-1">
                <button
                  onClick={() => setPreviewDevice('desktop')}
                  className={`p-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    previewDevice === 'desktop' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Monitor className="w-4 h-4" />
                  <span>Desktop</span>
                </button>

                <button
                  onClick={() => setPreviewDevice('tablet')}
                  className={`p-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    previewDevice === 'tablet' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Tablet className="w-4 h-4" />
                  <span>Tablet</span>
                </button>

                <button
                  onClick={() => setPreviewDevice('mobile')}
                  className={`p-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    previewDevice === 'mobile' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Mobile</span>
                </button>
              </div>

              <button
                onClick={() => setActivePreviewTheme(null)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Interactive Device Viewport */}
            <div className="flex-1 bg-slate-950 p-4 md:p-6 overflow-y-auto flex items-center justify-center">
              <div
                className={`transition-all duration-300 bg-slate-900 border-4 border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col ${
                  previewDevice === 'desktop'
                    ? 'w-full h-full'
                    : previewDevice === 'tablet'
                    ? 'w-[768px] h-[90%]'
                    : 'w-[375px] h-[90%]'
                }`}
              >
                {/* Device Screen Frame Top Header */}
                <div className="bg-slate-950 p-3 border-b border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="bg-slate-900 px-3 py-1 rounded-lg border border-slate-800 text-[11px] font-mono text-slate-400 truncate max-w-[250px]">
                    https://demo-theme.{activePreviewTheme.id}.intuitiva.com
                  </div>
                  <div className="text-[10px] text-emerald-400 font-mono font-bold">● SSL Ativo</div>
                </div>

                {/* Live Screen Mockup Area */}
                <div
                  className={`flex-1 p-6 md:p-10 bg-gradient-to-br ${activePreviewTheme.previewBg} overflow-y-auto space-y-8 text-white`}
                >
                  {/* Hero Section */}
                  <div className="space-y-4 max-w-xl mx-auto text-center pt-8">
                    <span className="px-3.5 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold border border-white/20">
                      ⚡ {activePreviewTheme.category}
                    </span>
                    <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-tight">
                      {activePreviewTheme.title}
                    </h1>
                    <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
                      {activePreviewTheme.description}
                    </p>
                    <div className="flex items-center justify-center gap-3 pt-2">
                      <button
                        onClick={() => {
                          handleUseTheme(activePreviewTheme);
                          setActivePreviewTheme(null);
                        }}
                        className="px-6 py-3 bg-white text-slate-950 font-black text-xs rounded-xl shadow-xl hover:bg-slate-100 transition-all cursor-pointer flex items-center gap-2"
                      >
                        <Zap className="w-4 h-4 text-indigo-600" />
                        <span>Gerar este Site Agora</span>
                      </button>
                    </div>
                  </div>

                  {/* Feature Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
                    <div className="p-4 bg-slate-950/60 backdrop-blur-md border border-white/10 rounded-2xl space-y-2">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/30 flex items-center justify-center text-indigo-300 font-bold">
                        01
                      </div>
                      <h4 className="font-bold text-sm text-white">IA Onboarding Inteligente</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Integração completa com agentes autônomos para personalização e atendimento 24/7.
                      </p>
                    </div>

                    <div className="p-4 bg-slate-950/60 backdrop-blur-md border border-white/10 rounded-2xl space-y-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/30 flex items-center justify-center text-emerald-300 font-bold">
                        02
                      </div>
                      <h4 className="font-bold text-sm text-white">Alta Taxa de Conversão</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Design focado no comportamento do usuário com CTAs estratégicos e checkout simplificado.
                      </p>
                    </div>

                    <div className="p-4 bg-slate-950/60 backdrop-blur-md border border-white/10 rounded-2xl space-y-2">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/30 flex items-center justify-center text-amber-300 font-bold">
                        03
                      </div>
                      <h4 className="font-bold text-sm text-white">Domínio & SSL Grátis</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Publicação instantânea em subdomínio intuitiva.com ou IV.IA.com com suporte total.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Bottom Action Controls */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0 text-xs">
              <div className="text-slate-400">
                Gostou deste tema? A Intuitiva IA irá gerar o projeto completo baseado neste modelo.
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => handleCopyPrompt(activePreviewTheme)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer"
                >
                  {copiedPromptId === activePreviewTheme.id ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Prompt Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copiar Prompt da IA</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    handleUseTheme(activePreviewTheme);
                    setActivePreviewTheme(null);
                  }}
                  className="px-5 py-2.5 bg-gradient-to-r from-amber-500 via-indigo-600 to-purple-600 hover:from-amber-400 hover:to-indigo-500 text-slate-950 font-black rounded-xl flex items-center gap-2 shadow-xl shadow-indigo-600/30 transition-all cursor-pointer"
                >
                  <Zap className="w-4 h-4" />
                  <span>Aplicar este Tema no Criador IA</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
