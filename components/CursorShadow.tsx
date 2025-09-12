"use client";

import { useEffect, useRef } from "react";

export default function CursorShadow() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Disable on touch devices
    if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) {
      el.style.display = "none";
      return;
    }

    const onMove = (e: MouseEvent) => {
      // Drive CSS variables to position the radial gradient precisely at cursor
      el.style.setProperty("--mx", `${e.clientX}px`);
      el.style.setProperty("--my", `${e.clientY}px`);
      el.style.opacity = "1";
    };
    const onLeave = () => { el.style.opacity = "0"; };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <div aria-hidden className="cursor-shadow" ref={ref} />;
}


