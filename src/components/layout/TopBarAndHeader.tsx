'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { PillButton } from '@/components/ui/PillButton';
import { OFFER_CONFIG, ORG_CONFIG } from '@/config/siteConfig';

interface TopBarAndHeaderProps {
  onCtaClick: (location: 'header') => void;
  activeAnchor?: string;
}

/**
 * Seção 8.1 — Barra superior + cabeçalho (s0)
 * Barra fina índigo: “Guia ilustrado · Acesso imediato · Garantia de 7 dias”.
 * Cabeçalho: logo Mãe Preparada; links-âncora (O guia, Por dentro, Quem fez, Dúvidas) em pílula;
 * botão pílula menta “Quero o guia ↗”.
 */
export function TopBarAndHeader({
  onCtaClick,
  activeAnchor = 'o-guia',
}: TopBarAndHeaderProps) {
  const navItems = [
    { id: 'o-guia', label: 'O guia', href: '#s4' },
    { id: 'por-dentro', label: 'Por dentro', href: '#s6' },
    { id: 'quem-fez', label: 'Quem fez', href: '#s10' },
    { id: 'duvidas', label: 'Dúvidas', href: '#s14' },
  ];

  return (
    <header id="s0" data-section-id="s0" className="sticky top-0 z-40 w-full">
      {/* Barra fina superior: Vermelho bem clarinho estilo clínica/saúde */}
      <div className="bg-[#FFF0F2] text-[#9F1239] text-[11px] sm:text-xs md:text-sm font-bold py-1.5 sm:py-2 px-3 sm:px-4 text-center border-b border-[#FECDD3]">
        <div className="max-w-container mx-auto flex flex-wrap items-center justify-center gap-x-2.5 sm:gap-x-3 gap-y-0.5">
          <span>Guia ilustrado</span>
          <span className="text-[#FF2B44]" aria-hidden="true">
            ·
          </span>
          <span>Acesso imediato</span>
          <span className="text-[#FF2B44]" aria-hidden="true">
            ·
          </span>
          <span>Garantia de {OFFER_CONFIG.guaranteeDays} dias</span>
        </div>
      </div>

      {/* Cabeçalho principal: quase branco sólido com sutil blur */}
      <div className="bg-white/[0.98] backdrop-blur-sm border-b border-[#FECDD3] shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        <div className="max-w-container mx-auto px-3.5 sm:px-6 h-15 sm:h-20 flex items-center justify-between gap-2 sm:gap-3">
          {/* Logo à esquerda */}
          <Link
            href="/guia"
            className="flex items-center gap-2 sm:gap-2.5 min-w-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2B44] rounded-xl"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo_v1_mae_preparada.webp"
              alt="Logo Mãe Preparada"
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl object-contain shadow-sm group-hover:scale-105 transition-transform shrink-0"
            />
            <div className="leading-tight min-w-0">
              <span className="block font-extrabold text-sm sm:text-lg text-[var(--indigo-900)] tracking-tight truncate">
                {ORG_CONFIG.name}
              </span>
              <span className="hidden sm:block text-[11px] font-semibold text-[var(--ink-muted)] truncate">
                {ORG_CONFIG.tagline}
              </span>
            </div>
          </Link>

          {/* Navegação em pílula (Desktop - estilo referência Puls AI) */}
          <nav
            aria-label="Navegação da página"
            className="hidden md:flex items-center gap-1 p-1.5 rounded-full bg-white border border-[var(--lavender-200)] shadow-sm"
          >
            {navItems.map((item) => {
              const isActive = activeAnchor === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-[var(--indigo-900)] text-white shadow-sm'
                      : 'text-[var(--ink-muted)] hover:text-[var(--indigo-900)] hover:bg-[var(--lavender-100)]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Botão "Quero o guia ↗" à direita */}
          <PillButton
            variant="primary"
            size="md"
            onClick={() => onCtaClick('header')}
            aria-label="Quero o guia"
            className="shrink-0 text-xs sm:text-sm px-3.5 sm:px-5 py-1.5 sm:py-2 min-h-[42px] sm:min-h-[48px]"
          >
            Quero o guia
          </PillButton>
        </div>
      </div>
    </header>
  );
}
