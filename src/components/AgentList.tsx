
/**
 * Componente per la lista degli agenti disponibili
 * 
 * Mostra un elenco di agenti disponibili e gestisce la selezione di un agente
 * per iniziare o continuare una conversazione.
 */

import React from 'react';
import { useChat } from '../contexts/ChatContext';
import { usePackage } from '../contexts/PackageContext';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Code, Languages, Repeat, Settings } from 'lucide-react';

// Mappa per convertire le stringhe di icone nei componenti corrispondenti
const iconMap: Record<string, React.ReactNode> = {
  'repeat': <Repeat className="w-5 h-5" />,
  'languages': <Languages className="w-5 h-5" />,
  'pencil': <MessageSquare className="w-5 h-5" />,
  'code': <Code className="w-5 h-5" />,
  'settings': <Settings className="w-5 h-5" />,
};

const AgentList = () => {
  const { agents, loadingAgents, selectAgent, getCurrentSession } = useChat();
  const { currentPackageId } = usePackage();
  
  const currentSession = getCurrentSession();
  
  // Funzione per verificare se un agente è disponibile per il pacchetto corrente
  const isAgentAvailable = (requiredPackage: string): boolean => {
    if (!currentPackageId) return false;
    
    // Logica semplificata: free può accedere solo a free
    // pro può accedere a free e pro
    // enterprise può accedere a tutto
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
  const handleAgentSelect = (agentId: string) => {
    selectAgent(agentId);
  };
  
  if (loadingAgents) {
    return (
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-base">Agenti</h3>
        </div>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center space-x-3 p-3 rounded-md">
            <Skeleton className="h-9 w-9 rounded-full" />
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  return (
    <ScrollArea className="h-full p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-base">Agenti</h3>
        <Badge variant="outline" className="text-xs">
          {agents.length} disponibili
        </Badge>
      </div>
      <div className="space-y-1.5">
        {agents.map((agent) => {
          const isAvailable = isAgentAvailable(agent.requiredPackage);
          const isActive = currentSession?.agentId === agent.id;
          
          return (
            <button
              key={agent.id}
              className={`w-full flex items-center space-x-3 p-3 rounded-md transition-colors ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : isAvailable
                  ? 'hover:bg-secondary text-foreground'
                  : 'opacity-60 cursor-not-allowed'
              }`}
              onClick={() => isAvailable && handleAgentSelect(agent.id)}
              disabled={!isAvailable}
            >
              <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full bg-accent">
                {iconMap[agent.icon] || <MessageSquare className="w-5 h-5" />}
              </div>
              <div className="flex-grow text-left">
                <h4 className="font-medium text-sm">{agent.name}</h4>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {agent.description}
                </p>
              </div>
              {!isAvailable && (
                <Badge variant="outline" className="text-xs bg-secondary">
                  {agent.requiredPackage.charAt(0).toUpperCase() + agent.requiredPackage.slice(1)}
                </Badge>
              )}
            </button>
          );
        })}
      </div>
    </ScrollArea>
  );
};

export default AgentList;
