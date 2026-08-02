// ============================================
// Menu Page — Hero + 3 meal-time sections (Gallery removed)
// ============================================
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import MenuSection from '../components/MenuSection';
import { breakfastItems, lunchItems, dinnerItems, foodImages } from '../data/menuData';

export default function MenuPage({ onBookCatering }) {
  return (
    <div>
      {/* Full-screen hero with carousel */}
      <Hero onBookCatering={onBookCatering} />

      {/* Menu sections — directly below hero, no gallery gap */}
      <section id="menu" className="bg-gray-50 dark:bg-gray-900 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section intro */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <p className="text-orange-500 text-sm font-semibold tracking-widest uppercase mb-2">
              Our Menu
            </p>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-3"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Taste the Tradition
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-base">
              Every dish cooked fresh with handpicked spices, traditional recipes,
              and a generous helping of love.
            </p>
          </motion.div>

          {/* Decorative divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex items-center gap-4 mb-14"
          >
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-orange-300 dark:to-orange-700" />
            <span className="text-orange-400 text-xl">✦</span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-orange-300 dark:to-orange-700" />
          </motion.div>

          {/* Breakfast */}
          <MenuSection category="Breakfast" icon="🌅" items={breakfastItems} imageSrc={foodImages.breakfast} />

          <div className="flex items-center gap-4 my-10">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-orange-200 dark:to-orange-800" />
            <span className="text-orange-300 text-lg">❋</span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-orange-200 dark:to-orange-800" />
          </div>

          {/* Lunch */}
          <MenuSection category="Lunch" icon="☀️" items={lunchItems} imageSrc={foodImages.lunch} />

          <div className="flex items-center gap-4 my-10">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-orange-200 dark:to-orange-800" />
            <span className="text-orange-300 text-lg">❋</span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-orange-200 dark:to-orange-800" />
          </div>

          {/* Dinner */}
          <MenuSection category="Dinner" icon="🌙" items={dinnerItems} imageSrc={foodImages.dinner} />

        </div>
      </section>
    </div>
  );
}
