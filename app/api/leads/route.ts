import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    // If honeypot accidentally passed through, strip it server-side too
    if (payload && typeof payload.website === 'string' && payload.website.trim().length > 0) {
      return new Response(JSON.stringify({ ok: true, skipped: true }), { status: 200 });
    }

    const base = process.env.NEXT_PUBLIC_GAS_WEBHOOK_URL;
    const key = process.env.NEXT_PUBLIC_GAS_SECRET;
    if (!base || !key) {
      // Accept but skip external forwarding if not configured yet
      return new Response(JSON.stringify({ ok: true, configured: false }), { status: 200 });
    }

    const res = await fetch(`${base}?key=${key}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      // Prevent this from failing the edge due to long timeouts
      cache: 'no-store',
    });

    let ok = res.ok;
    try {
      const data = await res.json();
      if (typeof data?.ok === 'boolean') ok = ok && data.ok;
    } catch {
      // ignore JSON errors
    }

    return new Response(JSON.stringify({ ok }), { status: ok ? 200 : 500 });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false }), { status: 500 });
  }
}



