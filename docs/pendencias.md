# Mapa de Pendências e Campos a Preencher (`docs/pendencias.md`)

> **Regra Inegociável (Seção 1, Regra 3):** Nenhum dado de especialista, depoimento, CNPJ, preço ou estatística de vendas foi inventado. Todos os espaços marcados com `⟦ ⟧` no Super Prompt estão centralizados no arquivo de configuração `src/config/siteConfig.ts` e são exibidos visualmente pelo componente `<Pendente>` (borda tracejada índigo + etiqueta `"PREENCHER"`).  
> **Trava de Build:** Em modo de produção (`ALLOW_PLACEHOLDERS=false`), o script `npm run verify:prod` **falha o build** caso reste qualquer marcador `⟦ ⟧` ainda não substituído por informação real.

---

## Lista Completa de Todos os Marcadores `⟦ ⟧` e Onde Aparecem

| ID | Marcador Original no Super Prompt | Onde Aparece no Site / Código | Como Preencher (`src/config/siteConfig.ts`) |
| :--- | :--- | :--- | :--- |
| **P-01** | `⟦confirmar contra o PDF final⟧` (35 situações / 44 páginas) | Seção 2, Hero (`s1`), Solução (`s4` — cartão menta de estatística) e Pilha de Valor (`s8`) | Confirmar contagem exata do PDF final em `PRODUCT_CONFIG.situationsCount` e `pagesCount` e remover a flag de pendência. |
| **P-02** | `⟦CNPJ⟧` | Seção de Autoria (`s10`), Rodapé (`Footer.tsx`), `/sobre`, `/privacidade` e `/termos` | Preencher `ORG_CONFIG.cnpj` com o CNPJ real (ou remover se pessoa física/em formalização). |
| **P-03** | `⟦e-mail de suporte⟧` / `⟦e-mail⟧` | Seção de Autoria (`s10`), Rodapé, `/sobre`, `/privacidade`, `/termos` e `/contato` | Preencher `ORG_CONFIG.supportEmail`. |
| **P-04** | `⟦WhatsApp⟧` | Rodapé, `/contato` e suporte pós-compra em `/obrigada` | Preencher `ORG_CONFIG.whatsappNumber`. |
| **P-05** | `⟦Registro de marca/domínio a verificar.⟧` | `/sobre` e metadados de domínio (`siteConfig.ts`) | Confirmar domínio definitivo e status de registro da marca *Mãe Preparada*. |
| **P-06** | `⟦preço à vista⟧` / `⟦“de R$ X por apenas R$ Y” só se X for real, ou apenas R$ Y⟧` | Seção 8.9 (`s8` — Pilha de Valor), Seção 8.14 (`s13` — Oferta e Garantia) e Sticky Bar Mobile | Preencher `OFFER_CONFIG.cashPrice` (e `referencePrice` **somente** se já praticado de verdade). |
| **P-07** | `⟦N x valor⟧` (Parcelamento) | Seção 8.9 (`s8`) e Seção 8.14 (`s13`) | Preencher `OFFER_CONFIG.installmentsText` (ex.: `"ou Xx de R$ Y,YY"` conforme configurado na Cakto). |
| **P-08** | `⟦https://pay.cakto.com.br/ID_DA_OFERTA⟧` | Todos os CTAs de compra (`CTAClick`) e variável `NEXT_PUBLIC_CAKTO_CHECKOUT_URL` | Definir a URL real da oferta da Cakto no `.env` e em `OFFER_CONFIG.checkoutUrl`. |
| **P-09** | `⟦Se eu quiser, 30 dias.⟧` (Prazo de garantia: 7 ou 30 dias) | Barra topo (`s0`), Hero (`s1`), Oferta (`s13`), CTA final (`s15`) e Teste A/B #6 | Configurar `OFFER_CONFIG.guaranteeDays` (`7` padrão CDC art. 49, ou `30`). |
| **P-10** | `⟦URL⟧` (Webhook de Lead para CRM/Planilha/Automação) | Endpoint `/api/lead` (`LEAD_WEBHOOK_URL`) | Configurar `LEAD_WEBHOOK_URL` no `.env` apontando para seu n8n, Make ou Google Sheets. |
| **P-11** | `⟦Teste A/B: permitir “ver resultado sem cadastro”.⟧` | Tela de captura do `/quiz` (após a P8) | Controlado por `AB_TESTS_CONFIG.allowSkipLeadGate` ou query `?ab_gate=skip`. |
| **P-12** | `⟦exibir apenas com dado real: “⟦N⟧ mães já têm o guia”⟧` | Cartão branco de avaliação na base do Hero (`s1`) | Só ativar `HERO_SOCIAL_PROOF.enabled = true` quando tiver o número real e verificado de clientes. |
| **P-13** | `⟦conteúdo solto e conflitante vs. organizado, ilustrado e revisado ⟦ ⟧⟧` | Quebra de objeção e Seção 8.11 (`s10` — Passo 3: revisão) | Informar se houve revisão técnica por profissional habilitado apenas quando for verdade verificável. |
| **P-14** | `⟦a produzir⟧: Guia rápido de 1 página para avós e babás` | Seção 8.9 (`s8` — Item 8 da pilha de valor) e `/obrigada` | Anexar o PDF de 1 página na entrega da Cakto e marcar `BONUS_1_READY = true`. |
| **P-15** | `⟦a produzir⟧: Cartaz de emergência para a geladeira` | Seção 8.9 (`s8` — Item 9 da pilha de valor) e `/obrigada` | Anexar o cartaz imprimível na entrega da Cakto e marcar `BONUS_2_READY = true`. |
| **P-16** | `⟦definir política: ex. gratuitas por X meses⟧` (Atualizações) | Seção 8.9 (`s8` — Item 10) e Seção 8.11 (`s10` — Passo 4: periodicidade) | Preencher `PRODUCT_CONFIG.updatesPolicy` e `updateFrequency`. |
| **P-17** | `⟦Ancoragem de preço só com comparação verdadeira e verificável⟧` | Seção 8.9 (`s8` — Fecho de valor) | Preencher `OFFER_CONFIG.verifiedComparisonText` com valor real verificável ou manter apenas ancoragem de utilidade. |
| **P-18** | `⟦escrever⟧` (Missão da Mãe Preparada em 2 linhas) | Seção 8.11 (`s10` — Bloco 1) e página `/sobre` | Revisar/aprovar a missão institucional de 2 linhas em `ORG_CONFIG.missionText`. |
| **P-19** | `⟦Bloco 3 — Especialista: foto, nome, título, COREN/CRM, mini-bio, o que revisou e quando, citação, assinatura⟧` | Seção 8.11 (`s10` — Bloco 3) e `/sobre` | Enquanto `SPECIALIST_ENABLED=false`, exibe o bloco honesto *"Equipe editorial Mãe Preparada"* mais a estrutura `<Pendente>` em dev. Só ativar com dados 100% reais e autorizados. |
| **P-20** | `⟦Depoimentos (s11): 6 cartões (foto, nome+cidade, idade do filho, texto 2-3 linhas, data, estrelas) + 1 vídeo⟧` | Seção 8.12 (`s11` — Carrossel de Depoimentos) | Coletar seguindo o roteiro do Apêndice B e preencher em `TESTIMONIALS_DATA` em `siteConfig.ts`. |
| **P-21** | `⟦arquivo a produzir⟧` (Isca grátis: Ficha de Emergência da Criança de 1 página) | Modal de saída no desktop e faixa no fim da página no mobile (`LeadMagnetModal.tsx`) | Inserir o arquivo PDF da Ficha de 1 página em `public/downloads/ficha-emergencia-crianca.pdf`. |
| **P-22** | `⟦Upsell opcional⟧` | Página `/obrigada` | Preencher `UPSELL_CONFIG` em `siteConfig.ts` caso ative oferta complementar na Cakto. |

