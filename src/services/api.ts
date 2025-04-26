
/**
 * Servizio API per l'interazione con il backend
 * 
 * Questo modulo gestisce tutte le chiamate al backend, inclusa l'autenticazione,
 * il recupero di dati e l'invio di richieste di chat.
 * 
 * Nella versione frontend standalone, le API sono mockate.
 */

import { 
  User, LoginCredentials, SignupCredentials, 
  Package, Agent, Message, ChatSession 
} from '../types';

// Base URL dell'API (in produzione sarebbe un vero endpoint)
const API_URL = import.meta.env.VITE_API_URL || '/api';

// Salvataggio e recupero del token JWT da localStorage
const getToken = () => localStorage.getItem('auth_token');
const saveToken = (token: string) => localStorage.setItem('auth_token', token);
const removeToken = () => localStorage.removeItem('auth_token');

// Configurazione header per le richieste autenticate
const getAuthHeaders = () => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Funzione generica per le chiamate fetch
const fetchAPI = async (endpoint: string, options = {}) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Si è verificato un errore');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// API per autenticazione
export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<{ user: User; token: string }> => {
    // Mock API response per frontend standalone
    if (!import.meta.env.VITE_API_URL) {
      // Simula un breve delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock risposta
      const mockUser = {
        id: '1',
        name: 'Utente Demo',
        email: credentials.email,
        role: 'user' as const,
        avatar: 'https://avatars.githubusercontent.com/u/1',
        subscriptionId: 'free',
      };
      
      const mockToken = 'mock-jwt-token-' + Math.random();
      saveToken(mockToken);
      
      return { user: mockUser, token: mockToken };
    }
    
    // Implementazione reale
    const data = await fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (data.token) {
      saveToken(data.token);
    }
    
    return data;
  },
  
  signup: async (credentials: SignupCredentials): Promise<{ user: User; token: string }> => {
    // Mock API response per frontend standalone
    if (!import.meta.env.VITE_API_URL) {
      // Simula un breve delay
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Mock risposta
      const mockUser = {
        id: '1',
        name: credentials.name,
        email: credentials.email,
        role: 'user' as const,
        avatar: 'https://avatars.githubusercontent.com/u/1',
        subscriptionId: 'free',
      };
      
      const mockToken = 'mock-jwt-token-' + Math.random();
      saveToken(mockToken);
      
      return { user: mockUser, token: mockToken };
    }
    
    // Implementazione reale
    const data = await fetchAPI('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (data.token) {
      saveToken(data.token);
    }
    
    return data;
  },
  
  logout: (): void => {
    removeToken();
  },
  
  getCurrentUser: async (): Promise<User> => {
    // Mock API response per frontend standalone
    if (!import.meta.env.VITE_API_URL) {
      // Verifica se c'è un token salvato
      const token = getToken();
      if (!token) throw new Error('Nessun utente autenticato');
      
      // Mock risposta
      return {
        id: '1',
        name: 'Utente Demo',
        email: 'demo@example.com',
        role: 'user' as const,
        avatar: 'https://avatars.githubusercontent.com/u/1',
        subscriptionId: 'free',
      };
    }
    
    // Implementazione reale
    return fetchAPI('/auth/me');
  },
};

// API per i pacchetti
export const packagesAPI = {
  getPackages: async (): Promise<Package[]> => {
    // Mock API response per frontend standalone
    if (!import.meta.env.VITE_API_URL) {
      // Simula un breve delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock risposta
      return [
        {
          id: 'free',
          name: 'Free',
          description: 'Piano base per provare la piattaforma',
          price: 0,
          features: ['Accesso agli agenti base', 'Max 50 messaggi/giorno', 'Supporto community'],
          maxAgents: 2,
          maxMessages: 50,
        },
        {
          id: 'pro',
          name: 'Pro',
          description: 'Per professionisti che richiedono più potenza',
          price: 9.99,
          features: ['Accesso a tutti gli agenti', 'Messaggi illimitati', 'Supporto prioritario', 'API personalizzata'],
          isPopular: true,
          maxAgents: 10,
          maxMessages: 1000,
        },
        {
          id: 'enterprise',
          name: 'Enterprise',
          description: 'Soluzione completa per aziende',
          price: 49.99,
          features: ['Agenti personalizzabili', 'Messaggi illimitati', 'Supporto dedicato 24/7', 'Integrazione completa', 'Analisi avanzate'],
          maxAgents: -1, // Unlimited
          maxMessages: -1, // Unlimited
        },
      ];
    }
    
    // Implementazione reale
    return fetchAPI('/packages');
  },
  
  subscribe: async (packageId: string): Promise<{ success: boolean }> => {
    // Mock API response per frontend standalone
    if (!import.meta.env.VITE_API_URL) {
      // Simula un breve delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock risposta
      return { success: true };
    }
    
    // Implementazione reale
    return fetchAPI(`/subscribe/${packageId}`, {
      method: 'POST',
    });
  },
};

