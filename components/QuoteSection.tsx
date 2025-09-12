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
            d="M 0 140 C 220 180, 360 130, 600 170 C 850 200, 980 120, 1200 160"
            stroke="#c9a449"
          />
        </svg>
        {/* Removed third/lower thread per request */}
      </div>

      <blockquote className="quote-premium relative z-[3]">
        <span className="quote-mark">“</span>
        <p className="quote-text">
          Investir au Maroc est bien plus qu’un projet immobilier, c’est un choix de vie et un héritage à transmettre. Chez M-Investment, nous vous accompagnons dans cette démarche avec discrétion, exigence et expertise. Notre rôle est de sécuriser chaque étape et valoriser votre investissement, pour que votre projet reflète vos aspirations.
        </p>
        <span className="quote-mark end">”</span>
      </blockquote>
    </div>
  );
}


