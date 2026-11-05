import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { CookieConsentAndDebug } from '@/components/layout/CookieConsentAndDebug';
import { ORG_CONFIG, PRODUCT_CONFIG } from '@/config/siteConfig';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-jakarta',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FF2B44',
};

export const metadata: Metadata = {
  title: {
    default: `${PRODUCT_CONFIG.title} | ${ORG_CONFIG.name}`,
    template: `%s | ${ORG_CONFIG.name}`,
  },
  description:
    'Guia prático ilustrado passo a passo de primeiros socorros pediátricos para consulta rápida no celular ou impresso. Calma, ligar 192, agir.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={plusJakarta.variable}>
      <body className="min-h-screen antialiased selection:bg-[var(--mint-400)] selection:text-[var(--indigo-900)]">
        {children}
        <CookieConsentAndDebug />
      </body>
    </html>
  );
}

