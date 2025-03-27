import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Image, Mic, Paperclip, Loader2, ArrowLeft } from 'lucide-react';
import { useConversation } from '../lib/context';
import { useNavigate } from 'react-router-dom';
import MessageItem from './MessageItem';
import UploadButton from './UploadButton';
import { Button } from './ui/button';

const ChatInterface: React.FC = () => {
  const [input, setInput] = useState('');
  const [showImageUpload, setShowImageUpload] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { currentConversation, addMessage, isProcessing, createNewConversation } = useConversation();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!currentConversation) {
      createNewConversation();
    }
  }, [currentConversation, createNewConversation]);
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    await addMessage({
      content: input,
      type: 'text',
      sender: 'user',
    });
    
    setInput('');
  };
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentConversation?.messages]);
  
  const toggleImageUpload = () => {
    setShowImageUpload(prev => !prev);
  };
  
  const handleBackButton = () => {
    navigate('/');
  };
  
  const showEmptyState = !currentConversation || currentConversation.messages.length === 0;
  
  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto">
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border px-4 py-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleBackButton}
          className="mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Retour</span>
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="py-4 space-y-6">
          {showEmptyState ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-4 py-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-md"
              >
                <div className="size-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Paperclip className="size-10 text-primary/70" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">Multimodal Assistant</h2>
                <p className="text-muted-foreground mb-6">
                  I can understand and process different types of data including text, images, voice,
                  and videos. How can I assist you today?
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {[
                    "Analyze this image for me",
                    "Explain this concept",
                    "Help me with a creative task",
                    "Transcribe this audio file"
                  ].map((suggestion, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + (i * 0.1) }}
                      className="glass-panel px-3 py-1.5 text-sm rounded-full hover:bg-secondary/50 transition-colors"
                      onClick={() => setInput(suggestion)}
                    >
                      {suggestion}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
          ) : (
            <>
              {currentConversation.messages.map((message) => (
                <MessageItem key={message.id} message={message} />
              ))}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="border-t border-border bg-background/80 backdrop-blur-sm py-4 px-4 sticky bottom-0">
        <AnimatePresence>
          {isProcessing && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute -top-10 left-1/2 transform -translate-x-1/2"
            >
              <div className="glass-panel px-3 py-1.5 rounded-full flex items-center gap-2">
                <Loader2 className="size-3.5 animate-spin text-primary" />
                <span className="text-xs">Processing your request...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <form onSubmit={handleSendMessage} className="relative">
          <div className="absolute left-3.5 top-1/2 transform -translate-y-1/2 flex gap-2">
            <button
              type="button"
              onClick={toggleImageUpload}
              className="size-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <Image className="size-5" />
            </button>
            <button
              type="button"
              className="size-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mic className="size-5" />
            </button>
          </div>
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message or type '/' for commands..."
            className="w-full bg-secondary/60 border border-border rounded-full py-3 pl-24 pr-14 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
          />
          
          <button
            type="submit"
            disabled={!input.trim()}
            className="absolute right-1.5 top-1/2 transform -translate-y-1/2 size-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            <Send className="size-4" />
          </button>
        </form>
      </div>
      
      {showImageUpload && <UploadButton onClose={toggleImageUpload} />}
    </div>
  );
};

export default ChatInterface;
