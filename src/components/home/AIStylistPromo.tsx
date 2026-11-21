'use client';

import { motion } from 'framer-motion';
import { Sparkles, MessageCircle, Shirt, ArrowRight, Check, Bot, Zap, Star } from 'lucide-react';
import Link from 'next/link';

const features = [
  { icon: MessageCircle, title: 'Natural Language', text: 'Describe your event, city, and budget in your own words' },
  { icon: Sparkles, title: 'AI Curated Outfits', text: 'Trained on Indian fashion trends, weather, and color harmony' },
  { icon: Shirt, title: '2 Free Accessories', text: 'Jewelry, brooches, or safa auto-bundled with ₹0 added cost' },
  { icon: Check, title: 'Custom Altered Fit', text: 'Dry-cleaned and altered to your exact size before delivery' },
];

const SAMPLE_PROMPTS = [
  "I'm attending my brother's wedding in Delhi with ₹3000 budget",
  "Going to Goa for 4 days — need beach party looks",
  "Sangeet night lehenga with matching Kundan jewelry",
  "Kedarkantha winter snow trek clothing bundle",
];

export default function AIStylistPromo() {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-neutral-950 via-maroon-950 to-neutral-950 text-white">
      
      {/* Lovable-style Ambient Glow Blobs */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gold-400/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-maroon-600/20 rounded-full blur-[140px] pointer-events-none" />
      
      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column — Text & Value Prop */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-gold-400 text-xs sm:text-sm font-semibold mb-6 shadow-lg">
              <Sparkles size={15} className="animate-pulse" />
              <span>AI Fashion &amp; Trekking Stylist 2.0</span>
            </div>

            {/* Heading */}
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.12] tracking-tight">
              Personal Styling, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-amber-200">
                Powered by AI Intelligence.
              </span>
            </h2>

            <p className="text-beige-200/90 text-base sm:text-lg leading-relaxed mb-8 max-w-xl font-light">
              Don&apos;t know what to wear? Tell our AI about your event, city weather, or budget. It curates complete designer looks with color psychology, grooming guides, and <strong>2 free matching accessories</strong>.
            </p>

            {/* Feature Bento Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {features.map((f, i) => (
                <div key={i} className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="w-8 h-8 rounded-xl bg-gold-400/20 border border-gold-400/30 flex items-center justify-center shrink-0 mt-0.5">
                    <f.icon size={15} className="text-gold-400" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{f.title}</h4>
                    <p className="text-[11px] text-beige-200/70 leading-snug mt-0.5">{f.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/ai-stylist"
                className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-gold-400 via-gold-300 to-gold-400 px-8 py-4 font-sans text-base font-bold text-maroon-950 shadow-[0_10px_30px_rgba(212,175,55,0.35)] transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <Sparkles size={18} />
                <span>Try AI Stylist — 100% Free</span>
                <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Right Column — Lovable-Style Interactive Chat Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-6 w-full max-w-lg mx-auto"
          >
            <div className="relative rounded-3xl bg-neutral-900/80 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
              
              {/* Window Rim Highlight */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent" />

              {/* Chat Header */}
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/[0.03]">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-gold-400 to-amber-600 flex items-center justify-center shadow-lg">
                      <Sparkles size={20} className="text-maroon-950" />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-neutral-900" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">RentTheVastra AI Stylist</div>
                    <div className="text-[11px] text-emerald-400 font-medium">Online · Ready to curate your look</div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] font-bold text-gold-300">
                  <Zap size={11} className="text-gold-400" />
                  <span>Instant</span>
                </div>
              </div>

              {/* Chat Conversation Body */}
              <div className="p-6 space-y-4">
                
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="rounded-2xl rounded-tr-sm bg-gradient-to-r from-maroon-700 to-maroon-800 border border-maroon-600/40 px-4 py-3 max-w-[85%] text-xs sm:text-sm text-white shadow-md">
                    I need an outfit for my cousin&apos;s evening wedding in Delhi. Budget is ₹3,000! 🌸
                  </div>
                </div>

                {/* AI Response */}
                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-xl bg-gold-400/20 border border-gold-400/30 flex items-center justify-center shrink-0 mt-1">
                    <Bot size={14} className="text-gold-400" />
                  </div>
                  <div className="space-y-3 rounded-2xl rounded-tl-sm bg-white/10 border border-white/10 p-4 max-w-[88%] text-xs sm:text-sm text-white/95 shadow-md">
                    <p className="leading-relaxed">
                      For a Delhi winter wedding, I recommend the <strong className="text-gold-300">Royal Crimson Bridal Lehenga</strong> in raw silk — it retains warmth and photographs magnificently under evening lights!
                    </p>

                    {/* Curated Product Card inside Chat */}
                    <div className="rounded-xl bg-black/40 border border-white/15 p-3 flex items-center gap-3">
                      <div className="w-12 h-14 rounded-lg bg-neutral-800 overflow-hidden shrink-0">
                        <img
                          src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200&q=80&auto=format&fit=crop"
                          alt="Outfit"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] font-bold text-white truncate">Royal Crimson Bridal Lehenga</div>
                        <div className="text-[10px] text-emerald-400 font-semibold">🎁 2 Free Accessories Included</div>
                        <div className="text-xs font-bold text-gold-400 mt-0.5">₹2,499 <span className="text-[10px] text-white/50 font-normal">/ 3 days</span></div>
                      </div>
                    </div>

                    <p className="text-[11px] text-beige-200/80 leading-snug">
                      💡 <em>Stylist Tip: Pair with antique gold Kundan earrings and a textured low bun for maximum elegance.</em>
                    </p>
                  </div>
                </div>
              </div>

              {/* Sample Quick Prompt Chips */}
              <div className="px-6 pb-6 pt-2 border-t border-white/10 bg-white/[0.02]">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50 mb-2">Try asking the AI:</p>
                <div className="flex flex-wrap gap-2">
                  {SAMPLE_PROMPTS.map((p, i) => (
                    <Link
                      key={i}
                      href="/ai-stylist"
                      className="text-[11px] text-gold-300/90 border border-gold-400/20 hover:border-gold-400/70 bg-gold-400/5 hover:bg-gold-400/15 px-3 py-1.5 rounded-full transition-all duration-200 shadow-sm"
                    >
                      {p}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
