
/**
 * Pagina dei pacchetti
 * 
 * Mostra i pacchetti disponibili e permette all'utente di sottoscriverli.
 */

import React from 'react';
import Sidebar from '../../components/Sidebar';
import PackageList from '../../components/PackageList';
import ThemeToggle from '../../components/ThemeToggle';

const PackagesPage = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex flex-col flex-grow">
        <header className="h-16 border-b flex items-center justify-between px-6">
          <h1 className="text-xl font-medium">I nostri pacchetti</h1>
          <ThemeToggle />
        </header>
        
        <main className="flex-grow overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2">Scegli il tuo piano</h2>
              <p className="text-muted-foreground">
                Seleziona il pacchetto più adatto alle tue esigenze e inizia a usare tutti i nostri agenti.
              </p>
            </div>
            
            <PackageList />
            
            <div className="mt-8 bg-accent/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Ti serve aiuto per scegliere?</h3>
              <p className="mb-4">
                Contattaci per una consulenza personalizzata e scopri quale pacchetto è più adatto alle tue esigenze.
              </p>
              <a href="mailto:sales@ai-platform.example.com" className="text-primary hover:underline">
                sales@ai-platform.example.com
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PackagesPage;
