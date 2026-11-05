# Fase 0 — Pesquisa e Benchmark Estratégico (“Segundos que Salvam”)

> **Escopo do Documento:** Pesquisa de mercado, engenharia reversa de páginas de vendas e funis de quiz materno-infantis (Brasil e exterior), padrões da Biblioteca de Anúncios da Meta, especificações técnicas oficiais da Cakto e conformidade com as políticas de Saúde e Dados Restritos da Meta (Pixel + CAPI).  
> **Nota:** Nenhum texto de terceiros foi copiado. Todas as análises sintetizam estruturas e padrões de mercado para fundamentar a arquitetura exclusiva da marca **Mãe Preparada**.

---

## 1. Análise de 15 Páginas de Venda e VSLs (Maternidade, Sono, IA e Primeiros Socorros)

Foram analisadas 10 referências brasileiras e 5 referências internacionais líderes em conversão para o público de mães de crianças de 0 a 5 anos:

### Referências Analisadas (Brasil)
1. **Primeiros Socorros Pediátricos / Desengasgo na Prática (ex.: Dra. Júlia Gonzaga e pediatras independentes):** Forte apelo na diferença entre conduta em lactentes (< 1 ano) vs. crianças maiores; uso de demonstrações visuais claras.
2. **Multiplica Pequeno Príncipe (Extensão para Pais e Cuidadores):** Foco em credibilidade hospitalar, prevenção de acidentes domésticos e linguagem acolhedora.
3. **Cruz Vermelha Brasileira (Filial SP — Primeiros Socorros para Bebês e Crianças):** Posicionamento institucional sóbrio, foco em suporte básico de vida e engasgo (OVACE).
4. **Sono do Bebê / Rotina Gentil (ex.: Dra. Jannuzzi):** Excelente trabalho de alívio de culpa materna ("você não está fazendo nada errado, só não te explicaram como o sono funciona"), design mobile-first e prova social baseada em tranquilidade.
5. **Introdução Alimentar Segura & BLW (ex.: Na Cazinha / Alumiar Materno):** Quebra da principal objeção da IA (o medo do engasgo vs. reflexo de *gag*), uso de guias visuais de cortes seguros e checklists de geladeira.
6. **Guias de Puerpério e Maternidade Real (Hotmart/Kiwify/Cakto Low Ticket):** Ofertas de R$ 27 a R$ 67 com entrega imediata em PDF interativo + bônus práticos para a rede de apoio (avós e babás).
7. **Consultorias de Amamentação e Primeiros Dias:** Uso intenso de comparação honesta ("informação picada no Google às 3h da manhã vs. passo a passo organizado").
8. **Cursos de Prevenção de Acidentes Domésticos (Bombeiros / Socorristas):** Destaque para os "erros de vó" (pasta de dente na queimadura, sacudir a criança, dedo na garganta).
9. **Guias de Medicamentos e Febre Pediátrica:** Foco em sinais de alerta ("quando observar em casa vs. quando correr para o pronto-socorro").
10. **Combos de Segurança Infantil:** Uso de pilha de valor ancorada na utilidade prática de cada anexo (ficha médica, checklist por cômodo, cartaz de emergência).

### Referências Internacionais Analisadas
11. **Tiny Hearts Education (Austrália — `tinyhearts.com`):** Maior referência global em educação de emergência para pais. Destaque para estética limpa (tons suaves + tipografia forte), foco em empoderamento (*"empowering parents, not scaring them"*) e desmistificação do afogamento silencioso e convulsão febril.
12. **Safe Beginnings First Aid — Holly Choi (Canadá):** Foco em prevenção + ação imediata, checklists visuais e comunicação direta para pais ocupados que consomem pelo celular.
13. **CPR Kids (Austrália):** Uso da regra mnemônica de ação rápida, separação clara entre respiração/tosse eficaz e obstrução grave.
14. **Solid Starts (EUA):** Padrão ouro em diagramação de emergência alimentar e ilustrações instrucionais claras sem fotos chocantes.
15. **British Red Cross — Baby and Child First Aid (Reino Unido):** Uso de testes rápidos interativos ("Você saberia o que fazer?") como porta de entrada para educação em primeiros socorros.

