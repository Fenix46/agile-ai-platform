
/**
 * Componente per la gestione dell'autenticazione
 * 
 * Mostra un modulo di login o registrazione e gestisce le operazioni
 * di autenticazione tramite il context AuthContext.
 */

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '../contexts/AuthContext';

const AuthForm = () => {
  const { login, signup, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('login');
  
  // State per il form di login
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  
  // State per il form di registrazione
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  // Errori di validazione
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Gestione del cambio nei campi del form di login
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Pulisci gli errori quando l'utente modifica l'input
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };
  
  // Gestione del cambio nei campi del form di registrazione
  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Pulisci gli errori quando l'utente modifica l'input
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };
  
  // Validazione form di login
  const validateLogin = () => {
    const newErrors: Record<string, string> = {};
    
    if (!loginData.email) {
      newErrors.email = 'L\'email è obbligatoria';
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      newErrors.email = 'Formato email non valido';
    }
    
    if (!loginData.password) {
      newErrors.password = 'La password è obbligatoria';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Validazione form di registrazione
  const validateSignup = () => {
    const newErrors: Record<string, string> = {};
    
    if (!signupData.name) {
      newErrors.name = 'Il nome è obbligatorio';
    }
    
    if (!signupData.email) {
      newErrors.email = 'L\'email è obbligatoria';
    } else if (!/\S+@\S+\.\S+/.test(signupData.email)) {
      newErrors.email = 'Formato email non valido';
    }
    
    if (!signupData.password) {
      newErrors.password = 'La password è obbligatoria';
    } else if (signupData.password.length < 6) {
      newErrors.password = 'La password deve contenere almeno 6 caratteri';
    }
    
    if (!signupData.confirmPassword) {
      newErrors.confirmPassword = 'Conferma la password';
    } else if (signupData.password !== signupData.confirmPassword) {
      newErrors.confirmPassword = 'Le password non corrispondono';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Submit del form di login
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateLogin()) return;
    
    try {
      await login(loginData);
    } catch (error) {
      console.error('Login error:', error);
    }
  };
  
  // Submit del form di registrazione
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateSignup()) return;
    
    try {
      await signup(signupData);
    } catch (error) {
      console.error('Signup error:', error);
    }
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          {activeTab === 'login' ? 'Accedi' : 'Registrati'}
        </CardTitle>
        <CardDescription className="text-center">
          {activeTab === 'login'
            ? 'Accedi al tuo account per iniziare'
            : 'Crea un nuovo account per iniziare'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Accedi</TabsTrigger>
            <TabsTrigger value="signup">Registrati</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLoginSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="nome@esempio.it"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    className={errors.email ? 'border-destructive' : ''}
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive">{errors.email}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label htmlFor="password" className="text-sm font-medium">
                      Password
                    </label>
                    <a href="#" className="text-xs text-primary hover:underline">
                      Password dimenticata?
                    </a>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    className={errors.password ? 'border-destructive' : ''}
                  />
                  {errors.password && (
                    <p className="text-xs text-destructive">{errors.password}</p>
                  )}
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Accesso...' : 'Accedi'}
                </Button>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="signup">
            <form onSubmit={handleSignupSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Nome completo
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Mario Rossi"
                    value={signupData.name}
                    onChange={handleSignupChange}
                    className={errors.name ? 'border-destructive' : ''}
                  />
                  {errors.name && (
                    <p className="text-xs text-destructive">{errors.name}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="nome@esempio.it"
                    value={signupData.email}
                    onChange={handleSignupChange}
                    className={errors.email ? 'border-destructive' : ''}
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive">{errors.email}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={signupData.password}
                    onChange={handleSignupChange}
                    className={errors.password ? 'border-destructive' : ''}
                  />
                  {errors.password && (
                    <p className="text-xs text-destructive">{errors.password}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium">
                    Conferma password
                  </label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={signupData.confirmPassword}
                    onChange={handleSignupChange}
                    className={errors.confirmPassword ? 'border-destructive' : ''}
                  />
                  {errors.confirmPassword && (
                    <p className="text-xs text-destructive">{errors.confirmPassword}</p>
                  )}
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Registrazione...' : 'Registrati'}
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-center">
        <div className="text-sm text-muted-foreground">
          {activeTab === 'login' ? (
            <>
              Non hai un account?{' '}
              <a
                href="#"
                className="text-primary hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('signup');
                }}
              >
                Registrati
              </a>
            </>
          ) : (
            <>
              Hai già un account?{' '}
              <a
                href="#"
                className="text-primary hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('login');
                }}
              >
                Accedi
              </a>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
