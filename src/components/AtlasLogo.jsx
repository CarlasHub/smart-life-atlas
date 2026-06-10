export function AtlasLogo({ size = 40, className = '' }) {
  return (
    <svg
      className={`atlas-logo ${className}`}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="6" y="6" width="52" height="52" rx="18" fill="url(#atlasLogoBase)" />
      <path d="M22 43L32 18L42 43" stroke="white" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M26.5 34.5H37.5" stroke="white" strokeWidth="5.5" strokeLinecap="round" />
      <circle cx="18" cy="20" r="4" fill="#34A853" />
      <circle cx="46" cy="21" r="4" fill="#FBBC04" />
      <circle cx="48" cy="44" r="4" fill="#EA4335" />
      <path d="M20 20C26 11.5 39 11.5 45 21" stroke="#E8F0FE" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
      <path d="M48 44C39 53 25 52 17 42" stroke="#E8F0FE" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
      <defs>
        <linearGradient id="atlasLogoBase" x1="10" y1="8" x2="56" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1A73E8" />
          <stop offset="0.58" stopColor="#4D9BFF" />
          <stop offset="1" stopColor="#C6DAFF" />
        </linearGradient>
      </defs>
    </svg>
  );
}
