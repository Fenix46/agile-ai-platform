/**
 * Pagina principale (landing page)
 * 
 * Mostra una pagina di benvenuto con opzioni di login/registrazione
 * e informazioni sulla piattaforma.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
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
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/416df129-3707-46b0-8e0b-c4102ac15a2b.png" 
                alt="YouAI Suite Logo" 
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-youai-purple via-youai-blue to-youai-cyan bg-clip-text text-transparent">
                YouAI Suite
              </span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="#features" className="text-sm font-medium hover:text-primary transition-colors">
                Features
              </Link>
              <Link to="#about" className="text-sm font-medium hover:text-primary transition-colors">
                About
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link to="/dashboard">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/dashboard">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero section */}
        <section className="py-16 md:py-24 px-6">
          <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <AnimatedMotto />
              <p className="text-lg text-muted-foreground">
                Access powerful AI agents tailored to your needs to enhance productivity and solve complex problems.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/dashboard">
                  <Button size="lg" className="bg-gradient-to-r from-youai-purple to-youai-blue hover:opacity-90">
                    Get Started Free
                  </Button>
                </Link>
                <Link to="#features">
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
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
            <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
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

        {/* About section */}
        <section id="about" className="py-16 bg-secondary/50 px-6">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-8">About</h2>
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
              <h3 className="text-lg font-semibold mb-4">YouAI Suite</h3>
              <p className="text-muted-foreground">
                Strumenti AI intelligenti per aumentare la tua produttività e risolvere problemi complessi.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Link rapidi</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="#features" className="text-muted-foreground hover:text-primary transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="#about" className="text-muted-foreground hover:text-primary transition-colors">
                    About
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
