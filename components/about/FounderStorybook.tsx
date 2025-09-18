"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { FOUNDER_POSTS, type FounderPost } from "@/lib/founderPosts";

function useActiveIndex(ref: React.RefObject<HTMLDivElement>, count: number) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const w = el.clientWidth;
      const x = el.scrollLeft;
      const idx = Math.round(x / (w * 0.9));
      setI(Math.max(0, Math.min(count - 1, idx)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, [ref, count]);
  return i;
}

function Slide({ post, index }: { post: FounderPost; index: number }) {
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);

  const rotateX = useTransform(tiltY, [-1, 1], [6, -6]);
  const rotateY = useTransform(tiltX, [-1, 1], [-6, 6]);
  const scale = useTransform([tiltX, tiltY], () => 1.0);

  const hasImage = Boolean(post.image);

  return (
    <li
      className="snap-center shrink-0 w-[90%] md:w-[70%] xl:w-[60%] 2xl:w-[56%] px-3"
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${FOUNDER_POSTS.length}`}
    >
      <Link
        href={post.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Read “${post.title}” by ${post.author} at ${post.company}`}
        className="group block focus:outline-none"
      >
        <motion.article
          style={{ rotateX, rotateY, scale }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 220, damping: 22, mass: 0.8 }}
          onMouseMove={(e) => {
            const el = e.currentTarget.getBoundingClientRect();
            const x = (e.clientX - el.left) / el.width;
            const y = (e.clientY - el.top) / el.height;
            tiltX.set((x - 0.5) * 2);
            tiltY.set((y - 0.5) * 2);
          }}
          onMouseLeave={() => {
            tiltX.set(0);
            tiltY.set(0);
          }}
          className="relative aspect-[16/10] overflow-hidden rounded-3xl ring-1 ring-black/5
                     shadow-[0_28px_80px_-28px_rgba(0,0,0,0.45)] bg-black/5
                     will-change-transform transform-gpu"
        >
          {/* Background / art */}
          <div className="absolute inset-0">
            {hasImage ? (
              <Image
                src={post.image!}
                alt=""
                fill
                priority={false}
                sizes="(max-width: 768px) 90vw, (max-width: 1280px) 70vw, 56vw"
                className="object-cover"
              />
            ) : (
              <div
                className={`h-full w-full bg-gradient-to-tr ${post.accent ?? "from-gray-700 via-gray-900 to-black"}`}
              />
            )}
            {/* Grain & vignette for magazine feel */}
            <div
              className="absolute inset-0 opacity-[.07] mix-blend-multiply pointer-events-none"
              style={{
                backgroundImage:
                  "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22160%22 viewBox=%220 0 160 160%22><filter id=%22n%22><feTurbulence baseFrequency=%220.8%22 numOctaves=%222%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.35%22/></svg>')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
          </div>

          {/* Top meta chip */}
          <div className="absolute left-4 top-4 sm:left-6 sm:top-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-black/40 px-3 py-1
                            text-[11px] sm:text-xs font-medium text-white backdrop-blur">
              <span className="opacity-90">{post.author}</span>
              <span className="opacity-60">•</span>
              <span className="opacity-90">{post.company}</span>
            </div>
          </div>

          {/* Bottom text block */}
          <div className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6">
            <div className="rounded-2xl bg-black/30 backdrop-blur-md p-4 sm:p-5">
              <h3 className="text-white text-2xl sm:text-3xl font-semibold leading-tight">
                {post.title}
              </h3>
              <p
                className="mt-2 text-white/90 text-sm sm:text-base leading-snug line-clamp-2
                            opacity-0 translate-y-2 transition
                            group-hover:opacity-100 group-hover:translate-y-0
                            group-focus-within:opacity-100 group-focus-within:translate-y-0"
              >
                {post.summary}
              </p>
            </div>
          </div>

          {/* Corner CTA */}
          <div className="absolute right-4 top-4 sm:right-6 sm:top-6">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/90 text-slate-900
                             px-3 py-1 text-[11px] sm:text-xs font-medium shadow">
              Read <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>

          {/* Shimmer border on hover */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl
                          [mask:linear-gradient(#000,transparent_60%)]
                          before:absolute before:inset-0 before:rounded-3xl
                          before:bg-[conic-gradient(from_0deg,transparent,white,transparent_30%)]
                          before:opacity-0 group-hover:before:opacity-30
                          before:transition-opacity before:duration-500" />
        </motion.article>
      </Link>
    </li>
  );
}

export default function FounderStorybook() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const active = useActiveIndex(scrollerRef, FOUNDER_POSTS.length);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const go = useCallback((dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const w = el.clientWidth;
    el.scrollBy({ left: dir * w * 0.9, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      }
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [go]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(mq.matches);
    update();
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    }
    mq.addListener(update);
    return () => mq.removeListener(update);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const pause = () => setIsPaused(true);
    const resume = () => setIsPaused(false);
    const handleFocusOut = (event: FocusEvent) => {
      const next = event.relatedTarget as Node | null;
      if (!next || !section.contains(next)) {
        resume();
      }
    };

    section.addEventListener("mouseenter", pause);
    section.addEventListener("mouseleave", resume);
    section.addEventListener("focusin", pause);
    section.addEventListener("focusout", handleFocusOut);

    return () => {
      section.removeEventListener("mouseenter", pause);
      section.removeEventListener("mouseleave", resume);
      section.removeEventListener("focusin", pause);
      section.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || isPaused) return;
    const id = window.setInterval(() => {
      const el = scrollerRef.current;
      if (!el) return;
      const w = el.clientWidth;
      if (!w) return;
      const atEnd = active >= FOUNDER_POSTS.length - 1;
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: w * 0.9, behavior: "smooth" });
      }
    }, 8000);
    return () => window.clearInterval(id);
  }, [active, isPaused, prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-24" aria-label="Founders’ Storybook">
      {/* soft grid background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(0,0,0,.6) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold">Founders’ Storybook</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              Flip through fresh thinking from builders we back.
            </p>
          </div>

          {/* arrows */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full
                         ring-1 ring-black/10 bg-white/70 backdrop-blur hover:bg-white
                         text-slate-800 transition"
              aria-label="Previous"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full
                         ring-1 ring-black/10 bg-white/70 backdrop-blur hover:bg-white
                         text-slate-800 transition"
              aria-label="Next"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* carousel */}
      <div
        ref={scrollerRef}
        tabIndex={0}
        className="mt-8 md:mt-10 flex overflow-x-auto snap-x snap-mandatory
                   scrollbar-none outline-none"
        role="region"
        aria-roledescription="carousel"
        aria-label="Founder posts carousel"
      >
        <ul className="flex items-stretch">
          {FOUNDER_POSTS.map((p, i) => (
            <Slide key={p.id} post={p} index={i} />
          ))}
        </ul>
      </div>

      {/* dots */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {FOUNDER_POSTS.map((_, i) => (
          <span
            key={i}
            className={[
              "h-1.5 w-6 rounded-full transition-all",
              i === active ? "bg-slate-900 dark:bg-white w-8" : "bg-slate-400/40",
            ].join(" ")}
            aria-hidden="true"
          />
        ))}
      </div>

      {/* reduced motion: tone down effects */}
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          [role="region"][aria-roledescription="carousel"] * {
            transition: none !important;
            animation: none !important;
          }
        }
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
