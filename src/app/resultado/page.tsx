import React from 'react';
import type { Metadata } from 'next';
import { LandingAndResultView } from '@/components/funnel/LandingAndResultView';

/**
 * Seção 6 (Regra 6) e Seção 11 (SEO):
 * - Título neutro sem citar condições médicas
 * - `noindex`
 */
export const metadata: Metadata = {
  title: 'Seu Resultado e Guia Passo a Passo',
  description:
    'Confira as situações prioritárias para revisar e conheça o guia ilustrado Segundos que Salvam.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ResultadoPage() {
  return <LandingAndResultView mode="resultado" />;
}

