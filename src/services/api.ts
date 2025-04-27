
/**
 * Servizio API per l'interazione con il backend
 * 
 * Questo modulo gestisce tutte le chiamate al backend, inclusa l'autenticazione,
 * il recupero di dati e l'invio di richieste di chat.
 */

import { 
  User, LoginCredentials, SignupCredentials, 
  Package, Agent, Message, ChatSession 
} from '../types';

// Base URL dell'API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

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
const fetchAPI = async (endpoint: string, options: RequestInit = {}) => {
  try {
    console.log(`API Request: ${API_URL}${endpoint}`, options);
    
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        ...getAuthHeaders(),
        ...(options.headers || {}),
      },
    });

    console.log(`API Response status: ${response.status} for ${endpoint}`);
    
    if (!response.ok) {
      let errorMessage = `Error ${response.status}: ${response.statusText}`;
      try {
        const errorData = await response.json();
        console.error('API Error details:', errorData);
        errorMessage = errorData.message || errorData.detail || errorMessage;
      } catch (e) {
        console.error('Could not parse error response as JSON');
      }
      throw new Error(errorMessage);
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
    try {
      console.log('Sending login request to /auth/login');
      const data = await fetchAPI('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      
      console.log('Login response received:', data);
      
      if (data.access_token) {
        // FastAPI standard response structure
        saveToken(data.access_token);
        return { 
          user: data.user || { 
            id: '1', 
            name: credentials.email.split('@')[0], 
            email: credentials.email,
            role: 'user',
            subscriptionId: data.subscription_id || 'free'
          },
          token: data.access_token
        };
      } else if (data.token) {
        // Alternative response structure
        saveToken(data.token);
        return data;
      } else {
        throw new Error('Token not found in response');
      }
    } catch (error) {
      console.error('Login API error:', error);
      throw error;
    }
  },
  
  signup: async (credentials: SignupCredentials): Promise<{ user: User; token: string }> => {
    try {
      console.log('Sending signup request to /auth/signup');
      const user = await fetchAPI('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
  
      console.log('Signup response received:', user);
  
      // Dopo signup, facciamo login per ottenere il token
      console.log('Automatically logging in after signup');
      const loginData = await fetchAPI('/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });
  
      console.log('Login response after signup:', loginData);
  
      if (loginData.access_token) {
        saveToken(loginData.access_token);
        return {
          user: user || {
            id: '1',
            name: credentials.name,
            email: credentials.email,
            role: 'user',
            subscriptionId: 'free',
          },
          token: loginData.access_token,
        };
      } else if (loginData.token) {
        saveToken(loginData.token);
        return {
          user: user,
          token: loginData.token,
        };
      } else {
        throw new Error('Token not found in login response after signup');
      }
    } catch (error) {
      console.error('Signup API error:', error);
      throw error;
    }
  },
  
  googleAuth: async (): Promise<void> => {
    try {
      console.log('Initiating Google auth request');
      // Redirect to Google OAuth endpoint
      window.location.href = `${API_URL}/auth/google`;
    } catch (error) {
      console.error('Google auth error:', error);
      throw error;
    }
  },
  
  logout: (): void => {
    removeToken();
  },
  
  getCurrentUser: async (): Promise<User> => {
    try {
      console.log('Fetching current user from /auth/me');
      const data = await fetchAPI('/auth/me');
      console.log('Current user data:', data);
      
      // Transform the FastAPI response to match our User type if needed
      return {
        id: data.id,
        name: data.name || data.full_name || data.email.split('@')[0],
        email: data.email,
        role: data.role || 'user',
        subscriptionId: data.subscription_id || data.subscriptionId || 'free',
        avatar: data.avatar,
      };
    } catch (error) {
      console.error('Get current user API error:', error);
      throw error;
    }
  },
};

// API per i pacchetti
export const packagesAPI = {
  getPackages: async (): Promise<Package[]> => {
    try {
      console.log('Fetching packages from /packages');
      const data = await fetchAPI('/packages');
      console.log('Packages data:', data);
      
      // Transform the FastAPI response to match our Package type if needed
      return data.map((pkg: any) => ({
        id: pkg.id,
        name: pkg.name,
        description: pkg.description,
        price: pkg.price,
        features: pkg.features,
        maxAgents: pkg.max_agents || pkg.maxAgents,
        maxMessages: pkg.max_messages || pkg.maxMessages,
        isPopular: pkg.is_popular || pkg.isPopular || false,
      }));
    } catch (error) {
      console.error('Get packages API error:', error);
      throw error;
    }
  },
  
  subscribe: async (packageId: string): Promise<{ success: boolean }> => {
    try {
      console.log(`Subscribing to package ${packageId}`);
      const data = await fetchAPI(`/subscribe/${packageId}`, {
        method: 'POST',
      });
      console.log('Subscribe response:', data);
      
      return { success: true };
    } catch (error) {
      console.error('Subscribe API error:', error);
      throw error;
    }
  },
};

// API per gli agenti
export const agentsAPI = {
  getAgents: async (): Promise<Agent[]> => {
    try {
      console.log('Fetching agents from /agents');
      const data = await fetchAPI('/agents');
      console.log('Agents data:', data);
      
      // Transform the FastAPI response to match our Agent type if needed
      return data.map((agent: any) => ({
        id: agent.id || agent.slug,
        slug: agent.slug,
        name: agent.name,
        description: agent.description,
        icon: agent.icon || 'message-square',
        isAvailable: agent.is_available || agent.isAvailable || true,
        requiredPackage: agent.required_package || agent.requiredPackage || 'free',
      }));
    } catch (error) {
      console.error('Get agents API error:', error);
      // Return empty list in case of error to prevent app crash
      return [];
    }
  },
};

// API per la chat
// chatAPI.ts

export const chatAPI = {
  getSessions: async (): Promise<ChatSession[]> => {
    try {
      console.log('Fetching chat sessions');
      const data = await fetchAPI('/chat');
      console.log('Chat sessions data:', data);

      return data.map((session: any) => ({
        id: session.id,
        agentId: session.agent_id || session.agentId,
        messages: session.messages || [],
        createdAt: new Date(session.created_at || session.createdAt),
        updatedAt: new Date(session.updated_at || session.updatedAt),
      }));
    } catch (error) {
      console.error('Get sessions API error:', error);
      return [];
    }
  },

  createSession: async (agentId: string): Promise<ChatSession> => {
    try {
      console.log(`Creating session for agent ${agentId}`);

      const initMessage = "Ciao";
      const data = await fetchAPI(`/chat/${agentId}?message=${encodeURIComponent(initMessage)}`, {
        method: 'GET',
      });

      console.log('Create session response:', data);

      return {
        id: data.id || `session-${Math.random().toString(36).substring(2, 9)}`,
        agentId,
        messages: data.messages || [],
        createdAt: new Date(data.created_at || data.createdAt || Date.now()),
        updatedAt: new Date(data.updated_at || data.updatedAt || Date.now()),
      };
    } catch (error) {
      console.error('Create session API error:', error);
      return {
        id: `session-${Math.random().toString(36).substring(2, 9)}`,
        agentId,
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }
  },

  sendMessage: async (session: ChatSession, message: string): Promise<Message> => {
    try {
      const agentSlug = session.agentId; // Ora corretto!

      console.log(`Sending message to agent ${agentSlug}`);
      const data = await fetchAPI(`/chat/${agentSlug}`, {
        method: 'POST',
        body: JSON.stringify({
          message,
          stream: false,
        }),
      });

      console.log('Send message response:', data);

      return {
        id: data.id || `message-${Math.random().toString(36).substring(2, 9)}`,
        role: 'agent',
        content: data.response || data.message || `Risposta dal server per: "${message}"`,
        timestamp: new Date(data.timestamp || data.created_at || Date.now()),
      };
    } catch (error) {
      console.error('Send message API error:', error);
      throw error;
    }
  },

  streamMessage: (session: ChatSession, message: string, onChunk: (chunk: string) => void, onComplete: (message: Message) => void) => {
    const agentSlug = session.agentId; // Ora corretto!

    console.log(`Setting up streaming for agent ${agentSlug} with message: ${message}`);

    const sendNonStreaming = async () => {
      try {
        const response = await chatAPI.sendMessage(session, message);

        const words = response.content.split(' ');
        let index = 0;

        const interval = setInterval(() => {
          if (index >= words.length) {
            clearInterval(interval);
            onComplete(response);
            return;
          }

          onChunk(words[index] + ' ');
          index++;
        }, 100);

        return () => clearInterval(interval);
      } catch (error) {
        console.error('Non-streaming fallback error:', error);
        const fallbackMessage: Message = {
          id: `message-error-${Date.now()}`,
          role: 'agent',
          content: 'Si è verificato un errore durante l\'elaborazione del messaggio',
          timestamp: new Date(),
        };
        onComplete(fallbackMessage);
        return () => {};
      }
    };

    return sendNonStreaming();
  },
};
