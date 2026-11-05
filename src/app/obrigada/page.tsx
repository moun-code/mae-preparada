import React from 'react';
import type { Metadata } from 'next';
import { ThankYouClient } from '@/components/funnel/ThankYouClient';

export const metadata: Metadata = {
  title: 'Acesso Confirmado — Segundos que Salvam',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ObrigadaPage() {
  return <ThankYouClient />;
}

