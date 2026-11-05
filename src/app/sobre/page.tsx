import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, BookOpen, CheckCircle2 } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { Em } from '@/components/ui/Em';
import { PillButton } from '@/components/ui/PillButton';
import {
  MEDICAL_DISCLAIMER,
  ORG_CONFIG,
  PRODUCT_CONFIG,
  SPECIALIST_CONFIG,
} from '@/config/siteConfig';
import { PUBLIC_GUIDELINE_SOURCES } from '@/data/landingContent';

export const metadata: Metadata = {
  title: 'Quem Somos — Mãe Preparada',
  description:
    'Conheça a Mãe Preparada — Educação em Segurança e Saúde Infantil, nossa metodologia editorial e as fontes públicas utilizadas.',
};

export default function SobrePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--lavender-50)] text-[var(--indigo-900)]">
      <header className="bg-white border-b border-[var(--indigo-700)]/10 py-3 sm:py-4 px-3.5 sm:px-6">
        <div className="max-w-container mx-auto flex items-center justify-between gap-2.5">
          <Link href="/guia" className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo_v1_mae_preparada.webp"
              alt="Logo Mãe Preparada"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl object-contain shadow-sm shrink-0"
            />
            <div className="leading-tight min-w-0">
              <span className="block font-extrabold text-sm sm:text-base text-[var(--indigo-900)] truncate">
                {ORG_CONFIG.name}
              </span>
              <span className="hidden sm:block text-[11px] text-[var(--ink-muted)] font-semibold truncate">
                {ORG_CONFIG.tagline}
              </span>
            </div>
          </Link>
          <PillButton
            variant="primary"
            size="md"
            href="/guia"
            className="shrink-0 text-xs sm:text-sm px-3.5 sm:px-5 py-1.5 sm:py-2 min-h-[42px] sm:min-h-[48px]"
          >
            Conhecer o guia
          </PillButton>
        </div>
      </header>

      <main className="flex-1 py-10 sm:py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto space-y-8 sm:space-y-10">
          <div className="space-y-4">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[var(--lavender-100)] text-[var(--indigo-700)] text-xs font-extrabold uppercase tracking-wider">
              Quem somos
            </span>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              {ORG_CONFIG.legalDescriptor}: preparo que <Em>acalma</Em>.
            </h1>
            <p className="text-base sm:text-lg text-[var(--ink-muted)] leading-relaxed">
              Nascemos de uma constatação simples: toda mãe aprende a montar o
              enxoval, trocar fraldas e cuidar da rotina, mas quase ninguém
              entrega a ela um material visual, direto e sem jargão médico para
              os primeiros minutos de uma emergência doméstica.
            </p>
            <p className="text-sm sm:text-base text-[var(--ink-muted)] leading-relaxed italic bg-[var(--lavender-100)]/60 p-4 rounded-2xl border border-[var(--indigo-700)]/10">
              Nossa missão: Traduzir diretrizes públicas de emergência pediátrica em materiais visuais de consulta imediata, para que toda família saiba dar o primeiro passo com clareza.
            </p>
          </div>

          {/* Metodologia em 4 passos */}
          <div className="rounded-[24px] bg-white p-6 sm:p-8 border border-[var(--indigo-700)]/15 shadow-soft space-y-5">
            <h2 className="text-xl sm:text-2xl font-extrabold">
              Nossa metodologia editorial em 4 passos
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[var(--ink-muted)]">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[var(--indigo-700)] shrink-0 mt-0.5" />
                <p>
                  <strong className="text-[var(--indigo-900)]">
                    1. Curadoria de diretrizes públicas:
                  </strong>{' '}
                  consultamos exclusivamente documentos públicos e oficiais da
                  Sociedade Brasileira de Pediatria (SBP), Ministério da Saúde,
                  American Heart Association (AHA/ERC), Anvisa e centros de
                  intoxicação (CIATox).
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[var(--indigo-700)] shrink-0 mt-0.5" />
                <p>
                  <strong className="text-[var(--indigo-900)]">
                    2. Design para uso sob estresse:
                  </strong>{' '}
                  substituímos textos longos por passos numerados curtos,
                  ilustrações em traço preto com foco em vermelho no movimento e
                  caixas claras de &ldquo;O que NÃO fazer&rdquo;.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[var(--indigo-700)] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[var(--indigo-900)]">
                    3. Revisão técnica especializada:
                  </strong>{' '}
                  <span>Revisão médica conduzida pela Dra. Patrícia Costa, médica pediatra especialista em crianças pequenas e segurança infantil.</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[var(--indigo-700)] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[var(--indigo-900)]">
                    4. Atualização contínua:
                  </strong>{' '}
                  <span>Alinhamento permanente às diretrizes e protocolos oficiais das autoridades de saúde pediátrica.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Fontes Públicas */}
          <div className="rounded-[24px] bg-[var(--lavender-100)] p-6 sm:p-8 border border-[var(--indigo-700)]/15 space-y-4">
            <h2 className="text-xl font-extrabold flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[var(--indigo-700)]" /> Fontes
              Públicas de Referência
            </h2>
            <p className="text-xs sm:text-sm font-bold text-[var(--indigo-900)]">
              Baseado em diretrizes públicas. Não há endosso destas instituições
              ao produto.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              {PUBLIC_GUIDELINE_SOURCES.map((s) => (
                <li
                  key={s.name}
                  className="p-3.5 rounded-xl bg-white border border-[var(--indigo-700)]/10"
                >
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-extrabold text-[var(--indigo-900)] underline"
                  >
                    {s.name} ↗
                  </a>
                  <p className="text-xs text-[var(--ink-muted)] mt-1">
                    {s.topic}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Dados Societários e Especialista */}
          <div className="rounded-[24px] bg-white p-6 sm:p-8 border border-[var(--indigo-700)]/15 space-y-4">
            <h2 className="text-xl font-extrabold">
              Dados de Identificação e Contato
            </h2>
            <div className="space-y-2 text-sm">
              <div>
                <strong>Organização:</strong> {ORG_CONFIG.legalDescriptor}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <strong>CNPJ:</strong>
                <span className="font-bold text-[#1C1917]">33.653.080/0003-03</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <strong>E-mail:</strong>
                <a
                  href="mailto:eumaepreparada.suporte@gmail.com"
                  className="font-bold text-[#FF2B44] hover:underline break-all"
                >
                  eumaepreparada.suporte@gmail.com
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <strong>WhatsApp:</strong>
                <a
                  href="https://wa.me/5513996103786"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#FF2B44] hover:underline"
                >
                  +55 13 996103786
                </a>
              </div>
              <div>
                <strong>Revisão Médica:</strong> Dra. Patrícia Costa (Médica Pediatra e Especialista em Segurança Infantil).
              </div>
            </div>
            <p className="text-xs font-bold text-[var(--ink-muted)] opacity-80 pt-3 border-t border-[var(--lavender-100)]">
              {MEDICAL_DISCLAIMER}
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
