// ============================================
// BookCatering — Step 1 booking window
// ============================================
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, IndianRupee, Users, X } from 'lucide-react';
import { cateringPackages } from '../data/cateringData';

const bookingSteps = ['Choose package', 'Guest count', 'Review & confirm'];

const DEFAULT_GUEST_COUNT = 100;

const formatCurrency = (value) => `₹${value.toLocaleString('en-IN')}`;

const clampGuestCount = (value) => {
  if (Number.isNaN(value)) return DEFAULT_GUEST_COUNT;
  return Math.min(500, Math.max(5, value));
};

export default function BookCatering({ isOpen, onClose }) {
  const defaultIndex = Math.max(cateringPackages.findIndex((pkg) => pkg.highlight), 0);
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);
  const [guestCount, setGuestCount] = useState(DEFAULT_GUEST_COUNT);
  const carouselRef = useRef(null);
  const cardRefs = useRef([]);

  const selectedPackage = cateringPackages[selectedIndex] ?? cateringPackages[0];
  const minBudget = selectedPackage.start_price * guestCount;
  const maxBudget = selectedPackage.end_price * guestCount;

  const scrollToCard = (index, behavior = 'smooth') => {
    const container = carouselRef.current;
    const card = cardRefs.current[index];

    if (!container || !card) return;

    const targetLeft = card.offsetLeft - (container.clientWidth - card.clientWidth) / 2;
    container.scrollTo({ left: targetLeft, behavior });
  };

  const clampPackageIndex = (value) => Math.min(cateringPackages.length - 1, Math.max(0, value));

  const navigatePackages = (direction) => {
    setSelectedIndex((currentIndex) => clampPackageIndex(currentIndex + direction));
  };

  const handleGuestChange = (value) => {
    setGuestCount(clampGuestCount(value));
  };

  useEffect(() => {
    if (!isOpen) return;

    setSelectedIndex(defaultIndex);
    setGuestCount(DEFAULT_GUEST_COUNT);

    const frame = requestAnimationFrame(() => scrollToCard(defaultIndex, 'auto'));
    return () => cancelAnimationFrame(frame);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const frame = requestAnimationFrame(() => scrollToCard(selectedIndex, 'smooth'));
    return () => cancelAnimationFrame(frame);
  }, [isOpen, selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 px-3 py-4 backdrop-blur-sm sm:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-6xl max-h-[92vh] overflow-hidden rounded-[2rem] border border-white/10 bg-white/95 shadow-2xl shadow-black/30 dark:bg-gray-950/95"
          >
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-orange-50/80 via-transparent to-amber-50/60 dark:from-orange-900/20 dark:to-amber-900/10" />

            <div className="relative z-10 flex h-full flex-col">
              <div className="px-5 pt-5 sm:px-6 sm:pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2
                      className="text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      Book Catering
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                    aria-label="Close booking window"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="mt-5 w-full">
                  <div className="flex items-start">
                    {bookingSteps.map((step, index) => {
                      const isCompleted = index < 0;
                      const isCurrent = index === 0;
                      const isUpcoming = index > 0;

                      return (
                        <div key={step} className="flex flex-1 items-start">
                          <div className="flex min-w-0 flex-1 flex-col items-center text-center">
                            <div className="flex w-full items-center">
                              <div
                                className={`h-px flex-1 ${index === 0 ? 'bg-transparent' : index > 0 ? 'bg-gray-300 dark:bg-gray-700' : 'bg-orange-500'}`}
                              />
                              <div
                                className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full border text-[10px] font-semibold transition-all sm:h-8 sm:w-8 ${
                                  isCurrent
                                    ? 'border-orange-500 bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20'
                                    : isCompleted
                                      ? 'border-orange-500 bg-orange-500 text-white'
                                      : 'border-gray-300 bg-white text-gray-400 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-500'
                                }`}
                              >
                                {index + 1}
                              </div>
                              <div
                                className={`h-px flex-1 ${index < bookingSteps.length - 1 ? (isCurrent ? 'bg-gray-300 dark:bg-gray-700' : 'bg-gray-300 dark:bg-gray-700') : 'bg-transparent'}`}
                              />
                            </div>
                            <p
                              className={`mt-2 max-w-full truncate text-[10px] font-medium tracking-wide sm:text-[11px] ${
                                isCurrent
                                  ? 'text-gray-900 dark:text-white'
                                  : isUpcoming
                                    ? 'text-gray-400 dark:text-gray-500'
                                    : 'text-orange-500'
                              }`}
                            >
                              {step}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
                <div className="space-y-6">
                  <section>
                    <div className="mb-4 flex items-end justify-between gap-4">
                      <div>
                        <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-orange-500">
                          Catering packages
                        </p>
                        <h3
                          className="mt-1 text-xl font-bold text-gray-900 dark:text-white sm:text-2xl"
                          style={{ fontFamily: 'Playfair Display, serif' }}
                        >
                          Select the package that matches your event
                        </h3>
                      </div>
                      <p className="hidden text-sm text-gray-500 dark:text-gray-400 sm:block">
                        Swipe or use the arrows
                      </p>
                    </div>

                    <div className="grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.9fr)] lg:items-start">
                      <div className="relative -mx-5 overflow-hidden sm:-mx-6 lg:mx-0">
                      <div
                        ref={carouselRef}
                        className="scrollbar-hide flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory px-16 pb-4 sm:px-20 xl:px-16"
                      >
                        {cateringPackages.map((pkg, packageIndex) => {
                          const isSelected = packageIndex === selectedIndex;

                          return (
                            <motion.button
                              key={pkg.id}
                              ref={(node) => {
                                cardRefs.current[packageIndex] = node;
                              }}
                              type="button"
                              onClick={() => {
                                setSelectedIndex(packageIndex);
                              }}
                              whileTap={{ scale: 0.98 }}
                              className={`snap-center shrink-0 w-[74%] rounded-[1.75rem] border p-5 text-left transition-all duration-300 sm:w-[55%] lg:w-[38%] xl:w-[34%] ${
                                isSelected
                                  ? 'scale-100 opacity-100 border-orange-300 bg-white shadow-2xl shadow-orange-500/10 dark:border-orange-700 dark:bg-gray-900'
                                  : 'scale-100 opacity-65 border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900'
                              }`}
                            >
                              <div
                                className={`h-1.5 rounded-full bg-gradient-to-r ${
                                  pkg.highlight
                                    ? 'from-orange-500 to-amber-400'
                                    : 'from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-800'
                                }`}
                              />

                              <div className="mt-4 flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                  {pkg.tag && (
                                    <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-orange-500">
                                      {pkg.tag}
                                    </p>
                                  )}
                                  <h4 className={`mt-2 text-lg font-bold ${isSelected ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-200'}`}>
                                    {pkg.title}
                                  </h4>
                                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{pkg.label}</p>
                                </div>

                                <div className={`rounded-2xl px-3 py-2 text-right ${isSelected ? 'bg-orange-50 dark:bg-orange-900/20' : 'bg-gray-50 dark:bg-gray-800'}`}>
                                  <p className="text-[10px] font-semibold tracking-[0.24em] uppercase text-gray-400 dark:text-gray-500">
                                    Per head
                                  </p>
                                  <p className={`mt-1 text-sm font-semibold ${isSelected ? 'text-orange-600 dark:text-orange-300' : 'text-gray-600 dark:text-gray-300'}`}>
                                    {pkg.label}
                                  </p>
                                </div>
                              </div>

                              <p className="mt-4 line-clamp-3 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                                {pkg.items.slice(0, 3).join(' • ')}
                              </p>

                              <div className="mt-4 flex items-center justify-between">
                                <p className="text-xs font-medium text-gray-400 dark:text-gray-500">
                                  {isSelected ? 'Selected package' : 'Tap to select'}
                                </p>
                                <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold ${isSelected ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'}`}>
                                  {isSelected ? 'Active' : 'Preview'}
                                </span>
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>

                      <button
                        type="button"
                        onClick={() => navigatePackages(-1)}
                        className="absolute left-2 top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-white/75 text-gray-700 shadow-lg shadow-black/10 backdrop-blur-md transition-all hover:bg-white hover:text-gray-900 dark:border-gray-700/60 dark:bg-gray-900/70 dark:text-gray-200 dark:hover:bg-gray-900"
                        aria-label="Previous package"
                        aria-disabled={selectedIndex === 0}
                      >
                        <ChevronLeft size={18} />
                      </button>

                      <button
                        type="button"
                        onClick={() => navigatePackages(1)}
                        className="absolute right-2 top-1/2 z-20 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-white/75 text-gray-700 shadow-lg shadow-black/10 backdrop-blur-md transition-all hover:bg-white hover:text-gray-900 dark:border-gray-700/60 dark:bg-gray-900/70 dark:text-gray-200 dark:hover:bg-gray-900"
                        aria-label="Next package"
                        aria-disabled={selectedIndex === cateringPackages.length - 1}
                      >
                        <ChevronRight size={18} />
                      </button>
                      </div>

                      <div className="flex flex-col gap-4 lg:self-start">
                        <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500 dark:bg-orange-900/20 dark:text-orange-300">
                          <Users size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">Guest count</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Keep the slider and number field in sync</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <input
                          type="range"
                          min={5}
                          max={500}
                          step={5}
                          value={guestCount}
                          onChange={(event) => handleGuestChange(Number(event.target.value))}
                          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-orange-100 accent-orange-500 dark:bg-gray-800"
                        />
                        <input
                          type="number"
                          min={5}
                          max={500}
                          step={5}
                          value={guestCount}
                          onChange={(event) => handleGuestChange(Number(event.target.value))}
                          className="w-24 rounded-xl border border-gray-200 bg-white px-3 py-2 text-right text-sm font-semibold text-gray-900 outline-none transition-colors focus:border-orange-400 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                        />
                      </div>

                      <div className="mt-3 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-gray-400 dark:text-gray-500">
                        <span>5 guests</span>
                        <span>500 guests</span>
                      </div>
                    </div>

                        <div className="rounded-3xl border border-gray-200 bg-gray-50/80 p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/60">
                      <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-gray-400 dark:text-gray-500">
                        Estimated budget
                      </p>
                      <div className="mt-3 flex items-end gap-2 text-gray-900 dark:text-white">
                        <IndianRupee size={18} className="mb-1 text-orange-500" />
                        <div>
                          <p className="text-2xl font-bold leading-tight">
                            {formatCurrency(minBudget)}
                            <span className="mx-2 text-gray-300 dark:text-gray-700">→</span>
                            {formatCurrency(maxBudget)}
                          </p>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {selectedPackage.title} for {guestCount} guests
                          </p>
                        </div>
                      </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-gray-100 px-5 py-4 dark:border-gray-800 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  Step 2 and 3 are reserved for the next booking stage.
                </p>

                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-transform hover:scale-[1.02]"
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}