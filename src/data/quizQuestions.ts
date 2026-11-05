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
  questionIndex: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8; // Pergunta X de 8
  stepNumber: 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11; // Para o evento QuizStep (4..11)
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
    '8 situações reais. 2 minutos. Você descobre onde já está preparada e onde ainda não.',
  ctaText: 'Começar o teste',
  microcopy:
    'Gratuito · Você só informa seu contato no final, para ver o resultado.',
};

export const QUIZ_BREATHER_AFTER_P4 = {
  text: 'Estas situações confundem muita gente porque a conduta correta costuma ser contraintuitiva. Continue: faltam 4.',
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
    friendlyErrorName: 'engasgo grave no(a) bebê',
    question:
      'Seu(sua) bebê de 8 meses engasgou com um pedaço de fruta. Abriu a boca, não faz nenhum som e está ficando arroxeado(a). O que você faz?',
    options: [
      { id: 'P1_a', text: 'Dou um pouco de água para empurrar', isCorrect: false },
      {
        id: 'P1_b',
        text: 'Viro de cabeça para baixo pelas pernas',
        isCorrect: false,
      },
      {
        id: 'P1_c',
        text: 'Ligo 192 em viva-voz e faço 5 tapas nas costas e 5 compressões no peito, alternando',
        isCorrect: true,
      },
      { id: 'P1_d', text: 'Enfio o dedo na garganta', isCorrect: false },
    ],
    errorFeedback:
      'Água pode levar o objeto mais fundo, virar o(a) bebê de cabeça para baixo não é recomendado e o dedo às cegas pode empurrar o objeto. No engasgo grave existe uma sequência específica.',
    correctFeedback:
      'Correto. Cabeça mais baixa que o corpo, 5 tapas entre as omoplatas e 5 compressões no peito. Ter a sequência na cabeça sob pressão é o difícil, e é isso que o guia deixa ilustrado.',
    guidelineSummary:
      'Ligar 192 em viva-voz e alternar 5 tapas entre as omoplatas (cabeça mais baixa que o corpo) e 5 compressões no peito.',
  },
  {
    id: 'P2',
    questionIndex: 2,
    stepNumber: 5,
    title: 'Tosse forte com leite',
    friendlyErrorName: 'tosse forte com leite',
    question:
      'Seu(sua) bebê engasgou com leite, está vermelho(a) e tossindo forte, mas chora e respira. O que você faz?',
    options: [
      { id: 'P2_a', text: 'Bato nas costas várias vezes', isCorrect: false },
      { id: 'P2_b', text: 'Deito de costas para descansar', isCorrect: false },
      {
        id: 'P2_c',
        text: 'Deixo tossir, mantenho sentado(a) e levemente inclinado(a), e observo',
        isCorrect: true,
      },
      { id: 'P2_d', text: 'Dou água', isCorrect: false },
    ],
    errorFeedback:
      'Quem tosse forte está respirando e se defendendo. Bater nas costas ou deitar nesse momento atrapalha. O erro inverso também é comum: tratar tosse forte como engasgo grave.',
    correctFeedback:
      'Correto. Saber diferenciar tosse forte de engasgo grave evita pânico e manobras desnecessárias.',
    guidelineSummary:
      'Deixar tossir, manter sentado(a) e levemente inclinado(a), observando atentamente sinais de evolução.',
  },
  {
    id: 'P3',
    questionIndex: 3,
    stepNumber: 6,
    title: 'Queimadura',
    friendlyErrorName: 'queimadura',
    question:
      'Seu(sua) filho(a) derrubou água quente no braço. A pele está vermelha e dolorida. A primeira coisa a fazer é:',
    options: [
      {
        id: 'P3_a',
        text: 'Passar pasta de dente ou manteiga',
        isCorrect: false,
      },
      { id: 'P3_b', text: 'Colocar gelo direto na pele', isCorrect: false },
      {
        id: 'P3_c',
        text: 'Deixar água corrente fria sobre a queimadura por 10 a 20 minutos',
        isCorrect: true,
      },
      { id: 'P3_d', text: 'Estourar as bolhas', isCorrect: false },
    ],
    errorFeedback:
      'Pasta de dente e manteiga prendem o calor e aumentam o risco de infecção; gelo direto pode agravar a lesão. Nos primeiros minutos, o certo é água corrente fria.',
    correctFeedback:
      'Correto. O guia também mostra quando a queimadura exige pronto-socorro (tamanho, local, bolhas, bebês).',
    guidelineSummary:
      'Deixar água corrente fria (não gelada) sobre o local por 10 a 20 minutos, sem passar pomadas caseiras nem estourar bolhas.',
  },
  {
    id: 'P4',
    questionIndex: 4,
    stepNumber: 7,
    title: 'Produto de limpeza',
    friendlyErrorName: 'produto de limpeza',
    question:
      'Seu(sua) filho(a) de 2 anos bebeu um pouco de produto de limpeza. O que você faz?',
    options: [
      { id: 'P4_a', text: 'Provoco vômito', isCorrect: false },
      { id: 'P4_b', text: 'Dou leite para neutralizar', isCorrect: false },
      {
        id: 'P4_c',
        text: 'Ligo 0800 722 6001 ou 192 com a embalagem em mãos, sem provocar vômito',
        isCorrect: true,
      },
      {
        id: 'P4_d',
        text: 'Espero para ver se aparecem sintomas',
        isCorrect: false,
      },
    ],
    errorFeedback:
      'Provocar vômito pode queimar a garganta de novo ou levar o produto ao pulmão. Leite e antídotos caseiros não resolvem. Esperar sintomas atrasa a orientação; cada produto tem uma conduta.',
    correctFeedback:
      'Correto. Ligar com o nome do produto, a quantidade e o peso da criança permite uma orientação precisa.',
    guidelineSummary:
      'Não provocar vômito nem dar leite; ligar imediatamente para o CIATox (0800 722 6001) ou 192 com a embalagem em mãos.',
  },
  {
    id: 'P5',
    questionIndex: 5,
    stepNumber: 8,
    title: 'Convulsão com febre',
    friendlyErrorName: 'convulsão',
    question:
      'Seu(sua) filho(a) está com febre e começa a convulsionar. O que você faz?',
    options: [
      {
        id: 'P5_a',
        text: 'Coloco um pano na boca para ele(a) não morder a língua',
        isCorrect: false,
      },
      {
        id: 'P5_b',
        text: 'Seguro firme para ele(a) parar de tremer',
        isCorrect: false,
      },
      { id: 'P5_c', text: 'Dou banho frio', isCorrect: false },
      {
        id: 'P5_d',
        text: 'Deito de lado em lugar seguro, afasto objetos, anoto a hora e ligo 192 se passar de 5 minutos',
        isCorrect: true,
      },
    ],
    errorFeedback:
      'Nada na boca: a criança não engole a língua e o pano pode sufocar. Segurar o corpo pode machucar. Banho frio durante a crise não ajuda.',
    correctFeedback:
      'Correto. Anotar a hora ajuda a equipe médica a decidir a conduta.',
    guidelineSummary:
      'Deitar de lado em superfície segura, afastar objetos, nunca colocar nada na boca, anotar o horário de início e ligar 192.',
  },
  {
    id: 'P6',
    questionIndex: 6,
    stepNumber: 9,
    title: 'Pilha-botão',
    friendlyErrorName: 'pilha-botão',
    question:
      'Seu(sua) filho(a) de 2 anos engoliu a pilha do controle remoto, mas parece bem e está brincando. O que você faz?',
    options: [
      { id: 'P6_a', text: 'Espero sair nas fezes', isCorrect: false },
      { id: 'P6_b', text: 'Dou laxante', isCorrect: false },
      {
        id: 'P6_c',
        text: 'Vou agora ao pronto-socorro ou ligo 192, mesmo sem sintomas',
        isCorrect: true,
      },
      { id: 'P6_d', text: 'Dou comida para empurrar', isCorrect: false },
    ],
    errorFeedback:
      'Pilha-botão presa no esôfago pode causar queimadura grave em cerca de 2 horas, e a criança pode parecer bem nesse tempo. Aqui, esperar é o maior risco.',
    correctFeedback:
      'Correto. Pouca gente sabe que a ausência de sintomas não significa segurança nesse caso.',
    guidelineSummary:
      'Ir imediatamente ao pronto-socorro ou ligar 192, mesmo sem nenhum sintoma aparente.',
  },
  {
    id: 'P7',
    questionIndex: 7,
    stepNumber: 10,
    title: 'Afogamento',
    friendlyErrorName: 'afogamento',
    question:
      'Você sai por 30 segundos para atender o telefone e seu(sua) filho(a) de 1 ano fica na banheira com pouca água. Qual afirmação é verdadeira?',
    options: [
      {
        id: 'P7_a',
        text: 'Se ele(a) estiver se afogando, vai gritar e eu escuto',
        isCorrect: false,
      },
      {
        id: 'P7_b',
        text: 'Boia de braço protege nesse caso',
        isCorrect: false,
      },
      {
        id: 'P7_c',
        text: 'Afogamento é silencioso e pode acontecer em poucos centímetros de água',
        isCorrect: true,
      },
      { id: 'P7_d', text: 'Só acontece em piscina funda', isCorrect: false },
    ],
    errorFeedback:
      'Afogamento infantil costuma ser silencioso, sem gritos nem agitação, e pode ocorrer em poucos centímetros de água. A regra é nunca sair, nem por um segundo.',
    correctFeedback:
      'Correto. A maioria imagina uma cena com barulho. A realidade é outra.',
    guidelineSummary:
      'Nunca deixar a criança sem supervisão ao alcance do braço na água, nem por alguns segundos.',
  },
  {
    id: 'P8',
    questionIndex: 8,
    stepNumber: 11,
    title: 'Queda com pancada na cabeça',
    friendlyErrorName: 'queda com pancada na cabeça',
    question:
      'Seu(sua) filho(a) de 2 anos caiu e bateu a cabeça. Chorou, mas depois vomitou várias vezes e está muito sonolento(a). O que você faz?',
    options: [
      { id: 'P8_a', text: 'Deixo dormir, é normal', isCorrect: false },
      { id: 'P8_b', text: 'Dou um remédio para a dor', isCorrect: false },
      {
        id: 'P8_c',
        text: 'Procuro atendimento imediatamente (192 se estiver difícil de acordar)',
        isCorrect: true,
      },
      { id: 'P8_d', text: 'Observo até amanhã', isCorrect: false },
    ],
    errorFeedback:
      'Vômitos repetidos e sono excessivo após pancada na cabeça são sinais de alerta e pedem avaliação na hora.',
    correctFeedback:
      'Correto. Conhecer os sinais de alerta torna a decisão rápida.',
    guidelineSummary:
      'Buscar avaliação médica imediata diante de sinais de alerta (vômitos repetidos, sonolência excessiva, dificuldade para despertar).',
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

