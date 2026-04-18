import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, ThumbsUp, MapPin, Phone, Calendar, ShieldCheck, Star } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { label: 'Years of Experience', value: '23+', icon: <Calendar size={24} className="text-accent" /> },
    { label: 'Happy Families', value: '5000+', icon: <Users size={24} className="text-accent" /> },
    { label: 'Trusted Partners', value: '50+', icon: <ThumbsUp size={24} className="text-accent" /> },
    { label: 'Local Awards', value: '12', icon: <Award size={24} className="text-accent" /> },
  ];

  return (
    <div className="pt-28 pb-20 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-3 py-2 px-5 rounded-full bg-accent/10 border border-accent/20 text-accent font-black text-[10px] uppercase tracking-[0.3em] mb-8 shadow-lg shadow-accent/20">
              The Founder's Story
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-primary dark:text-white mb-8 leading-[0.9] tracking-tighter uppercase italic">
              Legacy of Trust <br /> in <span className="text-accent text-glow">Patna city.</span>
            </h1>
            <div className="space-y-6 text-gray-600 dark:text-gray-400 font-medium text-lg leading-relaxed">
              <p>
                Founded by <strong className="text-primary dark:text-white">Sanjeev Pandey</strong>, Pandey To-Let Service has been the definitive guide to Patna's real estate for over 23 years. What began as a commitment to help families find safe homes has evolved into the city's most respected rental authority.
              </p>
              <p>
                "<span className="text-primary dark:text-accent italic">हमारा मिशन सिर्फ मकान की चाबियां सौंपना या कागजी कार्रवाई करना नहीं है; हमारा असली मकसद उन परिवारों की खुशियों और सुरक्षा का ख्याल रखना है जो इन दीवारों के बीच अपना घर बसाते हैं।</span>" — संजीव पांडे
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
                 <div className="flex items-center gap-3 bg-white dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-white/5">
                   <ShieldCheck className="text-accent" />
                   <span className="text-xs font-black uppercase tracking-widest text-primary dark:text-white">Personally Verified</span>
                 </div>
                 <div className="flex items-center gap-3 bg-white dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-white/5">
                   <Star className="text-accent" fill="currentColor" />
                   <span className="text-xs font-black uppercase tracking-widest text-primary dark:text-white">Top Rated Mediator</span>
                 </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-5 relative"
          >
            <div className="relative group">
              <div className="rounded-[4rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.4)] border-[16px] border-white dark:border-slate-800 backdrop-blur-xl animate-float relative z-10">
                <img 
                  src="/src/assets/sanjeev-pandey.jpg" 
                  alt="Sanjeev Pandey - Founder" 
                  className="w-full h-auto scale-105 group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent"></div>
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
              <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-primary/20 rounded-full blur-3xl -z-10"></div>
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-12 -right-8 glass-morph p-8 rounded-[2.5rem] shadow-3xl border-white/20 z-20"
              >
                <p className="text-primary dark:text-accent font-black text-2xl tracking-tighter uppercase italic leading-none">Sanjeev Pandey</p>
                <p className="text-gray-500 dark:text-white/50 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Founder & Director</p>
                <div className="flex gap-1 mt-4 text-accent">
                   {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-xl text-center border border-gray-100 dark:border-white/5 hover:border-accent transition-colors group"
            >
              <div className="flex justify-center mb-6 group-hover:scale-110 transition-transform">{stat.icon}</div>
              <p className="text-4xl font-black text-primary dark:text-white mb-1 tracking-tighter">{stat.value}</p>
              <p className="text-gray-500 dark:text-gray-400 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <section className="bg-primary rounded-[4rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.3)] relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-10 md:p-20 text-white bg-primary relative z-10">
              <h2 className="text-5xl font-black mb-12 tracking-tighter uppercase italic leading-none">Connect Directly. <br /><span className="text-accent underline decoration-white/10 underline-offset-8">No Middlemen.</span></h2>
              <ul className="space-y-12">
                <li className="flex items-start gap-6">
                  <div className="bg-white/10 p-5 rounded-2xl text-accent shadow-inner"><MapPin size={28} /></div>
                  <div>
                    <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-accent mb-2">Our Headquarters</h4>
                    <p className="text-white/80 font-black text-2xl tracking-tighter">Thakur Market, Shivpuri, <br /> Patna, Bihar - 800023</p>
                  </div>
                </li>
                <li className="flex items-start gap-6">
                  <div className="bg-white/10 p-5 rounded-2xl text-accent shadow-inner"><Phone size={28} /></div>
                  <div>
                    <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-accent mb-2">Call Sanjeev Pandey</h4>
                    <p className="text-white/80 font-black text-2xl tracking-tighter">+91 9334966607 <br /> +91 9934072003</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-accent flex items-center justify-center p-10 md:p-20 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/5 skew-x-12 translate-x-1/2"></div>
              <div className="text-center relative z-10">
                <h3 className="text-4xl md:text-6xl font-black text-primary mb-8 tracking-tighter uppercase leading-none italic">Need Urgent <br /> Help?</h3>
                <p className="text-primary/70 font-bold text-xl mb-12 max-w-sm mx-auto leading-tight">We are available 24/7 for urgent flat requirements and property consultations.</p>
                <div className="flex flex-col gap-5">
                  <motion.a whileHover={{ scale: 1.05 }} href="tel:9334966607" className="bg-primary text-white font-black py-6 px-12 rounded-3xl shadow-3xl uppercase tracking-widest text-xs">Call Primary Number</motion.a>
                  <motion.a whileHover={{ scale: 1.05 }} href="https://wa.me/919934072003" className="bg-white text-primary font-black py-6 px-12 rounded-3xl shadow-2xl transition-all uppercase tracking-widest text-xs">Chat on WhatsApp</motion.a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-32 mb-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 text-center md:text-left">
            <div>
              <h2 className="text-sm font-black text-accent uppercase tracking-[0.4em] mb-4">Official Location</h2>
              <h3 className="text-5xl md:text-6xl font-black text-primary dark:text-white tracking-tighter uppercase italic leading-none">Find our <span className="text-accent text-glow">Office.</span></h3>
            </div>
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="https://maps.app.goo.gl/1b9TQgqmX7beMajc7" target="_blank" rel="noopener noreferrer" className="btn-shiny !bg-accent !text-primary flex items-center gap-3 shadow-accent/20 !px-10 !py-5 uppercase text-xs tracking-widest">
              <MapPin size={20} /> Get Directions
            </motion.a>
          </div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-[4rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.3)] border-[16px] border-white dark:border-slate-800 h-[600px] relative group">
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14391.20330656627!2d85.1118129!3d25.611598!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed59db234190c3%3A0xc07a82c3c6f8510!2sPandey%20To%20Let%20Service!5e0!3m2!1sen!2sin!4v1713282436855!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Pandey To Let Service Location" className="grayscale-[0.1] contrast-[1.1] dark:opacity-80"></iframe>
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <div className="bg-white dark:bg-gray-900 px-10 py-5 rounded-[2rem] shadow-3xl font-black text-primary dark:text-accent uppercase tracking-[0.2em] text-sm scale-90 group-hover:scale-100 transition-transform">Click "Get Directions" above to navigate</div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default About;
