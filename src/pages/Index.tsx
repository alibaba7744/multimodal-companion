
import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import { Button } from '../components/ui/button';
import { MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ConversationProvider } from '../lib/context';

const Index = () => {
  const navigate = useNavigate();

  const handleStartChat = () => {
    navigate('/chat');
  };

  return (
    <ConversationProvider>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen flex flex-col"
      >
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="max-w-md text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Assistant Multimodal</h1>
            <p className="text-muted-foreground mb-6">
              Je peux comprendre et traiter différents types de données, y compris du texte, 
              des images, du son et des vidéos. Comment puis-je vous aider aujourd'hui?
            </p>
            <Button 
              onClick={handleStartChat}
              size="lg"
              className="gap-2"
            >
              <MessageSquare className="size-5" />
              Démarrer une conversation
            </Button>
          </div>
        </div>
      </motion.div>
    </ConversationProvider>
  );
};

export default Index;
