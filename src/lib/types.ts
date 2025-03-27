
export type MessageType = 'text' | 'image' | 'audio' | 'video';

export interface Message {
  id: string;
  content: string;
  type: MessageType;
  sender: 'user' | 'assistant';
  timestamp: Date;
  imageUrl?: string;
  imageAnalysis?: string;
  audioUrl?: string;
  videoUrl?: string;
}

export interface Conversation {
  id: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}
