// components/companyCovers/common.tsx
import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

export function Frame({ children }: { children: ReactNode }) {
  // A subtle glow frame that works on any background
  return (
    <div className="absolute inset-0">
      <motion.div
        className="absolute -inset-px rounded-2xl"
        style={{
          background:
            "radial-gradient(60% 100% at 10% 0%, rgba(255,255,255,.12), transparent 60%), radial-gradient(60% 100% at 90% 100%, rgba(255,255,255,.06), transparent 60%)",
          filter: "blur(8px)",
        }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      {children}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-transparent" />
    </div>
  );
}

export function Noise() {
  // Super cheap film grain via SVG (no extra deps)
  return (
    <svg className="absolute inset-0 h-full w-full opacity-[.07] mix-blend-overlay">
      <filter id="noise">
        <feTurbulence baseFrequency="0.8" numOctaves="2" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  );
}

export function useAnim(disabled?: boolean) {
  const prefersReduced = useReducedMotion();
  return prefersReduced || disabled
    ? { repeat: 0, duration: 0 } // effectively static
    : { repeat: Infinity, ease: "easeInOut" } as const;
}

