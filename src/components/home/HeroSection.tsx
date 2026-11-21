'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, ChevronDown, Check, Star, ShieldCheck, Heart } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';

/* ─── Real, Verified High-Resolution Fashion Slides ─── */
const SLIDES = [
  {
    id: 'bridal',
    tab: '👰 Royal Bridal',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=2000&q=85&auto=format&fit=crop',
    tag: '✨ Sabyasachi & Manish Malhotra Inspired',
    heading: 'Look Like a\nBridal Dream.',
    highlight: 'Bridal Dream.',
    sub: 'Royal Lehengas · Handcrafted Zardozi · 2 Complimentary Designer Accessories Included',
    cta: { label: 'Explore Bridal Collection', href: '/browse?gender=women' },
    previewCard: {
      title: 'Royal Crimson Bridal Lehenga',
      designer: 'Sabyasachi-Inspired Heritage',
      rental: '₹4,999',
      duration: '3 Days Rental',
      retail: '₹65,000 Retail',
      savings: 'Save ₹60,001 (92%)',
      rating: '4.9',
      reviews: '142 brides',
      badge: 'Bestseller Bridal',
      matchScore: '99% AI Match',
    },
    overlay: 'bg-gradient-to-r from-black/85 via-black/45 to-transparent',
  },
  {
    id: 'groom',
    tab: '🎩 Royal Groom',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=2000&q=85&auto=format&fit=crop',
    tag: '🎩 Wedding Season 2026 Collection',
    heading: 'Groom Like\nRoyalty.',
    highlight: 'Royalty.',
    sub: 'Nawab Sherwanis · Royal Bandhgalas · Indo-Western Sets with Safa & Brooches',
    cta: { label: "Explore Men's Collection", href: '/browse?gender=men' },
    previewCard: {
      title: 'Royal Ivory Zari Sherwani',
      designer: 'Tarun Tahiliani Inspired',
      rental: '₹3,499',
      duration: '3 Days Rental',
      retail: '₹42,000 Retail',
      savings: 'Save ₹38,501 (91%)',
      rating: '4.9',
      reviews: '98 grooms',
      badge: 'Groom Favorite',
      matchScore: '98% AI Match',
    },
    overlay: 'bg-gradient-to-r from-black/85 via-black/45 to-transparent',
  },
  {
    id: 'hiking',
    tab: '🏔️ Trek & Adventure',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=2000&q=85&auto=format&fit=crop',
    tag: '🏔️ Himalayan Hiking & Travel Gear',
    heading: 'Conquer Mountain\nTrails & Peaks.',
    highlight: 'Trails & Peaks.',
    sub: 'Waterproof Gore-Tex Shells · Down Puffers · High-Ankle Boots · 65L Expedition Packs',
    cta: { label: 'Explore Hiking Gear', href: '/browse?occasion=Hiking+%26+Trekking' },
    previewCard: {
      title: '4-Piece Himalayan Expedition Kit',
      designer: 'North Face & Columbia Gear',
      rental: '₹1,899',
      duration: '3 Days Rental',
      retail: '₹28,500 Retail',
      savings: 'Save ₹26,601 (93%)',
      rating: '4.9',
      reviews: '520+ trekkers',
      badge: 'Expedition Ready',
      matchScore: '100% Trail Match',
    },
    overlay: 'bg-gradient-to-r from-black/85 via-black/45 to-transparent',
  },
  {
    id: 'festive',
    tab: '🎉 Sangeet & Festive',
    image: 'https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?w=2000&q=85&auto=format&fit=crop',
    tag: '🎉 Sangeet · Navratri · Diwali Celebrations',
    heading: 'Festival Fashion,\nRented Smart.',
    highlight: 'Rented Smart.',
    sub: 'Designer Anarkalis · Mirror-Work Sharara Sets · Gowns · Free Hand-Matched Jewelry',
    cta: { label: 'Explore Festival Wear', href: '/browse?occasion=Festival' },
    previewCard: {
      title: 'Mirror-Work Festive Sharara Set',
      designer: 'Abhinav Mishra Inspired',
      rental: '₹2,199',
      duration: '3 Days Rental',
      retail: '₹24,000 Retail',
      savings: 'Save ₹21,801 (90%)',
      rating: '4.8',
      reviews: '184 reviews',
      badge: 'Trending Now',
      matchScore: '97% Occasion Match',
    },
    overlay: 'bg-gradient-to-r from-black/85 via-black/45 to-transparent',
  },
];

const QUICK_OCCASIONS = [
  { label: 'Bridal & Wedding', icon: '💍', href: '/browse?occasion=Wedding' },
  { label: 'Sangeet & Mehendi', icon: '💃', href: '/browse?occasion=Sangeet' },
  { label: 'Reception & Gowns', icon: '✨', href: '/browse?occasion=Reception' },
  { label: 'Kids & Babies', icon: '🧸', href: '/browse?gender=kids' },
  { label: 'Hiking & Trekking', icon: '🏔️', href: '/browse?occasion=Hiking+%26+Trekking' },
  { label: 'Goa & Vacation', icon: '🏖️', href: '/browse?occasion=Goa+Trip' },
];

