import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/layout/PageTransition.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import { getServices } from '../lib/api.js';

const CATEGORIES = ['all', 'massage', 'facial', 'body', 'hydrotherapy', 'package'];

export default function Services() {
  const [services, setServices] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    getServices().then(setServices).catch(() => {});
  }, []);

  const visible = filter === 'all' ? services : services.filter((s) => s.category === filter);

  return (
    <PageTransition>
      <section className="section pt-36 text-center">
        <Reveal><p className="eyebrow">Our Treatments</p></Reveal>
        <Reveal i={1}>
          <h1 className="mt-3 text-4xl font-light md:text-6xl">A ritual for every kind of calm</h1>
        </Reveal>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full px-5 py-2 text-sm capitalize transition ${
                filter === c
                  ? 'bg-sage-900 text-white'
                  : 'border border-sage-300 text-sage-700 hover:bg-sage-100'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-8 text-left md:grid-cols-2 lg:grid-cols-3">
          {visible.map((s, i) => (
            <Reveal key={s._id} i={i % 3}>
              <motion.article
                whileHover={{ y: -6 }}
                className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white/70 shadow-soft"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-8">
                  <span className="eyebrow">{s.category}</span>
                  <h3 className="mt-2 text-2xl font-normal">{s.name}</h3>
                  <p className="mt-3 flex-1 text-sm text-sage-700">{s.description}</p>
                  <div className="mt-6 flex items-center justify-between border-t border-stone-200 pt-4">
                    <span className="text-sand-500">From ${s.price}</span>
                    <Link to="/booking" className="text-sm text-sage-900 underline-offset-4 hover:underline">
                      Book →
                    </Link>
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
