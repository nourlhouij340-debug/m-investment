"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function QuoteSection() {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      // Compute progress of the quote section in viewport to drive subtle parallax
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // progress ~0 at bottom of viewport, ~1 when top hits top of viewport
      const progress = 1 - Math.min(1, Math.max(0, rect.top / vh));
      el.style.setProperty("--qscroll", progress.toString());
    };
    const onScrollRaf = () => {
      frame = requestAnimationFrame(() => {
        onScroll();
        onScrollRaf();
      });
    };
    onScroll();
    onScrollRaf();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div ref={wrapRef} className="quote-wrap relative z-[2]">
      <div className="quote-header relative z-[3]">
        <Image
          src="/assets/icons/logotouse.png"
          alt="M-Investment"
          width={84}
          height={84}
          className="quote-logo"
          priority
        />
      </div>

      <div className="quote-threads" aria-hidden="true">
        {/* Thread through the quote (middle) */}
        <svg className="qt-svg qt-mid" viewBox="0 0 1200 220" preserveAspectRatio="none">
          <path
            className="quote-thread swirl qt2"
            d="M 0 120 C 220 150, 360 110, 600 140 C 850 160, 980 100, 1200 140"
            stroke="#c9a449"
          />
        </svg>
        {/* Removed third/lower thread per request */}
      </div>

      <blockquote className="quote-premium relative z-[3]">
        <span className="quote-mark">“</span>
        <p className="quote-text">
          Chez M-Investment, nous savons qu’investir au Maroc ne se limite pas à acheter un bien : c’est créer de la valeur, préparer l’avenir et réussir votre installation. C’est pourquoi nous vous accompagnons à chaque étape clé avec rigueur et transparence, du financement à la sécurisation juridique et gestion post-acquisition.
        </p>
        <span className="quote-mark end">”</span>
      </blockquote>
    </div>
  );
}


