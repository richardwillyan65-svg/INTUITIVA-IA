import React, { useState } from 'react';
import { X, Lock, Check, ChevronRight, Sparkles, Shield, User, Key, Mail, ArrowRight } from 'lucide-react';
import { UserProfile } from '../types';
import { IntuitivaLogo } from './IntuitivaLogo';
import { useLanguage } from '../context/LanguageContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
  initialMode?: 'login' | 'register';
  initialPrompt?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialMode = 'register',
  initialPrompt = ''
}) => {
  const { t } = useLanguage();
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeOAuthPopup, setActiveOAuthPopup] = useState<'google' | 'github' | 'apple' | null>(null);
  const [lastUsedProvider, setLastUsedProvider] = useState<'google' | 'github' | 'apple' | 'email'>('google');

  if (!isOpen) return null;

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const username = email.split('@')[0] || 'Richard';
      const user: UserProfile = {
        id: 'usr_' + Math.random().toString(36).substr(2, 9),
        name: username,
        email: email,
        avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${email}`,
        plan: 'Pro',
        credits: 5000,
        isLoggedIn: true
      };

      onLoginSuccess(user);
      onClose();
    }, 700);
  };

  const handleOpenOAuthPopup = (provider: 'google' | 'github' | 'apple') => {
    setActiveOAuthPopup(provider);
    setLastUsedProvider(provider);
  };

  const handleCompleteSocialLogin = (userName: string, userEmail: string, avatarSeed: string) => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setActiveOAuthPopup(null);

      const user: UserProfile = {
        id: 'usr_oauth_' + Math.random().toString(36).substr(2, 8),
        name: userName,
        email: userEmail,
        avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${avatarSeed}`,
        plan: 'Pro',
        credits: 5000,
        isLoggedIn: true
      };

      onLoginSuccess(user);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      {/* Main Container */}
      <div className="bg-[#18181c] text-slate-100 border border-slate-800/90 rounded-3xl max-w-[420px] w-full p-7 shadow-2xl relative overflow-hidden font-sans">
        {/* Top-left Intuitiva IA Logo */}
        <div className="flex items-center justify-between mb-5">
          <IntuitivaLogo size="md" showText={true} />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-slate-800/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Header Title */}
        <div className="space-y-1 mb-6">
          <span className="text-slate-400 font-bold text-lg block tracking-tight">
            {t('auth_subtitle', 'Comece a criar.')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {mode === 'register'
              ? t('auth_create_account', 'Criar conta gratuita')
              : t('auth_login_account', 'Entrar na sua conta')}
          </h2>
        </div>

        {/* Social Authentication Options */}
        <div className="space-y-3 mb-5">
          {/* Google Button */}
          <button
            onClick={() => handleOpenOAuthPopup('google')}
            disabled={isLoading}
            className={`w-full py-3 px-4 bg-[#222227] hover:bg-[#2a2a30] rounded-xl text-sm font-bold text-white flex items-center justify-center gap-3 relative transition-all cursor-pointer ${
              lastUsedProvider === 'google'
                ? 'border-2 border-blue-500 shadow-lg shadow-blue-500/10'
                : 'border border-slate-700/60'
            }`}
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{t('auth_continue_google', 'Continuar com o Google')}</span>

            {lastUsedProvider === 'google' && (
              <span className="absolute -top-3 right-3 bg-blue-600 text-blue-100 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-blue-400 shadow-sm">
                {t('auth_last_used', 'Mais usado')}
              </span>
            )}
          </button>

          {/* GitHub Button */}
          <button
            onClick={() => handleOpenOAuthPopup('github')}
            disabled={isLoading}
            className="w-full py-3 px-4 bg-[#222227] hover:bg-[#2a2a30] border border-slate-700/60 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-3 transition-all cursor-pointer"
          >
            <svg className="w-5 h-5 fill-current shrink-0 text-white" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>{t('auth_continue_github', 'Continuar com o GitHub')}</span>
          </button>

          {/* Apple Button */}
          <button
            onClick={() => handleOpenOAuthPopup('apple')}
            disabled={isLoading}
            className="w-full py-3 px-4 bg-[#222227] hover:bg-[#2a2a30] border border-slate-700/60 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-3 transition-all cursor-pointer"
          >
            <svg className="w-5 h-5 fill-current shrink-0 text-white" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.67-.82 1.12-1.96.99-3.1-.97.04-2.14.65-2.83 1.46-.62.72-1.16 1.88-1.01 3 1.08.08 2.18-.54 2.85-1.36z" />
            </svg>
            <span>{t('auth_continue_apple', 'Continuar com a Apple')}</span>
          </button>
        </div>

        {/* OR Divider */}
        <div className="relative my-6 flex items-center justify-center">
          <div className="w-full border-t border-slate-800" />
          <span className="absolute bg-[#18181c] px-3 text-xs font-bold text-slate-500 uppercase tracking-widest">
            {t('auth_or', 'OU')}
          </span>
        </div>

        {/* Email Form */}
        <form onSubmit={handleAuthSubmit} className="space-y-3">
          <div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="richardwillyan65@gmail.com"
              className="w-full bg-[#222227] border border-slate-700/60 focus:border-cyan-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-white hover:bg-slate-100 text-slate-950 font-extrabold rounded-xl text-sm shadow-md transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <span>{isLoading ? 'Conectando...' : t('auth_continue_email', 'Continuar com E-mail')}</span>
            <ArrowRight className="w-4 h-4 text-slate-900" />
          </button>
        </form>

        {/* Footer info */}
        <p className="text-[11px] text-slate-400 text-center leading-relaxed mt-4">
          Ao continuar, você concorda com os nossos{' '}
          <a href="#" className="underline text-slate-300 hover:text-white">
            Termos de Serviço
          </a>{' '}
          e{' '}
          <a href="#" className="underline text-slate-300 hover:text-white">
            Política de Privacidade
          </a>
          .
        </p>

        {/* Mode Switcher */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 text-center">
          {mode === 'register' ? (
            <p className="text-xs text-slate-400">
              Já possui uma conta?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-cyan-400 font-bold hover:underline cursor-pointer ml-1"
              >
                Entrar
              </button>
            </p>
          ) : (
            <p className="text-xs text-slate-400">
              Ainda não possui uma conta?{' '}
              <button
                type="button"
                onClick={() => setMode('register')}
                className="text-cyan-400 font-bold hover:underline cursor-pointer ml-1"
              >
                Criar conta gratuita
              </button>
            </p>
          )}
        </div>
      </div>

      {/* Real OAuth Interactive Selector Popup Window */}
      {activeOAuthPopup && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-lg flex items-center justify-center p-4 animate-in fade-in zoom-in-95 duration-150">
          <div className="bg-[#1e1e24] border border-slate-700/80 rounded-3xl max-w-[440px] w-full p-6 shadow-2xl relative text-slate-100">
            <button
              onClick={() => setActiveOAuthPopup(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Provider Logo Header */}
            {activeOAuthPopup === 'google' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                  <svg className="w-7 h-7" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <div>
                    <h3 className="text-base font-bold text-white">Fazer login com o Google</h3>
                    <p className="text-xs text-slate-400">Escolha uma conta para continuar na Intuitiva IA</p>
                  </div>
                </div>

                {/* Account list */}
                <div className="space-y-2">
                  <button
                    onClick={() => handleCompleteSocialLogin('Richard W. Silva', 'richardwillyan65@gmail.com', 'richardwillyan65')}
                    className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 transition-colors text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center text-base shrink-0 shadow-md">
                        R
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Richard W. Silva</div>
                        <div className="text-xs text-slate-400">richardwillyan65@gmail.com</div>
                      </div>
                    </div>
                    <Check className="w-4 h-4 text-emerald-400" />
                  </button>

                  <button
                    onClick={() => handleCompleteSocialLogin('Dev Work', 'dev.richard@intuitiva.app', 'devwork')}
                    className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-800/40 hover:bg-slate-700/80 border border-slate-800 transition-colors text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-cyan-600 text-white font-bold flex items-center justify-center text-base shrink-0">
                        I
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Intuitiva Developer</div>
                        <div className="text-xs text-slate-400">dev.richard@intuitiva.app</div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {activeOAuthPopup === 'github' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                  <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <div>
                    <h3 className="text-base font-bold text-white">Autorizar Intuitiva IA no GitHub</h3>
                    <p className="text-xs text-slate-400">Permitir acesso de autenticação e projetos</p>
                  </div>
                </div>

                <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center">
                      RW
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">richardwillyan65</div>
                      <div className="text-xs text-slate-400">Conectado ao GitHub.com</div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCompleteSocialLogin('richardwillyan65', 'richardwillyan65@gmail.com', 'github_richard')}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer shadow-md"
                  >
                    Autorizar Intuitiva IA
                  </button>
                </div>
              </div>
            )}

            {activeOAuthPopup === 'apple' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                  <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.67-.82 1.12-1.96.99-3.1-.97.04-2.14.65-2.83 1.46-.62.72-1.16 1.88-1.01 3 1.08.08 2.18-.54 2.85-1.36z" />
                  </svg>
                  <div>
                    <h3 className="text-base font-bold text-white">Iniciar sessão com o ID Apple</h3>
                    <p className="text-xs text-slate-400">richardwillyan65@gmail.com</p>
                  </div>
                </div>

                <button
                  onClick={() => handleCompleteSocialLogin('Richard (Apple)', 'richardwillyan65@gmail.com', 'apple_richard')}
                  className="w-full py-3 bg-white hover:bg-slate-200 text-slate-950 font-bold rounded-xl text-sm transition-colors cursor-pointer"
                >
                  Continuar com Touch ID / Face ID
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};


