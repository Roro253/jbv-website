// JBV: BEGIN FooterJBV.tsx
"use client";

import Link from "next/link";

function IconX(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M18.243 2H21l-6.69 7.64L22 22h-6.41l-4.2-5.8L6 22H3.243l7.35-8.39L2 2h6.41l3.86 5.3L18.243 2Z" fill="currentColor"/>
    </svg>
  );
}

function IconLinkedIn(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1 0-5Z" fill="currentColor"/>
      <path d="M4 9h3v12H4V9Zm6.5 0H13v1.8h.05c.35-.65 1.2-1.35 2.47-1.35 2.64 0 3.13 1.74 3.13 4v7.55h-3V14.4c0-1.32-.02-3.02-1.84-3.02-1.84 0-2.12 1.43-2.12 2.92V21H10.5V9Z" fill="currentColor"/>
    </svg>
  );
}

export default function FooterJBV() {
  return (
    <footer className="bg-[#060d1f] text-white/90">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand + Social */}
          <div className="space-y-6">
            <div className="leading-none">
              <div className="text-2xl font-semibold text-white tracking-wide">JBV</div>
              <div className="text-2xl font-semibold text-white tracking-wide">CAPITAL</div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="https://x.com/" target="_blank" rel="noopener noreferrer" aria-label="JBV on X">
                <IconX className="h-5 w-5 text-white/90 hover:text-white transition" />
              </Link>
              <Link href="https://www.linkedin.com/in/jeffrey-bazar/" target="_blank" rel="noopener noreferrer" aria-label="JBV on LinkedIn">
                <IconLinkedIn className="h-5 w-5 text-white/90 hover:text-white transition" />
              </Link>
            </div>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-white/70">Company</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-white transition">About</Link></li>
              <li><Link href="#" className="hover:text-white transition">News</Link></li>
              <li>
                <Link
                  href="https://invest.jbv.com/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  LP Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-white/70">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/legal/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Privacy</Link></li>
              <li><Link href="/legal/terms" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Terms</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-white/70">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:jb@jbv.com?subject=Inquiry%20%E2%80%94%20JBV%20Capital&body=Hi%20JBV%20Capital%20team%2C%0D%0A%0D%0A"
                  className="hover:text-white transition"
                  aria-label="Email JBV Capital"
                  title="Email JBV Capital"
                >
                  Contact
                </a>
              </li>
              <li><Link href="#" className="hover:text-white transition">Blog</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 text-xs text-white/60">
          © {new Date().getFullYear()} JBV Capital — All rights reserved.
        </div>
      </div>
    </footer>
  );
}
// JBV: END FooterJBV.tsx
