
import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Message } from '@/types';

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
        <Avatar className="h-8 w-8 shrink-0">
          {agentAvatar && <AvatarImage src={agentAvatar} alt={agentName || 'Agent'} />}
          <AvatarFallback className="bg-primary text-primary-foreground">
            {agentName?.charAt(0) || 'A'}
          </AvatarFallback>
        </Avatar>
      )}

      <div className={cn(
        "flex flex-col max-w-[80%]",
        isUser ? "items-end" : "items-start"
      )}>
        <div className={cn(
          "rounded-lg px-4 py-2",
          isUser 
            ? "bg-primary text-primary-foreground rounded-br-none" 
            : "bg-secondary text-secondary-foreground rounded-bl-none"
        )}>
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
        <span className="text-xs text-muted-foreground mt-1">{formattedTime}</span>
      </div>

      {isUser && (
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-accent text-accent-foreground">
            {/* Prendiamo la prima lettera dal contesto auth se disponibile, altrimenti "U" per user */}
            U
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
