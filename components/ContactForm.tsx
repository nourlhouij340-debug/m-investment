"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(formData: FormData) {
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const newErrors: Record<string, string> = {};
    if (name.length < 2 || name.length > 80) newErrors.name = "Veuillez saisir un nom entre 2 et 80 caractères.";
    if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Veuillez saisir un email valide.";
    if (message.length < 10 || message.length > 2000) newErrors.message = "Le message doit contenir entre 10 et 2000 caractères.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      setStatus("idle");
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) throw new Error("Request failed");
      (document.getElementById("contact-form") as HTMLFormElement)?.reset();
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <form id="contact-form" action={onSubmit} className="grid gap-4 max-w-xl" aria-live="polite">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">Nom complet</label>
        <input id="name" name="name" required minLength={2} maxLength={80} className="mt-1 w-full rounded-lg border border-black/10 p-2 bg-white" />
        {errors.name ? <p className="text-red-600 text-sm mt-1" role="alert">{errors.name}</p> : null}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium">Email</label>
        <input id="email" name="email" type="email" required className="mt-1 w-full rounded-lg border border-black/10 p-2 bg-white" />
        {errors.email ? <p className="text-red-600 text-sm mt-1" role="alert">{errors.email}</p> : null}
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium">Message</label>
        <textarea id="message" name="message" required minLength={10} maxLength={2000} rows={5} className="mt-1 w-full rounded-lg border border-black/10 p-2 bg-white" />
        {errors.message ? <p className="text-red-600 text-sm mt-1" role="alert">{errors.message}</p> : null}
      </div>
      <div className="flex items-center gap-3">
        <button type="submit" className="rounded-lg bg-[color:var(--gold)] text-white text-sm font-medium py-2 px-4 hover:opacity-90">Envoyer</button>
        {status === "success" && <span className="text-green-700 text-sm">Message envoyé. Nous vous répondrons rapidement.</span>}
        {status === "error" && <span className="text-red-700 text-sm">Une erreur est survenue. Veuillez réessayer.</span>}
      </div>
    </form>
  );
}

