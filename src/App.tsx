import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ReplitAgentHome } from './components/ReplitAgentHome';
import { WebBuilderStudio } from './components/WebBuilderStudio';
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
import { UserProfile } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('replit-home');
  const [isPromptModalOpen, setIsPromptModalOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [initialBuilderPrompt, setInitialBuilderPrompt] = useState<string>('');

  const [user, setUser] = useState<UserProfile>({
    id: 'usr_demo_123',
    name: 'Richardwillyan65',
    email: 'richardwillyan65@gmail.com',
    avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=Richardwillyan65',
    plan: 'Pro',
    credits: 2500,
    isLoggedIn: true
  });

  const handleStartBuildFromHome = (promptText: string) => {
    setInitialBuilderPrompt(promptText);
    setActiveTab('webbuilder');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <Header
        onOpenPromptMaster={() => setIsPromptModalOpen(true)}
        onOpenBilling={() => setActiveTab('billing')}
        onOpenAuth={() => setIsAuthOpen(true)}
        user={user}
        onLogout={() => setUser({ ...user, isLoggedIn: false })}
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
        />

        {/* Dynamic Studio Tab Content */}
        <main className="flex-1 flex flex-col min-w-0 bg-slate-950 overflow-hidden">
          {activeTab === 'replit-home' && (
            <ReplitAgentHome
              userName={user.name}
              onStartBuild={handleStartBuildFromHome}
              onOpenImport={() => setActiveTab('importref')}
              onOpenUpgrade={() => setActiveTab('billing')}
            />
          )}
          {activeTab === 'webbuilder' && (
            <WebBuilderStudio initialPrompt={initialBuilderPrompt} />
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
        onLoginSuccess={(loggedInUser) => setUser(loggedInUser)}
      />
    </div>
  );
}