const STATS = [
  { value: '15,000+', label: 'Happy Customers', sub: 'In Delhi NCR & India' },
  { value: '500+', label: 'Luxury Outfits & Gear', sub: 'Curated Designer Pieces' },
  { value: '2 Free', label: 'Accessories Every Time', sub: 'Hand-Matched Per Look' },
  { value: '4.9★', label: 'Customer Rating', sub: 'Over 2,400+ Reviews' },
];

const FADE_DURATION = 0.7;
const SLIDE_INTERVAL = 6000;

/* ─── Atomic Slide Layer (Lovable-style Visual Hierarchy) ─── */
function SlideLayer({ slide, index }: { slide: typeof SLIDES[number]; index: number }) {
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: FADE_DURATION, ease: 'easeInOut' }}
      className="absolute inset-0 z-0 overflow-hidden"
    >
      {/* 1. Direct High-Resolution Photography */}
      <img
        src={slide.image}
        alt={slide.heading.replace('\n', ' ')}
        className="absolute inset-0 w-full h-full object-cover object-center"
        loading="eager"
      />

      {/* 2. Ambient Lighting Glow & Soft Directional Shadow */}
      <div className={`absolute inset-0 ${slide.overlay}`} />
      
      {/* Radial ambient glow (Lovable aesthetic) */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-gold-400/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-maroon-600/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Bottom vignette for readable stats bar */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

      {/* 3. Foreground Content */}
      <div className="relative z-10 h-full flex flex-col justify-between pt-24 sm:pt-28 pb-8 sm:pb-10 px-5 sm:px-8 md:px-12 lg:px-20 max-w-[1440px] mx-auto w-full">
        
        {/* Middle Main Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
          
          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-7 xl:col-span-8">
            
            {/* Announcement Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/20 text-white text-xs sm:text-sm px-4 py-2 rounded-full w-fit mb-5 shadow-[0_4px_24px_rgba(0,0,0,0.3)] transition-all"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-400"></span>
              </span>
              <span className="font-medium tracking-wide text-beige-100">{slide.tag}</span>
            </motion.div>

            {/* Headline with editorial styling */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.08] mb-5 tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] whitespace-pre-line"
            >
              {slide.heading}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-beige-100/90 text-base sm:text-lg md:text-xl font-light tracking-wide mb-8 max-w-2xl leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
            >
              {slide.sub}
            </motion.p>

            {/* Dual CTAs (Lovable-style Luxury Shimmer) */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex flex-wrap items-center gap-4 mb-6"
            >
              <Link
                href={slide.cta.href}
                className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-gold-400 via-gold-300 to-gold-400 px-8 py-4 font-sans text-base font-bold text-maroon-950 shadow-[0_10px_30px_rgba(212,175,55,0.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_14px_40px_rgba(212,175,55,0.45)] active:scale-95"
              >
                {/* Shimmer light sweep */}
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                <span className="relative">{slide.cta.label}</span>
                <ArrowRight size={18} className="relative group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>

              <Link
                href="/ai-stylist"
                className="inline-flex items-center gap-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/25 hover:border-gold-400/80 px-7 py-4 font-sans text-base font-semibold text-white transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 group"
              >
                <Sparkles size={18} className="text-gold-300 animate-pulse group-hover:rotate-12 transition-transform" />
                <span>AI Stylist Advisor</span>
              </Link>
            </motion.div>

            {/* Trust Pill */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-2 text-xs sm:text-sm text-beige-200/90"
            >
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400">
                <Check size={12} />
              </span>
              <span>
                <strong>Doorstep Delivery in Delhi NCR</strong> · Fresh Dry-Cleaned · 2 Free Accessories Auto-Bundled
              </span>
            </motion.div>
          </div>

          {/* Right Column: Floating Luxury Outfit Card (Desktop) */}
          <div className="hidden lg:flex lg:col-span-5 xl:col-span-4 justify-end">
            <motion.div
              initial={{ opacity: 0, x: 28, scale: 0.94 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full max-w-sm rounded-3xl bg-black/45 backdrop-blur-2xl border border-white/20 p-6 text-white shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden"
            >
              {/* Card top rim highlight */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent" />

              {/* Match Badge & Rating */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 bg-gold-400 text-maroon-950 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  <Sparkles size={12} />
                  {slide.previewCard.badge}
                </span>

                <div className="inline-flex items-center gap-1 text-xs font-semibold text-gold-300 bg-white/10 px-2.5 py-1 rounded-full border border-white/10">
                  <Star size={12} className="fill-gold-400 text-gold-400" />
                  <span>{slide.previewCard.rating}</span>
                  <span className="text-white/50 text-[10px]">({slide.previewCard.reviews})</span>
                </div>
              </div>

              {/* Product Title & Designer */}
              <h2 className="font-serif text-xl font-bold text-white mb-1 leading-snug">
                {slide.previewCard.title}
              </h2>
              <p className="text-xs text-gold-300/90 font-medium mb-4">
                {slide.previewCard.designer}
              </p>

              {/* Price comparison box */}
              <div className="rounded-2xl bg-white/5 border border-white/10 p-3.5 mb-4">
                <div className="flex items-baseline justify-between mb-1">
                  <div>
                    <span className="text-2xl font-bold text-gold-400">{slide.previewCard.rental}</span>
                    <span className="text-xs text-white/60 ml-1.5">/ {slide.previewCard.duration}</span>
                  </div>
                  <span className="text-xs line-through text-white/40">{slide.previewCard.retail}</span>
                </div>
                <div className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {slide.previewCard.savings}
                </div>
              </div>

              {/* Benefits list */}
              <ul className="text-xs text-beige-100/90 space-y-2 mb-5">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>2 Free Luxury Accessories</strong> (Jewelry / Safa)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Hospital-grade organic sanitization</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Complimentary custom fit alterations</span>
                </li>
              </ul>

              {/* Action Button */}
              <Link
                href={slide.cta.href}
                className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-white/15 hover:bg-gold-400 hover:text-maroon-950 border border-white/20 hover:border-gold-400 py-3 text-xs font-bold text-white transition-all duration-300 shadow-md active:scale-95"
              >
                <span>Reserve Outfit for Rental</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section: Interactive Occasions Chips + Stats Bar */}
        <div className="pt-4">
          
          {/* Quick Occasion Pills */}
          <div className="mb-6">
            <p className="text-white/60 text-[11px] font-semibold uppercase tracking-widest mb-2.5">
              Curated Designer Wardrobe &amp; Gear
            </p>
            <div className="flex flex-wrap gap-2">
              {QUICK_OCCASIONS.map((occ, i) => (
                <Link
                  key={i}
                  href={occ.href}
                  className="inline-flex items-center gap-1.5 bg-black/40 hover:bg-white/20 backdrop-blur-xl border border-white/15 hover:border-gold-400/80 text-white text-xs sm:text-sm font-medium px-4 py-2 rounded-full transition-all duration-200 active:scale-95 shadow-md"
                >
                  <span>{occ.icon}</span>
                  <span>{occ.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Stats Bar (Glassmorphism Bento row) */}
          <div className="border-t border-white/15 pt-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {STATS.map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-amber-200">
                    {stat.value}
                  </div>
                  <div className="text-white text-xs sm:text-sm font-semibold mt-0.5">{stat.label}</div>
                  <div className="text-white/50 text-[11px] hidden sm:block">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

/* ─── Main Hero Section with Interactive Slide Switcher ─── */
export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % SLIDES.length);
    }, SLIDE_INTERVAL);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const goToSlide = (index: number) => {
    setCurrent(index);
    resetTimer();
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col overflow-hidden bg-black select-none">
      
      {/* ── Preload Images for Zero-Delay Crossfades ── */}
      <div className="hidden" aria-hidden="true">
        {SLIDES.map((s, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={i} src={s.image} alt="" />
        ))}
      </div>

      {/* ── Single Synchronized Cross-fade Layer ── */}
      <AnimatePresence mode="sync">
        <SlideLayer key={current} slide={SLIDES[current]} index={current} />
      </AnimatePresence>

      {/* ── Lovable-style Floating Category Tabs on Top/Center ── */}
      <div className="absolute top-20 sm:top-24 left-1/2 -translate-x-1/2 z-20 hidden md:flex items-center gap-1.5 p-1.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/15 shadow-2xl">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goToSlide(i)}
            className={`relative px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
              i === current ? 'text-maroon-950 shadow-md' : 'text-white/75 hover:text-white hover:bg-white/10'
            }`}
          >
            {i === current && (
              <motion.div
                layoutId="activeSlideTab"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                className="absolute inset-0 bg-gold-400 rounded-full"
              />
            )}
            <span className="relative z-10">{s.tab}</span>
          </button>
        ))}
      </div>

      {/* ── Bottom Right Slide Indicators with Live Progress ── */}
      <div className="absolute bottom-6 sm:bottom-8 right-6 sm:right-12 z-20 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`relative overflow-hidden transition-all duration-500 rounded-full ${
              i === current ? 'w-10 h-2 bg-white/30' : 'w-2.5 h-2 bg-white/40 hover:bg-white/70'
            }`}
          >
            {i === current && (
              <motion.div
                key={`progress-${current}`}
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: SLIDE_INTERVAL / 1000, ease: 'linear' }}
                className="h-full bg-gold-400"
              />
            )}
          </button>
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden sm:flex flex-col items-center gap-1 text-white/50 pointer-events-none"
      >
        <span className="text-[10px] uppercase tracking-widest text-gold-300/80">Scroll to Explore</span>
        <ChevronDown size={14} className="text-gold-400/80" />
      </motion.div>
    </section>
  );
}
