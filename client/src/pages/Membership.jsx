import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/layout/PageTransition.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import Accordion from '../components/ui/Accordion.jsx';

const TIERS = [
  {
    name: 'Essential',
    monthly: 59,
    tagline: 'A monthly moment of calm',
    features: ['1 treatment / month', '10% off extra treatments', 'Free herbal tea lounge'],
  },
  {
    name: 'Signature',
    monthly: 99,
    tagline: 'Our most-loved ritual',
    features: ['2 treatments / month', '15% off extras', 'Priority booking', 'Guest pass ×1 / month'],
    popular: true,
  },
  {
    name: 'Elite',
    monthly: 169,
    tagline: 'The full sanctuary',
    features: ['4 treatments / month', '20% off extras', 'Unlimited lounge access', 'Complimentary birthday ritual'],
  },
];

const FAQ = [
  { q: 'Can I pause or cancel my membership?', a: 'Absolutely. Pause for up to 3 months or cancel anytime — no fees, no fuss.' },
  { q: 'Do unused treatments roll over?', a: 'Signature and Elite treatments roll over for one month so you never lose a session.' },
  { q: 'Can I share my membership?', a: 'Signature and Elite include guest passes, so you can bring someone you love.' },
];

export default function Membership() {
  const [annual, setAnnual] = useState(false);
  const price = (m) => (annual ? Math.round(m * 12 * 0.83) : m);

  return (
    <PageTransition>
      <section className="section pt-36 text-center">
        <Reveal><p className="eyebrow">Membership</p></Reveal>
        <Reveal i={1}>
          <h1 className="mx-auto mt-3 max-w-3xl text-4xl font-light md:text-6xl">
            Make calm a habit, not a treat
          </h1>
        </Reveal>

        {/* Billing toggle */}
        <Reveal i={2}>
          <div className="mt-8 inline-flex items-center gap-3 rounded-full bg-stone-200 p-1">
            <button
              onClick={() => setAnnual(false)}
              className={`rounded-full px-5 py-2 text-sm transition ${!annual ? 'bg-white shadow-soft' : 'text-sage-500'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`rounded-full px-5 py-2 text-sm transition ${annual ? 'bg-white shadow-soft' : 'text-sage-500'}`}
            >
              Annual <span className="text-sand-500">·17% off</span>
            </button>
          </div>
        </Reveal>

        {/* Tiers */}
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {TIERS.map((tier, i) => (
            <Reveal key={tier.name} i={i}>
              <motion.div
                whileHover={{ y: -8 }}
                className={`relative flex h-full flex-col rounded-2xl p-8 text-left transition ${
                  tier.popular
                    ? 'bg-sage-900 text-sage-100 shadow-float ring-2 ring-sand-500'
                    : 'bg-white/70 text-ink shadow-soft'
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-sand-500 px-4 py-1 text-xs uppercase tracking-wider text-white">
                    Most Loved
                  </span>
                )}
                <h3 className={`text-2xl font-normal ${tier.popular ? 'text-white' : ''}`}>{tier.name}</h3>
                <p className={`mt-1 text-sm ${tier.popular ? 'text-sage-300' : 'text-sage-500'}`}>{tier.tagline}</p>
                <p className="mt-6 font-display text-5xl">
                  ${price(tier.monthly)}
                  <span className={`text-base ${tier.popular ? 'text-sage-300' : 'text-sage-500'}`}>
                    /{annual ? 'yr' : 'mo'}
                  </span>
                </p>
                <ul className={`mt-6 flex-1 space-y-3 text-sm ${tier.popular ? 'text-sage-100' : 'text-sage-700'}`}>
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="text-sand-500">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`mt-8 inline-flex justify-center rounded-full px-6 py-3 font-medium transition hover:-translate-y-0.5 ${
                    tier.popular ? 'bg-sand-500 text-white' : 'bg-sage-900 text-white'
                  }`}
                >
                  Choose {tier.name}
                </Link>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="section pt-0">
        <div className="mx-auto max-w-2xl">
          <Reveal><h2 className="mb-8 text-center text-3xl font-light">Questions, answered</h2></Reveal>
          <Reveal i={1}><Accordion items={FAQ} /></Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
