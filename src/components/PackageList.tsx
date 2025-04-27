
/**
 * Componente per la visualizzazione e selezione dei pacchetti
 * 
 * Mostra i pacchetti disponibili e permette all'utente di sottoscriverli.
 */

import React from 'react';
import { usePackage } from '../contexts/PackageContext';
import { useAuth } from '../contexts/AuthContext';
import { Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const PackageList = () => {
  const { packages, currentPackageId, isLoading, subscribe } = usePackage();
  const { isAuthenticated } = useAuth();
  
  const handleSubscribe = async (packageId: string) => {
    await subscribe(packageId);
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6">
      {isLoading ? (
        <div className="col-span-3 flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        packages.map((pkg) => {
          const isActive = pkg.id === currentPackageId;
          
          return (
            <Card
              key={pkg.id}
              className={`package-card ${
                pkg.isPopular ? 'package-card-popular' : ''
              } ${isActive ? 'ring-2 ring-accent' : ''}`}
            >
              {pkg.isPopular && (
                <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">Popolare</Badge>
              )}
              
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">{pkg.name}</CardTitle>
                <CardDescription>{pkg.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="pb-2">
                <div className="flex items-baseline mb-4">
                  <span className="text-3xl font-bold">€{pkg.price}</span>
                  <span className="ml-1 text-muted-foreground">/mese</span>
                </div>
                
                <ul className="package-features-list">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="package-feature-item">
                      <Check className="text-accent w-5 h-5 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter>
                <Button
                  variant={isActive ? 'outline' : 'default'}
                  className="w-full"
                  disabled={isActive || isLoading || !isAuthenticated}
                  onClick={() => handleSubscribe(pkg.id)}
                >
                  {isActive
                    ? 'Piano attivo'
                    : isLoading
                    ? 'Elaborazione...'
                    : pkg.price === 0
                    ? 'Attiva gratis'
                    : 'Sottoscrivi'}
                </Button>
              </CardFooter>
            </Card>
          );
        })
      )}
    </div>
  );
};

export default PackageList;