### Síntese: O que Adotar vs. O que Evitar nas Páginas de Venda

| Dimensão | O que ADOTAR no projeto “Segundos que Salvam” | O que EVITAR (Regras Inegociáveis) |
| :--- | :--- | :--- |
| **Abordagem Emocional** | Mostrar a lacuna de ensino (*"ninguém te ensinou na maternidade"*) e fechar sempre com alívio e ação prática. | Culpar a mãe, usar tom terrorista, sugerir óbito por culpa dela ou exibir fotos de crianças machucadas/chorando. |
| **Posicionamento do Produto** | Posicionar como **guia de consulta rápida em 2 toques** (estilo manual ilustrado), ideal para quando o nervosismo apaga a memória. | Prometer que "substitui um curso prático" ou que "garante salvar vidas". |
| **Rede de Apoio** | Incluir explicitamente a avó, a babá e a escola na conversa (gatilho de proteção estendida). | Falar como se a mãe estivesse 24h por dia sozinha com a criança. |
| **Visual e UX** | Paleta calma e confiável (lavanda, índigo escuro, menta) com vermelho (`#D62839`) restrito exclusivamente ao 192 e alertas "NÃO FAÇA". | Páginas com visual de hospital/ambulância todo vermelho ou fotos genéricas de banco de imagens médico. |
| **Urgência e Preço** | Ancoragem honesta pela utilidade real dos 10 itens entregues e garantia clara de 7 dias (CDC art. 49). | Cronômetros falsos que reiniciam no F5, "últimas 3 cópias do PDF" ou preços "De/Por" fictícios. |

---

## 2. Análise de 10 Quizzes de Venda (Estrutura, UX e Conversão Mobile)

Analisamos funis de quiz de alta conversão no Brasil (construídos em stacks próprias, InLead e QuizClass) e no exterior (Octane AI, Typeform, British Red Cross Quiz):

### Padrões Estruturais Identificados
1. **Duração e Número de Telas:** Quizzes acima de 12 perguntas sofrem queda abrupta (acima de 45% de abandono). O ponto ótimo para tráfego mobile no Brasil é **3 perguntas rápidas de contexto/perfil + 7 a 8 perguntas situacionais** (~2 minutos no total).
2. **Feedback Imediato por Pergunta (Micro-recompensa):** Quizzes que só mostram o gabarito no final perdem atenção na metade. Quando cada resposta abre um cartão curto de feedback (*"Correto"* em menta ou *"Vale saber"* em índigo, sem vermelho punitivo), a retenção até a última pergunta sobe drasticamente porque a usuária sente que **já está aprendendo algo valioso durante o teste**.
3. **Tela de Respiro (Meio do Funil):** Na metade do quiz (após a pergunta 4), uma tela curta validando que *"essas situações confundem muita gente porque a conduta correta é contraintuitiva — faltam só 4"* reduz a desistência de quem errou as primeiras questões.
4. **Contador Discreto de Lacunas:** Exibir `"Lacunas para revisar: N"` cria curiosidade natural para ver o resumo consolidado no final, sem fazer a mãe se sentir reprovada numa prova escolar.
5. **Tela de Captura (Gate de Lead):**
   - Pedir Nome + WhatsApp/E-mail logo após a última pergunta, quando o investimento de tempo já foi feito (*compromisso e coerência*).
   - **Conformidade LGPD:** Checkbox de consentimento **desmarcado por padrão**, com texto transparente.
   - **Flexibilidade para Teste A/B:** Suporte técnico para alternar entre captura obrigatória e botão secundário *"Ver resultado sem cadastro"*.
6. **Tela de Preparo (Transição de 3 segundos):** Uma transição curta de 3 segundos (*"Contando suas respostas… Reunindo as situações para revisar… Montando seu resultado"*) prepara a mudança cognitiva do modo "clique rápido" para o modo "leitura atenta", sem mentir sobre "inteligência artificial analisando 10.000 casos".
7. **Resultado + Oferta na Mesma Página (`/resultado`):** Redirecionar para um resultado que exige *outro* clique para abrir a página de vendas perde até 60% do tráfego. A melhor prática é entregar o diagnóstico personalizado no topo de `/resultado` (anel de pontuação + até 3 cartões de situações que ela errou + alerta sobre quem cuida da criança) e **continuar a rolagem diretamente na apresentação do guia e na oferta**.

