import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { EVENT_DICTIONARY, TrackingEventName } from '@/tracking/events';

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string, maxReq = 60, windowMs = 60_000): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= maxReq) return false;
  entry.count += 1;
  return true;
}

function sha256Hash(value: string): string {
  return crypto
    .createHash('sha256')
    .update(value.trim().toLowerCase())
    .digest('hex');
}

/**
 * Seção 5 e Seção 6 — `/api/capi`:
 * Envia eventos do servidor à Meta Conversions API (CAPI) com:
 * - Deduplicação por `event_id`
 * - Sanitização estrita de `custom_data` (nunca envia dados médicos, perguntas, respostas ou erros)
 * - Hash SHA-256 de e-mail, telefone e primeiro nome APENAS no evento `Lead`
 * - Sem dados pessoais em logs
 */
export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1';
  const userAgent = req.headers.get('user-agent') || '';

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { ok: false, error: 'Rate limit exceeded' },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const {
      event_name,
      event_id,
      event_source_url,
      custom_data,
      fbp,
      fbc,
      user_data,
    } = body || {};

    if (!event_name || !(event_name in EVENT_DICTIONARY)) {
      return NextResponse.json(
        { ok: false, error: 'Evento não permitido' },
        { status: 400 }
      );
    }

    const def = EVENT_DICTIONARY[event_name as TrackingEventName];

    // Filtra apenas chaves permitidas (Allowlist estrita de neutralidade de saúde)
    const sanitizedCustomData: Record<string, unknown> = {};
    if (custom_data && typeof custom_data === 'object') {
      for (const allowedKey of def.allowedKeys) {
        if (custom_data[allowedKey] !== undefined) {
          sanitizedCustomData[allowedKey] = custom_data[allowedKey];
        }
      }
    }

    // Sanitiza event_source_url para manter apenas origin + pathname neutro
    let cleanSourceUrl = '';
    if (typeof event_source_url === 'string') {
      try {
        const parsedUrl = new URL(event_source_url);
        cleanSourceUrl = `${parsedUrl.origin}${parsedUrl.pathname}`;
      } catch {
        cleanSourceUrl = '';
      }
    }

    // Monta user_data da CAPI
    const capiUserData: Record<string, unknown> = {
      client_ip_address: ip,
      client_user_agent: userAgent,
    };
    if (typeof fbp === 'string' && fbp.startsWith('fb.')) {
      capiUserData.fbp = fbp;
    }
    if (typeof fbc === 'string' && fbc.startsWith('fb.')) {
      capiUserData.fbc = fbc;
    }

    // Advanced Matching com hash SHA-256 APENAS no evento `Lead` (Regra 7 da Seção 6)
    if (event_name === 'Lead' && user_data && typeof user_data === 'object') {
      if (typeof user_data.email === 'string' && user_data.email.includes('@')) {
        capiUserData.em = [sha256Hash(user_data.email)];
      }
      if (typeof user_data.phone === 'string') {
        const digits = user_data.phone.replace(/\D/g, '');
        if (digits.length >= 10) {
          const normalizedPhone = digits.startsWith('55')
            ? digits
            : `55${digits}`;
          capiUserData.ph = [sha256Hash(normalizedPhone)];
        }
      }
      if (typeof user_data.firstName === 'string' && user_data.firstName.trim()) {
        const firstToken = user_data.firstName.trim().split(/\s+/)[0];
        capiUserData.fn = [sha256Hash(firstToken)];
      }
    }

    const pixelId =
      process.env.META_PIXEL_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID;
    const capiToken = process.env.META_CAPI_TOKEN;
    const testEventCode = process.env.META_TEST_EVENT_CODE;

    // Se ainda não configurado no .env, retorna sucesso simulado para não quebrar o dev
    if (!pixelId || !capiToken) {
      return NextResponse.json({
        ok: true,
        simulated: true,
        event_name,
        event_id,
      });
    }

    const metaPayload: Record<string, unknown> = {
      data: [
        {
          event_name,
          event_time: Math.floor(Date.now() / 1000),
          event_id: String(event_id || `srv_${Date.now()}`),
          action_source: 'website',
          event_source_url: cleanSourceUrl || undefined,
          user_data: capiUserData,
          custom_data:
            Object.keys(sanitizedCustomData).length > 0
              ? sanitizedCustomData
              : undefined,
        },
      ],
    };

    if (testEventCode && testEventCode.trim().length > 0) {
      metaPayload.test_event_code = testEventCode.trim();
    }

    const response = await fetch(
      `https://graph.facebook.com/v20.0/${encodeURIComponent(pixelId)}/events?access_token=${encodeURIComponent(capiToken)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(metaPayload),
      }
    );

    return NextResponse.json({
      ok: response.ok,
      status: response.status,
      event_id,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Erro ao processar evento CAPI' },
      { status: 400 }
    );
  }
}

