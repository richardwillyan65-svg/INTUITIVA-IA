import React, { useState } from 'react';
import { Shield, ShieldAlert, ShieldCheck, BookOpen, Zap, Globe, PlusCircle, User, LogOut, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { IntuitivaLogo } from './IntuitivaLogo';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../context/LanguageContext';
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
  const { t } = useLanguage();
  const [hasAlerts, setHasAlerts] = useState<boolean>(true);

  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40 shadow-sm">
      <div className="flex items-center gap-3 sm:gap-4">
        <IntuitivaLogo size="md" />

        <div className="hidden sm:block h-6 w-[1px] bg-slate-800" />

        <div className="hidden md:flex items-center gap-3">
          <p className="text-xs text-slate-400 flex items-center gap-2">
            <span className="text-slate-300 font-semibold">{t('system_title', 'Sistema Operacional de Desenvolvimento Web')}</span>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-400 font-medium flex items-center gap-1.5 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Master Core v1.0
            </span>
          </p>
        </div>

        {/* Real-time Permission Health Badge */}
        <div className="relative group">
          <button
            onClick={onOpenBilling}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer border shadow-sm ${
              hasAlerts
                ? 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
            }`}
            title="Diagnóstico de Saúde de Permissões IAM no Google Cloud (Clique para abrir o Troubleshooter)"
          >
            {hasAlerts ? (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="hidden lg:inline font-sans">{t('iam_permissions', 'Permissões IAM')}:</span>
                <span className="text-amber-200">2 Alertas</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="hidden lg:inline font-sans">{t('iam_permissions', 'Permissões IAM')}:</span>
                <span className="text-emerald-300">100% OK</span>
              </>
            )}
          </button>

          {/* IAM Health Hover Quick Inspector Tooltip */}
          <div className="absolute top-full left-0 mt-2 w-80 p-3.5 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none group-hover:pointer-events-auto z-50 text-left space-y-2.5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                <span>Diagnóstico de Permissão IAM</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 font-mono text-[10px] text-indigo-300">
                stalwart-period-m07pf
              </span>
            </div>

            <div className="space-y-1.5 text-[11px]">
              <div className="p-2 bg-slate-950 rounded-xl border border-slate-800/80 space-y-1">
                <div className="flex items-center justify-between text-slate-400 font-semibold text-[10px]">
                  <span>Permissão Faltante Alvo:</span>
                  <span className="text-rose-400 font-bold">ACCESS_DENIED</span>
                </div>
                <code className="block text-amber-300 font-mono text-[10px] truncate">
                  billing.resourceCosts.get
                </code>
              </div>

              <p className="text-slate-300 text-[11px] leading-snug">
                Usuário <strong className="text-white">richardwillyan65@gmail.com</strong> precisa da função <code className="text-indigo-300">roles/billing.viewer</code> para consultar faturamento de recursos.
              </p>
            </div>

            <div className="pt-1 flex items-center justify-between text-[11px] font-bold border-t border-slate-800/80">
              <span className="text-slate-400">Verificar no Troubleshooter</span>
              <span className="text-indigo-400 group-hover:underline flex items-center gap-1">
                Abrir Painel <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Universal Language Translator Selector */}
        <LanguageSelector compact={true} />

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
            <div className="text-[10px] text-slate-400 leading-none">{t('credit_balance', 'Saldo Créditos')}</div>
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
              title={t('logout', 'Sair')}
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
            <span>{t('btn_login', 'Entrar')}</span>
          </button>
        )}

        {/* Prompt Master Direct Action */}
        <button
          onClick={onOpenPromptMaster}
          className="flex items-center gap-2 px-3.5 py-2 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-semibold transition-all cursor-pointer hover:shadow-md hover:shadow-indigo-500/10"
        >
          <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
          <span className="hidden lg:inline">{t('prompt_master', 'PROMPT MESTRE')}</span>
        </button>
      </div>
    </header>
  );
};