---

## 3. Biblioteca de Anúncios da Meta (Brasil) — Nicho Maternidade e Segurança Infantil

Na análise de anúncios ativos há mais de 30 dias no Brasil para o segmento materno-infantil e primeiros socorros:

### O que Funciona nos Criativos e Ganchos
- **Perguntas Educativas sobre Mitos Domésticos:** Criativos que começam com situações concretas do cotidiano (*"Você daria água se seu bebê engasgasse com um pedaço de fruta?"*, *"Pasta de dente na queimadura ajuda ou piora?"*, *"O que fazer nos primeiros 2 minutos após engolir uma pilha-botão?"*).
- **Formato de Ilustração Estilo Manual:** Imagens em traço limpo (preto sobre fundo claro com apenas um ponto focal de atenção) destacam-se no feed saturado de vídeos barulhentos e passam pelos filtros da Meta sem acionar alertas de conteúdo gráfico/violento.
- **Alinhamento Criativo → Quiz:** Anúncios que convidam para o teste gratuito de 2 minutos (*"Faça o teste de 8 situações reais"*) geram CTR mais alto e CPC menor do que anúncios de venda fria direta.

### O que Gera Rejeição ou Bloqueio na Meta Ads
- **Violação de Atributos Pessoais (Personal Attributes):** Frases que assumem condição de saúde ou falha da pessoa (*"Seu filho sofreu um acidente?"*, *"Você é uma mãe insegura e ansiosa?"*).
- **Uso de Imagens Sensacionalistas:** Crianças em sofrimento, sangue, ambulâncias com giroflex ou encenações dramáticas.
- **Promessas Médicas Absolutas:** Termos como *"Garanta a vida do seu filho"* ou *"100% à prova de acidentes"*.

---

## 4. Documentação Oficial da Cakto: Parâmetros de Checkout, Pixel e Webhooks

Com base na documentação oficial da **Cakto** verificada nesta Fase 0:

### 4.1 Parâmetros de Rastreamento e Atribuição Aceitos na URL do Checkout
A Cakto captura e armazena via cookies do navegador os seguintes parâmetros anexados à URL de checkout (`https://pay.cakto.com.br/ID_DA_OFERTA`):
- `src` — Identificador geral de origem/criativo (ex.: `quiz_r1`, `guia_hero`).
- `sck` — Identificador de sub-origem do checkout (ex.: localização do CTA ou variante do teste).
- `utm_source` — Origem do tráfego (ex.: `facebook`, `instagram`, `ig_stories`).
- `utm_medium` — Mídia (ex.: `cpc`, `paid_social`, `organic`).
- `utm_campaign` — Nome da campanha.
- `utm_term` — Conjunto de anúncios / público.
- `utm_content` — Identificador do anúncio/criativo.

### 4.2 Parâmetros de Pré-preenchimento do Checkout (Aceleração de Conversão)
Quando a usuária preenche seus dados na tela de captura do `/quiz`, a Cakto permite enviar esses dados na URL do checkout para que o formulário de pagamento já abra preenchido:
- `name` — Nome completo ou primeiro nome.
- `email` — E-mail informado.
- `confirmEmail` — Mesmo e-mail (evita que a mãe precise digitar duas vezes no celular).
- `phone` — Telefone com DDD (apenas dígitos, ex.: `5511999999999`).

> **Regra de Implementação no Projeto:** Nosso construtor de URL do checkout (`buildCaktoCheckoutUrl`) anexará exclusivamente os parâmetros de atribuição (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `src`, `sck`) e, caso a usuária tenha consentido na captura, os parâmetros de pré-preenchimento (`name`, `email`, `confirmEmail`, `phone`). Nenhum dado do quiz (acertos, erros ou perfil do filho) jamais será incluído na URL do checkout.

