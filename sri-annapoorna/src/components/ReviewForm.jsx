// ============================================
// ReviewForm — Premium animated review cards
// ============================================
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, MessageSquare, Quote } from 'lucide-react';

const seedReviews = [
  {
    id: 1,
    name: 'Priya Krishnan',
    rating: 5,
    text: 'Absolutely love the food here! The masala dosa is crispy and perfectly spiced. The filter coffee is a must-try — exactly like what you get in Chennai\'s traditional mess. Highly recommend!',
    date: 'March 2026',
    avatar: 'PK',
    title: 'Best South Indian in Chennai!',
  },
  {
    id: 2,
    name: 'Rajesh Muthu',
    rating: 5,
    text: 'We booked their catering for our daughter\'s wedding and they were exceptional. The meals were hot, fresh, and delicious. Very punctual and professional. Will definitely book again!',
    date: 'February 2026',
    avatar: 'RM',
    title: 'Outstanding catering service',
  },
  {
    id: 3,
    name: 'Sunita Raman',
    rating: 4,
    text: 'The weekday meals are fantastic value for money. Sambar is always fresh and the rice varieties are wonderful. A true home-style South Indian experience right here in the city.',
    date: 'January 2026',
    avatar: 'SR',
    title: 'Amazing value for money',
  },
];

const avatarGradients = [
  'from-orange-400 to-orange-600',
  'from-amber-400 to-amber-600',
  'from-rose-400 to-rose-600',
  'from-purple-400 to-purple-600',
  'from-teal-400 to-teal-600',
  'from-blue-400 to-blue-600',
];

const ratingLabels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

