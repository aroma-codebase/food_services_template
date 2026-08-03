// ============================================
// App — Root with premium loading screen + dark mode
// ============================================
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UtensilsCrossed } from 'lucide-react';
import Navbar      from './components/Navbar';
import Footer      from './components/Footer';
import BookCatering from './components/BookCatering';
import MenuPage    from './pages/MenuPage';
import CateringPage from './pages/CateringPage';
import ContactPage  from './pages/ContactPage';
import PdfDownloadTestPage from './pages/PdfDownloadTestPage';

/* ── Premium Loading Screen ── */
function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar 0 → 100 over 1.8s
    const start = Date.now();
    const duration = 1800;
    const raf = () => {
      const p = Math.min(((Date.now() - start) / duration) * 100, 100);
      setProgress(p);
      if (p < 100) requestAnimationFrame(raf);
      else setTimeout(onDone, 200);
    };
    requestAnimationFrame(raf);
  }, [onDone]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.45, ease: 'easeInOut' }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-amber-950 via-stone-950 to-amber-950 overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-600/15 rounded-full blur-3xl" />
      </div>

      {/* Decorative corner ornaments */}
      {['top-6 left-6 border-t border-l', 'top-6 right-6 border-t border-r',
        'bottom-6 left-6 border-b border-l', 'bottom-6 right-6 border-b border-r'].map((cls, i) => (
        <div key={i} className={`absolute w-8 h-8 ${cls} border-amber-500/30`} />
      ))}

      {/* Logo + title */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.55, ease: 'backOut' }}
        className="flex flex-col items-center relative z-10"
      >
        {/* Pulsing ring */}
        <div className="relative mb-5">
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.15, 0.4] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-3xl bg-orange-500/40 blur-md"
          />
          <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-2xl shadow-orange-500/40">
            <UtensilsCrossed size={36} className="text-white" />
          </div>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="text-3xl font-bold text-white mb-1 text-center"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Sri Annapoorna
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-orange-400 text-xs tracking-[0.25em] uppercase mb-8"
        >
          Mess & Cafeteria
        </motion.p>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-48 sm:w-64"
        >
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>
          <p className="text-center text-white/30 text-[10px] mt-2 tracking-widest">
            Preparing your experience...
          </p>
        </motion.div>
      </motion.div>

      {/* Bouncing dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="absolute bottom-12 flex gap-1.5"
      >
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -6, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 0.9, delay: i * 0.12 }}
            className="w-1.5 h-1.5 rounded-full bg-orange-400"
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

/* ── Main App ── */
export default function App() {
  const [loading,  setLoading]  = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [bookCateringOpen, setBookCateringOpen] = useState(false);
  const pdfTestMode = new URLSearchParams(window.location.search).has('pdf-test');

  // Persist dark mode in localStorage
  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved === 'true') setDarkMode(true);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return (
    <AnimatePresence mode="wait">
      {pdfTestMode ? (
        <PdfDownloadTestPage />
      ) : loading ? (
        <LoadingScreen key="loading" onDone={() => setLoading(false)} />
      ) : (
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
        >
          <Navbar
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            onBookCatering={() => setBookCateringOpen(true)}
          />

          <main>
            <MenuPage onBookCatering={() => setBookCateringOpen(true)} />
            <CateringPage />
            <ContactPage  />
          </main>

          <BookCatering
            isOpen={bookCateringOpen}
            onClose={() => setBookCateringOpen(false)}
          />

          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
