import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Reveal from '../ui/Reveal.jsx';

const TILES = [
  { id: 1, label: 'Treatment Room', img: '/images/massage-oil.jpg', span: 'row-span-2' },
  { id: 2, label: 'Relaxation Lounge', img: '/images/lounge.jpg' },
  { id: 3, label: 'Hydrotherapy Pool', img: '/images/pool.jpg' },
  { id: 4, label: 'Facial Suite', img: '/images/facial-suite.jpg', span: 'row-span-2' },
  { id: 5, label: 'Herbal Ritual', img: '/images/aromatherapy.jpg' },
  { id: 6, label: 'Steam Room', img: '/images/steam-room.jpg' },
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
              className="group relative h-full w-full overflow-hidden rounded-2xl shadow-soft"
            >
              <img
                src={tile.img}
                alt={tile.label}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-sage-900/40 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 translate-y-full bg-black/40 p-3 text-left text-sm text-white backdrop-blur-sm transition-transform duration-300 group-hover:translate-y-0">
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
            <motion.figure
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl overflow-hidden rounded-2xl shadow-float"
            >
              <img src={active.img} alt={active.label} className="max-h-[80vh] w-full object-cover" />
              <figcaption className="bg-sage-900 py-3 text-center text-sm text-sage-100">
                {active.label}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
