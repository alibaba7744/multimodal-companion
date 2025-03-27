
import React, { useState } from 'react';
import { useConversation } from '../lib/context';
import { motion } from 'framer-motion';

interface ImageAnalysisProps {
  imageUrl: string;
  onComplete: (analysis: string) => void;
}

const ImageAnalysis: React.FC<ImageAnalysisProps> = ({ imageUrl, onComplete }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const { setProcessing } = useConversation();
  
  // Simulate image analysis
  React.useEffect(() => {
    setProcessing(true);
    const timer = setTimeout(() => {
      const analysis = "This image appears to be [analysis description]. I can identify [objects/people/scenes] in the image. The dominant colors are [colors]. The overall composition suggests [interpretation/context].";
      setIsAnalyzing(false);
      setProcessing(false);
      onComplete(analysis);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [imageUrl, onComplete, setProcessing]);
  
  if (!isAnalyzing) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center p-4"
    >
      <div className="glass-panel p-4 rounded-xl">
        <div className="flex items-center justify-center space-x-2">
          <div className="size-3 bg-primary rounded-full animate-pulse-subtle"></div>
          <div className="size-3 bg-primary rounded-full animate-pulse-subtle delay-75"></div>
          <div className="size-3 bg-primary rounded-full animate-pulse-subtle delay-150"></div>
        </div>
        <p className="text-sm text-center mt-2">Analyzing image...</p>
      </div>
    </motion.div>
  );
};

export default ImageAnalysis;
