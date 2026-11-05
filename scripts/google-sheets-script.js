/**
 * GOOGLE APPS SCRIPT - MÃE PREPARADA (LEADS + NOTIFICAÇÃO POR EMAIL)
 * 
 * Este script faz 2 coisas a cada cadastro:
 * 1. Salva automaticamente Nome, E-mail, WhatsApp, Origem e Data na Planilha Google Sheets.
 * 2. Envia um e-mail imediato de notificação com todos os dados para mounfit.suporte@gmail.com!
 * 
 * -----------------------------------------------------------------------------
 * PASSO A PASSO PARA ATIVAR (Leva menos de 1 minuto):
 * -----------------------------------------------------------------------------
 * 1. Acesse https://sheets.google.com e crie uma "Planilha em branco".
 *    Dê o nome de: Leads - Mãe Preparada
 * 
 * 2. Na primeira linha da planilha (linha 1), digite os cabeçalhos das colunas:
 *    - Coluna A1: Data e Hora
 *    - Coluna B1: Nome
 *    - Coluna C1: E-mail
 *    - Coluna D1: WhatsApp
 *    - Coluna E1: Origem
 * 
 * 3. No menu superior da planilha, clique em:
 *    Extensões > Apps Script
 * 
 * 4. Apague qualquer código que estiver na janela e COLE TODO O CÓDIGO ABAIXO.
 * 
 * 5. Clique no botão azul no canto superior direito: "Implantar" > "Nova implantação".
 * 
 * 6. Na janela que abrir:
 *    - Clique no ícone de engrenagem ⚙️ (ao lado de 'Selecione o tipo') e escolha "App da Web".
 *    - Descrição: Receber Leads
 *    - Executar como: Eu (seu email da conta google)
 *    - Quem pode acessar: Qualquer pessoa  <--- (MUITO IMPORTANTE: selecione 'Qualquer pessoa')
 * 
 * 7. Clique em "Implantar". O Google pedirá autorização na primeira vez:
 *    - Clique em "Autorizar acesso"
 *    - Escolha sua conta Google
 *    - Se aparecer "O Google não verificou este app", clique em "Avançado" e depois em "Acessar... (não seguro)"
 *    - Clique em "Permitir"
 * 
 * 8. Copie a "URL do app da Web" gerada (exemplo: https://script.google.com/macros/s/AKfycbx.../exec).
 * 
 * 9. Cole essa URL no seu arquivo .env.local na linha:
 *    LEAD_WEBHOOK_URL=https://script.google.com/macros/s/AKfycbx.../exec
 * 
 * E pronto! Sempre que alguém preencher, salva na planilha e você recebe o e-mail na hora!
 */

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "Sem dados recebidos" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    var agora = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
    var nome = data.name || 'Não informado';
    var email = data.email || 'Não informado';
    var whatsapp = data.whatsapp || 'Não informado';
    var origem = data.source || 'Ficha de Emergência';

    // 1. Grava uma nova linha na Planilha
    sheet.appendRow([agora, nome, email, whatsapp, origem]);

    // 2. Envia notificação por e-mail para mounfit.suporte@gmail.com
    var destinatario = "mounfit.suporte@gmail.com";
    var assunto = "🚨 Novo Lead Mãe Preparada: " + nome;
    var corpoEmail = 
      "Novo cadastro recebido no site Mãe Preparada!\n\n" +
      "------------------------------------------\n" +
      "👤 Nome: " + nome + "\n" +
      "✉️ E-mail: " + email + "\n" +
      "📱 WhatsApp / Telefone: " + whatsapp + "\n" +
      "📍 Origem: " + origem + "\n" +
      "📅 Data e Hora: " + agora + "\n" +
      "------------------------------------------\n\n" +
      "Este contato foi salvo automaticamente na sua planilha do Google Sheets.";

    MailApp.sendEmail(destinatario, assunto, corpoEmail);

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Lead gravado com sucesso e email enviado para " + destinatario
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (erro) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: erro.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Webhook Google Sheets ativo para o site Mãe Preparada!");
}

