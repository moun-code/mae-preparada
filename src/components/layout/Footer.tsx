import React from 'react';
import Link from 'next/link';
import { PhoneCall } from 'lucide-react';
import { MEDICAL_DISCLAIMER, ORG_CONFIG } from '@/config/siteConfig';

/**
 * Seção 8.17 — Rodapé Completo
 * Logo, tagline, links (Sobre, Privacidade, Termos, Contato), ⟦CNPJ⟧, ⟦e-mail⟧, ⟦WhatsApp⟧,
 * aviso médico completo, “Este site não é afiliado ao Facebook/Meta” e links obrigatórios.
 */
export function Footer() {
  return (
    <footer className="bg-[#FFF5F6] text-[#1C1917] pt-14 pb-28 sm:pb-16 border-t border-[#FECDD3]">
      <div className="max-w-container mx-auto px-4 sm:px-6">
        {/* Aviso Médico Visível em Destaque (Regra 6 da Seção 1) */}
        <div className="rounded-2xl bg-white border border-[#FECDD3] p-4 sm:p-5 mb-10 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="inline-flex items-center justify-center px-3 py-1.5 rounded-xl bg-[var(--emergency-600)] text-white font-extrabold text-xs shrink-0 mt-0.5">
              <PhoneCall className="w-3.5 h-3.5 mr-1.5" /> 192
            </span>
            <p className="text-xs sm:text-sm text-[#374151] font-medium leading-relaxed opacity-85">
              {MEDICAL_DISCLAIMER}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#FECDD3]">
          {/* Coluna 1: Marca e Tagline */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo_v1_mae_preparada.webp"
                alt="Logo Mãe Preparada"
                className="w-10 h-10 rounded-xl object-contain shadow-sm"
              />
              <div>
                <span className="block font-extrabold text-lg text-[#1C1917]">
                  {ORG_CONFIG.name}
                </span>
                <span className="block text-xs text-[#FF2B44] font-semibold">
                  {ORG_CONFIG.tagline}
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed max-w-md">
              {ORG_CONFIG.legalDescriptor}. Publicações educativas baseadas em
              diretrizes públicas de primeiros socorros e prevenção de acidentes
              na infância.
            </p>
          </div>

          {/* Coluna 2: Links Institucionais e Legais */}
          <div className="md:col-span-3 space-y-2.5">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#FF2B44]">
              Institucional e Legal
            </h3>
            <ul className="space-y-2 text-sm text-[#57534E] font-medium">
              <li>
                <Link
                  href="/sobre"
                  className="hover:text-[#FF2B44] transition-colors"
                >
                  Quem somos (Sobre)
                </Link>
              </li>
              <li>
                <Link
                  href="/privacidade"
                  className="hover:text-[#FF2B44] transition-colors"
                >
                  Política de Privacidade (LGPD)
                </Link>
              </li>
              <li>
                <Link
                  href="/termos"
                  className="hover:text-[#FF2B44] transition-colors"
                >
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link
                  href="/contato"
                  className="hover:text-[#FF2B44] transition-colors"
                >
                  Contato e Exclusão de Dados
                </Link>
              </li>
              <li>
                <Link
                  href="/quiz"
                  className="hover:text-[#FF2B44] transition-colors"
                >
                  Fazer o teste de 2 minutos
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Dados da Entidade */}
          <div className="md:col-span-4 space-y-2.5">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#FF2B44]">
              Identificação e Atendimento
            </h3>
            <div className="space-y-2 text-xs text-[#57534E]">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold">CNPJ:</span>
                <span className="font-bold text-[#1C1917]">33.653.080/0003-03</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold">E-mail de suporte:</span>
                <a
                  href="mailto:eumaepreparada.suporte@gmail.com"
                  className="font-bold text-[#FF2B44] hover:underline break-all"
                >
                  eumaepreparada.suporte@gmail.com
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold">WhatsApp de suporte:</span>
                <a
                  href="https://wa.me/5513996103786"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#FF2B44] hover:underline"
                >
                  +55 13 996103786
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Direitos Reservados */}
        <div className="pt-6 border-t border-[#FECDD3] text-center text-xs text-[#78716C]">
          <p>
            © {new Date().getFullYear()} {ORG_CONFIG.legalDescriptor}. Todos os
            direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
