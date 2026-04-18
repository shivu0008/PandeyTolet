import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, CheckCircle, MapPin, X } from 'lucide-react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase/config';

const ActivityNotification: React.FC = () => {
  const [activities, setActivities] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    fetchRecentActivity();
  }, []);

  const fetchRecentActivity = async () => {
    try {
      const q = query(collection(db, 'properties'), orderBy('createdAt', 'desc'), limit(5));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setActivities(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (activities.length === 0) return;

    const interval = setInterval(() => {
      setIsVisible(true);
      
      // Hide after 6 seconds
      setTimeout(() => {
        setIsVisible(false);
        // Move to next activity after it slides out
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % activities.length);
        }, 500);
      }, 6000);

    }, 15000); // Repeat every 15 seconds

    return () => clearInterval(interval);
  }, [activities]);

  if (activities.length === 0) return null;

  const current = activities[currentIndex];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          className="fixed bottom-8 left-8 z-[150] max-w-sm hidden md:block"
        >
          <div className="glass-morph p-5 rounded-[2rem] border-white/20 shadow-3xl relative flex items-center gap-4 pr-12">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${current.status === 'Available' ? 'bg-accent/20 text-accent' : 'bg-green-500/20 text-green-500'}`}>
              {current.status === 'Available' ? <Zap size={24} /> : <CheckCircle size={24} />}
            </div>
            
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent mb-1">
                {current.status === 'Available' ? 'New Listing Added' : 'Just Rented Out'}
              </p>
              <h4 className="text-sm font-black text-primary dark:text-white uppercase italic tracking-tight leading-none mb-1">
                {current.title}
              </h4>
              <div className="flex items-center gap-1 text-gray-400 text-[10px] font-bold uppercase">
                <MapPin size={10} /> {current.location}
              </div>
            </div>

            <button 
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ActivityNotification;
