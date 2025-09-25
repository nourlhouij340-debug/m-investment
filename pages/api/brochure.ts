import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

type Body = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { firstName, lastName, email, phone } = req.body as Body;
  if (!firstName || !lastName || !email || !phone) return res.status(400).json({ error: "Missing" });

  try {
    const auth = new google.auth.JWT(
      process.env.GOOGLE_CLIENT_EMAIL,
      undefined,
      (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
      ["https://www.googleapis.com/auth/spreadsheets"]
    );
    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID as string;
    const values = [[new Date().toISOString(), firstName, lastName, email, phone]];
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Leads!A1",
      valueInputOption: "RAW",
      requestBody: { values }
    });
    res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "sheet" });
  }
}


