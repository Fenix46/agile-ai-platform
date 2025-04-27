
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Agent } from '@/types';
import { Code, Languages, MessageSquare, Repeat, Settings } from 'lucide-react';

// Mappa per convertire le stringhe di icone nei componenti corrispondenti
const iconMap: Record<string, React.ReactNode> = {
  'repeat': <Repeat className="w-5 h-5" />,
  'languages': <Languages className="w-5 h-5" />,
  'message-square': <MessageSquare className="w-5 h-5" />,
  'code': <Code className="w-5 h-5" />,
  'settings': <Settings className="w-5 h-5" />,
};

interface AgentCardProps {
  agent: Agent;
  onSelect: (agent: Agent) => void;
  isAvailable?: boolean;
}

export default function AgentCard({ agent, onSelect, isAvailable = true }: AgentCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md border-2 border-transparent hover:border-accent/20">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="agent-logo">
            {agent.icon && iconMap[agent.icon] ? 
              iconMap[agent.icon] : 
              <MessageSquare className="w-6 h-6 agent-logo-fallback" />
            }
          </div>
          <div>
            <CardTitle className="text-lg">{agent.name}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="min-h-[60px]">{agent.description}</CardDescription>
        {!isAvailable && (
          <Badge variant="outline" className="mt-2 bg-secondary">
            {agent.requiredPackage.charAt(0).toUpperCase() + agent.requiredPackage.slice(1)}
          </Badge>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={() => onSelect(agent)} 
          disabled={!isAvailable}
          className="w-full"
          variant={isAvailable ? "default" : "outline"}
        >
          {isAvailable ? 'Inizia a chattare' : 'Pacchetto richiesto'}
        </Button>
      </CardFooter>
    </Card>
  );
}
