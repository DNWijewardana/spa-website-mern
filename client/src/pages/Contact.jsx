import { useState } from 'react';
import PageTransition from '../components/layout/PageTransition.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import Button from '../components/ui/Button.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { sendContact } from '../lib/api.js';

export default function Contact() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await sendContact(form);
      toast(res.message || 'Message sent!');
      setSent(true);
    } catch (err) {
      toast(err.response?.data?.message || 'Could not send message.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <section className="section pt-36">
        <div className="grid gap-12 md:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Get in Touch</p>
            <h1 className="mt-3 text-4xl font-light md:text-5xl">We'd love to hear from you</h1>
            <ul className="mt-8 space-y-3 text-sage-700">
              <li>📍 12 Blossom Lane, Colombo</li>
              <li>🕘 Mon–Sun · 9am–6pm</li>
              <li>✉️ hello@serenityspa.com</li>
              <li>📞 +94 11 234 5678</li>
            </ul>
          </Reveal>

          <Reveal i={1}>
            {sent ? (
              <div className="rounded-2xl bg-sage-100 p-10 text-center">
                <p className="text-4xl">🌸</p>
                <p className="mt-4 font-display text-2xl text-sage-900">Thank you!</p>
                <p className="mt-2 text-sage-700">We'll be in touch very soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl bg-white/70 p-8 shadow-soft">
                <input
                  required placeholder="Your name" value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-full border border-stone-200 bg-linen px-5 py-3 outline-none focus:border-sage-500"
                />
                <input
                  required type="email" placeholder="Your email" value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-full border border-stone-200 bg-linen px-5 py-3 outline-none focus:border-sage-500"
                />
                <textarea
                  required rows="4" placeholder="Your message" value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-2xl border border-stone-200 bg-linen px-5 py-3 outline-none focus:border-sage-500"
                />
                <Button loading={loading} className="w-full">Send Message</Button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
