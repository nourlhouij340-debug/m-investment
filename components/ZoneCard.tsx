import Image from "next/image";

type ZoneCardProps = {
  title: string;
  image: string;
  description: string;
  className?: string;
};

export default function ZoneCard({ title, image, description, className }: ZoneCardProps) {
  return (
    <div className={`zone-card ${className ?? ""}`} aria-label={title}>
      <div className="zone-inner">
        <div className="zone-face zone-front">
          <Image src={image} alt="" fill className="object-cover" />
          <div className="zone-title">{title}</div>
        </div>
        <div className="zone-face zone-back">
          <h3 className="zone-back-title">{title}</h3>
          <p className="zone-back-text">{description}</p>
        </div>
      </div>
    </div>
  );
}


