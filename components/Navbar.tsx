"use client";

import Image from "next/image";
import { smoothScrollTo, useActiveSection } from "@/utils/scroll";
import { useMagneticHover } from "@/utils/interactions";
import { useEffect, useState } from "react";

const items = [
  { label: "Accueil", href: "#hero" },
  { label: "Nos Services", href: "#services" },
  { label: "Pourquoi nous choisir", href: "#why" },
  { label: "Zones d'intervention", href: "#zones" },
];

export default function Navbar() {
  const active = useActiveSection(["hero", "services", "why", "zones", "contact"]);
  useMagneticHover(".nav-cta", 8);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handle = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    smoothScrollTo(href.slice(1));
  };

  return (
    <header className={`sticky top-0 z-50 pt-0 pb-0 ${scrolled ? "bg-[color:var(--cream)]/85 backdrop-blur" : "bg-transparent"}`}>
      <nav className="mx-auto max-w-6xl px-4 h-16 grid grid-cols-[auto_1fr_auto] items-center" aria-label="Navigation principale">
        <div className="flex items-center gap-4">
          <a href="#hero" onClick={(e) => handle(e, "#hero")} className="flex items-center gap-2">
            <Image src="/assets/icons/logotouse.png" alt="M-Investment" width={52} height={52} />
          </a>
        </div>
        <ul className="hidden md:flex items-center justify-center gap-5 text-[0.95rem]">
          {items.map((i) => (
            <li key={i.href}>
              <a
                href={i.href}
                onClick={(e) => handle(e, i.href)}
                className={`nav-link ${scrolled ? "nav-link-dark" : "nav-link-light"} ${active && `#${active}` === i.href ? "active" : ""}`}
              >
                {i.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="justify-self-end">
          <a href="#contact" onClick={(e) => handle(e, "#contact")} className="nav-cta rounded-full bg-[#A67C2D] text-white font-semibold text-sm py-2 px-4 shadow-[0_8px_20px_rgba(0,0,0,.08)]">Contact</a>
        </div>
      </nav>
    </header>
  );
}

