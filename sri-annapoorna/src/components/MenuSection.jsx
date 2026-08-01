// ============================================
// MenuSection — Premium magazine-style header
// + responsive photo card grid
// ============================================
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Clock, Utensils } from 'lucide-react';
import FoodCard from './FoodCard';

const categoryMeta = {
  Breakfast: {
    grad:    'from-amber-500 to-orange-500',
    bgLight: 'from-amber-50 to-orange-50',
    bgDark:  'dark:from-amber-950/50 dark:to-orange-950/50',
    border:  'border-amber-200 dark:border-amber-800/60',
    time:    '6 AM – 11 AM',
    tagline: 'Start your day the South Indian way',
    accentBg:'bg-amber-100 dark:bg-amber-900/30',
    accentTx:'text-amber-700 dark:text-amber-300',
  },
  Lunch: {
    grad:    'from-orange-500 to-red-500',
    bgLight: 'from-orange-50 to-red-50',
    bgDark:  'dark:from-orange-950/50 dark:to-red-950/50',
    border:  'border-orange-200 dark:border-orange-800/60',
    time:    '11 AM – 4 PM',
    tagline: 'Wholesome meals, always made fresh',
    accentBg:'bg-orange-100 dark:bg-orange-900/30',
    accentTx:'text-orange-700 dark:text-orange-300',
  },
  Dinner: {
    grad:    'from-rose-500 to-amber-500',
    bgLight: 'from-rose-50 to-amber-50',
    bgDark:  'dark:from-rose-950/50 dark:to-amber-950/50',
    border:  'border-rose-200 dark:border-rose-800/60',
    time:    '6 PM – 10 PM',
    tagline: 'Evening comfort food done right',
    accentBg:'bg-rose-100 dark:bg-rose-900/30',
    accentTx:'text-rose-700 dark:text-rose-300',
  },
};

export default function MenuSection({ category, icon, items, imageSrc }) {
  const [showAll, setShowAll] = useState(false);
  const meta    = categoryMeta[category] || categoryMeta.Breakfast;
  const INITIAL = 8;
  const visible  = showAll ? items : items.slice(0, INITIAL);
  const hasMore  = items.length > INITIAL;

  return (
    <div className="mb-20 sm:mb-24">

      {/* ── Header card ── */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={`relative rounded-3xl overflow-hidden
                    bg-gradient-to-br ${meta.bgLight} ${meta.bgDark}
                    border ${meta.border} mb-10 shadow-sm`}
      >
        {/* Blurred background photo */}
        {imageSrc && (
          <div className="absolute inset-0 z-0">
            <img src={imageSrc} alt="" aria-hidden="true"
              className="w-full h-full object-cover opacity-[0.12] dark:opacity-[0.07] blur-sm scale-110"
              loading="lazy" />
          </div>
        )}

        {/* Gold top accent line */}
        <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${meta.grad} opacity-60`} />

        <div className="relative z-10 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">

            {/* Left — icon + title block */}
            <div className="flex items-center gap-4 sm:gap-5">
              <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl
                              bg-gradient-to-br ${meta.grad}
                              flex items-center justify-center
                              shadow-xl flex-shrink-0 text-3xl sm:text-4xl
                              border-2 border-white/20`}>
                {icon}
              </div>

              <div>
                {/* Time chip */}
                <div className={`inline-flex items-center gap-1.5 ${meta.accentBg} ${meta.accentTx}
                                 rounded-full px-2.5 py-0.5 mb-1.5`}>
                  <Clock size={10} />
                  <span className="text-[10px] font-bold tracking-widest uppercase">{meta.time}</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold
                               text-gray-900 dark:text-white leading-none mb-1"
                  style={{ fontFamily: 'Playfair Display, serif' }}>
                  {category}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 italic">{meta.tagline}</p>
              </div>
            </div>

            {/* Right — thumbnail + item count */}
            <div className="flex items-center gap-4 sm:flex-col sm:items-end">
              {/* Item count pill */}
              <div className={`flex items-center gap-1.5 ${meta.accentBg} ${meta.accentTx}
                               px-3 py-1.5 rounded-xl font-semibold text-xs`}>
                <Utensils size={11} />
                {items.length} dishes
              </div>

              {/* Thumbnail — desktop only */}
              {imageSrc && (
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="hidden sm:block w-36 h-24 lg:w-44 lg:h-28 rounded-xl
                             overflow-hidden shadow-xl flex-shrink-0
                             border-2 border-white/70 dark:border-gray-600/60 ring-1 ring-black/5"
                >
                  <img src={imageSrc} alt={`${category} specials`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy" />
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom gold line */}
        <div className={`absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent`} />
      </motion.div>

      {/* ── Cards grid ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5">
        {visible.map((item, idx) => (
          <FoodCard key={item.id} item={item} index={idx} />
        ))}
      </div>

      {/* ── Show more / less ── */}
      {hasMore && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 flex justify-center"
        >
          <motion.button
            onClick={() => setShowAll(v => !v)}
            whileHover={{ scale: 1.04, boxShadow: '0 6px 20px rgba(249,115,22,0.18)' }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full
                       border-2 border-orange-200 dark:border-orange-700/60
                       text-orange-600 dark:text-orange-400 text-sm font-semibold
                       hover:bg-orange-50 dark:hover:bg-orange-900/20
                       bg-white dark:bg-gray-800 shadow-sm transition-all duration-200"
          >
            <AnimatePresence mode="wait">
              <motion.span key={showAll ? 'less' : 'more'}
                initial={{ opacity: 0, y: showAll ? 4 : -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1.5">
                {showAll
                  ? <><ChevronUp size={15} /> Show Less</>
                  : <><ChevronDown size={15} /> Show All {items.length} Dishes</>}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
