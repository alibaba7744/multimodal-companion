
import React, { useState } from 'react';
import { Image, Loader2, Upload, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConversation } from '../lib/context';

interface UploadButtonProps {
  onClose: () => void;
}

const UploadButton: React.FC<UploadButtonProps> = ({ onClose }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { addMessage } = useConversation();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      handleFile(selectedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      handleFile(selectedFile);
    }
  };

  const handleFile = (selectedFile: File) => {
    if (selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file || !preview) return;
    
    setIsUploading(true);
    
    try {
      // Simulate uploading and analyzing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      await addMessage({
        content: 'Analyze this image for me, please.',
        type: 'image',
        sender: 'user',
        imageUrl: preview,
      });
      
      onClose();
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed inset-x-0 bottom-20 flex justify-center items-center px-4 z-50"
      >
        <motion.div 
          className="glass-panel rounded-xl max-w-md w-full relative overflow-hidden"
          initial={{ height: 'auto' }}
          animate={{ height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <button 
            onClick={onClose}
            className="absolute right-3 top-3 size-6 rounded-full bg-background/50 hover:bg-background/80 flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors"
          >
            <X className="size-3.5" />
          </button>
          
          {!preview ? (
            <div 
              className={`flex flex-col items-center justify-center gap-3 p-8 rounded-lg transition-colors ${
                isDragging ? 'bg-primary/10' : ''
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center">
                <Image className="size-7 text-primary" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium">Upload Image</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Drag and drop or click to select an image
                </p>
              </div>
              <input
                type="file"
                id="file-upload"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="file-upload"
                className="mt-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors cursor-pointer"
              >
                Select Image
              </label>
            </div>
          ) : (
            <div className="p-4">
              <div className="rounded-lg overflow-hidden mb-4 border border-border">
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="w-full max-h-[300px] object-contain"
                />
              </div>
              
              <div className="flex justify-between gap-3">
                <button 
                  onClick={reset}
                  className="flex-1 py-2 rounded-full bg-secondary hover:bg-secondary/80 text-sm font-medium transition-colors"
                >
                  Reset
                </button>
                <button 
                  onClick={handleUpload}
                  disabled={isUploading}
                  className="flex-1 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-70 flex justify-center items-center gap-2"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="size-4" />
                      <span>Upload</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UploadButton;
