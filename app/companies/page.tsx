'use client';
export const dynamic = "force-dynamic";
import { Suspense, useMemo, useState, useEffect } from "react";
import { companies, sectors } from "@/lib/companies";
import FilterChips from "@/components/FilterChips";
import CompaniesGridA16z from "@/components/companies/CompaniesGridA16z";
import CompanyModalA16z from "@/components/companies/CompanyModalA16z";
import { useRouter, useSearchParams } from "next/navigation";

export default function CompaniesPage() {
  return (
    <Suspense fallback={<main className="container-6xl py-10"><h1 className="text-3xl font-semibold">Companies</h1></main>}>
      <CompaniesPageInner />
    </Suspense>
  );
}

function CompaniesPageInner() {
  // JBV: COMPANIES DATA WIRE-UP START
  // Fetch Airtable-backed companies and shadow the existing data without changing layout.
  const REFRESH_SECONDS = 21600; // 6h
  const [remote, setRemote] = useState<any[] | null>(null);
  useEffect(() => {
    let cancelled = false;

    async function loadAll() {
      try {
        let all: any[] = [];
        let offset: string | undefined = undefined;
        do {
          const url = `/api/companies${offset ? `?offset=${encodeURIComponent(offset)}` : ''}`;
          const res = await fetch(url, { cache: 'no-store' });
          if (!res.ok) break;
          const data = await res.json();
          const items = (data.items as any[]).map((r) => {
            const f = r.fields || {};
            return {
              name: f.Name || f.Company || f.Title || r.id,
              sector: f.Sector || f.Category || 'N/A',
              stage: f.Stage || f.Status || 'N/A',
              url: f.Website || f.URL || f.Link || undefined,
              featured: !!f.Featured,
              logo: r.logoUrl || (Array.isArray(f.Logo) && f.Logo[0]?.url) || undefined,
              // Preserve raw as well if needed later
              _raw: r,
            };
          });
          all = all.concat(items);
          offset = data.nextOffset as string | undefined;
        } while (offset && !cancelled);
        if (!cancelled) setRemote(all);
      } catch {
        // Silent fallback to existing static data
      }
    }

    loadAll();

    const t = setTimeout(loadAll, REFRESH_SECONDS * 1000);
    return () => { cancelled = true; clearTimeout(t); };
  }, []);

  // Shadow the imported companies with remote data if available
  const dataCompanies = Array.isArray(remote) && remote.length > 0 ? remote : companies;
  // JBV: COMPANIES DATA WIRE-UP END
  const [sector, setSector] = useState<string>("All");
  const chipOptions = useMemo(
    () => sectors.filter((s) => !["Biotech", "Consumer", "Crypto", "Healthcare", "Insurance"].includes(String(s))),
    []
  );
  const filtered = useMemo(() => {
    return sector === "All" ? dataCompanies : dataCompanies.filter(c => c.sector === sector);
  }, [sector, dataCompanies]);
  // const featured = dataCompanies.filter(c => c.featured);

  // JBV: A16Z LAYOUT START
  const router = useRouter();
  const searchParams = useSearchParams();
  const [openId, setOpenId] = useState<string | null>(null);

  const items = useMemo(() => {
    // Convert current filtered list into Airtable-like records for the new grid
    return filtered.map((c: any) => {
      if (c._raw && c._raw.id && c._raw.fields) return c._raw;
      return {
        id: c.name,
        fields: {
          Name: c.name,
          Category: c.sector,
          Status: c.stage,
          Website: c.url,
          Description: c.note,
        },
        logoUrl: c.logo,
      } as { id: string; fields: Record<string, any>; logoUrl?: string };
    });
  }, [filtered]);

  const selected = useMemo(() => items.find(r => r.id === openId) ?? null, [items, openId]);

  useEffect(() => {
    const q = searchParams?.get("company");
    if (q && items.some(r => r.id === q)) setOpenId(q);
  }, [searchParams, items]);

  function handleOpen(id: string) {
    setOpenId(id);
    router.replace(`/companies?company=${encodeURIComponent(id)}`, { scroll: false });
  }
  function handleClose() {
    router.replace(`/companies`, { scroll: false });
    setOpenId(null);
  }

  return (
    <main className="container-6xl py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">Companies</h1>
        <p className="prose-muted mt-2">Browse portfolio companies by sector and stage.</p>
      </div>


      <section className="mb-6">
        <FilterChips options={chipOptions as any} value={sector} onChange={setSector} />
      </section>

      <CompaniesGridA16z items={items} onOpen={handleOpen} />
      <CompanyModalA16z record={selected} onClose={handleClose} />
    </main>
  );
  // JBV: A16Z LAYOUT END
}
