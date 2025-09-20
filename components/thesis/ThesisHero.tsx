"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";

const stackLayers = [
  {
    id: "founders",
    title: "Founders",
    caption: "Insight compels the earliest believers.",
    gradient: "from-sky-100 via-white/80 to-transparent"
  },
  {
    id: "distribution",
    title: "Distribution",
    caption: "Earned access compounds reach.",
    gradient: "from-sky-200/70 via-white/80 to-transparent"
  },
  {
    id: "product",
    title: "Product",
    caption: "Habit-forming loops lock in value.",
    gradient: "from-sky-300/60 via-white/70 to-transparent"
  },
  {
    id: "scale",
    title: "Scale",
    caption: "Economics reinforce the loop.",
    gradient: "from-sky-400/50 via-white/60 to-transparent"
  }
];

const heroLinks = [
  { label: "Loops & distribution", href: "#" },
  { label: "Founder deep dives", href: "#" },
  { label: "Power law essays", href: "#" }
];

export default function ThesisHero() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const [activeLayer, setActiveLayer] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (prefersReducedMotion) {
      return;
    }
    const clamped = Math.max(0, Math.min(0.999, value));
    const nextIndex = Math.min(
      stackLayers.length - 1,
      Math.floor(clamped * stackLayers.length)
    );
    setActiveLayer((prev) => (prev === nextIndex ? prev : nextIndex));
  });

  useEffect(() => {
    if (prefersReducedMotion) {
      setActiveLayer(0);
    }
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-sky-50 to-sky-100 px-6 py-20 shadow-soft"
      aria-labelledby="thesis-hero-heading"
    >
      <div className="mx-auto grid max-w-6xl items-start gap-16 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
        >
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-sky-600">
            Thesis
          </p>
          <h1
            id="thesis-hero-heading"
            className="mt-4 text-4xl font-semibold leading-tight text-slate-900 md:text-5xl"
          >
            The JBV Thesis
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-700">
            Power concentrates where loops form. We back founders who move fast, earn
            distribution, and turn usage into habit...then into durable economics.
          </p>
          <p className="mt-6 text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
            Power accumulates where loops form: insight → access → habit → economics.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3" aria-label="Read our deep dives">
            <span className="mr-2 text-sm font-semibold text-slate-600">Read our deep dives</span>
            {heroLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-full border border-sky-200 bg-white/60 px-4 py-2 text-sm font-medium text-sky-700 transition-colors hover:border-sky-300 hover:bg-sky-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
        <div className="relative">
          <span className="sr-only">Animated stack of company-building phases</span>
          <div className="relative flex h-full flex-col items-stretch justify-end gap-4">
            {stackLayers.map((layer, index) => {
              const isActive = prefersReducedMotion ? index === stackLayers.length - 1 : activeLayer === index;
              const yOffset = prefersReducedMotion ? 0 : (index - activeLayer) * 14;
              return (
                <motion.div
                  key={layer.id}
                  className="relative overflow-hidden rounded-2xl border border-white/60 bg-white/80 px-6 py-6 shadow-lg backdrop-blur"
                  style={{
                    y: prefersReducedMotion ? 0 : yOffset
                  }}
                  animate={
                    prefersReducedMotion
                      ? { opacity: 1, scale: 1 }
                      : {
                          opacity: isActive ? 1 : 0.45,
                          scale: isActive ? 1.03 : 0.94
                        }
                  }
                  transition={{ type: "spring", stiffness: 160, damping: 20 }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${layer.gradient} opacity-60`} aria-hidden="true" />
                  <div className="relative flex flex-col gap-1">
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-lg font-semibold text-slate-900">{layer.title}</p>
                    <p className="text-sm text-slate-600">{layer.caption}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
