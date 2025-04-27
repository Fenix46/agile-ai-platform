
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Check, AlertCircle } from 'lucide-react';

interface OAuthGmailButtonProps {
  onConnect: () => Promise<void>;
  onDisconnect: () => Promise<void>;
  isConnected: boolean;
  className?: string;
}

export default function OAuthGmailButton({
  onConnect,
  onDisconnect,
  isConnected,
  className = '',
}: OAuthGmailButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await onConnect();
    } catch (err) {
      setError('Impossibile connettersi a Gmail. Riprova più tardi.');
      console.error('Gmail OAuth error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await onDisconnect();
    } catch (err) {
      setError('Impossibile disconnettersi da Gmail. Riprova più tardi.');
      console.error('Gmail disconnect error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isConnected) {
    return (
      <div className={`flex flex-col ${className}`}>
        <Button
          variant="outline"
          className={`oauth-button oauth-button-connected ${isLoading ? 'opacity-70' : ''}`}
          disabled={isLoading}
          onClick={handleDisconnect}
        >
          {isLoading ? (
            <span className="animate-spin mr-2">◡</span>
          ) : (
            <Check className="h-5 w-5 mr-2" />
          )}
          Gmail Connesso
        </Button>
        {error && (
          <div className="text-xs text-destructive mt-2 flex items-center">
            <AlertCircle className="h-3 w-3 mr-1" />
            {error}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${className}`}>
      <Button
        variant="outline"
        className={`oauth-button ${isLoading ? 'opacity-70' : ''}`}
        disabled={isLoading}
        onClick={handleConnect}
      >
        {isLoading ? (
          <span className="animate-spin mr-2">◡</span>
        ) : (
          <Mail className="h-5 w-5 mr-2" />
        )}
        Connetti Gmail
      </Button>
      {error && (
        <div className="text-xs text-destructive mt-2 flex items-center">
          <AlertCircle className="h-3 w-3 mr-1" />
          {error}
        </div>
      )}
    </div>
  );
}
