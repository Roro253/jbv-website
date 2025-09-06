'use client';
import { motion } from "framer-motion";
import Link from "next/link";
type Props = { name: string; sector: string; stage: string; url?: string; note?: string; logo?: string };
export default function CompanyCard({ name, sector, stage, url, note, logo }: Props) {
  return (
    <motion.div whileHover={{ y: -2 }} className="card p-4">
      <div className="h-12 w-12 rounded-xl bg-gray-100 mb-3">
        {logo ? (
          <img src={logo} alt={name + ' logo'} className="h-full w-full object-contain" />
        ) : null}
      </div>
      <div className="font-medium">{name}</div>
      <div className="text-xs text-gray-500">{note ?? `${sector} · ${stage}`}</div>
      {url && <Link className="link mt-2 inline-block text-sm" href={url} target="_blank">Visit website</Link>}
    </motion.div>
  );
}
