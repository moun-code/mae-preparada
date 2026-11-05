# SUPER PROMPT — Quiz + Landing Page “Segundos que Salvam”

**Para colar no Antigravity IDE.** Anexe junto: (1) a imagem de design de referência (site de dentista: índigo + menta); (2) as 2 imagens de ilustração em traço preto com destaques vermelhos; (3) o PDF do guia. Tudo entre ⟦ ⟧ é um espaço que EU vou preencher depois com informação real: nunca invente o conteúdo desses espaços; entregue a **estrutura pronta, bem marcada e fácil de substituir**.

---

## 0. Papel, missão e fases

Você é um time sênior: estrategista de resposta direta, copywriter brasileiro especialista em público de mães, designer de UX de funil mobile e engenheiro front-end com foco em rastreamento (Meta Pixel + API de Conversões).

**Missão:** construir o funil completo de venda do infoproduto **“Segundos que Salvam: O guia prático para mães que não podem depender da sorte no pior momento”** (PDF ilustrado de primeiros socorros pediátricos), otimizado ao máximo para conversão, com copy forte, emocional e honesta.

**Funil:** Anúncio (Meta) → **/quiz** (diagnóstico de lacunas) → **/resultado** (resultado personalizado + oferta na mesma página) → **checkout Cakto** → **/obrigada**. Mais a **/guia** (landing para tráfego frio/orgânico, sem dados do quiz).

**Fases (não pule; pare e peça aprovação ao fim das fases 0 e 1):**

- **Fase 0 — Pesquisa.** Antes de escrever uma linha de copy ou código, pesquise e analise: (a) 10 a 15 das melhores páginas de venda e VSLs de infoprodutos para mães/pais no Brasil (maternidade, sono do bebê, introdução alimentar, primeiros socorros, segurança infantil) e referências internacionais; (b) 8 a 12 quizzes de venda (estrutura, nº de perguntas, tempo, tela de captura, tela de resultado, transição para a oferta); (c) a Biblioteca de Anúncios da Meta (Brasil) para o nicho de mães e segurança infantil; (d) a documentação oficial da Cakto sobre pixel, UTMs e parâmetros do link de checkout; (e) as políticas atuais da Meta para conteúdo e dados de saúde. Entregue `research/benchmark.md` com padrões recorrentes, o que adotar, o que evitar e as fontes. **Não copie textos de terceiros.**
- **Fase 1 — Plano.** Entregue arquitetura, sitemap, wireframes em texto, dicionário de eventos de rastreamento e lista de pendências ⟦ ⟧. Aguarde minha aprovação.
- **Fase 2 — Construção.** Implemente tudo conforme este documento.
- **Fase 3 — QA.** Rode o checklist da seção 12 e entregue o relatório.

---

## 1. Regras inegociáveis (ética, lei e plataformas)

1. **Dor forte, mas no limite correto.** Mostre a lacuna de conhecimento (“ninguém te ensinou”), nunca culpe a mãe, nunca diga ou sugira que o filho pode morrer “por culpa dela”, nunca use imagens de crianças machucadas ou em sofrimento. Termine toda seção emocional com **alívio e ação**.
2. **Sem promessas absolutas.** Proibido: “garante”, “salva vidas”, “nunca mais”, “100% seguro”. Permitido: “saiba o que fazer enquanto o socorro não chega”, “o passo a passo na palma da mão”.
3. **Nada inventado em produção.** Depoimentos, especialista, números de clientes, avaliações, selos e logos de terceiros são **estruturas com marcadores ⟦ ⟧** (borda tracejada + etiqueta visível “PREENCHER”). O build de produção deve **falhar** se restar qualquer ⟦ ⟧ no HTML final (flag `ALLOW_PLACEHOLDERS=true` só em desenvolvimento).
4. **Estatísticas só com fonte.** Se não houver fonte verificável, não use número.
5. **Não afirmar endosso.** Nunca escrever que SBP, Ministério da Saúde, AHA, Anvisa ou qualquer órgão “aprova” ou “recomenda” o produto. Use: “baseado em diretrizes públicas de…”.
6. **Aviso visível** em quiz, resultado, landing e rodapé: “Este guia traz orientações gerais de primeiros socorros e não substitui curso prático nem atendimento médico. Em emergência, ligue 192.”
7. **Sem escassez falsa:** nada de cronômetro fictício, “últimas vagas” ou desconto que reinicia. Urgência só se for real.
8. **Preço de referência:** só use “de/por” se o preço “de” for verdadeiro e já praticado. Caso contrário, ancore em valor entregue, não em preço falso.
9. **Garantia mínima de 7 dias** (direito de arrependimento, CDC art. 49), com texto claro. ⟦Se eu quiser, 30 dias.⟧
10. **LGPD:** consentimento explícito (caixa não marcada) para contato por WhatsApp/e-mail, política de privacidade, canal de exclusão de dados, minimização.
11. **Pixel e dados de saúde:** nunca enviar à Meta respostas do quiz, erros, nomes de situações médicas, idade da criança ou qualquer parâmetro que revele condição de saúde. Nomes de evento e URLs neutros (detalhes na seção 6).
12. **Anúncios:** os criativos não podem afirmar nem sugerir que a pessoa ou o filho têm uma condição. Use perguntas educativas (“Você saberia o que fazer…?”).
13. **Acessibilidade:** contraste WCAG AA, fonte mínima 16px, alvos de toque ≥ 48px, navegação por teclado, `alt` em imagens, `prefers-reduced-motion`.

---

## 2. Produto, dono e marca

**Produto:** *Segundos que Salvam: O guia prático para mães que não podem depender da sorte no pior momento.* PDF ilustrado e interativo (links clicáveis, campos digitáveis, caixas de marcar), 44 páginas, 4 categorias + seção “Prepare-se”, 35 situações ⟦confirmar contra o PDF final⟧. Regra de ouro em toda página: **calma, ligar 192, agir.** Ilustrações em traço preto com destaques vermelhos, estilo manual de montagem.

**Organização dona e autora (referência de autoria):** **Mãe Preparada — Educação em Segurança e Saúde Infantil** (nome de trabalho; tagline “Preparo que acalma”). Papel no site: assina o guia (“Um guia Mãe Preparada”), tem página “Quem somos”, aparece no cabeçalho, no selo da seção de autoria e no rodapé com ⟦CNPJ⟧, ⟦e-mail de suporte⟧, ⟦WhatsApp⟧. **Não** usar “Instituto”, “Sociedade” ou “Associação” se a entidade não existir juridicamente com esse nome. Alternativas de nome, se este estiver indisponível: *Primeiros Minutos*, *Colo Seguro*, *Casa Preparada*. ⟦Registro de marca/domínio a verificar.⟧

