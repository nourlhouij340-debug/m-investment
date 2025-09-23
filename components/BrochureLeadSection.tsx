"use client";

import { useMemo, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function BrochureLeadSection() {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const emailRegex = useMemo(() => /^\S+@\S+\.\S+$/, []);
  const phoneRegex = useMemo(
    () => /^(?:\+?212|0)?[5-8]\d{8}$|^\+?[0-9\s\-().]{8,}$/,
    []
  );

  const prenomOk = prenom.trim().length >= 2;
  const nomOk = nom.trim().length >= 2;
  const emailOk = emailRegex.test(email.trim());
  const telOk = phoneRegex.test(tel.trim());
  const canSubmit = prenomOk && nomOk && emailOk && telOk && consent;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");

    // Honeypot: silently succeed without writing
    if (website && website.trim().length > 0) {
      setStatus("success");
      return;
    }

    if (!canSubmit) return;

    try {
      setStatus("loading");
      const res = await fetch("/api/sheets-append", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prenom: prenom.trim(), nom: nom.trim(), tel: tel.trim(), email: email.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Erreur inconnue");
      }
      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(String(err?.message || err || "Une erreur est survenue."));
    }
  }

  return (
    <section className="section brochure-section" aria-labelledby="brochure-title">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center brochure-head">
          <div className="eyebrow brochure-eyebrow">TÉLÉCHARGEZ NOTRE BROCHURE DÉTAILLÉE</div>
          <h2 id="brochure-title" className="mb-2">Téléchargez le guide : 5 erreurs à éviter lors d’un achat immobilier au Maroc</h2>
          <p className="prose max-w-3xl mx-auto">Remplissez ce formulaire pour obtenir notre PDF informatif.</p>
        </div>

        {status !== "success" ? (
          <form onSubmit={handleSubmit} className="contact-form contact-form--wide brochure-form mx-auto mt-6" aria-live="polite">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="prenom" className="block text-sm font-medium">Prénom</label>
                <input id="prenom" name="prenom" required minLength={2} value={prenom} onChange={(e) => setPrenom(e.target.value)} className="mt-1 w-full rounded-lg border border-black/10 p-2 bg-white" />
              </div>
              <div>
                <label htmlFor="nom" className="block text-sm font-medium">Nom</label>
                <input id="nom" name="nom" required minLength={2} value={nom} onChange={(e) => setNom(e.target.value)} className="mt-1 w-full rounded-lg border border-black/10 p-2 bg-white" />
              </div>
              <div>
                <label htmlFor="tel" className="block text-sm font-medium">Téléphone</label>
                <input id="tel" name="tel" required inputMode="tel" value={tel} onChange={(e) => setTel(e.target.value)} className="mt-1 w-full rounded-lg border border-black/10 p-2 bg-white" />
                {!telOk && tel.length > 0 ? (
                  <p className="text-red-600 text-sm mt-1" role="alert">Veuillez saisir un téléphone valide.</p>
                ) : null}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium">Email</label>
                <input id="email" name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-lg border border-black/10 p-2 bg-white" />
                {!emailOk && email.length > 0 ? (
                  <p className="text-red-600 text-sm mt-1" role="alert">Veuillez saisir un email valide.</p>
                ) : null}
              </div>
            </div>

            {/* Honeypot */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website" className="sr-only">Website</label>
              <input id="website" name="website" autoComplete="off" tabIndex={-1} value={website} onChange={(e) => setWebsite(e.target.value)} className="mt-1 w-full rounded-lg border border-black/10 p-2 bg-white" />
            </div>

            <div className="mt-4 flex items-center gap-2 consent-row">
              <input id="consent" name="consent" type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="consent-box" />
              <label htmlFor="consent" className="text-sm leading-snug text-[color:var(--gray700)]">
                J’accepte que mes données soient utilisées pour me recontacter, conformément à la <a href="/politique-de-confidentialite" className="underline-link">Politique de confidentialité</a>.
              </label>
            </div>

            <div className="contact-actions">
              <button type="submit" className="btn btn--primary brochure-btn" disabled={!canSubmit || status === "loading"} onMouseMove={(e) => {
                const rect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
                const mx = e.clientX - rect.left; const my = e.clientY - rect.top;
                (e.currentTarget as HTMLButtonElement).style.setProperty("--mx", `${mx}px`);
                (e.currentTarget as HTMLButtonElement).style.setProperty("--my", `${my}px`);
              }}>
                {status === "loading" ? "Envoi…" : "Obtenir le guide"}
              </button>
            </div>
            <p className="text-center text-sm text-[color:var(--gray700)] mt-2">Réponse en moins de 24h.</p>

            {status === "error" && (
              <div className="text-center mt-2">
                <span className="text-red-700 text-sm" role="alert">Une erreur est survenue. {errorMsg}</span>
              </div>
            )}
          </form>
        ) : (
          <div className="contact-form contact-form--wide mx-auto mt-6 text-center" aria-live="polite">
            <h3 className="mb-1">Merci, votre demande a bien été enregistrée.</h3>
            <p className="text-[color:var(--gray700)] mb-3">Vous pouvez télécharger le guide maintenant.</p>
            <a href="/brochures/guide-5-erreurs-achat-maroc.pdf" download className="btn btn--primary">Télécharger le PDF</a>
          </div>
        )}
      </div>
    </section>
  );
}


