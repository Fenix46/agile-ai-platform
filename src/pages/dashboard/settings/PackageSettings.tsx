
/**
 * Componente per la visualizzazione e gestione dei pacchetti
 */

import React from 'react';
import { usePackage } from '../../../contexts/PackageContext';
import PackageList from '../../../components/PackageList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const PackageSettings = () => {
  const { isLoading } = usePackage();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>I nostri pacchetti</CardTitle>
        <CardDescription>
          Seleziona il pacchetto più adatto alle tue esigenze e inizia a usare tutti i nostri agenti
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <PackageList />
        )}
        
        <div className="mt-8 bg-accent/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Ti serve aiuto per scegliere?</h3>
          <p className="mb-4">
            Contattaci per una consulenza personalizzata e scopri quale pacchetto è più adatto alle tue esigenze.
          </p>
          <a href="mailto:sales@ai-platform.example.com" className="text-primary hover:underline">
            sales@ai-platform.example.com
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default PackageSettings;
