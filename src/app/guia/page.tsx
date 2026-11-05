import React from 'react';
import type { Metadata } from 'next';
import { LandingAndResultView } from '@/components/funnel/LandingAndResultView';
import { FAQ_ITEMS } from '@/data/landingContent';
import { ORG_CONFIG, PRODUCT_CONFIG } from '@/config/siteConfig';

/**
 * Seção 11 — SEO:
 * `/guia` indexável (title, meta, Open Graph, dados estruturados Product, FAQ e Organization, sem alegações médicas).
 */
export const metadata: Metadata = {
  title: `${PRODUCT_CONFIG.title} — O guia prático para mães`,
  description:
    'Guia ilustrado passo a passo que mostra o que fazer — e o que não fazer — em mais de 30 situações de emergência infantil. Baseado em diretrizes públicas.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: `${PRODUCT_CONFIG.title} | ${ORG_CONFIG.name}`,
    description:
      'Nos primeiros minutos de uma emergência, o que você faz importa. Saiba o quê antes de precisar.',
    type: 'website',
    locale: 'pt_BR',
  },
};

export default function GuiaPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: ORG_CONFIG.legalDescriptor,
        slogan: ORG_CONFIG.tagline,
      },
      {
        '@type': 'Product',
        name: PRODUCT_CONFIG.fullTitle,
        description: PRODUCT_CONFIG.format,
        brand: {
          '@type': 'Brand',
          name: ORG_CONFIG.name,
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQ_ITEMS.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingAndResultView mode="guia" />
    </>
  );
}

