import { useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/layout/PageTransition.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import Button from '../components/ui/Button.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { purchaseGiftCard } from '../lib/api.js';

const DESIGNS = [
  { id: 'sage', label: 'Eucalyptus', from: 'from-sage-500', to: 'to-sage-900' },
  { id: 'gold', label: 'Golden Hour', from: 'from-sand-500', to: 'to-clay-400' },
  { id: 'clay', label: 'Rose Clay', from: 'from-clay-400', to: 'to-sand-500' },
];
const AMOUNTS = [50, 100, 150, 250];

export default function GiftCards() {
  const { toast } = useToast();
  const [design, setDesign] = useState(DESIGNS[0]);
  const [amount, setAmount] = useState(100);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(false);

  const buy = async () => {
    setLoading(true);
    try {
      const res = await purchaseGiftCard({ amount, design: design.id });
      toast(`Gift card ${res.code} created for $${res.amount}!`);
    } catch (err) {
      toast(err.response?.data?.message || 'Purchase failed.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <section className="section pt-36">
        <Reveal><p className="eyebrow text-center">Gift Cards</p></Reveal>
        <Reveal i={1}>
          <h1 className="mx-auto mt-3 max-w-2xl text-center text-4xl font-light md:text-6xl">
            Give the gift of calm
          </h1>
        </Reveal>

        <div className="mt-14 grid items-center gap-12 md:grid-cols-2">
          {/* Interactive card preview (click to flip) */}
          <Reveal className="flex justify-center">
            <button
              onClick={() => setFlipped((f) => !f)}
              className="[perspective:1200px]"
              aria-label="Flip gift card"
            >
              <motion.div
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-56 w-96 max-w-full [transform-style:preserve-3d]"
              >
                {/* Front */}
                <div
                  className={`absolute inset-0 flex flex-col justify-between rounded-2xl bg-gradient-to-br ${design.from} ${design.to} p-6 text-white shadow-float [backface-visibility:hidden]`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-2xl">Serenity<span className="text-white/70">.</span></span>
                    <span className="text-2xl">🌿</span>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/70">Gift Card</p>
                    <p className="font-display text-5xl">${amount}</p>
                  </div>
                </div>
                {/* Back */}
                <div
                  className="absolute inset-0 flex flex-col justify-center rounded-2xl bg-sage-900 p-6 text-center text-sage-100 shadow-float [backface-visibility:hidden] [transform:rotateY(180deg)]"
                >
                  <p className="font-display text-xl italic">“You deserve this.”</p>
                  <p className="mt-3 text-xs text-sage-300">Redeemable for any treatment · Valid 12 months</p>
                </div>
              </motion.div>
            </button>
          </Reveal>

          {/* Designer controls */}
          <Reveal i={1}>
            <div className="space-y-8">
              <div>
                <p className="eyebrow mb-3">Choose a design</p>
                <div className="flex gap-3">
                  {DESIGNS.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => setDesign(d)}
                      className={`h-12 w-12 rounded-full bg-gradient-to-br ${d.from} ${d.to} ring-offset-2 transition ${
                        design.id === d.id ? 'ring-2 ring-sage-900' : ''
                      }`}
                      aria-label={d.label}
                      title={d.label}
                    />
                  ))}
                </div>
              </div>

              <div>
                <p className="eyebrow mb-3">Choose an amount</p>
                <div className="flex flex-wrap gap-3">
                  {AMOUNTS.map((a) => (
                    <button
                      key={a}
                      onClick={() => setAmount(a)}
                      className={`rounded-full px-6 py-2 transition ${
                        amount === a ? 'bg-sage-900 text-white' : 'border border-sage-300 text-sage-700 hover:bg-sage-100'
                      }`}
                    >
                      ${a}
                    </button>
                  ))}
                </div>
              </div>

              <Button loading={loading} onClick={buy}>
                Buy ${amount} Gift Card
              </Button>
              <p className="text-xs text-sage-500">
                Delivered instantly by email, or schedule it for the perfect moment. Tap the card to flip it.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
