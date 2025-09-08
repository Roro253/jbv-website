'use client';
import { motion, useReducedMotion } from 'framer-motion';
export default function PerplexityAnim(){
  const reduce = useReducedMotion();
  return (
    <div className="absolute inset-0 bg-black text-white">
      <motion.div className="absolute left-8 top-8 text-6xl/none"
        initial={{ opacity: 0, filter:'blur(6px)'}} animate={reduce?{}:{ opacity:[0,1,0], filter:['blur(6px)','blur(0px)','blur(6px)']}}
        transition={reduce?{}:{ duration:6, repeat: Infinity}}>
        ?
      </motion.div>
      {[...Array(9)].map((_,i)=>(
        <motion.div key={i} className="absolute size-2 rounded-full bg-white"
          initial={{x:'50%',y:'50%',opacity:0}} animate={reduce?{}:{ x:[`${10+i*9}%`,`${
            20+i*7}%`,`${
            40+i*5}%`], y:[`${20+i*6}%`,`${
            60-i*4}%`,`${
            30+i*3}%`], opacity:[0,1,1]}} transition={reduce?{}:{ duration:8, repeat: Infinity, delay:i*0.2}}/>
      ))}
      <motion.svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100"
        initial={{opacity:0}} animate={reduce?{}:{opacity:[0,0,1]}} transition={{delay:2,duration:2,repeat:Infinity}}>
        {[0,20,40,60,80].map(y=>(
          <line key={y} x1="10" y1={y} x2="90" y2={100-y} stroke="rgba(255,255,255,0.15)" strokeWidth="0.6"/>
        ))}
      </motion.svg>
    </div>
  );
}

