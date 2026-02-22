import type { Question } from '../types';

/**
 * Paper Folding (CogAT Nonverbal Battery style)
 *
 * Format: A multi-panel SVG shows a square piece of paper with markings
 * (colored sections, dots, shapes) and fold indicators (dashed lines + arrows).
 * The child picks the option that shows what the paper looks like after folding.
 *
 * Kindergarten level: No hole punching, only folding.
 */

// ---- Helper functions ----

/** Build a question SVG with two panels: original paper + fold instructions */
function qSvg(panel1: string, panel2: string): string {
  return `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">` +
    `<rect x="0" y="0" width="400" height="200" rx="16" fill="#FAFAFA"/>` +
    `<text x="100" y="22" text-anchor="middle" font-size="13" fill="#888">Before</text>` +
    `<g transform="translate(20,30)">${panel1}</g>` +
    `<path d="M192,90 L208,100 L192,110" fill="#666" stroke="none"/>` +
    `<line x1="185" y1="100" x2="208" y2="100" stroke="#666" stroke-width="2"/>` +
    `<text x="310" y="22" text-anchor="middle" font-size="13" fill="#888">After folding</text>` +
    `<g transform="translate(220,30)">${panel2}</g>` +
    `</svg>`;
}

/** Build a three-panel question SVG for two sequential folds */
function qSvg3(panel1: string, panel2: string, panel3: string): string {
  return `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">` +
    `<rect x="0" y="0" width="400" height="200" rx="16" fill="#FAFAFA"/>` +
    `<text x="60" y="20" text-anchor="middle" font-size="11" fill="#888">Start</text>` +
    `<g transform="translate(10,26) scale(0.75)">${panel1}</g>` +
    `<path d="M125,90 L135,96 L125,102" fill="#666" stroke="none"/>` +
    `<line x1="120" y1="96" x2="135" y2="96" stroke="#666" stroke-width="1.5"/>` +
    `<text x="195" y="20" text-anchor="middle" font-size="11" fill="#888">Fold 1</text>` +
    `<g transform="translate(145,26) scale(0.75)">${panel2}</g>` +
    `<path d="M260,90 L270,96 L260,102" fill="#666" stroke="none"/>` +
    `<line x1="255" y1="96" x2="270" y2="96" stroke="#666" stroke-width="1.5"/>` +
    `<text x="340" y="20" text-anchor="middle" font-size="11" fill="#888">Fold 2 = ?</text>` +
    `<g transform="translate(280,26) scale(0.75)">${panel3}</g>` +
    `</svg>`;
}

/** Build an option SVG */
function opt(inner: string): string {
  return `<svg viewBox="0 0 90 70" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
}

// ---- Paper drawing helpers ----

/** Draw a square paper outline */
function paper(x: number, y: number, s: number): string {
  return `<rect x="${x}" y="${y}" width="${s}" height="${s}" fill="#FFF" stroke="#999" stroke-width="2"/>`;
}

/** Draw a dashed fold line */
function foldLine(x1: number, y1: number, x2: number, y2: number): string {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#E53935" stroke-width="2" stroke-dasharray="6,4"/>`;
}

