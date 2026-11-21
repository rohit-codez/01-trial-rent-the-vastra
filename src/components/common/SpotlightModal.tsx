'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Sparkles, ArrowRight, ShieldCheck, Tag, Zap, Eye } from 'lucide-react';
import { products } from '@/data/products';
import { Product } from '@/types';
import Link from 'next/link';

interface SpotlightModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUICK_TRENDING = [
  'Bridal Lehengas',
  'Groom Sherwani',
  'Sangeet Sharara',
  'Himalayan Trek Kit',
  'Pre-Draped Silk Saree',
  'Kids Army Costume',
  'Under ₹2,500',
];

export default function SpotlightModal({ isOpen, onClose }: SpotlightModalProps) {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'search' | 'ai'>('search');
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Global keydown listener for Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Live filter query
  useEffect(() => {
    if (!query.trim()) {
      setResults(products.slice(0, 6));
      return;
    }

    const q = query.toLowerCase();
    const filtered = products.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.designerName.toLowerCase().includes(q) ||
      p.color.toLowerCase().includes(q) ||
      p.fabric.toLowerCase().includes(q) ||
      p.occasionTags.some(t => t.toLowerCase().includes(q))
    ).slice(0, 8);

    setResults(filtered);
  }, [query]);

  // Instant AI Quick Consult
  const handleAiAsk = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!aiQuestion.trim()) return;

    setIsAiLoading(true);
    setAiAnswer(null);

    try {
      const res = await fetch('/api/ai-stylist/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: aiQuestion }]
        })
      });
      const data = await res.json();
      setAiAnswer(data.content || 'I recommend exploring our curated bridal and celebration collections tailored with free accessories.');
    } catch {
      setAiAnswer('For your event, choose rich fabrics with matching tones. Every rental includes 2 free accessories to complete the look!');
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-14 sm:pt-20 px-4">
          
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.4)] border border-neutral-200/80 overflow-hidden z-10 flex flex-col max-h-[82vh]"
          >
            {/* Top Bar with Mode Tabs */}
            <div className="flex items-center justify-between px-6 pt-4 pb-2 border-b border-neutral-100 bg-neutral-50/50">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('search')}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    activeTab === 'search'
                      ? 'bg-maroon-700 text-white shadow-sm'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/50'
                  }`}
                >
                  Instant Catalog Search
                </button>
                <button
                  onClick={() => setActiveTab('ai')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    activeTab === 'ai'
                      ? 'bg-gold-400 text-maroon-950 shadow-sm'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/50'
                  }`}
                >
                  <Sparkles size={12} className={activeTab === 'ai' ? 'text-maroon-950' : 'text-gold-500'} />
                  <span>Ask AI Assistant</span>
                </button>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200/50 transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Tab 1: Instant Catalog Search */}
            {activeTab === 'search' && (
              <>
                {/* Search Input Box */}
                <div className="relative flex items-center px-6 py-4 border-b border-neutral-100">
                  <Search size={20} className="text-neutral-400 mr-3 shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by outfit name, designer, occasion, or color..."
                    className="w-full text-base sm:text-lg font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-none bg-transparent"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery('')}
                      className="text-xs font-semibold text-neutral-400 hover:text-neutral-700 px-2 py-1 rounded-md"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Quick Trending Chips */}
                {!query && (
                  <div className="px-6 py-3 bg-beige-50/50 border-b border-neutral-100 flex items-center gap-2 overflow-x-auto hide-scrollbar">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 shrink-0">
                      Trending:
                    </span>
                    {QUICK_TRENDING.map((term, i) => (
                      <button
                        key={i}
                        onClick={() => setQuery(term)}
                        className="text-xs font-medium text-neutral-600 hover:text-maroon-700 bg-white hover:bg-gold-50 border border-neutral-200 hover:border-gold-300 px-2.5 py-1 rounded-full shrink-0 transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                )}

                {/* Results List */}
                <div className="p-4 overflow-y-auto space-y-2 flex-1">
                  {results.length > 0 ? (
                    results.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.slug}`}
                        onClick={onClose}
                        className="group flex items-center gap-4 p-2.5 rounded-2xl hover:bg-beige-50/80 border border-transparent hover:border-neutral-200/80 transition-all duration-200"
                      >
                        {/* Thumbnail */}
                        <div className="w-14 h-16 rounded-xl overflow-hidden bg-neutral-100 shrink-0 border border-neutral-200/60">
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-gold-600">
                              {product.designerName}
                            </span>
                            <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded font-medium border border-emerald-100">
                              🎁 2 Free Accessories
                            </span>
                          </div>
                          <h4 className="font-serif font-bold text-neutral-900 text-sm truncate group-hover:text-maroon-700 transition-colors">
                            {product.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-neutral-500 mt-0.5">
                            <span>{product.category}</span>
                            <span>·</span>
                            <span>{product.color}</span>
                            <span>·</span>
                            <span className="font-bold text-maroon-700">₹{product.rentalPrice3Day} / 3 days</span>
                            <span className="line-through text-neutral-400">₹{product.retailPrice}</span>
                          </div>
                        </div>

                        {/* Arrow */}
                        <div className="w-8 h-8 rounded-full bg-neutral-100 group-hover:bg-maroon-700 group-hover:text-white flex items-center justify-center shrink-0 text-neutral-400 transition-colors">
                          <ArrowRight size={14} />
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="text-center py-12 text-neutral-400 text-sm">
                      No outfits matched &quot;{query}&quot;. Try searching for &quot;Lehenga&quot;, &quot;Sherwani&quot;, or &quot;Trek&quot;.
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Tab 2: Ask AI Stylist Mode */}
            {activeTab === 'ai' && (
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gold-400 to-amber-500 flex items-center justify-center shadow-md">
                      <Sparkles size={18} className="text-maroon-950" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-neutral-900 text-sm">Instant AI Fashion Advice</h4>
                      <p className="text-xs text-neutral-500">Ask about dress codes, color coordination, or budget looks</p>
                    </div>
                  </div>

                  <form onSubmit={handleAiAsk} className="relative mb-4">
                    <textarea
                      rows={3}
                      value={aiQuestion}
                      onChange={(e) => setAiQuestion(e.target.value)}
                      placeholder="e.g., I'm attending a winter sangeet in Delhi. Suggest a pastel look with matching jewelry under ₹3,000..."
                      className="w-full text-sm p-4 rounded-2xl border border-neutral-200 focus:border-gold-400 focus:outline-none bg-neutral-50/50 resize-none font-medium"
                    />
                    <button
                      type="submit"
                      disabled={isAiLoading || !aiQuestion.trim()}
                      className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-maroon-700 hover:bg-maroon-800 disabled:bg-neutral-300 text-white font-bold text-xs transition-colors shadow-sm"
                    >
                      {isAiLoading ? 'Analyzing...' : 'Ask AI'}
                    </button>
                  </form>

                  {/* AI Response Box */}
                  {aiAnswer && (
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-maroon-50 via-beige-50 to-gold-50 border border-maroon-100/80 text-xs sm:text-sm text-neutral-800 leading-relaxed max-h-48 overflow-y-auto">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-maroon-800 mb-1">
                        <Sparkles size={13} className="text-gold-500" />
                        <span>Stylist Recommendation:</span>
                      </div>
                      <p className="whitespace-pre-line">{aiAnswer}</p>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                  <span>Want a full conversation?</span>
                  <Link
                    href="/ai-stylist"
                    onClick={onClose}
                    className="font-bold text-maroon-700 hover:underline flex items-center gap-1"
                  >
                    Open Full AI Stylist Studio &rarr;
                  </Link>
                </div>
              </div>
            )}

            {/* Footer Quick Keys */}
            <div className="px-6 py-2.5 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400">
              <div className="flex items-center gap-3">
                <span>Press <kbd className="px-1.5 py-0.5 bg-white border border-neutral-200 rounded font-mono text-[10px] text-neutral-600">ESC</kbd> to close</span>
                <span>·</span>
                <span>Over 120+ designer pieces</span>
              </div>
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <ShieldCheck size={12} />
                Delhi NCR Doorstep Delivery
              </span>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
