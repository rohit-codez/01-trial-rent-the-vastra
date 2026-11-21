import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/home/ScrollToTop';
import { ToastProvider } from '@/components/ui/Toast';

export const metadata: Metadata = {
  title: {
    default: 'RentTheVastra – Rent Premium Fashion | Designer Outfits & Accessories',
    template: '%s | RentTheVastra',
  },
  description: 'Rent designer lehengas, sherwanis, gowns & accessories in Delhi NCR. AI-powered styling. Free accessories with every rental. Professionally cleaned & quality checked.',
  keywords: ['fashion rental', 'rent lehenga', 'rent sherwani', 'designer clothes rent Delhi', 'RentTheVastra', 'wedding outfit rental', 'hiking gear rental'],
  authors: [{ name: 'RentTheVastra' }],
  creator: 'RentTheVastra',
  openGraph: {
    siteName: 'RentTheVastra',
    title: 'RentTheVastra – Rent Premium Fashion',
    description: 'Rent designer lehengas, sherwanis, gowns & accessories in Delhi NCR. AI styling. 2 free accessories with every rental.',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RentTheVastra – Rent Premium Fashion',
    description: 'Rent designer outfits in Delhi NCR. AI styling. 2 free accessories.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fdfbf7' },
    { media: '(prefers-color-scheme: dark)', color: '#4a0c25' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans bg-beige-50 text-neutral-900 antialiased min-h-screen flex flex-col selection:bg-maroon-700 selection:text-gold-400">
        <ToastProvider>
          <Header />
          <main className="flex-1 pt-20">
            {children}
          </main>
          <Footer />
          <ScrollToTop />
        </ToastProvider>
      </body>
    </html>
  );
}
