import React, { useState } from 'react';
import { ChevronDown, Plus, Mic, ArrowUp } from 'lucide-react';
import { IntuitivaLogo } from './IntuitivaLogo';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../context/LanguageContext';

interface LovableLandingScreenProps {
  onOpenAuth: (mode: 'login' | 'register', prompt?: string) => void;
  onOpenPricing?: () => void;
}

export const LovableLandingScreen: React.FC<LovableLandingScreenProps> = ({
  onOpenAuth,
  onOpenPricing
}) => {
  const { t } = useLanguage();
  const [promptInput, setPromptInput] = useState('');
  const [buildType, setBuildType] = useState(t('btn_build', 'Construir'));
  const [isBuildDropdownOpen, setIsBuildDropdownOpen] = useState(false);

  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim()) {
      onOpenAuth('register', '');
      return;
    }
    // Pass prompt and open Auth Modal
    onOpenAuth('register', promptInput);
  };

  return (
    <div className="min-h-screen bg-[#0b0d17] text-white flex flex-col relative overflow-hidden font-sans select-none selection:bg-pink-500 selection:text-white">
      {/* Background Mesh Gradient tuned strictly to Intuitiva IA Logo Colors (Cyan, Blue, Magenta, Purple, Pink) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top Dark Vignette */}
        <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-[#07080f] via-[#0b0d17]/90 to-transparent" />

        {/* Ambient Glow Orbs in Logo Colors */}
        {/* Cyan/Blue Glow (Top Left) */}
        <div className="absolute top-[5%] left-[10%] w-[550px] h-[550px] bg-[#00d2ff]/20 rounded-full blur-[150px] animate-pulse" />
        {/* Electric Blue Glow (Top Right) */}
        <div className="absolute top-[20%] right-[8%] w-[600px] h-[600px] bg-[#0055ff]/25 rounded-full blur-[160px]" />
        {/* Hot Pink / Magenta Glow (Bottom Left) */}
        <div className="absolute bottom-[-10%] left-[8%] w-[700px] h-[700px] bg-[#ff00a0]/30 rounded-full blur-[170px]" />
        {/* Violet / Deep Purple Glow (Bottom Right) */}
        <div className="absolute bottom-[-15%] right-[12%] w-[750px] h-[750px] bg-[#6b00d7]/35 rounded-full blur-[180px]" />
        {/* Magenta Accent Center Glow */}
        <div className="absolute bottom-[5%] left-[35%] w-[500px] h-[500px] bg-[#d900ff]/20 rounded-full blur-[140px]" />
      </div>

      {/* Top Header Navigation */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <div className="cursor-pointer" onClick={() => onOpenAuth('register')}>
          <IntuitivaLogo size="md" showText={true} />
        </div>

        {/* Center Nav Items */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-200">
          <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors" onClick={() => onOpenAuth('register')}>
            <span>{t('nav_solutions', 'Soluções')}</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-70" />
          </div>

          <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors" onClick={() => onOpenAuth('register')}>
            <span>{t('nav_resources', 'Recursos')}</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-70" />
          </div>

          <span className="cursor-pointer hover:text-white transition-colors" onClick={() => onOpenAuth('register')}>
            {t('nav_community', 'Comunidade')}
          </span>

          <span className="cursor-pointer hover:text-white transition-colors" onClick={() => onOpenAuth('register')}>
            {t('nav_enterprise', 'Empresarial')}
          </span>

          <span className="cursor-pointer hover:text-white transition-colors" onClick={() => onOpenPricing ? onOpenPricing() : onOpenAuth('register')}>
            {t('nav_pricing', 'Preços')}
          </span>

          <span className="cursor-pointer hover:text-white transition-colors" onClick={() => onOpenAuth('register')}>
            {t('nav_security', 'Segurança')}
          </span>
        </nav>

        {/* Right Buttons: Translator Language Selector + Log in / Get started */}
        <div className="flex items-center gap-3">
          {/* Universal Language Translator Selector */}
          <LanguageSelector compact={true} />

          <button
            onClick={() => onOpenAuth('login')}
            className="px-4 py-2 rounded-xl text-sm font-semibold bg-[#161826]/90 border border-slate-700/80 hover:bg-slate-800 text-slate-100 transition-all cursor-pointer shadow-sm"
          >
            {t('btn_login', 'Entrar')}
          </button>

          <button
            onClick={() => onOpenAuth('register')}
            className="px-4.5 py-2 rounded-xl text-sm font-bold bg-white text-slate-950 hover:bg-slate-100 transition-all cursor-pointer shadow-lg shadow-cyan-500/10"
          >
            {t('btn_signup', 'Começar agora')}
          </button>
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 pt-12 pb-24 text-center">
        <div className="max-w-3xl w-full mx-auto space-y-12">
          {/* Main Titles */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white font-sans drop-shadow-md">
              {t('hero_title', 'Crie com a Intuitiva IA')}
            </h1>
            <p className="text-lg sm:text-xl font-medium text-slate-300/90 tracking-normal">
              {t('hero_subtitle', 'Crie aplicativos e sites completos conversando diretamente com a IA')}
            </p>
          </div>

          {/* Prompt Input Box (Matches Image 1 Center Console) */}
          <form onSubmit={handlePromptSubmit} className="relative max-w-2xl w-full mx-auto">
            <div className="bg-[#181a28]/95 border border-slate-700/80 rounded-[24px] p-4 shadow-2xl backdrop-blur-2xl transition-all focus-within:border-cyan-500/60 text-left space-y-3">
              {/* Input Area */}
              <input
                type="text"
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder={t('hero_placeholder', 'Peça à Intuitiva IA para criar uma landing page para o meu...')}
                className="w-full bg-transparent text-white placeholder-slate-400/80 text-base font-medium outline-none py-1 px-2"
              />

              {/* Bottom Controls Bar */}
              <div className="flex items-center justify-between pt-2">
                {/* Plus attachment button */}
                <button
                  type="button"
                  onClick={() => onOpenAuth('register')}
                  className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <Plus className="w-5 h-5" />
                </button>

                {/* Right Group: Build dropdown, Mic, Submit */}
                <div className="flex items-center gap-3">
                  {/* Build Mode Dropdown */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsBuildDropdownOpen(!isBuildDropdownOpen)}
                      className="flex items-center gap-1 text-xs font-semibold text-slate-300 hover:text-white bg-[#222538] hover:bg-[#2c3048] px-2.5 py-1 rounded-lg border border-slate-700/60 transition-colors cursor-pointer"
                    >
                      <span>{buildType}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </button>

                    {isBuildDropdownOpen && (
                      <div className="absolute right-0 bottom-full mb-2 bg-[#222538] border border-slate-700 rounded-xl shadow-xl p-1.5 text-xs text-slate-200 z-30 min-w-[120px]">
                        <button
                          type="button"
                          onClick={() => { setBuildType(t('btn_build', 'Construir')); setIsBuildDropdownOpen(false); }}
                          className="w-full text-left px-3 py-1.5 hover:bg-slate-700/80 rounded-lg font-medium"
                        >
                          {t('btn_build', 'Construir')}
                        </button>
                        <button
                          type="button"
                          onClick={() => { setBuildType(t('btn_design', 'Design')); setIsBuildDropdownOpen(false); }}
                          className="w-full text-left px-3 py-1.5 hover:bg-slate-700/80 rounded-lg font-medium"
                        >
                          {t('btn_design', 'Design')}
                        </button>
                        <button
                          type="button"
                          onClick={() => { setBuildType(t('btn_plan', 'Planejar')); setIsBuildDropdownOpen(false); }}
                          className="w-full text-left px-3 py-1.5 hover:bg-slate-700/80 rounded-lg font-medium"
                        >
                          {t('btn_plan', 'Planejar')}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Mic Button */}
                  <button
                    type="button"
                    onClick={() => onOpenAuth('register')}
                    className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <Mic className="w-4 h-4" />
                  </button>

                  {/* Send Arrow Button */}
                  <button
                    type="submit"
                    className="p-1.5 bg-white hover:bg-slate-100 text-slate-950 rounded-full shadow-md transition-all cursor-pointer"
                  >
                    <ArrowUp className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>

      {/* Footer minimal info */}
      <footer className="relative z-10 py-6 text-center text-xs text-slate-500 border-t border-slate-800/40">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>{t('footer_rights', '© 2026 Intuitiva IA • Todos os direitos reservados')}</span>
          <div className="flex gap-6 text-slate-400">
            <span className="hover:text-white cursor-pointer" onClick={() => onOpenAuth('register')}>{t('footer_privacy', 'Privacidade')}</span>
            <span className="hover:text-white cursor-pointer" onClick={() => onOpenAuth('register')}>{t('footer_terms', 'Termos')}</span>
            <span className="hover:text-white cursor-pointer" onClick={() => onOpenAuth('register')}>{t('footer_docs', 'Documentação')}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};


