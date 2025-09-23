import { NextRequest } from 'next/server';

// No-op endpoint: we are not sending emails. Always return 200 so the client can proceed.
export async function POST(req: NextRequest) {
  try {
    // Accept and parse body for forward-compatibility, but do nothing with it
    await req.json().catch(() => ({}));
    return new Response(
      JSON.stringify({ ok: true, emailed: false }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (_err) {
    return new Response(
      JSON.stringify({ ok: true, emailed: false }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