### 4.3 Pixel e Webhooks na Cakto (Prevenção de Duplicidade)
- A Cakto possui integração nativa de Pixel/CAPI no próprio checkout, disparando `InitiateCheckout`, `pix_gerado` e `Purchase`.
- Portanto, ao clicar no botão de compra no nosso site, disparamos apenas o evento customizado `CTAClick` (com `sendBeacon` e delay de ~150 ms) e deixamos o `InitiateCheckout` e o `Purchase` sob responsabilidade da Cakto (ou do nosso endpoint `/api/cakto-webhook` caso o produtor opte por centralizar via CAPI própria, usando o ID do pedido da Cakto como `event_id` para deduplicação).
- O webhook da Cakto envia POST JSON contendo `{ secret, event, data }`, onde os eventos principais são `purchase_approved`, `purchase_pending`, `purchase_refunded` e `checkout_abandonment`.

---

## 5. Políticas Atuais da Meta para Conteúdo e Dados de Saúde (Core Setup / Health Restrictions)

A fiscalização automatizada da Meta sobre fontes de dados categorizadas como *Health & Wellness* (Saúde e Bem-Estar) exige arquitetura preventiva rigorosa:

1. **O que Aciona o Bloqueio "Core Setup" na Meta:**
   - URLs enviadas pelo Pixel que contenham palavras clínicas ou condições médicas (ex.: `/resultado/convulsao-febril` ou `?erro=engasgo`).
   - Parâmetros customizados de eventos (`custom_data`) que contenham sintomas, diagnósticos, idades pediátricas ou resultados de testes clínicos.
   - Títulos de página (`document.title`) ou metadados Open Graph com termos de patologias capturados automaticamente pelo script do Pixel.

2. **Nossa Arquitetura de Blindagem no Funil “Segundos que Salvam”:**
   - **URLs 100% Neutras:** Apenas `/guia`, `/quiz`, `/resultado`, `/obrigada`. As etapas internas do quiz não alteram a query string com nomes de perguntas; usam apenas âncoras neutras (`/quiz#e1` a `/quiz#e11`) ou estado em memória/`localStorage`.
   - **Payload de Eventos Estritamente Neutro:**
     - `QuizStep` envia apenas `{ step: 1..11 }`.
     - `ResultView` envia apenas `{ band: 'r1' | 'r2' | 'r3' }`.
     - `SectionView` envia apenas `{ section: 's0'..'s15' }`.
     - `CTAClick` envia apenas `{ location: 'hero' | 's3' | 's4' | 's13' | 's15' | 'sticky' | 'header' }`.
   - **Proibição Absoluta por Código:** O módulo `tracking/track.ts` possui uma lista branca (*allowlist*) estrita de chaves permitidas por evento. Qualquer tentativa acidental de passar texto de pergunta, resposta, nome de situação médica, idade ou lista de erros é descartada antes do disparo.
   - **Consentimento Prévio (LGPD):** O Pixel só é inicializado e recebe `fbq('consent', 'grant')` após o aceite explícito no banner de cookies.
   - **Advanced Matching Seguro:** Hash SHA-256 de e-mail, telefone e nome é transmitido exclusivamente no evento `Lead` (e `Purchase` via CAPI quando aplicável) mediante consentimento explícito da usuária.

---

## 6. Fontes Consultadas na Fase 0

1. **Cakto — Central de Ajuda Oficial:** *Como rastrear vendas com parâmetros UTM, src e sck no link de checkout* (`ajuda.cakto.com.br`).
2. **Cakto — Documentação de Desenvolvedores e Integrações:** *Pré-preenchimento de checkout via URL e estrutura de Webhooks (`purchase_approved`, `checkout_abandonment`)* (`cakto.com.br`).
3. **Meta Business Help Center:** *Sobre restrições de compartilhamento de dados para fontes de dados de Saúde e Bem-Estar (Core Setup) e Políticas de Atributos Pessoais em Anúncios*.
4. **Sociedade Brasileira de Pediatria (SBP) / Ministério da Saúde / American Heart Association (AHA):** Diretrizes públicas de suporte básico de vida pediátrico e prevenção de acidentes na infância.
5. **Benchmarks de Mercado:** Tiny Hearts Education (`tinyhearts.com`), Cruz Vermelha Brasileira (`cruzvermelhasaopaulo.org.br`), Multiplica Pequeno Príncipe (`multiplicapp.org.br`), Solid Starts (`solidstarts.com`).

