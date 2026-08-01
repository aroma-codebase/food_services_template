// ============================================
// ContactForm — Franchise Enquiry
// Uses Web3Forms API (https://web3forms.com)
// → sends real email to worklancers.support@gmail.com
// → no backend needed, free, no SMTP config
// ============================================
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader2, User, Phone, Mail, MapPin, Wallet, MessageSquare } from 'lucide-react';
import axios from 'axios';

// ─────────────────────────────────────────────
// Web3Forms setup
// 1. Go to https://web3forms.com
// 2. Enter: worklancers.support@gmail.com → Get Access Key
// 3. Paste the key below (or in .env as VITE_WEB3FORMS_KEY)
// The key below is a pre-generated demo key for this address.
// Replace with your own key from web3forms.com for production.
// ─────────────────────────────────────────────
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || 'YOUR_WEB3FORMS_ACCESS_KEY';

const budgetOptions = [
  '₹5 Lakh – ₹10 Lakh',
  '₹10 Lakh – ₹20 Lakh',
  '₹20 Lakh – ₹50 Lakh',
  '₹50 Lakh+',
];

const EMPTY = { fullName: '', phone: '', email: '', city: '', budget: '', message: '' };

// Validation rules
function validate(form) {
  const e = {};
  if (!form.fullName.trim())                                e.fullName = 'Name is required';
  if (!form.phone.trim() || !/^\d{10}$/.test(form.phone))  e.phone    = 'Enter a valid 10-digit number';
  if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email address';
  if (!form.city.trim())                                    e.city     = 'City is required';
  return e;
}

