import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Bot,
  User,
  Sparkles,
  Copy,
  Check,
  Code2,
  Zap,
  Trash2,
  RefreshCw,
  Terminal,
  Layers,
  ArrowRight,
  Globe,
  Rocket,
  MessageSquare,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Play,
  Square,
  Paperclip,
  FileText,
  Image as ImageIcon,
  X,
  Sliders,
  FolderPlus,
  HelpCircle,
  Wand2,
  Lightbulb,
  UploadCloud,
  FileCode
} from 'lucide-react';
import { ChatMessage, SpecialtyType } from '../types';
import { SPECIALTIES_LIST } from '../data/capabilitiesData';
import { BASE44_IDEAS_LIST, Base44Idea } from '../data/base44Ideas';

interface AttachedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  content: string; // text content or base64 data URL
  isImage: boolean;
}

interface ChatStudioProps {
  onStartBuild?: (prompt: string) => void;
}

export const ChatStudio: React.FC<ChatStudioProps> = ({ onStartBuild }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'assistant',
      content: `Olá! Eu sou a **Intuitiva IA (Modo Base44 Engine)**, sua Inteligência Artificial Full Stack com voz em tempo real e análise de arquivos.

✨ **Principais Recursos Base44 Ativos:**
- 🎙️ **Voz e Áudio Bidirecional**: Fale por microfone e ouça a IA responder com voz sintetizada.
- 📁 **Arquivos do Armazenamento**: Anexe arquivos de código, TXT, CSV, JSON ou imagens diretamente do seu dispositivo.
- 💡 **Gerador de Ideias Base44**: Explore +44 ideias e protótipos de SaaS, FinTech, E-commerce e IA.
- ⚡ **Aprimorador de Prompts (Base44 Engine)**: Refine seus prompts em especificações técnicas completas em 1-clique.

Como podemos construir seu próximo aplicativo hoje?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<SpecialtyType>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Attached files state
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Speech Recognition (STT) state
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  // Speech Synthesis (TTS) state
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [voiceRate, setVoiceRate] = useState<number>(1.0);
  const [showIdeasModal, setShowIdeasModal] = useState(false);
  const [isEnhancingPrompt, setIsEnhancingPrompt] = useState(false);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
    }
  }, []);

  // Handle Speech Recognition (Microphone STT)
  const toggleSpeechRecognition = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('A SpeechRecognition API não está disponível no seu navegador atual. Use o Chrome ou Edge.');
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'pt-BR';
      recognition.interimResults = true;
      recognition.continuous = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript) {
          setInputPrompt(transcript);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Erro no microfone:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error('Falha no microfone:', err);
      setIsListening(false);
    }
  };

  // Handle Text-To-Speech (Voz da IA em Áudio)
  const speakMessageText = (msgId: string, text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Seu navegador não suporta a API de Síntese de Voz (Text-to-Speech).');
      return;
    }

    if (speakingMsgId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingMsgId(null);
      return;
    }

    window.speechSynthesis.cancel(); // Stop current speaking if any
    const cleanText = text.replace(/[*#`_~]/g, ''); // Remove markdown symbols for cleaner voice
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'pt-BR';
    utterance.rate = voiceRate;

    // Find best Portuguese voice
    const voices = window.speechSynthesis.getVoices();
    const ptVoice = voices.find(v => v.lang.includes('pt') || v.lang.includes('PT'));
    if (ptVoice) utterance.voice = ptVoice;

    utterance.onstart = () => setSpeakingMsgId(msgId);
    utterance.onend = () => setSpeakingMsgId(null);
    utterance.onerror = () => setSpeakingMsgId(null);

    window.speechSynthesis.speak(utterance);
  };

  // Handle File Upload from storage
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file: File) => {
      const isImg = file.type.startsWith('image/');
      const reader = new FileReader();

      reader.onload = (event) => {
        const fileContent = event.target?.result as string;
        const newFile: AttachedFile = {
          id: `file-${Date.now()}-${Math.random()}`,
          name: file.name,
          size: file.size,
          type: file.type || 'text/plain',
          content: fileContent,
          isImage: isImg
        };

        setAttachedFiles(prev => [...prev, newFile]);
      };

      if (isImg) {
        reader.readAsDataURL(file);
      } else {
        reader.readAsText(file);
      }
    });

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeAttachedFile = (id: string) => {
    setAttachedFiles(prev => prev.filter(f => f.id !== id));
  };

  // Refine prompt using Base44 Prompt Enhancer
  const handleEnhancePrompt = async () => {
    if (!inputPrompt.trim() || isEnhancingPrompt) return;
    setIsEnhancingPrompt(true);

    try {
      const res = await fetch('/api/enhance-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: inputPrompt })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.enhancedPrompt) {
          setInputPrompt(data.enhancedPrompt);
        }
      }
    } catch (err) {
      console.error('Erro ao aprimorar prompt:', err);
    } finally {
      setIsEnhancingPrompt(false);
    }
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (customPrompt?: string) => {
    const promptToUse = customPrompt || inputPrompt;
    if ((!promptToUse.trim() && attachedFiles.length === 0) || isLoading) return;

    // Construct enriched user prompt with attached file info
    let fullPromptText = promptToUse;

    if (attachedFiles.length > 0) {
      const fileSummary = attachedFiles.map((f, i) => {
        if (f.isImage) {
          return `\n[Arquivo Anexado ${i + 1}: ${f.name} (${(f.size / 1024).toFixed(1)} KB) - Imagem]`;
        }
        const snippet = f.content.length > 2000 ? f.content.slice(0, 2000) + '... [conteúdo truncado]' : f.content;
        return `\n\n--- Conteúdo do Arquivo Anexado (${f.name}) ---\n${snippet}\n--- Fim do Arquivo ---`;
      }).join('\n');

      fullPromptText = `${promptToUse}\n\n${fileSummary}`;
    }

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: promptToUse || `Análise de ${attachedFiles.length} arquivo(s)`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      specialty: selectedSpecialty,
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!customPrompt) setInputPrompt('');
    const filesSent = [...attachedFiles];
    setAttachedFiles([]); // Clear file queue
    setIsLoading(true);

    try {
      const historyForApi = messages.concat(userMessage).map((m) => ({
        role: m.role,
        content: m.content === userMessage.content ? fullPromptText : m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: historyForApi,
          specialty: selectedSpecialty !== 'all' ? selectedSpecialty : undefined,
        }),
      });

      const data = await res.json();

      let replyContent = '';
      if (res.ok && data.text) {
        replyContent = data.text;
      } else if (data.fallbackText) {
        replyContent = data.fallbackText;
      } else {
        replyContent = 'A Intuitiva IA processou sua solicitação com sucesso.';
      }

      const newMsgId = `ast-${Date.now()}`;
      const assistantMessage: ChatMessage = {
        id: newMsgId,
        role: 'assistant',
        content: replyContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        specialty: selectedSpecialty,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      if (autoSpeak) {
        speakMessageText(newMsgId, replyContent);
      }
    } catch (err: any) {
      console.error('Erro na conversa:', err);
      const errorMessage: ChatMessage = {
        id: `ast-err-${Date.now()}`,
        role: 'assistant',
        content: `**Intuitiva IA - Resposta:**\nOcorreu uma instabilidade na comunicação com a API. Certifique-se de que a variável de ambiente \`GEMINI_API_KEY\` foi configurada nos Secrets.\n\nSua pergunta foi: "${promptToUse}"`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyCode = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const quickPrompts = [
    { label: 'Crie um SaaS completo com dashboard', specialty: 'fullstack' },
    { label: 'API Express com JWT & TypeScript', specialty: 'backend' },
    { label: 'E-commerce estilo Shopify em React', specialty: 'frontend' },
    { label: 'Agente de IA com leitor de arquivos', specialty: 'ai' },
    { label: 'Esquema PostgreSQL + Drizzle ORM', specialty: 'database' },
  ];

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] bg-slate-950 overflow-hidden relative">
      {/* Top Bar: Specialties + Base44 Ideas & Voice Toggle */}
      <div className="bg-slate-900/90 border-b border-slate-800 p-3 px-4 sm:px-6 flex items-center justify-between gap-3 shrink-0 overflow-x-auto">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap flex items-center gap-1.5 shrink-0">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Especialidade:
          </span>

          <button
            onClick={() => setSelectedSpecialty('all')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              selectedSpecialty === 'all'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Visão Geral Base44
          </button>

          {SPECIALTIES_LIST.slice(0, 5).map((spec) => (
            <button
              key={spec.id}
              onClick={() => setSelectedSpecialty(spec.id as SpecialtyType)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                selectedSpecialty === spec.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {spec.name.replace('Especialista em ', '').replace('Desenvolvedor ', '')}
            </button>
          ))}
        </div>

        {/* Right Action Tools: Base44 Ideas Modal Toggle & Voice Auto-speak */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setAutoSpeak(!autoSpeak)}
            title={autoSpeak ? "Desativar voz automática da IA" : "Ativar voz automática da IA nas respostas"}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
              autoSpeak
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
            }`}
          >
            {autoSpeak ? <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{autoSpeak ? 'Voz Automática On' : 'Voz Off'}</span>
          </button>

          <button
            onClick={() => setShowIdeasModal(true)}
            className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-slate-950 font-extrabold text-xs rounded-xl flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all cursor-pointer shrink-0"
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Ideias Base44</span>
          </button>

          <button
            onClick={() => setMessages([messages[0]])}
            title="Limpar histórico da conversa"
            className="text-slate-400 hover:text-rose-400 p-1.5 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {messages.map((msg) => {
          const isAssistant = msg.role === 'assistant';
          const isSpeakingThis = speakingMsgId === msg.id;

          return (
            <div
              key={msg.id}
              className={`flex gap-3 sm:gap-4 max-w-4xl ${
                isAssistant ? 'mr-auto' : 'ml-auto flex-row-reverse'
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white shadow-md ${
                  isAssistant
                    ? 'bg-gradient-to-tr from-indigo-600 to-blue-600 shadow-indigo-500/20 border border-indigo-400/30'
                    : 'bg-slate-800 border border-slate-700'
                }`}
              >
                {isAssistant ? <Bot className="w-5 h-5 text-indigo-100" /> : <User className="w-5 h-5 text-slate-300" />}
              </div>

              {/* Message Content Bubble */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-200">
                      {isAssistant ? 'Intuitiva IA (Base44 Engine)' : 'Você'}
                    </span>
                    <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                    {msg.specialty && msg.specialty !== 'all' && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-medium">
                        {msg.specialty}
                      </span>
                    )}
                  </div>

                  {/* Audio Speech Player Button for Assistant Messages */}
                  {isAssistant && (
                    <button
                      onClick={() => speakMessageText(msg.id, msg.content)}
                      className={`text-xs px-2.5 py-1 rounded-lg border font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        isSpeakingThis
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-amber-300 hover:border-amber-500/30'
                      }`}
                      title={isSpeakingThis ? "Parar leitura de áudio" : "Ouvir mensagem em voz (Síntese de Áudio Base44)"}
                    >
                      {isSpeakingThis ? (
                        <>
                          <Square className="w-3 h-3 text-amber-400" />
                          <span>Parar Áudio</span>
                          <span className="flex items-center gap-0.5 ml-1">
                            <span className="w-1 h-2.5 bg-amber-400 animate-bounce" />
                            <span className="w-1 h-3.5 bg-amber-300 animate-bounce delay-75" />
                            <span className="w-1 h-2 bg-amber-400 animate-bounce delay-150" />
                          </span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Ouvir Voz</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

                <div
                  className={`p-4 rounded-2xl border text-sm leading-relaxed whitespace-pre-wrap ${
                    isAssistant
                      ? 'bg-slate-900/90 border-slate-800 text-slate-200 shadow-sm'
                      : 'bg-indigo-600 text-white border-indigo-500 shadow-sm shadow-indigo-600/20'
                  }`}
                >
                  {msg.content}
                </div>

                {/* Actions Bar for Assistant Code Output */}
                {isAssistant && (
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
                    {onStartBuild && msg.content.toLowerCase().includes('crie') || msg.content.toLowerCase().includes('app') ? (
                      <button
                        onClick={() => onStartBuild?.(msg.content.slice(0, 150))}
                        className="px-3 py-1 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <Rocket className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Gerar este App no Builder</span>
                      </button>
                    ) : <span />}

                    {msg.content.includes('```') && (
                      <button
                        onClick={() => handleCopyCode(msg.content, msg.id)}
                        className="text-xs text-slate-400 hover:text-indigo-400 flex items-center gap-1 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400 font-bold">Copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copiar Resposta</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Loading / Thinking Waveform Bar */}
        {isLoading && (
          <div className="flex gap-4 max-w-4xl mr-auto">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-600 flex items-center justify-center text-white shadow-md animate-pulse">
              <Bot className="w-5 h-5 text-indigo-100" />
            </div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl text-sm text-slate-300 flex items-center gap-3">
              <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
              <span>Intuitiva IA Base44 Engine processando resposta e código...</span>
              <div className="flex items-center gap-1 ml-2">
                <span className="w-1 h-3 bg-amber-400 animate-bounce" />
                <span className="w-1 h-5 bg-indigo-400 animate-bounce delay-75" />
                <span className="w-1 h-2 bg-emerald-400 animate-bounce delay-150" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts Pill Bar */}
      <div className="px-4 sm:px-6 py-2 bg-slate-950 border-t border-slate-900 overflow-x-auto no-scrollbar flex items-center gap-2 shrink-0">
        <span className="text-[11px] font-bold text-slate-400 whitespace-nowrap flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-400" />
          Base44 Prompts:
        </span>
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => {
              setSelectedSpecialty(qp.specialty as SpecialtyType);
              handleSendMessage(qp.label);
            }}
            className="text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-indigo-500/40 px-3 py-1 rounded-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5"
          >
            <span>{qp.label}</span>
            <ArrowRight className="w-3 h-3 text-slate-500" />
          </button>
        ))}
      </div>

      {/* Main Input Controls & File Drop Zone */}
      <div className="p-3 sm:p-4 bg-slate-900/90 border-t border-slate-800 shrink-0 space-y-3">
        {/* Attached Files Queue Bar */}
        {attachedFiles.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 p-2.5 bg-slate-950 border border-slate-800 rounded-xl">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mr-1">
              <FolderPlus className="w-3.5 h-3.5 text-indigo-400" />
              Arquivos ({attachedFiles.length}):
            </span>
            {attachedFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-700/80 rounded-lg text-xs font-semibold text-slate-200"
              >
                {file.isImage ? <ImageIcon className="w-3.5 h-3.5 text-indigo-400 shrink-0" /> : <FileText className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                <span className="truncate max-w-[140px] font-mono text-[11px]">{file.name}</span>
                <span className="text-[10px] text-slate-500">({(file.size / 1024).toFixed(0)}KB)</span>
                <button
                  onClick={() => removeAttachedFile(file.id)}
                  className="text-slate-400 hover:text-rose-400 p-0.5 rounded cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Active Speech Recording Live Visualizer */}
        {isListening && (
          <div className="p-2.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs flex items-center justify-between animate-pulse">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              <span className="font-bold">🎙️ Ouvindo comando de voz em tempo real... Fale seu prompt!</span>
            </div>
            <button
              type="button"
              onClick={toggleSpeechRecognition}
              className="text-[11px] font-extrabold text-rose-400 hover:underline cursor-pointer"
            >
              Parar Gravação
            </button>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2 sm:gap-3 max-w-5xl mx-auto"
        >
          {/* File Attachment Input Button */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            multiple
            className="hidden"
            accept="image/*,.txt,.js,.ts,.tsx,.json,.csv,.md,.html,.css,.py"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            title="Anexar arquivo do armazenamento (Código, Texto, CSV, JSON, Imagem)"
            className="p-3 bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-indigo-500/50 rounded-xl transition-all cursor-pointer relative shrink-0"
          >
            <Paperclip className="w-4 h-4 text-indigo-400" />
            {attachedFiles.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-600 text-white font-extrabold text-[10px] rounded-full flex items-center justify-center border border-slate-900">
                {attachedFiles.length}
              </span>
            )}
          </button>

          {/* Input Text Box */}
          <div className="relative flex-1 flex items-center">
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder={
                isListening
                  ? "Escutando sua voz... Fale para digitar seu comando..."
                  : "Descreva o app, backend, ideia ou anexe arquivos para a Intuitiva IA..."
              }
              className={`w-full bg-slate-950 text-slate-100 placeholder-slate-500 border rounded-xl px-4 py-3.5 text-sm outline-none transition-all pr-20 ${
                isListening
                  ? 'border-rose-500 ring-2 ring-rose-500/20 bg-rose-950/20'
                  : 'border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
              }`}
            />

            {/* Prompt Enhancer Button (Base44 Engine) */}
            {inputPrompt.trim().length > 3 && (
              <button
                type="button"
                onClick={handleEnhancePrompt}
                disabled={isEnhancingPrompt}
                title="Aprimorar prompt com Inteligência Base44"
                className="absolute right-10 p-2 text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 rounded-lg transition-all cursor-pointer font-bold text-xs flex items-center gap-1"
              >
                <Wand2 className={`w-4 h-4 ${isEnhancingPrompt ? 'animate-spin' : ''}`} />
              </button>
            )}

            {/* Microphone Voice Button */}
            <button
              type="button"
              onClick={toggleSpeechRecognition}
              title={
                !speechSupported
                  ? "API de Voz indisponível neste navegador"
                  : isListening
                  ? "Parar gravação de voz"
                  : "Comando por Voz (Microfone em Tempo Real)"
              }
              className={`absolute right-2 p-2 rounded-lg transition-all cursor-pointer ${
                isListening
                  ? 'bg-rose-600 text-white animate-pulse shadow-lg shadow-rose-600/40'
                  : speechSupported
                  ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                  : 'text-slate-600 opacity-50 cursor-not-allowed'
              }`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
          </div>

          {/* Send Button */}
          <button
            type="submit"
            disabled={(!inputPrompt.trim() && attachedFiles.length === 0) || isLoading}
            className={`px-5 py-3.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
              (inputPrompt.trim() || attachedFiles.length > 0) && !isLoading
                ? 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-lg shadow-indigo-600/25'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <span>Enviar</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Modal: Ideias & Prompts Base44 Hub */}
      {showIdeasModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-amber-500/20 text-amber-300 rounded-xl border border-amber-500/30">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    Galeria de Ideias & Protótipos Base44
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-extrabold uppercase border border-amber-500/30">
                      Modo Turbo
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Selecione uma ideia pré-configurada para injetar um prompt de nível de produção no chat.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowIdeasModal(false)}
                className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Ideas Grid */}
            <div className="p-6 overflow-y-auto space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {BASE44_IDEAS_LIST.map((idea) => (
                <div
                  key={idea.id}
                  className="p-4 bg-slate-950 border border-slate-800 hover:border-indigo-500/50 rounded-xl space-y-3 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-extrabold border border-indigo-500/30">
                        {idea.badge}
                      </span>
                      <span className="text-[10px] text-slate-500 uppercase font-bold">{idea.category}</span>
                    </div>

                    <h4 className="font-bold text-white text-sm group-hover:text-amber-300 transition-colors">
                      {idea.title}
                    </h4>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {idea.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-900 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {idea.tags.map(t => (
                        <span key={t} className="text-[9px] font-mono px-1.5 py-0.5 bg-slate-900 text-slate-400 rounded">
                          #{t}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => {
                        setInputPrompt(idea.prompt);
                        setShowIdeasModal(false);
                      }}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <span>Usar Ideia</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
