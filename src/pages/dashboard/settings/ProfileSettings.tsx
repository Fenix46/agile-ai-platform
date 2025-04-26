
/**
 * Componente per le impostazioni del profilo
 */

import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const ProfileSettings = () => {
  const { user } = useAuth();
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
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
  
  return (
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
  );
};

export default ProfileSettings;
