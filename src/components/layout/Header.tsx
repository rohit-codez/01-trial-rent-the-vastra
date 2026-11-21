'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, Heart, ShoppingBag, Menu, Sparkles, ChevronDown } from 'lucide-react';
import MobileNav from './MobileNav';
import SpotlightModal from '../common/SpotlightModal';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global Cmd+K / Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSpotlightOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { name: 'Women', href: '/browse?gender=women', sub: ['Lehenga', 'Saree', 'Gown', 'Anarkali', 'Indo-Western'] },
    { name: 'Men', href: '/browse?gender=men', sub: ['Sherwani', 'Kurta Set', 'Bandhgala', 'Tuxedo', 'Indo-Western'] },
    { name: 'Kids & Babies', href: '/browse?gender=kids', sub: ['Baby & Toddler Wear', 'Kids Lehenga', 'Kids Sherwani', 'Kids Kurta Set', 'Kids Gown'] },
    { name: 'Travel & Hiking', href: '/browse?occasion=Hiking+%26+Trekking', sub: ['Trekking Jackets', 'Hiking Pants', 'Hiking Footwear', 'Trekking Gear & Backpacks'] },
    { name: 'Accessories', href: '/browse?category=Jewelry', sub: ['Jewelry', 'Bags & Clutches', "Men's Accessories"] },
  ];

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/85 backdrop-blur-xl border-b border-neutral-200/70 shadow-[0_4px_20px_rgba(0,0,0,0.04)] py-0'
            : 'bg-white/95 backdrop-blur-md border-b border-neutral-100 py-1'
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between h-18 sm:h-20">
            
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center space-x-1.5 group">
              <span className="text-2xl sm:text-[26px] font-bold font-serif tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-amber-600 group-hover:to-gold-400 transition-all">Rent</span>
                <span className="text-maroon-700">The</span>
                <span className="text-maroon-900">Vastra</span>
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-widest text-gold-600 bg-gold-50 px-2 py-0.5 rounded-full border border-gold-200/60 ml-2">
                Luxury Rental
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <div key={link.name} className="relative group">
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 px-3.5 py-2 text-sm font-semibold text-neutral-800 hover:text-maroon-700 rounded-full hover:bg-beige-100/60 transition-all duration-200"
                  >
                    <span>{link.name}</span>
                    <ChevronDown size={13} className="text-neutral-400 group-hover:text-maroon-700 group-hover:rotate-180 transition-transform duration-200" />
                  </Link>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute top-full left-0 w-52 bg-white/95 backdrop-blur-xl shadow-[0_12px_32px_rgba(0,0,0,0.1)] border border-neutral-200/80 rounded-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 p-2 z-50">
                    {link.sub.map((item) => (
                      <Link
                        key={item}
                        href={`/browse?category=${encodeURIComponent(item)}`}
                        className="block px-3.5 py-2 text-xs font-medium text-neutral-700 hover:bg-beige-50 hover:text-maroon-700 rounded-xl transition-colors"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              {/* Shimmering AI Stylist Pill Button */}
              <Link
                href="/ai-stylist"
                className="group relative ml-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-maroon-50 via-gold-50 to-maroon-50 hover:from-gold-400 hover:to-gold-300 border border-gold-300/80 text-maroon-900 hover:text-maroon-950 font-bold text-xs shadow-sm hover:shadow-[0_4px_16px_rgba(212,175,55,0.3)] transition-all duration-300 active:scale-95"
              >
                <Sparkles size={14} className="text-gold-500 group-hover:text-maroon-950 animate-pulse" />
                <span>AI Stylist</span>
              </Link>
            </nav>

            {/* Right Action Icons & Spotlight Trigger */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              
              {/* Spotlight Command Bar Trigger */}
              <button
                onClick={() => setIsSpotlightOpen(true)}
                aria-label="Open Search (Cmd+K)"
                className="flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-neutral-100/90 hover:bg-neutral-200/70 border border-neutral-200 text-xs font-medium text-neutral-500 hover:text-neutral-900 transition-all shadow-sm"
              >
                <Search size={14} className="text-neutral-500" />
                <span className="hidden md:inline">Search outfits...</span>
                <kbd className="hidden sm:inline-flex items-center text-[10px] bg-white px-1.5 py-0.5 rounded border border-neutral-200/80 text-neutral-400 font-mono shadow-xs">
                  ⌘K
                </kbd>
              </button>
              
              <Link
                href="/login"
                aria-label="Account"
                className="hidden md:flex p-2.5 rounded-full text-neutral-600 hover:text-maroon-700 hover:bg-beige-100/60 transition-colors"
              >
                <User size={19} />
              </Link>

              <Link
                href="/wishlist"
                aria-label="Wishlist"
                className="p-2.5 rounded-full text-neutral-600 hover:text-maroon-700 hover:bg-beige-100/60 transition-colors"
              >
                <Heart size={19} />
              </Link>

              <Link
                href="/cart"
                aria-label="Cart"
                className="relative p-2.5 rounded-full text-neutral-600 hover:text-maroon-700 hover:bg-beige-100/60 transition-colors"
              >
                <ShoppingBag size={19} />
                <span className="absolute top-1 right-1 inline-flex items-center justify-center w-4 h-4 text-[10px] font-extrabold text-white bg-maroon-700 rounded-full shadow-sm">
                  0
                </span>
              </Link>
              
              <button
                className="lg:hidden p-2 text-neutral-800 hover:text-maroon-700"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open navigation menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} navLinks={navLinks} />
        )}
      </AnimatePresence>

      {/* Global Cmd+K Spotlight Modal */}
      <SpotlightModal
        isOpen={isSpotlightOpen}
        onClose={() => setIsSpotlightOpen(false)}
      />
    </>
  );
}
