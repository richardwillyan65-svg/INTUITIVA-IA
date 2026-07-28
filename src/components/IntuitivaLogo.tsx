import React from 'react';

interface IntuitivaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const IntuitivaLogo: React.FC<IntuitivaLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  return (
    <div className={`flex items-center gap-2.5 font-sans select-none ${className}`}>
      {/* High-Fidelity Intuitiva IA Brain & Orbital Ring SVG */}
      <div className={`relative flex items-center justify-center shrink-0 ${iconSizes[size]}`}>
        <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xl">
          <defs>
            {/* Left Brain Hemisphere (Cyan to Blue) */}
            <linearGradient id="logoLeftBrainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00d2ff" />
              <stop offset="60%" stopColor="#0066ff" />
              <stop offset="100%" stopColor="#0038b8" />
            </linearGradient>

            {/* Right Brain Hemisphere (Magenta to Purple) */}
            <linearGradient id="logoRightBrainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff00a0" />
              <stop offset="50%" stopColor="#d900ff" />
              <stop offset="100%" stopColor="#5b00c2" />
            </linearGradient>

            {/* Orbital Swoop Ring (Cyan -> Purple -> Magenta) */}
            <linearGradient id="logoRingGrad" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#00f0ff" />
              <stop offset="45%" stopColor="#0066ff" />
              <stop offset="75%" stopColor="#d900ff" />
              <stop offset="100%" stopColor="#ff00a0" />
            </linearGradient>

            {/* Intuitiva Text Gradient */}
            <linearGradient id="logoTextGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00d2ff" />
              <stop offset="60%" stopColor="#0055ff" />
              <stop offset="85%" stopColor="#bc00dd" />
              <stop offset="100%" stopColor="#e00096" />
            </linearGradient>

            {/* IA Text Gradient */}
            <linearGradient id="logoIaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0088ff" />
              <stop offset="100%" stopColor="#5500dd" />
            </linearGradient>
          </defs>

          {/* LEFT HEMISPHERE (Cyan / Circuit) */}
          <g>
            {/* Outer brain shape left */}
            <path
              d="M112 25 C82 25 58 42 50 68 C38 72 30 88 32 105 C28 122 36 142 54 154 C62 168 80 175 112 175 V25 Z"
              fill="url(#logoLeftBrainGrad)"
            />
            {/* Circuit Nodes & Connections */}
            <circle cx="60" cy="62" r="5" fill="#ffffff" />
            <circle cx="48" cy="98" r="5" fill="#ffffff" />
            <circle cx="82" cy="92" r="5.5" fill="#ffffff" />
            <circle cx="68" cy="132" r="5" fill="#ffffff" />
            <circle cx="92" cy="148" r="5" fill="#ffffff" />

            <line x1="60" y1="62" x2="82" y2="92" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
            <line x1="48" y1="98" x2="82" y2="92" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
            <line x1="82" y1="92" x2="68" y2="132" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
            <line x1="68" y1="132" x2="92" y2="148" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
            <line x1="82" y1="92" x2="108" y2="92" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
          </g>

          {/* RIGHT HEMISPHERE (Magenta / Organic Neural) */}
          <g>
            {/* Outer brain shape right */}
            <path
              d="M128 25 C158 25 182 42 190 68 C202 72 210 88 208 105 C212 122 204 142 186 154 C178 168 160 175 128 175 V25 Z"
              fill="url(#logoRightBrainGrad)"
            />
            {/* Neural Pattern Paths */}
            <path
              d="M140 58 Q165 65 175 88 T152 132 T178 152"
              stroke="#ffffff"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              opacity="0.95"
            />
            <path
              d="M152 42 Q182 72 152 108 T165 160"
              stroke="#ffffff"
              strokeWidth="3.5"
              fill="none"
              strokeLinecap="round"
              opacity="0.8"
            />
          </g>

          {/* Center Seam */}
          <line x1="120" y1="20" x2="120" y2="180" stroke="#0b0d17" strokeWidth="7" />

          {/* ORBITAL SWOOP RING */}
          <path
            d="M 15 118 C 22 158, 80 185, 142 165 C 200 146, 232 92, 212 58 C 205 46, 188 42, 176 48 C 188 64, 182 98, 148 122 C 102 152, 48 128, 30 106 Z"
            fill="url(#logoRingGrad)"
            className="drop-shadow-lg"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex items-center tracking-tight">
          <span
            className={`font-black tracking-tight ${textSizes[size]}`}
            style={{
              background: 'linear-gradient(135deg, #00d2ff 0%, #0055ff 50%, #d900ff 85%, #ff00a0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Intuitiva
          </span>
          <span
            className={`font-black ml-1.5 ${textSizes[size]}`}
            style={{
              background: 'linear-gradient(135deg, #0077ff 0%, #6b00d7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            IA
          </span>
        </div>
      )}
    </div>
  );
};

