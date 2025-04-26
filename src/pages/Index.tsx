/**
 * Pagina principale (landing page)
 * 
 * Mostra una pagina di benvenuto con opzioni di login/registrazione
 * e informazioni sulla piattaforma.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import AuthForm from '../components/AuthForm';
import ThemeToggle from '../components/ThemeToggle';
import AnimatedMotto from '../components/AnimatedMotto';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b py-4 px-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold gradient-heading">AI Platform</h1>
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="#features" className="text-sm font-medium hover:text-primary transition-colors">
                Funzionalità
              </Link>
              <Link to="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
                Prezzi
              </Link>
              <Link to="#about" className="text-sm font-medium hover:text-primary transition-colors">
                Chi siamo
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <div className="hidden md:block">
              <Link to="/dashboard">
                <Button variant="outline">Accedi</Button>
              </Link>
            </div>
            <Link to="/dashboard">
              <Button>Inizia gratis</Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero section */}
        <section className="py-16 md:py-24 px-6">
          <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <AnimatedMotto />
              <p className="text-xl text-muted-foreground">
                Accedi a potenti agenti AI personalizzati per migliorare la tua produttività e risolvere problemi complessi.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/dashboard">
                  <Button size="lg">Inizia gratuitamente</Button>
                </Link>
                <Link to="#features">
                  <Button variant="outline" size="lg">Scopri di più</Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <AuthForm />
            </div>
          </div>
        </section>

        {/* Features section */}
        <section id="features" className="py-16 bg-secondary/50 px-6">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Funzionalità principali</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Agenti Personalizzati</CardTitle>
                  <CardDescription>Soluzioni AI specifiche per ogni esigenza</CardDescription>
                </CardHeader>
                <CardContent>
                  Accedi a una varietà di agenti specializzati per traduzione, scrittura, codice e altro, tutti progettati per risolvere problemi specifici.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Risposte in Streaming</CardTitle>
                  <CardDescription>Visualizza le risposte mentre vengono generate</CardDescription>
                </CardHeader>
                <CardContent>
                  Non dovrai attendere il completamento dell'elaborazione. Visualizza le risposte in tempo reale con la nostra tecnologia di streaming.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Interfaccia Intuitiva</CardTitle>
                  <CardDescription>Semplice da usare, potente nei risultati</CardDescription>
                </CardHeader>
                <CardContent>
                  Un'interfaccia user-friendly che permette di interagire con l'AI in modo naturale e ottenere rapidamente i risultati di cui hai bisogno.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing section */}
        <section id="pricing" className="py-16 px-6">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">Piani e prezzi</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Scegli il piano più adatto alle tue esigenze, da quello gratuito per i principianti fino alle soluzioni enterprise complete.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Free</CardTitle>
                  <CardDescription>Per iniziare a esplorare</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">€0</span>
                    <span className="text-muted-foreground">/mese</span>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      Accesso agli agenti base
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      Max 50 messaggi/giorno
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      Supporto community
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link to="/dashboard" className="w-full">
                    <Button variant="outline" className="w-full">Inizia gratis</Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card className="border-primary/40 shadow-md">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Pro</CardTitle>
                    <span className="bg-primary text-primary-foreground text-xs py-1 px-2 rounded-md">Popolare</span>
                  </div>
                  <CardDescription>Per professionisti e piccoli team</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">€9.99</span>
                    <span className="text-muted-foreground">/mese</span>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      Accesso a tutti gli agenti
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      Messaggi illimitati
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      Supporto prioritario
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      API personalizzata
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link to="/dashboard/packages" className="w-full">
                    <Button className="w-full">Abbonati ora</Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <CardDescription>Per aziende con esigenze avanzate</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">€49.99</span>
                    <span className="text-muted-foreground">/mese</span>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      Agenti personalizzabili
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      Messaggi illimitati
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      Supporto dedicato 24/7
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      Integrazione completa
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      Analisi avanzate
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link to="/dashboard/packages" className="w-full">
                    <Button variant="outline" className="w-full">Contattaci</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* About section */}
        <section id="about" className="py-16 bg-secondary/50 px-6">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-8">Chi siamo</h2>
            <div className="prose prose-lg mx-auto">
              <p className="text-center mb-6">
                Siamo un team di esperti in intelligenza artificiale dedicati a rendere la potenza dell'AI accessibile a tutti.
              </p>
              <p className="text-center mb-8">
                La nostra missione è fornire strumenti AI avanzati che aiutino professionisti e aziende a risolvere problemi complessi, automatizzare attività ripetitive e aumentare la produttività.
              </p>
              <div className="text-center">
                <Link to="/dashboard">
                  <Button>Inizia il tuo viaggio nell'AI</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t mt-auto py-8 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">AI Platform</h3>
              <p className="text-muted-foreground">
                Strumenti AI intelligenti per aumentare la tua produttività e risolvere problemi complessi.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Link rapidi</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="#features" className="text-muted-foreground hover:text-primary transition-colors">
                    Funzionalità
                  </Link>
                </li>
                <li>
                  <Link to="#pricing" className="text-muted-foreground hover:text-primary transition-colors">
                    Prezzi
                  </Link>
                </li>
                <li>
                  <Link to="#about" className="text-muted-foreground hover:text-primary transition-colors">
                    Chi siamo
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contatti</h3>
              <ul className="space-y-2">
                <li className="text-muted-foreground">
                  Email: info@ai-platform.example.com
                </li>
                <li className="text-muted-foreground">
                  Telefono: +39 123 456 7890
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              &copy; 2023 AI Platform. Tutti i diritti riservati.
            </p>
            <div className="flex space-x-6">
              <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                Termini di servizio
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
