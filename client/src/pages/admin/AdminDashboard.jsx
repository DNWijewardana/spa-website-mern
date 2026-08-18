import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../../components/layout/PageTransition.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import {
  adminStats, adminBookings, adminUpdateBooking,
  adminTestimonials, adminUpdateTestimonial,
} from '../../lib/api.js';

const TABS = ['Overview', 'Bookings', 'Testimonials'];
const STATUSES = ['pending', 'confirmed', 'completed', 'cancelled'];

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl bg-white/70 p-6 text-center shadow-soft">
      <p className="font-display text-4xl text-sage-900">{value ?? '—'}</p>
      <p className="mt-1 text-sm text-sage-500">{label}</p>
    </div>
  );
}

export default function AdminDashboard() {
  const { toast } = useToast();
  const [tab, setTab] = useState('Overview');
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  const loadStats = () => adminStats().then(setStats).catch(() => {});
  const loadBookings = () => adminBookings().then(setBookings).catch(() => {});
  const loadTestimonials = () => adminTestimonials().then(setTestimonials).catch(() => {});

  useEffect(() => {
    loadStats(); loadBookings(); loadTestimonials();
  }, []);

  const changeStatus = async (id, status) => {
    try {
      await adminUpdateBooking(id, status);
      toast('Booking updated.');
      loadBookings(); loadStats();
    } catch { toast('Update failed.', 'error'); }
  };

  const toggleApprove = async (t) => {
    try {
      await adminUpdateTestimonial(t._id, { isApproved: !t.isApproved });
      toast(t.isApproved ? 'Unapproved.' : 'Approved & published.');
      loadTestimonials();
    } catch { toast('Update failed.', 'error'); }
  };

  return (
    <PageTransition>
      <section className="section pt-36">
        <p className="eyebrow">Admin</p>
        <h1 className="mt-2 text-4xl font-light">Dashboard</h1>

        {/* Tabs */}
        <div className="mt-8 flex gap-2 border-b border-stone-200">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative px-4 py-3 text-sm transition ${
                tab === t ? 'text-sage-900' : 'text-sage-500 hover:text-sage-700'
              }`}
            >
              {t}
              {tab === t && (
                <motion.span layoutId="admin-tab" className="absolute inset-x-0 -bottom-px h-0.5 bg-sand-500" />
              )}
            </button>
          ))}
        </div>

        {/* Overview */}
        {tab === 'Overview' && (
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-5">
            <StatCard label="Total Bookings" value={stats?.bookings} />
            <StatCard label="Pending" value={stats?.pendingBookings} />
            <StatCard label="Active Services" value={stats?.services} />
            <StatCard label="Subscribers" value={stats?.subscribers} />
            <StatCard label="Unread Messages" value={stats?.unreadMessages} />
          </div>
        )}

        {/* Bookings */}
        {tab === 'Bookings' && (
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-stone-200 text-sage-500">
                  <th className="py-3">Service</th><th>Date</th><th>Time</th>
                  <th>Price</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id} className="border-b border-stone-200/60">
                    <td className="py-3">{b.service?.name || '—'}</td>
                    <td>{b.date}</td>
                    <td>{b.timeSlot}</td>
                    <td>${b.price}</td>
                    <td>
                      <select
                        value={b.status}
                        onChange={(e) => changeStatus(b._id, e.target.value)}
                        className="rounded-full border border-stone-200 bg-linen px-3 py-1 text-xs capitalize"
                      >
                        {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                  </tr>
                ))}
                {bookings.length === 0 && (
                  <tr><td colSpan="5" className="py-8 text-center text-sage-500">No bookings yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Testimonials */}
        {tab === 'Testimonials' && (
          <div className="mt-8 space-y-4">
            {testimonials.map((t) => (
              <div key={t._id} className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white/70 p-6 shadow-soft">
                <div className="max-w-xl">
                  <p className="text-sand-500">{'★'.repeat(t.rating || 5)}</p>
                  <p className="mt-1 italic text-sage-900">“{t.quote}”</p>
                  <p className="mt-1 text-sm text-sage-500">{t.guestName} · {t.service}</p>
                </div>
                <button
                  onClick={() => toggleApprove(t)}
                  className={`rounded-full px-4 py-2 text-sm transition ${
                    t.isApproved ? 'bg-sage-500 text-white' : 'border border-sage-300 text-sage-700 hover:bg-sage-100'
                  }`}
                >
                  {t.isApproved ? 'Approved ✓' : 'Approve'}
                </button>
              </div>
            ))}
            {testimonials.length === 0 && (
              <p className="py-8 text-center text-sage-500">No testimonials yet.</p>
            )}
          </div>
        )}
      </section>
    </PageTransition>
  );
}
