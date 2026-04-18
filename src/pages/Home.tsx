import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { MessageCircle, Home as HomeIcon, Key, Star, ArrowRight, Zap, Plus, Minus, HelpCircle, MessageSquare, X, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, orderBy, limit, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import PropertyCard from '../components/PropertyCard';
import PropertySkeleton from '../components/PropertySkeleton';
import HeroSlider from '../components/HeroSlider';

const Home: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef, offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [featuredProperties, setFeaturedProperties] = useState<any[]>([]);
  const [sliderProperties, setSliderProperties] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchLiveContent();
  }, []);

  const fetchLiveContent = async () => {
    setLoading(true);
    try {
      const featQ = query(collection(db, 'properties'), orderBy('createdAt', 'desc'), limit(3));
      const featSnap = await getDocs(featQ);
      setFeaturedProperties(featSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      const sliderQ = query(collection(db, 'properties'), orderBy('createdAt', 'desc'), limit(5));
      const sliderSnap = await getDocs(sliderQ);
      setSliderProperties(sliderSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      const revQ = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'), limit(6));
      const revSnap = await getDocs(revQ);
      setReviews(revSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'reviews'), { ...newReview, createdAt: new Date().toISOString() });
      setShowReviewForm(false);
      setNewReview({ name: '', rating: 5, comment: '' });
      fetchLiveContent();
      alert('Thank you!');
    } catch (err) { alert('Error'); } finally { setSubmitting(false); }
  };

  const services = [
    { title: 'Rent Property', desc: 'Premium flats & shops. Verified for safety.', icon: <HomeIcon className="text-accent" size={32} />, link: '/properties?type=Rent', color: 'from-blue-500/20 to-cyan-500/20', span: 'col-span-1 md:col-span-2' },
    { title: 'Buy/Sell', desc: 'Transparent real estate deals in Patna.', icon: <Key className="text-accent" size={32} />, link: '/properties?type=Buy', color: 'from-purple-500/20 to-pink-500/20', span: 'col-span-1' },
    { title: 'Consultation', desc: 'Expert advice from Sanjeev Pandey.', icon: <Zap className="text-accent" size={32} />, link: '/about', color: 'from-green-500/20 to-emerald-500/20', span: 'col-span-1 md:col-span-1' }
  ];

  const faqs = [
    { q: "How does the 72-hour promise work?", h: "72 घंटों में घर कैसे मिलता है?", a: "With our extensive network and verified database, we match your requirements instantly. Most clients visit and finalize their dream home within 3 days." },
    { q: "Is there a registration process?", h: "क्या रजिस्ट्रेशन अनिवार्य है?", a: "Yes, to ensure genuine requests and safety, we follow a simple registration process. Connect with us to know more." },
    { q: "What is your service commission?", h: "आपकी सर्विस फीस कितनी है?", a: "We charge a nominal service fee for finding your perfect home and handling all legal verification. Call us for a transparent quote." }
  ];

  const fadeInUpProps = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6 }
  };

  return (
    <div className="overflow-hidden bg-white dark:bg-gray-900" ref={containerRef}>
      {/* Hero Section - Scaled Down */}
      <section className="relative min-h-[90vh] flex items-center pt-20 mesh-gradient">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }} transition={{ duration: 15, repeat: Infinity }} className="absolute top-[-5%] right-[-5%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[100px]" />
          <motion.div animate={{ scale: [1, 1.3, 1], x: [0, -50, 0] }} transition={{ duration: 20, repeat: Infinity, delay: 2 }} className="absolute bottom-[-5%] left-[-5%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[80px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center lg:text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div style={{ opacity }} className="lg:col-span-6">
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2.5 py-2 px-4 rounded-full glass-morph border-accent/20 mb-6"><span className="flex h-2 w-2 rounded-full bg-accent animate-ping"></span><span className="text-primary dark:text-accent font-black text-[9px] uppercase tracking-[0.2em]">The Patna Standard Since 2003</span></motion.div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-primary dark:text-white leading-[1.1] mb-6 tracking-tight uppercase italic">Fast. Trusted. <br /><span className="text-accent text-glow">Expert Service.</span></h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-xl font-hindi leading-relaxed">पटना में घर ढूँढना अब और भी आसान। हम लेकर आए हैं आपके लिए <span className="text-primary dark:text-white font-black border-b-2 border-accent/30 pb-0.5">72 घंटों का भरोसा</span>।</motion.p>
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7 }} className="flex flex-wrap justify-center lg:justify-start gap-4">
                <a href="tel:9334966607" className="btn-shiny !px-8 !py-4 text-base shadow-xl">Call Now</a>
                <a href="https://wa.me/919934072003" className="glass-morph !bg-white/10 text-primary dark:text-white font-black px-8 py-4 rounded-2xl border-white/20 text-base flex items-center gap-2.5 hover:bg-accent/10 transition-all"><MessageCircle size={20} className="text-green-500" /> WhatsApp</a>
              </motion.div>
              <p className="mt-6 text-[10px] text-gray-400 font-bold uppercase tracking-widest font-hindi opacity-80">पूरी जानकारी और बेहतरीन डील्स के लिए अभी संपर्क करें।</p>
              <p className="mt-2 text-[9px] text-gray-500 font-medium opacity-50 italic">*By contacting us, you agree to our Terms & Conditions</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="lg:col-span-6 w-full"><HeroSlider properties={sliderProperties} /></motion.div>
          </div>
        </div>
      </section>

      {/* Featured Collections - Scaled Down */}
      <section className="py-24 dark:bg-[#020D1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUpProps} className="flex flex-col md:flex-row justify-between items-end mb-16 gap-10">
            <div className="max-w-3xl text-center md:text-left">
              <h2 className="text-[10px] font-black text-accent uppercase tracking-[0.4em] mb-3">Verified Assets</h2>
              <h3 className="text-3xl md:text-5xl font-black text-primary dark:text-white tracking-tight leading-none italic uppercase">Curated Spaces.</h3>
            </div>
            <Link to="/properties" className="btn-shiny !bg-accent !text-primary !py-3 !px-6 shadow-accent/10 text-[10px] uppercase tracking-widest">View All Listings</Link>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loading ? [...Array(3)].map((_, i) => <PropertySkeleton key={i} />) : featuredProperties.map((p, idx) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}>
                <PropertyCard property={p} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Wall - Scaled Down */}
      <section className="py-24 relative bg-primary text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div {...fadeInUpProps} className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-[10px] font-black text-accent uppercase tracking-[0.5em] mb-3">Social Proof</h2>
              <h3 className="text-3xl md:text-5xl font-black tracking-tight italic uppercase">Why Families Trust Us.</h3>
            </div>
            <button onClick={() => setShowReviewForm(true)} className="bg-white text-primary font-black px-8 py-4 rounded-xl flex items-center gap-2 hover:bg-accent hover:text-primary transition-all shadow-xl uppercase tracking-widest text-[10px]">
              <MessageSquare size={16} /> Write a Review
            </button>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((r, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="bg-white/5 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10 relative group">
                <div className="flex gap-1 mb-4 text-accent">{[...Array(r.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}</div>
                <p className="text-base italic mb-6 leading-relaxed font-medium opacity-90">"{r.comment}"</p>
                <div><p className="font-black text-lg text-accent uppercase italic tracking-tighter">{r.name}</p><p className="text-[10px] text-white/30 font-bold uppercase tracking-[0.2em] mt-1">Verified Client</p></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services - Scaled Down */}
      <section className="py-24 bg-gray-50/50 dark:bg-gray-800/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUpProps} className="text-center mb-16">
            <h2 className="text-[10px] font-black text-accent uppercase tracking-[0.4em] mb-3 underline decoration-accent decoration-2 underline-offset-4">Solutions</h2>
            <h3 className="text-3xl md:text-5xl font-black text-primary dark:text-white tracking-tight uppercase italic">Professional Services.</h3>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-auto">
            {services.map((s, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className={`${s.span} relative group overflow-hidden rounded-[2.5rem] p-8 glass-morph flex flex-col justify-between min-h-[350px]`}><div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-30 group-hover:opacity-60 transition-opacity duration-700`}></div><div className="relative z-10"><div className="w-16 h-16 bg-white dark:bg-gray-900 rounded-2xl shadow-xl flex items-center justify-center mb-6 group-hover:rotate-[10deg] transition-transform duration-500">{s.icon}</div><h4 className="text-2xl font-black mb-3 dark:text-white tracking-tight uppercase italic">{s.title}</h4><p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed max-w-sm">{s.desc}</p></div><Link to={s.link} className="relative z-10 h-12 w-12 rounded-full bg-primary text-accent flex items-center justify-center group-hover:w-full group-hover:rounded-xl transition-all duration-500 overflow-hidden px-4"><span className="group-hover:block hidden font-black text-[10px] uppercase tracking-widest mr-2 whitespace-nowrap">Explore Service</span><ArrowRight size={18} className="shrink-0" /></Link></motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ & CTA Sections ... (scaled down similarly) */}
      <section className="py-24 bg-gray-50/30 dark:bg-slate-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
           <motion.div {...fadeInUpProps} className="text-center mb-12"><div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-primary/5 dark:bg-white/5 border border-primary/10 dark:border-white/10 mb-4"><HelpCircle className="text-accent" size={14} /><span className="text-primary dark:text-accent font-black text-[8px] uppercase tracking-[0.2em]">Queries?</span></div><h2 className="text-3xl md:text-5xl font-black text-primary dark:text-white tracking-tight leading-none italic uppercase">Common Questions.</h2></motion.div><div className="space-y-3">{faqs.map((faq, idx) => (<motion.div key={idx} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="glass-morph rounded-[1.5rem] border-white/10 overflow-hidden"><button onClick={() => setActiveFaq(activeFaq === idx ? null : idx)} className="w-full p-6 flex items-center justify-between text-left group"><div><h4 className="text-base md:text-lg font-black text-primary dark:text-white tracking-tight group-hover:text-accent transition-colors mb-0.5 uppercase italic">{faq.q}</h4><h5 className="text-accent font-bold text-[8px] uppercase tracking-widest opacity-60">{faq.h}</h5></div><div className={`p-2 rounded-lg transition-all duration-500 ${activeFaq === idx ? 'bg-accent text-primary rotate-180' : 'bg-primary/5 dark:bg-white/5 text-accent'}`}>{activeFaq === idx ? <Minus size={16} /> : <Plus size={16} />}</div></button><AnimatePresence>{activeFaq === idx && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 pb-6"><div className="pt-4 border-t border-gray-100 dark:border-white/5"><p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed">{faq.a}</p></div></motion.div>}</AnimatePresence></motion.div>))}</div>
        </div>
      </section>

      {/* CTA Section - Final Scaling */}
      <section className="py-32 relative overflow-hidden bg-white dark:bg-gray-900">
        <div className="absolute inset-0 bg-primary skew-y-2 translate-y-16 scale-125 -z-10"></div>
        <div className="max-w-5xl mx-auto px-4 text-center text-white relative z-10"><motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}><p className="text-accent font-black uppercase tracking-[0.5em] mb-6 text-[9px]">Need a flat fast?</p><h2 className="text-4xl md:text-6xl font-black mb-10 tracking-tight leading-none italic uppercase">Stop Searching. <br /> <span className="text-accent underline decoration-white/20 underline-offset-4">Start Living.</span></h2><div className="flex flex-col items-center gap-8"><div className="flex flex-wrap justify-center gap-6"><motion.a whileHover={{ scale: 1.05 }} href="tel:9334966607" className="bg-accent text-primary font-black py-4 px-10 rounded-2xl text-lg shadow-2xl hover:bg-white transition-all uppercase tracking-widest">9334-9666-07</motion.a><motion.a whileHover={{ scale: 1.05 }} href="https://wa.me/919934072003" className="bg-white/10 backdrop-blur-xl border border-white/20 text-white font-black py-4 px-10 rounded-2xl text-lg hover:bg-accent hover:text-primary transition-all uppercase tracking-widest">WhatsApp Chat</motion.a></div><p className="text-[9px] text-white/50 font-black uppercase tracking-[0.2em] font-hindi">पूरी जानकारी और बेहतरीन डील्स के लिए अभी संपर्क करें।</p></div></motion.div></div>
      </section>
      
      {/* Review Modal */}
      <AnimatePresence>
        {showReviewForm && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowReviewForm(false)} className="absolute inset-0 bg-primary/95 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative bg-white dark:bg-slate-900 w-full max-w-md p-8 rounded-[2.5rem] shadow-3xl border border-white/10">
              <button onClick={() => setShowReviewForm(false)} className="absolute top-6 right-6 text-gray-400 hover:text-accent"><X size={20}/></button>
              <h3 className="text-2xl font-black text-primary dark:text-white tracking-tight uppercase italic mb-6">Rate Our Service</h3>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <input type="text" placeholder="Your Name" required className="w-full bg-gray-100 dark:bg-white/5 border-none rounded-xl p-4 dark:text-white font-bold text-sm" value={newReview.name} onChange={e => setNewReview({...newReview, name: e.target.value})} />
                <div><div className="flex gap-2">{[1,2,3,4,5].map(star => (<Star key={star} size={20} onClick={() => setNewReview({...newReview, rating: star})} className={`cursor-pointer transition-all ${newReview.rating >= star ? 'text-accent fill-current' : 'text-gray-200 dark:text-white/10'}`} />))}</div></div>
                <textarea placeholder="Write your review..." rows={3} required className="w-full bg-gray-100 dark:bg-white/5 border-none rounded-xl p-4 dark:text-white font-bold text-sm" value={newReview.comment} onChange={e => setNewReview({...newReview, comment: e.target.value})} />
                <button type="submit" disabled={submitting} className="w-full btn-shiny !bg-primary !text-accent !py-4 rounded-xl font-black uppercase tracking-widest text-[10px]">{submitting ? 'Posting...' : 'Post Review'}</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
