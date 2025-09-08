import { motion } from "framer-motion";
import { Frame, Noise, useAnim } from "./common";

export default function OpenAICover() {
  const anim = useAnim();
  return (
    <Frame>
      <div className="absolute inset-0">
        {/* generative gradient core */}
        <motion.div
          className="absolute -inset-24"
          style={{
            background:
              "conic-gradient(from 180deg at 50% 50%, rgba(93,185,255,.35), rgba(168,85,247,.35), rgba(99,102,241,.35), rgba(93,185,255,.35))",
            filter: "blur(40px)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        {/* drifting neural orbs */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-3 w-3 rounded-full bg-white/70 shadow-[0_0_20px_rgba(255,255,255,.25)]"
            style={{ left: `${8 + i * 11}%`, top: `${18 + (i % 4) * 16}%` }}
            animate={{ y: [0, -10, 0], x: [0, 8, 0], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 5 + i * 0.6, ...anim }}
          />
        ))}
      </div>
      <Noise />
    </Frame>
  );
}
