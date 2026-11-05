import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import {
  MEDICAL_DISCLAIMER,
  OFFER_CONFIG,
  ORG_CONFIG,
  PRODUCT_CONFIG,
} from '@/config/siteConfig';

export const metadata: Metadata = {
  title: 'Termos de Uso e Aviso Médico',
  description:
    'Termos e condições de uso do guia educativo Segundos que Salvam, garantia legal e aviso médico.',
};

export default function TermosPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--lavender-50)] text-[var(--indigo-900)]">
      <header className="bg-white border-b border-[var(--indigo-700)]/10 py-3 sm:py-4 px-3.5 sm:px-6">
        <div className="max-w-container mx-auto flex items-center justify-between gap-2.5">
          <Link href="/guia" className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo_v1_mae_preparada.webp"
              alt="Logo Mãe Preparada"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl object-contain shadow-sm shrink-0"
            />
            <span className="font-extrabold text-sm sm:text-base truncate">{ORG_CONFIG.name}</span>
          </Link>
          <Link
            href="/guia"
            className="text-xs sm:text-sm font-extrabold underline text-[var(--indigo-700)] shrink-0"
          >
            ← Voltar ao site
          </Link>
        </div>
      </header>

      <main className="flex-1 py-10 sm:py-16 px-4 sm:px-6">
        <article className="max-w-3xl mx-auto rounded-[24px] sm:rounded-[28px] bg-white p-5 sm:p-10 border border-[var(--indigo-700)]/15 shadow-soft space-y-6 text-sm sm:text-base leading-relaxed">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[var(--indigo-900)]">
            Termos de Uso
          </h1>

          <div className="p-4 rounded-2xl bg-[#FFF5F5] border-l-4 border-[var(--emergency-600)] text-xs sm:text-sm font-bold text-[var(--indigo-900)]">
            <strong>AVISO MÉDICO IMPORTANTE:</strong> {MEDICAL_DISCLAIMER}
          </div>

          <section className="space-y-2">
            <h2 className="text-lg font-extrabold">
              1. Natureza Educativa do Material
            </h2>
            <p className="text-[var(--ink-muted)]">
              O produto digital <strong>{PRODUCT_CONFIG.fullTitle}</strong> e o
              teste interativo disponibilizado neste site possuem caráter
              estritamente informativo e educativo, baseados em diretrizes
              públicas de primeiros socorros. Nenhuma informação aqui contida
              configura diagnóstico médico, consulta pediátrica ou substitui
              treinamento prático presencial.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-extrabold">
              2. Licença de Uso Familiar
            </h2>
            <p className="text-[var(--ink-muted)]">
              Ao adquirir o guia, você recebe uma licença pessoal e
              intransferível para uso próprio e compartilhamento direto com o
              núcleo de cuidado da criança (pai, avós, babá). É vedada a
              revenda, reprodução comercial ou distribuição pública na internet.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-extrabold">
              3. Direito de Arrependimento e Garantia ({OFFER_CONFIG.guaranteeDays} dias)
            </h2>
            <p className="text-[var(--ink-muted)]">
              Conforme o art. 49 do Código de Defesa do Consumidor (Lei nº
              8.078/1990), você dispõe de {OFFER_CONFIG.guaranteeDays} dias
              corridos a contar da data da compra para solicitar o cancelamento
              e reembolso integral do valor pago, diretamente pela plataforma
              Cakto ou pelo nosso suporte em{' '}
              <a
                href="mailto:eumaepreparada.suporte@gmail.com"
                className="font-bold text-[#FF2B44] hover:underline"
              >
                eumaepreparada.suporte@gmail.com
              </a>
              .
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-extrabold">
              4. Ausência de Endosso Institucional
            </h2>
            <p className="text-[var(--ink-muted)]">
              As menções à Sociedade Brasileira de Pediatria (SBP), Ministério
              da Saúde, American Heart Association (AHA) e Anvisa referem-se
              exclusivamente às fontes bibliográficas públicas consultadas. Não
              há vínculo societário nem endosso comercial dessas instituições ao
              produto.
            </p>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
