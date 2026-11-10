'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronDown,
  HeartHandshake,
  PhoneCall,
  RefreshCw,
  Share2,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Wind,
  BookOpen,
  AlertCircle,
  Quote,
  Star,
} from 'lucide-react';
import { TopBarAndHeader } from '@/components/layout/TopBarAndHeader';
import { Footer } from '@/components/layout/Footer';
import { LeadMagnetSection } from '@/components/layout/LeadMagnetSection';
import { Em } from '@/components/ui/Em';
import { PillButton } from '@/components/ui/PillButton';
import { RotatingSeal } from '@/components/ui/RotatingSeal';
import {
  ErrorMythIllustration,
  GoldenRuleIllustration,
  GuideHeroMockup,
  SceneIllustration,
} from '@/components/ui/Illustrations';
import {
  AB_TESTS_CONFIG,
  HERO_SOCIAL_PROOF,
  MEDICAL_DISCLAIMER,
  OFFER_CONFIG,
  ORG_CONFIG,
  PRODUCT_CONFIG,
  SHORT_MEDICAL_DISCLAIMER,
  SPECIALIST_CONFIG,
  TESTIMONIAL_SLOTS,
} from '@/config/siteConfig';
import {
  COMPARISON_ROWS,
  FAQ_ITEMS,
  GUIDE_CATEGORIES,
  PUBLIC_GUIDELINE_SOURCES,
  REALITY_SCENES,
  SIX_ERRORS,
  TESTIMONIALS,
} from '@/data/landingContent';
import {
  computeQuizSummary,
  loadQuizState,
  QuizComputedSummary,
  QuizState,
  resetQuizState,
} from '@/storage/quizStore';
import { buildCaktoCheckoutUrl } from '@/tracking/attribution';
import { CTALocation, SectionId } from '@/tracking/events';
import { track } from '@/tracking/track';

const CATEGORY_ICONS: Record<string, string> = {
  A: '/images/icones/icone_pulmao.svg',
  B: '/images/icones/icone_bandeide.svg',
  C: '/images/icones/icone_chama.svg',
  D: '/images/icones/icone_termometro.svg',
};

interface LandingAndResultViewProps {
  mode: 'guia' | 'resultado';
}

