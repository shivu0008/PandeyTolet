import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { MessageCircle, Home as HomeIcon, Key, Star, ArrowRight, Zap, Plus, Minus, HelpCircle, MessageSquare, X } from 'lucide-react';
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
    { title: 'Rent Property', desc: 'Premium flats & shops. Verified for safety.', icon: <HomeIcon className="text-accent" size={36} />, link: '/properties?type=Rent', color: 'from-blue-500/20 to-cyan-500/20', span: 'col-span-1 md:col-span-2' },
    { title: 'Buy/Sell', desc: 'Transparent real estate deals in Patna.', icon: <Key className="text-accent" size={36} />, link: '/properties?type=Buy', color: 'from-purple-500/20 to-pink-500/20', span: 'col-span-1' },
    { title: 'Consultation', desc: 'Expert advice from Sanjeev Pandey.', icon: <Zap className="text-accent" size={36} />, link: '/about', color: 'from-green-500/20 to-emerald-500/20', span: 'col-span-1 md:col-span-1' }
  ];

  const faqs = [
    { q: "How does the 72-hour promise work?", h: "72 घंटों में घर कैसे मिलता है?", a: "With our extensive network and verified database, we match your requirements instantly. Most clients visit and finalize their dream home within 3 days." },
    { q: "Is there a registration process?", h: "क्या रजिस्ट्रेशन अनिवार्य है?", a: "Yes, to ensure genuine requests and safety, we follow a simple registration process. Connect with us to know more." },
    { q: "What is your service commission?", h: "आपकी सर्विस फीस कितनी है?", a: "We charge a nominal service fee for finding your perfect home and handling all legal verification. Call us for a transparent quote." }
  ];

  return (
    <div className="overflow-hidden bg-white dark:bg-gray-900" ref={containerRef}>
      {/* Hero Section */}
      <section className="relative min-h-[110vh] flex items-center pt-20 mesh-gradient">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div animate={{ scale: [1, 1.2, 1], x: [0, 100, 0], y: [0, 50, 0] }} transition={{ duration: 15, repeat: Infinity }} className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-accent/15 rounded-full blur-[120px]" />
          <motion.div animate={{ scale: [1, 1.3, 1], x: [0, -100, 0], y: [0, -50, 0] }} transition={{ duration: 20, repeat: Infinity, delay: 2 }} className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/15 rounded-full blur-[100px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center lg:text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <motion.div style={{ opacity }} className="lg:col-span-6">
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-3 py-3 px-6 rounded-full glass-morph border-accent/20 mb-10"><span className="flex h-3 w-3 rounded-full bg-accent animate-ping"></span><span className="text-primary dark:text-accent font-black text-xs uppercase tracking-[0.2em]">The Patna Standard Since 2003</span></motion.div>
              <h1 className="text-7xl md:text-9xl font-black text-primary dark:text-white leading-[0.85] mb-8 tracking-[-0.05em]">Fast. Trusted. <br /><span className="text-accent text-glow">Expert Service.</span></h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-2xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl font-medium leading-relaxed mx-auto lg:mx-0 font-hindi text-glow text-shadow-sm">पटना में घर ढूँढना अब और भी आसान। हम लेकर आए हैं आपके लिए <span className="text-primary dark:text-white font-black underline decoration-accent/50 underline-offset-8">72 घंटों का भरोसा</span>।</motion.p>
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 }} className="flex flex-wrap justify-center lg:justify-start gap-8">
                <a href="tel:9334966607" className="btn-shiny !px-12 !py-6 text-xl shadow-2xl">Call Now</a>
                <a href="https://wa.me/919934072003" className="glass-morph !bg-white/10 text-primary dark:text-white font-black px-12 py-6 rounded-2xl border-white/20 text-xl flex items-center gap-3"><MessageCircle size={24} className="text-green-500" /> WhatsApp</a>
              </motion.div>
              <p className="mt-6 text-xs text-gray-400 font-bold uppercase tracking-widest font-hindi">पूरी जानकारी और बेहतरीन डील्स के लिए अभी संपर्क करें।</p>
              <p className="mt-2 text-[10px] text-gray-500 font-medium opacity-60">*By contacting us, you agree to our <Link to="/terms-and-conditions" className="underline hover:text-accent">Terms & Conditions</Link></p>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="lg:col-span-6 w-full"><HeroSlider properties={sliderProperties} /></motion.div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-40 dark:bg-[#020D1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
            <div className="max-w-3xl">
              <h2 className="text-sm font-black text-accent uppercase tracking-[0.4em] mb-6">Collections</h2>
              <h3 className="text-7xl font-black text-primary dark:text-white tracking-tighter leading-none">Curated Spaces. <br />Personally Verified.</h3>
            </div>
            <Link to="/properties" className="btn-shiny !bg-accent !text-primary shadow-accent/20">View All Properties</Link>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {loading ? [...Array(3)].map((_, i) => <PropertySkeleton key={i} />) : featuredProperties.map((p, idx) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}>
                <PropertyCard property={p} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Wall */}
      <section className="py-40 relative bg-primary text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 -skew-x-12 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex flex-col md:flex-row justify-between items-center mb-24 gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-sm font-black text-accent uppercase tracking-[0.5em] mb-6">Social Proof</h2>
              <h3 className="text-6xl md:text-8xl font-black tracking-tighter italic leading-none">Why Families <br /> Trust Us.</h3>
            </div>
            <button onClick={() => setShowReviewForm(true)} className="bg-white text-primary font-black px-10 py-5 rounded-2xl flex items-center gap-3 hover:bg-accent hover:text-primary transition-all shadow-3xl uppercase tracking-widest text-sm">
              <MessageSquare size={20} /> Rate Our Service
            </button>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {reviews.map((r, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="bg-white/5 backdrop-blur-xl p-10 rounded-[3rem] border border-white/10 relative group">
                <div className="flex gap-1 mb-6 text-accent">{[...Array(r.rating)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}</div>
                <p className="text-xl italic mb-10 leading-relaxed font-medium">"{r.comment}"</p>
                <div><p className="font-black text-2xl text-accent uppercase italic tracking-tighter">{r.name}</p><p className="text-sm text-white/40 font-bold uppercase tracking-[0.2em] mt-1">Verified User</p></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-40 bg-gray-50/50 dark:bg-gray-800/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-24">
            <h2 className="text-sm font-black text-accent uppercase tracking-[0.4em] mb-6 underline decoration-accent decoration-4 underline-offset-8">Services</h2>
            <h3 className="text-6xl md:text-8xl font-black text-primary dark:text-white tracking-tighter">Premium Real Estate.</h3>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 h-auto">
            {services.map((s, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className={`${s.span} relative group overflow-hidden rounded-[3rem] p-12 glass-morph flex flex-col justify-between min-h-[400px]`}><div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-30 group-hover:opacity-60 transition-opacity duration-700`}></div><div className="relative z-10"><div className="w-24 h-24 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl flex items-center justify-center mb-10 group-hover:rotate-[15deg] transition-transform duration-500">{s.icon}</div><h4 className="text-4xl font-black mb-6 dark:text-white tracking-tighter">{s.title}</h4><p className="text-xl text-gray-500 dark:text-gray-400 font-medium leading-relaxed max-w-sm">{s.desc}</p></div><Link to={s.link} className="relative z-10 w-20 h-20 rounded-full bg-primary text-accent flex items-center justify-center group-hover:w-full group-hover:rounded-2xl transition-all duration-500"><span className="group-hover:block hidden font-black text-lg mr-4">Explore {s.title}</span><ArrowRight size={32} /></Link></motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ & CTA */}
      <section className="py-40 bg-gray-50/30 dark:bg-slate-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
           <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-20"><div className="inline-flex items-center gap-3 py-2 px-6 rounded-full bg-primary/5 dark:bg-white/5 border border-primary/10 dark:border-white/10 mb-8"><HelpCircle className="text-accent" size={20} /><span className="text-primary dark:text-accent font-black text-xs uppercase tracking-[0.2em]">Questions?</span></div><h2 className="text-5xl md:text-7xl font-black text-primary dark:text-white tracking-tighter leading-none italic uppercase">Frequently Asked <br /> <span className="text-accent">Questions.</span></h2></motion.div><div className="space-y-6">{faqs.map((faq, idx) => (<motion.div key={idx} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="glass-morph rounded-[2.5rem] border-white/10 overflow-hidden"><button onClick={() => setActiveFaq(activeFaq === idx ? null : idx)} className="w-full p-8 md:p-10 flex items-center justify-between text-left group"><div><h4 className="text-xl md:text-2xl font-black text-primary dark:text-white tracking-tight group-hover:text-accent transition-colors mb-1">{faq.q}</h4><h5 className="text-accent font-bold text-[10px] uppercase tracking-widest opacity-60">{faq.h}</h5></div><div className={`p-4 rounded-2xl transition-all duration-500 ${activeFaq === idx ? 'bg-accent text-primary rotate-180' : 'bg-primary/5 dark:bg-white/5 text-accent'}`}>{activeFaq === idx ? <Minus size={24} /> : <Plus size={24} />}</div></button><AnimatePresence>{activeFaq === idx && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-10 pb-10"><div className="pt-6 border-t border-gray-100 dark:border-white/5"><p className="text-lg text-gray-500 dark:text-gray-400 font-medium leading-relaxed">{faq.a}</p></div></motion.div>}</AnimatePresence></motion.div>))}</div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-48 relative overflow-hidden bg-white dark:bg-gray-900">
        <div className="absolute inset-0 bg-primary skew-y-6 translate-y-24 scale-125 -z-10 shadow-[0_-50px_100px_rgba(0,0,0,0.1)]"></div>
        <div className="max-w-5xl mx-auto px-4 text-center text-white relative z-10"><motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}><p className="text-accent font-black uppercase tracking-[0.5em] mb-10">Your next home is one call away</p><h2 className="text-7xl md:text-9xl font-black mb-16 tracking-tighter leading-none italic uppercase tracking-[-0.05em]">Stop Searching. <br /> <span className="text-accent underline decoration-white/20">Start Living.</span></h2><div className="flex flex-col items-center gap-10"><div className="flex flex-wrap justify-center gap-10"><motion.a whileHover={{ scale: 1.1, rotate: -2 }} href="tel:9334966607" className="bg-accent text-primary font-black py-8 px-20 rounded-[2rem] text-2xl shadow-3xl hover:bg-white transition-all">9334-9666-07</motion.a><motion.a whileHover={{ scale: 1.1, rotate: 2 }} href="https://wa.me/919934072003" className="bg-white/10 backdrop-blur-xl border-2 border-white/20 text-white font-black py-8 px-20 rounded-[2rem] text-2xl hover:bg-accent hover:text-primary transition-all">WhatsApp Chat</motion.a></div><p className="text-xs text-white/60 font-black uppercase tracking-widest font-hindi">पूरी जानकारी और बेहतरीन डील्स के लिए अभी संपर्क करें।</p></div></motion.div></div>
      </section>
      
      {/* Review Submission Modal */}
      <AnimatePresence>
        {showReviewForm && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowReviewForm(false)} className="absolute inset-0 bg-primary/90 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white dark:bg-slate-900 w-full max-w-xl p-10 rounded-[3rem] shadow-3xl border border-white/10">
              <button onClick={() => setShowReviewForm(false)} className="absolute top-8 right-8 text-gray-400 hover:text-accent"><X size={32}/></button>
              <h3 className="text-4xl font-black text-primary dark:text-white tracking-tighter uppercase italic mb-8">Share Your Experience</h3>
              <form onSubmit={handleReviewSubmit} className="space-y-6">
                <input type="text" placeholder="Your Name" required className="w-full bg-gray-100 dark:bg-white/5 border-none rounded-2xl p-5 dark:text-white font-bold" value={newReview.name} onChange={e => setNewReview({...newReview, name: e.target.value})} />
                <div><p className="text-xs font-black uppercase text-gray-400 mb-3 ml-2">Rating</p><div className="flex gap-3">{[1,2,3,4,5].map(star => (<Star key={star} size={32} onClick={() => setNewReview({...newReview, rating: star})} className={`cursor-pointer transition-all ${newReview.rating >= star ? 'text-accent fill-current' : 'text-gray-200 dark:text-white/10'}`} />))}</div></div>
                <textarea placeholder="Write your review here..." rows={4} required className="w-full bg-gray-100 dark:bg-white/5 border-none rounded-2xl p-5 dark:text-white font-bold" value={newReview.comment} onChange={e => setNewReview({...newReview, comment: e.target.value})} />
                <button type="submit" disabled={submitting} className="w-full btn-shiny !bg-primary !text-accent !py-5 rounded-2xl font-black uppercase tracking-widest text-sm">{submitting ? 'Submitting...' : 'Post Review'}</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
