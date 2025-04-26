
/**
 * Context per la gestione dell'autenticazione
 * 
 * Gestisce lo stato di autenticazione dell'utente, inclusi login, logout, 
 * recupero dell'utente corrente e gestione del token JWT.
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { User, AuthState, LoginCredentials, SignupCredentials } from '../types';
import { authAPI } from '../services/api';

// Stato iniziale del context
const initialAuthState: AuthState = {
  user: null,
  token: localStorage.getItem('auth_token'),
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// Creazione del context
interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(initialAuthState);
  const navigate = useNavigate();

  // Controlla l'autenticazione al caricamento
  useEffect(() => {
    const checkAuth = async () => {
      if (!state.token) {
        setState(prev => ({ ...prev, isLoading: false }));
        return;
      }

      try {
        const user = await authAPI.getCurrentUser();
        setState({
          user,
          token: state.token,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        console.error('Error fetching current user:', error);
        // Se c'è un errore nel recupero dell'utente, eseguiamo il logout
        authAPI.logout();
        setState({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Errore di autenticazione',
        });
      }
    };

    checkAuth();
  }, [state.token]);

  // Funzione di login
  const login = async (credentials: LoginCredentials) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const { user, token } = await authAPI.login(credentials);
      
      setState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      toast.success(`Benvenuto, ${user.name}!`);
      navigate('/dashboard');
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Errore durante il login',
      }));
      
      toast.error('Errore di autenticazione');
    }
  };

  // Funzione di signup
  const signup = async (credentials: SignupCredentials) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const { user, token } = await authAPI.signup(credentials);
      
      setState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      toast.success('Account creato con successo!');
      navigate('/dashboard');
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Errore durante la registrazione',
      }));
      
      toast.error('Errore durante la registrazione');
    }
  };

  // Funzione di logout
  const logout = () => {
    authAPI.logout();
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
    
    toast.info('Logout effettuato');
    navigate('/');
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizzato per utilizzare il context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve essere usato all\'interno di un AuthProvider');
  }
  return context;
}
