import React from 'react';
import {
  Home,
  Plus,
  FolderGit2,
  Globe,
  Upload,
  MessageSquareText,
  Code2,
  Bot,
  Megaphone,
  Network,
  LayoutGrid,
  Layers,
  Sparkles,
  Zap,
  ChevronDown,
  Search,
  Shield,
  Tag,
  Settings,
  BookOpen,
  HelpCircle,
  ArrowUpRight
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userName?: string;
  onOpenUpgrade?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  userName = 'Richardwillyan65',
  onOpenUpgrade
}) => {
  const mainNavItems = [
    { id: 'replit-home', label: 'Home', icon: Home },
    { id: 'webbuilder', label: 'Criador Visual', icon: Globe },
    { id: 'projects', label: 'Projetos Criados', icon: FolderGit2 },
    { id: 'published', label: 'Publicados', icon: Globe },
    { id: 'importref', label: 'Importar / Visão', icon: Upload },
    { id: 'chat', label: 'Chat Multidisciplinar', icon: MessageSquareText },
    { id: 'code', label: 'Code Studio', icon: Code2 },
    { id: 'agents', label: 'Agentes & Workflows', icon: Bot },
    { id: 'marketing', label: 'Marketing & SEO', icon: Megaphone },
    { id: 'architecture', label: 'Arquitetura Cloud', icon: Network },
    { id: 'platforms', label: 'Plataformas & Deploy', icon: Layers },
    { id: 'specialties', label: 'Especialidades', icon: LayoutGrid },
  ];

  return (
    <aside className="w-64 bg-[#16181d] border-r border-slate-800/80 flex flex-col justify-between shrink-0 select-none text-slate-300">
      <div className="p-3 space-y-3 overflow-y-auto">
        {/* Top Workspace Selector (Image 3) */}
        <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 transition-colors cursor-pointer group">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-6 h-6 rounded-md bg-rose-600 flex items-center justify-center font-bold text-white text-[10px] shrink-0">
              R
            </div>
            <div className="text-xs font-bold text-white truncate max-w-[130px]">
              {userName}'s Work...
            </div>
          </div>
          <div className="flex items-center gap-1">
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
            <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-white ml-1" />
          </div>
        </div>

        {/* Primary Action Buttons (Image 3) */}
        <div className="space-y-1.5">
          <button
            onClick={() => setActiveTab('replit-home')}
            className="w-full py-2 px-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-semibold text-white flex items-center gap-2.5 transition-all cursor-pointer shadow-sm"
          >
            <Plus className="w-4 h-4 text-indigo-400" />
            <span>Create something new</span>
          </button>

          <button
            onClick={() => setActiveTab('importref')}
            className="w-full py-2 px-3 bg-slate-900/40 hover:bg-slate-800/80 border border-slate-800/60 rounded-xl text-xs font-semibold text-slate-300 flex items-center gap-2.5 transition-all cursor-pointer"
          >
            <Upload className="w-4 h-4 text-purple-400" />
            <span>Import code or design</span>
          </button>
        </div>

        {/* Navigation Items (Image 3) */}
        <div className="pt-2 space-y-0.5">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-3 cursor-pointer ${
                  isActive
                    ? 'bg-slate-800/90 text-white font-bold border border-slate-700/80'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="my-2 border-t border-slate-800/80" />

        {/* Support & Docs links */}
        <div className="space-y-0.5">
          <button
            onClick={() => setActiveTab('platforms')}
            className="w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 flex items-center gap-3"
          >
            <BookOpen className="w-4 h-4 text-slate-500" />
            <span>Learn & Documentation</span>
          </button>
        </div>
      </div>

      {/* Footer Plan Usage (Image 3 Bottom) */}
      <div className="p-3 border-t border-slate-800/80 bg-[#121316]">
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 space-y-2.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-bold text-slate-300">Your Starter Plan</span>
            <span className="text-[10px] text-emerald-400 font-mono">Ativo</span>
          </div>

          {/* Meter 1: Agent credits */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Agent credits</span>
              <span className="font-mono">0% used</span>
            </div>
            <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
              <div className="bg-indigo-500 h-full w-[2%]" />
            </div>
          </div>

          {/* Meter 2: Cloud credits */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Cloud credits</span>
              <span className="font-mono">0% used</span>
            </div>
            <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
              <div className="bg-cyan-500 h-full w-[1%]" />
            </div>
          </div>

          {/* Upgrade Button */}
          <button
            onClick={onOpenUpgrade}
            className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm shadow-indigo-600/30"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Upgrade</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

