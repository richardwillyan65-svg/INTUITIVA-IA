import React from 'react';
import { Shield, BookOpen, Zap, Globe, PlusCircle, User, LogOut } from 'lucide-react';
import { IntuitivaLogo } from './IntuitivaLogo';
import { UserProfile } from '../types';

interface HeaderProps {
  onOpenPromptMaster: () => void;
  onOpenBilling?: () => void;
  onOpenAuth?: () => void;
  user?: UserProfile | null;
  onLogout?: () => void;
  activeTab: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenPromptMaster,
  onOpenBilling,
  onOpenAuth,
  user,
  onLogout,
  activeTab
}) => {
  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800/80 px-6 flex items-center justify-between sticky top-0 z-40 shadow-sm">
      <div className="flex items-center gap-4">
        <IntuitivaLogo size="md" />

        <div className="hidden sm:block h-6 w-[1px] bg-slate-800" />

        <div className="hidden md:block">
          <p className="text-xs text-slate-400 flex items-center gap-2">
            <span className="text-slate-300 font-semibold">Sistema Operacional de Desenvolvimento Web</span>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-400 font-medium flex items-center gap-1.5 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Master Core v1.0
            </span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Credits Balance & Plan Button */}
        <button
          onClick={onOpenBilling}
          className="flex items-center gap-2 px-3 py-1.5 bg-slate-950/80 hover:bg-slate-800/80 text-slate-200 border border-slate-800 rounded-xl text-xs font-semibold transition-all cursor-pointer group"
          title="Gestão de Créditos, Domínios e Hospedagem"
        >
          <div className="p-1 bg-amber-500/10 rounded-lg text-amber-400 group-hover:bg-amber-500/20">
            <Zap className="w-3.5 h-3.5 fill-amber-400" />
          </div>
          <div className="text-left">
            <div className="text-[10px] text-slate-400 leading-none">Saldo Créditos</div>
            <div className="text-xs font-bold text-amber-300">
              {user?.credits ? user.credits.toLocaleString('pt-BR') : '2.500'} CR
            </div>
          </div>
          <PlusCircle className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 ml-1" />
        </button>

        {/* User Auth Section */}
        {user?.isLoggedIn ? (
          <div className="flex items-center gap-2 pl-1 border-l border-slate-800">
            <div className="flex items-center gap-2.5 px-3 py-1 bg-slate-950 border border-slate-800 rounded-xl">
              <img
                src={user.avatarUrl || `https://api.dicebear.com/7.x/bottts/svg?seed=${user.email}`}
                alt={user.name}
                className="w-6 h-6 rounded-lg bg-indigo-600/20 border border-indigo-500/30 shrink-0"
              />
              <div className="text-left hidden sm:block">
                <div className="text-xs font-bold text-white leading-none truncate max-w-[100px]">{user.name}</div>
                <div className="text-[9px] text-indigo-400 font-semibold">{user.plan}</div>
              </div>
            </div>
            <button
              onClick={onLogout}
              title="Sair da Conta"
              className="p-2 text-slate-400 hover:text-rose-400 bg-slate-950 border border-slate-800 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-2 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md shadow-indigo-600/20"
          >
            <User className="w-3.5 h-3.5" />
            <span>Entrar / Cadastrar</span>
          </button>
        )}

        {/* Prompt Master Direct Action */}
        <button
          onClick={onOpenPromptMaster}
          className="flex items-center gap-2 px-3.5 py-2 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-semibold transition-all cursor-pointer hover:shadow-md hover:shadow-indigo-500/10"
        >
          <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
          <span className="hidden lg:inline">PROMPT MESTRE</span>
        </button>
      </div>
    </header>
  );
};


