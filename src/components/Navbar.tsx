import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Moon, Sun, ArrowRight } from 'lucide-react';
import { useTheme } from './ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Properties', path: '/properties' },
    { name: 'About Us', path: '/about' }
  ];

  return (
    <nav
      className={`fixed w-full z-[100] transition-all duration-500 ${
        scrolled ? 'py-4' : 'py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`glass-morph border-white/20 px-6 py-3 rounded-[2.5rem] transition-all duration-500 ${scrolled ? 'shadow-2xl scale-[0.98] !bg-white/95 dark:!bg-slate-900/95' : 'bg-black/20 backdrop-blur-md'}`}>
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-4 group">
              <div className="relative w-14 h-14 transition-transform group-hover:scale-110 duration-500">
                <img src="/logo.svg" alt="Pandey To-Let Logo" className="w-full h-full object-contain" />
                <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full -z-10 animate-pulse"></div>
              </div>
              <div className="flex flex-col">
                <span className={`font-black text-2xl leading-none tracking-tighter uppercase italic transition-colors ${scrolled ? 'text-primary dark:text-white' : 'text-white'}`}>
                  Pandey
                </span>
                <span className="text-[10px] text-accent font-black tracking-[0.2em] uppercase leading-none mt-1 shadow-sm">
                  To-Let Service
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative font-black text-xs uppercase tracking-[0.2em] transition-all hover:text-accent group ${
                    location.pathname === link.path
                      ? 'text-accent'
                      : scrolled ? 'text-primary/70 dark:text-white/70' : 'text-white/90'
                  }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-2 left-0 h-1 bg-accent transition-all duration-300 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'} shadow-[0_0_10px_rgba(0,242,255,0.8)]`}></span>
                </Link>
              ))}
              
              <div className={`flex items-center gap-6 border-l pl-8 transition-colors ${scrolled ? 'border-primary/10 dark:border-white/10' : 'border-white/20'}`}>
                <button
                  onClick={toggleTheme}
                  className={`p-3 rounded-xl transition-all ${scrolled ? 'bg-primary/5 dark:bg-white/5 text-primary dark:text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>

                <motion.a
                  whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(0,242,255,0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  href="tel:9334966607"
                  className="bg-primary text-white dark:bg-accent dark:text-primary px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-xl border border-white/10"
                >
                  <Phone size={16} />
                  Book Now
                </motion.a>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className={`p-3 rounded-xl transition-all ${scrolled ? 'bg-primary/5 text-primary dark:text-white' : 'bg-white/10 text-white'}`}
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-3 rounded-xl transition-all ${scrolled ? 'bg-primary text-accent' : 'bg-white/20 text-accent'}`}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="md:hidden px-4 mt-4"
          >
            <div className="glass-morph p-8 rounded-[3rem] space-y-4 border-white/10 !bg-white dark:!bg-slate-900 shadow-3xl">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-6 py-5 rounded-2xl text-lg font-black uppercase tracking-widest transition-all ${
                    location.pathname === link.path
                      ? 'bg-accent text-primary'
                      : 'text-primary dark:text-white hover:bg-primary/5'
                  }`}
                >
                  {link.name}
                  <ArrowRight size={20} />
                </Link>
              ))}
              <div className="pt-6">
                <a
                  href="tel:9334966607"
                  className="flex items-center justify-center gap-3 bg-primary text-accent w-full py-6 rounded-2xl font-black text-xl uppercase tracking-widest shadow-2xl"
                >
                  <Phone size={24} />
                  Call Now
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
