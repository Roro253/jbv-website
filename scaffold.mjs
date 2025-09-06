import fs from 'node:fs';
import path from 'node:path';

const F = (p, s) => { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, s.replace(/^\n/, '')); };

const files = {
  "package.json": `
{
  "name": "abstract-like-vc-site",
  "version": "0.2.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "postinstall": "next telemetry disable",
    "logos": "node scripts/fetch-logos.mjs"
  },
  "dependencies": {
    "autoprefixer": "^10.4.19",
    "class-variance-authority": "^0.7.0",
    "framer-motion": "^11.0.0",
    "lucide-react": "^0.452.0",
    "next": "^14.2.5",
    "next-sitemap": "^4.2.3",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "tailwindcss": "^3.4.7"
  },
  "devDependencies": {
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.5",
    "postcss": "^8.4.39",
    "typescript": "^5.4.5"
  }
}
`,
  "tsconfig.json": `
{
  "compilerOptions": {
    "target": "es2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
`,
  "next-env.d.ts": `
/// <reference types="next" />
/// <reference types="next/image-types/global" />
`,
  "next.config.mjs": `
/** @type {import('next').NextConfig} */
const nextConfig = { experimental: { appDir: true } };
export default nextConfig;
`,
  "postcss.config.js": `
module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } };
`,
  "tailwind.config.ts": `
import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx,json}"],
  theme: {
    extend: {
      colors: {
        brand: { 50:"#eef6ff",100:"#d9ecff",200:"#b7d6ff",300:"#8bb8ff",400:"#5b95ff",500:"#2f72ff",600:"#1f5ae6",700:"#1948b4",800:"#163e92",900:"#132f6b" }
      },
      fontFamily: { display: ["var(--font-inter)"], sans: ["var(--font-inter)"] },
      borderRadius: { xl: "1rem", "2xl": "1.25rem" },
      boxShadow: { soft: "0 8px 30px rgba(0,0,0,0.06)" }
    }
  },
  plugins: []
};
export default config;
`,
  "app/globals.css": `
@tailwind base;
@tailwind components;
@tailwind utilities;

:root { --radius: 1rem; }
.prose-muted { @apply text-gray-600; }
.container-6xl { @apply mx-auto max-w-6xl px-4; }
.card { @apply rounded-2xl border bg-white; }
.link { @apply underline underline-offset-4 decoration-gray-300 hover:decoration-brand-500; }
`,
  "next-sitemap.config.js": `
/** @type {import('next-sitemap').IConfig} */
module.exports = { siteUrl: 'https://example.com', generateRobotsTxt: true };
`,
  "lib/team.ts": `
export type TeamMember = { name: string; role: string; headshot?: string; bio?: string; linkedin?: string; };
export const team: TeamMember[] = [
  { name: "Jeffrey Bazar", role: "Founder & Managing Director" }
];
`,
  "lib/companies.ts": `
export type Company = {
  name: string;
  sector?: "AI" | "Biotech" | "Consumer" | "Crypto" | "Enterprise" | "Fintech" | "Frontier Tech" | "Healthcare" | "Insurance";
  stage?: "Pre-Seed" | "Seed" | "Series A" | "Series B" | "Series C";
  status?: "Current" | "Acquired" | "Pending";
  url?: string;
  description?: string;
  logo?: string;
  featured?: boolean;
};
export const sectors = ["All","AI","Biotech","Consumer","Crypto","Enterprise","Fintech","Frontier Tech","Healthcare","Insurance"] as const;
export const companies: Company[] = [
  { name: "Sinefa", status: "Acquired", description: "Digital experience monitoring platform; acquired by Palo Alto Networks in 2020.", url: "https://www.sinefa.com/", logo: "/logos/sinefa.png", sector: "Enterprise" },
  { name: "Placer.ai", status: "Current", description: "Location analytics delivering audience and competitive insights for retailers and brands.", url: "https://www.placer.ai/", logo: "/logos/placerai.jpeg", sector: "Enterprise", featured: true },
  { name: "Deepfield", status: "Acquired", description: "Real-time network performance & security analytics; acquired by Nokia.", url: "https://www.nokia.com/networks/ip-networks/deepfield/", logo: "/logos/deepfield.png", sector: "Enterprise" },
  { name: "PathologyWatch", status: "Pending", description: "Full-service digital dermatopathology solution for dermatology practices.", url: "https://pathologywatch.com/", logo: "/logos/pathologywatch.png", sector: "Healthcare" },
  { name: "Leela AI", status: "Current", description: "Visual intelligence for manufacturing; self-learning agents for operations insights.", url: "https://leela.ai/", logo: "/logos/leela.png", sector: "AI" },
  { name: "tab32", status: "Pending", description: "Cloud dental practice management platform with integrated imaging and patient engagement.", url: "https://www.tab32.com/", logo: "/logos/tab32.png", sector: "Healthcare" },
  { name: "Cariden", status: "Acquired", description: "Network planning & traffic engineering software; acquired by Cisco.", url: "https://newsroom.cisco.com/c/r/newsroom/en/us/a/y2012/m12/cisco-completes-acquisition-of-cariden.html", logo: "/logos/cariden.jpg", sector: "Enterprise" }
];
`,
  "components/Nav.tsx": `
'use client';
import Link from "next/link"; import { useState } from "react"; import { Menu } from "lucide-react";
export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="container-6xl h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">Your VC</Link>
        <nav className="hidden md:flex gap-6 text-sm">
          <Link href="/">About</Link>
          <Link href="/people">People</Link>
          <Link href="/companies">Companies</Link>
          <Link href="/office">Office</Link>
          <a href="https://jobs.example.com" target="_blank" rel="noreferrer">Opportunities</a>
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
            <Link href="/office" onClick={() => setOpen(false)}>Office</Link>
            <a href="https://jobs.example.com" target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>Opportunities</a>
          </div>
        </div>
      )}
    </header>
  );
}
`,
  "components/Footer.tsx": `
export default function Footer() {
  return (
    <footer className="mt-20 border-t">
      <div className="container-6xl py-10 text-sm text-gray-600">
        © {new Date().getFullYear()} Your VC — All rights reserved.
      </div>
    </footer>
  );
}
`,
  "components/Hero.tsx": `
'use client';
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="container-6xl pt-16 pb-12">
      <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-4xl md:text-6xl font-semibold tracking-tight">
        Finding Futures.
      </motion.h1>
      <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }} className="mt-6 max-w-2xl prose-muted">
        We are a venture capital firm based in San Francisco. Sector-agnostic, seed and early stage.
        This starter recreates modern layout and motion patterns—without copying text, logos, or proprietary assets.
      </motion.p>
      <div className="mt-8 flex gap-3">
        <a href="/companies" className="rounded-xl bg-brand-600 text-white px-4 py-2">See companies</a>
        <a href="/people" className="rounded-xl border px-4 py-2">Meet the team</a>
      </div>
    </section>
  );
}
`,
  "components/TeamCard.tsx": `
'use client';
import { motion } from "framer-motion";
type Props = { name: string; role: string; onClick?: () => void };
export default function TeamCard({ name, role, onClick }: Props) {
  return (
    <motion.button onClick={onClick} whileHover={{ y: -2 }} className="card p-4 text-left w-full">
      <div className="h-40 w-full rounded-xl bg-gray-100 mb-3" />
      <div className="font-medium">{name}</div>
      <div className="text-sm text-gray-500">{role}</div>
    </motion.button>
  );
}
`,
  "components/Modal.tsx": `
'use client';
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { ReactNode } from "react";

export default function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: ReactNode }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/40" onClick={onClose} />
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }} transition={{ duration: 0.2 }} className="relative z-10 container-6xl pt-20 pb-10">
            <div className="card p-6 shadow-soft">
              <button onClick={onClose} aria-label="Close" className="absolute right-5 top-5 text-gray-500 hover:text-gray-800">
                <X size={18} />
              </button>
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
`,
  "components/CompanyCard.tsx": `
'use client';
import { motion } from "framer-motion";
import Link from "next/link";
type Props = { name: string; sector?: string; stage?: string; status?: string; url?: string; logo?: string; description?: string };
export default function CompanyCard({ name, sector, stage, status, url, logo, description }: Props) {
  return (
    <motion.div whileHover={{ y: -2 }} className="card p-4">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-xl bg-gray-100 overflow-hidden flex items-center justify-center">
          {logo ? <img src={logo} alt={name + ' logo'} className="h\-full w\-full object-contain" /> : null}
        </div>
        <div>
          <div className="font-medium">{name}</div>
          <div className="text-xs text-gray-500">{(sector ? sector + " · " : "")}{status || stage}</div>
        </div>
      </div>
      {description && <p className="text-sm text-gray-600 mt-3">{description}</p>}
      {url && <Link className="link mt-2 inline-block text-sm" href={url} target="_blank">Visit website</Link>}
    </motion.div>
  );
}
`,
  "components/FilterChips.tsx": `
'use client';
type Props = { options: string[]; value: string; onChange: (v: string) => void };
export default function FilterChips({ options, value, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => (
        <button key={opt} onClick={() => onChange(opt)} className={"px-3 py-1 rounded-full border text-sm " + (value===opt ? "bg-gray-900 text-white" : "bg-white hover:bg-gray-50")}>
          {opt}
        </button>
      ))}
    </div>
  );
}
`,
  "app/layout.tsx": `
import "./globals.css";
import { Inter } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "Your VC",
  description: "A clean VC website starter inspired by modern venture firms.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
`,
  "app/page.tsx": `
import Hero from "@/components/Hero";
export default function Home() {
  return (
    <main>
      <Hero />
      <section className="container-6xl pb-16">
        <h2 className="text-xl font-semibold mb-4">What we do</h2>
        <p className="prose-muted max-w-2xl">
          We partner with founders from seed through early stages across AI, enterprise, fintech, consumer, and more.
          This starter focuses on layout, navigation, and animation patterns—not content.
        </p>
      </section>
    </main>
  );
}
`,
  "app/people/page.tsx": `
'use client';
import { team } from "@/lib/team";
import TeamCard from "@/components/TeamCard";
import Modal from "@/components/Modal";
import { useState } from "react";

export default function PeoplePage() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  return (
    <main className="container-6xl py-10">
      <h1 className="text-3xl font-semibold mb-6">People</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {team.map((m, i) => (
          <TeamCard key={m.name} name={m.name} role={m.role} onClick={() => { setActive(i); setOpen(true); }} />
        ))}
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        {active !== null && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="h-56 w-full rounded-2xl bg-gray-100" />
            </div>
            <div className="md:col-span-2">
              <h2 className="text-2xl font-semibold">{team[active].name}</h2>
              <div className="text-sm text-gray-500 mb-3">{team[active].role}</div>
              <p className="prose-muted">Short bio placeholder. Replace with your own content.</p>
            </div>
          </div>
        )}
      </Modal>
    </main>
  );
}
`,
  "app/companies/page.tsx": `
'use client';
import { companies, sectors } from "@/lib/companies";
import FilterChips from "@/components/FilterChips";
import CompanyCard from "@/components/CompanyCard";
import { useMemo, useState } from "react";

export default function CompaniesPage() {
  const [sector, setSector] = useState<string>("All");
  const filtered = useMemo(() => sector === "All" ? companies : companies.filter(c => c.sector === sector), [sector]);
  const featured = companies.filter(c => c.featured);

  return (
    <main className="container-6xl py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">Companies</h1>
        <p className="prose-muted mt-2">Browse portfolio companies by sector and status.</p>
      </div>

      {featured.length > 0 && (
        <section className="mb-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {featured.map(f => (
              <div key={f.name} className="h-12 rounded-xl border bg-white flex items-center justify-center text-sm text-gray-600 px-2 text-center">
                {f.logo ? <img src={f.logo} alt={f.name + ' logo'} className="max-h-10 object-contain" /> : f.name}
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mb-6">
        <FilterChips options={[...sectors]} value={sector} onChange={setSector} />
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map(c => (
          <CompanyCard key={c.name} name={c.name} sector={c.sector} stage={c.stage} status={c.status} url={c.url} logo={c.logo} description={c.description} />
        ))}
      </section>
    </main>
  );
}
`,
  "app/office/page.tsx": `
export default function OfficePage() {
  return (
    <main className="container-6xl py-10">
      <h1 className="text-3xl font-semibold mb-6">Office</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 h-80 rounded-2xl bg-gray-100" />
        <div className="md:col-span-1">
          <div className="card p-4">
            <div className="font-medium">San Francisco</div>
            <div className="text-sm text-gray-600 mt-2">
              499 Jackson St, 5th Floor<br/>
              San Francisco, CA 94111
            </div>
            <div className="mt-3 text-sm">
              <a className="link" target="_blank" href="https://maps.apple.com/?q=499%20Jackson%20St%2C%20San%20Francisco%2C%20CA%2094111">Open in Maps</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
`,
  "scripts/fetch-logos.mjs": `
import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';

const manifest = JSON.parse(fs.readFileSync('data/logos.json','utf8'));
fs.mkdirSync('public/logos', { recursive: true });

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, (r2) => r2.pipe(file));
      } else {
        res.pipe(file);
      }
      file.on('finish', () => file.close(() => resolve(dest)));
    }).on('error', (err) => reject(err));
  });
}

(async () => {
  for (const it of manifest) {
    const dest = path.join('public/logos', it.filename);
    console.log('Downloading', it.name, '->', dest);
    try { await download(it.url, dest); } catch (e) { console.error('Failed', it.name, e.message); }
  }
  console.log('Done.');
})();
`,
  "data/logos.json": `
[
  {"name":"Sinefa","filename":"sinefa.png","url":"https://static.wixstatic.com/media/da9d9c_c263d0a6f83a44e089160988d391264c~mv2.png/v1/fit/w_321%2Ch_241%2Cq_90%2Cenc_avif%2Cquality_auto/da9d9c_c263d0a6f83a44e089160988d391264c~mv2.png"},
  {"name":"Placer.ai","filename":"placerai.jpeg","url":"https://static.wixstatic.com/media/da9d9c_1a9370dd48e74124bcfd144abfc648ff~mv2.jpeg/v1/fit/w_321%2Ch_241%2Cq_90%2Cenc_avif%2Cquality_auto/da9d9c_1a9370dd48e74124bcfd144abfc648ff~mv2.jpeg"},
  {"name":"Deepfield","filename":"deepfield.png","url":"https://static.wixstatic.com/media/da9d9c_2ae1999314bf44229ae7588be0ebc050~mv2.png/v1/fit/w_321%2Ch_241%2Cq_90%2Cenc_avif%2Cquality_auto/da9d9c_2ae1999314bf44229ae7588be0ebc050~mv2.png"},
  {"name":"PathologyWatch","filename":"pathologywatch.png","url":"https://static.wixstatic.com/media/da9d9c_b147aa2747574628b5a36dc2e8e8cc1d~mv2.png/v1/fit/w_238%2Ch_72%2Cq_90%2Cenc_avif%2Cquality_auto/da9d9c_b147aa2747574628b5a36dc2e8e8cc1d~mv2.png"},
  {"name":"Leela AI","filename":"leela.png","url":"https://static.wixstatic.com/media/da9d9c_c202fa0c51ec4673957bb4fa934d13d9~mv2.png/v1/fit/w_284%2Ch_100%2Cq_90%2Cenc_avif%2Cquality_auto/da9d9c_c202fa0c51ec4673957bb4fa934d13d9~mv2.png"},
  {"name":"tab32","filename":"tab32.png","url":"https://static.wixstatic.com/media/da9d9c_ec16dcbe042c4fa180756164b7945990~mv2.png/v1/fit/w_154%2Ch_70%2Cq_90%2Cenc_avif%2Cquality_auto/da9d9c_ec16dcbe042c4fa180756164b7945990~mv2.png"},
  {"name":"Cariden","filename":"cariden.jpg","url":"https://static.wixstatic.com/media/da9d9c_af6e63aecc304739be6856f61867675e~mv2.jpg/v1/fit/w_321%2Ch_241%2Cq_90%2Cenc_avif%2Cquality_auto/da9d9c_af6e63aecc304739be6856f61867675e~mv2.jpg"}
]
`,
  "README.md": `
# Abstract-like VC Site (with JBV content)
This keeps the same layout and adds JBV portfolio entries (names, statuses, short descriptions) plus a logo fetcher.

## Quick start
\`\`\`bash
npm i
npm run logos   # downloads logos into /public/logos
npm run dev
# open http://localhost:3000
\`\`\`

> Make sure you have rights to use third-party trademarks. Replace with your official logo files if needed.
`
};

for (const [p, s] of Object.entries(files)) F(p, s);
fs.mkdirSync('public/logos', { recursive: true });

console.log('✅ Project files created. Next:');
console.log('   npm i');
console.log('   npm run logos');
console.log('   npm run dev');

