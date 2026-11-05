# Régua de Nutrição por WhatsApp e E-mail (`docs/nutricao-mensagens.md`)

> **Regras Inegociáveis (Seção 1 e Seção 10):**
> - Disparar **somente** para quem marcou a caixa de consentimento explícito (LGPD).
> - Incluir sempre no rodapé a opção clara de descadastro (`"Responda SAIR para não receber mais"` no WhatsApp ou link de unsubscribe no e-mail).
> - Sem promessas absolutas (`"garante"`, `"salva vidas"`), sem culpa materna, sem falsa escassez.
> - **Saída Automática:** Quando `/api/cakto-webhook` recebe `purchase_approved`, envia `action: 'remove_from_sales_sequence'` para interromper a régua imediatamente.

---

## M1 — Na hora (Imediato após captura no `/quiz`)
**Objetivo:** Entregar o resultado prometido + link direto de retorno.

**Texto (WhatsApp / E-mail):**
> Olá, {nome}! Aqui é da **Mãe Preparada**.
>
> Seu resultado do teste de primeiros socorros infantis ficou pronto: você acertou **{acertos} de 8** situações.
>
> As situações que separamos para você revisar com calma são: **{lista_erros}**.
>
> Você pode ver os cartões de revisão e conhecer o guia ilustrado **Segundos que Salvam** neste link:
> 👉 {link_resultado}
>
> *(Lembrete importante: orientações educativas não substituem atendimento médico nem curso prático. Em emergência, ligue 192. Para não receber mais mensagens, responda SAIR).*

---

## M2 — +2 horas após o quiz
**Objetivo:** Mostrar o erro mais comum do teste e reforçar por que o guia é de consulta rápida.

**Texto (WhatsApp / E-mail):**
> {nome}, sabia que uma das dúvidas que mais aparece no nosso teste é diferenciar **tosse forte** de **engasgo grave**?
>
> Quando o bebê tosse forte e chora após engasgar com leite, o impulso de muita gente é bater nas costas — mas quem tosse forte está respirando e se defendendo. Já quando não sai som nenhum, cada segundo pede a sequência certa de manobras e o 192 em viva-voz.
>
> Na hora do susto, ninguém lembra de textos longos. Por isso desenhamos o **Segundos que Salvam** como um manual de montagem: ilustração em traço limpo, passo 1-2-3 e o que NÃO fazer em 35 situações.
>
> Veja uma página aberta de perto aqui:
> 👉 {link_resultado}#s7
>
> *(Para cancelar o recebimento, responda SAIR).*

---

## M3 — D+1 (24 horas depois)
**Objetivo:** Abordar uma situação que ela errou no teste com uma dica prática real.

**Texto (WhatsApp / E-mail):**
> Oi, {nome}! Passando para deixar um lembrete prático sobre uma das situações do seu teste: **{primeira_situacao_erro}**.
>
> Muita gente aprende condutas caseiras antigas em família, mas as diretrizes públicas da SBP e do Ministério da Saúde mostram que o primeiro movimento precisa ser simples e seguro enquanto o socorro (192) é acionado.
>
> Além disso, se **{quem_cuida}** também fica com seu filho em alguns momentos da semana, vale deixar esse passo a passo visível na porta da geladeira.
>
> O guia completo + a Ficha de Emergência da Criança para imprimir estão disponíveis aqui:
> 👉 {link_resultado}
>
> *(Para cancelar o recebimento, responda SAIR).*

---

## M4 — D+2 (48 horas depois)
**Objetivo:** Credibilidade, autoria e como o guia foi construído.

**Texto (WhatsApp / E-mail):**
> {nome}, talvez você tenha pensado: *"Mas na internet já não tem conteúdo sobre primeiros socorros?"*
>
> Tem sim — o problema é que, quando o susto acontece de madrugada, ninguém consegue assistir a um vídeo de 15 minutos com anúncio ou comparar três posts que dizem coisas diferentes.
>
> Na **Mãe Preparada**, nós reunimos as diretrizes públicas oficiais (SBP, Ministério da Saúde, AHA e Anvisa) e traduzimos tudo em 44 páginas visuais que funcionam **offline** no seu celular, sem depender de internet.
>
> Veja o sumário completo das 35 situações aqui:
> 👉 {link_resultado}#s6
>
> *(Para cancelar o recebimento, responda SAIR).*

---

## M5 — D+3 (72 horas depois)
**Objetivo:** Quebrar a objeção *"já sei algumas coisas"* e reforçar a garantia de 7 dias.

**Texto (WhatsApp / E-mail):**
> Oi, {nome}! Mesmo quando já sabemos o que fazer na teoria, na hora em que o coração dispara o nervosismo costuma apagar a memória.
>
> E se você quiser apenas abrir o guia, ler as páginas ilustradas e testar a Ficha de Emergência na sua casa sem compromisso, lembre-se: você tem **7 dias de garantia incondicional** (art. 49 do CDC). Se achar que não é para a sua família, basta pedir reembolso com um clique na Cakto.
>
> Acesse seu guia com tranquilidade aqui:
> 👉 {link_resultado}#s13
>
> *(Para cancelar o recebimento, responda SAIR).*

---

## M6 — D+5 (Último lembrete — sem falsa urgência)
**Objetivo:** Fechamento honesto e sereno.

**Texto (WhatsApp / E-mail):**
> {nome}, esta é nossa última mensagem sobre o seu diagnóstico do teste.
>
> Você pode nunca precisar consultar uma página de emergência — e torcemos para que nunca precise. Mas, se um dia acontecer um susto em casa, ter o primeiro passo ilustrado no celular e o roteiro do 192 na geladeira traz a calma que o momento pede.
>
> Quando quiser acessar o guia **Segundos que Salvam**, o link continua disponível aqui:
> 👉 {link_resultado}
>
> Um abraço da equipe **Mãe Preparada**.
> *(Para não receber futuras comunicações educativas, responda SAIR).*

---

## Mensagem Única de Abandono de Checkout (`checkout_abandonment`)
**Objetivo:** 1 mensagem de ajuda genuína (zero pressão).

**Texto (WhatsApp / E-mail):**
> Oi, {nome}! Vimos que você iniciou o acesso ao guia **Segundos que Salvam**, mas não chegou a concluir.
>
> Ficou alguma dúvida sobre como funciona o PDF interativo ou teve alguma dificuldade técnica com o Pix/cartão na Cakto?
>
> Se quiser retomar de onde parou, seu link direto está aqui:
> 👉 {link_checkout_com_utms}
>
> Se precisar de qualquer ajuda, é só responder esta mensagem!
> *(Para cancelar o recebimento, responda SAIR).*

