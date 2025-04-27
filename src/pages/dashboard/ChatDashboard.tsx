
import React, { useState, useEffect } from 'react';
import { useChat } from '@/contexts/ChatContext';
import { usePackage } from '@/contexts/PackageContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import AgentCard from '@/components/AgentCard';
import { MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import ConversationList from '@/components/ConversationList';
import ChatView from '@/components/ChatView';
import { Agent } from '@/types';
import { toast } from 'sonner';

export default function ChatDashboard() {
  const { 
    agents, 
    loadingAgents, 
    sessions,
    currentSession, 
    isStreaming,
    selectAgent, 
    sendMessage,
    getCurrentSession
  } = useChat();
  const { currentPackageId } = usePackage();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  // Effetto per gestire il responsive della sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // Setup iniziale
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Funzione per verificare se un agente è disponibile per il pacchetto corrente
  const isAgentAvailable = (requiredPackage: string): boolean => {
    if (!currentPackageId) return false;
    
    switch (currentPackageId) {
      case 'free':
        return requiredPackage === 'free';
      case 'pro':
        return ['free', 'pro'].includes(requiredPackage);
      case 'enterprise':
        return true;
      default:
        return false;
    }
  };

  // Gestione della selezione di un agente
  const handleAgentSelect = async (agent: Agent) => {
    try {
      await selectAgent(agent.id);
      setSelectedAgent(agent);
      toast.success(`Agente ${agent.name} selezionato`);
    } catch (error) {
      console.error('Error selecting agent:', error);
      toast.error(`Errore nella selezione dell'agente`);
    }
  };

  // Gestione nuovo messaggio
  const handleSendMessage = async (content: string) => {
    try {
      await sendMessage(content);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error(`Errore nell'invio del messaggio`);
    }
  };

  // Funzione per creare una nuova chat con l'agente corrente
  const handleNewChat = async () => {
    if (selectedAgent) {
      try {
        await selectAgent(selectedAgent.id);
        toast.success(`Nuova chat con ${selectedAgent.name}`);
      } catch (error) {
        console.error('Error creating new chat:', error);
        toast.error(`Errore nella creazione della nuova chat`);
      }
    } else {
      toast.info('Seleziona prima un agente');
    }
  };

  // Ottieni la sessione corrente
  const currentChatSession = getCurrentSession();
  
  // Converti le sessioni in un array e le ordina per data di ultimo messaggio
  const sessionsList = Object.values(sessions).sort((a, b) => {
    const aTime = a.messages.length > 0 
      ? a.messages[a.messages.length - 1].timestamp.getTime() 
      : a.createdAt.getTime();
    
    const bTime = b.messages.length > 0 
      ? b.messages[b.messages.length - 1].timestamp.getTime() 
      : b.createdAt.getTime();
    
    return bTime - aTime;
  });

  // Filtra le sessioni per l'agente selezionato
  const filteredSessions = selectedAgent 
    ? sessionsList.filter(session => session.agentId === selectedAgent.id)
    : [];

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      {/* Header */}
      <header className="h-16 border-b flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-medium">Chat Dashboard</h1>
        </div>
      </header>

      {/* Contenuto principale */}
      <div className="flex-1 flex overflow-hidden">
        {/* Selezione agente o visualizzazione chat */}
        {!selectedAgent ? (
          <div className="w-full p-6 overflow-auto">
            <h2 className="text-2xl font-semibold mb-6">Seleziona un Agente</h2>
            
            {loadingAgents ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-64 animate-pulse bg-secondary rounded-lg" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {agents.map((agent) => (
                  <AgentCard 
                    key={agent.id}
                    agent={agent}
                    onSelect={handleAgentSelect}
                    isAvailable={isAgentAvailable(agent.requiredPackage)}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-1 overflow-hidden relative">
            {/* Sidebar con le conversazioni */}
            <div 
              className={`border-r bg-background transition-all ${
                sidebarOpen ? 'w-72' : 'w-0 overflow-hidden'
              }`}
            >
              <div className="h-full flex flex-col">
                <div className="p-3 border-b flex items-center">
                  <div className="flex-1">
                    <h3 className="font-medium truncate">{selectedAgent.name}</h3>
                    <p className="text-xs text-muted-foreground">Le tue conversazioni</p>
                  </div>
                </div>
                <ConversationList 
                  sessions={filteredSessions}
                  currentSessionId={currentSession}
                  onSelectSession={(sessionId) => {
                    // Implementa il cambio di sessione
                  }}
                  onNewChat={handleNewChat}
                />
              </div>
            </div>
            
            {/* Toggle sidebar button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{ left: sidebarOpen ? '17.5rem' : '0.5rem' }}
            >
              {sidebarOpen ? <ChevronLeft /> : <ChevronRight />}
            </Button>
            
            {/* Area principale di chat */}
            <div className="flex-1 flex flex-col">
              {selectedAgent && (
                <>
                  <div className="border-b p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{selectedAgent.name}</h3>
                      <span className="text-xs text-muted-foreground">
                        {isStreaming ? 'Sta scrivendo...' : 'Online'}
                      </span>
                    </div>
                    <div className="ml-auto">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedAgent(null)}
                      >
                        Cambia agente
                      </Button>
                    </div>
                  </div>
                  
                  <ChatView
                    session={currentChatSession}
                    agentName={selectedAgent.name}
                    onSendMessage={handleSendMessage}
                    isStreaming={isStreaming}
                  />
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
