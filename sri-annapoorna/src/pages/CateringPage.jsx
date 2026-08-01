// ============================================
// Catering Page — Hero + Packages + Why Choose Us
// ============================================
import { motion } from 'framer-motion';
import {
  Leaf, ChefHat, Clock, IndianRupee,
  UtensilsCrossed, ShieldCheck, Phone, Star
} from 'lucide-react';
import PackageCard from '../components/PackageCard';
import { cateringPackages, whyChooseUs } from '../data/cateringData';

const IconMap = { Leaf, ChefHat, Clock, IndianRupee, UtensilsCrossed, ShieldCheck };

/* Animated section divider */
function Divider() {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
      className="w-full h-px bg-gradient-to-r from-transparent via-orange-300 dark:via-orange-700 to-transparent my-2"
    />
  );
}

export default function CateringPage() {
  return (
    <section id="catering" className="bg-white dark:bg-gray-900 overflow-hidden">

      {/* ── Hero Banner ──────────────────────── */}
      <div className="relative min-h-[55vh] sm:min-h-[65vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1555244162-803834f70033?w=1920&q=80"
            alt="Catering event"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-950/40 via-transparent to-transparent" />
        </div>

        {/* Floating stats strip */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-5 flex flex-wrap justify-center gap-6 sm:gap-12">
            {[
              { value: '500+', label: 'Events Served' },
              { value: '15+',  label: 'Years Experience' },
              { value: '4.9',  label: 'Average Rating', icon: Star },
            ].map(({ value, label, icon: Icon }) => (
              <div key={label} className="flex items-center gap-2 text-white/80">
                {Icon && <Icon size={14} className="text-amber-400 fill-amber-400" />}
                <div>
                  <p className="font-bold text-white text-base leading-none">{value}</p>
                  <p className="text-white/50 text-xs">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-3xl mx-auto pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/20 border border-orange-400/40 backdrop-blur-sm mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
            <span className="text-orange-300 text-xs font-medium tracking-widest uppercase">
              Premium Catering
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 leading-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Weddings, Events &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
              Corporate Functions
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-white/70 text-lg mb-8"
          >
            Customizable packages for every budget — from intimate gatherings to grand celebrations
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <motion.a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              whileHover={{ scale: 1.05, boxShadow: '0 16px 40px rgba(249,115,22,0.45)' }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl shadow-xl shadow-orange-500/30 transition-all"
            >
              <Phone size={16} />
              Get a Free Quote
            </motion.a>
            <motion.a
              href="#packages"
              onClick={(e) => { e.preventDefault(); document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' }); }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-all"
            >
              View Packages
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* ── Packages ─────────────────────────── */}
      <div id="packages" className="bg-gray-50 dark:bg-gray-950 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-12">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-orange-500 text-sm font-semibold tracking-widest uppercase mb-2"
            >
              Our Packages
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Premium Catering Packages
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto"
            >
              Transparent pricing, no hidden charges. Pick what suits your event and guest count.
            </motion.p>
          </div>

          <Divider />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {cateringPackages.map((pkg, idx) => (
              <PackageCard key={pkg.id} pkg={pkg} index={idx} />
            ))}
          </div>

          {/* Custom note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-10 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/10 border border-orange-100 dark:border-orange-800 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left"
          >
            <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
              <UtensilsCrossed size={18} className="text-orange-500" />
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm flex-1">
              <strong>Need a custom package?</strong> We'll design a bespoke menu tailored to your event size, dietary requirements, and budget.{' '}
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="text-orange-600 dark:text-orange-400 font-semibold hover:underline"
              >
                Contact us →
              </a>
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Why Choose Us ────────────────────── */}
      <div className="bg-white dark:bg-gray-900 py-16 sm:py-20 relative overflow-hidden">
        {/* Decorative background accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-50 dark:bg-orange-900/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-50 dark:bg-amber-900/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-orange-500 text-sm font-semibold tracking-widest uppercase mb-2"
            >
              Why Us
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Why Choose Our Catering?
            </motion.h2>
            <Divider />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {whyChooseUs.map((item, idx) => {
              const Icon = IconMap[item.icon];
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  whileHover={{ y: -5, boxShadow: '0 16px 40px rgba(249,115,22,0.1)' }}
                  className="group relative flex gap-4 p-5 sm:p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-orange-200 dark:hover:border-orange-700 transition-all duration-300 overflow-hidden"
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-md shadow-orange-500/25 group-hover:scale-110 transition-transform duration-300">
                    {Icon && <Icon size={20} className="text-white" />}
                  </div>
                  <div className="relative z-10">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-1.5 text-base">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
