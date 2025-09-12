import Image from "next/image";
import { Playfair_Display } from "next/font/google";
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400","600","700"], style: ["italic","normal"], variable: "--font-playfair" });
import Navbar from "@/components/Navbar";
import SectionTitle from "@/components/SectionTitle";
import ZoneCard from "@/components/ZoneCard";
import ServiceCard from "@/components/ServiceCard";
import ContactForm from "@/components/ContactForm";
import HeroCtas from "@/components/HeroCtas";

export default function Home() {
  return (
    <div className="font-sans">
      <Navbar />
      <main>
        {/* Hero (clean, cream, left text, right image) */}
        <section id="hero" className="hero-premium">
          <Image src="/assets/icons/rabat.jpg" alt="Ville de Rabat" fill className="hero-bg-img" priority sizes="100vw" />
          <div className="content">
            <h1 className="text-balance text-[clamp(28px,4vw,44px)] font-medium leading-[1.15]">
              <span>M-Investment</span>
              <br />
              L’excellence au service de votre patrimoine au <strong>Maroc</strong>
            </h1>
            <p className="mt-3 text-[clamp(15px,1.4vw,17px)] opacity-90">Sécuriser et simplifier votre investissement au Maroc. Accompagnement discret et expert pour MRE et investisseurs internationaux.</p>
            <div className="mt-6 flex items-center justify-center gap-4 flex-wrap">
              <a href="#services" className="btn-primary btn-spotlight nav-cta">Découvrir nos services</a>
              <a href="#contact" className="btn-secondary nav-cta">Nous contacter</a>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section id="intro" className="section-mission bg-[color:var(--cream)]">
          <div className="mx-auto max-w-6xl px-4 mission-wrap">
            <div className="relative z-[1] grid md:grid-cols-2 items-center gap-8">
              <div className="flex items-center justify-center">
                <Image src="/assets/icons/full-logo.png" alt="M-Investment" width={520} height={260} className="mission-logo" />
              </div>
              <div>
                <h2 className="text-[color:var(--black)] font-semibold text-2xl mb-3">Notre mission</h2>
                <p className="text-[color:var(--black)] text-lg leading-relaxed">
                  Sécuriser et simplifier vos projets et chaque étape administrative et juridique, pour investir au Maroc avec sérénité et efficacité.
                </p>
              </div>
            </div>
            <div className="mission-glow" aria-hidden="true" />
          </div>
        </section>

        {/* Services */}
        <section id="services" className="section">
          <div className="mx-auto max-w-6xl px-4">
            <div className="eyebrow">Nos métiers</div>
            <h2 className="mb-6">Accompagnement complet</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="card">
                <h3 className="font-semibold mb-2">Investment Management</h3>
                <p className="prose">Conseil stratégique, structuration et pilotage de l’investissement immobilier pour maximiser la valeur.</p>
                <a href="#contact" className="link mt-3 inline-block">Accélérer la croissance</a>
              </div>
              <div className="card">
                <h3 className="font-semibold mb-2">Property Development</h3>
                <p className="prose">Développement et transformation d’actifs avec une approche rigoureuse et responsable.</p>
                <a href="#contact" className="link mt-3 inline-block">Façonner la ville</a>
              </div>
              <div className="card">
                <h3 className="font-semibold mb-2">Hospitality & Installation</h3>
                <p className="prose">Expériences et services post‑achat: installation, gestion, conciergerie, conformité.</p>
                <a href="#contact" className="link mt-3 inline-block">Sublimer l’expérience</a>
              </div>
            </div>
          </div>
        </section>

        {/* Why */}
        <section id="why" className="section bg-white">
          <div className="mx-auto max-w-6xl px-4">
            <div className="eyebrow">Pourquoi nous choisir</div>
            <h2 className="mb-6">Notre différence</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="card">
                <h3 className="font-semibold mb-2">Expertise locale & réseau</h3>
                <p className="prose">Réseau éprouvé de notaires, avocats, banquiers, architectes et promoteurs pour sécuriser chaque étape.</p>
              </div>
              <div className="card">
                <h3 className="font-semibold mb-2">Transparence & gouvernance</h3>
                <p className="prose">Processus clairs, reporting structuré et alignement d’intérêts pour des décisions sereines.</p>
              </div>
              <div className="card">
                <h3 className="font-semibold mb-2">Exécution multi‑langues</h3>
                <p className="prose">Équipe FR / EN / AR au service des MRE et investisseurs internationaux.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Zones */}
        <section id="zones" className="section">
          <div className="mx-auto max-w-6xl px-4">
            <div className="eyebrow">Zones d’intervention</div>
            <h2 className="mb-6">Zones populaires que nous couvrons</h2>
            <div className="zones-grid">
              {/* Row 1 */}
              <ZoneCard className="zone-span-3 zone-row-2" title="Casablanca" image="/assets/icons/rabat.jpg" description="Capitale économique; Anfa, Racine, Californie, Ain Diab. Résidentiel premium, bureaux et projets d’investissement." />
              <ZoneCard className="zone-span-3" title="Rabat" image="/assets/icons/rabat.jpg" description="Souissi, Hay Riad, Les Orangers. Ambassades, institutions, résidences familiales et haut standing." />
              {/* Row 2 */}
              <ZoneCard className="zone-span-3" title="Marrakech" image="/assets/icons/rabat.jpg" description="Palmeraie, Hivernage, Médina et axes Ourika / Ouarzazate. Villas, riads et résidences lifestyle." />
              {/* Row 3 */}
              <ZoneCard className="zone-span-2" title="Tanger" image="/assets/icons/rabat.jpg" description="Corniche, Marchan, Cap Spartel. Hub logistique et résidentiel en forte croissance." />
              <ZoneCard className="zone-span-2" title="Agadir" image="/assets/icons/rabat.jpg" description="Plages, resorts et quartiers résidentiels. Opportunités locatives et pied‑à‑terre en bord de mer." />
              <ZoneCard className="zone-span-2" title="Principales zones touristiques & résidentielles" image="/assets/icons/rabat.jpg" description="Sélection des stations balnéaires et villes à forte attractivité: Essaouira, El Jadida, Saïdia, Bouznika, etc." />
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
            <a href="#contact" className="btn btn--primary">Discuter de votre projet</a>
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
