// ============================================
// Hero — Carousel background + Virtual Menu Book trigger
// ============================================
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Star, Clock, Award, BookOpen } from 'lucide-react';
import MenuBook from './MenuBook';

/* ── Carousel slides ── */
const slides = [
  {
    url: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=1920&q=80',
    label: 'Masala Dosa',
  },
  {
    url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=1920&q=80',
    label: 'Idly & Sambar',
  },
  {
    url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=1920&q=80',
    label: 'South Indian Meals',
  },
  {
    url: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=1920&q=80',
    label: 'Dosa Varieties',
  },
  {
    url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920&q=80',
    label: 'Filter Coffee',
  },
  {
    url: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=1920&q=80',
    label: 'Poori Masala',
  },
  {
    url: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1920&q=80',
    label: 'Veg Thali',
  },
];

const INTERVAL = 4000;

export default function Hero({ onBookCatering }) {
  const [current, setCurrent]   = useState(0);
  const [paused, setPaused]     = useState(false);
  const [bookOpen, setBookOpen] = useState(false);
  const timerRef = useRef(null);

  /* auto-advance */
  useEffect(() => {
    if (paused || bookOpen) return;
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % slides.length);
    }, INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [paused, bookOpen]);

  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* ── Background carousel ─────────────────── */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="sync">
            {slides.map((slide, idx) =>
              idx === current ? (
                <motion.div
                  key={slide.url}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1.12 }}
                  exit={{ opacity: 0, scale: 1 }}
                  transition={{ opacity: { duration: 1.2 }, scale: { duration: INTERVAL / 1000 + 1.2, ease: 'linear' } }}
                >
                  <img
                    src={slide.url}
                    alt={slide.label}
                    className="w-full h-full object-cover"
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />
                </motion.div>
              ) : null
            )}
          </AnimatePresence>

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/80 z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-950/35 via-transparent to-amber-950/25 z-10" />
        </div>

        {/* ── Slide label ──────────────────────────── */}
        <div className="absolute bottom-24 right-6 z-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-2 bg-black/30 backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-full"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
              <span className="text-white/70 text-[11px] tracking-wide">{slides[current].label}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Main content ────────────────────────── */}
        <div className="relative z-20 text-center px-4 sm:px-6 max-w-4xl mx-auto">
          {/* Est. badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/20 border border-orange-400/40 backdrop-blur-sm mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
            <span className="text-orange-300 text-xs font-medium tracking-widest uppercase">
              Est. 2008 · madurai
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-4 leading-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Sri{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
              Annapoorna
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg text-orange-200/80 tracking-widest uppercase mb-3 font-light"
          >
            Mess & Cafeteria
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="text-lg sm:text-xl lg:text-2xl text-white/80 font-light mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Authentic South Indian Taste,{' '}
            <span className="text-orange-300 font-medium">Made Fresh Every Day</span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {/* Primary CTA — opens the menu book */}
            <motion.button
              onClick={() => setBookOpen(true)}
              whileHover={{ scale: 1.05, boxShadow: '0 20px 50px rgba(249,115,22,0.5)' }}
              whileTap={{ scale: 0.97 }}
              className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-lg rounded-2xl shadow-xl shadow-orange-500/30 overflow-hidden min-w-[200px] flex items-center justify-center gap-2"
            >
              {/* Ripple layer */}
              <span className="absolute inset-0 bg-white/10 scale-0 group-active:scale-100 rounded-2xl transition-transform duration-300" />
              <BookOpen size={20} className="relative z-10" />
              <span className="relative z-10">View Menu</span>
            </motion.button>

            {/* Secondary CTA */}
            <motion.button
              onClick={onBookCatering}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold text-lg rounded-2xl hover:bg-white/20 transition-all duration-200 min-w-[200px]"
            >
              Book Catering
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="mt-16 flex flex-wrap justify-center gap-6 sm:gap-10"
          >
            {[
              { icon: Star, value: '4.0★', label: 'Customer Rating' },
              { icon: Clock, value: '2+', label: 'Years of Service' },
              { icon: Award, value: '500+', label: 'Events Catered' },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-2.5 text-white/80">
                <div className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <Icon size={16} className="text-orange-400" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-white text-sm">{value}</p>
                  <p className="text-white/60 text-xs">{label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Carousel dot nav ─────────────────────── */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-300 rounded-full ${
                i === current ? 'w-6 h-2 bg-orange-400' : 'w-2 h-2 bg-white/35 hover:bg-white/60'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* ── Scroll indicator ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 right-6 z-20 hidden sm:block"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-1 text-white/40 cursor-pointer"
            onClick={scrollToMenu}
          >
            <span className="text-[10px] tracking-widest uppercase">Scroll</span>
            <ChevronDown size={16} />
          </motion.div>
        </motion.div>
      </section>

      {/* Virtual Menu Book modal */}
      <MenuBook isOpen={bookOpen} onClose={() => setBookOpen(false)} />
    </>
  );
}
