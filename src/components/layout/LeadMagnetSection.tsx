'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FileText, CheckCircle2, X, Gift } from 'lucide-react';
import { track } from '@/tracking/track';
import { PillButton } from '@/components/ui/PillButton';

/**
 * Seção 8.17 (Extras) — Isca Grátis Opcional:
 * Ficha de Emergência da Criança (1 página) por e-mail, via popup de saída no desktop
 * e faixa no fim da página no mobile (gera `LeadMagnet` + `Lead` com consentimento) ⟦arquivo a produzir⟧.
 */
export function LeadMagnetSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [consented, setConsented] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [showExitPopup, setShowExitPopup] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 11);
    if (raw.length <= 2) {
      setWhatsapp(raw);
    } else if (raw.length <= 7) {
      setWhatsapp(`(${raw.slice(0, 2)}) ${raw.slice(2)}`);
    } else {
      setWhatsapp(`(${raw.slice(0, 2)}) ${raw.slice(2, 7)}-${raw.slice(7)}`);
    }
  };

  // Popup de intenção de saída apenas no Desktop (1x por sessão)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5 && window.innerWidth >= 1024) {
        const alreadyShown = sessionStorage.getItem('mp_exit_popup_shown');
        if (!alreadyShown && !submitted) {
          sessionStorage.setItem('mp_exit_popup_shown', '1');
          setShowExitPopup(true);
        }
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [submitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !email.includes('@')) {
      setError('Informe um e-mail válido para receber a ficha.');
      return;
    }
    if (!whatsapp.trim() || whatsapp.replace(/\D/g, '').length < 10) {
      setError('Informe seu WhatsApp com DDD para contato.');
      return;
    }
    if (!consented) {
      setError(
        'Marque a caixa de consentimento para enviarmos a ficha ao seu e-mail.'
      );
      return;
    }

    track('LeadMagnet', {});
    track(
      'Lead',
      { currency: 'BRL', value: 0 },
      {
        userData: {
          email: email.trim(),
          firstName: name.trim(),
          phone: whatsapp.replace(/\D/g, ''),
        },
      }
    );

    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'lead_magnet_ficha',
          name: name.trim(),
          email: email.trim(),
          whatsapp: whatsapp.trim(),
          consented: true,
        }),
      });
    } catch {
      // Falha silenciosa
    }

    setSubmitted(true);
  };

  const renderFormCard = (isModal = false) => (
    <div
      className={`rounded-[24px] bg-[var(--lavender-100)] border-2 border-[var(--indigo-700)]/15 p-5 sm:p-8 ${
        isModal ? 'shadow-2xl bg-white' : 'shadow-soft'
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FFF0F2] text-[#FF2B44] border border-[#FECDD3] text-xs font-extrabold shadow-xs">
          <Gift className="w-4 h-4 text-[#FF2B44]" /> Você ganhou um presente!
        </span>
      </div>

      <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--indigo-900)] leading-tight">
        Quer baixar gratuitamente a Ficha de Emergência da Criança?
      </h3>
      <p className="mt-2 text-sm sm:text-base text-[var(--ink-muted)]">
        Uma página com peso, alergias, telefone do pediatra e endereço da casa — para ninguém esquecer o básico se precisar ligar 192.
      </p>

      {submitted ? (
        <div className="mt-5 p-4 rounded-2xl bg-[var(--mint-400)]/25 border border-[var(--indigo-900)]/20 flex items-center gap-3 text-[var(--indigo-900)] font-bold text-sm">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-[var(--indigo-900)]" />
          <span>
            Pronto! Enviamos o link da Ficha de Emergência para o seu e-mail.
          </span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-5 space-y-3" noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label
                htmlFor={isModal ? 'lm-name-modal' : 'lm-name'}
                className="block text-xs font-extrabold text-[var(--indigo-900)] mb-1"
              >
                Seu primeiro nome
              </label>
              <input
                id={isModal ? 'lm-name-modal' : 'lm-name'}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex.: Mariana"
                className="w-full min-h-[48px] px-4 rounded-xl bg-white border-2 border-[var(--indigo-700)]/20 text-[var(--indigo-900)] text-base focus:outline-none focus:border-[var(--indigo-700)]"
              />
            </div>
            <div>
              <label
                htmlFor={isModal ? 'lm-email-modal' : 'lm-email'}
                className="block text-xs font-extrabold text-[var(--indigo-900)] mb-1"
              >
                Seu melhor e-mail *
              </label>
              <input
                id={isModal ? 'lm-email-modal' : 'lm-email'}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="voce@email.com"
                className="w-full min-h-[48px] px-4 rounded-xl bg-white border-2 border-[var(--indigo-700)]/20 text-[var(--indigo-900)] text-base focus:outline-none focus:border-[var(--indigo-700)]"
              />
            </div>
            <div>
              <label
                htmlFor={isModal ? 'lm-whatsapp-modal' : 'lm-whatsapp'}
                className="block text-xs font-extrabold text-[var(--indigo-900)] mb-1"
              >
                WhatsApp com DDD *
              </label>
              <input
                id={isModal ? 'lm-whatsapp-modal' : 'lm-whatsapp'}
                type="tel"
                required
                value={whatsapp}
                onChange={handlePhoneChange}
                placeholder="(11) 99999-9999"
                className="w-full min-h-[48px] px-4 rounded-xl bg-white border-2 border-[var(--indigo-700)]/20 text-[var(--indigo-900)] text-base focus:outline-none focus:border-[var(--indigo-700)]"
              />
            </div>
          </div>

          <label className="flex items-start gap-2.5 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={consented}
              onChange={(e) => setConsented(e.target.checked)}
              className="mt-1 w-5 h-5 rounded border-2 border-[var(--indigo-700)] text-[var(--indigo-900)] focus:ring-[var(--mint-400)] shrink-0"
            />
            <span className="text-xs text-[var(--ink-muted)] leading-relaxed">
              Aceito receber a Ficha de Emergência e conteúdos educativos sobre segurança infantil da Mãe Preparada por e-mail. Posso cancelar quando quiser.{' '}
              <Link href="/privacidade" className="underline font-bold text-[var(--indigo-900)]">
                Política de Privacidade
              </Link>
              .
            </span>
          </label>

          {error && (
            <p className="text-xs font-bold text-[var(--indigo-900)] bg-[var(--mint-400)]/30 px-3 py-2 rounded-lg">
              {error}
            </p>
          )}

          <div className="pt-1">
            <PillButton type="submit" variant="secondary" size="md" fullWidthMobile className="w-full sm:w-auto">
              Receber a Ficha grátis por e-mail
            </PillButton>
          </div>
        </form>
      )}
    </div>
  );

  return (
    <>
      {/* Faixa no fim da página (Mobile & Desktop) */}
      <section
        aria-label="Baixar Ficha de Emergência gratuita"
        className="py-12 px-4 sm:px-6 bg-[var(--lavender-50)] border-t border-[var(--indigo-700)]/10"
      >
        <div className="max-w-3xl mx-auto">{renderFormCard(false)}</div>
      </section>

      {/* Modal de intenção de saída no Desktop */}
      {showExitPopup && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Baixe gratuitamente a Ficha de Emergência da Criança"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--indigo-900)]/70 backdrop-blur-sm animate-fade-up"
        >
          <div className="relative max-w-xl w-full">
            <button
              type="button"
              onClick={() => setShowExitPopup(false)}
              aria-label="Fechar janela"
              className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-[var(--indigo-900)] text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform z-10"
            >
              <X className="w-5 h-5" />
            </button>
            {renderFormCard(true)}
          </div>
        </div>
      )}
    </>
  );
}

