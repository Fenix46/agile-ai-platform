
/**
 * Layout per l'area dashboard
 * 
 * Gestisce la struttura comune alle pagine della dashboard e
 * implementa la protezione delle rotte autenticate.
 */

import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ChatProvider } from '../contexts/ChatContext';
import { PackageProvider } from '../contexts/PackageContext';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  // Se sta caricando, mostra un indicatore di caricamento
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-lg">Caricamento...</p>
        </div>
      </div>
    );
  }
  
  // Se non è autenticato, reindirizza alla landing page
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  // Se è autenticato, mostra il contenuto della dashboard all'interno dei provider necessari
  return (
    <ChatProvider>
      <PackageProvider>
        {children}
      </PackageProvider>
    </ChatProvider>
  );
};

export default DashboardLayout;
