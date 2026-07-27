import React, { useState } from 'react';
import {
  X,
  Mail,
  Lock,
  User,
  ArrowRight,
  Github,
  Zap,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  KeyRound,
  Chrome
} from 'lucide-react';
import { IntuitivaLogo } from './IntuitivaLogo';
import { UserProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const user: UserProfile = {
        id: 'usr_' + Math.random().toString(36).substr(2, 9),
        name: name || (email ? email.split('@')[0] : 'Desenvolvedor Intuitivo'),
        email: email || 'dev@intuitiva.app',
        avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${email || 'dev'}`,
        plan: mode === 'register' ? 'Gratuito' : 'Pro',
        credits: mode === 'register' ? 2500 : 5000,
        isLoggedIn: true
      };

      setSuccessMsg(
        mode === 'register'
          ? 'Conta criada com sucesso! +2.500 Créditos foram creditados na sua conta.'
          : 'Login realizado com sucesso! Bem-vindo de volta.'
      );

      setTimeout(() => {
        onLoginSuccess(user);
        onClose();
        setSuccessMsg('');
      }, 1200);
    }, 800);
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const user: UserProfile = {
        id: 'usr_social_' + Math.random().toString(36).substr(2, 7),
        name: `Dev (${provider})`,
        email: `dev.${provider.toLowerCase()}@intuitiva.app`,
        avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${provider}`,
        plan: 'Pro',
        credits: 3500,
        isLoggedIn: true
      };
      onLoginSuccess(user);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        {/* Glow Header Accent */}
        <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Logo & Header Title */}
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-3">
              <IntuitivaLogo size="lg" showText={false} />
            </div>
            <h3 className="text-xl font-black text-white tracking-tight">
              {mode === 'login' && 'Acessar Intuitiva IA'}
              {mode === 'register' && 'Criar Conta Gratuitamente'}
              {mode === 'forgot' && 'Recuperar Acesso'}
            </h3>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              {mode === 'login' && 'Entre na sua conta para acessar seus projetos, créditos e agentes de IA.'}
              {mode === 'register' && 'Ganhe +2.500 Créditos Iniciais para criar, editar e publicar seus projetos.'}
              {mode === 'forgot' && 'Digite seu e-mail para receber o link seguro de redefinição de senha.'}
            </p>
          </div>

          {/* Success Message Banner */}
          {successMsg && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-300 text-xs font-semibold flex items-center gap-2.5 animate-pulse">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Social Logins */}
          {mode !== 'forgot' && (
            <div className="space-y-2.5">
              <button
                onClick={() => handleSocialLogin('Google')}
                className="w-full py-2.5 px-4 bg-slate-950 hover:bg-slate-800/80 border border-slate-800 rounded-xl text-xs font-bold text-slate-200 flex items-center justify-center gap-3 transition-colors cursor-pointer"
              >
                <Chrome className="w-4 h-4 text-blue-400" />
                <span>Continuar com Google</span>
              </button>

              <button
                onClick={() => handleSocialLogin('GitHub')}
                className="w-full py-2.5 px-4 bg-slate-950 hover:bg-slate-800/80 border border-slate-800 rounded-xl text-xs font-bold text-slate-200 flex items-center justify-center gap-3 transition-colors cursor-pointer"
              >
                <Github className="w-4 h-4 text-purple-400" />
                <span>Continuar com GitHub</span>
              </button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-800" />
                </div>
                <div className="relative flex justify-center text-[10px] uppercase font-bold text-slate-500 bg-slate-900 px-3">
                  Ou com e-mail corporativo
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">
                  Nome Completo
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white outline-none transition-colors"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">
                E-mail
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white outline-none transition-colors"
                />
              </div>
            </div>

            {mode !== 'forgot' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-bold text-slate-300">
                    Senha
                  </label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => setMode('forgot')}
                      className="text-[10px] text-indigo-400 hover:underline cursor-pointer"
                    >
                      Esqueceu a senha?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white outline-none transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Submit Action */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer disabled:opacity-50 mt-2"
            >
              {isLoading ? (
                <span>Autenticando...</span>
              ) : (
                <>
                  <span>
                    {mode === 'login' && 'Entrar na Plataforma'}
                    {mode === 'register' && 'Criar Minha Conta (+2.500 CR)'}
                    {mode === 'forgot' && 'Enviar E-mail de Recuperação'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer Mode Switcher */}
          <div className="pt-2 text-center border-t border-slate-800/80">
            {mode === 'login' ? (
              <p className="text-xs text-slate-400">
                Não tem uma conta?{' '}
                <button
                  onClick={() => setMode('register')}
                  className="text-indigo-400 font-bold hover:underline cursor-pointer"
                >
                  Criar conta com +2.500 Créditos
                </button>
              </p>
            ) : (
              <p className="text-xs text-slate-400">
                Já possui uma conta?{' '}
                <button
                  onClick={() => setMode('login')}
                  className="text-indigo-400 font-bold hover:underline cursor-pointer"
                >
                  Fazer login
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
