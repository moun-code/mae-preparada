'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  AlertCircle,
  ArrowLeft,
  Check,
  Clock,
  Info,
  ShieldCheck,
} from 'lucide-react';
import { Em } from '@/components/ui/Em';
import { QuizQuestionIllustration } from '@/components/ui/Illustrations';
import { PillButton } from '@/components/ui/PillButton';
import {
  AB_TESTS_CONFIG,
  MEDICAL_DISCLAIMER,
  ORG_CONFIG,
} from '@/config/siteConfig';
import {
  CaregiverCode,
  ChildAgeCode,
  HospitalTimeCode,
  PROFILE_QUESTIONS,
  QUIZ_BREATHER_AFTER_P4,
  QUIZ_INTRO,
  SCORED_QUESTIONS,
  ScoredOption,
} from '@/data/quizQuestions';
import {
  createInitialQuizState,
  loadQuizState,
  QuizState,
  saveQuizState,
} from '@/storage/quizStore';
import { track } from '@/tracking/track';

/**
 * Embaralhamento determinístico por semente de sessão (mantém a ordem estável se recarregar a página)
 */
function shuffleOptionsWithSeed(
  options: ScoredOption[],
  seed: number,
  qIndex: number
): ScoredOption[] {
  const copy = [...options];
  let currentSeed = seed + qIndex * 997;
  for (let i = copy.length - 1; i > 0; i--) {
    currentSeed = (currentSeed * 16807) % 2147483647;
    const j = currentSeed % (i + 1);
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
}

export function QuizExperience() {
  const router = useRouter();
  const [state, setState] = useState<QuizState>(createInitialQuizState);
  const [hydrated, setHydrated] = useState(false);
  const [selectedTemp, setSelectedTemp] = useState<string | null>(null);
  const [prepStep, setPrepStep] = useState<1 | 2 | 3>(1);

  // Carrega progresso salvo e dispara ViewContent
  useEffect(() => {
    const loaded = loadQuizState();
    if (loaded.currentStage === 'preparing' || loaded.currentStage === 'done' || loaded.currentStage === 'capture') {
      loaded.currentStage = 'questions';
      loaded.currentQuestionIdx = 7;
      loaded.showingFeedback = false;
    }
    setState(loaded);
    setHydrated(true);
    track('ViewContent', { content_name: 'quiz' });
  }, []);

  // Persiste estado sempre que mudar
  useEffect(() => {
    if (!hydrated) return;
    saveQuizState(state);
  }, [state, hydrated]);

  // Atualiza hash neutro da URL (/quiz#e1..#e11) e dispara QuizStep (step: 1..11)
  useEffect(() => {
    if (!hydrated) return;

    let stepNum: number | null = null;
    if (state.currentStage === 'p0') stepNum = 1;
    else if (state.currentStage === 'p0b') stepNum = 2;
    else if (state.currentStage === 'p0c') stepNum = 3;
    else if (state.currentStage === 'questions') {
      stepNum = 4 + state.currentQuestionIdx; // 4..11
    }

    if (stepNum !== null) {
      window.history.replaceState(null, '', `/quiz#e${stepNum}`);
      track('QuizStep', { step: stepNum });
    } else if (state.currentStage === 'preparing') {
      window.history.replaceState(null, '', '/quiz#resultado');
    }
  }, [state.currentStage, state.currentQuestionIdx, hydrated]);

  // Tela de preparo (3 segundos) -> redireciona para /resultado
  useEffect(() => {
    if (state.currentStage !== 'preparing') return;
    setPrepStep(1);
    const t1 = setTimeout(() => setPrepStep(2), 1000);
    const t2 = setTimeout(() => setPrepStep(3), 2000);
    const t3 = setTimeout(() => {
      setState((prev) => ({ ...prev, completed: true, currentStage: 'done' }));
      router.push('/resultado');
    }, 3000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [state.currentStage, router]);

  // Calcula contador discreto "Lacunas para revisar: N"
  const gapsCount = useMemo(() => {
    let count = 0;
    for (const q of SCORED_QUESTIONS) {
      const ansId = state.answers[q.id];
      if (!ansId) continue;
      const opt = q.options.find((o) => o.id === ansId);
      if (opt && !opt.isCorrect) count += 1;
    }
    return count;
  }, [state.answers]);

  // Calcula progresso percentual da barra menta
  const progressPercent = useMemo(() => {
    switch (state.currentStage) {
      case 'intro':
        return 0;
      case 'p0':
        return 8;
      case 'p0b':
        return 16;
      case 'p0c':
        return 24;
      case 'questions':
        return Math.round(28 + ((state.currentQuestionIdx + 1) / 8) * 62);
      case 'breather':
        return 62;
      case 'capture':
        return 95;
      case 'preparing':
      case 'done':
        return 100;
      default:
        return 0;
    }
  }, [state.currentStage, state.currentQuestionIdx]);

  const currentQuestion =
    SCORED_QUESTIONS[state.currentQuestionIdx] || SCORED_QUESTIONS[0];

  const shuffledOptions = useMemo(() => {
    return shuffleOptionsWithSeed(
      currentQuestion.options,
      state.shuffleSeed,
      currentQuestion.questionIndex
    );
  }, [currentQuestion, state.shuffleSeed]);

  if (!hydrated) {
    return (
      <div className="min-h-[100dvh] bg-[var(--lavender-50)] flex items-center justify-center p-4">
        <div className="w-8 h-8 rounded-full border-4 border-[var(--indigo-900)] border-t-[var(--mint-400)] animate-spin" />
      </div>
    );
  }

  // Handlers de navegação
  const handleStartQuiz = () => {
    track('QuizStart', {});
    setState((prev) => ({
      ...prev,
      started: true,
      currentStage: 'p0',
    }));
  };

  const handleProfileAnswer = (
    questionId: 'P0' | 'P0b' | 'P0c',
    value: string
  ) => {
    setSelectedTemp(value);
    setTimeout(() => {
      setSelectedTemp(null);
      setState((prev) => {
        if (questionId === 'P0') {
          return {
            ...prev,
            profile: { ...prev.profile, childAge: value as ChildAgeCode },
            currentStage: 'p0b',
          };
        }
        if (questionId === 'P0b') {
          return {
            ...prev,
            profile: { ...prev.profile, caregiver: value as CaregiverCode },
            currentStage: 'p0c',
          };
        }
        return {
          ...prev,
          profile: {
            ...prev.profile,
            hospitalTime: value as HospitalTimeCode,
          },
          currentStage: 'questions',
          currentQuestionIdx: 0,
          showingFeedback: false,
        };
      });
    }, 280);
  };

  const handleScoredOptionSelect = (optionId: string) => {
    setSelectedTemp(optionId);
    const qId = currentQuestion.id;
    setTimeout(() => {
      setSelectedTemp(null);
      setState((prev) => ({
        ...prev,
        answers: { ...prev.answers, [qId]: optionId },
        showingFeedback: true,
      }));
    }, 280);
  };

  const handleNextAfterFeedback = () => {
    // Após P4 (index 3), exibir tela de respiro se ainda não exibida
    if (state.currentQuestionIdx === 3 && !state.breatherShown) {
      setState((prev) => ({
        ...prev,
        showingFeedback: false,
        breatherShown: true,
        currentStage: 'breather',
      }));
      return;
    }

    // Após P8 (index 7), conclui perguntas e vai direto para o preparo e resultado
    if (state.currentQuestionIdx >= 7) {
      track('QuizComplete', {});
      setState((prev) => ({
        ...prev,
        showingFeedback: false,
        currentStage: 'preparing',
      }));
      return;
    }

    setState((prev) => ({
      ...prev,
      showingFeedback: false,
      currentQuestionIdx: prev.currentQuestionIdx + 1,
    }));
  };

  const handleBack = () => {
    if (state.showingFeedback) {
      setState((prev) => ({ ...prev, showingFeedback: false }));
      return;
    }
    if (state.currentStage === 'p0') {
      setState((prev) => ({ ...prev, currentStage: 'intro' }));
    } else if (state.currentStage === 'p0b') {
      setState((prev) => ({ ...prev, currentStage: 'p0' }));
    } else if (state.currentStage === 'p0c') {
      setState((prev) => ({ ...prev, currentStage: 'p0b' }));
    } else if (state.currentStage === 'breather') {
      setState((prev) => ({
        ...prev,
        currentStage: 'questions',
        currentQuestionIdx: 3,
        showingFeedback: true,
      }));
    } else if (state.currentStage === 'questions') {
      if (state.currentQuestionIdx === 0) {
        setState((prev) => ({ ...prev, currentStage: 'p0c' }));
      } else {
        setState((prev) => ({
          ...prev,
          currentQuestionIdx: prev.currentQuestionIdx - 1,
          showingFeedback: false,
        }));
      }
    } else if (state.currentStage === 'preparing') {
      setState((prev) => ({
        ...prev,
        currentStage: 'questions',
        currentQuestionIdx: 7,
        showingFeedback: false,
      }));
    }
  };

  const chosenOptionForCurrent = currentQuestion.options.find(
    (o) => o.id === state.answers[currentQuestion.id]
  );
  const isCurrentAnswerCorrect = Boolean(chosenOptionForCurrent?.isCorrect);

  return (
    <div className="min-h-[100dvh] flex flex-col justify-between bg-[var(--lavender-50)] text-[var(--indigo-900)] overflow-x-hidden">
      {/* Topo do Quiz: Mais respirável, com logo, seta de voltar e badges com espaço confortável */}
      <header className="w-full bg-white/95 backdrop-blur-md border-b border-[var(--indigo-700)]/10 sticky top-0 z-30 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="max-w-xl mx-auto px-3.5 sm:px-6 h-15 sm:h-20 flex items-center justify-between gap-2 sm:gap-3">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {state.currentStage !== 'intro' &&
              state.currentStage !== 'preparing' && (
                <button
                  type="button"
                  onClick={handleBack}
                  aria-label="Voltar para etapa anterior"
                  className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[var(--lavender-100)] text-[var(--indigo-900)] flex items-center justify-center hover:bg-[var(--indigo-900)] hover:text-white transition-all shadow-sm active:scale-95 shrink-0"
                >
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              )}
            <Link
              href="/guia"
              className="flex items-center gap-2 sm:gap-2.5 font-extrabold text-sm sm:text-base text-[var(--indigo-900)] hover:opacity-90 transition-opacity min-w-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo_v1_mae_preparada.webp"
                alt="Logo Mãe Preparada"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl object-contain shadow-sm shrink-0"
              />
              <span className="font-extrabold text-sm sm:text-base tracking-tight truncate">{ORG_CONFIG.name}</span>
            </Link>
          </div>

          {/* Contador discreto "Lacunas para revisar: N" */}
          {state.currentStage === 'questions' && (
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-extrabold shrink-0">
              <span className="text-[var(--ink-muted)] hidden xs:inline">
                Pergunta {currentQuestion.questionIndex} de 8
              </span>
              <span className="px-2.5 sm:px-3 py-1 rounded-full bg-[#FFF0F2] text-[#FF2B44] border border-[#FECDD3] font-extrabold shadow-xs text-xs sm:text-sm whitespace-nowrap">
                Lacunas: {gapsCount}
              </span>
            </div>
          )}

          {(state.currentStage === 'p0' ||
            state.currentStage === 'p0b' ||
            state.currentStage === 'p0c') && (
            <span className="text-xs sm:text-sm font-extrabold text-[var(--ink-muted)] px-2.5 sm:px-3 py-1 rounded-full bg-[var(--lavender-100)] shrink-0 whitespace-nowrap">
              Contexto (
              {state.currentStage === 'p0'
                ? '1/3'
                : state.currentStage === 'p0b'
                ? '2/3'
                : '3/3'}
              )
            </span>
          )}
        </div>

        {/* Barra de progresso menta */}
        <div
          className="w-full h-2 bg-[var(--lavender-100)] overflow-hidden"
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full bg-[var(--mint-400)] transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </header>

      {/* Área Central com respiro visual */}
      <main className="flex-1 flex flex-col justify-center w-full max-w-xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* ==================================================================
            TELA INICIAL DO QUIZ
           ================================================================== */}
        {state.currentStage === 'intro' && (
          <div className="rounded-[24px] bg-white p-5 sm:p-8 border border-[var(--indigo-700)]/15 shadow-soft space-y-4 animate-fade-up">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--lavender-100)] text-[var(--indigo-900)] text-xs font-extrabold">
              <Clock className="w-3.5 h-3.5 text-[var(--indigo-700)]" />
              <span>Diagnóstico Rápido · Primeiros Socorros Infantis</span>
            </div>

            <h1 className="text-xl sm:text-3xl font-extrabold text-[var(--indigo-900)] leading-tight">
              Você saberia o que fazer nos <Em>primeiros minutos</Em> de uma
              emergência com seu(sua) filho(a)?
            </h1>

            <p className="text-sm sm:text-base text-[var(--ink-muted)] font-medium leading-relaxed">
              {QUIZ_INTRO.subtitle}
            </p>

            {/* Imagem Ilustrada da Tela Inicial gerada no Nano Banana */}
            <div className="w-full overflow-hidden rounded-2xl border-2 border-[var(--indigo-700)]/15 bg-white shadow-sm flex items-center justify-center p-1 sm:p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/quiz/intro.webp"
                alt="Ilustração Mãe Preparada: mãe segurando o(a) filho(a) no colo com celular no 192"
                className="max-h-52 sm:max-h-60 w-auto object-contain rounded-xl select-none"
                loading="eager"
              />
            </div>

            <div className="pt-1">
              <PillButton
                variant="primary"
                size="lg"
                fullWidthMobile
                onClick={handleStartQuiz}
                className="w-full"
              >
                {QUIZ_INTRO.ctaText}
              </PillButton>
            </div>

            <p className="text-center text-xs font-semibold text-[var(--ink-muted)]">
              {QUIZ_INTRO.microcopy}
            </p>
          </div>
        )}

        {/* ==================================================================
            PERGUNTAS DE PERFIL (P0, P0b, P0c — Não pontuam)
           ================================================================== */}
        {(state.currentStage === 'p0' ||
          state.currentStage === 'p0b' ||
          state.currentStage === 'p0c') &&
          (() => {
            const pIdx =
              state.currentStage === 'p0'
                ? 0
                : state.currentStage === 'p0b'
                ? 1
                : 2;
            const pq = PROFILE_QUESTIONS[pIdx];
            const currentVal =
              pIdx === 0
                ? state.profile.childAge
                : pIdx === 1
                ? state.profile.caregiver
                : state.profile.hospitalTime;

            return (
              <div
                key={pq.id}
                className="space-y-6 sm:space-y-7 animate-fade-up"
              >
                <div className="space-y-2.5">
                  <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[var(--indigo-700)]">
                    Para personalizar seu resultado
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--indigo-900)] leading-snug">
                    {pq.question}
                  </h2>
                </div>

                <div className="space-y-3 pt-1">
                  {pq.options.map((opt) => {
                    const isSelected =
                      selectedTemp === opt.value ||
                      (selectedTemp === null && currentVal === opt.value);
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleProfileAnswer(pq.id, opt.value)}
                        className={`w-full min-h-[54px] sm:min-h-[62px] px-4 sm:px-5 py-3 sm:py-4 rounded-2xl text-left font-bold text-sm sm:text-base transition-all duration-150 flex items-center justify-between gap-3 sm:gap-4 border-2 shadow-sm ${
                          isSelected
                            ? 'bg-[#FFF0F2] border-[#FF2B44] text-[var(--indigo-900)] scale-[0.99] ring-2 ring-[#FF2B44]/20'
                            : 'bg-[#F4F5F8] hover:bg-[#ECEEF2] border-[#E2E5EB] hover:border-[var(--indigo-900)]/40 text-[var(--indigo-900)]'
                        }`}
                      >
                        <span className="flex-1">{opt.label}</span>
                        <span
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'bg-[#FF2B44] border-[#FF2B44] text-white'
                              : 'border-[#CBD5E1] bg-white'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })()}

        {/* ==================================================================
            PERGUNTAS PONTUADAS (P1 a P8) + TELA DE FEEDBACK IMEDIATO
           ================================================================== */}
        {state.currentStage === 'questions' && (
          <div
            key={`${currentQuestion.id}_${state.showingFeedback}`}
            className="animate-fade-up"
          >
            {!state.showingFeedback ? (
              <div className="space-y-5 sm:space-y-6">
                {/* Ilustração vetorial estilo manual da situação atual */}
                <div className="w-full">
                  <QuizQuestionIllustration questionId={currentQuestion.id} />
                </div>

                {/* Bloco de Enunciado da Pergunta: bem separado da imagem e das respostas */}
                <div className="space-y-2.5 pt-1 sm:pt-2">
                  <span className="inline-block px-3 py-1 rounded-lg bg-[var(--lavender-100)] text-[var(--indigo-700)] text-xs sm:text-sm font-extrabold uppercase tracking-wider">
                    Situação {currentQuestion.questionIndex} de 8 ·{' '}
                    {currentQuestion.title}
                  </span>
                  <h2 className="text-lg sm:text-2xl font-extrabold text-[var(--indigo-900)] leading-snug sm:leading-relaxed">
                    {currentQuestion.question}
                  </h2>
                </div>

                {/* Opções de Resposta: espaçadas e respiráveis */}
                <div className="space-y-3 pt-1 sm:pt-2">
                  {shuffledOptions.map((opt) => {
                    const isSelected = selectedTemp === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleScoredOptionSelect(opt.id)}
                        className={`w-full min-h-[54px] sm:min-h-[62px] px-4 sm:px-5 py-3 sm:py-4 rounded-2xl text-left font-bold text-sm sm:text-base leading-snug transition-all duration-150 flex items-center justify-between gap-3 sm:gap-4 border-2 shadow-sm ${
                          isSelected
                            ? 'bg-[#FFF0F2] border-[#FF2B44] text-[var(--indigo-900)] scale-[0.99] ring-2 ring-[#FF2B44]/20'
                            : 'bg-[#F4F5F8] hover:bg-[#ECEEF2] border-[#E2E5EB] hover:border-[var(--indigo-900)]/40 text-[var(--indigo-900)]'
                        }`}
                      >
                        <span className="flex-1">{opt.text}</span>
                        <span
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'bg-[#FF2B44] border-[#FF2B44] text-white'
                              : 'border-[#CBD5E1] bg-white'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* TELA DE FEEDBACK IMEDIATO (Não punitiva: verde discreto p/ acerto; pill vermelho claro "Vale saber" p/ erro) */
              <div className="rounded-[24px] bg-white p-4 sm:p-7 border-2 border-[var(--indigo-700)]/15 shadow-soft space-y-4">
                {isCurrentAnswerCorrect ? (
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0] text-xs sm:text-sm font-extrabold">
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Resposta alinhada às diretrizes</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF0F2] text-[#FF2B44] border border-[#FECDD3] text-xs sm:text-sm font-extrabold">
                    <Info className="w-4 h-4" />
                    <span>Vale saber</span>
                  </div>
                )}

                <h3 className="text-base sm:text-xl font-extrabold text-[var(--indigo-900)]">
                  {currentQuestion.title}
                </h3>

                {isCurrentAnswerCorrect ? (
                  <p className="text-sm sm:text-base text-[var(--indigo-900)]/90 font-medium leading-relaxed">
                    {currentQuestion.correctFeedback}
                  </p>
                ) : (
                  <div className="space-y-3 text-xs sm:text-base">
                    {/* Bloco do que poderia acontecer: avermelhado, contorno vermelho e título vermelho */}
                    <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#FFF0F2] border-2 border-[#FF2B44] shadow-sm">
                      <span className="block text-xs font-extrabold uppercase tracking-wider text-[#FF2B44]">
                        O que poderia acontecer:
                      </span>
                      <p className="mt-1 text-[#1C1917] font-medium leading-relaxed">
                        {currentQuestion.errorFeedback}
                      </p>
                    </div>

                    {/* Bloco do que as diretrizes indicam: esverdeado, contorno verde e título verde */}
                    <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#F0FDF4] border-2 border-[#22C55E] shadow-sm">
                      <span className="block text-xs font-extrabold uppercase tracking-wider text-[#16A34A]">
                        O que as diretrizes indicam:
                      </span>
                      <p className="mt-1 text-[#14532D] font-bold leading-relaxed">
                        {currentQuestion.guidelineSummary}
                      </p>
                    </div>
                  </div>
                )}

                <div className="pt-2">
                  <PillButton
                    variant="primary"
                    size="lg"
                    fullWidthMobile
                    onClick={handleNextAfterFeedback}
                    className="w-full"
                  >
                    Próxima
                  </PillButton>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================================================================
            TELA DE RESPIRO APÓS A PERGUNTA 4
           ================================================================== */}
        {state.currentStage === 'breather' && (
          <div className="rounded-[28px] bg-[#FFF0F2] border-2 border-[#FECDD3] text-[#1C1917] p-6 sm:p-10 shadow-soft space-y-6 text-center animate-fade-up">
            <div className="w-14 h-14 rounded-2xl bg-[#FF2B44] text-white flex items-center justify-center mx-auto shadow-md">
              <AlertCircle className="w-8 h-8 stroke-[2.5]" />
            </div>

            <span className="inline-block px-3.5 py-1.5 rounded-full bg-white text-[#E11D48] border border-[#FECDD3] text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-sm">
              Metade concluída · Faltam 4 situações
            </span>

            <p className="text-xl sm:text-2xl font-extrabold leading-snug text-[#1C1917] max-w-md mx-auto">
              “{QUIZ_BREATHER_AFTER_P4.text}”
            </p>

            <div className="pt-2">
              <PillButton
                variant="primary"
                size="lg"
                fullWidthMobile
                onClick={() =>
                  setState((prev) => ({
                    ...prev,
                    currentStage: 'questions',
                    currentQuestionIdx: 4,
                    showingFeedback: false,
                  }))
                }
                className="w-full"
              >
                {QUIZ_BREATHER_AFTER_P4.ctaText}
              </PillButton>
            </div>
          </div>
        )}



        {/* ==================================================================
            TELA DE PREPARO (3 SEGUNDOS — Honesta, sem falsa análise)
           ================================================================== */}
        {state.currentStage === 'preparing' && (
          <div className="rounded-[24px] bg-[#FFF0F2] border-2 border-[#FECDD3] text-[#1C1917] p-7 sm:p-10 text-center space-y-6 shadow-soft animate-fade-up">
            <div className="w-14 h-14 rounded-full border-4 border-[#FECDD3] border-t-[#FF2B44] animate-spin mx-auto" />

            <div className="space-y-3 text-left max-w-xs mx-auto">
              <div className="flex items-center gap-3 text-sm sm:text-base font-bold text-[#1C1917]">
                <span className="w-6 h-6 rounded-full bg-[#FF2B44] text-white flex items-center justify-center text-xs font-extrabold shadow-sm">
                  ✓
                </span>
                <span>Contando suas respostas…</span>
              </div>
              <div
                className={`flex items-center gap-3 text-sm sm:text-base font-bold text-[#1C1917] transition-opacity duration-300 ${
                  prepStep >= 2 ? 'opacity-100' : 'opacity-40'
                }`}
              >
                <span className="w-6 h-6 rounded-full bg-[#FF2B44] text-white flex items-center justify-center text-xs font-extrabold shadow-sm">
                  {prepStep >= 2 ? '✓' : '2'}
                </span>
                <span>Reunindo as situações para revisar…</span>
              </div>
              <div
                className={`flex items-center gap-3 text-sm sm:text-base font-bold text-[#1C1917] transition-opacity duration-300 ${
                  prepStep >= 3 ? 'opacity-100' : 'opacity-40'
                }`}
              >
                <span className="w-6 h-6 rounded-full bg-[#FF2B44] text-white flex items-center justify-center text-xs font-extrabold shadow-sm">
                  {prepStep >= 3 ? '✓' : '3'}
                </span>
                <span>Montando seu resultado.</span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Rodapé compacto com aviso médico visível (Regra 6 da Seção 1) */}
      <footer className="w-full py-2.5 px-4 bg-white/80 border-t border-[var(--indigo-700)]/10 text-center">
        <p className="max-w-xl mx-auto text-[11px] font-semibold text-[var(--ink-muted)] leading-snug opacity-80">
          {MEDICAL_DISCLAIMER}
        </p>
      </footer>
    </div>
  );
}
