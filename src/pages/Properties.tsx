import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, MapPin, Phone, MessageCircle, Building2, SortAsc } from 'lucide-react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import PropertyCard from '../components/PropertyCard';
import PropertySkeleton from '../components/PropertySkeleton';

const Properties: React.FC = () => {
  const routerLocation = useLocation();
  const queryParams = new URLSearchParams(routerLocation.search);
  const initialType = queryParams.get('type') || 'All';

  const [filterType, setFilterType] = useState(initialType);
  const [filterLocation, setFilterLocation] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const [allProperties, setAllProperties] = useState<any[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const popularAreas = ['Boring Road', 'Kankarbagh', 'Bailey Road', 'Rajendra Nagar', 'Patliputra'];
  const types = ['All', 'Rent', 'Buy'];
  const categories = ['All', 'Residential', 'Commercial'];
  
  useEffect(() => {
    fetchLiveProperties();
  }, []);

  const fetchLiveProperties = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'properties'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAllProperties(data);
      setFilteredProperties(data);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

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

    if (sortBy === 'price-low') {
      result.sort((a, b) => parseInt(a.price.replace(/[^0-9]/g, '')) - parseInt(b.price.replace(/[^0-9]/g, '')));
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => parseInt(b.price.replace(/[^0-9]/g, '')) - parseInt(a.price.replace(/[^0-9]/g, '')));
    } else if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    setFilteredProperties(result);
  }, [filterType, filterCategory, filterLocation, searchTerm, sortBy, allProperties]);

  const locations = ['All', ...new Set(allProperties.map(p => p.location.split(',')[0].trim()))];
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

        {/* Multi-Filter Bar */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-white/5 mb-12 relative z-[100]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-accent" size={18} />
              <input
                type="text" placeholder="Search..."
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="w-full pl-10 pr-4 py-4 bg-gray-50 dark:bg-white/5 border-none rounded-2xl focus:ring-2 focus:ring-accent transition-all dark:text-white font-bold text-sm"
                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              />
              <AnimatePresence>
                {showSuggestions && searchTerm && suggestions.length > 0 && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-slate-800 rounded-2xl shadow-3xl border dark:border-white/5 overflow-hidden">
                    {suggestions.map(s => (
                      <button key={s} onClick={() => setSearchTerm(s)} className="w-full text-left px-6 py-3 text-sm font-bold dark:text-white hover:bg-accent hover:text-primary transition-colors flex items-center gap-2"><MapPin size={14} /> {s}</button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="relative">
              <select className="w-full px-5 py-4 bg-gray-50 dark:bg-white/5 border-none rounded-2xl focus:ring-2 focus:ring-accent appearance-none transition-all dark:text-white font-bold text-sm cursor-pointer" value={filterType} onChange={(e) => setFilterType(e.target.value)}>{types.map(t => <option key={t} value={t} className="dark:bg-slate-900">{t === 'All' ? 'For Rent/Buy' : t}</option>)}</select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-accent"><SlidersHorizontal size={18} /></div>
            </div>
            <div className="relative">
              <select className="w-full px-5 py-4 bg-gray-50 dark:bg-white/5 border-none rounded-2xl focus:ring-2 focus:ring-accent appearance-none transition-all dark:text-white font-bold text-sm cursor-pointer" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>{categories.map(c => <option key={c} value={c} className="dark:bg-slate-900">{c === 'All' ? 'Residential/Comm' : c}</option>)}</select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-accent"><Building2 size={18} /></div>
            </div>
            <div className="relative">
              <select className="w-full px-5 py-4 bg-primary text-accent border-none rounded-2xl focus:ring-2 focus:ring-accent appearance-none transition-all font-black text-[10px] uppercase tracking-widest cursor-pointer" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="newest">Newest First</option><option value="price-low">Price: Low to High</option><option value="price-high">Price: High to Low</option>
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-accent"><SortAsc size={16} /></div>
            </div>
            <button onClick={() => {setFilterType('All'); setFilterCategory('All'); setFilterLocation('All'); setSearchTerm(''); setSortBy('newest');}} className="bg-white dark:bg-white/5 text-gray-500 border border-gray-100 dark:border-white/10 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-red-500 hover:text-white transition-all shadow-lg">Reset All</button>
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
                    <motion.div key={property.id} layout initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: idx * 0.05 }}><PropertyCard property={property} /></motion.div>
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
                    <a href="tel:9334966607" className="w-full block bg-primary text-white py-4 rounded-2xl flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest shadow-xl"><Phone size={18} /> Consult Terms</a>
                    <a href="https://wa.me/919934072003" target="_blank" className="w-full block bg-[#25D366] text-white py-4 rounded-2xl flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest shadow-lg">
                      <MessageCircle size={18} /> WhatsApp Chat
                    </a>
                    </div>
                    <p className="mt-4 text-[9px] text-gray-400 text-center font-bold uppercase tracking-widest">
                    *By contacting us, you agree to our <Link to="/terms-and-conditions" className="text-accent underline">Terms & Conditions</Link>
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
