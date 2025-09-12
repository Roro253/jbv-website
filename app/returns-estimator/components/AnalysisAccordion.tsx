'use client';
import { useState, useRef } from 'react';
import { useReducedMotion, motion } from 'framer-motion';
import DriversBar from './DriversBar';
import ArrLine from './ArrLine';

const milestones = [
  '2024: Launch enterprise suite',
  '2025: Reach $200M ARR',
  '2026: International expansion',
  '2027: IPO readiness',
  '2028: $500M ARR goal',
];

const risks = [
  'Market saturation reduces growth',
  'Key talent attrition',
  'Regulatory changes',
  'Security breaches',
  'Macroeconomic downturn',
  'Competitive pricing pressure',
];

const maScenarios = [
  'Strategic cloud providers',
  'Legacy enterprise software',
  'Global consulting firms',
];

const sections = [
  {
    title: 'Software Company Valuations',
    content: (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">Market Multiple Analysis Summary</p>
        <DriversBar />
      </div>
    ),
  },
  {
    title: 'ARR Growth Trajectory',
    content: <ArrLine />,
  },
  {
    title: 'Growth Milestones',
    content: (
      <ul className="list-disc pl-5 space-y-1 text-sm">
        {milestones.map((m) => (
          <li key={m}>{m}</li>
        ))}
      </ul>
    ),
  },
  {
    title: 'Risk Analysis',
    content: (
      <ul className="list-disc pl-5 space-y-1 text-sm">
        {risks.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
    ),
  },
  {
    title: 'Possible M&A Scenarios',
    content: (
      <ul className="list-disc pl-5 space-y-1 text-sm">
        {maScenarios.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    ),
  },
];

export default function AnalysisAccordion() {
  const [open, setOpen] = useState(0);
  const reduce = useReducedMotion();
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKey = (i: number) => (e: React.KeyboardEvent) => {
    const count = sections.length;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      btnRefs.current[(i + 1) % count]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      btnRefs.current[(i - 1 + count) % count]?.focus();
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen(open === i ? -1 : i);
    }
  };

  return (
    <div className="space-y-2">
      {sections.map((s, i) => (
        <div key={s.title} className="border rounded-2xl">
          <h3>
            <button
              ref={el => { btnRefs.current[i] = el; }}
              id={`accordion-button-${i}`}
              className="w-full text-left p-4 flex justify-between items-center"
              aria-expanded={open === i}
              aria-controls={`accordion-panel-${i}`}
              onClick={() => setOpen(open === i ? -1 : i)}
              onKeyDown={handleKey(i)}
            >
              <span>{s.title}</span>
              <span>{open === i ? '-' : '+'}</span>
            </button>
          </h3>
          <motion.div
            initial={false}
            animate={{ height: open === i ? 'auto' : 0, opacity: open === i ? 1 : 0 }}
            transition={reduce ? { duration: 0 } : { duration: 0.2 }}
            id={`accordion-panel-${i}`}
            role="region"
            aria-labelledby={`accordion-button-${i}`}
            className="overflow-hidden"
          >
            <div className="p-6">{s.content}</div>
          </motion.div>
        </div>
      ))}
    </div>
  );
}
