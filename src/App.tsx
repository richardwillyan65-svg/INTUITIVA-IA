import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ReplitAgentHome } from './components/ReplitAgentHome';
import { LovableDashboardView } from './components/LovableDashboardView';
import { WebBuilderStudio } from './components/WebBuilderStudio';
import { ThemesStudio } from './components/ThemesStudio';
import { ImportReferenceStudio } from './components/ImportReferenceStudio';
import { BillingStudio } from './components/BillingStudio';
import { ChatStudio } from './components/ChatStudio';
import { CodeStudio } from './components/CodeStudio';
import { AgentStudio } from './components/AgentStudio';
import { MarketingStudio } from './components/MarketingStudio';
import { ArchitectureStudio } from './components/ArchitectureStudio';
import { PlatformGuides } from './components/PlatformGuides';
import { CapabilitiesOverview } from './components/CapabilitiesOverview';
import { PromptMasterModal } from './components/PromptMasterModal';
import { AuthModal } from './components/AuthModal';
import { LovableLandingScreen } from './components/LovableLandingScreen';
import { UserProfile, UserSavedProject } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('lovable-dashboard');
  const [isPromptModalOpen, setIsPromptModalOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register');
  const [initialBuilderPrompt, setInitialBuilderPrompt] = useState<string>('');

  // Persistent User Saved Projects State (Default [] so fake recents are removed as requested)
  const [savedProjects, setSavedProjects] = useState<UserSavedProject[]>(() => {
    const saved = localStorage.getItem('intuitiva_user_projects');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.warn('Erro ao carregar projetos salvos', e);
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('intuitiva_user_projects', JSON.stringify(savedProjects));
  }, [savedProjects]);

  const handleSaveProject = (newProject: UserSavedProject) => {
    setSavedProjects((prev) => {
      const existsIndex = prev.findIndex(p => p.id === newProject.id || p.title === newProject.title);
      if (existsIndex !== -1) {
        const updated = [...prev];
        updated[existsIndex] = newProject;
        return updated;
      }
      return [newProject, ...prev];
    });
  };

  // Default initial state: user not logged in to showcase Lovable Landing Screen initially
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('intuitiva_user_session');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.warn('Erro ao restaurar sessão', e);
      }
    }
    return {
      id: 'usr_guest',
      name: 'Richard',
      email: 'richardwillyan65@gmail.com',
      avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=Richard',
      plan: 'Pro',
      credits: 5000,
      isLoggedIn: false
    };
  });

  // Save user session changes
  useEffect(() => {
    if (user.isLoggedIn) {
      localStorage.setItem('intuitiva_user_session', JSON.stringify(user));
    } else {
      localStorage.removeItem('intuitiva_user_session');
    }
  }, [user]);

  const handleOpenAuthModal = (mode: 'login' | 'register' = 'register', promptText: string = '') => {
    setAuthMode(mode);
    if (promptText) {
      setInitialBuilderPrompt(promptText);
    }
    setIsAuthOpen(true);
  };

  const handleLoginSuccess = (loggedInUser: UserProfile) => {
    setUser(loggedInUser);
    setIsAuthOpen(false);

    if (initialBuilderPrompt) {
      setActiveTab('webbuilder');
    } else {
      setActiveTab('lovable-dashboard');
    }
  };

  const handleLogout = () => {
    setUser({ ...user, isLoggedIn: false });
    setInitialBuilderPrompt('');
  };

  const handleStartBuildFromHome = (promptText: string) => {
    setInitialBuilderPrompt(promptText);
    setActiveTab('webbuilder');
  };

  // If user is not logged in, render the Lovable Landing Screen first!
  if (!user.isLoggedIn) {
    return (
      <>
        <LovableLandingScreen
          onOpenAuth={(mode, prompt) => handleOpenAuthModal(mode, prompt)}
          onOpenPricing={() => handleOpenAuthModal('register')}
        />

        {/* Auth Modal overlay for Login / Sign Up */}
        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onLoginSuccess={handleLoginSuccess}
          initialMode={authMode}
          initialPrompt={initialBuilderPrompt}
        />
      </>
    );
  }

  // Once authenticated, render full Intuitiva AI Studio Workspace!
  return (
    <div className="min-h-screen bg-[#141416] text-slate-100 flex flex-col font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <Header
        onOpenPromptMaster={() => setIsPromptModalOpen(true)}
        onOpenBilling={() => setActiveTab('billing')}
        onOpenAuth={() => handleOpenAuthModal('login')}
        user={user}
        onLogout={handleLogout}
        activeTab={activeTab}
      />

      {/* Main Layout Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          userName={user.name}
          onOpenUpgrade={() => setActiveTab('billing')}
          onLogout={handleLogout}
          savedProjects={savedProjects}
        />

        {/* Dynamic Studio Tab Content */}
        <main className="flex-1 flex flex-col min-w-0 bg-[#141416] overflow-hidden">
          {activeTab === 'lovable-dashboard' && (
            <LovableDashboardView
              userName={user.name}
              onStartBuild={handleStartBuildFromHome}
              savedProjects={savedProjects}
            />
          )}
          {activeTab === 'replit-home' && (
            <ReplitAgentHome
              userName={user.name}
              onStartBuild={handleStartBuildFromHome}
              onOpenImport={() => setActiveTab('importref')}
              onOpenUpgrade={() => setActiveTab('billing')}
            />
          )}
          {activeTab === 'webbuilder' && (
            <WebBuilderStudio
              initialPrompt={initialBuilderPrompt}
              onSaveProject={handleSaveProject}
            />
          )}
          {activeTab === 'themes' && (
            <ThemesStudio onSelectTheme={handleStartBuildFromHome} />
          )}
          {(activeTab === 'projects' || activeTab === 'code') && <CodeStudio />}
          {(activeTab === 'published' || activeTab === 'billing') && <BillingStudio />}
          {activeTab === 'importref' && <ImportReferenceStudio />}
          {activeTab === 'chat' && (
            <ChatStudio onStartBuild={handleStartBuildFromHome} />
          )}
          {activeTab === 'agents' && <AgentStudio />}
          {activeTab === 'marketing' && <MarketingStudio />}
          {activeTab === 'architecture' && <ArchitectureStudio />}
          {activeTab === 'platforms' && <PlatformGuides />}
          {activeTab === 'specialties' && <CapabilitiesOverview />}
        </main>
      </div>

      {/* Prompt Master Inspection Modal */}
      <PromptMasterModal
        isOpen={isPromptModalOpen}
        onClose={() => setIsPromptModalOpen(false)}
      />

      {/* Auth Login / Register Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        initialMode={authMode}
        initialPrompt={initialBuilderPrompt}
      />
    </div>
  );
}

