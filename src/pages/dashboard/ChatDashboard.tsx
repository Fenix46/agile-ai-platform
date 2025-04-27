
import React, { useState, useEffect } from 'react';
import { useChat } from '@/contexts/ChatContext';
import { usePackage } from '@/contexts/PackageContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import AgentCard from '@/components/AgentCard';
import { MessageSquare } from 'lucide-react';
import ChatView from '@/components/ChatView';
import { Agent } from '@/types';
import { toast } from 'sonner';
import Sidebar from '@/components/Sidebar';

export default function ChatDashboard() {
  const { 
    agents, 
    loadingAgents, 
    currentSession, 
    isStreaming,
    selectAgent, 
    sendMessage,
    getCurrentSession
  } = useChat();
  const { currentPackageId } = usePackage();
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  // Effect to find and set the selected agent when a currentSession exists
  useEffect(() => {
    const session = getCurrentSession();
    if (session && agents.length > 0) {
      const agent = agents.find(agent => agent.id === session.agentId);
      if (agent) {
        setSelectedAgent(agent);
      }
    }
  }, [getCurrentSession, agents, currentSession]);

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

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="ml-64 flex flex-col w-full"> {/* Space for persistent sidebar */}
        {/* Header */}
        <header className="h-16 border-b flex items-center justify-between px-6 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
          <h1 className="text-xl font-medium">Chat</h1>
          {selectedAgent && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSelectedAgent(null)}
            >
              Cambia agente
            </Button>
          )}
        </header>

        {/* Contenuto principale */}
        <div className="flex-1 overflow-hidden">
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
            <div className="flex flex-1 overflow-hidden">
              {/* Area principale di chat */}
              <div className="flex-1 flex flex-col">
                <div className="border-b p-4 flex items-center gap-3">
                  <div className="agent-logo">
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
                      onClick={handleNewChat}
                    >
                      Nuova chat
                    </Button>
                  </div>
                </div>
                
                <ChatView
                  session={currentChatSession}
                  agentName={selectedAgent.name}
                  onSendMessage={handleSendMessage}
                  isStreaming={isStreaming}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Sidebar />
    </div>
  );
}
