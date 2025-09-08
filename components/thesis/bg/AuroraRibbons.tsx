'use client';
import { motion, useReducedMotion } from 'framer-motion';

export default function AuroraRibbons() {
  const reduce = useReducedMotion();
  const base = {
    position: 'absolute' as const,
    filter: 'blur(28px)',
    opacity: 0.28,
    pointerEvents: 'none' as const,
    willChange: 'transform, opacity',
    mixBlendMode: 'plus-lighter' as const,
  };
  return (
    <>
      <motion.div
        aria-hidden
        style={{
          ...base,
          top: '-18%',
          left: '-10%',
          width: '70vmax',
          height: '70vmax',
          borderRadius: '9999px',
          background:
            'conic-gradient(from 180deg at 50% 50%, var(--jbv-accent) 0deg, transparent 140deg, var(--jbv-accent-2) 220deg, transparent 320deg)',
        }}
        animate={reduce ? {} : { rotate: 360 }}
        transition={reduce ? {} : { duration: 90, ease: 'linear', repeat: Infinity }}
      />
      <motion.div
        aria-hidden
        style={{
          ...base,
          bottom: '-20%',
          right: '-12%',
          width: '80vmax',
          height: '80vmax',
          borderRadius: '9999px',
          background:
            'conic-gradient(from 0deg at 50% 50%, var(--jbv-accent-2) 0deg, transparent 120deg, white 220deg, transparent 300deg)',
          opacity: 0.18,
        }}
        animate={reduce ? {} : { rotate: -360 }}
        transition={reduce ? {} : { duration: 120, ease: 'linear', repeat: Infinity }}
      />
    </>
  );
}

