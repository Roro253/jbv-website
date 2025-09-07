import { NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { ironOptions, type SessionData } from '@/lib/session';

export async function POST(req: Request) {
  const res = NextResponse.redirect(new URL('/login', req.url));
  const session = await getIronSession<SessionData>(cookies(), ironOptions);
  await session.destroy();
  return res;
}
export const runtime = 'edge';
export const dynamic = 'force-dynamic';
