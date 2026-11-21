import Link from 'next/link';
import { MapPin, Mail, Phone, Globe, ExternalLink, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#4a0b25] to-[#360818] text-beige-50 relative overflow-hidden">
      
      {/* Top decorative line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-gold-400/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Col */}
          <div className="space-y-6">
            <Link href="/" className="inline-block group">
              <span className="text-3xl font-bold font-serif tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500 group-hover:from-gold-200 group-hover:to-gold-400 transition-all">Rent</span>
                <span className="text-white">The</span>
                <span className="text-white">Vastra</span>
              </span>
            </Link>
            <p className="text-beige-200/80 font-serif italic text-lg leading-relaxed">
              Rent Premium Fashion. <br />Look Your Best.
            </p>
            <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm px-4 py-2.5 rounded-2xl border border-gold-400/20">
              <MapPin className="w-4 h-4 text-gold-400" />
              <span className="text-sm text-beige-200">Currently Serving: <strong className="text-white">Delhi NCR</strong></span>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-3 pt-2">
              {[
                { icon: Globe, label: 'Instagram', href: 'https://instagram.com/rentthevastra' },
                { icon: ExternalLink, label: 'YouTube', href: 'https://youtube.com/@rentthevastra' },
              ].map((social) => (
                <a 
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-gold-400 hover:border-gold-400 hover:text-maroon-900 text-beige-200 transition-all duration-300 hover:scale-110 active:scale-95 shadow-sm"
                >
                  <social.icon className="w-[18px] h-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-bold font-serif mb-6 text-gold-400 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3">
              {['How It Works', 'About Us', 'Contact', 'FAQs', 'Blog', 'AI Stylist'].map((link) => (
                <li key={link}>
                  <Link 
                    href={`/${link.toLowerCase().replace(/ /g, '-')}`} 
                    className="text-beige-200/80 hover:text-gold-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gold-400/40 group-hover:bg-gold-400 transition-colors" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-base font-bold font-serif mb-6 text-gold-400 uppercase tracking-wider">Collections</h3>
            <ul className="space-y-3">
              {['Lehenga', 'Saree', 'Sherwani', 'Gown', 'Kids Wear', 'Accessories', 'Hiking Gear'].map((link) => (
                <li key={link}>
                  <Link 
                    href={`/browse?category=${encodeURIComponent(link)}`} 
                    className="text-beige-200/80 hover:text-gold-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gold-400/40 group-hover:bg-gold-400 transition-colors" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-base font-bold font-serif mb-6 text-gold-400 uppercase tracking-wider">Get In Touch</h3>
            <div className="space-y-4 text-beige-200/80">
              <a href="mailto:hello@rentthevastra.com" className="flex items-center gap-3 hover:text-gold-400 transition-colors text-sm group">
                <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-gold-400/20 group-hover:border-gold-400/30 transition-all">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                hello@rentthevastra.com
              </a>
              <a href="tel:+919876543210" className="flex items-center gap-3 hover:text-gold-400 transition-colors text-sm group">
                <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-gold-400/20 group-hover:border-gold-400/30 transition-all">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                +91 98765 43210
              </a>
            </div>

            <div className="mt-8">
              <h4 className="text-sm font-semibold mb-3 text-beige-100">Subscribe for style tips & offers</h4>
              <div className="flex overflow-hidden rounded-xl border border-white/15 focus-within:border-gold-400/60 transition-colors">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="bg-white/5 backdrop-blur-sm px-4 py-2.5 w-full focus:outline-none text-sm text-white placeholder:text-white/30" 
                />
                <button className="bg-gold-400 hover:bg-gold-300 text-maroon-900 px-5 py-2.5 text-sm font-bold whitespace-nowrap transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <p className="text-sm text-beige-200/60 flex items-center gap-1.5">
              &copy; 2026 RentTheVastra. Made with <Heart size={12} className="text-red-400 fill-red-400" /> in India.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-beige-200/60">
              {['Rental Policy', 'Return Policy', 'Privacy Policy', 'Terms of Service'].map((link) => (
                <Link 
                  key={link} 
                  href={`/${link.toLowerCase().replace(/ /g, '-')}`} 
                  className="hover:text-gold-400 transition-colors"
                >
                  {link}
                </Link>
              ))}
            </div>
            
            <div className="flex space-x-2.5 items-center">
              {['VISA', 'Mastercard', 'UPI', 'Razorpay'].map((pm) => (
                <span key={pm} className="text-[10px] font-bold border border-white/15 bg-white/5 backdrop-blur-sm px-2.5 py-1 rounded-lg text-beige-200/70 uppercase tracking-wider">
                  {pm}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
