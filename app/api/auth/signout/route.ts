import { NextResponse } from 'next/server';
import { getIronSession } from 'iron-session/edge';
import { ironOptions, type SessionData } from '@/lib/session';

export async function POST(req: Request) {
  const res = NextResponse.redirect(new URL('/login', req.url));
  const session = await getIronSession<SessionData>(req, res, ironOptions);
  await session.destroy();
  return res;
}

