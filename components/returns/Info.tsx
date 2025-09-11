'use client';
import { Info as InfoIcon } from 'lucide-react';
import { ReactNode } from 'react';

export default function Info({ text }: { text: ReactNode }) {
  return (
    <span className="ml-1 inline-flex items-center" title={typeof text==='string'?text:undefined}>
      <InfoIcon className="h-4 w-4 text-muted-foreground" />
    </span>
  );
}
