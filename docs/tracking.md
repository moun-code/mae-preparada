# Especificação de Rastreamento, Públicos e Testes (`docs/tracking.md`)

## 1. Arquitetura Centralizada (`src/tracking/track.ts` + `src/tracking/events.ts`)

1. **Ponto único de disparo:** Nenhum `fbq(...)` existe solto nos componentes. Todas as chamadas passam por `track(eventName, params, options)`.
2. **Consentimento Obrigatório (LGPD):** O Meta Pixel começa em estado bloqueado. Somente quando a usuária aceita o banner de cookies (`mp_cookie_consent = 'granted'`), o script do Pixel é ativado com `fbq('consent', 'grant')`. Sem aceite, nada é enviado ao navegador nem à CAPI.
3. **Deduplicação Navegador + Servidor (CAPI):** Todo evento gera um `event_id` único determinístico por ocorrência (`evt_<timestamp>_<random>` ou `order_<id>` no webhook da Cakto), enviado simultaneamente no 4º argumento do `fbq('track' | 'trackCustom', name, params, { eventID })` e no payload do `/api/capi`.
4. **Guarda Anti-Duplicidade de Sessão:** Eventos únicos por etapa (como `QuizStart`, `QuizStep` por número `1..11`, `QuizComplete`, `LeadFormView`, `ResultView`, `ScrollDepth` por faixa `25/50/75/90`, `SectionView` por `s0..s15`) são registrados em `sessionStorage` para nunca dispararem duas vezes na mesma sessão.
5. **Modo Debug (`?debug=1`):** Adicionar `?debug=1` em qualquer URL exibe um painel flutuante de diagnóstico em tempo real e imprime cada evento no console (`[MP Track Debug]`) mesmo sem Pixel configurado.
6. **Blindagem de Dados de Saúde (Meta Core Setup):**
   - O módulo `track.ts` filtra os parâmetros por uma **lista branca estrita** definida em `events.ts`.
   - **Proibido e bloqueado por código:** texto de perguntas ou respostas, nome de situações médicas (`engasgo`, `convulsão`, `queimadura`, etc.), idade da criança, número ou lista de erros.
   - `event_source_url` enviado à CAPI é sanitizado para conter apenas `origin + pathname` neutro (`/guia`, `/quiz`, `/resultado`, `/obrigada`).

---

## 2. Dicionário Completo de Eventos

| Onde / Quando | Nome do Evento | Tipo Meta | Parâmetros Permitidos (Allowlist) | Guarda de Sessão |
| :--- | :--- | :--- | :--- | :--- |
| Qualquer página carregada | `PageView` | Padrão (`track`) | `{}` (automático, URL neutra) | Por mudança de rota |
| `/quiz` carregou | `ViewContent` | Padrão (`track`) | `{ content_name: 'quiz' }` | 1x por sessão em `/quiz` |
| Clique em "Começar o teste" | `QuizStart` | Custom (`trackCustom`) | `{}` | 1x por sessão |
| Cada tela do quiz (perfil P0..P0c e P1..P8) | `QuizStep` | Custom (`trackCustom`) | `{ step: 1..11 }` (apenas número inteiro) | 1x por `step` na sessão |
| Última pergunta respondida (P8) | `QuizComplete` | Custom (`trackCustom`) | `{}` | 1x por sessão |
| Tela de captura exibida | `LeadFormView` | Custom (`trackCustom`) | `{}` | 1x por sessão |
| Captura enviada com consentimento LGPD | `Lead` | Padrão (`track`) | `{ currency: 'BRL', value?: number }` + Hash SHA-256 (`em`, `ph`, `fn`) via CAPI | 1x por envio |
| `/resultado` exibida | `ViewContent` | Padrão (`track`) | `{ content_name: 'resultado' }` | 1x por sessão em `/resultado` |
| Faixa do resultado renderizada | `ResultView` | Custom (`trackCustom`) | `{ band: 'r1' \| 'r2' \| 'r3' }` | 1x por sessão |
| Rolagem em 25%, 50%, 75%, 90% | `ScrollDepth` | Custom (`trackCustom`) | `{ pct: 25 \| 50 \| 75 \| 90, page: 'resultado' \| 'guia' }` | 1x por `page + pct` |
| Seção visível (≥ 50% por ≥ 1s) | `SectionView` | Custom (`trackCustom`) | `{ section: 's0'..'s15' }` | 1x por `section` |
| Clique em qualquer CTA de compra | `CTAClick` | Custom (`trackCustom`) | `{ location: 'header' \| 'hero' \| 's3' \| 's4' \| 's8' \| 's13' \| 's15' \| 'sticky' }` | Por clique |
| Abertura de pergunta do FAQ | `FAQOpen` | Custom (`trackCustom`) | `{ q: 1..10 }` | 1x por `q` |
| Clique em "Compartilhar com quem cuida" | `ShareClick` | Custom (`trackCustom`) | `{}` | Por clique |
| Download/envio da Ficha grátis (isca) | `LeadMagnet` | Custom (`trackCustom`) | `{}` (+ dispara `Lead` se capturar contato com consentimento) | 1x por sessão |
| Em `/guia`, clique em "Fazer o teste" | `QuizCTAClick` | Custom (`trackCustom`) | `{}` | Por clique |
| Checkout (na Cakto) | `InitiateCheckout`, `Purchase` | Padrão (`track`) | Disparado nativamente pela Cakto (ou via `/api/cakto-webhook` com `event_id = order_id`) | Deduplicado por `order_id` |
| `/obrigada` exibida | `ThankYouView` | Custom (`trackCustom`) | `{}` | 1x por sessão |

