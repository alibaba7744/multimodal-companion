
import { useEffect, useState } from 'react';
import { Message } from '../lib/types';

export const useConversation = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const sendMessage = async (content: string, type: 'text' | 'image' | 'audio' | 'video' = 'text') => {
    if (!content.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      type,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: `I'm processing your ${type} input: "${content.substring(0, 30)}${content.length > 30 ? '...' : ''}"`,
      type: 'text',
      sender: 'assistant',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, assistantMessage]);
    setIsProcessing(false);
  };

  return {
    messages,
    isProcessing,
    sendMessage,
  };
};
