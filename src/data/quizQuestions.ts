/**
 * Especificação Completa das Perguntas do Quiz (Seção 7)
 * Preserva 100% dos textos, opções, valores e feedbacks prescritos.
 */

export type ChildAgeCode = 'i1' | 'i2' | 'i3' | 'i4';
export type CaregiverCode = 'avo' | 'baba' | 'escola' | 'eu';
export type HospitalTimeCode = 't1' | 't2' | 't3' | 't4';

export interface ProfileQuestion<T extends string = string> {
  id: 'P0' | 'P0b' | 'P0c';
  stepNumber: 1 | 2 | 3; // Para o evento QuizStep (1..3)
  question: string;
  options: Array<{
    value: T;
    label: string;
  }>;
}

export interface ScoredOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface ScoredQuestion {
  id: 'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'P6' | 'P7' | 'P8';
  questionIndex: number; // Pergunta X de 5
  stepNumber: number; // Para o evento QuizStep (4..8)
  title: string;
  friendlyErrorName: string; // Para {lista_erros}
  question: string;
  options: ScoredOption[];
  errorFeedback: string;
  correctFeedback: string;
  guidelineSummary: string;
}

export const QUIZ_INTRO = {
  title:
    'Você saberia o que fazer nos primeiros minutos de uma emergência com seu(sua) filho(a)?',
  subtitle:
    '5 situações reais. 1 minuto e meio. Descubra onde você já está preparada e onde ainda há lacunas.',
  ctaText: 'Começar o teste',
  microcopy:
    'Gratuito · Veja seu resultado detalhado imediatamente após a última pergunta.',
};

export const QUIZ_BREATHER_AFTER_P4 = {
  text: 'Estas situações confundem muita gente porque a conduta correta costuma ser contraintuitiva.',
  ctaText: 'Continuar',
};

export const PROFILE_QUESTIONS: [
  ProfileQuestion<ChildAgeCode>,
  ProfileQuestion<CaregiverCode>,
  ProfileQuestion<HospitalTimeCode>,
] = [
  {
    id: 'P0',
    stepNumber: 1,
    question: 'Idade do seu(sua) filho(a) mais novo(a)?',
    options: [
      { value: 'i1', label: 'Menos de 1 ano' },
      { value: 'i2', label: '1 a 2 anos' },
      { value: 'i3', label: '3 a 5 anos' },
      { value: 'i4', label: 'Mais de 5 anos' },
    ],
  },
  {
    id: 'P0b',
    stepNumber: 2,
    question: 'Quem fica com ele(a) quando você não está?',
    options: [
      { value: 'avo', label: 'Avó ou familiar' },
      { value: 'baba', label: 'Babá' },
      { value: 'escola', label: 'Creche ou escola' },
      { value: 'eu', label: 'Sempre fico eu' },
    ],
  },
  {
    id: 'P0c',
    stepNumber: 3,
    question: 'Quanto tempo você leva até o pronto-socorro mais próximo?',
    options: [
      { value: 't1', label: 'Menos de 10 min' },
      { value: 't2', label: '10 a 20 min' },
      { value: 't3', label: 'Mais de 20 min' },
      { value: 't4', label: 'Não sei' },
    ],
  },
];

