'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ConsentStatus,
  DebugEventLog,
  getCookieConsent,
  initMetaPixelIfConsented,
  isDebugMode,
  setCookieConsent,
  subscribeToDebugEvents,
  track,
} from '@/tracking/track';
import { captureAttributionOnVisit } from '@/tracking/attribution';
import { Shield, Terminal, X } from 'lucide-react';

/**
 * Gerenciador Global de Atribuição, Consentimento de Cookies (LGPD) e Painel Debug (?debug=1)
 * - Regra 2 (Seção 6): Pixel só dispara após aceite (`fbq('consent','grant')`). Sem aceite, nada é enviado.
 * - Regra 5 (Seção 6): `?debug=1` imprime os eventos no console e exibe HUD de inspeção.
 */
export function CookieConsentAndDebug() {
  const pathname = usePathname();
  const [consent, setConsent] = useState<ConsentStatus>('pending');
  const [mounted, setMounted] = useState(false);
  const [debugActive, setDebugActive] = useState(false);
  const [debugLogs, setDebugLogs] = useState<DebugEventLog[]>([]);
  const [debugMinimized, setDebugMinimized] = useState(false);

  useEffect(() => {
    setMounted(true);
    captureAttributionOnVisit();
    const currentConsent = getCookieConsent();
    setConsent(currentConsent);
    if (currentConsent === 'granted') {
      initMetaPixelIfConsented();
    }
    setDebugActive(isDebugMode());

    const unsubscribe = subscribeToDebugEvents((log) => {
      setDebugLogs((prev) => [log, ...prev].slice(0, 30));
    });
    return unsubscribe;
  }, []);

  // Dispara PageView a cada troca de rota (respeitando o consentimento internamente no track)
  useEffect(() => {
    if (!mounted) return;
    track('PageView', {});
  }, [pathname, mounted]);

  if (!mounted) return null;

  const handleGrant = () => {
    setCookieConsent('granted');
    setConsent('granted');
  };

  const handleDeny = () => {
    setCookieConsent('denied');
    setConsent('denied');
  };

  return (
    <>
      {/* Banner de Consentimento de Cookies (LGPD) */}
      {consent === 'pending' && (
        <aside
          aria-label="Aviso de cookies e privacidade"
          className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-5 sm:max-w-md z-50 rounded-2xl bg-[var(--indigo-900)] text-white p-4 sm:p-5 shadow-soft-lg border border-white/15 animate-fade-up"
        >
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[var(--mint-400)]/20 text-[var(--mint-400)] flex items-center justify-center shrink-0 mt-0.5">
              <Shield className="w-5 h-5" />
            </div>
            <div className="text-xs leading-relaxed text-white/90">
              <p className="font-extrabold text-sm text-white mb-1">
                Sua privacidade em primeiro lugar
              </p>
              <p>
                Usamos cookies essenciais para salvar o progresso do seu teste e,
                apenas com sua permissão, cookies de medição (Meta Pixel) sem
                jamais enviar suas respostas ou dados de saúde. Veja nossa{' '}
                <Link
                  href="/privacidade"
                  className="underline text-[var(--mint-400)] font-bold"
                >
                  Política de Privacidade
                </Link>
                .
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleGrant}
                  className="px-4 py-2 rounded-full bg-[var(--mint-400)] text-[var(--indigo-900)] font-extrabold text-xs hover:bg-[#5ce5ac] transition-colors min-h-[40px]"
                >
                  Aceitar cookies
                </button>
                <button
                  type="button"
                  onClick={handleDeny}
                  className="px-3.5 py-2 rounded-full bg-white/10 text-white/85 font-bold text-xs hover:bg-white/20 transition-colors min-h-[40px]"
                >
                  Apenas essenciais
                </button>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* HUD Visual para Modo Debug (?debug=1) */}
      {debugActive && (
        <div className="fixed top-20 right-3 z-50 w-80 max-w-[92vw] rounded-2xl bg-[#130C38]/95 text-white border border-[var(--mint-400)]/40 shadow-2xl text-xs font-mono overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 bg-[var(--indigo-900)] border-b border-white/10">
            <div className="flex items-center gap-1.5 font-sans font-extrabold text-[var(--mint-400)]">
              <Terminal className="w-3.5 h-3.5" />
              <span>Rastreamento (?debug=1)</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setDebugMinimized(!debugMinimized)}
                className="px-1.5 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[10px]"
              >
                {debugMinimized ? 'Abrir' : 'Min'}
              </button>
              <button
                type="button"
                onClick={() => setDebugActive(false)}
                aria-label="Fechar painel debug"
                className="p-0.5 rounded hover:bg-white/20"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {!debugMinimized && (
            <div className="p-3 space-y-2 max-h-72 overflow-y-auto">
              <div className="flex items-center justify-between text-[11px] pb-2 border-b border-white/10">
                <span>Consentimento LGPD:</span>
                <span
                  className={`px-1.5 py-0.5 rounded font-bold ${
                    consent === 'granted'
                      ? 'bg-[var(--mint-400)] text-[var(--indigo-900)]'
                      : 'bg-[var(--emergency-600)] text-white'
                  }`}
                >
                  {consent.toUpperCase()}
                </span>
              </div>

              {debugLogs.length === 0 ? (
                <p className="text-white/50 italic">Nenhum evento ainda...</p>
              ) : (
                debugLogs.map((item) => (
                  <div
                    key={item.id}
                    className="p-2 rounded-lg bg-white/5 border border-white/10 space-y-0.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[var(--mint-400)]">
                        {item.event}
                      </span>
                      <span className="text-[10px] text-white/60">
                        {item.timestamp}
                      </span>
                    </div>
                    <div className="text-[10px] text-white/80 break-all">
                      params: {JSON.stringify(item.params)}
                    </div>
                    <div className="text-[9px] text-white/50 truncate">
                      id: {item.id}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}

