import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { getTestimonials } from '../../lib/api.js';

// Auto-playing, soft cross-fade testimonial slider.
export default function TestimonialCarousel() {
  const [items, setItems] = useState([]);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    getTestimonials({ featured: 'true' })
      .then((data) => setItems(data.length ? data : []))
      .catch(() => {});
  }, []);

  const go = (dir) =>
    setIndex((i) => (i + dir + items.length) % items.length);

  // Auto-advance every 6s unless paused or empty
  useEffect(() => {
    if (paused || items.length <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), 6000);
    return () => clearInterval(id);
  }, [paused, items.length]);

  if (items.length === 0) {
    return (
      <p className="text-center text-sage-500">
        Run the seed script to load guest reviews.
      </p>
    );
  }

  const t = items[index];

  return (
    <div
      className="relative mx-auto max-w-2xl text-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Decorative quote mark */}
      <span aria-hidden className="pointer-events-none block font-display text-8xl leading-none text-sage-300/60">
        &ldquo;
      </span>

      <div className="min-h-[180px]">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={index}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-4 text-sand-500">{'★'.repeat(t.rating || 5)}</div>
            <p className="font-display text-2xl italic leading-relaxed text-sage-900 md:text-3xl">
              {t.quote}
            </p>
            <footer className="mt-6 text-sm uppercase tracking-[0.15em] text-sage-500">
              {t.guestName}{t.service ? ` · ${t.service}` : ''}
            </footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="mt-8 flex items-center justify-center gap-6">
        <button
          onClick={() => go(-1)}
          aria-label="Previous review"
          className="text-sage-500 transition hover:text-sand-500"
        >
          ←
        </button>

        <div className="flex gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to review ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === index ? 'w-6 bg-sand-500' : 'w-2 bg-sage-300'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => go(1)}
          aria-label="Next review"
          className="text-sage-500 transition hover:text-sand-500"
        >
          →
        </button>
      </div>
    </div>
  );
}
