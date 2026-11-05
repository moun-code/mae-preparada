/**
 * Captura e Persistência de Atribuição (UTMs, fbclid, fbp, fbc, src, sck)
 * E montagem segura do link de checkout da Cakto conforme documentação oficial (Fase 0).
 */

export interface AttributionData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  fbclid?: string;
  src?: string;
  sck?: string;
  fbp?: string;
  fbc?: string;
  first_touch_at?: string;
}

const ATTRIBUTION_STORAGE_KEY = 'mp_attribution_v1';

function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : undefined;
}

function setCookie(name: string, value: string, days = 90) {
  if (typeof document === 'undefined') return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

export function captureAttributionOnVisit(): AttributionData {
  if (typeof window === 'undefined') return {};

  try {
    const existingRaw = localStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    const existing: AttributionData = existingRaw ? JSON.parse(existingRaw) : {};

    const params = new URLSearchParams(window.location.search);
    const updated: AttributionData = {
      ...existing,
      first_touch_at: existing.first_touch_at || new Date().toISOString(),
    };

    const keys: (keyof AttributionData)[] = [
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_term',
      'utm_content',
      'fbclid',
      'src',
      'sck',
    ];

    for (const key of keys) {
      const val = params.get(key);
      if (val && val.trim().length > 0) {
        // Sanitiza para nunca carregar termos sensíveis
        updated[key] = val.trim().slice(0, 120);
      }
    }

    // Captura _fbp ou gera fbc se fbclid estiver presente
    const fbpCookie = getCookie('_fbp');
    if (fbpCookie) {
      updated.fbp = fbpCookie;
    } else if (!updated.fbp) {
      const generatedFbp = `fb.1.${Date.now()}.${Math.floor(Math.random() * 1000000000)}`;
      updated.fbp = generatedFbp;
    }

    const fbcCookie = getCookie('_fbc');
    if (fbcCookie) {
      updated.fbc = fbcCookie;
    } else if (updated.fbclid && !updated.fbc) {
      const generatedFbc = `fb.1.${Date.now()}.${updated.fbclid}`;
      updated.fbc = generatedFbc;
      setCookie('_fbc', generatedFbc, 90);
    }

    localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return {};
  }
}

export function getStoredAttribution(): AttributionData {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/**
 * Monta a URL de checkout da Cakto anexando SOMENTE os parâmetros confirmados
 * na documentação oficial da Cakto (Fase 0):
 * - Rastreamento: src, sck, utm_source, utm_medium, utm_campaign, utm_term, utm_content
 * - Pré-preenchimento opcional (apenas quando a usuária deu consentimento): name, email, confirmEmail, phone
 * NUNCA envia respostas do quiz, idade do filho ou erros.
 */
export function buildCaktoCheckoutUrl(
  baseCheckoutUrl: string,
  options?: {
    sckLocation?: string;
    prefillLead?: {
      name?: string;
      email?: string;
      phone?: string;
      consented?: boolean;
    };
  }
): string {
  const attribution = getStoredAttribution();
  try {
    const url = new URL(baseCheckoutUrl);

    const caktoTrackingParams: (keyof AttributionData)[] = [
      'src',
      'sck',
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_term',
      'utm_content',
    ];

    for (const key of caktoTrackingParams) {
      const value = attribution[key];
      if (value) {
        url.searchParams.set(key, value);
      }
    }

    // Se ainda não houver sck e passarmos a localização do CTA (ex.: hero, s13), usamos como sck neutro
    if (options?.sckLocation && !url.searchParams.get('sck')) {
      url.searchParams.set('sck', options.sckLocation);
    }

    // Se houver fbclid e src estiver vazio, preservamos no src para conciliação
    if (attribution.fbclid && !url.searchParams.get('src')) {
      url.searchParams.set('src', attribution.utm_content || 'meta_ads');
    }

    // Preserva quaisquer UTMs ou parâmetros de rastreamento adicionais (Utmify / Google / Meta) presentes na URL atual
    if (typeof window !== 'undefined' && window.location.search) {
      const currentParams = new URLSearchParams(window.location.search);
      currentParams.forEach((val, k) => {
        if (!url.searchParams.has(k) && val && val.trim().length > 0) {
          url.searchParams.set(k, val.trim());
        }
      });
    }

    // Pré-preenchimento documentado pela Cakto (somente com consentimento LGPD)
    const lead = options?.prefillLead;
    if (lead?.consented) {
      if (lead.name && lead.name.trim()) {
        url.searchParams.set('name', lead.name.trim());
      }
      if (lead.email && lead.email.trim()) {
        url.searchParams.set('email', lead.email.trim());
        url.searchParams.set('confirmEmail', lead.email.trim());
      }
      if (lead.phone && lead.phone.trim()) {
        const cleanDigits = lead.phone.replace(/\D/g, '');
        if (cleanDigits.length >= 10) {
          const withCountry = cleanDigits.startsWith('55')
            ? cleanDigits
            : `55${cleanDigits}`;
          url.searchParams.set('phone', withCountry);
        }
      }
    }

    return url.toString();
  } catch {
    return baseCheckoutUrl;
  }
}

