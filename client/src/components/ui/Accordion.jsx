import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Simple accessible FAQ accordion with smooth height animation.
export default function Accordion({ items }) {
  const [open, setOpen] = useState(null);

  return (
    <div className="divide-y divide-stone-200 rounded-2xl bg-white/70 shadow-soft">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="font-display text-lg text-sage-900">{item.q}</span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                className="text-2xl text-sand-500"
              >
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 text-sage-700">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
