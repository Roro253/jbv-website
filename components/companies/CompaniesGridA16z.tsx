"use client";
import CompanyCardA16z from "@/components/companies/CompanyCardA16z";

type RecordType = { id: string; fields: Record<string, any>; logoUrl?: string };

export default function CompaniesGridA16z({ items, onOpen }: { items: RecordType[]; onOpen: (id: string) => void }) {
  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" aria-label="Companies">
      {items.map((r) => (
        <CompanyCardA16z key={r.id} record={r} onOpen={onOpen} />
      ))}
    </div>
  );
}

