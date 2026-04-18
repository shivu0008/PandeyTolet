import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Bed, Bath, Phone, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    price: string;
    location: string;
    type: string;
    category: string;
    image: string;
    images?: string[];
    beds: number;
    baths: number;
    featured: boolean;
    status?: string;
  };
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const [currentImg, setCurrentImg] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const gallery = property.images && property.images.length > 0 ? property.images : [property.image];
  const isAvailable = !property.status || property.status === 'Available';
  
  // Automatic Slideshow Logic
  useEffect(() => {
    if (gallery.length <= 1 || isPaused || !isAvailable) return;

    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % gallery.length);
    }, 4000); // Cycles every 4 seconds

    return () => clearInterval(timer);
  }, [gallery.length, isPaused, isAvailable]);

  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImg((prev) => (prev + 1) % gallery.length);
  };

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImg((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  const message = `नमस्ते संजीव सर, मैंने आपकी वेबसाइट पर यह प्रॉपर्टी देखी है और मुझे इसमें रुचि है:

🏠 *${property.title}*
📍 लोकेशन: ${property.location}
💰 दाम: ${property.price}
🏷️ प्रकार: ${property.type === 'Rent' ? 'किराये के लिए' : 'खरीदने के लिए'} (${property.category === 'Residential' ? 'रहने के लिए' : 'व्यावसायिक'})

क्या यह अभी उपलब्ध है? कृपया मुझे और जानकारी दें। धन्यवाद।`;

  const whatsappUrl = `https://wa.me/919934072003?text=${encodeURIComponent(message)}`;

  return (
    <motion.div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      whileHover={isAvailable ? { y: -15 } : {}}
      className={`group relative bg-white dark:bg-gray-800 rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500 border border-gray-100 dark:border-gray-700 ${!isAvailable ? 'opacity-80' : 'hover:shadow-accent/20'}`}
    >
      <div className="relative h-72 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImg}
            src={gallery[currentImg]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className={`absolute inset-0 w-full h-full object-cover ${!isAvailable ? 'grayscale-[0.5]' : ''}`}
          />
        </AnimatePresence>

        {/* Gallery Navigation */}
        {gallery.length > 1 && isAvailable && (
          <div className="absolute inset-0 flex items-center justify-between px-4 z-30 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
            <button 
              onClick={prevImg} 
              className="p-3 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-accent hover:text-primary transition-all shadow-xl"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextImg} 
              className="p-3 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-accent hover:text-primary transition-all shadow-xl"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}

        {/* Improved Progress Dots */}
        {gallery.length > 1 && isAvailable && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
            {gallery.map((_, i) => (
              <button 
                key={i}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrentImg(i); }}
                className={`h-1.5 rounded-full transition-all duration-500 shadow-sm ${i === currentImg ? 'bg-accent w-8' : 'bg-white/40 w-2 hover:bg-white'}`} 
              />
            ))}
          </div>
        )}
        
        {!isAvailable && (
          <div className="absolute inset-0 bg-primary/60 backdrop-blur-[2px] flex items-center justify-center z-40">
            <div className="bg-white text-primary font-black px-8 py-3 rounded-2xl shadow-2xl uppercase tracking-[0.3em] text-sm border-2 border-accent rotate-[-5deg]">
              {property.status}
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 z-10"></div>
        
        <div className="absolute top-6 left-6 flex flex-col gap-2 z-20">
          <span className="bg-white/90 backdrop-blur-md text-primary text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-xl">
            {property.type}
          </span>
          {property.featured && isAvailable && (
            <span className="bg-accent text-primary text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-xl animate-pulse">
              Featured
            </span>
          )}
        </div>

        <div className="absolute bottom-6 left-8 z-20">
          <p className="text-white text-4xl font-black tracking-tighter drop-shadow-2xl">
            {property.price}
          </p>
        </div>
      </div>

      <div className="p-8">
        <div className="flex items-center gap-2 text-accent font-bold text-[10px] uppercase tracking-[0.2em] mb-3">
          <span className="w-8 h-px bg-accent"></span>
          {property.category}
        </div>
        
        <h3 className="text-2xl font-black mb-3 group-hover:text-accent transition-colors dark:text-white leading-tight tracking-tight uppercase italic">
          {property.title}
        </h3>
        
        <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500 mb-6">
          <MapPin size={16} className="text-accent" />
          <span className="text-xs font-bold uppercase tracking-wider">{property.location}</span>
        </div>

        {property.category === 'Residential' && (
          <div className="flex items-center gap-8 mb-8 border-y dark:border-white/5 py-4">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <Bed size={18} className="text-accent" />
              <span className="text-xs font-black uppercase">{property.beds} Beds</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <Bath size={18} className="text-accent" />
              <span className="text-xs font-black uppercase">{property.baths} Baths</span>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <motion.a
              whileHover={isAvailable ? { scale: 1.02 } : {}}
              href={isAvailable ? "tel:9334966607" : "#"}
              className={`flex items-center justify-center gap-2 py-4 rounded-2xl font-black transition-all text-[10px] uppercase tracking-widest border-2 ${isAvailable ? 'border-primary/10 dark:border-white/10 text-primary dark:text-white hover:bg-primary hover:text-white' : 'bg-gray-100 text-gray-400 cursor-not-allowed border-transparent'}`}
            >
              <Phone size={16} />
              Call
            </motion.a>
            <motion.a
              whileHover={isAvailable ? { scale: 1.02 } : {}}
              href={isAvailable ? whatsappUrl : "#"}
              target={isAvailable ? "_blank" : undefined}
              className={`flex items-center justify-center gap-2 py-4 rounded-2xl font-black transition-all text-[10px] uppercase tracking-widest shadow-lg ${isAvailable ? 'bg-[#25D366] text-white hover:bg-[#128C7E]' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
            >
              <MessageCircle size={16} />
              WhatsApp
            </motion.a>
          </div>
          <p className="text-[9px] text-gray-400 text-center font-bold uppercase tracking-widest">
            {isAvailable ? '*By contacting us, you agree to our ' : 'This property is no longer available. '} 
            <Link to="/terms-and-conditions" className="text-accent underline">Terms & Conditions</Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
