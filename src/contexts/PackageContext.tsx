
/**
 * Context per la gestione dei pacchetti di abbonamento
 * 
 * Gestisce il recupero dei pacchetti disponibili e le operazioni di sottoscrizione.
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

import { Package } from '../types';
import { packagesAPI } from '../services/api';
import { useAuth } from './AuthContext';

// Creazione del context
interface PackageContextType {
  packages: Package[];
  currentPackageId: string | null;
  isLoading: boolean;
  subscribe: (packageId: string) => Promise<void>;
}

const PackageContext = createContext<PackageContextType | undefined>(undefined);

// Provider component
export function PackageProvider({ children }: { children: ReactNode }) {
  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();

  // Carica i pacchetti disponibili
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setIsLoading(true);
        const fetchedPackages = await packagesAPI.getPackages();
        setPackages(fetchedPackages);
      } catch (error) {
        console.error('Error fetching packages:', error);
        toast.error('Impossibile caricare i pacchetti disponibili');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPackages();
  }, []);

  // Funzione per sottoscrivere un pacchetto
  const subscribe = async (packageId: string) => {
    if (!isAuthenticated) {
      toast.error('Devi effettuare l\'accesso per sottoscrivere un pacchetto');
      return;
    }

    try {
      setIsLoading(true);
      await packagesAPI.subscribe(packageId);
      toast.success('Abbonamento attivato con successo!');
    } catch (error) {
      console.error('Error subscribing to package:', error);
      toast.error('Errore durante l\'attivazione dell\'abbonamento');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PackageContext.Provider
      value={{
        packages,
        currentPackageId: user?.subscriptionId || null,
        isLoading,
        subscribe,
      }}
    >
      {children}
    </PackageContext.Provider>
  );
}

// Hook personalizzato per utilizzare il context
export function usePackage() {
  const context = useContext(PackageContext);
  if (context === undefined) {
    throw new Error('usePackage deve essere usato all\'interno di un PackageProvider');
  }
  return context;
}
