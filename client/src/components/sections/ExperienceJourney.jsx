import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Reveal from '../ui/Reveal.jsx';

const STEPS = [
  { n: '01', title: 'Arrive', text: 'Step in, breathe out. Warm tea, soft light, and the noise of the day fading behind you.', emoji: '🌅' },
  { n: '02', title: 'Unwind', text: 'Expert hands find every knot of tension and gently let it go.', emoji: '🤲' },
  { n: '03', title: 'Restore', text: 'Nourishing rituals renew your skin, your body, and your calm.', emoji: '🌿' },
  { n: '04', title: 'Glow', text: 'Leave lighter, brighter, and carrying the calm with you.', emoji: '✨' },
];

function JourneyRow({ step, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const flip = index % 2 === 1;

  return (
    <div ref={ref} className="grid items-center gap-8 md:grid-cols-2">
      <Reveal className={flip ? 'md:order-2' : ''}>
        <div className="flex items-baseline gap-4">
          <span className="font-display text-6xl text-sage-300">{step.n}</span>
          <h3 className="text-3xl font-normal md:text-4xl">{step.title}</h3>
        </div>
        <p className="mt-4 max-w-md text-sage-700">{step.text}</p>
      </Reveal>

      <motion.div style={{ y }} className={flip ? 'md:order-1' : ''}>
        <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-gradient-to-br from-sage-100 to-sage-300/50 text-7xl shadow-soft">
          {step.emoji}
        </div>
      </motion.div>
    </div>
  );
}

export default function ExperienceJourney() {
  return (
    <section className="section">
      <Reveal className="text-center">
        <p className="eyebrow">The Experience</p>
        <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-light md:text-5xl">
          Four gentle steps back to yourself
        </h2>
      </Reveal>

      <div className="mt-16 space-y-24">
        {STEPS.map((step, i) => (
          <JourneyRow key={step.n} step={step} index={i} />
        ))}
      </div>
    </section>
  );
}
