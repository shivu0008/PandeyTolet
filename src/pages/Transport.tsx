import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Car, Package, Phone, Clock, Shield, IndianRupee } from 'lucide-react';

const Transport: React.FC = () => {
  const services = [
    {
      title: 'Tempo Service',
      desc: 'Ideal for local shifting of furniture, appliances and household goods within Patna.',
      icon: <Truck size={32} className="text-accent" />,
      price: 'Starting ₹800',
      features: ['Up to 1.5 Ton', 'Quick availability', 'Experienced Driver']
    },
    {
      title: 'Car Rental / Goods Car',
      desc: 'Premium cars for travel or small goods transport with safety and comfort.',
      icon: <Car size={32} className="text-accent" />,
      price: 'Starting ₹1200',
      features: ['A/C & Non-A/C', 'Inter-city / Local', 'Well maintained']
    },
    {
      title: 'Goods Transport',
      desc: 'Heavy duty transport solutions for commercial goods and large scale shifting.',
      icon: <Package size={32} className="text-accent" />,
      price: 'Request Quote',
      features: ['Safe handling', 'Scheduled pickups', 'Bulk transport']
    }
  ];

  return (
    <div className="pt-28 pb-20 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-primary dark:text-white mb-4"
          >
            Reliable Transport Solutions
          </motion.h1>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            className="w-24 h-1.5 bg-accent mx-auto rounded-full mb-6"
          ></motion.div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Need to shift your flat? Or looking for a commercial vehicle? Pandey To-Let provides the most reliable transport services in Patna.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center glow-effect"
            >
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 dark:text-white">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{service.desc}</p>
              
              <div className="bg-primary/5 dark:bg-gray-700 w-full py-4 rounded-xl mb-6">
                <div className="flex items-center justify-center gap-1 text-primary dark:text-accent font-bold text-xl">
                  <IndianRupee size={20} />
                  {service.price}
                </div>
              </div>

              <ul className="space-y-3 mb-8 text-left w-full">
                {service.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Clock size={14} className="text-accent" />
                    {f}
                  </li>
                ))}
              </ul>

              <a 
                href="tel:9934072003"
                className="mt-auto w-full btn-primary flex items-center justify-center gap-2"
              >
                <Phone size={18} />
                Book Now
              </a>
            </motion.div>
          ))}
        </div>

        {/* Why choose us for transport */}
        <section className="bg-primary dark:bg-gray-800 rounded-3xl p-8 md:p-16 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why choose our Transport Services?</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <Shield className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Safe Handling</h4>
                    <p className="text-white/70 text-sm">We treat your goods like our own. Professional packing and handling included.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <Clock className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">On-Time Delivery</h4>
                    <p className="text-white/70 text-sm">Punctuality is our middle name. We respect your time and schedule.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center lg:text-right">
              <h3 className="text-2xl font-bold mb-6">Direct Booking Support</h3>
              <p className="mb-8 text-white/80">Have a specific requirement? Chat with Sanjeev Pandey directly on WhatsApp for an instant quote.</p>
              <div className="flex flex-wrap justify-center lg:justify-end gap-4">
                <a href="tel:9934072003" className="bg-white text-primary font-bold py-4 px-8 rounded-xl shadow-2xl hover:bg-gray-100 transition-all">
                  Call 9934072003
                </a>
                <a href="https://wa.me/919934072003" className="bg-[#25D366] text-white font-bold py-4 px-8 rounded-xl shadow-2xl hover:bg-[#128C7E] transition-all">
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Transport;
