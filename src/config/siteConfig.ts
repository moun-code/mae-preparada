/**
 * Configuração Central do Funil "Segundos que Salvam" — Mãe Preparada
 * Tudo entre ⟦ ⟧ no Super Prompt está centralizado e sinalizado aqui para substituição rápida.
 */

export const ALLOW_PLACEHOLDERS =
  process.env.NEXT_PUBLIC_ALLOW_PLACEHOLDERS !== 'false' &&
  process.env.ALLOW_PLACEHOLDERS !== 'false';

export const SPECIALIST_ENABLED =
  process.env.NEXT_PUBLIC_SPECIALIST_ENABLED === 'true';

export const PRODUCT_CONFIG = {
  title: 'Segundos que Salvam',
  subtitle:
    'O guia prático para mães que não podem depender da sorte no pior momento',
  fullTitle:
    'Segundos que Salvam: O guia prático para mães que não podem depender da sorte no pior momento',
  format: 'PDF ilustrado e interativo (links clicáveis, campos digitáveis, caixas de marcar)',
  pagesCount: 44,
  situationsCount: 35,
  situationsConfirmed: false, // ⟦confirmar contra o PDF final⟧
  categoriesCount: 4,
  goldenRule: 'Calma. Respire. Ligue 192.',
  updatesPolicyPending: '⟦definir política: ex. gratuitas por X meses⟧',
  updateFrequencyPending: '⟦periodicidade de atualização⟧',
};

export const ORG_CONFIG = {
  name: 'Mãe Preparada',
  legalDescriptor: 'Mãe Preparada — Educação em Segurança e Saúde Infantil',
  tagline: 'Preparo que acalma',
  signature: 'Um guia Mãe Preparada',
  alternativeNamesNote: '⟦Registro de marca/domínio a verificar (alternativas: Primeiros Minutos, Colo Seguro, Casa Preparada).⟧',
  missionPending:
    '⟦escrever missão em 2 linhas — sugestão base: Traduzir diretrizes públicas de emergência pediátrica em materiais visuais de consulta imediata, para que toda família saiba dar o primeiro passo com clareza.⟧',
  cnpjPending: '33.653.080/0003-03',
  cnpj: '33.653.080/0003-03',
  emailPending: 'eumaepreparada.suporte@gmail.com',
  email: 'eumaepreparada.suporte@gmail.com',
  whatsappPending: '+55 13 996103786',
  whatsapp: '+55 13 996103786',
  whatsappUrl: 'https://wa.me/5513996103786',
};

export const OFFER_CONFIG = {
  checkoutUrl:
    process.env.NEXT_PUBLIC_CAKTO_CHECKOUT_URL ||
    'https://pay.cakto.com.br/8dpaa2r_1286618',
  isCheckoutUrlPending:
    !process.env.NEXT_PUBLIC_CAKTO_CHECKOUT_URL ||
    process.env.NEXT_PUBLIC_CAKTO_CHECKOUT_URL.includes('ID_DA_OFERTA'),
  cashPricePending: 'R$ 37,00',
  installmentsPending: 'Parcele em até 12x no cartão',
  referencePricePending: 'De R$ 89,90 por R$ 37,00',
  verifiedComparisonPending:
    '⟦Ancoragem de preço só com comparação verdadeira e verificável (ex.: custo real de um curso presencial)⟧',
  guaranteeDays: 7, // 7 dias (CDC art. 49) — ⟦Se eu quiser, 30 dias.⟧
  guaranteeOptionalNote: '⟦Se eu quiser, 30 dias.⟧',
};

export const HERO_SOCIAL_PROOF = {
  enabled: false, // Só exibir com dados reais
  countPending: '⟦exibir apenas com dado real: “⟦N⟧ mães já têm o guia”⟧',
};

export const SPECIALIST_CONFIG = {
  enabled: SPECIALIST_ENABLED,
  photoPending: '⟦foto real autorizada⟧',
  namePending: '⟦nome da especialista⟧',
  titlePending: '⟦título (ex.: enfermeira pediátrica, pediatra, socorrista)⟧',
  registryPending: '⟦registro profissional verificável (COREN/CRM/outro) com link⟧',
  bioPending: '⟦mini-bio de 3 linhas⟧',
  reviewScopePending: '⟦o que revisou e quando⟧',
  quotePending: '⟦citação real e autorizada⟧',
  signaturePending: '⟦assinatura⟧',
};

