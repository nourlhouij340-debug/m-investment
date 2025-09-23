import { NextResponse } from "next/server";

// This endpoint is intentionally disabled because email delivery is not used.
// Keeping a stub avoids build-time dependency on any mail SDKs.

export async function POST() {
  return NextResponse.json({ ok: false, error: "send-brochure disabled" }, { status: 501 });
}

export async function GET() {
  return NextResponse.json({ ok: false }, { status: 404 });
}



