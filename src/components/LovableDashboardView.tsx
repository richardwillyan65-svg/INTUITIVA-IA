import React, { useState } from 'react';
import { Search, Plus, Mic, ArrowUp, ExternalLink, Sparkles, Folder, Eye, Check, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

import React, { useState } from 'react';
import { Search, Plus, Mic, ArrowUp, ExternalLink, Sparkles, Folder, Eye, Check, Globe, FolderPlus } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { UserSavedProject } from '../types';

interface LovableDashboardViewProps {
  userName?: string;
  onStartBuild: (promptText: string) => void;
  savedProjects?: UserSavedProject[];
}

export const LovableDashboardView: React.FC<LovableDashboardViewProps> = ({
  userName = 'Richard',
  onStartBuild,
  savedProjects = []
}) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'recently_viewed' | 'shared' | 'templates'>('recently_viewed');
  const [promptText, setPromptText] = useState('crie pra mim uma home page');
  const [viewMode, setViewMode] = useState<'prompt_view' | 'recents_dashboard'>(
    savedProjects.length > 0 ? 'recents_dashboard' : 'prompt_view'
  );
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = savedProjects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePromptSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!promptText.trim()) return;
    onStartBuild(promptText);
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto relative font-sans text-slate-100">
      {/* View Switcher Top Toggle Bar */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-black/40 backdrop-blur-md p-1 rounded-full border border-white/20 text-xs font-semibold">
        <button
          onClick={() => setViewMode('prompt_view')}
          className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
            viewMode === 'prompt_view'
              ? 'bg-white text-slate-950 font-bold shadow-md'
              : 'text-white/80 hover:text-white'
          }`}
        >
          Criador IA
        </button>
        {savedProjects.length > 0 && (
          <button
            onClick={() => setViewMode('recents_dashboard')}
            className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
              viewMode === 'recents_dashboard'
                ? 'bg-white text-slate-950 font-bold shadow-md'
                : 'text-white/80 hover:text-white'
            }`}
          >
            Projetos Recentes ({savedProjects.length})
          </button>
        )}
      </div>

      {/* VIEW 1: RECENTLY VIEWED PROJECTS DASHBOARD (ONLY when real projects exist) */}
      {viewMode === 'recents_dashboard' && (
        <div className="flex-1 bg-gradient-to-br from-[#ff5252] via-[#ff7a00] to-[#e040fb] p-6 sm:p-10 flex items-center justify-center min-h-screen">
          <div className="w-full max-w-6xl bg-[#1c1c20] border border-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            {/* Top Toolbar Navigation */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                {/* Search Box */}
                <div className="relative flex-1 md:w-64">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#27272a] text-sm text-slate-100 placeholder-slate-400 pl-9 pr-4 py-2 rounded-xl outline-none border border-slate-700/60 focus:border-amber-500 transition-colors"
                  />
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-1.5 bg-[#27272a] p-1 rounded-xl border border-slate-700/60 text-xs font-semibold">
                  <button
                    onClick={() => setActiveTab('recently_viewed')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      activeTab === 'recently_viewed'
                        ? 'bg-[#18181b] text-white font-bold shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Recently viewed
                  </button>
                  <button
                    onClick={() => setActiveTab('shared')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      activeTab === 'shared'
                        ? 'bg-[#18181b] text-white font-bold shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Shared with me
                  </button>
                  <button
                    onClick={() => setActiveTab('templates')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      activeTab === 'templates'
                        ? 'bg-[#18181b] text-white font-bold shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Lovable templates
                  </button>
                </div>
              </div>

              {/* Browse All Link */}
              <button
                onClick={() => setViewMode('prompt_view')}
                className="text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1 transition-colors cursor-pointer self-end md:self-auto"
              >
                <span>Novo Projeto</span>
                <span>+</span>
              </button>
            </div>

            {/* Project Cards Grid */}
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                {filteredProjects.map((proj) => (
                  <div
                    key={proj.id}
                    onClick={() => onStartBuild(proj.prompt || `Continuar projeto ${proj.title}`)}
                    className="group cursor-pointer space-y-3"
                  >
                    {/* Card Thumbnail Box */}
                    <div className="relative aspect-[16/10] bg-[#27272a] rounded-2xl overflow-hidden border border-slate-800 group-hover:border-slate-600 transition-all shadow-lg group-hover:shadow-2xl">
                      {proj.previewUrl ? (
                        <img
                          src={proj.previewUrl}
                          alt={proj.title}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center p-4 text-center">
                          <Globe className="w-8 h-8 text-indigo-400 mb-2" />
                          <span className="text-xs font-bold text-slate-200">{proj.title}</span>
                        </div>
                      )}

                      {/* Overlay mock preview website header */}
                      <div className="absolute inset-x-0 top-0 bg-slate-950/70 backdrop-blur-sm p-3 text-center border-b border-white/10">
                        <div className="text-[11px] font-black tracking-tight text-white uppercase">
                          {proj.title}
                        </div>
                        {proj.headline && (
                          <div className="text-[10px] text-slate-300 truncate mt-0.5">
                            {proj.headline}
                          </div>
                        )}
                      </div>

                      {/* Published Badge (if applicable) */}
                      {proj.isPublished && (
                        <div className="absolute bottom-3 left-3 bg-[#18181b]/90 text-white text-[11px] font-bold px-3 py-1 rounded-lg border border-slate-700/80 backdrop-blur-md shadow-md flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Published</span>
                        </div>
                      )}
                    </div>

                    {/* Card Footer Info */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-orange-500 text-white font-extrabold flex items-center justify-center text-xs shrink-0 shadow-sm">
                        {userName.charAt(0).toLowerCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors truncate">
                          {proj.title}
                        </h4>
                        <p className="text-xs text-slate-400">
                          {proj.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center space-y-3">
                <FolderPlus className="w-12 h-12 text-slate-500 mx-auto" />
                <h3 className="text-lg font-bold text-white">Nenhum projeto recente encontrado</h3>
                <p className="text-sm text-slate-400">Digite sua ideia no Criador IA para criar seu primeiro projeto de verdade!</p>
                <button
                  onClick={() => setViewMode('prompt_view')}
                  className="px-5 py-2.5 bg-white text-slate-950 font-bold text-xs rounded-xl shadow-lg hover:bg-slate-200 transition-all cursor-pointer"
                >
                  Criar Primeiro Projeto
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW 2: BUILD / PROMPT CREATION SCREEN (EXACTLY MATCHING IMAGE 2) */}
      {viewMode === 'prompt_view' && (
        <div className="flex-1 bg-gradient-to-tr from-[#3b82f6] via-[#8b5cf6] to-[#ec4899] p-6 sm:p-12 flex flex-col items-center justify-center min-h-screen">
          <div className="w-full max-w-2xl text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-[#1c1c20]/90 backdrop-blur-md text-white px-4 py-2 rounded-full border border-white/10 text-xs font-semibold shadow-xl cursor-pointer hover:bg-[#25252b] transition-all">
              <span className="bg-blue-600 text-white font-extrabold text-[10px] uppercase px-2 py-0.5 rounded-full">
                New
              </span>
              <span>Intuitiva IA apps now work in ChatGPT and Claude</span>
              <span className="text-slate-400">→</span>
            </div>

            {/* Main Centered Title */}
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Let's build something, {userName}
            </h1>

            {/* Central Console Box */}
            <form
              onSubmit={handlePromptSubmit}
              className="bg-[#1c1c20] border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-2xl space-y-4 text-left relative"
            >
              <textarea
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                placeholder="crie pra mim uma home page"
                rows={2}
                className="w-full bg-transparent text-white text-base sm:text-lg placeholder-slate-400 outline-none resize-none"
              />

              {/* Console Action Bar */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                {/* Left Attachment Button */}
                <button
                  type="button"
                  onClick={() => alert('Anexar arquivo ou design do Figma')}
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>

                {/* Right Action Controls */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold text-slate-200 cursor-pointer transition-colors">
                    <span>Build</span>
                    <span className="text-slate-400 text-[10px]">⌄</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => alert('Fale sua ideia no microfone')}
                    className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <Mic className="w-4 h-4" />
                  </button>

                  <button
                    type="submit"
                    className="w-9 h-9 rounded-full bg-white hover:bg-slate-200 text-slate-950 flex items-center justify-center shadow-lg transition-transform hover:scale-105 cursor-pointer font-extrabold"
                  >
                    <ArrowUp className="w-5 h-5 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
