"use client";
import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const descriptions = [
  "Foundation in place: non-obvious insight, weekly ship",
  "Distribution reliable: one channel activates ICPs",
  "Habit loop working: retention flattening",
  "Economics scaling: positive payback, NRR up",
];

export default function ScrollTimeline({ phaseIds }: { phaseIds: string[] }) {
  const [active, setActive] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    phaseIds.forEach((id, i) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(i);
          });
        },
        { threshold: 0.5 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [phaseIds]);

  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="mt-2">
      <motion.div
        className="h-1 bg-slate-200 rounded-full relative overflow-hidden"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: shouldReduceMotion ? 0 : 1, ease: "easeOut" }}
        style={{ transformOrigin: "left" }}
      >
        <motion.div
          className="absolute inset-0 bg-brand-500"
          style={{ transformOrigin: "left" }}
          animate={{ scaleX: (active + 1) / phaseIds.length }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
        />
      </motion.div>
      <div className="mt-4 flex justify-between">
        {phaseIds.map((id, i) => (
          <button
            key={id}
            aria-label={`Scroll to phase ${i + 1}`}
            aria-pressed={active === i}
            onClick={() => handleClick(id)}
            className="flex flex-col items-center text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            <motion.span
              className={active === i ? "bg-brand-500" : "bg-slate-300"}
              style={{ width: 8, height: 8, borderRadius: "50%" }}
              animate={{ scale: active === i ? 1.5 : 1 }}
              transition={{ duration: 0.2 }}
            />
            <span className="mt-2 font-medium">Phase {i + 1}</span>
            <span className="mt-1 text-[10px] text-slate-600 max-w-[6rem] text-center">
              {descriptions[i]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
