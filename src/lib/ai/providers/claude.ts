import { ChatMessage } from './types';
import { getStylistSystemPrompt } from './stylist-system-prompt';

export async function callClaude(messages: ChatMessage[], apiKey?: string): Promise<string> {
  const key = apiKey || process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY || process.env.AI_PROVIDER_API_KEY;
  if (!key) {
    throw new Error('ANTHROPIC_API_KEY is not configured');
  }

  const model = process.env.CLAUDE_MODEL || 'claude-3-5-sonnet-20241022';
  const url = 'https://api.anthropic.com/v1/messages';

  const apiMessages = messages.map(m => ({
    role: m.role as 'user' | 'assistant',
    content: m.content,
  }));

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model,
      max_tokens: 1000,
      system: getStylistSystemPrompt(),
      messages: apiMessages,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Claude API Error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  const text = data?.content?.[0]?.text;
  return text || 'I apologize, I could not generate a recommendation right now. Please try again.';
}

