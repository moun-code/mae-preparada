/**
 * Módulo Único de Rastreamento (`src/tracking/track.ts`)
 * - Nenhum `fbq` solto pelo código
 * - Respeita consentimento de cookies (LGPD)
 * - Deduplicação navegador (Pixel) + servidor (`/api/capi`) com `event_id` único
 * - Guarda anti-duplicidade por etapa/sessão
 * - Modo debug (`?debug=1`) com log no console e painel visual
 * - Neutralidade total de dados de saúde (Meta Core Setup)
 */

import {
  EVENT_DICTIONARY,
  EventParamsMap,
  TrackingEventName,
} from './events';
import { getStoredAttribution } from './attribution';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

const CONSENT_STORAGE_KEY = 'mp_cookie_consent_v1';
const SESSION_FIRED_KEY = 'mp_fired_events_v1';

export type ConsentStatus = 'pending' | 'granted' | 'denied';

export interface DebugEventLog {
  id: string;
  event: TrackingEventName;
  type: 'standard' | 'custom';
  params: Record<string, unknown>;
  consent: ConsentStatus;
  sentToMeta: boolean;
  timestamp: string;
}

const debugSubscribers: Array<(log: DebugEventLog) => void> = [];

export function subscribeToDebugEvents(cb: (log: DebugEventLog) => void) {
  debugSubscribers.push(cb);
  return () => {
    const idx = debugSubscribers.indexOf(cb);
    if (idx >= 0) debugSubscribers.splice(idx, 1);
  };
}

export function isDebugMode(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get('debug') === '1') {
      sessionStorage.setItem('mp_debug_mode', '1');
      return true;
    }
    return sessionStorage.getItem('mp_debug_mode') === '1';
  } catch {
    return false;
  }
}

export function getCookieConsent(): ConsentStatus {
  if (typeof window === 'undefined') return 'pending';
  try {
    const val = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (val === 'granted' || val === 'denied') return val;
    return 'pending';
  } catch {
    return 'pending';
  }
}

export function setCookieConsent(status: 'granted' | 'denied'): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, status);
    if (status === 'granted') {
      initMetaPixelIfConsented();
      if (typeof window.fbq === 'function') {
        window.fbq('consent', 'grant');
      }
      // Dispara PageView inicial após o aceite
      track('PageView', {});
    } else if (status === 'denied' && typeof window.fbq === 'function') {
      window.fbq('consent', 'revoke');
    }
  } catch {
    // Falha em silêncio
  }
}

let pixelInitialized = false;

export function initMetaPixelIfConsented(): void {
  if (typeof window === 'undefined' || pixelInitialized) return;
  // Dispara por padrão a menos que o usuário tenha explicitamente negado ('denied')
  if (getCookieConsent() === 'denied') return;

  const pixelId =
    process.env.NEXT_PUBLIC_META_PIXEL_ID || '4483190488603377';
  if (!pixelId) {
    pixelInitialized = true;
    return;
  }

  try {
    /* eslint-disable */
    (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod
          ? n.callMethod.apply(n, arguments)
          : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(
      window,
      document,
      'script',
      'https://connect.facebook.net/en_US/fbevents.js'
    );
    /* eslint-enable */

    if (typeof window.fbq === 'function') {
      // Desativa coleta automática de metadados/títulos sensíveis (regra 6 da seção 6)
      window.fbq('set', 'autoConfig', false, pixelId);
      window.fbq('consent', 'grant');
      window.fbq('init', pixelId);
      pixelInitialized = true;
    }
  } catch {
    // Se bloqueado por AdBlock, falha em silêncio sem quebrar a página
  }
}

function generateEventId(eventName: string): string {
  const rand = Math.random().toString(36).substring(2, 10);
  return `mp_${eventName.toLowerCase()}_${Date.now()}_${rand}`;
}

function buildDedupeSessionKey(
  eventName: TrackingEventName,
  sanitizedParams: Record<string, unknown>
): string {
  if (eventName === 'QuizStep') return `QuizStep_${sanitizedParams.step}`;
  if (eventName === 'ScrollDepth')
    return `ScrollDepth_${sanitizedParams.page}_${sanitizedParams.pct}`;
  if (eventName === 'SectionView')
    return `SectionView_${sanitizedParams.section}`;
  if (eventName === 'FAQOpen') return `FAQOpen_${sanitizedParams.q}`;
  if (eventName === 'ViewContent')
    return `ViewContent_${sanitizedParams.content_name}`;
  return eventName;
}

function hasFiredInSession(key: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const raw = sessionStorage.getItem(SESSION_FIRED_KEY);
    const map: Record<string, boolean> = raw ? JSON.parse(raw) : {};
    return Boolean(map[key]);
  } catch {
    return false;
  }
}

