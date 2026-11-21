'use client';

import { useState } from 'react';
import { Product } from '@/types';
import { ShoppingBag, Heart, Shield, Truck, RotateCcw, ChevronRight, Share2, Ruler, Info } from 'lucide-react';
import ImageGallery from '@/components/product/ImageGallery';
import SizeGuide from '@/components/product/SizeGuide';
import ReviewSection from '@/components/product/ReviewSection';
import SimilarProducts from '@/components/product/SimilarProducts';

import { getFreeAccessories } from '@/lib/get-free-accessories';

interface ProductClientProps {
  product: Product;
}

export default function ProductClient({ product }: ProductClientProps) {
  const [duration, setDuration] = useState<3 | 5 | 7>(3);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'details' | 'care' | 'reviews'>('description');

  const rentalPrice = 
    duration === 3 ? product.rentalPrice3Day : 
    duration === 5 ? product.rentalPrice5Day : 
    product.rentalPrice7Day;

  const totalDeposit = product.securityDeposit;
  const discountPercentage = Math.round(((product.retailPrice - rentalPrice) / product.retailPrice) * 100);

  const freeAccessories = getFreeAccessories(product);

  return (
    <div className="bg-white min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Breadcrumbs */}
        <nav className="flex text-sm text-neutral-500 mb-8 whitespace-nowrap overflow-x-auto pb-2 custom-scrollbar">
          <ol className="flex items-center space-x-2">
            <li><a href="/" className="hover:text-maroon-700">Home</a></li>
            <li><ChevronRight className="w-4 h-4" /></li>
            <li><a href={`/browse?gender=${product.gender}`} className="capitalize hover:text-maroon-700">{product.gender}</a></li>
            <li><ChevronRight className="w-4 h-4" /></li>
            <li><a href={`/browse/${product.category}`} className="capitalize hover:text-maroon-700">{product.category.replace('-', ' ')}</a></li>
            <li><ChevronRight className="w-4 h-4" /></li>
            <li className="text-neutral-900 font-medium truncate">{product.title}</li>
          </ol>
        </nav>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left: Image Gallery (60%) */}
          <div className="lg:w-[60%]">
            <ImageGallery images={product.images} alt={product.title} />
          </div>

          {/* Right: Product Info (40%) */}
          <div className="lg:w-[40%] flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-sm font-bold text-gold-600 uppercase tracking-wider">{product.designerName}</h2>
              <button className="text-neutral-400 hover:text-maroon-700 transition-colors p-1">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-serif text-maroon-900 font-bold leading-tight mb-4">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center bg-beige-100 px-3 py-1 rounded-full">
                <span className="font-semibold text-neutral-900 mr-1">{product.rating.toFixed(1)}</span>
                <span className="text-gold-500 text-lg leading-none">★</span>
                <span className="text-neutral-500 text-sm ml-2 border-l border-beige-300 pl-2">
                  {product.reviewCount} reviews
                </span>
              </div>
            </div>

            <hr className="border-beige-200 mb-6" />

            {/* Pricing */}
            <div className="mb-6">
              <div className="flex items-end gap-3 mb-2">
                <span className="text-3xl font-serif text-maroon-700 font-bold">
                  ₹{rentalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-neutral-500 text-lg mb-1">/ {duration} days</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-neutral-500 line-through">Retail: ₹{product.retailPrice.toLocaleString('en-IN')}</span>
                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded font-medium">
                  You Save {discountPercentage}%
                </span>
              </div>
            </div>

            {/* Duration Selector */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-neutral-900 mb-3">Rental Duration</h3>
              <div className="flex gap-3">
                {[3, 5, 7].map((d) => (
                  <button
                    key={d}
                    onClick={() => setDuration(d as 3 | 5 | 7)}
                    className={`flex-1 py-3 border rounded-lg text-center transition-colors ${
                      duration === d 
                        ? 'border-maroon-700 bg-maroon-50 text-maroon-700 font-medium shadow-sm' 
                        : 'border-beige-300 text-neutral-600 hover:border-maroon-300'
                    }`}
                  >
                    {d} Days
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mb-8">
              <div className="flex justify-between items-end mb-3">
                <h3 className="text-sm font-medium text-neutral-900">Select Size</h3>
                <button 
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-sm text-maroon-700 font-medium flex items-center gap-1 hover:underline"
                >
                  <Ruler className="w-4 h-4" /> Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 rounded-full border flex items-center justify-center text-sm transition-colors ${
                      selectedSize === size 
                        ? 'border-maroon-700 bg-maroon-700 text-white font-medium shadow-md' 
                        : 'border-beige-300 text-neutral-700 hover:border-maroon-700 hover:text-maroon-700'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Security Deposit Info */}
            <div className="bg-beige-50 p-4 rounded-xl border border-beige-200 mb-8 flex items-start gap-4">
              <Shield className="w-6 h-6 text-gold-500 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-neutral-900 mb-1 flex items-center gap-2">
                  Security Deposit: ₹{totalDeposit.toLocaleString('en-IN')}
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Fully Refundable</span>
                </div>
                <p className="text-sm text-neutral-600">
                  Refunded within 24-48 hours after we receive the item back in good condition.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <button className="flex-1 bg-maroon-700 text-white py-4 rounded-lg font-medium text-lg hover:bg-maroon-800 transition-colors shadow-lg shadow-maroon-700/20 flex items-center justify-center gap-2">
                <ShoppingBag className="w-5 h-5" /> Add to Cart
              </button>
              <button className="w-14 h-14 border border-beige-300 rounded-lg flex items-center justify-center text-neutral-600 hover:text-maroon-700 hover:border-maroon-700 transition-colors flex-shrink-0">
                <Heart className="w-6 h-6" />
              </button>
            </div>

            {/* Features list */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-neutral-600 text-sm">
                <div className="w-8 h-8 rounded-full bg-beige-100 flex items-center justify-center text-maroon-700">
                  <Truck className="w-4 h-4" />
                </div>
                <span>Free delivery and pickup in Delhi NCR</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-600 text-sm">
                <div className="w-8 h-8 rounded-full bg-beige-100 flex items-center justify-center text-maroon-700">
                  <RotateCcw className="w-4 h-4" />
                </div>
                <span>Dry cleaning handled by us</span>
              </div>
            </div>

            {/* Free Accessories */}
            <div className="bg-beige-50 p-5 rounded-xl border border-gold-200 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-lg text-maroon-900 flex items-center gap-2">
                  <span>🎁</span> Complimentary Accessories Included
                </h3>
                <span className="bg-green-100 text-green-800 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide border border-green-200">
                  FREE with your rental
                </span>
              </div>
              <div className="flex gap-4">
                {freeAccessories.map(acc => (
                  <div key={acc.id} className="flex-1 bg-white rounded-lg p-3 border border-beige-200 flex items-center gap-3 shadow-sm">
                    <img src={acc.image} alt={acc.name} className="w-12 h-12 rounded-md object-cover" />
                    <div>
                      <p className="text-sm font-medium text-neutral-900">{acc.name}</p>
                      <p className="text-xs text-neutral-500 capitalize">{acc.type.replace('-', ' ')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Below the fold: Tabs & Content */}
        <div className="mt-20">
          <div className="flex border-b border-beige-200 overflow-x-auto custom-scrollbar">
            {[
              { id: 'description', label: 'Description' },
              { id: 'details', label: 'Product Details' },
              { id: 'care', label: 'Care Instructions' },
              { id: 'reviews', label: `Reviews (${product.reviewCount})` }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-8 font-medium text-sm md:text-base whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === tab.id 
                    ? 'border-maroon-700 text-maroon-700' 
                    : 'border-transparent text-neutral-500 hover:text-neutral-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="py-8 min-h-[300px]">
            {activeTab === 'description' && (
              <div className="prose max-w-none text-neutral-700 space-y-4">
                <p className="text-lg leading-relaxed">{product.description}</p>
                <p>
                  Make a statement at your next event with this stunning piece. Expertly crafted 
                  to ensure you stand out, it combines traditional elegance with modern design sensibilities.
                </p>
                <div className="flex flex-wrap gap-2 mt-6">
                  {product.occasionTags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-beige-100 text-neutral-700 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'details' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-serif text-xl text-maroon-700 mb-4">Specifications</h3>
                  <table className="w-full text-left text-neutral-700">
                    <tbody>
                      <tr className="border-b border-beige-100"><th className="py-3 font-medium">Fabric</th><td className="py-3">{product.fabric}</td></tr>
                      <tr className="border-b border-beige-100"><th className="py-3 font-medium">Color</th><td className="py-3">{product.color}</td></tr>
                      <tr className="border-b border-beige-100"><th className="py-3 font-medium">Work Type</th><td className="py-3">{product.workType}</td></tr>
                      <tr className="border-b border-beige-100"><th className="py-3 font-medium">Designer</th><td className="py-3">{product.designerName}</td></tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  <h3 className="font-serif text-xl text-maroon-700 mb-4">In The Box</h3>
                  <ul className="list-disc list-inside space-y-2 text-neutral-700">
                    <li>Main Outfit ({product.category})</li>
                    <li>Garment Cover</li>
                    <li>Return Shipping Label</li>
                    <li>RentTheVastra Care Package</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'care' && (
              <div className="space-y-6 text-neutral-700">
                <div className="flex gap-4 p-4 bg-blue-50 text-blue-800 rounded-lg">
                  <Info className="w-6 h-6 flex-shrink-0" />
                  <p><strong>You don't need to wash or dry clean the item!</strong> We handle all professional dry cleaning and sanitization after every rental.</p>
                </div>
                
                <h3 className="font-serif text-xl text-maroon-700 mt-6 mb-4">While Wearing</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Please be careful with makeup, perfume, and food around the garment.</li>
                  <li>Avoid pinning or altering the garment in any way.</li>
                  <li>Keep away from sharp objects that might snag the fabric or embroidery.</li>
                </ul>
              </div>
            )}

            {activeTab === 'reviews' && (
              <ReviewSection 
                productId={product.id} 
                rating={product.rating} 
                reviewCount={product.reviewCount} 
              />
            )}
          </div>
        </div>

        {/* Similar Products */}
        <SimilarProducts currentProductId={product.id} category={product.category} />

      </div>
      
      <SizeGuide 
        isOpen={isSizeGuideOpen} 
        onClose={() => setIsSizeGuideOpen(false)} 
        category={product.category}
      />
    </div>
  );
}
