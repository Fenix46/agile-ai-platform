
import React from 'react';
import { Button } from '@/components/ui/button';
import { useChat } from '@/contexts/ChatContext';
import { MessageSquare, Plus } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function ConversationList() {
  const { 
    sessions, 
    currentSession, 
    selectSession, 
    selectAgent, 
    getCurrentSession 
  } = useChat();
  
  const currentChatSession = getCurrentSession();
  const selectedAgentId = currentChatSession?.agentId;
  
  // Filtra le sessioni per l'agente selezionato
  const filteredSessions = selectedAgentId 
    ? Object.values(sessions).filter(session => session.agentId === selectedAgentId)
    : [];

  // Ordiniamo per data dell'ultimo messaggio
  const sortedSessions = filteredSessions.sort((a, b) => {
    const aTime = a.messages.length > 0 
      ? a.messages[a.messages.length - 1].timestamp.getTime() 
      : a.createdAt.getTime();
    
    const bTime = b.messages.length > 0 
      ? b.messages[b.messages.length - 1].timestamp.getTime() 
      : b.createdAt.getTime();
    
    return bTime - aTime;
  });

  // Funzione per formattare la data
  const formatDate = (date: Date) => {
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === now.toDateString()) {
      return 'Oggi';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Ieri';
    } else {
      return new Intl.DateTimeFormat('it-IT', { 
        day: '2-digit', 
        month: '2-digit'
      }).format(date);
    }
  };

  // Funzione per ottenere l'orario
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('it-IT', { 
      hour: '2-digit', 
      minute: '2-digit'
    }).format(date);
  };

  // Funzione per creare una nuova chat con l'agente corrente
  const handleNewChat = async () => {
    if (selectedAgentId) {
      await selectAgent(selectedAgentId);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-3">
        <Button 
          onClick={handleNewChat}
          className="w-full gap-2"
          size="sm"
        >
          <Plus size={16} />
          <span>Nuova chat</span>
        </Button>
      </div>
      
      <ScrollArea className="flex-1 p-2">
        {sortedSessions.length === 0 ? (
          <div className="py-4 px-2 text-center text-muted-foreground text-sm">
            Nessuna conversazione con questo agente
          </div>
        ) : (
          <div className="space-y-1">
            {sortedSessions.map((session) => {
              // Trova l'ultimo messaggio se esiste
              const lastMessage = session.messages.length > 0 
                ? session.messages[session.messages.length - 1] 
                : null;
              
              const lastMessageTime = lastMessage?.timestamp || session.createdAt;
              const date = formatDate(lastMessageTime);
              const time = formatTime(lastMessageTime);
              
              // Determina un titolo per la sessione
              const title = lastMessage?.content.substring(0, 25) || 'Nuova conversazione';

              return (
                <Button
                  key={session.id}
                  variant={currentSession === session.id ? "secondary" : "ghost"}
                  className={`w-full justify-start h-auto py-2 px-2 text-left ${currentSession === session.id ? "bg-secondary" : ""}`}
                  onClick={() => selectSession(session.id)}
                >
                  <div className="flex items-start gap-2">
                    <MessageSquare className="h-4 w-4 shrink-0 mt-0.5" />
                    <div className="flex flex-col items-start">
                      <span className="font-medium text-xs line-clamp-1">
                        {title}{title.length > 25 ? '...' : ''}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {date} · {time}
                      </span>
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
