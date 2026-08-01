// ============================================
// MenuBook — Luxury Virtual Restaurant Menu Book
// Premium hardcover feel with paper texture,
// gold accents, decorative borders, chef badges
// ============================================
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, UtensilsCrossed, IndianRupee, Star, Award } from 'lucide-react';
import { breakfastItems, lunchItems, dinnerItems } from '../data/menuData';

/* ── which items get special badges ── */
const chefSpecials = new Set([4, 5, 13]); // item ids by position within each category
const mostPopular  = new Set([1, 3, 8]);

/* ── badge styles ── */
const tagPalette = {
  Popular:       { bg: 'bg-blue-500',    text: 'text-white' },
  Bestseller:    { bg: 'bg-orange-500',  text: 'text-white' },
  Premium:       { bg: 'bg-amber-500',   text: 'text-white' },
  'Must Try':    { bg: 'bg-red-500',     text: 'text-white' },
  Sweet:         { bg: 'bg-pink-500',    text: 'text-white' },
  'Full Meal':   { bg: 'bg-emerald-500', text: 'text-white' },
  Value:         { bg: 'bg-teal-500',    text: 'text-white' },
  Combo:         { bg: 'bg-violet-500',  text: 'text-white' },
  'Chef Special':{ bg: 'bg-rose-500',    text: 'text-white' },
};

/* ── page definitions ── */
const pages = [
  { id: 'cover', type: 'cover' },
  {
    id: 'breakfast', type: 'menu', category: 'Breakfast', icon: '🌅',
    time: '6 AM – 11 AM', tagline: 'Start your day the South Indian way',
    headerGrad: 'from-amber-700 via-amber-600 to-orange-500',
    accentColor: '#d97706', items: breakfastItems, pageNum: 1,
  },
  {
    id: 'lunch', type: 'menu', category: 'Lunch', icon: '☀️',
    time: '11 AM – 4 PM', tagline: 'Wholesome meals, always made fresh',
    headerGrad: 'from-orange-600 via-orange-500 to-red-500',
    accentColor: '#ea580c', items: lunchItems, pageNum: 2,
  },
  {
    id: 'dinner', type: 'menu', category: 'Dinner', icon: '🌙',
    time: '6 PM – 10 PM', tagline: 'Evening comfort food done right',
    headerGrad: 'from-rose-600 via-rose-500 to-amber-600',
    accentColor: '#e11d48', items: dinnerItems, pageNum: 3,
  },
];

/* ── flip animation ── */
const flipVariants = {
  enterRight: { x: 80, opacity: 0, rotateY: -12, scale: 0.96 },
  enterLeft:  { x: -80, opacity: 0, rotateY: 12,  scale: 0.96 },
  center: {
    x: 0, opacity: 1, rotateY: 0, scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exitLeft:  { x: -80, opacity: 0, rotateY: 12,  scale: 0.96, transition: { duration: 0.32, ease: 'easeIn' } },
  exitRight: { x: 80,  opacity: 0, rotateY: -12, scale: 0.96, transition: { duration: 0.32, ease: 'easeIn' } },
};

/* ── Paper texture overlay (inline SVG base64 pattern) ── */
const PAPER_STYLE = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'repeat',
};

