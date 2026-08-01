// ============================================
// Footer — Animated rich footer
// ============================================
import { motion } from 'framer-motion';
import { UtensilsCrossed, Phone, Mail, MapPin, Heart, ArrowUp } from 'lucide-react';

const quickLinks = [
  { label: 'Menu',              href: '#menu'     },
  { label: 'Catering Services', href: '#catering' },
  { label: 'Contact Us',        href: '#contact'  },
  { label: 'Franchise Enquiry', href: '#contact'  },
  { label: 'Customer Reviews',  href: '#contact'  },
];

const SocialIcons = {
  Instagram: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
    </svg>
  ),
  Facebook: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
  Twitter: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  Youtube: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
    </svg>
  ),
  Whatsapp: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
    </svg>
  ),
};

const socialLinks = [
  { key: 'Instagram', label: 'Instagram', href: '#',                         hoverClass: 'hover:bg-pink-500/20 hover:text-pink-400 hover:border-pink-400/30' },
  { key: 'Facebook',  label: 'Facebook',  href: '#',                         hoverClass: 'hover:bg-blue-500/20 hover:text-blue-400 hover:border-blue-400/30' },
  { key: 'Twitter',   label: 'Twitter/X', href: '#',                         hoverClass: 'hover:bg-sky-500/20 hover:text-sky-400 hover:border-sky-400/30' },
  { key: 'Youtube',   label: 'YouTube',   href: '#',                         hoverClass: 'hover:bg-red-500/20 hover:text-red-400 hover:border-red-400/30' },
  { key: 'Whatsapp',  label: 'WhatsApp',  href: 'https://wa.me/919876543210', hoverClass: 'hover:bg-green-500/20 hover:text-green-400 hover:border-green-400/30' },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleNav = (e, href) => {
    if (!href.startsWith('http')) {
      e.preventDefault();
      const id = href.replace('#', '');
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-amber-950 to-stone-950 dark:from-gray-950 dark:to-black text-white overflow-hidden">
      {/* Decorative top wave */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />

      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #f97316 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* ── Brand column ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="sm:col-span-2 lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
                <UtensilsCrossed size={18} className="text-white" />
              </div>
              <div>
                <p className="font-bold text-white text-base" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Sri Annapoorna
                </p>
                <p className="text-orange-400 text-[10px] tracking-widest uppercase">Mess & Cafeteria</p>
              </div>
            </div>

            <p className="text-white/55 text-sm leading-relaxed mb-5">
              Serving authentic South Indian flavors with love and tradition since 2008.
              Every dish is made fresh daily with the finest ingredients.
            </p>

            {/* Social icons */}
            <div className="flex flex-wrap gap-2">
              {socialLinks.map(({ key, label, href, hoverClass }) => {
                const IconComp = SocialIcons[key];
                return (
                  <motion.a
                    key={label}
                    href={href}
                    onClick={(e) => handleNav(e, href)}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-8 h-8 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center text-white/60 transition-all duration-200 ${hoverClass}`}
                  >
                    {IconComp && <IconComp />}
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* ── Quick Links ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-semibold text-white/90 mb-4 text-xs tracking-widest uppercase">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNav(e, link.href)}
                    className="text-sm text-white/50 hover:text-orange-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-orange-500/40 group-hover:bg-orange-400 group-hover:w-2 transition-all duration-200" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── Contact ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <h4 className="font-semibold text-white/90 mb-4 text-xs tracking-widest uppercase">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-white/50">
                <MapPin size={14} className="text-orange-400 flex-shrink-0 mt-0.5" />
                <span>12, Anna Salai, T. Nagar,<br />Chennai – 600 017</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/50">
                <Phone size={14} className="text-orange-400 flex-shrink-0" />
                <a href="tel:+919876543210" className="hover:text-orange-400 transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/50">
                <Mail size={14} className="text-orange-400 flex-shrink-0" />
                <a href="mailto:info@sriannapoorna.com" className="hover:text-orange-400 transition-colors truncate">
                  info@sriannapoorna.com
                </a>
              </li>
            </ul>
          </motion.div>

          {/* ── Hours ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-semibold text-white/90 mb-4 text-xs tracking-widest uppercase">Hours</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { day: 'Mon – Fri', time: '6:00 AM – 10:00 PM' },
                { day: 'Saturday',  time: '6:00 AM – 11:00 PM' },
                { day: 'Sunday',    time: '7:00 AM – 10:00 PM' },
              ].map(({ day, time }) => (
                <li key={day} className="flex justify-between gap-3">
                  <span className="text-white/35 whitespace-nowrap">{day}</span>
                  <span className="text-orange-300/80 whitespace-nowrap">{time}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-green-400 font-medium">Open Now</span>
            </div>

            {/* Back to top */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 flex items-center gap-2 text-xs text-white/40 hover:text-orange-400 transition-colors group"
            >
              <span className="w-6 h-6 rounded-lg border border-white/10 group-hover:border-orange-400/40 flex items-center justify-center transition-colors">
                <ArrowUp size={12} />
              </span>
              Back to top
            </motion.button>
          </motion.div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/35">
          <p>© 2026 Sri Annapoorna Mess & Cafeteria. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Made with
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            >
              <Heart size={10} className="text-red-400 fill-red-400" />
            </motion.span>
            in Chennai
          </p>
        </div>
      </div>
    </footer>
  );
}
