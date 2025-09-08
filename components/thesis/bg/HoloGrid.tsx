'use client';
import { motion, useReducedMotion } from 'framer-motion';

export default function HoloGrid() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          'radial-gradient(#0b122108 1px, transparent 1px) 0 0 / 24px 24px, radial-gradient(#0b122106 1px, transparent 1px) 12px 12px / 24px 24px',
        maskImage:
          'radial-gradient(closest-side at 50% 45%, #000 60%, transparent 100%)',
        WebkitMaskImage:
          'radial-gradient(closest-side at 50% 45%, #000 60%, transparent 100%)',
        willChange: 'background-position',
      }}
      animate={reduce ? {} : { backgroundPosition: ['0px 0px, 12px 12px', '24px 0px, 36px 12px'] }}
      transition={reduce ? {} : { duration: 20, ease: 'linear', repeat: Infinity }}
    />
  );
}
