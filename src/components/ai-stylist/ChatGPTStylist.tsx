'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Send, User, RotateCcw, ShoppingBag, Eye, 
  ChevronRight, Bot, ShieldCheck, Check, ArrowUp,
  Cpu, HeartHandshake, Mic, MicOff, Copy, Share2,
  ThumbsUp, ThumbsDown, History, X, Plus, Calendar,
  Percent, Star, Palette as PaletteIcon, CheckCheck
} from 'lucide-react';
import Link from 'next/link';
import { Product } from '@/types/index';
import { ChatMessage, ModelProvider, ChatSession } from '@/lib/ai/providers/types';
import { useCart } from '@/hooks/useCart';

const SUGGESTED_PROMPTS = [
  "I'm attending a wedding in Delhi",
  "Need a sherwani for my brother's wedding",
  "Going to Goa for 5 days",
  "Suggest an outfit for Navratri",
  "Need a reception look under ₹3000",
  "Help me style a lehenga",
];

export default function ChatGPTStylist() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [provider, setProvider] = useState<ModelProvider>('auto');
  const [sessionId, setSessionId] = useState(() => `rtv_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  
  // Voice input state
  const [isListening, setIsListening] = useState(false);
  
  // Feedback & Copy states
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [feedbackState, setFeedbackState] = useState<Record<number, 'up' | 'down'>>({});
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});
  
  // Selected duration per product (default 3 days)
  const [selectedDuration, setSelectedDuration] = useState<Record<string, number>>({});

  const { addItem } = useCart();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);

  // Load chat sessions from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('rtv_stylist_sessions');
      if (saved) {
        setSessions(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load saved sessions');
    }
  }, []);

  // Save current session to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      const firstUserMsg = messages.find(m => m.role === 'user')?.content || 'Fashion Styling Session';
      const sessionTitle = firstUserMsg.length > 32 ? `${firstUserMsg.substring(0, 32)}...` : firstUserMsg;

      const currentSession: ChatSession = {
        id: sessionId,
        title: sessionTitle,
        messages,
        updatedAt: Date.now(),
      };

      setSessions(prev => {
        const filtered = prev.filter(s => s.id !== sessionId);
        const updated = [currentSession, ...filtered].slice(0, 15);
        try {
          localStorage.setItem('rtv_stylist_sessions', JSON.stringify(updated));
        } catch {}
        return updated;
      });
    }
  }, [messages, sessionId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Voice Recognition Init
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-IN';

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputValue(prev => prev ? `${prev} ${transcript}` : transcript);
          setIsListening(false);
        };

        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);

        recognitionRef.current = recognition;
      }
    }
  }, []);

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert('Voice recognition is not supported in this browser. Please type your message.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        setIsListening(false);
      }
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: Date.now(),
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInputValue('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai-stylist/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory,
          provider,
          sessionId,
        }),
      });

      const data = await res.json();

      if (data?.data) {
        const assistantMessage: ChatMessage = {
          id: `ai_${Date.now()}`,
          role: 'assistant',
          content: data.data.message,
          products: data.data.products,
          quickReplies: data.data.quickReplies,
          matchScore: data.data.matchScore,
          palette: data.data.palette,
          timestamp: Date.now(),
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error(data?.error || 'Failed to get response');
      }
    } catch (err: any) {
      setMessages(prev => [
        ...prev,
        {
          id: `ai_err_${Date.now()}`,
          role: 'assistant',
          content: "I'm having a brief connection delay with our styling server. Please try asking again in a moment, or click one of the suggested prompts below!",
          quickReplies: ["I'm attending a wedding in Delhi", "Need a sherwani under ₹3000", "Lehenga for Sangeet"],
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleAddToCart = (product: Product) => {
    const duration = selectedDuration[product.id] || 3;
    addItem(product, duration, []);
    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [product.id]: false }));
    }, 2500);
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleShareWhatsApp = (msgContent: string) => {
    const cleanText = msgContent.replace(/###/g, '').replace(/\*\*/g, '');
    const text = encodeURIComponent(`👗 Look what RentTheVastra AI Stylist curated for me!\n\n${cleanText}\n\nExplore at: https://rentthevastra.com/ai-stylist`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const clearChat = () => {
    setMessages([]);
    setInputValue('');
    setSessionId(`rtv_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`);
  };

  const loadSession = (session: ChatSession) => {
    setSessionId(session.id);
    setMessages(session.messages);
    setIsHistoryOpen(false);
  };

  // Helper to render formatted markdown-like text with luxury styling
  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');
    return (
      <div className="space-y-3 text-neutral-800 leading-relaxed text-[15px]">
        {lines.map((line, idx) => {
          const trimmed = line.trim();

          if (trimmed.startsWith('### ')) {
            return (
              <h4 key={idx} className="font-serif text-lg font-bold text-maroon-800 mt-4 mb-1 flex items-center gap-2">
                {trimmed.replace('### ', '')}
              </h4>
            );
          }
          if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
            return (
              <div key={idx} className="flex items-start gap-2 ml-2">
                <span className="text-gold-500 font-bold mt-1 text-xs">✦</span>
                <span>{renderInlineBold(trimmed.substring(2))}</span>
              </div>
            );
          }
          if (/^\d+\.\s/.test(trimmed)) {
            const num = trimmed.match(/^(\d+\.)\s/)?.[1];
            const rest = trimmed.replace(/^\d+\.\s/, '');
            return (
              <div key={idx} className="flex items-start gap-2 ml-2">
                <span className="text-maroon-700 font-semibold text-sm">{num}</span>
                <span>{renderInlineBold(rest)}</span>
              </div>
            );
          }
          if (!trimmed) {
            return <div key={idx} className="h-1" />;
          }
          return <p key={idx}>{renderInlineBold(line)}</p>;
        })}
      </div>
    );
  };

  const renderInlineBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-semibold text-maroon-900">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="relative flex flex-col h-[calc(100vh-5.5rem)] max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden border border-beige-200">
      
      {/* Top Header Bar */}
      <div className="px-4 sm:px-6 py-3.5 border-b border-beige-200 bg-gradient-to-r from-maroon-900 via-maroon-800 to-maroon-900 text-white flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsHistoryOpen(!isHistoryOpen)}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-gold-300 transition-colors"
            title="Saved Style Sessions"
          >
            <History size={18} />
          </button>

          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-gold-500 to-gold-300 flex items-center justify-center text-maroon-900 shadow-md shrink-0">
            <Sparkles size={18} className="animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif font-bold text-base sm:text-lg text-white tracking-wide">
                RentTheVastra AI Stylist
              </h2>
              <span className="bg-gold-400/20 text-gold-300 border border-gold-400/30 text-[9px] uppercase font-bold px-2 py-0.5 rounded-full">
                Interactive
              </span>
            </div>
            <p className="text-[11px] text-maroon-200 hidden sm:block">
              Conversational luxury styling & rental recommendations in Delhi NCR
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Provider Selector */}
          <div className="relative flex items-center bg-black/30 rounded-full px-2.5 py-1 border border-white/10 text-xs text-beige-100">
            <Cpu size={12} className="mr-1.5 text-gold-400 shrink-0" />
            <select
              value={provider}
              onChange={(e) => setProvider(e.target.value as ModelProvider)}
              className="bg-transparent text-white outline-none cursor-pointer pr-1 text-[11px] sm:text-xs"
            >
              <option value="auto" className="bg-neutral-900 text-white">Auto (Best AI)</option>
              <option value="openai" className="bg-neutral-900 text-white">OpenAI GPT-4o</option>
              <option value="gemini" className="bg-neutral-900 text-white">Google Gemini</option>
              <option value="claude" className="bg-neutral-900 text-white">Anthropic Claude</option>
            </select>
          </div>

          <button
            onClick={clearChat}
            className="flex items-center gap-1 text-xs bg-white/10 hover:bg-white/20 text-beige-100 px-3 py-1.5 rounded-full transition-colors shrink-0"
            title="Start fresh conversation"
          >
            <Plus size={14} />
            <span className="hidden sm:inline">New Look</span>
          </button>
        </div>
      </div>

      {/* History Sidebar Drawer */}
      <AnimatePresence>
        {isHistoryOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsHistoryOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-xs z-20"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="absolute inset-y-0 left-0 w-72 sm:w-80 bg-white border-r border-beige-200 z-30 shadow-2xl flex flex-col"
            >
              <div className="p-4 border-b border-beige-200 flex items-center justify-between bg-beige-50">
                <h3 className="font-serif font-bold text-maroon-900 text-sm flex items-center gap-2">
                  <History size={16} className="text-gold-600" />
                  Your Style Sessions
                </h3>
                <button
                  onClick={() => setIsHistoryOpen(false)}
                  className="p-1 text-neutral-400 hover:text-neutral-700 rounded-lg"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-3 border-b border-beige-100">
                <button
                  onClick={() => { clearChat(); setIsHistoryOpen(false); }}
                  className="w-full py-2 px-3 bg-maroon-700 hover:bg-maroon-600 text-white rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <Plus size={14} /> Start New Styling Chat
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
                {sessions.length === 0 ? (
                  <p className="text-xs text-neutral-400 text-center py-8">
                    No past sessions yet. Start asking our AI stylist for recommendations!
                  </p>
                ) : (
                  sessions.map((sess) => (
                    <button
                      key={sess.id}
                      onClick={() => loadSession(sess)}
                      className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex flex-col gap-1 border ${
                        sess.id === sessionId
                          ? 'bg-maroon-50 border-maroon-200 text-maroon-900 font-medium'
                          : 'hover:bg-beige-50 border-transparent text-neutral-600'
                      }`}
                    >
                      <span className="truncate">{sess.title}</span>
                      <span className="text-[10px] text-neutral-400">
                        {new Date(sess.updatedAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </button>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-6 md:px-8 py-6 space-y-6 bg-gradient-to-b from-beige-50/50 via-white to-beige-50/30">
        
        {/* Welcome Screen when Empty */}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center max-w-2xl mx-auto space-y-6 py-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-maroon-700 to-gold-400 p-0.5 shadow-xl"
            >
              <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center text-maroon-700">
                <Sparkles size={32} className="text-gold-500" />
              </div>
            </motion.div>

            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-maroon-900">
                Your Personal AI Fashion Stylist
              </h1>
              <p className="text-neutral-600 text-sm md:text-base max-w-lg mx-auto">
                Describe your event, trip, wedding, festival or occasion and get instant outfit recommendations.
              </p>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-neutral-500 pt-2 border-t border-beige-200 w-full">
              <span className="flex items-center gap-1"><ShieldCheck size={14} className="text-green-600" /> Dry-cleaned & Sanitized</span>
              <span className="flex items-center gap-1"><Sparkles size={14} className="text-gold-500" /> Free Accessories Rental</span>
              <span className="flex items-center gap-1"><HeartHandshake size={14} className="text-maroon-600" /> Delhi NCR Doorstep</span>
            </div>

            {/* Suggested Prompts Grid */}
            <div className="w-full pt-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                Suggested Prompts
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-left">
                {SUGGESTED_PROMPTS.map((prompt, idx) => (
                  <motion.button
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => handleSendMessage(prompt)}
                    className="p-3.5 rounded-xl border border-beige-200 bg-white hover:border-gold-400 hover:bg-gold-50/30 text-neutral-700 hover:text-maroon-900 transition-all flex items-center justify-between text-sm shadow-xs group text-left"
                  >
                    <span>{prompt}</span>
                    <ChevronRight size={16} className="text-neutral-400 group-hover:text-maroon-700 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Message Stream */}
        <AnimatePresence initial={false}>
          {messages.map((msg, index) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {/* Stylist Avatar */}
              {msg.role === 'assistant' && (
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-maroon-700 to-maroon-900 flex items-center justify-center text-gold-400 shrink-0 shadow-md mt-1">
                  <Sparkles size={18} />
                </div>
              )}

              {/* Bubble Body */}
              <div className={`max-w-[92%] sm:max-w-[85%] md:max-w-[78%] rounded-2xl p-5 ${
                msg.role === 'user' 
                  ? 'bg-maroon-700 text-white rounded-tr-none shadow-md' 
                  : 'bg-white text-neutral-800 border border-beige-200 rounded-tl-none shadow-sm'
              }`}>
                {msg.role === 'user' ? (
                  <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                ) : (
                  <div className="space-y-4">
                    
                    {/* Style Match & Palette Badges */}
                    {(msg.matchScore || msg.palette) && (
                      <div className="flex flex-wrap items-center gap-3 pb-3 border-b border-beige-100">
                        {msg.matchScore && (
                          <div className="flex items-center gap-1.5 bg-gold-50 border border-gold-200 px-3 py-1 rounded-full text-xs font-bold text-maroon-800 shadow-2xs">
                            <Sparkles size={13} className="text-gold-500" />
                            {msg.matchScore}% Style Match
                          </div>
                        )}

                        {msg.palette && msg.palette.length > 0 && (
                          <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                            <PaletteIcon size={13} className="text-maroon-700" />
                            <span className="hidden sm:inline font-medium">Palette:</span>
                            <div className="flex items-center gap-1">
                              {msg.palette.map((colorHex, cIdx) => (
                                <span
                                  key={cIdx}
                                  className="w-3.5 h-3.5 rounded-full border border-neutral-300 shadow-2xs inline-block"
                                  style={{ backgroundColor: colorHex }}
                                  title={colorHex}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Formatted Content */}
                    {renderFormattedContent(msg.content)}

                    {/* Attached Product Cards with Duration Selector & Savings */}
                    {msg.products && msg.products.length > 0 && (
                      <div className="mt-6 pt-5 border-t border-beige-200 space-y-3.5">
                        <div className="flex items-center justify-between">
                          <h5 className="font-serif font-bold text-maroon-800 text-sm flex items-center gap-1.5">
                            <Sparkles size={15} className="text-gold-500" />
                            Curated from RentTheVastra
                          </h5>
                          <span className="text-xs text-neutral-500">
                            {msg.products.length} matching piece{msg.products.length > 1 ? 's' : ''}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {msg.products.map((product) => {
                            const isAdded = addedItems[product.id];
                            const currentDur = selectedDuration[product.id] || 3;
                            const price = currentDur === 3 ? product.rentalPrice3Day : currentDur === 5 ? product.rentalPrice5Day : product.rentalPrice7Day;
                            const savingsPercent = Math.round((1 - price / product.retailPrice) * 100);

                            return (
                              <div 
                                key={product.id}
                                className="bg-beige-50/70 rounded-2xl p-3.5 border border-beige-200 flex flex-col justify-between hover:shadow-md transition-all group"
                              >
                                <div>
                                  <div className="relative h-44 rounded-xl overflow-hidden bg-neutral-200 mb-3">
                                    <img
                                      src={product.images[0] || 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80'}
                                      alt={product.title}
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-2.5 left-2.5 bg-maroon-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                      {product.category}
                                    </div>

                                    {savingsPercent > 0 && (
                                      <div className="absolute top-2.5 right-2.5 bg-green-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-xs">
                                        <Percent size={10} /> Save {savingsPercent}%
                                      </div>
                                    )}
                                  </div>

                                  <div className="space-y-1">
                                    <h6 className="font-serif font-bold text-sm text-neutral-900 line-clamp-1 leading-snug">
                                      {product.title}
                                    </h6>
                                    <p className="text-[11px] text-neutral-500 truncate">
                                      by {product.designerName}
                                    </p>
                                  </div>

                                  {/* Duration Selector */}
                                  <div className="mt-3 pt-2.5 border-t border-beige-200 flex items-center justify-between">
                                    <span className="text-[11px] font-medium text-neutral-600 flex items-center gap-1">
                                      <Calendar size={12} className="text-maroon-600" /> Duration:
                                    </span>
                                    <div className="flex gap-1">
                                      {[3, 5, 7].map(d => (
                                        <button
                                          key={d}
                                          onClick={() => setSelectedDuration(prev => ({ ...prev, [product.id]: d }))}
                                          className={`px-2 py-0.5 rounded-md text-[10px] font-semibold transition-all ${
                                            currentDur === d
                                              ? 'bg-maroon-700 text-white'
                                              : 'bg-white text-neutral-600 border border-beige-300 hover:border-gold-400'
                                          }`}
                                        >
                                          {d}D
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                </div>

                                <div className="mt-4 pt-2.5 border-t border-beige-200 flex items-center justify-between">
                                  <div>
                                    <div className="text-sm font-bold text-maroon-700">
                                      ₹{price.toLocaleString('en-IN')}
                                    </div>
                                    <div className="text-[10px] text-neutral-400 line-through">
                                      Buy: ₹{product.retailPrice.toLocaleString('en-IN')}
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() => handleAddToCart(product)}
                                      className={`flex items-center justify-center gap-1 text-xs py-2 px-3 rounded-xl font-medium transition-all ${
                                        isAdded
                                          ? 'bg-green-600 text-white'
                                          : 'bg-maroon-700 hover:bg-maroon-600 text-white shadow-xs hover:shadow-sm'
                                      }`}
                                    >
                                      {isAdded ? (
                                        <>
                                          <Check size={13} /> Added
                                        </>
                                      ) : (
                                        <>
                                          <ShoppingBag size={13} /> Rent Now
                                        </>
                                      )}
                                    </button>

                                    <Link
                                      href={`/product/${product.slug}`}
                                      className="p-2 border border-beige-300 rounded-xl hover:bg-white text-neutral-600 transition-colors"
                                      title="View Product Details"
                                    >
                                      <Eye size={15} />
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Interactive Quick-Reply Action Chips */}
                    {msg.quickReplies && msg.quickReplies.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-beige-100">
                        <div className="flex items-center gap-1 text-[11px] font-semibold text-neutral-400 mb-2 uppercase tracking-wider">
                          <Sparkles size={11} className="text-gold-500" />
                          Suggested Next Steps
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {msg.quickReplies.map((reply, rIdx) => (
                            <button
                              key={rIdx}
                              onClick={() => handleSendMessage(reply)}
                              className="px-3 py-1.5 rounded-full text-xs font-medium bg-gold-50 hover:bg-maroon-700 hover:text-white text-maroon-800 border border-gold-200 hover:border-maroon-700 transition-all shadow-2xs active:scale-95"
                            >
                              {reply}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Bar (Copy, WhatsApp, Thumbs Up/Down) */}
                    <div className="flex items-center justify-between mt-3 pt-2 text-xs text-neutral-400 border-t border-beige-100/60">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleCopy(msg.content, index)}
                          className="flex items-center gap-1 hover:text-maroon-700 transition-colors"
                          title="Copy styling advice"
                        >
                          {copiedIndex === index ? <CheckCheck size={13} className="text-green-600" /> : <Copy size={13} />}
                          <span>{copiedIndex === index ? 'Copied' : 'Copy'}</span>
                        </button>

                        <button
                          onClick={() => handleShareWhatsApp(msg.content)}
                          className="flex items-center gap-1 hover:text-green-600 transition-colors"
                          title="Share look on WhatsApp"
                        >
                          <Share2 size={13} />
                          <span>Share</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setFeedbackState(prev => ({ ...prev, [index]: 'up' }))}
                          className={`p-1 rounded-md transition-colors ${
                            feedbackState[index] === 'up' ? 'text-green-600 bg-green-50' : 'hover:text-neutral-600'
                          }`}
                          title="Helpful recommendation"
                        >
                          <ThumbsUp size={13} />
                        </button>
                        <button
                          onClick={() => setFeedbackState(prev => ({ ...prev, [index]: 'down' }))}
                          className={`p-1 rounded-md transition-colors ${
                            feedbackState[index] === 'down' ? 'text-red-600 bg-red-50' : 'hover:text-neutral-600'
                          }`}
                          title="Not quite what I wanted"
                        >
                          <ThumbsDown size={13} />
                        </button>
                      </div>
                    </div>

                  </div>
                )}
              </div>

              {/* User Avatar */}
              {msg.role === 'user' && (
                <div className="w-9 h-9 rounded-xl bg-neutral-800 flex items-center justify-center text-white shrink-0 shadow-md mt-1">
                  <User size={18} />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3 justify-start"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-maroon-700 to-maroon-900 flex items-center justify-center text-gold-400 shrink-0 shadow-md">
              <Sparkles size={18} className="animate-spin" />
            </div>
            <div className="bg-white border border-beige-200 rounded-2xl rounded-tl-none p-4 shadow-sm flex items-center gap-3">
              <span className="text-sm font-medium text-neutral-600">RentTheVastra Stylist is curating</span>
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-gold-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-maroon-600 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-gold-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Chat Input Bar */}
      <div className="p-3 sm:p-4 md:p-5 border-t border-beige-200 bg-white">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="relative max-w-4xl mx-auto"
        >
          <div className={`flex items-center gap-2 bg-beige-50 border rounded-2xl px-3 sm:px-4 py-2 transition-all shadow-inner ${
            isListening ? 'border-maroon-600 ring-2 ring-maroon-400/30' : 'border-beige-300 focus-within:border-gold-400 focus-within:ring-2 focus-within:ring-gold-400/20'
          }`}>
            <textarea
              ref={inputRef}
              rows={1}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isListening ? "Listening... speak now" : "Example: I'm attending my cousin's wedding in Delhi next month and my budget is ₹2000."}
              className="flex-1 bg-transparent text-neutral-800 placeholder-neutral-400 outline-none resize-none py-2 text-sm md:text-[15px] max-h-32 min-h-[40px]"
            />

            {/* Voice Input Button */}
            <button
              type="button"
              onClick={toggleVoiceInput}
              className={`p-2 rounded-xl transition-all ${
                isListening 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : 'text-neutral-400 hover:text-maroon-700 hover:bg-beige-200'
              }`}
              title={isListening ? "Stop listening" : "Speak with Voice (English / Hindi)"}
            >
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
            </button>

            {/* Send Button */}
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all shrink-0 ${
                inputValue.trim() && !isLoading
                  ? 'bg-maroon-700 hover:bg-maroon-600 text-white shadow-md active:scale-95'
                  : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
              }`}
              title="Send message"
            >
              <ArrowUp size={18} strokeWidth={2.5} />
            </button>
          </div>

          <p className="text-[10px] sm:text-[11px] text-neutral-400 text-center mt-2">
            RentTheVastra AI Stylist curates authentic Indian designer outfits, jewelry & accessories for rental in Delhi NCR.
          </p>
        </form>
      </div>

    </div>
  );
}
