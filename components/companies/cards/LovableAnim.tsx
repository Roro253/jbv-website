'use client';
import { motion, useReducedMotion } from 'framer-motion';

function Heart() {
  return (
    <svg viewBox="0 0 32 29" className="w-20 h-20" aria-hidden>
      <path d="M23.6,0c-2.7,0-5,1.6-7.6,4.6C13.4,1.6,11.1,0,8.4,0C3.7,0,0,3.8,0,8.6c0,9.1,16,19.9,16,19.9S32,17.7,32,8.6 C32,3.8,28.3,0,23.6,0z" fill="url(#g)" />
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--jbv-accent)" />
          <stop offset="100%" stopColor="var(--jbv-accent-2)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function LovableAnim(){
  const reduce = useReducedMotion();
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white">
      <motion.div initial={{ scale:0.9 }} animate={reduce?{}:{ scale:[0.9,1.05,1] }} transition={{ duration: 2, repeat: Infinity }}>
        <Heart/>
      </motion.div>
      {[...Array(22)].map((_,i)=>(
        <motion.div key={i} className="absolute size-1.5 rounded-full"
          style={{ background: i%2? 'var(--jbv-accent)': 'var(--jbv-accent-2)' }}
          initial={{ x: '50%', y: '50%', opacity: 0 }}
          animate={reduce?{}:{ x: `${Math.random()*100}%`, y: `${Math.random()*100}%`, opacity:[0,1,0] }}
          transition={{ duration: 3+Math.random()*2, repeat: Infinity, delay: i*0.1 }}/>
      ))}
    </div>
  );
}

