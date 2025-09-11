"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { smoothScrollTo, useActiveSection } from "@/utils/scroll";

const links = [
  { href: "#hero", label: "Accueil" },
  { href: "#why", label: "Pourquoi nous choisir" },
  { href: "#about", label: "À propos" },
  { href: "#services", label: "Services" },
  { href: "#zones", label: "Zones" },
];

export default function Header() {
  const [solid, setSolid] = useState(false);
  const active = useActiveSection(["hero", "why", "about", "services", "zones", "contact"]);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    smoothScrollTo(href.slice(1));
  };

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-shadow duration-200 ${solid ? "bg-white/95 shadow-md backdrop-blur" : "bg-transparent"}`}>
      <nav className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between" aria-label="Navigation principale">
        <a href="#hero" className="flex items-center gap-2" onClick={(e) => handleClick(e, "#hero")}>
          <Image src="/assets/logo.svg" width={120} height={30} alt="M-Investment" />
        </a>
        <ul className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={(e) => handleClick(e, l.href)}
                className={`text-sm font-medium transition-colors hover:text-[color:var(--gold)] ${active && `#${active}` === l.href ? "text-[color:var(--gold)]" : "text-[color:var(--black)]"}`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          onClick={(e) => handleClick(e, "#contact")}
          className="rounded-lg bg-[color:var(--gold)] text-white text-sm font-medium py-2 px-4 hover:opacity-90 focus-visible:outline-offset-2"
        >
          Contact
        </a>
      </nav>
      {/* Mobile sticky CTA */}
      <div className="md:hidden fixed bottom-4 inset-x-4 z-50">
        <a href="#contact" onClick={(e) => handleClick(e, "#contact")} className="block text-center rounded-lg bg-[color:var(--gold)] text-white text-base font-medium py-3 shadow-[0_6px_24px_rgba(0,0,0,.18)]">Parler à un conseiller</a>
      </div>
    </header>
  );
}

