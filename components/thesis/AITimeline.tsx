"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform
} from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const stages = [
  {
    id: "semiconductors",
    title: "Semiconductors",
    range: "2020–2025",
    description: "AI accelerators concentrate compute.",
    constraint: "supply and advanced packaging",
    constraintDetail: "Allocation is tight and packaging is specialized—plan for long lead times and partners.",
    builderKey: "semis"
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    range: "2022–2026",
    description: "Data-center/network build accelerates.",
    constraint: "energy and reliability",
    constraintDetail: "Energy availability and uptime discipline define your cost per job—design for resilience.",
    builderKey: "semis"
  },
  {
    id: "models",
    title: "Models",
    range: "2023–2027",
    description: "Foundation/domain models commercialize; tooling/ops mature.",
    constraint: "Inference cost & latency",
    constraintDetail: "Latency budgets and inference costs shape gross margins—measure, cache, retrieve smartly.",
    builderKey: "models"
  },
  {
    id: "applications",
    title: "Applications",
    range: "2025–2030",
    description: "Moats shift to workflow, distribution, and data; verticals compound.",
    constraint: "Switching costs & embeddedness",
    constraintDetail: "Being irreplaceable requires deep workflow ownership, distribution, and data feedback loops.",
    builderKey: "apps"
  }
] as const;

const builderNotes: Record<string, string> = {
  semis: "Partner with reliable providers; design for cost per token/job.",
  models: "Focus on task performance and latency budgets; evaluate retrievability and evals.",
  apps: "Own workflow and distribution; build data advantage; embed where work happens."
};

export default function AITimeline() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start end", "end start"]
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-45%"]); // slide cards horizontally
  const lineProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });
  const [activeStage, setActiveStage] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (prefersReducedMotion) {
      return;
    }
    const clamped = Math.max(0, Math.min(0.999, value));
    const next = Math.min(stages.length - 1, Math.floor(clamped * stages.length));
    setActiveStage((prev) => (prev === next ? prev : next));
  });

  useEffect(() => {
    if (prefersReducedMotion) {
      setActiveStage(stages.length - 1);
    }
  }, [prefersReducedMotion]);

  const activeBuilderNote = useMemo(() => {
    const key = stages[activeStage]?.builderKey ?? "semis";
    return builderNotes[key];
  }, [activeStage]);

  return (
    <TooltipProvider delayDuration={120}>
      <section className="mx-auto mt-24 max-w-6xl" aria-labelledby="ai-timeline-heading">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,2.5fr)_minmax(0,1fr)] lg:items-start">
          <div className="relative overflow-hidden rounded-3xl bg-white/90 px-6 py-10 shadow-soft backdrop-blur" ref={trackRef}>
            <h2 id="ai-timeline-heading" className="text-2xl font-semibold text-slate-900">
              AI Power Law Stack
            </h2>
            <p className="mt-3 max-w-xl text-sm text-slate-600">
              Scroll to see how semiconductors → infrastructure → models → applications compound—and where constraints bite.
            </p>
            <div className="relative mt-8 h-[22rem] overflow-hidden">
              <motion.div
                className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-sky-100"
                style={{ scaleX: prefersReducedMotion ? 1 : lineProgress, originX: 0 }}
                aria-hidden="true"
              />
              <motion.div
                className="flex h-full items-center gap-8"
                style={prefersReducedMotion ? undefined : { x }}
              >
                {stages.map((stage, index) => {
                  const isActive = prefersReducedMotion ? index === stages.length - 1 : activeStage === index;
                  return (
                    <motion.article
                      key={stage.id}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ type: "spring", stiffness: 120, damping: 18 }}
                      className={`relative min-w-[260px] max-w-[280px] rounded-3xl border px-5 py-6 shadow-soft transition-transform ${isActive ? "border-sky-400 bg-sky-50" : "border-slate-200 bg-white/70"}`}
                    >
                      <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                        {stage.range}
                      </div>
                      <h3 className="mt-2 text-lg font-semibold text-slate-900">{stage.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{stage.description}</p>
                      <div className="mt-4 flex items-center gap-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span
                              className="inline-flex cursor-default items-center gap-2 rounded-full border border-sky-300 bg-white/80 px-3 py-1 text-xs font-medium text-sky-700"
                              role="listitem"
                            >
                              Constraint · {stage.constraint}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs leading-relaxed text-slate-600">{stage.constraintDetail}</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
                        <motion.div
                          className="h-full bg-gradient-to-r from-sky-400 to-sky-600"
                          initial={{ width: 0 }}
                          whileInView={{ width: "100%" }}
                          viewport={{ once: true }}
                          transition={{ type: "spring", stiffness: 120, damping: 20, delay: index * 0.05 }}
                        />
                      </div>
                      <div className="absolute -bottom-3 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border border-sky-300 bg-white" aria-hidden="true" />
                    </motion.article>
                  );
                })}
              </motion.div>
            </div>
          </div>
          <aside className="sticky top-32 rounded-3xl bg-sky-900/90 p-8 text-slate-100 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-200">
              What this means for builders today
            </p>
            <motion.p
              key={activeBuilderNote}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
              className="mt-4 text-base leading-relaxed text-slate-100"
            >
              {activeBuilderNote}
            </motion.p>
            <ul className="mt-6 space-y-4 text-sm text-slate-200">
              {stages.map((stage, index) => (
                <li key={stage.id} className={`transition-opacity ${index === activeStage ? "opacity-100" : "opacity-50"}`}>
                  <span className="block text-xs font-semibold uppercase tracking-[0.24em] text-sky-300">
                    {stage.title}
                  </span>
                  <span className="mt-1 block text-sm text-slate-100">{stage.description}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </TooltipProvider>
  );
}
