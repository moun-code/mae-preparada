/**
 * Script de Verificação Automatizada de QA e Build de Produção (Seção 1, Seção 6 e Seção 12)
 * 1) Verifica termos proibidos na copy (Seção 1 Regra 2 e Seção 9):
 *    "garante", "salva vidas", "nunca mais", "100% seguro", "mãe irresponsável", "últimas unidades", "últimas vagas"
 * 2) Verifica que nenhum `fbq(` existe fora de `src/tracking/track.ts` (Seção 6 Regra 1)
 * 3) Se `ALLOW_PLACEHOLDERS=false` (ou `--strict`), falha o build se restar qualquer `⟦ ⟧` no código.
 */

import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();
const SRC_DIR = path.join(ROOT_DIR, 'src');

const args = process.argv.slice(2);
const copyOnly = args.includes('--copy-only');
const forceStrict = args.includes('--strict');
const allowPlaceholders =
  !forceStrict &&
  process.env.ALLOW_PLACEHOLDERS !== 'false' &&
  process.env.NEXT_PUBLIC_ALLOW_PLACEHOLDERS !== 'false';

const PROHIBITED_TERMS = [
  /\bgarante\b/i,
  /\bsalva vidas\b/i,
  /\bnunca mais\b/i,
  /100%\s*seguro/i,
  /\bmãe irresponsável\b/i,
  /\búltimas unidades\b/i,
  /\búltimas vagas\b/i,
];

function walkFiles(dir, fileList = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkFiles(fullPath, fileList);
    } else if (/\.(ts|tsx|js|jsx)$/.test(entry.name)) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const files = walkFiles(SRC_DIR);
const copyViolations = [];
const fbqViolations = [];
const placeholderOccurrences = [];

for (const file of files) {
  const relPath = path.relative(ROOT_DIR, file).replace(/\\/g, '/');
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split(/\r?\n/);

  lines.forEach((line, idx) => {
    const lineNum = idx + 1;
    // Ignora linhas de comentário puro ao checar termos proibidos
    const trimmed = line.trim();
    const isComment =
      trimmed.startsWith('//') ||
      trimmed.startsWith('*') ||
      trimmed.startsWith('/*');

    if (!isComment) {
      for (const regex of PROHIBITED_TERMS) {
        if (regex.test(line)) {
          copyViolations.push({
            file: relPath,
            line: lineNum,
            match: regex.toString(),
            text: trimmed,
          });
        }
      }
    }

    // Regra 1 Seção 6: Nenhum fbq solto fora de src/tracking/track.ts
    if (relPath !== 'src/tracking/track.ts' && !isComment) {
      if (/\bfbqv?\s*\(/.test(line) || /window\.fbq/.test(line)) {
        fbqViolations.push({
          file: relPath,
          line: lineNum,
          text: trimmed,
        });
      }
    }

    // Regra 3 Seção 1: Marcadores ⟦ ⟧
    if (!isComment && (line.includes('⟦') || line.includes('⟧'))) {
      placeholderOccurrences.push({
        file: relPath,
        line: lineNum,
        text: trimmed,
      });
    }
  });
}

console.log('==============================================================');
console.log(' SEGUNDOS QUE SALVAM — Verificação Automatizada de QA e Build');
console.log('==============================================================');

if (copyViolations.length > 0) {
  console.error('\n[ERRO] Termos proibidos encontrados na copy (Seção 1 / Seção 9):');
  copyViolations.forEach((v) => {
    console.error(`  - ${v.file}:${v.line} (${v.match}) -> ${v.text}`);
  });
  process.exit(1);
} else {
  console.log('✔ [OK] Revisão de copy: 0 termos proibidos encontrados.');
}

if (fbqViolations.length > 0) {
  console.error('\n[ERRO] Chamadas `fbq` fora de `src/tracking/track.ts` encontradas:');
  fbqViolations.forEach((v) => {
    console.error(`  - ${v.file}:${v.line} -> ${v.text}`);
  });
  process.exit(1);
} else {
  console.log('✔ [OK] Isolamento de Pixel: Todas as chamadas centralizadas em `src/tracking/track.ts`.');
}

if (!copyOnly) {
  if (!allowPlaceholders && placeholderOccurrences.length > 0) {
    console.error(
      `\n[BLOQUEIO DE PRODUÇÃO] ALLOW_PLACEHOLDERS=false e ainda existem ${placeholderOccurrences.length} marcadores ⟦ ⟧ no código:`
    );
    placeholderOccurrences.forEach((p) => {
      console.error(`  - ${p.file}:${p.line} -> ${p.text}`);
    });
    console.error(
      '\nSubstitua todas as pendências em `src/config/siteConfig.ts` (consulte `docs/pendencias.md`) antes de publicar em produção, ou use `ALLOW_PLACEHOLDERS=true` em desenvolvimento.'
    );
    process.exit(1);
  } else if (placeholderOccurrences.length > 0) {
    console.log(
      `ℹ [MODO DEV] ALLOW_PLACEHOLDERS=true: ${placeholderOccurrences.length} marcadores ⟦ ⟧ ativos com componente <Pendente> (prontos para substituição).`
    );
  } else {
    console.log('✔ [OK] Nenhum marcador ⟦ ⟧ pendente.');
  }
}

console.log('==============================================================\n');

