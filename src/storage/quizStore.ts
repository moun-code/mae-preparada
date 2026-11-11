/**
 * Persistência do Estado do Quiz em `localStorage` + `sessionStorage` (Seção 5 e Seção 7)
 * Mesmo domínio, sem passar dados médicos ou respostas pela URL.
 */

import {
  CAREGIVER_LABELS,
  CaregiverCode,
  ChildAgeCode,
  HOSPITAL_TIME_LABELS,
  HospitalTimeCode,
  SCORED_QUESTIONS,
} from '@/data/quizQuestions';
import { ResultBand } from '@/tracking/events';

export interface QuizLeadData {
  name: string;
  whatsapp: string;
  email: string;
  consented: boolean;
  submittedAt: string;
}

export interface QuizState {
  started: boolean;
  completed: boolean;
  currentStage:
    | 'intro'
    | 'p0'
    | 'p0b'
    | 'p0c'
    | 'questions'
    | 'breather'
    | 'capture'
    | 'preparing'
    | 'done';
  currentQuestionIdx: number; // 0..7 (referente a P1..P8)
  showingFeedback: boolean;
  breatherShown: boolean;
  profile: {
    childAge?: ChildAgeCode;
    caregiver?: CaregiverCode;
    hospitalTime?: HospitalTimeCode;
  };
  answers: Record<string, string>; // questionId (P1..P8) -> optionId (P1_a..P1_d)
  lead?: QuizLeadData;
  shuffleSeed: number;
  updatedAt: string;
}

const QUIZ_STORAGE_KEY = 'mp_quiz_state_v1';

export function createInitialQuizState(): QuizState {
  return {
    started: false,
    completed: false,
    currentStage: 'intro',
    currentQuestionIdx: 0,
    showingFeedback: false,
    breatherShown: false,
    profile: {},
    answers: {},
    shuffleSeed: Math.floor(Math.random() * 100000),
    updatedAt: new Date().toISOString(),
  };
}

export function loadQuizState(): QuizState {
  if (typeof window === 'undefined') return createInitialQuizState();
  try {
    const raw =
      sessionStorage.getItem(QUIZ_STORAGE_KEY) ||
      localStorage.getItem(QUIZ_STORAGE_KEY);
    if (!raw) return createInitialQuizState();
    const parsed = JSON.parse(raw) as QuizState;
    return {
      ...createInitialQuizState(),
      ...parsed,
      profile: { ...(parsed.profile || {}) },
      answers: { ...(parsed.answers || {}) },
    };
  } catch {
    return createInitialQuizState();
  }
}

export function saveQuizState(state: QuizState): void {
  if (typeof window === 'undefined') return;
  try {
    const payload = JSON.stringify({
      ...state,
      updatedAt: new Date().toISOString(),
    });
    sessionStorage.setItem(QUIZ_STORAGE_KEY, payload);
    localStorage.setItem(QUIZ_STORAGE_KEY, payload);
  } catch {
    // Falha silenciosa
  }
}

export function resetQuizState(): QuizState {
  const fresh = createInitialQuizState();
  saveQuizState(fresh);
  return fresh;
}

export interface QuizComputedSummary {
  hasData: boolean;
  nome: string;
  acertos: number;
  errosCount: number;
  band: ResultBand;
  listaErrosText: string;
  wrongDetails: Array<{
    questionId: string;
    title: string;
    friendlyName: string;
    chosenOptionText: string;
    whatCouldHappen: string;
    whatGuidelinesSay: string;
  }>;
  quemCuida: string;
  caregiverCode: CaregiverCode;
  tempoHospital: string;
  bandMessage: string;
}

function formatNaturalList(items: string[]): string {
  if (items.length === 0) return 'nenhuma das 5 situações do teste';
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} e ${items[1]}`;
  return `${items.slice(0, -1).join(', ')} e ${items[items.length - 1]}`;
}

export function computeQuizSummary(state: QuizState): QuizComputedSummary {
  const answeredCount = Object.keys(state.answers || {}).length;
  const hasData = state.completed || answeredCount >= 1;

  let acertos = 0;
  const wrongFriendlyNames: string[] = [];
  const wrongDetails: QuizComputedSummary['wrongDetails'] = [];

  for (const q of SCORED_QUESTIONS) {
    const chosenId = state.answers[q.id];
    const chosenOpt = q.options.find((o) => o.id === chosenId);
    if (chosenOpt?.isCorrect) {
      acertos += 1;
    } else {
      wrongFriendlyNames.push(q.friendlyErrorName);
      wrongDetails.push({
        questionId: q.id,
        title: q.title,
        friendlyName: q.friendlyErrorName,
        chosenOptionText: chosenOpt
          ? chosenOpt.text
          : 'Não respondida / em dúvida',
        whatCouldHappen: q.errorFeedback,
        whatGuidelinesSay: q.guidelineSummary,
      });
    }
  }

  const band: ResultBand =
    acertos <= 2 ? 'r1' : acertos <= 4 ? 'r2' : 'r3';

  const nome = state.lead?.name?.trim()
    ? state.lead.name.trim().split(' ')[0]
    : '';
  const listaErrosText = formatNaturalList(wrongFriendlyNames);
  const caregiverCode: CaregiverCode = state.profile.caregiver || 'avo';
  const quemCuida = CAREGIVER_LABELS[caregiverCode];
  const hospitalCode: HospitalTimeCode = state.profile.hospitalTime || 't2';
  const tempoHospital = HOSPITAL_TIME_LABELS[hospitalCode];

  let bandMessage = '';
  if (band === 'r1') {
    bandMessage = `Você acertou ${acertos} de 5. E isso não diz nada sobre você como mãe. Diz sobre o que ninguém ensina: não se aprende isso na maternidade, na escola ou no pré-natal. Nas situações em que você errou (${listaErrosText}), a ação escolhida poderia atrapalhar ou atrasar o socorro. Acontece com muita gente, porque essas condutas são contraintuitivas. E ${quemCuida} também precisaria saber. A boa notícia: isso se aprende em poucos minutos e se consulta na hora.`;
  } else if (band === 'r2') {
    bandMessage = `Você acertou ${acertos} de 5. Você sabe parte, e a parte que falta pesa. Quem sabe só parte tende a confiar demais justamente onde erra, e você errou em ${listaErrosText}. Mesmo nas que acertou, saber a resposta não é o mesmo que executar sob pressão: no susto, o nervosismo apaga a memória. Com o pronto-socorro ${tempoHospital}, os primeiros minutos dependem de quem está ao lado dele.`;
  } else {
    bandMessage = `Você acertou ${acertos} de 5. Você está bem à frente. Mas pergunte a si mesma: se o susto acontecer de verdade, você lembraria de tudo isso sob pressão? E ${quemCuida} sabe o mesmo? O quiz não cobriu anafilaxia, picadas, intoxicação por remédios nem RCP em bebê. O guia funciona como memória de apoio para você e para quem cuida dele.`;
  }

  return {
    hasData,
    nome,
    acertos,
    errosCount: SCORED_QUESTIONS.length - acertos,
    band,
    listaErrosText,
    wrongDetails,
    quemCuida,
    caregiverCode,
    tempoHospital,
    bandMessage,
  };
}

