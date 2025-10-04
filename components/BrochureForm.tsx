"use client";

import { useMemo, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function BrochureForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [consent, setConsent] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [touched, setTouched] = useState({ firstName: false, lastName: false, email: false, phone: false, consent: false });

  async function onSubmit(formData: FormData) {
    const trimmed = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim()
    };

    const errors: Record<string, string> = {};
    if (!trimmed.firstName) errors.firstName = "Veuillez renseigner votre prénom.";
    if (!trimmed.lastName) errors.lastName = "Veuillez renseigner votre nom.";
    if (!trimmed.email) errors.email = "Veuillez renseigner votre email.";
    if (trimmed.email && !/^\S+@\S+\.\S+$/.test(trimmed.email)) errors.email = "Veuillez renseigner un email valide.";
    if (!trimmed.phone) errors.phone = "Veuillez renseigner votre téléphone.";
    if (!consent) errors.consent = "Veuillez accepter la politique de confidentialité.";

    setTouched({ firstName: true, lastName: true, email: true, phone: true, consent: true });
    if (Object.keys(errors).length > 0) {
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/brochure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName: trimmed.firstName, lastName: trimmed.lastName, email: trimmed.email, phone: trimmed.phone })
      });
      if (!res.ok) throw new Error("bad");
      setStatus("success");
    } catch (e) {
      setStatus("error");
    }
  }

  const fieldErrors = useMemo(() => {
    const e: Record<string, string> = {};
    if (!firstName.trim()) e.firstName = "Veuillez renseigner votre prénom.";
    if (!lastName.trim()) e.lastName = "Veuillez renseigner votre nom.";
    if (!email.trim()) e.email = "Veuillez renseigner votre email.";
    if (email.trim() && !/^\S+@\S+\.\S+$/.test(email.trim())) e.email = "Veuillez renseigner un email valide.";
    if (!phone.trim()) e.phone = "Veuillez renseigner votre téléphone.";
    if (!consent) e.consent = "Veuillez accepter la politique de confidentialité.";
    return e;
  }, [firstName, lastName, email, phone, consent]);

  const canSubmit = useMemo(() => Object.keys(fieldErrors).length === 0, [fieldErrors]);
  const isDisabled = useMemo(() => status === "loading" || !canSubmit, [status, canSubmit]);

  const triggerDownload = () => {
    const a = document.createElement("a");
    a.href = "/assets/icons/Brochure-Haven.pdf";
    a.download = "Brochure-Haven.pdf";
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
                  <input id="firstName" name="firstName" required value={firstName} onChange={(e)=>setFirstName(e.target.value)} onBlur={()=>setTouched(v=>({ ...v, firstName: true }))} className="mt-1 w-full rounded-lg border border-black/15 p-2 bg-white" />
                  {(touched.firstName) && fieldErrors.firstName && (<p className="text-xs mt-1 text-red-600">{fieldErrors.firstName}</p>)}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium">Nom</label>
                  <input id="lastName" name="lastName" required value={lastName} onChange={(e)=>setLastName(e.target.value)} onBlur={()=>setTouched(v=>({ ...v, lastName: true }))} className="mt-1 w-full rounded-lg border border-black/15 p-2 bg-white" />
                  {(touched.lastName) && fieldErrors.lastName && (<p className="text-xs mt-1 text-red-600">{fieldErrors.lastName}</p>)}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium">Téléphone</label>
                  <input id="phone" name="phone" required value={phone} onChange={(e)=>setPhone(e.target.value)} onBlur={()=>setTouched(v=>({ ...v, phone: true }))} className="mt-1 w-full rounded-lg border border-black/15 p-2 bg-white" />
                  {(touched.phone) && fieldErrors.phone && (<p className="text-xs mt-1 text-red-600">{fieldErrors.phone}</p>)}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium">Email</label>
                  <input id="email" name="email" type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} onBlur={()=>setTouched(v=>({ ...v, email: true }))} className="mt-1 w-full rounded-lg border border-black/15 p-2 bg-white" />
                  {(touched.email) && fieldErrors.email && (<p className="text-xs mt-1 text-red-600">{fieldErrors.email}</p>)}
                </div>
              </div>
              <label className="flex items-start gap-2 text-sm"><input type="checkbox" className="mt-1" checked={consent} onChange={(e)=>setConsent(e.target.checked)} onBlur={()=>setTouched(v=>({ ...v, consent: true }))} /> J’accepte que mes données soient utilisées pour me recontacter, conformément à la Politique de confidentialité.</label>
              {touched.consent && fieldErrors.consent && (<p className="text-xs -mt-2 text-red-600">{fieldErrors.consent}</p>)}
              <div className="text-center">
                <button disabled={isDisabled} className={`btn-primary brochure-btn ${isDisabled ? "cursor-not-allowed opacity-60" : "hover:cursor-pointer"}`} type="submit">Recevoir la brochure</button>
                <p className="text-xs mt-2 opacity-80">Réponse en moins de 24h.</p>
                {status === "error" && <p className="text-xs mt-1 text-red-600">Une erreur est survenue. Réessayez.</p>}
              </div>
            </form>
          </div>
        ) : (
          <div className="brochure-panel text-center">
            <h3 className="mb-2">Merci, votre demande a bien été enregistrée.</h3>
            <p className="prose mx-auto mb-4">Vous pouvez télécharger le guide maintenant.</p>
            <button onClick={triggerDownload} className="btn-primary brochure-btn hover:cursor-pointer">Télécharger le guide</button>
          </div>
        )}
      </div>
    </section>
  );
}


