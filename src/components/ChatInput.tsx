
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isDisabled?: boolean;
  placeholder?: string;
}

export default function ChatInput({ 
  onSendMessage, 
  isDisabled = false,
  placeholder = "Scrivi un messaggio..." 
}: ChatInputProps) {
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        150
      )}px`;
    }
  }, [inputValue]);

  const handleSendMessage = () => {
    if (inputValue.trim() && !isDisabled) {
      onSendMessage(inputValue.trim());
      setInputValue('');
      
      // Reset height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }

      // Focus dopo l'invio
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex items-end gap-2 p-4 border-t bg-background">
      <Textarea
        ref={textareaRef}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={isDisabled}
        className="min-h-[50px] max-h-[150px] resize-none flex-1"
        rows={1}
      />
      <Button
        onClick={handleSendMessage}
        disabled={!inputValue.trim() || isDisabled}
        size="icon"
        className="h-10 w-10"
      >
        <Send className="h-4 w-4" />
        <span className="sr-only">Invia messaggio</span>
      </Button>
    </div>
  );
}
