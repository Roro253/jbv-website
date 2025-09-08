import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function AnimatedCardFrame({ children }: { children: ReactNode }) {
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0.9 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* subtle animated border glow */}
      <motion.div
        className="absolute -inset-[1px] rounded-2xl"
        style={{
          background:
            "radial-gradient(60% 120% at 10% 0%, rgba(255,255,255,0.15), transparent 60%), radial-gradient(60% 120% at 90% 100%, rgba(255,255,255,0.08), transparent 60%)",
        }}
        animate={{ filter: ["blur(6px)", "blur(10px)", "blur(6px)"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      {children}
    </motion.div>
  );
}

