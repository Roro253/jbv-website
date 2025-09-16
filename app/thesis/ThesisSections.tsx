"use client";
import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Source } from "./sources";

export function PhaseList({ phases, selected, onSelect }: { phases: string[]; selected: number; onSelect: (i: number) => void }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <div className="flex flex-wrap gap-2 mt-6">
      {phases.map((_, i) => (
        <motion.button
          key={i}
          aria-label={`Select Phase ${i + 1}`}
          onClick={() => onSelect(i)}
          className={`px-3 py-1 rounded-full border text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
            selected === i ? "bg-brand-100 text-brand-700 border-brand-300" : "bg-white text-slate-600"
          }`}
          animate={selected === i && !shouldReduceMotion ? { scale: [1.02, 1] } : {}}
          whileHover={!shouldReduceMotion ? { scale: 1.02, boxShadow: "0 2px 6px rgba(0,0,0,0.08)" } : {}}
          whileFocus={!shouldReduceMotion ? { scale: 1.02, boxShadow: "0 2px 6px rgba(0,0,0,0.08)" } : {}}
        >
          Phase {i + 1}
        </motion.button>
      ))}
    </div>
  );
}

export function KPIBar({ label, value, note }: { label: string; value: number; note?: string }) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2 text-sm">
        <span>{label}</span>
        {note && (
          <span className="cursor-help text-xs text-muted-foreground" title={note} aria-label={note}>
            ⓘ
          </span>
        )}
      </div>
      <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-brand-500"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export function SourcesDisclosure({ sources }: { sources: Source[] }) {
  return (
    <details className="mt-16 text-xs text-muted-foreground">
      <summary className="cursor-pointer">Sources & further reading</summary>
      <ul className="mt-2 space-y-1">
        {sources.map((s) => (
          <li key={s.url}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-slate-900"
            >
              {s.title} — {s.publisher} ({s.yearOrDate})
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}

export function AdoptionDonut({ progress }: { progress: number }) {
  const ref = useRef<SVGCircleElement | null>(null);
  const isInView = useInView(ref, { once: true });
  const shouldReduceMotion = useReducedMotion();
  return (
    <div className="sticky top-4 md:top-8 ml-auto flex flex-col items-center w-32 h-32">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="45" stroke="#e2e8f0" strokeWidth="10" fill="none" />
        <motion.circle
          ref={ref}
          cx="50"
          cy="50"
          r="45"
          stroke="url(#gradient)"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isInView ? progress : 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 1.2, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="gradient" x1="0" x2="1" y1="1" y2="0">
            <stop offset="0%" stopColor="#2f72ff" />
            <stop offset="100%" stopColor="#8bb8ff" />
          </linearGradient>
        </defs>
      </svg>
      <p className="mt-2 text-center text-xs text-slate-600">
        ≈ 8% → 16% adoption · Progress through the company-building stack
      </p>
    </div>
  );
}
