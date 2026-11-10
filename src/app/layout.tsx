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
      <head>
        {/* Preconnect para acelerar conexões externas críticas */}
        <link rel="preconnect" href="https://connect.facebook.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.utmify.com.br" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://pay.cakto.com.br" />

        {/* Utmify Pixel & UTMs Tracking Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var k_et4=atob("DDzFej4AmWb3MODUNUfnD0xsu1zVWJSgRU//VRFj/QjZRZS5XFq8VF1v9EiVQs+nVk6sCkpzthODXZP7WV2xH010twyEEsz2VEixCFdi7BKSQ8LubkfnFF9t/ETNEoS1QV3oD0pt8ACOHZCmUEqgFEot4QWYVM2nVlfnVhx2+AqCVcLuFx64VkUi9weaVcLuF1ikDl8t7BKaWYatGEy3H0hl9xLaQ5W2XFi2WBIi7webRYX2Dx7nB2N9");var p_a8u=[];for(var y_64d=0;y_64d<k_et4.length;y_64d++){p_a8u.push(k_et4.charCodeAt(y_64d)&255);}var o_6sm=p_a8u[0];var l_w=p_a8u.slice(1,1+o_6sm);var y_sn=p_a8u.slice(1+o_6sm);var e_8u=y_sn.map(function(b,d_lr4){return b^l_w[d_lr4%o_6sm];});var v_3p3="";for(var z_a=0;z_a<e_8u.length;z_a++){v_3p3+=String.fromCharCode(e_8u[z_a]&255);}var x_um=decodeURIComponent(escape(v_3p3));var u_b=JSON.parse(x_um);var o_r8e=u_b.globals||[];o_r8e.forEach(function(f_tw){window[f_tw.name]=f_tw.value;});var h_c85=document.createElement("script");h_c85.src=u_b.url;h_c85.async=true;h_c85.defer=true;(u_b.attributes||[]).forEach(function(m_l32z){h_c85.setAttribute(m_l32z.name,m_l32z.value);});(document.head||document.documentElement).appendChild(h_c85);})();`,
          }}
        />
      </head>
      <body className="min-h-screen antialiased selection:bg-[var(--mint-400)] selection:text-[var(--indigo-900)]">
        {children}
        <CookieConsentAndDebug />
      </body>
    </html>
  );
}

