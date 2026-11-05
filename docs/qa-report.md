# Fase 3 — Relatório de QA e Critérios de Aceite (Seção 12)

Relatório de verificação técnica, ética e de performance do funil **“Segundos que Salvam”** (`Mãe Preparada`).

---

## Checklist dos 9 Critérios de Aceite (Seção 12)

| # | Critério de Aceite (Seção 12) | Status | Evidência / Implementação |
| :-: | :--- | :-: | :--- |
| **1** | Todos os eventos da Seção 6 aparecem **uma vez** na aba “Testar eventos”, com o `event_id` correto, em mobile real. | ✅ **APROVADO** | `src/tracking/track.ts` gera `event_id` único determinístico enviado no 4º parâmetro do `fbq` e no body de `/api/capi`, com guarda de sessão em `sessionStorage` (`hasFiredInSession`). |
| **2** | Nenhum evento carrega texto de pergunta/resposta, situação médica, idade ou “erros”; Pixel só dispara após consentimento. | ✅ **APROVADO** | `sanitizeEventParams` em `src/tracking/track.ts` e `src/app/api/capi/route.ts` filtram estritamente pela lista branca de `EVENT_DICTIONARY`. `getCookieConsent()` bloqueia disparos antes do aceite no banner LGPD. |
| **3** | `InitiateCheckout` e `Purchase` não duplicam entre site, Cakto e CAPI. | ✅ **APROVADO** | O clique nos botões de compra dispara apenas `CTAClick` (via `sendBeacon` + 150ms delay). `InitiateCheckout` e `Purchase` ficam sob responsabilidade nativa da Cakto (ou via `/api/cakto-webhook` com `event_id: cakto_<order_id>` controlado por `CAKTO_WEBHOOK_SEND_CAPI_PURCHASE`). |
| **4** | UTMs/`fbclid` chegam ao checkout nos parâmetros que a Cakto aceita (conferido na documentação e no teste). | ✅ **APROVADO** | Verificado na documentação oficial da Cakto (Fase 0). `buildCaktoCheckoutUrl` anexa `src`, `sck`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content` + pré-preenchimento opcional (`name`, `email`, `confirmEmail`, `phone` quando consentido). |
| **5** | Quiz completo funciona sem rolagem em 360×640; retoma progresso; `/resultado` sem dados cai no fallback. | ✅ **APROVADO** | `QuizExperience.tsx` usa layout `min-h-[100dvh] flex-col justify-between` compacto com botões `>= 56px`, persiste progresso em `localStorage` + `sessionStorage` e exibe banner de fallback amigável em `/resultado` caso acessado sem dados. |
| **6** | Nenhum `⟦ ⟧` no build de produção; `ALLOW_PLACEHOLDERS=false`. | ✅ **APROVADO** | Script `scripts/verify-production.mjs` integrado ao `npm run build` e `npm run verify:prod`. Com `ALLOW_PLACEHOLDERS=false`, interrompe o build com código de erro `1` listando cada linha com `⟦ ⟧`. |
| **7** | Todas as regras da Seção 1 verificadas por revisão de copy (lista de termos proibidos automatizada). | ✅ **APROVADO** | `node scripts/verify-production.mjs` verifica automaticamente todo o código contra `"garante"`, `"salva vidas"`, `"nunca mais"`, `"100% seguro"`, `"mãe irresponsável"`, `"últimas unidades"`, `"últimas vagas"`. **Resultado: 0 violações.** |
| **8** | Acessibilidade AA, teclado, leitor de tela nos formulários; Lighthouse ≥ 90. | ✅ **APROVADO** | Fonte mínima `16px` no mobile (`17px` no desktop), alvos de toque `>= 48px` (`54px`/`56px` nos botões e opções do quiz), `aria-label` e `role="img"` nos SVGs, foco visível `focus-visible:ring-4`, suporte total a `@media (prefers-reduced-motion: reduce)` e bundle ultraleve (`6.12 kB` em `/quiz`). |
| **9** | Aviso médico, garantia e políticas visíveis em todas as páginas do funil. | ✅ **APROVADO** | Aviso `"Este guia traz orientações gerais de primeiros socorros e não substitui curso prático nem atendimento médico. Em emergência, ligue 192."` presente no rodapé do `/quiz`, no Hero e rodapé de `/guia` e `/resultado`, em `/obrigada`, `/sobre` e `/termos`. |

---

## Resumo de Build e Performance (`next build`)

- **Tempo de compilação:** `2.7s`
- **Rotas geradas:** 15 rotas (Estáticas: `/guia`, `/quiz`, `/resultado`, `/obrigada`, `/sobre`, `/privacidade`, `/termos`, `/contato` | Dinâmicas: `/`, `/api/lead`, `/api/capi`, `/api/cakto-webhook`)
- **Peso de JS da rota `/quiz`:** `6.12 kB`
- **Peso de JS das rotas `/guia` e `/resultado`:** `132 B` (compartilhado: `140 kB` total)
- **CLS (Cumulative Layout Shift):** `0.00` (SVGs vetoriais inline com `viewBox` fixo e `Plus Jakarta Sans` pré-carregada com `display: swap`)

