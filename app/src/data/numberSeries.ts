import type { Question } from '../types';

/**
 * Number Series (CogAT Quantitative Battery style)
 *
 * Format: A sequence of numbers (shown as beads on an abacus in real CogAT).
 * The child identifies the pattern and finds the next number.
 *
 * We show the numbers visually with dots/circles to stay picture-based.
 */

function makeSeriesSvg(numbers: number[], _highlightLast?: boolean): string {
  const w = 400;
  const h = 180;
  const count = numbers.length + 1; // +1 for the question mark slot
  const slotW = w / count;

  let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;
  svg += `<rect x="0" y="0" width="${w}" height="${h}" rx="16" fill="#F5F5F5" stroke="#BDBDBD" stroke-width="1.5"/>`;

  // Draw "abacus" rods
  numbers.forEach((n, i) => {
    const cx = slotW * i + slotW / 2;
    // Rod line
    svg += `<line x1="${cx}" y1="20" x2="${cx}" y2="140" stroke="#8D6E63" stroke-width="3" stroke-linecap="round"/>`;
    // Beads
    const beadR = Math.min(14, (120 / Math.max(n, 1)) * 0.4);
    const startY = 140 - n * (beadR * 2 + 2);
    for (let b = 0; b < n; b++) {
      const by = startY + b * (beadR * 2 + 2) + beadR;
      const color = i % 2 === 0 ? '#42A5F5' : '#66BB6A';
      svg += `<circle cx="${cx}" cy="${by}" r="${beadR}" fill="${color}" stroke="#fff" stroke-width="1"/>`;
    }
    // Number label below
    svg += `<text x="${cx}" y="${h - 5}" text-anchor="middle" font-size="18" font-weight="bold" fill="#424242">${n}</text>`;
  });

  // Question mark slot
  const qcx = slotW * numbers.length + slotW / 2;
  svg += `<line x1="${qcx}" y1="20" x2="${qcx}" y2="140" stroke="#8D6E63" stroke-width="3" stroke-linecap="round" stroke-dasharray="6,4"/>`;
  svg += `<text x="${qcx}" y="90" text-anchor="middle" font-size="36" fill="#E65100">?</text>`;

  svg += `</svg>`;
  return svg;
}

/** Small SVG for answer option showing beads on an abacus rod */
function makeBeadOptionSvg(count: number): string {
  const W = 50, H = 52;
  const cx = W / 2;
  const beadR = Math.min(7, Math.max(3, (H - 16) / (count * 2.3)));
  const totalBeadH = count * (beadR * 2 + 1.5);
  const startY = H - 6 - totalBeadH;

  let svg = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">`;
  svg += `<line x1="${cx}" y1="4" x2="${cx}" y2="${H - 4}" stroke="#8D6E63" stroke-width="2.5" stroke-linecap="round"/>`;
  for (let b = 0; b < count; b++) {
    const by = startY + b * (beadR * 2 + 1.5) + beadR;
    const color = b % 2 === 0 ? '#42A5F5' : '#66BB6A';
    svg += `<circle cx="${cx}" cy="${by}" r="${beadR}" fill="${color}" stroke="#fff" stroke-width="0.5"/>`;
  }
  svg += `</svg>`;
  return svg;
}