export default function ReviewForm() {
  const [reviews, setReviews]   = useState(seedReviews);
  const [form, setForm]         = useState({ name: '', title: '', rating: 0, hoverRating: 0, text: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]       = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.rating || !form.text.trim()) {
      setError('Please fill in all fields and select a rating.');
      return;
    }
    const newReview = {
      id: Date.now(),
      name:   form.name.trim(),
      title:  form.title.trim() || 'Great experience!',
      rating: form.rating,
      text:   form.text.trim(),
      date:   new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }),
      avatar: form.name.trim().slice(0, 2).toUpperCase(),
    };
    setReviews([newReview, ...reviews]);
    setForm({ name: '', title: '', rating: 0, hoverRating: 0, text: '' });
    setError('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div>
      {/* ── Submission form ─────────────────────── */}
      {
      // <motion.div
      //   initial={{ opacity: 0, y: 30 }}
      //   whileInView={{ opacity: 1, y: 0 }}
      //   viewport={{ once: true }}
      //   transition={{ duration: 0.5 }}
      //   className="bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-gray-700 mb-12 relative overflow-hidden"
      // >
      //   {/* Decorative gradient blob */}
      //   <div className="absolute -top-12 -right-12 w-40 h-40 bg-orange-100 dark:bg-orange-900/20 rounded-full blur-3xl pointer-events-none" />

      //   <div className="relative z-10">
      //     <div className="flex items-center gap-3 mb-6">
      //       <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-md">
      //         <MessageSquare size={18} className="text-white" />
      //       </div>
      //       <div>
      //         <h3 className="font-bold text-gray-900 dark:text-white text-lg"
      //           style={{ fontFamily: 'Playfair Display, serif' }}>
      //           Share Your Experience
      //         </h3>
      //         <p className="text-xs text-gray-400">Your review helps others discover great food</p>
      //       </div>
      //     </div>

      //     <form onSubmit={handleSubmit} className="space-y-4">
      //       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      //         <input
      //           type="text"
      //           value={form.name}
      //           onChange={e => setForm({ ...form, name: e.target.value })}
      //           placeholder="Your Name *"
      //           className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none text-sm transition-colors"
      //         />
      //         <input
      //           type="text"
      //           value={form.title}
      //           onChange={e => setForm({ ...form, title: e.target.value })}
      //           placeholder="Review Title (optional)"
      //           className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none text-sm transition-colors"
      //         />
      //       </div>

      //       {/* Star Rating */}
      //       <div className="flex items-center gap-3">
      //         <span className="text-sm text-gray-500 dark:text-gray-400">Your Rating:</span>
      //         <div className="flex gap-1">
      //           {[1, 2, 3, 4, 5].map(star => (
      //             <motion.button
      //               key={star}
      //               type="button"
      //               whileHover={{ scale: 1.3 }}
      //               whileTap={{ scale: 0.9 }}
      //               onClick={() => setForm({ ...form, rating: star })}
      //               onMouseEnter={() => setForm({ ...form, hoverRating: star })}
      //               onMouseLeave={() => setForm({ ...form, hoverRating: 0 })}
      //             >
      //               <Star
      //                 size={28}
      //                 className={`transition-all duration-150 ${
      //                   star <= (form.hoverRating || form.rating)
      //                     ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]'
      //                     : 'text-gray-300 dark:text-gray-600'
      //                 }`}
      //               />
      //             </motion.button>
      //           ))}
      //         </div>
      //         {form.rating > 0 && (
      //           <motion.span
      //             initial={{ opacity: 0, scale: 0.8 }}
      //             animate={{ opacity: 1, scale: 1 }}
      //             className="text-sm font-semibold text-amber-500"
      //           >
      //             {ratingLabels[form.rating]}
      //           </motion.span>
      //         )}
      //       </div>

      //       <textarea
      //         value={form.text}
      //         onChange={e => setForm({ ...form, text: e.target.value })}
      //         rows={3}
      //         placeholder="Tell us about your experience... *"
      //         className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none text-sm resize-none transition-colors"
      //       />

      //       {error && (
      //         <motion.p
      //           initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      //           className="text-xs text-red-500"
      //         >{error}</motion.p>
      //       )}

      //       <div className="flex items-center gap-4">
      //         <motion.button
      //           type="submit"
      //           whileHover={{ scale: 1.02, boxShadow: '0 8px 25px rgba(249,115,22,0.4)' }}
      //           whileTap={{ scale: 0.97 }}
      //           className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-sm rounded-xl shadow-md shadow-orange-500/25 flex items-center gap-2"
      //         >
      //           <Send size={15} />
      //           Post Review
      //         </motion.button>

      //         <AnimatePresence>
      //           {submitted && (
      //             <motion.p
      //               initial={{ opacity: 0, x: 10 }}
      //               animate={{ opacity: 1, x: 0 }}
      //               exit={{ opacity: 0 }}
      //               className="text-sm text-green-600 dark:text-green-400 font-medium flex items-center gap-1.5"
      //             >
      //               <span className="text-green-500">✓</span> Review posted!
      //             </motion.p>
      //           )}
      //         </AnimatePresence>
      //       </div>
      //     </form>
      //   </div>
      // </motion.div>
      }

      {/* ── Review cards grid ───────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <AnimatePresence>
          {reviews.map((review, idx) => (
            <ReviewCard key={review.id} review={review} index={idx} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ── Individual premium review card ── */
function ReviewCard({ review, index }) {
  const gradient = avatarGradients[index % avatarGradients.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(249,115,22,0.1)' }}
      className="relative bg-white dark:bg-gray-800 rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:border-orange-200 dark:hover:border-orange-700 transition-all duration-300 overflow-hidden"
    >
      {/* Decorative quote icon bg */}
      <Quote
        size={60}
        className="absolute -top-2 -right-2 text-orange-100 dark:text-orange-900/30 rotate-180"
      />

      {/* Header */}
      <div className="flex items-center gap-3 mb-4 relative z-10">
        {/* Circular avatar */}
        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-md`}>
          {review.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-gray-900 dark:text-white text-sm truncate">{review.name}</p>
          {review.title && (
            <p className="text-xs text-orange-600 dark:text-orange-400 font-medium truncate">{review.title}</p>
          )}
        </div>
        <span className="text-xs text-gray-400 flex-shrink-0">{review.date}</span>
      </div>

      {/* Animated stars */}
      <div className="flex gap-0.5 mb-3">
        {[1, 2, 3, 4, 5].map(star => (
          <motion.div
            key={star}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.06 + star * 0.05, type: 'spring', stiffness: 300 }}
          >
            <Star
              size={15}
              className={star <= review.rating
                ? 'fill-amber-400 text-amber-400'
                : 'text-gray-200 dark:text-gray-600'}
            />
          </motion.div>
        ))}
        <span className="ml-1.5 text-xs font-semibold text-amber-500">{review.rating}.0</span>
      </div>

      {/* Review text */}
      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-4 relative z-10">
        "{review.text}"
      </p>

      {/* Bottom verified tag */}
      <div className="mt-4 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
        <span className="text-[10px] text-gray-400 font-medium">Verified Customer</span>
      </div>
    </motion.div>
  );
}
