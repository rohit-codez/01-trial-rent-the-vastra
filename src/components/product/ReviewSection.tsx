import { ProductReview } from '@/types';
import { Star, ThumbsUp, CheckCircle } from 'lucide-react';

interface ReviewSectionProps {
  productId: string;
  rating: number;
  reviewCount: number;
}

// Dummy data generator for reviews
const getDummyReviews = (count: number): ProductReview[] => {
  return Array.from({ length: Math.min(count, 5) }).map((_, i) => ({
    id: `rev-${i}`,
    userId: `user-${i}`,
    userName: ['Priya S.', 'Anjali M.', 'Rahul K.', 'Neha G.', 'Vikram B.'][i],
    rating: i === 4 ? 4 : 5,
    comment: [
      'Absolutely loved the outfit! It fit perfectly and looked stunning. The condition was pristine.',
      'Great quality and on-time delivery. Will definitely rent again for the next wedding season.',
      'The colors are exactly as shown in the picture. Got so many compliments!',
      'Smooth rental process. The security deposit was refunded promptly.',
      'Beautiful embroidery and high-quality fabric. A bit heavy to wear, but worth it.'
    ][i],
    date: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0],
  }));
};

export default function ReviewSection({ productId, rating, reviewCount }: ReviewSectionProps) {
  const reviews = getDummyReviews(reviewCount);

  if (reviewCount === 0) {
    return (
      <div className="py-8 text-center text-neutral-500">
        No reviews yet. Be the first to rent and review this item!
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Rating Summary */}
        <div className="bg-beige-50 p-6 rounded-xl flex-shrink-0 w-full md:w-64 text-center">
          <div className="text-5xl font-serif text-maroon-700 font-bold mb-2">
            {rating.toFixed(1)}
          </div>
          <div className="flex justify-center gap-1 mb-2 text-gold-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-5 h-5 ${i < Math.floor(rating) ? 'fill-current' : 'text-beige-300'}`} />
            ))}
          </div>
          <p className="text-neutral-600 text-sm">
            Based on {reviewCount} reviews
          </p>
          
          <div className="mt-6 space-y-2">
            {/* Simple distribution bars */}
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-2 text-sm">
                <span className="w-4 text-neutral-500">{star}</span>
                <Star className="w-3 h-3 text-gold-400 fill-current" />
                <div className="flex-1 h-2 bg-beige-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-maroon-700 rounded-full" 
                    style={{ width: `${star === 5 ? 80 : star === 4 ? 15 : star === 3 ? 5 : 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Review List */}
        <div className="flex-1 space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-beige-200 pb-6 last:border-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium text-neutral-900 flex items-center gap-2">
                    {review.userName}
                    <span className="text-xs text-green-600 flex items-center bg-green-50 px-2 py-0.5 rounded-full">
                      <CheckCircle className="w-3 h-3 mr-1" /> Verified Renter
                    </span>
                  </h4>
                  <div className="flex gap-1 mt-1 text-gold-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-beige-300'}`} />
                    ))}
                  </div>
                </div>
                <span className="text-sm text-neutral-500">
                  {new Date(review.date).toLocaleDateString('en-IN', {
                    year: 'numeric', month: 'short', day: 'numeric'
                  })}
                </span>
              </div>
              
              <p className="text-neutral-700 mt-3 leading-relaxed">
                {review.comment}
              </p>
              
              <button className="flex items-center gap-1 text-xs text-neutral-500 hover:text-maroon-700 mt-4 transition-colors">
                <ThumbsUp className="w-3 h-3" /> Helpful
              </button>
            </div>
          ))}
          
          {reviewCount > 5 && (
            <button className="w-full py-3 border border-maroon-700 text-maroon-700 font-medium rounded hover:bg-maroon-50 transition-colors">
              Read All {reviewCount} Reviews
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
