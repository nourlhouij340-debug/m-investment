import Image from "next/image";
import Navbar from "@/components/Navbar";
import SectionTitle from "@/components/SectionTitle";
import ServiceCard from "@/components/ServiceCard";
import ContactForm from "@/components/ContactForm";
import HeroCtas from "@/components/HeroCtas";

export default function Home() {
  return (
    <div className="font-sans">
      <Navbar />
      <main>
        {/* Hero (clean, cream, left text, right image) */}
        <section id="hero" className="section-hero bg-[color:var(--cream)] relative">
          <div className="hero-birds" aria-hidden="true">
            <svg className="bird b1" width="36" height="16" viewBox="0 0 36 16"><path d="M1 15 C6 6, 12 6, 18 15 M18 15 C24 6, 30 6, 35 15"/></svg>
            <svg className="bird b2" width="28" height="12" viewBox="0 0 28 12"><path d="M1 11 C5 4, 9 4, 14 11 M14 11 C19 4, 23 4, 27 11"/></svg>
            <svg className="bird b3" width="32" height="14" viewBox="0 0 32 14"><path d="M1 13 C6 5, 11 5, 16 13 M16 13 C21 5, 26 5, 31 13"/></svg>
          </div>
          <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-8 md:gap-8 items-center">
            <div>
              <h1 className="text-[clamp(28px,4.2vw,46px)] font-semibold leading-[1.18] text-[color:var(--black)]">M-Investment – L’excellence au service de votre patrimoine au Maroc</h1>
              <p className="mt-3 text-[clamp(15px,1.7vw,17px)] text-[color:rgba(15,15,15,.72)] max-w-[680px]">Sécuriser et simplifier votre investissement au Maroc. Accompagnement discret et expert pour MRE et investisseurs internationaux.</p>
              <HeroCtas />
            </div>
            <div className="justify-self-stretch md:justify-self-end w-full h-[440px] sm:h-[540px] md:h-[640px] lg:h-[720px] relative">
              <Image src="/assets/icons/houses.png" alt="Illustration investissement immobilier" fill sizes="(min-width: 768px) 50vw, 90vw" className="object-contain" priority />
            </div>
          </div>
        </section>

        {/* Intro */}
        <section id="intro" className="section bg-[color:var(--cream)]">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <p className="text-[color:var(--black)] text-lg fade-up">
              Notre mission: sécuriser vos projets et simplifier chaque étape administrative et juridique, pour investir au Maroc avec sérénité et efficacité.
            </p>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="section">
          <div className="mx-auto max-w-6xl px-4">
            <SectionTitle title="Services" subtitle="Accompagnement immobilier Maroc, sécurisation juridique, et gestion post-achat." />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <ServiceCard
                title="Conseil & accompagnement immobilier"
                icon="/assets/icons/compass.svg"
                bullets={["Étude besoins/budget", "Sélection de biens vérifiés (titres, conformité)", "Assistance négociation/transaction"]}
              />
              <ServiceCard
                title="Sécurisation juridique & administrative"
                icon="/assets/icons/shield.svg"
                bullets={["Vérifs titres & contrats", "Coordination notaires/avocats/administrations", "Enregistrement & financement"]}
              />
              <ServiceCard
                title="Gestion post-achat & installation"
                icon="/assets/icons/home.svg"
                bullets={["Location/gestion, conciergerie/entretien", "Carte de séjour, scolarité, banque, santé", "Réseau de prestataires fiables"]}
              />
            </div>
            <div className="mt-8">
              <a href="#contact" className="inline-block rounded-lg bg-[color:var(--gold)] text-white text-sm font-medium py-2 px-4 hover:opacity-90">Parler à un conseiller</a>
            </div>
          </div>
        </section>

        {/* Why */}
        <section id="why" className="section bg-white">
          <div className="mx-auto max-w-6xl px-4">
            <SectionTitle title="Pourquoi nous choisir" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-[color:var(--black)]">
              <div className="rounded-[16px] bg-[color:var(--cream)] p-6">
                <h3 className="font-semibold mb-2">Expertise locale & réseau fiable</h3>
                <p className="text-[color:var(--gray600)]">Notaires, promoteurs, banques, architectes.</p>
              </div>
              <div className="rounded-[16px] bg-[color:var(--cream)] p-6">
                <h3 className="font-semibold mb-2">Transparence & accompagnement sur-mesure</h3>
                <p className="text-[color:var(--gray600)]">Suivi clair, intérêts alignés, confidentialité.</p>
              </div>
              <div className="rounded-[16px] bg-[color:var(--cream)] p-6">
                <h3 className="font-semibold mb-2">Équipe FR / EN / AR</h3>
                <p className="text-[color:var(--gray600)]">Communication fluide, internationale.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Zones */}
        <section id="zones" className="section">
          <div className="mx-auto max-w-6xl px-4">
            <SectionTitle title="Zones d’intervention" />
            <div className="flex flex-wrap gap-2">
              {["Casablanca", "Rabat", "Marrakech", "Tanger", "Agadir", "Zones touristiques & résidentielles"].map((z) => (
                <span key={z} className="rounded-full bg-white shadow px-4 py-2 text-sm text-[color:var(--black)]">{z}</span>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="section bg-white">
          <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-[200px_1fr] gap-6 items-start">
            <Image src="/assets/founder.jpg" width={200} height={240} alt="Portrait du fondateur" className="rounded-[16px] object-cover bg-[color:var(--cream)]" />
            <div>
              <SectionTitle title="À propos" />
              <h3 className="font-semibold">El Alami Montasser — Fondateur</h3>
              <p className="text-[color:var(--gray600)] mt-2 max-w-prose">
                Expérience bancaire en France (PME / gestion de patrimoine), vision internationale; retour au Maroc pour accompagner MRE & investisseurs étrangers.
                Valeurs: Transparence, Confiance, Expertise.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="cta" className="section bg-[color:var(--cream)]">
          <div className="mx-auto max-w-6xl px-4 grid gap-4 md:flex md:items-center md:justify-between">
            <p className="text-[color:var(--black)] text-lg">Nous traitons chaque projet avec rigueur et confidentialité. Parlons de votre situation et objectifs.</p>
            <a href="#contact" className="rounded-lg bg-[color:var(--gold)] text-white text-sm font-medium py-2 px-4 hover:opacity-90">Discuter de votre projet</a>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="section bg-white">
          <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-8">
            <div>
              <SectionTitle title="Contact" subtitle="Parlons de votre projet en toute confidentialité." />
              <ContactForm />
            </div>
            <div className="rounded-[16px] bg-[color:var(--cream)] p-6">
              <h3 className="font-semibold mb-2">Coordonnées</h3>
              <ul className="text-[color:var(--gray600)]">
                <li>Email: contact@m-investment.ma</li>
                <li>Téléphone: +212 6 00 00 00 00</li>
                <li>LinkedIn: linkedin.com/company/m-investment</li>
              </ul>
            </div>
        </div>
        </section>
      </main>

      <footer className="bg-white border-t border-black/10">
        <div className="mx-auto max-w-6xl px-4 py-8 grid md:grid-cols-3 gap-6 text-sm">
          <p className="text-[color:var(--gray600)]">M-Investment — Accompagnement immobilier, sécurisation juridique, gestion post-achat.</p>
          <nav aria-label="Liens de bas de page" className="flex gap-4">
            {[
              { href: "#hero", label: "Accueil" },
              { href: "#why", label: "Pourquoi nous choisir" },
              { href: "#about", label: "À propos" },
              { href: "#services", label: "Services" },
              { href: "#zones", label: "Zones" },
              { href: "#contact", label: "Contact" },
            ].map((l) => (
              <a key={l.href} href={l.href} className="hover:text-[color:var(--gold)]">{l.label}</a>
            ))}
          </nav>
          <div className="text-[color:var(--gray600)]">Mentions légales — © {new Date().getFullYear()} M-Investment</div>
        </div>
      </footer>

      {/* No WhatsApp FAB per request */}
    </div>
  );
}
