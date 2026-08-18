import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import PageTransition from '../components/layout/PageTransition.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import TestimonialCarousel from '../components/sections/TestimonialCarousel.jsx';
import ExperienceJourney from '../components/sections/ExperienceJourney.jsx';
import TherapistsSection from '../components/sections/TherapistsSection.jsx';
import GalleryMosaic from '../components/sections/GalleryMosaic.jsx';
import OfferBand from '../components/sections/OfferBand.jsx';
import NewsletterSection from '../components/sections/NewsletterSection.jsx';
import Counter from '../components/ui/Counter.jsx';
import { getServices } from '../lib/api.js';
import { EASE } from '../lib/motion.js';

function FloatingPetals() {
  // Decorative drifting dots — purely aesthetic, hidden from a11y tree.
  const petals = Array.from({ length: 8 });
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map((_, i) => (
        <span
          key={i}
          className="absolute block h-3 w-3 rounded-full bg-sand-300/40 animate-float-drift"
          style={{
            left: `${(i * 13 + 5) % 100}%`,
            top: `${(i * 27 + 10) % 90}%`,
            animationDelay: `${i * 1.4}s`,
          }}
        />
      ))}
    </div>
  );
}

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 180]);

  return (
    <section ref={ref} className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Cinematic photo backdrop with parallax */}
      <motion.img
        src="/images/hero.jpg"
        alt="Serene spa treatment with hot stones and orchids"
        style={{ y: imageY }}
        className="absolute inset-0 -top-16 h-[120%] w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-sage-900/70 via-sage-900/55 to-sage-900/80" />
      <FloatingPetals />

      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="eyebrow !text-sand-300"
        >
          Serenity Spa & Wellness
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: EASE }}
          className="mt-4 text-5xl font-light leading-[1.05] text-white md:text-7xl"
        >
          Where Stillness<br /><span className="italic text-sand-300">Becomes You</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
          className="mx-auto mt-6 max-w-xl text-lg text-white/85"
        >
          Step away from the noise. Your sanctuary for deep rest, radiant skin,
          and restored calm — crafted by expert hands.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <Link to="/booking" className="btn-primary">Book Your Escape</Link>
          <Link
            to="/services"
            className="inline-flex items-center justify-center rounded-full border border-white/50 px-8 py-3 font-body font-medium text-white transition hover:bg-white/10"
          >
            Explore Treatments
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/70"
      >
        <div className="h-10 w-6 rounded-full border border-white/50 p-1">
          <div className="mx-auto h-2 w-1 rounded-full bg-white" />
        </div>
      </motion.div>
    </section>
  );
}

const STATS = [
  { value: '12+', label: 'Years of Care' },
  { value: '50k+', label: 'Guests Restored' },
  { value: '4.9★', label: 'Average Rating' },
  { value: '20+', label: 'Expert Therapists' },
];

export default function Home() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    getServices({ featured: 'true' }).then(setServices).catch(() => {});
  }, []);

  return (
    <PageTransition>
      <Hero />

      {/* Welcome */}
      <section className="section text-center">
        <Reveal>
          <p className="eyebrow">Our Philosophy</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-light leading-snug md:text-5xl">
            We believe wellness isn't a luxury — it's a return to yourself.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-sage-700">
            For over a decade, our therapists have turned ordinary afternoons into
            moments of profound renewal.
          </p>
        </Reveal>
      </section>

      {/* Signature services */}
      <section className="section pt-0">
        <Reveal><p className="eyebrow text-center">Signature Treatments</p></Reveal>
        <Reveal i={1}>
          <h2 className="mb-12 mt-3 text-center text-3xl font-light md:text-4xl">
            Chosen with care, felt for days
          </h2>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-3">
          {services.length === 0 && (
            <p className="col-span-full text-center text-sage-500">
              Run the seed script to load sample treatments.
            </p>
          )}
          {services.map((s, i) => (
            <Reveal key={s._id || i} i={i}>
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
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
                  <h3 className="text-2xl font-normal">{s.name}</h3>
                  <p className="mt-3 flex-1 text-sm text-sage-700">{s.description}</p>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-sand-500">From ${s.price}</span>
                    <span className="text-sm text-sage-500">{s.duration} min</span>
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Experience journey (parallax) */}
      <ExperienceJourney />

      {/* Stats */}
      <section className="bg-sage-900 py-20 text-sage-100">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-10 px-6 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} i={i} className="text-center">
              <p className="font-display text-4xl text-sand-500 md:text-5xl">
                <Counter value={s.value} />
              </p>
              <p className="mt-2 text-sm text-sage-300">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Therapists */}
      <TherapistsSection />

      {/* Testimonials */}
      <section className="section text-center">
        <Reveal><p className="eyebrow">Kind Words</p></Reveal>
        <div className="mt-10">
          <TestimonialCarousel />
        </div>
      </section>

      {/* Gallery */}
      <GalleryMosaic />

      {/* Seasonal offer */}
      <OfferBand />

      {/* Newsletter */}
      <NewsletterSection />

      {/* Closing CTA */}
      <section className="relative overflow-hidden bg-sand-500 py-24 text-center text-white">
        <div className="mx-auto max-w-2xl px-6">
          <Reveal>
            <h2 className="text-3xl font-light text-white md:text-5xl">You've read this far for a reason.</h2>
            <p className="mt-4 text-white/90">
              Give yourself the gift of an afternoon that's entirely your own.
            </p>
            <Link
              to="/booking"
              className="mt-8 inline-flex rounded-full bg-white px-8 py-3 font-medium text-sage-900 transition hover:-translate-y-0.5"
            >
              Reserve Your Time
            </Link>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