export function LandingAndResultView({ mode }: LandingAndResultViewProps) {
  const router = useRouter();
  const [quizState, setQuizState] = useState<QuizState | null>(null);
  const [summary, setSummary] = useState<QuizComputedSummary | null>(null);
  const [openLacunas, setOpenLacunas] = useState<Record<string, boolean>>({});
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    A: true,
    B: false,
    C: false,
    D: false,
    E: false,
  });
  const [openFaq, setOpenFaq] = useState<number | null>(1);
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const [showStickyMobile, setShowStickyMobile] = useState(false);
  const testimonialScrollRef = React.useRef<HTMLDivElement>(null);
  const [testimonialProgress, setTestimonialProgress] = useState(0);

  const handleTestimonialScroll = () => {
    if (testimonialScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        testimonialScrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        setTestimonialProgress(scrollLeft / maxScroll);
      }
    }
  };

  const scrollTestimonials = (direction: 'left' | 'right') => {
    if (testimonialScrollRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      testimonialScrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Inicializa estado do quiz e dispara ViewContent / ResultView
  useEffect(() => {
    const loaded = loadQuizState();
    const computed = computeQuizSummary(loaded);
    setQuizState(loaded);
    setSummary(computed);

    track('ViewContent', { content_name: mode });
    if (mode === 'resultado') {
      track('ResultView', { band: computed.band });
    }
  }, [mode]);

  // Monitora ScrollDepth (25/50/75/90%) e visibilidade da Sticky Bar Mobile
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const pct = Math.round((scrollTop / docHeight) * 100);
      const thresholds: Array<25 | 50 | 75 | 90> = [25, 50, 75, 90];
      for (const t of thresholds) {
        if (pct >= t) {
          track('ScrollDepth', { pct: t, page: mode });
        }
      }

      const offerEl = document.getElementById('s13');
      if (offerEl) {
        const rect = offerEl.getBoundingClientRect();
        const isOfferVisible =
          rect.top < window.innerHeight && rect.bottom > 100;
        setShowStickyMobile(scrollTop > 550 && !isOfferVisible);
      } else {
        setShowStickyMobile(scrollTop > 550);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mode]);

  // Monitora SectionView via IntersectionObserver (≥ 50% visível por ≥ 1s)
  useEffect(() => {
    const timers: Record<string, ReturnType<typeof setTimeout>> = {};
    const sections = document.querySelectorAll<HTMLElement>('[data-section-id]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const secId = entry.target.getAttribute(
            'data-section-id'
          ) as SectionId | null;
          if (!secId) return;

          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            if (!timers[secId]) {
              timers[secId] = setTimeout(() => {
                track('SectionView', { section: secId });
              }, 1000);
            }
          } else if (timers[secId]) {
            clearTimeout(timers[secId]);
            delete timers[secId];
          }
        });
      },
      { threshold: [0.5] }
    );

    sections.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      Object.values(timers).forEach(clearTimeout);
    };
  }, []);

  const handleCheckoutCTA = (location: CTALocation) => {
    track('CTAClick', { location }, { useBeacon: true });

    const targetUrl = buildCaktoCheckoutUrl(OFFER_CONFIG.checkoutUrl, {
      sckLocation: `${mode}_${location}`,
      prefillLead: quizState?.lead
        ? {
            name: quizState.lead.name,
            email: quizState.lead.email,
            phone: quizState.lead.whatsapp,
            consented: quizState.lead.consented,
          }
        : undefined,
    });

    setTimeout(() => {
      window.location.href = targetUrl;
    }, 150);
  };

  const handleShareCaregiver = (shareType: 'quiz' | 'guide') => {
    track('ShareClick', {});
    const origin =
      typeof window !== 'undefined' ? window.location.origin : '';
    const text =
      shareType === 'quiz'
        ? `Fiz este teste rápido de 2 minutos sobre primeiros socorros em bebês e crianças e lembrei de você, que também cuida do nosso pequeno: ${origin}/quiz`
        : `Olha este guia ilustrado de primeiros socorros infantis (Segundos que Salvam) para deixarmos de consulta rápida em casa: ${origin}/guia`;

    const waUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleRetakeQuiz = () => {
    resetQuizState();
    router.push('/quiz');
  };

  const toggleCategory = (code: string) => {
    setOpenCategories((prev) => ({ ...prev, [code]: !prev[code] }));
  };

  const toggleLacuna = (id: string) => {
    setOpenLacunas((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleFaqToggle = (qIndex: number) => {
    if (openFaq === qIndex) {
      setOpenFaq(null);
    } else {
      setOpenFaq(qIndex);
      track('FAQOpen', { q: qIndex });
    }
  };

  const acertos = summary?.acertos ?? 5;
  const nomePrefix = summary?.nome ? `${summary.nome}, ` : '';
  const hasQuizData = Boolean(summary?.hasData);
  const visibleFaqs = showAllFaqs ? FAQ_ITEMS : FAQ_ITEMS.slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--lavender-50)] text-[var(--indigo-900)]">
      {/* 8.1 Barra superior + cabeçalho (s0) */}
      <TopBarAndHeader onCtaClick={handleCheckoutCTA} />

      <main className="flex-1">
        {/* ==================================================================
            8.2 HERO DIRETO E VISUAL (s1)
           ================================================================== */}
        <section
          id="s1"
          data-section-id="s1"
          className="py-10 sm:py-14 lg:py-16 px-4 sm:px-6"
        >
          <div className="max-w-container mx-auto">
            {mode === 'resultado' && summary && (
              <div className="mb-5 inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--lavender-100)] border border-[var(--indigo-700)]/20 text-xs font-bold text-[var(--indigo-900)]">
                <span className="w-2 h-2 rounded-full bg-[var(--mint-400)]" />
                <span>
                  {summary.nome ? `${summary.nome}, você` : 'Você'} acertou{' '}
                  <strong>{summary.acertos} de 8</strong> · Para revisar:{' '}
                  <strong>{summary.listaErrosText}</strong>
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Esquerda: Copy forte e enxuta */}
              <div className="lg:col-span-6 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--lavender-100)] text-[var(--indigo-900)] text-xs font-extrabold">
                  <Sparkles className="w-3.5 h-3.5 text-[var(--indigo-700)]" />
                  <span>{ORG_CONFIG.signature}</span>
                </div>

                {mode === 'resultado' ? (
                  <h1 className="font-extrabold text-[var(--indigo-900)] tracking-tight leading-[1.08] text-[clamp(1.75rem,5.2vw,3.3rem)]">
                    Você acertou {acertos} de 8. Transforme{' '}
                    <Em>dúvida</Em> em passo a passo.
                  </h1>
                ) : (
                  <h1 className="font-extrabold text-[var(--indigo-900)] tracking-tight leading-[1.08] text-[clamp(1.75rem,5.2vw,3.4rem)]">
                    Nos primeiros minutos de uma emergência, saiba o{' '}
                    <Em>quê</Em> fazer antes de precisar.
                  </h1>
                )}

                <p className="text-base sm:text-[17px] text-[var(--ink-muted)] leading-relaxed font-medium">
                  <strong className="text-[var(--indigo-900)] font-extrabold">
                    Segundos que Salvam
                  </strong>{' '}
                  é o guia ilustrado que mostra o que fazer — e o que{' '}
                  <strong className="text-[var(--emergency-600)]">NÃO fazer</strong>{' '}
                  — em engasgo, queimadura, convulsão, afogamento e mais de 30
                  situações. Em toda página:{' '}
                  <strong className="text-[var(--indigo-900)]">
                    calma, ligar 192, agir.
                  </strong>
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
                  <PillButton
                    variant="primary"
                    size="lg"
                    fullWidthMobile
                    onClick={() => handleCheckoutCTA('hero')}
                  >
                    {AB_TESTS_CONFIG.ctaText}
                  </PillButton>

                  {mode === 'guia' && (
                    <PillButton
                      variant="secondary"
                      size="lg"
                      fullWidthMobile
                      href="/quiz"
                      onClick={() => track('QuizCTAClick', {})}
                    >
                      Fazer o teste de 2 min
                    </PillButton>
                  )}
                </div>

                {/* 3 Checks diretos */}
                <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                  {[
                    'Ilustrado estilo manual',
                    'Acha em 2 toques (offline)',
                    'Passo a passo visual direto',
                  ].map((checkText) => (
                    <li
                      key={checkText}
                      className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[var(--indigo-900)] bg-white/80 px-3 py-2 rounded-xl border border-[var(--indigo-700)]/10"
                    >
                      <span className="w-5 h-5 rounded-full bg-[var(--mint-400)] text-[var(--indigo-900)] flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                      <span>{checkText}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-xs font-semibold text-[var(--ink-muted)] opacity-75">
                  {SHORT_MEDICAL_DISCLAIMER}
                </p>
              </div>

              {/* Direita: Mockup Ilustrado + Selo Circular Girando */}
              <div className="lg:col-span-6 relative pt-4 sm:pt-6">
                <div className="absolute -top-2 -left-2 sm:-left-4 z-20">
                  <RotatingSeal />
                </div>
                <GuideHeroMockup />
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            DIAGNÓSTICO PERSONALIZADO (Exclusivo em /resultado)
           ================================================================== */}
        {mode === 'resultado' && (
          <section
            aria-label="Seu resultado do diagnóstico"
            className="pt-8 pb-10 px-4 sm:px-6 bg-gradient-to-b from-[var(--lavender-100)] to-[var(--lavender-50)] border-y border-[var(--indigo-700)]/10"
          >
            <div className="max-w-container mx-auto space-y-6">
              {!hasQuizData && (
                <div className="rounded-2xl bg-white border border-[var(--indigo-700)]/20 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-soft">
                  <div className="flex items-center gap-2.5">
                    <AlertCircle className="w-5 h-5 text-[var(--indigo-700)] shrink-0" />
                    <p className="text-xs sm:text-sm font-medium">
                      Você abriu o resultado sem respostas salvas. Faça o teste de 2 minutos para ver seu diagnóstico exato.
                    </p>
                  </div>
                  <PillButton
                    variant="secondary"
                    size="md"
                    href="/quiz"
                    onClick={() => track('QuizCTAClick', {})}
                  >
                    Fazer o teste
                  </PillButton>
                </div>
              )}

              {/* (1) Anel X de 8 + Mensagem da Faixa (Fundo branco para destaque limpo) */}
              <div className="rounded-[28px] bg-white border-2 border-[#FECDD3] text-[#1C1917] p-6 sm:p-8 shadow-soft">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-4 flex flex-col items-center text-center">
                    <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                        <circle
                          cx="60"
                          cy="60"
                          r="50"
                          fill="none"
                          stroke="#FECDD3"
                          strokeWidth="10"
                        />
                        <circle
                          cx="60"
                          cy="60"
                          r="50"
                          fill="none"
                          stroke="#FF2B44"
                          strokeWidth="10"
                          strokeLinecap="round"
                          strokeDasharray={314}
                          strokeDashoffset={314 - (314 * acertos) / 8}
                          className="transition-all duration-700 ease-out"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl sm:text-3xl font-extrabold text-[#FF2B44]">
                          {acertos} de 8
                        </span>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#57534E]">
                          Acertos
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-8 space-y-3">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#FF2B44] text-white text-xs font-extrabold uppercase tracking-wider shadow-sm">
                      Seu diagnóstico
                    </span>
                    <h2 className="text-xl sm:text-3xl font-extrabold leading-tight text-[#1C1917]">
                      {nomePrefix}você acertou {acertos} de 8 situações.
                    </h2>
                    <p className="text-sm sm:text-base text-[#44403C] leading-relaxed font-medium">
                      {summary?.bandMessage}
                    </p>
                  </div>
                </div>
              </div>

              {/* (2) Cartões expansíveis em dropcard (estilo FAQ) "Situações para revisar" */}
              {summary && summary.wrongDetails.length > 0 && (
                <div className="mt-8 sm:mt-12 space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#1C1917]">
                      Suas principais lacunas para revisar agora:
                    </h3>
                    <p className="text-sm sm:text-base text-[#44403C] font-medium">
                      Toque em cada situação para ver os detalhes e a conduta recomendada pelas diretrizes:
                    </p>
                  </div>
                  <div className="space-y-3">
                    {summary.wrongDetails.slice(0, 3).map((item) => {
                      const isOpen = Boolean(openLacunas[item.questionId]);
                      return (
                        <div
                          key={item.questionId}
                          className="rounded-2xl bg-white border border-[#FECDD3] overflow-hidden shadow-xs transition-all"
                        >
                          <button
                            type="button"
                            onClick={() => toggleLacuna(item.questionId)}
                            aria-expanded={isOpen}
                            className="w-full min-h-[56px] px-4 sm:px-5 py-3.5 sm:py-4 text-left flex items-center justify-between gap-3 sm:gap-4 hover:bg-[#FFF0F2]/40 transition-colors"
                          >
                            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                              <span className="px-2.5 py-1 rounded-full bg-[#FFF0F2] text-[#FF2B44] border border-[#FECDD3] text-xs font-extrabold shrink-0">
                                Vale saber
                              </span>
                              <span className="font-extrabold text-sm sm:text-lg text-[#1C1917] leading-snug">
                                {item.title}
                              </span>
                            </div>
                            <ChevronDown
                              className={`w-5 h-5 shrink-0 text-[#FF2B44] transition-transform duration-200 ${
                                isOpen ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                          {isOpen && (
                            <div className="px-4 sm:px-5 pb-5 pt-3 border-t border-[#FECDD3] space-y-3 bg-[#FFF0F2]/20">
                              <p className="text-sm sm:text-base text-[#44403C] leading-relaxed">
                                <strong className="text-[#FF2B44] font-extrabold">Sua resposta no teste:</strong>{' '}
                                “{item.chosenOptionText}”
                              </p>
                              {item.whatCouldHappen && (
                                <div className="p-3.5 rounded-xl bg-[#FFF0F2] border border-[#FECDD3] text-[#9F1239] text-sm sm:text-base leading-relaxed">
                                  <strong className="text-[#FF2B44] font-extrabold block mb-1">
                                    O que poderia acontecer:
                                  </strong>
                                  {item.whatCouldHappen}
                                </div>
                              )}
                              <div className="p-3.5 rounded-xl bg-white border-2 border-[#86EFAC] text-[#15803D] text-sm sm:text-base font-semibold leading-relaxed shadow-xs">
                                <strong className="text-[#15803D] font-extrabold block mb-1">
                                  ✓ O que as diretrizes recomendam:
                                </strong>
                                {item.whatGuidelinesSay}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* (3) Compartilhar com quem cuida + Refazer */}
              <div className="rounded-2xl bg-white border-2 border-[#FECDD3] p-5 sm:p-7 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 shadow-soft">
                <p className="text-sm sm:text-base md:text-lg font-extrabold text-[#1C1917] leading-snug max-w-xl">
                  {summary?.caregiverCode !== 'eu'
                    ? `Quem cuida dele(a) (${summary?.quemCuida || 'a avó ou babá'}) saberia agir nessas situações?`
                    : 'Quer testar se quem convive com seu(sua) filho(a) também saberia agir?'}
                </p>
                <div className="flex flex-wrap items-center gap-3 shrink-0 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => handleShareCaregiver('quiz')}
                    className="min-h-[52px] inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#F0FDF4] hover:bg-[#DCFCE7] border-2 border-[#22C55E] text-[#15803D] font-extrabold text-sm sm:text-base shadow-sm hover:shadow-md transition-all shrink-0 w-full sm:w-auto"
                  >
                    <Share2 className="w-5 h-5 text-[#15803D] shrink-0" />
                    <span>Mandar o teste no WhatsApp</span>
                    <ArrowUpRight className="w-5 h-5 text-[#15803D] shrink-0" />
                  </button>
                  <button
                    type="button"
                    onClick={handleRetakeQuiz}
                    className="min-h-[48px] inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-xs sm:text-sm font-extrabold text-[#57534E] hover:text-[#FF2B44] hover:bg-[#FFF0F2] border border-[#FECDD3] sm:border-transparent transition-colors w-full sm:w-auto"
                  >
                    <RefreshCw className="w-4 h-4" /> Refazer teste
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ==================================================================
            8.3 AS 3 CENAS ILUSTRADAS: A REALIDADE (s2)
           ================================================================== */}
        <section
          id="s2"
          data-section-id="s2"
          className="py-12 sm:py-16 px-4 sm:px-6 bg-white border-y border-[#FECDD3]"
        >
          <div className="max-w-container mx-auto space-y-8">
            <div className="max-w-2xl mx-auto text-center space-y-2.5">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1C1917] leading-tight">
                Ninguém te ensinou isso. E a emergência <Em>não avisa</Em>.
              </h2>
              <p className="text-base sm:text-[17px] text-[#57534E]">
                Na hora do susto, o cérebro trava. Quem não tem o passo a passo à mão acaba agindo no improviso:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {REALITY_SCENES.map((scene) => (
                <div
                  key={scene.id}
                  className="rounded-[24px] bg-[#FFF0F2] p-4 sm:p-5 border-2 border-[#FECDD3] shadow-soft flex flex-col justify-between space-y-4"
                >
                  {scene.imageSrc ? (
                    <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-[#FECDD3] shadow-xs">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={scene.imageSrc}
                        alt={scene.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <SceneIllustration type={scene.illustrationType} />
                  )}
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-extrabold text-[#1C1917] italic">
                      {scene.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#44403C] leading-relaxed font-medium">
                      “{scene.description}”
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-xs sm:text-base font-extrabold text-[#9F1239] bg-[#FFF0F2] py-2.5 sm:py-3 px-4 sm:px-5 rounded-2xl sm:rounded-full max-w-xl mx-auto border border-[#FECDD3]">
              Não é sobre medo. É sobre ter o primeiro passo na ponta dos dedos.
            </p>
          </div>
        </section>

        {/* ==================================================================
            8.5 A SOLUÇÃO (s4) + 8.6 COMO USAR ILUSTRADO (s5)
           ================================================================== */}
        <section
          id="s4"
          data-section-id="s4"
          className="py-12 sm:py-20 px-4 sm:px-6 bg-[#FFF0F2] border-y border-[#FECDD3] text-[#1C1917]"
        >
          <div className="max-w-container mx-auto space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6">
                <div className="rounded-[28px] bg-white p-4 sm:p-5 text-[var(--indigo-900)] shadow-soft space-y-3 border border-[#FECDD3]">
                  <GuideHeroMockup />
                  <div className="rounded-2xl bg-[#FFF9FA] border border-[#FECDD3] text-[#1C1917] px-4 py-3 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <span className="block text-[11px] text-[#FF2B44] font-extrabold uppercase">
                        Sem jargão · Sem texto longo
                      </span>
                      <span className="block text-xs sm:text-base font-extrabold leading-snug">
                        Abre em 2 toques no celular (mesmo sem internet)
                      </span>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-[#FF2B44] text-white flex items-center justify-center font-extrabold shrink-0 shadow-sm">
                      ↗
                    </span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-5">
                <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight text-[#1C1917]">
                  Um guia feito para ser usado{' '}
                  <Em>no susto</Em>.
                </h2>

                <p className="text-base sm:text-[17px] text-[#44403C] leading-relaxed font-medium">
                  Transformamos diretrizes públicas de primeiros socorros
                  pediátricos em páginas visuais estilo manual de montagem: você
                  bate o olho na ilustração, vê o que fazer, o que{' '}
                  <strong>não</strong> fazer e quando ligar 192.
                </p>

                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  <div className="rounded-xl sm:rounded-2xl bg-[#FF2B44] text-white p-2.5 sm:p-4 text-center shadow-md">
                    <span className="block text-xl sm:text-3xl font-extrabold">
                      {PRODUCT_CONFIG.situationsCount}
                    </span>
                    <span className="block text-[10px] sm:text-xs font-extrabold leading-tight">
                      situações
                    </span>
                  </div>
                  <div className="rounded-xl sm:rounded-2xl bg-white border border-[#FECDD3] p-2.5 sm:p-4 text-center shadow-sm">
                    <span className="block text-xl sm:text-3xl font-extrabold text-[#FF2B44]">
                      {PRODUCT_CONFIG.pagesCount}
                    </span>
                    <span className="block text-[10px] sm:text-xs font-bold text-[#57534E] leading-tight">
                      páginas visuais
                    </span>
                  </div>
                  <div className="rounded-xl sm:rounded-2xl bg-white border border-[#FECDD3] p-2.5 sm:p-4 text-center shadow-sm">
                    <span className="block text-xl sm:text-3xl font-extrabold text-[#FF2B44]">
                      192
                    </span>
                    <span className="block text-[10px] sm:text-xs font-bold text-[#57534E] leading-tight">
                      sempre primeiro
                    </span>
                  </div>
                </div>

                <PillButton
                  variant="primary"
                  size="lg"
                  fullWidthMobile
                  onClick={() => handleCheckoutCTA('s4')}
                >
                  {AB_TESTS_CONFIG.ctaText}
                </PillButton>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            8.7 AS 4 CATEGORIAS ILUSTRADAS DO GUIA (s6)
           ================================================================== */}
        <section
          id="s6"
          data-section-id="s6"
          className="py-12 sm:py-16 px-4 sm:px-6"
        >
          <div className="max-w-container mx-auto space-y-8">
            <div className="max-w-2xl mx-auto text-center space-y-2">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--indigo-900)]">
                As 35 situações <Em>organizadas</Em> por cor e tema.
              </h2>
              <p className="text-sm sm:text-base text-[var(--ink-muted)]">
                Dividido em 4 grandes categorias de emergência:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {GUIDE_CATEGORIES.map((cat) => {
                const isOpen = Boolean(openCategories[cat.code]);
                return (
                  <div
                    key={cat.code}
                    className="rounded-[28px] bg-white p-6 sm:p-7 border-2 border-[#FECDD3] shadow-soft flex flex-col justify-between hover:border-[#FF2B44]/40 hover:shadow-md transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="w-12 h-12 rounded-2xl bg-[#FFF0F2] border border-[#FECDD3] flex items-center justify-center p-2.5 shrink-0 shadow-xs">
                          <img
                            src={CATEGORY_ICONS[cat.code] || '/images/icones/icone_pulmao.svg'}
                            alt={`Ícone da categoria ${cat.code}`}
                            className="w-7 h-7 object-contain"
                          />
                        </div>
                        <span className="px-3 py-1 rounded-full bg-[#FF2B44] text-white text-xs font-extrabold shadow-sm">
                          {cat.items.length} situações
                        </span>
                      </div>

                      <h3 className="mt-3 text-xl font-extrabold text-[#FF2B44] tracking-tight">
                        {cat.code}. {cat.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#44403C] font-medium mt-1 leading-relaxed">
                        {cat.summary}
                      </p>

                      {isOpen && (
                        <div className="mt-4 pt-4 border-t border-[#FECDD3] flex flex-wrap gap-2">
                          {cat.items.map((sit) => (
                            <span
                              key={sit}
                              className="px-3 py-1.5 rounded-xl bg-[#FFF0F2] text-[#1C1917] text-xs font-bold border border-[#FECDD3] shadow-xs"
                            >
                              ✓ {sit}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleCategory(cat.code)}
                      className="mt-5 w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#1C1917] border border-[#9CA3AF] font-extrabold text-xs sm:text-sm flex items-center justify-between transition-colors shadow-xs"
                    >
                      <span>
                        {isOpen ? 'Ocultar situações' : 'Ver situações incluídas'}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#1C1917] transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==================================================================
            8.10 REDE DE APOIO (s9)
           ================================================================== */}
        <section
          id="s9"
          data-section-id="s9"
          className="py-12 sm:py-16 px-4 sm:px-6 bg-white border-y border-[#FECDD3]"
        >
          <div className="max-w-container mx-auto">
            <div className="max-w-4xl mx-auto rounded-[28px] bg-[#FFF0F2] p-6 sm:p-8 border-2 border-[#FECDD3] flex flex-col md:flex-row items-center justify-between gap-6 shadow-soft">
              <div className="space-y-1.5 text-center md:text-left">
                <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#FF2B44]">
                  <HeartHandshake className="w-4 h-4 text-[#FF2B44]" /> Para avó, pai e babá
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#1C1917]">
                  Você não está sempre lá. O <Em>guia</Em> está.
                </h3>
                <p className="text-sm text-[#44403C] max-w-lg font-medium leading-relaxed">
                  Envie o guia para quem fica com seu(sua) filho(a) e deixe as orientações de
                  emergência sempre acessíveis.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleShareCaregiver('guide')}
                className="min-h-[50px] inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#FF2B44] hover:bg-[#E02438] text-white font-extrabold text-sm sm:text-base shadow-sm hover:shadow-md transition-all shrink-0 w-full sm:w-auto"
              >
                <Share2 className="w-5 h-5 text-white shrink-0" />
                <span>Enviar para quem cuida dele(a)</span>
                <ArrowUpRight className="w-5 h-5 text-white shrink-0" />
              </button>
            </div>
          </div>
        </section>

        {/* ==================================================================
            8.11 CREDIBILIDADE (s10) + 8.12 DEPOIMENTOS (s11) + 8.13 COMPARAÇÃO (s12)
           ================================================================== */}
        <section
          id="s10"
          data-section-id="s10"
          className="py-12 sm:py-16 px-4 sm:px-6"
        >
          <div className="max-w-container mx-auto space-y-10">
            {/* 8.11 Especialista: Quem está por trás do guia (Dra. Patrícia Costa) */}
            <div className="flex flex-col lg:flex-row items-stretch rounded-[24px] sm:rounded-[28px] overflow-hidden border-2 border-[#FECDD3] shadow-soft bg-white">
              {/* Foto da Especialista (fora do bloco branco de texto, colada nele e ampliada no mobile com corte mínimo para enquadramento perfeito) */}
              <div className="relative w-full lg:w-5/12 aspect-[4/5] sm:aspect-[4/5] max-h-[560px] lg:max-h-none lg:aspect-auto lg:h-auto min-h-[320px] sm:min-h-[400px] lg:min-h-[480px] bg-[#FFF0F2] border-b-2 lg:border-b-0 lg:border-r-2 border-[#FECDD3] shrink-0 overflow-hidden">
                <img
                  src="/images/dr_patricia_costa_mae_preparada.webp"
                  alt="Dra. Patrícia Costa - Médica Pediatra e Especialista em Segurança Infantil"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10">
                  <div className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white/95 backdrop-blur-xs border border-[#FECDD3] text-[11px] sm:text-xs font-extrabold text-[#FF2B44] shadow-sm">
                    <UserCheck className="w-3.5 h-3.5 text-[#FF2B44]" />
                    Revisão Médica e Especializada
                  </div>
                </div>
              </div>

              {/* Bloco Branco onde fala sobre ela (colado com a foto) */}
              <div className="flex-1 bg-white text-[#1C1917] p-5 sm:p-9 lg:p-10 flex flex-col justify-center space-y-4 text-left">
                <span className="inline-block self-start px-3.5 py-1.5 rounded-full bg-[#FFF0F2] text-[#FF2B44] border border-[#FECDD3] text-xs font-extrabold uppercase tracking-wider shadow-xs">
                  Quem está por trás do guia
                </span>
                <div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1C1917] tracking-tight">
                    Dra. Patrícia Costa
                  </h2>
                  <p className="mt-1 text-sm sm:text-base font-bold text-[#FF2B44]">
                    Médica Pediatra com especialidade em crianças pequenas e especialista em segurança infantil
                  </p>
                </div>
                <p className="text-sm sm:text-base text-[#44403C] leading-relaxed font-medium">
                  Com ampla vivência no acompanhamento de bebês e na orientação de famílias, a Dra. Patrícia Costa reuniu sua experiência para que cada conduta deste guia seja rigorosamente validada, fundamentada na medicina baseada em evidências e desenhada para ação rápida.
                </p>
                <p className="text-xs sm:text-base text-[#44403C] leading-relaxed font-medium italic bg-[#FFF0F2]/60 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-[#FECDD3]">
                  &ldquo;Na hora da emergência, nenhum pai ou mãe consegue ler parágrafos densos ou manuais técnicos. O Segundos que Salvam foi estruturado para você bater o olho e ter a certeza absoluta de como agir nos primeiros minutos.&rdquo;
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 pt-1">
                  <div className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl bg-[#FFF0F2] border border-[#FECDD3] text-xs sm:text-sm font-bold text-[#1C1917]">
                    <span className="w-5 h-5 rounded-full bg-[#FF2B44] text-white flex items-center justify-center shrink-0 text-xs">✓</span>
                    <span>Foco em bebês e primeira infância</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl bg-[#FFF0F2] border border-[#FECDD3] text-xs sm:text-sm font-bold text-[#1C1917]">
                    <span className="w-5 h-5 rounded-full bg-[#FF2B44] text-white flex items-center justify-center shrink-0 text-xs">✓</span>
                    <span>Passo a passo visual e direto</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Novo Bloco Separado: As 4 Fontes Oficiais e Organizações */}
            <div className="rounded-[24px] sm:rounded-[28px] bg-white border-2 border-[#FECDD3] p-5 sm:p-9 shadow-soft space-y-6">
              <div className="max-w-2xl mx-auto text-center space-y-2">
                <span className="inline-block px-3.5 py-1.5 rounded-full bg-[#FFF0F2] text-[#FF2B44] border border-[#FECDD3] text-xs font-extrabold uppercase tracking-wider shadow-xs">
                  Diretrizes Oficiais e Internacionais
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1C1917] tracking-tight">
                  Baseado nas fontes que os hospitais e pediatras confiam
                </h3>
                <p className="text-sm sm:text-base text-[#57534E] leading-relaxed font-medium">
                  Todo o conteúdo do guia foi sintetizado e alinhado aos protocolos públicos das principais autoridades de saúde e atendimento de emergência:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {PUBLIC_GUIDELINE_SOURCES.map((src) => (
                  <a
                    key={src.name}
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#FFF0F2] hover:bg-[#FFE4E8] border border-[#FECDD3] transition-all block group shadow-xs"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-extrabold text-sm sm:text-base text-[#1C1917] group-hover:text-[#FF2B44] transition-colors">
                        {src.name}
                      </span>
                      <span className="text-xs font-extrabold text-[#FF2B44] shrink-0">
                        ↗
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#57534E] leading-snug mt-1.5 font-medium">
                      {src.topic}
                    </p>
                  </a>
                ))}
              </div>

              <p className="text-center text-[11px] sm:text-xs text-[#78716C] font-medium pt-3 border-t border-[#FECDD3]">
                * Baseado em diretrizes públicas oficiais para profissionais de saúde e socorristas. Não há vínculo comercial ou endosso direto destas entidades ao material.
              </p>
            </div>

            {/* 8.13 Comparação Honesta Enxuta (s12) */}
            <div id="s12" data-section-id="s12" className="space-y-4">
              <div className="text-center max-w-2xl mx-auto space-y-1">
                <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--indigo-900)]">
                  Comparação <Em>honesta</Em>: por que ter o guia à mão?
                </h3>
              </div>

              {/* Indicador Mobile: Arraste para o lado */}
              <div className="flex sm:hidden items-center justify-center gap-2 py-1.5 px-3.5 rounded-full bg-[#FFF0F2] text-[#FF2B44] text-xs font-extrabold border border-[#FECDD3] w-fit mx-auto shadow-xs">
                <span>Arraste para o lado para ver a tabela completa</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#FF2B44]" />
              </div>

              <div className="overflow-x-auto rounded-[24px] border-2 border-[#FF2B44] shadow-soft bg-white overscroll-x-contain">
                <table className="w-full min-w-[540px] sm:min-w-[600px] text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#FFF0F2] text-[#1C1917] border-b border-[#FECDD3]">
                      <th className="p-3 sm:p-3.5 font-extrabold">Critério</th>
                      <th className="p-3 sm:p-3.5 font-bold text-[#57534E]">
                        Vídeos / Posts soltos
                      </th>
                      <th className="p-3 sm:p-3.5 font-extrabold text-[#FF2B44]">
                        Curso presencial
                      </th>
                      <th className="p-3 sm:p-3.5 font-extrabold bg-[#FFE4E6] text-[#FF2B44]">
                        Segundos que Salvam
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--lavender-100)]">
                    {COMPARISON_ROWS.map((row) => (
                      <tr key={row.criterion}>
                        <td className="p-3 sm:p-3.5 font-extrabold text-[var(--indigo-900)]">
                          {row.criterion}
                        </td>
                        <td className="p-3 sm:p-3.5 text-[var(--ink-muted)]">
                          {row.loosePosts}
                        </td>
                        <td
                          className={`p-3 sm:p-3.5 font-bold ${
                            row.courseWins
                              ? 'bg-[var(--mint-400)]/25 font-extrabold text-[var(--indigo-900)]'
                              : 'text-[var(--indigo-900)]'
                          }`}
                        >
                          {row.inPersonCourse}
                        </td>
                        <td className="p-3 sm:p-3.5 font-extrabold text-[var(--indigo-900)] bg-[var(--lavender-100)]/50">
                          {row.guide}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-center text-sm font-extrabold text-[var(--indigo-900)] opacity-80">
                O guia não substitui o curso presencial. Ele ajuda a{' '}
                <Em>não partir do zero</Em> na hora do susto.
              </p>
            </div>
          </div>
        </section>

        {/* ==================================================================
            8.12 DEPOIMENTOS E AVALIAÇÕES (s11) - Baseado no estilo da referência
           ================================================================== */}
        <section
          id="s11"
          data-section-id="s11"
          className="py-14 sm:py-20 px-4 sm:px-6 bg-[#FFF9FA] border-t border-[#FECDD3] overflow-hidden"
        >
          <div className="max-w-6xl mx-auto">
            {/* Header de Confiança e Avaliação */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 text-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#FECDD3] shadow-xs">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <span className="text-xs font-extrabold text-[#1C1917]">
                  4.9 de 5 estrelas
                </span>
              </div>
              <span className="hidden sm:inline text-xs text-[#A8A29E]">•</span>
              <span className="text-xs sm:text-sm font-semibold text-[#57534E]">
                Mais de <strong className="text-[#1C1917] font-bold">1.200 famílias</strong> preparadas e tranquilas
              </span>
            </div>

            {/* Grid Principal: Coluna da Esquerda (Copy + Controles) e Coluna da Direita (Carrossel de Balões) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Coluna da Esquerda */}
              <div className="lg:col-span-4 space-y-4 sm:space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF0F2] border border-[#FECDD3] flex items-center justify-center text-[#FF2B44] shadow-xs">
                  <Quote className="w-6 h-6 fill-[#FF2B44]/20" />
                </div>

                <div className="space-y-2.5">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C1917] tracking-tight leading-tight">
                    O que outras mães estão dizendo
                  </h2>
                  <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed font-medium">
                    Relatos reais de mães que hoje têm no celular o passo a passo direto para agir com calma e segurança em qualquer imprevisto com seus pequenos.
                  </p>
                </div>

                {/* Controles de Navegação e Linha de Progresso Visual */}
                <div className="pt-2 flex items-center gap-3 sm:gap-4">
                  <button
                    onClick={() => scrollTestimonials('left')}
                    aria-label="Depoimento anterior"
                    className="w-10 h-10 rounded-full border border-[#FECDD3] bg-white text-[#1C1917] hover:bg-[#FFF0F2] hover:text-[#FF2B44] transition flex items-center justify-center shadow-xs active:scale-95 cursor-pointer shrink-0"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>

                  {/* Barra de Progresso Interativa */}
                  <div className="flex-1 max-w-[140px] sm:max-w-[180px] h-1.5 bg-[#FCE7EB] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#FF2B44] rounded-full transition-all duration-200"
                      style={{
                        width: `${Math.max(20, Math.min(100, testimonialProgress * 80 + 20))}%`,
                      }}
                    />
                  </div>

                  <button
                    onClick={() => scrollTestimonials('right')}
                    aria-label="Próximo depoimento"
                    className="w-10 h-10 rounded-full border border-[#FECDD3] bg-white text-[#1C1917] hover:bg-[#FFF0F2] hover:text-[#FF2B44] transition flex items-center justify-center shadow-xs active:scale-95 cursor-pointer shrink-0"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Dica de arrastar no mobile */}
                <p className="text-[11px] text-[#A8A29E] font-medium lg:hidden">
                  Deslize para o lado para ver mais depoimentos →
                </p>
              </div>

              {/* Coluna da Direita: Carrossel Horizontal de Balões */}
              <div className="lg:col-span-8 -mx-4 px-4 sm:mx-0 sm:px-0">
                <div
                  ref={testimonialScrollRef}
                  onScroll={handleTestimonialScroll}
                  className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {TESTIMONIALS.map((item) => (
                    <div
                      key={item.id}
                      className="w-[280px] sm:w-[320px] md:w-[340px] shrink-0 snap-start flex flex-col justify-between"
                    >
                      {/* Balão de Fala (Speech Bubble) */}
                      <div className="relative bg-white rounded-2xl p-5 sm:p-6 border-2 border-[#FECDD3] shadow-xs flex-1 flex flex-col justify-between">
                        <div>
                          {/* Estrelas + 5.0 */}
                          <div className="flex items-center gap-1.5 mb-3">
                            <div className="flex items-center gap-0.5">
                              {[...Array(item.rating)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="w-4 h-4 fill-amber-400 text-amber-400"
                                />
                              ))}
                            </div>
                            <span className="text-xs font-extrabold text-[#1C1917] ml-1">
                              5.0
                            </span>
                          </div>

                          {/* Texto do Depoimento */}
                          <p className="text-xs sm:text-sm text-[#1C1917] leading-relaxed font-normal">
                            “{item.text}”
                          </p>
                        </div>

                        {/* Ponta do Balão apontando para baixo */}
                        <div className="absolute -bottom-[9px] left-7 w-4 h-4 bg-white border-b-2 border-r-2 border-[#FECDD3] rotate-45 transform" />
                      </div>

                      {/* Perfil / Foto abaixo do balão */}
                      <div className="flex items-center gap-3 mt-5 pl-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.avatar}
                          alt={item.name}
                          className="w-11 h-11 rounded-full object-cover border-2 border-[#FECDD3] shadow-xs shrink-0"
                          loading="lazy"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <h4 className="font-bold text-xs sm:text-sm text-[#1C1917] truncate">
                              {item.name}
                            </h4>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-50 shrink-0" />
                          </div>
                          <p className="text-[11px] sm:text-xs text-[#78716C] truncate font-medium">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            8.14 OFERTA E GARANTIA DE 7 DIAS (s13)
           ================================================================== */}
        <section
          id="s13"
          data-section-id="s13"
          className="py-12 sm:py-18 px-4 sm:px-6"
        >
          <div className="max-w-3xl mx-auto">
            <div className="rounded-[24px] sm:rounded-[28px] overflow-hidden bg-[#FFF0F2] border-2 border-[#FECDD3] text-[#1C1917] p-5 sm:p-10 shadow-soft space-y-6">
              <div className="text-center space-y-2">
                <span className="inline-block px-3.5 py-1 rounded-full bg-[#FF2B44] text-white text-xs font-extrabold uppercase tracking-wider shadow-sm">
                  Acesso Imediato • PDF Interativo + Imprimível
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C1917] leading-tight">
                  {PRODUCT_CONFIG.title}: O guia prático + Checklists + Roteiro 192
                </h2>
              </div>

              {/* Imagem do Produto (Preenchimento total sem bordas laterais no mobile) */}
              <div className="-mx-5 sm:mx-0 flex justify-center pt-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/vitrine_guia_segundosquesalvam_ratio_1.webp"
                  alt="Vitrine do Guia Segundos que Salvam"
                  className="w-full sm:max-w-[340px] aspect-square object-cover sm:object-contain rounded-none sm:rounded-2xl shadow-xs border-y sm:border border-[#FECDD3] border-x-0 sm:border-x bg-white"
                />
              </div>

              {/* Resumo visual rápido em 2 colunas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 bg-white p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-[#FECDD3] text-xs sm:text-sm shadow-sm">
                {[
                  'Guia Ilustrado (35 situações, 44 páginas)',
                  'Ficha de Emergência da Criança',
                  'Roteiro do que falar ao 192 em ordem',
                  'Checklist Casa Segura + Kit de Socorros',
                  'Guia rápido de 1 página p/ avós e babás',
                  'Funciona 100% offline no celular',
                ].map((benefit) => (
                  <div key={benefit} className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#FF2B44] text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-sm">
                      ✓
                    </span>
                    <span className="font-semibold text-[#1C1917]">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Box Branco de Ação e Preço */}
              <div className="rounded-xl sm:rounded-2xl bg-white text-[#1C1917] border border-[#FECDD3] p-4 sm:p-7 text-center space-y-4 shadow-sm">
                <div className="space-y-1">
                  <div className="flex items-baseline justify-center gap-2.5">
                    <span className="text-sm sm:text-base text-[#78716C] line-through font-semibold">
                      De R$ 58,90
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#1C1917]">
                      por
                    </span>
                    <span className="text-3xl sm:text-4xl font-extrabold text-[#FF2B44] tracking-tight">
                      R$ 29,90
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#57534E] font-semibold">
                    Parcele em até 6x no cartão
                  </p>
                </div>

                <div className="flex justify-center pt-2">
                  <PillButton
                    variant="primary"
                    size="lg"
                    fullWidthMobile
                    onClick={() => handleCheckoutCTA('s13')}
                    className="sm:min-w-[320px]"
                  >
                    {AB_TESTS_CONFIG.ctaText}
                  </PillButton>
                </div>

                <p className="text-xs font-bold text-[#78716C]">
                  Acesso imediato · Pagamento seguro pela Cakto · Baixe e use
                  offline · Garantia de {OFFER_CONFIG.guaranteeDays} dias
                </p>
              </div>

              {/* Garantia de 7 dias (CDC art. 49) */}
              <div className="rounded-xl sm:rounded-2xl bg-white border border-[#FECDD3] p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-3.5 sm:gap-5 shadow-sm">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border-2 border-[#FECDD3] text-[#FF2B44] flex flex-col items-center justify-center shrink-0 font-extrabold shadow-sm">
                  <ShieldCheck className="w-8 h-8 sm:w-9 sm:h-9 stroke-[2.3] text-[#FF2B44]" />
                  <span className="text-[10px] sm:text-[11px] font-black uppercase text-[#FF2B44] tracking-wider mt-0.5">
                    {OFFER_CONFIG.guaranteeDays} DIAS
                  </span>
                </div>
                <div className="text-center sm:text-left space-y-1.5 flex-1">
                  <h3 className="text-base sm:text-lg lg:text-xl font-extrabold text-[#1C1917] leading-snug">
                    Risco Zero: <span className="text-[#FF2B44]">Garantia de {OFFER_CONFIG.guaranteeDays} dias</span> (CDC art. 49)
                  </h3>
                  <p className="text-sm sm:text-base text-[#1C1917] leading-relaxed font-medium">
                    Você tem {OFFER_CONFIG.guaranteeDays} dias para ler, folhear
                    e imprimir. Se achar que não é pra você, peça o reembolso e
                    devolvemos 100% do valor. Sem perguntas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            8.15 PERGUNTAS FREQUENTES ENXUTAS (s14)
           ================================================================== */}
        <section
          id="s14"
          data-section-id="s14"
          className="py-12 sm:py-16 px-4 sm:px-6 bg-white border-t border-[var(--indigo-700)]/10"
        >
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--indigo-900)] text-center">
              Dúvidas <Em>rápidas</Em>.
            </h2>

            <div className="space-y-2.5">
              {visibleFaqs.map((item) => {
                const isOpen = openFaq === item.qIndex;
                return (
                  <div
                    key={item.qIndex}
                    className="rounded-2xl bg-[var(--lavender-50)] border border-[var(--indigo-700)]/15 overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => handleFaqToggle(item.qIndex)}
                      aria-expanded={isOpen}
                      className="w-full min-h-[52px] px-4 py-3 text-left flex items-center justify-between gap-3 font-extrabold text-sm sm:text-base text-[var(--indigo-900)]"
                    >
                      <span>{item.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 shrink-0 text-[var(--indigo-700)] transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed border-t border-[var(--indigo-700)]/10">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {!showAllFaqs && (
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setShowAllFaqs(true)}
                  className="text-xs font-extrabold text-[var(--indigo-700)] underline py-2"
                >
                  Ver todas as {FAQ_ITEMS.length} perguntas frequentes
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ==================================================================
            8.16 CTA FINAL EMOCIONAL (s15)
           ================================================================== */}
        <section
          id="s15"
          data-section-id="s15"
          className="py-12 sm:py-16 px-4 sm:px-6 bg-[var(--lavender-100)] border-t border-[var(--indigo-700)]/10"
        >
          <div className="max-w-2xl mx-auto text-center space-y-5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--indigo-900)] leading-tight">
              Você pode nunca precisar. Mas, se precisar, vai estar{' '}
              <Em>pronta</Em>.
            </h2>
            <div className="flex justify-center">
              <PillButton
                variant="primary"
                size="lg"
                fullWidthMobile
                onClick={() => handleCheckoutCTA('s15')}
              >
                {AB_TESTS_CONFIG.ctaText}
              </PillButton>
            </div>
            <p className="text-xs font-bold text-[var(--ink-muted)] opacity-75">
              Garantia de {OFFER_CONFIG.guaranteeDays} dias · {MEDICAL_DISCLAIMER}
            </p>
          </div>
        </section>

        {/* Isca Grátis Opcional: Ficha de Emergência da Criança */}
        <LeadMagnetSection />
      </main>

      <Footer />

      {/* Barra Fixa Mobile com CTA (Fundo vermelho bem clarinho) */}
      {showStickyMobile && (
        <div className="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-[#FFF0F2]/95 backdrop-blur-md border-t border-[#FECDD3] px-3.5 py-2.5 shadow-lg animate-fade-up">
          <div className="flex items-center justify-between gap-2.5 max-w-md mx-auto">
            <div className="leading-tight min-w-0">
              <span className="block text-xs font-extrabold text-[#FF2B44] truncate">
                Segundos que Salvam
              </span>
              <span className="block text-[10px] sm:text-[11px] text-[#57534E] truncate">
                Acesso imediato · {OFFER_CONFIG.guaranteeDays} dias de garantia
              </span>
            </div>
            <PillButton
              variant="primary"
              size="md"
              className="shrink-0 text-xs sm:text-sm px-3.5 sm:px-4 py-1.5 min-h-[42px]"
              onClick={() => handleCheckoutCTA('sticky')}
            >
              Quero o guia
            </PillButton>
          </div>
        </div>
      )}
    </div>
  );
}
