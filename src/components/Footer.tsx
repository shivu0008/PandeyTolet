import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 dark:bg-[#01070e] border-t dark:border-white/5 pt-24 pb-12 overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          {/* Brand Info */}
          <div className="space-y-8 col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-4 group">
              <div className="relative w-16 h-16">
                <img src="/logo.svg" alt="Logo" className="w-full h-full object-contain" />
                <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full -z-10"></div>
              </div>
              <div className="flex flex-col">
                <span className="font-black text-2xl leading-none dark:text-white tracking-tighter uppercase italic">
                  Pandey
                </span>
                <span className="text-[10px] text-accent font-black tracking-[0.2em] uppercase mt-1">
                  To-Let Service
                </span>
              </div>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed font-bold italic">
              "23+ Years of Trusted Service in Patna. We don't just find houses, we find homes."
            </p>
            <div className="pt-4">
              <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-accent/10 border border-accent/20 text-accent font-black text-[10px] uppercase tracking-widest">
                Authorized Service
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-black text-sm mb-10 dark:text-white uppercase tracking-[0.3em] text-glow">Navigation</h3>
            <ul className="space-y-5">
              {[
                { name: 'Home', path: '/' },
                { name: 'Properties', path: '/properties' },
                { name: 'About Us', path: '/about' }
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-500 dark:text-gray-400 hover:text-accent font-black text-xs uppercase tracking-widest transition-all hover:pl-2">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-black text-sm mb-10 dark:text-white uppercase tracking-[0.3em] text-glow">Solutions</h3>
            <ul className="space-y-5 font-black text-xs uppercase tracking-widest">
              <li>
                <Link to="/properties?type=Rent" className="text-gray-500 dark:text-gray-400 hover:text-accent transition-all hover:pl-2 block">
                  Residential Rental
                </Link>
              </li>
              <li>
                <Link to="/properties?type=Rent" className="text-gray-500 dark:text-gray-400 hover:text-accent transition-all hover:pl-2 block">
                  Commercial Leasing
                </Link>
              </li>
              <li>
                <Link to="/properties?type=Buy" className="text-gray-500 dark:text-gray-400 hover:text-accent transition-all hover:pl-2 block">
                  Property Buy/Sell
                </Link>
              </li>
              <li>
                <Link to="/properties" className="text-gray-500 dark:text-gray-400 hover:text-accent transition-all hover:pl-2 block">
                  Verified Listings
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-black text-sm mb-10 dark:text-white uppercase tracking-[0.3em] text-glow">Location</h3>
            <ul className="space-y-8">
              <li className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent shrink-0 shadow-lg">
                  <MapPin size={24} />
                </div>
                <span className="text-gray-500 dark:text-gray-400 text-sm font-black leading-tight">
                  Thakur Market, Shivpuri, <br /> Patna, Bihar - 800023
                </span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent shrink-0 shadow-lg">
                  <Phone size={24} />
                </div>
                <div className="flex flex-col">
                  <a href="tel:9334966607" className="text-gray-500 dark:text-gray-400 text-sm font-black hover:text-accent transition-colors tracking-tighter">+91 9334966607</a>
                  <a href="tel:9934072003" className="text-gray-500 dark:text-gray-400 text-sm font-black hover:text-accent transition-colors tracking-tighter">+91 9934072003</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t dark:border-white/5 pt-12 text-center relative">
          <p className="text-gray-400 dark:text-gray-500 text-[10px] font-black uppercase tracking-[0.4em]">
            © {new Date().getFullYear()} Pandey To-Let Service • <span className="text-accent">23 Years of Trust</span>
          </p>
          {/* Subtle Admin Link */}
          <Link 
            to="/admin-login" 
            className="absolute bottom-0 right-0 p-4 text-[8px] text-gray-600 dark:text-gray-800 hover:text-accent transition-colors font-black uppercase tracking-[0.3em]"
          >
            Admin Portal
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
