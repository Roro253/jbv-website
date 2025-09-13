"use client";
import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface Node {
  id: string;
  label: string;
  tooltip: string;
}

const nodes: Node[] = [
  {
    id: "phase-1-foundation",
    label: "Insight & Founders",
    tooltip:
      "Non-obvious insight + fast ship cadence creates early compounding. Example: weekly demos with 3–10 design partners.",
  },
  {
    id: "phase-2-distribution",
    label: "Access & Distribution",
    tooltip:
      "One low-cost, repeatable channel beats three mediocre ones. Example: CAC payback trending toward category norms.",
  },
  {
    id: "phase-3-product",
    label: "Product Engine & Habit",
    tooltip:
      "Core loop (flywheel/lock-in/network effects) retains users. Example: ≥40% 'very disappointed' and flattening retention.",
  },
  {
    id: "phase-4-monetization",
    label: "Monetization, Moat & Scale",
    tooltip:
      "Pricing power and defensibility appear after habit. Example: Positive payback at small scale; NRR up; margins expand.",
  },
];

const paths = [
  "M200 70 A130 130 0 0 1 330 200",
  "M330 200 A130 130 0 0 1 200 330",
  "M200 330 A130 130 0 0 1 70 200",
  "M70 200 A130 130 0 0 1 200 70",
];

const positions = [
  { left: 145, top: 50 },
  { left: 275, top: 180 },
  { left: 145, top: 310 },
  { left: 15, top: 180 },
];

export default function Flywheel({ onSelectPhase }: { onSelectPhase?: (id: string) => void }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleClick = (id: string) => {
    if (onSelectPhase) onSelectPhase(id);
    else document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Interactive Flywheel</h3>
      <div className="relative w-full max-w-sm mx-auto" style={{ height: 400 }}>
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <defs>
            <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#2f72ff" />
            </marker>
          </defs>
          {paths.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              stroke="#2f72ff"
              strokeWidth={2}
              fill="none"
              markerEnd="url(#arrowhead)"
              strokeDasharray="4 8"
              initial={{ pathLength: 0 }}
              animate={
                shouldReduceMotion
                  ? { pathLength: 1 }
                  : { pathLength: 1, strokeDashoffset: -40, opacity: [0.85, 1, 0.85] }
              }
              transition={{
                pathLength: { duration: 1.2, ease: "easeOut" },
                strokeDashoffset: { repeat: Infinity, duration: 3, ease: "linear" },
                opacity: { repeat: Infinity, duration: 3 },
              }}
            />
          ))}
        </svg>
        {nodes.map((n, i) => (
          <motion.div
            key={n.id}
            className="absolute"
            style={{ left: positions[i].left, top: positions[i].top, width: 110 }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: shouldReduceMotion ? 0 : i * 0.1 }}
          >
            <button
              aria-label={`Flywheel node: ${n.label}`}
              onClick={() => handleClick(n.id)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
              className="w-full px-3 py-2 rounded-2xl bg-brand-100 text-brand-700 text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              {n.label}
            </button>
            {hovered === i && (
              <motion.div
                role="tooltip"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute z-10 mt-2 w-64 p-3 text-xs rounded-lg bg-slate-800 text-white shadow-lg"
              >
                {n.tooltip}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
