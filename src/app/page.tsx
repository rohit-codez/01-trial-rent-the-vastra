import { Suspense } from 'react';
import HeroSection from '@/components/home/HeroSection';
import TrustBar from '@/components/home/TrustBar';
import HowItWorks from '@/components/home/HowItWorks';
import FeaturedCategories from '@/components/home/FeaturedCategories';
import TrendingSection from '@/components/home/TrendingSection';
import AIStylistPromo from '@/components/home/AIStylistPromo';
import OccasionShop from '@/components/home/OccasionShop';
import Testimonials from '@/components/home/Testimonials';
import AccessoriesPromo from '@/components/home/AccessoriesPromo';
import FAQSection from '@/components/home/FAQSection';
import Newsletter from '@/components/home/Newsletter';
import WhatsAppFAB from '@/components/home/WhatsAppFAB';

export const metadata = {
  title: 'RentTheVastra | Premium Fashion Rental & AI Stylist in Delhi NCR',
  description: 'Rent designer outfits, wedding wear, and festival wear with AI-powered styling. Professionally cleaned, premium quality fashion rental in Delhi NCR.',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-beige-50">
      {/* 1. Hero Page */}
      <HeroSection />

      {/* 2. Clothes Every Grand Occasion Page */}
      <FeaturedCategories />

      {/* 2B. Show Clothes to the Public (Trending & Live Catalog) */}
      <Suspense>
        <TrendingSection />
      </Suspense>

      {/* Occasion Explorer & AI Stylist */}
      <OccasionShop />
      <AIStylistPromo />

      {/* 3. Facilities of RentTheVastra */}
      <TrustBar />

      {/* Testimonials & Accessories */}
      <Testimonials />
      <AccessoriesPromo />

      {/* 4. Rent in 6 Steps Page (At the end as requested) */}
      <HowItWorks />

      {/* FAQ & Newsletter */}
      <FAQSection />
      <Newsletter />
      <WhatsAppFAB />
    </main>
  );
}
