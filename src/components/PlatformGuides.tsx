import React from 'react';
import { PLATFORMS_GUIDE } from '../data/capabilitiesData';
import { Layers, Sparkles, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const PlatformGuides: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] bg-slate-950 overflow-y-auto p-6 md:p-8">
      {/* Header Banner */}
      <div className="max-w-6xl mx-auto w-full mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-indigo-600/10 border border-indigo-500/20 rounded-xl text-indigo-400">
            <Layers className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-white">Guia de Plataformas & Ecossistema</h2>
        </div>
        <p className="text-slate-400 text-sm max-w-3xl">
          A **Intuitiva IA** foi projetada para gerar soluções sob medida perfeitamente compatíveis com as principais plataformas do ecossistema de tecnologia moderno.
        </p>
      </div>

      {/* Grid of Platforms */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PLATFORMS_GUIDE.map((platform) => (
          <div
            key={platform.id}
            className="bg-slate-900 border border-slate-800 hover:border-indigo-500/40 rounded-2xl p-6 transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold">
                    {platform.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">{platform.name}</h3>
                    <span className="text-[11px] text-slate-400 font-medium">{platform.category}</span>
                  </div>
                </div>
                <span className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  {platform.badge}
                </span>
              </div>

              <p className="text-slate-300 text-xs leading-relaxed mb-4">{platform.description}</p>

              <div className="space-y-2 mb-6">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Recursos Domínio:</span>
                {platform.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3">
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block mb-1">Workflow Recomendado</span>
              <p className="text-[11px] text-slate-400 leading-relaxed">{platform.recommendedWorkflow}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