### Mapa Interno de Seções (`SectionView`)
Para manter neutralidade total no Gerenciador de Eventos, cada seção da Landing Page possui um ID neutro:
- `s0`: Barra superior + Cabeçalho
- `s1`: Hero principal
- `s2`: A realidade (3 cenas cotidianas + alívio)
- `s3`: Os 6 erros que parecem certos
- `s4`: A solução — apresentação do guia (seção índigo)
- `s5`: Como usar — Calma. Ligue. Aja.
- `s6`: Por dentro do guia (5 categorias expansíveis)
- `s7`: Veja uma página de perto (anatomia da página)
- `s8`: O que você recebe (pilha de valor de 10 itens)
- `s9`: Para quem cuida dele também (rede de apoio)
- `s10`: Quem está por trás do guia (autoria, fontes e especialista)
- `s11`: Depoimentos de leitoras
- `s12`: Comparação honesta (tabela 4 colunas)
- `s13`: Oferta e garantia de 7 dias
- `s14`: Perguntas frequentes (FAQ)
- `s15`: CTA final emocional

---

## 3. Regra de Checkout Cakto e Prevenção de Contagem Dupla

1. **No clique do botão de compra (`CTAClick`):**
   - O site dispara `CTAClick` (via Pixel + `navigator.sendBeacon('/api/capi', ...)`), aguarda `150ms` para garantir o envio do beacon e redireciona para o checkout da Cakto anexando apenas os parâmetros suportados (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `src`, `sck` e, se houver consentimento, `name`, `email`, `confirmEmail`, `phone`).
2. **Não disparamos `InitiateCheckout` no clique do botão do nosso site** porque a própria Cakto já dispara `InitiateCheckout` quando a página de pagamento dela carrega.
3. **Para o evento `Purchase`:**
   - **Opção A (Padrão Cakto):** Cadastrar o Pixel/CAPI direto no painel do produto na Cakto. Nesse caso, deixe `CAKTO_WEBHOOK_SEND_CAPI_PURCHASE=false` no `.env` para que nosso `/api/cakto-webhook` processe apenas automações de CRM/nutrição sem duplicar o `Purchase`.
   - **Opção B (CAPI Própria via Webhook):** Se preferir enviar o `Purchase` pelo nosso endpoint `/api/cakto-webhook` no evento `purchase_approved`, ative `CAKTO_WEBHOOK_SEND_CAPI_PURCHASE=true`. O `event_id` será `cakto_<order_id>` para garantir deduplicação exata.

---

## 4. Públicos Personalizados (30 dias) e Estratégia de Campanha

Configure no Gerenciador de Anúncios da Meta os seguintes **Públicos Personalizados (janela de 30 dias)**:

1. **`[MP] 01 - Iniciou Quiz (30d)`:** Pessoas que acionaram `QuizStart`.
2. **`[MP] 02 - Concluiu Quiz e Não Comprou (30d)`:** Acionaram `QuizComplete` **EXCLUINDO** `Purchase` (180d).
3. **`[MP] 03 - Lead Capturado e Não Comprou (30d)`:** Acionaram `Lead` **EXCLUINDO** `Purchase` (180d).
4. **`[MP] 04 - Engajado na Oferta 75% Scroll (30d)`:** Acionaram `ScrollDepth` com `pct >= 75` **EXCLUINDO** `Purchase` (180d).
5. **`[MP] 05 - Clicou no CTA / Checkout e Não Comprou (30d)`:** Acionaram `CTAClick` ou `InitiateCheckout` **EXCLUINDO** `Purchase` (180d).
6. **`[MP] 00 - Compradores (180d)`:** Acionaram `Purchase` ou `ThankYouView` — **excluir obrigatoriamente de todas as campanhas de aquisição e remarketing**.

### Progressão de Otimização de Campanha
- **Fase Inicial (0 a 50 vendas):** Otimizar campanhas de conversão para o evento padrão `Lead` (enviado apenas no fim do quiz com alta intenção e Advanced Matching com hash SHA-256, atingindo nota de correspondência ≥ 8/10).
- **Fase de Escala (> 50 vendas/semana):** Migrar otimização do conjunto de anúncios para `Purchase`.

---

## 5. Passo a Passo de Teste (QA no Gerenciador de Eventos)

1. Defina no `.env.local`:
   - `NEXT_PUBLIC_META_PIXEL_ID=seu_pixel_id`
   - `META_CAPI_TOKEN=seu_token_capi`
   - `META_TEST_EVENT_CODE=TESTXXXXX` (copiado da aba "Testar eventos" no Gerenciador de Eventos da Meta).
2. Abra o site em uma janela anônima ou celular real em `/quiz?debug=1&utm_source=facebook&utm_medium=cpc&utm_campaign=teste_qa`.
3. Verifique que **antes** de clicar em "Aceitar" no banner de cookies, nenhum evento é enviado à Meta.
4. Clique em **"Aceitar cookies"**: confirme o disparo de `PageView` e `ViewContent` (`content_name: 'quiz'`), ambos exibidos como **"Desduplicado"** (Navegador + Servidor com mesmo `event_id`).
5. Percorra o quiz de `step: 1` até `step: 11`: confirme no painel debug e no Gerenciador de Eventos que apenas números (`1..11`) são enviados, sem nenhum texto médico.
6. Envie a captura com a caixa LGPD marcada: confirme o recebimento de `Lead` com parâmetros de correspondência avançada (e-mail, telefone, nome com hash).
7. Na página `/resultado`, role até o fim, abra uma pergunta do FAQ e clique no CTA de compra: confirme `ResultView` (`band: 'r1'|'r2'|'r3'`), `SectionView`, `ScrollDepth`, `FAQOpen` e `CTAClick`, além da presença das UTMs na URL de destino da Cakto.

