
/**
 * Pagina principale della dashboard
 * 
 * Mostra l'interfaccia principale con la barra laterale e l'area di chat.
 */

import React, { useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import ChatWindow from '../../components/ChatWindow';
import ThemeToggle from '../../components/ThemeToggle';
import { useChat } from '../../contexts/ChatContext';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';

const DashboardPage = () => {
  const { getCurrentSession, agents, loadingAgents } = useChat();
  const { user } = useAuth();
  const currentSession = getCurrentSession();
  
  // Debug output
  useEffect(() => {
    console.log('Dashboard Page:', { 
      currentSession, 
      user, 
      agentsCount: agents.length,
      loadingAgents
    });
    
    if (agents.length > 0) {
      toast.success(`${agents.length} agenti disponibili`);
    } else if (!loadingAgents && agents.length === 0) {
      toast.error('Nessun agente disponibile');
    }
  }, [currentSession, user, agents, loadingAgents]);
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex flex-col flex-grow">
        <header className="h-16 border-b flex items-center justify-between px-6">
          <h1 className="text-xl font-medium">
            {currentSession ? (
              <>Chat con <span className="font-semibold">{currentSession.agentId}</span></>
            ) : (
              'Dashboard'
            )}
          </h1>
          <div className="flex items-center gap-4">
            {user && (
              <div className="text-sm">
                <span className="font-medium">{user.name}</span>
                {user.subscriptionId && user.subscriptionId !== 'free' && (
                  <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                    {user.subscriptionId}
                  </span>
                )}
              </div>
            )}
            <ThemeToggle />
          </div>
        </header>
        
        <main className="flex-grow overflow-hidden relative">
          {agents.length === 0 && !loadingAgents ? (
            <div className="p-6 h-full flex items-center justify-center">
              <Card className="w-full max-w-md">
                <CardHeader>
                  <CardTitle>Benvenuto nella Dashboard</CardTitle>
                  <CardDescription>
                    Non hai ancora accesso agli agenti. Scegli un pacchetto per iniziare.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-muted-foreground">
                    Abbiamo diversi pacchetti disponibili per soddisfare le tue esigenze.
                  </p>
                  <Button asChild>
                    <Link to="/dashboard/settings/packages" className="flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      <span>Visualizza pacchetti</span>
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            <ChatWindow />
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
