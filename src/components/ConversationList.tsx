
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChatSession } from '@/types';
import { MessageSquare, Plus } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ConversationListProps {
  sessions: ChatSession[];
  currentSessionId: string | null;
  onSelectSession: (sessionId: string) => void;
  onNewChat: () => void;
}

export default function ConversationList({
  sessions,
  currentSessionId,
  onSelectSession,
  onNewChat
}: ConversationListProps) {
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

  return (
    <div className="flex flex-col h-full">
      <div className="p-3">
        <Button 
          onClick={onNewChat}
          className="w-full gap-2"
          size="lg"
        >
          <Plus size={18} />
          <span>Nuova chat</span>
        </Button>
      </div>
      
      <ScrollArea className="flex-1 p-2">
        <div className="space-y-1">
          {sessions.map((session) => {
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
                variant={currentSessionId === session.id ? "secondary" : "ghost"}
                className={`w-full justify-start h-auto py-3 px-3 text-left ${currentSessionId === session.id ? "bg-secondary" : ""}`}
                onClick={() => onSelectSession(session.id)}
              >
                <div className="flex items-start gap-3">
                  <MessageSquare className="h-5 w-5 shrink-0 mt-0.5" />
                  <div className="flex flex-col items-start">
                    <span className="font-medium line-clamp-1">
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
      </ScrollArea>
    </div>
  );
}