// API per gli agenti
export const agentsAPI = {
  getAgents: async (): Promise<Agent[]> => {
    // Mock API response per frontend standalone
    if (!import.meta.env.VITE_API_URL) {
      // Simula un breve delay
      await new Promise(resolve => setTimeout(resolve, 700));
      
      // Mock risposta
      return [
        {
          id: '1',
          slug: 'echo',
          name: 'Echo Agent',
          description: 'Agente base che risponde rispecchiando il messaggio',
          icon: 'repeat',
          isAvailable: true,
          requiredPackage: 'free',
        },
        {
          id: '2',
          slug: 'translator',
          name: 'Traduttore',
          description: 'Traduce il testo in varie lingue',
          icon: 'languages',
          isAvailable: true,
          requiredPackage: 'free',
        },
        {
          id: '3',
          slug: 'writer',
          name: 'Scrittore',
          description: 'Assiste nella creazione di contenuti testuali',
          icon: 'pencil',
          isAvailable: true,
          requiredPackage: 'pro',
        },
        {
          id: '4',
          slug: 'code',
          name: 'Sviluppatore',
          description: 'Aiuta con problemi di codice e programmazione',
          icon: 'code',
          isAvailable: true,
          requiredPackage: 'pro',
        },
        {
          id: '5',
          slug: 'custom',
          name: 'Personalizzato',
          description: 'Agente completamente personalizzabile',
          icon: 'settings',
          isAvailable: true,
          requiredPackage: 'enterprise',
        },
      ];
    }
    
    // Implementazione reale
    return fetchAPI('/agents');
  },
};

// API per la chat
export const chatAPI = {
  getSessions: async (): Promise<ChatSession[]> => {
    // Mock API response per frontend standalone
    if (!import.meta.env.VITE_API_URL) {
      // Simula un breve delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Mock risposta - nessuna sessione iniziale
      return [];
    }
    
    // Implementazione reale
    return fetchAPI('/chat/sessions');
  },
  
  createSession: async (agentId: string): Promise<ChatSession> => {
    // Mock API response per frontend standalone
    if (!import.meta.env.VITE_API_URL) {
      // Simula un breve delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock risposta
      return {
        id: `session-${Math.random().toString(36).substring(2, 9)}`,
        agentId,
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }
    
    // Implementazione reale
    return fetchAPI('/chat/sessions', {
      method: 'POST',
      body: JSON.stringify({ agentId }),
    });
  },
  
  sendMessage: async (sessionId: string, message: string): Promise<Message> => {
    // Mock API response per frontend standalone
    if (!import.meta.env.VITE_API_URL) {
      // Simula un breve delay
      await new Promise(resolve => setTimeout(resolve, 700));
      
      // Mock risposta
      const mockMessage: Message = {
        id: `message-${Math.random().toString(36).substring(2, 9)}`,
        role: 'agent',
        content: `Risposta simulata all'input: "${message}"`,
        timestamp: new Date(),
      };
      
      return mockMessage;
    }
    
    // Implementazione reale
    return fetchAPI(`/chat/${sessionId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ content: message }),
    });
  },
  
  // Implementazione per lo streaming (SSE)
  streamMessage: (sessionId: string, message: string, onChunk: (chunk: string) => void, onComplete: (message: Message) => void) => {
    // Mock streaming response per frontend standalone
    if (!import.meta.env.VITE_API_URL) {
      const mockResponse = `Questa è una risposta di streaming simulata per il messaggio: "${message}". La risposta viene inviata parola per parola come farebbe un vero stream SSE.`;
      const words = mockResponse.split(' ');
      
      let index = 0;
      const interval = setInterval(() => {
        if (index >= words.length) {
          clearInterval(interval);
          
          // Chiamata di completamento
          onComplete({
            id: `message-${Math.random().toString(36).substring(2, 9)}`,
            role: 'agent',
            content: mockResponse,
            timestamp: new Date(),
          });
          return;
        }
        
        // Invia chunk
        onChunk(words[index] + ' ');
        index++;
      }, 150);
      
      // Ritorna una funzione per fermare lo stream se necessario
      return () => clearInterval(interval);
    }
    
    // Implementazione reale con EventSource (Server-Sent Events)
    let eventSource: EventSource | null = null;
    
    try {
      const token = getToken();
      eventSource = new EventSource(
        `${API_URL}/chat/${sessionId}/stream?token=${token}&message=${encodeURIComponent(message)}`
      );
      
      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        
        if (data.type === 'chunk') {
          onChunk(data.content);
        } else if (data.type === 'complete') {
          onComplete(data.message);
          eventSource?.close();
        }
      };
      
      eventSource.onerror = () => {
        console.error('SSE Error');
        eventSource?.close();
        
        // Fallback a chiamata non-streaming in caso di errore
        chatAPI.sendMessage(sessionId, message).then(onComplete);
      };
    } catch (error) {
      console.error('Stream setup error:', error);
      
      // Fallback a chiamata non-streaming
      chatAPI.sendMessage(sessionId, message).then(onComplete);
    }
    
    // Ritorna funzione per fermare stream
    return () => eventSource?.close();
  },
};
