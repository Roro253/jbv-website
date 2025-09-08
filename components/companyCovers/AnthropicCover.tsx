import { motion } from "framer-motion";
import { Frame, Noise, useAnim } from "./common";

export default function AnthropicCover() {
  const anim = useAnim();
  return (
    <Frame>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 200">
        {[...Array(9)].map((_, i) => (
          <motion.path
            key={i}
            d={`M 0 ${18 + i * 20} C 120 ${8 + i * 12}, 280 ${28 + i * 12}, 400 ${18 + i * 20}`}
            stroke="rgba(255,255,255,.55)"
            strokeWidth={i === 4 ? 2 : 1}
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.1 + i * 0.1, ease: "easeOut" }}
          />
        ))}
      </svg>
      {/* sweeping highlight */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(90deg, transparent, rgba(255,255,255,.10), transparent)",
          backgroundSize: "200% 100%",
        }}
        animate={{ backgroundPositionX: ["0%", "100%", "0%"] }}
        transition={{ duration: 6, ...anim }}
      />
      <Noise />
    </Frame>
  );
}

