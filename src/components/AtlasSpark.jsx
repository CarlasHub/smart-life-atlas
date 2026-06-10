export function AtlasSpark({ size = 48, active = false }) {
  return (
    <div className={`atlas-spark ${active ? 'active' : ''}`} style={{ width: size, height: size }} aria-hidden="true">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M50 16C61.7 16 72.2 22 78 31.3C83.7 40.4 83.4 52.1 77.2 62.4C70.9 72.9 59.6 80 47.6 80.7C35.8 81.3 24 75.5 18.7 65C13.5 54.7 15.1 39.9 22.6 29.8C29.4 20.6 39.4 16 50 16Z"
          fill="url(#sparkGradient)"
          filter="url(#glow)"
        />
        <circle cx="64" cy="35" r="6" fill="var(--atlas-yellow)" opacity="0.9" />
        <circle cx="35" cy="61" r="5" fill="var(--atlas-green)" opacity="0.85" />
        <defs>
          <radialGradient id="sparkGradient" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(40 30) rotate(65) scale(58)">
            <stop stopColor="var(--atlas-blue)" />
            <stop offset="0.52" stopColor="#8bb6ff" />
            <stop offset="1" stopColor="#dbe8ff" />
          </radialGradient>
          <filter id="glow" x="0" y="0" width="100" height="100" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
            <feOffset />
            <feGaussianBlur stdDeviation="7" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.258824 0 0 0 0 0.521569 0 0 0 0 0.956863 0 0 0 0.28 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
