import React from 'react';

interface EmProps {
  children: React.ReactNode;
  variant?: 'onLight' | 'onDark';
  className?: string;
}

/**
 * Componente <Em> (Seção 4)
 * Palavra em itálico + faixa menta atrás da metade inferior (assinatura da marca).
 */
export function Em({ children, variant = 'onLight', className = '' }: EmProps) {
  return (
    <em
      className={`relative inline-block font-extrabold not-italic px-1 z-0 text-[#FF2B44] ${className}`}
    >
      <span
        aria-hidden="true"
        className={`absolute left-0 right-0 bottom-[0.06em] h-[0.35em] -z-10 rounded-sm transition-transform duration-300 ${
          variant === 'onDark'
            ? 'bg-[#FF2B44]/25'
            : 'bg-[#FF2B44]/15'
        }`}
      />
      <span className="relative z-10">{children}</span>
    </em>
  );
}

