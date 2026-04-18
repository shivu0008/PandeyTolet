import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Info, FileText, AlertCircle, Phone, MessageCircle } from 'lucide-react';

const Terms: React.FC = () => {
  return (
    <div className="pt-32 pb-20 bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <ShieldCheck className="text-accent" size={18} />
            <span className="text-accent font-black text-xs uppercase tracking-widest">Legal Transparency</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-primary dark:text-white tracking-tighter mb-4">
            Terms & Conditions <br /><br />
            <span className="text-accent">नियम एवं शर्तें</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium italic">
            Last updated: April 2026 • Pandey To-Let Service
          </p>
        </motion.div>

        <div className="space-y-16 text-gray-700 dark:text-gray-300">
          {/* Section 1 */}
          <section className="glass-morph p-8 md:p-12 rounded-[2.5rem] border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent opacity-5 rounded-full -mr-10 -mt-10"></div>
            <div className="flex items-center gap-4 mb-10">
              <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-accent shadow-xl">
                <FileText size={28} />
              </div>
              <h2 className="text-3xl font-black tracking-tighter dark:text-white">1. Registration Charges / पंजीकरण शुल्क</h2>
            </div>
            
            <div className="space-y-12">
              <div className="border-l-4 border-accent pl-8 py-2">
                <h3 className="text-2xl font-black mb-4 text-primary dark:text-white underline decoration-accent/30 underline-offset-8">(a) Residential (Flat/House Rent) / मकान किराया</h3>
                <ul className="space-y-6 font-semibold">
                  <li>
                    <p className="text-primary dark:text-white">Property registration is mandatory before visit.</p>
                    <p className="text-accent text-sm mt-1">प्रॉपर्टी दिखाने से पहले रजिस्ट्रेशन अनिवार्य है।</p>
                  </li>
                  <li>
                    <p className="text-primary dark:text-white">Registration Fee: ₹301/- (Non-refundable)</p>
                    <p className="text-accent text-sm mt-1">रजिस्ट्रेशन शुल्क: ₹301/- (वापसी योग्य नहीं)</p>
                  </li>
                  <li>
                    <p className="text-primary dark:text-white">After finalizing: 50% of one month's rent as commission.</p>
                    <p className="text-accent text-sm mt-1">मकान फाइनल होने पर: एक महीने के किराए का 50% कमीशन।</p>
                  </li>
                  <li>
                    <p className="text-primary dark:text-white">Registration valid for 5 days.</p>
                    <p className="text-accent text-sm mt-1">रजिस्ट्रेशन केवल 5 दिनों के लिए मान्य होगा।</p>
                  </li>
                </ul>
              </div>

              <div className="border-l-4 border-primary pl-8 py-2">
                <h3 className="text-2xl font-black mb-4 text-primary dark:text-white underline decoration-primary/30 underline-offset-8">(b) Commercial Property / व्यावसायिक प्रॉपर्टी</h3>
                <ul className="space-y-6 font-semibold">
                  <li>
                    <p className="text-primary dark:text-white">Registration Fee: ₹501/-</p>
                    <p className="text-accent text-sm mt-1">रजिस्ट्रेशन शुल्क: ₹501/-</p>
                  </li>
                  <li>
                    <p className="text-primary dark:text-white">Commission: 1 month rent</p>
                    <p className="text-accent text-sm mt-1">कमीशन: 1 महीने का किराया</p>
                  </li>
                </ul>
              </div>

              <div className="border-l-4 border-accent pl-8 py-2">
                <h3 className="text-2xl font-black mb-4 text-primary dark:text-white underline decoration-accent/30 underline-offset-8">(c) Buy & Sell Property / खरीद-बिक्री</h3>
                <ul className="space-y-6 font-semibold">
                  <li>
                    <p className="text-primary dark:text-white">Commission: 1% at agreement + 1% at final payment (Total 2%)</p>
                    <p className="text-accent text-sm mt-1">कमीशन: एग्रीमेंट पर 1% + फाइनल पेमेंट पर 1% (कुल 2%)</p>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2 & 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <section className="glass-morph p-10 rounded-[2.5rem] border-white/10">
              <h3 className="text-2xl font-black mb-8 flex items-center gap-3 dark:text-white">
                <AlertCircle className="text-accent" /> 2. Important Rules
              </h3>
              <ul className="space-y-6 font-bold text-sm uppercase tracking-wider">
                <li>
                  <p className="text-red-500">❌ Registration fee is non-refundable.</p>
                  <p className="text-gray-400 mt-1">रजिस्ट्रेशन शुल्क वापस नहीं होगा।</p>
                </li>
                <li>
                  <p className="dark:text-white">⚠️ Cannot be adjusted in rent/commission.</p>
                  <p className="text-gray-400 mt-1">इसे किराया या कमीशन में समायोजित नहीं किया जाएगा।</p>
                </li>
                <li>
                  <p className="text-red-500">❌ Advance payment is non-refundable.</p>
                  <p className="text-gray-400 mt-1">अग्रिम भुगतान वापस नहीं होगा।</p>
                </li>
              </ul>
            </section>
            
            <section className="glass-morph p-10 rounded-[2.5rem] border-white/10">
              <h3 className="text-2xl font-black mb-8 flex items-center gap-3 dark:text-white">
                <Info className="text-accent" /> 3. Notice Rule
              </h3>
              <div className="font-bold">
                <p className="text-xl text-primary dark:text-white mb-2 leading-tight">Tenant must inform 1 month before vacating the property.</p>
                <p className="text-accent">किरायेदार को घर छोड़ने से 1 महीने पहले सूचना देनी होगी।</p>
              </div>
            </section>
          </div>

          {/* Liability Section */}
          <section className="bg-primary text-white p-12 md:p-20 rounded-[3.5rem] shadow-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent opacity-5 rounded-full -mr-32 -mt-32"></div>
            <h2 className="text-4xl font-black tracking-tighter mb-10 italic">5. Limitation of Liability / जिम्मेदारी सीमा</h2>
            <p className="text-2xl font-black text-accent mb-8 italic">
              Pandey To-Let Service is only a mediator. <br />
              <span className="text-white/60 text-lg">केवल एक मध्यस्थ है।</span>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-black uppercase tracking-[0.2em] text-white/50">
              <p className="flex items-center gap-2"><span className="w-2 h-2 bg-accent rounded-full"></span> Property disputes / प्रॉपर्टी विवाद</p>
              <p className="flex items-center gap-2"><span className="w-2 h-2 bg-accent rounded-full"></span> Payment issues / भुगतान विवाद</p>
              <p className="flex items-center gap-2"><span className="w-2 h-2 bg-accent rounded-full"></span> Property condition / प्रॉपर्टी की स्थिति</p>
              <p className="flex items-center gap-2"><span className="w-2 h-2 bg-accent rounded-full"></span> Transport damage / परिवहन नुकसान</p>
            </div>
          </section>

          {/* Footer Card */}
          <div className="text-center bg-gray-50 dark:bg-gray-800/30 p-16 rounded-[3.5rem] border-2 border-dashed border-gray-200 dark:border-gray-700">
            <p className="text-3xl font-black text-primary dark:text-white mb-10 tracking-tighter leading-tight">
              By registering or using our service, <br /> you agree to all terms. <br />
              <span className="text-accent mt-4 block">हमारी सेवा का उपयोग करने पर आप सभी नियमों से सहमत हैं।</span>
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              <div className="flex items-center gap-3 text-primary dark:text-white font-black bg-white dark:bg-gray-800 px-6 py-3 rounded-2xl shadow-sm">
                <Phone size={20} className="text-accent" /> 9334966607
              </div>
              <div className="flex items-center gap-3 text-primary dark:text-white font-black bg-white dark:bg-gray-800 px-6 py-3 rounded-2xl shadow-sm">
                <MessageCircle size={20} className="text-accent" /> 9934072003
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
