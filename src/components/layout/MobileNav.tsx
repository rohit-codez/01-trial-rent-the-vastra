'use client'

import { motion } from 'framer-motion';
import Link from 'next/link';
import { X, Sparkles, User, ChevronRight } from 'lucide-react';

interface NavLink {
  name: string;
  href: string;
  sub: string[];
}

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
}

export default function MobileNav({ isOpen, onClose, navLinks }: MobileNavProps) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-[60]"
        onClick={onClose}
      />
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white z-[70] shadow-2xl flex flex-col overflow-y-auto"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <Link href="/" onClick={onClose} className="flex-shrink-0 flex items-center space-x-1">
            <span className="text-xl font-bold font-serif">
              <span className="text-gold-400">Rent</span>
              <span className="text-maroon-700">The</span>
              <span className="text-maroon-700">Vastra</span>
            </span>
          </Link>
          <button onClick={onClose} className="p-2 text-gray-500 hover:text-maroon-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 bg-maroon-50 mb-4">
          <Link href="/ai-stylist" onClick={onClose} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-maroon-100 group">
            <div className="flex items-center text-maroon-700 font-medium">
              <Sparkles className="w-5 h-5 mr-2 text-gold-400" />
              Try AI Stylist
            </div>
            <ChevronRight className="w-5 h-5 text-maroon-300 group-hover:text-maroon-700" />
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-6">
          {navLinks.map((link) => (
            <div key={link.name}>
              <Link href={link.href} onClick={onClose} className="block text-lg font-bold text-gray-900 mb-2 font-serif">
                {link.name}
              </Link>
              <div className="grid grid-cols-2 gap-2">
                {link.sub.map((item) => (
                  <Link key={item} href={`/browse?category=${encodeURIComponent(item)}`} onClick={onClose} className="text-sm text-gray-600 hover:text-maroon-700 py-1">
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100 mt-auto">
          <Link href="/login" onClick={onClose} className="flex items-center text-gray-700 font-medium py-2">
            <User className="w-5 h-5 mr-3" />
            Login / Create Account
          </Link>
        </div>
      </motion.div>
    </>
  );
}