export const numberSeries: Question[] = [
  // ===== EASY =====
  {
    id: 'ns-e-001',
    category: 'number-series',
    difficulty: 'easy',
    prompt: 'Count the beads on each rod. What comes next?',
    visual: makeSeriesSvg([1, 2, 3, 4, 5]),
    options: [
      { id: 'a', label: '6', visual: makeBeadOptionSvg(6) },
      { id: 'b', label: '7', visual: makeBeadOptionSvg(7) },
      { id: 'c', label: '4', visual: makeBeadOptionSvg(4) },
      { id: 'd', label: '5', visual: makeBeadOptionSvg(5) },
    ],
    correctAnswerId: 'a',
    explanation: 'The pattern is counting by 1: 1, 2, 3, 4, 5, so the next number is 6.',
    hint: 'Each rod has one more bead than the one before it.',
  },
  {
    id: 'ns-e-002',
    category: 'number-series',
    difficulty: 'easy',
    prompt: 'Look at the pattern. What number comes next?',
    visual: makeSeriesSvg([2, 4, 6, 8]),
    options: [
      { id: 'a', label: '9', visual: makeBeadOptionSvg(9) },
      { id: 'b', label: '10', visual: makeBeadOptionSvg(10) },
      { id: 'c', label: '11', visual: makeBeadOptionSvg(11) },
      { id: 'd', label: '12', visual: makeBeadOptionSvg(12) },
    ],
    correctAnswerId: 'b',
    explanation: 'The pattern is counting by 2: 2, 4, 6, 8, so the next number is 10.',
    hint: 'How many beads are added each time?',
  },
  {
    id: 'ns-e-003',
    category: 'number-series',
    difficulty: 'easy',
    prompt: 'These numbers follow a rule. What number is next?',
    visual: makeSeriesSvg([5, 4, 3, 2]),
    options: [
      { id: 'a', label: '0', visual: makeBeadOptionSvg(0) },
      { id: 'b', label: '1', visual: makeBeadOptionSvg(1) },
      { id: 'c', label: '3', visual: makeBeadOptionSvg(3) },
      { id: 'd', label: '2', visual: makeBeadOptionSvg(2) },
    ],
    correctAnswerId: 'b',
    explanation: 'The pattern is counting down by 1: 5, 4, 3, 2, so the next number is 1.',
    hint: 'The numbers are getting smaller. By how much?',
  },
  {
    id: 'ns-e-004',
    category: 'number-series',
    difficulty: 'easy',
    prompt: 'What number comes after in the pattern?',
    visual: makeSeriesSvg([1, 3, 5, 7]),
    options: [
      { id: 'a', label: '8', visual: makeBeadOptionSvg(8) },
      { id: 'b', label: '9', visual: makeBeadOptionSvg(9) },
      { id: 'c', label: '10', visual: makeBeadOptionSvg(10) },
      { id: 'd', label: '11', visual: makeBeadOptionSvg(11) },
    ],
    correctAnswerId: 'b',
    explanation: 'The pattern is counting by 2 (odd numbers): 1, 3, 5, 7, so the next is 9.',
    hint: 'Each time, we skip one number.',
  },
  {
    id: 'ns-e-005',
    category: 'number-series',
    difficulty: 'easy',
    prompt: 'Find the pattern and pick the next number.',
    visual: makeSeriesSvg([2, 2, 2, 2]),
    options: [
      { id: 'a', label: '1', visual: makeBeadOptionSvg(1) },
      { id: 'b', label: '2', visual: makeBeadOptionSvg(2) },
      { id: 'c', label: '3', visual: makeBeadOptionSvg(3) },
      { id: 'd', label: '4', visual: makeBeadOptionSvg(4) },
    ],
    correctAnswerId: 'b',
    explanation: 'The pattern is all the same: 2, 2, 2, 2, so the next number is 2.',
    hint: 'Does the number change each time?',
  },
  {
    id: 'ns-e-006',
    category: 'number-series',
    difficulty: 'easy',
    prompt: 'What number should be on the next rod?',
    visual: makeSeriesSvg([3, 4, 5, 6, 7]),
    options: [
      { id: 'a', label: '7', visual: makeBeadOptionSvg(7) },
      { id: 'b', label: '8', visual: makeBeadOptionSvg(8) },
      { id: 'c', label: '9', visual: makeBeadOptionSvg(9) },
      { id: 'd', label: '10', visual: makeBeadOptionSvg(10) },
    ],
    correctAnswerId: 'b',
    explanation: 'The pattern is counting by 1: 3, 4, 5, 6, 7, so the next number is 8.',
  },
  {
    id: 'ns-e-007',
    category: 'number-series',
    difficulty: 'easy',
    prompt: 'Count carefully and find what comes next.',
    visual: makeSeriesSvg([10, 9, 8, 7]),
    options: [
      { id: 'a', label: '5', visual: makeBeadOptionSvg(5) },
      { id: 'b', label: '6', visual: makeBeadOptionSvg(6) },
      { id: 'c', label: '7', visual: makeBeadOptionSvg(7) },
      { id: 'd', label: '4', visual: makeBeadOptionSvg(4) },
    ],
    correctAnswerId: 'b',
    explanation: 'The pattern is counting down by 1: 10, 9, 8, 7, so the next number is 6.',
  },
  // ===== MEDIUM =====
  {
    id: 'ns-m-001',
    category: 'number-series',
    difficulty: 'medium',
    prompt: 'Study the pattern carefully. What number comes next?',
    visual: makeSeriesSvg([3, 6, 9, 12]),
    options: [
      { id: 'a', label: '13', visual: makeBeadOptionSvg(13) },
      { id: 'b', label: '14', visual: makeBeadOptionSvg(14) },
      { id: 'c', label: '15', visual: makeBeadOptionSvg(15) },
      { id: 'd', label: '16', visual: makeBeadOptionSvg(16) },
    ],
    correctAnswerId: 'c',
    explanation: 'The pattern is counting by 3: 3, 6, 9, 12, so the next number is 15.',
    hint: 'How many beads are added each time?',
  },
  {
    id: 'ns-m-002',
    category: 'number-series',
    difficulty: 'medium',
    prompt: 'This pattern goes up and down! What comes next?',
    visual: makeSeriesSvg([1, 3, 1, 3, 1]),
    options: [
      { id: 'a', label: '1', visual: makeBeadOptionSvg(1) },
      { id: 'b', label: '2', visual: makeBeadOptionSvg(2) },
      { id: 'c', label: '3', visual: makeBeadOptionSvg(3) },
      { id: 'd', label: '4', visual: makeBeadOptionSvg(4) },
    ],
    correctAnswerId: 'c',
    explanation: 'The pattern alternates: 1, 3, 1, 3, 1 — so the next is 3.',
    hint: 'Do you see the numbers repeating?',
  },
  {
    id: 'ns-m-003',
    category: 'number-series',
    difficulty: 'medium',
    prompt: 'Look at the beads carefully. What number comes next?',
    visual: makeSeriesSvg([10, 8, 6, 4]),
    options: [
      { id: 'a', label: '1', visual: makeBeadOptionSvg(1) },
      { id: 'b', label: '2', visual: makeBeadOptionSvg(2) },
      { id: 'c', label: '3', visual: makeBeadOptionSvg(3) },
      { id: 'd', label: '0', visual: makeBeadOptionSvg(0) },
    ],
    correctAnswerId: 'b',
    explanation: 'The pattern is counting down by 2: 10, 8, 6, 4, so the next number is 2.',
  },
  {
    id: 'ns-m-004',
    category: 'number-series',
    difficulty: 'medium',
    prompt: 'What is the next number in this sequence?',
    visual: makeSeriesSvg([2, 4, 3, 5, 4]),
    options: [
      { id: 'a', label: '5', visual: makeBeadOptionSvg(5) },
      { id: 'b', label: '6', visual: makeBeadOptionSvg(6) },
      { id: 'c', label: '3', visual: makeBeadOptionSvg(3) },
      { id: 'd', label: '7', visual: makeBeadOptionSvg(7) },
    ],
    correctAnswerId: 'b',
    explanation: 'The pattern alternates: +2, -1, +2, -1. So after 4, we add 2 to get 6.',
    hint: 'Look at every other number. Do you see two patterns mixed together?',
  },
  {
    id: 'ns-m-005',
    category: 'number-series',
    difficulty: 'medium',
    prompt: 'Find the rule and pick the missing number.',
    visual: makeSeriesSvg([1, 2, 4, 5, 7]),
    options: [
      { id: 'a', label: '8', visual: makeBeadOptionSvg(8) },
      { id: 'b', label: '9', visual: makeBeadOptionSvg(9) },
      { id: 'c', label: '10', visual: makeBeadOptionSvg(10) },
      { id: 'd', label: '11', visual: makeBeadOptionSvg(11) },
    ],
    correctAnswerId: 'a',
    explanation: 'The pattern is: +1, +2, +1, +2. So after 7, we add 1 to get 8.',
  },
  {
    id: 'ns-m-006',
    category: 'number-series',
    difficulty: 'medium',
    prompt: 'These numbers follow a tricky rule. What comes next?',
    visual: makeSeriesSvg([5, 10, 5, 10, 5]),
    options: [
      { id: 'a', label: '5', visual: makeBeadOptionSvg(5) },
      { id: 'b', label: '10', visual: makeBeadOptionSvg(10) },
      { id: 'c', label: '15', visual: makeBeadOptionSvg(15) },
      { id: 'd', label: '0', visual: makeBeadOptionSvg(0) },
    ],
    correctAnswerId: 'b',
    explanation: 'The pattern alternates between 5 and 10: 5, 10, 5, 10, 5 — so the next is 10.',
  },
  // ===== HARD =====
  {
    id: 'ns-h-001',
    category: 'number-series',
    difficulty: 'hard',
    prompt: 'This is a tough one! Find the pattern.',
    visual: makeSeriesSvg([1, 2, 4, 8]),
    options: [
      { id: 'a', label: '10', visual: makeBeadOptionSvg(10) },
      { id: 'b', label: '12', visual: makeBeadOptionSvg(12) },
      { id: 'c', label: '14', visual: makeBeadOptionSvg(14) },
      { id: 'd', label: '16', visual: makeBeadOptionSvg(16) },
    ],
    correctAnswerId: 'd',
    explanation: 'Each number doubles: 1×2=2, 2×2=4, 4×2=8, 8×2=16.',
    hint: 'Is each number twice the one before?',
  },
  {
    id: 'ns-h-002',
    category: 'number-series',
    difficulty: 'hard',
    prompt: 'The numbers change in a special way. What comes next?',
    visual: makeSeriesSvg([1, 1, 2, 3, 5]),
    options: [
      { id: 'a', label: '6', visual: makeBeadOptionSvg(6) },
      { id: 'b', label: '7', visual: makeBeadOptionSvg(7) },
      { id: 'c', label: '8', visual: makeBeadOptionSvg(8) },
      { id: 'd', label: '9', visual: makeBeadOptionSvg(9) },
    ],
    correctAnswerId: 'c',
    explanation: 'Each number is the sum of the two before it: 1+1=2, 1+2=3, 2+3=5, 3+5=8. (Fibonacci pattern!)',
    hint: 'Try adding two numbers next to each other. What do you get?',
  },
  {
    id: 'ns-h-003',
    category: 'number-series',
    difficulty: 'hard',
    prompt: 'Look at how the gaps between numbers change. What comes next?',
    visual: makeSeriesSvg([1, 2, 4, 7, 11]),
    options: [
      { id: 'a', label: '14', visual: makeBeadOptionSvg(14) },
      { id: 'b', label: '15', visual: makeBeadOptionSvg(15) },
      { id: 'c', label: '16', visual: makeBeadOptionSvg(16) },
      { id: 'd', label: '17', visual: makeBeadOptionSvg(17) },
    ],
    correctAnswerId: 'c',
    explanation: 'The gaps grow by 1 each time: +1, +2, +3, +4, +5. So 11+5=16.',
    hint: 'Find the difference between each pair of numbers. Do the differences make a pattern?',
  },
  {
    id: 'ns-h-004',
    category: 'number-series',
    difficulty: 'hard',
    prompt: 'These numbers follow a special rule. Can you crack it?',
    visual: makeSeriesSvg([2, 3, 5, 8, 12]),
    options: [
      { id: 'a', label: '15', visual: makeBeadOptionSvg(15) },
      { id: 'b', label: '16', visual: makeBeadOptionSvg(16) },
      { id: 'c', label: '17', visual: makeBeadOptionSvg(17) },
      { id: 'd', label: '18', visual: makeBeadOptionSvg(18) },
    ],
    correctAnswerId: 'c',
    explanation: 'The differences increase: +1, +2, +3, +4, +5. So 12+5=17.',
    hint: 'Look at how much is added each step. Does that amount change?',
  },
  {
    id: 'ns-h-005',
    category: 'number-series',
    difficulty: 'hard',
    prompt: 'What number is hiding at the end of this pattern?',
    visual: makeSeriesSvg([1, 3, 2, 4, 3]),
    options: [
      { id: 'a', label: '4', visual: makeBeadOptionSvg(4) },
      { id: 'b', label: '5', visual: makeBeadOptionSvg(5) },
      { id: 'c', label: '6', visual: makeBeadOptionSvg(6) },
      { id: 'd', label: '2', visual: makeBeadOptionSvg(2) },
    ],
    correctAnswerId: 'b',
    explanation: 'Two interleaved patterns: odd positions go 1, 2, 3... and even positions go 3, 4, 5... So next is 5.',
    hint: 'Look at every other number. Do you see a simpler pattern?',
  },
  {
    id: 'ns-h-006',
    category: 'number-series',
    difficulty: 'hard',
    prompt: 'This pattern is growing. What comes next?',
    visual: makeSeriesSvg([1, 4, 9, 16]),
    options: [
      { id: 'a', label: '20', visual: makeBeadOptionSvg(20) },
      { id: 'b', label: '23', visual: makeBeadOptionSvg(23) },
      { id: 'c', label: '25', visual: makeBeadOptionSvg(25) },
      { id: 'd', label: '24', visual: makeBeadOptionSvg(24) },
    ],
    correctAnswerId: 'c',
    explanation: 'These are square numbers: 1×1=1, 2×2=4, 3×3=9, 4×4=16, 5×5=25.',
    hint: 'The differences are: +3, +5, +7... What comes after +7?',
  },
];
