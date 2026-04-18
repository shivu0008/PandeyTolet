import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, IndianRupee, ArrowRight, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeroSliderProps {
  properties: any[];
}

const HeroSlider: React.FC<HeroSliderProps> = ({ properties }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (properties.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % properties.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [properties.length]);

  if (properties.length === 0) {
    return (
      <div className="w-full h-[600px] rounded-[3rem] bg-white/5 border border-white/10 flex items-center justify-center">
        <p className="text-gray-500 font-black uppercase tracking-widest italic text-xs">Loading Fresh Listings...</p>
      </div>
    );
  }

  const slide = properties[current];

  return (
    <div className="relative group w-full h-[550px] lg:h-[650px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 rounded-[4rem] overflow-hidden border-[12px] border-white/50 dark:border-gray-800/50 shadow-[0_50px_100px_rgba(0,0,0,0.3)] backdrop-blur-xl"
        >
          <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-80"></div>
          
          {/* Floating Details Card */}
          <div className="absolute bottom-12 left-10 right-10">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-accent text-primary font-black text-[9px] uppercase tracking-[0.2em] mb-4 shadow-xl">
                <Zap size={12} fill="currentColor" /> Just In Patna
              </div>
              <h3 className="text-4xl lg:text-5xl font-black text-white tracking-tighter uppercase italic leading-none mb-4">
                {slide.title}
              </h3>
              <div className="flex flex-wrap items-center gap-6">
                 <div className="flex items-center gap-2 text-white font-black text-2xl tracking-tighter">
                   <IndianRupee size={24} className="text-accent" />
                   {slide.price}
                 </div>
                 <div className="flex items-center gap-2 text-white/60 font-bold uppercase tracking-widest text-xs">
                   <MapPin size={16} className="text-accent" />
                   {slide.location}
                 </div>
              </div>
              
              <Link to="/properties" className="mt-8 inline-flex items-center gap-3 text-accent font-black uppercase tracking-[0.3em] text-[10px] hover:gap-6 transition-all">
                View Listing Details <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Manual Controls */}
      <div className="absolute top-1/2 -left-10 -right-10 flex justify-between pointer-events-none">
        <button 
          onClick={() => setCurrent((prev) => (prev - 1 + properties.length) % properties.length)}
          className="p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl text-primary dark:text-accent pointer-events-auto hover:bg-accent hover:text-primary transition-all scale-75 group-hover:scale-100 opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={() => setCurrent((prev) => (prev + 1) % properties.length)}
          className="p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl text-primary dark:text-accent pointer-events-auto hover:bg-accent hover:text-primary transition-all scale-75 group-hover:scale-100 opacity-0 group-hover:opacity-100"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
        {properties.map((_, i) => (
          <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === current ? 'bg-accent w-12 shadow-[0_0_10px_rgba(0,242,255,0.5)]' : 'bg-gray-300 dark:bg-white/10 w-2'}`} />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
