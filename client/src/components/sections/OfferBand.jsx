import { useEffect, useState } from 'react';
import Reveal from '../ui/Reveal.jsx';
import Button from '../ui/Button.jsx';

// Counts down to the end of the current month for a seasonal offer.
function useCountdown() {
  const target = (() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59);
  })();
  const [left, setLeft] = useState(target - new Date());

  useEffect(() => {
    const id = setInterval(() => setLeft(target - new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const clamp = Math.max(left, 0);
  return {
    days: Math.floor(clamp / 86400000),
    hours: Math.floor((clamp / 3600000) % 24),
    minutes: Math.floor((clamp / 60000) % 60),
    seconds: Math.floor((clamp / 1000) % 60),
  };
}

const Cell = ({ value, label }) => (
  <div className="text-center">
    <div className="min-w-[64px] rounded-xl bg-white/15 px-3 py-2 font-display text-3xl tabular-nums backdrop-blur-sm">
      {String(value).padStart(2, '0')}
    </div>
    <div className="mt-1 text-xs uppercase tracking-widest text-white/70">{label}</div>
  </div>
);

export default function OfferBand() {
  const { days, hours, minutes, seconds } = useCountdown();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sand-500 to-clay-400 py-20 text-white">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <p className="text-sm uppercase tracking-[0.2em] text-white/80">Limited Time</p>
          <h2 className="mt-3 text-3xl font-light text-white md:text-5xl">
            Summer Renewal — 20% off body rituals
          </h2>
          <p className="mt-3 text-white/90">Your calm is calling. Offer ends soon.</p>
        </Reveal>

        <Reveal i={1}>
          <div className="mt-8 flex justify-center gap-3 md:gap-5">
            <Cell value={days} label="Days" />
            <Cell value={hours} label="Hrs" />
            <Cell value={minutes} label="Min" />
            <Cell value={seconds} label="Sec" />
          </div>
        </Reveal>

        <Reveal i={2}>
          <div className="mt-9">
            <Button to="/booking" variant="light">Claim Your Offer</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
