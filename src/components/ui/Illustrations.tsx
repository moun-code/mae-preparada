'use client';

import React, { useState } from 'react';
import {
  PhoneCall,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Smartphone,
  FileCheck2,
  Users,
} from 'lucide-react';

/**
 * Sistema Completo de Ilustrações Vetoriais ("Segundos que Salvam")
 * Estilo: Manual de montagem em traço escuro (#1B124C / #2A1A73) sobre lavanda (#EEF0FF / #F8F7FF)
 * com destaques exclusivos em vermelho emergência (#D62839) e menta (#6EF0B9).
 * Zero fotos de crianças feridas; 100% vetorial, leve (CLS = 0) e didático.
 */

/* ============================================================================
   1. ILUSTRAÇÕES DAS 8 PERGUNTAS DO QUIZ (P1 a P8)
   ============================================================================ */
export function QuizQuestionIllustration({
  questionId,
}: {
  questionId: 'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'P6' | 'P7' | 'P8';
}) {
  const imageMap: Record<string, string> = {
    P1: '/images/quiz/p1-engasgo.webp',
    P2: '/images/quiz/p3-queimadura.webp',
    P3: '/images/quiz/p4-limpeza.webp',
    P4: '/images/quiz/p5-convulsao.webp',
    P5: '/images/quiz/p8-queda.webp',
    P6: '/images/quiz/p6-pilha.webp',
    P7: '/images/quiz/p7-afogamento.webp',
    P8: '/images/quiz/p8-queda.webp',
  };

  const labelsMap: Record<string, string> = {
    P1: 'Engasgo grave no bebê',
    P2: 'Primeiros socorros para queimadura',
    P3: 'Intoxicação por produto de limpeza',
    P4: 'Convulsão com febre',
    P5: 'Queda com batida na cabeça',
    P6: 'Ingestão de pilha-botão',
    P7: 'Afogamento silencioso na banheira',
    P8: 'Queda com batida na cabeça',
  };

  const src = imageMap[questionId];
  if (src) {
    return (
      <div className="w-full overflow-hidden rounded-2xl border-2 border-[var(--indigo-700)]/15 bg-white shadow-sm flex items-center justify-center p-1 sm:p-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={`Ilustração explicativa: ${labelsMap[questionId]}`}
          className="max-h-40 sm:max-h-56 w-auto object-contain rounded-xl select-none"
          loading="eager"
        />
      </div>
    );
  }

  return null;
}

/* ============================================================================
   2. ILUSTRAÇÕES DAS 3 CENAS DA SEÇÃO 8.3 (s2)
   ============================================================================ */
