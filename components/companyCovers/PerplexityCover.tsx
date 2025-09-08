import { motion } from "framer-motion";
import { Frame, Noise, useAnim } from "./common";

export default function PerplexityCover() {
  const anim = useAnim();
  return (
    <Frame>
      <div className="absolute inset-0 bg-[radial-gradient(80%_120%_at_50%_30%,#000,rgba(0,0,0,.7))]" />
      {/* faint search rays */}
      {[...Array(18)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 h-px w-[120%] origin-left bg-white/10"
          style={{ rotate: i * (360 / 18) }}
          animate={{ opacity: [0.04, 0.18, 0.04] }}
          transition={{ duration: 3 + i * 0.12, ...anim }}
        />
      ))}
      {/* particle question mark */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-[3px] w-[3px] rounded-full bg-white/80"
          style={{
            left: `calc(50% + ${Math.sin(i) * 14}px)`,
            top: `calc(45% + ${Math.cos(i) * 14}px)`,
          }}
          animate={{ y: [0, -6, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2 + (i % 5) * 0.4, ...anim }}
        />
      ))}
      {/* the dot of the "?" */}
      <motion.div
        className="absolute left-1/2 top-[62%] -ml-1.5 h-3 w-3 rounded-full bg-white/90"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.8, ...anim }}
      />
      <Noise />
    </Frame>
  );
}

