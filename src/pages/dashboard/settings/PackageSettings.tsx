
import React, { useState } from 'react';
import { usePackage } from '../../../contexts/PackageContext';
import PackageList from '../../../components/PackageList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, PackageOpen, AlertTriangle, RefreshCw, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const PackageSettings = () => {
  const { isLoading, error, packages, refetchPackages } = usePackage();
  const [isRetrying, setIsRetrying] = useState(false);
  
  const handleRetry = async () => {
    try {
      setIsRetrying(true);
      await refetchPackages();
      toast.success("Pacchetti ricaricati con successo");
    } catch (error) {
      toast.error("Impossibile ricaricare i pacchetti");
      console.error("Error refetching packages:", error);
    } finally {
      setIsRetrying(false);
    }
  };
  
  const renderContent = () => {
    // Loading state
    if (isLoading || isRetrying) {
      return (
        <div className="flex flex-col items-center justify-center py-16">
          <Loader2 className="h-12 w-12 animate-spin text-accent mb-4" />
          <p className="text-lg font-medium">Caricamento pacchetti...</p>
          <p className="text-sm text-muted-foreground mt-2">
            Stiamo recuperando le informazioni sui pacchetti disponibili
          </p>
        </div>
      );
    }
    
    // Error state
    if (error) {
      return (
        <div className="error-state">
          <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
          <h3 className="font-semibold text-lg mb-2">Impossibile caricare i pacchetti</h3>
          <p className="text-muted-foreground mb-6">
            Si è verificato un errore durante il caricamento dei pacchetti. 
            Riprova più tardi o contatta l'assistenza.
          </p>
          <Button onClick={handleRetry} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Riprova
          </Button>
        </div>
      );
    }
    
    // Empty state
    if (!packages || packages.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-16">
          <PackageOpen className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="font-semibold text-lg mb-2">Nessun pacchetto disponibile</h3>
          <p className="text-muted-foreground mb-6">
            Non ci sono pacchetti disponibili al momento.
            Riprova più tardi o contatta l'assistenza.
          </p>
          <Button onClick={handleRetry} variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Aggiorna
          </Button>
        </div>
      );
    }
    
    // Success state - show package list
    return <PackageList />;
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>I nostri pacchetti</CardTitle>
        <CardDescription>
          Seleziona il pacchetto più adatto alle tue esigenze e inizia a usare tutti i nostri agenti
        </CardDescription>
      </CardHeader>
      <CardContent>
        {renderContent()}
        
        <div className="mt-8 bg-secondary/40 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Ti serve aiuto per scegliere?</h3>
          <p className="mb-4">
            Contattaci per una consulenza personalizzata e scopri quale pacchetto è più adatto alle tue esigenze.
          </p>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-accent" />
            <a href="mailto:sales@ai-platform.example.com" className="text-accent hover:underline">
              sales@ai-platform.example.com
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PackageSettings;
