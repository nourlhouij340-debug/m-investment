import Image from "next/image";

type Props = {
  title: string;
  bullets: string[];
  icon?: string;
};

export default function ServiceCard({ title, bullets, icon }: Props) {
  return (
    <div className="rounded-[16px] bg-white shadow-[0_6px_24px_rgba(0,0,0,.08)] p-6 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        {icon ? (
          <Image src={icon} alt="" width={24} height={24} aria-hidden className="shrink-0" />
        ) : null}
        <h3 className="font-semibold text-lg text-[color:var(--black)]">{title}</h3>
      </div>
      <ul className="list-disc pl-5 text-[color:var(--gray600)]">
        {bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </div>
  );
}



