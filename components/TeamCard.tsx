'use client';
import { motion } from "framer-motion";
type Props = { name: string; role: string; onClick?: () => void };
export default function TeamCard({ name, role, onClick }: Props) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -2 }}
      className="card p-4 text-left w-full"
    >
      <div className="h-40 w-full rounded-xl bg-gray-100 mb-3" />
      <div className="font-medium">{name}</div>
      <div className="text-sm text-gray-500">{role}</div>
    </motion.button>
  );
}
