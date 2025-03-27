
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { MessageSquare, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  const handleStartChat = () => {
    navigate('/chat');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900"
    >
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="max-w-md text-center mb-8 px-6 py-8 rounded-2xl glass-panel backdrop-blur-xl"
        >
          <div className="flex justify-center mb-6">
            <div className="size-20 rounded-full bg-blue-500/20 backdrop-blur-sm flex items-center justify-center">
              <Brain className="size-10 text-blue-100" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-4 text-gradient bg-gradient-to-r from-blue-200 to-blue-400">
            Assistant Multimodal
          </h1>
          
          <p className="text-blue-100 mb-8 leading-relaxed opacity-80">
            Je peux comprendre et traiter différents types de données, y compris du texte, 
            des images, du son et des vidéos. Comment puis-je vous aider aujourd'hui?
          </p>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={handleStartChat}
              size="lg"
              className="gap-2 bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 rounded-xl w-full"
            >
              <MessageSquare className="size-5" />
              Démarrer une conversation
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Index;
