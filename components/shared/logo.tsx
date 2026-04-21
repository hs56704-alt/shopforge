import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  href?: string;
  showText?: boolean;
}

export default function Logo({
  size = "md",
  href = "/",
  showText = true,
}: LogoProps) {
  const sizes = {
    sm: { box: 24, text: "text-sm" },
    md: { box: 32, text: "text-base" },
    lg: { box: 44, text: "text-xl" },
  };

  const s = sizes[size];

  const mark = (
    <svg
      width={s.box}
      height={s.box}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sf-grad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
      </defs>
      {/* Background rounded square */}
      <rect width="36" height="36" rx="10" fill="url(#sf-grad)" />
      {/* Lightning bolt */}
      <path
        d="M21 5L10 20H18L15 31L26 16H18L21 5Z"
        fill="white"
        opacity="0.95"
      />
    </svg>
  );

  const content = (
    <span className="flex items-center gap-2 flex-shrink-0">
      {mark}
      {showText && (
        <span className={`font-bold tracking-tight text-white ${s.text}`}>
          ShopForge
        </span>
      )}
    </span>
  );

  if (!href) return content;

  return (
    <Link href={href} className="flex items-center gap-2">
      {content}
    </Link>
  );
}