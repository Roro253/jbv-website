"use client";
export const dynamic = "force-dynamic";
import React, { useRef, useState } from "react";
import nextDynamic from "next/dynamic";
import { motion } from "framer-motion";
import { PhaseList, KPIBar, Scorecard, SourcesDisclosure, AdoptionDonut } from "./ThesisSections";
import { sources } from "./sources";

const ThesisBackground = nextDynamic(() => import("@/components/thesis/bg/ThesisBackground"), { ssr: false });

interface Phase {
  title: string;
  why: string;
  doNow: string;
  benchmarks: string[];
}

const phases: Phase[] = [
  {
    title: "Phase 1 — Insight & Founders (Foundation)",
    why: "Teams with a non-obvious insight and fast ship cadence compound advantage in every later layer.",
    doNow: "30–100 customer interviews; weekly demo cadence; recruit 2–3 design partners.",
    benchmarks: [
      "time-to-first working demo ≤ 4–6 weeks",
      "3–10 design partners"
    ]
  },
  {
    title: "Phase 2 — Access & Distribution (Go-to-Market Infrastructure)",
    why: "One repeatable low-cost channel beats three mediocre ones.",
    doNow: "Pick one primary channel; instrument activation; weekly funnel reviews.",
    benchmarks: [
      "CAC payback trending to category norms (SMB often < 12–18m; enterprise < 24m) and improving MoM"
    ]
  },
  {
    title: "Phase 3 — Product Engine & Habit (Models)",
    why: "Durable usage via a core loop (flywheel/lock-in/network effects) is the engine of power laws.",
    doNow: "Reduce setup friction; deliver one hero outcome; add 2–3 retention hooks (saved state, integrations, alerts).",
    benchmarks: [
      "Sean Ellis PMF signal ≥ 40% “very disappointed”",
      "cohort retention curve flattening"
    ]
  },
  {
    title: "Phase 4 — Monetization, Moat & Scale (Applications)",
    why: "With habit formed, pricing power and defensibility appear; then you scale responsibly.",
    doNow: "Price testing; payback discipline; moat building (data advantage, integrations, ecosystem).",
    benchmarks: [
      "Positive payback at small scale",
      "churn ↓; NRR ↑; margins expand"
    ]
  }
];

export default function ThesisPage() {
  const [selected, setSelected] = useState(0);
  const phaseRefs = useRef<Array<HTMLDivElement | null>>([]);

  const handleSelect = (i: number) => {
    setSelected(i);
    phaseRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="relative bg-white text-slate-900">
      <ThesisBackground />
      <div className="container-6xl py-16 relative">
        <AdoptionDonut progress={(selected + 1) / phases.length} />
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight max-w-4xl">
          Startup Power Law Emergence: Company-Building Stack
        </h1>
        <PhaseList phases={phases.map(p => p.title)} selected={selected} onSelect={handleSelect} />
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-8">
            {phases.map((phase, idx) => (
              <motion.div
                key={phase.title}
                ref={el => (phaseRefs.current[idx] = el)}
                className={`rounded-2xl shadow-lg shadow-soft p-6 md:p-8 bg-white ${selected === idx ? 'ring-2 ring-brand-500' : ''}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <h2 className="text-lg font-semibold">{phase.title}</h2>
                <div className="mt-4 space-y-4 text-sm text-slate-600">
                  <div>
                    <h3 className="font-medium">Why it matters:</h3>
                    <p>{phase.why}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Do now:</h3>
                    <p>{phase.doNow}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Benchmarks:</h3>
                    <ul className="list-disc pl-4">
                      {phase.benchmarks.map(b => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              className="rounded-2xl shadow-lg shadow-soft p-6 md:p-8 bg-white"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-lg font-semibold">Stack Building Insight (AI):</h2>
              <p className="mt-2 text-sm text-slate-600">
                Power concentrates bottom-up. Semiconductors → infrastructure → models → applications. The binding constraint is increasingly physical (compute, power, supply chain). Winners scale infra reliably and translate it into compounding product loops.
              </p>
              <h3 className="mt-6 font-medium">AI Power Law Emergence: Tech Stack Evolution</h3>
              <div className="mt-4 space-y-4 text-sm text-slate-600">
                <div>
                  <h4 className="font-medium">Phase 1: Semiconductors (2020–2025):</h4>
                  <p>NVIDIA establishes AI accelerator dominance; capex wave begins.</p>
                </div>
                <div>
                  <h4 className="font-medium">Phase 2: Infrastructure (2022–2026):</h4>
                  <p>Data-center/network build accelerates; energy becomes a constraint.</p>
                </div>
                <div>
                  <h4 className="font-medium">Phase 3: Models (2023–2027):</h4>
                  <p>Foundation/domain models commercialize; tooling/ops mature.</p>
                </div>
                <div>
                  <h4 className="font-medium">Phase 4: Applications (2025–2030):</h4>
                  <p>Moats shift to workflow, distribution, and data; next 40× opportunities in verticals.</p>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <KPIBar label="Phase 1" value={100} note="2020–2025" />
                <KPIBar label="Phase 2" value={60} note="2022–2026" />
                <KPIBar label="Phase 3" value={40} note="2023–2027" />
                <KPIBar label="Phase 4" value={20} note="2025–2030" />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Scorecard />
            </motion.div>
          </div>
        </div>
        <SourcesDisclosure sources={sources} />
      </div>
    </main>
  );
}
