import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, MapPin, Phone, MessageCircle, Building2, SortAsc, ChevronDown, Check } from 'lucide-react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import PropertyCard from '../components/PropertyCard';
import PropertySkeleton from '../components/PropertySkeleton';

interface Property {
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
  createdAt: string;
}

const StylishSelect: React.FC<{
  options: string[];
  value: string;
  onChange: (val: string) => void;
  icon: React.ReactNode;
  label: string;
}> = ({ options, value, onChange, icon, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef} style={{ zIndex: isOpen ? 500 : 10 }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-5 py-4 bg-gray-50 dark:bg-white/5 border border-transparent rounded-2xl transition-all duration-300 group ${
          isOpen ? 'ring-2 ring-accent border-accent/20 bg-white dark:bg-white/10 shadow-lg' : 'hover:border-accent/30'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="text-accent group-hover:scale-110 transition-transform duration-300">{icon}</span>
          <div className="text-left">
            <p className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 leading-none mb-1">{label}</p>
            <p className="text-sm font-bold text-primary dark:text-white leading-none">{value}</p>
          </div>
        </div>
        <ChevronDown size={16} className={`text-accent transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-slate-900 rounded-2xl shadow-[0_30px_100px_rgba(0,0,0,0.5)] border border-gray-100 dark:border-white/10 overflow-hidden z-[600]"
          >
            <div className="py-2 max-h-60 overflow-y-auto custom-scrollbar">
              {options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    onChange(opt);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-6 py-4 text-sm font-bold transition-all ${
                    value === opt 
                      ? 'bg-accent text-primary' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-accent/10 hover:text-accent'
                  }`}
                >
                  {opt}
                  {value === opt && <Check size={14} />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Properties: React.FC = () => {
  const routerLocation = useLocation();
  const queryParams = new URLSearchParams(routerLocation.search);
  const initialType = queryParams.get('type') || 'All';

  const [filterType, setFilterType] = useState(initialType);
  const [filterLocation, setFilterLocation] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Newest First');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const popularAreas = ['Boring Road', 'Kankarbagh', 'Bailey Road', 'Rajendra Nagar', 'Patliputra'];
  const types = ['All', 'Rent', 'Buy'];
  const categories = ['All', 'Residential', 'Commercial'];
  const sortOptions = ['Newest First', 'Price: Low to High', 'Price: High to Low'];
  
  const fetchLiveProperties = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'properties'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Property));
      setAllProperties(data);
      setFilteredProperties(data);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  useEffect(() => {
    fetchLiveProperties();
  }, []);

  useEffect(() => {
    let result = [...allProperties];

    if (filterType !== 'All') result = result.filter(p => p.type === filterType);
    if (filterCategory !== 'All') result = result.filter(p => p.category === filterCategory);
    if (filterLocation !== 'All') result = result.filter(p => p.location.toLowerCase().includes(filterLocation.toLowerCase()));
    
    if (searchTerm) {
      result = result.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortBy === 'Price: Low to High') {
      result.sort((a, b) => parseInt(a.price.replace(/[^0-9]/g, '')) - parseInt(b.price.replace(/[^0-9]/g, '')));
    } else if (sortBy === 'Price: High to Low') {
      result.sort((a, b) => parseInt(b.price.replace(/[^0-9]/g, '')) - parseInt(a.price.replace(/[^0-9]/g, '')));
    } else {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    setFilteredProperties(result);
  }, [filterType, filterCategory, filterLocation, searchTerm, sortBy, allProperties]);

  const suggestions = allProperties
    .map(p => p.location.split(',')[0].trim())
    .filter((v, i, a) => a.indexOf(v) === i && v.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, 5);

  return (
    <div className="pt-32 pb-20 min-h-screen bg-gray-50 dark:bg-[#020D1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center lg:text-left">
          <h2 className="text-sm font-black text-accent uppercase tracking-[0.4em] mb-4">Verified Listings</h2>
          <h1 className="text-5xl md:text-7xl font-black text-primary dark:text-white tracking-tighter uppercase italic">Properties in <span className="text-accent">Patna</span></h1>
        </motion.div>

        {/* Multi-Filter Bar - Responsive Layout */}
        <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-white/5 mb-8 md:mb-12 relative z-[50]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-accent" size={18} />
              <input
                type="text" placeholder="Search locality..."
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="w-full pl-10 pr-4 py-[1.4rem] bg-gray-50 dark:bg-white/5 border border-transparent rounded-2xl focus:ring-2 focus:ring-accent focus:bg-white dark:focus:bg-white/10 transition-all dark:text-white font-bold text-sm"
                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              />
              <AnimatePresence>
                {showSuggestions && searchTerm && suggestions.length > 0 && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-slate-800 rounded-2xl shadow-3xl border dark:border-white/5 overflow-hidden z-[60]">
                    {suggestions.map(s => (
                      <button key={s} onClick={() => setSearchTerm(s)} className="w-full text-left px-6 py-3 text-sm font-bold dark:text-white hover:bg-accent hover:text-primary transition-colors flex items-center gap-2"><MapPin size={14} /> {s}</button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <StylishSelect 
              label="Deal Type"
              value={filterType === 'All' ? 'For Rent/Buy' : filterType}
              options={types}
              onChange={setFilterType}
              icon={<SlidersHorizontal size={18} />}
            />

            <StylishSelect 
              label="Property Category"
              value={filterCategory === 'All' ? 'Residential/Comm' : filterCategory}
              options={categories}
              onChange={setFilterCategory}
              icon={<Building2 size={18} />}
            />

            <StylishSelect 
              label="Sort Listings"
              value={sortBy}
              options={sortOptions}
              onChange={setSortBy}
              icon={<SortAsc size={18} />}
            />

            <button onClick={() => {setFilterType('All'); setFilterCategory('All'); setFilterLocation('All'); setSearchTerm(''); setSortBy('Newest First');}} className="h-full bg-primary/5 dark:bg-white/5 text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-white/10 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-red-500 hover:text-white hover:border-red-500 transition-all py-4">Reset Filters</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-wrap items-center gap-3 mb-10">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mr-2">Quick Filter:</span>
              {popularAreas.map(area => (
                <button key={area} onClick={() => setFilterLocation(area)} className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${filterLocation === area ? 'bg-accent text-primary border-accent shadow-lg shadow-accent/20' : 'bg-white dark:bg-white/5 text-gray-500 border-gray-100 dark:border-white/10 hover:border-accent'}`}>{area}</button>
              ))}
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {loading ? [...Array(4)].map((_, i) => <PropertySkeleton key={i} />) : (
                <AnimatePresence mode="popLayout">
                  {filteredProperties.length > 0 ? filteredProperties.map((property, idx) => (
                    <motion.div 
                      key={property.id} 
                      initial={{ opacity: 0, y: 20 }} 
                      whileInView={{ opacity: 1, y: 0 }} 
                      viewport={{ once: true, margin: "-50px" }} 
                      transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.3) }}
                    >
                      <PropertyCard property={property} />
                    </motion.div>
                  )) : (
                    <div className="col-span-full py-20 text-center glass-morph rounded-[3rem]"><Building2 className="mx-auto text-accent mb-4 opacity-20" size={60} /><p className="text-xl font-black text-gray-400 uppercase italic">No matching properties found.</p></div>
                  )}
                </AnimatePresence>
              )}
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-8">
            <div className="sticky top-32">
               <motion.div initial={{ x: 50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} className="glass-morph p-8 rounded-[3rem] border-accent/20 relative overflow-hidden group shadow-3xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent opacity-10 rounded-full blur-2xl -mr-16 -mt-16"></div>
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-accent text-primary font-black text-[9px] uppercase tracking-[0.2em] mb-6">Owner's Corner</div>
                  <h3 className="text-3xl font-black text-primary dark:text-white tracking-tighter mb-4 italic uppercase">List Your <br /> <span className="text-accent">Property.</span></h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-bold leading-relaxed mb-8">Direct consultation with Sanjeev Pandey. Personal verification for every listing.</p>
                  <div className="space-y-4">
                    <a href="tel:9934072003" className="w-full block bg-primary text-white py-4 rounded-2xl flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest shadow-xl"><Phone size={18} /> Free Consultation</a>
                    <a href="https://wa.me/919334966607" target="_blank" className="w-full block bg-[#25D366] text-white py-4 rounded-2xl flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest shadow-lg">
                      <MessageCircle size={18} /> WhatsApp Chat
                    </a>
                    </div>
                    <p className="mt-6 text-[9px] text-gray-400 text-center font-bold uppercase tracking-[0.2em] font-hindi">
                    बेहतरीन डील्स और जानकारी के लिए अभी कॉल करें।
                    </p>
                </div>
              </motion.div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Properties;
