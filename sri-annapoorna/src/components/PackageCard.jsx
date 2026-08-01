// ============================================
// PackageCard — Premium animated catering card
// ============================================
import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles, Users } from 'lucide-react';

export default function PackageCard({ pkg, index }) {
  const handleEnquire = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.07, 0.4) }}
      whileHover={{ y: -8, transition: { duration: 0.25 } }}
      className={`relative rounded-2xl overflow-hidden flex flex-col transition-all duration-300 ${
        pkg.highlight
          ? 'bg-gradient-to-b from-amber-800 via-amber-900 to-amber-950 shadow-2xl shadow-orange-500/25 border-2 border-orange-400/60'
          : 'bg-white dark:bg-gray-800 shadow-md hover:shadow-2xl hover:shadow-orange-100/50 dark:hover:shadow-orange-900/20 border border-gray-100 dark:border-gray-700 hover:border-orange-200 dark:hover:border-orange-700'
      }`}
    >
      {/* Glow effect on highlighted card */}
      {pkg.highlight && (
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-orange-400/30 via-transparent to-transparent pointer-events-none" />
      )}

      {/* Tag badge */}
      {pkg.tag && (
        <div className={`absolute top-0 right-0 px-3 py-1.5 text-[11px] font-bold tracking-wide rounded-bl-2xl flex items-center gap-1 z-10 ${
          pkg.highlight
            ? 'bg-orange-500 text-white shadow-lg'
            : 'bg-orange-50 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400'
        }`}>
          <Sparkles size={9} />
          {pkg.tag}
        </div>
      )}

      <div className="p-5 sm:p-6 flex flex-col flex-1">
        {/* Price block */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <Users size={13} className={pkg.highlight ? 'text-orange-300' : 'text-gray-400'} />
            <p className={`text-xs font-medium ${pkg.highlight ? 'text-orange-300' : 'text-gray-400 dark:text-gray-500'}`}>
              {pkg.subtitle}
            </p>
          </div>
          <p
            className={`text-3xl sm:text-4xl font-extrabold leading-none mb-1 ${
              pkg.highlight ? 'text-white' : 'text-gray-900 dark:text-white'
            }`}
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            {pkg.label}
          </p>
          <h3 className={`text-sm font-semibold ${pkg.highlight ? 'text-orange-200' : 'text-orange-600 dark:text-orange-400'}`}>
            {pkg.title}
          </h3>
        </div>

        {/* Animated gold divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.07 }}
          className={`h-px mb-4 origin-left ${
            pkg.highlight
              ? 'bg-gradient-to-r from-orange-400/60 via-amber-300/80 to-transparent'
              : 'bg-gradient-to-r from-orange-200 to-transparent dark:from-gray-700'
          }`}
        />

        {/* Items list */}
        <ul className="space-y-2 flex-1 mb-5">
          {pkg.items.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07 + i * 0.02 }}
              className="flex items-start gap-2"
            >
              <CheckCircle2
                size={14}
                className={`flex-shrink-0 mt-0.5 ${pkg.highlight ? 'text-orange-400' : 'text-orange-500'}`}
              />
              <span className={`text-xs leading-relaxed ${
                pkg.highlight ? 'text-white/80' : 'text-gray-600 dark:text-gray-300'
              }`}>
                {item}
              </span>
            </motion.li>
          ))}
        </ul>

        {/* CTA */}
        <motion.button
          onClick={handleEnquire}
          whileHover={{ scale: 1.03, boxShadow: pkg.highlight ? '0 10px 30px rgba(249,115,22,0.5)' : '0 8px 20px rgba(249,115,22,0.2)' }}
          whileTap={{ scale: 0.97 }}
          className={`w-full py-3 rounded-xl font-semibold text-sm tracking-wide transition-all duration-200 ${
            pkg.highlight
              ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30'
              : 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/40 border border-orange-200 dark:border-orange-800'
          }`}
        >
          Enquire Now →
        </motion.button>
      </div>
    </motion.div>
  );
}
