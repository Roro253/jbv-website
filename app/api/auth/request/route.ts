import { NextResponse } from 'next/server';
import { z } from 'zod';
import { isAllowedEmail, createMagicRecord, countRecentRequests } from '@/lib/airtable';
import { createOneTimeToken } from '@/lib/tokens';
import { sendMagicLink } from '@/lib/mailer';

const bodySchema = z.object({ email: z.string().email() });

export async function POST(req: Request) {
  try {
    const json = await req.json().catch(() => ({}));
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      // Still return 200 to prevent enumeration
      return NextResponse.json({ ok: true, message: 'If your email is allowed, we sent a link.' });
    }
    const email = parsed.data.email.trim().toLowerCase();

    // Basic rate-limit: 5 requests per hour per email
    try {
      const recent = await countRecentRequests(email, 60);
      if (recent > 5) {
        return NextResponse.json({ ok: true, message: 'If your email is allowed, we sent a link.' });
      }
    } catch {}

    let allowed = false;
    try { allowed = await isAllowedEmail(email); } catch {}
    if (!allowed) {
      return NextResponse.json({ ok: true, message: 'If your email is allowed, we sent a link.' });
    }

    const { token, tokenHash, jti, expiresAt } = createOneTimeToken(15);
    const ip = req.headers.get('x-forwarded-for') || '';
    const ua = req.headers.get('user-agent') || '';
    try {
      await createMagicRecord({ email, tokenHash, jti, expiresAt: expiresAt.toISOString(), ip, ua });
    } catch (e) {
      // Avoid leaking details
      return NextResponse.json({ ok: true, message: 'If your email is allowed, we sent a link.' });
    }

    const appUrl = process.env.APP_URL || 'http://localhost:3000';
    const url = `${appUrl}/api/auth/callback?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}`;
    try { await sendMagicLink(email, url); } catch {}

    return NextResponse.json({ ok: true, message: 'If your email is allowed, we sent a link.' });
  } catch {
    return NextResponse.json({ ok: true, message: 'If your email is allowed, we sent a link.' });
  }
}

