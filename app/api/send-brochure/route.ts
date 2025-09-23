import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, prenom, nom } = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ ok: false, error: 'email_required' }), { status: 400 });
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const FROM = process.env.EMAIL_FROM || 'no-reply@m-investment.fr';
    const SUBJECT = process.env.EMAIL_SUBJECT || 'Votre brochure M-Investment';
    const HOST = process.env.WEBSITE_HOST || 'https://www.m-investment.fr';
    const brochureUrl = `${HOST}/brochures/Brochure.docx`;

    if (!RESEND_API_KEY) {
      return new Response(JSON.stringify({ ok: true, skipped: true }), { status: 200 });
    }

    // Lazy import to avoid bundling when not configured
    const { Resend } = await import('resend');
    const resend = new Resend(RESEND_API_KEY);
    const html = `
      <p>Bonjour ${prenom || ''} ${nom || ''},</p>
      <p>Merci pour votre intérêt. Vous pouvez télécharger notre brochure via le lien ci‑dessous :</p>
      <p><a href="${brochureUrl}">Télécharger la brochure M‑Investment</a></p>
      <p>Cordialement,<br/>L'équipe M‑Investment</p>
    `;

    await resend.emails.send({
      from: FROM,
      to: email,
      subject: SUBJECT,
      html,
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ ok: true, fallback: true }), { status: 200 });
  }
}


