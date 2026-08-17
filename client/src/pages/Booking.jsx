import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PageTransition from '../components/layout/PageTransition.jsx';
import { getServices, getAvailability, createBooking } from '../lib/api.js';

const STEPS = ['Service', 'Date & Time', 'Your Details', 'Confirm'];

export default function Booking() {
  const [step, setStep] = useState(0);
  const [services, setServices] = useState([]);
  const [slots, setSlots] = useState([]);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    serviceId: '', date: '', timeSlot: '',
    guestInfo: { name: '', email: '', phone: '' },
  });

  useEffect(() => { getServices().then(setServices).catch(() => {}); }, []);

  useEffect(() => {
    if (form.date) {
      getAvailability({ date: form.date }).then((d) => setSlots(d.available)).catch(() => setSlots([]));
    }
  }, [form.date]);

  const selectedService = services.find((s) => s._id === form.serviceId);
  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = async () => {
    setError('');
    try {
      await createBooking({
        serviceId: form.serviceId,
        date: form.date,
        timeSlot: form.timeSlot,
        guestInfo: form.guestInfo,
      });
      setDone(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  if (done) {
    return (
      <PageTransition>
        <section className="section pt-40 text-center">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <p className="text-6xl">🌸</p>
            <h1 className="mt-6 text-4xl font-light md:text-5xl">Your escape is reserved</h1>
            <p className="mx-auto mt-4 max-w-md text-sage-700">
              A confirmation is on its way. We can't wait to welcome you.
            </p>
          </motion.div>
        </section>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <section className="section pt-36">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-center text-4xl font-light md:text-5xl">Book Your Escape</h1>

          {/* Progress */}
          <div className="mt-10 flex items-center justify-between">
            {STEPS.map((label, i) => (
              <div key={label} className="flex flex-1 flex-col items-center">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm transition ${
                    i <= step ? 'bg-sage-900 text-white' : 'bg-stone-200 text-sage-500'
                  }`}
                >
                  {i + 1}
                </div>
                <span className="mt-2 hidden text-xs text-sage-500 sm:block">{label}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl bg-white/70 p-8 shadow-soft">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
              >
                {step === 0 && (
                  <div className="space-y-3">
                    <h2 className="text-2xl font-normal">Choose a treatment</h2>
                    {services.map((s) => (
                      <button
                        key={s._id}
                        onClick={() => setForm({ ...form, serviceId: s._id })}
                        className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition ${
                          form.serviceId === s._id ? 'border-sage-500 bg-sage-100' : 'border-stone-200'
                        }`}
                      >
                        <span>{s.name}</span>
                        <span className="text-sand-500">${s.price}</span>
                      </button>
                    ))}
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-normal">Pick a date & time</h2>
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value, timeSlot: '' })}
                      className="w-full rounded-full border border-stone-200 bg-linen px-5 py-3"
                    />
                    {form.date && (
                      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                        {slots.length === 0 && <p className="col-span-full text-sm text-sage-500">No slots — try another day.</p>}
                        {slots.map((slot) => (
                          <button
                            key={slot}
                            onClick={() => setForm({ ...form, timeSlot: slot })}
                            className={`rounded-full py-2 text-sm transition ${
                              form.timeSlot === slot ? 'bg-sage-900 text-white' : 'border border-stone-200 hover:bg-sage-100'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-normal">Your details</h2>
                    {['name', 'email', 'phone'].map((field) => (
                      <input
                        key={field}
                        placeholder={field[0].toUpperCase() + field.slice(1)}
                        value={form.guestInfo[field]}
                        onChange={(e) =>
                          setForm({ ...form, guestInfo: { ...form.guestInfo, [field]: e.target.value } })
                        }
                        className="w-full rounded-full border border-stone-200 bg-linen px-5 py-3"
                      />
                    ))}
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-3">
                    <h2 className="text-2xl font-normal">Confirm your booking</h2>
                    <ul className="space-y-2 text-sage-700">
                      <li><strong>Treatment:</strong> {selectedService?.name}</li>
                      <li><strong>Date:</strong> {form.date} at {form.timeSlot}</li>
                      <li><strong>Name:</strong> {form.guestInfo.name}</li>
                      <li><strong>Price:</strong> ${selectedService?.price}</li>
                    </ul>
                    {error && <p className="text-sm text-red-600">{error}</p>}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex justify-between">
              <button onClick={back} disabled={step === 0} className="btn-ghost disabled:opacity-40">
                Back
              </button>
              {step < STEPS.length - 1 ? (
                <button onClick={next} className="btn-primary">Continue</button>
              ) : (
                <button onClick={submit} className="btn-primary">Confirm Booking</button>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
