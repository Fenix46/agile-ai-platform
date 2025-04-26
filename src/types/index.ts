// Tipi di utente
export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  subscriptionId?: string;
}

// Tipi di autenticazione
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Tipi per i pacchetti
export interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  isPopular?: boolean;
  maxAgents?: number;
  maxMessages?: number;
}

// Tipi per gli agenti AI
export interface Agent {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  isAvailable: boolean;
  requiredPackage: string;
}

// Tipi per la chat
export interface Message {
  id: string;
  role: 'user' | 'agent' | 'system';
  content: string;
  timestamp: Date;
  agentId?: string;
}

export interface ChatSession {
  id: string;
  agentId: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatState {
  sessions: Record<string, ChatSession>;
  currentSession: string | null;
  isStreaming: boolean;
  error: string | null;
  cleanupStream: (() => void) | null;
}
