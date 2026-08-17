import { motion } from 'framer-motion';
import { fadeUp, inView } from '../../lib/motion.js';

// Scroll-triggered fade-up wrapper. Pass `i` for stagger delay.
export default function Reveal({ children, i = 0, className = '', as = 'div' }) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      variants={fadeUp}
      custom={i}
      initial="hidden"
      whileInView="show"
      viewport={inView}
    >
      {children}
    </MotionTag>
  );
}
