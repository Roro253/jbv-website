import { motion } from "framer-motion";
import { Frame, Noise, useAnim } from "./common";

export default function DatabricksCover() {
  const anim = useAnim();
  return (
    <Frame>
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-neutral-900/90 to-neutral-800" />
      {/* grid sweep */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(transparent 23px, rgba(255,255,255,.09) 24px), linear-gradient(90deg, transparent 23px, rgba(255,255,255,.09) 24px)",
          backgroundSize: "24px 24px, 24px 24px",
        }}
        animate={{ backgroundPositionX: ["0px", "24px", "0px"], opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 4, ...anim }}
      />
      {/* bricks band */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-16"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,.16), rgba(255,255,255,.16) 8px, transparent 8px, transparent 16px), repeating-linear-gradient(90deg, rgba(255,255,255,.12), rgba(255,255,255,.12) 20px, transparent 20px, transparent 40px)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.4 }}
      />
      {/* flow lines */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-0 right-0 h-[1.5px] bg-white/20"
          style={{ top: `${30 + i * 10}%` }}
          animate={{ x: ["-10%", "10%", "-10%"] }}
          transition={{ duration: 8 + i, ...anim }}
        />
      ))}
      <Noise />
    </Frame>
  );
}
