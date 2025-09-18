"use client";
import { ReactNode } from "react";
import { getField } from "@/components/companies/utils";
import { tileClasses } from "@/components/companies/tileStyles";

type RecordType = { id: string; fields: Record<string, any>; logoUrl?: string };

export default function CompanyCardA16z({
  record,
  onOpen,
  cover,
}: {
  record: RecordType;
  onOpen: (id: string) => void;
  cover?: ReactNode;
}) {
  const fields = record.fields || {};
  const name = (getField<string>(fields, "Name", "Company", "Title") || record.id).toString();
  const summary = (getField<string>(fields, "Description", "Category") ?? "").toString();
  const category = (fields?.["Category"] ?? "").toString();
  const t = tileClasses(category, name);

  return (
    <button
      type="button"
      onClick={() => onOpen(record.id)}
      aria-label={`Open details for ${name}`}
      className="group relative block w-full overflow-hidden rounded-2xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black/50 dark:focus-visible:ring-white/60 transition-transform duration-300"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 transform-gpu will-change-transform transition-transform duration-300 group-hover:scale-[1.02]">
          <div className="h-full w-full">
            {cover ? (
              <div className="h-full w-full">{cover}</div>
            ) : (
              <div className={`h-full w-full ${t.header}`}>
                <div className={t.pattern} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="pointer-events-none block select-none aspect-[4/3] md:aspect-[16/10]" />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
        <div className="relative z-10 transform transition-transform duration-300 translate-y-0.5 group-hover:translate-y-0">
          <h3 className="text-white text-3xl md:text-4xl font-semibold leading-tight drop-shadow-sm">{name}</h3>
          {summary ? (
            <p className="mt-2 text-white/90 text-base md:text-lg leading-snug line-clamp-2">
              {summary}
            </p>
          ) : null}
        </div>
      </div>
    </button>
  );
}
