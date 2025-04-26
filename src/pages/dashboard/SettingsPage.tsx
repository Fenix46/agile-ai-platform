
/**
 * Pagina delle impostazioni
 * 
 * Permette all'utente di gestire le impostazioni del proprio account.
 */

import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import ThemeToggle from '../../components/ThemeToggle';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const SettingsPage = () => {
  const { user, logout } = useAuth();
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Gestione aggiornamento profilo
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsUpdating(true);
    // Simulazione di chiamata API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Profilo aggiornato con successo');
    setIsUpdating(false);
  };
  
  // Gestione cambio password
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Le password non corrispondono');
      return;
    }
    
    setIsUpdating(true);
    // Simulazione di chiamata API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Password aggiornata con successo');
    setIsUpdating(false);
    
    // Reset del form
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };
  
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
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="profile">Profilo</TabsTrigger>
                <TabsTrigger value="security">Sicurezza</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Profilo</CardTitle>
                    <CardDescription>
                      Gestisci le informazioni del tuo profilo
                    </CardDescription>
                  </CardHeader>
                  <form onSubmit={handleProfileSubmit}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Nome
                        </label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        />
                        <p className="text-xs text-muted-foreground">
                          Questa email viene usata per l'accesso e le comunicazioni
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button
                        type="submit"
                        disabled={isUpdating}
                      >
                        {isUpdating ? 'Aggiornamento...' : 'Aggiorna profilo'}
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
              
              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Sicurezza</CardTitle>
                    <CardDescription>
                      Gestisci la tua password e opzioni di sicurezza
                    </CardDescription>
                  </CardHeader>
                  <form onSubmit={handlePasswordSubmit}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="currentPassword" className="text-sm font-medium">
                          Password attuale
                        </label>
                        <Input
                          id="currentPassword"
                          type="password"
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="newPassword" className="text-sm font-medium">
                          Nuova password
                        </label>
                        <Input
                          id="newPassword"
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="confirmPassword" className="text-sm font-medium">
                          Conferma nuova password
                        </label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isUpdating}
                      >
                        {isUpdating ? 'Aggiornamento...' : 'Cambia password'}
                      </Button>
                      
                      <div className="w-full pt-4 border-t">
                        <Button
                          type="button"
                          variant="destructive"
                          className="w-full"
                          onClick={logout}
                        >
                          Logout
                        </Button>
                      </div>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;