/** Draw a curved fold arrow */
function foldArrow(fx: number, fy: number, tx: number, ty: number): string {
  const mx = (fx + tx) / 2;
  const my = (fy + ty) / 2;
  // offset control point perpendicular to the line
  const dx = tx - fx;
  const dy = ty - fy;
  const cx = mx - dy * 0.4;
  const cy = my + dx * 0.4;
  return `<path d="M${fx},${fy} Q${cx},${cy} ${tx},${ty}" fill="none" stroke="#E53935" stroke-width="2" marker-end="url(#arrowPF)"/>` +
    `<defs><marker id="arrowPF" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 Z" fill="#E53935"/></marker></defs>`;
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
      // Panel 1: square, left half blue, right half white, vertical dashed line, arrow right-to-left
      paper(10, 10, 140) +
      `<rect x="10" y="10" width="70" height="140" fill="#42A5F5" stroke="none"/>` +
      `<rect x="10" y="10" width="140" height="140" fill="none" stroke="#999" stroke-width="2"/>` +
      foldLine(80, 10, 80, 150) +
      foldArrow(130, 30, 50, 30),
      // Panel 2: result tall rectangle (half width), blue front
      `<rect x="30" y="10" width="70" height="140" fill="#42A5F5" stroke="#999" stroke-width="2"/>` +
      `<text x="65" y="100" text-anchor="middle" font-size="26" fill="#1565C0">?</text>`
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

  // pf-e-002: Square with red dot in top-left. Horizontal fold (top down).
  // Result: wide rectangle, dot hidden (folded inside).
  {
    id: 'pf-e-002',
    category: 'paper-folding',
    difficulty: 'easy',
    prompt: 'The paper folds along the dashed line. What does it look like after folding?',
    visual: qSvg(
      // Panel 1: square, red dot top-left, horizontal dashed line, arrow top-to-bottom
      paper(10, 10, 140) +
      `<circle cx="45" cy="45" r="12" fill="#E53935"/>` +
      foldLine(10, 80, 150, 80) +
      foldArrow(80, 30, 80, 120),
      // Panel 2: wide rectangle (bottom half height), no dot visible
      `<rect x="10" y="45" width="140" height="70" fill="#FFF" stroke="#999" stroke-width="2"/>` +
      `<text x="80" y="90" text-anchor="middle" font-size="26" fill="#999">?</text>`
    ),
    options: [
      { id: 'a', label: 'Wide rectangle with red dot', visual: opt(`<rect x="10" y="20" width="70" height="35" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><circle cx="30" cy="37" r="7" fill="#E53935"/>`) },
      { id: 'b', label: 'Wide rectangle no dot', visual: opt(`<rect x="10" y="20" width="70" height="35" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/>`) },
      { id: 'c', label: 'Triangle with red dot', visual: opt(`<polygon points="45,15 10,55 80,55" fill="#FFF" stroke="#999" stroke-width="2"/><circle cx="35" cy="45" r="7" fill="#E53935"/>`) },
      { id: 'd', label: 'Square with dot moved', visual: opt(`<rect x="15" y="5" width="60" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><circle cx="55" cy="50" r="7" fill="#E53935"/>`) },
    ],
    correctAnswerId: 'b',
    explanation: 'The top half folds down onto the bottom half. The dot was on top, so it gets folded inside and hidden. You see a plain white rectangle.',
    hint: 'When the top folds down, does the dot end up on the outside or the inside?',
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
      foldArrow(130, 130, 50, 130),
      // Result: tall rectangle, green front
      `<rect x="30" y="10" width="70" height="140" fill="#66BB6A" stroke="#999" stroke-width="2"/>` +
      `<text x="65" y="100" text-anchor="middle" font-size="26" fill="#2E7D32">?</text>`
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

  // pf-e-004: Square with yellow star in center. Horizontal fold (bottom up).
  // Result: wide rectangle, star visible on top part.
  {
    id: 'pf-e-004',
    category: 'paper-folding',
    difficulty: 'easy',
    prompt: 'The bottom folds up. What does the paper look like?',
    visual: qSvg(
      paper(10, 10, 140) +
      `<polygon points="80,45 85,60 100,60 88,70 92,85 80,75 68,85 72,70 60,60 75,60" fill="#FDD835" stroke="#F9A825" stroke-width="1.5"/>` +
      foldLine(10, 80, 150, 80) +
      foldArrow(20, 130, 20, 40),
      // Result: wide rectangle, star visible (star was at center, bottom half folds up so star from center shows on front)
      `<rect x="10" y="10" width="140" height="70" fill="#FFF" stroke="#999" stroke-width="2"/>` +
      `<polygon points="80,15 84,27 96,27 86,34 89,46 80,39 71,46 74,34 64,27 76,27" fill="#FDD835" stroke="#F9A825" stroke-width="1"/>` +
      `<text x="80" y="65" text-anchor="middle" font-size="16" fill="#999">?</text>`
    ),
    options: [
      { id: 'a', label: 'Wide rectangle with star', visual: opt(`<rect x="10" y="20" width="70" height="35" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><polygon points="45,24 48,32 56,32 50,37 52,45 45,41 38,45 40,37 34,32 42,32" fill="#FDD835" stroke="#F9A825" stroke-width="1"/>`) },
      { id: 'b', label: 'Wide rectangle no star', visual: opt(`<rect x="10" y="20" width="70" height="35" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/>`) },
      { id: 'c', label: 'Triangle with star', visual: opt(`<polygon points="45,10 10,55 80,55" fill="#FFF" stroke="#999" stroke-width="2"/><polygon points="45,30 48,38 55,38 50,42 52,48 45,44 38,48 40,42 35,38 42,38" fill="#FDD835" stroke="#F9A825" stroke-width="1"/>`) },
      { id: 'd', label: 'Tall rectangle with star', visual: opt(`<rect x="25" y="5" width="35" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><polygon points="42,20 45,28 53,28 47,33 49,41 42,37 35,41 37,33 31,28 39,28" fill="#FDD835" stroke="#F9A825" stroke-width="1"/>`) },
    ],
    correctAnswerId: 'a',
    explanation: 'When the bottom folds up, the star in the center ends up on the front of the wide rectangle. You can still see the star!',
    hint: 'The star is in the middle of the paper. When the bottom folds up, does the star get hidden or stay visible?',
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
      foldLine(10, 150, 150, 10) +
      foldArrow(130, 40, 50, 120),
      // Result: triangle
      `<polygon points="10,150 150,150 10,10" fill="#FFF" stroke="#999" stroke-width="2"/>` +
      `<polygon points="10,10 10,55 55,10" fill="#FF7043" stroke="none"/>` +
      `<polygon points="10,150 150,150 10,10" fill="none" stroke="#999" stroke-width="2"/>` +
      `<text x="50" y="120" text-anchor="middle" font-size="22" fill="#999">?</text>`
    ),
    options: [
      { id: 'a', label: 'Triangle with orange corner', visual: opt(`<polygon points="10,60 80,60 10,8" fill="#FFF" stroke="#999" stroke-width="2"/><polygon points="10,8 10,28 30,8" fill="#FF7043" stroke="none"/><polygon points="10,60 80,60 10,8" fill="none" stroke="#999" stroke-width="2"/>`) },
      { id: 'b', label: 'Plain triangle', visual: opt(`<polygon points="10,60 80,60 10,8" fill="#FFF" stroke="#999" stroke-width="2"/>`) },
      { id: 'c', label: 'Rectangle', visual: opt(`<rect x="10" y="15" width="70" height="40" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/>`) },
      { id: 'd', label: 'Triangle all orange', visual: opt(`<polygon points="10,60 80,60 10,8" fill="#FF7043" stroke="#999" stroke-width="2"/>`) },
    ],
    correctAnswerId: 'a',
    explanation: 'Folding diagonally makes a triangle. The orange corner from the top-right folds over and shows on the front.',
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
      foldArrow(140, 130, 140, 40),
      // Result: wide rectangle, purple on front
      `<rect x="10" y="45" width="140" height="70" fill="#AB47BC" stroke="#999" stroke-width="2"/>` +
      `<text x="80" y="90" text-anchor="middle" font-size="26" fill="#7B1FA2">?</text>`
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
      foldArrow(30, 80, 120, 80),
      // Result: tall rectangle, red dot visible bottom area, blue dot hidden behind
      `<rect x="30" y="10" width="70" height="140" fill="#FFF" stroke="#999" stroke-width="2"/>` +
      `<circle cx="65" cy="120" r="10" fill="#E53935"/>` +
      `<text x="65" y="60" text-anchor="middle" font-size="20" fill="#999">?</text>`
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
      foldArrow(40, 30, 30, 40),
      // Result: triangle (bottom-right half), green stripe folded and visible along hypotenuse edge
      `<polygon points="150,10 150,150 10,150" fill="#FFF" stroke="#999" stroke-width="2"/>` +
      `<polygon points="150,10 150,35 125,10" fill="#66BB6A" stroke="none"/>` +
      `<polygon points="150,10 150,150 10,150" fill="none" stroke="#999" stroke-width="2"/>` +
      `<text x="100" y="110" text-anchor="middle" font-size="22" fill="#999">?</text>`
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
      foldArrow(140, 20, 85, 75),
      // Result: square with triangle flap in top-right, partially covering circle
      paper(10, 10, 140) +
      `<circle cx="80" cy="80" r="18" fill="#E53935" stroke="#C62828" stroke-width="1.5"/>` +
      `<polygon points="80,10 150,10 150,80" fill="#EEE" stroke="#999" stroke-width="1.5"/>` +
      `<text x="80" y="135" text-anchor="middle" font-size="18" fill="#999">?</text>`
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
      foldArrow(80, 30, 80, 120),
      // Result: wide rectangle, red and blue behind, green and yellow visible
      `<rect x="10" y="45" width="70" height="70" fill="#66BB6A" stroke="none"/>` +
      `<rect x="80" y="45" width="70" height="70" fill="#FDD835" stroke="none"/>` +
      `<rect x="10" y="45" width="140" height="70" fill="none" stroke="#999" stroke-width="2"/>` +
      `<text x="80" y="90" text-anchor="middle" font-size="22" fill="#555">?</text>`
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
      `<polygon points="40,110 44,122 56,122 46,130 50,142 40,134 30,142 34,130 24,122 36,122" fill="#FDD835" stroke="#F9A825" stroke-width="1.5"/>` +
      foldLine(80, 10, 80, 150) +
      foldArrow(30, 80, 120, 80),
      // Result: tall rectangle, star visible (the left surface faces us after folding left onto right)
      `<rect x="30" y="10" width="70" height="140" fill="#FFF" stroke="#999" stroke-width="2"/>` +
      `<polygon points="65,110 68,119 76,119 70,125 73,133 65,128 57,133 60,125 54,119 62,119" fill="#FDD835" stroke="#F9A825" stroke-width="1"/>` +
      `<text x="65" y="55" text-anchor="middle" font-size="22" fill="#999">?</text>`
    ),
    options: [
      { id: 'a', label: 'Rectangle with star at bottom', visual: opt(`<rect x="25" y="5" width="35" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><polygon points="42,42 44,49 50,49 46,53 48,59 42,56 36,59 38,53 34,49 40,49" fill="#FDD835" stroke="#F9A825" stroke-width="1"/>`) },
      { id: 'b', label: 'Rectangle with star at top', visual: opt(`<rect x="25" y="5" width="35" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><polygon points="42,12 44,19 50,19 46,23 48,29 42,26 36,29 38,23 34,19 40,19" fill="#FDD835" stroke="#F9A825" stroke-width="1"/>`) },
      { id: 'c', label: 'Rectangle no star', visual: opt(`<rect x="25" y="5" width="35" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/>`) },
      { id: 'd', label: 'Triangle with star', visual: opt(`<polygon points="42,5 25,60 60,60" fill="#FFF" stroke="#999" stroke-width="2"/><polygon points="42,35 44,42 50,42 46,46 48,52 42,49 36,52 38,46 34,42 40,42" fill="#FDD835" stroke="#F9A825" stroke-width="1"/>`) },
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
      `<line x1="10" y1="10" x2="150" y2="150" stroke="#FF7043" stroke-width="12" stroke-linecap="round"/>` +
      `<rect x="10" y="10" width="140" height="140" fill="none" stroke="#999" stroke-width="2"/>` +
      foldLine(80, 10, 80, 150) +
      foldArrow(30, 40, 120, 40),
      // Result: tall rectangle with two diagonal lines crossing (original right half stripe + mirrored left half stripe)
      `<rect x="30" y="10" width="70" height="140" fill="#FFF" stroke="#999" stroke-width="2"/>` +
      `<line x1="100" y1="10" x2="30" y2="150" stroke="#FF7043" stroke-width="8" stroke-linecap="round"/>` +
      `<line x1="30" y1="10" x2="100" y2="150" stroke="#FF7043" stroke-width="8" stroke-linecap="round" opacity="0.5"/>` +
      `<text x="65" y="85" text-anchor="middle" font-size="16" fill="#999">?</text>`
    ),
    options: [
      { id: 'a', label: 'Rectangle with one diagonal', visual: opt(`<rect x="22" y="5" width="38" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><line x1="22" y1="65" x2="60" y2="5" stroke="#FF7043" stroke-width="5" stroke-linecap="round"/>`) },
      { id: 'b', label: 'Rectangle with X pattern', visual: opt(`<rect x="22" y="5" width="38" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><line x1="60" y1="5" x2="22" y2="65" stroke="#FF7043" stroke-width="5" stroke-linecap="round"/><line x1="22" y1="5" x2="60" y2="65" stroke="#FF7043" stroke-width="4" stroke-linecap="round" opacity="0.5"/>`) },
      { id: 'c', label: 'Rectangle with horizontal stripe', visual: opt(`<rect x="22" y="5" width="38" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><line x1="22" y1="35" x2="60" y2="35" stroke="#FF7043" stroke-width="5" stroke-linecap="round"/>`) },
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
      foldArrow(20, 30, 20, 120),
      // Result: wide rectangle, no dots visible
      `<rect x="10" y="45" width="140" height="70" fill="#FFF" stroke="#999" stroke-width="2"/>` +
      `<text x="80" y="88" text-anchor="middle" font-size="22" fill="#999">?</text>`
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
      foldArrow(140, 30, 140, 120),
      // Result: wide rectangle, no blue visible
      `<rect x="10" y="45" width="140" height="70" fill="#FFF" stroke="#999" stroke-width="2"/>` +
      `<text x="80" y="88" text-anchor="middle" font-size="22" fill="#999">?</text>`
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
      // Panel 1: original square with red corner top-left
      paper(10, 10, 140) +
      `<polygon points="10,10 60,10 10,60" fill="#EF5350" stroke="none"/>` +
      `<rect x="10" y="10" width="140" height="140" fill="none" stroke="#999" stroke-width="2"/>`,
      // Panel 2: after fold 1, tall rectangle, red corner visible top-right (mirrored)
      `<rect x="30" y="10" width="70" height="140" fill="#FFF" stroke="#999" stroke-width="2"/>` +
      `<polygon points="100,10 60,10 100,50" fill="#EF5350" stroke="none"/>` +
      `<rect x="30" y="10" width="70" height="140" fill="none" stroke="#999" stroke-width="2"/>` +
      foldLine(30, 80, 100, 80) +
      foldArrow(65, 30, 65, 120),
      // Panel 3: after fold 2, small square with red corner top-right
      `<rect x="30" y="45" width="70" height="70" fill="#FFF" stroke="#999" stroke-width="2"/>` +
      `<text x="65" y="88" text-anchor="middle" font-size="22" fill="#999">?</text>`
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
      foldArrow(80, 30, 80, 120),
      // Result: wide rectangle, only green and yellow dots visible (bottom corners)
      `<rect x="10" y="45" width="140" height="70" fill="#FFF" stroke="#999" stroke-width="2"/>` +
      `<circle cx="25" cy="100" r="8" fill="#66BB6A"/>` +
      `<circle cx="135" cy="100" r="8" fill="#FDD835"/>` +
      `<text x="80" y="80" text-anchor="middle" font-size="18" fill="#999">?</text>`
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
      // Panel 1: plain square
      paper(10, 10, 140) +
      `<rect x="10" y="10" width="140" height="140" fill="none" stroke="#999" stroke-width="2"/>` +
      foldLine(10, 10, 150, 150) +
      foldArrow(40, 30, 30, 40),
      // Panel 2: triangle from first fold
      `<polygon points="10,150 150,150 150,10" fill="#FFF" stroke="#999" stroke-width="2"/>` +
      foldLine(80, 80, 150, 150) +
      foldArrow(120, 80, 95, 135),
      // Panel 3: smaller triangle from second fold
      `<polygon points="10,150 150,150 80,80" fill="#FFF" stroke="#999" stroke-width="2"/>` +
      `<text x="80" y="135" text-anchor="middle" font-size="20" fill="#999">?</text>`
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
      `<polygon points="45,65 49,77 61,77 51,85 55,97 45,89 35,97 39,85 29,77 41,77" fill="#FDD835" stroke="#F9A825" stroke-width="1.5"/>` +
      foldLine(80, 10, 80, 150) +
      foldArrow(30, 80, 120, 80),
      // Result: tall rectangle, blue front, star visible (but mirrored position)
      `<rect x="30" y="10" width="70" height="140" fill="#42A5F5" stroke="#999" stroke-width="2"/>` +
      `<polygon points="65,65 69,77 79,77 71,85 74,97 65,89 56,97 59,85 51,77 61,77" fill="#FDD835" stroke="#F9A825" stroke-width="1"/>` +
      `<text x="65" y="40" text-anchor="middle" font-size="18" fill="#FFF">?</text>`
    ),
    options: [
      { id: 'a', label: 'Blue rectangle with star', visual: opt(`<rect x="23" y="5" width="38" height="60" fill="#42A5F5" stroke="#999" stroke-width="2" rx="2"/><polygon points="42,25 45,33 52,33 47,38 49,45 42,41 35,45 37,38 32,33 39,33" fill="#FDD835" stroke="#F9A825" stroke-width="1"/>`) },
      { id: 'b', label: 'White rectangle with star', visual: opt(`<rect x="23" y="5" width="38" height="60" fill="#FFF" stroke="#999" stroke-width="2" rx="2"/><polygon points="42,25 45,33 52,33 47,38 49,45 42,41 35,45 37,38 32,33 39,33" fill="#FDD835" stroke="#F9A825" stroke-width="1"/>`) },
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
      // Panel 1: square with horizontal stripes on bottom half
      paper(10, 10, 140) +
      `<line x1="10" y1="90" x2="150" y2="90" stroke="#FF7043" stroke-width="4"/>` +
      `<line x1="10" y1="105" x2="150" y2="105" stroke="#FF7043" stroke-width="4"/>` +
      `<line x1="10" y1="120" x2="150" y2="120" stroke="#FF7043" stroke-width="4"/>` +
      `<line x1="10" y1="135" x2="150" y2="135" stroke="#FF7043" stroke-width="4"/>` +
      `<rect x="10" y="10" width="140" height="140" fill="none" stroke="#999" stroke-width="2"/>` +
      foldLine(10, 80, 150, 80) +
      foldArrow(140, 130, 140, 40),
      // Panel 2: wide rectangle after fold 1 (stripes on front)
      `<rect x="10" y="45" width="140" height="70" fill="#FFF" stroke="#999" stroke-width="2"/>` +
      `<line x1="10" y1="55" x2="150" y2="55" stroke="#FF7043" stroke-width="3"/>` +
      `<line x1="10" y1="67" x2="150" y2="67" stroke="#FF7043" stroke-width="3"/>` +
      `<line x1="10" y1="79" x2="150" y2="79" stroke="#FF7043" stroke-width="3"/>` +
      `<line x1="10" y1="91" x2="150" y2="91" stroke="#FF7043" stroke-width="3"/>` +
      `<rect x="10" y="45" width="140" height="70" fill="none" stroke="#999" stroke-width="2"/>` +
      foldLine(80, 45, 80, 115) +
      foldArrow(30, 80, 120, 80),
      // Panel 3: small square after fold 2 (stripes on front)
      `<rect x="30" y="45" width="70" height="70" fill="#FFF" stroke="#999" stroke-width="2"/>` +
      `<text x="65" y="88" text-anchor="middle" font-size="18" fill="#999">?</text>`
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
      foldArrow(130, 40, 50, 40),
      // Result: tall rectangle, blue on top of red
      `<rect x="30" y="10" width="70" height="140" fill="#FFF" stroke="#999" stroke-width="2"/>` +
      `<circle cx="65" cy="80" r="16" fill="#42A5F5" stroke="#1565C0" stroke-width="1.5"/>` +
      `<text x="65" y="38" text-anchor="middle" font-size="18" fill="#999">?</text>`
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
      foldArrow(130, 30, 30, 130),
      // Result: triangle (bottom-left half), green visible, red folds onto it, blue hidden, yellow partially visible
      `<polygon points="10,10 10,150 150,150" fill="#FFF" stroke="#999" stroke-width="2"/>` +
      `<polygon points="10,150 40,150 10,120" fill="#66BB6A" stroke="none"/>` +
      `<polygon points="10,10 10,40 40,10" fill="#EF5350" stroke="none" opacity="0.7"/>` +
      `<polygon points="10,10 10,150 150,150" fill="none" stroke="#999" stroke-width="2"/>` +
      `<text x="50" y="120" text-anchor="middle" font-size="18" fill="#999">?</text>`
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
      // Panel 1: square with heart in center
      paper(10, 10, 140) +
      `<path d="M80,55 C80,40 60,35 60,50 C60,65 80,80 80,80 C80,80 100,65 100,50 C100,35 80,40 80,55 Z" fill="#E91E63" stroke="#AD1457" stroke-width="1.5"/>` +
      `<rect x="10" y="10" width="140" height="140" fill="none" stroke="#999" stroke-width="2"/>` +
      foldLine(80, 10, 80, 150) +
      foldArrow(30, 80, 120, 80),
      // Panel 2: tall rectangle after fold 1, half heart visible on right edge
      `<rect x="30" y="10" width="70" height="140" fill="#FFF" stroke="#999" stroke-width="2"/>` +
      `<path d="M30,55 C30,40 50,35 50,50 C50,65 30,80 30,80 C30,80 30,55 30,55 Z" fill="#E91E63" stroke="#AD1457" stroke-width="1" opacity="0.7"/>` +
      `<rect x="30" y="10" width="70" height="140" fill="none" stroke="#999" stroke-width="2"/>` +
      foldLine(30, 80, 100, 80) +
      foldArrow(65, 30, 65, 120),
      // Panel 3: small square after fold 2
      `<rect x="30" y="45" width="70" height="70" fill="#FFF" stroke="#999" stroke-width="2"/>` +
      `<text x="65" y="88" text-anchor="middle" font-size="18" fill="#999">?</text>`
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
