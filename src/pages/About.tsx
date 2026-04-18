import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, ThumbsUp, MapPin, Phone, Calendar, ShieldCheck, Star } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { label: 'Years of Experience', value: '23+', icon: <Calendar size={20} className="text-accent" /> },
    { label: 'Happy Families', value: '5000+', icon: <Users size={20} className="text-accent" /> },
    { label: 'Trusted Partners', value: '50+', icon: <ThumbsUp size={20} className="text-accent" /> },
    { label: 'Local Awards', value: '12', icon: <Award size={20} className="text-accent" /> },
  ];

  return (
    <div className="pt-24 pb-16 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro Section - Compacted */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-accent/10 border border-accent/20 text-accent font-black text-[8px] uppercase tracking-[0.3em] mb-6 shadow-sm">
              The Founder's Story
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-primary dark:text-white mb-6 leading-tight tracking-tight uppercase italic">
              Legacy of Trust <br /> in <span className="text-accent text-glow">Patna city.</span>
            </h1>
            <div className="space-y-5 text-gray-600 dark:text-gray-400 font-medium text-base leading-relaxed">
              <p>
                Founded by <strong className="text-primary dark:text-white">Sanjeev Pandey</strong>, Pandey To-Let Service has been the definitive guide to Patna's real estate for over 23 years. What began as a commitment to help families find safe homes has evolved into the city's most respected rental authority.
              </p>
              <p className="font-hindi text-lg">
                "<span className="text-primary dark:text-accent italic">हमारा मिशन सिर्फ मकान की चाबियां सौंपना या कागजी कार्रवाई करना नहीं है; हमारा असली मकसद उन परिवारों की खुशियों और सुरक्षा का ख्याल रखना है जो इन दीवारों के बीच अपना घर बसाते हैं।</span>" — संजीव पांडे
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
                 <div className="flex items-center gap-2 bg-white dark:bg-white/5 p-3.5 rounded-xl border border-gray-100 dark:border-white/5">
                   <ShieldCheck size={18} className="text-accent" />
                   <span className="text-[10px] font-black uppercase tracking-widest text-primary dark:text-white">Personally Verified</span>
                 </div>
                 <div className="flex items-center gap-2 bg-white dark:bg-white/5 p-3.5 rounded-xl border border-gray-100 dark:border-white/5">
                   <Star size={18} className="text-accent" fill="currentColor" />
                   <span className="text-[10px] font-black uppercase tracking-widest text-primary dark:text-white">Top Rated Mediator</span>
                 </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-5 relative"
          >
            <div className="relative group max-w-sm mx-auto lg:max-w-none">
              <div className="rounded-[3rem] overflow-hidden shadow-3xl border-[12px] border-white dark:border-slate-800 backdrop-blur-xl animate-float relative z-10">
                <img 
                  src="/sanjeev-pandey.jpg" 
                  alt="Sanjeev Pandey - Founder" 
                  className="w-full h-auto scale-105 group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent"></div>
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-primary/20 rounded-full blur-3xl -z-10"></div>
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-8 -right-4 glass-morph p-6 rounded-[2rem] shadow-2xl border-white/20 z-20"
              >
                <p className="text-primary dark:text-accent font-black text-xl tracking-tighter uppercase italic leading-none">Sanjeev Pandey</p>
                <p className="text-gray-500 dark:text-white/50 text-[9px] font-black uppercase tracking-[0.3em] mt-1.5">Founder & Director</p>
                <div className="flex gap-1 mt-3 text-accent">
                   {[...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" />)}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-xl text-center border border-gray-100 dark:border-white/5 transition-all group"
            >
              <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform">{stat.icon}</div>
              <p className="text-3xl font-black text-primary dark:text-white mb-1 tracking-tighter">{stat.value}</p>
              <p className="text-gray-500 dark:text-gray-400 text-[9px] font-black uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <section className="bg-primary rounded-[3.5rem] overflow-hidden shadow-3xl relative">
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-10 md:p-16 text-white bg-primary relative z-10">
              <h2 className="text-4xl font-black mb-10 tracking-tight uppercase italic leading-none">Connect Directly. <br /><span className="text-accent underline decoration-white/10 underline-offset-8">No Middlemen.</span></h2>
              <ul className="space-y-10">
                <li className="flex items-start gap-5">
                  <div className="bg-white/10 p-4 rounded-2xl text-accent shadow-inner"><MapPin size={24} /></div>
                  <div>
                    <h4 className="font-black text-[9px] uppercase tracking-[0.3em] text-accent mb-1.5">Our Headquarters</h4>
                    <p className="text-white/80 font-black text-xl tracking-tight">Thakur Market, Shivpuri, <br /> Patna, Bihar - 800023</p>
                  </div>
                </li>
                <li className="flex items-start gap-5">
                  <div className="bg-white/10 p-4 rounded-2xl text-accent shadow-inner"><Phone size={24} /></div>
                  <div>
                    <h4 className="font-black text-[9px] uppercase tracking-[0.3em] text-accent mb-1.5">Call Sanjeev Pandey</h4>
                    <p className="text-white/80 font-black text-xl tracking-tight">+91 9334966607 <br /> +91 9934072003</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-accent flex items-center justify-center p-10 md:p-16 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/5 skew-x-12 translate-x-1/2"></div>
              <div className="text-center relative z-10 text-primary">
                <h3 className="text-4xl md:text-5xl font-black mb-6 tracking-tight uppercase leading-none italic">Need Urgent <br /> Help?</h3>
                <p className="text-primary/70 font-bold text-lg mb-10 max-w-xs mx-auto leading-tight">We are available 24/7 for urgent flat requirements and consultations.</p>
                <div className="flex flex-col gap-4">
                  <motion.a whileHover={{ scale: 1.05 }} href="tel:9334966607" className="bg-primary text-white font-black py-4 px-10 rounded-[2rem] shadow-2xl uppercase tracking-widest text-[10px]">Call Primary Number</motion.a>
                  <motion.a whileHover={{ scale: 1.05 }} href="https://wa.me/919934072003" className="bg-white text-primary font-black py-4 px-10 rounded-[2rem] shadow-xl transition-all uppercase tracking-widest text-[10px]">Chat on WhatsApp</motion.a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-24 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 text-center md:text-left">
            <div>
              <h2 className="text-[10px] font-black text-accent uppercase tracking-[0.4em] mb-2">Official Location</h2>
              <h3 className="text-4xl md:text-5xl font-black text-primary dark:text-white tracking-tight uppercase italic leading-none">Find our <span className="text-accent text-glow">Office.</span></h3>
            </div>
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="https://maps.app.goo.gl/1b9TQgqmX7beMajc7" target="_blank" rel="noopener noreferrer" className="btn-shiny !bg-accent !text-primary flex items-center gap-3 shadow-accent/20 !px-8 !py-4 uppercase text-[10px] tracking-widest">
              <MapPin size={18} /> Get Directions
            </motion.a>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-[3rem] overflow-hidden shadow-3xl border-[12px] border-white dark:border-slate-800 h-[500px] relative group">
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14391.20330656627!2d85.1118129!3d25.611598!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed59db234190c3%3A0xc07a82c3c6f8510!2sPandey%20To%20Let%20Service!5e0!3m2!1sen!2sin!4v1713282436855!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Pandey To Let Service Location" className="grayscale-[0.1] contrast-[1.1] dark:opacity-80"></iframe>
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <div className="bg-white dark:bg-gray-900 px-8 py-4 rounded-2xl shadow-3xl font-black text-primary dark:text-accent uppercase tracking-[0.2em] text-xs scale-90 group-hover:scale-100 transition-transform">Click "Get Directions" above to navigate</div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default About;
