import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageTransition from '../components/layout/PageTransition.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import Button from '../components/ui/Button.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

export default function Register() {
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await register(form);
      toast(`Welcome to Serenity, ${user.name.split(' ')[0]}.`);
      navigate('/account', { replace: true });
    } catch (err) {
      toast(err.response?.data?.message || 'Registration failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <section className="section flex min-h-[80vh] items-center justify-center pt-36">
        <Reveal className="w-full max-w-md">
          <div className="rounded-2xl bg-white/70 p-8 shadow-soft md:p-10">
            <p className="eyebrow text-center">Join Us</p>
            <h1 className="mt-2 text-center text-3xl font-light">Create your account</h1>
            <form onSubmit={submit} className="mt-8 space-y-4">
              <input
                required placeholder="Full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-full border border-stone-200 bg-linen px-5 py-3 outline-none focus:border-sage-500"
              />
              <input
                type="email" required placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-full border border-stone-200 bg-linen px-5 py-3 outline-none focus:border-sage-500"
              />
              <input
                type="password" required minLength={6} placeholder="Password (min 6 chars)"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full rounded-full border border-stone-200 bg-linen px-5 py-3 outline-none focus:border-sage-500"
              />
              <Button loading={loading} className="w-full">Create Account</Button>
            </form>
            <p className="mt-6 text-center text-sm text-sage-700">
              Already have an account?{' '}
              <Link to="/login" className="text-sand-500 hover:underline">Sign in</Link>
            </p>
          </div>
        </Reveal>
      </section>
    </PageTransition>
  );
}
