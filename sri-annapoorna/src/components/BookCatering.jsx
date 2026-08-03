// ============================================
// BookCatering — Step 1 booking window
// ============================================
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, ChevronLeft, ChevronRight, Download, IndianRupee, Loader2, Mail, Phone, Send, User, Users, X } from 'lucide-react';
import axios from 'axios';
import { cateringPackages } from '../data/cateringData';
import { buildEnquiryPdfHtml } from '../utils/pdf/buildEnquiryPdfHtml';
import { downloadPdfFromHtml } from '../utils/pdf/downloadPdfFromHtml';

const bookingSteps = ['Choose package', 'Guest count', 'Review & confirm'];

const DEFAULT_GUEST_COUNT = 100;
const DEFAULT_BOOKING_FORM = { fullName: '', email: '', phone: '', notes: '' };

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || 'YOUR_WEB3FORMS_ACCESS_KEY';

const formatCurrency = (value) => `₹${value.toLocaleString('en-IN')}`;
const formatBudgetRange = (minValue, maxValue) => `${formatCurrency(minValue)} to ${formatCurrency(maxValue)}`;

const clampGuestCount = (value) => {
  if (Number.isNaN(value)) return DEFAULT_GUEST_COUNT;
  return Math.min(500, Math.max(5, value));
};

const validateBookingDetails = (form) => {
  const errors = {};

  if (!form.fullName.trim()) {
    errors.fullName = 'Name is required';
  }

  if (!form.phone.trim() || !/^\d{10}$/.test(form.phone)) {
    errors.phone = 'Enter a valid 10-digit mobile number';
  }

  if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) {
    errors.email = 'Enter a valid email address';
  }

  return errors;
};

