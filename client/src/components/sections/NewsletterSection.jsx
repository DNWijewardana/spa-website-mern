import { useState } from 'react';
import Reveal from '../ui/Reveal.jsx';
import Button from '../ui/Button.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { subscribeNewsletter } from '../../lib/api.js';

export default function NewsletterSection() {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await subscribeNewsletter(email, 'home');
      toast(res.message || "You're on the list.");
      setEmail('');
    } catch (err) {
      toast(err.response?.data?.message || 'Something went wrong.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section">
      <Reveal className="mx-auto max-w-2xl rounded-2xl bg-sage-100 p-10 text-center md:p-14">
        <p className="eyebrow">Stay in the Calm</p>
        <h2 className="mt-3 text-3xl font-light md:text-4xl">
          Wellness notes, gentle offers, no noise
        </h2>
        <p className="mt-3 text-sage-700">
          Join our newsletter for seasonal rituals and members-only moments.
        </p>
        <form onSubmit={submit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="w-full rounded-full border border-sage-300 bg-white px-5 py-3 outline-none focus:border-sage-500"
          />
          <Button loading={loading}>Subscribe</Button>
        </form>
      </Reveal>
    </section>
  );
}
