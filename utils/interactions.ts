"use client";

import { useEffect } from "react";

export function useMagneticHover(selector: string, intensityPx: number = 10) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));
    const onMove = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      const tx = Math.max(Math.min(dx * intensityPx, intensityPx), -intensityPx);
      const ty = Math.max(Math.min(dy * intensityPx, intensityPx), -intensityPx);
      target.style.setProperty("--tx", `${tx}px`);
      target.style.setProperty("--ty", `${ty}px`);
    };
    const onLeave = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      target.style.setProperty("--tx", "0px");
      target.style.setProperty("--ty", "0px");
    };
    elements.forEach((el) => {
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
    });
    return () => {
      elements.forEach((el) => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, [selector, intensityPx]);
}

export function useSpotlightHover(selector: string) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));
    const onMove = (e: MouseEvent) => {
      const el = e.currentTarget as HTMLElement;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
    };
    elements.forEach((el) => el.addEventListener("mousemove", onMove));
    return () => elements.forEach((el) => el.removeEventListener("mousemove", onMove));
  }, [selector]);
}



