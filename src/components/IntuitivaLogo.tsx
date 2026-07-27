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
      {/* Brain Circuit Logo SVG */}
      <div className={`relative flex items-center justify-center shrink-0 ${iconSizes[size]}`}>
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
          <defs>
            {/* Gradients */}
            <linearGradient id="leftBrainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00d2ff" />
              <stop offset="100%" stopColor="#005bea" />
            </linearGradient>

            <linearGradient id="rightBrainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f857a6" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>

            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00d2ff" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#f857a6" />
            </linearGradient>

            <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00c6ff" />
              <stop offset="50%" stopColor="#0072ff" />
              <stop offset="100%" stopColor="#e040fb" />
            </linearGradient>
          </defs>

          {/* Left Brain Hemisphere (Circuit) */}
          <path
            d="M95 35C70 35 50 50 42 70C30 75 25 90 28 105C25 120 32 138 48 148C55 160 70 168 95 168V35Z"
            fill="url(#leftBrainGrad)"
          />
          {/* Circuit Nodes (Left) */}
          <circle cx="55" cy="65" r="4" fill="#ffffff" />
          <circle cx="45" cy="95" r="4" fill="#ffffff" />
          <circle cx="70" cy="90" r="4" fill="#ffffff" />
          <circle cx="60" cy="125" r="4" fill="#ffffff" />
          <circle cx="80" cy="140" r="4" fill="#ffffff" />
          <line x1="55" y1="65" x2="70" y2="90" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="45" y1="95" x2="70" y2="90" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="70" y1="90" x2="60" y2="125" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="60" y1="125" x2="80" y2="140" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />

          {/* Right Brain Hemisphere (Neural Pink) */}
          <path
            d="M105 35C130 35 150 50 158 70C170 75 175 90 172 105C175 120 168 138 152 148C145 160 130 168 105 168V35Z"
            fill="url(#rightBrainGrad)"
          />
          {/* Neural Lines (Right) */}
          <path d="M115 65 Q135 70 145 90 T125 130 T145 145" stroke="#ffffff" strokeWidth="3.5" fill="none" strokeLinecap="round" opacity="0.9" />
          <path d="M125 50 Q150 75 125 105 T135 155" stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.7" />

          {/* Center Dividing Gap */}
          <line x1="100" y1="30" x2="100" y2="172" stroke="#0f172a" strokeWidth="6" />

          {/* Orbital Ring Swoosh */}
          <path
            d="M15 110 C 20 150, 70 175, 120 160 C 170 145, 195 95, 180 65 C 175 55, 160 50, 150 55 C 160 70, 155 100, 125 120 C 85 145, 40 120, 25 100 Z"
            fill="url(#ringGrad)"
            opacity="0.95"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex items-center tracking-tight">
          <span
            className={`font-extrabold ${textSizes[size]}`}
            style={{
              background: 'linear-gradient(135deg, #00d2ff 0%, #0072ff 50%, #e040fb 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Intuitiva
          </span>
          <span className={`font-black text-blue-500 ml-1 ${textSizes[size]}`}>
            IA
          </span>
        </div>
      )}
    </div>
  );
};
