# Fase 1 — Plano de Arquitetura, Sitemap e Wireframes (“Segundos que Salvam”)

## 1. Arquitetura Técnica e Stack

- **Framework:** Next.js (App Router) + TypeScript
- **Estilização:** Tailwind CSS + Variáveis CSS nativas (Design System Índigo + Menta + Lavanda + Vermelho Emergência `#D62839`)
- **Animações Fluidas de Alto Desempenho:**
  - Transições aceleradas por GPU (`transform`, `opacity`) respeitando `@media (prefers-reduced-motion: reduce)`.
  - Fade-up suave (220ms–280ms, `cubic-bezier(0.22, 1, 0.36, 1)`) nas trocas de tela do quiz e na entrada de seções via `IntersectionObserver` leve (sem bibliotecas pesadas de parallax).
  - Selo circular giratório em SVG puro no Hero (`animation: spin 22s linear infinite`, pausado se `prefers-reduced-motion`).
  - Anel de pontuação do resultado com animação de `stroke-dashoffset` suave.
- **Persistência de Estado e Atribuição:**
  - `storage/quizStore.ts`: Salva progresso do quiz, respostas de perfil (`i1..i4`, `avo|baba|escola|eu`, `t1..t4`), acertos, lista de erros e dados de lead em `localStorage` + `sessionStorage` (mesmo domínio, zero parâmetros clínicos na URL).
  - `tracking/attribution.ts`: Captura na primeira visita `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `fbclid`, `src`, `sck`, `_fbp` e `_fbc`, persistindo em `localStorage` e cookies primários, e monta o link de checkout da Cakto (`buildCaktoCheckoutUrl`).
- **Trava de Produção Anti-Placeholders e Anti-Termos Proibidos:**
  - Componente `<Pendente>` renderiza caixa com borda tracejada índigo (`--indigo-700`), fundo lavanda (`--lavender-100`) e etiqueta visível `"PREENCHER: ..."`.
  - Script `scripts/verify-production.mjs` valida:
    1. Se `ALLOW_PLACEHOLDERS=false` (padrão de build de produção), falha o build caso exista qualquer marcador `⟦ ⟧` ou `<Pendente>` ativo sem dado real.
    2. Verifica automaticamente todo o código-fonte contra a lista de termos proibidos da Seção 1 e Seção 9 (`"garante"`, `"salva vidas"`, `"nunca mais"`, `"100% seguro"`, `"mãe irresponsável"`, `"últimas unidades"`, `"últimas vagas"`).

---

## 2. Sitemap e Estrutura de Rotas

```text
/                       → Redireciona (307/308) para /guia (preservando query string / UTMs)
├── /guia               → Landing Page completa para tráfego frio/orgânico (indexável, SEO completo)
├── /quiz               → Quiz interativo de diagnóstico (3 perfil + 8 situações + respiro + captura + preparo) [noindex]
├── /resultado          → Diagnóstico personalizado (Anel + 3 cartões de revisão + Rede de apoio) + Oferta completa na mesma página [noindex]
├── /obrigada           → Pós-compra caloroso: instruções de download/uso do PDF, impressão da ficha, botão WhatsApp para rede de apoio [noindex]
├── /sobre              → Página institucional "Quem somos — Mãe Preparada", metodologia em 4 passos e fontes públicas
├── /privacidade        → Política de Privacidade completa (LGPD, Pixel, CAPI, Cookies, Direitos do Titular e canal de exclusão)
├── /termos             → Termos de Uso e Aviso Médico/Legal (não substitui curso prático nem SAMU 192)
├── /contato            → Canal de atendimento, suporte à aluna e solicitação de exclusão de dados (LGPD)
└── /api
    ├── /api/lead           → Recebe lead com consentimento LGPD, valida entrada, dispara webhook para CRM/planilha
    ├── /api/capi           → Envia eventos server-side para a Meta Conversions API com deduplicação (event_id) e hash SHA-256
    └── /api/cakto-webhook  → Recebe webhooks da Cakto (purchase_approved, checkout_abandonment), valida secret e aciona CAPI/automações
