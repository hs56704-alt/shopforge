export default function Icon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sf-grad" x1="0" y1="0" x2="36" y2="36">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>
      </defs>
      <rect width="36" height="36" rx="10" fill="url(#sf-grad)" />
      <path
        d="M21 5L10 20H18L15 31L26 16H18L21 5Z"
        fill="white"
        opacity="0.95"
      />
    </svg>
  );
}