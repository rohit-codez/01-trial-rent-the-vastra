import { Metadata } from 'next';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import BrowseClient from '../BrowseClient';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = categories.find(c => c.slug === categorySlug);
  
  if (!category) {
    return {
      title: 'Category Not Found | RentTheVastra',
    };
  }

  return {
    title: `Rent ${category.name} | RentTheVastra`,
    description: category.description || `Browse our collection of ${category.name} for rent in Delhi NCR.`,
  };
}

export function generateStaticParams() {
  return categories.map((category) => ({
    category: category.slug,
  }));
}

export default async function CategoryBrowsePage({ params }: Props) {
  const { category: categorySlug } = await params;
  const category = categories.find(c => c.slug === categorySlug);
  
  if (!category) {
    notFound();
  }

  const categoryProducts = products.filter(p => 
    p.category.toLowerCase() === category!.name.toLowerCase() ||
    p.subcategory.toLowerCase() === category!.name.toLowerCase() ||
    p.category.toLowerCase().replace(/\s+/g, '-') === category!.slug.toLowerCase() ||
    category!.slug.toLowerCase().includes(p.category.toLowerCase().replace(/\s+/g, '-'))
  );

  return (
    <div className="bg-beige-50 min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Category Hero */}
        <div className="bg-maroon-900 rounded-xl p-8 mb-8 text-center text-white overflow-hidden relative">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-r from-maroon-900 via-transparent to-maroon-900 z-10" />
            <img 
              src={category!.image || '/images/default-hero.jpg'} 
              alt={category!.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-20 max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-gold-400">
              {category!.name}
            </h1>
            <p className="text-beige-100 text-lg">
              {category!.description}
            </p>
          </div>
        </div>
        
        <div className="mb-8">
          <p className="text-neutral-600">Showing {categoryProducts.length} results</p>
        </div>
        
        <BrowseClient initialProducts={categoryProducts} />
      </div>
    </div>
  );
}
