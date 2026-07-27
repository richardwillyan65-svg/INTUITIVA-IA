import React from 'react';
import { SPECIALTIES_LIST } from '../data/capabilitiesData';
import {
  LayoutGrid,
  CheckCircle2,
  Code2,
  Server,
  Bot,
  Zap,
  Database,
  Cloud,
  Palette,
  Megaphone,
  Search,
  ShieldCheck,
  BarChart3,
  Sparkles
} from 'lucide-react';

export const CapabilitiesOverview: React.FC = () => {
  const iconMap: Record<string, any> = {
    Layout: Code2,
    Server: Server,
    Layers: Code2,
    Bot: Bot,
    Zap: Zap,
    Database: Database,
    Cloud: Cloud,
    Palette: Palette,
    Megaphone: Megaphone,
    Search: Search,
    ShieldCheck: ShieldCheck,
    BarChart3: BarChart3,
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] bg-slate-950 overflow-y-auto p-6 md:p-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto w-full mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-indigo-600/10 border border-indigo-500/20 rounded-xl text-indigo-400">
            <LayoutGrid className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-white">Matriz de Especialidades - Intuitiva IA</h2>
        </div>
        <p className="text-slate-400 text-sm max-w-3xl">
          Uma equipe multidisciplinar de tecnologia em uma única Inteligência Artificial. Conheça as áreas de atuação direta da Intuitiva IA.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {SPECIALTIES_LIST.map((spec) => {
          const IconComp = iconMap[spec.icon] || Sparkles;
          return (
            <div
              key={spec.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-indigo-500/40 transition-all flex items-start gap-4"
            >
              <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400 shrink-0">
                <IconComp className="w-5 h-5" />
              </div>

              <div>
                <h3 className="font-bold text-white text-sm mb-1">{spec.name}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{spec.desc}</p>
                <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-medium mt-3">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Ativo na Intuitiva IA</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
