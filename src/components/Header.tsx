
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Image, Mic, Settings, Video } from 'lucide-react';

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full flex flex-col items-center py-6 px-4"
    >
      <div className="flex items-center gap-2.5 mb-2">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="size-10 rounded-full bg-primary/10 flex items-center justify-center"
        >
          <Brain className="size-5 text-primary" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-2xl font-semibold tracking-tight"
        >
          Multimodal Assistant
        </motion.h1>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="flex justify-center space-x-4 mt-2"
      >
        {[
          { icon: <Mic className="size-4" />, label: "Audio" },
          { icon: <Image className="size-4" />, label: "Image" },
          { icon: <Video className="size-4" />, label: "Video" },
          { icon: <Settings className="size-4" />, label: "Settings" }
        ].map((item, i) => (
          <motion.button
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.1, duration: 0.3 }}
            className="flex flex-col items-center px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary"
          >
            {item.icon}
            <span className="mt-1 text-xs">{item.label}</span>
          </motion.button>
        ))}
      </motion.div>
    </motion.header>
  );
};

export default Header;
