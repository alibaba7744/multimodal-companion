
import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Message, Conversation } from './types';

interface ConversationContextType {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  isProcessing: boolean;
  createNewConversation: () => Conversation;
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => Promise<void>;
  setProcessing: (isProcessing: boolean) => void;
}

const ConversationContext = createContext<ConversationContextType | undefined>(undefined);

export const ConversationProvider = ({ children }: { children: ReactNode }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const createNewConversation = useCallback(() => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setConversations((prev) => [...prev, newConversation]);
    setCurrentConversation(newConversation);
    return newConversation;
  }, []);

  const addMessage = useCallback(
    async (messageData: Omit<Message, 'id' | 'timestamp'>) => {
      setIsProcessing(true);
      
      const newMessage: Message = {
        ...messageData,
        id: Date.now().toString(),
        timestamp: new Date(),
      };

      let conversation = currentConversation;
      if (!conversation) {
        conversation = createNewConversation();
      }

      const updatedConversation = {
        ...conversation,
        messages: [...conversation.messages, newMessage],
        updatedAt: new Date(),
      };

      setConversations((prev) =>
        prev.map((conv) => (conv.id === updatedConversation.id ? updatedConversation : conv))
      );
      setCurrentConversation(updatedConversation);

      // Simulate assistant response after a short delay
      if (messageData.sender === 'user') {
        setTimeout(() => {
          const assistantResponse: Message = {
            id: Date.now().toString(),
            content: `I'm your multimodal assistant, currently responding to: "${messageData.content}"`,
            type: 'text',
            sender: 'assistant',
            timestamp: new Date(),
          };

          const updatedWithResponse = {
            ...updatedConversation,
            messages: [...updatedConversation.messages, assistantResponse],
            updatedAt: new Date(),
          };

          setConversations((prev) =>
            prev.map((conv) => (conv.id === updatedWithResponse.id ? updatedWithResponse : conv))
          );
          setCurrentConversation(updatedWithResponse);
          setIsProcessing(false);
        }, 1000);
      } else {
        setIsProcessing(false);
      }
    },
    [currentConversation, createNewConversation]
  );

  const setProcessing = (processing: boolean) => {
    setIsProcessing(processing);
  };

  return (
    <ConversationContext.Provider
      value={{
        conversations,
        currentConversation,
        isProcessing,
        createNewConversation,
        addMessage,
        setProcessing,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};

export const useConversation = () => {
  const context = useContext(ConversationContext);
  if (context === undefined) {
    throw new Error('useConversation must be used within a ConversationProvider');
  }
  return context;
};