export default function BookCatering({ isOpen, onClose }) {
  const defaultIndex = Math.max(cateringPackages.findIndex((pkg) => pkg.highlight), 0);
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);
  const [guestCount, setGuestCount] = useState(DEFAULT_GUEST_COUNT);
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingForm, setBookingForm] = useState(DEFAULT_BOOKING_FORM);
  const [formErrors, setFormErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [submitError, setSubmitError] = useState('');
  const [pdfStatus, setPdfStatus] = useState('idle');
  const carouselRef = useRef(null);
  const cardRefs = useRef([]);

  const selectedPackage = cateringPackages[selectedIndex] ?? cateringPackages[0];
  const minBudget = selectedPackage.start_price * guestCount;
  const maxBudget = selectedPackage.end_price * guestCount;
  const visibleStep = Math.min(bookingStep, bookingSteps.length) - 1;

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

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setBookingForm((currentForm) => ({ ...currentForm, [name]: value }));

    if (formErrors[name]) {
      setFormErrors((currentErrors) => ({ ...currentErrors, [name]: '' }));
    }
  };

  const handleBookingSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validateBookingDetails(bookingForm);
    if (Object.keys(nextErrors).length) {
      setFormErrors(nextErrors);
      return;
    }

    setSubmitStatus('sending');
    setSubmitError('');

    const now = new Date().toLocaleString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    const payload = {
      access_key: WEB3FORMS_KEY,
      subject: `Catering Order Enquiry — ${selectedPackage.title} (${guestCount} guests)`,
      from_name: 'Sri Annapoorna Website',
      replyto: bookingForm.email,
      message: `
New Catering Enquiry
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name             : ${bookingForm.fullName}
Mobile Number    : ${bookingForm.phone}
Email            : ${bookingForm.email}
Package          : ${selectedPackage.title}
Per Head Range   : ${selectedPackage.label}
Guest Count      : ${guestCount}
Estimated Budget : ${formatBudgetRange(minBudget, maxBudget)}

Notes:
${bookingForm.notes || '(No notes provided)'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Submitted At: ${now}
Source: Sri Annapoorna Booking Flow
      `.trim(),
      'Full Name': bookingForm.fullName,
      'Mobile Number': bookingForm.phone,
      'Email': bookingForm.email,
      'Package': selectedPackage.title,
      'Per Head Range': selectedPackage.label,
      'Guest Count': guestCount,
      'Estimated Budget': formatBudgetRange(minBudget, maxBudget),
      Notes: bookingForm.notes || 'Not provided',
      'Submitted At': now,
    };

    try {
      const response = await axios.post('https://api.web3forms.com/submit', payload, {
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        timeout: 15000,
      });

      if (response.data?.success) {
        setSubmitStatus('success');
        setBookingStep(3);
      } else {
        throw new Error(response.data?.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Booking submission error:', error);
      const message = error?.response?.data?.message || error.message || '';

      if (message.includes('access_key') || WEB3FORMS_KEY === 'YOUR_WEB3FORMS_ACCESS_KEY') {
        setSubmitError('Email not configured. Set VITE_WEB3FORMS_KEY in .env first.');
      } else {
        setSubmitError('Failed to send the email. Please try again.');
      }

      setSubmitStatus('error');
    }
  };

  const handleDownloadEnquiryPdf = async () => {
    setPdfStatus('generating');

    try {
      const safePackageName = selectedPackage.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      const html = buildEnquiryPdfHtml({
        packageTitle: selectedPackage.title,
        packageLabel: selectedPackage.label,
        guestCount,
        budgetRange: formatBudgetRange(minBudget, maxBudget),
        fullName: bookingForm.fullName,
        email: bookingForm.email,
        phone: bookingForm.phone,
        notes: bookingForm.notes,
      });

      await downloadPdfFromHtml(html, `sri-annapoorna-enquiry-${safePackageName}-${guestCount}-guests.pdf`);

      setPdfStatus('ready');
    } catch (error) {
      console.error('PDF download error:', error);
      setPdfStatus('error');
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    setSelectedIndex(defaultIndex);
    setGuestCount(DEFAULT_GUEST_COUNT);
    setBookingStep(1);
    setBookingForm(DEFAULT_BOOKING_FORM);
    setFormErrors({});
    setSubmitStatus('idle');
    setSubmitError('');
    setPdfStatus('idle');

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
                      const isCompleted = index < visibleStep;
                      const isCurrent = index === visibleStep;
                      const isUpcoming = index > visibleStep;

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
                <AnimatePresence mode="wait">
                  {bookingStep === 1 && (
                    <motion.div
                      key="booking-step-1"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.22, ease: 'easeOut' }}
                    >
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
                                      <div className="min-w-0">
                                        {pkg.tag && (
                                          <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-orange-300">
                                            {pkg.tag}
                                          </p>
                                        )}
                                        <h4 className={`mt-2 text-lg font-bold ${isSelected ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-200'}`}>
                                          {pkg.title}
                                        </h4>
                                        <div className={`mt-3 inline-flex rounded-2xl px-3 py-2 text-right ${isSelected ? 'bg-orange-50 dark:bg-orange-900/20' : 'bg-gray-50 dark:bg-gray-800'}`}>
                                          <div className="flex flex-col items-start">
                                            <p className="text-[10px] font-semibold tracking-[0.24em] uppercase text-gray-400 dark:text-gray-500">
                                              Per head
                                            </p>
                                            <p className={`mt-1 text-sm font-semibold ${isSelected ? 'text-orange-600 dark:text-orange-300' : 'text-gray-600 dark:text-gray-300'}`}>
                                              {pkg.label}
                                            </p>
                                          </div>
                                        </div>
                                      </div>

                                      <p className="mt-4 line-clamp-3 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                                        {pkg.items.slice(0, 3).join(' • ')}
                                      </p>

                                      <div className="ml-auto mt-4 flex">
                                        {isSelected && (
                                          <span className="inline-flex items-center gap-1 rounded-full bg-orange-500 px-3 py-1 text-[11px] font-semibold text-white">
                                            Active
                                          </span>
                                        )}
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
                                  <div className="flex h-5 w-5 items-center justify-center rounded-xl 
                                    {*/ bg-orange-50 */}
                                    text-orange-500 
                                    dark:bg-gray-900/20 
                                    dark:text-gray-500"
                                  >
                                    <Users size={18} />
                                  </div>
                                  <div>
                                    <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-gray-400 dark:text-gray-500">
                                      Guest count
                                    </p>
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
                                  {/* <IndianRupee size={18} className="mb-1 text-orange-500" /> */}
                                  <div>
                                    <p className="text-2xl font-bold leading-tight">
                                      {formatCurrency(minBudget)}
                                      <span className="mx-3 text-gray-300 dark:text-gray-700">➤</span>
                                      {formatCurrency(maxBudget)}
                                    </p>
                                    <p className="pt-2 mt-1 text-sm text-gray-500 dark:text-gray-500">
                                        {selectedPackage.title} for {guestCount} guests
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>
                    </motion.div>
                  )}

                  {bookingStep === 2 && (
                    <motion.div
                      key="booking-step-2"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.22, ease: 'easeOut' }}
                    >
                      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-start">
                        <form
                          id="booking-details-form"
                          onSubmit={handleBookingSubmit}
                          className="space-y-4 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500 dark:bg-orange-900/20 dark:text-orange-300">
                              <User size={18} />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-900 dark:text-white">Your details</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">We will email the enquiry using the details below</p>
                            </div>
                          </div>

                          <div className="grid gap-4 sm:grid-cols-2">
                            <label className="block">
                              <span className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200">Full name</span>
                              <div className="relative">
                                <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                                  <User size={15} />
                                </div>
                                <input
                                  name="fullName"
                                  type="text"
                                  value={bookingForm.fullName}
                                  onChange={handleFormChange}
                                  disabled={submitStatus === 'sending'}
                                  className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-10 pr-4 text-sm text-gray-700 outline-none transition-colors focus:border-orange-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                  placeholder="Enter your name"
                                />
                              </div>
                              {formErrors.fullName && <p className="mt-1.5 text-xs text-red-500">{formErrors.fullName}</p>}
                            </label>

                            <label className="block">
                              <span className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200">Mobile number</span>
                              <div className="relative">
                                <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                                  <Phone size={15} />
                                </div>
                                <input
                                  name="phone"
                                  type="tel"
                                  inputMode="numeric"
                                  value={bookingForm.phone}
                                  onChange={handleFormChange}
                                  disabled={submitStatus === 'sending'}
                                  className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-10 pr-4 text-sm text-gray-700 outline-none transition-colors focus:border-orange-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                  placeholder="10-digit mobile number"
                                />
                              </div>
                              {formErrors.phone && <p className="mt-1.5 text-xs text-red-500">{formErrors.phone}</p>}
                            </label>
                          </div>

                          <label className="block">
                            <span className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200">Email address</span>
                            <div className="relative">
                              <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                                <Mail size={15} />
                              </div>
                              <input
                                name="email"
                                type="email"
                                value={bookingForm.email}
                                onChange={handleFormChange}
                                disabled={submitStatus === 'sending'}
                                className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-10 pr-4 text-sm text-gray-700 outline-none transition-colors focus:border-orange-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                placeholder="you@example.com"
                              />
                            </div>
                            {formErrors.email && <p className="mt-1.5 text-xs text-red-500">{formErrors.email}</p>}
                          </label>

                          <label className="block">
                            <span className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200">Notes</span>
                            <textarea
                              name="notes"
                              value={bookingForm.notes}
                              onChange={handleFormChange}
                              rows={4}
                              disabled={submitStatus === 'sending'}
                              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition-colors focus:border-orange-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                              placeholder="Any event date, venue, or special instructions"
                            />
                          </label>

                          {submitError && (
                            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
                              {submitError}
                            </div>
                          )}
                        </form>

                        <div className="flex flex-col gap-4 lg:self-start">
                          <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                            <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-orange-500">
                              Your selection
                            </p>
                            <h4 className="mt-2 text-xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                              {selectedPackage.title}
                            </h4>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                              {selectedPackage.label} per head
                            </p>

                            <div className="mt-4 space-y-3 rounded-2xl bg-gray-50 p-4 dark:bg-gray-800/60">
                              <div className="flex items-center justify-between gap-3 text-sm">
                                <span className="text-gray-500 dark:text-gray-400">Guests</span>
                                <span className="font-semibold text-gray-900 dark:text-white">{guestCount}</span>
                              </div>
                              <div className="flex items-center justify-between gap-3 text-sm">
                                <span className="text-gray-500 dark:text-gray-400">Budget</span>
                                <span className="font-semibold text-gray-900 dark:text-white">{formatBudgetRange(minBudget, maxBudget)}</span>
                              </div>
                              <div className="flex items-center justify-between gap-3 text-sm">
                                <span className="text-gray-500 dark:text-gray-400">Package range</span>
                                <span className="font-semibold text-gray-900 dark:text-white">{selectedPackage.label}</span>
                              </div>
                            </div>

                            <p className="mt-4 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                              This summary will be included in the enquiry email.
                            </p>

                            <button
                              type="button"
                              onClick={() => setBookingStep(1)}
                              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-300 dark:hover:text-orange-200"
                            >
                              Edit package selection
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {bookingStep === 3 && (
                    <motion.div
                      key="booking-step-3"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.22, ease: 'easeOut' }}
                      className="flex min-h-[320px] items-center justify-center"
                    >
                      <div className="w-full max-w-2xl rounded-[2rem] border border-emerald-200 bg-white p-8 text-center shadow-sm dark:border-emerald-900/50 dark:bg-gray-900">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-green-500 shadow-lg shadow-emerald-500/25">
                          <CheckCircle size={34} className="text-white" />
                        </div>
                        <h3 className="mt-5 text-2xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                          Mail sent successfully
                        </h3>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                          Your catering enquiry has been sent. We will contact you shortly.
                        </p>

                        <div className="mt-6 grid gap-3 text-left sm:grid-cols-3">
                          <div className="rounded-2xl bg-gray-50 p-4 dark:bg-gray-800/60">
                            <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-gray-400 dark:text-gray-500">Package</p>
                            <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">{selectedPackage.title}</p>
                          </div>
                          <div className="rounded-2xl bg-gray-50 p-4 dark:bg-gray-800/60">
                            <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-gray-400 dark:text-gray-500">Guests</p>
                            <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">{guestCount}</p>
                          </div>
                          <div className="rounded-2xl bg-gray-50 p-4 dark:bg-gray-800/60">
                            <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-gray-400 dark:text-gray-500">Budget</p>
                            <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">{formatBudgetRange(minBudget, maxBudget)}</p>
                          </div>
                        </div>

                        <p className="mt-6 text-xs text-gray-400 dark:text-gray-500">
                          Submitted from the Sri Annapoorna booking flow.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {bookingStep === 1 && (
                <div className="flex flex-col gap-3 border-t border-gray-100 px-5 py-4 dark:border-gray-800 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    Next, enter your details so we can mail the enquiry.
                  </p>

                  <button
                    type="button"
                    onClick={() => setBookingStep(2)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-transform hover:scale-[1.02]"
                  >
                    Continue
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}

              {bookingStep === 2 && (
                <div className="flex flex-col gap-3 border-t border-gray-100 px-5 py-4 dark:border-gray-800 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                  <button
                    type="button"
                    onClick={() => setBookingStep(1)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
                  >
                    <ChevronLeft size={16} />
                    Back
                  </button>

                  <button
                    type="submit"
                    form="booking-details-form"
                    disabled={submitStatus === 'sending'}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {submitStatus === 'sending' ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Mail to enquire order
                      </>
                    )}
                  </button>
                </div>
              )}

              {bookingStep === 3 && (
                <div className="flex flex-col gap-3 border-t border-gray-100 px-5 py-4 dark:border-gray-800 sm:flex-row sm:items-center sm:justify-end sm:px-6">
                  <button
                    type="button"
                    onClick={handleDownloadEnquiryPdf}
                    disabled={pdfStatus === 'generating'}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-orange-200 bg-white px-6 py-3 text-sm font-semibold text-orange-600 shadow-sm transition-colors hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-70 dark:border-orange-900/50 dark:bg-gray-900 dark:text-orange-300 dark:hover:bg-gray-800"
                  >
                    {pdfStatus === 'generating' ? 'Creating PDF...' : 'Download enquiry PDF'}
                    <Download size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-transform hover:scale-[1.02]"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}