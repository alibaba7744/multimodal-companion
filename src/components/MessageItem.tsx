
import React from 'react';
import { Message } from '../lib/types';
import { motion } from 'framer-motion';
import { User, Bot, ImageIcon } from 'lucide-react';

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} max-w-full pb-4`}
    >
      <div 
        className={`shrink-0 size-8 rounded-full flex items-center justify-center
        ${isUser ? 'bg-primary text-white' : 'glass-panel'}`}
      >
        {isUser ? <User className="size-4" /> : <Bot className="size-4" />}
      </div>
      
      <div 
        className={`flex flex-col gap-1 max-w-[85%] ${
          isUser ? 'items-end' : 'items-start'
        }`}
      >
        <div 
          className={`px-4 py-3 rounded-2xl ${
            isUser 
              ? 'bg-primary text-primary-foreground rounded-tr-none' 
              : 'glass-panel rounded-tl-none'
          }`}
        >
          <p className="text-sm">{message.content}</p>
        </div>
        
        {message.imageUrl && (
          <div className="mt-2 rounded-xl overflow-hidden border border-border">
            <div className="relative">
              <img 
                src={message.imageUrl} 
                alt="User uploaded image" 
                className="max-w-[300px] max-h-[300px] object-contain"
              />
              {message.imageAnalysis && (
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                  <div className="glass-panel p-3 max-w-[90%] max-h-[90%] overflow-auto rounded-lg text-xs">
                    <div className="flex items-center gap-2 mb-1">
                      <ImageIcon className="size-3.5" />
                      <p className="font-medium">Image Analysis</p>
                    </div>
                    <p>{message.imageAnalysis}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        <span className="text-xs text-muted-foreground px-1">
          {new Date(message.timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </span>
      </div>
    </motion.div>
  );
};

export default MessageItem;
