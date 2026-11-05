import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

function sha256Hash(value: string): string {
  return crypto
    .createHash('sha256')
    .update(value.trim().toLowerCase())
    .digest('hex');
}

/**
 * Seção 5, Seção 6 e Seção 10 — `/api/cakto-webhook`:
 * - Recebe eventos da Cakto (`purchase_approved`, `checkout_abandonment`, `purchase_refunded`)
 * - Valida assinatura/segredo (`CAKTO_WEBHOOK_SECRET`)
 * - Dispara automações (remover comprador da sequência M1..M6 ou enviar 1 mensagem de ajuda no abandono)
 * - Se `CAKTO_WEBHOOK_SEND_CAPI_PURCHASE=true`, envia `Purchase` via CAPI usando o ID do pedido como `event_id`
 *   (evitando duplicidade caso já esteja usando a integração nativa da Cakto).
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const expectedSecret = process.env.CAKTO_WEBHOOK_SECRET;

    const incomingSecret =
      body?.secret ||
      req.headers.get('x-cakto-secret') ||
      req.headers.get('authorization')?.replace(/^Bearer\s+/i, '');

    if (!expectedSecret || incomingSecret !== expectedSecret) {
      return NextResponse.json(
        { ok: false, error: 'Unauthorized webhook secret' },
        { status: 401 }
      );
    }

    const eventType: string = body?.event || '';
    const data = body?.data || {};
    const orderId: string = String(
      data?.id || data?.order_id || data?.transaction_id || Date.now()
    );

    const leadWebhookUrl = process.env.LEAD_WEBHOOK_URL;

    if (eventType === 'purchase_approved') {
      // 1. Notifica automação de CRM/nutrição para remover comprador da sequência M1..M6 (Seção 10)
      if (leadWebhookUrl && leadWebhookUrl.startsWith('http')) {
        await fetch(leadWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'purchase_approved',
            action: 'remove_from_sales_sequence',
            order_id: orderId,
            customer: {
              name: data?.customer?.name,
              email: data?.customer?.email,
              phone: data?.customer?.phone,
            },
            tracking: data?.tracking || {},
            timestamp: new Date().toISOString(),
          }),
        }).catch(() => {});
      }

      // 2. Opcional: Enviar Purchase via CAPI (apenas se CAKTO_WEBHOOK_SEND_CAPI_PURCHASE=true para evitar contagem dupla)
      const sendCapiPurchase =
        process.env.CAKTO_WEBHOOK_SEND_CAPI_PURCHASE === 'true';
      const pixelId =
        process.env.META_PIXEL_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID;
      const capiToken = process.env.META_CAPI_TOKEN;

      if (sendCapiPurchase && pixelId && capiToken) {
        const userData: Record<string, unknown> = {};
        if (data?.customer?.email) {
          userData.em = [sha256Hash(String(data.customer.email))];
        }
        if (data?.customer?.phone) {
          const digits = String(data.customer.phone).replace(/\D/g, '');
          if (digits.length >= 10) {
            userData.ph = [
              sha256Hash(digits.startsWith('55') ? digits : `55${digits}`),
            ];
          }
        }

        const amount = Number(data?.amount || data?.price || 0);
        await fetch(
          `https://graph.facebook.com/v20.0/${encodeURIComponent(pixelId)}/events?access_token=${encodeURIComponent(capiToken)}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              data: [
                {
                  event_name: 'Purchase',
                  event_time: Math.floor(Date.now() / 1000),
                  // Usa ID do pedido como event_id para deduplicação exata (Seção 6)
                  event_id: `cakto_${orderId}`,
                  action_source: 'website',
                  user_data: userData,
                  custom_data: {
                    currency: 'BRL',
                    value: amount > 0 ? amount : undefined,
                  },
                },
              ],
            }),
          }
        ).catch(() => {});
      }
    } else if (eventType === 'checkout_abandonment') {
      // Seção 10: Abandono de checkout dispara 1 mensagem de ajuda, não de pressão
      if (leadWebhookUrl && leadWebhookUrl.startsWith('http')) {
        await fetch(leadWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'checkout_abandonment',
            action: 'send_single_help_message',
            order_id: orderId,
            customer: {
              name: data?.customer?.name,
              email: data?.customer?.email,
              phone: data?.customer?.phone,
            },
            tracking: data?.tracking || {},
            timestamp: new Date().toISOString(),
          }),
        }).catch(() => {});
      }
    }

    return NextResponse.json({ ok: true, received: eventType });
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid webhook payload' },
      { status: 400 }
    );
  }
}

