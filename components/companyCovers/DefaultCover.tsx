import { motion } from "framer-motion";
import { Frame, Noise, useAnim } from "./common";

export default function DefaultCover() {
  const anim = useAnim();
  return (
    <Frame>
      <motion.div
        className="absolute -inset-10"
        style={{
          background:
            "radial-gradient(40% 60% at 20% 20%, rgba(255,255,255,.18), transparent 60%), radial-gradient(40% 60% at 80% 80%, rgba(255,255,255,.12), transparent 60%)",
          filter: "blur(24px)",
        }}
        animate={{ rotate: [0, 8, 0] }}
        transition={{ duration: 12, ...anim }}
      />
      <Noise />
    </Frame>
  );
}

