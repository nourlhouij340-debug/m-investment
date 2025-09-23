import { NextRequest } from 'next/server';
import { google } from 'googleapis';

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    // Honeypot: if filled, accept but skip writing
    if (payload && typeof payload.website === 'string' && payload.website.trim().length > 0) {
      return new Response(JSON.stringify({ ok: true, skipped: true }), { status: 200 });
    }

    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKeyRaw = process.env.GOOGLE_PRIVATE_KEY;
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const tabName = process.env.GOOGLE_SHEET_TAB || 'Leads';

    if (!clientEmail || !privateKeyRaw || !spreadsheetId) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Sheets credentials not configured' }),
        { status: 500 }
      );
    }

    // Handle escaped newlines from env
    const privateKey = privateKeyRaw.replace(/\\n/g, '\n');

    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const prenom = String(payload?.prenom || '').trim();
    const nom = String(payload?.nom || '').trim();
    const email = String(payload?.email || '').trim();
    const telephone = String(payload?.telephone || payload?.tel || '').trim();
    const timestamp = new Date().toISOString();

    // Append only the requested columns: Timestamp, Prénom, Nom, Email, Téléphone
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${tabName}!A:E`,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [[timestamp, prenom, nom, email, telephone]],
      },
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e) {
    console.error('Error writing to Google Sheets:', e);
    return new Response(JSON.stringify({ ok: false }), { status: 500 });
  }
}

