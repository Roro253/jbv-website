'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => setIsDark(!!mq?.matches);
    onChange();
    mq?.addEventListener?.('change', onChange);
    return () => mq?.removeEventListener?.('change', onChange);
  }, []);
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="container-6xl h-14 flex items-center justify-between">
        {/* Logo (kept) */}
        <Link href="/" className="font-semibold tracking-tight" aria-label="JBV Capital">
          <img src="/jbv-logo.png" alt="JBV Capital" width={120} height={24} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link href="/" className="hover:text-[var(--jbv-accent)] transition-colors">About</Link>
          <Link href="/thesis" className="hover:text-[var(--jbv-accent)] transition-colors">Thesis</Link>
          <Link href="/people" className="hover:text-[var(--jbv-accent)] transition-colors">People</Link>
          <Link href="/companies" className="hover:text-[var(--jbv-accent)] transition-colors">Companies</Link>
          <Link href="/assistant" className="hover:text-[var(--jbv-accent)] transition-colors">JBV Assistant</Link>
          <Link href="/returns-estimator" className="hover:text-[var(--jbv-accent)] transition-colors">Returns Estimator</Link>
        </nav>

        {/* Mobile trigger */}
        <button
          className="md:hidden text-[13px] tracking-widest font-medium px-3 py-1 rounded-full border border-black/10 bg-white/60 backdrop-blur hover:bg-white"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="mobile-overlay"
        >
          MENU
        </button>
      </div>

      {/* Mobile slide-down overlay */}
      <div
        id="mobile-overlay"
        className={`md:hidden fixed inset-x-0 top-0 z-50 origin-top transform transition-transform duration-300 ease-out ${open ? "translate-y-0" : "-translate-y-full"}`}
        aria-hidden={!open}
      >
        <div className="bg-white/90 backdrop-blur border-b border-black/10 shadow-sm">
          <div className="container-6xl py-3 flex items-center justify-between">
            <span className="text-sm font-medium tracking-tight">Navigation</span>
            <button aria-label="Close menu" onClick={() => setOpen(false)} className="p-1 rounded-full border border-black/10 bg-white/70">
              <X size={16} />
            </button>
          </div>
        </div>
          <div className="bg-white/95 backdrop-blur pb-6 border-b border-black/10">
            <div className="container-6xl pt-4 grid grid-cols-2 gap-4 text-base">
            <Link href="/" onClick={() => setOpen(false)} className="rounded-xl border border-black/10 px-4 py-3 bg-white hover:bg-sky-50 transition">About</Link>
            <Link href="/thesis" onClick={() => setOpen(false)} className="rounded-xl border border-black/10 px-4 py-3 bg-white hover:bg-sky-50 transition">Thesis</Link>
            <Link href="/people" onClick={() => setOpen(false)} className="rounded-xl border border-black/10 px-4 py-3 bg-white hover:bg-sky-50 transition">People</Link>
            <Link href="/companies" onClick={() => setOpen(false)} className="rounded-xl border border-black/10 px-4 py-3 bg-white hover:bg-sky-50 transition">Companies</Link>
            <Link href="/assistant" onClick={() => setOpen(false)} className="rounded-xl border border-black/10 px-4 py-3 bg-white hover:bg-sky-50 transition">JBV Assistant</Link>
            <Link href="/returns-estimator" onClick={() => setOpen(false)} className="rounded-xl border border-black/10 px-4 py-3 bg-white hover:bg-sky-50 transition">Returns Estimator</Link>
            </div>
          </div>
      </div>
    </header>
  );
}
