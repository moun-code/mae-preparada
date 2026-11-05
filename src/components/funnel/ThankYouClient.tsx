'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Download,
  HeartHandshake,
  Mail,
  Printer,
  Share2,
  ShieldCheck,
  Smartphone,
  GraduationCap,
} from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { Em } from '@/components/ui/Em';
import { PillButton } from '@/components/ui/PillButton';
import { ORG_CONFIG, PRODUCT_CONFIG } from '@/config/siteConfig';
import { track } from '@/tracking/track';

/**
 * Seção 10 — Página `/obrigada`
 * Confirmação calorosa, como acessar/baixar o PDF e abrir os links e campos,
 * como imprimir a ficha, botão de compartilhar com quem cuida, convite para um curso prático.
 * Dispara `ThankYouView`. Upsell opcional ⟦ ⟧.
 */
export function ThankYouClient() {
  useEffect(() => {
    track('ThankYouView', {});
  }, []);

  const handleShareCaregiver = () => {
    track('ShareClick', {});
    const origin =
      typeof window !== 'undefined' ? window.location.origin : '';
    const text = `Acabei de adquirir o guia ilustrado "Segundos que Salvam" da Mãe Preparada para deixarmos no celular aqui de casa. Se quiser fazer o teste rápido de 2 minutos também, está aqui: ${origin}/quiz`;
    window.open(
      `https://wa.me/?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--lavender-50)] text-[var(--indigo-900)]">
      {/* Cabeçalho simples */}
      <header className="bg-white border-b border-[var(--indigo-700)]/10 py-3 sm:py-4 px-3.5 sm:px-6">
        <div className="max-w-container mx-auto flex items-center justify-between gap-2.5">
          <Link href="/guia" className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo_v1_mae_preparada.webp"
              alt="Logo Mãe Preparada"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl object-contain shadow-sm shrink-0"
            />
            <span className="font-extrabold text-sm sm:text-lg text-[var(--indigo-900)] truncate">
              {ORG_CONFIG.name}
            </span>
          </Link>
          <span className="px-2.5 sm:px-3 py-1 rounded-full bg-[#FF2B44] text-white text-[11px] sm:text-xs font-extrabold shadow-sm shrink-0 whitespace-nowrap">
            Pedido Confirmado
          </span>
        </div>
      </header>

      <main className="flex-1 py-10 sm:py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
          {/* Boas-vindas calorosa (Estética Clínica/Saúde: Vermelho clarinho) */}
          <div className="rounded-[24px] sm:rounded-[28px] bg-[#FFF0F2] border-2 border-[#FECDD3] text-[#1C1917] p-5 sm:p-10 shadow-soft space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FF2B44] text-white text-xs font-extrabold uppercase tracking-wider shadow-sm">
              <CheckCircle2 className="w-4 h-4" /> Tudo certo com a sua inscrição
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight text-[#1C1917]">
              Obrigada por dar este passo. Sua casa agora está mais{' '}
              <Em>preparada</Em>.
            </h1>
            <p className="text-base sm:text-lg text-[#44403C] leading-relaxed font-medium">
              Seu acesso ao guia{' '}
              <strong className="text-[#FF2B44]">
                {PRODUCT_CONFIG.title}
              </strong>{' '}
              e a todos os checklists complementares já foi enviado. Siga os 4
              passos rápidos abaixo nos próximos 5 minutos para deixar tudo
              pronto antes de precisar:
            </p>
          </div>

          {/* 4 Passos Práticos de Acesso e Uso */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="rounded-[24px] bg-white p-6 border border-[var(--indigo-700)]/15 shadow-soft space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[var(--lavender-100)] text-[var(--indigo-900)] flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-extrabold text-[var(--indigo-900)]">
                1. Abra seu e-mail (e a área da Cakto)
              </h2>
              <p className="text-sm text-[var(--ink-muted)] leading-relaxed">
                Procure pelo assunto <strong>“Cakto”</strong> ou{' '}
                <strong>“Segundos que Salvam”</strong> na sua caixa de entrada
                (confira também a aba Promoções/Spam). Lá está o botão direto
                para baixar os arquivos.
              </p>
            </div>

            <div className="rounded-[24px] bg-white p-6 border border-[var(--indigo-700)]/15 shadow-soft space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[var(--lavender-100)] text-[var(--indigo-900)] flex items-center justify-center">
                <Smartphone className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-extrabold text-[var(--indigo-900)]">
                2. Salve nos Favoritos do celular
              </h2>
              <p className="text-sm text-[var(--ink-muted)] leading-relaxed">
                Baixe o PDF no aparelho para funcionar <strong>offline</strong>.
                No leitor de PDF do celular (Arquivos/Livros no iPhone ou Adobe
                Acrobat/Drive no Android), os botões do{' '}
                <strong>Índice Rápido</strong> são clicáveis e os campos da
                ficha são digitáveis.
              </p>
            </div>

            <div className="rounded-[24px] bg-white p-6 border border-[var(--indigo-700)]/15 shadow-soft space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[var(--lavender-100)] text-[var(--indigo-900)] flex items-center justify-center">
                <Printer className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-extrabold text-[var(--indigo-900)]">
                3. Preencha a Ficha de Emergência
              </h2>
              <p className="text-sm text-[var(--ink-muted)] leading-relaxed">
                Imprima a <strong>Ficha de Emergência da Criança</strong> e o{' '}
                <strong>Roteiro da Ligação 192</strong>. Anote o peso atualizado
                do(a) seu(sua) filho(a), alergias, telefone do pediatra e o endereço exato
                da casa com ponto de referência.
              </p>
            </div>

            <div className="rounded-[24px] bg-white p-6 border border-[var(--indigo-700)]/15 shadow-soft space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[var(--lavender-100)] text-[var(--indigo-900)] flex items-center justify-center">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-extrabold text-[var(--indigo-900)]">
                4. Alinhe com quem cuida dele(a)
              </h2>
              <p className="text-sm text-[var(--ink-muted)] leading-relaxed">
                Mostre onde a ficha ficou guardada e envie o guia rápido para a
                avó, o pai ou a babá. Quando toda a rede sabe a regra{' '}
                <strong>Calma · Ligar 192 · Agir</strong>, você fica em paz.
              </p>
            </div>
          </div>

          {/* Compartilhar com quem cuida */}
          <div className="rounded-[24px] bg-[var(--lavender-100)] p-5 sm:p-8 border-2 border-[var(--indigo-700)]/15 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center sm:text-left">
              <h3 className="text-lg sm:text-xl font-extrabold text-[var(--indigo-900)]">
                Envie o teste rápido para quem cuida do(a) seu(sua) filho(a)
              </h3>
              <p className="text-sm text-[var(--ink-muted)]">
                Ajude a avó, o pai ou a babá a perceberem os mitos mais comuns
                em 2 minutos pelo WhatsApp:
              </p>
            </div>
            <PillButton
              variant="secondary"
              size="md"
              fullWidthMobile
              className="w-full sm:w-auto"
              onClick={handleShareCaregiver}
            >
              <span className="inline-flex items-center gap-2">
                <Share2 className="w-4 h-4" /> Compartilhar no WhatsApp
              </span>
            </PillButton>
          </div>

          {/* Convite honesto para curso prático */}
          <div className="rounded-[24px] bg-white p-6 border border-[var(--indigo-700)]/15 space-y-2">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[var(--indigo-700)]">
              <GraduationCap className="w-4 h-4" /> Próximo passo recomendado
            </div>
            <h3 className="text-lg font-extrabold text-[var(--indigo-900)]">
              Sempre que puder, faça também um treinamento prático presencial
            </h3>
            <p className="text-sm text-[var(--ink-muted)] leading-relaxed">
              O guia estará sempre à mão no seu celular para
              consulta rápida. Para complementar seu preparo com treino muscular
              em manequins, recomendamos buscar cursos presenciais da Cruz
              Vermelha, Corpo de Bombeiros ou instrutores credenciados na sua
              cidade.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
