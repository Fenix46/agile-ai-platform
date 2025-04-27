
import React, { ReactNode, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ChatProvider } from '../contexts/ChatContext';
import { PackageProvider } from '../contexts/PackageContext';
import { toast } from 'sonner';
import Sidebar from '@/components/Sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  
  // Debug output
  useEffect(() => {
    console.log('Dashboard Layout:', { isAuthenticated, isLoading, user });
    
    if (isAuthenticated && user) {
      toast.success(`Dashboard caricata per ${user.name}`);
    }
  }, [isAuthenticated, isLoading, user]);
  
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
    console.log('User not authenticated, redirecting to landing page');
    return <Navigate to="/" replace />;
  }
  
  // Se è autenticato, mostra il contenuto della dashboard all'interno dei provider necessari
  console.log('Rendering dashboard for authenticated user');
  return (
    <ChatProvider>
      <PackageProvider>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex-1 ml-64 overflow-auto"> {/* Space for persistent sidebar */}
            {children}
          </div>
        </div>
      </PackageProvider>
    </ChatProvider>
  );
};

export default DashboardLayout;
