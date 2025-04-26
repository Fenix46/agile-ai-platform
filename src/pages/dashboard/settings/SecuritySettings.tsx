
/**
 * Componente per le impostazioni di sicurezza
 */

import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const SecuritySettings = () => {
  const { logout } = useAuth();
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [isUpdating, setIsUpdating] = useState(false);
  
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
  );
};

export default SecuritySettings;