export function SceneIllustration({
  type,
}: {
  type: 'choking' | 'seizure' | 'drowning';
}) {
  if (type === 'choking') {
    return (
      <svg
        viewBox="0 0 280 165"
        className="w-full h-40 rounded-2xl bg-[var(--lavender-50)] border border-[var(--indigo-700)]/10 p-3"
        role="img"
        aria-label="Ilustração em estilo manual: apoio de antebraço inclinado e seta vermelha indicando 5 tapas entre as omoplatas"
      >
        <line x1="20" y1="145" x2="260" y2="145" stroke="#D8DBF8" strokeWidth="1.5" strokeDasharray="4 4" />
        <rect x="16" y="14" width="66" height="24" rx="12" fill="#2A1A73" />
        <text x="49" y="30" textAnchor="middle" fill="#6EF0B9" fontSize="11" fontWeight="800">
          PASSO 1
        </text>
        <path
          d="M45 125 C85 115, 130 100, 185 88"
          stroke="#1B124C"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M95 92 C120 75, 155 75, 178 90 C165 106, 125 108, 95 92 Z"
          fill="#EEF0FF"
          stroke="#1B124C"
          strokeWidth="3"
        />
        <circle cx="195" cy="96" r="16" fill="#EEF0FF" stroke="#1B124C" strokeWidth="3" />
        <path d="M85 68 L218 112" stroke="#5A5683" strokeWidth="1.5" strokeDasharray="4 4" />
        <circle cx="138" cy="78" r="14" fill="#D62839" fillOpacity="0.16" />
        <circle cx="138" cy="78" r="6" fill="#D62839" />
        <path d="M120 42 L135 66" stroke="#D62839" strokeWidth="3.5" strokeLinecap="round" />
        <polygon points="138,70 128,64 139,58" fill="#D62839" />
        <rect x="148" y="22" width="112" height="28" rx="8" fill="#D62839" />
        <text x="204" y="40" textAnchor="middle" fill="#FFFFFF" fontSize="10.5" fontWeight="800">
          5x ENTRE OMOPLATAS
        </text>
      </svg>
    );
  }

  if (type === 'seizure') {
    return (
      <svg
        viewBox="0 0 280 165"
        className="w-full h-40 rounded-2xl bg-[var(--lavender-50)] border border-[var(--indigo-700)]/10 p-3"
        role="img"
        aria-label="Ilustração em estilo manual: posição lateral segura, cronômetro marcando o horário e alerta vermelho de nada na boca"
      >
        <line x1="20" y1="145" x2="260" y2="145" stroke="#D8DBF8" strokeWidth="1.5" />
        <circle cx="62" cy="68" r="28" fill="#EEF0FF" stroke="#1B124C" strokeWidth="3" />
        <line x1="62" y1="68" x2="62" y2="50" stroke="#1B124C" strokeWidth="3" strokeLinecap="round" />
        <line x1="62" y1="68" x2="76" y2="68" stroke="#D62839" strokeWidth="3" strokeLinecap="round" />
        <text x="62" y="114" textAnchor="middle" fill="#1B124C" fontSize="10.5" fontWeight="800">
          ANOTAR A HORA
        </text>
        <path
          d="M135 88 C155 58, 195 58, 215 88"
          fill="none"
          stroke="#1B124C"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <polygon points="218,92 207,86 216,78" fill="#1B124C" />
        <rect x="130" y="96" width="95" height="26" rx="8" fill="#EEF0FF" stroke="#1B124C" strokeWidth="2.5" />
        <text x="177" y="113" textAnchor="middle" fill="#1B124C" fontSize="10.5" fontWeight="800">
          VIRAR DE LADO
        </text>
        <rect x="122" y="16" width="140" height="28" rx="8" fill="#D62839" />
        <text x="192" y="34" textAnchor="middle" fill="#FFFFFF" fontSize="10.5" fontWeight="800">
          ✕ NADA NA BOCA
        </text>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 280 165"
      className="w-full h-40 rounded-2xl bg-[var(--lavender-50)] border border-[var(--indigo-700)]/10 p-3"
      role="img"
      aria-label="Ilustração em estilo manual: banheira com poucos centímetros de água e alerta vermelho de supervisão contínua"
    >
      <path
        d="M45 85 L235 85 L220 135 C218 142, 210 145, 200 145 L80 145 C70 145, 62 142, 60 135 Z"
        fill="#EEF0FF"
        stroke="#1B124C"
        strokeWidth="3"
      />
      <path d="M58 115 Q95 109, 140 115 T222 115" fill="none" stroke="#2A1A73" strokeWidth="2.5" />
      <line x1="32" y1="115" x2="32" y2="145" stroke="#D62839" strokeWidth="3" />
      <line x1="26" y1="115" x2="38" y2="115" stroke="#D62839" strokeWidth="2.5" />
      <line x1="26" y1="145" x2="38" y2="145" stroke="#D62839" strokeWidth="2.5" />
      <text x="48" y="68" fill="#D62839" fontSize="11" fontWeight="800">
        POUCOS CM BASTAM • SILENCIOSO
      </text>
      <rect x="75" y="18" width="130" height="30" rx="15" fill="#D62839" />
      <text x="140" y="37" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="800">
        NUNCA SAIR (NEM 30s)
      </text>
    </svg>
  );
}

/* ============================================================================
   3. MINI-ILUSTRAÇÕES DOS 6 ERROS QUE PARECEM CERTOS (Seção 8.4 - s3)
   ============================================================================ */
export function ErrorMythIllustration({ id }: { id: number }) {
  switch (id) {
    case 1: // Água no engasgo vs 5 tapas + 5 compressões
      return (
        <svg viewBox="0 0 220 74" className="w-full h-16 rounded-xl bg-[var(--lavender-50)] px-2" aria-hidden="true">
          {/* Copo d'água riscado em vermelho */}
          <path d="M28 18 L48 18 L45 56 L31 56 Z" fill="#EEF0FF" stroke="#1B124C" strokeWidth="2" />
          <line x1="22" y1="58" x2="54" y2="16" stroke="#D62839" strokeWidth="3" strokeLinecap="round" />
          {/* Seta -> 5x + 5x */}
          <path d="M74 37 L104 37" stroke="#2A1A73" strokeWidth="2.5" strokeLinecap="round" />
          <polygon points="108,37 100,32 100,42" fill="#2A1A73" />
          <rect x="120" y="18" width="84" height="38" rx="10" fill="#2A1A73" />
          <text x="162" y="35" textAnchor="middle" fill="#6EF0B9" fontSize="10" fontWeight="800">
            5 TAPAS + 5 COMP.
          </text>
          <text x="162" y="49" textAnchor="middle" fill="#FFFFFF" fontSize="9.5" fontWeight="700">
            LIGAR 192
          </text>
        </svg>
      );

    case 2: // Pasta/manteiga na queimadura vs Água corrente fria
      return (
        <svg viewBox="0 0 220 74" className="w-full h-16 rounded-xl bg-[var(--lavender-50)] px-2" aria-hidden="true">
          {/* Tubo riscado */}
          <rect x="22" y="28" width="34" height="18" rx="4" fill="#EEF0FF" stroke="#1B124C" strokeWidth="2" />
          <line x1="20" y1="56" x2="58" y2="18" stroke="#D62839" strokeWidth="3" strokeLinecap="round" />
          <path d="M74 37 L104 37" stroke="#2A1A73" strokeWidth="2.5" strokeLinecap="round" />
          <polygon points="108,37 100,32 100,42" fill="#2A1A73" />
          {/* Torneira + gotas frias */}
          <path d="M135 18 L162 18 L162 30" stroke="#1B124C" strokeWidth="3" fill="none" strokeLinecap="round" />
          <line x1="156" y1="35" x2="156" y2="58" stroke="#2A1A73" strokeWidth="2" strokeDasharray="3 2" />
          <line x1="162" y1="35" x2="162" y2="58" stroke="#2A1A73" strokeWidth="2" strokeDasharray="3 2" />
          <line x1="168" y1="35" x2="168" y2="58" stroke="#2A1A73" strokeWidth="2" strokeDasharray="3 2" />
          <text x="188" y="46" fill="#2A1A73" fontSize="10" fontWeight="800">
            10-20m
          </text>
        </svg>
      );

    case 3: // Provocar vômito vs Ligar CIATox / 192 com embalagem
      return (
        <svg viewBox="0 0 220 74" className="w-full h-16 rounded-xl bg-[var(--lavender-50)] px-2" aria-hidden="true">
          <circle cx="38" cy="37" r="18" fill="#FFF5F5" stroke="#D62839" strokeWidth="2.5" />
          <line x1="26" y1="49" x2="50" y2="25" stroke="#D62839" strokeWidth="3" />
          <path d="M74 37 L104 37" stroke="#2A1A73" strokeWidth="2.5" strokeLinecap="round" />
          <polygon points="108,37 100,32 100,42" fill="#2A1A73" />
          <rect x="118" y="18" width="88" height="38" rx="10" fill="#2A1A73" />
          <text x="162" y="35" textAnchor="middle" fill="#6EF0B9" fontSize="9.5" fontWeight="800">
            0800 722 6001
          </text>
          <text x="162" y="49" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="700">
            COM RÓTULO
          </text>
        </svg>
      );

    case 4: // Pano na boca vs Deitar de lado + anotar hora
      return (
        <svg viewBox="0 0 220 74" className="w-full h-16 rounded-xl bg-[var(--lavender-50)] px-2" aria-hidden="true">
          <rect x="22" y="24" width="32" height="24" rx="4" fill="#EEF0FF" stroke="#1B124C" strokeWidth="2" />
          <line x1="20" y1="54" x2="56" y2="20" stroke="#D62839" strokeWidth="3" strokeLinecap="round" />
          <path d="M74 37 L104 37" stroke="#2A1A73" strokeWidth="2.5" strokeLinecap="round" />
          <polygon points="108,37 100,32 100,42" fill="#2A1A73" />
          <circle cx="142" cy="37" r="16" fill="#EEF0FF" stroke="#1B124C" strokeWidth="2.5" />
          <line x1="142" y1="37" x2="142" y2="26" stroke="#1B124C" strokeWidth="2" />
          <line x1="142" y1="37" x2="150" y2="37" stroke="#D62839" strokeWidth="2" />
          <text x="184" y="41" textAnchor="middle" fill="#2A1A73" fontSize="10" fontWeight="800">
            DE LADO
          </text>
        </svg>
      );

    case 5: // Esperar pilha-botão sair vs PS imediato
      return (
        <svg viewBox="0 0 220 74" className="w-full h-16 rounded-xl bg-[var(--lavender-50)] px-2" aria-hidden="true">
          <circle cx="38" cy="37" r="16" fill="#EEF0FF" stroke="#D62839" strokeWidth="2.5" />
          <text x="38" y="42" textAnchor="middle" fill="#1B124C" fontSize="12" fontWeight="800">
            +
          </text>
          <path d="M74 37 L104 37" stroke="#D62839" strokeWidth="2.5" strokeLinecap="round" />
          <polygon points="108,37 100,32 100,42" fill="#D62839" />
          <rect x="118" y="18" width="88" height="38" rx="10" fill="#D62839" />
          <text x="162" y="35" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="800">
            PS IMEDIATO
          </text>
          <text x="162" y="49" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="700">
            MESMO SEM SINTOMA
          </text>
        </svg>
      );

    default: // Bater nas costas de quem tosse forte vs Deixar tossir sentado
      return (
        <svg viewBox="0 0 220 74" className="w-full h-16 rounded-xl bg-[var(--lavender-50)] px-2" aria-hidden="true">
          <circle cx="38" cy="37" r="16" fill="#FFF5F5" stroke="#D62839" strokeWidth="2.5" />
          <line x1="26" y1="49" x2="50" y2="25" stroke="#D62839" strokeWidth="3" />
          <path d="M74 37 L104 37" stroke="#2A1A73" strokeWidth="2.5" strokeLinecap="round" />
          <polygon points="108,37 100,32 100,42" fill="#2A1A73" />
          <rect x="118" y="18" width="88" height="38" rx="10" fill="#6EF0B9" />
          <text x="162" y="35" textAnchor="middle" fill="#2A1A73" fontSize="10" fontWeight="800">
            DEIXAR TOSSIR
          </text>
          <text x="162" y="49" textAnchor="middle" fill="#2A1A73" fontSize="9" fontWeight="700">
            SENTADO + OBSERVAR
          </text>
        </svg>
      );
  }
}

/* ============================================================================
   4. ILUSTRAÇÕES DOS 3 PASSOS DA REGRA DE OURO (Seção 8.6 - s5)
   ============================================================================ */
export function GoldenRuleIllustration({ step }: { step: 1 | 2 | 3 }) {
  if (step === 1) {
    return (
      <svg viewBox="0 0 240 110" className="w-full h-28 rounded-2xl bg-white border border-[var(--indigo-700)]/10" aria-hidden="true">
        <circle cx="120" cy="55" r="36" fill="#EEF0FF" stroke="#2A1A73" strokeWidth="2.5" strokeDasharray="5 4" />
        <circle cx="120" cy="55" r="24" fill="#6EF0B9" fillOpacity="0.4" stroke="#2A1A73" strokeWidth="2.5" />
        <text x="120" y="60" textAnchor="middle" fill="#2A1A73" fontSize="14" fontWeight="800">
          5s
        </text>
      </svg>
    );
  }
  if (step === 2) {
    return (
      <svg viewBox="0 0 240 110" className="w-full h-28 rounded-2xl bg-white border border-[var(--indigo-700)]/10" aria-hidden="true">
        <rect x="85" y="16" width="70" height="78" rx="14" fill="#EEF0FF" stroke="#1B124C" strokeWidth="3" />
        <rect x="95" y="36" width="50" height="28" rx="6" fill="#D62839" />
        <text x="120" y="55" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="800">
          192
        </text>
        {/* Ondas de viva-voz */}
        <path d="M68 40 C60 48, 60 62, 68 70" stroke="#D62839" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M172 40 C180 48, 180 62, 172 70" stroke="#D62839" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 240 110" className="w-full h-28 rounded-2xl bg-white border border-[var(--indigo-700)]/10" aria-hidden="true">
      <rect x="52" y="20" width="136" height="70" rx="10" fill="#EEF0FF" stroke="#1B124C" strokeWidth="2.5" />
      <circle cx="74" cy="40" r="8" fill="#2A1A73" />
      <text x="74" y="44" textAnchor="middle" fill="#6EF0B9" fontSize="10" fontWeight="800">
        1
      </text>
      <line x1="90" y1="40" x2="168" y2="40" stroke="#1B124C" strokeWidth="3" strokeLinecap="round" />
      <circle cx="74" cy="64" r="8" fill="#D62839" />
      <text x="74" y="68" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="800">
        2
      </text>
      <line x1="90" y1="64" x2="154" y2="64" stroke="#1B124C" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/* ============================================================================
   5. ILUSTRAÇÕES DAS 5 CATEGORIAS DO GUIA (Seção 8.7 - s6)
   ============================================================================ */
export function CategoryIllustration({
  code,
}: {
  code: 'A' | 'B' | 'C' | 'D' | 'E';
}) {
  switch (code) {
    case 'A': // Asfixia e respiração
      return (
        <svg viewBox="0 0 120 64" className="w-28 h-14 rounded-xl bg-white p-1.5 border border-[var(--indigo-700)]/10" aria-hidden="true">
          <path d="M60 12 L60 34" stroke="#1B124C" strokeWidth="3" strokeLinecap="round" />
          <path d="M60 28 C44 28, 34 38, 36 52 C46 54, 56 48, 58 36" fill="#EEF0FF" stroke="#1B124C" strokeWidth="2.5" />
          <path d="M60 28 C76 28, 86 38, 84 52 C74 54, 64 48, 62 36" fill="#EEF0FF" stroke="#1B124C" strokeWidth="2.5" />
          <circle cx="60" cy="20" r="4" fill="#D62839" />
        </svg>
      );
    case 'B': // Traumas e lesões
      return (
        <svg viewBox="0 0 120 64" className="w-28 h-14 rounded-xl bg-white p-1.5 border border-[var(--indigo-700)]/10" aria-hidden="true">
          <rect x="30" y="20" width="60" height="24" rx="12" fill="#EEF0FF" stroke="#1B124C" strokeWidth="2.5" />
          <rect x="50" y="20" width="20" height="24" fill="#D62839" fillOpacity="0.2" stroke="#D62839" strokeWidth="2" />
          <circle cx="56" cy="28" r="1.5" fill="#D62839" />
          <circle cx="64" cy="28" r="1.5" fill="#D62839" />
          <circle cx="56" cy="36" r="1.5" fill="#D62839" />
          <circle cx="64" cy="36" r="1.5" fill="#D62839" />
        </svg>
      );
    case 'C': // Acidentes domésticos
      return (
        <svg viewBox="0 0 120 64" className="w-28 h-14 rounded-xl bg-white p-1.5 border border-[var(--indigo-700)]/10" aria-hidden="true">
          <path d="M36 32 L60 12 L84 32 L84 54 L36 54 Z" fill="#EEF0FF" stroke="#1B124C" strokeWidth="2.5" />
          <path d="M62 24 L54 36 L62 36 L58 48 L68 34 L60 34 Z" fill="#D62839" />
        </svg>
      );
    case 'D': // Clínicas e externas
      return (
        <svg viewBox="0 0 120 64" className="w-28 h-14 rounded-xl bg-white p-1.5 border border-[var(--indigo-700)]/10" aria-hidden="true">
          <rect x="54" y="10" width="12" height="34" rx="6" fill="#EEF0FF" stroke="#1B124C" strokeWidth="2.5" />
          <circle cx="60" cy="46" r="9" fill="#D62839" stroke="#1B124C" strokeWidth="2.5" />
          <line x1="60" y1="22" x2="60" y2="42" stroke="#D62839" strokeWidth="3" />
        </svg>
      );
    case 'E': // Prepare-se
      return (
        <svg viewBox="0 0 120 64" className="w-28 h-14 rounded-xl bg-white p-1.5 border border-[var(--indigo-700)]/10" aria-hidden="true">
          <rect x="34" y="20" width="52" height="34" rx="6" fill="#EEF0FF" stroke="#1B124C" strokeWidth="2.5" />
          <path d="M48 20 L48 14 L72 14 L72 20" stroke="#1B124C" strokeWidth="2.5" fill="none" />
          <path d="M60 28 L60 46 M51 37 L69 37" stroke="#D62839" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );
  }
}

/* ============================================================================
   6. MOCKUP PRINCIPAL DO GUIA (Hero s1 e Solução s4)
   ============================================================================ */
export function GuideHeroMockup() {
  return (
    <div className="relative w-full rounded-[28px] bg-gradient-to-br from-[var(--lavender-100)] via-white to-[var(--lavender-100)] p-5 sm:p-7 border-2 border-[var(--indigo-700)]/15 shadow-soft-lg">
      {/* Barra superior do leitor interativo */}
      <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-[var(--indigo-700)]/10">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[var(--emergency-600)]" />
          <span className="w-3 h-3 rounded-full bg-[var(--mint-400)]" />
          <span className="w-3 h-3 rounded-full bg-[var(--indigo-700)]" />
          <span className="ml-2 text-xs sm:text-sm font-extrabold text-[var(--indigo-900)] tracking-tight">
            Segundos que salvam
          </span>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-[var(--emergency-600)] text-white text-[11px] font-extrabold tracking-wide flex items-center gap-1 shrink-0">
          <PhoneCall className="w-3 h-3" /> 192 VIVA-VOZ
        </span>
      </div>

      {/* Imagem Real da Vitrine do Produto */}
      <div className="w-full overflow-hidden rounded-2xl border border-[var(--indigo-700)]/15 bg-white shadow-sm flex items-center justify-center p-1 sm:p-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/foto_vitrine_guia_segundosquesalvam.webp"
          alt="Vitrine do Guia Segundos que Salvam - Mãe Preparada"
          className="w-full h-auto object-contain rounded-xl select-none"
          loading="eager"
        />
      </div>
    </div>
  );
}

/* ============================================================================
   7. SEÇÃO 8.8 (s7) — FOLHEIE 3 PÁGINAS REAIS ILUSTRADAS DO GUIA
   ============================================================================ */
export function AnnotatedPageAnatomy() {
  const [selectedPageIdx, setSelectedPageIdx] = useState<0 | 1 | 2>(0);

  const samplePages = [
    {
      tabLabel: 'Pág. 08 · Engasgo no Bebê',
      category: 'CATEGORIA A • ASFIXIA E RESPIRAÇÃO',
      title: 'Engasgo Grave no Bebê (Menor de 1 ano)',
      step1Title: 'Apoie de bruços com a cabeça mais baixa',
      step1Desc:
        'Ligue 192 no viva-voz. Apoie o(a) bebê no antebraço segurando firme o queixo (sem tapar a boca).',
      step2Title: '5 tapas nas costas + 5 compressões no peito',
      step2Desc:
        'Dê 5 tapas entre as omoplatas. Vire de barriga para cima e faça 5 compressões com 2 dedos no centro do peito.',
      dontDo:
        'Nunca dê água ou leite, não vire o(a) bebê de cabeça para baixo pelos pés e não coloque o dedo às cegas na garganta.',
      call192:
        'Bebê sem emitir som, arroxeado, molinho ou se o objeto não sair nos primeiros ciclos.',
      illustrationType: 'choking' as const,
    },
    {
      tabLabel: 'Pág. 14 · Queimadura',
      category: 'CATEGORIA C • ACIDENTES DOMÉSTICOS',
      title: 'Queimadura Térmica (Líquido ou Objeto Quente)',
      step1Title: 'Água corrente fria por 10 a 20 minutos',
      step1Desc:
        'Coloque imediatamente a área sob água corrente fria (da torneira/chuveiro, sem jato forte) para parar o calor.',
      step2Title: 'Retire acessórios soltos e proteja sem apertar',
      step2Desc:
        'Retire anéis/roupas que não estejam grudados na pele e cubra com pano limpo e úmido.',
      dontDo:
        'Nunca passe pasta de dente, manteiga, borra de café ou óleo. Não coloque gelo direto e jamais estoure as bolhas.',
      call192:
        'Queimadura no rosto, mãos, pés, genitais, presença de bolhas grandes ou em qualquer bebê menor de 1 ano.',
      illustrationType: 'burn' as const,
    },
    {
      tabLabel: 'Pág. 27 · Convulsão Febril',
      category: 'CATEGORIA D • CLÍNICAS E EXTERNAS',
      title: 'Convulsão com Febre',
      step1Title: 'Deite de lado em local seguro e afaste objetos',
      step1Desc:
        'Coloque a criança virada de lado no chão/colchão macio para que a saliva escorra sem sufocar.',
      step2Title: 'Olhe no relógio e anote o horário exato de início',
      step2Desc:
        'Solte roupas apertadas no pescoço e aguarde a crise passar observando a respiração.',
      dontDo:
        'NUNCA coloque pano, colher ou o dedo na boca (a língua não enrola). Não segure o corpo à força nem dê banho frio.',
      call192:
        'Se a crise passar de 5 minutos, se for a primeira convulsão da vida dele(a) ou se demorar a despertar.',
      illustrationType: 'seizure' as const,
    },
  ];

  const page = samplePages[selectedPageIdx];

  return (
    <div className="space-y-6">
      {/* Seletor de páginas para folhear */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {samplePages.map((p, idx) => {
          const active = selectedPageIdx === idx;
          return (
            <button
              key={p.tabLabel}
              type="button"
              onClick={() => setSelectedPageIdx(idx as 0 | 1 | 2)}
              className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all min-h-[44px] ${
                active
                  ? 'bg-[#FFF0F2] border-2 border-[#FF2B44] text-[#FF2B44] shadow-sm scale-[1.02]'
                  : 'bg-white text-[#1C1917] border border-[#FECDD3] hover:bg-[#FFF0F2]'
              }`}
            >
              {p.tabLabel}
            </button>
          );
        })}
      </div>

      {/* Página do Guia Ilustrada em Tamanho Real */}
      <div className="max-w-4xl mx-auto rounded-[28px] bg-white border-2 border-[var(--indigo-700)]/20 shadow-soft-lg p-5 sm:p-8 space-y-6">
        {/* Topo clicável do PDF */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b-2 border-[var(--lavender-100)]">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[var(--lavender-100)] text-[var(--indigo-900)] text-xs font-extrabold">
            <BookOpen className="w-3.5 h-3.5" /> ☰ ÍNDICE CLICÁVEL (1 TOQUE)
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[var(--emergency-600)] text-white text-xs font-extrabold">
            <PhoneCall className="w-3.5 h-3.5" /> ATALHO TEL. 192
          </span>
        </div>

        {/* Cabeçalho da Situação */}
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-[var(--indigo-700)]">
            {page.category}
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--indigo-900)] mt-0.5">
            {page.title}
          </h3>
        </div>

        {/* Passos + Ilustração estilo manual */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          <div className="md:col-span-7 space-y-3">
            <div className="p-4 rounded-2xl bg-[var(--lavender-50)] border border-[var(--indigo-700)]/10 flex items-start gap-3">
              <span className="w-8 h-8 rounded-xl bg-[var(--indigo-900)] text-[var(--mint-400)] font-extrabold text-sm flex items-center justify-center shrink-0 mt-0.5">
                01
              </span>
              <div>
                <h4 className="text-sm sm:text-base font-extrabold text-[var(--indigo-900)]">
                  {page.step1Title}
                </h4>
                <p className="text-xs sm:text-sm text-[var(--ink-muted)] mt-0.5 leading-relaxed">
                  {page.step1Desc}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--lavender-50)] border border-[var(--indigo-700)]/10 flex items-start gap-3">
              <span className="w-8 h-8 rounded-xl bg-[var(--indigo-900)] text-[var(--mint-400)] font-extrabold text-sm flex items-center justify-center shrink-0 mt-0.5">
                02
              </span>
              <div>
                <h4 className="text-sm sm:text-base font-extrabold text-[var(--indigo-900)]">
                  {page.step2Title}
                </h4>
                <p className="text-xs sm:text-sm text-[var(--ink-muted)] mt-0.5 leading-relaxed">
                  {page.step2Desc}
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-5">
            {page.illustrationType === 'choking' && (
              <SceneIllustration type="choking" />
            )}
            {page.illustrationType === 'seizure' && (
              <SceneIllustration type="seizure" />
            )}
            {page.illustrationType === 'burn' && (
              <svg
                viewBox="0 0 280 165"
                className="w-full h-40 rounded-2xl bg-[var(--lavender-50)] border border-[var(--indigo-700)]/10 p-3"
                role="img"
                aria-label="Ilustração de queimadura sob água corrente fria por 10 a 20 minutos"
              >
                <path d="M100 18 L145 18 L145 40" stroke="#1B124C" strokeWidth="4.5" fill="none" strokeLinecap="round" />
                <line x1="136" y1="46" x2="136" y2="102" stroke="#2A1A73" strokeWidth="3" strokeDasharray="4 3" />
                <line x1="145" y1="46" x2="145" y2="102" stroke="#2A1A73" strokeWidth="3" strokeDasharray="4 3" />
                <line x1="154" y1="46" x2="154" y2="102" stroke="#2A1A73" strokeWidth="3" strokeDasharray="4 3" />
                <path d="M50 112 Q140 100, 230 112" stroke="#1B124C" strokeWidth="4.5" fill="none" strokeLinecap="round" />
                <circle cx="145" cy="106" r="14" fill="#D62839" fillOpacity="0.22" stroke="#D62839" strokeWidth="2.5" />
                <rect x="65" y="128" width="150" height="26" rx="8" fill="#D62839" />
                <text x="140" y="145" textAnchor="middle" fill="#FFFFFF" fontSize="10.5" fontWeight="800">
                  10 A 20 MIN • ÁGUA FRIA
                </text>
              </svg>
            )}
          </div>
        </div>

        {/* Caixas NÃO FAÇA + LIGUE 192 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-2xl bg-[#FFF5F5] border-2 border-[var(--emergency-600)]/35 p-4">
            <div className="text-xs font-extrabold text-[var(--emergency-600)] uppercase tracking-wide flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" /> NÃO FAÇA:
            </div>
            <p className="mt-1 text-xs sm:text-sm text-[var(--indigo-900)] font-semibold leading-snug">
              {page.dontDo}
            </p>
          </div>

          <div className="rounded-2xl bg-[var(--lavender-100)] border-2 border-[var(--indigo-700)]/20 p-4">
            <div className="text-xs font-extrabold text-[var(--indigo-900)] uppercase tracking-wide flex items-center gap-1.5">
              <PhoneCall className="w-4 h-4 text-[var(--emergency-600)]" /> LIGUE 192 / VÁ AO PS SE:
            </div>
            <p className="mt-1 text-xs sm:text-sm text-[var(--indigo-900)] font-semibold leading-snug">
              {page.call192}
            </p>
          </div>
        </div>

        {/* Rodapé de treino da página */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[var(--lavender-100)] text-xs font-bold text-[var(--indigo-900)]">
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[var(--mint-500)]" />
            [ ✓ ] Campo interativo: “Já li e mostrei para quem cuida dele”
          </span>
          <span className="text-[var(--ink-muted)]">
            Funciona 100% offline no celular ou impresso
          </span>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   8. CARTÕES ILUSTRADOS DOS ENTREGÁVEIS PRINCIPAIS (Seção 8.9 - s8)
   ============================================================================ */
export function DeliverableVisualCards() {
  const cards = [
    {
      badge: 'NO CELULAR (OFFLINE)',
      title: 'Guia Ilustrado “Segundos que Salvam”',
      desc: '35 situações em 44 páginas visuais com índice clicável em 2 toques, passo a passo e caixa “Não Faça”.',
      icon: Smartphone,
      svg: (
        <svg viewBox="0 0 200 95" className="w-full h-24 rounded-xl bg-[var(--lavender-50)]" aria-hidden="true">
          <rect x="65" y="10" width="70" height="75" rx="10" fill="#2A1A73" />
          <rect x="72" y="20" width="56" height="52" rx="4" fill="#FFFFFF" />
          <rect x="78" y="26" width="44" height="10" rx="3" fill="#6EF0B9" />
          <line x1="78" y1="44" x2="120" y2="44" stroke="#1B124C" strokeWidth="2.5" />
          <line x1="78" y1="52" x2="112" y2="52" stroke="#1B124C" strokeWidth="2.5" />
          <rect x="78" y="60" width="44" height="8" rx="2" fill="#D62839" />
        </svg>
      ),
    },
    {
      badge: 'CONSULTA RÁPIDA',
      title: 'Ficha de Emergência + Roteiro 192',
      desc: 'Campos digitáveis e imprimíveis com peso da criança, alergias, pediatra, endereço e o que falar ao SAMU.',
      icon: FileCheck2,
      svg: (
        <svg viewBox="0 0 200 95" className="w-full h-24 rounded-xl bg-[var(--lavender-50)]" aria-hidden="true">
          <rect x="52" y="12" width="96" height="72" rx="8" fill="#FFFFFF" stroke="#1B124C" strokeWidth="2.5" />
          <circle cx="100" cy="12" r="6" fill="#D62839" />
          <rect x="64" y="24" width="72" height="12" rx="3" fill="#EEF0FF" />
          <line x1="64" y1="46" x2="136" y2="46" stroke="#1B124C" strokeWidth="2" />
          <line x1="64" y1="58" x2="120" y2="58" stroke="#1B124C" strokeWidth="2" />
          <rect x="64" y="66" width="46" height="10" rx="3" fill="#D62839" />
        </svg>
      ),
    },
    {
      badge: 'PARA AVÓS E BABÁS',
      title: 'Guia Rápido da Rede de Apoio + Checklists',
      desc: 'Resumo de 1 página para quem fica com seu filho + Checklist Casa Segura por cômodo e Kit de Primeiros Socorros.',
      icon: Users,
      svg: (
        <svg viewBox="0 0 200 95" className="w-full h-24 rounded-xl bg-[var(--lavender-50)]" aria-hidden="true">
          <circle cx="72" cy="42" r="16" fill="#EEF0FF" stroke="#1B124C" strokeWidth="2.5" />
          <circle cx="128" cy="42" r="16" fill="#EEF0FF" stroke="#1B124C" strokeWidth="2.5" />
          <path d="M92 42 L108 42" stroke="#D62839" strokeWidth="3" strokeDasharray="3 2" />
          <rect x="56" y="64" width="88" height="18" rx="9" fill="#6EF0B9" />
          <text x="100" y="76" textAnchor="middle" fill="#2A1A73" fontSize="9.5" fontWeight="800">
            TODA A CASA PRONTA
          </text>
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((c) => (
        <div
          key={c.title}
          className="rounded-[24px] bg-white p-6 border-2 border-[var(--indigo-700)]/12 shadow-soft flex flex-col justify-between space-y-4"
        >
          <div className="space-y-3">
            {c.svg}
            <span className="inline-block px-2.5 py-1 rounded-md bg-[var(--lavender-100)] text-[var(--indigo-700)] text-[11px] font-extrabold uppercase tracking-wider">
              {c.badge}
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-[var(--indigo-900)] leading-snug">
              {c.title}
            </h3>
            <p className="text-sm text-[var(--ink-muted)] leading-relaxed">
              {c.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
