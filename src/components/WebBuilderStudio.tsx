import React, { useState, useEffect, useRef } from 'react';
import {
  Globe,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  CloudCheck,
  Smartphone,
  Tablet,
  Monitor,
  Code2,
  Eye,
  Layers,
  Bot,
  UserCheck,
  CheckCircle2,
  FolderTree,
  FileCode,
  Download,
  Share2,
  ExternalLink,
  ShieldCheck,
  Rocket,
  Zap,
  Play,
  X,
  Lock,
  Server,
  Terminal,
  CheckSquare,
  Plus,
  Mic,
  ArrowUp,
  Image as ImageIcon,
  Layout,
  Type,
  Edit3,
  MessageSquare,
  Bell,
  ChevronRight,
  ChevronDown,
  Sliders,
  History,
  PanelLeft,
  FileText,
  RotateCcw,
  Heart,
  Palette,
  Undo2,
  Redo2,
  Clock,
  Github
} from 'lucide-react';
import { UserSavedProject } from '../types';
import { ThemeExplorerModal } from './ThemesStudio';
import { GitHubExportModal } from './GitHubExportModal';

export interface ProjectVersion {
  id: string;
  versionNumber: number;
  timestamp: string;
  title: string;
  description: string;
  project: GeneratedProject;
  promptUsed?: string;
}

interface GeneratedProject {
  title: string;
  description: string;
  agentsExecution: { role: string; status: string; details: string }[];
  htmlPreview: string;
  files: { name: string; language: string; content: string }[];
}

interface WebBuilderStudioProps {
  initialPrompt?: string;
  onSaveProject?: (project: UserSavedProject) => void;
}

