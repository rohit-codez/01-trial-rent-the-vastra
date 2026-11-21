import OpenAI from 'openai';
import { ChatMessage } from './types';
import { getStylistSystemPrompt } from './stylist-system-prompt';

export async function callOpenAI(messages: ChatMessage[], apiKey?: string): Promise<string> {
  const key = apiKey || process.env.OPENAI_API_KEY || process.env.AI_PROVIDER_API_KEY;
  if (!key) {
    throw new Error('OPENAI_API_KEY is not configured');
  }

  const openai = new OpenAI({ apiKey: key });

  const apiMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    { role: 'system', content: getStylistSystemPrompt() },
    ...messages.map(m => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    })),
  ];

  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    messages: apiMessages,
    temperature: 0.7,
    max_tokens: 1000,
  });

  return response.choices[0]?.message?.content || 'I apologize, I could not generate a recommendation right now. Please try again.';
}

