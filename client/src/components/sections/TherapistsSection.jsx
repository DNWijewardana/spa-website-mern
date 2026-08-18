import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Reveal from '../ui/Reveal.jsx';
import { getTherapists } from '../../lib/api.js';

const initials = (name) =>
  name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();

export default function TherapistsSection() {
  const [therapists, setTherapists] = useState([]);

  useEffect(() => {
    getTherapists().then(setTherapists).catch(() => {});
  }, []);

  if (therapists.length === 0) return null;

  return (
    <section className="section">
      <Reveal className="text-center">
        <p className="eyebrow">Meet the Team</p>
        <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-light md:text-5xl">
          Expert hands, warm hearts
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {therapists.map((t, i) => (
          <Reveal key={t._id} i={i % 4} className="text-center">
            <motion.div whileHover={{ y: -6 }} className="group">
              <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-sage-300 to-sage-500 font-display text-4xl text-white shadow-soft">
                {initials(t.name)}
              </div>
              <h3 className="mt-5 text-xl font-normal">{t.name}</h3>
              <p className="mt-1 text-sm text-sand-500">
                {(t.specialties || []).join(' · ')}
              </p>
              <p className="mt-2 text-xs text-sage-500">
                {t.yearsExperience}+ years experience
              </p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
