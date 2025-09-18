"use client";

import { forwardRef, useMemo } from "react";
import Image from "next/image";
import Link, { type LinkProps } from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import clsx from "clsx";

import { founderPosts } from "@/lib/founderPosts";

import type { AnchorHTMLAttributes, ReactNode } from "react";

const MotionSection = motion.section;
const MotionDiv = motion.div;

type MotionLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    children: ReactNode;
  };

const MotionLink = motion(
  forwardRef<HTMLAnchorElement, MotionLinkProps>(function MotionLinkBase(
    { children, href, ...rest },
    ref,
  ) {
    return (
      <Link ref={ref} href={href} {...rest}>
        {children}
      </Link>
    );
  }),
);

const backgroundGridClasses =
  "absolute inset-0 -z-10 overflow-hidden [mask-image:radial-gradient(circle_at_top,_white_40%,_transparent_70%)]";

export default function FounderSpotlights() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = useMemo(
    () => ({
      hidden: {},
      show: {
        transition: {
          staggerChildren: shouldReduceMotion ? 0 : 0.14,
          delayChildren: shouldReduceMotion ? 0 : 0.08,
        },
      },
    }),
    [shouldReduceMotion],
  );

  const cardVariants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        y: shouldReduceMotion ? 0 : 24,
      },
      show: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 220,
          damping: 22,
          mass: 0.8,
        },
      },
    }),
    [shouldReduceMotion],
  );

  return (
    <MotionSection
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="relative overflow-hidden border-t border-slate-200 bg-gradient-to-b from-white via-sky-50 to-blue-100/40 py-20 text-slate-900 sm:py-24"
    >
      <div aria-hidden className={backgroundGridClasses}>
        <div className="absolute inset-0 opacity-[0.22] [background-image:radial-gradient(circle,_rgba(96,165,250,0.2)_1px,transparent_1px)] [background-size:44px_44px]" />
        <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(148,163,184,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] [background-size:120px_120px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-sky-200/40 via-transparent to-transparent" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-12 -z-10 h-24 overflow-hidden opacity-[0.08]"
          >
            <div className="spotlight-marquee flex min-w-full items-center gap-16 text-4xl font-semibold uppercase tracking-[0.65em] text-slate-300">
              {Array.from({ length: 2 }).map((_, loopIndex) => (
                <div key={loopIndex} className="flex items-center gap-16">
                  {founderPosts.map((post) => (
                    <span key={`${post.id}-${loopIndex}`} className="whitespace-nowrap">
                      {post.company}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="relative space-y-4">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
              Founders’ Field Notes
            </h2>
            <p className="max-w-2xl text-base text-slate-600 sm:text-lg">
              Fresh thinking from builders we back
            </p>
          </div>
        </div>
      </div>

      <MotionDiv
        variants={containerVariants}
        className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 px-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {founderPosts.map((post) => {
          const accentClasses = post.accent ?? "from-sky-200 via-blue-100 to-white";

          return (
            <MotionLink
              key={post.id}
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Read ‘${post.title}’ by ${post.author} at ${post.company}`}
              className="spotlight-card group relative aspect-[16/10] overflow-hidden rounded-3xl bg-white/80 ring-1 ring-slate-200 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.2)] transition-transform duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-sky-100"
              variants={cardVariants}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : { scale: 1.02, rotateX: -2.5, rotateY: 2.5 }
              }
              whileFocus={
                shouldReduceMotion
                  ? undefined
                  : { scale: 1.02, rotateX: -2.5, rotateY: 2.5 }
              }
              transition={{ type: "spring", stiffness: 240, damping: 22, mass: 0.85 }}
              style={{ transformStyle: "preserve-3d" }}
              prefetch={false}
            >
              <div className="absolute inset-0">
                {post.image ? (
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(min-width: 1280px) 33vw, (min-width: 768px) 45vw, 100vw"
                    priority={false}
                  />
                ) : (
                  <div className={clsx("absolute inset-0 bg-gradient-to-tr opacity-90", accentClasses)} />
                )}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(125,211,252,0.35),_transparent_65%)]" />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent" />
                <div className="absolute inset-0 opacity-40 mix-blend-soft-light [background-image:radial-gradient(circle,_rgba(59,130,246,0.35)_0.5px,transparent_0.5px)] [background-size:6px_6px]" />
              </div>

              <div className="pointer-events-none absolute top-4 right-4 z-[3]">
                <div className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-600 backdrop-blur">
                  Read
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </div>
              </div>

              <div className="pointer-events-none absolute inset-x-4 bottom-4 z-[3] rounded-2xl bg-white/90 p-4 backdrop-blur-md">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-600 sm:text-sm">
                  {post.author}
                  <span className="mx-1.5 text-slate-400">•</span>
                  {post.company}
                </div>
                <h3 className="mt-2 text-xl font-semibold leading-tight text-slate-900 sm:text-2xl">
                  {post.title}
                </h3>
                <p className="line-clamp-2 mt-1 translate-y-2 text-sm text-slate-600 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-75 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:text-base">
                  {post.summary}
                </p>
              </div>
            </MotionLink>
          );
        })}
      </MotionDiv>

      <style jsx>{`
        .spotlight-card::after {
          content: "";
          position: absolute;
          inset: -1px;
          border-radius: 1.75rem;
          background: linear-gradient(120deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.45) 50%, rgba(255, 255, 255, 0) 100%);
          background-size: 200% 200%;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.4s ease;
        }

        .spotlight-card:hover::after,
        .spotlight-card:focus-visible::after {
          opacity: 1;
          animation: shimmer-border 2.4s linear infinite;
        }

        .spotlight-marquee {
          animation: marquee-slow 28s linear infinite;
        }

        @keyframes marquee-slow {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes shimmer-border {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

      `}</style>
    </MotionSection>
  );
}
