'use client';
import { motion, useReducedMotion } from 'framer-motion';

export default function OpenAIAnim() {
  const reduce = useReducedMotion();
  return (
    <div className="absolute inset-0 bg-[radial-gradient(closest-side,white,transparent_70%)]">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600" aria-hidden>
        {[0,1,2,3].map((i) => (
          <motion.path
            key={i}
            d={`M 100 ${120+i*40} C 300 ${60+i*40}, 500 ${180+i*40}, 700 ${120+i*40}`}
            fill="none"
            stroke="rgba(10,104,255,0.25)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="8 10"
            initial={{ pathLength: 0 }}
            animate={reduce ? {} : { pathLength: [0,1,0] }}
            transition={reduce ? {} : { duration: 10+i*1.2, repeat: Infinity }}
          />
        ))}
      </svg>
      {[0,1,2,3,4,5].map((i) => (
        <motion.div
          key={i}
          className="absolute size-2 rounded-full"
          style={{ background: 'var(--jbv-accent)' }}
          initial={{ x: '10%', y: '30%', opacity: 0.6 }}
          animate={reduce ? {} : { x: ['10%','80%','20%','60%','10%'], y: ['30%','20%','70%','40%','30%'] }}
          transition={reduce ? {} : { duration: 12 + i, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

