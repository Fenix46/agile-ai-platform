
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatSession } from '@/types';
import ChatMessageBubble from './ChatMessageBubble';
import ChatInput from './ChatInput';
import { Send } from 'lucide-react';

interface ChatViewProps {
  session: ChatSession | null;
  agentName?: string;
  agentAvatar?: string;
  onSendMessage: (content: string) => void;
  isStreaming?: boolean;
}

export default function ChatView({ 
  session, 
  agentName, 
  agentAvatar,
  onSendMessage, 
  isStreaming = false 
}: ChatViewProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // Effetto per scrollare all'ultimo messaggio
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [session?.messages]);

  // Componente per l'indicatore di digitazione
  const TypingIndicator = () => (
    <div className="flex space-x-1 p-3 rounded-lg bg-secondary w-fit">
      <div className="bg-secondary-foreground/70 h-2 w-2 rounded-full animate-pulse-subtle"></div>
      <div className="bg-secondary-foreground/70 h-2 w-2 rounded-full animate-pulse-subtle" style={{ animationDelay: '0.2s' }}></div>
      <div className="bg-secondary-foreground/70 h-2 w-2 rounded-full animate-pulse-subtle" style={{ animationDelay: '0.4s' }}></div>
    </div>
  );

  // Se non c'è una sessione attiva
  if (!session) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 mb-4 rounded-full bg-accent flex items-center justify-center">
          <Send className="w-8 h-8 text-accent-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Nessuna chat selezionata</h3>
        <p className="text-muted-foreground mb-6">
          Seleziona una chat esistente o inizia una nuova conversazione
        </p>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow relative overflow-hidden">
        <ScrollArea ref={scrollAreaRef} className="h-full p-4">
          {session.messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="w-16 h-16 mb-4 rounded-full bg-accent flex items-center justify-center">
                <Send className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Inizia una conversazione</h3>
              <p className="text-muted-foreground">
                Invia un messaggio per iniziare a parlare con l'agente
              </p>
            </div>
          ) : (
            <div className="space-y-4 pb-4">
              {session.messages.map((message) => (
                <ChatMessageBubble 
                  key={message.id} 
                  message={message} 
                  agentName={agentName}
                  agentAvatar={agentAvatar}
                />
              ))}
              {isStreaming && (
                <div className="flex items-start gap-3">
                  <TypingIndicator />
                </div>
              )}
            </div>
          )}
        </ScrollArea>
      </div>
      
      <ChatInput 
        onSendMessage={onSendMessage}
        isDisabled={isStreaming}
      />
    </div>
  );
}
