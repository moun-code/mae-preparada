import React from 'react';
import { ShieldCheck } from 'lucide-react';

/**
 * Selo Circular Girando no canto superior esquerdo do Hero (Seção 4 e 8.2)
 * Texto obrigatório: "BASEADO EM DIRETRIZES PÚBLICAS • SBP • MINISTÉRIO DA SAÚDE • AHA •"
 * Respeita prefers-reduced-motion via classe CSS `.animate-spin-slow`.
 */
export function RotatingSeal({ className = '' }: { className?: string }) {
  const text =
    'BASEADO EM DIRETRIZES PÚBLICAS • SBP • MINISTÉRIO DA SAÚDE • AHA • ';

  return (
    <div
      className={`relative w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center rounded-full bg-[#FFF0F2] text-[#1C1917] shadow-soft border-3 sm:border-4 border-[#FECDD3] select-none ${className}`}
      role="img"
      aria-label="Selo informativo: Baseado em diretrizes públicas da SBP, Ministério da Saúde e AHA, sem sugerir endosso institucional"
    >
      <svg
        viewBox="0 0 120 120"
        className="w-full h-full p-1 sm:p-1.5 animate-spin-slow"
        aria-hidden="true"
      >
        <defs>
          <path
            id="sealCirclePath"
            d="M 60, 60 m -44, 0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
          />
        </defs>
        <text
          fill="#FF2B44"
          fontSize="8.3"
          fontWeight="800"
          letterSpacing="1.35px"
        >
          <textPath href="#sealCirclePath" startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#FF2B44] text-white flex items-center justify-center shadow-inner">
          <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.4]" />
        </div>
      </div>
    </div>
  );
}

