import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

/**
 * Unified button. Use `to` for internal links, `href` for external,
 * or neither for a plain <button>. Variants: primary | ghost | light.
 */
export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  loading = false,
  className = '',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 font-body font-medium transition disabled:opacity-60';
  const variants = {
    primary: 'bg-sand-500 text-white shadow-soft hover:shadow-float',
    ghost: 'border border-sage-500/40 text-sage-900 hover:border-sage-500 hover:bg-sage-100',
    light: 'bg-white text-sage-900 hover:bg-sage-100',
  };
  const cls = `${base} ${variants[variant]} ${className}`;

  const content = (
    <>
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
      )}
      {children}
    </>
  );

  const motionProps = {
    whileHover: { y: -2 },
    whileTap: { y: 0, scale: 0.98 },
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  };

  if (to) return <motion.span {...motionProps} className="inline-block"><Link to={to} className={cls} {...props}>{content}</Link></motion.span>;
  if (href) return <motion.a {...motionProps} href={href} className={cls} {...props}>{content}</motion.a>;
  return <motion.button {...motionProps} className={cls} disabled={loading} {...props}>{content}</motion.button>;
}
