
import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Message } from '@/types';
import { MessageSquare } from 'lucide-react';

interface ChatMessageBubbleProps {
  message: Message;
  agentName?: string;
  agentAvatar?: string;
}

export default function ChatMessageBubble({ 
  message, 
  agentName, 
  agentAvatar 
}: ChatMessageBubbleProps) {
  const isUser = message.role === 'user';
  const formattedTime = new Intl.DateTimeFormat('it-IT', { 
    hour: '2-digit', 
    minute: '2-digit' 
  }).format(message.timestamp);

  return (
    <div className={cn(
      "flex w-full gap-3 mb-4",
      isUser ? "justify-end" : "justify-start"
    )}>
      {!isUser && (
        <div className="agent-logo h-8 w-8 shrink-0">
          {agentAvatar ? (
            <AvatarImage src={agentAvatar} alt={agentName || 'Agent'} className="object-cover" />
          ) : (
            <div className="flex items-center justify-center h-full w-full">
              <MessageSquare className="h-4 w-4 agent-logo-fallback" />
            </div>
          )}
        </div>
      )}

      <div className={cn(
        "flex flex-col max-w-[80%]",
        isUser ? "items-end" : "items-start"
      )}>
        <div className={cn(
          "rounded-lg px-4 py-2",
          isUser 
            ? "bg-accent text-accent-foreground rounded-br-none" 
            : "bg-secondary text-secondary-foreground rounded-bl-none"
        )}>
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
        <span className="text-xs text-muted-foreground mt-1">{formattedTime}</span>
      </div>

      {isUser && (
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary text-primary-foreground">
            U
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
