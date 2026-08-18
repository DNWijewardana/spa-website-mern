import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

/**
 * Counts up to `value` when scrolled into view. Preserves any non-digit
 * suffix/prefix (e.g. "50k+", "4.9★", "12+").
 */
export default function Counter({ value, duration = 1800 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState('0');

  // Split "50k+" → number 50, suffix "k+"
  const match = String(value).match(/^([\d.]+)(.*)$/);
  const target = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : '';
  const decimals = match && match[1].includes('.') ? 1 : 0;

  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out-cubic
      setDisplay((target * eased).toFixed(decimals));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration, decimals]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
