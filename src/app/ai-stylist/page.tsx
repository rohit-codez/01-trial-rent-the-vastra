import { Metadata } from 'next';
import ChatGPTStylist from '@/components/ai-stylist/ChatGPTStylist';

export const metadata: Metadata = {
  title: 'AI Fashion Stylist – Conversational Outfit & Accessory Rental Recommendations | RentTheVastra',
  description: 'Describe your event, trip, wedding, festival or occasion and get instant outfit recommendations from RentTheVastra AI Stylist.',
};

export default function AIStylistPage() {
  return (
    <div className="min-h-[calc(100vh-5rem)] bg-beige-50/70 py-6 md:py-8 px-3 sm:px-4">
      <div className="max-w-5xl mx-auto">
        <ChatGPTStylist />
      </div>
    </div>
  );
}
