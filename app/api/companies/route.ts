import { NextResponse } from 'next/server';
import { simpleCache } from '@/lib/simpleCache';

const REFRESH_SECONDS = 21600; // 6 hours
const TTL_MS = REFRESH_SECONDS * 1000;

const BASE_ID = process.env.AIRTABLE_BASE_ID || process.env.AIRTABLE_BASE_ID || 'appAswQzYFHzmwqGH';
const TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || 'Companies';
const VIEW_NAME = process.env.AIRTABLE_VIEW_NAME || 'JBView (Live)';
const API_KEY = process.env.AIRTABLE_API_KEY || process.env.AIRTABLE_API_TOKEN || process.env.AIRTABLE_PAT;

type AirtableRecord = { id: string; fields: Record<string, any> };

async function fetchAirtable(url: string, tries = 3): Promise<any> {
  for (let attempt = 0; attempt < tries; attempt++) {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
      cache: 'no-store',
    });

    if (res.status === 429 && attempt < tries - 1) {
      const backoff = 500 * Math.pow(2, attempt); // 500ms, 1000ms, 2000ms
      await new Promise((r) => setTimeout(r, backoff));
      continue;
    }

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`Airtable request failed: ${res.status} ${text}`);
    }
    return res.json();
  }
}

export async function GET(req: Request) {
  if (!API_KEY) {
    return NextResponse.json(
      { error: 'Missing AIRTABLE_API_KEY' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }

  const { searchParams } = new URL(req.url);
  const offset = searchParams.get('offset') || '';

  const apiUrl = `https://api.airtable.com/v0/${encodeURIComponent(BASE_ID)}/${encodeURIComponent(
    TABLE_NAME
  )}?view=${encodeURIComponent(VIEW_NAME)}&pageSize=50${offset ? `&offset=${encodeURIComponent(offset)}` : ''}`;

  const cacheKey = apiUrl;
  const cached = simpleCache.get<any>(cacheKey);
  if (cached) {
    return NextResponse.json(cached, { headers: { 'Cache-Control': 'no-store' } });
  }

  try {
    const data = await fetchAirtable(apiUrl);
    const items = (data.records as AirtableRecord[]).map((rec) => {
      let logoUrl: string | undefined;
      const logoKeys = ['Logo', 'Company Logo', 'logo', 'Image', 'Logo URL'];
      for (const key of logoKeys) {
        const val = (rec.fields as any)[key];
        if (Array.isArray(val) && val.length && val[0]?.url) {
          logoUrl = val[0].url as string;
          break;
        }
        if (typeof val === 'string' && val.trim().length > 0) {
          logoUrl = val.trim();
          break;
        }
      }
      return { id: rec.id, fields: rec.fields, logoUrl };
    });

    const payload = {
      items,
      nextOffset: data.offset as string | undefined,
      fetchedAt: new Date().toISOString(),
    };

    simpleCache.set(cacheKey, payload, TTL_MS);
    return NextResponse.json(payload, { headers: { 'Cache-Control': 'no-store' } });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || 'Airtable fetch failed' },
      { status: 500, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
