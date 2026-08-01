// ============================================
// FoodCard — Premium photo-first card with
// Chef Special & Popular ribbons, animated
// price badge, smooth hover effects
// ============================================
import { useState } from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, Award, Flame } from 'lucide-react';

/* ── tag → pill colour ── */
const tagPill = {
  Popular:       'bg-blue-500/90',
  Bestseller:    'bg-orange-500/90',
  Premium:       'bg-amber-500/90',
  'Must Try':    'bg-red-500/90',
  Sweet:         'bg-pink-500/90',
  'Full Meal':   'bg-emerald-500/90',
  Value:         'bg-teal-500/90',
  Combo:         'bg-violet-500/90',
  'Chef Special':'bg-rose-500/90',
};

/* ── which tags show extra icon decorations ── */
const chefTags    = new Set(['Chef Special', 'Premium']);
const popularTags = new Set(['Bestseller', 'Popular', 'Must Try']);

export default function FoodCard({ item, index }) {
  const [imgError, setImgError] = useState(false);
  const isChef    = chefTags.has(item.tag);
  const isPopular = popularTags.has(item.tag);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.045, 0.35) }}
      whileHover={{ y: -7, transition: { duration: 0.22 } }}
      className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden
                 shadow-sm hover:shadow-2xl hover:shadow-orange-100/70
                 dark:hover:shadow-orange-900/25
                 border border-gray-100 dark:border-gray-700
                 hover:border-orange-200 dark:hover:border-orange-700
                 transition-all duration-300 cursor-default flex flex-col"
    >
      {/* ── Popular ribbon (top-left corner fold) ── */}
      {isPopular && (
        <div className="absolute top-0 left-0 z-20">
          <div className="relative w-16 h-16 overflow-hidden">
            <div className="absolute -top-1 -left-1 w-[72px] h-[72px] bg-orange-500 rotate-45 origin-bottom-right" />
            <Flame size={12} className="absolute top-2 left-2 text-white z-10" />
          </div>
        </div>
      )}

      {/* ── Chef's Special badge (top-right) ── */}
      {isChef && (
        <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1 bg-rose-600 text-white text-[9px] font-bold px-2 py-1 rounded-full shadow-lg">
          <Award size={9} />
          Chef's Special
        </div>
      )}

      {/* ── Photo ── */}
      <div className="relative h-44 sm:h-48 overflow-hidden bg-orange-50 dark:bg-gray-700 flex-shrink-0">
        {!imgError ? (
          <img
            src={item.photo}
            alt={item.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-orange-100 to-amber-100
                          dark:from-orange-900/30 dark:to-amber-900/30
                          flex items-center justify-center">
            <span className="text-5xl opacity-50">🍽️</span>
          </div>
        )}

        {/* Bottom scrim for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />

        {/* Tag badge (only if not chef/popular — those have their own UI) */}
        {item.tag && !isChef && !isPopular && (
          <span className={`absolute top-2.5 left-2.5 z-10 ${tagPill[item.tag] || 'bg-gray-500/90'} text-white text-[9px] font-bold tracking-wide px-2 py-0.5 rounded-full shadow backdrop-blur-sm`}>
            {item.tag}
          </span>
        )}

        {/* ── Price badge (bottom-right, overlapping seam) ── */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: Math.min(index * 0.045, 0.35) + 0.15 }}
          className="absolute bottom-2.5 right-2.5 z-10 flex items-center gap-0.5
                     bg-white dark:bg-gray-900 text-orange-600 dark:text-orange-400
                     font-extrabold text-sm px-2.5 py-1 rounded-full shadow-xl
                     border border-orange-100 dark:border-orange-800/40
                     group-hover:bg-orange-500 group-hover:text-white
                     group-hover:border-orange-500
                     transition-colors duration-300"
        >
          <IndianRupee size={11} strokeWidth={2.5} />
          {item.price}
        </motion.div>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col flex-1 p-3.5 sm:p-4">
        <h4 className="font-bold text-gray-900 dark:text-white text-[14px] sm:text-[15px]
                       leading-snug mb-1 group-hover:text-orange-600
                       dark:group-hover:text-orange-400 transition-colors duration-200">
          {item.name}
        </h4>
        <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 flex-1">
          {item.description}
        </p>

        {/* Footer row */}
        <div className="mt-3 pt-2.5 border-t border-gray-100 dark:border-gray-700/60
                        flex items-center justify-between">
          <span className="text-[10px] text-gray-400 dark:text-gray-500 italic">
            Freshly made
          </span>
          <motion.span
            initial={{ opacity: 0, x: 6 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="text-[10px] font-semibold text-orange-500
                       opacity-0 group-hover:opacity-100
                       transition-opacity duration-200 tracking-wide"
          >
            Order now →
          </motion.span>
        </div>
      </div>

      {/* Hover glow overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/4
                      to-transparent opacity-0 group-hover:opacity-100
                      transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
}
