
/**
 * Pagina principale della dashboard
 * 
 * Mostra l'interfaccia principale con la barra laterale e l'area di chat.
 */

import React, { useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import ChatWindow from '../../components/ChatWindow';
import ThemeToggle from '../../components/ThemeToggle';
import { useChat } from '../../contexts/ChatContext';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';

const DashboardPage = () => {
  const { getCurrentSession, agents, loadingAgents } = useChat();
  const { user } = useAuth();
  const currentSession = getCurrentSession();
  
  // Debug output
  useEffect(() => {
    console.log('Dashboard Page:', { 
      currentSession, 
      user, 
      agentsCount: agents.length,
      loadingAgents
    });
    
    if (agents.length > 0) {
      toast.success(`${agents.length} agenti disponibili`);
    } else if (!loadingAgents) {
      toast.error('Nessun agente disponibile');
    }
  }, [currentSession, user, agents, loadingAgents]);
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex flex-col flex-grow">
        <header className="h-16 border-b flex items-center justify-between px-6">
          <h1 className="text-xl font-medium">
            {currentSession ? (
              <>Chat con <span className="font-semibold">{currentSession.agentId}</span></>
            ) : (
              'Dashboard'
            )}
          </h1>
          <div className="flex items-center gap-4">
            {user && (
              <div className="text-sm">
                <span className="font-medium">{user.name}</span>
                {user.subscriptionId && (
                  <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                    {user.subscriptionId}
                  </span>
                )}
              </div>
            )}
            <ThemeToggle />
          </div>
        </header>
        
        <main className="flex-grow overflow-hidden">
          <ChatWindow />
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
