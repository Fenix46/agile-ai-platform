
/**
 * Pagina delle impostazioni
 * 
 * Permette all'utente di gestire le impostazioni del proprio account.
 */

import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import ThemeToggle from '../../components/ThemeToggle';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import ProfileSettings from './settings/ProfileSettings';
import SecuritySettings from './settings/SecuritySettings';
import PackageSettings from './settings/PackageSettings';

const SettingsPage = () => {
  const { user } = useAuth();
  const location = useLocation();
  
  // Determina la tab attiva in base al percorso
  const getActiveTab = () => {
    if (location.pathname.includes('/settings/packages')) return 'packages';
    if (location.pathname.includes('/settings/security')) return 'security';
    return 'profile';
  };
  
  const activeTab = getActiveTab();
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex flex-col flex-grow">
        <header className="h-16 border-b flex items-center justify-between px-6">
          <h1 className="text-xl font-medium">Impostazioni</h1>
          <ThemeToggle />
        </header>
        
        <main className="flex-grow overflow-auto p-6">
          <div className="max-w-3xl mx-auto">
            <Card className="mb-6 p-4">
              <div className="flex flex-wrap gap-4">
                <Button 
                  variant={activeTab === 'profile' ? 'secondary' : 'outline'}
                  asChild
                >
                  <Link to="/dashboard/settings">Profilo</Link>
                </Button>
                <Button 
                  variant={activeTab === 'security' ? 'secondary' : 'outline'}
                  asChild
                >
                  <Link to="/dashboard/settings/security">Sicurezza</Link>
                </Button>
                <Button 
                  variant={activeTab === 'packages' ? 'secondary' : 'outline'}
                  asChild
                >
                  <Link to="/dashboard/settings/packages">Pacchetti</Link>
                </Button>
              </div>
            </Card>
            
            <Routes>
              <Route path="/" element={<ProfileSettings />} />
              <Route path="/security" element={<SecuritySettings />} />
              <Route path="/packages" element={<PackageSettings />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
