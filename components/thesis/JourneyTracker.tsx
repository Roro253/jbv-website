"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer
} from "recharts";

const phases = [
  { id: "p1", label: "Phase 1", subtitle: "Insight & Founders" },
  { id: "p2", label: "Phase 2", subtitle: "Access & Distribution" },
  { id: "p3", label: "Phase 3", subtitle: "Product Engine & Habit" },
  { id: "p4", label: "Phase 4", subtitle: "Monetization & Scale" }
] as const;

const focusAreas = [
  { key: "Insight", summary: "Insight compounds when truth-seeking conversations stay close to the problem." },
  { key: "Distribution", summary: "Distribution power shows up when one channel predictably fills the top of funnel." },
  { key: "Product Loop", summary: "Early traction is habit-forming when cohort curves flatten." },
  { key: "Economics", summary: "Pricing power appears after habits hold and payback discipline kicks in." }
] as const;

const phaseDefaults: Record<(typeof phases)[number]["id"], Record<string, number>> = {
  p1: { Insight: 4.5, Distribution: 2.2, "Product Loop": 1.4, Economics: 1 },
  p2: { Insight: 3.4, Distribution: 4.3, "Product Loop": 2.4, Economics: 1.3 },
  p3: { Insight: 2.6, Distribution: 3.4, "Product Loop": 4.6, Economics: 2.2 },
  p4: { Insight: 2, Distribution: 3, "Product Loop": 3.8, Economics: 4.8 }
};

const chartConfig = {
  stroke: "#0ea5e9",
  fill: "rgba(14,165,233,0.35)",
  grid: "rgba(148,163,184,0.25)",
  text: "#0f172a"
};

export default function JourneyTracker() {
  const [phase, setPhase] = useState<(typeof phases)[number]["id"]>("p1");
  const [focus, setFocus] = useState<Set<string>>(() => new Set(["Insight"]));
  const prefersReducedMotion = useReducedMotion();

  const chartData = useMemo(() => {
    const base = phaseDefaults[phase];
    return focusAreas.map((area) => {
      const boost = focus.has(area.key) ? 0.9 : 0;
      const value = Math.min(5, base[area.key] + boost);
      return {
        category: area.key,
        value
      };
    });
  }, [focus, phase]);

  const highlightedSummaries = useMemo(() => {
    return focusAreas.map((area) => ({
      key: area.key,
      summary: area.summary,
      active: focus.has(area.key)
    }));
  }, [focus]);

  return (
    <section className="mx-auto mt-24 max-w-6xl rounded-3xl bg-white/90 p-8 shadow-soft backdrop-blur" aria-labelledby="journey-tracker-heading">
      <div className="flex flex-col gap-10 lg:flex-row">
        <div className="lg:w-72">
          <h2 id="journey-tracker-heading" className="text-2xl font-semibold text-slate-900">
            Journey Tracker
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            Where are you leaning in today? Select a phase and the loop you are strengthening—the radar shows which slice is lit up.
          </p>
          <div className="mt-6 space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Phase</p>
              <div className="mt-3 grid grid-cols-2 gap-2" role="radiogroup" aria-label="Select current phase">
                {phases.map((item) => {
                  const isActive = phase === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="radio"
                      aria-checked={isActive}
                      onClick={() => setPhase(item.id)}
                      className={`rounded-2xl border px-4 py-3 text-left text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${isActive ? "border-sky-400 bg-sky-50 text-sky-700" : "border-slate-200 bg-white/70 text-slate-600 hover:border-slate-300"}`}
                    >
                      <span className="block font-semibold">{item.label}</span>
                      <span className="mt-0.5 block text-xs text-slate-500">{item.subtitle}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Focus tags</p>
              <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Select focus areas">
                {focusAreas.map((area) => {
                  const isActive = focus.has(area.key);
                  return (
                    <button
                      key={area.key}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => {
                        setFocus((prev) => {
                          const next = new Set(prev);
                          if (next.has(area.key)) {
                            next.delete(area.key);
                          } else {
                            next.add(area.key);
                          }
                          return next;
                        });
                      }}
                      className={`rounded-full border px-4 py-2 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${isActive ? "border-sky-400 bg-sky-100 text-sky-700" : "border-slate-200 bg-white/70 text-slate-600 hover:border-slate-300"}`}
                    >
                      {area.key}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={chartData} cx="50%" cy="50%" outerRadius="75%">
                <PolarGrid stroke={chartConfig.grid} strokeWidth={1} />
                <PolarAngleAxis dataKey="category" tick={{ fill: chartConfig.text, fontSize: 12 }} />
                <PolarRadiusAxis domain={[0, 5]} tickCount={6} axisLine={false} tick={false} />
                <Radar
                  dataKey="value"
                  stroke={chartConfig.stroke}
                  fill={chartConfig.fill}
                  fillOpacity={prefersReducedMotion ? 0.45 : 0.55}
                  isAnimationActive={!prefersReducedMotion}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {highlightedSummaries.map((item) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ type: "spring", stiffness: 120, damping: 18 }}
                className={`rounded-2xl border px-4 py-3 text-sm ${item.active ? "border-sky-400 bg-sky-50 text-sky-800" : "border-slate-200 bg-white text-slate-600"}`}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">{item.key}</p>
                <p className="mt-1 text-sm leading-relaxed">{item.summary}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
