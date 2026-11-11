import React from 'react';
import type { Metadata } from 'next';
import { QuizExperience } from '@/components/funnel/QuizExperience';

/**
 * Seção 6 (Regra 6) e Seção 11 (SEO):
 * - Título neutro sem citar condições médicas
 * - `noindex` para não indexar etapas de funil
 */
export const metadata: Metadata = {
  title: 'Teste Rápido de Preparo Familiar (2 minutos)',
  description:
    '5 situações reais em 1 minuto e meio. Descubra onde você já está preparada e onde ainda há lacunas para revisar.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function QuizPage() {
  return <QuizExperience />;
}

