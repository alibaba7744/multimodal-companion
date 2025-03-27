
import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import ChatInterface from '../components/ChatInterface';
import { ConversationProvider } from '../lib/context';

const Index = () => {
  return (
    <ConversationProvider>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen flex flex-col"
      >
        <Header />
        <div className="flex-1 flex flex-col">
          <main className="flex-1">
            <ChatInterface />
          </main>
        </div>
      </motion.div>
    </ConversationProvider>
  );
};

export default Index;
