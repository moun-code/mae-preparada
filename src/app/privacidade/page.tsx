import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { ORG_CONFIG } from '@/config/siteConfig';

export const metadata: Metadata = {
  title: 'Política de Privacidade e Proteção de Dados (LGPD)',
  description:
    'Como tratamos seus dados pessoais, cookies, Meta Pixel e API de Conversões em conformidade com a LGPD (Lei nº 13.709/2018).',
};

export default function PrivacidadePage() {
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
            Política de Privacidade (LGPD)
          </h1>
          <p className="text-xs text-[var(--ink-muted)] font-semibold">
            Última atualização: Novembro de 2026 · Controladora:{' '}
            {ORG_CONFIG.legalDescriptor} (CNPJ 33.653.080/0003-03)
          </p>

          <section className="space-y-2">
            <h2 className="text-lg font-extrabold">
              1. Minimização de Dados e Compromisso com a sua Privacidade
            </h2>
            <p className="text-[var(--ink-muted)]">
              Em conformidade com a Lei Geral de Proteção de Dados (Lei nº
              13.709/2018 — LGPD), coletamos apenas o mínimo necessário para
              entregar seu diagnóstico, enviar conteúdos educativos autorizados
              e processar sua compra com segurança.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-extrabold">
              2. Quais dados coletamos e Finalidade
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 text-[var(--ink-muted)]">
              <li>
                <strong>Dados de contato voluntários (Nome, WhatsApp e/ou E-mail):</strong>{' '}
                coletados na tela de captura do quiz ou na solicitação da Ficha
                de Emergência gratuita, exclusivamente mediante seu{' '}
                <strong>consentimento explícito</strong> (caixa desmarcada por
                padrão, art. 7º, I da LGPD).
              </li>
              <li>
                <strong>Respostas do Quiz:</strong> armazenadas localmente no
                seu próprio navegador (<code>localStorage</code> e{' '}
                <code>sessionStorage</code>) para exibir seu resultado na página{' '}
                <code>/resultado</code>.
              </li>
              <li>
                <strong>Parâmetros de atribuição de campanha:</strong>{' '}
                <code>utm_source</code>, <code>utm_medium</code>,{' '}
                <code>utm_campaign</code>, <code>utm_term</code>,{' '}
                <code>utm_content</code>, <code>fbclid</code>, <code>_fbp</code>{' '}
                e <code>_fbc</code> para medir a eficácia dos nossos anúncios.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-extrabold">
              3. Meta Pixel, API de Conversões (CAPI) e Neutralidade de Saúde
            </h2>
            <p className="text-[var(--ink-muted)]">
              Utilizamos o Meta Pixel e a API de Conversões da Meta apenas após
              o seu aceite no banner de cookies. Por diretriz rigorosa de
              privacidade:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[var(--ink-muted)]">
              <li>
                <strong>Jamais enviamos à Meta</strong> suas respostas do quiz,
                nomes de situações médicas, idade do(a) seu(sua) filho(a) ou lista de erros.
              </li>
              <li>
                Os eventos técnicos utilizam apenas códigos neutros (como{' '}
                <code>step: 1..11</code>, <code>band: r1..r3</code> e{' '}
                <code>section: s1..s15</code>).
              </li>
              <li>
                Quando você consente no formulário de captura (evento{' '}
                <code>Lead</code>), seu e-mail, telefone e primeiro nome passam
                por criptografia irreversível (hash <strong>SHA-256</strong>)
                para correspondência avançada segura.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-extrabold">
              4. Processamento de Pagamentos (Cakto)
            </h2>
            <p className="text-[var(--ink-muted)]">
              Os pagamentos são processados diretamente pela plataforma{' '}
              <strong>Cakto</strong> em ambiente criptografado. Não temos acesso
              nem armazenamos números de cartão de crédito.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-extrabold">
              5. Direitos do Titular e Canal de Exclusão de Dados
            </h2>
            <p className="text-[var(--ink-muted)]">
              Você pode, a qualquer momento, solicitar a confirmação de
              tratamento, acesso, correção, revogação do consentimento ou{' '}
              <strong>exclusão total dos seus dados</strong> clicando no link de
              descadastro presente em todas as nossas mensagens ou entrando em
              contato diretamente em nossa página de{' '}
              <Link href="/contato" className="underline font-bold text-[var(--indigo-900)]">
                Contato e Exclusão de Dados
              </Link>{' '}
              ou pelo e-mail{' '}
              <a
                href="mailto:eumaepreparada.suporte@gmail.com"
                className="font-bold text-[#FF2B44] hover:underline"
              >
                eumaepreparada.suporte@gmail.com
              </a>
              .
            </p>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