**Oferta:** ⟦preço à vista⟧ ou ⟦N x valor⟧; entrega imediata por e-mail/área da Cakto; garantia na seção 8.13. Link de checkout: ⟦https://pay.cakto.com.br/ID\_DA\_OFERTA⟧.

---

## 3. Público e psicologia da copy

**Persona:** mãe de criança de 0 a 5 anos, 25 a 40 anos, usa celular para tudo, vem do Instagram/TikTok/Facebook, divide o cuidado com avó, babá ou creche, sente culpa e medo silenciosos, compra por impulso emocional **mas valida com lógica** (garantia, autoria, conteúdo).

**Motores de persuasão (nesta ordem):** 1) **identificação** (“é exatamente assim comigo”); 2) **lacuna de conhecimento** provada por ela mesma no quiz (nunca por acusação); 3) **consequência factual**, sem drama; 4) **alívio e controle** (“isso se aprende em minutos e se consulta na hora”); 5) **proteção da rede** (quem cuida do filho também precisa saber); 6) **risco zero** (garantia).

**Escala de intensidade emocional:** usar até o nível 4 de 5. Nível 4 = cena concreta e curta (“silêncio na sala, um pedaço de fruta, ele não tosse”), sempre seguida de agência. Nível 5 (imagens gráficas, morte, culpa direta) é proibido.

**Tom:** acolhedor, direto, frases curtas, segunda pessoa (“você”), português do Brasil falado, zero jargão. Fale **com** ela, não **sobre** ela. Nunca infantilize.

**Faça / não faça (exemplos):**

- Faça: “Ninguém te ensinou isso na maternidade.” Não faça: “Uma boa mãe saberia isso.”
- Faça: “Na hora do susto, o cérebro trava. Ter o passo a passo à mão muda tudo.” Não faça: “Se você errar, seu filho morre.”
- Faça: “Isso não diz nada sobre você como mãe.” Não faça: “Você está despreparada.”
- Faça: “Saiba o que fazer enquanto o socorro não chega.” Não faça: “Este guia garante que você vai salvar seu filho.”

**Objeções que a página precisa quebrar (cada uma com bloco próprio ou FAQ):** “vou lembrar na hora?” (por isso é guia de consulta rápida, não curso), “tem de graça na internet” (conteúdo solto e conflitante vs. organizado, ilustrado e revisado ⟦ ⟧), “eu já sei algumas coisas” (o quiz mostrou onde ainda não), “não tenho tempo” (acha a situação em 2 toques), “e se não gostar?” (garantia), “é só PDF?” (interativo, imprimível, funciona offline), “meu filho já é maior” (cobre até a idade escolar e serve a quem cuida).

---

## 4. Design system (seguir a imagem de referência)

Seguir **fielmente a identidade visual da imagem anexada** (site de dentista): fundo claro lavanda, seções cheias em índigo escuro, destaque em menta, tipografia geométrica forte, cartões muito arredondados, botões em pílula com ícone de seta ↗, palavra-chave em *itálico com marca-texto menta*. Extraia as cores da imagem com conta-gotas e fixe como variáveis CSS; valores iniciais aproximados:

- `--indigo-700: #3A2390` (seções escuras) · `--indigo-900: #2A1A73` (títulos) · `--mint-400: #6EF0B9` (botão primário, marca-texto, cartão de estatística) · `--lavender-50: #F8F7FF` (fundo) · `--lavender-100: #EEF0FF` (cartões) · `--ink-muted: #5A5683` (texto secundário).
- `--emergency-600: #D62839` **exclusivo** para “192”, alertas e “NÃO FAÇA” (herda o vermelho do guia).
- **Fonte:** Plus Jakarta Sans (800 títulos, 500/400 texto), com fallback de sistema. H1 `clamp(2.2rem, 5vw, 3.6rem)`, entrelinha 1.1; corpo 17 a 18px (mín. 16px no mobile).
- **Componente `<Em>`:** palavra em itálico + faixa menta atrás da metade inferior (assinatura da marca).
- **Botões:** primário = pílula menta, texto índigo, círculo com seta ↗; secundário = pílula com contorno índigo. Cabeçalho = logo à esquerda, navegação em pílula (item ativo com fundo lavanda), botão “Quero o guia” à direita.
- **Hero:** texto à esquerda; à direita um **cartão grande de imagem com raio 28px**, com **selo circular de texto girando** sobre o canto superior esquerdo (“BASEADO EM DIRETRIZES PÚBLICAS • SBP • MINISTÉRIO DA SAÚDE • AHA •”, sem sugerir endosso) e um **cartão branco de avaliação** na base (avatares + estrelas + texto) — **só exibir com dados reais** ⟦ ⟧.
- **Seção índigo de autoria:** cartão branco arredondado com retrato e **placa de nome em índigo** (nome + cargo + seta ↗), texto à direita, **cartão menta de estatística** (+número grande) e duas miniaturas em cartões arredondados.
- **Cartões lavanda (raio 24px)** com ícone + título + texto para as categorias, como a seção “serviços” da referência.
- **Imagens:** não usar fotos de dentista. Usar (a) ilustrações em traço preto com destaques vermelhos, como as 2 imagens anexadas, sobre lavanda; (b) mockups das páginas do PDF; (c) opcionalmente fotos licenciadas de mães e crianças **saudáveis e sorrindo**, nunca machucadas.
- **Movimento:** fade-up suave (200 a 300 ms), sem parallax pesado, respeitando `prefers-reduced-motion`.
- **Grid:** mobile-first em 375px, container 1200px no desktop, espaçamento múltiplo de 8px, sombras suaves em índigo a 10%.
- **Quiz:** mesmos tokens; tela cheia, barra de progresso menta, botões de opção grandes (≥ 56px) em lavanda com contorno índigo ao selecionar.

---

## 5. Arquitetura técnica

**Stack sugerida:** Next.js (App Router) + TypeScript + Tailwind + Framer Motion leve; deploy na Vercel (ou Netlify/Cloudflare Pages). Pode propor alternativa mais simples se justificar.

