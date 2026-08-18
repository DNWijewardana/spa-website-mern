import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Reveal from '../ui/Reveal.jsx';

// Placeholder gradient tiles (swap `emoji`/gradients for real photos later).
const TILES = [
  { id: 1, label: 'Treatment Room', grad: 'from-sage-300 to-sage-500', emoji: '🕯️', span: 'row-span-2' },
  { id: 2, label: 'Relaxation Lounge', grad: 'from-sand-300 to-sand-500', emoji: '🍵' },
  { id: 3, label: 'Hydrotherapy Pool', grad: 'from-sage-100 to-sage-300', emoji: '💧' },
  { id: 4, label: 'Facial Suite', grad: 'from-clay-400 to-sand-500', emoji: '🌸', span: 'row-span-2' },
  { id: 5, label: 'Herbal Garden', grad: 'from-sage-500 to-sage-900', emoji: '🌿' },
  { id: 6, label: 'Steam Room', grad: 'from-stone-200 to-stone-400', emoji: '♨️' },
];

export default function GalleryMosaic() {
  const [active, setActive] = useState(null);

  return (
    <section className="section">
      <Reveal className="text-center">
        <p className="eyebrow">Our Space</p>
        <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-light md:text-5xl">
          A sanctuary designed for stillness
        </h2>
      </Reveal>

      <div className="mt-12 grid auto-rows-[180px] grid-cols-2 gap-4 md:grid-cols-3">
        {TILES.map((tile, i) => (
          <Reveal key={tile.id} i={i % 3} className={tile.span || ''}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => setActive(tile)}
              className={`group relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br ${tile.grad} shadow-soft`}
            >
              <span className="absolute inset-0 flex items-center justify-center text-5xl opacity-80 transition group-hover:scale-110">
                {tile.emoji}
              </span>
              <span className="absolute inset-x-0 bottom-0 translate-y-full bg-black/30 p-3 text-left text-sm text-white backdrop-blur-sm transition-transform duration-300 group-hover:translate-y-0">
                {tile.label}
              </span>
            </motion.button>
          </Reveal>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-sage-900/80 p-6 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className={`flex aspect-video w-full max-w-3xl items-center justify-center rounded-2xl bg-gradient-to-br ${active.grad} text-8xl shadow-float`}
            >
              {active.emoji}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