export const SCORED_QUESTIONS: ScoredQuestion[] = [
  {
    id: 'P1',
    questionIndex: 1,
    stepNumber: 4,
    title: 'Engasgo grave (bebê)',
    friendlyErrorName: 'engasgo grave no bebê',
    question:
      'Seu bebê engasgou, não emite som e está ficando arroxeado. O que você faz?',
    options: [
      { id: 'P1_a', text: 'Dou água para tentar descer', isCorrect: false },
      { id: 'P1_b', text: 'Seguro de cabeça para baixo pelas pernas', isCorrect: false },
      { id: 'P1_c', text: 'Ligo 192 e alterno 5 tapas nas costas e 5 compressões no peito', isCorrect: true },
      { id: 'P1_d', text: 'Tento puxar às cegas com o dedo na garganta', isCorrect: false },
    ],
    errorFeedback:
      'Dar água, virar pelas pernas ou colocar o dedo às cegas pode empurrar o objeto ou piorar a obstrução. O correto é alternar 5 tapas nas costas e 5 compressões no peito com a cabeça inclinada.',
    correctFeedback:
      'Exato! Cabeça mais baixa que o corpo, 5 tapas entre as omoplatas e 5 compressões no peito até desengasgar ou o socorro chegar.',
    guidelineSummary:
      'Ligar 192 em viva-voz e alternar 5 tapas firmes nas costas e 5 compressões no peito, com o bebê inclinado para baixo.',
  },
  {
    id: 'P2',
    questionIndex: 2,
    stepNumber: 5,
    title: 'Queimadura',
    friendlyErrorName: 'queimadura com líquido quente',
    question:
      'Caiu líquido quente no braço da criança e a pele está vermelha e ardendo. Qual é o primeiro passo?',
    options: [
      { id: 'P2_a', text: 'Passar pomada, manteiga ou pasta de dente', isCorrect: false },
      { id: 'P2_b', text: 'Colocar gelo direto sobre a pele', isCorrect: false },
      { id: 'P2_c', text: 'Colocar sob água corrente em temperatura ambiente por 10 a 15 minutos', isCorrect: true },
      { id: 'P2_d', text: 'Cobrir imediatamente com algodão ou pano seco', isCorrect: false },
    ],
    errorFeedback:
      'Receitas caseiras prendem o calor e facilitam infecções; gelo direto queima a pele lesionada. O primeiro socorro indispensável é apenas água corrente limpa e fria.',
    correctFeedback:
      'Exato! Água corrente contínua por 10 a 15 minutos resfria as camadas profundas da pele e cessa a queimadura imediatamente.',
    guidelineSummary:
      'Resfriar imediatamente em água corrente limpa (temperatura ambiente/fria) por 10 a 15 minutos, sem pomadas nem receitas caseiras.',
  },
  {
    id: 'P3',
    questionIndex: 3,
    stepNumber: 6,
    title: 'Produto de limpeza',
    friendlyErrorName: 'ingestão de produto de limpeza',
    question:
      'A criança bebeu acidentalmente um pouco de desinfetante ou produto de limpeza. O que você faz?',
    options: [
      { id: 'P3_a', text: 'Provoco vômito imediatamente', isCorrect: false },
      { id: 'P3_b', text: 'Dou leite para neutralizar a substância', isCorrect: false },
      { id: 'P3_c', text: 'Não provoco vômito e ligo para o CIATox (0800 722 6001) ou 192 com a embalagem em mãos', isCorrect: true },
      { id: 'P3_d', text: 'Espero para ver se ela vai ter alguma reação', isCorrect: false },
    ],
    errorFeedback:
      'Provocar vômito queima a garganta uma segunda vez e pode levar produto químico ao pulmão. Leite também é contraindicado. Ligue imediatamente para o CIATox/192.',
    correctFeedback:
      'Exato! Não forçar vômito e ligar com o rótulo do produto em mãos para a equipe toxicológica orientar a conduta exata.',
    guidelineSummary:
      'Nunca provocar vômito nem dar líquidos; ligar imediatamente para o CIATox (0800 722 6001) ou 192 com o rótulo do produto em mãos.',
  },
  {
    id: 'P4',
    questionIndex: 4,
    stepNumber: 7,
    title: 'Convulsão com febre',
    friendlyErrorName: 'convulsão febril',
    question:
      'A criança teve febre alta e começou a ter tremores involuntários (convulsão). Como agir?',
    options: [
      { id: 'P4_a', text: 'Coloco o dedo ou um pano na boca para não enrolar a língua', isCorrect: false },
      { id: 'P4_b', text: 'Seguro o corpo com força para parar de tremer', isCorrect: false },
      { id: 'P4_c', text: 'Coloco imediatamente debaixo do chuveiro frio', isCorrect: false },
      { id: 'P4_d', text: 'Deito de lado em local seguro, afasto objetos e cronometro o tempo da crise', isCorrect: true },
    ],
    errorFeedback:
      'A língua não se enrola: colocar objetos na boca pode asfixiar ou quebrar dentes. Segurar causa fraturas. Deite a criança de lado no chão e proteja a cabeça.',
    correctFeedback:
      'Exato! Deitar de lado mantém as vias aéreas livres de saliva/vômito, afastar objetos evita impactos e marcar o tempo é essencial para o médico.',
    guidelineSummary:
      'Deitar a criança de lado no chão, proteger a cabeça, afastar objetos, nunca colocar nada na boca e cronometrar a duração da crise.',
  },
  {
    id: 'P5',
    questionIndex: 5,
    stepNumber: 8,
    title: 'Queda com pancada na cabeça',
    friendlyErrorName: 'queda com pancada na cabeça',
    question:
      'A criança caiu e bateu a cabeça. Chorou, mas depois teve vômitos e ficou muito sonolenta. Qual a conduta?',
    options: [
      { id: 'P5_a', text: 'Deixar dormir para descansar, é uma reação comum', isCorrect: false },
      { id: 'P5_b', text: 'Dar remédio para dor e observar até o dia seguinte', isCorrect: false },
      { id: 'P5_c', text: 'Procurar pronto-socorro ou ligar 192 imediatamente', isCorrect: true },
      { id: 'P5_d', text: 'Fazer apenas compressa de água morna na cabeça', isCorrect: false },
    ],
    errorFeedback:
      'Vômitos repetidos, sonolência profunda e dificuldade para despertar após trauma na cabeça são sinais de alerta neurológico. Exigem atendimento médico urgente.',
    correctFeedback:
      'Exato! Vômitos, sonolência excessiva e desequilíbrio são sinais de alerta claros que não permitem esperar em casa.',
    guidelineSummary:
      'Buscar avaliação médica imediata diante de sinais de alerta (vômitos repetidos, sonolência anormal, dificuldade de despertar).',
  },
];

export const CAREGIVER_LABELS: Record<CaregiverCode, string> = {
  avo: 'a avó',
  baba: 'a babá',
  escola: 'a escola',
  eu: 'você',
};

export const HOSPITAL_TIME_LABELS: Record<HospitalTimeCode, string> = {
  t1: 'a menos de 10 minutos',
  t2: 'entre 10 e 20 minutos',
  t3: 'a mais de 20 minutos',
  t4: 'a uma distância que você ainda não sabe, e isso também é uma lacuna',
};

