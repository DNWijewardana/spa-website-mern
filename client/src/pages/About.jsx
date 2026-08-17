import PageTransition from '../components/layout/PageTransition.jsx';
import Reveal from '../components/ui/Reveal.jsx';

const VALUES = [
  { icon: '🌿', title: 'Natural Care', text: 'Botanical products, chosen for skin and soul.' },
  { icon: '🤲', title: 'Expert Hands', text: 'Certified therapists with years of practice.' },
  { icon: '🕯️', title: 'True Calm', text: 'A space designed for you to fully let go.' },
];

export default function About() {
  return (
    <PageTransition>
      <section className="section pt-36 text-center">
        <Reveal><p className="eyebrow">Our Story</p></Reveal>
        <Reveal i={1}>
          <h1 className="mx-auto mt-3 max-w-3xl text-4xl font-light md:text-6xl">
            A decade of turning afternoons into renewal
          </h1>
        </Reveal>
        <Reveal i={2}>
          <p className="mx-auto mt-6 max-w-2xl text-sage-700">
            Serenity began with a simple belief: everyone deserves a place to pause.
            What started as a single treatment room is now a sanctuary trusted by
            thousands — but our promise has never changed.
          </p>
        </Reveal>
      </section>

      <section className="section pt-0">
        <div className="grid gap-8 md:grid-cols-3">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} i={i}>
              <div className="h-full rounded-2xl bg-white/70 p-8 text-center shadow-soft">
                <div className="text-4xl">{v.icon}</div>
                <h3 className="mt-4 text-2xl font-normal">{v.title}</h3>
                <p className="mt-2 text-sm text-sage-700">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
