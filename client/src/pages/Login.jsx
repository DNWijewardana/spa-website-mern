import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import PageTransition from '../components/layout/PageTransition.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import Button from '../components/ui/Button.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';

export default function Login() {
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(form);
      toast(`Welcome back, ${user.name.split(' ')[0]}.`);
      const dest = user.role === 'admin' ? '/admin' : location.state?.from || '/account';
      navigate(dest, { replace: true });
    } catch (err) {
      toast(err.response?.data?.message || 'Login failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <section className="section flex min-h-[80vh] items-center justify-center pt-36">
        <Reveal className="w-full max-w-md">
          <div className="rounded-2xl bg-white/70 p-8 shadow-soft md:p-10">
            <p className="eyebrow text-center">Welcome Back</p>
            <h1 className="mt-2 text-center text-3xl font-light">Sign in to Serenity</h1>
            <form onSubmit={submit} className="mt-8 space-y-4">
              <input
                type="email" required placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-full border border-stone-200 bg-linen px-5 py-3 outline-none focus:border-sage-500"
              />
              <input
                type="password" required placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full rounded-full border border-stone-200 bg-linen px-5 py-3 outline-none focus:border-sage-500"
              />
              <Button loading={loading} className="w-full">Sign In</Button>
            </form>
            <p className="mt-6 text-center text-sm text-sage-700">
              New here?{' '}
              <Link to="/register" className="text-sand-500 hover:underline">Create an account</Link>
            </p>
          </div>
        </Reveal>
      </section>
    </PageTransition>
  );
}
