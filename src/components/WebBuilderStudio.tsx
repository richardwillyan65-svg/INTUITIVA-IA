import React, { useState, useEffect } from 'react';
import {
  Globe,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
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
  CheckSquare
} from 'lucide-react';

interface GeneratedProject {
  title: string;
  description: string;
  agentsExecution: { role: string; status: string; details: string }[];
  htmlPreview: string;
  files: { name: string; language: string; content: string }[];
}

interface WebBuilderStudioProps {
  initialPrompt?: string;
}

export const WebBuilderStudio: React.FC<WebBuilderStudioProps> = ({ initialPrompt }) => {
  const [projectPrompt, setProjectPrompt] = useState(
    initialPrompt || 'Crie um site para uma clínica médica moderna com agendamento online, corpo clínico, depoimentos de pacientes e área de login.'
  );
  const [projectType, setProjectType] = useState('Site Institucional + Agendamento');

  useEffect(() => {
    if (initialPrompt) {
      setProjectPrompt(initialPrompt);
      // Automatically trigger generation for new prompt
      handleGenerateFullWebsiteWithPrompt(initialPrompt);
    }
  }, [initialPrompt]);

  const handleGenerateFullWebsiteWithPrompt = async (promptToUse?: string) => {
    const finalPrompt = promptToUse || projectPrompt;
    if (!finalPrompt.trim() || isGenerating) return;

    setIsGenerating(true);
    try {
      const res = await fetch('/api/generate-full-website', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: finalPrompt,
          projectType,
        }),
      });

      const data = await res.json();
      if (res.ok && data.title && data.htmlPreview) {
        setProject(data);
        if (data.files && data.files.length > 0) {
          setSelectedFileName(data.files[0].name);
        }
      } else {
        throw new Error(data.error || 'Falha ao obter projeto completo');
      }
    } catch (err: any) {
      console.error('Erro ao gerar projeto completo:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const [isVercelModalOpen, setIsVercelModalOpen] = useState(false);
  const [vercelProjectName, setVercelProjectName] = useState('');
  const [vercelCustomDomain, setVercelCustomDomain] = useState('');
  const [vercelApiToken, setVercelApiToken] = useState('');
  const [isDeployingVercel, setIsDeployingVercel] = useState(false);
  const [vercelDeploymentResult, setVercelDeploymentResult] = useState<any>(null);

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
    setVercelDeploymentResult(null);

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
        setVercelDeploymentResult(data);
      } else {
        throw new Error(data.error || 'Falha ao publicar na Vercel');
      }
    } catch (err: any) {
      console.error('Erro na publicação Vercel:', err);
    } finally {
      setIsDeployingVercel(false);
    }
  };

  const [viewMode, setViewMode] = useState<'preview' | 'code' | 'agents'>('preview');
  const [viewportSize, setViewportSize] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [selectedFileName, setSelectedFileName] = useState('src/App.tsx');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  // Initial Demo Generated Project State (Clínica Médica)
  const [project, setProject] = useState<GeneratedProject>({
    title: 'Clínica Médica Intuitiva Health',
    description: 'Plataforma web completa para clínica médica com agendamento online, apresentação do corpo clínico, especialidades e portal do paciente.',
    agentsExecution: [
      { role: 'UX/UI Designer', status: 'completed', details: 'Design System responsivo criado com tons azul-médico, tipografia serifada elegante e espaçamento generoso.' },
      { role: 'Desenvolvedor Front-end', status: 'completed', details: 'Página inicial com formulário de agendamento interativo, seções de especialidades e depoimentos em React + Tailwind CSS.' },
      { role: 'Desenvolvedor Back-end', status: 'completed', details: 'API Express com rotas POST /api/appointments para recepção e confirmação automática de consultas.' },
      { role: 'Especialista em Banco de Dados', status: 'completed', details: 'Tabelas SQL PostgreSQL: doctors, patients, appointments e medical_records com relacionamentos.' },
      { role: 'SEO & Copywriter', status: 'completed', details: 'Copy de alta autoridade, meta tags OpenGraph e marcação Schema.org para MedicalClinic.' },
      { role: 'Auditor de Segurança', status: 'completed', details: 'Conformidade LGPD para dados de saúde, criptografia de tokens e sanitização de formulários.' },
    ],
    htmlPreview: `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
  <title>Clínica Médica Intuitiva Health</title>
</head>
<body class="bg-slate-950 text-slate-100 font-sans antialiased min-h-screen flex flex-col">

  <!-- Navigation -->
  <nav class="bg-slate-900 border-b border-slate-800 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
    <div class="flex items-center gap-2">
      <div class="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-lg">🏥</div>
      <span class="font-bold text-lg text-white">Intuitiva Health</span>
    </div>
    <div class="hidden md:flex gap-6 text-sm text-slate-300">
      <a href="#especialidades" class="hover:text-indigo-400">Especialidades</a>
      <a href="#medicos" class="hover:text-indigo-400">Corpo Médico</a>
      <a href="#depoimentos" class="hover:text-indigo-400">Depoimentos</a>
      <a href="#contato" class="hover:text-indigo-400">Contato</a>
    </div>
    <button onclick="alert('Iniciando Agendamento Online...')" class="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-4 py-2 rounded-lg cursor-pointer transition-colors">
      Agendar Consulta
    </button>
  </nav>

  <!-- Hero Section -->
  <section class="py-16 px-6 text-center bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800/80">
    <span class="text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 inline-block mb-4">
      Atendimento Médico de Excelência
    </span>
    <h1 class="text-3xl md:text-5xl font-extrabold text-white mb-4 max-w-3xl mx-auto leading-tight">
      Sua Saúde Integrada com Tecnologia e Cuidado Humano
    </h1>
    <p class="text-slate-400 text-sm md:text-base max-w-2xl mx-auto mb-8">
      Consultas presenciais e telemedicina com especialistas renomados. Agendamento simplificado em menos de 1 minuto.
    </p>

    <!-- Quick Booking Form Box -->
    <div class="max-w-xl mx-auto bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl text-left">
      <h3 class="font-bold text-white text-sm mb-4 text-center">Agendamento Rápido</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        <div>
          <label class="text-[11px] text-slate-400 block mb-1">Especialidade</label>
          <select class="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 outline-none">
            <option>Cardiologia</option>
            <option>Dermatologia</option>
            <option>Ortopedia</option>
            <option>Pediatria</option>
          </select>
        </div>
        <div>
          <label class="text-[11px] text-slate-400 block mb-1">Data Desejada</label>
          <input type="date" class="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 outline-none" />
        </div>
      </div>
      <button onclick="alert('Consulta Solicitada com Sucesso!')" class="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl text-xs transition-colors">
        Confirmar Pré-Agendamento
      </button>
    </div>
  </section>

  <!-- Specialties Grid -->
  <section id="especialidades" class="py-12 px-6 max-w-5xl mx-auto">
    <h2 class="text-xl font-bold text-white mb-6 text-center">Nossas Especialidades Médicas</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-slate-900 border border-slate-800 p-5 rounded-xl hover:border-indigo-500/40 transition-colors">
        <div class="text-2xl mb-2">🫀</div>
        <h4 class="font-bold text-white text-sm mb-1">Cardiologia</h4>
        <p class="text-slate-400 text-xs">Exames preventivos, eletrocardiograma e acompanhamento cardíaco completo.</p>
      </div>
      <div class="bg-slate-900 border border-slate-800 p-5 rounded-xl hover:border-indigo-500/40 transition-colors">
        <div class="text-2xl mb-2">🩺</div>
        <h4 class="font-bold text-white text-sm mb-1">Clínica Geral</h4>
        <p class="text-slate-400 text-xs">Diagnóstico global, exames de rotina e orientação continuada.</p>
      </div>
      <div class="bg-slate-900 border border-slate-800 p-5 rounded-xl hover:border-indigo-500/40 transition-colors">
        <div class="text-2xl mb-2">🧴</div>
        <h4 class="font-bold text-white text-sm mb-1">Dermatologia</h4>
        <p class="text-slate-400 text-xs">Tratamentos estéticos, prevenção de lesões e saúde da pele.</p>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="mt-auto bg-slate-900 border-t border-slate-800 py-6 text-center text-xs text-slate-500">
    © 2026 Clínica Intuitiva Health. Desenvolvido automaticamente pela Intuitiva IA.
  </footer>

</body>
</html>`,
    files: [
      {
        name: 'index.html',
        language: 'html',
        content: `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Clínica Médica Intuitiva Health</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`
      },
      {
        name: 'src/App.tsx',
        language: 'typescript',
        content: `import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Specialties } from './components/Specialties';
import { BookingModal } from './components/BookingModal';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar onOpenBooking={() => setIsBookingOpen(true)} />
      <Hero onOpenBooking={() => setIsBookingOpen(true)} />
      <Specialties />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}`
      },
      {
        name: 'src/components/BookingModal.tsx',
        language: 'typescript',
        content: `import React, { useState } from 'react';

export const BookingModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-slate-950/80 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full">
        <h3 className="text-lg font-bold text-white mb-4">Agendar Consulta Médica</h3>
        <p className="text-xs text-slate-400 mb-4">Selecione o médico e o horário para atendimento presencial ou telemedicina.</p>
        <button onClick={onClose} className="w-full bg-indigo-600 text-white font-bold py-2.5 rounded-xl text-xs">
          Fechar
        </button>
      </div>
    </div>
  );
};`
      },
      {
        name: 'src/server/api.ts',
        language: 'typescript',
        content: `import express from 'express';
const router = express.Router();

router.post('/appointments', (req, res) => {
  const { patientName, doctorId, date } = req.body;
  res.json({
    success: true,
    appointmentId: 'apt_' + Date.now(),
    message: 'Consulta agendada com sucesso via Intuitiva IA Backend'
  });
});

export default router;`
      },
      {
        name: 'src/db/schema.sql',
        language: 'sql',
        content: `CREATE TABLE doctors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  specialty VARCHAR(100) NOT NULL,
  crm VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id UUID REFERENCES doctors(id),
  patient_name VARCHAR(255) NOT NULL,
  patient_phone VARCHAR(50) NOT NULL,
  appointment_date TIMESTAMP WITH TIME ZONE NOT NULL,
  status VARCHAR(20) DEFAULT 'scheduled'
);`
      }
    ]
  });

  const handleGenerateFullWebsite = async () => {
    await handleGenerateFullWebsiteWithPrompt(projectPrompt);
  };

  const handleCopyCode = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const quickPresets = [
    { label: 'Clínica Médica com Agendamento', prompt: 'Crie um site para uma clínica médica moderna com agendamento online, apresentação do corpo clínico e depoimentos.' },
    { label: 'E-commerce de Moda & Acessórios', prompt: 'Crie uma loja virtual de moda com vitrine de produtos, carrinho de compras, cálculo de frete e checkout seguro.' },
    { label: 'Landing Page SaaS & Tabela de Preços', prompt: 'Crie uma landing page de alta conversão para um software SaaS com prova social, tabela de preços e FAQ.' },
    { label: 'Dashboard ERP de Vendas', prompt: 'Crie um painel administrativo de gestão de vendas com gráficos, métricas financeiras e lista de pedidos.' },
  ];

  const activeFile = project.files.find((f) => f.name === selectedFileName) || project.files[0];

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] bg-slate-950 overflow-hidden">
      {/* Top Builder Control Header */}
      <div className="bg-slate-900 border-b border-slate-800 p-4 px-6 flex flex-wrap items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-tr from-indigo-600 to-blue-600 rounded-xl text-white shadow-lg shadow-indigo-500/20">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              Intuitiva IA — Criador Visual de Sites & Apps
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-semibold">
                Lovable / Replit Mode
              </span>
            </h2>
            <p className="text-xs text-slate-400">Desenvolvimento full stack automático em tempo real com pré-visualização ao vivo.</p>
          </div>
        </div>

        {/* View Mode Controls */}
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setViewMode('preview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                viewMode === 'preview' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview Ao Vivo</span>
            </button>

            <button
              onClick={() => setViewMode('code')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                viewMode === 'code' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Arquivos do Projeto</span>
            </button>

            <button
              onClick={() => setViewMode('agents')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                viewMode === 'agents' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Equipe de IA ({project.agentsExecution.length})</span>
            </button>
          </div>

          {/* Device Responsive Controls */}
          {viewMode === 'preview' && (
            <div className="hidden sm:flex bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setViewportSize('desktop')}
                title="Visão Desktop"
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewportSize === 'desktop' ? 'bg-indigo-600/20 text-indigo-400' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewportSize('tablet')}
                title="Visão Tablet (768px)"
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewportSize === 'tablet' ? 'bg-indigo-600/20 text-indigo-400' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewportSize('mobile')}
                title="Visão Mobile (375px)"
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewportSize === 'mobile' ? 'bg-indigo-600/20 text-indigo-400' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Side Generator Bar */}
        <div className="w-full lg:w-96 bg-slate-900/60 border-r border-slate-800/80 p-5 overflow-y-auto space-y-5 shrink-0 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                Descreva o Site ou Aplicação
              </label>
              <textarea
                value={projectPrompt}
                onChange={(e) => setProjectPrompt(e.target.value)}
                placeholder="Ex: Crie um site para uma clínica médica com agendamento online..."
                rows={4}
                className="w-full bg-slate-950 text-slate-100 placeholder-slate-500 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl p-3 text-xs outline-none resize-none leading-relaxed"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">Tipo de Aplicação</label>
              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full bg-slate-950 text-slate-200 border border-slate-800 rounded-lg p-2 text-xs outline-none"
              >
                <option value="Site Institucional + Agendamento">Site Institucional + Agendamento</option>
                <option value="E-commerce Completo">E-commerce Completo com Carrinho</option>
                <option value="Landing Page SaaS">Landing Page SaaS de Conversão</option>
                <option value="Dashboard ERP / CRM">Dashboard ERP / CRM Administrativo</option>
                <option value="Portal de Conteúdo / Blog">Portal de Conteúdo / Blog</option>
              </select>
            </div>

            <button
              onClick={handleGenerateFullWebsite}
              disabled={!projectPrompt.trim() || isGenerating}
              className={`w-full py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                projectPrompt.trim() && !isGenerating
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Equipe Intuitiva IA Construindo Projeto...</span>
                </>
              ) : (
                <>
                  <Rocket className="w-4 h-4" />
                  <span>Criar Projeto Completo com IA</span>
                </>
              )}
            </button>

            {/* Quick Presets */}
            <div className="border-t border-slate-800/80 pt-4">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
                Projetos Prontos (1-Click)
              </span>
              <div className="space-y-2">
                {quickPresets.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setProjectPrompt(preset.prompt);
                    }}
                    className="w-full text-left p-2.5 bg-slate-950/60 hover:bg-slate-800/60 border border-slate-800/80 rounded-xl transition-all text-xs text-slate-300 flex items-center justify-between cursor-pointer group"
                  >
                    <span className="truncate pr-2 font-medium">{preset.label}</span>
                    <Zap className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Deploy & Export Actions */}
          <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-3.5 space-y-2">
            <span className="text-[11px] font-bold text-slate-300 block">Opções de Exportação & Deploy</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => alert('Exportando projeto compactado (.zip)...')}
                className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3 h-3 text-indigo-400" />
                <span>Baixar ZIP</span>
              </button>
              <button
                onClick={handleOpenVercelModal}
                className="px-2.5 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-sm transition-all"
              >
                <ExternalLink className="w-3 h-3 text-indigo-400" />
                <span>Deploy Vercel</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side Workspace Area */}
        <div className="flex-1 bg-slate-950 flex flex-col overflow-hidden">
          {/* Active View: Live Preview */}
          {viewMode === 'preview' && (
            <div className="flex-1 flex flex-col items-center justify-center p-4 bg-slate-950 overflow-hidden">
              <div
                className={`w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col transition-all duration-300 ${
                  viewportSize === 'desktop'
                    ? 'h-full max-w-full'
                    : viewportSize === 'tablet'
                    ? 'h-full max-w-[768px]'
                    : 'h-full max-w-[375px]'
                }`}
              >
                {/* Simulated Browser Address Bar */}
                <div className="bg-slate-900 border-b border-slate-800 px-4 py-2 flex items-center gap-2 text-slate-400 shrink-0">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <div className="flex-1 bg-slate-950 border border-slate-800/80 rounded-lg px-3 py-1 text-[11px] text-slate-300 font-mono truncate flex items-center gap-2">
                    <span className="text-emerald-400 text-[10px]">https://</span>
                    <span>{project.title.toLowerCase().replace(/\s+/g, '-')}.intuitiva.app</span>
                  </div>
                </div>

                {/* Rendered HTML Canvas Iframe */}
                <div className="flex-1 bg-white relative">
                  <iframe
                    title="Intuitiva Live Website Preview"
                    srcDoc={project.htmlPreview}
                    className="w-full h-full border-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Active View: Code Files Explorer */}
          {viewMode === 'code' && (
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
              {/* File Tree */}
              <div className="w-full lg:w-64 bg-slate-900/80 border-r border-slate-800 p-3 overflow-y-auto shrink-0 font-mono text-xs">
                <div className="px-2 py-1 text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-2 flex items-center gap-1.5">
                  <FolderTree className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Estrutura de Pastas</span>
                </div>

                <div className="space-y-1">
                  {project.files.map((f, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedFileName(f.name)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center gap-2 truncate transition-colors cursor-pointer ${
                        selectedFileName === f.name
                          ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                      }`}
                    >
                      <FileCode className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span className="truncate">{f.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Code Viewer */}
              <div className="flex-1 flex flex-col bg-slate-950 font-mono text-xs overflow-hidden">
                <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-2 flex items-center justify-between text-slate-400 shrink-0">
                  <span className="text-slate-200 font-semibold">{activeFile?.name}</span>
                  <button
                    onClick={() => handleCopyCode(activeFile?.content || '')}
                    className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copiado!' : 'Copiar Arquivo'}</span>
                  </button>
                </div>
                <div className="flex-1 p-4 overflow-auto text-slate-200 bg-slate-950">
                  <pre className="leading-relaxed">
                    <code>{activeFile?.content}</code>
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* Active View: Multi-Agent Team Execution */}
          {viewMode === 'agents' && (
            <div className="flex-1 p-6 overflow-y-auto space-y-4 max-w-4xl mx-auto w-full">
              <div className="border-b border-slate-800 pb-3 mb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Bot className="w-5 h-5 text-indigo-400" />
                  Equipe Multidisciplinar Intuitiva IA
                </h3>
                <p className="text-xs text-slate-400">
                  Resumo das ações executadas pelos agentes especialistas para construir este projeto.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.agentsExecution.map((ag, idx) => (
                  <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-start gap-3">
                    <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400 shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-white text-xs mb-1">{ag.role}</div>
                      <p className="text-slate-400 text-xs leading-relaxed">{ag.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Vercel 1-Click Deployment & Domain/SSL Modal */}
      {isVercelModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-black border border-slate-800 rounded-xl text-white font-bold text-base flex items-center justify-center shadow-inner">
                  ▲
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                    Publicar Projeto na Vercel (1-Click)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Implantação instantânea na Vercel Edge Network com SSL TLS v1.3 gratuito e suporte a domínio personalizado.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsVercelModalOpen(false)}
                className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body / Form */}
            <div className="space-y-4 relative z-10 text-xs">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300 block mb-1.5">
                  Nome do Projeto na Vercel
                </label>
                <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200">
                  <span className="text-slate-500 font-mono text-[11px]">vercel.app/</span>
                  <input
                    type="text"
                    value={vercelProjectName}
                    onChange={(e) => setVercelProjectName(e.target.value)}
                    placeholder="meu-site-intuitiva"
                    className="bg-transparent w-full outline-none font-mono text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300 block mb-1.5 flex items-center justify-between">
                  <span>Domínio Personalizado (Opcional)</span>
                  <span className="text-[10px] text-emerald-400 font-normal flex items-center gap-1">
                    <Lock className="w-3 h-3" /> SSL Let's Encrypt Incluso
                  </span>
                </label>
                <input
                  type="text"
                  value={vercelCustomDomain}
                  onChange={(e) => setVercelCustomDomain(e.target.value)}
                  placeholder="ex: clinicahealth.com.br"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono outline-none focus:border-indigo-500"
                />
                <p className="text-[10px] text-slate-500 mt-1">
                  Se informado, o projeto será automaticamente configurado com registros DNS CNAME/A e certificado HTTPS.
                </p>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300 block mb-1.5 flex items-center justify-between">
                  <span>Token da API Vercel (Opcional)</span>
                  <span className="text-[10px] text-indigo-400 font-normal">Minha Conta Vercel</span>
                </label>
                <input
                  type="password"
                  value={vercelApiToken}
                  onChange={(e) => setVercelApiToken(e.target.value)}
                  placeholder="Cole seu Vercel API Token se desejar publicar diretamente em sua conta pessoal"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono outline-none focus:border-indigo-500"
                />
              </div>

              {/* Action Button */}
              <button
                onClick={handleDeployToVercel}
                disabled={isDeployingVercel}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer disabled:opacity-50"
              >
                {isDeployingVercel ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Publicando na Vercel & Gerando SSL...</span>
                  </>
                ) : (
                  <>
                    <Rocket className="w-4 h-4" />
                    <span>🚀 Publicar na Vercel em 1-Clique</span>
                  </>
                )}
              </button>

              {/* Deployment Result Card */}
              {vercelDeploymentResult && (
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                      <span className="font-bold text-emerald-400 text-xs">🟢 Projeto Publicado na Vercel!</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">ID: {vercelDeploymentResult.deploymentId}</span>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">URL de Produção Vercel:</span>
                      <a
                        href={vercelDeploymentResult.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-400 hover:underline font-mono font-bold flex items-center gap-1 mt-0.5"
                      >
                        <span>{vercelDeploymentResult.url}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    {vercelDeploymentResult.customDomain && (
                      <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                        <span className="text-[10px] font-bold text-slate-300 block">Domínio Personalizado Assiciado:</span>
                        <div className="font-mono text-emerald-300 font-bold">
                          https://{vercelDeploymentResult.customDomain.domain}
                        </div>
                        <div className="text-[10px] text-slate-400 flex items-center gap-1">
                          <Lock className="w-3 h-3 text-emerald-400" />
                          <span>SSL/TLS Ativo via Let's Encrypt Vercel Edge</span>
                        </div>
                      </div>
                    )}

                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Logs de Implantação Vercel:</span>
                      <div className="bg-black/90 p-3 rounded-xl font-mono text-[10px] text-emerald-400 space-y-1 border border-slate-800 max-h-32 overflow-y-auto">
                        {vercelDeploymentResult.buildLogs?.map((log: string, idx: number) => (
                          <div key={idx}>{log}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

