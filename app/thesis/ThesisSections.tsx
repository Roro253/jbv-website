"use client";
import React, { useRef, useState } from "react";
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
        >
          Phase {i + 1}
        </motion.button>
      ))}
    </div>
  );
}

export function KPIBar({ label, value, note }: { label: string; value: number; note?: string }) {
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
      <div className="h-2 w-full rounded-full bg-slate-200">
        <div className="h-full rounded-full bg-brand-500" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export function Scorecard() {
  const [scores, setScores] = useState([0, 0, 0, 0]);
  const total = scores.reduce((a, b) => a + b, 0);
  const label = total < 9 ? "iterate with focus" : "keep compounding";
  return (
    <div className="rounded-2xl shadow-lg shadow-soft p-6 md:p-8 bg-white">
      <h3 className="text-lg font-semibold">Quick Scorecard (monthly, 0–3)</h3>
      {['Thesis & speed', 'Distribution', 'Product loop', 'Economics'].map((name, idx) => (
        <div key={name} className="mt-4">
          <label className="flex justify-between text-sm mb-1" htmlFor={`score-${idx}`}>
            <span>{name}</span>
            <span>{scores[idx]}</span>
          </label>
          <input
            id={`score-${idx}`}
            aria-label={name}
            type="range"
            min={0}
            max={3}
            step={1}
            value={scores[idx]}
            onChange={(e) => {
              const next = [...scores];
              next[idx] = Number(e.target.value);
              setScores(next);
            }}
            className="w-full accent-brand-500"
          />
        </div>
      ))}
      <div className="mt-6 text-sm font-medium">Total: {total} / 12</div>
      <button
        aria-label="scorecard action"
        className="mt-2 rounded-md bg-brand-600 px-4 py-2 text-sm text-white"
      >
        {label}
      </button>
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
          animate={isInView && !shouldReduceMotion ? { pathLength: progress } : { pathLength: progress }}
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
