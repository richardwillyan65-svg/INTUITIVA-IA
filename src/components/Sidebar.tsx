import React from 'react';
import {
  LayoutDashboard,
  Search,
  BookOpen,
  Link2,
  FolderKanban,
  Star,
  User,
  Users,
  Clock,
  Gift,
  Plus,
  ChevronDown,
  PanelLeftClose,
  Sparkles,
  Zap,
  Globe,
  Upload,
  MessageSquareText,
  Code2,
  Bot
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { IntuitivaLogo } from './IntuitivaLogo';

import { UserSavedProject } from '../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userName?: string;
  onOpenUpgrade?: () => void;
  onLogout?: () => void;
  savedProjects?: UserSavedProject[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  userName = 'Richard',
  onOpenUpgrade,
  onLogout,
  savedProjects = []
}) => {
  const { t } = useLanguage();

  return (
    <aside className="w-64 bg-[#141416] border-r border-slate-800/80 flex flex-col justify-between shrink-0 select-none text-slate-300 font-sans">
      <div className="p-3 space-y-4 overflow-y-auto">
        {/* Top Header & Workspace Switcher (Matching Image 1 & Image 2) */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-800/60 transition-colors cursor-pointer group flex-1 min-w-0">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-400 flex items-center justify-center text-white text-xs font-black shrink-0 shadow-sm">
              I
            </div>
            <span className="text-sm font-bold text-slate-100 truncate">
              {userName}'s Intuitiva
            </span>
            <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-white shrink-0 ml-auto" />
          </div>

          <button
            title="Recolher menu"
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        </div>

        {/* Primary Workspace Navigation Items */}
        <div className="space-y-0.5">
          <button
            onClick={() => setActiveTab('replit-home')}
            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-3 cursor-pointer ${
              activeTab === 'replit-home'
                ? 'bg-[#222226] text-white font-bold border border-slate-700/60 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-pink-400" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('lovable-dashboard')}
            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
              activeTab === 'lovable-dashboard'
                ? 'bg-[#222226] text-white font-bold border border-slate-700/60 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <div className="flex items-center gap-3">
              <Search className="w-4 h-4 text-slate-400" />
              <span>Search</span>
            </div>
            <span className="text-[10px] font-mono bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700/50">
              Ctrl K
            </span>
          </button>

          <button
            onClick={() => setActiveTab('platforms')}
            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-3 cursor-pointer ${
              activeTab === 'platforms'
                ? 'bg-[#222226] text-white font-bold border border-slate-700/60'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <BookOpen className="w-4 h-4 text-slate-400" />
            <span>Resources</span>
          </button>

          <button
            onClick={() => setActiveTab('specialties')}
            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-3 cursor-pointer ${
              activeTab === 'specialties'
                ? 'bg-[#222226] text-white font-bold border border-slate-700/60'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Link2 className="w-4 h-4 text-slate-400" />
            <span>Connectors</span>
          </button>
        </div>

        {/* Projects Group Section */}
        <div className="pt-2 space-y-1">
          <div className="px-3 text-[11px] font-bold text-slate-400">
            Projects
          </div>

          <div className="space-y-0.5">
            <button
              onClick={() => setActiveTab('lovable-dashboard')}
              className="w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 flex items-center gap-3 cursor-pointer"
            >
              <FolderKanban className="w-4 h-4 text-slate-400" />
              <span>All projects</span>
            </button>

            <button
              onClick={() => setActiveTab('lovable-dashboard')}
              className="w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 flex items-center gap-3 cursor-pointer"
            >
              <Star className="w-4 h-4 text-slate-400" />
              <span>Starred</span>
            </button>

            <button
              onClick={() => setActiveTab('lovable-dashboard')}
              className="w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 flex items-center gap-3 cursor-pointer"
            >
              <User className="w-4 h-4 text-slate-400" />
              <span>Created by me</span>
            </button>

            <button
              onClick={() => setActiveTab('lovable-dashboard')}
              className="w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 flex items-center gap-3 cursor-pointer"
            >
              <Users className="w-4 h-4 text-slate-400" />
              <span>Shared with me</span>
            </button>
          </div>
        </div>

        {/* Recents List Section (ONLY shown when there are real saved projects) */}
        {savedProjects.length > 0 && (
          <div className="pt-2 space-y-1">
            <div className="px-3 text-[11px] font-bold text-slate-400">
              Recents
            </div>

            <div className="space-y-0.5">
              {savedProjects.map((rec) => (
                <button
                  key={rec.id}
                  onClick={() => setActiveTab('webbuilder')}
                  className="w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/40 truncate cursor-pointer block"
                >
                  {rec.title}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>


      {/* Bottom Referral Card & User Avatar (Matching Image 1 & Image 2) */}
      <div className="p-3 border-t border-slate-800/80 space-y-3 bg-[#121214]">
        {/* Referral Box */}
        <div className="bg-[#1a1a1e] border border-slate-800 rounded-2xl p-3 flex items-center justify-between hover:bg-[#202026] transition-colors cursor-pointer group">
          <div className="space-y-0.5">
            <div className="text-xs font-bold text-white">
              Share Intuitiva IA
            </div>
            <div className="text-[10px] text-slate-400">
              100 credits per paid referral
            </div>
          </div>
          <div className="w-7 h-7 rounded-full bg-slate-800 group-hover:bg-indigo-600/30 group-hover:text-indigo-400 text-slate-300 flex items-center justify-center transition-colors">
            <Gift className="w-4 h-4" />
          </div>
        </div>

        {/* User Profile Bar */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center text-sm shrink-0 shadow-sm">
              {userName.charAt(0).toLowerCase()}
            </div>
            <div className="truncate min-w-0">
              <div className="text-xs font-bold text-white truncate">
                {userName}
              </div>
              <div className="text-[10px] text-emerald-400 font-medium">
                Plano Pro
              </div>
            </div>
          </div>

          <button
            onClick={onOpenUpgrade}
            className="p-1.5 text-slate-400 hover:text-amber-400 rounded-lg hover:bg-slate-800 transition-colors"
            title="Upgrade / Créditos"
          >
            <Zap className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};



