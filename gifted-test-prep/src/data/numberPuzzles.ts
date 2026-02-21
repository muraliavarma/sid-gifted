import type { Question } from '../types';

/**
 * Number Puzzles (CogAT Quantitative Battery style)
 *
 * Format: Two "trains" carrying objects. Each side must be equal.
 * One wagon has a missing number of objects (the unknown).
 * The child finds the value that makes both sides balance.
 *
 * Visually represented as balance scales or train equations.
 */

function makeBalanceSvg(
  leftParts: number[],
  rightParts: (number | '?')[],
  emoji: string = '🔵'
): string {
  const w = 400;
  const h = 200;
  const leftSum = leftParts.reduce((a, b) => a + b, 0);

  let svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`;

  // Balance beam
  svg += `<polygon points="200,180 185,170 215,170" fill="#795548"/>`;
  svg += `<line x1="40" y1="170" x2="360" y2="170" stroke="#795548" stroke-width="4" stroke-linecap="round"/>`;

  // Left platform
  svg += `<rect x="20" y="130" width="170" height="35" rx="8" fill="#E3F2FD" stroke="#1565C0" stroke-width="2"/>`;
  // Right platform
  svg += `<rect x="210" y="130" width="170" height="35" rx="8" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>`;

  // Equals sign in center
  svg += `<text x="200" y="155" text-anchor="middle" font-size="28" font-weight="bold" fill="#424242">=</text>`;

  // Left side: show trains/wagons with objects
  const leftWagonW = 160 / leftParts.length;
  leftParts.forEach((count, i) => {
    const wx = 25 + i * leftWagonW;
    // Wagon
    svg += `<rect x="${wx}" y="80" width="${leftWagonW - 5}" height="45" rx="6" fill="#BBDEFB" stroke="#1565C0" stroke-width="1.5"/>`;
    // Objects in wagon - show as number for clarity
    const itemStr = count <= 5
      ? emoji.repeat(count)
      : `${emoji}×${count}`;
    const fontSize = count <= 3 ? 18 : count <= 5 ? 14 : 14;
    svg += `<text x="${wx + (leftWagonW - 5) / 2}" y="108" text-anchor="middle" font-size="${fontSize}">${itemStr}</text>`;
    // Plus sign between wagons
    if (i < leftParts.length - 1) {
      svg += `<text x="${wx + leftWagonW - 2}" y="108" text-anchor="middle" font-size="18" fill="#1565C0">+</text>`;
    }
  });

  // Right side
  const rightWagonW = 160 / rightParts.length;
  rightParts.forEach((part, i) => {
    const wx = 215 + i * rightWagonW;
    svg += `<rect x="${wx}" y="80" width="${rightWagonW - 5}" height="45" rx="6" fill="#FFE0B2" stroke="#E65100" stroke-width="1.5"/>`;
    if (part === '?') {
      svg += `<text x="${wx + (rightWagonW - 5) / 2}" y="110" text-anchor="middle" font-size="30" fill="#E65100" font-weight="bold">?</text>`;
    } else {
      const itemStr = part <= 5
        ? emoji.repeat(part)
        : `${emoji}×${part}`;
      const fontSize = part <= 3 ? 18 : part <= 5 ? 14 : 14;
      svg += `<text x="${wx + (rightWagonW - 5) / 2}" y="108" text-anchor="middle" font-size="${fontSize}">${itemStr}</text>`;
    }
    if (i < rightParts.length - 1) {
      svg += `<text x="${wx + rightWagonW - 2}" y="108" text-anchor="middle" font-size="18" fill="#E65100">+</text>`;
    }
  });

  // Top label
  svg += `<text x="105" y="70" text-anchor="middle" font-size="16" fill="#1565C0" font-weight="bold">Left Side</text>`;
  svg += `<text x="300" y="70" text-anchor="middle" font-size="16" fill="#E65100" font-weight="bold">Right Side</text>`;

  // Sum labels
  svg += `<text x="105" y="30" text-anchor="middle" font-size="22" fill="#1565C0" font-weight="bold">${leftParts.join(' + ')} = ${leftSum}</text>`;
  const rightLabel = rightParts.map(p => p === '?' ? '?' : p).join(' + ');
  svg += `<text x="300" y="30" text-anchor="middle" font-size="22" fill="#E65100" font-weight="bold">${rightLabel}</text>`;

  svg += `</svg>`;
  return svg;
}

export const numberPuzzles: Question[] = [
  // ===== EASY =====
  {
    id: 'np-e-001',
    category: 'number-puzzles',
    difficulty: 'easy',
    prompt: 'Both sides must be equal. How many are missing on the right side?',
    visual: makeBalanceSvg([3], [2, '?'], '🍎'),
    options: [
      { id: 'a', label: '1' },
      { id: 'b', label: '2' },
      { id: 'c', label: '3' },
      { id: 'd', label: '4' },
    ],
    correctAnswerId: 'a',
    explanation: 'Left side has 3. Right side has 2 + ? = 3. So ? = 1.',
    hint: 'The left side equals 3. The right side has 2 plus something. What plus 2 equals 3?',
  },
  {
    id: 'np-e-002',
    category: 'number-puzzles',
    difficulty: 'easy',
    prompt: 'Make both sides the same! How many should go in the mystery box?',
    visual: makeBalanceSvg([5], [3, '?'], '⭐'),
    options: [
      { id: 'a', label: '1' },
      { id: 'b', label: '2' },
      { id: 'c', label: '3' },
      { id: 'd', label: '4' },
    ],
    correctAnswerId: 'b',
    explanation: 'Left side has 5. Right side has 3 + ? = 5. So ? = 2.',
    hint: 'What number plus 3 makes 5?',
  },
  {
    id: 'np-e-003',
    category: 'number-puzzles',
    difficulty: 'easy',
    prompt: 'Balance the scale! What number goes in the box?',
    visual: makeBalanceSvg([4], [1, '?'], '🎈'),
    options: [
      { id: 'a', label: '2' },
      { id: 'b', label: '3' },
      { id: 'c', label: '4' },
      { id: 'd', label: '5' },
    ],
    correctAnswerId: 'b',
    explanation: 'Left side has 4. Right side has 1 + ? = 4. So ? = 3.',
  },
  {
    id: 'np-e-004',
    category: 'number-puzzles',
    difficulty: 'easy',
    prompt: 'The left and right must be equal. Find the missing number.',
    visual: makeBalanceSvg([2, 1], ['?'], '🌸'),
    options: [
      { id: 'a', label: '2' },
      { id: 'b', label: '3' },
      { id: 'c', label: '4' },
      { id: 'd', label: '1' },
    ],
    correctAnswerId: 'b',
    explanation: 'Left side: 2 + 1 = 3. Right side: ? = 3.',
    hint: 'Add the numbers on the left side first.',
  },
  {
    id: 'np-e-005',
    category: 'number-puzzles',
    difficulty: 'easy',
    prompt: 'What goes in the box to make both sides equal?',
    visual: makeBalanceSvg([2, 2], [3, '?'], '🐟'),
    options: [
      { id: 'a', label: '1' },
      { id: 'b', label: '2' },
      { id: 'c', label: '3' },
      { id: 'd', label: '4' },
    ],
    correctAnswerId: 'a',
    explanation: 'Left side: 2 + 2 = 4. Right side: 3 + ? = 4. So ? = 1.',
  },
  {
    id: 'np-e-006',
    category: 'number-puzzles',
    difficulty: 'easy',
    prompt: 'Both trains must carry the same total. How many for the mystery wagon?',
    visual: makeBalanceSvg([1, 4], [2, '?'], '🌟'),
    options: [
      { id: 'a', label: '2' },
      { id: 'b', label: '3' },
      { id: 'c', label: '4' },
      { id: 'd', label: '5' },
    ],
    correctAnswerId: 'b',
    explanation: 'Left side: 1 + 4 = 5. Right side: 2 + ? = 5. So ? = 3.',
  },
  {
    id: 'np-e-007',
    category: 'number-puzzles',
    difficulty: 'easy',
    prompt: 'Help! One wagon is empty. How many should go in it?',
    visual: makeBalanceSvg([3, 2], ['?'], '🐱'),
    options: [
      { id: 'a', label: '3' },
      { id: 'b', label: '4' },
      { id: 'c', label: '5' },
      { id: 'd', label: '6' },
    ],
    correctAnswerId: 'c',
    explanation: 'Left side: 3 + 2 = 5. Right side must also be 5. So ? = 5.',
  },
  // ===== MEDIUM =====
  {
    id: 'np-m-001',
    category: 'number-puzzles',
    difficulty: 'medium',
    prompt: 'Make both sides equal. What is the missing number?',
    visual: makeBalanceSvg([3, 4], [5, '?'], '🎲'),
    options: [
      { id: 'a', label: '1' },
      { id: 'b', label: '2' },
      { id: 'c', label: '3' },
      { id: 'd', label: '4' },
    ],
    correctAnswerId: 'b',
    explanation: 'Left side: 3 + 4 = 7. Right side: 5 + ? = 7. So ? = 2.',
    hint: 'Add the left side first, then figure out what the right side needs.',
  },
  {
    id: 'np-m-002',
    category: 'number-puzzles',
    difficulty: 'medium',
    prompt: 'Balance the equation by finding the missing number.',
    visual: makeBalanceSvg([2, 3, 1], [4, '?'], '🔶'),
    options: [
      { id: 'a', label: '1' },
      { id: 'b', label: '2' },
      { id: 'c', label: '3' },
      { id: 'd', label: '4' },
    ],
    correctAnswerId: 'b',
    explanation: 'Left side: 2 + 3 + 1 = 6. Right side: 4 + ? = 6. So ? = 2.',
  },
  {
    id: 'np-m-003',
    category: 'number-puzzles',
    difficulty: 'medium',
    prompt: 'Both sides must add up to the same total. What is the missing piece?',
    visual: makeBalanceSvg([5, 3], [2, 4, '?'], '🌻'),
    options: [
      { id: 'a', label: '1' },
      { id: 'b', label: '2' },
      { id: 'c', label: '3' },
      { id: 'd', label: '4' },
    ],
    correctAnswerId: 'b',
    explanation: 'Left side: 5 + 3 = 8. Right side: 2 + 4 + ? = 8. So ? = 2.',
  },
  {
    id: 'np-m-004',
    category: 'number-puzzles',
    difficulty: 'medium',
    prompt: 'What number completes this puzzle?',
    visual: makeBalanceSvg([4, 2, 3], [1, '?'], '🎪'),
    options: [
      { id: 'a', label: '6' },
      { id: 'b', label: '7' },
      { id: 'c', label: '8' },
      { id: 'd', label: '9' },
    ],
    correctAnswerId: 'c',
    explanation: 'Left side: 4 + 2 + 3 = 9. Right side: 1 + ? = 9. So ? = 8.',
  },
  {
    id: 'np-m-005',
    category: 'number-puzzles',
    difficulty: 'medium',
    prompt: 'Help balance the trains! What goes in the mystery wagon?',
    visual: makeBalanceSvg([3, 3, 2], [4, '?'], '🦋'),
    options: [
      { id: 'a', label: '3' },
      { id: 'b', label: '4' },
      { id: 'c', label: '5' },
      { id: 'd', label: '6' },
    ],
    correctAnswerId: 'b',
    explanation: 'Left side: 3 + 3 + 2 = 8. Right side: 4 + ? = 8. So ? = 4.',
  },
  {
    id: 'np-m-006',
    category: 'number-puzzles',
    difficulty: 'medium',
    prompt: 'The scale must balance. Find the answer.',
    visual: makeBalanceSvg([2, 5], [3, 1, '?'], '🎯'),
    options: [
      { id: 'a', label: '2' },
      { id: 'b', label: '3' },
      { id: 'c', label: '4' },
      { id: 'd', label: '5' },
    ],
    correctAnswerId: 'b',
    explanation: 'Left side: 2 + 5 = 7. Right side: 3 + 1 + ? = 7. So ? = 3.',
  },
  // ===== HARD =====
  {
    id: 'np-h-001',
    category: 'number-puzzles',
    difficulty: 'hard',
    prompt: 'This is a big puzzle! Find the missing number to balance both sides.',
    visual: makeBalanceSvg([4, 3, 2], [3, '?', 1], '🎵'),
    options: [
      { id: 'a', label: '4' },
      { id: 'b', label: '5' },
      { id: 'c', label: '6' },
      { id: 'd', label: '3' },
    ],
    correctAnswerId: 'b',
    explanation: 'Left side: 4 + 3 + 2 = 9. Right side: 3 + ? + 1 = 9. So 4 + ? = 9, and ? = 5.',
    hint: 'First, add up the whole left side. Then figure out the known parts of the right.',
  },
  {
    id: 'np-h-002',
    category: 'number-puzzles',
    difficulty: 'hard',
    prompt: 'Solve this tricky balance puzzle!',
    visual: makeBalanceSvg([5, 2, 3], [1, '?', 2], '🐝'),
    options: [
      { id: 'a', label: '5' },
      { id: 'b', label: '6' },
      { id: 'c', label: '7' },
      { id: 'd', label: '8' },
    ],
    correctAnswerId: 'c',
    explanation: 'Left side: 5 + 2 + 3 = 10. Right side: 1 + ? + 2 = 10. So 3 + ? = 10, and ? = 7.',
  },
  {
    id: 'np-h-003',
    category: 'number-puzzles',
    difficulty: 'hard',
    prompt: 'Can you crack this puzzle? Both sides must be equal.',
    visual: makeBalanceSvg([3, 4, 3], [2, 2, '?'], '🌈'),
    options: [
      { id: 'a', label: '4' },
      { id: 'b', label: '5' },
      { id: 'c', label: '6' },
      { id: 'd', label: '7' },
    ],
    correctAnswerId: 'c',
    explanation: 'Left side: 3 + 4 + 3 = 10. Right side: 2 + 2 + ? = 10. So 4 + ? = 10, and ? = 6.',
  },
  {
    id: 'np-h-004',
    category: 'number-puzzles',
    difficulty: 'hard',
    prompt: 'Make these trains carry the same amount!',
    visual: makeBalanceSvg([5, 4], [2, '?', 3], '🎁'),
    options: [
      { id: 'a', label: '3' },
      { id: 'b', label: '4' },
      { id: 'c', label: '5' },
      { id: 'd', label: '6' },
    ],
    correctAnswerId: 'b',
    explanation: 'Left side: 5 + 4 = 9. Right side: 2 + ? + 3 = 9. So 5 + ? = 9, and ? = 4.',
  },
  {
    id: 'np-h-005',
    category: 'number-puzzles',
    difficulty: 'hard',
    prompt: 'This puzzle has lots of wagons! Find the missing number.',
    visual: makeBalanceSvg([2, 3, 4, 1], [5, '?'], '🔵'),
    options: [
      { id: 'a', label: '4' },
      { id: 'b', label: '5' },
      { id: 'c', label: '6' },
      { id: 'd', label: '7' },
    ],
    correctAnswerId: 'b',
    explanation: 'Left side: 2 + 3 + 4 + 1 = 10. Right side: 5 + ? = 10. So ? = 5.',
  },
  {
    id: 'np-h-006',
    category: 'number-puzzles',
    difficulty: 'hard',
    prompt: 'A real brain teaser! What makes both sides equal?',
    visual: makeBalanceSvg([3, 2, 5], ['?', 1, 3], '🐢'),
    options: [
      { id: 'a', label: '4' },
      { id: 'b', label: '5' },
      { id: 'c', label: '6' },
      { id: 'd', label: '7' },
    ],
    correctAnswerId: 'c',
    explanation: 'Left side: 3 + 2 + 5 = 10. Right side: ? + 1 + 3 = 10. So ? + 4 = 10, and ? = 6.',
  },
];
