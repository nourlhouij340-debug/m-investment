import React from "react";

interface ServiceTileProps {
  title: string;
  items: string[];
  href?: string;
  imageUrl: string;
  ctaText?: string;
  hook?: string;
}

export default function ServiceTile({ title, items, href = "#contact", imageUrl, ctaText = "Nous contacter", hook }: ServiceTileProps) {
  return (
    <div className="service-card" aria-label={title}>
      <div className="service-inner">
        {/* Front face: image + title only */}
        <div className="service-face service-front" style={{ backgroundImage: `url(${imageUrl})` }}>
          <div className="service-tint" />
          <div className="service-strip" />
          <div className="service-content">
            <h3 className="service-title">{title}</h3>
            <div className="service-hint" aria-hidden>
              <span>Appuyer pour voir</span>
              <span className="chev">››</span>
            </div>
          </div>
          <div className="service-hover" aria-hidden>
            <span className="chev">››</span>
          </div>
        </div>
        {/* Back face: hook only (no bullets, no CTA) */}
        <div className="service-face service-back">
          <div className="service-back-content">
            <h3 className="service-back-title">{title}</h3>
            {hook && <p className="service-hook">{hook}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}


