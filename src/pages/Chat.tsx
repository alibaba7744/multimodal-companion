
import React from 'react';
import { motion } from 'framer-motion';
import ChatInterface from '../components/ChatInterface';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';

const Chat = () => {
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate('/');
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900"
    >
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: A1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="p-4"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBackButton}
          className="text-blue-100 hover:bg-blue-800/30"
        >
          <ArrowLeft className="size-5" />
        </Button>
      </motion.header>
      
      <main className="flex-1">
        <ChatInterface />
      </main>
    </motion.div>
  );
};

export default Chat;
