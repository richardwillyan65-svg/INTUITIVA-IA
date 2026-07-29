import React, { useState, useEffect } from 'react';
import {
  Github,
  GitBranch,
  GitCommit,
  FolderGit2,
  Check,
  Copy,
  ExternalLink,
  Lock,
  Globe,
  Sparkles,
  RefreshCw,
  AlertCircle,
  X,
  CheckCircle2,
  FileCode,
  FolderTree,
  Terminal,
  ArrowRight,
  Key,
  ShieldCheck,
  Code2
} from 'lucide-react';

export interface ProjectFileToExport {
  name: string;
  content: string;
  language?: string;
}

interface GitHubExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
  projectDescription: string;
  projectFiles: ProjectFileToExport[];
  htmlPreview?: string;
}

export const GitHubExportModal: React.FC<GitHubExportModalProps> = ({
  isOpen,
  onClose,
  projectTitle,
  projectDescription,
  projectFiles,
  htmlPreview
}) => {
  // Saved Token in LocalStorage
  const [githubToken, setGithubToken] = useState(() => {
    return localStorage.getItem('intuitiva_github_pat') || '';
  });
  const [saveTokenLocally, setSaveTokenLocally] = useState(true);

  // Repository Fields
  const [repoName, setRepoName] = useState(() => {
    return projectTitle
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'intuitiva-web-project';
  });
  const [repoDescription, setRepoDescription] = useState(
    projectDescription || 'Projeto gerado autonomamente pela Intuitiva IA Web Studio.'
  );
  const [isPrivate, setIsPrivate] = useState(false);
  const [branchName, setBranchName] = useState('main');
  const [commitMessage, setCommitMessage] = useState('feat: exportação automática do projeto via Intuitiva IA Studio');

  // File Options
  const [includeReadme, setIncludeReadme] = useState(true);
  const [includePackageJson, setIncludePackageJson] = useState(true);
  const [includeGitignore, setIncludeGitignore] = useState(true);
  const [includeViteConfig, setIncludeViteConfig] = useState(true);

  // Execution State
  const [exporting, setExporting] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [stepMessage, setStepMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [exportResult, setExportResult] = useState<{
    repoUrl: string;
    cloneUrl: string;
    commitsCount: number;
    owner: string;
    repoName: string;
  } | null>(null);

  const [copiedCloneUrl, setCopiedCloneUrl] = useState(false);

  // Sync token changes to LocalStorage
  useEffect(() => {
    if (saveTokenLocally && githubToken) {
      localStorage.setItem('intuitiva_github_pat', githubToken);
    }
  }, [githubToken, saveTokenLocally]);

  if (!isOpen) return null;

  // Build README.md content dynamically
  const generateReadmeContent = () => {
    return `# ${projectTitle}

> ${projectDescription}

Este projeto foi criado e estruturado autonomamente pela **Intuitiva IA — Multi-Agent Web & Mobile Studio**.

---

## 🚀 Tecnologias Utilizadas

- **Framework**: React 18 / HTML5 + Tailwind CSS
- **Linguagem**: TypeScript / JavaScript ES6+
- **Bundler**: Vite
- **Ícones**: Lucide React
- **Engine de IA**: Intuitiva IA Engine (Gemini 3.6 Flash)

---

## 🛠️ Como Executar Localmente

1. **Clone este repositório:**
   \`\`\`bash
   git clone https://github.com/${exportResult?.owner || 'usuario'}/${repoName}.git
   cd ${repoName}
   \`\`\`

2. **Instale as dependências:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Inicie o servidor de desenvolvimento:**
   \`\`\`bash
   npm run dev
   \`\`\`

4. Open your browser at \`http://localhost:3000\`.

---

## ⚡ Estrutura do Projeto

\`\`\`text
${repoName}/
├── index.html
├── src/
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── vite.config.ts
├── .gitignore
└── README.md
\`\`\`

---

*Gerado com ❤️ por [Intuitiva IA Studio](https://ais-pre-klihmeygcbgmd32vu5c7dz-259541507016.us-west2.run.app)*
`;
  };

  // Build package.json content dynamically
  const generatePackageJsonContent = () => {
    return JSON.stringify(
      {
        name: repoName,
        private: isPrivate,
        version: '1.0.0',
        type: 'module',
        scripts: {
          dev: 'vite',
          build: 'vite build',
          lint: 'tsc --noEmit',
          preview: 'vite preview'
        },
        dependencies: {
          react: '^18.3.1',
          'react-dom': '^18.3.1',
          'lucide-react': '^0.344.0',
          clsx: '^2.1.0',
          'tailwind-merge': '^2.2.1'
        },
        devDependencies: {
          '@types/react': '^18.2.66',
          '@types/react-dom': '^18.2.22',
          '@vitejs/plugin-react': '^4.2.1',
          autoprefixer: '^10.4.19',
          postcss: '^8.4.38',
          tailwindcss: '^3.4.1',
          typescript: '^5.2.2',
          vite: '^5.1.6'
        }
      },
      null,
      2
    );
  };

  // Build .gitignore content dynamically
  const generateGitignoreContent = () => {
    return `# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Directory for instrumented code
lib-cov

# Coverage directory
coverage

# Node modules & build outputs
node_modules/
dist/
dist-ssr/
*.local

# Editor files
.vscode/*
!.vscode/extensions.json
.idea
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Environment
.env
.env.production
.env.local
`;
  };

  // Build vite.config.ts
  const generateViteConfigContent = () => {
    return `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true
  }
});
`;
  };

  // Execute Export Process
  const handleExportToGitHub = async () => {
    setErrorMessage(null);
    setExporting(true);
    setCurrentStep(1);
    setStepMessage('Validando credenciais e comunicação com servidor...');

    // Prepare full list of files to commit
    const allFilesToExport: ProjectFileToExport[] = [...projectFiles];

    if (includeReadme) {
      allFilesToExport.push({
        name: 'README.md',
        content: generateReadmeContent(),
        language: 'markdown'
      });
    }

    if (includePackageJson && !allFilesToExport.some((f) => f.name === 'package.json')) {
      allFilesToExport.push({
        name: 'package.json',
        content: generatePackageJsonContent(),
        language: 'json'
      });
    }

    if (includeGitignore && !allFilesToExport.some((f) => f.name === '.gitignore')) {
      allFilesToExport.push({
        name: '.gitignore',
        content: generateGitignoreContent(),
        language: 'plaintext'
      });
    }

    if (includeViteConfig && !allFilesToExport.some((f) => f.name === 'vite.config.ts')) {
      allFilesToExport.push({
        name: 'vite.config.ts',
        content: generateViteConfigContent(),
        language: 'typescript'
      });
    }

    // Ensure index.html exists
    if (!allFilesToExport.some((f) => f.name === 'index.html') && htmlPreview) {
      allFilesToExport.push({
        name: 'index.html',
        content: htmlPreview,
        language: 'html'
      });
    }

    try {
      setCurrentStep(2);
      setStepMessage('Processando via API do servidor Intuitiva IA...');

      const response = await fetch('/api/export-github', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: githubToken.trim(),
          repoName: repoName.trim(),
          description: repoDescription,
          isPrivate,
          branch: branchName || 'main',
          commitMessage,
          files: allFilesToExport
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Falha ao exportar repositório para o GitHub.');
      }

      setCurrentStep(3);
      setStepMessage('Finalizando commit e sincronização com o GitHub...');

      setTimeout(() => {
        setExportResult({
          repoUrl: data.repoUrl,
          cloneUrl: data.cloneUrl,
          commitsCount: data.commitsCount || allFilesToExport.length,
          owner: data.owner,
          repoName: data.repoName
        });
        setExporting(false);
      }, 1000);
    } catch (err: any) {
      console.error('Erro de exportação para o GitHub:', err);
      setErrorMessage(err.message || 'Ocorreu um erro ao exportar para o GitHub.');
      setExporting(false);
    }
  };

  const handleCopyCloneCmd = () => {
    if (!exportResult) return;
    navigator.clipboard.writeText(`git clone ${exportResult.cloneUrl}`);
    setCopiedCloneUrl(true);
    setTimeout(() => setCopiedCloneUrl(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#18181c] border border-slate-800 rounded-3xl max-w-2xl w-full p-6 space-y-6 shadow-2xl relative my-auto">
        {/* Top Close Button */}
        <button
          onClick={onClose}
          disabled={exporting}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Title */}
        <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4">
          <div className="p-3 bg-slate-900 border border-slate-700/80 rounded-2xl text-white shadow-md">
            <Github className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>Exportar Projeto para o GitHub</span>
              <span className="text-xs font-mono font-extrabold bg-indigo-500/20 text-indigo-300 px-2.5 py-0.5 rounded-full border border-indigo-500/30">
                Auto-Commit
              </span>
            </h2>
            <p className="text-slate-400 text-xs">
              Criação automática de repositório, commit da estrutura de arquivos e histórico no GitHub.
            </p>
          </div>
        </div>

        {/* Success Screen */}
        {exportResult ? (
          <div className="space-y-6 animate-in zoom-in-95">
            <div className="bg-emerald-950/40 border border-emerald-500/30 p-5 rounded-2xl space-y-3">
              <div className="flex items-center gap-3 text-emerald-400">
                <CheckCircle2 className="w-6 h-6 shrink-0" />
                <div>
                  <h3 className="font-extrabold text-white text-base">
                    Repositório Criado & Exportado com Sucesso!
                  </h3>
                  <p className="text-emerald-300/80 text-xs">
                    Todos os {exportResult.commitsCount} arquivos foram publicados na branch{' '}
                    <code className="bg-slate-900 px-1.5 py-0.5 rounded text-emerald-400 font-mono">
                      {branchName}
                    </code>
                    .
                  </p>
                </div>
              </div>
            </div>

            {/* Repo Info Cards */}
            <div className="bg-[#121215] border border-slate-800 p-4 rounded-2xl space-y-3 font-mono text-xs text-slate-300">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Repositório:</span>
                <span className="text-white font-bold">{exportResult.owner}/{exportResult.repoName}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Visibilidade:</span>
                <span className="text-amber-400 font-bold">{isPrivate ? 'Privado (Private)' : 'Público (Public)'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Mensagem de Commit:</span>
                <span className="text-slate-200 truncate max-w-[280px]">"{commitMessage}"</span>
              </div>
            </div>

            {/* Git Clone Command Box */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Comando Git Clone:
              </label>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono text-indigo-300">
                <span className="truncate">git clone {exportResult.cloneUrl}</span>
                <button
                  onClick={handleCopyCloneCmd}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-lg transition-colors flex items-center gap-1 cursor-pointer shrink-0 ml-2"
                >
                  {copiedCloneUrl ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <a
                href={exportResult.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer border border-indigo-400/30"
              >
                <Github className="w-4 h-4" />
                <span>Ver Repositório no GitHub</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setExportResult(null)}
                className="w-full sm:w-auto px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition-all cursor-pointer border border-slate-700"
              >
                Nova Exportação
              </button>
            </div>
          </div>
        ) : (
          /* Form Screen */
          <div className="space-y-5">
            {/* Error Alert */}
            {errorMessage && (
              <div className="bg-rose-950/50 border border-rose-500/40 p-4 rounded-2xl text-xs text-rose-300 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <strong className="text-white block font-bold">Erro ao exportar:</strong>
                  <span>{errorMessage}</span>
                </div>
              </div>
            )}

            {/* Token Section */}
            <div className="space-y-2 bg-[#121215] border border-slate-800 p-4 rounded-2xl">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Key className="w-4 h-4 text-amber-400" />
                  <span>GitHub Personal Access Token (PAT):</span>
                </label>

                <a
                  href="https://github.com/settings/tokens/new?scopes=repo,workflow&description=Intuitiva+IA+Studio"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-indigo-400 hover:text-indigo-300 underline font-semibold flex items-center gap-1"
                >
                  <span>Gerar token no GitHub</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <input
                type="password"
                value={githubToken}
                onChange={(e) => setGithubToken(e.target.value)}
                placeholder="Cole seu token do GitHub (ghp_... ou github_pat_...)"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white font-mono placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
              />

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span className="flex items-center gap-1 text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  O token precisa de permissão de acesso a repositórios (scope <code className="text-indigo-300">repo</code>).
                </span>

                <label className="flex items-center gap-1.5 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={saveTokenLocally}
                    onChange={(e) => setSaveTokenLocally(e.target.checked)}
                    className="rounded bg-slate-900 border-slate-700 text-indigo-500 focus:ring-0"
                  />
                  <span>Salvar token localmente</span>
                </label>
              </div>
            </div>

            {/* Repository Config Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Repository Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 block">
                  Nome do Repositório:
                </label>
                <input
                  type="text"
                  value={repoName}
                  onChange={(e) => setRepoName(e.target.value)}
                  placeholder="ex: meu-novo-site"
                  className="w-full bg-[#121215] border border-slate-800 rounded-xl p-2.5 text-xs text-white font-mono placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Branch Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 block">
                  Branch Principal:
                </label>
                <div className="relative">
                  <GitBranch className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={branchName}
                    onChange={(e) => setBranchName(e.target.value)}
                    placeholder="main"
                    className="w-full bg-[#121215] border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Description & Visibility */}
            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 block">
                  Descrição do Repositório:
                </label>
                <input
                  type="text"
                  value={repoDescription}
                  onChange={(e) => setRepoDescription(e.target.value)}
                  placeholder="Descrição opcional para o repositório..."
                  className="w-full bg-[#121215] border border-slate-800 rounded-xl p-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Commit Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 block">
                  Mensagem de Commit Automático:
                </label>
                <div className="relative">
                  <GitCommit className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={commitMessage}
                    onChange={(e) => setCommitMessage(e.target.value)}
                    placeholder="feat: commit inicial..."
                    className="w-full bg-[#121215] border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Public vs Private Toggle */}
              <div className="flex items-center gap-4 bg-[#121215] border border-slate-800 p-3 rounded-2xl">
                <span className="text-xs font-bold text-slate-300">Visibilidade:</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsPrivate(false)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      !isPrivate
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Público</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsPrivate(true)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      isPrivate
                        ? 'bg-amber-600 text-white shadow-md'
                        : 'bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Privado</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Structure Auto-Generation Options */}
            <div className="space-y-2 bg-[#121215] border border-slate-800 p-4 rounded-2xl">
              <label className="text-xs font-bold text-white flex items-center gap-2">
                <FolderTree className="w-4 h-4 text-indigo-400" />
                <span>Estrutura de Arquivos Inclusa para Exportação:</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-300 pt-1">
                <label className="flex items-center gap-2 cursor-pointer bg-slate-950 p-2 rounded-xl border border-slate-800/80">
                  <input
                    type="checkbox"
                    checked={includeReadme}
                    onChange={(e) => setIncludeReadme(e.target.checked)}
                    className="rounded bg-slate-900 border-slate-700 text-indigo-500 focus:ring-0"
                  />
                  <span>README.md</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer bg-slate-950 p-2 rounded-xl border border-slate-800/80">
                  <input
                    type="checkbox"
                    checked={includePackageJson}
                    onChange={(e) => setIncludePackageJson(e.target.checked)}
                    className="rounded bg-slate-900 border-slate-700 text-indigo-500 focus:ring-0"
                  />
                  <span>package.json</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer bg-slate-950 p-2 rounded-xl border border-slate-800/80">
                  <input
                    type="checkbox"
                    checked={includeGitignore}
                    onChange={(e) => setIncludeGitignore(e.target.checked)}
                    className="rounded bg-slate-900 border-slate-700 text-indigo-500 focus:ring-0"
                  />
                  <span>.gitignore</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer bg-slate-950 p-2 rounded-xl border border-slate-800/80">
                  <input
                    type="checkbox"
                    checked={includeViteConfig}
                    onChange={(e) => setIncludeViteConfig(e.target.checked)}
                    className="rounded bg-slate-900 border-slate-700 text-indigo-500 focus:ring-0"
                  />
                  <span>vite.config.ts</span>
                </label>
              </div>
            </div>

            {/* Exporting Progress Bar / Loader */}
            {exporting && (
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3">
                <div className="flex items-center gap-3 text-xs text-slate-200">
                  <RefreshCw className="w-4 h-4 text-indigo-400 animate-spin shrink-0" />
                  <span className="font-bold">{stepMessage}</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-amber-400 h-full transition-all duration-500"
                    style={{ width: `${(currentStep / 3) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-800/80">
              <button
                type="button"
                onClick={onClose}
                disabled={exporting}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition-all cursor-pointer"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={handleExportToGitHub}
                disabled={exporting || !repoName.trim()}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer border border-indigo-400/30"
              >
                {exporting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Exportando...</span>
                  </>
                ) : (
                  <>
                    <Github className="w-4 h-4" />
                    <span>Exportar para GitHub</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
