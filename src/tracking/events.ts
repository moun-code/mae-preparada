/**
 * Dicionário de Eventos de Rastreamento (Seção 6)
 * Regra de Ouro (Saúde/Meta Core Setup):
 * NUNCA enviar respostas do quiz, textos de perguntas, nomes de situações médicas,
 * idade da criança ou erros. Apenas os parâmetros desta lista branca são aceitos.
 */

export type TrackingEventName =
  | 'PageView'
  | 'ViewContent'
  | 'QuizStart'
  | 'QuizStep'
  | 'QuizComplete'
  | 'LeadFormView'
  | 'Lead'
  | 'ResultView'
  | 'ScrollDepth'
  | 'SectionView'
  | 'CTAClick'
  | 'FAQOpen'
  | 'ShareClick'
  | 'LeadMagnet'
  | 'QuizCTAClick'
  | 'InitiateCheckout'
  | 'Purchase'
  | 'ThankYouView';

export type ResultBand = 'r1' | 'r2' | 'r3';

export type SectionId =
  | 's0'
  | 's1'
  | 's2'
  | 's3'
  | 's4'
  | 's5'
  | 's6'
  | 's7'
  | 's8'
  | 's9'
  | 's10'
  | 's11'
  | 's12'
  | 's13'
  | 's14'
  | 's15';

export type CTALocation =
  | 'header'
  | 'hero'
  | 's3'
  | 's4'
  | 's8'
  | 's13'
  | 's15'
  | 'sticky';

export interface EventParamsMap {
  PageView: Record<string, never>;
  ViewContent: { content_name: 'quiz' | 'resultado' | 'guia' };
  QuizStart: Record<string, never>;
  QuizStep: { step: number }; // 1..11 apenas número inteiro
  QuizComplete: Record<string, never>;
  LeadFormView: Record<string, never>;
  Lead: { value?: number; currency?: 'BRL' };
  ResultView: { band: ResultBand };
  ScrollDepth: { pct: 25 | 50 | 75 | 90; page: 'resultado' | 'guia' };
  SectionView: { section: SectionId };
  CTAClick: { location: CTALocation };
  FAQOpen: { q: number };
  ShareClick: Record<string, never>;
  LeadMagnet: Record<string, never>;
  QuizCTAClick: Record<string, never>;
  InitiateCheckout: { value?: number; currency?: 'BRL' };
  Purchase: { value: number; currency: 'BRL' };
  ThankYouView: Record<string, never>;
}

export interface EventDefinition {
  name: TrackingEventName;
  type: 'standard' | 'custom';
  allowedKeys: string[];
  oncePerSession: boolean;
}

export const EVENT_DICTIONARY: Record<TrackingEventName, EventDefinition> = {
  PageView: {
    name: 'PageView',
    type: 'standard',
    allowedKeys: [],
    oncePerSession: false,
  },
  ViewContent: {
    name: 'ViewContent',
    type: 'standard',
    allowedKeys: ['content_name'],
    oncePerSession: true,
  },
  QuizStart: {
    name: 'QuizStart',
    type: 'custom',
    allowedKeys: [],
    oncePerSession: true,
  },
  QuizStep: {
    name: 'QuizStep',
    type: 'custom',
    allowedKeys: ['step'],
    oncePerSession: true, // Único por valor de step (1..11)
  },
  QuizComplete: {
    name: 'QuizComplete',
    type: 'custom',
    allowedKeys: [],
    oncePerSession: true,
  },
  LeadFormView: {
    name: 'LeadFormView',
    type: 'custom',
    allowedKeys: [],
    oncePerSession: true,
  },
  Lead: {
    name: 'Lead',
    type: 'standard',
    allowedKeys: ['value', 'currency'],
    oncePerSession: true,
  },
  ResultView: {
    name: 'ResultView',
    type: 'custom',
    allowedKeys: ['band'],
    oncePerSession: true,
  },
  ScrollDepth: {
    name: 'ScrollDepth',
    type: 'custom',
    allowedKeys: ['pct', 'page'],
    oncePerSession: true, // Único por combinação page+pct
  },
  SectionView: {
    name: 'SectionView',
    type: 'custom',
    allowedKeys: ['section'],
    oncePerSession: true, // Único por section (s0..s15)
  },
  CTAClick: {
    name: 'CTAClick',
    type: 'custom',
    allowedKeys: ['location'],
    oncePerSession: false,
  },
  FAQOpen: {
    name: 'FAQOpen',
    type: 'custom',
    allowedKeys: ['q'],
    oncePerSession: true, // Único por pergunta q
  },
  ShareClick: {
    name: 'ShareClick',
    type: 'custom',
    allowedKeys: [],
    oncePerSession: false,
  },
  LeadMagnet: {
    name: 'LeadMagnet',
    type: 'custom',
    allowedKeys: [],
    oncePerSession: true,
  },
  QuizCTAClick: {
    name: 'QuizCTAClick',
    type: 'custom',
    allowedKeys: [],
    oncePerSession: false,
  },
  InitiateCheckout: {
    name: 'InitiateCheckout',
    type: 'standard',
    allowedKeys: ['value', 'currency'],
    oncePerSession: true,
  },
  Purchase: {
    name: 'Purchase',
    type: 'standard',
    allowedKeys: ['value', 'currency'],
    oncePerSession: true,
  },
  ThankYouView: {
    name: 'ThankYouView',
    type: 'custom',
    allowedKeys: [],
    oncePerSession: true,
  },
};

