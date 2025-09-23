import { NextResponse } from "next/server";
import { google } from "googleapis";
import fs from "node:fs";
import path from "node:path";

// Ensure Node.js runtime (required for googleapis)
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getEnv(name: string): string | undefined {
  const raw = process.env[name];
  if (!raw || typeof raw !== "string") return undefined;
  let v = raw.trim();
  // Strip surrounding quotes if present
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
    v = v.slice(1, -1).trim();
  }
  return v.length > 0 ? v : undefined;
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

function getLocalCreds(): { email?: string; key?: string; id?: string } {
  try {
    const fp = path.join(process.cwd(), "sheets.local.json");
    if (!fs.existsSync(fp)) return {};
    const raw = fs.readFileSync(fp, "utf8");
    const j = JSON.parse(raw);
    return {
      email: typeof j?.clientEmail === "string" ? j.clientEmail : j?.email,
      key: normalizePrivateKey(typeof j?.privateKey === "string" ? j.privateKey : j?.key),
      id: typeof j?.sheetId === "string" ? j.sheetId : (typeof j?.spreadsheetId === "string" ? j.spreadsheetId : undefined),
    };
  } catch {
    return {};
  }
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

    let clientEmail = getEnv("GOOGLE_CLIENT_EMAIL");
    let privateKey = normalizePrivateKey(getEnv("GOOGLE_PRIVATE_KEY"));
    let spreadsheetId = getEnv("SHEETS_ID") || getEnv("GOOGLE_SHEET_ID") || getEnv("GOOGLE_SHEETS_ID");

    // Dev-only fallback to sheets.local.json if envs are missing
    if (!clientEmail || !privateKey || !spreadsheetId) {
      const local = getLocalCreds();
      clientEmail = clientEmail || local.email;
      privateKey = privateKey || local.key;
      spreadsheetId = spreadsheetId || local.id;
    }

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

    // Ensure target sheet "Leads" exists; if not, create it and set headers
    try {
      const meta = await sheets.spreadsheets.get({
        spreadsheetId,
        fields: "sheets.properties",
      });
      const hasLeads = (meta.data.sheets || []).some(
        s => s?.properties?.title === "Leads"
      );
      if (!hasLeads) {
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId,
          requestBody: {
            requests: [
              {
                addSheet: {
                  properties: { title: "Leads" },
                },
              },
            ],
          },
        });
        // Add header row matching expected column order
        await sheets.spreadsheets.values.update({
          spreadsheetId,
          range: "Leads!A1:E1",
          valueInputOption: "RAW",
          requestBody: {
            values: [[
              "Timestamp",
              "Prénom",
              "Nom",
              "Téléphone",
              "Email",
            ]],
          },
        });
      }
    } catch (e) {
      // If metadata fetch fails, continue; append may still work if range is valid
    }

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

export async function GET() {
  try {
    let clientEmail = getEnv("GOOGLE_CLIENT_EMAIL");
    let privateKey = normalizePrivateKey(getEnv("GOOGLE_PRIVATE_KEY"));
    let spreadsheetId = getEnv("SHEETS_ID") || getEnv("GOOGLE_SHEET_ID") || getEnv("GOOGLE_SHEETS_ID");

    const hadEnvEmail = !!clientEmail;
    const hadEnvKey = !!privateKey;
    const hadEnvId = !!spreadsheetId;

    if (!clientEmail || !privateKey || !spreadsheetId) {
      const local = getLocalCreds();
      clientEmail = clientEmail || local.email;
      privateKey = privateKey || local.key;
      spreadsheetId = spreadsheetId || local.id;
    }

    let meta: any = null;
    let hasLeads = false;
    let sheetTitles: string[] = [];
    if (clientEmail && privateKey && spreadsheetId) {
      try {
        const auth = new google.auth.JWT({
          email: clientEmail,
          key: privateKey,
          scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });
        await auth.authorize();
        const sheets = google.sheets({ version: "v4", auth });
        const resp = await sheets.spreadsheets.get({
          spreadsheetId,
          fields: "sheets.properties.title",
        });
        meta = resp.data;
        sheetTitles = (meta?.sheets || []).map((s: any) => s?.properties?.title).filter(Boolean);
        hasLeads = sheetTitles.includes("Leads");
      } catch (e) {
        // ignore diagnostics failure
      }
    }

    return NextResponse.json({
      ok: true,
      hasClientEmail: !!clientEmail,
      hasPrivateKey: !!privateKey,
      hasSheetId: !!spreadsheetId,
      clientEmailSuffix: clientEmail ? clientEmail.slice(-22) : null,
      spreadsheetIdHint: spreadsheetId ? `${spreadsheetId.slice(0,4)}…${spreadsheetId.slice(-4)}` : null,
      hasLeads,
      sheetTitles,
      source: {
        fromEnv: { email: hadEnvEmail, key: hadEnvKey, id: hadEnvId },
        usedLocalFallback: !hadEnvEmail || !hadEnvKey || !hadEnvId,
      },
    }, { headers: { "Cache-Control": "no-store" } });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}