export default function ContactForm() {
  const [form,     setForm]     = useState(EMPTY);
  const [status,   setStatus]   = useState('idle'); // idle | sending | success | error
  const [errors,   setErrors]   = useState({});
  const [serverErr,setServerErr] = useState('');

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(ev => ({ ...ev, [e.target.name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setStatus('sending');
    setServerErr('');

    // Format submission time
    const now = new Date().toLocaleString('en-IN', {
      day: '2-digit', month: 'long', year: 'numeric',
      hour: '2-digit', minute: '2-digit', hour12: true,
    });

    // Build the email body that Web3Forms will send
    const payload = {
      access_key:  WEB3FORMS_KEY,
      subject:     `New Franchise Enquiry — ${form.fullName} (${form.city})`,
      from_name:   'Sri Annapoorna Website',
      // replyto sends replies to the enquirer's email
      replyto:     form.email,
      // Nicely formatted body (Web3Forms passes these as the email body)
      message: `
New Franchise Enquiry
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name             : ${form.fullName}
Phone            : ${form.phone}
Email            : ${form.email}
City             : ${form.city}
Investment Budget: ${form.budget || 'Not specified'}

Message:
${form.message || '(No message provided)'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Submitted At: ${now}
Source: Sri Annapoorna Website — Franchise Enquiry Form
      `.trim(),
      // Web3Forms also supports these structured fields
      'Full Name':        form.fullName,
      'Phone':            form.phone,
      'Email':            form.email,
      'City':             form.city,
      'Investment Budget': form.budget || 'Not specified',
      'Submitted At':     now,
    };

    try {
      const res = await axios.post('https://api.web3forms.com/submit', payload, {
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        timeout: 15000,
      });

      if (res.data?.success) {
        setStatus('success');
        setForm(EMPTY);
      } else {
        throw new Error(res.data?.message || 'Submission failed');
      }
    } catch (err) {
      console.error('Form submission error:', err);
      const msg = err?.response?.data?.message || err.message || '';
      if (msg.includes('access_key') || WEB3FORMS_KEY === 'YOUR_WEB3FORMS_ACCESS_KEY') {
        // Key not configured — show helpful guidance
        setServerErr('Email not configured. Get your free key at web3forms.com and set VITE_WEB3FORMS_KEY in .env');
      } else {
        setServerErr('Failed to send. Please call us at +91 98765 43210 or try again later.');
      }
      setStatus('error');
    }
  };

  /* ── Success state ── */
  if (status === 'success') {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-14 text-center">
        <motion.div initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 180, delay: 0.1 }}
          className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mb-5 shadow-xl shadow-green-500/30">
          <CheckCircle size={36} className="text-white" />
        </motion.div>
        <motion.h3 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
          style={{ fontFamily: 'Playfair Display, serif' }}>
          Enquiry Sent Successfully!
        </motion.h3>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
          className="text-gray-500 dark:text-gray-400 mb-1 max-w-sm text-sm">
          Thank you for your interest. Our team will contact you within <strong>24 hours</strong>.
        </motion.p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
          className="text-xs text-gray-400 mb-7">
          Email delivered to: worklancers.support@gmail.com
        </motion.p>
        <button onClick={() => setStatus('idle')}
          className="px-7 py-2.5 bg-orange-500 text-white rounded-xl text-sm font-semibold hover:bg-orange-600 transition-colors shadow-md shadow-orange-500/25">
          Submit Another Enquiry
        </button>
      </motion.div>
    );
  }

  const sending = status === 'sending';

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Row: Name + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field name="fullName" label="Full Name" type="text"  icon={User}   value={form.fullName} onChange={handleChange} error={errors.fullName} disabled={sending} />
        <Field name="phone"    label="Phone"     type="tel"   icon={Phone}  value={form.phone}    onChange={handleChange} error={errors.phone}    disabled={sending} />
      </div>

      {/* Row: Email + City */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field name="email" label="Email Address" type="email" icon={Mail}   value={form.email} onChange={handleChange} error={errors.email} disabled={sending} />
        <Field name="city"  label="City"           type="text"  icon={MapPin} value={form.city}  onChange={handleChange} error={errors.city}  disabled={sending} />
      </div>

      {/* Budget */}
      <div className="relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <Wallet size={15} />
        </div>
        <select name="budget" value={form.budget} onChange={handleChange} disabled={sending}
          className="w-full pl-10 pr-4 py-3.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:border-orange-500 focus:outline-none text-sm transition-all appearance-none cursor-pointer disabled:opacity-60 focus:ring-2 focus:ring-orange-500/20">
          <option value="">Investment Budget (optional)</option>
          {budgetOptions.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">▾</div>
      </div>

      {/* Message */}
      <div className="relative">
        <div className="absolute left-3.5 top-3.5 text-gray-400 pointer-events-none">
          <MessageSquare size={15} />
        </div>
        <textarea name="message" value={form.message} onChange={handleChange} rows={4} disabled={sending}
          placeholder="Tell us about your plans, preferred location, or any questions..."
          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:border-orange-500 focus:outline-none text-sm resize-none transition-all disabled:opacity-60 focus:ring-2 focus:ring-orange-500/20" />
      </div>

      {/* Server error */}
      <AnimatePresence>
        {serverErr && (
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex items-start gap-2.5 p-3.5 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-600 dark:text-red-400">
            <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
            <span>{serverErr}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit */}
      <motion.button type="submit" disabled={sending}
        whileHover={!sending ? { scale: 1.02, boxShadow: '0 12px 35px rgba(249,115,22,0.38)' } : {}}
        whileTap={!sending ? { scale: 0.98 } : {}}
        className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-base rounded-xl shadow-lg shadow-orange-500/25 hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center justify-center gap-2.5 disabled:opacity-70 disabled:cursor-not-allowed">
        {sending ? (
          <><Loader2 size={19} className="animate-spin" />Sending Enquiry...</>
        ) : (
          <><Send size={17} />Send Franchise Enquiry</>
        )}
      </motion.button>

      <p className="text-center text-xs text-gray-400 leading-relaxed">
        🔒 Your details are private and used only to respond to this enquiry.
      </p>
    </form>
  );
}

/* ── Animated floating-label input ── */
function Field({ name, label, type, icon: Icon, value, onChange, error, disabled }) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div>
      <div className={`relative rounded-xl border-2 transition-all duration-200 ${
        error         ? 'border-red-400 dark:border-red-500' :
        focused       ? 'border-orange-500 ring-2 ring-orange-500/15' :
        'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
      } bg-white dark:bg-gray-800 overflow-hidden`}>

        {/* Icon */}
        <div className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-200 ${
          focused ? 'text-orange-500' : 'text-gray-400'
        }`}>
          <Icon size={15} />
        </div>

        {/* Floating label */}
        <label htmlFor={name}
          className={`absolute left-10 pointer-events-none transition-all duration-200 font-medium ${
            active
              ? 'top-1.5 text-[10px] text-orange-500 dark:text-orange-400'
              : 'top-1/2 -translate-y-1/2 text-sm text-gray-400'
          }`}>
          {label}{name !== 'message' && name !== 'budget' ? ' *' : ''}
        </label>

        <input id={name} name={name} type={type} value={value} onChange={onChange}
          disabled={disabled} autoComplete="off"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full pl-10 pr-4 pt-5 pb-1.5 bg-transparent text-gray-900 dark:text-white text-sm focus:outline-none disabled:opacity-60" />
      </div>
      {error && (
        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-xs text-red-500 flex items-center gap-1">
          <AlertCircle size={10} />{error}
        </motion.p>
      )}
    </div>
  );
}
