'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

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
        <Link href="/" className="font-semibold tracking-tight" aria-label="JBV Capital">
          <img src="/jbv-logo.png" alt="JBV Capital" width={120} height={24} />
        </Link>
        <nav className="hidden md:flex gap-6 text-sm">
          <Link href="/">About</Link>
          <Link href="/people">People</Link>
          <Link href="/companies">Companies</Link>
          <Link href="/assistant">JBV Assistant</Link>
        </nav>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Open menu">
          <Menu size={20} />
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="container-6xl py-3 flex flex-col gap-3 text-sm">
            <Link href="/" onClick={() => setOpen(false)}>About</Link>
            <Link href="/people" onClick={() => setOpen(false)}>People</Link>
            <Link href="/companies" onClick={() => setOpen(false)}>Companies</Link>
            <Link href="/assistant" onClick={() => setOpen(false)}>JBV Assistant</Link>
          </div>
        </div>
      )}
    </header>
  );
}
