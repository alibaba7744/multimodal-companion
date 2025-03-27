
import React from 'react';
import { motion } from 'framer-motion';
import ChatInterface from '../components/ChatInterface';

const Chat = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col"
    >
      <main className="flex-1">
        <ChatInterface />
      </main>
    </motion.div>
  );
};

export default Chat;
