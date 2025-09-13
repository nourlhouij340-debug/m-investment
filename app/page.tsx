import Image from "next/image";
import { Playfair_Display } from "next/font/google";
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400","600","700"], style: ["italic","normal"], variable: "--font-playfair" });
import Navbar from "@/components/Navbar";
import SectionTitle from "@/components/SectionTitle";
import ZoneCard from "@/components/ZoneCard";
import ServiceCard from "@/components/ServiceCard";
import ServiceTile from "@/components/ServiceTile";
import ContactForm from "@/components/ContactForm";
import HeroCtas from "@/components/HeroCtas";
import QuoteSection from "@/components/QuoteSection";

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
        <section id="intro" className="section-mission">
          <div className="mx-auto max-w-6xl px-4 mission-wrap">
            <QuoteSection />
            <div className="mission-glow" aria-hidden="true" />
          </div>
        </section>

        {/* Services (three-panel image tiles) */}
        <section id="services" className="section">
          <div className="mx-auto max-w-6xl px-4">
            <div className="eyebrow">Nos métiers</div>
            <h2 className="mb-6">Accompagnement complet</h2>
            <div className="services-hero">
              <ServiceTile
                title="Conseil & accompagnement immobilier"
                imageUrl="/assets/icons/rabat.jpg"
                items={[
                  "Étude de vos besoins et de votre budget",
                  "Sélection de biens fiables et vérifiés (titres fonciers, conformité juridique)",
                  "Assistance dans la négociation et la transaction",
                ]}
              />
              <ServiceTile
                title="Sécurisation juridique & administrative"
                imageUrl="/assets/icons/rabat.jpg"
                items={[
                  "Vérification légale des titres et contrats",
                  "Coordination avec notaires, avocats et administrations",
                  "Suivi des procédures d’enregistrement et de financement",
                ]}
              />
              <ServiceTile
                title="Gestion post-achat & installation"
                imageUrl="/assets/icons/rabat.jpg"
                items={[
                  "Accompagnement pour la location ou la gestion de votre bien",
                  "Services de conciergerie et d’entretien",
                  "Assistance pour votre installation (carte de séjour, scolarité, banque, santé)",
                ]}
              />
            </div>
          </div>
        </section>

        {/* Why (premium) */}
        <section id="why" className="why-premium section">
          <div className="mx-auto max-w-6xl px-4">
            <div className="why-head text-center">
              <div className="eyebrow">Pourquoi nous choisir</div>
              <h2 className="mb-2">Un accompagnement premium, discret et fiable</h2>
              <p className="prose text-[color:var(--gray700)] max-w-3xl mx-auto">Inspiré des meilleures pratiques du conseil immobilier premium, notre approche combine rigueur, réseau local et confidentialité absolue pour sécuriser et valoriser votre investissement.</p>
            </div>
            <div className="why-grid">
              <div className="why-card text-center">
                <div className="why-icon icon-network" aria-hidden="true" />
                <h3>Expertise locale & réseau</h3>
                <p>Partenaires de confiance (notaires, avocats, banques, architectes) et compréhension fine des marchés au Maroc.</p>
              </div>
              <div className="why-card text-center">
                <div className="why-icon icon-compliance" aria-hidden="true" />
                <h3>Processus clair & conformité</h3>
                <p>Démarche structurée, vérifications juridiques et administratives, reporting transparent à chaque étape.</p>
              </div>
              <div className="why-card text-center">
                <div className="why-icon icon-service" aria-hidden="true" />
                <h3>Service sur‑mesure & multi‑langues</h3>
                <p>Interlocuteur unique FR / EN / AR, disponibilité élevée et accompagnement discret, avant et après l’achat.</p>
              </div>
            </div>
            <div className="why-cta text-center">
              <a href="#contact" className="btn btn--primary">Parler de votre projet</a>
            </div>
          </div>
          <div className="why-glow" aria-hidden="true" />
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
              <ZoneCard className="zone-span-2" title="Autre" image="/assets/icons/rabat.jpg" description="Sélection d'autres zones: Essaouira, El Jadida, Saïdia, Bouznika, etc." />
            </div>
          </div>
        </section>

        {/* About (premium, inspired by Bosworth Property) */}
        <section id="about" className="section about-premium">
          <div className="mx-auto max-w-6xl px-4 about-rows">
            {/* Row 1: image left, text right */}
            <div className="about-row">
              <div className="about-img">
                <Image src="/assets/icons/rabat.jpg" alt="Rabat — Maroc" fill className="object-cover rounded-[var(--radius-lg)]" />
              </div>
              <div className="about-content">
                <div className="eyebrow">À propos</div>
                <h2 className="mb-3">El Alami Montasser — Fondateur de M‑Investment</h2>
                <p className="prose about-text">
                  Originaire de Rabat, Montasser a bâti en France une solide expérience bancaire (affaires professionnelles, conseil patrimonial). Double culture France/Maroc, vision internationale et parfaite connaissance du terrain local.
                </p>
                <h3 className="about-sub">Expertises clés</h3>
                <ul className="about-list">
                  <li>Conseil patrimonial</li>
                  <li>Accompagnement des professionnels et entrepreneurs</li>
                  <li>Structuration de projets d’investissement sécurisés</li>
                  <li>Stratégies financières et immobilières adaptées</li>
                </ul>
              </div>
            </div>

            {/* Row 2: text left, image right */}
            <div className="about-row about-row--reverse">
              <div className="about-content">
                <h3 className="about-sub">Aujourd’hui, il accompagne ses clients dans</h3>
                <ul className="about-list">
                  <li>La sécurisation des investissements immobiliers au Maroc</li>
                  <li>L’installation et la relocalisation sereine</li>
                  <li>Le développement de solutions patrimoniales durables</li>
                </ul>
                <p className="prose about-text mt-2">
                  Son credo: transparence, confiance et expertise pour des projets pérennes dans un Maroc en forte croissance.
                </p>
              </div>
              <div className="about-img">
                <Image src="/assets/icons/rabat.jpg" alt="Architecture — Maroc" fill className="object-cover rounded-[var(--radius-lg)]" />
              </div>
            </div>
          </div>
        </section>

        {/* CTA – full-bleed scrollable image with white ghost arrow */}
        <section id="cta" className="cta-hero">
          <div className="cta-inner">
            <h2 className="cta-title">Contactez‑nous pour en savoir plus !</h2>
            <p className="cta-sub">Besoin d’infos sur nos services ? Notre équipe est là pour vous aider.</p>
            <p className="cta-sub">Cliquez pour nous contacter et débuter dès maintenant.</p>
            <a href="#contact" aria-label="Aller au formulaire de contact" className="cta-arrow">↓</a>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="section contact-premium">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center contact-head">
              <div className="eyebrow" style={{color:'var(--accent)'}}>Formulaire de contact</div>
              <h2 className="mb-2">Nous vous répondrons rapidement</h2>
              <p className="prose max-w-3xl mx-auto">Remplissez le formulaire ci‑dessous et l’un de nos experts vous recontactera rapidement.</p>
            </div>
            <div className="mt-8">
              <div className="contact-form contact-form--wide mx-auto">
                <ContactForm />
              </div>
            </div>
        </div>
        </section>
      </main>

      <footer className="footer-premium">
        <div className="mx-auto max-w-6xl px-4 py-10 grid gap-10 md:grid-cols-3">
          <div className="footer-brand">
            <a href="#hero" aria-label="M-Investment">
              <Image src="/assets/icons/full-logocropped.png" alt="M‑Investment" width={150} height={48} />
            </a>
            <p className="mt-4 text-[color:var(--gray700)]">
              M‑Investment conçoit et pilote des investissements immobiliers modernes et fiables pour valoriser votre patrimoine.
            </p>
          </div>
          <div>
            <h3 className="footer-head">Nos liens</h3>
            <ul className="footer-links">
              <li><a href="#why">Processus</a></li>
              <li><a href="#services">Nos services</a></li>
              <li><a href="#zones">Projets</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#about">Mot du gérant</a></li>
            </ul>
          </div>
          <div>
            <h3 className="footer-head">Contact</h3>
            <ul className="footer-contact">
              <li>+212 6 00 00 00 00</li>
              <li>contact@m-investment.ma</li>
              <li>Instagram</li>
            </ul>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4 pb-8 text-[color:var(--gray600)] text-sm">© {new Date().getFullYear()} M‑Investment — Tous droits réservés</div>
      </footer>

      {/* No WhatsApp FAB per request */}
    </div>
  );
}
