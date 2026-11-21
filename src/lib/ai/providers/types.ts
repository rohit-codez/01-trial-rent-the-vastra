import { Product } from '@/types/index';

export type ModelProvider = 'openai' | 'gemini' | 'claude' | 'auto';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  products?: Product[];
  quickReplies?: string[];
  matchScore?: number;
  palette?: string[];
  timestamp: number;
}

export interface StylistResponse {
  message: string;
  products?: Product[];
  quickReplies?: string[];
  matchScore?: number;
  palette?: string[];
  providerUsed: string;
  modelName: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  updatedAt: number;
}
