export default function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-8 fade-up">
      <h2 className="text-[color:var(--black)] font-semibold">{title}</h2>
      {subtitle ? (
        <p className="text-[color:var(--gray600)] mt-2 max-w-prose">{subtitle}</p>
      ) : null}
      <div className="gold-divider mt-4" />
    </div>
  );
}

