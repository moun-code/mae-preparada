'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, Mail, Trash2 } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { PillButton } from '@/components/ui/PillButton';
import { ORG_CONFIG } from '@/config/siteConfig';
import { resetQuizState } from '@/storage/quizStore';
import { setCookieConsent } from '@/tracking/track';

export default function ContatoPage() {
  const [requestType, setRequestType] = useState<'suporte' | 'exclusao'>('suporte');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [localCleared, setLocalCleared] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: `contato_${requestType}`,
          name: requestType === 'exclusao' ? 'Solicitação LGPD' : 'Mensagem de Contato',
          email: email.includes('@') ? email.trim() : '',
          whatsapp: !email.includes('@') ? email.trim() : '',
          consented: true,
        }),
      });
    } catch {
      // Falha silenciosa
    }

    setSent(true);
  };

  const handleClearBrowserData = () => {
    resetQuizState();
    setCookieConsent('denied');
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch {
      // Silencioso
    }
    setLocalCleared(true);
  };

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
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="rounded-[24px] sm:rounded-[28px] bg-white p-5 sm:p-10 border border-[var(--indigo-700)]/15 shadow-soft space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold">
                Contato, Suporte e Canal LGPD
              </h1>
              <p className="text-sm text-[var(--ink-muted)]">
                Precisa de ajuda com seu acesso, quer tirar uma dúvida ou
                solicitar a exclusão dos seus dados pessoais? Fale conosco:
              </p>
            </div>

            <div className="space-y-2 text-xs sm:text-sm bg-[var(--lavender-50)] p-3.5 sm:p-4 rounded-2xl border border-[var(--indigo-700)]/10">
              <div className="flex flex-wrap items-center gap-2">
                <Mail className="w-4 h-4 text-[var(--indigo-700)] shrink-0" />
                <strong>E-mail direto:</strong>
                <a
                  href="mailto:eumaepreparada.suporte@gmail.com"
                  className="font-bold text-[#FF2B44] hover:underline break-all"
                >
                  eumaepreparada.suporte@gmail.com
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <strong>WhatsApp de atendimento:</strong>
                <a
                  href="https://wa.me/5513996103786"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#FF2B44] hover:underline"
                >
                  +55 13 996103786
                </a>
              </div>
            </div>

            {sent ? (
              <div className="p-4 rounded-2xl bg-[var(--mint-400)]/25 border border-[var(--indigo-900)]/20 flex items-center gap-3 text-sm font-bold">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>
                  Sua solicitação foi registrada. Responderemos no e-mail
                  informado o mais breve possível.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="contact-type"
                    className="block text-xs font-extrabold mb-1"
                  >
                    Assunto
                  </label>
                  <select
                    id="contact-type"
                    value={requestType}
                    onChange={(e) =>
                      setRequestType(e.target.value as 'suporte' | 'exclusao')
                    }
                    className="w-full min-h-[48px] px-4 rounded-xl bg-[var(--lavender-50)] border-2 border-[var(--indigo-700)]/20 text-sm font-bold"
                  >
                    <option value="suporte">
                      Dúvida sobre o guia / Suporte ao pedido
                    </option>
                    <option value="exclusao">
                      LGPD: Solicitar exclusão / descadastro dos meus dados
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-extrabold mb-1"
                  >
                    Seu e-mail ou WhatsApp *
                  </label>
                  <input
                    id="contact-email"
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="voce@email.com ou (11) 99999-9999"
                    className="w-full min-h-[48px] px-4 rounded-xl bg-[var(--lavender-50)] border-2 border-[var(--indigo-700)]/20 text-base"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-msg"
                    className="block text-xs font-extrabold mb-1"
                  >
                    Mensagem
                  </label>
                  <textarea
                    id="contact-msg"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Como podemos ajudar?"
                    className="w-full p-4 rounded-xl bg-[var(--lavender-50)] border-2 border-[var(--indigo-700)]/20 text-base"
                  />
                </div>

                <PillButton type="submit" variant="primary" size="md" fullWidthMobile className="w-full sm:w-auto">
                  Enviar solicitação
                </PillButton>
              </form>
            )}
          </div>

          {/* Exclusão Imediata de Dados do Navegador */}
          <div className="rounded-[24px] bg-[var(--lavender-100)] p-6 border border-[var(--indigo-700)]/15 space-y-3">
            <h2 className="text-base font-extrabold flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-[var(--indigo-700)]" /> Limpar
              dados salvos neste navegador agora
            </h2>
            <p className="text-xs sm:text-sm text-[var(--ink-muted)]">
              Deseja apagar imediatamente as respostas do quiz e revogar os
              cookies armazenados neste aparelho?
            </p>
            {localCleared ? (
              <p className="text-xs font-extrabold text-[var(--indigo-900)]">
                ✓ Todos os dados locais deste navegador foram apagados e os
                cookies de medição foram desativados.
              </p>
            ) : (
              <button
                type="button"
                onClick={handleClearBrowserData}
                className="px-4 py-2.5 rounded-full bg-white text-[var(--indigo-900)] border border-[var(--indigo-700)]/30 text-xs font-extrabold hover:bg-[var(--indigo-900)] hover:text-white transition-colors min-h-[44px]"
              >
                Apagar meus dados locais e revogar cookies
              </button>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
