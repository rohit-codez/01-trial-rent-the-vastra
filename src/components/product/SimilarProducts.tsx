import { products } from '@/data/products';
import ProductCard from './ProductCard';

interface SimilarProductsProps {
  currentProductId: string;
  category: string;
}

export default function SimilarProducts({ currentProductId, category }: SimilarProductsProps) {
  // Find products in same category, exclude current
  const similarProducts = products
    .filter(p => p.id !== currentProductId && p.category === category)
    .slice(0, 5); // Take up to 5

  if (similarProducts.length === 0) return null;

  return (
    <div className="mt-16 border-t border-beige-200 pt-16">
      <div className="flex justify-between items-end mb-8">
        <h2 className="text-3xl font-serif text-maroon-700 font-bold">
          You May Also Like
        </h2>
        <a href={`/browse/${category}`} className="text-maroon-700 font-medium hover:underline">
          View All
        </a>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-6 snap-x custom-scrollbar">
        {similarProducts.map((product) => (
          <div key={product.id} className="min-w-[280px] max-w-[300px] flex-shrink-0 snap-start">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
