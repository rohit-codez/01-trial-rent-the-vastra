'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight, CheckCircle2, Mail } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="py-20 bg-maroon-900 relative overflow-hidden">
      {/* Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Icon */}
          <div className="w-14 h-14 rounded-2xl bg-gold-400/15 border border-gold-400/30 flex items-center justify-center mx-auto mb-6">
            <Mail size={24} className="text-gold-400" />
          </div>

          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Get Exclusive{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500">
              Style Offers
            </span>
          </h2>

          <p className="text-beige-200/80 text-lg max-w-xl mx-auto mb-10">
            Subscribe to receive early access to new collections, festival discounts, and AI Stylist tips — delivered to your inbox.
          </p>

          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-5"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-5 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/40 outline-none focus:border-gold-400/60 focus:ring-2 focus:ring-gold-400/20 text-sm"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-7 py-4 bg-gold-400 hover:bg-gold-300 text-maroon-950 font-bold rounded-full transition-all duration-300 text-sm whitespace-nowrap active:scale-95"
              >
                Subscribe
                <ArrowRight size={16} />
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-3 text-emerald-400 font-semibold text-lg mb-5"
            >
              <CheckCircle2 size={24} />
              You're subscribed! Welcome to RentTheVastra ✨
            </motion.div>
          )}

          <p className="text-white/30 text-xs">
            🔒 We never share your data. Unsubscribe anytime.
          </p>

          {/* Offers row */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-10 pt-8 border-t border-white/10 text-sm text-beige-300/70">
            <span>🎁 ₹500 off your first rental</span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span>🛍️ Festival collection drops</span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span>💎 VIP early access</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