```

---

## 3. Wireframes em Texto (Mobile-First 375px → Desktop 1200px)

### 3.1 Rota `/quiz` (Sem Rolagem, Foco no Polegar)

```text
+-------------------------------------------------------+
| [Mãe Preparada]            [Lacunas para revisar: N]  |
| [======== Barra de Progresso Menta ========>     ]    |
+-------------------------------------------------------+
|                                                       |
|  (TELA INICIAL - step 0)                              |
|  Etiqueta: DIAGNÓSTICO RÁPIDO • 2 MINUTOS             |
|  H1: Você saberia o que fazer nos primeiros minutos   |
|      de uma emergência com seu filho?                 |
|  Sub: 8 situações reais. 2 minutos. Você descobre     |
|       onde já está preparada e onde ainda não.        |
|  [Ilustração em traço preto + destaque vermelho 192]  |
|  ( Botão Pílula Menta: Começar o teste ↗ )            |
|  Microcopy: Gratuito · Você só informa seu contato    |
|  no final, para ver o resultado.                      |
|                                                       |
+-------------------------------------------------------+
|  (TELAS DE PERFIL P0, P0b, P0c — steps 1 a 3)         |
|  [← Voltar]                      Contexto Rápido (1/3) |
|  Pergunta: Idade do seu filho mais novo?              |
|  [ ( ) Menos de 1 ano                    (≥ 56px) ]   |
|  [ ( ) 1 a 2 anos                        (≥ 56px) ]   |
|  [ ( ) 3 a 5 anos                        (≥ 56px) ]   |
|  [ ( ) Mais de 5 anos                    (≥ 56px) ]   |
|  (Avanço suave em 300ms ao tocar)                     |
+-------------------------------------------------------+
|  (PERGUNTAS PONTUADAS P1 a P8 — steps 4 a 11)         |
|  [← Voltar]   Pergunta X de 8 · Lacunas p/ revisar: N |
|  Cenário concreto + Pergunta                          |
|  [ Alternativa A (embaralhada)           (≥ 56px) ]   |
|  [ Alternativa B (embaralhada)           (≥ 56px) ]   |
|  [ Alternativa C (embaralhada)           (≥ 56px) ]   |
|  [ Alternativa D (embaralhada)           (≥ 56px) ]   |
|                                                       |
|  --> TELA DE FEEDBACK IMEDIATO (após resposta):       |
|  Se ACERTOU: [Selo Menta: ✔ Conduta correta]          |
|  Se ERROU:   [Selo Índigo: Vale saber (sem vermelho)] |
|  Texto explicativo ("o que poderia acontecer" +       |
|  "o que as diretrizes indicam")                       |
|  ( Botão Pílula Menta: Próxima pergunta ↗ )           |
+-------------------------------------------------------+
|  (TELA DE RESPIRO — após P4)                          |
|  "Estas situações confundem muita gente porque a      |
|   conduta correta costuma ser contraintuitiva.        |
|   Continue: faltam 4."                                |
|  ( Botão: Continuar para as últimas 4 ↗ )             |
+-------------------------------------------------------+
|  (TELA DE CAPTURA — após P8)                          |
|  H2: Seu resultado está pronto                        |
|  [ Campo: Seu primeiro nome                         ] |
|  [ Campo: WhatsApp com DDD (máscara BR)             ] |
|  [ Campo: Seu melhor e-mail                         ] |
|  [ ] Aceito receber meu resultado e conteúdos sobre   |
|      segurança infantil da Mãe Preparada... (LGPD)    |
|  ( Botão Menta: Ver meu resultado agora ↗ )           |
|  [Modo Teste A/B: Pular e ver resultado sem cadastro] |
+-------------------------------------------------------+
|  (TELA DE PREPARO — 3 segundos)                       |
|  [✔] Contando suas respostas…                         |
|  [✔] Reunindo as situações para revisar…              |
|  [●] Montando seu resultado.                          |
+-------------------------------------------------------+
| Rodapé fixo discreto: Aviso médico + Em emergência 192|
+-------------------------------------------------------+
```

### 3.2 Rotas `/resultado` e `/guia` (Componentes Unificados)

```text
+-----------------------------------------------------------------------+
| [s0] BARRA TOPO ÍNDIGO: Guia ilustrado · Acesso imediato · 7 dias     |
|      HEADER: [Logo Mãe Preparada]  (O guia | Por dentro | Quem fez |  |
|              Dúvidas)                         ( Quero o guia ↗ )      |
+-----------------------------------------------------------------------+
| [BLOCO EXCLUSIVO DE /resultado — Topo do Diagnóstico]                 |
|  (1) Anel SVG "X de 8" + Faixa r1/r2/r3 personalizada com {nome},     |
|      {acertos}, {lista_erros}, {quem_cuida}, {tempo_hospital}         |
|  (2) Até 3 Cartões "Situações para revisar":                          |
|      - O que você escolheu → O que poderia acontecer → Diretrizes     |
|  (3) Bloco "Quem cuida dele também precisa saber" (se ≠ "eu")         |
|  (4) Botões: [Mandar o teste para quem cuida (WhatsApp)] [Refazer]    |
+-----------------------------------------------------------------------+
| [s1] HERO (Padrão em /guia | Variante com {acertos} em /resultado)    |
|  Coluna Esquerda:                                                     |
|   • Etiqueta: Um guia Mãe Preparada                                   |
|   • H1 com <Em> (itálico + faixa menta na metade inferior)            |
|   • Subtítulo: Segundos que Salvam (35 situações, 44 páginas, 192)    |
|   • CTAs: ( Quero o guia agora ↗ ) [ Ver o que tem dentro ]           |
|           (+ [ Fazer o teste de 2 minutos ] em /guia)                 |
|   • 3 Checks com ícone menta                                          |
|  Coluna Direita:                                                      |
|   • Cartão grande (raio 28px) com Mockup Capa + Página Aberta         |
|   • Selo Circular Girando: "BASEADO EM DIRETRIZES PÚBLICAS • SBP..."  |
|   • Cartão de Avaliação <Pendente: ⟦N⟧ mães já têm o guia>            |
|  Base Hero: Aviso médico obrigatório ("Não substitui curso... 192")   |
+-----------------------------------------------------------------------+
| [s2] A REALIDADE (Dor no limite correto + Alívio)                     |
|  H2: Ninguém te ensinou isso. E a emergência não avisa.               |
|  3 Cenas em Cartões Lavanda (ilustração traço preto + vermelho):      |
|  [1. Silêncio na sala]   [2. Madrugada]   [3. Só um minuto]           |
|  Fecho de alívio: "Não é sobre medo. É sobre ter o primeiro passo..." |
+-----------------------------------------------------------------------+
| [s3] O INSTINTO ENGANA: Os 6 erros que *parecem* certos               |
|  Grade de 6 Cartões Comparativos:                                     |
|  [Borda Vermelha: O que muita gente faz] → [Menta: O que é indicado]  |
|  Fecho + CTA Primário                                                 |
+-----------------------------------------------------------------------+
| [s4] A SOLUÇÃO (Seção Cheia em Índigo Escuro #3A2390)                 |
|  Esquerda: Cartão branco arredondado com mockup + placa índigo ↗      |
|  Direita: H2 "Um guia feito para ser usado *no susto*."               |
|  Cartão Menta Grande: "35 situações" <Pendente: confirmar>            |
|  2 Mini-cartões: "44 páginas ilustradas" | "192 primeiro, sempre"     |
|  Miniaturas de páginas + Botão ( Quero o guia agora ↗ )               |
+-----------------------------------------------------------------------+
| [s5] COMO USAR: Calma. Ligue. Aja.                                    |
|  [1 Respire (5s)]  →  [2 Ligue 192 (Viva-voz)]  →  [3 Aja (Passo a p)]|
+-----------------------------------------------------------------------+
| [s6] POR DENTRO DO GUIA (5 Cartões Lavanda Expansíveis — Apêndice A)  |
|  [A. Asfixia e respiração] [B. Traumas e lesões] [C. Acidentes dom.]  |
|  [D. Clínicas e externas]  [E. Prepare-se]                            |
+-----------------------------------------------------------------------+
| [s7] VEJA UMA PÁGINA DE PERTO (Anatomia Interativa da Página)         |
|  Mockup grande de página real do guia com 7 pins numerados:           |
|  (1) Nº do passo (2) Ilustração traço+vermelho (3) Texto curto        |
|  (4) Caixa NÃO FAÇA (5) Caixa LIGUE 192/PS (6) Índice (7) Já li       |
+-----------------------------------------------------------------------+
| [s8] O QUE VOCÊ RECEBE (Pilha de Valor Honesta — 10 Itens)            |
|  Itens 1 a 7 prontos + Itens 8, 9, 10 com <Pendente> marcados         |
|  Ancoragem honesta + Preço <Pendente: ⟦preço à vista / parcelas⟧>     |
+-----------------------------------------------------------------------+
| [s9] PARA QUEM CUIDA DELE TAMBÉM                                      |
|  H2: Você não está sempre lá. O guia está.                            |
|  Botão WhatsApp: ( Enviar para quem cuida do meu filho ↗ )            |
+-----------------------------------------------------------------------+
| [s10] QUEM ESTÁ POR TRÁS DO GUIA (Autoria e Credibilidade)            |
|  Bloco 1: Organização Mãe Preparada + <Pendente: missão, CNPJ, email> |
|  Bloco 2: Como foi feito (4 passos) + Links oficiais SBP/MS/AHA/Anvisa|
|  Bloco 3: Especialista (Retrato + Placa Índigo com <Pendente> OU      |
|           fallback "Equipe editorial Mãe Preparada" via flag)         |
+-----------------------------------------------------------------------+
| [s11] DEPOIMENTOS (Carrossel de 6 Cartões + 1 Vídeo em <Pendente>)    |
+-----------------------------------------------------------------------+
| [s12] COMPARAÇÃO HONESTA (Tabela 4 colunas x 6 linhas)                |
|  Nada vs. Posts soltos vs. Curso presencial (vence no prático!) vs.   |
|  Segundos que Salvam ("ajuda a não partir do zero")                   |
+-----------------------------------------------------------------------+
| [s13] OFERTA E GARANTIA (Cartão Único Forte)                          |
|  Resumo dos 10 itens + Preço <Pendente> + CTA Checkout Cakto          |
|  Trust bar + Selo de Garantia de 7 dias (CDC art. 49)                 |
+-----------------------------------------------------------------------+
| [s14] PERGUNTAS FREQUENTES (Acordeão de 10 perguntas — FAQOpen)       |
+-----------------------------------------------------------------------+
| [s15] CTA FINAL EMOCIONAL                                             |
|  H2: "Você pode nunca precisar. Mas, se precisar, vai estar pronta."  |
+-----------------------------------------------------------------------+
| [Extra] ISCA GRÁTIS (Ficha de Emergência da Criança — LeadMagnet)     |
| [Rodapé] Logo, Links, <Pendente: CNPJ/Email/WhatsApp>, Aviso 192      |
| [Mobile Sticky Bar] Barra fixa no rodapé mobile (após Hero até s13)   |
+-----------------------------------------------------------------------+
```

