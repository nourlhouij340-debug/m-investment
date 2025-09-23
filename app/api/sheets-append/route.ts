import { NextResponse } from "next/server";
import { google } from "googleapis";

function getEnv(name: string): string | undefined {
  const v = process.env[name];
  if (v && typeof v === "string" && v.trim().length > 0) return v;
  return undefined;
}

function normalizePrivateKey(raw?: string): string | undefined {
  if (!raw) return undefined;
  let key = raw.trim();
  // Handle base64-encoded key
  if (!key.includes("BEGIN PRIVATE KEY") && /^[A-Za-z0-9+/=\r\n]+$/.test(key)) {
    try {
      key = Buffer.from(key, "base64").toString("utf8");
    } catch {}
  }
  // Replace escaped newlines and normalize CRLF
  key = key.replace(/\\n/g, "\n").replace(/\r\n/g, "\n");
  return key.includes("BEGIN PRIVATE KEY") ? key : undefined;
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const prenom = String(body?.prenom || "").trim();
    const nom = String(body?.nom || "").trim();
    const tel = String(body?.tel || "").trim();
    const email = String(body?.email || "").trim();

    if (!prenom || !nom || !tel || !email) {
      return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
    }

    // Basic server-side validation
    const emailOk = /\S+@\S+\.\S+/.test(email);
    const telOk = /^(?:\+?212|0)?[5-8]\d{8}$|^\+?[0-9\s\-().]{8,}$/.test(tel);
    if (!emailOk || !telOk) {
      return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 400 });
    }

    const clientEmail = getEnv("GOOGLE_CLIENT_EMAIL");
    const privateKey = normalizePrivateKey(getEnv("GOOGLE_PRIVATE_KEY"));
    const spreadsheetId = getEnv("SHEETS_ID") || getEnv("GOOGLE_SHEET_ID") || getEnv("GOOGLE_SHEETS_ID");

    if (!clientEmail) {
      return NextResponse.json({ ok: false, error: "missing GOOGLE_CLIENT_EMAIL" }, { status: 500 });
    }
    if (!privateKey) {
      return NextResponse.json({ ok: false, error: "missing or invalid GOOGLE_PRIVATE_KEY" }, { status: 500 });
    }
    if (!spreadsheetId) {
      return NextResponse.json({ ok: false, error: "missing SHEETS_ID/GOOGLE_SHEET_ID" }, { status: 500 });
    }

    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    await auth.authorize();
    const sheets = google.sheets({ version: "v4", auth });

    const row = [new Date().toISOString(), prenom, nom, tel, email];
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Leads!A:E",
      valueInputOption: "RAW",
      requestBody: { values: [row] },
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: String(err?.message || err) }, { status: 500 });
  }
}


