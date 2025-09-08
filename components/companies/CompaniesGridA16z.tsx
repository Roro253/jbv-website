"use client";
import CompanyCardA16z from "@/components/companies/CompanyCardA16z";
import OpenAICover from "@/components/companyCovers/OpenAICover";
import AnthropicCover from "@/components/companyCovers/AnthropicCover";
import PerplexityCover from "@/components/companyCovers/PerplexityCover";
import DatabricksCover from "@/components/companyCovers/DatabricksCover";
import LovableCover from "@/components/companyCovers/LovableCover";
import DefaultCover from "@/components/companyCovers/DefaultCover";
import { getField } from "@/components/companies/utils";

type RecordType = { id: string; fields: Record<string, any>; logoUrl?: string };

function coverFor(record: RecordType) {
  const fields = record.fields || {};
  const name = (getField<string>(fields, "Name", "Company", "Title") || record.id).toString().toLowerCase();
  const slug = (getField<string>(fields, "Slug") || name).toString().toLowerCase();
  const key = `${slug} ${name}`;
  if (key.includes("openai")) return <OpenAICover />;
  if (key.includes("anthropic")) return <AnthropicCover />;
  if (key.includes("perplex")) return <PerplexityCover />;
  if (key.includes("databrick")) return <DatabricksCover />;
  if (key.includes("lovable")) return <LovableCover />;
  return <DefaultCover />;
}

export default function CompaniesGridA16z({ items, onOpen }: { items: RecordType[]; onOpen: (id: string) => void }) {
  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" aria-label="Companies">
      {items.map((r) => (
        <CompanyCardA16z key={r.id} record={r} onOpen={onOpen} cover={coverFor(r)} />
      ))}
    </div>
  );
}
