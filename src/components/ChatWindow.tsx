
/**
 * Componente per la finestra di chat
 * 
 * Visualizza la conversazione con l'agente selezionato e fornisce
 * un'interfaccia per inviare messaggi.
 */

import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../contexts/ChatContext';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';

const ChatWindow = () => {
  const { sendMessage, isStreaming, getCurrentSession } = useChat();
  const [inputMessage, setInputMessage] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const currentSession = getCurrentSession();
  const messages = currentSession?.messages || [];
  
  // Effetto per scrollare all'ultimo messaggio
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages]);
  
  // Gestione invio messaggio
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    sendMessage(inputMessage.trim());
    setInputMessage('');
    
    // Focus sulla textarea
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };
  
  // Gestione tasto Invio
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // Componente per l'indicatore di digitazione
  const TypingIndicator = () => (
    <div className="typing-indicator">
      <div className="typing-indicator-dot"></div>
      <div className="typing-indicator-dot"></div>
      <div className="typing-indicator-dot"></div>
    </div>
  );
  
  // Se non c'è una sessione attiva
  if (!currentSession) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 mb-4 rounded-full bg-accent flex items-center justify-center">
          <Send className="w-8 h-8 text-accent-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Nessun agente selezionato</h3>
        <p className="text-muted-foreground mb-6">
          Seleziona un agente dalla barra laterale per iniziare una conversazione
        </p>
      </div>
    );
  }
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex-grow relative overflow-hidden">
        <ScrollArea ref={scrollAreaRef} className="h-full p-4">
          {messages.length === 0 ? (
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
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={
                    message.role === 'user'
                      ? 'user-message'
                      : message.role === 'system'
                      ? 'system-message'
                      : isStreaming && message.id === messages[messages.length - 1].id
                      ? 'streaming-message'
                      : 'agent-message'
                  }
                >
                  {message.content}
                </div>
              ))}
              {isStreaming && (
                <div className="agent-message">
                  <TypingIndicator />
                </div>
              )}
            </div>
          )}
        </ScrollArea>
      </div>
      
      <div className="p-4 border-t">
        <div className="flex items-end space-x-2">
          <Textarea
            ref={textareaRef}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Scrivi un messaggio..."
            className="resize-none min-h-[80px]"
            disabled={isStreaming}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isStreaming}
            className="flex-shrink-0"
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Invia</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
