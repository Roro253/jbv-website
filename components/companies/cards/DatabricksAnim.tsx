'use client';
import { motion, useReducedMotion } from 'framer-motion';

const cube = (i:number)=>(
  <motion.div
    key={i}
    className="absolute size-10 [transform:skewY(-12deg)_skewX(12deg)] bg-[rgba(10,104,255,0.10)] border border-[rgba(10,104,255,0.25)]"
    initial={{ y: -40, opacity:0 }} animate={{ y: 0, opacity: 1 }}
    transition={{ delay: i*0.08, type:'spring', stiffness:150, damping:18 }}
    style={{ left: `${(i%6)*12+12}%`, top: `${Math.floor(i/6)*14+40}%` }}
  />
);

export default function DatabricksAnim(){
  const reduce = useReducedMotion();
  return (
    <div className="absolute inset-0 bg-[radial-gradient(closest-side,white,transparent_70%)]">
      {!reduce && Array.from({length:18}, (_,i)=>cube(i))}
      {/* subtle shimmer */}
      <motion.div className="absolute inset-x-0 bottom-8 h-16"
        style={{ background:'linear-gradient(90deg, transparent, rgba(167,139,250,0.25), transparent)'}}
        animate={reduce?{}:{ x:['-20%','120%']}} transition={{ duration: 5, repeat: Infinity }}/>
    </div>
  );
}

