
/**
 * Pagina principale della dashboard
 * 
 * Mostra l'interfaccia principale con la barra laterale e l'area di chat.
 */

import React from 'react';
import Sidebar from '../../components/Sidebar';
import ChatWindow from '../../components/ChatWindow';
import ThemeToggle from '../../components/ThemeToggle';
import { useChat } from '../../contexts/ChatContext';

const DashboardPage = () => {
  const { getCurrentSession } = useChat();
  const currentSession = getCurrentSession();
  
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
          <ThemeToggle />
        </header>
        
        <main className="flex-grow overflow-hidden">
          <ChatWindow />
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
