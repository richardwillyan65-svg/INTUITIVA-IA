import React, { useState } from 'react';
import {
  Upload,
  Globe,
  FileCode,
  Palette,
  Sparkles,
  Layers,
  CheckCircle2,
  Copy,
  Check,
  RefreshCw,
  Search,
  Eye,
  ArrowRight,
  ShieldAlert,
  Zap,
  Sliders,
  FileArchive,
  Image as ImageIcon
} from 'lucide-react';

interface AnalysisResult {
  analyzedTarget: string;
  styleTheme: string;
  extractedColors: string[];
  typography: { headingFont: string; bodyFont: string };
  detectedStructure: { section: string; components: string[] }[];
  recommendations: string[];
  generatedProjectPrompt: string;
}

export const ImportReferenceStudio: React.FC = () => {
  const [importMode, setImportMode] = useState<'url' | 'media' | 'zip'>('url');
  const [siteUrl, setSiteUrl] = useState('https://exemplo.com.br');
  const [customPrompt, setCustomPrompt] = useState('Inspire-se na estrutura e esquema de cores deste site para criar uma versão moderna, responsiva e otimizada.');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  // Default Analysis Result
  const [analysis, setAnalysis] = useState<AnalysisResult>({
    analyzedTarget: 'https://exemplo.com.br',
    styleTheme: 'Modern Corporate Dark / Cyan & Indigo Accent',
    extractedColors: ['#0f172a', '#00d2ff', '#0072ff', '#a855f7', '#ffffff'],
    typography: {
      headingFont: 'Plus Jakarta Sans (Sans-Serif)',
      bodyFont: 'Inter / System Sans'
    },
    detectedStructure: [
      { section: 'Cabeçalho / Navigation', components: ['Logo do Cliente', 'Links de Menu (Início, Serviços, Sobre, Contato)', 'Botão CTA Primário'] },
      { section: 'Hero Banner Principal', components: ['Headline de Alta Conversão', 'Subtítulo Explicativo', 'Formulário Rápido de Agendamento/Contato'] },
      { section: 'Grade de Soluções / Serviços', components: ['Cards Interativos com Ícones', 'Efeitos de Hover Suaves', 'Links de Detalhes'] },
      { section: 'Depoimentos / Prova Social', components: ['Carrossel de Avaliações', 'Logotipos de Parceiros'] },
      { section: 'Rodapé Institucional', components: ['Mapa do Site', 'Informações de Contato / WhatsApp', 'Copyright & Termos'] }
    ],
    recommendations: [
      'Aumentar o contraste e tamanho dos botões de ação (CTAs).',
      'Implementar transições suaves de entrada com Framer Motion.',
      'Otimizar imagens de fundo para carregamento instantâneo via WebP.',
      'Integrar banco de dados PostgreSQL / Supabase para captura de leads.'
    ],
    generatedProjectPrompt: 'Crie uma aplicação web completa inspirada na referência https://exemplo.com.br, utilizando a paleta de cores [Slate/Cyan/Indigo], cabeçalho fixo, formulários interativos com validação, integração com banco de dados e área administrativa.'
  });

  const handleRunAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/analyze-site-reference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: siteUrl,
          referenceType: importMode === 'url' ? 'Site / URL' : importMode === 'media' ? 'Imagem / Logotipo' : 'Projeto ZIP',
          promptText: customPrompt
        })
      });

      const data = await res.json();
      if (res.ok && data.analyzedTarget) {
        setAnalysis(data);
      }
    } catch (err) {
      console.error('Erro na análise de referência:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopyHex = (colorHex: string) => {
    navigator.clipboard.writeText(colorHex);
    setCopiedColor(colorHex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] bg-slate-950 overflow-y-auto p-6 space-y-6">
      {/* Studio Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl text-indigo-400">
            <Upload className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              Módulo de Referências, Imagens & Importação
              <span className="text-xs font-semibold px-2.5 py-0.5 bg-indigo-500/10 text-indigo-400 rounded-full border border-indigo-500/20">
                Visual AI Inspector
              </span>
            </h2>
            <p className="text-xs text-slate-400 max-w-xl mt-1">
              Envie logotipos, screenshots, documentos ou informe a URL de um site para extrair cores, estrutura e criar um novo projeto original e personalizado.
            </p>
          </div>
        </div>

        {/* Action Trigger */}
        <button
          onClick={handleRunAnalysis}
          disabled={isAnalyzing}
          className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all cursor-pointer disabled:opacity-50"
        >
          {isAnalyzing ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Analisando Elementos Visuais...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Analisar Referência com IA</span>
            </>
          )}
        </button>
      </div>

      {/* Mode Selector Tabs */}
      <div className="flex bg-slate-900 p-1.5 rounded-xl border border-slate-800 max-w-2xl">
        <button
          onClick={() => setImportMode('url')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
            importMode === 'url' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Referência por Site (URL)</span>
        </button>

        <button
          onClick={() => setImportMode('media')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
            importMode === 'media' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span>Imagens, Logo & Specs</span>
        </button>

        <button
          onClick={() => setImportMode('zip')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
            importMode === 'zip' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileArchive className="w-3.5 h-3.5" />
          <span>Importar Projeto (.ZIP / React)</span>
        </button>
      </div>

      {/* Main Workspace Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Inputs */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-400" />
              Configurar Referência
            </h3>

            {importMode === 'url' && (
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1.5">
                  Endereço do Site (URL)
                </label>
                <input
                  type="text"
                  value={siteUrl}
                  onChange={(e) => setSiteUrl(e.target.value)}
                  placeholder="https://exemplo.com.br"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 outline-none focus:border-indigo-500 font-mono"
                />
              </div>
            )}

            {importMode === 'media' && (
              <div className="border-2 border-dashed border-slate-800 hover:border-indigo-500/50 rounded-xl p-6 text-center space-y-2 cursor-pointer bg-slate-950/60 transition-colors">
                <Upload className="w-8 h-8 text-indigo-400 mx-auto" />
                <div className="text-xs font-bold text-slate-200">Arraste ou selecione arquivos</div>
                <div className="text-[10px] text-slate-500">Logotipos, screenshots, wireframes, PDFs, PNG, JPG, SVG</div>
              </div>
            )}

            {importMode === 'zip' && (
              <div className="border-2 border-dashed border-slate-800 hover:border-indigo-500/50 rounded-xl p-6 text-center space-y-2 cursor-pointer bg-slate-950/60 transition-colors">
                <FileArchive className="w-8 h-8 text-indigo-400 mx-auto" />
                <div className="text-xs font-bold text-slate-200">Envie o pacote do projeto (.ZIP)</div>
                <div className="text-[10px] text-slate-500">Suporte a React, Next.js, HTML/CSS, WordPress, Vue</div>
              </div>
            )}

            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1.5">
                Orientações para a Intuitiva IA
              </label>
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                rows={4}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 outline-none focus:border-indigo-500 resize-none leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Right Side: Visual Inspection Results */}
        <div className="lg:col-span-2 space-y-6">
          {/* Palette & Typography Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Palette className="w-4 h-4 text-indigo-400" />
                Paleta de Cores & Estilo Identificados
              </h3>
              <span className="text-[10px] font-semibold px-2.5 py-1 bg-indigo-500/10 text-indigo-300 rounded-lg border border-indigo-500/20">
                {analysis.styleTheme}
              </span>
            </div>

            {/* Extracted Swatches */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                Cores Predominantes Detectadas
              </span>
              <div className="flex flex-wrap gap-3">
                {analysis.extractedColors.map((hex, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleCopyHex(hex)}
                    className="flex items-center gap-2 bg-slate-950 border border-slate-800 hover:border-slate-700 p-2 rounded-xl transition-all cursor-pointer group"
                  >
                    <span
                      className="w-6 h-6 rounded-lg border border-white/10 shrink-0 shadow-sm"
                      style={{ backgroundColor: hex }}
                    />
                    <span className="text-xs font-mono text-slate-200 group-hover:text-indigo-400">{hex}</span>
                    {copiedColor === hex ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400 ml-1" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 ml-1" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Typography Pairing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Fonte de Títulos</span>
                <span className="text-xs font-bold text-white font-sans">{analysis.typography.headingFont}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Fonte de Corpo</span>
                <span className="text-xs font-bold text-white font-sans">{analysis.typography.bodyFont}</span>
              </div>
            </div>
          </div>

          {/* Detected UI Structure */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              Estrutura de Seções e Componentes Mapeados
            </h3>

            <div className="space-y-3">
              {analysis.detectedStructure.map((sec, idx) => (
                <div key={idx} className="p-3.5 bg-slate-950 border border-slate-800/80 rounded-xl space-y-2">
                  <div className="font-bold text-indigo-300 text-xs flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500" />
                    {sec.section}
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {sec.components.map((comp, cIdx) => (
                      <span
                        key={cIdx}
                        className="text-[11px] px-2.5 py-1 bg-slate-900 text-slate-300 rounded-lg border border-slate-800"
                      >
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              Melhorias Recomendadas pela Intuitiva IA
            </h3>

            <ul className="space-y-2 text-xs text-slate-300">
              {analysis.recommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