export interface TestimonialSlot {
  id: number;
  targetTheme: string;
  photoPending: string;
  nameCityPending: string;
  childAgePending: string;
  textPending: string;
  datePending: string;
}

export const TESTIMONIAL_SLOTS: TestimonialSlot[] = [
  {
    id: 1,
    targetTheme: 'Importância de toda mãe ter em casa',
    photoPending: '⟦foto autorizada 1⟧',
    nameCityPending: '⟦primeiro nome + cidade⟧',
    childAgePending: '⟦faixa de idade do filho (opcional)⟧',
    textPending: '⟦depoimento de 2 a 3 linhas, real e autorizado — foco: importância de toda mãe ter⟧',
    datePending: '⟦data⟧',
  },
  {
    id: 2,
    targetTheme: 'Clareza do passo a passo no susto',
    photoPending: '⟦foto autorizada 2⟧',
    nameCityPending: '⟦primeiro nome + cidade⟧',
    childAgePending: '⟦faixa de idade do filho (opcional)⟧',
    textPending: '⟦depoimento de 2 a 3 linhas, real e autorizado — foco: clareza do passo a passo⟧',
    datePending: '⟦data⟧',
  },
  {
    id: 3,
    targetTheme: 'Tranquilidade de compartilhar com avó/babá',
    photoPending: '⟦foto autorizada 3⟧',
    nameCityPending: '⟦primeiro nome + cidade⟧',
    childAgePending: '⟦faixa de idade do filho (opcional)⟧',
    textPending: '⟦depoimento de 2 a 3 linhas, real e autorizado — foco: compartilhar com avó e babá⟧',
    datePending: '⟦data⟧',
  },
  {
    id: 4,
    targetTheme: 'Facilidade de consulta rápida no celular',
    photoPending: '⟦foto autorizada 4⟧',
    nameCityPending: '⟦primeiro nome + cidade⟧',
    childAgePending: '⟦faixa de idade do filho (opcional)⟧',
    textPending: '⟦depoimento de 2 a 3 linhas, real e autorizado — foco: achar em 2 toques no celular⟧',
    datePending: '⟦data⟧',
  },
  {
    id: 5,
    targetTheme: 'Qualidade das ilustrações estilo manual',
    photoPending: '⟦foto autorizada 5⟧',
    nameCityPending: '⟦primeiro nome + cidade⟧',
    childAgePending: '⟦faixa de idade do filho (opcional)⟧',
    textPending: '⟦depoimento de 2 a 3 linhas, real e autorizado — foco: ilustrações fáceis de entender⟧',
    datePending: '⟦data⟧',
  },
  {
    id: 6,
    targetTheme: 'Valor percebido (ficha + checklists)',
    photoPending: '⟦foto autorizada 6⟧',
    nameCityPending: '⟦primeiro nome + cidade⟧',
    childAgePending: '⟦faixa de idade do filho (opcional)⟧',
    textPending: '⟦depoimento de 2 a 3 linhas, real e autorizado — foco: valor percebido e roteiro prático⟧',
    datePending: '⟦data⟧',
  },
];

export const AB_TESTS_CONFIG = {
  // 1) H1 variante no /guia ('default' | 'alt1' | 'alt2')
  h1Variant: 'default' as 'default' | 'alt1' | 'alt2',
  // 2) Captura obrigatória vs. permitir "ver resultado sem cadastro"
  allowSkipLeadGate: true, // Exibe opção para teste A/B conforme ⟦Teste A/B: permitir “ver resultado sem cadastro”.⟧
  // 3) Texto padrão do CTA ('Quero o guia agora' | 'Quero estar preparada' | 'Receber o guia agora' | 'Garantir meu guia')
  ctaText: 'Quero o guia agora',
};

export const MEDICAL_DISCLAIMER =
  'Este guia traz orientações gerais de primeiros socorros e não substitui curso prático nem atendimento médico. Em emergência, ligue 192.';

export const SHORT_MEDICAL_DISCLAIMER =
  'Este guia não substitui curso prático nem atendimento médico. Em emergência, ligue 192.';