/* ── Decorative corner SVG ── */
function Corner({ className }) {
  return (
    <svg viewBox="0 0 40 40" className={`w-8 h-8 text-amber-400/50 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 2 L14 2 M2 2 L2 14" strokeLinecap="round"/>
      <circle cx="2" cy="2" r="1.5" fill="currentColor"/>
    </svg>
  );
}

/* ── Fleur-de-lis divider ── */
function GoldDivider({ className = '' }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-amber-400/60" />
      <span className="text-amber-400/80 text-xs">✦</span>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-amber-400/60" />
    </div>
  );
}

/* ── Single premium menu item row ── */
function BookMenuItem({ item, index, accentColor }) {
  const [imgErr, setImgErr] = useState(false);
  const isChef    = chefSpecials.has(item.id);
  const isPopular = mostPopular.has(item.id);
  const tagInfo   = item.tag ? tagPalette[item.tag] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.025, duration: 0.3 }}
      className="group relative flex items-center gap-3 py-2.5 px-2 rounded-lg hover:bg-amber-50/60 transition-colors duration-200 cursor-default"
    >
      {/* Popular ribbon */}
      {isPopular && (
        <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r bg-orange-500" />
      )}

      {/* Dish image */}
      <div className="w-11 h-11 rounded-lg overflow-hidden flex-shrink-0 shadow-sm border border-amber-200/50 bg-amber-100">
        {!imgErr ? (
          <img src={item.photo} alt={item.name} onError={() => setImgErr(true)}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-400"
            loading="lazy" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-base">🍽️</div>
        )}
      </div>

      {/* Name + description + badges */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
          <span className="font-semibold text-gray-800 text-[12.5px] leading-tight tracking-tight">
            {item.name}
          </span>
          {isChef && (
            <span className="inline-flex items-center gap-0.5 bg-rose-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">
              <Award size={7} />Chef's Special
            </span>
          )}
          {isPopular && !isChef && (
            <span className="inline-flex items-center gap-0.5 bg-orange-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">
              <Star size={7} className="fill-white" />Popular
            </span>
          )}
          {tagInfo && !isChef && !isPopular && (
            <span className={`${tagInfo.bg} ${tagInfo.text} text-[8px] font-bold px-1.5 py-0.5 rounded-full`}>
              {item.tag}
            </span>
          )}
        </div>
        <p className="text-[10px] text-gray-400 leading-tight line-clamp-1">{item.description}</p>
      </div>

      {/* Dotted leader line */}
      <div className="flex-1 h-px border-b border-dotted border-amber-300/60 hidden sm:block mx-1" style={{ minWidth: 16 }} />

      {/* Price badge */}
      <div className="flex-shrink-0 flex items-center gap-0.5 font-extrabold text-[13px] bg-amber-50 border border-amber-200 text-amber-800 px-2 py-1 rounded-lg shadow-sm">
        <IndianRupee size={10} strokeWidth={2.5} />
        {item.price}
      </div>
    </motion.div>
  );
}

/* ── Premium Cover Page ── */
function CoverPage() {
  return (
    <div className="h-full flex flex-col items-center justify-center relative overflow-hidden select-none"
      style={{ background: 'linear-gradient(160deg, #3c1a08 0%, #7c2d12 40%, #3c1a08 100%)', ...PAPER_STYLE }}>

      {/* Background food photo */}
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=80"
          alt="" className="w-full h-full object-cover opacity-15" />
      </div>

      {/* Corner ornaments */}
      <Corner className="absolute top-3 left-3 rotate-0" />
      <Corner className="absolute top-3 right-3 rotate-90" />
      <Corner className="absolute bottom-3 left-3 -rotate-90" />
      <Corner className="absolute bottom-3 right-3 rotate-180" />

      {/* Outer gold border */}
      <div className="absolute inset-3 border border-amber-500/30 rounded pointer-events-none" />
      <div className="absolute inset-5 border border-amber-400/15 rounded pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-10">
        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5, ease: 'backOut' }}
          className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-2xl shadow-orange-500/50 mx-auto mb-4">
          <UtensilsCrossed size={24} className="text-white" />
        </motion.div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="text-amber-400/80 text-[9px] tracking-[0.35em] uppercase font-medium mb-2">
          Est. 2008 · Chennai, Tamil Nadu
        </motion.p>

        <GoldDivider className="mb-4 w-32 mx-auto" />

        <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="text-white font-extrabold leading-tight mb-1"
          style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.6rem, 5vw, 2.4rem)' }}>
          Sri Annapoorna
        </motion.h1>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="text-amber-300/70 text-xs tracking-[0.2em] uppercase font-light mb-5">
          Mess & Cafeteria
        </motion.p>

        <GoldDivider className="mb-5 w-32 mx-auto" />

        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
          className="text-white/50 text-xs italic leading-relaxed">
          "Authentic South Indian Taste,<br />Made Fresh Every Day"
        </motion.p>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }}
          className="mt-7 flex flex-col items-center gap-1">
          <span className="text-amber-400/50 text-[9px] tracking-widest uppercase">Menu</span>
          <span className="text-amber-400/40 text-base animate-bounce">›</span>
        </motion.div>
      </div>
    </div>
  );
}

/* ── Premium Menu Category Page ── */
function MenuPageContent({ page }) {
  return (
    <div className="h-full flex flex-col relative overflow-hidden"
      style={{ background: '#fef9f0', ...PAPER_STYLE }}>

      {/* Decorative corner ornaments (light) */}
      <div className="absolute top-2 left-2 w-6 h-6 border-t border-l border-amber-400/30 pointer-events-none" />
      <div className="absolute top-2 right-2 w-6 h-6 border-t border-r border-amber-400/30 pointer-events-none" />
      <div className="absolute bottom-8 left-2 w-6 h-6 border-b border-l border-amber-400/30 pointer-events-none" />
      <div className="absolute bottom-8 right-2 w-6 h-6 border-b border-r border-amber-400/30 pointer-events-none" />

      {/* Right-edge paper shadow */}
      <div className="absolute top-0 right-0 w-4 h-full bg-gradient-to-l from-amber-900/8 to-transparent pointer-events-none z-10" />

      {/* ── Header band ── */}
      <div className={`bg-gradient-to-r ${page.headerGrad} px-5 py-4 flex-shrink-0 relative overflow-hidden`}>
        {/* Header paper texture */}
        <div className="absolute inset-0 opacity-10" style={PAPER_STYLE} />
        {/* Shine highlight */}
        <div className="absolute top-0 left-0 right-0 h-px bg-white/30" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-black/20" />

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-md text-lg flex-shrink-0 border border-white/20">
              {page.icon}
            </div>
            <div>
              <p className="text-white/60 text-[9px] font-semibold tracking-[0.25em] uppercase">{page.time}</p>
              <h2 className="text-white font-extrabold leading-none"
                style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.1rem, 3vw, 1.5rem)' }}>
                {page.category}
              </h2>
            </div>
          </div>
          {/* Page number badge */}
          <div className="flex flex-col items-center bg-white/15 border border-white/20 rounded-lg px-3 py-1.5 backdrop-blur-sm">
            <span className="text-white/50 text-[8px] tracking-widest uppercase leading-none">Page</span>
            <span className="text-white font-bold text-base leading-none">{page.pageNum}</span>
          </div>
        </div>
        <p className="relative z-10 text-white/60 text-[10px] italic mt-1.5 pl-12">{page.tagline}</p>
      </div>

      {/* Gold divider under header */}
      <div className="h-0.5 flex-shrink-0 bg-gradient-to-r from-amber-300/60 via-amber-500/80 to-amber-300/60" />

      {/* ── Items list ── */}
      <div className="flex-1 overflow-y-auto px-4 py-2 custom-scrollbar">
        {page.items.map((item, idx) => (
          <BookMenuItem key={item.id} item={item} index={idx} accentColor={page.accentColor} />
        ))}
        {/* Bottom breathing room */}
        <div className="h-3" />
      </div>

      {/* ── Page footer ── */}
      <div className="flex-shrink-0 border-t border-amber-200/60 bg-amber-50/60 px-5 py-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-3.5 h-3.5 rounded bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
            <UtensilsCrossed size={8} className="text-white" />
          </div>
          <span className="text-[9px] text-amber-700/70 italic font-medium">Sri Annapoorna</span>
        </div>
        <GoldDivider className="flex-1 mx-3" />
        <span className="text-[9px] text-amber-600/70 font-semibold">{page.items.length} dishes</span>
      </div>
    </div>
  );
}

/* ── Main MenuBook Modal ── */
export default function MenuBook({ isOpen, onClose }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction,   setDirection]   = useState(1);

  /* Keyboard nav */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext();
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goPrev();
      else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, currentPage]);

  /* Reset on open, lock scroll */
  useEffect(() => { if (isOpen) setCurrentPage(0); }, [isOpen]);
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const goNext = useCallback(() => {
    if (currentPage < pages.length - 1) { setDirection(1); setCurrentPage(p => p + 1); }
  }, [currentPage]);
  const goPrev = useCallback(() => {
    if (currentPage > 0) { setDirection(-1); setCurrentPage(p => p - 1); }
  }, [currentPage]);

  const page = pages[currentPage];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div key="bd"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-lg"
            onClick={onClose} />

          {/* Book wrapper */}
          <motion.div key="bk"
            initial={{ opacity: 0, scale: 0.82, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 30 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-4 sm:p-8 pointer-events-none">

            <div className="relative w-full max-w-md sm:max-w-lg pointer-events-auto"
              style={{ height: 'min(700px, 88vh)' }}
              onClick={e => e.stopPropagation()}>

              {/* ── Book drop shadow ── */}
              <div className="absolute -bottom-4 left-8 right-8 h-8 bg-black/40 blur-2xl rounded-full" />
              <div className="absolute -bottom-1 left-4 right-4 h-4 bg-black/25 blur-lg rounded-full" />

              {/* ── Hardcover outer shell ── */}
              <div className="absolute inset-0 rounded-2xl shadow-2xl"
                style={{ background: 'linear-gradient(145deg, #92400e, #78350f, #451a03)' }} />

              {/* Embossed texture on cover */}
              <div className="absolute inset-0 rounded-2xl opacity-30" style={PAPER_STYLE} />

              {/* Outer gold frame lines */}
              <div className="absolute inset-2 rounded-xl border border-amber-500/40 pointer-events-none" />
              <div className="absolute inset-3.5 rounded-lg border border-amber-400/20 pointer-events-none" />

              {/* ── Spine (left binding) ── */}
              <div className="absolute left-0 top-2 bottom-2 w-4 rounded-l-xl z-20 overflow-hidden">
                <div className="w-full h-full" style={{ background: 'linear-gradient(to right, #451a03, #92400e, #78350f)' }} />
                {/* Spine ribbing */}
                {[20, 35, 50, 65, 80].map(pct => (
                  <div key={pct} className="absolute left-0 right-0 h-px bg-black/30"
                    style={{ top: `${pct}%` }} />
                ))}
              </div>

              {/* ── Page area ── */}
              <div className="absolute left-5 right-2 top-4 bottom-4 rounded-r-lg rounded-l overflow-hidden shadow-inner"
                style={{ perspective: '1200px' }}>

                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div key={page.id} custom={direction}
                    variants={flipVariants}
                    initial={direction > 0 ? 'enterRight' : 'enterLeft'}
                    animate="center"
                    exit={direction > 0 ? 'exitLeft' : 'exitRight'}
                    className="absolute inset-0"
                    style={{ transformOrigin: direction > 0 ? 'left center' : 'right center' }}>
                    {page.type === 'cover'
                      ? <CoverPage />
                      : <MenuPageContent page={page} />}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* ── Close button ── */}
              <button onClick={onClose}
                className="absolute -top-4 -right-4 z-30 w-9 h-9 bg-gray-900 border border-gray-700 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-gray-800 transition-all shadow-2xl"
                aria-label="Close">
                <X size={15} />
              </button>

              {/* ── Prev / Next arrows ── */}
              <button onClick={goPrev} disabled={currentPage === 0}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-30 w-11 h-11 bg-amber-900 border border-amber-700/60 rounded-full flex items-center justify-center text-amber-300 hover:text-white hover:bg-amber-800 disabled:opacity-25 disabled:cursor-not-allowed transition-all shadow-xl"
                aria-label="Previous page">
                <ChevronLeft size={20} />
              </button>
              <button onClick={goNext} disabled={currentPage === pages.length - 1}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-30 w-11 h-11 bg-amber-900 border border-amber-700/60 rounded-full flex items-center justify-center text-amber-300 hover:text-white hover:bg-amber-800 disabled:opacity-25 disabled:cursor-not-allowed transition-all shadow-xl"
                aria-label="Next page">
                <ChevronRight size={20} />
              </button>

              {/* ── Page indicator dots ── */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2">
                {pages.map((p, i) => (
                  <button key={p.id}
                    onClick={() => { setDirection(i > currentPage ? 1 : -1); setCurrentPage(i); }}
                    className={`transition-all duration-300 rounded-full ${
                      i === currentPage ? 'w-7 h-2.5 bg-orange-400 shadow-orange-400/50 shadow-md' : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/60'
                    }`}
                    aria-label={`Go to ${p.id}`} />
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