function markFiredInSession(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    const raw = sessionStorage.getItem(SESSION_FIRED_KEY);
    const map: Record<string, boolean> = raw ? JSON.parse(raw) : {};
    map[key] = true;
    sessionStorage.setItem(SESSION_FIRED_KEY, JSON.stringify(map));
  } catch {
    // Ignorar erro de storage
  }
}

/**
 * Sanitiza os parâmetros garantindo que APENAS as chaves permitidas no dicionário passem
 * e validando que não há termos clínicos/saúde.
 */
function sanitizeEventParams(
  eventName: TrackingEventName,
  rawParams: Record<string, unknown>
): Record<string, unknown> {
  const def = EVENT_DICTIONARY[eventName];
  if (!def) return {};

  const clean: Record<string, unknown> = {};
  for (const key of def.allowedKeys) {
    if (rawParams[key] !== undefined && rawParams[key] !== null) {
      if (key === 'step' || key === 'q' || key === 'pct') {
        clean[key] = Number(rawParams[key]);
      } else {
        clean[key] = rawParams[key];
      }
    }
  }
  return clean;
}

export interface TrackOptions {
  eventId?: string;
  useBeacon?: boolean;
  /**
   * Dados de usuário para Advanced Matching APENAS no evento `Lead` e após consentimento LGPD
   */
  userData?: {
    email?: string;
    phone?: string;
    firstName?: string;
  };
}

export function track<K extends TrackingEventName>(
  eventName: K,
  params: EventParamsMap[K],
  options?: TrackOptions
): string | null {
  if (typeof window === 'undefined') return null;

  const def = EVENT_DICTIONARY[eventName];
  if (!def) return null;

  const cleanParams = sanitizeEventParams(
    eventName,
    (params || {}) as Record<string, unknown>
  );

  // Guarda anti-duplicidade por sessão/etapa
  const sessionKey = buildDedupeSessionKey(eventName, cleanParams);
  if (def.oncePerSession && hasFiredInSession(sessionKey)) {
    return null;
  }

  const consent = getCookieConsent();
  const eventId = options?.eventId || generateEventId(eventName);
  // Dispara eventos para a Meta por padrão, a menos que o usuário tenha recusado cookies
  const canSendToMeta = consent !== 'denied';

  if (canSendToMeta && def.oncePerSession) {
    markFiredInSession(sessionKey);
  }

  // Modo Debug (?debug=1)
  const debugLog: DebugEventLog = {
    id: eventId,
    event: eventName,
    type: def.type,
    params: cleanParams,
    consent,
    sentToMeta: canSendToMeta,
    timestamp: new Date().toLocaleTimeString('pt-BR'),
  };

  if (isDebugMode()) {
    console.info(
      `%c[MP Track] ${eventName}`,
      'background:#2A1A73;color:#6EF0B9;padding:2px 6px;border-radius:4px;font-weight:bold;',
      {
        event_id: eventId,
        type: def.type,
        params: cleanParams,
        consent,
        sentToMeta: canSendToMeta,
      }
    );
  }

  debugSubscribers.forEach((cb) => cb(debugLog));

  // Sem aceite de cookies, nada é enviado para Meta Pixel nem CAPI (Regra 2 da Seção 6)
  if (!canSendToMeta) {
    return eventId;
  }

  // 1. Disparo no Navegador (Meta Pixel) com eventID para deduplicação
  try {
    initMetaPixelIfConsented();
    if (typeof window.fbq === 'function') {
      const fbqMethod = def.type === 'standard' ? 'track' : 'trackCustom';
      window.fbq(fbqMethod, eventName, cleanParams, { eventID: eventId });
    }
  } catch {
    // Falha silenciosa se bloqueado por AdBlock
  }

  // 2. Disparo no Servidor (/api/capi) com o mesmo event_id
  try {
    const attribution = getStoredAttribution();
    // URL neutra (apenas origin + pathname, sem query strings ou hashes médicos)
    const neutralUrl = `${window.location.origin}${window.location.pathname}`;

    const capiPayload = {
      event_name: eventName,
      event_id: eventId,
      event_source_url: neutralUrl,
      custom_data: cleanParams,
      fbp: attribution.fbp,
      fbc: attribution.fbc,
      // Advanced Matching somente no evento Lead
      user_data: eventName === 'Lead' ? options?.userData : undefined,
    };

    const bodyStr = JSON.stringify(capiPayload);

    if (options?.useBeacon && typeof navigator.sendBeacon === 'function') {
      const blob = new Blob([bodyStr], { type: 'application/json' });
      navigator.sendBeacon('/api/capi', blob);
    } else {
      fetch('/api/capi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: bodyStr,
        keepalive: true,
      }).catch(() => {
        // Silencioso
      });
    }
  } catch {
    // Silencioso
  }

  return eventId;
}

