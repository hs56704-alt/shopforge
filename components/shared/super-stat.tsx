interface SuperStatProps {
  eyebrow: string;
  stat: string;
  label: string;
  sub: string;
  dark: boolean;
}

export default function SuperStat({ eyebrow, stat, label, sub, dark }: SuperStatProps) {
  return (
    <section className={`py-32 px-6 text-center ${dark ? "bg-black text-white" : "bg-[#f5f5f7] text-black"}`}>
      <div className="mx-auto max-w-4xl">
        <p className={`text-xs tracking-widest uppercase mb-8 ${dark ? "text-white/20" : "text-black/20"}`}>
          {eyebrow}
        </p>

        {/* The giant number — Apple's signature move */}
        <div className={`text-8xl md:text-[160px] font-bold tracking-tighter leading-none mb-4 ${
          dark
            ? "bg-gradient-to-b from-white to-white/30 bg-clip-text text-transparent"
            : "bg-gradient-to-b from-black to-black/30 bg-clip-text text-transparent"
        }`}>
          {stat}
        </div>

        <p className={`text-2xl md:text-3xl font-semibold tracking-tight mb-4 ${dark ? "text-white/70" : "text-black/60"}`}>
          {label}
        </p>
        <p className={`text-base max-w-md mx-auto ${dark ? "text-white/30" : "text-black/30"}`}>
          {sub}
        </p>
      </div>
    </section>
  );
}