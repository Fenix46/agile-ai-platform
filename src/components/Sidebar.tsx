
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  ChevronLeft, 
  ChevronRight, 
  LayoutDashboard, 
  Settings, 
  LogOut,
  MessageSquare
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import AgentList from './AgentList';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  
  // Funzione per verificare se un percorso è attivo
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };
  
  return (
    <div
      className={`flex flex-col h-full bg-sidebar border-r transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <Link to="/dashboard" className="flex items-center">
            <span className="font-bold text-lg gradient-heading">AI Platform</span>
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
      
      {!collapsed && (
        <div className="p-4 bg-accent/20">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              {user?.name.charAt(0)}
            </div>
            <div className="space-y-0.5">
              <p className="text-sm font-medium line-clamp-1">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.subscriptionId || 'Free'}</p>
            </div>
          </div>
        </div>
      )}
      
      <Separator />
      
      <ScrollArea className="flex-grow">
        {!collapsed ? (
          <AgentList />
        ) : (
          <div className="py-4 flex flex-col items-center space-y-4">
            {/* Versione compatta della lista agenti */}
            <Button variant="ghost" size="icon">
              <MessageSquare className="h-5 w-5" />
            </Button>
          </div>
        )}
      </ScrollArea>
      
      <Separator />
      
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
    </div>
  );
};

export default Sidebar;
