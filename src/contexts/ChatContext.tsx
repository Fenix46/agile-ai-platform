
/**
 * Context per la gestione delle chat con gli agenti
 * 
 * Gestisce le sessioni di chat, i messaggi e il loro stato,
 * incluso lo streaming dei messaggi.
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

import { ChatState, ChatSession, Message, Agent } from '../types';
import { chatAPI, agentsAPI } from '../services/api';
import { useAuth } from './AuthContext';

// Stato iniziale
const initialChatState: ChatState = {
  sessions: {},
  currentSession: null,
  isStreaming: false,
  error: null,
  cleanupStream: null,
};

// Creazione del context
interface ChatContextType extends ChatState {
  agents: Agent[];
  loadingAgents: boolean;
  selectAgent: (agentId: string) => Promise<void>;
  selectSession: (sessionId: string) => void;
  sendMessage: (content: string) => Promise<void>;
  getCurrentSession: () => ChatSession | null;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Provider component
export function ChatProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ChatState>(initialChatState);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loadingAgents, setLoadingAgents] = useState(true);
  const { isAuthenticated } = useAuth();

  // Carica gli agenti disponibili
  useEffect(() => {
    const fetchAgents = async () => {
      if (!isAuthenticated) return;
      
      try {
        setLoadingAgents(true);
        const fetchedAgents = await agentsAPI.getAgents();
        console.log('Agenti caricati:', fetchedAgents);
        setAgents(fetchedAgents);
      } catch (error) {
        console.error('Error fetching agents:', error);
        toast.error('Impossibile caricare gli agenti');
      } finally {
        setLoadingAgents(false);
      }
    };

    fetchAgents();
  }, [isAuthenticated]);

  // Carica le sessioni esistenti
  useEffect(() => {
    const fetchSessions = async () => {
      if (!isAuthenticated) return;
      
      try {
        const sessions = await chatAPI.getSessions();
        console.log('Sessioni caricate:', sessions);
        const sessionsMap: Record<string, ChatSession> = {};
        
        sessions.forEach(session => {
          sessionsMap[session.id] = session;
        });
        
        setState(prev => ({
          ...prev,
          sessions: sessionsMap,
          currentSession: sessions.length > 0 ? sessions[0].id : null,
        }));
      } catch (error) {
        console.error('Error fetching chat sessions:', error);
      }
    };

    fetchSessions();
  }, [isAuthenticated]);

  // Seleziona o crea una sessione per un agente
  const selectAgent = async (agentId: string) => {
    try {
      // Verifica se esiste già una sessione per questo agente
      const existingSession = Object.values(state.sessions).find(
        session => session.agentId === agentId
      );
      
      if (existingSession) {
        setState(prev => ({ ...prev, currentSession: existingSession.id }));
        return;
      }
      
      // Crea una nuova sessione
      const newSession = await chatAPI.createSession(agentId);
      
      setState(prev => ({
        ...prev,
        sessions: {
          ...prev.sessions,
          [newSession.id]: newSession,
        },
        currentSession: newSession.id,
      }));
    } catch (error) {
      console.error('Error selecting agent:', error);
      toast.error('Impossibile connettersi con l\'agente');
    }
  };

  // Seleziona una sessione esistente
  const selectSession = (sessionId: string) => {
    if (state.sessions[sessionId]) {
      setState(prev => ({ ...prev, currentSession: sessionId }));
    }
  };

  // Ottieni la sessione corrente
  const getCurrentSession = (): ChatSession | null => {
    if (!state.currentSession) return null;
    return state.sessions[state.currentSession] || null;
  };

  // Invia un messaggio e gestisci la risposta
  const sendMessage = async (content: string): Promise<void> => {
    if (!state.currentSession) {
      toast.error('Nessun agente selezionato');
      return;
    }

    const sessionId = state.currentSession;
    const session = state.sessions[sessionId];
    
    // Aggiungi il messaggio dell'utente
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date(),
    };
    
    setState(prev => ({
      ...prev,
      sessions: {
        ...prev.sessions,
        [sessionId]: {
          ...session,
          messages: [...session.messages, userMessage],
        },
      },
    }));

    try {
      // Placeholder per il messaggio in streaming
      const streamingMessageId = `streaming-${Date.now()}`;
      let streamingContent = '';
      
      // Aggiungi il messaggio di streaming inizialmente vuoto
      setState(prev => ({
        ...prev,
        isStreaming: true,
        sessions: {
          ...prev.sessions,
          [sessionId]: {
            ...prev.sessions[sessionId],
            messages: [
              ...prev.sessions[sessionId].messages,
              {
                id: streamingMessageId,
                role: 'agent',
                content: streamingContent,
                timestamp: new Date(),
              },
            ],
          },
        },
      }));

      // Gestisci lo streaming
      const stopStream = chatAPI.streamMessage(
        session,
        content,
        // On chunk
        (chunk: string) => {
          streamingContent += chunk;
          
          setState(prev => {
            const updatedSession = { ...prev.sessions[sessionId] };
            const messageIndex = updatedSession.messages.findIndex(m => m.id === streamingMessageId);
            
            if (messageIndex !== -1) {
              updatedSession.messages[messageIndex].content = streamingContent;
            }
            
            return {
              ...prev,
              sessions: {
                ...prev.sessions,
                [sessionId]: updatedSession,
              },
            };
          });
        },
        // On complete
        (completeMessage: Message) => {
          setState(prev => {
            const updatedSession = { ...prev.sessions[sessionId] };
            const messageIndex = updatedSession.messages.findIndex(m => m.id === streamingMessageId);
            
            if (messageIndex !== -1) {
              updatedSession.messages[messageIndex] = {
                ...completeMessage,
                id: streamingMessageId,
              };
            }
            
            return {
              ...prev,
              isStreaming: false,
              sessions: {
                ...prev.sessions,
                [sessionId]: updatedSession,
              },
            };
          });
        }
      );

      // Salva la funzione di pulizia nel contesto
      const cleanup = await stopStream;
      setState(prev => ({ 
        ...prev, 
        cleanupStream: () => {
          if (cleanup) cleanup();
        } 
      }));
    } catch (error) {
      setState(prev => ({ ...prev, isStreaming: false }));
      console.error('Error sending message:', error);
      toast.error('Errore nell\'invio del messaggio');
    }
  };

  return (
    <ChatContext.Provider
      value={{
        ...state,
        agents,
        loadingAgents,
        selectAgent,
        selectSession,
        sendMessage,
        getCurrentSession,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

// Hook personalizzato per utilizzare il context
export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat deve essere usato all\'interno di un ChatProvider');
  }
  return context;
}