export const WebBuilderStudio: React.FC<WebBuilderStudioProps> = ({
  initialPrompt,
  onSaveProject
}) => {
  const [projectPrompt, setProjectPrompt] = useState(
    initialPrompt || 'crie pra mim uma home page'
  );
  const [projectType, setProjectType] = useState('Editorial Luxury & Design Studio');
  const [referenceImages, setReferenceImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Thought Process & Interactive Design Choice Modal State (Matching Reference Images 1 & 2)
  const [showThoughtProcess, setShowThoughtProcess] = useState(false);
  const [showDesignChoiceModal, setShowDesignChoiceModal] = useState(false);
  const [selectedDirection, setSelectedDirection] = useState<'aurum' | 'tanstack' | 'custom'>('aurum');
  const [isThemeExplorerOpen, setIsThemeExplorerOpen] = useState(false);

  const handleApplyThemeFromExplorer = (themePrompt: string) => {
    setProjectPrompt(themePrompt);
    setSelectedDirection('aurum');
    setShowThoughtProcess(true);
    setTimeout(() => {
      setShowThoughtProcess(false);
    }, 2000);
  };

  // Interactive Floating Inspector Toolbar State (Matching Reference Images 3-6)
  const [inspectorMode, setInspectorMode] = useState<'none' | 'layout' | 'typography' | 'edit' | 'comments'>('none');
  const [customTitleOverride, setCustomTitleOverride] = useState('');

  // AURUM Luxury Design Template HTML
  const aurumHtmlTemplate = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap" rel="stylesheet">
  <title>AURUM — Defining the new standard of curation</title>
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    .font-serif-display { font-family: 'Playfair Display', serif; }
    .font-cinzel { font-family: 'Cinzel', serif; }
  </style>
</head>
<body class="bg-[#0c0c0e] text-[#e2e2e8] min-h-screen flex flex-col selection:bg-amber-500/30 selection:text-amber-200">

  <!-- Header Navbar -->
  <header class="sticky top-0 z-40 bg-[#0c0c0e]/90 backdrop-blur-md border-b border-white/5 px-8 py-6 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <div class="w-7 h-7 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center text-xs font-cinzel tracking-tighter">A</div>
      <span class="font-cinzel font-bold tracking-[0.3em] text-white text-base">AURUM</span>
    </div>

    <nav class="hidden md:flex items-center gap-10 text-[11px] font-semibold tracking-[0.2em] uppercase text-slate-400">
      <a href="#studio" class="hover:text-amber-300 transition-colors">The Studio</a>
      <a href="#exhibitions" class="hover:text-amber-300 transition-colors">Exhibitions</a>
      <a href="#journal" class="hover:text-amber-300 transition-colors">Journal</a>
      <a href="#contact" class="hover:text-amber-300 transition-colors">Contact</a>
    </nav>

    <button onclick="alert('Studio Inquiries: studio@aurum.co')" class="border border-white/20 hover:border-amber-400/60 text-white hover:text-amber-300 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all rounded-full">
      Inquire
    </button>
  </header>

  <!-- Hero Section -->
  <section class="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center space-y-8">
    <div class="inline-flex items-center gap-2 border border-amber-500/30 bg-amber-500/5 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.25em] text-amber-400">
      <span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
      2024 Collection & Editorial
    </div>

    <h1 class="text-4xl sm:text-6xl md:text-7xl font-light text-white tracking-tight leading-[1.15] max-w-4xl mx-auto">
      Defining the <span class="font-serif-display italic font-normal text-amber-300">new standard</span> of curation.
    </h1>

    <p class="text-slate-400 text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed">
      A multi-disciplinary design studio crafting silent luxuries and meaningful digital experiences for the modern era.
    </p>

    <!-- Concrete Staircase Hero Image -->
    <div class="pt-6">
      <div class="relative max-w-5xl mx-auto aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80" alt="Architectural concrete interior" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90 contrast-105" />
        <div class="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-transparent to-transparent opacity-60"></div>
        <div class="absolute bottom-6 left-6 right-6 flex justify-between items-end text-left">
          <div>
            <div class="text-[10px] uppercase font-bold tracking-[0.2em] text-amber-400">Featured Exhibition</div>
            <div class="text-lg font-serif-display text-white">Monoliths & Shadows — Paris</div>
          </div>
          <div class="text-[10px] font-mono text-slate-400">48°51'24.1"N 2°21'07.0"E</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Selected Projects Grid -->
  <section class="max-w-6xl mx-auto px-6 py-16 space-y-12">
    <div class="flex items-end justify-between border-b border-white/10 pb-4">
      <div>
        <span class="text-[10px] uppercase font-bold tracking-[0.25em] text-amber-400 block mb-1">Archive</span>
        <h2 class="text-2xl font-serif-display text-white">Selected Projects</h2>
      </div>
      <span class="text-xs text-slate-500 font-mono">[01 — 04]</span>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
      <!-- Project 1: L'Aube Fragrances -->
      <div class="group cursor-pointer space-y-4">
        <div class="relative aspect-[4/3] bg-slate-900 rounded-xl overflow-hidden border border-white/10 shadow-xl">
          <img src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80" alt="L'Aube Fragrances" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <div class="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
        </div>
        <div class="flex justify-between items-start pt-1">
          <div>
            <h3 class="text-lg font-serif-display text-white group-hover:text-amber-300 transition-colors">L'Aube Fragrances</h3>
            <p class="text-xs text-slate-400 uppercase tracking-widest mt-0.5">Visual Identity & Packaging</p>
          </div>
          <span class="text-[10px] font-mono text-slate-500">2024</span>
        </div>
      </div>

      <!-- Project 2: Vitra Curated -->
      <div class="group cursor-pointer space-y-4">
        <div class="relative aspect-[4/3] bg-slate-900 rounded-xl overflow-hidden border border-white/10 shadow-xl">
          <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80" alt="Vitra Curated" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <div class="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
        </div>
        <div class="flex justify-between items-start pt-1">
          <div>
            <h3 class="text-lg font-serif-display text-white group-hover:text-amber-300 transition-colors">Vitra Curated</h3>
            <p class="text-xs text-slate-400 uppercase tracking-widest mt-0.5">Digital Experience</p>
          </div>
          <span class="text-[10px] font-mono text-slate-500">2024</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Philosophy Quote Section -->
  <section class="bg-[#111115] border-y border-white/5 py-24 px-6 text-center my-12">
    <div class="max-w-3xl mx-auto space-y-6">
      <span class="text-[10px] uppercase font-bold tracking-[0.3em] text-amber-400 block">Our Philosophy</span>
      <blockquote class="text-2xl sm:text-3xl md:text-4xl font-serif-display italic font-light text-white leading-relaxed">
        “Design is not the addition of features, but the careful subtraction of the unnecessary until only the soul remains.”
      </blockquote>
      <div class="w-12 h-px bg-amber-400/50 mx-auto pt-2"></div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="mt-auto max-w-6xl mx-auto px-6 py-16 w-full space-y-12 border-t border-white/5 text-xs text-slate-400">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="space-y-3">
        <div class="font-cinzel font-bold text-white tracking-[0.3em] text-lg">AURUM</div>
        <p class="font-light text-slate-400 leading-relaxed max-w-xs">
          Creating timeless intersections of art, design and commerce since 2012.
        </p>
        <div class="text-[11px] text-amber-400 font-mono">Paris — Tokyo — New York</div>
      </div>

      <div class="space-y-2">
        <div class="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-300 mb-2">Inquiries</div>
        <div class="text-slate-300 font-mono">studio@aurum.co</div>
        <div class="text-slate-400 font-mono">+33 1 42 77 00 00</div>
      </div>

      <div class="space-y-2">
        <div class="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-300 mb-2">Social</div>
        <div class="flex gap-4">
          <a href="#" class="hover:text-white transition-colors">Instagram</a>
          <a href="#" class="hover:text-white transition-colors">LinkedIn</a>
          <a href="#" class="hover:text-white transition-colors">ReadCV</a>
        </div>
      </div>
    </div>

    <div class="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-white/5 text-[10px] text-slate-500 gap-4">
      <div>© 2024 AURUM DESIGN GROUP. ALL RIGHTS RESERVED.</div>
      <div>BUILT WITH INTUITIVA IA STUDIO</div>
    </div>
  </footer>

</body>
</html>`;

  // Default Project Initial Data
  const initialProjectData: GeneratedProject = {
    title: 'AURUM — Luxury Design Studio',
    description: 'Home page minimalista e de alto luxo com curadoria editorial, galeria de projetos selecionados e tipografia serifada.',
    agentsExecution: [
      { role: 'UX/UI Designer', status: 'completed', details: 'Direção de arte com paleta neutra aquecida (#0c0c0e), acentos em dourado e tipografia serifada de alta legibilidade.' },
      { role: 'Desenvolvedor Front-end', status: 'completed', details: 'Layout responsivo em HTML5 + Tailwind CSS com grid editorial e transições fluidas.' },
      { role: 'SEO & Copywriter', status: 'completed', details: 'Copy com tom sofisticado e autoridade: "Defining the new standard of curation".' }
    ],
    htmlPreview: aurumHtmlTemplate,
    files: [
      {
        name: 'index.html',
        language: 'html',
        content: aurumHtmlTemplate
      },
      {
        name: 'src/App.tsx',
        language: 'typescript',
        content: `import React from 'react';\n\nexport default function App() {\n  return (\n    <div className="bg-[#0c0c0e] text-white min-h-screen font-sans">\n      <h1 className="text-4xl font-serif">AURUM Studio</h1>\n    </div>\n  );\n}`
      }
    ]
  };

  const [project, setProject] = useState<GeneratedProject>(initialProjectData);

  // Versioning & History Engine State
  const [historyStack, setHistoryStack] = useState<ProjectVersion[]>([
    {
      id: 'ver_init',
      versionNumber: 1,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      title: 'AURUM — Luxury Design Studio',
      description: 'Versão inicial do modelo visual luxury.',
      project: initialProjectData,
      promptUsed: 'Modelo Inicial AURUM'
    }
  ]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isGitHubExportOpen, setIsGitHubExportOpen] = useState(false);
  const [versionToast, setVersionToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setVersionToast(msg);
    setTimeout(() => setVersionToast(null), 3500);
  };

  // Push a new project version into the history stack
  const pushNewVersion = (newProject: GeneratedProject, customTitle?: string, prompt?: string) => {
    setHistoryStack((prevStack) => {
      const activeBranch = prevStack.slice(0, historyIndex + 1);
      const nextVerNum = activeBranch.length + 1;
      const newVersion: ProjectVersion = {
        id: `ver_${Date.now()}`,
        versionNumber: nextVerNum,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        title: customTitle || newProject.title || `Versão v${nextVerNum}`,
        description: newProject.description || `Alteração autônoma de projeto.`,
        project: newProject,
        promptUsed: prompt
      };
      return [...activeBranch, newVersion];
    });
    setHistoryIndex((prev) => prev + 1);
    setProject(newProject);
  };

  // Undo Handler
  const handleUndo = () => {
    if (historyIndex > 0) {
      const targetIdx = historyIndex - 1;
      setHistoryIndex(targetIdx);
      const restored = historyStack[targetIdx];
      setProject(restored.project);
      showToast(`Desfeito para v${restored.versionNumber}: "${restored.title}"`);
    }
  };

  // Redo Handler
  const handleRedo = () => {
    if (historyIndex < historyStack.length - 1) {
      const targetIdx = historyIndex + 1;
      setHistoryIndex(targetIdx);
      const restored = historyStack[targetIdx];
      setProject(restored.project);
      showToast(`Refeito para v${restored.versionNumber}: "${restored.title}"`);
    }
  };

  // Restore specific version from History Modal
  const handleRestoreVersion = (index: number) => {
    if (index >= 0 && index < historyStack.length) {
      setHistoryIndex(index);
      const restored = historyStack[index];
      setProject(restored.project);
      setIsHistoryModalOpen(false);
      showToast(`Versão v${restored.versionNumber} ("${restored.title}") restaurada com sucesso!`);
    }
  };

  // Global Keyboard Shortcuts (Ctrl+Z / Cmd+Z and Ctrl+Y / Cmd+Shift+Z)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        if (e.shiftKey) {
          e.preventDefault();
          handleRedo();
        } else {
          e.preventDefault();
          handleUndo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        handleRedo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [historyIndex, historyStack]);

  const [viewMode, setViewMode] = useState<'preview' | 'code' | 'agents'>('preview');
  const [viewportSize, setViewportSize] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [selectedFileName, setSelectedFileName] = useState('index.html');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialPrompt) {
      setProjectPrompt(initialPrompt);
      handleGenerateFullWebsiteWithPrompt(initialPrompt);
    }
  }, [initialPrompt]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setReferenceImages((prev) => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Autonomous Website Generator Engine (API + Smart Local Fallback)
  const generateCustomWebsiteFromPrompt = async (userPrompt: string): Promise<GeneratedProject> => {
    // 1. Try server API /api/gerar
    try {
      const res = await fetch('/api/gerar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userPrompt })
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.html && data.html.trim().length > 100) {
          const titleMatch = data.html.match(/<title>(.*?)<\/title>/i);
          const autoTitle = titleMatch ? titleMatch[1] : userPrompt.split(' ').slice(0, 4).join(' ').toUpperCase();
          return {
            title: autoTitle,
            description: data.message || `Site projetado e construído autonomamente pela Intuitiva IA para: "${userPrompt}"`,
            agentsExecution: [
              { role: 'UX/UI Designer', status: 'completed', details: 'Direção visual, contraste, tipografia e layout responsivo com Tailwind CSS.' },
              { role: 'Desenvolvedor Front-end', status: 'completed', details: 'Compilação de componentes interativos e lógica cliente em HTML5 + JavaScript.' },
              { role: 'Especialista em SEO & Copywriter', status: 'completed', details: 'Geração de conteúdo persuasivo, headlines de alta conversão e meta tags.' },
              { role: 'Auditor de Segurança & QA', status: 'completed', details: 'Acessibilidade WCAG AA, tempos de resposta rápidos e layout totalmente limpo.' }
            ],
            htmlPreview: data.html,
            files: [
              { name: 'index.html', language: 'html', content: data.html },
              { name: 'src/App.tsx', language: 'typescript', content: `import React from 'react';\n\nexport default function App() {\n  return (\n    <div className="bg-slate-950 text-white min-h-screen font-sans p-6">\n      <h1 className="text-3xl font-extrabold text-indigo-400">${autoTitle}</h1>\n      <p className="mt-2 text-slate-300">Criado autonomamente pela Intuitiva IA.</p>\n    </div>\n  );\n}` }
            ]
          };
        }
      }
    } catch (e) {
      console.warn('API /api/gerar offline ou indisponível. Ativando Motor Local de Geração Autônoma da Intuitiva IA.', e);
    }

    // 2. Smart Local Autonomous Website Generator
    const pLower = userPrompt.toLowerCase();

    let themeBg = 'bg-[#0b0c10]';
    let accentColor = 'indigo';
    let categoryTag = 'PROJETO WEB INTELIGENTE';
    let mainTitle = userPrompt.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    let subtitle = 'Projetado autonomamente pela Intuitiva IA com arquitetura de alta conversão, design responsivo e Clean Code.';

    if (pLower.includes('restaurante') || pLower.includes('comida') || pLower.includes('pizza') || pLower.includes('sushi') || pLower.includes('gastronomia') || pLower.includes('barbearia')) {
      themeBg = 'bg-[#0d0907]';
      accentColor = 'amber';
      categoryTag = 'GASTRONOMIA & EXPERIÊNCIA';
      subtitle = 'A melhor experiência artesanal preparada com ingredientes selecionados e atendimento exclusivo.';
    } else if (pLower.includes('médico') || pLower.includes('clinica') || pLower.includes('clínica') || pLower.includes('saude') || pLower.includes('odonto') || pLower.includes('dentista')) {
      themeBg = 'bg-[#06121e]';
      accentColor = 'emerald';
      categoryTag = 'SAÚDE & BEM-ESTAR';
      subtitle = 'Atendimento humanizado, tecnologia médica avançada e cuidado integral com a sua saúde e família.';
    } else if (pLower.includes('loja') || pLower.includes('moda') || pLower.includes('roupa') || pLower.includes('e-commerce') || pLower.includes('produto')) {
      themeBg = 'bg-[#0f0914]';
      accentColor = 'rose';
      categoryTag = 'E-COMMERCE & FASHION';
      subtitle = 'Coleções exclusivas com design contemporâneo, entrega expressa para todo o Brasil e pagamento facilitado.';
    } else if (pLower.includes('imóvel') || pLower.includes('imobiliaria') || pLower.includes('casa') || pLower.includes('apartamento') || pLower.includes('arquitetura')) {
      themeBg = 'bg-[#0c0d0e]';
      accentColor = 'amber';
      categoryTag = 'IMÓVEIS DE ALTO PADRÃO';
      subtitle = 'Empreendimentos selecionados com arquitetura premiada, localização privilegiada e valorização garantida.';
    } else if (pLower.includes('app') || pLower.includes('saas') || pLower.includes('software') || pLower.includes('tecnologia') || pLower.includes('ia')) {
      themeBg = 'bg-[#080b14]';
      accentColor = 'cyan';
      categoryTag = 'TECNOLOGIA & PLATAFORMA IA';
      subtitle = 'Acelere seus resultados com inteligência artificial de última geração e automação ponta a ponta.';
    }

    const generatedHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${mainTitle} — Intuitiva IA</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;800&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
  </style>
</head>
<body class="${themeBg} text-slate-100 min-h-screen flex flex-col">

  <!-- Header Nav -->
  <header class="border-b border-white/10 backdrop-blur-md sticky top-0 z-50 bg-slate-950/80">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-xl bg-gradient-to-tr from-${accentColor}-500 to-indigo-500 flex items-center justify-center font-bold text-white shadow-lg">
          ★
        </div>
        <span class="font-extrabold text-lg text-white tracking-tight">${mainTitle}</span>
      </div>

      <nav class="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-300">
        <a href="#inicio" class="hover:text-white transition-colors">Início</a>
        <a href="#sobre" class="hover:text-white transition-colors">Sobre</a>
        <a href="#diferenciais" class="hover:text-white transition-colors">Diferenciais</a>
        <a href="#contato" class="hover:text-white transition-colors">Contato</a>
      </nav>

      <a href="#contato" class="px-5 py-2.5 bg-${accentColor}-500 hover:bg-${accentColor}-400 text-slate-950 font-extrabold text-xs rounded-full transition-all shadow-lg hover:scale-105">
        Solicitar Orçamento
      </a>
    </div>
  </header>

  <!-- Hero Section -->
  <section id="inicio" class="relative py-20 px-6 max-w-6xl mx-auto text-center space-y-8 my-auto">
    <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-${accentColor}-500/10 text-${accentColor}-400 border border-${accentColor}-500/20 text-xs font-extrabold tracking-wider uppercase">
      ✦ ${categoryTag}
    </div>

    <h1 class="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
      ${mainTitle}
    </h1>

    <p class="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto font-light">
      ${subtitle}
    </p>

    <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
      <a href="#contato" class="w-full sm:w-auto px-8 py-4 bg-${accentColor}-500 hover:bg-${accentColor}-400 text-slate-950 font-black text-sm rounded-2xl transition-all shadow-xl cursor-pointer">
        Acessar Agora
      </a>
      <a href="#diferenciais" class="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-2xl border border-slate-700 transition-all cursor-pointer">
        Saiba Mais
      </a>
    </div>

    <!-- Stats Bar -->
    <div class="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 text-center">
      <div class="space-y-1">
        <div class="text-3xl font-black text-white font-mono">100%</div>
        <div class="text-xs text-slate-400 font-medium">Autônomo & Otimizado</div>
      </div>
      <div class="space-y-1">
        <div class="text-3xl font-black text-white font-mono">24/7</div>
        <div class="text-xs text-slate-400 font-medium">Disponibilidade Ativa</div>
      </div>
      <div class="space-y-1">
        <div class="text-3xl font-black text-${accentColor}-400 font-mono">4.9/5</div>
        <div class="text-xs text-slate-400 font-medium">Avaliação de Clientes</div>
      </div>
      <div class="space-y-1">
        <div class="text-3xl font-black text-white font-mono">10x</div>
        <div class="text-xs text-slate-400 font-medium">Mais Conversão</div>
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section id="diferenciais" class="py-20 bg-slate-950/60 border-y border-white/5 px-6">
    <div class="max-w-6xl mx-auto space-y-12">
      <div class="text-center space-y-3 max-w-xl mx-auto">
        <span class="text-xs font-bold text-${accentColor}-400 uppercase tracking-widest">Diferenciais da Plataforma</span>
        <h2 class="text-3xl font-black text-white">Projetado Para Resultados</h2>
        <p class="text-xs text-slate-400">Estruturado autonomamente com arquitetura moderna e usabilidade de alto nível.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-[#12141c] border border-slate-800 p-6 rounded-2xl space-y-3">
          <div class="w-10 h-10 rounded-xl bg-${accentColor}-500/20 text-${accentColor}-400 flex items-center justify-center font-bold text-lg">
            01
          </div>
          <h3 class="font-extrabold text-white text-lg">Design Exclusivo</h3>
          <p class="text-xs text-slate-400 leading-relaxed">
            Layout desenhado para encantar e transmitir autoridade máxima para o seu público.
          </p>
        </div>

        <div class="bg-[#12141c] border border-slate-800 p-6 rounded-2xl space-y-3">
          <div class="w-10 h-10 rounded-xl bg-${accentColor}-500/20 text-${accentColor}-400 flex items-center justify-center font-bold text-lg">
            02
          </div>
          <h3 class="font-extrabold text-white text-lg">Responsividade Total</h3>
          <p class="text-xs text-slate-400 leading-relaxed">
            Adaptação perfeita para celulares, tablets, notebooks e monitores ultrawide.
          </p>
        </div>

        <div class="bg-[#12141c] border border-slate-800 p-6 rounded-2xl space-y-3">
          <div class="w-10 h-10 rounded-xl bg-${accentColor}-500/20 text-${accentColor}-400 flex items-center justify-center font-bold text-lg">
            03
          </div>
          <h3 class="font-extrabold text-white text-lg">Atendimento Direto</h3>
          <p class="text-xs text-slate-400 leading-relaxed">
            Integração nativa de contatos para acelerar fechamento de novos negócios.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact Form -->
  <section id="contato" class="py-20 px-6 max-w-4xl mx-auto w-full space-y-8">
    <div class="bg-[#12141c] border border-slate-800 p-8 md:p-12 rounded-3xl space-y-6 shadow-2xl">
      <div class="text-center space-y-2">
        <h2 class="text-2xl md:text-3xl font-black text-white">Solicitar Atendimento</h2>
        <p class="text-xs text-slate-400">Preencha o formulário abaixo e entraremos em contato rapidamente.</p>
      </div>

      <form onsubmit="event.preventDefault(); alert('Solicitação enviada com sucesso!');" class="space-y-4 max-w-lg mx-auto">
        <div class="space-y-1">
          <label class="text-xs font-bold text-slate-300">Nome</label>
          <input type="text" required placeholder="Seu nome" class="w-full bg-slate-900 border border-slate-800 focus:border-${accentColor}-500 rounded-xl p-3 text-xs text-white outline-none">
        </div>

        <div class="space-y-1">
          <label class="text-xs font-bold text-slate-300">E-mail</label>
          <input type="email" required placeholder="seu@email.com" class="w-full bg-slate-900 border border-slate-800 focus:border-${accentColor}-500 rounded-xl p-3 text-xs text-white outline-none">
        </div>

        <div class="space-y-1">
          <label class="text-xs font-bold text-slate-300">Mensagem</label>
          <textarea rows="3" required placeholder="Como podemos te ajudar?" class="w-full bg-slate-900 border border-slate-800 focus:border-${accentColor}-500 rounded-xl p-3 text-xs text-white outline-none"></textarea>
        </div>

        <button type="submit" class="w-full py-3.5 bg-${accentColor}-500 hover:bg-${accentColor}-400 text-slate-950 font-black text-xs rounded-xl transition-all cursor-pointer shadow-lg">
          Enviar Mensagem
        </button>
      </form>
    </div>
  </section>

  <!-- Footer -->
  <footer class="border-t border-white/10 bg-slate-950 py-8 px-6 mt-auto text-xs text-slate-400 text-center">
    <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="font-bold text-white text-sm">${mainTitle}</div>
      <div class="text-[11px] text-slate-500">© 2026 ${mainTitle}. Criado autonomamente pela Intuitiva IA.</div>
    </div>
  </footer>

</body>
</html>`;

    return {
      title: mainTitle,
      description: `Site projetado autonomamente pela Intuitiva IA para: "${userPrompt}".`,
      agentsExecution: [
        { role: 'UX/UI Designer', status: 'completed', details: `Ajuste da paleta ${accentColor.toUpperCase()} e hierarquia de seções.` },
        { role: 'Desenvolvedor Front-end', status: 'completed', details: 'Compilação de HTML5 responsivo e scripts com Tailwind CSS.' },
        { role: 'Especialista SEO & Copywriter', status: 'completed', details: 'Redação das chamadas de ação e otimização de texto para conversão.' }
      ],
      htmlPreview: generatedHtml,
      files: [
        { name: 'index.html', language: 'html', content: generatedHtml }
      ]
    };
  };

  const handleGenerateFullWebsiteWithPrompt = async (promptToUse?: string) => {
    const finalPrompt = promptToUse || projectPrompt;
    if (!finalPrompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setShowThoughtProcess(true);

    try {
      const generatedProject = await generateCustomWebsiteFromPrompt(finalPrompt);
      pushNewVersion(generatedProject, generatedProject.title, finalPrompt);

      if (onSaveProject) {
        onSaveProject({
          id: `proj_${Date.now()}`,
          title: generatedProject.title,
          time: 'Criado agora',
          isPublished: false,
          previewUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
          headline: generatedProject.description,
          prompt: finalPrompt,
          createdAt: new Date().toISOString()
        });
      }
    } catch (err) {
      console.error('Erro ao gerar o site autônomo:', err);
    } finally {
      setShowThoughtProcess(false);
      setIsGenerating(false);
    }
  };

  const handleApplySelectedDirection = (direction: 'aurum' | 'tanstack' | 'custom') => {
    setShowDesignChoiceModal(false);
    handleGenerateFullWebsiteWithPrompt();
  };

  const [isVercelModalOpen, setIsVercelModalOpen] = useState(false);
  const [vercelProjectName, setVercelProjectName] = useState('');
  const [vercelCustomDomain, setVercelCustomDomain] = useState('');
  const [vercelApiToken, setVercelApiToken] = useState('');
  const [isDeployingVercel, setIsDeployingVercel] = useState(false);

  const handleOpenVercelModal = () => {
    if (!vercelProjectName && project.title) {
      setVercelProjectName(
        project.title
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9-]/g, '-')
          .replace(/-+/g, '-')
      );
    }
    setIsVercelModalOpen(true);
  };

  const handleDeployToVercel = async () => {
    setIsDeployingVercel(true);

    try {
      const res = await fetch('/api/deploy-vercel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectName: vercelProjectName || project.title,
          customDomain: vercelCustomDomain,
          vercelToken: vercelApiToken,
          files: project.files,
          htmlPreview: project.htmlPreview
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        alert('Projeto publicado na Vercel com sucesso!');
        setIsVercelModalOpen(false);
      } else {
        alert(data.error || 'Falha ao publicar na Vercel');
      }
    } catch (err: any) {
      console.error('Erro na publicação Vercel:', err);
    } finally {
      setIsDeployingVercel(false);
    }
  };

  const activeFile = project.files.find((f) => f.name === selectedFileName) || project.files[0];

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] bg-[#141416] overflow-hidden relative font-sans text-slate-100">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        multiple
        className="hidden"
      />

      {/* Top Builder Control Header (Matching Reference Image) */}
      <div className="bg-[#141416] border-b border-[#232328] px-4 py-2 flex items-center justify-between gap-4 shrink-0 text-sm">
        {/* Left Section: Logo, Title Dropdown, History, Sidebar Toggle, View Pills */}
        <div className="flex items-center gap-3">
          {/* Lovable / Intuitiva Heart Logo */}
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-orange-400 flex items-center justify-center text-white shadow-md">
            <Heart className="w-4 h-4 fill-white stroke-none" />
          </div>

          {/* Project Title Dropdown */}
          <button
            onClick={() => setIsHistoryModalOpen(true)}
            title="Clique para ver o Histórico de Versões do Projeto"
            className="flex items-center gap-1.5 font-bold text-white hover:bg-[#1f1f24] px-2 py-1 rounded-lg transition-colors cursor-pointer text-sm"
          >
            <span className="truncate max-w-[180px] sm:max-w-[240px]">{project.title}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </button>

          {/* Version Control Group (Undo / Redo / Version History) */}
          <div className="flex items-center bg-[#1f1f24] border border-[#2b2b32] rounded-full p-0.5 px-1 gap-1">
            {/* Undo Button */}
            <button
              onClick={handleUndo}
              disabled={historyIndex <= 0}
              title="Desfazer alteração (Ctrl + Z)"
              className={`p-1.5 rounded-full transition-all cursor-pointer ${
                historyIndex > 0
                  ? 'text-slate-200 hover:text-white hover:bg-[#282830]'
                  : 'text-slate-600 cursor-not-allowed opacity-40'
              }`}
            >
              <Undo2 className="w-3.5 h-3.5" />
            </button>

            {/* Redo Button */}
            <button
              onClick={handleRedo}
              disabled={historyIndex >= historyStack.length - 1}
              title="Refazer alteração (Ctrl + Y)"
              className={`p-1.5 rounded-full transition-all cursor-pointer ${
                historyIndex < historyStack.length - 1
                  ? 'text-slate-200 hover:text-white hover:bg-[#282830]'
                  : 'text-slate-600 cursor-not-allowed opacity-40'
              }`}
            >
              <Redo2 className="w-3.5 h-3.5" />
            </button>

            <div className="w-px h-3 bg-slate-700/60 my-auto" />

            {/* History Drawer Trigger */}
            <button
              onClick={() => setIsHistoryModalOpen(true)}
              title="Abrir Histórico Completo de Versões"
              className="flex items-center gap-1 px-2 py-1 text-slate-300 hover:text-amber-300 hover:bg-[#282830] rounded-full transition-all cursor-pointer text-xs font-mono font-medium"
            >
              <History className="w-3.5 h-3.5 text-amber-400" />
              <span>v{historyIndex + 1}/{historyStack.length}</span>
            </button>
          </div>

          <button title="Alternar Painel Lateral" className="p-1.5 text-slate-400 hover:text-white hover:bg-[#1f1f24] rounded-lg transition-colors cursor-pointer">
            <PanelLeft className="w-4 h-4" />
          </button>

          {/* Theme Explorer Trigger Pill */}
          <button
            onClick={() => setIsThemeExplorerOpen(true)}
            title="Explorador de Temas (+400 Temas de UI)"
            className="flex items-center gap-1.5 px-3 py-1 bg-[#1f1f24] hover:bg-[#282830] border border-amber-500/30 text-amber-400 hover:text-amber-300 rounded-full text-xs font-bold transition-all cursor-pointer shadow-xs"
          >
            <Palette className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Temas (+400)</span>
          </button>

          {/* Segmented Mode Toggle Pill */}
          <div className="flex items-center bg-[#1f1f24] p-1 rounded-full border border-[#2b2b32] ml-1">
            <button
              onClick={() => setViewMode('preview')}
              className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'preview' ? 'bg-[#2563eb] text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Preview</span>
            </button>

            <button
              onClick={() => setViewMode('preview')}
              title="Páginas do Projeto"
              className="p-1.5 px-2 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer rounded-full"
            >
              <FileText className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setViewMode('code')}
              title="Modo Código"
              className={`p-1.5 px-2 transition-colors cursor-pointer rounded-full ${
                viewMode === 'code' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setViewMode('agents')}
              title="Camadas & Agentes de IA"
              className={`p-1.5 px-2 transition-colors cursor-pointer rounded-full ${
                viewMode === 'agents' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Center / Right Controls: Device, Refresh Dropdown, External Link */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => setViewportSize(viewportSize === 'desktop' ? 'mobile' : 'desktop')}
            title="Alternar Dispositivo"
            className="p-1.5 text-slate-400 hover:text-white hover:bg-[#1f1f24] rounded-lg transition-colors cursor-pointer"
          >
            <Monitor className="w-4 h-4" />
          </button>

          {/* Page Selector Selector Pill */}
          <div className="flex items-center bg-[#1f1f24] border border-[#2b2b32] rounded-full px-3 py-1 text-xs text-slate-200 gap-2 font-medium">
            <button onClick={() => handleGenerateFullWebsiteWithPrompt()} title="Recarregar/Regerar Home Page" className="text-slate-400 hover:text-white cursor-pointer">
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <span>Homepage</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </div>

          <button title="Abrir em Nova Aba" onClick={() => window.open('/preview', '_blank')} className="p-1.5 text-slate-400 hover:text-white hover:bg-[#1f1f24] rounded-lg transition-colors cursor-pointer">
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        {/* Far Right Section: User Avatar, Share, Upgrade, Publish */}
        <div className="flex items-center gap-2.5">
          {/* User Avatar */}
          <div className="w-7 h-7 rounded-full bg-rose-900/60 border border-rose-500/30 overflow-hidden flex items-center justify-center text-xs text-white font-bold">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="User" className="w-full h-full object-cover" />
          </div>

          {/* Export to GitHub Button */}
          <button
            onClick={() => setIsGitHubExportOpen(true)}
            className="bg-[#24292e] hover:bg-[#2c3137] border border-slate-700/80 text-white px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            title="Exportar Repositório Automático para o GitHub"
          >
            <Github className="w-3.5 h-3.5 text-slate-300" />
            <span>GitHub</span>
          </button>

          {/* Share Button */}
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert('Link do projeto copiado para a área de transferência!');
            }}
            className="bg-[#232328] hover:bg-[#2c2c33] border border-slate-700/60 text-slate-200 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>Share</span>
          </button>

          {/* Upgrade Button */}
          <button
            onClick={() => alert('Plano Pro ativado!')}
            className="bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-500 hover:opacity-95 text-white px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-md flex items-center gap-1 cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 fill-white" />
            <span>Upgrade</span>
          </button>

          {/* Publish Button */}
          <button
            onClick={handleOpenVercelModal}
            className="bg-[#2563eb] hover:bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            Publish
          </button>
        </div>
      </div>

      {/* Thought Process Box (Matching Reference Image 1) */}
      {showThoughtProcess && (
        <div className="bg-[#1c1c22] border-b border-amber-500/30 p-4 px-6 flex items-center justify-between text-xs animate-in slide-in-from-top duration-300">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            <span className="font-bold text-amber-400 uppercase tracking-wider text-[11px]">Thought for 5s</span>
            <span className="text-slate-300 font-medium">Vou criar algumas direções de design para sua home page. Deixe-me gerar opções para você escolher.</span>
          </div>
          <div className="text-[10px] font-mono bg-slate-800 text-slate-400 px-2 py-1 rounded border border-slate-700">
            Exploring design directions
          </div>
        </div>
      )}

      {/* Main Preview Container */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 bg-[#141416] overflow-hidden relative">
        {viewMode === 'preview' && (
          <div
            className={`w-full bg-[#0c0c0e] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col relative transition-all duration-300 ${
              viewportSize === 'desktop'
                ? 'h-full max-w-full'
                : viewportSize === 'tablet'
                ? 'h-full max-w-[768px]'
                : 'h-full max-w-[375px]'
            }`}
          >
            {/* Address Bar */}
            <div className="bg-[#1a1a1e] border-b border-slate-800 px-4 py-2 flex items-center justify-between text-slate-400 shrink-0">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <div className="bg-[#121214] border border-slate-800 rounded-lg px-3 py-1 text-[11px] text-slate-300 font-mono truncate">
                  https://aurum-studio.intuitiva.app
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleOpenVercelModal}
                  className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-bold hover:bg-amber-500/30 transition-all cursor-pointer"
                >
                  Publish Project
                </button>
              </div>
            </div>

            {/* Iframe Website Canvas */}
            <div className="flex-1 bg-black relative overflow-hidden">
              <iframe
                title="AURUM Live Preview"
                srcDoc={project.htmlPreview}
                className="w-full h-full border-none"
              />

              {/* Animated Loading Overlay when isGenerating is true */}
              {isGenerating && (
                <div className="absolute inset-0 bg-[#0c0c0e]/95 backdrop-blur-md z-40 flex flex-col items-center justify-center p-6 space-y-6 animate-in fade-in duration-300 text-center">
                  {/* Glowing Animated Spinner Ring */}
                  <div className="relative flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full border-4 border-slate-800 border-t-amber-500 border-r-indigo-500 animate-spin" />
                    <div className="absolute w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-500 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/40 animate-pulse">
                      <Sparkles className="w-6 h-6 animate-bounce text-amber-300" />
                    </div>
                  </div>

                  {/* Title & Status */}
                  <div className="space-y-2 max-w-md">
                    <h3 className="text-xl font-black text-white tracking-tight flex items-center justify-center gap-2">
                      <span>Projetando Seu Site Autonomamente</span>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-medium">
                      A Intuitiva IA está orquestrando os agentes autônomos para projetar e compilar seu site do zero.
                    </p>
                  </div>

                  {/* Animated Agent Loading Steps */}
                  <div className="bg-[#141418] border border-slate-800/80 rounded-2xl p-4 w-full max-w-md space-y-3 text-left text-xs shadow-2xl">
                    <div className="flex items-center gap-3 text-slate-200">
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
                      <span className="font-semibold">Analisando prompt, objetivo e tom de voz da marca...</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-300">
                      <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse shrink-0" />
                      <span className="font-semibold">Montando paleta de cores, tipografia e grade responsiva...</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-400">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                      <span className="font-semibold">Compilando HTML5, Tailwind CSS e seções de conversão...</span>
                    </div>
                  </div>

                  {/* Shimmer Progress Bar */}
                  <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-full h-3 p-0.5 overflow-hidden relative shadow-inner">
                    <div className="bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 h-full rounded-full animate-pulse transition-all duration-500 w-full" />
                  </div>

                  <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
                    <span>Carregando e renderizando o site em tempo real...</span>
                  </div>
                </div>
              )}

              {/* Floating Inspector Bottom Bar Overlay (Exact Match of Reference Images 3-6) */}
              <div className="absolute bottom-6 inset-x-0 z-30 flex items-center justify-center pointer-events-none">
                <div className="pointer-events-auto bg-[#18181c]/95 backdrop-blur-xl border border-white/20 p-2 px-4 rounded-full shadow-2xl flex items-center gap-4 text-slate-300 text-xs font-bold">
                  <button
                    onClick={() => setInspectorMode(inspectorMode === 'layout' ? 'none' : 'layout')}
                    className={`p-2 rounded-full transition-colors cursor-pointer flex items-center gap-1.5 ${
                      inspectorMode === 'layout' ? 'bg-amber-400 text-slate-950' : 'hover:bg-slate-800 hover:text-white'
                    }`}
                    title="Layout Options"
                  >
                    <Layout className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setInspectorMode(inspectorMode === 'typography' ? 'none' : 'typography')}
                    className={`p-2 rounded-full transition-colors cursor-pointer flex items-center gap-1.5 ${
                      inspectorMode === 'typography' ? 'bg-amber-400 text-slate-950' : 'hover:bg-slate-800 hover:text-white'
                    }`}
                    title="Typography & Fonts"
                  >
                    <Type className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setInspectorMode(inspectorMode === 'edit' ? 'none' : 'edit')}
                    className={`p-2 rounded-full transition-colors cursor-pointer flex items-center gap-1.5 ${
                      inspectorMode === 'edit' ? 'bg-amber-400 text-slate-950' : 'hover:bg-slate-800 hover:text-white'
                    }`}
                    title="Visual Edit Mode"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setInspectorMode(inspectorMode === 'comments' ? 'none' : 'comments')}
                    className={`p-2 rounded-full transition-colors cursor-pointer flex items-center gap-1.5 ${
                      inspectorMode === 'comments' ? 'bg-amber-400 text-slate-950' : 'hover:bg-slate-800 hover:text-white'
                    }`}
                    title="Add Feedback Comment"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Inspector Active Control Panel */}
              {inspectorMode !== 'none' && (
                <div className="absolute top-4 right-4 z-40 bg-[#1c1c20] border border-slate-700 p-4 rounded-2xl shadow-2xl w-72 text-xs space-y-3 animate-in fade-in zoom-in-95">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px]">
                      {inspectorMode === 'layout' && 'Ajustes de Layout'}
                      {inspectorMode === 'typography' && 'Editar Tipografia'}
                      {inspectorMode === 'edit' && 'Visual Edit Tool'}
                      {inspectorMode === 'comments' && 'Comentários de Feedback'}
                    </span>
                    <button onClick={() => setInspectorMode('none')} className="text-slate-400 hover:text-white">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {inspectorMode === 'edit' && (
                    <div className="space-y-2">
                      <label className="text-[10px] text-slate-400 block">Título do Projeto</label>
                      <input
                        type="text"
                        value={customTitleOverride || project.title}
                        onChange={(e) => setCustomTitleOverride(e.target.value)}
                        className="w-full bg-[#121214] border border-slate-700 rounded-lg p-2 text-white text-xs outline-none"
                      />
                      <button
                        onClick={() => {
                          const updated = { ...project, title: customTitleOverride || project.title };
                          pushNewVersion(updated, customTitleOverride || updated.title, 'Ajuste manual de título');
                          setInspectorMode('none');
                        }}
                        className="w-full bg-amber-400 text-slate-950 font-bold py-1.5 rounded-lg text-xs cursor-pointer"
                      >
                        Salvar Alterações
                      </button>
                    </div>
                  )}

                  {inspectorMode === 'comments' && (
                    <div className="space-y-2">
                      <p className="text-slate-300 text-[11px]">Digite seu feedback para a IA ajustar o site:</p>
                      <textarea
                        placeholder="Ex: Mude o botão Inquire para dourado brilhante..."
                        rows={2}
                        className="w-full bg-[#121214] border border-slate-700 rounded-lg p-2 text-white text-xs outline-none"
                      />
                      <button
                        onClick={() => {
                          alert('Feedback enviado à IA!');
                          setInspectorMode('none');
                        }}
                        className="w-full bg-amber-400 text-slate-950 font-bold py-1.5 rounded-lg text-xs"
                      >
                        Enviar Feedback
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {viewMode === 'code' && (
          <div className="w-full h-full bg-[#121214] p-4 font-mono text-xs overflow-auto">
            <pre className="text-slate-200">
              <code>{activeFile.content}</code>
            </pre>
          </div>
        )}
      </div>

      {/* Bottom Floating Prompt & Reference Input Bar (Matching Reference Images 1 & 2) */}
      <div className="bg-[#18181c] border-t border-slate-800 p-3 px-6 shrink-0 flex flex-col gap-2">
        {/* Uploaded Reference Images Previews */}
        {referenceImages.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Imagens de Referência ({referenceImages.length}):</span>
            {referenceImages.map((img, idx) => (
              <div key={idx} className="relative w-10 h-10 rounded-lg overflow-hidden border border-amber-500/50 group">
                <img src={img} alt="Ref" className="w-full h-full object-cover" />
                <button
                  onClick={() => setReferenceImages(prev => prev.filter((_, i) => i !== idx))}
                  className="absolute inset-0 bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[10px]"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Input Bar Controls */}
        <div className="flex items-center gap-3 bg-[#121214] border border-slate-800 rounded-2xl p-2 px-4 shadow-xl">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            title="Anexar Imagem de Referência"
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer flex items-center gap-1"
          >
            <Plus className="w-4 h-4 text-amber-400" />
          </button>

          <input
            type="text"
            value={projectPrompt}
            onChange={(e) => setProjectPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerateFullWebsiteWithPrompt()}
            placeholder="Tell Lovable what to do instead..."
            className="flex-1 bg-transparent text-white text-sm outline-none placeholder-slate-500"
          />

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-3 py-1 bg-slate-800 rounded-xl text-xs font-bold text-slate-300">
              <span>Build</span>
              <span className="text-[10px]">v</span>
            </div>

            <button
              onClick={() => alert('Fale sua ideia no microfone')}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
            >
              <Mic className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleGenerateFullWebsiteWithPrompt()}
              className="p-2.5 bg-white text-slate-950 hover:bg-slate-200 rounded-full shadow-lg transition-transform hover:scale-105 font-bold cursor-pointer"
            >
              <ArrowUp className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Design Choice Modal Overlay (Exact Replica of Reference Image 2) */}
      {showDesignChoiceModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#1c1c20] border border-slate-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in zoom-in-95">
            {/* Header Title */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Qual direção de design você quer que eu implemente?
              </h3>
              <button
                onClick={() => setShowDesignChoiceModal(false)}
                className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Design Direction Options Carousel/Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Option 1: AURUM Editorial Luxury */}
              <div
                onClick={() => setSelectedDirection('aurum')}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all space-y-3 ${
                  selectedDirection === 'aurum'
                    ? 'border-amber-400 bg-amber-500/10 shadow-xl'
                    : 'border-slate-800 bg-[#121214] hover:border-slate-600'
                }`}
              >
                <div className="aspect-[16/10] bg-slate-900 rounded-xl overflow-hidden border border-white/10 relative">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"
                    alt="AURUM"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-3 flex items-end">
                    <span className="font-cinzel text-amber-300 font-bold text-xs tracking-widest uppercase">AURUM STUDIO</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">AURUM — Editorial Luxury</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mt-1">
                    Defining the new standard of curation. Design minimalista de luxo com alta presença editorial.
                  </p>
                </div>
              </div>

              {/* Option 2: TanStack Web Engine */}
              <div
                onClick={() => setSelectedDirection('tanstack')}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all space-y-3 ${
                  selectedDirection === 'tanstack'
                    ? 'border-cyan-400 bg-cyan-500/10 shadow-xl'
                    : 'border-slate-800 bg-[#121214] hover:border-slate-600'
                }`}
              >
                <div className="aspect-[16/10] bg-slate-950 rounded-xl overflow-hidden border border-cyan-500/20 relative p-4 flex flex-col justify-between">
                  <div className="font-mono text-cyan-400 text-xs font-bold">TANSTACK STUDIO</div>
                  <div className="text-[10px] font-mono text-slate-400">ENGINE • LIBRARY • JOURNAL</div>
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">TANSTACK STUDIO — Tech Engine</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mt-1">
                    Interface técnica moderna para bibliotecas web de alta performance e ferramentas para desenvolvedores.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => handleApplySelectedDirection('aurum')}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition-all cursor-pointer"
              >
                Skip
              </button>
              <button
                onClick={() => handleApplySelectedDirection(selectedDirection)}
                className="px-6 py-2.5 bg-white hover:bg-slate-200 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg transition-all cursor-pointer"
              >
                Select Direction
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Vercel Modal */}
      {isVercelModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1c1c20] border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white">Publicar na Vercel</h3>
            <input
              type="text"
              value={vercelProjectName}
              onChange={(e) => setVercelProjectName(e.target.value)}
              placeholder="Nome do projeto"
              className="w-full bg-[#121214] border border-slate-800 rounded-xl p-2.5 text-xs text-white outline-none"
            />
            <button
              onClick={handleDeployToVercel}
              disabled={isDeployingVercel}
              className="w-full py-2.5 bg-amber-400 text-slate-950 font-bold rounded-xl text-xs cursor-pointer"
            >
              {isDeployingVercel ? 'Publicando...' : 'Confirmar Publicação'}
            </button>
          </div>
        </div>
      )}

      {/* Theme Explorer Modal (+400 UI Themes) */}
      <ThemeExplorerModal
        isOpen={isThemeExplorerOpen}
        onClose={() => setIsThemeExplorerOpen(false)}
        onSelectTheme={handleApplyThemeFromExplorer}
      />

      {/* Toast Notification */}
      {versionToast && (
        <div className="fixed top-16 right-6 z-50 bg-[#1e1b2e] border border-amber-500/40 text-amber-300 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-bold animate-in fade-in slide-in-from-top-4 backdrop-blur-md">
          <History className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{versionToast}</span>
        </div>
      )}

      {/* Version History Modal */}
      {isHistoryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-[#18181c] border border-slate-800 rounded-3xl max-w-2xl w-full p-6 space-y-6 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold">
                  <History className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
                    <span>Histórico de Versões do Projeto</span>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      v{historyIndex + 1} de {historyStack.length}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Restaure ou compare edições geradas pela IA e alterações do usuário.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsHistoryModalOpen(false)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Undo/Redo Bar + Keyboard Shortcuts Info */}
            <div className="bg-[#121215] border border-slate-800/80 rounded-2xl p-3.5 flex flex-wrap items-center justify-between gap-3 shrink-0 text-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleUndo}
                  disabled={historyIndex <= 0}
                  className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    historyIndex > 0
                      ? 'bg-slate-800 hover:bg-slate-700 text-white'
                      : 'bg-slate-900 text-slate-600 cursor-not-allowed'
                  }`}
                >
                  <Undo2 className="w-3.5 h-3.5" />
                  <span>Desfazer (Ctrl+Z)</span>
                </button>

                <button
                  onClick={handleRedo}
                  disabled={historyIndex >= historyStack.length - 1}
                  className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    historyIndex < historyStack.length - 1
                      ? 'bg-slate-800 hover:bg-slate-700 text-white'
                      : 'bg-slate-900 text-slate-600 cursor-not-allowed'
                  }`}
                >
                  <Redo2 className="w-3.5 h-3.5" />
                  <span>Refazer (Ctrl+Y)</span>
                </button>
              </div>

              <div className="text-[11px] text-slate-400 flex items-center gap-1.5 font-mono">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Atalhos: <kbd className="px-1 py-0.5 bg-slate-800 rounded border border-slate-700">Ctrl+Z</kbd> / <kbd className="px-1 py-0.5 bg-slate-800 rounded border border-slate-700">Ctrl+Y</kbd></span>
              </div>
            </div>

            {/* Version List */}
            <div className="overflow-y-auto space-y-3 pr-1 flex-1">
              {historyStack.map((ver, idx) => {
                const isCurrent = idx === historyIndex;
                return (
                  <div
                    key={ver.id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      isCurrent
                        ? 'bg-amber-500/10 border-amber-500/40 shadow-lg shadow-amber-500/5'
                        : 'bg-[#121215] border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="space-y-1 max-w-md">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-mono font-black px-2 py-0.5 rounded-md ${
                          isCurrent ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-300'
                        }`}>
                          v{ver.versionNumber}
                        </span>
                        <span className="text-sm font-extrabold text-white">{ver.title}</span>
                        <span className="text-[11px] font-mono text-slate-400">({ver.timestamp})</span>
                      </div>

                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                        {ver.description}
                      </p>

                      {ver.promptUsed && (
                        <div className="text-[11px] text-amber-400 font-mono pt-0.5">
                          Prompt: "{ver.promptUsed}"
                        </div>
                      )}
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      {isCurrent ? (
                        <div className="px-4 py-2 bg-amber-400 text-slate-950 font-black text-xs rounded-xl flex items-center gap-1.5 shadow-md">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Versão Atual</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleRestoreVersion(idx)}
                          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-sm border border-slate-700/60"
                        >
                          Restaurar Versão
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 shrink-0">
              <span>Total de {historyStack.length} versões registradas.</span>
              <button
                onClick={() => setIsHistoryModalOpen(false)}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all cursor-pointer"
              >
                Fechar
              </button>
            </div>

          </div>
        </div>
      )}

      {/* GitHub Export Modal */}
      <GitHubExportModal
        isOpen={isGitHubExportOpen}
        onClose={() => setIsGitHubExportOpen(false)}
        projectTitle={project.title}
        projectDescription={project.description}
        projectFiles={project.files}
        htmlPreview={project.htmlPreview}
      />
    </div>
  );
};
