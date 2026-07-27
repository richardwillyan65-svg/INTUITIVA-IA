import React, { useState } from 'react';
import {
  Plus,
  ArrowUp,
  RotateCw,
  Globe,
  Smartphone,
  Palette,
  Film,
  Presentation,
  Upload,
  FolderDown,
  Sparkles,
  Mic,
  ChevronLeft,
  ChevronRight,
  Check,
  FileCode,
  Layers,
  Shield,
  Tag,
  Settings,
  BookOpen,
  HelpCircle,
  Zap,
  LayoutGrid,
  ExternalLink,
  ChevronDown,
  X,
  Sliders
} from 'lucide-react';
import { IntuitivaLogo } from './IntuitivaLogo';

interface ReplitAgentHomeProps {
  onStartBuild: (promptText: string, category?: string) => void;
  userName?: string;
  onOpenImport?: () => void;
  onOpenUpgrade?: () => void;
}

export const ReplitAgentHome: React.FC<ReplitAgentHomeProps> = ({
  onStartBuild,
  userName = 'Richardwillyan65',
  onOpenImport,
  onOpenUpgrade
}) => {
  const [promptText, setPromptText] = useState('');
  const [isPlanChecked, setIsPlanChecked] = useState(true);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [showSkillSubmenu, setShowSkillSubmenu] = useState(false);
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');
  const [selectedCategory, setSelectedCategory] = useState<string>('Website');

  const categories = [
    { id: 'Website', label: 'Website', icon: Globe },
    { id: 'Mobile', label: 'Mobile', icon: Smartphone },
    { id: 'Design', label: 'Design', icon: Palette },
    { id: 'Animation', label: 'Animation', icon: Film },
    { id: 'Slides', label: 'Slides', icon: Presentation },
  ];

  const examplePrompts = [
    'SaaS hero animation',
    'Fitness app onboarding wireframe',
    'Freelance client portal',
    '3D maze game',
    '3D racing game',
    'Beginner running tracker'
  ];

  const brandLogos = [
    'Stripe', 'Zillow', 'Plaid', 'Adobe', 'Atlassian', 'Boeing', 'ClickUp', 'Coinbase'
  ];

  const handlePromptSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!promptText.trim()) return;
    onStartBuild(promptText, selectedCategory);
  };

  const handleExampleClick = (example: string) => {
    setPromptText(example);
    onStartBuild(example, selectedCategory);
  };

  return (
    <div className={`flex-1 flex flex-col h-full overflow-y-auto transition-colors ${
      themeMode === 'dark' ? 'bg-[#121316] text-slate-100' : 'bg-[#fcfaf7] text-slate-900'
    }`}>
      {/* Top Bar / Theme Switcher */}
      <div className={`px-6 py-3 border-b flex items-center justify-between text-xs font-semibold ${
        themeMode === 'dark' ? 'border-slate-800/80 bg-[#121316]/80' : 'border-amber-200/40 bg-[#fcfaf7]'
      }`}>
        <div className="flex items-center gap-3">
          <IntuitivaLogo size="sm" />
          <span className="hidden sm:inline text-slate-400">|</span>
          <span className="hidden sm:inline font-mono text-[11px] text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
            Intuitiva IA Agent Engine v3.6
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Theme Toggle (Dark / Light as requested by the images) */}
          <div className={`flex items-center p-0.5 rounded-lg border ${
            themeMode === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-amber-100/60 border-amber-200'
          }`}>
            <button
              onClick={() => setThemeMode('dark')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                themeMode === 'dark' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Dark Mode
            </button>
            <button
              onClick={() => setThemeMode('light')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                themeMode === 'light' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Light Mode
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-4xl mx-auto w-full space-y-8 my-auto">
        {/* Main Hero Header */}
        <div className="text-center space-y-3">
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight ${
            themeMode === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            {themeMode === 'dark'
              ? `Hi ${userName}, what do you want to make?`
              : 'What will you build?'}
          </h1>
          <p className={`text-sm sm:text-base max-w-lg mx-auto ${
            themeMode === 'dark' ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Turn ideas into apps in minutes — no coding needed
          </p>
        </div>

        {/* Replit Agent Central Input Box */}
        <div className="w-full relative">
          <form
            onSubmit={handlePromptSubmit}
            className={`rounded-2xl border transition-all shadow-2xl relative p-3 sm:p-4 flex flex-col gap-3 ${
              themeMode === 'dark'
                ? 'bg-[#1a1c23] border-slate-700/80 focus-within:border-indigo-500/80 focus-within:ring-2 focus-within:ring-indigo-500/20'
                : 'bg-[#f5f2eb] border-amber-200/80 focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-400/20'
            }`}
          >
            {/* Input Textarea */}
            <textarea
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handlePromptSubmit();
                }
              }}
              placeholder="Describe your idea, Intuitiva IA will bring it to life..."
              rows={3}
              className={`w-full bg-transparent outline-none resize-none text-sm sm:text-base leading-relaxed ${
                themeMode === 'dark' ? 'text-slate-100 placeholder-slate-500' : 'text-slate-900 placeholder-slate-500'
              }`}
            />

            {/* Bottom Actions Row inside Input Box */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800/40">
              {/* Attachment Button (+) */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                  className={`p-2 rounded-xl border transition-colors cursor-pointer flex items-center justify-center ${
                    themeMode === 'dark'
                      ? 'bg-slate-800/80 hover:bg-slate-700 border-slate-700 text-slate-200'
                      : 'bg-amber-100 hover:bg-amber-200 border-amber-200 text-slate-800'
                  }`}
                  title="Add attachments or starting point"
                >
                  <Plus className="w-4 h-4" />
                </button>

                {/* Attachment Dropdown Popup Menu (Image 2) */}
                {showAttachmentMenu && (
                  <div className={`absolute bottom-12 left-0 w-64 rounded-2xl border shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150 ${
                    themeMode === 'dark' ? 'bg-[#22252e] border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
                  }`}>
                    <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Add attachments
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAttachmentMenu(false);
                        if (onOpenImport) onOpenImport();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold hover:bg-indigo-600/20 hover:text-indigo-300 flex items-center gap-3 transition-colors cursor-pointer"
                    >
                      <Upload className="w-4 h-4 text-indigo-400" />
                      <span>Upload a file</span>
                    </button>

                    <div className="my-1.5 border-t border-slate-800" />

                    <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Add a starting point
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAttachmentMenu(false);
                        if (onOpenImport) onOpenImport();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold hover:bg-indigo-600/20 hover:text-indigo-300 flex items-center gap-3 transition-colors cursor-pointer"
                    >
                      <span className="w-4 h-4 rounded bg-purple-500/20 text-purple-400 font-bold flex items-center justify-center text-[10px]">🎨</span>
                      <span>Import a Figma design</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setShowAttachmentMenu(false);
                        if (onOpenImport) onOpenImport();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold hover:bg-indigo-600/20 hover:text-indigo-300 flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <FolderDown className="w-4 h-4 text-emerald-400" />
                        <span>Import an existing project</span>
                      </div>
                      <ExternalLink className="w-3 h-3 text-slate-500" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowSkillSubmenu(!showSkillSubmenu)}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold hover:bg-indigo-600/20 hover:text-indigo-300 flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span>Use a skill</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                    </button>

                    {showSkillSubmenu && (
                      <div className="p-2 bg-slate-900/90 rounded-xl mt-1 text-[11px] text-slate-300 space-y-1">
                        <div className="hover:text-white cursor-pointer p-1">⚡ React / Tailwind Full Stack</div>
                        <div className="hover:text-white cursor-pointer p-1">🗄️ PostgreSQL / Express API</div>
                        <div className="hover:text-white cursor-pointer p-1">🤖 Gemini AI Multidisciplinary Agent</div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Right Input Controls: Plan Checkbox, Mic, Send Arrow */}
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1.5 cursor-pointer text-xs font-semibold text-slate-400 hover:text-slate-200 select-none">
                  <input
                    type="checkbox"
                    checked={isPlanChecked}
                    onChange={(e) => setIsPlanChecked(e.target.checked)}
                    className="w-3.5 h-3.5 accent-indigo-600 rounded cursor-pointer"
                  />
                  <span>Plan</span>
                </label>

                <button
                  type="button"
                  onClick={() => alert('Ativando Entrada por Voz... Fale sua ideia!')}
                  className="p-2 text-slate-400 hover:text-slate-200 rounded-lg transition-colors cursor-pointer"
                  title="Voice input"
                >
                  <Mic className="w-4 h-4" />
                </button>

                <button
                  type="submit"
                  disabled={!promptText.trim()}
                  className={`p-2.5 rounded-xl text-white font-bold transition-all shadow-md cursor-pointer disabled:opacity-40 flex items-center justify-center ${
                    themeMode === 'dark'
                      ? 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/30'
                      : 'bg-orange-500 hover:bg-orange-400 shadow-orange-500/30'
                  }`}
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Category Pills (Website, Mobile, Design, Slides, Animation) */}
        <div className="flex items-center justify-center gap-2 w-full overflow-x-auto py-1">
          <button
            type="button"
            className="p-1.5 text-slate-500 hover:text-slate-300 cursor-pointer hidden sm:block"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSel = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 border transition-all cursor-pointer whitespace-nowrap ${
                    isSel
                      ? themeMode === 'dark'
                        ? 'bg-slate-800 border-indigo-500 text-white shadow-md'
                        : 'bg-amber-100 border-orange-400 text-slate-900 shadow-md'
                      : themeMode === 'dark'
                      ? 'bg-[#1a1c23]/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                      : 'bg-white/80 border-slate-200 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSel ? 'text-indigo-400' : 'text-slate-500'}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className="p-1.5 text-slate-500 hover:text-slate-300 cursor-pointer hidden sm:block"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Example Prompt Presets ("Try an example prompt 🔄") */}
        <div className="space-y-3 text-center w-full">
          <div className="text-xs font-semibold text-slate-400 flex items-center justify-center gap-1.5">
            <span>Try an example prompt</span>
            <RotateCw className="w-3.5 h-3.5 text-indigo-400 cursor-pointer hover:rotate-180 transition-transform duration-300" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto">
            {examplePrompts.map((ex, idx) => (
              <button
                key={idx}
                onClick={() => handleExampleClick(ex)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                  themeMode === 'dark'
                    ? 'bg-[#1a1c23] hover:bg-slate-800 border-slate-800 hover:border-slate-700 text-slate-300'
                    : 'bg-white hover:bg-amber-50 border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                {ex}
              </button>
            ))}
          </div>
        </div>

        {/* Ecosystem / Trust Bar (Stripe, Zillow, Plaid, Adobe, Atlassian, Boeing, ClickUp, Coinbase) */}
        <div className="pt-8 border-t border-slate-800/40 w-full text-center">
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">
            Trusted by developers & teams globally
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 opacity-60 grayscale hover:grayscale-0 transition-all">
            {brandLogos.map((brand, idx) => (
              <span key={idx} className="text-xs font-extrabold tracking-tight text-slate-400 font-mono">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
