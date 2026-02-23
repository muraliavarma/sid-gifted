import type { Question } from '../types';

/**
 * Paper Folding (CogAT Nonverbal Battery style)
 *
 * Format: A multi-panel SVG shows a square piece of paper with markings
 * (colored sections, dots, shapes) and fold indicators (dashed lines + arrows).
 * The child picks the option that shows what the paper looks like after folding.
 *
 * Kindergarten level: Simple folds, and fold-cut-unfold (what does the paper look like when unfolded after cutting?).
 */

// ---- Helper functions ----

/** Question SVG: paper with fold indicators on left, "?" box on right */
function qSvg(paperPanel: string): string {
  return `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">` +
    `<rect x="0" y="0" width="400" height="200" rx="16" fill="#FAFAFA"/>` +
    `<g transform="translate(20,20)">${paperPanel}</g>` +
    `<line x1="190" y1="100" x2="218" y2="100" stroke="#999" stroke-width="2.5"/>` +
    `<polygon points="216,93 226,100 216,107" fill="#999"/>` +
    `<rect x="248" y="28" width="138" height="138" rx="14" fill="#F0F0F0" stroke="#CCC" stroke-width="2.5" stroke-dasharray="8,5"/>` +
    `<text x="317" y="112" text-anchor="middle" font-size="54" fill="#BBB" font-weight="bold">?</text>` +
    `</svg>`;
}

/** Three-panel question: Start (with fold 1 indicators) + Fold 1 result (with fold 2 indicators) + "?" box */
function qSvg3(panel1: string, panel2: string): string {
  return `<svg viewBox="0 0 400 180" xmlns="http://www.w3.org/2000/svg">` +
    `<rect x="0" y="0" width="400" height="180" rx="16" fill="#FAFAFA"/>` +
    `<text x="60" y="16" text-anchor="middle" font-size="11" fill="#888">Start</text>` +
    `<g transform="translate(5,22) scale(0.7)">${panel1}</g>` +
    `<line x1="118" y1="80" x2="132" y2="80" stroke="#999" stroke-width="1.5"/>` +
    `<polygon points="130,75 138,80 130,85" fill="#999"/>` +
    `<text x="195" y="16" text-anchor="middle" font-size="11" fill="#888">Fold 1</text>` +
    `<g transform="translate(140,22) scale(0.7)">${panel2}</g>` +
    `<line x1="255" y1="80" x2="269" y2="80" stroke="#999" stroke-width="1.5"/>` +
    `<polygon points="267,75 275,80 267,85" fill="#999"/>` +
    `<text x="340" y="16" text-anchor="middle" font-size="11" fill="#888">Fold 2 = ?</text>` +
    `<rect x="290" y="32" width="100" height="100" rx="12" fill="#F0F0F0" stroke="#CCC" stroke-width="2" stroke-dasharray="8,5"/>` +
    `<text x="340" y="96" text-anchor="middle" font-size="42" fill="#BBB" font-weight="bold">?</text>` +
    `</svg>`;
}

/** Fold-Cut-Unfold: panel1 shows paper with fold indicators, panel2 shows folded paper with cut, "?" for unfolded result */
function qSvgCut(foldPanel: string, cutPanel: string): string {
  return `<svg viewBox="0 0 400 180" xmlns="http://www.w3.org/2000/svg">` +
    `<rect x="0" y="0" width="400" height="180" rx="16" fill="#FAFAFA"/>` +
    `<text x="60" y="16" text-anchor="middle" font-size="11" fill="#888">Fold</text>` +
    `<g transform="translate(5,22) scale(0.7)">${foldPanel}</g>` +
    `<line x1="118" y1="80" x2="132" y2="80" stroke="#999" stroke-width="1.5"/>` +
    `<polygon points="130,75 138,80 130,85" fill="#999"/>` +
    `<text x="195" y="16" text-anchor="middle" font-size="11" fill="#888">Cut ✂</text>` +
    `<g transform="translate(140,22) scale(0.7)">${cutPanel}</g>` +
    `<line x1="255" y1="80" x2="269" y2="80" stroke="#999" stroke-width="1.5"/>` +
    `<polygon points="267,75 275,80 267,85" fill="#999"/>` +
    `<text x="340" y="16" text-anchor="middle" font-size="11" fill="#888">Unfold = ?</text>` +
    `<rect x="290" y="32" width="100" height="100" rx="12" fill="#F0F0F0" stroke="#CCC" stroke-width="2" stroke-dasharray="8,5"/>` +
    `<text x="340" y="96" text-anchor="middle" font-size="42" fill="#BBB" font-weight="bold">?</text>` +
    `</svg>`;
}

/** Fold→Fold→Cut→Unfold: 4-panel layout for multi-fold-then-cut questions */
function qSvgCut3(fold1Panel: string, fold2Panel: string, cutPanel: string): string {
  return `<svg viewBox="0 0 400 170" xmlns="http://www.w3.org/2000/svg">` +
    `<rect x="0" y="0" width="400" height="170" rx="16" fill="#FAFAFA"/>` +
    `<text x="46" y="15" text-anchor="middle" font-size="10" fill="#888">Fold 1</text>` +
    `<g transform="translate(4,20) scale(0.5)">${fold1Panel}</g>` +
    `<line x1="86" y1="75" x2="96" y2="75" stroke="#999" stroke-width="1.5"/>` +
    `<polygon points="94,71 101,75 94,79" fill="#999"/>` +
    `<text x="146" y="15" text-anchor="middle" font-size="10" fill="#888">Fold 2</text>` +
    `<g transform="translate(104,20) scale(0.5)">${fold2Panel}</g>` +
    `<line x1="186" y1="75" x2="196" y2="75" stroke="#999" stroke-width="1.5"/>` +
    `<polygon points="194,71 201,75 194,79" fill="#999"/>` +
    `<text x="246" y="15" text-anchor="middle" font-size="10" fill="#888">Cut ✂</text>` +
    `<g transform="translate(204,20) scale(0.5)">${cutPanel}</g>` +
    `<line x1="286" y1="75" x2="296" y2="75" stroke="#999" stroke-width="1.5"/>` +
    `<polygon points="294,71 301,75 294,79" fill="#999"/>` +
    `<text x="350" y="15" text-anchor="middle" font-size="10" fill="#888">Unfold = ?</text>` +
    `<rect x="310" y="28" width="80" height="80" rx="10" fill="#F0F0F0" stroke="#CCC" stroke-width="2" stroke-dasharray="8,5"/>` +
    `<text x="350" y="80" text-anchor="middle" font-size="36" fill="#BBB" font-weight="bold">?</text>` +
    `</svg>`;
}

function opt(inner: string): string {
  return `<svg viewBox="0 0 90 70" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
}

function paper(x: number, y: number, s: number): string {
  return `<rect x="${x}" y="${y}" width="${s}" height="${s}" fill="#FFF" stroke="#999" stroke-width="2"/>`;
}

function foldLine(x1: number, y1: number, x2: number, y2: number): string {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#E53935" stroke-width="2" stroke-dasharray="6,4"/>`;
}

/** Curved fold arrow with inline arrowhead (no marker/defs) */
function foldArrow(fx: number, fy: number, tx: number, ty: number): string {
  const mx = (fx + tx) / 2;
  const my = (fy + ty) / 2;
  const dx = tx - fx;
  const dy = ty - fy;
  const cx = mx - dy * 0.4;
  const cy = my + dx * 0.4;
  const dirX = tx - cx;
  const dirY = ty - cy;
  const len = Math.sqrt(dirX * dirX + dirY * dirY);
  const nx = dirX / len;
  const ny = dirY / len;
  const s = 8;
  const ax = Math.round(tx - nx * s - ny * s * 0.5);
  const ay = Math.round(ty - ny * s + nx * s * 0.5);
  const bx = Math.round(tx - nx * s + ny * s * 0.5);
  const by = Math.round(ty - ny * s - nx * s * 0.5);
  return `<path d="M${fx},${fy} Q${cx.toFixed(0)},${cy.toFixed(0)} ${tx},${ty}" fill="none" stroke="#E53935" stroke-width="2"/>` +
    `<polygon points="${tx},${ty} ${ax},${ay} ${bx},${by}" fill="#E53935"/>`;
}

// ---- Questions ----

