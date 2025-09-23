'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
// MA + international fallback
const PHONE_REGEX = /^(?:\+?212|0)?[5-8]\d{8}$|^\+?[0-9\s\-().]{8,}$/;

export default function BrochureLeadSection() {
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(''); // honeypot
  const [state, setState] = useState<SubmitState>('idle');
  const [error, setError] = useState('');

  const pathname = usePathname();
  const search = useSearchParams();

  const utm_source = search.get('utm_source') || '';
  const utm_medium = search.get('utm_medium') || '';
  const utm_campaign = search.get('utm_campaign') || '';

  const source_page = pathname || '';

  const userAgent = useMemo(() => {
    if (typeof navigator === 'undefined') return '';
    return navigator.userAgent || '';
  }, []);

  const isEmailValid = EMAIL_REGEX.test(email.trim());
  const isPhoneValid = PHONE_REGEX.test(phone.trim());
  const isFormValid = prenom.trim() !== '' && nom.trim() !== '' && isPhoneValid && isEmailValid && consent;

  useEffect(() => {
    if (state !== 'error') setError('');
  }, [state]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === 'submitting') return;

    // Honeypot: treat as success but do not send
    if (website && website.trim().length > 0) {
      setState('success');
      return;
    }

    if (!isFormValid) return;
    setState('submitting');
    setError('');

    try {
      const url = `/api/leads`;
      const body = {
        prenom: prenom.trim(),
        nom: nom.trim(),
        phone: phone.trim(),
        email: email.trim(),
        consent,
        source_page,
        utm_source,
        utm_medium,
        utm_campaign,
        user_agent: userAgent,
        timestamp: new Date().toISOString(),
        website,
      };

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      let ok = res.ok;
      try {
        const data = await res.json();
        if (typeof data?.ok === 'boolean') ok = ok && data.ok;
      } catch {
        // ignore JSON parse errors; rely on HTTP status
      }

      if (ok) {
        setState('success');
        // Fire and forget email
        try {
          fetch('/api/send-brochure', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email.trim(), prenom: prenom.trim(), nom: nom.trim() }),
          }).catch(() => {});
        } catch {
          // non-blocking
        }
      } else {
        setState('error');
        setError("Une erreur est survenue. Merci de réessayer dans un instant.");
      }
    } catch (err) {
      setState('error');
      setError("Impossible d'envoyer votre demande pour le moment. Veuillez réessayer.");
    }
  }

  return (
    <section id="brochure" className="section">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center why-head">
          <div className="eyebrow">Téléchargez notre brochure détaillée</div>
          <h2 className="mb-2">Recevez notre brochure complète</h2>
          <p className="section-lead">Remplissez le formulaire pour recevoir notre brochure complète : process d’accompagnement, options de financement, cadre juridique et prestations post-achat.</p>
        </div>

        {state === 'success' ? (
          <div className="mt-8 rounded-[var(--radius-lg)] bg-white/60 shadow-[0_8px_30px_rgba(0,0,0,.06)] p-6 md:p-8 text-center" aria-live="polite">
            <h3 className="text-xl md:text-2xl mb-2">Merci, votre demande a bien été enregistrée.</h3>
            <p className="text-[color:var(--gray700)] mb-6">Vous pouvez télécharger la brochure maintenant ou la retrouver dans l’email que nous venons de vous envoyer.</p>
            <a href="/brochures/Brochure.docx" download className="btn btn--primary inline-block">Télécharger la brochure</a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 grid gap-4 md:grid-cols-2 bg-white/60 rounded-[var(--radius-lg)] p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,.06)]" noValidate>
            {/* Honeypot */}
            <input type="text" name="website" value={website} onChange={(e) => setWebsite(e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

            <div>
              <label htmlFor="prenom" className="block mb-1 text-sm">Prénom</label>
              <input id="prenom" name="prenom" required value={prenom} onChange={(e) => setPrenom(e.target.value)} className="w-full rounded-[var(--radius-lg)] border border-[color:var(--gray300)] bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-[color:var(--accent)]" />
            </div>
            <div>
              <label htmlFor="nom" className="block mb-1 text-sm">Nom</label>
              <input id="nom" name="nom" required value={nom} onChange={(e) => setNom(e.target.value)} className="w-full rounded-[var(--radius-lg)] border border-[color:var(--gray300)] bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-[color:var(--accent)]" />
            </div>
            <div>
              <label htmlFor="phone" className="block mb-1 text-sm">Téléphone</label>
              <input id="phone" name="phone" required value={phone} onChange={(e) => setPhone(e.target.value)} className={`w-full rounded-[var(--radius-lg)] border px-3 py-2 outline-none focus:ring-2 focus:ring-[color:var(--accent)] ${phone && !isPhoneValid ? 'border-red-400' : 'border-[color:var(--gray300)] bg-white'}`} />
              {phone && !isPhoneValid && <p className="mt-1 text-xs text-red-600">Numéro invalide.</p>}
            </div>
            <div>
              <label htmlFor="email" className="block mb-1 text-sm">Email</label>
              <input id="email" name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={`w-full rounded-[var(--radius-lg)] border px-3 py-2 outline-none focus:ring-2 focus:ring-[color:var(--accent)] ${email && !isEmailValid ? 'border-red-400' : 'border-[color:var(--gray300)] bg-white'}`} />
              {email && !isEmailValid && <p className="mt-1 text-xs text-red-600">Email invalide.</p>}
            </div>

            {/* Consent (full width) */}
            <div className="md:col-span-2 mt-1 flex items-start gap-2">
              <input id="consent" name="consent" type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 h-4 w-4 rounded border-[color:var(--gray400)]" />
              <label htmlFor="consent" className="text-sm">
                J’accepte que mes données soient utilisées pour me recontacter, conformément à la <a href="/politique-de-confidentialite" className="underline-link">Politique de confidentialité</a>.
              </label>
            </div>

            {/* Hidden meta fields (read-only) */}
            <input type="hidden" name="source_page" value={source_page} readOnly />
            <input type="hidden" name="utm_source" value={utm_source} readOnly />
            <input type="hidden" name="utm_medium" value={utm_medium} readOnly />
            <input type="hidden" name="utm_campaign" value={utm_campaign} readOnly />

            <div className="md:col-span-2 flex flex-col items-center">
              <button type="submit" disabled={!isFormValid || state === 'submitting'} className={`btn btn--primary min-w-[220px] ${(!isFormValid || state === 'submitting') ? 'opacity-60 cursor-not-allowed' : ''}`}>
                {state === 'submitting' ? 'Envoi…' : 'Recevoir la brochure'}
              </button>
              <p className="text-xs text-[color:var(--gray700)] mt-2">Réponse en moins de 24h.</p>
              {state === 'error' && (
                <p className="mt-3 text-sm text-red-600" role="alert" aria-live="assertive">{error}</p>
              )}
            </div>
          </form>
        )}
      </div>
    </section>
  );
}


