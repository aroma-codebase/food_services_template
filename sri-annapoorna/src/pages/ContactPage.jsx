// ============================================
// Contact Page — Animated cards + Map + Form + Reviews
// ============================================
import { motion } from 'framer-motion';
import {
  MapPin, Phone, MessageCircle, Mail, Clock,
  ExternalLink, ArrowUpRight
} from 'lucide-react';
import ContactForm from '../components/ContactForm';
import ReviewForm  from '../components/ReviewForm';

const contactCards = [
  {
    icon: MapPin,
    title: 'Visit Us',
    lines: ['12, Anna Salai, T. Nagar', 'Chennai – 600 017'],
    action: null,
    gradient: 'from-blue-500 to-blue-600',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    icon: Phone,
    title: 'Call Us',
    lines: ['+91 98765 43210', '+91 94456 78901'],
    action: 'tel:+919876543210',
    actionLabel: 'Call Now',
    gradient: 'from-green-500 to-emerald-600',
    bg: 'bg-green-50 dark:bg-green-900/20',
    iconColor: 'text-green-600 dark:text-green-400',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    lines: ['+91 98765 43210', '8 AM – 9 PM'],
    action: 'https://wa.me/919876543210',
    actionLabel: 'Chat Now',
    gradient: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    icon: Mail,
    title: 'Email Us',
    lines: ['info@sriannapoorna.com', 'catering@sriannapoorna.com'],
    action: 'mailto:info@sriannapoorna.com',
    actionLabel: 'Send Email',
    gradient: 'from-orange-500 to-orange-600',
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    iconColor: 'text-orange-600 dark:text-orange-400',
  },
  {
    icon: Clock,
    title: 'Working Hours',
    lines: ['Mon–Fri: 6 AM – 10 PM', 'Sat: 6 AM – 11 PM', 'Sun: 7 AM – 10 PM'],
    action: null,
    gradient: 'from-purple-500 to-purple-600',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    iconColor: 'text-purple-600 dark:text-purple-400',
    badge: 'Open Now',
  },
];

export default function ContactPage() {
  return (
    <section id="contact" className="bg-gray-50 dark:bg-gray-950 relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #f97316 0, #f97316 1px, transparent 0, transparent 50%)`,
          backgroundSize: '30px 30px',
        }}
      />

      {/* ── Hero ─────────────────────────────────── */}
      <div className="relative min-h-[44vh] sm:min-h-[52vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80"
            alt="Restaurant ambiance"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/70" />
          {/* Subtle vignette pattern overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-950/30 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/20 border border-orange-400/40 backdrop-blur-sm mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
            <span className="text-orange-300 text-xs font-medium tracking-widest uppercase">Get In Touch</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Let's Serve{' '}
            <span className="text-orange-400">You Better</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-white/70 text-lg"
          >
            Visit us, call us, or drop a message — we're always here.
          </motion.p>
        </div>
      </div>

      {/* ── Contact Cards ──────────────────────── */}
      <div className="relative z-10 py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-14">
            {contactCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.07 }}
                  whileHover={{ y: -5, boxShadow: '0 16px 40px rgba(0,0,0,0.1)' }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 hover:border-orange-200 dark:hover:border-orange-700 transition-all duration-300 group"
                >
                  {/* Icon */}
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={18} className="text-white" />
                  </div>

                  <div className="flex items-start justify-between gap-1 mb-2">
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">{card.title}</h4>
                    {card.badge && (
                      <span className="flex items-center gap-1 text-[9px] bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 font-bold px-1.5 py-0.5 rounded-full flex-shrink-0">
                        <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                        {card.badge}
                      </span>
                    )}
                  </div>

                  {card.lines.map((line, i) => (
                    <p key={i} className="text-xs text-gray-500 dark:text-gray-400 leading-5">{line}</p>
                  ))}

                  {card.action && (
                    <a
                      href={card.action}
                      target={card.action.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-3 text-xs text-orange-600 dark:text-orange-400 font-semibold hover:gap-2 transition-all"
                    >
                      {card.actionLabel}
                      <ArrowUpRight size={11} />
                    </a>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* ── Map + Form ─────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-5">
                <p className="text-orange-500 text-xs font-semibold tracking-widest uppercase mb-1">Find Us</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white"
                  style={{ fontFamily: 'Playfair Display, serif' }}>
                  Our Location
                </h3>
              </div>

              <div className="relative rounded-2xl overflow-hidden h-80 border border-gray-200 dark:border-gray-700 shadow-md group">
                <iframe
                  title="Sri Annapoorna Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.5799!2d80.2338!3d13.0475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDAyJzUxLjAiTiA4MMKwMTQnMDIuMCJF!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin"
                  className="w-full h-full grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                {/* Address overlay */}
                <div className="absolute bottom-3 left-3 right-3 pointer-events-none">
                  <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-lg flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-orange-500 flex items-center justify-center flex-shrink-0">
                      <MapPin size={12} className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900 dark:text-white">Sri Annapoorna Mess & Cafeteria</p>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400">12, Anna Salai, T. Nagar, Chennai</p>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-3 text-sm text-orange-600 dark:text-orange-400 font-medium hover:underline"
              >
                <ExternalLink size={13} />
                Get Directions on Google Maps
              </a>
            </motion.div>

            {/* Franchise Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 relative overflow-hidden"
            >
              {/* Animated top gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 rounded-t-2xl" />

              {/* Decorative blob */}
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-orange-100/50 dark:bg-orange-900/10 rounded-full blur-3xl pointer-events-none" />

              <div className="p-6 sm:p-8">
                <div className="mb-6 pt-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-block w-5 h-0.5 bg-orange-500 rounded" />
                    <p className="text-orange-500 text-xs font-bold tracking-widest uppercase">Franchise</p>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2"
                    style={{ fontFamily: 'Playfair Display, serif' }}>
                    Franchise Enquiry
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    Interested in opening your own Sri Annapoorna branch? Fill the form and our team will reach out within 24 hours.
                  </p>
                </div>

                {/* Feature chips */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {['Low Investment', 'Full Training', 'Brand Support', 'Proven Model'].map(chip => (
                    <span key={chip} className="inline-flex items-center gap-1 px-2.5 py-1 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 text-[11px] font-semibold rounded-full border border-orange-100 dark:border-orange-800/40">
                      <span className="w-1 h-1 rounded-full bg-orange-500" />
                      {chip}
                    </span>
                  ))}
                </div>

                <ContactForm />
              </div>
            </motion.div>
          </div>

          {/* ── Reviews ──────────────────────────── */}
          <div className="pt-4">
            <div className="text-center mb-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800/40 rounded-full mb-3"
              >
                <span className="text-orange-500 text-xs font-bold tracking-widest uppercase">Customer Reviews</span>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                What Our Guests Say
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-gray-500 dark:text-gray-400 max-w-md mx-auto text-sm"
              >
                Real experiences from verified customers — unfiltered and honest.
              </motion.p>
            </div>
            <ReviewForm />
          </div>
        </div>
      </div>
    </section>
  );
}
