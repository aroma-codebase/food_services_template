// ============================================
// Navbar — Premium glassmorphic sticky nav
// Transparent → frosted glass on scroll
// ============================================
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, UtensilsCrossed, BookOpen } from 'lucide-react';

const navLinks = [
  { label: 'Menu',     href: '#menu'     },
  { label: 'Catering', href: '#catering' },
  { label: 'Contact',  href: '#contact'  },
];

export default function Navbar({ darkMode, setDarkMode, onBookCatering }) {
  const [scrolled,       setScrolled]       = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [activeSection,  setActiveSection]  = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const total = document.body.scrollHeight - window.innerHeight;
      setScrolled(y > 60);
      setScrollProgress(total > 0 ? (y / total) * 100 : 0);

      // Active-section detection
      const sectionIds = ['contact', 'catering', 'menu'];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && y >= el.offsetTop - 130) {
          setActiveSection(id);
          return;
        }
      }
      setActiveSection('');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setMobileOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleBookCatering = () => {
    setMobileOpen(false);
    onBookCatering?.();
  };

  const isActive = (href) => activeSection === href.replace('#', '');

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled
            ? 'bg-white/85 dark:bg-gray-900/85 backdrop-blur-2xl shadow-xl shadow-black/5 border-b border-white/20 dark:border-gray-700/30'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* ── Logo ── */}
            <motion.a
              href="#menu"
              onClick={(e) => { e.preventDefault(); handleNavClick('#menu'); }}
              className="flex items-center gap-2.5 group flex-shrink-0"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-md group-hover:shadow-orange-500/40 transition-shadow">
                  <UtensilsCrossed size={18} className="text-white" />
                </div>
                {/* Glow ring on hover */}
                <div className="absolute inset-0 rounded-xl bg-orange-400/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
              </div>
              <div className="leading-tight">
                <p
                  className={`font-bold text-sm lg:text-base tracking-wide transition-colors duration-300 ${
                    scrolled ? 'text-amber-900 dark:text-amber-100' : 'text-white'
                  }`}
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Sri Annapoorna
                </p>
                <p className={`text-[10px] tracking-widest uppercase transition-colors duration-300 ${
                  scrolled ? 'text-orange-500' : 'text-orange-300'
                }`}>
                  Mess & Cafeteria
                </p>
              </div>
            </motion.a>

            {/* ── Desktop Links ── */}
            <div className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(link.href)
                      ? 'text-orange-500'
                      : scrolled
                        ? 'text-gray-700 dark:text-gray-200 hover:text-orange-500 hover:bg-orange-50/60 dark:hover:bg-orange-900/10'
                        : 'text-white/85 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                  {/* Active underline dot */}
                  {isActive(link.href) && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full"
                    />
                  )}
                </a>
              ))}
            </div>

            {/* ── Right Controls ── */}
            <div className="flex items-center gap-2">
              {/* Dark mode toggle */}
              <motion.button
                onClick={() => setDarkMode(!darkMode)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  scrolled
                    ? 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
                aria-label="Toggle dark mode"
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={darkMode ? 'sun' : 'moon'}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={{   rotate:  90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                  </motion.span>
                </AnimatePresence>
              </motion.button>

              {/* Book Catering CTA */}
              <motion.a
                href="#catering"
                onClick={(e) => { e.preventDefault(); handleBookCatering(); }}
                whileHover={{ scale: 1.05, boxShadow: '0 8px 20px rgba(249,115,22,0.4)' }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-orange-500/25 transition-shadow"
              >
                <BookOpen size={14} />
                Book Catering
              </motion.a>

              {/* Mobile hamburger */}
              <motion.button
                onClick={() => setMobileOpen(!mobileOpen)}
                whileTap={{ scale: 0.9 }}
                className={`md:hidden p-2 rounded-lg transition-colors ${
                  scrolled
                    ? 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    : 'text-white hover:bg-white/10'
                }`}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={mobileOpen ? 'x' : 'menu'}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* ── Scroll progress bar ── */}
        <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />

        {/* ── Mobile Menu ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl border-t border-gray-100 dark:border-gray-800"
            >
              <div className="px-4 py-4 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${
                      isActive(link.href)
                        ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    {link.label}
                    {isActive(link.href) && (
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    )}
                  </motion.a>
                ))}
                <motion.a
                  href="#catering"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                  onClick={(e) => { e.preventDefault(); handleBookCatering(); }}
                  className="mt-2 px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold rounded-xl text-center shadow-md shadow-orange-500/25"
                >
                  Book Catering
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
