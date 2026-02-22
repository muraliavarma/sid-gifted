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

  // pf-e-001: Square with blue left half. Vertical fold (right onto left).
  // Result: tall rectangle, blue on front (white folds behind blue).
  {
    id: 'pf-e-001',
    category: 'paper-folding',
    difficulty: 'easy',
    prompt: 'The paper is folded along the dashed line. The arrow shows the fold direction. What does it look like after folding?',
    visual: qSvg(
      paper(10, 10, 140) +
      `<rect x="10" y="10" width="70" height="140" fill="#42A5F5" stroke="none"/>` +
      `<rect x="10" y="10" width="140" height="140" fill="none" stroke="#999" stroke-width="2"/>` +
      foldLine(80, 10, 80, 150) +
      foldArrow(130, 30, 50, 30)
    ),
    options: [
      { id: 'a', label: 'Tall blue rectangle', visual: opt(`<rect x="25" y="5" width="30" height="60" fill="#42A5F5" stroke="#999" stroke-width="2" rx="2"/>`) },
      { id: 'b', label: 'Tall white rectangle', visual: opt(`<rect x="25" y="5" width="30" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/>`) },
      { id: 'c', label: 'Triangle', visual: opt(`<polygon points="45,5 25,65 65,65" fill="#42A5F5" stroke="#999" stroke-width="2"/>`) },
      { id: 'd', label: 'Square unchanged', visual: opt(`<rect x="15" y="5" width="60" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><rect x="15" y="5" width="30" height="60" fill="#42A5F5" stroke="none"/>`) },
    ],
    correctAnswerId: 'a',
    explanation: 'The right (white) half folds onto the left (blue) half. The blue side faces you, so you see a tall blue rectangle.',
    hint: 'Which color is on the outside when you fold the white side onto the blue side?',
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

  // pf-e-003: Square with green right half. Vertical fold (right onto left).
  // Result: tall rectangle, green on front.
  {
    id: 'pf-e-003',
    category: 'paper-folding',
    difficulty: 'easy',
    prompt: 'What does the paper look like after you fold it along the dashed line?',
    visual: qSvg(
      paper(10, 10, 140) +
      `<rect x="80" y="10" width="70" height="140" fill="#66BB6A" stroke="none"/>` +
      `<rect x="10" y="10" width="140" height="140" fill="none" stroke="#999" stroke-width="2"/>` +
      foldLine(80, 10, 80, 150) +
      foldArrow(130, 130, 50, 130)
    ),
    options: [
      { id: 'a', label: 'Tall white rectangle', visual: opt(`<rect x="25" y="5" width="30" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/>`) },
      { id: 'b', label: 'Wide green rectangle', visual: opt(`<rect x="10" y="20" width="70" height="35" fill="#66BB6A" stroke="#999" stroke-width="2" rx="2"/>`) },
      { id: 'c', label: 'Tall green rectangle', visual: opt(`<rect x="25" y="5" width="30" height="60" fill="#66BB6A" stroke="#999" stroke-width="2" rx="2"/>`) },
      { id: 'd', label: 'Half green half white rectangle', visual: opt(`<rect x="25" y="5" width="30" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><rect x="25" y="5" width="15" height="60" fill="#66BB6A" stroke="none"/>`) },
    ],
    correctAnswerId: 'c',
    explanation: 'The green right half folds onto the white left half. Green faces out, making a tall green rectangle.',
    hint: 'The green side is folding on top. What color will you see?',
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

  // pf-e-005: Square with orange triangle in top-right corner. Diagonal fold (top-right to bottom-left).
  // Result: triangle with orange corner visible.
  {
    id: 'pf-e-005',
    category: 'paper-folding',
    difficulty: 'easy',
    prompt: 'The paper folds along the diagonal dashed line. What shape do you get?',
    visual: qSvg(
      paper(10, 10, 140) +
      `<polygon points="150,10 150,55 105,10" fill="#FF7043" stroke="none"/>` +
      `<rect x="10" y="10" width="140" height="140" fill="none" stroke="#999" stroke-width="2"/>` +
      foldLine(10, 10, 150, 150) +
      foldArrow(120, 40, 40, 120)
    ),
    options: [
      { id: 'a', label: 'Triangle with orange corner', visual: opt(`<polygon points="10,60 80,60 10,8" fill="#FFF" stroke="#999" stroke-width="2"/><polygon points="10,60 10,40 30,60" fill="#FF7043" stroke="none"/><polygon points="10,60 80,60 10,8" fill="none" stroke="#999" stroke-width="2"/>`) },
      { id: 'b', label: 'Plain triangle', visual: opt(`<polygon points="10,60 80,60 10,8" fill="#FFF" stroke="#999" stroke-width="2"/>`) },
      { id: 'c', label: 'Rectangle', visual: opt(`<rect x="10" y="15" width="70" height="40" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/>`) },
      { id: 'd', label: 'Triangle all orange', visual: opt(`<polygon points="10,60 80,60 10,8" fill="#FF7043" stroke="#999" stroke-width="2"/>`) },
    ],
    correctAnswerId: 'a',
    explanation: 'Folding diagonally makes a triangle. The orange corner from the top-right folds over and shows at the bottom corner.',
    hint: 'What shape do you get when you fold a square corner-to-corner? And where does the orange end up?',
  },

  // pf-e-006: Square with purple bottom half. Horizontal fold (bottom up).
  // Result: wide rectangle, purple on front.
  {
    id: 'pf-e-006',
    category: 'paper-folding',
    difficulty: 'easy',
    prompt: 'The bottom half folds up onto the top half. What do you see?',
    visual: qSvg(
      paper(10, 10, 140) +
      `<rect x="10" y="80" width="140" height="70" fill="#AB47BC" stroke="none"/>` +
      `<rect x="10" y="10" width="140" height="140" fill="none" stroke="#999" stroke-width="2"/>` +
      foldLine(10, 80, 150, 80) +
      foldArrow(140, 130, 140, 40)
    ),
    options: [
      { id: 'a', label: 'Wide white rectangle', visual: opt(`<rect x="10" y="20" width="70" height="35" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/>`) },
      { id: 'b', label: 'Wide purple rectangle', visual: opt(`<rect x="10" y="20" width="70" height="35" fill="#AB47BC" stroke="#999" stroke-width="2" rx="2"/>`) },
      { id: 'c', label: 'Tall purple rectangle', visual: opt(`<rect x="25" y="5" width="35" height="60" fill="#AB47BC" stroke="#999" stroke-width="2" rx="2"/>`) },
      { id: 'd', label: 'Half purple half white rectangle', visual: opt(`<rect x="10" y="20" width="70" height="35" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><rect x="10" y="37" width="70" height="18" fill="#AB47BC" stroke="none"/>`) },
    ],
    correctAnswerId: 'b',
    explanation: 'The purple bottom half folds up on top of the white top half. Purple faces out, so you see a wide purple rectangle.',
    hint: 'The purple part is folding on top. What color faces you?',
  },

  // =====================================================================
  //  MEDIUM (pf-m-001 to pf-m-008)
  // =====================================================================

  // pf-m-001: Square with blue dot top-left, red dot bottom-right. Vertical fold (left onto right).
  // Result: tall rectangle, red dot visible on right, blue dot on back side near top-right.
  {
    id: 'pf-m-001',
    category: 'paper-folding',
    difficulty: 'medium',
    prompt: 'There is a blue dot and a red dot. The left side folds onto the right. What do you see from the front?',
    visual: qSvg(
      paper(10, 10, 140) +
      `<circle cx="40" cy="40" r="12" fill="#42A5F5"/>` +
      `<circle cx="120" cy="120" r="12" fill="#E53935"/>` +
      foldLine(80, 10, 80, 150) +
      foldArrow(30, 80, 120, 80)
    ),
    options: [
      { id: 'a', label: 'Rectangle with both dots', visual: opt(`<rect x="25" y="5" width="35" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><circle cx="42" cy="18" r="6" fill="#42A5F5"/><circle cx="42" cy="50" r="6" fill="#E53935"/>`) },
      { id: 'b', label: 'Rectangle with red dot only', visual: opt(`<rect x="25" y="5" width="35" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><circle cx="42" cy="50" r="6" fill="#E53935"/>`) },
      { id: 'c', label: 'Rectangle with blue dot only', visual: opt(`<rect x="25" y="5" width="35" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><circle cx="42" cy="18" r="6" fill="#42A5F5"/>`) },
      { id: 'd', label: 'Rectangle with no dots', visual: opt(`<rect x="25" y="5" width="35" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/>`) },
    ],
    correctAnswerId: 'b',
    explanation: 'The left side folds onto the right. The blue dot was on the left, so it ends up hidden behind. The red dot was already on the right side and stays visible.',
    hint: 'Which dot is on the side that stays facing you?',
  },

  // pf-m-002: Square with green stripe across top. Diagonal fold (top-left to bottom-right).
  // Result: triangle, green stripe visible along one edge (hypotenuse edge area).
  {
    id: 'pf-m-002',
    category: 'paper-folding',
    difficulty: 'medium',
    prompt: 'The paper has a green stripe at the top. It folds along the diagonal. What does it look like?',
    visual: qSvg(
      paper(10, 10, 140) +
      `<rect x="10" y="10" width="140" height="25" fill="#66BB6A" stroke="none"/>` +
      `<rect x="10" y="10" width="140" height="140" fill="none" stroke="#999" stroke-width="2"/>` +
      foldLine(10, 10, 150, 150) +
      foldArrow(40, 30, 30, 40)
    ),
    options: [
      { id: 'a', label: 'Triangle with green corner', visual: opt(`<polygon points="75,8 75,62 15,62" fill="#FFF" stroke="#999" stroke-width="2"/><polygon points="75,8 75,22 61,8" fill="#66BB6A" stroke="none"/><polygon points="75,8 75,62 15,62" fill="none" stroke="#999" stroke-width="2"/>`) },
      { id: 'b', label: 'Triangle all green', visual: opt(`<polygon points="75,8 75,62 15,62" fill="#66BB6A" stroke="#999" stroke-width="2"/>`) },
      { id: 'c', label: 'Plain triangle', visual: opt(`<polygon points="75,8 75,62 15,62" fill="#FFF" stroke="#999" stroke-width="2"/>`) },
      { id: 'd', label: 'Rectangle with green stripe', visual: opt(`<rect x="10" y="15" width="70" height="40" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><rect x="10" y="15" width="70" height="10" fill="#66BB6A" stroke="none"/>`) },
    ],
    correctAnswerId: 'a',
    explanation: 'Folding along the diagonal creates a triangle. The green stripe from the top folds over and shows as a small green corner area.',
    hint: 'The paper becomes a triangle. The green stripe was at the top -- where does it end up after folding?',
  },

  // pf-m-003: Square with red circle in center. Fold top-right corner to center.
  // Result: square with a folded-over triangle corner, circle partially covered.
  {
    id: 'pf-m-003',
    category: 'paper-folding',
    difficulty: 'medium',
    prompt: 'The top-right corner folds down to the center. What does the paper look like?',
    visual: qSvg(
      paper(10, 10, 140) +
      `<circle cx="80" cy="80" r="18" fill="#E53935" stroke="#C62828" stroke-width="1.5"/>` +
      foldLine(80, 10, 150, 80) +
      foldArrow(140, 20, 85, 75)
    ),
    options: [
      { id: 'a', label: 'Square with full circle, folded corner', visual: opt(`<rect x="10" y="5" width="60" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><circle cx="40" cy="35" r="10" fill="#E53935" stroke="#C62828" stroke-width="1"/><polygon points="40,5 70,5 70,35" fill="#EEE" stroke="#999" stroke-width="1"/>`) },
      { id: 'b', label: 'Square with no circle', visual: opt(`<rect x="10" y="5" width="60" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><polygon points="40,5 70,5 70,35" fill="#EEE" stroke="#999" stroke-width="1"/>`) },
      { id: 'c', label: 'Plain square with circle', visual: opt(`<rect x="10" y="5" width="60" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><circle cx="40" cy="35" r="10" fill="#E53935" stroke="#C62828" stroke-width="1"/>`) },
      { id: 'd', label: 'Triangle with circle', visual: opt(`<polygon points="10,62 75,62 10,5" fill="#FFF" stroke="#999" stroke-width="2"/><circle cx="30" cy="45" r="9" fill="#E53935" stroke="#C62828" stroke-width="1"/>`) },
    ],
    correctAnswerId: 'a',
    explanation: 'Only the top-right corner folds down. The circle is mostly visible but the folded triangle covers part of it. The paper is still a square shape with a triangular flap.',
    hint: 'Only a corner folds, not the whole paper. What shape does the paper stay?',
  },

  // pf-m-004: Square divided into 4 colored quadrants (red TL, blue TR, green BL, yellow BR).
  // Horizontal fold (top down). Result: wide rectangle showing green (BL) and yellow (BR) on front,
  // red and blue hidden behind.
  {
    id: 'pf-m-004',
    category: 'paper-folding',
    difficulty: 'medium',
    prompt: 'This paper has four colored squares. The top folds down. What colors do you see on front?',
    visual: qSvg(
      paper(10, 10, 140) +
      `<rect x="10" y="10" width="70" height="70" fill="#EF5350"/>` +
      `<rect x="80" y="10" width="70" height="70" fill="#42A5F5"/>` +
      `<rect x="10" y="80" width="70" height="70" fill="#66BB6A"/>` +
      `<rect x="80" y="80" width="70" height="70" fill="#FDD835"/>` +
      `<rect x="10" y="10" width="140" height="140" fill="none" stroke="#999" stroke-width="2"/>` +
      foldLine(10, 80, 150, 80) +
      foldArrow(80, 30, 80, 120)
    ),
    options: [
      { id: 'a', label: 'Red and blue', visual: opt(`<rect x="10" y="20" width="35" height="35" fill="#EF5350" stroke="#999" stroke-width="1.5"/><rect x="45" y="20" width="35" height="35" fill="#42A5F5" stroke="#999" stroke-width="1.5"/>`) },
      { id: 'b', label: 'Green and yellow', visual: opt(`<rect x="10" y="20" width="35" height="35" fill="#66BB6A" stroke="#999" stroke-width="1.5"/><rect x="45" y="20" width="35" height="35" fill="#FDD835" stroke="#999" stroke-width="1.5"/>`) },
      { id: 'c', label: 'Red and yellow', visual: opt(`<rect x="10" y="20" width="35" height="35" fill="#EF5350" stroke="#999" stroke-width="1.5"/><rect x="45" y="20" width="35" height="35" fill="#FDD835" stroke="#999" stroke-width="1.5"/>`) },
      { id: 'd', label: 'All four colors', visual: opt(`<rect x="10" y="8" width="35" height="25" fill="#EF5350" stroke="#999" stroke-width="1"/><rect x="45" y="8" width="35" height="25" fill="#42A5F5" stroke="#999" stroke-width="1"/><rect x="10" y="33" width="35" height="25" fill="#66BB6A" stroke="#999" stroke-width="1"/><rect x="45" y="33" width="35" height="25" fill="#FDD835" stroke="#999" stroke-width="1"/>`) },
    ],
    correctAnswerId: 'b',
    explanation: 'The top half (red and blue) folds down onto the bottom half (green and yellow). The bottom colors stay visible on front: green on the left, yellow on the right.',
    hint: 'The top folds down and hides. Which colors were on the bottom?',
  },

  // pf-m-005: Square with a star in bottom-left. Vertical fold (left onto right).
  // Result: tall rectangle, star visible on right side (transferred from back).
  {
    id: 'pf-m-005',
    category: 'paper-folding',
    difficulty: 'medium',
    prompt: 'The left side folds onto the right side. Can you still see the star?',
    visual: qSvg(
      paper(10, 10, 140) +
      `<text x="40" y="135" text-anchor="middle" font-size="30">⭐</text>` +
      foldLine(80, 10, 80, 150) +
      foldArrow(30, 80, 120, 80)
    ),
    options: [
      { id: 'a', label: 'Rectangle with star at bottom', visual: opt(`<rect x="25" y="5" width="35" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><text x="42" y="55" text-anchor="middle" font-size="16">⭐</text>`) },
      { id: 'b', label: 'Rectangle with star at top', visual: opt(`<rect x="25" y="5" width="35" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><text x="42" y="25" text-anchor="middle" font-size="16">⭐</text>`) },
      { id: 'c', label: 'Rectangle no star', visual: opt(`<rect x="25" y="5" width="35" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/>`) },
      { id: 'd', label: 'Triangle with star', visual: opt(`<polygon points="42,5 25,60 60,60" fill="#FFF" stroke="#999" stroke-width="2"/><text x="42" y="47" text-anchor="middle" font-size="16">⭐</text>`) },
    ],
    correctAnswerId: 'a',
    explanation: 'The left side folds onto the right. The star was on the left side, so when that side folds over, the star faces you at the bottom of the tall rectangle.',
    hint: 'The left side flips onto the right. The star was on the left -- does it face you or away from you?',
  },

  // pf-m-006: Square with diagonal stripe from top-left to bottom-right. Fold vertically (left onto right).
  // Result: tall rectangle with stripe visible as a diagonal going from top edge to bottom.
  {
    id: 'pf-m-006',
    category: 'paper-folding',
    difficulty: 'medium',
    prompt: 'There is a diagonal stripe on the paper. The left side folds onto the right. What do you see?',
    visual: qSvg(
      paper(10, 10, 140) +
      `<line x1="10" y1="10" x2="150" y2="150" stroke="#FF7043" stroke-width="12"/>` +
      `<rect x="10" y="10" width="140" height="140" fill="none" stroke="#999" stroke-width="2"/>` +
      foldLine(80, 10, 80, 150) +
      foldArrow(30, 40, 120, 40)
    ),
    options: [
      { id: 'a', label: 'Rectangle with one diagonal', visual: opt(`<rect x="22" y="5" width="38" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><line x1="22" y1="65" x2="60" y2="5" stroke="#FF7043" stroke-width="5"/>`) },
      { id: 'b', label: 'Rectangle with X pattern', visual: opt(`<rect x="22" y="5" width="38" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><line x1="60" y1="5" x2="22" y2="65" stroke="#FF7043" stroke-width="5"/><line x1="22" y1="5" x2="60" y2="65" stroke="#FF7043" stroke-width="4" opacity="0.5"/>`) },
      { id: 'c', label: 'Rectangle with horizontal stripe', visual: opt(`<rect x="22" y="5" width="38" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><line x1="22" y1="35" x2="60" y2="35" stroke="#FF7043" stroke-width="5"/>`) },
      { id: 'd', label: 'Plain rectangle', visual: opt(`<rect x="22" y="5" width="38" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/>`) },
    ],
    correctAnswerId: 'b',
    explanation: 'The stripe goes diagonally across both halves. When the left side folds onto the right, the left half stripe mirrors and overlaps. You see an X pattern from the two crossing diagonals.',
    hint: 'The stripe is on both halves. When one half folds onto the other, what pattern do the two lines make?',
  },

  // pf-m-007: Square with three dots in a row across the top. Horizontal fold (top down).
  // Result: wide rectangle, dots hidden inside.
  {
    id: 'pf-m-007',
    category: 'paper-folding',
    difficulty: 'medium',
    prompt: 'There are three dots along the top. The top folds down. What do you see?',
    visual: qSvg(
      paper(10, 10, 140) +
      `<circle cx="40" cy="35" r="10" fill="#42A5F5"/>` +
      `<circle cx="80" cy="35" r="10" fill="#E53935"/>` +
      `<circle cx="120" cy="35" r="10" fill="#66BB6A"/>` +
      foldLine(10, 80, 150, 80) +
      foldArrow(20, 30, 20, 120)
    ),
    options: [
      { id: 'a', label: 'Rectangle with three dots on top', visual: opt(`<rect x="10" y="20" width="70" height="35" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><circle cx="25" cy="30" r="5" fill="#42A5F5"/><circle cx="45" cy="30" r="5" fill="#E53935"/><circle cx="65" cy="30" r="5" fill="#66BB6A"/>`) },
      { id: 'b', label: 'Rectangle with three dots on bottom', visual: opt(`<rect x="10" y="20" width="70" height="35" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><circle cx="25" cy="45" r="5" fill="#42A5F5"/><circle cx="45" cy="45" r="5" fill="#E53935"/><circle cx="65" cy="45" r="5" fill="#66BB6A"/>`) },
      { id: 'c', label: 'Rectangle no dots', visual: opt(`<rect x="10" y="20" width="70" height="35" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/>`) },
      { id: 'd', label: 'Square with three dots', visual: opt(`<rect x="15" y="5" width="60" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><circle cx="30" cy="20" r="5" fill="#42A5F5"/><circle cx="45" cy="20" r="5" fill="#E53935"/><circle cx="60" cy="20" r="5" fill="#66BB6A"/>`) },
    ],
    correctAnswerId: 'c',
    explanation: 'The dots are on the top half. When the top folds down, the dots end up on the inside of the fold, hidden from view. You see a plain rectangle.',
    hint: 'The dots are on the part that folds. Do they end up facing you or hidden inside?',
  },

  // pf-m-008: Square with blue top-left corner triangle. Fold top down.
  // Result: wide rectangle, blue triangle hidden (was on top, folded inside).
  {
    id: 'pf-m-008',
    category: 'paper-folding',
    difficulty: 'medium',
    prompt: 'There is a blue triangle in the corner. The top folds down. Can you see the blue triangle?',
    visual: qSvg(
      paper(10, 10, 140) +
      `<polygon points="10,10 70,10 10,70" fill="#42A5F5" stroke="none"/>` +
      `<rect x="10" y="10" width="140" height="140" fill="none" stroke="#999" stroke-width="2"/>` +
      foldLine(10, 80, 150, 80) +
      foldArrow(140, 30, 140, 120)
    ),
    options: [
      { id: 'a', label: 'Rectangle with blue triangle', visual: opt(`<rect x="10" y="20" width="70" height="35" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><polygon points="10,20 35,20 10,45" fill="#42A5F5" stroke="none"/>`) },
      { id: 'b', label: 'Plain rectangle', visual: opt(`<rect x="10" y="20" width="70" height="35" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/>`) },
      { id: 'c', label: 'Triangle shape', visual: opt(`<polygon points="45,15 10,55 80,55" fill="#42A5F5" stroke="#999" stroke-width="2"/>`) },
      { id: 'd', label: 'Rectangle with blue bottom-left', visual: opt(`<rect x="10" y="20" width="70" height="35" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><polygon points="10,55 35,55 10,35" fill="#42A5F5" stroke="none"/>`) },
    ],
    correctAnswerId: 'b',
    explanation: 'The blue triangle was in the top-left corner. When the top folds down, the blue triangle goes inside the fold and cannot be seen. You see a plain white rectangle.',
    hint: 'The blue is on the part that folds over. Does it end up on the outside or inside?',
  },

  // =====================================================================
  //  HARD (pf-h-001 to pf-h-008)
  // =====================================================================

  // pf-h-001: Square with red corner top-left. First fold: in half vertically (left onto right).
  // Second fold: in half horizontally (top down). Result: quarter-size square with red corner visible.
  {
    id: 'pf-h-001',
    category: 'paper-folding',
    difficulty: 'hard',
    prompt: 'The paper folds twice! First left onto right, then top down. What do you see at the end?',
    visual: qSvg3(
      // Panel 1: original square with red corner top-left + fold 1 indicators
      paper(10, 10, 140) +
      `<polygon points="10,10 60,10 10,60" fill="#EF5350" stroke="none"/>` +
      `<rect x="10" y="10" width="140" height="140" fill="none" stroke="#999" stroke-width="2"/>` +
      foldLine(80, 10, 80, 150) +
      foldArrow(30, 80, 120, 80),
      // Panel 2: after fold 1, tall rectangle, red corner visible top-right (mirrored) + fold 2 indicators
      `<rect x="30" y="10" width="70" height="140" fill="#FFF" stroke="#999" stroke-width="2"/>` +
      `<polygon points="100,10 60,10 100,50" fill="#EF5350" stroke="none"/>` +
      `<rect x="30" y="10" width="70" height="140" fill="none" stroke="#999" stroke-width="2"/>` +
      foldLine(30, 80, 100, 80) +
      foldArrow(65, 30, 65, 120)
    ),
    options: [
      { id: 'a', label: 'Small square with red corner', visual: opt(`<rect x="20" y="10" width="45" height="45" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><polygon points="65,10 45,10 65,30" fill="#EF5350" stroke="none"/>`) },
      { id: 'b', label: 'Small plain square', visual: opt(`<rect x="20" y="10" width="45" height="45" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/>`) },
      { id: 'c', label: 'Small all-red square', visual: opt(`<rect x="20" y="10" width="45" height="45" fill="#EF5350" stroke="#999" stroke-width="2" rx="2"/>`) },
      { id: 'd', label: 'Small rectangle with red corner', visual: opt(`<rect x="15" y="15" width="55" height="35" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><polygon points="15,15 35,15 15,35" fill="#EF5350" stroke="none"/>`) },
    ],
    correctAnswerId: 'a',
    explanation: 'First fold: left onto right makes a tall rectangle. The red corner from top-left mirrors to top-right. Second fold: top down makes a small square. The red corner is still visible in the top-right area.',
    hint: 'Follow the red corner through each fold. After folding left onto right, where is it? Then fold that piece top-down.',
  },

  // pf-h-002: Square with dots in all 4 corners. Fold in half horizontally (top down).
  // Result: wide rectangle with 2 visible dots at bottom corners; top dots hidden inside.
  {
    id: 'pf-h-002',
    category: 'paper-folding',
    difficulty: 'hard',
    prompt: 'There are dots in all four corners. The top folds down. How many dots can you see?',
    visual: qSvg(
      paper(10, 10, 140) +
      `<circle cx="25" cy="25" r="10" fill="#E53935"/>` +
      `<circle cx="135" cy="25" r="10" fill="#42A5F5"/>` +
      `<circle cx="25" cy="135" r="10" fill="#66BB6A"/>` +
      `<circle cx="135" cy="135" r="10" fill="#FDD835"/>` +
      foldLine(10, 80, 150, 80) +
      foldArrow(80, 30, 80, 120)
    ),
    options: [
      { id: 'a', label: 'Rectangle with 4 dots', visual: opt(`<rect x="10" y="20" width="70" height="35" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><circle cx="20" cy="27" r="5" fill="#E53935"/><circle cx="70" cy="27" r="5" fill="#42A5F5"/><circle cx="20" cy="48" r="5" fill="#66BB6A"/><circle cx="70" cy="48" r="5" fill="#FDD835"/>`) },
      { id: 'b', label: 'Rectangle with 2 dots (green, yellow)', visual: opt(`<rect x="10" y="20" width="70" height="35" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><circle cx="20" cy="45" r="5" fill="#66BB6A"/><circle cx="70" cy="45" r="5" fill="#FDD835"/>`) },
      { id: 'c', label: 'Rectangle with 2 dots (red, blue)', visual: opt(`<rect x="10" y="20" width="70" height="35" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><circle cx="20" cy="27" r="5" fill="#E53935"/><circle cx="70" cy="27" r="5" fill="#42A5F5"/>`) },
      { id: 'd', label: 'Rectangle with 0 dots', visual: opt(`<rect x="10" y="20" width="70" height="35" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/>`) },
    ],
    correctAnswerId: 'b',
    explanation: 'The top folds down, hiding the red and blue dots (they were on top). The green and yellow dots on the bottom corners stay visible. You see 2 dots.',
    hint: 'Which dots are on the top half and which are on the bottom? The top half folds inside.',
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

  // pf-h-004: Square with blue left half and a yellow star on the blue half.
  // Fold left onto right. Result: tall rectangle with star visible, blue front.
  {
    id: 'pf-h-004',
    category: 'paper-folding',
    difficulty: 'hard',
    prompt: 'The blue half has a star on it. The left side folds onto the right. What do you see?',
    visual: qSvg(
      paper(10, 10, 140) +
      `<rect x="10" y="10" width="70" height="140" fill="#42A5F5" stroke="none"/>` +
      `<rect x="10" y="10" width="140" height="140" fill="none" stroke="#999" stroke-width="2"/>` +
      `<text x="45" y="85" text-anchor="middle" font-size="30">⭐</text>` +
      foldLine(80, 10, 80, 150) +
      foldArrow(30, 80, 120, 80)
    ),
    options: [
      { id: 'a', label: 'Blue rectangle with star', visual: opt(`<rect x="23" y="5" width="38" height="60" fill="#42A5F5" stroke="#999" stroke-width="2" rx="2"/><text x="42" y="42" text-anchor="middle" font-size="18">⭐</text>`) },
      { id: 'b', label: 'White rectangle with star', visual: opt(`<rect x="23" y="5" width="38" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><text x="42" y="42" text-anchor="middle" font-size="18">⭐</text>`) },
      { id: 'c', label: 'Blue rectangle no star', visual: opt(`<rect x="23" y="5" width="38" height="60" fill="#42A5F5" stroke="#999" stroke-width="2" rx="2"/>`) },
      { id: 'd', label: 'White rectangle no star', visual: opt(`<rect x="23" y="5" width="38" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/>`) },
    ],
    correctAnswerId: 'a',
    explanation: 'The blue left half (with the star) folds onto the white right half. The blue side with the star faces you. You see a blue rectangle with a star.',
    hint: 'The blue side with the star flips over. Which side faces you -- the blue side or the white side?',
  },

  // pf-h-005: Square with stripes only on bottom half. Fold bottom up then fold left onto right.
  // Result: small square, stripes on front.
  {
    id: 'pf-h-005',
    category: 'paper-folding',
    difficulty: 'hard',
    prompt: 'The bottom half has stripes. First the bottom folds up, then the left folds onto the right. What do you see?',
    visual: qSvg3(
      // Panel 1: square with horizontal stripes on bottom half + fold 1 indicators
      paper(10, 10, 140) +
      `<line x1="10" y1="90" x2="150" y2="90" stroke="#FF7043" stroke-width="4"/>` +
      `<line x1="10" y1="105" x2="150" y2="105" stroke="#FF7043" stroke-width="4"/>` +
      `<line x1="10" y1="120" x2="150" y2="120" stroke="#FF7043" stroke-width="4"/>` +
      `<line x1="10" y1="135" x2="150" y2="135" stroke="#FF7043" stroke-width="4"/>` +
      `<rect x="10" y="10" width="140" height="140" fill="none" stroke="#999" stroke-width="2"/>` +
      foldLine(10, 80, 150, 80) +
      foldArrow(140, 130, 140, 40),
      // Panel 2: wide rectangle after fold 1 (stripes on front) + fold 2 indicators
      `<rect x="10" y="45" width="140" height="70" fill="#FFF" stroke="#999" stroke-width="2"/>` +
      `<line x1="10" y1="55" x2="150" y2="55" stroke="#FF7043" stroke-width="3"/>` +
      `<line x1="10" y1="67" x2="150" y2="67" stroke="#FF7043" stroke-width="3"/>` +
      `<line x1="10" y1="79" x2="150" y2="79" stroke="#FF7043" stroke-width="3"/>` +
      `<line x1="10" y1="91" x2="150" y2="91" stroke="#FF7043" stroke-width="3"/>` +
      `<rect x="10" y="45" width="140" height="70" fill="none" stroke="#999" stroke-width="2"/>` +
      foldLine(80, 45, 80, 115) +
      foldArrow(30, 80, 120, 80)
    ),
    options: [
      { id: 'a', label: 'Small square with stripes', visual: opt(`<rect x="20" y="10" width="45" height="45" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><line x1="20" y1="18" x2="65" y2="18" stroke="#FF7043" stroke-width="3"/><line x1="20" y1="28" x2="65" y2="28" stroke="#FF7043" stroke-width="3"/><line x1="20" y1="38" x2="65" y2="38" stroke="#FF7043" stroke-width="3"/><line x1="20" y1="48" x2="65" y2="48" stroke="#FF7043" stroke-width="3"/>`) },
      { id: 'b', label: 'Small plain square', visual: opt(`<rect x="20" y="10" width="45" height="45" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/>`) },
      { id: 'c', label: 'Small rectangle with stripes', visual: opt(`<rect x="10" y="22" width="65" height="30" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><line x1="10" y1="28" x2="75" y2="28" stroke="#FF7043" stroke-width="2.5"/><line x1="10" y1="36" x2="75" y2="36" stroke="#FF7043" stroke-width="2.5"/><line x1="10" y1="44" x2="75" y2="44" stroke="#FF7043" stroke-width="2.5"/>`) },
      { id: 'd', label: 'Small triangle with stripes', visual: opt(`<polygon points="42,10 15,55 70,55" fill="#FFF" stroke="#999" stroke-width="2"/><line x1="25" y1="35" x2="60" y2="35" stroke="#FF7043" stroke-width="2.5"/><line x1="20" y1="45" x2="65" y2="45" stroke="#FF7043" stroke-width="2.5"/>`) },
    ],
    correctAnswerId: 'a',
    explanation: 'First fold: bottom up makes a wide rectangle with stripes on front. Second fold: left onto right makes a small square. The stripes are still facing you.',
    hint: 'After the first fold, the stripes face you. The second fold just makes it smaller. Does the front side change?',
  },

  // pf-h-006: Square with a circle in each half (left=red, right=blue). Fold right onto left.
  // Result: tall rectangle, blue circle on front (covering red circle behind it).
  {
    id: 'pf-h-006',
    category: 'paper-folding',
    difficulty: 'hard',
    prompt: 'There is a red circle on the left and a blue circle on the right. The right side folds onto the left. What do you see?',
    visual: qSvg(
      paper(10, 10, 140) +
      `<circle cx="45" cy="80" r="20" fill="#EF5350" stroke="#C62828" stroke-width="1.5"/>` +
      `<circle cx="115" cy="80" r="20" fill="#42A5F5" stroke="#1565C0" stroke-width="1.5"/>` +
      foldLine(80, 10, 80, 150) +
      foldArrow(130, 40, 50, 40)
    ),
    options: [
      { id: 'a', label: 'Rectangle with red circle', visual: opt(`<rect x="23" y="5" width="38" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><circle cx="42" cy="35" r="12" fill="#EF5350" stroke="#C62828" stroke-width="1.5"/>`) },
      { id: 'b', label: 'Rectangle with blue circle', visual: opt(`<rect x="23" y="5" width="38" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><circle cx="42" cy="35" r="12" fill="#42A5F5" stroke="#1565C0" stroke-width="1.5"/>`) },
      { id: 'c', label: 'Rectangle with both circles', visual: opt(`<rect x="23" y="5" width="38" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><circle cx="36" cy="35" r="10" fill="#EF5350" stroke="#C62828" stroke-width="1"/><circle cx="50" cy="35" r="10" fill="#42A5F5" stroke="#1565C0" stroke-width="1"/>`) },
      { id: 'd', label: 'Rectangle with no circles', visual: opt(`<rect x="23" y="5" width="38" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/>`) },
    ],
    correctAnswerId: 'b',
    explanation: 'The right (blue circle) folds onto the left (red circle). The blue circle ends up on top, covering the red circle behind it. You only see the blue circle.',
    hint: 'Which circle is on the side that folds on top? That one will cover the other.',
  },

  // pf-h-007: Square with colored corners (red TL, blue TR, green BL, yellow BR).
  // Fold top-right to bottom-left diagonally. Result: triangle showing green BL corner and yellow BR area,
  // with red on top (from TL folding over) and blue hidden.
  {
    id: 'pf-h-007',
    category: 'paper-folding',
    difficulty: 'hard',
    prompt: 'Each corner has a different color. The paper folds along the diagonal. Which colors can you see?',
    visual: qSvg(
      paper(10, 10, 140) +
      `<polygon points="10,10 40,10 10,40" fill="#EF5350" stroke="none"/>` +
      `<polygon points="150,10 120,10 150,40" fill="#42A5F5" stroke="none"/>` +
      `<polygon points="10,150 40,150 10,120" fill="#66BB6A" stroke="none"/>` +
      `<polygon points="150,150 120,150 150,120" fill="#FDD835" stroke="none"/>` +
      `<rect x="10" y="10" width="140" height="140" fill="none" stroke="#999" stroke-width="2"/>` +
      foldLine(150, 10, 10, 150) +
      foldArrow(130, 30, 30, 130)
    ),
    options: [
      { id: 'a', label: 'Triangle with green and red corners', visual: opt(`<polygon points="10,8 10,62 78,62" fill="#FFF" stroke="#999" stroke-width="2"/><polygon points="10,62 25,62 10,48" fill="#66BB6A" stroke="none"/><polygon points="10,8 10,22 22,8" fill="#EF5350" stroke="none" opacity="0.7"/><polygon points="10,8 10,62 78,62" fill="none" stroke="#999" stroke-width="2"/>`) },
      { id: 'b', label: 'Triangle with blue and yellow corners', visual: opt(`<polygon points="10,8 10,62 78,62" fill="#FFF" stroke="#999" stroke-width="2"/><polygon points="10,62 25,62 10,48" fill="#42A5F5" stroke="none"/><polygon points="10,8 10,22 22,8" fill="#FDD835" stroke="none"/>`) },
      { id: 'c', label: 'Triangle with all 4 colors', visual: opt(`<polygon points="10,8 10,62 78,62" fill="#FFF" stroke="#999" stroke-width="2"/><polygon points="10,62 25,62 10,48" fill="#66BB6A" stroke="none"/><polygon points="10,8 10,22 22,8" fill="#EF5350" stroke="none"/><polygon points="78,62 60,62 78,48" fill="#FDD835" stroke="none"/><polygon points="45,8 55,8 45,18" fill="#42A5F5" stroke="none"/>`) },
      { id: 'd', label: 'Plain white triangle', visual: opt(`<polygon points="10,8 10,62 78,62" fill="#FFF" stroke="#999" stroke-width="2"/>`) },
    ],
    correctAnswerId: 'a',
    explanation: 'Folding the top-right down to the bottom-left: the green corner (bottom-left) stays visible. The red corner (top-left) folds over but stays on the front face of the triangle. Blue and yellow end up hidden.',
    hint: 'The bottom-left triangle stays as is. The top-right triangle folds over it. Which colors were in which triangle?',
  },

  // pf-h-008: Square with a heart in the center. Fold in half vertically (left onto right),
  // then in half horizontally (top down). Result: quarter-size square, part of heart visible in corner.
  {
    id: 'pf-h-008',
    category: 'paper-folding',
    difficulty: 'hard',
    prompt: 'There is a heart in the center. The paper folds twice. Can you still see part of the heart?',
    visual: qSvg3(
      // Panel 1: square with heart in center + fold 1 indicators
      paper(10, 10, 140) +
      `<path d="M80,55 C80,40 60,35 60,50 C60,65 80,80 80,80 C80,80 100,65 100,50 C100,35 80,40 80,55 Z" fill="#E91E63" stroke="#AD1457" stroke-width="1.5"/>` +
      `<rect x="10" y="10" width="140" height="140" fill="none" stroke="#999" stroke-width="2"/>` +
      foldLine(80, 10, 80, 150) +
      foldArrow(30, 80, 120, 80),
      // Panel 2: tall rectangle after fold 1, half heart visible on right edge + fold 2 indicators
      `<rect x="30" y="10" width="70" height="140" fill="#FFF" stroke="#999" stroke-width="2"/>` +
      `<path d="M30,55 C30,40 50,35 50,50 C50,65 30,80 30,80 C30,80 30,55 30,55 Z" fill="#E91E63" stroke="#AD1457" stroke-width="1" opacity="0.7"/>` +
      `<rect x="30" y="10" width="70" height="140" fill="none" stroke="#999" stroke-width="2"/>` +
      foldLine(30, 80, 100, 80) +
      foldArrow(65, 30, 65, 120)
    ),
    options: [
      { id: 'a', label: 'Small square with partial heart', visual: opt(`<rect x="20" y="10" width="45" height="45" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><path d="M20,25 C20,18 30,16 30,22 C30,30 20,36 20,36 Z" fill="#E91E63" stroke="#AD1457" stroke-width="1" opacity="0.7"/>`) },
      { id: 'b', label: 'Small square no heart', visual: opt(`<rect x="20" y="10" width="45" height="45" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/>`) },
      { id: 'c', label: 'Small square with full heart', visual: opt(`<rect x="20" y="10" width="45" height="45" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><path d="M42,22 C42,16 35,14 35,20 C35,26 42,30 42,30 C42,30 49,26 49,20 C49,14 42,16 42,22 Z" fill="#E91E63" stroke="#AD1457" stroke-width="1"/>`) },
      { id: 'd', label: 'Small triangle with heart', visual: opt(`<polygon points="20,55 65,55 42,12" fill="#FFF" stroke="#999" stroke-width="2"/><path d="M42,25 C42,20 37,18 37,23 C37,28 42,32 42,32 C42,32 47,28 47,23 C47,18 42,20 42,25 Z" fill="#E91E63" stroke="#AD1457" stroke-width="1"/>`) },
    ],
    correctAnswerId: 'a',
    explanation: 'The heart is in the center spanning both halves. Fold 1 (left onto right): the left half of the heart folds onto the right edge, so part of the heart is visible on the left edge of the rectangle. Fold 2 (top down): a piece of the heart is still visible in the corner of the small square.',
    hint: 'The heart is in the very center, so each fold only hides part of it. Some of the heart peeks out at the edge.',
  },
];
