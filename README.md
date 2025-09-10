# Abstract-like VC Site Starter (Next.js + Tailwind)

This is a clean, modern starter that **recreates the layout, information architecture, and motion patterns** of leading VC firm sites — 
> Replace all placeholder content with your own brand, imagery, and copy before publishing.

## What’s included
- App Router (Next.js 14), TypeScript, Tailwind
- Sticky transparent header; mobile slide-down nav
- Hero with subtle motion
- People grid with modal details
- Companies page with sector filter & featured logo grid (text-only placeholders)
- Office page with public address example
- Design tokens (colors, radius, shadows) in `tailwind.config.ts`

## Quick start
```bash
npm i
npm run dev
# open http://localhost:3000
```

## Customize
- Colors & typography: edit `tailwind.config.ts` and `app/layout.tsx` (Inter font).
- Components: see `/components`. Pages live in `/app`.
- Data models: edit `/lib/team.ts` and `/lib/companies.ts`.

## Notes
- The palette is an approximation chosen to capture a similar feel. Swap to your brand.
- The motion is implemented with Framer Motion for easy tweaking.
