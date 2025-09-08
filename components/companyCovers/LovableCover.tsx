import { motion } from "framer-motion";
import { Frame, Noise, useAnim } from "./common";

export default function LovableCover() {
  const anim = useAnim();
  return (
    <Frame>
      <div className="absolute inset-0 bg-gradient-to-br from-pink-400/25 via-fuchsia-400/15 to-cyan-400/25" />
      {/* central heart (square + 2 circles) */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.6, ...anim }}
      >
        <div className="h-12 w-12 -rotate-45 rounded-[10px] bg-white/85" />
        <div className="absolute -left-6 top-0 h-12 w-12 rounded-full bg-white/85" />
        <div className="absolute left-0 -top-6 h-12 w-12 rounded-full bg-white/85" />
      </motion.div>
      {/* sparkles */}
      {[...Array(24)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white/70"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          animate={{ y: [0, -8, 0], opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 2 + Math.random() * 2, ...anim }}
        />
      ))}
      <Noise />
    </Frame>
  );
}

