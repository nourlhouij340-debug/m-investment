import { NextResponse } from "next/server";
import { google } from "googleapis";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { firstName, lastName, email, phone } = await req.json();
  if (!firstName || !lastName || !email || !phone) {
    return NextResponse.json({ error: "Missing" }, { status: 400 });
  }

  try {
    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID as string;
    const values = [[new Date().toISOString(), firstName, lastName, email, phone]];
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Leads!A1",
      valueInputOption: "RAW",
      requestBody: { values },
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "sheet" }, { status: 500 });
  }
}


