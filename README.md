# Segundos que Salvam — Funil Completo (Quiz + Resultado + Landing Page + Pixel/CAPI + Cakto)

Funil de resposta direta de alta conversão e alta performance para o infoproduto **“Segundos que Salvam: O guia prático para mães que não podem depender da sorte no pior momento”**, publicado pela **Mãe Preparada — Educação em Segurança e Saúde Infantil**.

---

## 1. Estrutura do Projeto e Entregáveis

- **`research/benchmark.md`** — *(Fase 0)* Pesquisa de 15 páginas de venda materno-infantis (Brasil + exterior), 10 quizzes de diagnóstico, padrões da Biblioteca de Anúncios da Meta, documentação oficial da Cakto (UTMs, pré-preenchimento e webhooks) e regras de Saúde/Core Setup da Meta.
- **`docs/arquitetura-e-plano.md`** — *(Fase 1)* Arquitetura técnica, sitemap e wireframes em texto de todas as rotas.
- **`docs/tracking.md`** — *(Fase 1 & Seção 6)* Dicionário completo de 18 eventos (Pixel + CAPI), blindagem de dados de saúde, públicos personalizados de 30 dias, regra anti-duplicidade com a Cakto e passo a passo de teste no Gerenciador de Eventos.
- **`docs/pendencias.md`** — *(Fase 1 & Apêndice C)* Mapa completo de todos os marcadores `⟦ ⟧` (`<Pendente>`) e onde substituí-los em `src/config/siteConfig.ts`.
- **`docs/nutricao-mensagens.md`** — *(Seção 10)* Templates prontos das mensagens M1 a M6 (WhatsApp/e-mail) e recuperação de abandono de checkout.
- **`docs/qa-report.md`** — *(Fase 3 & Seção 12)* Relatório completo de QA e validação dos 9 critérios de aceite.

---

## 2. Rotas da Aplicação

| Rota | Descrição | Indexação SEO |
| :--- | :--- | :--- |
| `/` | Redireciona automaticamente para `/guia` preservando UTMs e `fbclid` | — |
| `/guia` | Landing Page completa para tráfego frio/orgânico (16 seções `s0`..`s15` + JSON-LD) | `index, follow` |
| `/quiz` | Quiz interativo mobile-first (3 perguntas de perfil + 8 situações reais + feedback imediato + respiro + captura LGPD + preparo de 3s) | `noindex, nofollow` |
| `/resultado` | Diagnóstico personalizado (Anel `X de 8` + faixa `r1/r2/r3` + até 3 cartões de situações que errou + alerta de rede de apoio) + oferta completa na mesma página | `noindex, nofollow` |
| `/obrigada` | Página pós-compra calorosa com instruções de uso offline, impressão da Ficha de Emergência e compartilhamento no WhatsApp | `noindex, nofollow` |
| `/sobre` | Quem somos (**Mãe Preparada**), metodologia em 4 passos e fontes públicas oficiais | `index, follow` |
| `/privacidade` | Política de Privacidade (LGPD), explicação de Pixel/CAPI, cookies e direitos do titular | `index, follow` |
| `/termos` | Termos de Uso, licença familiar, garantia legal (CDC art. 49) e aviso médico | `index, follow` |
| `/contato` | Atendimento, suporte e canal de exclusão imediata de dados (LGPD) | `index, follow` |

### Endpoints Serverless (API)
- `POST /api/lead` — Valida consentimento LGPD e envia o lead capturado para o seu CRM/planilha/n8n via `LEAD_WEBHOOK_URL`.
- `POST /api/capi` — Envia eventos server-side para a Meta Conversions API com deduplicação (`event_id`), sanitização estrita de parâmetros médicos e Advanced Matching com hash SHA-256 no evento `Lead`.
- `POST /api/cakto-webhook` — Recebe webhooks da Cakto (`purchase_approved`, `checkout_abandonment`), valida `CAKTO_WEBHOOK_SECRET`, aciona automações de saída da régua de vendas e opcionalmente envia `Purchase` via CAPI.

---

## 3. Como Rodar Localmente

```bash
# 1. Instalar dependências
npm install

# 2. Copiar variáveis de ambiente (já pré-configurado em .env.local para dev)
cp .env.example .env.local

# 3. Iniciar servidor de desenvolvimento
npm run dev
```

Acesse:
- Landing Page: `http://localhost:3000/guia`
- Quiz Interativo: `http://localhost:3000/quiz`
- Modo Debug de Rastreamento (HUD Visual + Console): `http://localhost:3000/quiz?debug=1`

---

## 4. Variáveis de Ambiente (`.env.local` / Produção)

```env
# Meta Pixel & API de Conversões (CAPI)
NEXT_PUBLIC_META_PIXEL_ID=seu_pixel_id
META_PIXEL_ID=seu_pixel_id
META_CAPI_TOKEN=seu_token_capi
META_TEST_EVENT_CODE=TEST12345

# Cakto Checkout & Webhook
NEXT_PUBLIC_CAKTO_CHECKOUT_URL=https://pay.cakto.com.br/ID_DA_SUA_OFERTA
CAKTO_CHECKOUT_URL=https://pay.cakto.com.br/ID_DA_SUA_OFERTA
CAKTO_WEBHOOK_SECRET=seu_segredo_webhook_cakto
CAKTO_WEBHOOK_SEND_CAPI_PURCHASE=false

# Webhook de Leads (n8n / Make / Google Sheets / ActiveCampaign)
LEAD_WEBHOOK_URL=https://seu-webhook.com/lead

# Trava de Produção Anti-Placeholders ⟦ ⟧
# Em desenvolvimento deixe true; para produção final mude para false após preencher src/config/siteConfig.ts
ALLOW_PLACEHOLDERS=true
NEXT_PUBLIC_ALLOW_PLACEHOLDERS=true
NEXT_PUBLIC_SPECIALIST_ENABLED=false
```

---

## 5. Verificação Automatizada de QA e Build

- **Verificar copy (termos proibidos) e isolamento do Pixel:**
  ```bash
  npm run verify:copy
  ```
- **Simular trava estrita de produção (`ALLOW_PLACEHOLDERS=false`):**
  ```bash
  npm run verify:prod
  ```
- **Gerar build otimizado:**
  ```bash
  npm run build
  ```

---

## 6. Deploy (Vercel / Netlify / Cloudflare Pages)

1. Suba o repositório para o GitHub/GitLab.
2. Importe o projeto na **Vercel** (framework detectado automaticamente como *Next.js*).
3. Configure as variáveis de ambiente listadas na seção 4 no painel da Vercel.
4. No painel da **Cakto**:
   - Na aba **Links** do produto, cadastre o domínio oficial do site.
   - Configure a página de redirecionamento pós-compra para `https://seudominio.com.br/obrigada`.
   - Em **Integrações > Webhooks**, aponte para `https://seudominio.com.br/api/cakto-webhook` com os eventos `purchase_approved` e `checkout_abandonment`.

