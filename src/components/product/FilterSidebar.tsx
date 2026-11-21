'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, X, Filter } from 'lucide-react';
import { categories } from '@/data/categories';
import { occasions } from '@/data/occasions';

interface FilterSidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export default function FilterSidebar({ isMobileOpen, onCloseMobile }: FilterSidebarProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    gender: true,
    category: true,
    occasion: true,
    price: true,
    color: true,
    size: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const colors = [
    { name: 'Red', hex: '#FF0000' },
    { name: 'Maroon', hex: '#800000' },
    { name: 'Blue', hex: '#0000FF' },
    { name: 'Green', hex: '#008000' },
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Gold', hex: '#FFD700' },
    { name: 'Pink', hex: '#FFC0CB' },
    { name: 'Olive', hex: '#808000' },
    { name: 'Orange', hex: '#FFA500' },
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size'];

  const SidebarContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-beige-200">
        <h2 className="text-xl font-serif text-maroon-700 font-bold flex items-center">
          <Filter className="w-5 h-5 mr-2" /> Filters
        </h2>
        <button className="text-sm text-neutral-500 hover:text-maroon-700 underline">
          Clear All
        </button>
      </div>

      {/* Gender */}
      <div className="border-b border-beige-200 pb-4">
        <button 
          className="flex items-center justify-between w-full text-left font-medium text-neutral-900 mb-2"
          onClick={() => toggleSection('gender')}
        >
          Department / Gender
          {openSections.gender ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        <AnimatePresence>
          {openSections.gender && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden space-y-2 mt-2"
            >
              {['Women', 'Men', 'Kids', 'Unisex / Travel & Gear'].map((gender) => (
                <label key={gender} className="flex items-center space-x-2 cursor-pointer group">
                  <input type="checkbox" className="rounded border-beige-300 text-maroon-700 focus:ring-maroon-700" />
                  <span className="text-neutral-700 group-hover:text-maroon-700 transition-colors">{gender}</span>
                </label>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Category */}
      <div className="border-b border-beige-200 pb-4">
        <button 
          className="flex items-center justify-between w-full text-left font-medium text-neutral-900 mb-2"
          onClick={() => toggleSection('category')}
        >
          Category
          {openSections.category ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        <AnimatePresence>
          {openSections.category && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden space-y-2 mt-2 max-h-48 overflow-y-auto custom-scrollbar"
            >
              {categories.map((category) => (
                <label key={category.id} className="flex items-center space-x-2 cursor-pointer group">
                  <input type="checkbox" className="rounded border-beige-300 text-maroon-700 focus:ring-maroon-700" />
                  <span className="text-neutral-700 group-hover:text-maroon-700 transition-colors">{category.name}</span>
                </label>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Occasion */}
      <div className="border-b border-beige-200 pb-4">
        <button 
          className="flex items-center justify-between w-full text-left font-medium text-neutral-900 mb-2"
          onClick={() => toggleSection('occasion')}
        >
          Occasion & Activity
          {openSections.occasion ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        <AnimatePresence>
          {openSections.occasion && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden space-y-2 mt-2 max-h-48 overflow-y-auto custom-scrollbar"
            >
              {occasions.map((occ) => (
                <label key={occ.id} className="flex items-center space-x-2 cursor-pointer group">
                  <input type="checkbox" className="rounded border-beige-300 text-maroon-700 focus:ring-maroon-700" />
                  <span className="text-neutral-700 group-hover:text-maroon-700 transition-colors">{occ.name}</span>
                </label>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Price Range */}
      <div className="border-b border-beige-200 pb-4">
        <button 
          className="flex items-center justify-between w-full text-left font-medium text-neutral-900 mb-2"
          onClick={() => toggleSection('price')}
        >
          Price Range (3-Day Rental)
          {openSections.price ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        <AnimatePresence>
          {openSections.price && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mt-4"
            >
              <input 
                type="range" 
                min="199" 
                max="15000" 
                className="w-full accent-maroon-700"
              />
              <div className="flex justify-between text-sm text-neutral-500 mt-2">
                <span>₹199</span>
                <span>₹15,000+</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Color */}
      <div className="border-b border-beige-200 pb-4">
        <button 
          className="flex items-center justify-between w-full text-left font-medium text-neutral-900 mb-2"
          onClick={() => toggleSection('color')}
        >
          Color
          {openSections.color ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        <AnimatePresence>
          {openSections.color && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mt-2 grid grid-cols-5 gap-3"
            >
              {colors.map((color) => (
                <button 
                  key={color.name}
                  className="w-8 h-8 rounded-full border border-beige-300 hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-maroon-700"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                  aria-label={`Filter by ${color.name}`}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Size */}
      <div className="pb-4">
        <button 
          className="flex items-center justify-between w-full text-left font-medium text-neutral-900 mb-2"
          onClick={() => toggleSection('size')}
        >
          Size
          {openSections.size ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        <AnimatePresence>
          {openSections.size && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mt-2 flex flex-wrap gap-2"
            >
              {sizes.map((size) => (
                <button 
                  key={size}
                  className="px-3 py-1.5 border border-beige-300 rounded text-sm text-neutral-700 hover:border-maroon-700 hover:text-maroon-700 transition-colors focus:outline-none focus:ring-2 focus:ring-maroon-700"
                >
                  {size}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button className="w-full py-3 bg-maroon-700 text-white font-medium rounded hover:bg-maroon-600 transition-colors">
        Apply Filters
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 flex-shrink-0 sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto pr-6 custom-scrollbar">
        <SidebarContent />
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseMobile}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-beige-50 z-50 p-6 overflow-y-auto shadow-xl lg:hidden"
            >
              <button 
                onClick={onCloseMobile}
                className="absolute top-6 right-6 text-neutral-500 hover:text-maroon-700"
              >
                <X className="w-6 h-6" />
              </button>
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
