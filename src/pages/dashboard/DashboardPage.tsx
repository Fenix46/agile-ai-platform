
import React, { useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import ThemeToggle from '../../components/ThemeToggle';
import { useChat } from '../../contexts/ChatContext';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MessageSquare, Package } from 'lucide-react';

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
      <div className="ml-64"> {/* Space for persistent sidebar */}
        <div className="flex flex-col h-screen">
          <header className="h-16 border-b flex items-center justify-between px-6 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
            <h1 className="text-xl font-medium">Dashboard</h1>
            <div className="flex items-center gap-4">
              {user && (
                <div className="text-sm">
                  <span className="font-medium">{user.name}</span>
                  {user.subscriptionId && user.subscriptionId !== 'free' && (
                    <span className="ml-2 text-xs bg-accent/10 text-accent px-2 py-0.5 rounded">
                      {user.subscriptionId}
                    </span>
                  )}
                </div>
              )}
              <ThemeToggle />
            </div>
          </header>
          
          <main className="flex-grow overflow-auto p-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card className="border-2 border-accent/10 shadow-lg bg-card">
                  <CardHeader>
                    <CardTitle>Chat con Agenti</CardTitle>
                    <CardDescription>Inizia una conversazione con uno dei nostri agenti AI</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center text-center">
                    <div className="agent-logo w-16 h-16 mb-4">
                      <MessageSquare className="h-8 w-8 text-accent" />
                    </div>
                    <p className="mb-6">Accedi alla nuova interfaccia di chat per interagire con i nostri agenti intelligenti</p>
                    <Button asChild>
                      <Link to="/dashboard/chat" className="w-full">Vai alla Chat</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Pacchetti e Abbonamenti</CardTitle>
                    <CardDescription>Gestisci il tuo abbonamento e scopri nuove funzionalità</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center text-center">
                    <div className="agent-logo w-16 h-16 mb-4">
                      <Package className="h-8 w-8 text-accent" />
                    </div>
                    <p className="mb-6">Esplora i vari pacchetti disponibili per sbloccare funzionalità avanzate</p>
                    <Button variant="outline" asChild>
                      <Link to="/dashboard/settings/packages" className="w-full">Visualizza pacchetti</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {agents.length > 0 && (
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Agenti Disponibili</CardTitle>
                    <CardDescription>Puoi accedere a {agents.length} agenti con il tuo abbonamento attuale</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {agents.slice(0, 3).map((agent) => (
                        <div key={agent.id} className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:border-accent/20 transition-colors">
                          <div className="agent-logo">
                            <MessageSquare className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="font-medium">{agent.name}</h3>
                            <p className="text-xs text-muted-foreground line-clamp-2">{agent.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    {agents.length > 3 && (
                      <div className="mt-4 text-center">
                        <Button variant="link" asChild>
                          <Link to="/dashboard/chat">Visualizza tutti gli agenti ({agents.length})</Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </main>
        </div>
      </div>
      
      <Sidebar />
    </div>
  );
};

export default DashboardPage;
