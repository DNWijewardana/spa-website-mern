import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/layout/PageTransition.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import Button from '../components/ui/Button.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { getMyBookings, cancelBooking } from '../lib/api.js';

const statusColor = {
  pending: 'bg-sand-300 text-sage-900',
  confirmed: 'bg-sage-300 text-sage-900',
  completed: 'bg-sage-500 text-white',
  cancelled: 'bg-stone-200 text-stone-400',
};

export default function Account() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  const load = () => getMyBookings().then(setBookings).catch(() => {});
  useEffect(() => { load(); }, []);

  const handleCancel = async (id) => {
    try {
      await cancelBooking(id);
      toast('Booking cancelled.');
      load();
    } catch {
      toast('Could not cancel booking.', 'error');
    }
  };

  const handleLogout = async () => {
    await logout();
    toast('Signed out.');
    navigate('/');
  };

  return (
    <PageTransition>
      <section className="section pt-36">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Your Account</p>
            <h1 className="mt-2 text-4xl font-light">Hello, {user?.name?.split(' ')[0]}</h1>
          </div>
          <Button variant="ghost" onClick={handleLogout}>Sign Out</Button>
        </Reveal>

        <Reveal i={1} className="mt-12">
          <h2 className="text-2xl font-light">Your bookings</h2>
          {bookings.length === 0 ? (
            <div className="mt-6 rounded-2xl bg-white/70 p-10 text-center shadow-soft">
              <p className="text-sage-700">You have no bookings yet.</p>
              <div className="mt-4"><Button to="/booking">Book a Treatment</Button></div>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {bookings.map((b) => (
                <div
                  key={b._id}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white/70 p-6 shadow-soft"
                >
                  <div>
                    <p className="text-lg">{b.service?.name || 'Treatment'}</p>
                    <p className="text-sm text-sage-500">{b.date} at {b.timeSlot} · ${b.price}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`rounded-full px-3 py-1 text-xs capitalize ${statusColor[b.status]}`}>
                      {b.status}
                    </span>
                    {['pending', 'confirmed'].includes(b.status) && (
                      <button
                        onClick={() => handleCancel(b._id)}
                        className="text-sm text-clay-400 hover:underline"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Reveal>
      </section>
    </PageTransition>
  );
}
