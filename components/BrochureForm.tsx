"use client";

import { useMemo, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function BrochureForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [consent, setConsent] = useState(false);

  async function onSubmit(formData: FormData) {
    const firstName = String(formData.get("firstName") || "").trim();
    const lastName = String(formData.get("lastName") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();

    if (!firstName || !lastName || !email || !phone || !consent) return;
    if (!/^\S+@\S+\.\S+$/.test(email)) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/brochure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, phone })
      });
      if (!res.ok) throw new Error("bad");
      setStatus("success");
    } catch (e) {
      setStatus("error");
    }
  }

  const isDisabled = useMemo(() => status === "loading", [status]);

  const triggerDownload = () => {
    const a = document.createElement("a");
    a.href = "/assets/Brochure.docx";
    a.download = "Brochure_M-Investment.docx";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <section id="brochure" className="section brochure-section">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-6">
          <div className="eyebrow">Téléchargez notre brochure 5 pièges à éviter</div>
          <h2>Recevez notre brochure complète</h2>
          <p className="prose max-w-3xl mx-auto">Remplissez le formulaire pour recevoir notre brochure : 5 pièges à éviter lors d'un achat d'un bien immobilier au Maroc. </p>
        </div>
        {status !== "success" ? (
          <div className="brochure-panel">
            <form action={onSubmit} className="grid gap-4" autoComplete="on">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium">Prénom</label>
                  <input id="firstName" name="firstName" required className="mt-1 w-full rounded-lg border border-black/15 p-2 bg-white" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium">Nom</label>
                  <input id="lastName" name="lastName" required className="mt-1 w-full rounded-lg border border-black/15 p-2 bg-white" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium">Téléphone</label>
                  <input id="phone" name="phone" required className="mt-1 w-full rounded-lg border border-black/15 p-2 bg-white" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium">Email</label>
                  <input id="email" name="email" type="email" required className="mt-1 w-full rounded-lg border border-black/15 p-2 bg-white" />
                </div>
              </div>
              <label className="flex items-start gap-2 text-sm"><input type="checkbox" className="mt-1" checked={consent} onChange={(e)=>setConsent(e.target.checked)} /> J’accepte que mes données soient utilisées pour me recontacter, conformément à la Politique de confidentialité.</label>
              <div className="text-center">
                <button disabled={isDisabled || !consent} className="btn-primary brochure-btn" type="submit">Recevoir la brochure</button>
                <p className="text-xs mt-2 opacity-80">Réponse en moins de 24h.</p>
                {status === "error" && <p className="text-xs mt-1 text-red-600">Une erreur est survenue. Réessayez.</p>}
              </div>
            </form>
          </div>
        ) : (
          <div className="brochure-panel text-center">
            <h3 className="mb-2">Merci, votre demande a bien été enregistrée.</h3>
            <p className="prose mx-auto mb-4">Vous pouvez télécharger le guide maintenant.</p>
            <button onClick={triggerDownload} className="btn-primary brochure-btn">Télécharger le guide</button>
          </div>
        )}
      </div>
    </section>
  );
}