export const paperFolding: Question[] = [
  // =====================================================================
  //  EASY (pf-e-001 to pf-e-006)
  // =====================================================================

  // pf-e-001: Fold-cut-unfold. Vertical fold (right onto left). Triangular notch at fold edge.
  // Result: diamond/rhombus hole at center of paper.
  {
    id: 'pf-e-001',
    category: 'paper-folding',
    difficulty: 'easy',
    prompt: 'The paper is folded, then a triangle is cut at the fold. What does the paper look like when you open it back up?',
    visual: qSvgCut(
      // Fold panel: square with vertical fold line, right folds onto left
      paper(10, 10, 140) +
      foldLine(80, 10, 80, 150) +
      foldArrow(130, 30, 40, 30),
      // Cut panel: left half with triangular V-notch from fold edge at center
      `<path d="M10,10 L80,10 L80,55 L60,80 L80,105 L80,150 L10,150 Z" fill="#FFF" stroke="#999" stroke-width="2"/>` +
      `<rect x="80" y="10" width="70" height="140" fill="none" stroke="#CCC" stroke-width="1" stroke-dasharray="5,3"/>` +
      `<path d="M80,55 L60,80 L80,105" fill="none" stroke="#E53935" stroke-width="2.5" stroke-dasharray="5,3"/>` +
      `<text x="38" y="86" font-size="20">✂</text>`
    ),
    options: [
      { id: 'a', label: 'Diamond hole at center', visual: opt(`<rect x="5" y="5" width="80" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><polygon points="45,18 55,35 45,52 35,35" fill="#E8E8E8" stroke="#999" stroke-width="1.5"/>`) },
      { id: 'b', label: 'Triangle hole on one side', visual: opt(`<rect x="5" y="5" width="80" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><polygon points="65,22 55,35 65,48" fill="#E8E8E8" stroke="#999" stroke-width="1.5"/>`) },
      { id: 'c', label: 'Square hole at center', visual: opt(`<rect x="5" y="5" width="80" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><rect x="36" y="26" width="18" height="18" fill="#E8E8E8" stroke="#999" stroke-width="1.5"/>`) },
      { id: 'd', label: 'No hole', visual: opt(`<rect x="5" y="5" width="80" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/>`) },
    ],
    correctAnswerId: 'a',
    explanation: 'Cutting a triangle at the fold cuts through both layers. When you unfold, the two triangles join to make a diamond shape in the center!',
    hint: 'The fold is in the middle. The triangle cut is at the fold — what shape do two triangles make when they meet?',
  },

  // pf-e-002: Fold-cut-unfold. Vertical fold (right onto left). Semicircle cut at fold edge.
  // Result: full circle hole at center of paper.
  {
    id: 'pf-e-002',
    category: 'paper-folding',
    difficulty: 'easy',
    prompt: 'The paper is folded, then a shape is cut at the fold. What does the paper look like when you open it back up?',
    visual: qSvgCut(
      // Fold panel: square with vertical fold line, right folds onto left
      paper(10, 10, 140) +
      foldLine(80, 10, 80, 150) +
      foldArrow(130, 120, 40, 120),
      // Cut panel: folded rectangle with semicircle cut from fold edge
      `<path d="M10,10 L80,10 L80,55 A25,25 0 0,0 80,105 L80,150 L10,150 Z" fill="#FFF" stroke="#999" stroke-width="2"/>` +
      `<rect x="80" y="10" width="70" height="140" fill="none" stroke="#CCC" stroke-width="1" stroke-dasharray="5,3"/>` +
      `<path d="M80,55 A25,25 0 0,0 80,105" fill="none" stroke="#E53935" stroke-width="2.5" stroke-dasharray="5,3"/>` +
      `<text x="42" y="86" font-size="20">✂</text>`
    ),
    options: [
      { id: 'a', label: 'Circle hole at center', visual: opt(`<rect x="5" y="5" width="80" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><circle cx="45" cy="35" r="10" fill="#E8E8E8" stroke="#999" stroke-width="1.5"/>`) },
      { id: 'b', label: 'Semicircle on one edge', visual: opt(`<path d="M5,5 L85,5 L85,65 L5,65 L5,45 A10,10 0 0,1 5,25 Z" fill="#FFF" stroke="#999" stroke-width="2"/>`) },
      { id: 'c', label: 'Two semicircles on edges', visual: opt(`<path d="M5,5 L85,5 L85,25 A10,10 0 0,0 85,45 L85,65 L5,65 L5,45 A10,10 0 0,0 5,25 Z" fill="#FFF" stroke="#999" stroke-width="2"/>`) },
      { id: 'd', label: 'No hole', visual: opt(`<rect x="5" y="5" width="80" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/>`) },
    ],
    correctAnswerId: 'a',
    explanation: 'Cutting a semicircle at the fold cuts through both layers. When you unfold, the two semicircles join to make a full circle in the center!',
    hint: 'The fold is in the middle. When you cut at the fold, what happens on both sides?',
  },

  // pf-e-003: Fold-cut-unfold. Horizontal fold (bottom onto top). Square notch at fold edge.
  // Result: tall rectangle hole at center of paper.
  {
    id: 'pf-e-003',
    category: 'paper-folding',
    difficulty: 'easy',
    prompt: 'The paper is folded, then a square is cut at the fold. What does the paper look like when you open it back up?',
    visual: qSvgCut(
      // Fold panel: square with horizontal fold line, bottom folds onto top
      paper(10, 10, 140) +
      foldLine(10, 80, 150, 80) +
      foldArrow(30, 130, 30, 40),
      // Cut panel: top half with square notch from fold edge at center
      `<path d="M10,10 L150,10 L150,80 L92,80 L92,65 L68,65 L68,80 L10,80 Z" fill="#FFF" stroke="#999" stroke-width="2"/>` +
      `<rect x="10" y="80" width="140" height="70" fill="none" stroke="#CCC" stroke-width="1" stroke-dasharray="5,3"/>` +
      `<path d="M68,80 L68,65 L92,65 L92,80" fill="none" stroke="#E53935" stroke-width="2.5" stroke-dasharray="5,3"/>` +
      `<text x="72" y="60" font-size="20">✂</text>`
    ),
    options: [
      { id: 'a', label: 'Tall rectangle hole at center', visual: opt(`<rect x="5" y="5" width="80" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><rect x="36" y="18" width="18" height="28" fill="#E8E8E8" stroke="#999" stroke-width="1.5"/>`) },
      { id: 'b', label: 'Square hole in top half', visual: opt(`<rect x="5" y="5" width="80" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><rect x="36" y="12" width="18" height="14" fill="#E8E8E8" stroke="#999" stroke-width="1.5"/>`) },
      { id: 'c', label: 'Two separate squares', visual: opt(`<rect x="5" y="5" width="80" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><rect x="36" y="12" width="18" height="10" fill="#E8E8E8" stroke="#999" stroke-width="1.5"/><rect x="36" y="44" width="18" height="10" fill="#E8E8E8" stroke="#999" stroke-width="1.5"/>`) },
      { id: 'd', label: 'No hole', visual: opt(`<rect x="5" y="5" width="80" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/>`) },
    ],
    correctAnswerId: 'a',
    explanation: 'Cutting a square at the fold cuts through both layers. When you unfold, the two squares join to make a tall rectangle hole in the center!',
    hint: 'The fold is in the middle. A square cut at the fold goes through both layers — what shape do two squares make stacked together?',
  },

  // pf-e-004: Fold-cut-unfold. Horizontal fold (top onto bottom). Circle cut through both layers.
  // Result: two circle holes, one in top half and one in bottom half.
  {
    id: 'pf-e-004',
    category: 'paper-folding',
    difficulty: 'easy',
    prompt: 'The paper is folded in half, then a circle is cut through both layers. What does the paper look like when you open it?',
    visual: qSvgCut(
      // Fold panel: square with horizontal fold line, top folds onto bottom
      paper(10, 10, 140) +
      foldLine(10, 80, 150, 80) +
      foldArrow(80, 30, 80, 120),
      // Cut panel: folded rectangle (bottom half) with circle cut
      `<rect x="10" y="80" width="140" height="70" fill="#FFF" stroke="#999" stroke-width="2"/>` +
      `<rect x="10" y="10" width="140" height="70" fill="none" stroke="#CCC" stroke-width="1" stroke-dasharray="5,3"/>` +
      `<circle cx="80" cy="120" r="15" fill="#FAFAFA" stroke="#E53935" stroke-width="2.5" stroke-dasharray="5,3"/>` +
      `<text x="98" y="114" font-size="18">✂</text>`
    ),
    options: [
      { id: 'a', label: 'Two circle holes', visual: opt(`<rect x="5" y="5" width="80" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><circle cx="45" cy="20" r="7" fill="#E8E8E8" stroke="#999" stroke-width="1.5"/><circle cx="45" cy="50" r="7" fill="#E8E8E8" stroke="#999" stroke-width="1.5"/>`) },
      { id: 'b', label: 'One circle at center', visual: opt(`<rect x="5" y="5" width="80" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><circle cx="45" cy="35" r="9" fill="#E8E8E8" stroke="#999" stroke-width="1.5"/>`) },
      { id: 'c', label: 'One circle at bottom', visual: opt(`<rect x="5" y="5" width="80" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><circle cx="45" cy="50" r="7" fill="#E8E8E8" stroke="#999" stroke-width="1.5"/>`) },
      { id: 'd', label: 'No hole', visual: opt(`<rect x="5" y="5" width="80" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/>`) },
    ],
    correctAnswerId: 'a',
    explanation: 'The paper was folded double, so the cut goes through both layers. When you unfold, there are two circle holes — one in the top half and one in the bottom half!',
    hint: 'How many layers of paper did the scissors cut through? Each layer gets a hole.',
  },

  // pf-e-005: Square with entire top-right half orange. Diagonal fold TL→BR.
  // Result: triangle (bottom-left shape) all orange on front (folded orange half covers everything).
  {
    id: 'pf-e-005',
    category: 'paper-folding',
    difficulty: 'easy',
    prompt: 'The top-right half is orange. The paper folds along the diagonal. What do you see?',
    visual: qSvg(
      paper(10, 10, 140) +
      `<polygon points="10,10 150,10 150,150" fill="#FF7043" stroke="none"/>` +
      `<rect x="10" y="10" width="140" height="140" fill="none" stroke="#999" stroke-width="2"/>` +
      foldLine(10, 10, 150, 150) +
      foldArrow(120, 40, 40, 120)
    ),
    options: [
      { id: 'a', label: 'Triangle all orange', visual: opt(`<polygon points="8,8 8,62 76,62" fill="#FF7043" stroke="#999" stroke-width="2"/>`) },
      { id: 'b', label: 'Triangle with orange corner', visual: opt(`<polygon points="8,8 8,62 76,62" fill="#FFF" stroke="#999" stroke-width="2"/><polygon points="8,62 8,42 28,62" fill="#FF7043" stroke="none"/><polygon points="8,8 8,62 76,62" fill="none" stroke="#999" stroke-width="2"/>`) },
      { id: 'c', label: 'Plain white triangle', visual: opt(`<polygon points="8,8 8,62 76,62" fill="#FFF" stroke="#999" stroke-width="2"/>`) },
      { id: 'd', label: 'Rectangle', visual: opt(`<rect x="10" y="15" width="70" height="40" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/>`) },
    ],
    correctAnswerId: 'a',
    explanation: 'Folding diagonally makes a triangle. The entire orange half folds on top of the white half. Since colored paper looks the same from both sides, you see an all-orange triangle.',
    hint: 'The orange half folds on top of the white half. Colored paper looks the same from both sides.',
  },

  // pf-e-006: Fold-cut-unfold. Vertical fold (right onto left). Corner triangle snip at fold edge.
  // Result: V-notch at bottom center of paper.
  {
    id: 'pf-e-006',
    category: 'paper-folding',
    difficulty: 'easy',
    prompt: 'The paper is folded, then a corner is snipped off at the fold. What does the paper look like when you open it back up?',
    visual: qSvgCut(
      // Fold panel: square with vertical fold line, right folds onto left
      paper(10, 10, 140) +
      foldLine(80, 10, 80, 150) +
      foldArrow(130, 120, 40, 120),
      // Cut panel: left half with triangle snipped from bottom-right corner (fold edge)
      `<path d="M10,10 L80,10 L80,120 L50,150 L10,150 Z" fill="#FFF" stroke="#999" stroke-width="2"/>` +
      `<rect x="80" y="10" width="70" height="140" fill="none" stroke="#CCC" stroke-width="1" stroke-dasharray="5,3"/>` +
      `<line x1="80" y1="120" x2="50" y2="150" stroke="#E53935" stroke-width="2.5" stroke-dasharray="5,3"/>` +
      `<text x="55" y="130" font-size="20">✂</text>`
    ),
    options: [
      { id: 'a', label: 'V-notch at bottom center', visual: opt(`<path d="M5,5 L85,5 L85,65 L58,65 L45,45 L32,65 L5,65 Z" fill="#FFF" stroke="#999" stroke-width="2"/>`) },
      { id: 'b', label: 'Triangle at one corner only', visual: opt(`<path d="M5,5 L85,5 L85,65 L5,65 L5,45 Z" fill="#FFF" stroke="#999" stroke-width="2"/>`) },
      { id: 'c', label: 'Large notch at bottom', visual: opt(`<path d="M5,5 L85,5 L85,65 L65,65 L45,25 L25,65 L5,65 Z" fill="#FFF" stroke="#999" stroke-width="2"/>`) },
      { id: 'd', label: 'Paper unchanged', visual: opt(`<rect x="5" y="5" width="80" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/>`) },
    ],
    correctAnswerId: 'a',
    explanation: 'Snipping the corner at the fold cuts through both layers. When you unfold, you get two triangle notches meeting at the center, making a V-shape at the bottom!',
    hint: 'The corner you snipped is at the fold. Both layers are cut, so both sides get a triangle notch.',
  },

  // =====================================================================
  //  MEDIUM (pf-m-001 to pf-m-008)
  // =====================================================================

  // pf-m-001: Left half blue, right half red. Vertical fold (left onto right).
  // Result: tall rectangle, blue on front (back of folded left half, colored-through).
  {
    id: 'pf-m-001',
    category: 'paper-folding',
    difficulty: 'medium',
    prompt: 'The left half is blue and the right half is red. The left side folds onto the right. What do you see from the front?',
    visual: qSvg(
      paper(10, 10, 140) +
      `<rect x="10" y="10" width="70" height="140" fill="#42A5F5"/>` +
      `<rect x="80" y="10" width="70" height="140" fill="#EF5350"/>` +
      `<rect x="10" y="10" width="140" height="140" fill="none" stroke="#999" stroke-width="2"/>` +
      foldLine(80, 10, 80, 150) +
      foldArrow(30, 80, 120, 80)
    ),
    options: [
      { id: 'a', label: 'Blue rectangle', visual: opt(`<rect x="22" y="5" width="40" height="60" fill="#42A5F5" stroke="#999" stroke-width="2" rx="2"/>`) },
      { id: 'b', label: 'Red rectangle', visual: opt(`<rect x="22" y="5" width="40" height="60" fill="#EF5350" stroke="#999" stroke-width="2" rx="2"/>`) },
      { id: 'c', label: 'Half blue, half red', visual: opt(`<rect x="22" y="5" width="40" height="60" fill="#EF5350" stroke="#999" stroke-width="2" rx="2"/><rect x="22" y="5" width="20" height="60" fill="#42A5F5" stroke="none"/>`) },
      { id: 'd', label: 'White rectangle', visual: opt(`<rect x="22" y="5" width="40" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/>`) },
    ],
    correctAnswerId: 'a',
    explanation: 'The blue left half folds onto the red right half. Since colored paper is the same on both sides, you see blue on top covering the red underneath. The result is a tall blue rectangle.',
    hint: 'Which color is on the side that folds on top? Colored paper looks the same from both sides.',
  },

  // pf-m-002: Square with wide green stripe across top (~35%). Diagonal fold TL→BR.
  // Result: triangle with visible green corner area from the folded stripe.
  {
    id: 'pf-m-002',
    category: 'paper-folding',
    difficulty: 'medium',
    prompt: 'The paper has a wide green stripe at the top. It folds along the diagonal. What does it look like?',
    visual: qSvg(
      paper(10, 10, 140) +
      `<rect x="10" y="10" width="140" height="50" fill="#66BB6A" stroke="none"/>` +
      `<rect x="10" y="10" width="140" height="140" fill="none" stroke="#999" stroke-width="2"/>` +
      foldLine(10, 10, 150, 150) +
      foldArrow(40, 30, 30, 40)
    ),
    options: [
      { id: 'a', label: 'Triangle with green corner', visual: opt(`<polygon points="75,8 75,62 15,62" fill="#FFF" stroke="#999" stroke-width="2"/><polygon points="75,8 75,36 47,8" fill="#66BB6A" stroke="none"/><polygon points="75,8 75,62 15,62" fill="none" stroke="#999" stroke-width="2"/>`) },
      { id: 'b', label: 'Triangle all green', visual: opt(`<polygon points="75,8 75,62 15,62" fill="#66BB6A" stroke="#999" stroke-width="2"/>`) },
      { id: 'c', label: 'Plain triangle', visual: opt(`<polygon points="75,8 75,62 15,62" fill="#FFF" stroke="#999" stroke-width="2"/>`) },
      { id: 'd', label: 'Rectangle with green stripe', visual: opt(`<rect x="10" y="15" width="70" height="40" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><rect x="10" y="15" width="70" height="14" fill="#66BB6A" stroke="none"/>`) },
    ],
    correctAnswerId: 'a',
    explanation: 'Folding along the diagonal creates a triangle. The wide green stripe from the top folds over and shows as a large green corner area on the result.',
    hint: 'The paper becomes a triangle. The green stripe was at the top — where does it end up after folding?',
  },

  // pf-m-003: Left half yellow, red star on right half. Vertical fold (left onto right).
  // Result: tall yellow rectangle (folded yellow covers the star).
  {
    id: 'pf-m-003',
    category: 'paper-folding',
    difficulty: 'medium',
    prompt: 'The left half is yellow and there is a red star on the right half. The left side folds onto the right. What do you see?',
    visual: qSvg(
      paper(10, 10, 140) +
      `<rect x="10" y="10" width="70" height="140" fill="#FDD835"/>` +
      `<rect x="80" y="10" width="70" height="140" fill="#FFF"/>` +
      `<polygon points="115,55 120,70 136,70 124,80 128,95 115,85 102,95 106,80 94,70 110,70" fill="#EF5350" stroke="#C62828" stroke-width="1"/>` +
      `<rect x="10" y="10" width="140" height="140" fill="none" stroke="#999" stroke-width="2"/>` +
      foldLine(80, 10, 80, 150) +
      foldArrow(30, 80, 120, 80)
    ),
    options: [
      { id: 'a', label: 'Yellow rectangle', visual: opt(`<rect x="22" y="5" width="40" height="60" fill="#FDD835" stroke="#999" stroke-width="2" rx="2"/>`) },
      { id: 'b', label: 'Rectangle with red star', visual: opt(`<rect x="22" y="5" width="40" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><polygon points="42,18 45,28 55,28 47,34 50,44 42,38 34,44 37,34 29,28 39,28" fill="#EF5350" stroke="#C62828" stroke-width="0.5"/>`) },
      { id: 'c', label: 'Yellow with star showing', visual: opt(`<rect x="22" y="5" width="40" height="60" fill="#FDD835" stroke="#999" stroke-width="2" rx="2"/><polygon points="42,18 45,28 55,28 47,34 50,44 42,38 34,44 37,34 29,28 39,28" fill="#EF5350" stroke="#C62828" stroke-width="0.5"/>`) },
      { id: 'd', label: 'Plain white rectangle', visual: opt(`<rect x="22" y="5" width="40" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/>`) },
    ],
    correctAnswerId: 'a',
    explanation: 'The yellow left half folds on top of the right half, covering the red star. Since colored paper looks the same on both sides, the front shows all yellow.',
    hint: 'The yellow half folds on top and covers everything underneath. What color do you see?',
  },

  // pf-m-004: Square divided into 4 colored quadrants (red TL, blue TR, green BL, yellow BR).
  // Horizontal fold (top down onto bottom). With colored-through: top goes on top, you see
  // back of top half = red and blue.
  {
    id: 'pf-m-004',
    category: 'paper-folding',
    difficulty: 'medium',
    prompt: 'This paper has four colored squares. The top folds down onto the bottom. What colors do you see on front?',
    visual: qSvg(
      paper(10, 10, 140) +
      `<rect x="10" y="10" width="70" height="70" fill="#EF5350"/>` +
      `<rect x="80" y="10" width="70" height="70" fill="#42A5F5"/>` +
      `<rect x="10" y="80" width="70" height="70" fill="#66BB6A"/>` +
      `<rect x="80" y="80" width="70" height="70" fill="#FFCA28"/>` +
      `<rect x="10" y="10" width="140" height="140" fill="none" stroke="#999" stroke-width="2"/>` +
      foldLine(10, 80, 150, 80) +
      foldArrow(80, 30, 80, 120)
    ),
    options: [
      { id: 'a', label: 'Red and blue', visual: opt(`<rect x="8" y="18" width="36" height="36" fill="#EF5350" stroke="#999" stroke-width="1.5"/><rect x="44" y="18" width="36" height="36" fill="#42A5F5" stroke="#999" stroke-width="1.5"/>`) },
      { id: 'b', label: 'Green and yellow', visual: opt(`<rect x="8" y="18" width="36" height="36" fill="#66BB6A" stroke="#999" stroke-width="1.5"/><rect x="44" y="18" width="36" height="36" fill="#FFCA28" stroke="#999" stroke-width="1.5"/>`) },
      { id: 'c', label: 'Red and yellow', visual: opt(`<rect x="8" y="18" width="36" height="36" fill="#EF5350" stroke="#999" stroke-width="1.5"/><rect x="44" y="18" width="36" height="36" fill="#FFCA28" stroke="#999" stroke-width="1.5"/>`) },
      { id: 'd', label: 'All four colors', visual: opt(`<rect x="8" y="8" width="36" height="26" fill="#EF5350" stroke="#999" stroke-width="1"/><rect x="44" y="8" width="36" height="26" fill="#42A5F5" stroke="#999" stroke-width="1"/><rect x="8" y="34" width="36" height="26" fill="#66BB6A" stroke="#999" stroke-width="1"/><rect x="44" y="34" width="36" height="26" fill="#FFCA28" stroke="#999" stroke-width="1"/>`) },
    ],
    correctAnswerId: 'a',
    explanation: 'The top half (red and blue) folds down on top of the bottom half. Since colored paper looks the same on both sides, you see red on the left and blue on the right.',
    hint: 'The top half folds on top. Colored paper looks the same from both sides. What colors were on top?',
  },

  // pf-m-005: Fold-cut-unfold. Vertical fold (right onto left). Circle cut AWAY from fold edge.
  // Result: two circle holes, symmetrically placed left and right of center.
  {
    id: 'pf-m-005',
    category: 'paper-folding',
    difficulty: 'medium',
    prompt: 'The paper is folded, then a circle is cut through both layers (not at the fold). What does the paper look like when you open it?',
    visual: qSvgCut(
      // Fold panel: square with vertical fold line, right folds onto left
      paper(10, 10, 140) +
      foldLine(80, 10, 80, 150) +
      foldArrow(130, 30, 40, 30),
      // Cut panel: left half rectangle with circle hole in middle, away from fold
      `<rect x="10" y="10" width="70" height="140" fill="#FFF" stroke="#999" stroke-width="2"/>` +
      `<rect x="80" y="10" width="70" height="140" fill="none" stroke="#CCC" stroke-width="1" stroke-dasharray="5,3"/>` +
      `<circle cx="45" cy="80" r="15" fill="#FAFAFA" stroke="#E53935" stroke-width="2.5" stroke-dasharray="5,3"/>` +
      `<text x="60" y="75" font-size="18">✂</text>`
    ),
    options: [
      { id: 'a', label: 'Two circles, left and right', visual: opt(`<rect x="5" y="5" width="80" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><circle cx="25" cy="35" r="8" fill="#E8E8E8" stroke="#999" stroke-width="1.5"/><circle cx="65" cy="35" r="8" fill="#E8E8E8" stroke="#999" stroke-width="1.5"/>`) },
      { id: 'b', label: 'One circle at center', visual: opt(`<rect x="5" y="5" width="80" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><circle cx="45" cy="35" r="10" fill="#E8E8E8" stroke="#999" stroke-width="1.5"/>`) },
      { id: 'c', label: 'One circle on left side', visual: opt(`<rect x="5" y="5" width="80" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><circle cx="25" cy="35" r="8" fill="#E8E8E8" stroke="#999" stroke-width="1.5"/>`) },
      { id: 'd', label: 'Two circles on same side', visual: opt(`<rect x="5" y="5" width="80" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><circle cx="22" cy="25" r="7" fill="#E8E8E8" stroke="#999" stroke-width="1.5"/><circle cx="22" cy="48" r="7" fill="#E8E8E8" stroke="#999" stroke-width="1.5"/>`) },
    ],
    correctAnswerId: 'a',
    explanation: 'The circle was cut through both layers, away from the fold. When you unfold, each layer has a hole — you get two circles, one on each side, mirrored across the center!',
    hint: 'The circle is NOT at the fold — it is in the middle of the folded piece. Both layers get a hole. Where do the holes end up when you unfold?',
  },

  // pf-m-006: Square with orange horizontal stripe across middle. Fold bottom up.
  // Result: wide rectangle with stripe at bottom edge.
  {
    id: 'pf-m-006',
    category: 'paper-folding',
    difficulty: 'medium',
    prompt: 'There is an orange stripe across the middle. The bottom half folds up onto the top. What do you see?',
    visual: qSvg(
      paper(10, 10, 140) +
      `<rect x="10" y="65" width="140" height="30" fill="#FF7043" stroke="none"/>` +
      `<rect x="10" y="10" width="140" height="140" fill="none" stroke="#999" stroke-width="2"/>` +
      foldLine(10, 80, 150, 80) +
      foldArrow(140, 130, 140, 40)
    ),
    options: [
      { id: 'a', label: 'Wide rectangle, stripe at bottom', visual: opt(`<rect x="5" y="10" width="80" height="40" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><rect x="5" y="38" width="80" height="12" fill="#FF7043" stroke="none"/><rect x="5" y="10" width="80" height="40" fill="none" stroke="#999" stroke-width="2" rx="2"/>`) },
      { id: 'b', label: 'Wide rectangle, stripe at top', visual: opt(`<rect x="5" y="10" width="80" height="40" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><rect x="5" y="10" width="80" height="12" fill="#FF7043" stroke="none"/><rect x="5" y="10" width="80" height="40" fill="none" stroke="#999" stroke-width="2" rx="2"/>`) },
      { id: 'c', label: 'Wide rectangle, stripe in middle', visual: opt(`<rect x="5" y="10" width="80" height="40" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><rect x="5" y="24" width="80" height="12" fill="#FF7043" stroke="none"/><rect x="5" y="10" width="80" height="40" fill="none" stroke="#999" stroke-width="2" rx="2"/>`) },
      { id: 'd', label: 'Wide rectangle, no stripe', visual: opt(`<rect x="5" y="10" width="80" height="40" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/>`) },
    ],
    correctAnswerId: 'a',
    explanation: 'The stripe sits right at the fold line. When the bottom folds up on top, the bottom part of the stripe maps to the bottom edge of the resulting wide rectangle. You see the stripe at the bottom.',
    hint: 'The stripe sits right at the fold. After folding, where does the bottom part of the stripe end up in the new shorter rectangle?',
  },

  // pf-m-007: Fold-cut-unfold. Vertical fold (right onto left). Half-heart at fold edge.
  // Result: full heart-shaped hole at center of paper.
  {
    id: 'pf-m-007',
    category: 'paper-folding',
    difficulty: 'medium',
    prompt: 'The paper is folded, then a half-heart shape is cut at the fold. What does the paper look like when you open it?',
    visual: qSvgCut(
      // Fold panel: square with vertical fold line, right folds onto left
      paper(10, 10, 140) +
      foldLine(80, 10, 80, 150) +
      foldArrow(130, 120, 40, 120),
      // Cut panel: left half with half-heart cut from fold edge
      `<path d="M10,10 L80,10 L80,55 C80,55 80,42 65,42 C50,42 50,60 50,60 C50,75 65,90 80,100 L80,150 L10,150 Z" fill="#FFF" stroke="#999" stroke-width="2"/>` +
      `<rect x="80" y="10" width="70" height="140" fill="none" stroke="#CCC" stroke-width="1" stroke-dasharray="5,3"/>` +
      `<path d="M80,55 C80,42 65,42 65,42 C50,42 50,60 50,60 C50,75 65,90 80,100" fill="none" stroke="#E53935" stroke-width="2.5" stroke-dasharray="5,3"/>` +
      `<text x="35" y="72" font-size="20">✂</text>`
    ),
    options: [
      { id: 'a', label: 'Heart-shaped hole at center', visual: opt(`<rect x="5" y="5" width="80" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><path d="M45,22 C45,15 35,15 35,22 C35,32 45,40 45,40 C45,40 55,32 55,22 C55,15 45,15 45,22 Z" fill="#E8E8E8" stroke="#999" stroke-width="1.5"/>`) },
      { id: 'b', label: 'Two separate hearts', visual: opt(`<rect x="5" y="5" width="80" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><path d="M25,22 C25,18 20,18 20,22 C20,27 25,31 25,31 C25,31 30,27 30,22 C30,18 25,18 25,22 Z" fill="#E8E8E8" stroke="#999" stroke-width="1"/><path d="M65,22 C65,18 60,18 60,22 C60,27 65,31 65,31 C65,31 70,27 70,22 C70,18 65,18 65,22 Z" fill="#E8E8E8" stroke="#999" stroke-width="1"/>`) },
      { id: 'c', label: 'Half-heart on edge', visual: opt(`<path d="M5,5 L85,5 L85,65 L5,65 L5,40 C5,40 5,30 15,30 C25,30 25,40 25,40 C25,50 5,55 5,55 Z" fill="#FFF" stroke="#999" stroke-width="2"/>`) },
      { id: 'd', label: 'Oval hole at center', visual: opt(`<rect x="5" y="5" width="80" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><ellipse cx="45" cy="33" rx="14" ry="10" fill="#E8E8E8" stroke="#999" stroke-width="1.5"/>`) },
    ],
    correctAnswerId: 'a',
    explanation: 'Cutting a half-heart at the fold cuts through both layers. When you unfold, the two halves join to make a perfect heart-shaped hole in the center!',
    hint: 'The half-heart is cut at the fold. When the paper opens, the two mirror-image halves come together — what shape do they make?',
  },

  // pf-m-008: Fold-cut-unfold. Diagonal fold (top-right to bottom-left). Circle cut near fold.
  // Result: two circles mirrored across the diagonal.
  {
    id: 'pf-m-008',
    category: 'paper-folding',
    difficulty: 'medium',
    prompt: 'The paper is folded along the diagonal, then a circle is cut through both layers. What does the paper look like when you open it?',
    visual: qSvgCut(
      // Fold panel: square with diagonal fold, top-right folds to bottom-left
      paper(10, 10, 140) +
      foldLine(10, 10, 150, 150) +
      foldArrow(120, 40, 40, 120),
      // Cut panel: bottom-left triangle with circle cut
      `<polygon points="10,10 10,150 150,150" fill="#FFF" stroke="#999" stroke-width="2"/>` +
      `<polygon points="10,10 150,10 150,150" fill="none" stroke="#CCC" stroke-width="1" stroke-dasharray="5,3"/>` +
      `<circle cx="55" cy="115" r="15" fill="#FAFAFA" stroke="#E53935" stroke-width="2.5" stroke-dasharray="5,3"/>` +
      `<text x="70" y="112" font-size="18">✂</text>`
    ),
    options: [
      { id: 'a', label: 'Two circles across diagonal', visual: opt(`<rect x="5" y="5" width="80" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><circle cx="28" cy="48" r="7" fill="#E8E8E8" stroke="#999" stroke-width="1.5"/><circle cx="62" cy="20" r="7" fill="#E8E8E8" stroke="#999" stroke-width="1.5"/>`) },
      { id: 'b', label: 'One circle at center', visual: opt(`<rect x="5" y="5" width="80" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><circle cx="45" cy="35" r="9" fill="#E8E8E8" stroke="#999" stroke-width="1.5"/>`) },
      { id: 'c', label: 'Two circles on same side', visual: opt(`<rect x="5" y="5" width="80" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><circle cx="25" cy="35" r="7" fill="#E8E8E8" stroke="#999" stroke-width="1.5"/><circle cx="25" cy="55" r="7" fill="#E8E8E8" stroke="#999" stroke-width="1.5"/>`) },
      { id: 'd', label: 'Oval hole', visual: opt(`<rect x="5" y="5" width="80" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><ellipse cx="45" cy="35" rx="15" ry="8" fill="#E8E8E8" stroke="#999" stroke-width="1.5"/>`) },
    ],
    correctAnswerId: 'a',
    explanation: 'The circle was cut through both layers. When you unfold along the diagonal, the two holes mirror across the diagonal line — one in the lower-left area and one in the upper-right area!',
    hint: 'The fold is along the diagonal. The circle cut goes through both layers. When you unfold, where does the second hole appear?',
  },

  // =====================================================================
  //  HARD (pf-h-001 to pf-h-008)
  // =====================================================================

  // pf-h-001: Square with LARGE red corner top-left (quarter-paper). First fold: left onto right.
  // Second fold: top down. Result: quarter-size square with red corner visible at top-right.
  {
    id: 'pf-h-001',
    category: 'paper-folding',
    difficulty: 'hard',
    prompt: 'The paper folds twice! First left onto right, then top down. What do you see at the end?',
    visual: qSvg3(
      // Panel 1: original square with LARGE red triangle top-left + fold 1 indicators
      paper(10, 10, 140) +
      `<polygon points="10,10 80,10 10,80" fill="#EF5350" stroke="none"/>` +
      `<rect x="10" y="10" width="140" height="140" fill="none" stroke="#999" stroke-width="2"/>` +
      foldLine(80, 10, 80, 150) +
      foldArrow(30, 80, 120, 80),
      // Panel 2: after fold 1, tall rectangle, LARGE red triangle at top-right + fold 2 indicators
      `<rect x="30" y="10" width="70" height="140" fill="#FFF" stroke="#999" stroke-width="2"/>` +
      `<polygon points="100,10 30,10 100,80" fill="#EF5350" stroke="none"/>` +
      `<rect x="30" y="10" width="70" height="140" fill="none" stroke="#999" stroke-width="2"/>` +
      foldLine(30, 80, 100, 80) +
      foldArrow(65, 30, 65, 120)
    ),
    options: [
      { id: 'a', label: 'Small square with red corner', visual: opt(`<rect x="18" y="8" width="50" height="50" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><polygon points="68,8 38,8 68,38" fill="#EF5350" stroke="none"/><rect x="18" y="8" width="50" height="50" fill="none" stroke="#999" stroke-width="2" rx="2"/>`) },
      { id: 'b', label: 'Small plain square', visual: opt(`<rect x="18" y="8" width="50" height="50" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/>`) },
      { id: 'c', label: 'Small all-red square', visual: opt(`<rect x="18" y="8" width="50" height="50" fill="#EF5350" stroke="#999" stroke-width="2" rx="2"/>`) },
      { id: 'd', label: 'Small rectangle with red corner', visual: opt(`<rect x="12" y="15" width="60" height="38" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><polygon points="12,15 35,15 12,38" fill="#EF5350" stroke="none"/>`) },
    ],
    correctAnswerId: 'a',
    explanation: 'First fold: left onto right makes a tall rectangle. The large red corner from top-left mirrors to top-right. Second fold: top down makes a small square. The red corner is still visible in the top-right area.',
    hint: 'Follow the red corner through each fold. After folding left onto right, where is it? Then fold that piece top-down.',
  },

  // pf-h-002: Fold→Fold→Cut. Vertical fold + horizontal fold + circle cut away from both folds.
  // Result: 4 circle holes in a 2×2 grid, symmetric about both center lines.
  {
    id: 'pf-h-002',
    category: 'paper-folding',
    difficulty: 'hard',
    prompt: 'The paper is folded twice, then a circle is cut. What does the paper look like when you unfold it completely?',
    visual: qSvgCut3(
      // Panel 1 (Fold 1): square with vertical fold, right onto left
      paper(10, 10, 140) +
      foldLine(80, 10, 80, 150) +
      foldArrow(130, 30, 40, 30),
      // Panel 2 (Fold 2): left-half rectangle with horizontal fold, top onto bottom
      `<rect x="10" y="10" width="70" height="140" fill="#FFF" stroke="#999" stroke-width="2"/>` +
      foldLine(10, 80, 80, 80) +
      foldArrow(45, 30, 45, 120),
      // Panel 3 (Cut): quarter-piece (top-left) with circle hole
      `<rect x="10" y="10" width="70" height="70" fill="#FFF" stroke="#999" stroke-width="2"/>` +
      `<rect x="80" y="10" width="70" height="70" fill="none" stroke="#CCC" stroke-width="1" stroke-dasharray="5,3"/>` +
      `<rect x="10" y="80" width="70" height="70" fill="none" stroke="#CCC" stroke-width="1" stroke-dasharray="5,3"/>` +
      `<rect x="80" y="80" width="70" height="70" fill="none" stroke="#CCC" stroke-width="1" stroke-dasharray="5,3"/>` +
      `<circle cx="40" cy="40" r="12" fill="#FAFAFA" stroke="#E53935" stroke-width="2.5" stroke-dasharray="5,3"/>` +
      `<text x="52" y="38" font-size="16">✂</text>`
    ),
    options: [
      { id: 'a', label: 'Four circles in a grid', visual: opt(`<rect x="5" y="5" width="80" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><circle cx="25" cy="20" r="6" fill="#E8E8E8" stroke="#999" stroke-width="1.5"/><circle cx="65" cy="20" r="6" fill="#E8E8E8" stroke="#999" stroke-width="1.5"/><circle cx="25" cy="48" r="6" fill="#E8E8E8" stroke="#999" stroke-width="1.5"/><circle cx="65" cy="48" r="6" fill="#E8E8E8" stroke="#999" stroke-width="1.5"/>`) },
      { id: 'b', label: 'Two circles', visual: opt(`<rect x="5" y="5" width="80" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><circle cx="25" cy="35" r="7" fill="#E8E8E8" stroke="#999" stroke-width="1.5"/><circle cx="65" cy="35" r="7" fill="#E8E8E8" stroke="#999" stroke-width="1.5"/>`) },
      { id: 'c', label: 'One large circle', visual: opt(`<rect x="5" y="5" width="80" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><circle cx="45" cy="35" r="14" fill="#E8E8E8" stroke="#999" stroke-width="1.5"/>`) },
      { id: 'd', label: 'Four circles in a row', visual: opt(`<rect x="5" y="5" width="80" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><circle cx="18" cy="35" r="5" fill="#E8E8E8" stroke="#999" stroke-width="1.5"/><circle cx="35" cy="35" r="5" fill="#E8E8E8" stroke="#999" stroke-width="1.5"/><circle cx="52" cy="35" r="5" fill="#E8E8E8" stroke="#999" stroke-width="1.5"/><circle cx="69" cy="35" r="5" fill="#E8E8E8" stroke="#999" stroke-width="1.5"/>`) },
    ],
    correctAnswerId: 'a',
    explanation: 'Two folds made four layers. The circle cut goes through all four layers! When you unfold, there are four circle holes arranged in a 2×2 grid — the two folds create symmetry in both directions.',
    hint: 'Each fold doubles the layers. Two folds = four layers. How many holes does one circle cut make through four layers?',
  },

  // pf-h-003: Square, fold diagonally (top-left to bottom-right) then fold the triangle in half.
  // Result: smaller triangle.
  {
    id: 'pf-h-003',
    category: 'paper-folding',
    difficulty: 'hard',
    prompt: 'The paper folds into a triangle, then the triangle folds in half again. What do you get?',
    visual: qSvg3(
      // Panel 1: plain square with diagonal fold indicators
      paper(10, 10, 140) +
      `<rect x="10" y="10" width="140" height="140" fill="none" stroke="#999" stroke-width="2"/>` +
      foldLine(10, 10, 150, 150) +
      foldArrow(40, 30, 30, 40),
      // Panel 2: triangle from first fold with fold 2 indicators
      `<polygon points="10,150 150,150 150,10" fill="#FFF" stroke="#999" stroke-width="2"/>` +
      foldLine(80, 80, 150, 150) +
      foldArrow(120, 80, 95, 135)
    ),
    options: [
      { id: 'a', label: 'Small triangle', visual: opt(`<polygon points="10,60 80,60 45,18" fill="#FFF" stroke="#999" stroke-width="2"/>`) },
      { id: 'b', label: 'Small square', visual: opt(`<rect x="20" y="15" width="45" height="45" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/>`) },
      { id: 'c', label: 'Small rectangle', visual: opt(`<rect x="10" y="22" width="65" height="30" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/>`) },
      { id: 'd', label: 'Pentagon shape', visual: opt(`<polygon points="45,10 75,30 65,60 25,60 15,30" fill="#FFF" stroke="#999" stroke-width="2"/>`) },
    ],
    correctAnswerId: 'a',
    explanation: 'First fold: diagonal makes a triangle. Second fold: triangle in half makes an even smaller triangle. Two folds of a square give you a small triangle.',
    hint: 'A square folded diagonally = triangle. A triangle folded in half = ?',
  },

  // pf-h-004: Fold→Fold→Cut. Vertical fold + horizontal fold + triangle cut at fold intersection.
  // Result: diamond/rhombus hole at center of paper.
  {
    id: 'pf-h-004',
    category: 'paper-folding',
    difficulty: 'hard',
    prompt: 'The paper is folded twice, then a triangle is snipped from the corner where the folds meet. What does the paper look like when you unfold it?',
    visual: qSvgCut3(
      // Panel 1 (Fold 1): square with vertical fold, left onto right
      paper(10, 10, 140) +
      foldLine(80, 10, 80, 150) +
      foldArrow(30, 80, 120, 80),
      // Panel 2 (Fold 2): right-half rectangle with horizontal fold, bottom onto top
      `<rect x="80" y="10" width="70" height="140" fill="#FFF" stroke="#999" stroke-width="2"/>` +
      foldLine(80, 80, 150, 80) +
      foldArrow(115, 130, 115, 40),
      // Panel 3 (Cut): quarter-piece (top-right) with triangle snip from fold-intersection corner
      `<path d="M80,10 L150,10 L150,80 L95,80 L80,65 L80,10 Z" fill="#FFF" stroke="#999" stroke-width="2"/>` +
      `<rect x="10" y="10" width="70" height="70" fill="none" stroke="#CCC" stroke-width="1" stroke-dasharray="5,3"/>` +
      `<rect x="10" y="80" width="70" height="70" fill="none" stroke="#CCC" stroke-width="1" stroke-dasharray="5,3"/>` +
      `<rect x="80" y="80" width="70" height="70" fill="none" stroke="#CCC" stroke-width="1" stroke-dasharray="5,3"/>` +
      `<line x1="80" y1="65" x2="95" y2="80" stroke="#E53935" stroke-width="2.5" stroke-dasharray="5,3"/>` +
      `<text x="82" y="62" font-size="16">✂</text>`
    ),
    options: [
      { id: 'a', label: 'Diamond hole at center', visual: opt(`<rect x="5" y="5" width="80" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><polygon points="45,22 54,35 45,48 36,35" fill="#E8E8E8" stroke="#999" stroke-width="1.5"/>`) },
      { id: 'b', label: 'Four small triangles', visual: opt(`<rect x="5" y="5" width="80" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><polygon points="42,32 45,27 48,32" fill="#E8E8E8" stroke="#999" stroke-width="1"/><polygon points="48,32 53,35 48,38" fill="#E8E8E8" stroke="#999" stroke-width="1"/><polygon points="42,38 45,43 48,38" fill="#E8E8E8" stroke="#999" stroke-width="1"/><polygon points="37,35 42,32 42,38" fill="#E8E8E8" stroke="#999" stroke-width="1"/>`) },
      { id: 'c', label: 'Square hole at center', visual: opt(`<rect x="5" y="5" width="80" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><rect x="36" y="26" width="18" height="18" fill="#E8E8E8" stroke="#999" stroke-width="1.5"/>`) },
      { id: 'd', label: 'Single triangle at center', visual: opt(`<rect x="5" y="5" width="80" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><polygon points="45,24 52,38 38,38" fill="#E8E8E8" stroke="#999" stroke-width="1.5"/>`) },
    ],
    correctAnswerId: 'a',
    explanation: 'The triangle was snipped from the corner where both folds meet — that is the center of the paper! All four layers were cut. When you unfold, the four triangles join together to make one diamond-shaped hole at the center.',
    hint: 'The two folds meet at the center of the paper. Cutting a triangle at that corner cuts through all four layers. What shape do four triangles make when they come together?',
  },

  // pf-h-005: Square with stripes only on bottom half. Fold bottom up then fold left onto right.
  // Result: small square, stripes on front. (Thicker stripes for visibility.)
  {
    id: 'pf-h-005',
    category: 'paper-folding',
    difficulty: 'hard',
    prompt: 'The bottom half has stripes. First the bottom folds up, then the left folds onto the right. What do you see?',
    visual: qSvg3(
      // Panel 1: square with horizontal stripes on bottom half + fold 1 indicators
      paper(10, 10, 140) +
      `<line x1="10" y1="90" x2="150" y2="90" stroke="#FF7043" stroke-width="5"/>` +
      `<line x1="10" y1="105" x2="150" y2="105" stroke="#FF7043" stroke-width="5"/>` +
      `<line x1="10" y1="120" x2="150" y2="120" stroke="#FF7043" stroke-width="5"/>` +
      `<line x1="10" y1="135" x2="150" y2="135" stroke="#FF7043" stroke-width="5"/>` +
      `<rect x="10" y="10" width="140" height="140" fill="none" stroke="#999" stroke-width="2"/>` +
      foldLine(10, 80, 150, 80) +
      foldArrow(140, 130, 140, 40),
      // Panel 2: wide rectangle after fold 1 (stripes on front) + fold 2 indicators
      `<rect x="10" y="45" width="140" height="70" fill="#FFF" stroke="#999" stroke-width="2"/>` +
      `<line x1="10" y1="55" x2="150" y2="55" stroke="#FF7043" stroke-width="4"/>` +
      `<line x1="10" y1="67" x2="150" y2="67" stroke="#FF7043" stroke-width="4"/>` +
      `<line x1="10" y1="79" x2="150" y2="79" stroke="#FF7043" stroke-width="4"/>` +
      `<line x1="10" y1="91" x2="150" y2="91" stroke="#FF7043" stroke-width="4"/>` +
      `<rect x="10" y="45" width="140" height="70" fill="none" stroke="#999" stroke-width="2"/>` +
      foldLine(80, 45, 80, 115) +
      foldArrow(30, 80, 120, 80)
    ),
    options: [
      { id: 'a', label: 'Small square with stripes', visual: opt(`<rect x="18" y="8" width="50" height="50" fill="#FFF" stroke="#999" stroke-width="2.5" rx="2"/><line x1="18" y1="17" x2="68" y2="17" stroke="#FF7043" stroke-width="3"/><line x1="18" y1="27" x2="68" y2="27" stroke="#FF7043" stroke-width="3"/><line x1="18" y1="37" x2="68" y2="37" stroke="#FF7043" stroke-width="3"/><line x1="18" y1="47" x2="68" y2="47" stroke="#FF7043" stroke-width="3"/>`) },
      { id: 'b', label: 'Small plain square', visual: opt(`<rect x="18" y="8" width="50" height="50" fill="#FFF" stroke="#999" stroke-width="2.5" rx="2"/>`) },
      { id: 'c', label: 'Small rectangle with stripes', visual: opt(`<rect x="10" y="22" width="65" height="30" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><line x1="10" y1="28" x2="75" y2="28" stroke="#FF7043" stroke-width="3"/><line x1="10" y1="36" x2="75" y2="36" stroke="#FF7043" stroke-width="3"/><line x1="10" y1="44" x2="75" y2="44" stroke="#FF7043" stroke-width="3"/>`) },
      { id: 'd', label: 'Small triangle with stripes', visual: opt(`<polygon points="42,10 15,55 70,55" fill="#FFF" stroke="#999" stroke-width="2"/><line x1="25" y1="35" x2="60" y2="35" stroke="#FF7043" stroke-width="3"/><line x1="20" y1="45" x2="65" y2="45" stroke="#FF7043" stroke-width="3"/>`) },
    ],
    correctAnswerId: 'a',
    explanation: 'First fold: bottom up makes a wide rectangle with stripes on front. Second fold: left onto right makes a small square. The stripes are still facing you.',
    hint: 'After the first fold, the stripes face you. The second fold just makes it smaller. Does the front side change?',
  },

  // pf-h-006: Square with orange circle left, blue circle right. Fold right onto left.
  // Result: tall rectangle, blue circle on front (colored-through, back of right half on top).
  {
    id: 'pf-h-006',
    category: 'paper-folding',
    difficulty: 'hard',
    prompt: 'There is an orange circle on the left and a blue circle on the right. The right side folds onto the left. What do you see?',
    visual: qSvg(
      paper(10, 10, 140) +
      `<circle cx="45" cy="80" r="24" fill="#FF7043" stroke="#E64A19" stroke-width="1.5"/>` +
      `<circle cx="115" cy="80" r="24" fill="#42A5F5" stroke="#1565C0" stroke-width="1.5"/>` +
      foldLine(80, 10, 80, 150) +
      foldArrow(130, 40, 50, 40)
    ),
    options: [
      { id: 'a', label: 'Rectangle with orange circle', visual: opt(`<rect x="20" y="5" width="44" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><circle cx="42" cy="35" r="14" fill="#FF7043" stroke="#E64A19" stroke-width="1.5"/>`) },
      { id: 'b', label: 'Rectangle with blue circle', visual: opt(`<rect x="20" y="5" width="44" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><circle cx="42" cy="35" r="14" fill="#42A5F5" stroke="#1565C0" stroke-width="1.5"/>`) },
      { id: 'c', label: 'Rectangle with both circles', visual: opt(`<rect x="20" y="5" width="44" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><circle cx="34" cy="35" r="11" fill="#FF7043" stroke="#E64A19" stroke-width="1"/><circle cx="50" cy="35" r="11" fill="#42A5F5" stroke="#1565C0" stroke-width="1"/>`) },
      { id: 'd', label: 'Rectangle with no circles', visual: opt(`<rect x="20" y="5" width="44" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/>`) },
    ],
    correctAnswerId: 'b',
    explanation: 'The right (blue circle) folds onto the left (orange circle). Since colored paper looks the same from both sides, you see blue on top, covering the orange underneath.',
    hint: 'Which circle is on the side that folds on top? Colored paper looks the same from both sides.',
  },

  // pf-h-007: Square with LARGE colored corners (red TL, blue TR, green BL, yellow BR).
  // Fold top-right to bottom-left diagonally. Result: triangle showing green + red corners.
  {
    id: 'pf-h-007',
    category: 'paper-folding',
    difficulty: 'hard',
    prompt: 'Each corner has a different color. The paper folds along the diagonal. Which colors can you see?',
    visual: qSvg(
      paper(10, 10, 140) +
      `<polygon points="10,10 60,10 10,60" fill="#EF5350" stroke="none"/>` +
      `<polygon points="150,10 100,10 150,60" fill="#42A5F5" stroke="none"/>` +
      `<polygon points="10,150 60,150 10,100" fill="#66BB6A" stroke="none"/>` +
      `<polygon points="150,150 100,150 150,100" fill="#FDD835" stroke="none"/>` +
      `<rect x="10" y="10" width="140" height="140" fill="none" stroke="#999" stroke-width="2"/>` +
      foldLine(150, 10, 10, 150) +
      foldArrow(130, 30, 30, 130)
    ),
    options: [
      { id: 'a', label: 'Green and red corners', visual: opt(`<polygon points="10,8 10,62 78,62" fill="#FFF" stroke="#999" stroke-width="2"/><polygon points="10,62 30,62 10,42" fill="#66BB6A" stroke="none"/><polygon points="10,8 10,28 28,8" fill="#EF5350" stroke="none"/><polygon points="10,8 10,62 78,62" fill="none" stroke="#999" stroke-width="2"/>`) },
      { id: 'b', label: 'Blue and yellow corners', visual: opt(`<polygon points="10,8 10,62 78,62" fill="#FFF" stroke="#999" stroke-width="2"/><polygon points="10,62 30,62 10,42" fill="#42A5F5" stroke="none"/><polygon points="78,62 58,62 78,42" fill="#FDD835" stroke="none"/>`) },
      { id: 'c', label: 'All four colors', visual: opt(`<polygon points="10,8 10,62 78,62" fill="#FFF" stroke="#999" stroke-width="2"/><polygon points="10,62 25,62 10,48" fill="#66BB6A" stroke="none"/><polygon points="10,8 10,23 23,8" fill="#EF5350" stroke="none"/><polygon points="78,62 63,62 78,48" fill="#FDD835" stroke="none"/><polygon points="44,8 56,8 44,20" fill="#42A5F5" stroke="none"/>`) },
      { id: 'd', label: 'Plain white triangle', visual: opt(`<polygon points="10,8 10,62 78,62" fill="#FFF" stroke="#999" stroke-width="2"/>`) },
    ],
    correctAnswerId: 'a',
    explanation: 'Folding the top-right down to the bottom-left: the green corner (bottom-left) stays visible. The red corner (top-left) folds over but stays on the front face. Blue and yellow end up hidden.',
    hint: 'The bottom-left triangle stays as is. The top-right triangle folds over it. Which colors were in which triangle?',
  },

  // pf-h-008: Square with a LARGE heart in the center. Fold in half vertically (left onto right),
  // then in half horizontally (top down). Result: quarter-size square, part of heart visible in corner.
  {
    id: 'pf-h-008',
    category: 'paper-folding',
    difficulty: 'hard',
    prompt: 'There is a heart in the center. The paper folds twice. Can you still see part of the heart?',
    visual: qSvg3(
      // Panel 1: square with large heart in center + fold 1 indicators
      paper(10, 10, 140) +
      `<path d="M80,48 C80,30 55,22 55,48 C55,70 80,90 80,90 C80,90 105,70 105,48 C105,22 80,30 80,48 Z" fill="#FF1493" stroke="#C2185B" stroke-width="1.5"/>` +
      `<rect x="10" y="10" width="140" height="140" fill="none" stroke="#999" stroke-width="2"/>` +
      foldLine(80, 10, 80, 150) +
      foldArrow(30, 80, 120, 80),
      // Panel 2: tall rectangle after fold 1, half heart visible on left edge + fold 2 indicators
      `<rect x="30" y="10" width="70" height="140" fill="#FFF" stroke="#999" stroke-width="2"/>` +
      `<path d="M30,48 C30,30 55,22 55,48 C55,70 30,90 30,90 Z" fill="#FF1493" stroke="#C2185B" stroke-width="1.5" opacity="0.85"/>` +
      `<rect x="30" y="10" width="70" height="140" fill="none" stroke="#999" stroke-width="2"/>` +
      foldLine(30, 80, 100, 80) +
      foldArrow(65, 30, 65, 120)
    ),
    options: [
      { id: 'a', label: 'Small square with partial heart', visual: opt(`<rect x="18" y="8" width="50" height="50" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><path d="M18,30 C18,20 34,15 34,30 C34,42 18,50 18,50 Z" fill="#FF1493" stroke="#C2185B" stroke-width="1" opacity="0.85"/>`) },
      { id: 'b', label: 'Small square no heart', visual: opt(`<rect x="18" y="8" width="50" height="50" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/>`) },
      { id: 'c', label: 'Small square with full heart', visual: opt(`<rect x="18" y="8" width="50" height="50" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><path d="M43,22 C43,14 34,12 34,22 C34,30 43,36 43,36 C43,36 52,30 52,22 C52,12 43,14 43,22 Z" fill="#FF1493" stroke="#C2185B" stroke-width="1"/>`) },
      { id: 'd', label: 'Small triangle with heart', visual: opt(`<polygon points="18,58 68,58 43,10" fill="#FFF" stroke="#999" stroke-width="2"/><path d="M43,25 C43,19 37,17 37,23 C37,29 43,34 43,34 C43,34 49,29 49,23 C49,17 43,19 43,25 Z" fill="#FF1493" stroke="#C2185B" stroke-width="1"/>`) },
    ],
    correctAnswerId: 'a',
    explanation: 'The heart is in the center spanning both halves. Fold 1 (left onto right): the left half of the heart folds over, so part of the heart is visible on the left edge. Fold 2 (top down): a piece of the heart is still visible in the corner of the small square.',
    hint: 'The heart is in the very center, so each fold only hides part of it. Some of the heart peeks out at the edge.',
  },
];
