"use client";

import { useEffect } from "react";
import { useMagneticHover, useSpotlightHover } from "@/utils/interactions";

export default function HeroCtas() {
  // Apply cursor-follow and spotlight to hero buttons
  useMagneticHover(".hero-ctas .nav-cta", 10);
  useSpotlightHover(".hero-ctas .btn-spotlight");

  return (
    <div className="hero-ctas mt-5 flex items-center gap-4 flex-wrap">
      <a href="#services" className="btn-primary btn-spotlight nav-cta">Découvrir nos services</a>
      <a href="#contact" className="btn-secondary nav-cta">Nous contacter</a>
    </div>
  );
}


