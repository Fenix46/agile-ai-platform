
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  ChevronLeft, 
  ChevronRight, 
  LayoutDashboard, 
  Settings, 
  LogOut,
  MessageSquare,
  User,
  Plus
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import AgentList from './AgentList';
import { useAuth } from '../contexts/AuthContext';
import { useChat } from '../contexts/ChatContext';
import ConversationList from './ConversationList';
import ThemeToggle from './ThemeToggle';
import { toast } from 'sonner';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const { agents, getCurrentSession, selectAgent } = useChat();
  
  const currentSession = getCurrentSession();
  const selectedAgent = currentSession ? 
    agents.find(agent => agent.id === currentSession.agentId) : null;
  
  // Adjust collapse state based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };
    
    // Initial setup
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Function to check if a path is active
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };
  
  // Funzione per creare una nuova chat con l'agente selezionato
  const handleNewChat = async () => {
    if (selectedAgent) {
      try {
        await selectAgent(selectedAgent.id);
        toast.success(`Nuova chat con ${selectedAgent.name}`);
      } catch (error) {
        console.error("Error creating new chat:", error);
        toast.error("Impossibile creare una nuova chat");
      }
    }
  };
  
  return (
    <div
      className={`persistent-sidebar border-r bg-sidebar ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <Link to="/dashboard" className="flex items-center">
            <span className="font-bold text-lg">AI Platform</span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
          aria-label={collapsed ? 'Espandi sidebar' : 'Riduci sidebar'}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      {/* Profilo utente */}
      {!collapsed && (
        <div className="p-4 bg-secondary/20">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              {user?.name.charAt(0)}
            </div>
            <div className="space-y-0.5">
              <p className="text-sm font-medium line-clamp-1">{user?.name}</p>
              <p className="text-xs text-muted-foreground">
                {user?.subscriptionId === 'free' ? 'Piano Free' : user?.subscriptionId || 'Free'}
              </p>
            </div>
          </div>
        </div>
      )}
      
      <Separator className="my-1" />
      
      {/* Area Agente e Chat */}
      <ScrollArea className="flex-grow">
        {selectedAgent ? (
          <div className="py-4">
            {!collapsed && (
              <div className="px-4 mb-2">
                <h3 className="font-medium text-xs text-muted-foreground uppercase tracking-wider">Agent selezionato</h3>
              </div>
            )}
            <div className="px-4 py-2 flex items-center gap-3">
              <div className="agent-logo">
                {selectedAgent.icon ? (
                  <div className={`w-full h-full flex items-center justify-center ${
                    collapsed ? 'scale-75' : ''
                  }`}>
                    <MessageSquare className="h-5 w-5" />
                  </div>
                ) : (
                  <MessageSquare className="h-5 w-5 agent-logo-fallback" />
                )}
              </div>
              {!collapsed && (
                <div>
                  <p className="font-medium text-sm">{selectedAgent.name}</p>
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="p-0 h-auto text-xs text-muted-foreground"
                    asChild
                  >
                    <Link to="/dashboard/chat">Cambia agent</Link>
                  </Button>
                </div>
              )}
            </div>
            
            {!collapsed && (
              <>
                <div className="px-4 py-2">
                  <Button 
                    onClick={handleNewChat}
                    className="w-full gap-2 text-sm"
                    size="sm"
                    variant="secondary"
                  >
                    <Plus size={16} />
                    <span>Nuova chat</span>
                  </Button>
                </div>
                <Separator className="my-2" />
                <ConversationList />
              </>
            )}
          </div>
        ) : (
          !collapsed ? (
            <AgentList />
          ) : (
            <div className="py-4 flex flex-col items-center space-y-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => window.location.href = '/dashboard/chat'}
              >
                <MessageSquare className="h-5 w-5" />
              </Button>
            </div>
          )
        )}
      </ScrollArea>
      
      <Separator className="my-1" />
      
      {/* Navigazione principale */}
      <nav className="p-2">
        <div className={`flex flex-col ${collapsed ? 'items-center' : ''} space-y-1`}>
          <Link to="/dashboard">
            <Button
              variant={isActive("/dashboard") && !isActive("/dashboard/chat") && !isActive("/dashboard/settings") ? "secondary" : "ghost"}
              className={`w-full justify-start ${collapsed ? 'px-2' : ''}`}
            >
              <LayoutDashboard className="h-5 w-5 mr-2" />
              {!collapsed && <span>Dashboard</span>}
            </Button>
          </Link>
          <Link to="/dashboard/chat">
            <Button
              variant={isActive("/dashboard/chat") ? "secondary" : "ghost"}
              className={`w-full justify-start ${collapsed ? 'px-2' : ''}`}
            >
              <MessageSquare className="h-5 w-5 mr-2" />
              {!collapsed && <span>Chat</span>}
            </Button>
          </Link>
          <Link to="/dashboard/settings">
            <Button
              variant={isActive("/dashboard/settings") ? "secondary" : "ghost"}
              className={`w-full justify-start ${collapsed ? 'px-2' : ''}`}
            >
              <Settings className="h-5 w-5 mr-2" />
              {!collapsed && <span>Impostazioni</span>}
            </Button>
          </Link>
          <Link to="/dashboard/profile">
            <Button
              variant={isActive("/dashboard/profile") ? "secondary" : "ghost"}
              className={`w-full justify-start ${collapsed ? 'px-2' : ''}`}
            >
              <User className="h-5 w-5 mr-2" />
              {!collapsed && <span>Profilo</span>}
            </Button>
          </Link>
          <Button
            variant="ghost"
            className={`w-full justify-start ${collapsed ? 'px-2' : ''}`}
            onClick={logout}
          >
            <LogOut className="h-5 w-5 mr-2" />
            {!collapsed && <span>Logout</span>}
          </Button>
        </div>
      </nav>
      
      <div className="p-2 flex justify-center">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Sidebar;