**Rotas:** `/guia` (landing fria) · `/quiz` · `/resultado` (resultado + oferta) · `/obrigada` · `/sobre` (Mãe Preparada) · `/privacidade` · `/termos` · `/contato`. `/` redireciona para `/guia`.

**API (serverless):** `/api/lead` (grava lead e envia ao meu CRM/planilha/automação via webhook ⟦URL⟧) · `/api/capi` (envia eventos do servidor à Meta) · `/api/cakto-webhook` (recebe eventos da Cakto, valida assinatura/segredo, dispara automações e, se aplicável, `Purchase` via CAPI).

**Estado do quiz:** salvar respostas, acertos, erros e perfil em `localStorage` + `sessionStorage` (mesmo domínio, **sem passar por URL**). `/resultado` sem dados → mostrar versão genérica ou redirecionar para `/quiz`. Salvar progresso para retomar.

**Atribuição:** na primeira visita capturar `utm_*`, `fbclid`, `fbp`, `fbc` e persistir (cookie/localStorage). Anexar ao link da Cakto **somente os parâmetros que a documentação da Cakto confirmar** que são aceitos; **verifique na Fase 0, não presuma**.

**Variáveis de ambiente:** `META_PIXEL_ID`, `META_CAPI_TOKEN`, `META_TEST_EVENT_CODE`, `CAKTO_CHECKOUT_URL`, `CAKTO_WEBHOOK_SECRET`, `LEAD_WEBHOOK_URL`, `ALLOW_PLACEHOLDERS`.

---

## 6. Rastreamento (Pixel + CAPI): especificação completa

**Princípios**

1. Um único módulo `tracking/track.ts` com a função `track(evento, params)`; dicionário de eventos em `tracking/events.ts`; **nenhum** `fbq` solto pelo código.
2. **Consentimento:** banner de cookies; Pixel só dispara após aceite (`fbq('consent','grant')`). Sem aceite, nada é enviado.
3. **Deduplicação:** todo evento tem `event_id` único, igual no navegador e no servidor (CAPI).
4. **Disparo único** por etapa/sessão (guarda anti-duplicidade). Se o `fbq` estiver bloqueado, falhar em silêncio sem quebrar a página.
5. **Modo debug:** `?debug=1` imprime os eventos no console.
6. **Neutralidade (saúde):** `step` é só um número; seções usam IDs neutros (`s1`, `s2`…); URLs das etapas são neutras (`/quiz#e4`). **Proibido** enviar texto de pergunta/resposta, nome de situação, idade da criança, “erros”, ou título de página que cite condição médica. Desative a coleta automática de títulos/metadados quando possível e confira no Gerenciador de Eventos se há avisos de dados restritos.
7. **Advanced Matching:** e-mail, telefone e nome com hash (SHA-256), **apenas no evento `Lead`** e após consentimento.

**Dicionário de eventos**

