import { products } from '@/data/products';
import { Product } from '@/types/index';
import { ChatMessage, ModelProvider, StylistResponse } from './types';
import { callOpenAI } from './openai';
import { callGemini } from './gemini';
import { callClaude } from './claude';
import { callSmartFallback } from './smart-fallback';

export async function generateStylistResponse(
  messages: ChatMessage[],
  preferredProvider: ModelProvider = 'auto'
): Promise<StylistResponse> {
  let rawText = '';
  let providerUsed = 'smart-fallback';
  let modelName = 'RentTheVastra Stylist Engine';

  // Determine provider priority
  const hasOpenAI = Boolean(process.env.OPENAI_API_KEY || (process.env.AI_PROVIDER_API_KEY && process.env.AI_PROVIDER === 'openai'));
  const hasGemini = Boolean(process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY || (process.env.AI_PROVIDER_API_KEY && process.env.AI_PROVIDER === 'gemini'));
  const hasClaude = Boolean(process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY || (process.env.AI_PROVIDER_API_KEY && process.env.AI_PROVIDER === 'claude'));

  try {
    if (preferredProvider === 'openai' && hasOpenAI) {
      rawText = await callOpenAI(messages);
      providerUsed = 'openai';
      modelName = process.env.OPENAI_MODEL || 'GPT-4o';
    } else if (preferredProvider === 'gemini' && hasGemini) {
      rawText = await callGemini(messages);
      providerUsed = 'gemini';
      modelName = process.env.GEMINI_MODEL || 'Gemini 1.5 Flash';
    } else if (preferredProvider === 'claude' && hasClaude) {
      rawText = await callClaude(messages);
      providerUsed = 'claude';
      modelName = process.env.CLAUDE_MODEL || 'Claude 3.5 Sonnet';
    } else if (preferredProvider === 'auto' || !rawText) {
      // Auto-select based on available keys
      if (hasOpenAI) {
        rawText = await callOpenAI(messages);
        providerUsed = 'openai';
        modelName = process.env.OPENAI_MODEL || 'GPT-4o';
      } else if (hasGemini) {
        rawText = await callGemini(messages);
        providerUsed = 'gemini';
        modelName = process.env.GEMINI_MODEL || 'Gemini 1.5 Flash';
      } else if (hasClaude) {
        rawText = await callClaude(messages);
        providerUsed = 'claude';
        modelName = process.env.CLAUDE_MODEL || 'Claude 3.5 Sonnet';
      } else {
        // High quality smart fallback
        rawText = callSmartFallback(messages);
        providerUsed = 'smart-fallback';
        modelName = 'RentTheVastra Expert Engine';
      }
    }
  } catch (error: any) {
    console.warn(`[AI Stylist] Provider ${preferredProvider} failed:`, error?.message);
    // Fall back to rule engine smoothly without breaking UX
    rawText = callSmartFallback(messages);
    providerUsed = 'smart-fallback (fallback)';
    modelName = 'RentTheVastra Expert Engine';
  }

  // Parse attached product IDs from <!-- PRODUCTS: ["id1", "id2"] -->
  let attachedProducts: Product[] = [];
  const productTagRegex = /<!--\s*PRODUCTS:\s*(\[[\s\S]*?\])\s*-->/;
  const match = rawText.match(productTagRegex);

  if (match && match[1]) {
    try {
      const ids: string[] = JSON.parse(match[1]);
      attachedProducts = ids
        .map(id => products.find(p => p.id === id))
        .filter((p): p is Product => Boolean(p));
    } catch {
      // Ignore parse errors
    }
  }

  // Clean the text by removing the hidden comment
  const cleanMessage = rawText.replace(productTagRegex, '').trim();

  return {
    message: cleanMessage,
    products: attachedProducts.length > 0 ? attachedProducts : undefined,
    providerUsed,
    modelName,
  };
}

export * from './types';
