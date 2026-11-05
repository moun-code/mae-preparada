'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface PillButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'secondaryOnDark';
  href?: string;
  children: React.ReactNode;
  showArrow?: boolean;
  fullWidthMobile?: boolean;
  size?: 'md' | 'lg';
}

/**
 * Botão Pílula do Design System (Seção 4)
 * Primário = pílula menta, texto índigo, círculo com seta ↗
 * Secundário = pílula com contorno índigo
 * Alvo de toque mínimo ≥ 48px (WCAG AA)
 */
export function PillButton({
  variant = 'primary',
  href,
  children,
  showArrow = true,
  fullWidthMobile = false,
  size = 'lg',
  className = '',
  onClick,
  ...props
}: PillButtonProps) {
  const baseStyles =
    'group inline-flex items-center justify-between gap-3 rounded-full font-extrabold transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FF2B44]/40 active:scale-[0.98] select-none';

  const sizeStyles =
    size === 'lg'
      ? 'min-h-[54px] pl-6 pr-2.5 py-2 text-base sm:text-[17px]'
      : 'min-h-[48px] pl-5 pr-2 py-1.5 text-sm sm:text-[15px]';

  const variantStyles = {
    primary:
      'bg-[#FF2B44] text-white hover:bg-[#E61933] shadow-md hover:shadow-lg',
    secondary:
      'bg-white text-[var(--indigo-900)] border border-[var(--lavender-200)] hover:border-[var(--indigo-900)] hover:bg-[var(--lavender-100)] shadow-sm',
    secondaryOnDark:
      'bg-white/10 text-white border border-white/30 hover:border-white hover:bg-white/20',
  }[variant];

  const widthStyles = fullWidthMobile ? 'w-full sm:w-auto' : '';

  const content = (
    <>
      <span className="leading-snug text-left">{children}</span>
      {showArrow && (
        <span
          aria-hidden="true"
          className={`flex items-center justify-center rounded-full transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 ${
            size === 'lg' ? 'w-9 h-9' : 'w-8 h-8'
          } ${
            variant === 'primary'
              ? 'bg-white/20 text-white group-hover:bg-white group-hover:text-[#FF2B44]'
              : variant === 'secondaryOnDark'
              ? 'bg-white text-[var(--indigo-900)]'
              : 'bg-[var(--lavender-100)] text-[var(--indigo-900)] group-hover:bg-[var(--indigo-900)] group-hover:text-white'
          }`}
        >
          <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
        className={`${baseStyles} ${sizeStyles} ${variantStyles} ${widthStyles} ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${widthStyles} ${className}`}
      {...props}
    >
      {content}
    </button>
  );
}