| Onde / quando | Evento | Tipo | Parâmetros permitidos |
| --- | --- | --- | --- |
| Qualquer página | `PageView` | padrão | automático |
| `/quiz` carregou | `ViewContent` | padrão | `content_name:'quiz'` |
| Clique em “Começar” | `QuizStart` | custom | — |
| Cada tela do quiz (perfil e perguntas) | `QuizStep` | custom | `step:1..11` |
| Última pergunta respondida | `QuizComplete` | custom | — |
| Tela de captura exibida | `LeadFormView` | custom | — |
| Captura enviada com consentimento | `Lead` | padrão | `value`/`currency` opcionais; dados com hash via CAPI |
| `/resultado` exibida | `ViewContent` | padrão | `content_name:'resultado'` |
| Faixa do resultado | `ResultView` | custom | \`band:'r1' |
| Scroll 25/50/75/90% | `ScrollDepth` | custom | `pct`, \`page:'resultado' |
| Seção visível (IntersectionObserver, ≥ 50%, 1s) | `SectionView` | custom | `section:'s1'..'sN'` (mapa interno) |
| Clique em qualquer CTA | `CTAClick` | custom | \`location:'hero' |
| Abertura de FAQ | `FAQOpen` | custom | `q:1..N` |
| Clique “Compartilhar com quem cuida” | `ShareClick` | custom | — |
| Download da Ficha grátis (isca) | `LeadMagnet` | custom | — (+ `Lead` se capturar contato) |
| Em `/guia`, clique em “Fazer o teste” | `QuizCTAClick` | custom | — |
| Checkout (Cakto) | `InitiateCheckout`, `Purchase` | padrão | **ver regra abaixo** |
| `/obrigada` exibida | `ThankYouView` | custom | — |

**Regra de checkout (evitar contagem dupla):** a Cakto permite cadastrar o **meu** Pixel no produto e dispara `InitiateCheckout` e `Purchase` no checkout dela. Portanto o site **não** deve disparar `InitiateCheckout`/`Purchase` por conta própria sem antes testar. Fluxo: no clique do CTA, disparar `CTAClick` e redirecionar (pequeno atraso de \~150 ms com `sendBeacon`). Depois, na aba “Testar eventos” da Meta, conferir se `InitiateCheckout` e `Purchase` chegam **uma vez só**. Se eu quiser CAPI de `Purchase` pelo webhook da Cakto (`purchase_approved`), usar o ID do pedido como `event_id` e **manter apenas uma fonte** se o teste mostrar duplicidade.

**Públicos e campanha (documentar em `docs/tracking.md`):** públicos personalizados de 30 dias: iniciou o quiz, concluiu o quiz e não comprou, deixou contato e não comprou, viu o resultado com 75% de scroll, clicou no CTA e não comprou. Excluir compradores de todas as campanhas de venda. Início: otimizar para `Lead`; com volume de vendas, migrar para `Purchase`. Meta de qualidade de correspondência de eventos ≥ 6, de preferência ≥ 8. Opcional: Clarity/Hotjar com **máscara de campos** de formulário.

**Funil a medir (relatório):** acessos ao quiz → início → cada etapa (queda por pergunta) → conclusão → lead → resultado → CTA → checkout → compra.

---

## 7. Quiz: especificação completa (`/quiz`)

**UX:** uma pergunta por tela, sem rolagem; barra de progresso e “Pergunta X de 8”; avanço automático \~300 ms após escolher; botão voltar; transições leves; \~2 minutos no total; tudo pensado para o polegar no celular. Depois de **cada** resposta, mostrar uma **tela de feedback** (não punitiva): acerto = selo menta; erro = cartão com selo “Vale saber” (índigo, **sem vermelho de erro**), com “o que poderia acontecer” + “o que as diretrizes indicam” e botão “Próxima”. Contador discreto “Lacunas para revisar: N”. Uma tela de respiro após a pergunta 4: “Estas situações confundem muita gente porque a conduta correta costuma ser contraintuitiva. Continue: faltam 4.”

**Tela inicial:** título “Você saberia o que fazer nos primeiros minutos de uma emergência com seu filho?” · subtítulo “8 situações reais. 2 minutos. Você descobre onde já está preparada e onde ainda não.” · botão “Começar o teste” · microcopy “Gratuito · Você só informa seu contato no final, para ver o resultado.”

**Perguntas de perfil (não pontuam):**

- **P0 — Idade do seu filho mais novo?** Menos de 1 ano · 1 a 2 anos · 3 a 5 anos · Mais de 5 anos (valores: `i1,i2,i3,i4`).
- **P0b — Quem fica com ele quando você não está?** Avó ou familiar · Babá · Creche ou escola · Sempre fico eu (`avo, baba, escola, eu`).
- **P0c — Quanto tempo você leva até o pronto-socorro mais próximo?** Menos de 10 min · 10 a 20 min · Mais de 20 min · Não sei (`t1,t2,t3,t4`).

**Perguntas pontuadas** (4 alternativas, embaralhar a ordem; ✔ = correta; 1 ponto por acerto):

**P1 — Engasgo grave (bebê).** *Seu bebê de 8 meses engasgou com um pedaço de fruta. Abriu a boca, não faz nenhum som e está ficando arroxeado. O que você faz?* Dou um pouco de água para empurrar · Viro de cabeça para baixo pelas pernas · ✔ Ligo 192 em viva-voz e faço 5 tapas nas costas e 5 compressões no peito, alternando · Enfio o dedo na garganta. **Erro:** *Água pode levar o objeto mais fundo, virar o bebê de cabeça para baixo não é recomendado e o dedo às cegas pode empurrar o objeto. No engasgo grave existe uma sequência específica.* **Acerto:** *Correto. Cabeça mais baixa que o corpo, 5 tapas entre as omoplatas e 5 compressões no peito. Ter a sequência na cabeça sob pressão é o difícil, e é isso que o guia deixa ilustrado.*

**P2 — Tosse forte com leite.** *Seu bebê engasgou com leite, está vermelho e tossindo forte, mas chora e respira. O que você faz?* Bato nas costas várias vezes · Deito de costas para descansar · ✔ Deixo tossir, mantenho sentado e levemente inclinado, e observo · Dou água. **Erro:** *Quem tosse forte está respirando e se defendendo. Bater nas costas ou deitar nesse momento atrapalha. O erro inverso também é comum: tratar tosse forte como engasgo grave.* **Acerto:** *Correto. Saber diferenciar tosse forte de engasgo grave evita pânico e manobras desnecessárias.*

**P3 — Queimadura.** *Seu filho derrubou água quente no braço. A pele está vermelha e dolorida. A primeira coisa a fazer é:* Passar pasta de dente ou manteiga · Colocar gelo direto na pele · ✔ Deixar água corrente fria sobre a queimadura por 10 a 20 minutos · Estourar as bolhas. **Erro:** *Pasta de dente e manteiga prendem o calor e aumentam o risco de infecção; gelo direto pode agravar a lesão. Nos primeiros minutos, o certo é água corrente fria.* **Acerto:** *Correto. O guia também mostra quando a queimadura exige pronto-socorro (tamanho, local, bolhas, bebês).*

**P4 — Produto de limpeza.** *Seu filho de 2 anos bebeu um pouco de produto de limpeza. O que você faz?* Provoco vômito · Dou leite para neutralizar · ✔ Ligo 0800 722 6001 ou 192 com a embalagem em mãos, sem provocar vômito · Espero para ver se aparecem sintomas. **Erro:** *Provocar vômito pode queimar a garganta de novo ou levar o produto ao pulmão. Leite e antídotos caseiros não resolvem. Esperar sintomas atrasa a orientação; cada produto tem uma conduta.* **Acerto:** *Correto. Ligar com o nome do produto, a quantidade e o peso da criança permite uma orientação precisa.*

**P5 — Convulsão com febre.** *Seu filho está com febre e começa a convulsionar. O que você faz?* Coloco um pano na boca para ele não morder a língua · Seguro firme para ele parar de tremer · Dou banho frio · ✔ Deito de lado em lugar seguro, afasto objetos, anoto a hora e ligo 192 se passar de 5 minutos. **Erro:** *Nada na boca: a criança não engole a língua e o pano pode sufocar. Segurar o corpo pode machucar. Banho frio durante a crise não ajuda.* **Acerto:** *Correto. Anotar a hora ajuda a equipe médica a decidir a conduta.*

**P6 — Pilha-botão.** *Seu filho de 2 anos engoliu a pilha do controle remoto, mas parece bem e está brincando. O que você faz?* Espero sair nas fezes · Dou laxante · ✔ Vou agora ao pronto-socorro ou ligo 192, mesmo sem sintomas · Dou comida para empurrar. **Erro:** *Pilha-botão presa no esôfago pode causar queimadura grave em cerca de 2 horas, e a criança pode parecer bem nesse tempo. Aqui, esperar é o maior risco.* **Acerto:** *Correto. Pouca gente sabe que a ausência de sintomas não significa segurança nesse caso.*

**P7 — Afogamento.** *Você sai por 30 segundos para atender o telefone e seu filho de 1 ano fica na banheira com pouca água. Qual afirmação é verdadeira?* Se ele estiver se afogando, vai gritar e eu escuto · Boia de braço protege nesse caso · ✔ Afogamento é silencioso e pode acontecer em poucos centímetros de água · Só acontece em piscina funda. **Erro:** *Afogamento infantil costuma ser silencioso, sem gritos nem agitação, e pode ocorrer em poucos centímetros de água. A regra é nunca sair, nem por um segundo.* **Acerto:** *Correto. A maioria imagina uma cena com barulho. A realidade é outra.*

**P8 — Queda com pancada na cabeça.** *Seu filho de 2 anos caiu e bateu a cabeça. Chorou, mas depois vomitou várias vezes e está muito sonolento. O que você faz?* Deixo dormir, é normal · Dou um remédio para a dor · ✔ Procuro atendimento imediatamente (192 se estiver difícil de acordar) · Observo até amanhã. **Erro:** *Vômitos repetidos e sono excessivo após pancada na cabeça são sinais de alerta e pedem avaliação na hora.* **Acerto:** *Correto. Conhecer os sinais de alerta torna a decisão rápida.*

**Captura (após a P8):** título “Seu resultado está pronto”; campos **nome**, **WhatsApp** (máscara BR) e **e-mail** (pelo menos um dos dois); caixa **não pré-marcada**: “Aceito receber meu resultado e conteúdos sobre segurança infantil da Mãe Preparada por WhatsApp/e-mail. Posso cancelar quando quiser. Política de Privacidade.” Microcopy: “Seus dados não são vendidos e não aparecem para ninguém.” Dispara `LeadFormView` ao exibir e `Lead` ao enviar com consentimento. ⟦Teste A/B: permitir “ver resultado sem cadastro”.⟧

**Tela de preparo (3 s):** “Contando suas respostas… Reunindo as situações para revisar… Montando seu resultado.” (sem falsa “análise”; o resultado já está calculado).

**Variáveis:** `{nome}`, `{acertos}`, `{lista_erros}` (nomes amigáveis: P1 “engasgo grave no bebê”, P2 “tosse forte com leite”, P3 “queimadura”, P4 “produto de limpeza”, P5 “convulsão”, P6 “pilha-botão”, P7 “afogamento”, P8 “queda com pancada na cabeça”), `{quem_cuida}` (“a avó”, “a babá”, “a escola”, “você”), `{tempo_hospital}` (“a menos de 10 minutos”, “entre 10 e 20 minutos”, “a mais de 20 minutos”, “a uma distância que você ainda não sabe, e isso também é uma lacuna”).

**Resultado A — 0 a 3 acertos (`r1`):** *Você acertou {acertos} de 8. E isso não diz nada sobre você como mãe. Diz sobre o que ninguém ensina: não se aprende isso na maternidade, na escola ou no pré-natal. Nas situações em que você errou ({lista\_erros}), a ação escolhida poderia atrapalhar ou atrasar o socorro. Acontece com muita gente, porque essas condutas são contraintuitivas. E {quem\_cuida} também precisaria saber. A boa notícia: isso se aprende em poucos minutos e se consulta na hora.*

**Resultado B — 4 a 6 acertos (`r2`):** *Você acertou {acertos} de 8. Você sabe parte, e a parte que falta pesa. Quem sabe só parte tende a confiar demais justamente onde erra, e você errou em {lista\_erros}. Mesmo nas que acertou, saber a resposta não é o mesmo que executar sob pressão: no susto, o nervosismo apaga a memória. Com o pronto-socorro {tempo\_hospital}, os primeiros minutos dependem de quem está ao lado dele.*

**Resultado C — 7 a 8 acertos (`r3`):** *Você acertou {acertos} de 8. Você está bem à frente. Mas pergunte a si mesma: se o susto acontecer de verdade, você lembraria de tudo isso sob pressão? E {quem\_cuida} sabe o mesmo? O quiz não cobriu anafilaxia, picadas, intoxicação por remédios nem RCP em bebê. O guia funciona como memória de apoio para você e para quem cuida dele.*

**Estrutura da tela de resultado:** (1) anel com “X de 8” e a mensagem da faixa; (2) até 3 cartões “Situações para revisar” (o que você escolheu → o que poderia acontecer → o que as diretrizes indicam, usando o texto de erro da pergunta); (3) bloco “Quem cuida dele também precisa saber” (se `{quem_cuida}` ≠ você); (4) **sem mudar de página**, a rolagem continua direto nas seções da oferta (seção 8 a partir da “Solução”); (5) botão “Mandar o teste para quem cuida do meu filho” (WhatsApp) e “Refazer o teste”.

---

## 8. Landing page (`/guia` e `/resultado`): seção por seção

**Regras gerais:** `/guia` e `/resultado` usam **os mesmos componentes**. A diferença está só na abertura: em `/resultado` entra a faixa dos dados do quiz e o H1 variante; em `/guia` entra o H1 padrão e um botão secundário “Fazer o teste de 2 minutos” (`QuizCTAClick`). CTA primário a cada 2 seções + barra fixa no mobile. Cada seção tem ID neutro (`s0`, `s1`…) para o `SectionView`. Layout e componentes da seção 4. Os textos abaixo são a copy-base: pode refinar, sem perder tom, honestidade nem as regras da seção 1.

### 8.1 Barra superior + cabeçalho (s0)

Barra fina índigo: “Guia ilustrado · Acesso imediato · Garantia de 7 dias”. Cabeçalho: logo **Mãe Preparada**; links-âncora (O guia, Por dentro, Quem fez, Dúvidas); botão pílula menta “Quero o guia ↗”.

### 8.2 Hero (s1)

- **Faixa dos dados (só em `/resultado`):** “{nome}, você acertou {acertos} de 8. As situações para revisar: {lista\_erros}.”
- **Etiqueta:** “Um guia Mãe Preparada”.
- **H1 padrão (`/guia`):** “Nos primeiros minutos de uma emergência, o que você faz importa. Saiba o *quê* antes de precisar.” (alternativas para teste: “Seu filho depende de você nos primeiros minutos. Saiba o que fazer *antes* do socorro chegar.” / “A sorte não deveria decidir o pior momento. O *preparo* decide.”)
- **H1 variante (`/resultado`):** “Você acertou {acertos} de 8. Agora veja como transformar *dúvida* em passo a passo.”
- **Subtítulo:** “**Segundos que Salvam** é o guia ilustrado, passo a passo, que mostra o que fazer — e o que NÃO fazer — em engasgo, queimadura, convulsão, afogamento, intoxicação e mais de 30 situações. Em toda página, a mesma regra de ouro: calma, ligar 192, agir.”
- **CTAs:** “Quero o guia agora ↗” (primário) · “Ver o que tem dentro” (secundário). Em `/guia`, adicionar “Fazer o teste de 2 minutos”.
- **Checks:** “Passo a passo ilustrado, como um manual de montagem” · “O que fazer *e* o que não fazer em cada situação” · “Quando ligar 192 e quando ir ao pronto-socorro”.
- **Visual:** cartão grande com mockup do guia (capa + página aberta), selo circular girando e cartão de avaliação ⟦exibir apenas com dado real: “⟦N⟧ mães já têm o guia”⟧.
- **Aviso curto abaixo do hero:** “Este guia não substitui curso prático nem atendimento médico. Em emergência, ligue 192.”

### 8.3 A realidade: a dor, no limite correto (s2)

**H2:** “Ninguém te ensinou isso. E a emergência não avisa.” **Texto:** “Na maternidade você aprendeu a trocar fralda, a amamentar, a acalmar o choro. Mas ninguém te entregou o passo a passo do que fazer quando o choro **para**, ou quando o silêncio assusta mais que o choro. Na hora do susto, o cérebro trava. Quem não treinou, improvisa. E o improviso, nessas situações, costuma ser exatamente o que **não** se deve fazer.” **Três cenas (cartões lavanda, ilustração em traço, sem criança ferida):**

1. *Silêncio na sala.* “Um pedaço de fruta. Ele não tosse, não chora. Cada segundo parece uma hora. Você sabe qual é o primeiro movimento?”
2. *Madrugada.* “A febre subiu e o corpinho começa a tremer. Você sabe o que **nunca** colocar na boca dele?”
3. *Só um minuto.* “O telefone tocou. Foram 30 segundos. Você sabe como um afogamento realmente acontece, e que quase nunca faz barulho?” **Fecho (alívio):** “Não é sobre medo. É sobre ter o primeiro passo na ponta dos dedos, mesmo com o coração acelerado.”

### 8.4 O instinto engana: 6 erros que parecem certos (s3)

**H2:** “Os 6 erros que *parecem* certos.” Grade de 6 cartões **“O que muita gente faz” → “O que as diretrizes indicam”** (borda vermelha só no lado do erro):

1. Dar água a quem engasgou → não dar; seguir a sequência correta e ligar 192.
2. Pasta de dente ou manteiga na queimadura → água corrente fria por 10 a 20 minutos.
3. Provocar vômito após produto de limpeza → não provocar; ligar 0800 722 6001 ou 192 com a embalagem.
4. Pano na boca durante a convulsão → nada na boca; deitar de lado e anotar a hora.
5. Esperar a pilha-botão sair sozinha → emergência, mesmo sem sintomas.
6. Bater nas costas de quem tosse forte → deixar tossir; quem tosse está respirando. **Fecho:** “Todos os passos corretos, ilustrados, estão no guia.” + CTA.

### 8.5 A solução: apresentação do guia (s4) — seção índigo, como a referência

**H2:** “Um guia feito para ser usado *no susto*.” **Texto:** “**Segundos que Salvam** transforma diretrizes públicas de primeiros socorros pediátricos em páginas simples: ilustração, passo a passo, o que **não** fazer e quando ligar 192. Você abre no celular, acha a situação em dois toques e segue. Sem texto longo, sem jargão, sem improviso.” **Layout:** cartão branco com mockup à esquerda (no lugar do retrato); texto à direita; **cartão menta de estatística** “35 situações” ⟦confirmar⟧ e dois cartões menores “44 páginas ilustradas” e “192 primeiro, sempre”; miniaturas de páginas do guia. Botão “Quero o guia agora ↗”.

### 8.6 Como usar: Calma. Ligue. Aja. (s5)

Três cartões numerados com ícone: **1 Respire** (“5 segundos: inspire fundo, solte devagar. Sua calma é a primeira ferramenta.”) · **2 Ligue 192** (“Em viva-voz. A atendente guia você enquanto você age.”) · **3 Aja** (“Siga o passo a passo da página. Só o que ajuda, sem improviso arriscado.”).

### 8.7 Por dentro do guia (s6)

**H2:** “Tudo o que importa, organizado por situação.” Cartões lavanda com ícone (estilo “serviços” da referência): **A Asfixia e respiração** (engasgo, RCP, afogamento, falta de ar…) · **B Traumas e lesões** (queda com pancada na cabeça, fraturas, hemorragia, olhos…) · **C Acidentes domésticos** (queimaduras, choque elétrico, intoxicação, pilhas e ímãs…) · **D Clínicas e externas** (convulsão, febre, desidratação, alergia grave, picadas, insolação…) · **E Prepare-se** (kit, casa segura, ficha da criança, autoteste). Cada cartão abre uma lista (Apêndice A).

### 8.8 Veja uma página de perto (s7)

Mockup grande de uma página do guia com **anotações numeradas** apontando: número do passo, ilustração, texto curto, caixa “NÃO FAÇA”, caixa “LIGUE 192 / VÁ AO PS SE…”, botão “ÍNDICE”, atalho “TEL. 192”, campo “Já li e treinei”. Título: “Feita para quem está nervosa e precisa agir.”

### 8.9 O que você recebe (s8): pilha de valor

Título: “Tudo o que você leva.” Cada item com **o que resolve** (valor entregue, sem preços falsos):

1. **Guia principal “Segundos que Salvam”** — 35 situações, 44 páginas ilustradas, com “o que não fazer” e “quando ligar 192”. *Resolve: saber o primeiro passo certo.*
2. **Ficha de Emergência da Criança** (campos digitáveis) — peso, alergias, pediatra, contatos, endereço. *Resolve: não precisar lembrar dados no susto.*
3. **Roteiro da ligação para o 192** — o que dizer, em ordem. *Resolve: ligar com clareza, mesmo nervosa.*
4. **Checklist do Kit de Primeiros Socorros da casa**. *Resolve: ter o que precisa antes de precisar.*
5. **Checklist Casa Segura por cômodo**. *Resolve: evitar o acidente antes dele.*
6. **Autoteste** com gabarito. *Resolve: treinar a memória a cada 6 meses.*
7. **Versão para imprimir e colar na geladeira**.
8. **Bônus ⟦a produzir⟧: Guia rápido de 1 página para avós e babás.** *Resolve: quem cuida dele também sabe agir.*
9. **Bônus ⟦a produzir⟧: Cartaz de emergência para a geladeira.**
10. **Atualizações** ⟦definir política: ex. gratuitas por X meses⟧. **Fecho de valor (honesto):** “Quanto vale ter o passo a passo à mão pelo resto da infância dele? Você pode nunca precisar usar. Se precisar, vai estar pronta.” Ancoragem de preço só com comparação **verdadeira e verificável** ⟦ ⟧ (ex.: custo de um curso presencial, **se eu tiver o valor real**). Preço: ⟦“de R$ X por apenas R$ Y” só se X for real, ou apenas R$ Y⟧.

### 8.10 Para quem cuida dele também (s9)

**H2:** “Você não está sempre lá. O guia está.” Texto: “A avó, a babá, a escola: quem fica com seu filho precisa saber o primeiro passo. Envie o guia para quem cuida dele e fique mais tranquila.” Botão “Enviar para quem cuida do meu filho” (WhatsApp, `ShareClick`).

### 8.11 Quem está por trás do guia: autoria e credibilidade (s10)

**Bloco 1 — Organização (real):** “**Mãe Preparada** — Educação em Segurança e Saúde Infantil.” Missão em 2 linhas ⟦escrever⟧; link para `/sobre`; ⟦CNPJ⟧; ⟦e-mail⟧. **Bloco 2 — Como este guia foi feito (4 passos):** 1) reunimos diretrizes públicas (SBP, Ministério da Saúde, AHA/ERC, Anvisa e centros de intoxicação); 2) transformamos em passos curtos e ilustrados; 3) revisão ⟦por profissional habilitado: informar apenas se for verdade⟧; 4) atualização ⟦periodicidade⟧. **Fontes:** lista com links; texto: “Baseado em diretrizes públicas. Não há endosso destas instituições ao produto.” **Bloco 3 — Especialista (ESTRUTURA PARA EU PREENCHER, no layout do cartão branco com retrato e placa de nome em índigo da referência):** ⟦foto real autorizada⟧ · ⟦nome⟧ · ⟦título (ex.: enfermeira pediátrica, pediatra, socorrista)⟧ · ⟦registro profissional verificável (COREN/CRM/outro) com link⟧ · ⟦mini-bio de 3 linhas⟧ · ⟦o que revisou e quando⟧ · ⟦citação real e autorizada⟧ · ⟦assinatura⟧. Com `SPECIALIST_ENABLED=false`, exibir no lugar o bloco honesto “Equipe editorial Mãe Preparada” (sem credenciais). **Nunca** exibir cargo, registro ou foto não verdadeiros.

### 8.12 Depoimentos (s11): ESTRUTURA para eu preencher com casos reais

**H2:** “O que as mães dizem.” Carrossel de 6 cartões: ⟦foto autorizada⟧ · ⟦primeiro nome + cidade⟧ · ⟦faixa de idade do filho (opcional)⟧ · ⟦depoimento de 2 a 3 linhas, real e autorizado⟧ · ⟦data⟧ · estrelas **só se reais**. Mais 1 slot de vídeo ⟦ ⟧. **Temas-alvo** (importa, valor, tranquilidade; **nunca** “salvou meu filho” nem promessa de resultado): importância de toda mãe ter; clareza do passo a passo; valor percebido; tranquilidade de compartilhar com avó/babá; facilidade de consulta no celular; qualidade das ilustrações. Rodapé do bloco: “Depoimentos de leitoras, usados com autorização. Cada caso é um caso.” Roteiro de coleta no Apêndice B.

### 8.13 Comparação honesta (s12)

Tabela: **Nada · Vídeos e posts soltos · Curso presencial · Segundos que Salvam**, nas linhas: organizado por situação · consulta rápida na hora · ilustrado passo a passo · “o que não fazer” · serve a avó/babá · treino prático com instrutor. Seja honesta: o curso presencial **vence** no treino prático; recomende-o como complemento. Texto: “O guia não substitui o curso. Ele garante que, no susto, você não parta do zero.” (sem a palavra “garante”: usar “ajuda a não partir do zero”).

### 8.14 Oferta e garantia (s13)

Cartão único, forte: nome do produto, mini-lista dos 10 itens, preço ⟦ ⟧, parcelas ⟦ ⟧, botão “Quero o guia agora ↗” → checkout Cakto. Trust bar: “Acesso imediato · Pagamento seguro pela Cakto · Baixe e use offline · Garantia de 7 dias”. **Garantia:** “Você tem 7 dias para ler, folhear e imprimir. Se achar que não é pra você, peça o reembolso e devolvemos o valor. Sem perguntas.” ⟦ou 30 dias⟧. Selo da garantia no estilo da marca.

### 8.15 Perguntas frequentes (s14)

“Substitui um curso de primeiros socorros?” (Não; recomendamos fazer um curso prático, o guia é apoio de consulta.) · “Para qual idade serve?” (Foco em bebês e crianças pequenas; útil até a idade escolar.) · “Como recebo?” (Por e-mail e pela área da Cakto, logo após a confirmação.) · “Posso imprimir?” (Sim, e colar a ficha na geladeira.) · “Funciona offline?” (Sim, é um PDF.) · “Os campos da ficha são digitáveis?” (Sim, em leitores de PDF compatíveis.) · “Quem fez?” (Mãe Preparada; fontes na seção de autoria.) · “E se não gostar?” (Garantia.) · “Eu preciso estar nervosa para usar?” (Foi feito para isso: páginas curtas, ilustradas, com a regra de ouro.) · “Posso compartilhar com a avó?” (Use o botão de enviar; para uso familiar.) Dispara `FAQOpen`.

### 8.16 CTA final emocional (s15)

**H2:** “Você pode nunca precisar. Mas, se precisar, vai estar pronta.” Texto curto + botão. Reafirmar garantia e aviso de que não substitui atendimento médico.

### 8.17 Rodapé

Logo, tagline, links (Sobre, Privacidade, Termos, Contato), ⟦CNPJ⟧, ⟦e-mail⟧, aviso médico completo, “Este site não é afiliado ao Facebook/Meta” e links obrigatórios das plataformas.

**Extras:** barra fixa mobile com CTA (aparece após o hero, some perto da oferta) · **isca grátis opcional:** Ficha de Emergência da Criança (1 página) por e-mail, via popup de saída no desktop e faixa no fim da página no mobile (gera `LeadMagnet` + `Lead` com consentimento) ⟦arquivo a produzir⟧.

---

## 9. Biblioteca de microcopy

- **CTAs (varie, teste):** “Quero o guia agora” · “Quero estar preparada” · “Receber o guia agora” · “Garantir meu guia”. Evitar “Compre”.
- **Trust bar:** “Acesso imediato · Garantia de 7 dias · Pagamento seguro · Baixe e use offline”.
- **Alívio após dor:** “Isso se aprende em minutos.” · “Você não precisa decorar: precisa saber onde olhar.” · “Um toque e você está na página certa.”
- **Regra de ouro (repetir em vários pontos):** “Calma. Respire. Ligue 192.”
- **Proibido no texto:** “garante”, “salva vidas”, “se você não souber, seu filho…”, “mãe irresponsável”, “últimas unidades”, relógio falso.

---

## 10. Páginas auxiliares, pós-compra e nutrição

- **`/obrigada`:** confirmação calorosa, como acessar/baixar o PDF e abrir os links e campos, como imprimir a ficha, botão de compartilhar com quem cuida, convite para um curso prático. Dispara `ThankYouView`. Configurar na Cakto o redirecionamento pós-compra para esta URL. Upsell opcional ⟦ ⟧ (a Cakto permite página de upsell).
- **`/sobre`, `/privacidade`, `/termos`, `/contato`:** textos claros; `/privacidade` descreve Pixel, CAPI, cookies, finalidade, base legal, direitos do titular e como excluir dados.
- **Nutrição por WhatsApp/e-mail (com consentimento e opção de sair em toda mensagem):** M1 (na hora) resultado + link; M2 (+2 h) “o erro mais comum do quiz” + link; M3 (D+1) uma situação que ela errou, com dica útil e link; M4 (D+2) autoria e como foi feito; M5 (D+3) garantia e objeção “já sei algumas coisas”; M6 (D+5) lembrete final **sem falsa urgência**. Quem comprar sai da sequência (webhook `purchase_approved`). Abandono de checkout (`checkout_abandonment`) dispara 1 mensagem de ajuda, não de pressão.

---

## 11. Performance, SEO, segurança

- **Performance:** LCP < 2,5 s, CLS < 0,1, Lighthouse mobile ≥ 90; imagens AVIF/WebP com `srcset`; fonte pré-carregada; JS mínimo; sem bibliotecas pesadas.
- **SEO:** `/guia` indexável (title, meta, Open Graph, dados estruturados Product, FAQ e Organization, **sem alegações médicas**); `/quiz`, `/resultado`, `/obrigada` com `noindex`.
- **Segurança:** HTTPS, cabeçalhos de segurança, rate-limit nas APIs, validação de entrada, segredos só no servidor, verificação do segredo do webhook da Cakto, sem dados pessoais em logs.

---

## 12. QA e critérios de aceite

1. Todos os eventos da seção 6 aparecem **uma vez** na aba “Testar eventos”, com o `event_id` correto, em mobile real.
2. Nenhum evento carrega texto de pergunta/resposta, situação médica, idade ou “erros”; Pixel só dispara após consentimento.
3. `InitiateCheckout` e `Purchase` não duplicam entre site, Cakto e CAPI.
4. UTMs/`fbclid` chegam ao checkout nos parâmetros que a Cakto aceita (conferido na documentação e no teste).
5. Quiz completo funciona sem rolagem em 360×640; retoma progresso; `/resultado` sem dados cai no fallback.
6. Nenhum ⟦ ⟧ no build de produção; `ALLOW_PLACEHOLDERS=false`.
7. Todas as regras da seção 1 verificadas por revisão de copy (lista de termos proibidos automatizada).
8. Acessibilidade AA, teclado, leitor de tela nos formulários; Lighthouse ≥ 90.
9. Aviso médico, garantia e políticas visíveis em todas as páginas do funil.

---

## 13. Ordem de execução, entregáveis e testes A/B

**Entregáveis:** repositório com código; `research/benchmark.md`; `docs/tracking.md` (dicionário de eventos, públicos, passo a passo de teste); `docs/pendencias.md` (lista de todos os ⟦ ⟧ com onde aparecem); `README.md` (como rodar, variáveis, deploy).

**Testes A/B (nesta ordem):** 1) H1; 2) captura obrigatória vs. “ver resultado sem cadastro”; 3) texto do CTA; 4) preço à vista vs. parcelado em destaque; 5) ordem das seções 3 e 4; 6) garantia de 7 vs. 30 dias. Rodar um teste por vez, com volume mínimo definido antes.

**Comece agora pela Fase 0 e pare ao final dela e da Fase 1 para minha aprovação.**

---

## Apêndice A — Situações do guia (para as listas da seção 8.7)

**A. Asfixia e respiração:** engasgo grave no bebê · engasgo grave em criança · engasgo com leite, água ou comida (tosse) · RCP no bebê (2 páginas) · RCP em criança · sufocamento no berço e sono seguro · asfixia mecânica (cordões, sacolas, entalado) · afogamento · crise de falta de ar (asma, bronquiolite, crupe) · posição lateral de segurança. **B. Traumas e lesões:** queda com batida na cabeça (checklist) · suspeita de lesão no pescoço ou coluna · fraturas e luxações · hemorragia e cortes profundos · sangramento nasal · esmagamento de dedos · trauma ocular. **C. Acidentes domésticos:** queimaduras (graus) · queimadura térmica · queimadura química e elétrica · choque elétrico · intoxicação (limpeza e medicamentos) · pilhas-botão e ímãs · moedas e outros objetos engolidos · objeto no nariz ou no ouvido. **D. Clínicas e externas:** convulsão febril · febre alta (inclusive à noite) · desidratação · reação alérgica grave (anafilaxia) · picadas de abelha e vespa · escorpião, aranhas e lagartas · picada de cobra · mordida de animais · insolação. **E. Prepare-se:** kit de primeiros socorros · casa segura por cômodo · ficha da criança · autoteste.

## Apêndice B — Roteiro para coletar depoimentos REAIS (para mim, fora do site)

1. Ofereça o guia a 15 a 30 mães (leitoras beta) antes do lançamento, **sem prometer nada em troca do elogio**.
2. Pergunte: “O que mudou na sua tranquilidade?” · “Por que você acha que toda mãe deveria ter?” · “O que mais te ajudou na página?” · “Para quem mais você enviou?” · “O que você diria para quem está em dúvida?”
3. Peça **autorização escrita** (texto, nome, foto, cidade); guarde prints e datas.
4. Oriente: contar a experiência com o material, **sem** afirmar que o guia “salvou” alguém ou garantiu resultado.
5. Não edite o sentido; só corrija ortografia com o OK dela. Revise a cada 6 meses.

## Apêndice C — Marcador visual de pendência

Componente `<Pendente>`: caixa com borda tracejada índigo, fundo lavanda e etiqueta “PREENCHER: descrição do que falta”. Em produção o build **falha** se existir (ver regra 3 da seção 1).
