"use client";

import { useMemo, useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Lightbulb, Megaphone, Repeat, Castle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const phases = [
  {
    id: "p1",
    title: "Phase 1 — Insight & Founders (Foundation)",
    icon: Lightbulb,
    why: "Earned, non-obvious insight + fast shipping compounds advantage later.",
    doNow: [
      "30–100 customer interviews",
      "weekly demos",
      "2–3 design partners"
    ],
    benchmarks: [
      "Time-to-first working demo ≤ 4–6 weeks",
      "3–10 design partners"
    ],
    accent: "border-sky-200",
    gradient: "from-sky-100/70 via-white/80 to-transparent"
  },
  {
    id: "p2",
    title: "Phase 2 — Access & Distribution (Go-to-Market)",
    icon: Megaphone,
    why: "One repeatable low-cost channel beats three mediocre ones.",
    doNow: [
      "Pick a primary channel",
      "instrument activation",
      "weekly funnel reviews"
    ],
    benchmarks: [
      "CAC payback trending to norms (SMB often < 12–18m; enterprise < 24m) and improving MoM"
    ],
    accent: "border-sky-300",
    gradient: "from-sky-200/70 via-white/80 to-transparent"
  },
  {
    id: "p3",
    title: "Phase 3 — Product Engine & Habit (Loops)",
    icon: Repeat,
    why: "Durable usage via a core loop (flywheel/lock-in/network effects) is the engine of power laws.",
    doNow: [
      "Reduce setup friction",
      "deliver one hero outcome",
      "add 2–3 retention hooks"
    ],
    benchmarks: [
      "Sean Ellis PMF ≥ 40% “very disappointed”",
      "cohort retention curve flattening"
    ],
    accent: "border-sky-400",
    gradient: "from-sky-300/70 via-white/70 to-transparent"
  },
  {
    id: "p4",
    title: "Phase 4 — Monetization, Moat & Scale (Applications)",
    icon: Castle,
    why: "With habit formed, pricing power and defensibility appear; then you scale responsibly.",
    doNow: [
      "Price testing",
      "payback discipline",
      "moat building (data, integrations, ecosystem)"
    ],
    benchmarks: [
      "Positive payback at small scale",
      "Churn ↓; NRR ↑; margins expand"
    ],
    accent: "border-sky-500",
    gradient: "from-sky-400/60 via-white/70 to-transparent"
  }
] as const;

export default function StackPhases() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 20,
    restDelta: 0.001
  });

  const variants = useMemo(
    () => ({
      initial: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
      animate: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }
    }),
    [prefersReducedMotion]
  );

  return (
    <TooltipProvider delayDuration={120}>
      <section ref={sectionRef} className="relative" aria-labelledby="company-stack-heading">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row">
          <div className="lg:w-48">
            <div className="sticky top-32 hidden h-64 w-px overflow-hidden rounded-full bg-sky-100 lg:block">
              <motion.div
                style={{ scaleY: prefersReducedMotion ? 1 : progress, originY: 0 }}
                className="h-full w-full rounded-full bg-gradient-to-b from-sky-400 to-sky-200"
                aria-hidden="true"
              />
            </div>
            <h2
              id="company-stack-heading"
              className="text-2xl font-semibold text-slate-900 lg:mt-4"
            >
              Company-Building Stack
            </h2>
            <p className="mt-3 text-sm text-slate-600 lg:max-w-xs">
              Four phases, each reinforcing the next. Stay focused on the loop you can close today.
            </p>
          </div>
          <div className="flex-1 space-y-6">
            {phases.map((phase, index) => {
              const Icon = phase.icon;
              return (
                <motion.article
                  key={phase.id}
                  initial={variants.initial}
                  whileInView={variants.animate}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ type: "spring", stiffness: 120, damping: 18, delay: index * 0.04 }}
                  className={`group relative overflow-hidden rounded-3xl border-l-4 bg-white/90 p-6 shadow-soft backdrop-blur-sm transition-transform hover:-translate-y-1 ${phase.accent}`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${phase.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-80`} aria-hidden="true" />
                  <div className="relative flex items-start gap-5">
                    <motion.div
                      className="grid h-12 w-12 place-items-center rounded-2xl bg-sky-100 text-sky-700 shadow-inner"
                      whileHover={prefersReducedMotion ? undefined : { rotate: index === 2 ? 8 : -4, scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 160, damping: 20 }}
                    >
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-900">{phase.title}</h3>
                      <p className="mt-2 text-sm text-slate-700">{phase.why}</p>
                      <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-slate-700">
                        {phase.doNow.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                      <div className="mt-4">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              type="button"
                              className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                              aria-label={`Benchmarks for ${phase.title}`}
                            >
                              Benchmarks
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <ul className="list-disc space-y-1 pl-4">
                              {phase.benchmarks.map((benchmark) => (
                                <li key={benchmark} className="text-xs text-slate-600">
                                  {benchmark}
                                </li>
                              ))}
                            </ul>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                    <motion.div
                      className="hidden text-sky-500/80 sm:block"
                      animate={
                        prefersReducedMotion
                          ? { opacity: 0.6 }
                          : index === 2
                            ? { rotate: 360 }
                            : { y: [-4, 4, -4] }
                      }
                      transition={{
                        repeat: prefersReducedMotion ? 0 : Infinity,
                        duration: index === 2 ? 8 : 6,
                        ease: "easeInOut"
                      }}
                      aria-hidden="true"
                    >
                      <Icon className="h-10 w-10" />
                    </motion.div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
}
