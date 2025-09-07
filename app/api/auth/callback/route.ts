import { NextResponse } from 'next/server';
import { sha256base64url } from '@/lib/tokens';
import { getValidMagicRecord, markMagicUsed } from '@/lib/airtable';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { ironOptions, type SessionData } from '@/lib/session';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token') || '';
  const email = (searchParams.get('email') || '').trim().toLowerCase();
  const next = searchParams.get('next') || '/';

  const redirectToLogin = NextResponse.redirect(new URL(`/login?error=invalid`, req.url));
  if (!token || !email) return redirectToLogin;

  const tokenHash = sha256base64url(token);
  const rec = await getValidMagicRecord(email, tokenHash);
  if (!rec) return redirectToLogin;

  await markMagicUsed(rec.id);

  const res = NextResponse.redirect(new URL(next, req.url));
  const session = await getIronSession<SessionData>(cookies(), ironOptions);
  session.email = email;
  await session.save();
  return res;
}
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
