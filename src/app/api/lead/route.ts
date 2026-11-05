import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Rate limit básico por IP em memória (Seção 11: segurança)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string, maxReq = 25, windowMs = 60_000): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= maxReq) {
    return false;
  }
  entry.count += 1;
  return true;
}

// Salva backup local seguro em JSON e CSV dentro do servidor
function saveLeadLocally(leadData: {
  timestamp: string;
  name: string;
  email: string;
  whatsapp: string;
  source: string;
}) {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // 1. Arquivo JSON
    const jsonPath = path.join(dataDir, 'leads.json');
    let leads: Array<{
      timestamp: string;
      name: string;
      email: string;
      whatsapp: string;
      source: string;
    }> = [];
    if (fs.existsSync(jsonPath)) {
      try {
        const fileContent = fs.readFileSync(jsonPath, 'utf8');
        leads = JSON.parse(fileContent);
      } catch {
        leads = [];
      }
    }
    leads.push(leadData);
    fs.writeFileSync(jsonPath, JSON.stringify(leads, null, 2), 'utf8');

    // 2. Arquivo CSV (compatível com Excel)
    const csvPath = path.join(dataDir, 'leads.csv');
    const header = 'Data;Nome;Email;WhatsApp;Origem\n';
    const row = `"${leadData.timestamp}";"${leadData.name}";"${leadData.email}";"${leadData.whatsapp}";"${leadData.source}"\n`;
    if (!fs.existsSync(csvPath)) {
      fs.writeFileSync(csvPath, '\uFEFF' + header + row, 'utf8');
    } else {
      fs.appendFileSync(csvPath, row, 'utf8');
    }
  } catch (err) {
    console.error('[API Lead] Erro ao salvar backup local:', err);
  }
}

/**
 * Seção 5 — `/api/lead`:
 * Grava lead (com consentimento LGPD), salva backup local (/data/leads.json e CSV)
 * e dispara envio para o Webhook do Google Sheets / Notificação por e-mail para mounfit.suporte@gmail.com.
 */
export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { ok: false, error: 'Too many requests' },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const { source, name, whatsapp, email, consented } = body || {};

    if (consented !== true) {
      return NextResponse.json(
        { ok: false, error: 'Consentimento LGPD obrigatório' },
        { status: 400 }
      );
    }

    const cleanName = typeof name === 'string' ? name.trim().slice(0, 80) : '';
    const cleanPhone =
      typeof whatsapp === 'string'
        ? whatsapp.replace(/\D/g, '').slice(0, 15)
        : '';
    const cleanEmail =
      typeof email === 'string' ? email.trim().toLowerCase().slice(0, 120) : '';

    if (!cleanPhone && !cleanEmail) {
      return NextResponse.json(
        { ok: false, error: 'Informe WhatsApp ou e-mail' },
        { status: 400 }
      );
    }

    const leadRecord = {
      timestamp: new Date().toLocaleString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
      }),
      name: cleanName || 'Não informado',
      email: cleanEmail || 'Não informado',
      whatsapp: cleanPhone || 'Não informado',
      source: typeof source === 'string' ? source.slice(0, 40) : 'lead_magnet_ficha',
    };

    // 1. Grava no backup local da aplicação (JSON e CSV em /data)
    saveLeadLocally(leadRecord);

    // 2. Dispara para o Webhook do Google Sheets / Automação
    const webhookUrls = [
      process.env.LEAD_WEBHOOK_URL,
      process.env.GOOGLE_SHEETS_WEBHOOK_URL,
    ].filter(Boolean) as string[];

    for (const url of webhookUrls) {
      if (url && url.startsWith('http')) {
        await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'lead_captured',
            name: leadRecord.name,
            email: leadRecord.email,
            whatsapp: leadRecord.whatsapp,
            source: leadRecord.source,
            timestamp: leadRecord.timestamp,
            target_notification_email: 'mounfit.suporte@gmail.com',
          }),
        }).catch((err) => {
          console.error('[API Lead] Erro ao enviar para webhook:', err);
        });
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Payload inválido' },
      { status: 400 }
    );
  }
}
