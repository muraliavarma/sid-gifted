import type { Question } from '../types';

/**
 * Number Analogies (CogAT Quantitative Battery style)
 *
 * Format: A 2×2 matrix where the top row shows a number relationship.
 * The child applies the same relationship to the bottom row.
 *
 * Example: [2 → 4] means +2, so [3 → ?] = 5
 *
 * For young children these use pictures of objects (stars, hearts, etc.)
 * We represent them with emoji groups that auto-wrap to fit within cells.
 */

interface CellData {
  emoji: string;
  count: number;
}

interface RowStyle {
  bg: string;
  stroke: string;
}

function makeAnalogySvg(
  topLeft: CellData,
  topRight: CellData,
  bottomLeft: CellData,
  topStyle: RowStyle,
  bottomStyle: RowStyle,
): string {
  const W = 400, H = 250;
  const cellW = 180, cellH = 100;
  const rx = 12;

  function renderEmojis(data: CellData, cellX: number, cellY: number): string {
    const { emoji, count } = data;
    const padX = 12, padY = 10;
    const contentW = cellW - 2 * padX;
    const contentH = cellH - 2 * padY;
    const cx = cellX + cellW / 2;

    // Emoji width ≈ fontSize * 1.35 in SVG (conservative for cross-platform)
    const emojiWFactor = 1.35;
    const lineHFactor = 1.35;

    // Start large and shrink until emojis fit
    let fs = 36;
    let perRow: number;
    let rows: number;

    do {
      perRow = Math.max(1, Math.floor(contentW / (fs * emojiWFactor)));
      rows = Math.ceil(count / perRow);
      if (rows * fs * lineHFactor <= contentH) break;
      fs -= 2;
    } while (fs >= 14);

    fs = Math.max(fs, 14);
    perRow = Math.max(1, Math.floor(contentW / (fs * emojiWFactor)));
    rows = Math.ceil(count / perRow);

    const totalH = rows * fs * lineHFactor;
    const baseY = cellY + (cellH - totalH) / 2 + fs * 0.85;

    let svg = '';
    let rem = count;
    for (let r = 0; r < rows; r++) {
      const n = Math.min(rem, perRow);
      const y = baseY + r * fs * lineHFactor;
      svg += `<text x="${cx}" y="${y}" text-anchor="middle" font-size="${fs}">${emoji.repeat(n)}</text>`;
      rem -= n;
    }
    return svg;
  }

  let svg = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">`;

  // Top row cells
  svg += `<rect x="10" y="10" width="${cellW}" height="${cellH}" rx="${rx}" fill="${topStyle.bg}" stroke="${topStyle.stroke}" stroke-width="2"/>`;
  svg += `<rect x="210" y="10" width="${cellW}" height="${cellH}" rx="${rx}" fill="${topStyle.bg}" stroke="${topStyle.stroke}" stroke-width="2"/>`;

  // Bottom row cells
  svg += `<rect x="10" y="130" width="${cellW}" height="${cellH}" rx="${rx}" fill="${bottomStyle.bg}" stroke="${bottomStyle.stroke}" stroke-width="2"/>`;
  svg += `<rect x="210" y="130" width="${cellW}" height="${cellH}" rx="${rx}" fill="${bottomStyle.bg}" stroke="${bottomStyle.stroke}" stroke-width="2"/>`;

  // Cell contents
  svg += renderEmojis(topLeft, 10, 10);
  svg += renderEmojis(topRight, 210, 10);
  svg += renderEmojis(bottomLeft, 10, 130);

  // Question mark in bottom-right
  svg += `<text x="300" y="190" text-anchor="middle" font-size="40" fill="${bottomStyle.stroke}">❓</text>`;

  // Arrows between cells
  svg += `<text x="195" y="70" text-anchor="middle" font-size="28" fill="${topStyle.stroke}">→</text>`;
  svg += `<text x="195" y="190" text-anchor="middle" font-size="28" fill="${bottomStyle.stroke}">→</text>`;

  svg += `</svg>`;
  return svg;
}

/** Small SVG for answer option showing emojis */
function makeOptionSvg(emoji: string, count: number): string {
  const W = 130, H = 44;
  const padX = 6;
  const contentW = W - 2 * padX;
  const emojiWFactor = 1.35;
  const lineHFactor = 1.3;

  let fs = 22;
  let perRow: number;
  let rows: number;

  do {
    perRow = Math.max(1, Math.floor(contentW / (fs * emojiWFactor)));
    rows = Math.ceil(count / perRow);
    if (rows * fs * lineHFactor <= H - 6) break;
    fs -= 2;
  } while (fs >= 12);

  fs = Math.max(fs, 12);
  perRow = Math.max(1, Math.floor(contentW / (fs * emojiWFactor)));
  rows = Math.ceil(count / perRow);

  const totalH = rows * fs * lineHFactor;
  const svgH = Math.max(H, totalH + 8);
  const baseY = (svgH - totalH) / 2 + fs * 0.85;

  let svg = `<svg viewBox="0 0 ${W} ${svgH}" xmlns="http://www.w3.org/2000/svg">`;
  let rem = count;
  for (let r = 0; r < rows; r++) {
    const n = Math.min(rem, perRow);
    const y = baseY + r * fs * lineHFactor;
    svg += `<text x="${W / 2}" y="${y}" text-anchor="middle" font-size="${fs}">${emoji.repeat(n)}</text>`;
    rem -= n;
  }
  svg += `</svg>`;
  return svg;
}

export const numberAnalogies: Question[] = [
  // ===== EASY =====
  {
    id: 'na-e-001',
    category: 'number-analogies',
    difficulty: 'easy',
    prompt: 'Look at the top row. How do the numbers change? Now do the same thing to the bottom row.',
    visual: makeAnalogySvg(
      { emoji: '⭐', count: 2 }, { emoji: '⭐', count: 3 },
      { emoji: '🔵', count: 4 },
      { bg: '#E3F2FD', stroke: '#1976D2' },
      { bg: '#FFF3E0', stroke: '#E65100' },
    ),
    options: [
      { id: 'a', label: '3 circles', visual: makeOptionSvg('🔵', 3) },
      { id: 'b', label: '5 circles', visual: makeOptionSvg('🔵', 5) },
      { id: 'c', label: '4 circles', visual: makeOptionSvg('🔵', 4) },
      { id: 'd', label: '6 circles', visual: makeOptionSvg('🔵', 6) },
    ],
    correctAnswerId: 'b',
    explanation: 'The top row goes from 2 stars to 3 stars (add 1). So the bottom row goes from 4 circles to 5 circles (add 1).',
    hint: 'Count the stars in each box. What happened? Now do the same with the circles.',
  },
  {
    id: 'na-e-002',
    category: 'number-analogies',
    difficulty: 'easy',
    prompt: 'The top row shows a pattern. Apply the same pattern to the bottom row.',
    visual: makeAnalogySvg(
      { emoji: '🌸', count: 1 }, { emoji: '🌸', count: 2 },
      { emoji: '🦋', count: 3 },
      { bg: '#E8F5E9', stroke: '#2E7D32' },
      { bg: '#FCE4EC', stroke: '#C62828' },
    ),
    options: [
      { id: 'a', label: '2 butterflies', visual: makeOptionSvg('🦋', 2) },
      { id: 'b', label: '3 butterflies', visual: makeOptionSvg('🦋', 3) },
      { id: 'c', label: '4 butterflies', visual: makeOptionSvg('🦋', 4) },
      { id: 'd', label: '5 butterflies', visual: makeOptionSvg('🦋', 5) },
    ],
    correctAnswerId: 'c',
    explanation: 'The top row goes from 1 flower to 2 flowers (add 1). So the bottom row goes from 3 butterflies to 4 butterflies (add 1).',
    hint: 'How many flowers are added in the top row?',
  },
  {
    id: 'na-e-003',
    category: 'number-analogies',
    difficulty: 'easy',
    prompt: 'Look at how the top row changes. Make the bottom row change the same way.',
    visual: makeAnalogySvg(
      { emoji: '🍎', count: 3 }, { emoji: '🍎', count: 4 },
      { emoji: '🐟', count: 2 },
      { bg: '#F3E5F5', stroke: '#7B1FA2' },
      { bg: '#E0F7FA', stroke: '#00838F' },
    ),
    options: [
      { id: 'a', label: '1 fish', visual: makeOptionSvg('🐟', 1) },
      { id: 'b', label: '2 fish', visual: makeOptionSvg('🐟', 2) },
      { id: 'c', label: '3 fish', visual: makeOptionSvg('🐟', 3) },
      { id: 'd', label: '4 fish', visual: makeOptionSvg('🐟', 4) },
    ],
    correctAnswerId: 'c',
    explanation: 'The top row goes from 3 apples to 4 apples (add 1). So the bottom row goes from 2 fish to 3 fish (add 1).',
  },
  {
    id: 'na-e-004',
    category: 'number-analogies',
    difficulty: 'easy',
    prompt: 'Find the pattern in the top row and use it to solve the bottom row.',
    visual: makeAnalogySvg(
      { emoji: '🌙', count: 5 }, { emoji: '🌙', count: 4 },
      { emoji: '❤️', count: 3 },
      { bg: '#FFF9C4', stroke: '#F9A825' },
      { bg: '#E8EAF6', stroke: '#283593' },
    ),
    options: [
      { id: 'a', label: '2 hearts', visual: makeOptionSvg('❤️', 2) },
      { id: 'b', label: '3 hearts', visual: makeOptionSvg('❤️', 3) },
      { id: 'c', label: '4 hearts', visual: makeOptionSvg('❤️', 4) },
      { id: 'd', label: '1 heart', visual: makeOptionSvg('❤️', 1) },
    ],
    correctAnswerId: 'a',
    explanation: 'The top row goes from 5 moons to 4 moons (subtract 1). So the bottom row goes from 3 hearts to 2 hearts (subtract 1).',
    hint: 'Are there more or fewer in the second box of the top row?',
  },
  {
    id: 'na-e-005',
    category: 'number-analogies',
    difficulty: 'easy',
    prompt: 'What is the rule in the top row? Use it to find the missing answer.',
    visual: makeAnalogySvg(
      { emoji: '🎈', count: 2 }, { emoji: '🎈', count: 4 },
      { emoji: '🐱', count: 3 },
      { bg: '#E0F2F1', stroke: '#00695C' },
      { bg: '#FBE9E7', stroke: '#BF360C' },
    ),
    options: [
      { id: 'a', label: '4 cats', visual: makeOptionSvg('🐱', 4) },
      { id: 'b', label: '5 cats', visual: makeOptionSvg('🐱', 5) },
      { id: 'c', label: '6 cats', visual: makeOptionSvg('🐱', 6) },
      { id: 'd', label: '7 cats', visual: makeOptionSvg('🐱', 7) },
    ],
    correctAnswerId: 'c',
    explanation: 'The top row goes from 2 balloons to 4 balloons (double/×2). So the bottom row goes from 3 cats to 6 cats (double/×2).',
    hint: 'Is it adding or multiplying? Count carefully!',
  },
  {
    id: 'na-e-006',
    category: 'number-analogies',
    difficulty: 'easy',
    prompt: 'How does the top row change? Do the same to the bottom row.',
    visual: makeAnalogySvg(
      { emoji: '🔵', count: 4 }, { emoji: '🔵', count: 2 },
      { emoji: '🌺', count: 6 },
      { bg: '#E3F2FD', stroke: '#1565C0' },
      { bg: '#F1F8E9', stroke: '#33691E' },
    ),
    options: [
      { id: 'a', label: '2 flowers', visual: makeOptionSvg('🌺', 2) },
      { id: 'b', label: '3 flowers', visual: makeOptionSvg('🌺', 3) },
      { id: 'c', label: '4 flowers', visual: makeOptionSvg('🌺', 4) },
      { id: 'd', label: '5 flowers', visual: makeOptionSvg('🌺', 5) },
    ],
    correctAnswerId: 'c',
    explanation: 'The top row goes from 4 circles to 2 circles (subtract 2). So the bottom row goes from 6 flowers to 4 flowers (subtract 2).',
  },
  {
    id: 'na-e-007',
    category: 'number-analogies',
    difficulty: 'easy',
    prompt: 'Look at the pattern. What number completes the bottom row?',
    visual: makeAnalogySvg(
      { emoji: '🌟', count: 1 }, { emoji: '🌟', count: 3 },
      { emoji: '🐸', count: 2 },
      { bg: '#FCE4EC', stroke: '#AD1457' },
      { bg: '#E8F5E9', stroke: '#2E7D32' },
    ),
    options: [
      { id: 'a', label: '3 frogs', visual: makeOptionSvg('🐸', 3) },
      { id: 'b', label: '4 frogs', visual: makeOptionSvg('🐸', 4) },
      { id: 'c', label: '5 frogs', visual: makeOptionSvg('🐸', 5) },
      { id: 'd', label: '6 frogs', visual: makeOptionSvg('🐸', 6) },
    ],
    correctAnswerId: 'b',
    explanation: 'The top row goes from 1 star to 3 stars (add 2). So the bottom row goes from 2 frogs to 4 frogs (add 2).',
  },
  // ===== MEDIUM =====
  {
    id: 'na-m-001',
    category: 'number-analogies',
    difficulty: 'medium',
    prompt: 'Find the rule in the top row and apply it to the bottom row.',
    visual: makeAnalogySvg(
      { emoji: '🔶', count: 3 }, { emoji: '🔶', count: 6 },
      { emoji: '🐝', count: 4 },
      { bg: '#E8EAF6', stroke: '#283593' },
      { bg: '#FFF3E0', stroke: '#E65100' },
    ),
    options: [
      { id: 'a', label: '6 bees', visual: makeOptionSvg('🐝', 6) },
      { id: 'b', label: '7 bees', visual: makeOptionSvg('🐝', 7) },
      { id: 'c', label: '8 bees', visual: makeOptionSvg('🐝', 8) },
      { id: 'd', label: '5 bees', visual: makeOptionSvg('🐝', 5) },
    ],
    correctAnswerId: 'c',
    explanation: 'The top row goes from 3 diamonds to 6 diamonds (double/×2). So the bottom row goes from 4 bees to 8 bees (double/×2).',
    hint: 'Is it adding or multiplying?',
  },
  {
    id: 'na-m-002',
    category: 'number-analogies',
    difficulty: 'medium',
    prompt: 'What happens in the top row? Make the same thing happen in the bottom row.',
    visual: makeAnalogySvg(
      { emoji: '🍭', count: 6 }, { emoji: '🍭', count: 3 },
      { emoji: '🎀', count: 8 },
      { bg: '#F3E5F5', stroke: '#6A1B9A' },
      { bg: '#E0F7FA', stroke: '#00695C' },
    ),
    options: [
      { id: 'a', label: '3 bows', visual: makeOptionSvg('🎀', 3) },
      { id: 'b', label: '4 bows', visual: makeOptionSvg('🎀', 4) },
      { id: 'c', label: '5 bows', visual: makeOptionSvg('🎀', 5) },
      { id: 'd', label: '6 bows', visual: makeOptionSvg('🎀', 6) },
    ],
    correctAnswerId: 'b',
    explanation: 'The top row goes from 6 lollipops to 3 lollipops (halved/÷2). So the bottom row goes from 8 bows to 4 bows (halved/÷2).',
    hint: 'Is the number getting smaller? By how much?',
  },
  {
    id: 'na-m-003',
    category: 'number-analogies',
    difficulty: 'medium',
    prompt: 'Study the top row pattern, then complete the bottom row.',
    visual: makeAnalogySvg(
      { emoji: '🐞', count: 2 }, { emoji: '🐞', count: 5 },
      { emoji: '🌈', count: 3 },
      { bg: '#E8F5E9', stroke: '#1B5E20' },
      { bg: '#FFF8E1', stroke: '#FF8F00' },
    ),
    options: [
      { id: 'a', label: '5 rainbows', visual: makeOptionSvg('🌈', 5) },
      { id: 'b', label: '6 rainbows', visual: makeOptionSvg('🌈', 6) },
      { id: 'c', label: '7 rainbows', visual: makeOptionSvg('🌈', 7) },
      { id: 'd', label: '4 rainbows', visual: makeOptionSvg('🌈', 4) },
    ],
    correctAnswerId: 'b',
    explanation: 'The top row goes from 2 ladybugs to 5 ladybugs (add 3). So the bottom row goes from 3 rainbows to 6 rainbows (add 3).',
  },
  {
    id: 'na-m-004',
    category: 'number-analogies',
    difficulty: 'medium',
    prompt: 'Find the number rule in the top row. Use it on the bottom row.',
    visual: makeAnalogySvg(
      { emoji: '🎯', count: 7 }, { emoji: '🎯', count: 4 },
      { emoji: '🦊', count: 9 },
      { bg: '#EFEBE9', stroke: '#4E342E' },
      { bg: '#E1F5FE', stroke: '#0277BD' },
    ),
    options: [
      { id: 'a', label: '5 foxes', visual: makeOptionSvg('🦊', 5) },
      { id: 'b', label: '6 foxes', visual: makeOptionSvg('🦊', 6) },
      { id: 'c', label: '7 foxes', visual: makeOptionSvg('🦊', 7) },
      { id: 'd', label: '8 foxes', visual: makeOptionSvg('🦊', 8) },
    ],
    correctAnswerId: 'b',
    explanation: 'The top row goes from 7 targets to 4 targets (subtract 3). So the bottom row goes from 9 foxes to 6 foxes (subtract 3).',
  },
  {
    id: 'na-m-005',
    category: 'number-analogies',
    difficulty: 'medium',
    prompt: 'How do the top numbers relate? Apply the same to the bottom.',
    visual: makeAnalogySvg(
      { emoji: '🎈', count: 1 }, { emoji: '🎈', count: 3 },
      { emoji: '🍀', count: 3 },
      { bg: '#F9FBE7', stroke: '#827717' },
      { bg: '#EDE7F6', stroke: '#4527A0' },
    ),
    options: [
      { id: 'a', label: '6 clovers', visual: makeOptionSvg('🍀', 6) },
      { id: 'b', label: '7 clovers', visual: makeOptionSvg('🍀', 7) },
      { id: 'c', label: '8 clovers', visual: makeOptionSvg('🍀', 8) },
      { id: 'd', label: '9 clovers', visual: makeOptionSvg('🍀', 9) },
    ],
    correctAnswerId: 'd',
    explanation: 'The top row goes from 1 balloon to 3 balloons (×3 or triple). So the bottom row goes from 3 clovers to 9 clovers (×3 or triple).',
    hint: 'Think about how many times bigger the second number is.',
  },
  {
    id: 'na-m-006',
    category: 'number-analogies',
    difficulty: 'medium',
    prompt: 'Discover the pattern in the top row and solve the bottom row.',
    visual: makeAnalogySvg(
      { emoji: '🍓', count: 5 }, { emoji: '🍓', count: 8 },
      { emoji: '🐣', count: 4 },
      { bg: '#E0F2F1', stroke: '#004D40' },
      { bg: '#FFF3E0', stroke: '#E65100' },
    ),
    options: [
      { id: 'a', label: '6 chicks', visual: makeOptionSvg('🐣', 6) },
      { id: 'b', label: '7 chicks', visual: makeOptionSvg('🐣', 7) },
      { id: 'c', label: '8 chicks', visual: makeOptionSvg('🐣', 8) },
      { id: 'd', label: '5 chicks', visual: makeOptionSvg('🐣', 5) },
    ],
    correctAnswerId: 'b',
    explanation: 'The top row goes from 5 strawberries to 8 strawberries (add 3). So the bottom row goes from 4 chicks to 7 chicks (add 3).',
  },
  // ===== HARD =====
  {
    id: 'na-h-001',
    category: 'number-analogies',
    difficulty: 'hard',
    prompt: 'This is tricky! Find the rule in the top row and apply it to the bottom row.',
    visual: makeAnalogySvg(
      { emoji: '🔴', count: 2 }, { emoji: '🔴', count: 6 },
      { emoji: '🌻', count: 3 },
      { bg: '#FCE4EC', stroke: '#880E4F' },
      { bg: '#E8EAF6', stroke: '#1A237E' },
    ),
    options: [
      { id: 'a', label: '6 sunflowers', visual: makeOptionSvg('🌻', 6) },
      { id: 'b', label: '7 sunflowers', visual: makeOptionSvg('🌻', 7) },
      { id: 'c', label: '8 sunflowers', visual: makeOptionSvg('🌻', 8) },
      { id: 'd', label: '9 sunflowers', visual: makeOptionSvg('🌻', 9) },
    ],
    correctAnswerId: 'd',
    explanation: 'The top row goes from 2 circles to 6 circles (×3 or triple). So the bottom row goes from 3 sunflowers to 9 sunflowers (×3 or triple).',
    hint: 'The answer is not about adding. Think about multiplying!',
  },
  {
    id: 'na-h-002',
    category: 'number-analogies',
    difficulty: 'hard',
    prompt: 'Find the hidden rule and solve the puzzle.',
    visual: makeAnalogySvg(
      { emoji: '🎪', count: 8 }, { emoji: '🎪', count: 4 },
      { emoji: '🌺', count: 10 },
      { bg: '#E0F7FA', stroke: '#006064' },
      { bg: '#FBE9E7', stroke: '#BF360C' },
    ),
    options: [
      { id: 'a', label: '4 flowers', visual: makeOptionSvg('🌺', 4) },
      { id: 'b', label: '5 flowers', visual: makeOptionSvg('🌺', 5) },
      { id: 'c', label: '6 flowers', visual: makeOptionSvg('🌺', 6) },
      { id: 'd', label: '7 flowers', visual: makeOptionSvg('🌺', 7) },
    ],
    correctAnswerId: 'b',
    explanation: 'The top row goes from 8 tents to 4 tents (halved/÷2). So the bottom row goes from 10 flowers to 5 flowers (halved/÷2).',
  },
  {
    id: 'na-h-003',
    category: 'number-analogies',
    difficulty: 'hard',
    prompt: 'Think carefully about the relationship in the top row. Solve the bottom row.',
    visual: makeAnalogySvg(
      { emoji: '🎲', count: 3 }, { emoji: '🎲', count: 7 },
      { emoji: '🐢', count: 4 },
      { bg: '#F3E5F5', stroke: '#4A148C' },
      { bg: '#E8F5E9', stroke: '#1B5E20' },
    ),
    options: [
      { id: 'a', label: '7 turtles', visual: makeOptionSvg('🐢', 7) },
      { id: 'b', label: '8 turtles', visual: makeOptionSvg('🐢', 8) },
      { id: 'c', label: '9 turtles', visual: makeOptionSvg('🐢', 9) },
      { id: 'd', label: '10 turtles', visual: makeOptionSvg('🐢', 10) },
    ],
    correctAnswerId: 'b',
    explanation: 'The top row goes from 3 dice to 7 dice (add 4). So the bottom row goes from 4 turtles to 8 turtles (add 4).',
  },
  {
    id: 'na-h-004',
    category: 'number-analogies',
    difficulty: 'hard',
    prompt: 'This one is challenging! What is the secret rule?',
    visual: makeAnalogySvg(
      { emoji: '🎵', count: 5 }, { emoji: '🎵', count: 10 },
      { emoji: '🦋', count: 3 },
      { bg: '#FFF8E1', stroke: '#F57F17' },
      { bg: '#E1F5FE', stroke: '#01579B' },
    ),
    options: [
      { id: 'a', label: '5 butterflies', visual: makeOptionSvg('🦋', 5) },
      { id: 'b', label: '6 butterflies', visual: makeOptionSvg('🦋', 6) },
      { id: 'c', label: '8 butterflies', visual: makeOptionSvg('🦋', 8) },
      { id: 'd', label: '4 butterflies', visual: makeOptionSvg('🦋', 4) },
    ],
    correctAnswerId: 'b',
    explanation: 'The top row goes from 5 notes to 10 notes (double/×2). So the bottom row goes from 3 butterflies to 6 butterflies (double/×2).',
  },
  {
    id: 'na-h-005',
    category: 'number-analogies',
    difficulty: 'hard',
    prompt: 'Look very carefully at both rows. What is the pattern?',
    visual: makeAnalogySvg(
      { emoji: '🎁', count: 9 }, { emoji: '🎁', count: 3 },
      { emoji: '🐙', count: 6 },
      { bg: '#ECEFF1', stroke: '#37474F' },
      { bg: '#FBE9E7', stroke: '#D84315' },
    ),
    options: [
      { id: 'a', label: '1 octopus', visual: makeOptionSvg('🐙', 1) },
      { id: 'b', label: '2 octopi', visual: makeOptionSvg('🐙', 2) },
      { id: 'c', label: '3 octopi', visual: makeOptionSvg('🐙', 3) },
      { id: 'd', label: '4 octopi', visual: makeOptionSvg('🐙', 4) },
    ],
    correctAnswerId: 'b',
    explanation: 'The top row goes from 9 gifts to 3 gifts (÷3 or one-third). So the bottom row goes from 6 octopi to 2 octopi (÷3 or one-third).',
    hint: 'How many times does 3 go into 9? Now try the same with the bottom.',
  },
  {
    id: 'na-h-006',
    category: 'number-analogies',
    difficulty: 'hard',
    prompt: 'Find the tricky rule. Both rows follow the same pattern.',
    visual: makeAnalogySvg(
      { emoji: '🐝', count: 2 }, { emoji: '🐝', count: 7 },
      { emoji: '🍎', count: 3 },
      { bg: '#E8F5E9', stroke: '#2E7D32' },
      { bg: '#F3E5F5', stroke: '#7B1FA2' },
    ),
    options: [
      { id: 'a', label: '7 apples', visual: makeOptionSvg('🍎', 7) },
      { id: 'b', label: '8 apples', visual: makeOptionSvg('🍎', 8) },
      { id: 'c', label: '9 apples', visual: makeOptionSvg('🍎', 9) },
      { id: 'd', label: '10 apples', visual: makeOptionSvg('🍎', 10) },
    ],
    correctAnswerId: 'b',
    explanation: 'The top row goes from 2 bees to 7 bees (add 5). So the bottom row goes from 3 apples to 8 apples (add 5).',
  },
  // ===== NEW EASY (na-e-008 to na-e-012) =====
  {
    id: 'na-e-008',
    category: 'number-analogies',
    difficulty: 'easy',
    prompt: 'Look at the top row. How do the numbers change? Now do the same thing to the bottom row.',
    visual: makeAnalogySvg(
      { emoji: '🐶', count: 3 }, { emoji: '🐶', count: 5 },
      { emoji: '🌺', count: 4 },
      { bg: '#E3F2FD', stroke: '#1976D2' },
      { bg: '#FFF3E0', stroke: '#E65100' },
    ),
    options: [
      { id: 'a', label: '4 flowers', visual: makeOptionSvg('🌺', 4) },
      { id: 'b', label: '5 flowers', visual: makeOptionSvg('🌺', 5) },
      { id: 'c', label: '6 flowers', visual: makeOptionSvg('🌺', 6) },
      { id: 'd', label: '7 flowers', visual: makeOptionSvg('🌺', 7) },
    ],
    correctAnswerId: 'c',
    explanation: 'The top row goes from 3 dogs to 5 dogs (add 2). So the bottom row goes from 4 flowers to 6 flowers (add 2).',
  },
  {
    id: 'na-e-009',
    category: 'number-analogies',
    difficulty: 'easy',
    prompt: 'The top row shows a pattern. Apply the same pattern to the bottom row.',
    visual: makeAnalogySvg(
      { emoji: '🐥', count: 5 }, { emoji: '🐥', count: 6 },
      { emoji: '🍉', count: 3 },
      { bg: '#E8F5E9', stroke: '#2E7D32' },
      { bg: '#FCE4EC', stroke: '#C62828' },
    ),
    options: [
      { id: 'a', label: '3 watermelons', visual: makeOptionSvg('🍉', 3) },
      { id: 'b', label: '4 watermelons', visual: makeOptionSvg('🍉', 4) },
      { id: 'c', label: '5 watermelons', visual: makeOptionSvg('🍉', 5) },
      { id: 'd', label: '6 watermelons', visual: makeOptionSvg('🍉', 6) },
    ],
    correctAnswerId: 'b',
    explanation: 'The top row goes from 5 chicks to 6 chicks (add 1). So the bottom row goes from 3 watermelons to 4 watermelons (add 1).',
  },
  {
    id: 'na-e-010',
    category: 'number-analogies',
    difficulty: 'easy',
    prompt: 'Look at how the top row changes. Make the bottom row change the same way.',
    visual: makeAnalogySvg(
      { emoji: '🐠', count: 4 }, { emoji: '🐠', count: 3 },
      { emoji: '🎈', count: 5 },
      { bg: '#F3E5F5', stroke: '#7B1FA2' },
      { bg: '#E0F7FA', stroke: '#00838F' },
    ),
    options: [
      { id: 'a', label: '3 balloons', visual: makeOptionSvg('🎈', 3) },
      { id: 'b', label: '4 balloons', visual: makeOptionSvg('🎈', 4) },
      { id: 'c', label: '5 balloons', visual: makeOptionSvg('🎈', 5) },
      { id: 'd', label: '6 balloons', visual: makeOptionSvg('🎈', 6) },
    ],
    correctAnswerId: 'b',
    explanation: 'The top row goes from 4 fish to 3 fish (subtract 1). So the bottom row goes from 5 balloons to 4 balloons (subtract 1).',
  },
  {
    id: 'na-e-011',
    category: 'number-analogies',
    difficulty: 'easy',
    prompt: 'Find the pattern in the top row and use it to solve the bottom row.',
    visual: makeAnalogySvg(
      { emoji: '🍋', count: 6 }, { emoji: '🍋', count: 4 },
      { emoji: '🐰', count: 5 },
      { bg: '#FFF9C4', stroke: '#F9A825' },
      { bg: '#E8EAF6', stroke: '#283593' },
    ),
    options: [
      { id: 'a', label: '2 bunnies', visual: makeOptionSvg('🐰', 2) },
      { id: 'b', label: '3 bunnies', visual: makeOptionSvg('🐰', 3) },
      { id: 'c', label: '4 bunnies', visual: makeOptionSvg('🐰', 4) },
      { id: 'd', label: '5 bunnies', visual: makeOptionSvg('🐰', 5) },
    ],
    correctAnswerId: 'b',
    explanation: 'The top row goes from 6 lemons to 4 lemons (subtract 2). So the bottom row goes from 5 bunnies to 3 bunnies (subtract 2).',
  },
  {
    id: 'na-e-012',
    category: 'number-analogies',
    difficulty: 'easy',
    prompt: 'What is the rule in the top row? Use it to find the missing answer.',
    visual: makeAnalogySvg(
      { emoji: '🐢', count: 4 }, { emoji: '🐢', count: 6 },
      { emoji: '🍊', count: 1 },
      { bg: '#E0F2F1', stroke: '#00695C' },
      { bg: '#FBE9E7', stroke: '#BF360C' },
    ),
    options: [
      { id: 'a', label: '2 oranges', visual: makeOptionSvg('🍊', 2) },
      { id: 'b', label: '3 oranges', visual: makeOptionSvg('🍊', 3) },
      { id: 'c', label: '4 oranges', visual: makeOptionSvg('🍊', 4) },
      { id: 'd', label: '5 oranges', visual: makeOptionSvg('🍊', 5) },
    ],
    correctAnswerId: 'b',
    explanation: 'The top row goes from 4 turtles to 6 turtles (add 2). So the bottom row goes from 1 orange to 3 oranges (add 2).',
  },
  // ===== NEW MEDIUM (na-m-007 to na-m-014) =====
  {
    id: 'na-m-007',
    category: 'number-analogies',
    difficulty: 'medium',
    prompt: 'Find the rule in the top row and apply it to the bottom row.',
    visual: makeAnalogySvg(
      { emoji: '🧁', count: 4 }, { emoji: '🧁', count: 7 },
      { emoji: '🐸', count: 5 },
      { bg: '#EFEBE9', stroke: '#4E342E' },
      { bg: '#E1F5FE', stroke: '#0277BD' },
    ),
    options: [
      { id: 'a', label: '7 frogs', visual: makeOptionSvg('🐸', 7) },
      { id: 'b', label: '8 frogs', visual: makeOptionSvg('🐸', 8) },
      { id: 'c', label: '9 frogs', visual: makeOptionSvg('🐸', 9) },
      { id: 'd', label: '6 frogs', visual: makeOptionSvg('🐸', 6) },
    ],
    correctAnswerId: 'b',
    explanation: 'The top row goes from 4 cupcakes to 7 cupcakes (add 3). So the bottom row goes from 5 frogs to 8 frogs (add 3).',
  },
  {
    id: 'na-m-008',
    category: 'number-analogies',
    difficulty: 'medium',
    prompt: 'What happens in the top row? Make the same thing happen in the bottom row.',
    visual: makeAnalogySvg(
      { emoji: '🎯', count: 8 }, { emoji: '🎯', count: 5 },
      { emoji: '🌸', count: 6 },
      { bg: '#F9FBE7', stroke: '#827717' },
      { bg: '#EDE7F6', stroke: '#4527A0' },
    ),
    options: [
      { id: 'a', label: '2 blossoms', visual: makeOptionSvg('🌸', 2) },
      { id: 'b', label: '3 blossoms', visual: makeOptionSvg('🌸', 3) },
      { id: 'c', label: '4 blossoms', visual: makeOptionSvg('🌸', 4) },
      { id: 'd', label: '5 blossoms', visual: makeOptionSvg('🌸', 5) },
    ],
    correctAnswerId: 'b',
    explanation: 'The top row goes from 8 targets to 5 targets (subtract 3). So the bottom row goes from 6 blossoms to 3 blossoms (subtract 3).',
  },
  {
    id: 'na-m-009',
    category: 'number-analogies',
    difficulty: 'medium',
    prompt: 'Study the top row pattern, then complete the bottom row.',
    visual: makeAnalogySvg(
      { emoji: '🌻', count: 3 }, { emoji: '🌻', count: 7 },
      { emoji: '🐝', count: 2 },
      { bg: '#E3F2FD', stroke: '#1976D2' },
      { bg: '#FFF3E0', stroke: '#E65100' },
    ),
    options: [
      { id: 'a', label: '4 bees', visual: makeOptionSvg('🐝', 4) },
      { id: 'b', label: '5 bees', visual: makeOptionSvg('🐝', 5) },
      { id: 'c', label: '6 bees', visual: makeOptionSvg('🐝', 6) },
      { id: 'd', label: '7 bees', visual: makeOptionSvg('🐝', 7) },
    ],
    correctAnswerId: 'c',
    explanation: 'The top row goes from 3 sunflowers to 7 sunflowers (add 4). So the bottom row goes from 2 bees to 6 bees (add 4).',
  },
  {
    id: 'na-m-010',
    category: 'number-analogies',
    difficulty: 'medium',
    prompt: 'Find the number rule in the top row. Use it on the bottom row.',
    visual: makeAnalogySvg(
      { emoji: '🐠', count: 7 }, { emoji: '🐠', count: 3 },
      { emoji: '🎁', count: 8 },
      { bg: '#E8F5E9', stroke: '#2E7D32' },
      { bg: '#FCE4EC', stroke: '#C62828' },
    ),
    options: [
      { id: 'a', label: '3 gifts', visual: makeOptionSvg('🎁', 3) },
      { id: 'b', label: '4 gifts', visual: makeOptionSvg('🎁', 4) },
      { id: 'c', label: '5 gifts', visual: makeOptionSvg('🎁', 5) },
      { id: 'd', label: '6 gifts', visual: makeOptionSvg('🎁', 6) },
    ],
    correctAnswerId: 'b',
    explanation: 'The top row goes from 7 fish to 3 fish (subtract 4). So the bottom row goes from 8 gifts to 4 gifts (subtract 4).',
  },
  {
    id: 'na-m-011',
    category: 'number-analogies',
    difficulty: 'medium',
    prompt: 'How do the top numbers relate? Apply the same to the bottom.',
    visual: makeAnalogySvg(
      { emoji: '🍓', count: 1 }, { emoji: '🍓', count: 6 },
      { emoji: '🐱', count: 4 },
      { bg: '#F3E5F5', stroke: '#7B1FA2' },
      { bg: '#E0F7FA', stroke: '#00838F' },
    ),
    options: [
      { id: 'a', label: '7 cats', visual: makeOptionSvg('🐱', 7) },
      { id: 'b', label: '8 cats', visual: makeOptionSvg('🐱', 8) },
      { id: 'c', label: '9 cats', visual: makeOptionSvg('🐱', 9) },
      { id: 'd', label: '10 cats', visual: makeOptionSvg('🐱', 10) },
    ],
    correctAnswerId: 'c',
    explanation: 'The top row goes from 1 strawberry to 6 strawberries (add 5). So the bottom row goes from 4 cats to 9 cats (add 5).',
  },
  {
    id: 'na-m-012',
    category: 'number-analogies',
    difficulty: 'medium',
    prompt: 'Discover the pattern in the top row and solve the bottom row.',
    visual: makeAnalogySvg(
      { emoji: '🌟', count: 9 }, { emoji: '🌟', count: 4 },
      { emoji: '🐞', count: 7 },
      { bg: '#FFF9C4', stroke: '#F9A825' },
      { bg: '#E8EAF6', stroke: '#283593' },
    ),
    options: [
      { id: 'a', label: '1 ladybug', visual: makeOptionSvg('🐞', 1) },
      { id: 'b', label: '2 ladybugs', visual: makeOptionSvg('🐞', 2) },
      { id: 'c', label: '3 ladybugs', visual: makeOptionSvg('🐞', 3) },
      { id: 'd', label: '4 ladybugs', visual: makeOptionSvg('🐞', 4) },
    ],
    correctAnswerId: 'b',
    explanation: 'The top row goes from 9 stars to 4 stars (subtract 5). So the bottom row goes from 7 ladybugs to 2 ladybugs (subtract 5).',
  },
  {
    id: 'na-m-013',
    category: 'number-analogies',
    difficulty: 'medium',
    prompt: 'Look at the pattern. What number completes the bottom row?',
    visual: makeAnalogySvg(
      { emoji: '🎲', count: 5 }, { emoji: '🎲', count: 9 },
      { emoji: '🐛', count: 3 },
      { bg: '#E0F2F1', stroke: '#00695C' },
      { bg: '#FBE9E7', stroke: '#BF360C' },
    ),
    options: [
      { id: 'a', label: '5 bugs', visual: makeOptionSvg('🐛', 5) },
      { id: 'b', label: '6 bugs', visual: makeOptionSvg('🐛', 6) },
      { id: 'c', label: '7 bugs', visual: makeOptionSvg('🐛', 7) },
      { id: 'd', label: '8 bugs', visual: makeOptionSvg('🐛', 8) },
    ],
    correctAnswerId: 'c',
    explanation: 'The top row goes from 5 dice to 9 dice (add 4). So the bottom row goes from 3 bugs to 7 bugs (add 4).',
  },
  {
    id: 'na-m-014',
    category: 'number-analogies',
    difficulty: 'medium',
    prompt: 'How does the top row change? Do the same to the bottom row.',
    visual: makeAnalogySvg(
      { emoji: '🍭', count: 8 }, { emoji: '🍭', count: 4 },
      { emoji: '🦋', count: 9 },
      { bg: '#EFEBE9', stroke: '#4E342E' },
      { bg: '#E1F5FE', stroke: '#0277BD' },
    ),
    options: [
      { id: 'a', label: '4 butterflies', visual: makeOptionSvg('🦋', 4) },
      { id: 'b', label: '5 butterflies', visual: makeOptionSvg('🦋', 5) },
      { id: 'c', label: '6 butterflies', visual: makeOptionSvg('🦋', 6) },
      { id: 'd', label: '7 butterflies', visual: makeOptionSvg('🦋', 7) },
    ],
    correctAnswerId: 'b',
    explanation: 'The top row goes from 8 lollipops to 4 lollipops (subtract 4). So the bottom row goes from 9 butterflies to 5 butterflies (subtract 4).',
  },
  // ===== NEW HARD (na-h-007 to na-h-013) =====
  {
    id: 'na-h-007',
    category: 'number-analogies',
    difficulty: 'hard',
    prompt: 'This is tricky! Find the rule in the top row and apply it to the bottom row.',
    visual: makeAnalogySvg(
      { emoji: '🔶', count: 2 }, { emoji: '🔶', count: 8 },
      { emoji: '🐧', count: 3 },
      { bg: '#F9FBE7', stroke: '#827717' },
      { bg: '#EDE7F6', stroke: '#4527A0' },
    ),
    options: [
      { id: 'a', label: '7 penguins', visual: makeOptionSvg('🐧', 7) },
      { id: 'b', label: '8 penguins', visual: makeOptionSvg('🐧', 8) },
      { id: 'c', label: '9 penguins', visual: makeOptionSvg('🐧', 9) },
      { id: 'd', label: '10 penguins', visual: makeOptionSvg('🐧', 10) },
    ],
    correctAnswerId: 'c',
    explanation: 'The top row goes from 2 diamonds to 8 diamonds (add 6). So the bottom row goes from 3 penguins to 9 penguins (add 6).',
    hint: 'Count how many more are in the second box of the top row.',
  },
  {
    id: 'na-h-008',
    category: 'number-analogies',
    difficulty: 'hard',
    prompt: 'Find the hidden rule and solve the puzzle.',
    visual: makeAnalogySvg(
      { emoji: '🎀', count: 9 }, { emoji: '🎀', count: 3 },
      { emoji: '🌈', count: 8 },
      { bg: '#E3F2FD', stroke: '#1976D2' },
      { bg: '#FFF3E0', stroke: '#E65100' },
    ),
    options: [
      { id: 'a', label: '1 rainbow', visual: makeOptionSvg('🌈', 1) },
      { id: 'b', label: '2 rainbows', visual: makeOptionSvg('🌈', 2) },
      { id: 'c', label: '3 rainbows', visual: makeOptionSvg('🌈', 3) },
      { id: 'd', label: '4 rainbows', visual: makeOptionSvg('🌈', 4) },
    ],
    correctAnswerId: 'b',
    explanation: 'The top row goes from 9 bows to 3 bows (subtract 6). So the bottom row goes from 8 rainbows to 2 rainbows (subtract 6).',
  },
  {
    id: 'na-h-009',
    category: 'number-analogies',
    difficulty: 'hard',
    prompt: 'Think carefully about the relationship in the top row. Solve the bottom row.',
    visual: makeAnalogySvg(
      { emoji: '🦊', count: 1 }, { emoji: '🦊', count: 8 },
      { emoji: '🔵', count: 3 },
      { bg: '#E8F5E9', stroke: '#2E7D32' },
      { bg: '#FCE4EC', stroke: '#C62828' },
    ),
    options: [
      { id: 'a', label: '8 circles', visual: makeOptionSvg('🔵', 8) },
      { id: 'b', label: '9 circles', visual: makeOptionSvg('🔵', 9) },
      { id: 'c', label: '10 circles', visual: makeOptionSvg('🔵', 10) },
      { id: 'd', label: '11 circles', visual: makeOptionSvg('🔵', 11) },
    ],
    correctAnswerId: 'c',
    explanation: 'The top row goes from 1 fox to 8 foxes (add 7). So the bottom row goes from 3 circles to 10 circles (add 7).',
  },
  {
    id: 'na-h-010',
    category: 'number-analogies',
    difficulty: 'hard',
    prompt: 'This one is challenging! What is the secret rule?',
    visual: makeAnalogySvg(
      { emoji: '🌙', count: 10 }, { emoji: '🌙', count: 3 },
      { emoji: '🐝', count: 9 },
      { bg: '#F3E5F5', stroke: '#7B1FA2' },
      { bg: '#E0F7FA', stroke: '#00838F' },
    ),
    options: [
      { id: 'a', label: '1 bee', visual: makeOptionSvg('🐝', 1) },
      { id: 'b', label: '2 bees', visual: makeOptionSvg('🐝', 2) },
      { id: 'c', label: '3 bees', visual: makeOptionSvg('🐝', 3) },
      { id: 'd', label: '4 bees', visual: makeOptionSvg('🐝', 4) },
    ],
    correctAnswerId: 'b',
    explanation: 'The top row goes from 10 moons to 3 moons (subtract 7). So the bottom row goes from 9 bees to 2 bees (subtract 7).',
    hint: 'Count how many fewer are in the second box of the top row.',
  },
  {
    id: 'na-h-011',
    category: 'number-analogies',
    difficulty: 'hard',
    prompt: 'Look very carefully at both rows. What is the pattern?',
    visual: makeAnalogySvg(
      { emoji: '🍀', count: 1 }, { emoji: '🍀', count: 9 },
      { emoji: '🎵', count: 2 },
      { bg: '#FFF9C4', stroke: '#F9A825' },
      { bg: '#E8EAF6', stroke: '#283593' },
    ),
    options: [
      { id: 'a', label: '8 notes', visual: makeOptionSvg('🎵', 8) },
      { id: 'b', label: '9 notes', visual: makeOptionSvg('🎵', 9) },
      { id: 'c', label: '10 notes', visual: makeOptionSvg('🎵', 10) },
      { id: 'd', label: '11 notes', visual: makeOptionSvg('🎵', 11) },
    ],
    correctAnswerId: 'c',
    explanation: 'The top row goes from 1 clover to 9 clovers (add 8). So the bottom row goes from 2 notes to 10 notes (add 8).',
  },
  {
    id: 'na-h-012',
    category: 'number-analogies',
    difficulty: 'hard',
    prompt: 'Find the tricky rule. Both rows follow the same pattern.',
    visual: makeAnalogySvg(
      { emoji: '🍎', count: 11 }, { emoji: '🍎', count: 3 },
      { emoji: '🌻', count: 10 },
      { bg: '#E0F2F1', stroke: '#00695C' },
      { bg: '#FBE9E7', stroke: '#BF360C' },
    ),
    options: [
      { id: 'a', label: '1 sunflower', visual: makeOptionSvg('🌻', 1) },
      { id: 'b', label: '2 sunflowers', visual: makeOptionSvg('🌻', 2) },
      { id: 'c', label: '3 sunflowers', visual: makeOptionSvg('🌻', 3) },
      { id: 'd', label: '4 sunflowers', visual: makeOptionSvg('🌻', 4) },
    ],
    correctAnswerId: 'b',
    explanation: 'The top row goes from 11 apples to 3 apples (subtract 8). So the bottom row goes from 10 sunflowers to 2 sunflowers (subtract 8).',
  },
  {
    id: 'na-h-013',
    category: 'number-analogies',
    difficulty: 'hard',
    prompt: 'This is a tough one! Figure out the rule and complete the bottom row.',
    visual: makeAnalogySvg(
      { emoji: '🐛', count: 4 }, { emoji: '🐛', count: 10 },
      { emoji: '🎈', count: 5 },
      { bg: '#EFEBE9', stroke: '#4E342E' },
      { bg: '#E1F5FE', stroke: '#0277BD' },
    ),
    options: [
      { id: 'a', label: '9 balloons', visual: makeOptionSvg('🎈', 9) },
      { id: 'b', label: '10 balloons', visual: makeOptionSvg('🎈', 10) },
      { id: 'c', label: '11 balloons', visual: makeOptionSvg('🎈', 11) },
      { id: 'd', label: '12 balloons', visual: makeOptionSvg('🎈', 12) },
    ],
    correctAnswerId: 'c',
    explanation: 'The top row goes from 4 bugs to 10 bugs (add 6). So the bottom row goes from 5 balloons to 11 balloons (add 6).',
  },
  // ===== NEW MEDIUM (na-m-015 to na-m-022) =====
  {
    id: 'na-m-015',
    category: 'number-analogies',
    difficulty: 'medium',
    prompt: 'Find the rule in the top row and apply it to the bottom row.',
    visual: makeAnalogySvg(
      { emoji: '🦁', count: 5 }, { emoji: '🦁', count: 9 },
      { emoji: '🍇', count: 6 },
      { bg: '#E8EAF6', stroke: '#283593' },
      { bg: '#FFF3E0', stroke: '#E65100' },
    ),
    options: [
      { id: 'a', label: '8 grapes', visual: makeOptionSvg('🍇', 8) },
      { id: 'b', label: '9 grapes', visual: makeOptionSvg('🍇', 9) },
      { id: 'c', label: '10 grapes', visual: makeOptionSvg('🍇', 10) },
      { id: 'd', label: '11 grapes', visual: makeOptionSvg('🍇', 11) },
    ],
    correctAnswerId: 'c',
    explanation: 'The top row goes from 5 lions to 9 lions (add 4). So the bottom row goes from 6 grapes to 10 grapes (add 4).',
  },
  {
    id: 'na-m-016',
    category: 'number-analogies',
    difficulty: 'medium',
    prompt: 'What happens in the top row? Make the same thing happen in the bottom row.',
    visual: makeAnalogySvg(
      { emoji: '🐳', count: 8 }, { emoji: '🐳', count: 5 },
      { emoji: '🍒', count: 7 },
      { bg: '#E8F5E9', stroke: '#2E7D32' },
      { bg: '#FFF8E1', stroke: '#FF8F00' },
    ),
    options: [
      { id: 'a', label: '3 cherries', visual: makeOptionSvg('🍒', 3) },
      { id: 'b', label: '4 cherries', visual: makeOptionSvg('🍒', 4) },
      { id: 'c', label: '5 cherries', visual: makeOptionSvg('🍒', 5) },
      { id: 'd', label: '6 cherries', visual: makeOptionSvg('🍒', 6) },
    ],
    correctAnswerId: 'b',
    explanation: 'The top row goes from 8 whales to 5 whales (subtract 3). So the bottom row goes from 7 cherries to 4 cherries (subtract 3).',
  },
  {
    id: 'na-m-017',
    category: 'number-analogies',
    difficulty: 'medium',
    prompt: 'Study the top row pattern, then complete the bottom row.',
    visual: makeAnalogySvg(
      { emoji: '🎶', count: 3 }, { emoji: '🎶', count: 8 },
      { emoji: '🐼', count: 2 },
      { bg: '#F3E5F5', stroke: '#7B1FA2' },
      { bg: '#E0F7FA', stroke: '#00838F' },
    ),
    options: [
      { id: 'a', label: '5 pandas', visual: makeOptionSvg('🐼', 5) },
      { id: 'b', label: '6 pandas', visual: makeOptionSvg('🐼', 6) },
      { id: 'c', label: '7 pandas', visual: makeOptionSvg('🐼', 7) },
      { id: 'd', label: '8 pandas', visual: makeOptionSvg('🐼', 8) },
    ],
    correctAnswerId: 'c',
    explanation: 'The top row goes from 3 notes to 8 notes (add 5). So the bottom row goes from 2 pandas to 7 pandas (add 5).',
  },
  {
    id: 'na-m-018',
    category: 'number-analogies',
    difficulty: 'medium',
    prompt: 'Find the number rule in the top row. Use it on the bottom row.',
    visual: makeAnalogySvg(
      { emoji: '🍕', count: 9 }, { emoji: '🍕', count: 5 },
      { emoji: '🦉', count: 8 },
      { bg: '#FCE4EC', stroke: '#C62828' },
      { bg: '#E3F2FD', stroke: '#1565C0' },
    ),
    options: [
      { id: 'a', label: '3 owls', visual: makeOptionSvg('🦉', 3) },
      { id: 'b', label: '4 owls', visual: makeOptionSvg('🦉', 4) },
      { id: 'c', label: '5 owls', visual: makeOptionSvg('🦉', 5) },
      { id: 'd', label: '6 owls', visual: makeOptionSvg('🦉', 6) },
    ],
    correctAnswerId: 'b',
    explanation: 'The top row goes from 9 pizzas to 5 pizzas (subtract 4). So the bottom row goes from 8 owls to 4 owls (subtract 4).',
  },
  {
    id: 'na-m-019',
    category: 'number-analogies',
    difficulty: 'medium',
    prompt: 'How do the top numbers relate? Apply the same to the bottom.',
    visual: makeAnalogySvg(
      { emoji: '🍌', count: 2 }, { emoji: '🍌', count: 7 },
      { emoji: '🐬', count: 4 },
      { bg: '#FFF9C4', stroke: '#F9A825' },
      { bg: '#E8EAF6', stroke: '#283593' },
    ),
    options: [
      { id: 'a', label: '7 dolphins', visual: makeOptionSvg('🐬', 7) },
      { id: 'b', label: '8 dolphins', visual: makeOptionSvg('🐬', 8) },
      { id: 'c', label: '9 dolphins', visual: makeOptionSvg('🐬', 9) },
      { id: 'd', label: '10 dolphins', visual: makeOptionSvg('🐬', 10) },
    ],
    correctAnswerId: 'c',
    explanation: 'The top row goes from 2 bananas to 7 bananas (add 5). So the bottom row goes from 4 dolphins to 9 dolphins (add 5).',
  },
  {
    id: 'na-m-020',
    category: 'number-analogies',
    difficulty: 'medium',
    prompt: 'Discover the pattern in the top row and solve the bottom row.',
    visual: makeAnalogySvg(
      { emoji: '🦀', count: 7 }, { emoji: '🦀', count: 3 },
      { emoji: '🍒', count: 9 },
      { bg: '#E0F2F1', stroke: '#004D40' },
      { bg: '#FBE9E7', stroke: '#BF360C' },
    ),
    options: [
      { id: 'a', label: '4 cherries', visual: makeOptionSvg('🍒', 4) },
      { id: 'b', label: '5 cherries', visual: makeOptionSvg('🍒', 5) },
      { id: 'c', label: '6 cherries', visual: makeOptionSvg('🍒', 6) },
      { id: 'd', label: '7 cherries', visual: makeOptionSvg('🍒', 7) },
    ],
    correctAnswerId: 'b',
    explanation: 'The top row goes from 7 crabs to 3 crabs (subtract 4). So the bottom row goes from 9 cherries to 5 cherries (subtract 4).',
  },
  {
    id: 'na-m-021',
    category: 'number-analogies',
    difficulty: 'medium',
    prompt: 'Look at the pattern. What number completes the bottom row?',
    visual: makeAnalogySvg(
      { emoji: '🐘', count: 4 }, { emoji: '🐘', count: 9 },
      { emoji: '🦜', count: 3 },
      { bg: '#EFEBE9', stroke: '#4E342E' },
      { bg: '#E1F5FE', stroke: '#0277BD' },
    ),
    options: [
      { id: 'a', label: '6 parrots', visual: makeOptionSvg('🦜', 6) },
      { id: 'b', label: '7 parrots', visual: makeOptionSvg('🦜', 7) },
      { id: 'c', label: '8 parrots', visual: makeOptionSvg('🦜', 8) },
      { id: 'd', label: '9 parrots', visual: makeOptionSvg('🦜', 9) },
    ],
    correctAnswerId: 'c',
    explanation: 'The top row goes from 4 elephants to 9 elephants (add 5). So the bottom row goes from 3 parrots to 8 parrots (add 5).',
  },
  {
    id: 'na-m-022',
    category: 'number-analogies',
    difficulty: 'medium',
    prompt: 'How does the top row change? Do the same to the bottom row.',
    visual: makeAnalogySvg(
      { emoji: '🍇', count: 10 }, { emoji: '🍇', count: 4 },
      { emoji: '🐳', count: 8 },
      { bg: '#F9FBE7', stroke: '#827717' },
      { bg: '#EDE7F6', stroke: '#4527A0' },
    ),
    options: [
      { id: 'a', label: '1 whale', visual: makeOptionSvg('🐳', 1) },
      { id: 'b', label: '2 whales', visual: makeOptionSvg('🐳', 2) },
      { id: 'c', label: '3 whales', visual: makeOptionSvg('🐳', 3) },
      { id: 'd', label: '4 whales', visual: makeOptionSvg('🐳', 4) },
    ],
    correctAnswerId: 'b',
    explanation: 'The top row goes from 10 grapes to 4 grapes (subtract 6). So the bottom row goes from 8 whales to 2 whales (subtract 6).',
    hint: 'Count how many fewer are in the second box of the top row.',
  },
  // ===== NEW HARD (na-h-014 to na-h-021) =====
  {
    id: 'na-h-014',
    category: 'number-analogies',
    difficulty: 'hard',
    prompt: 'This is tricky! Find the rule in the top row and apply it to the bottom row.',
    visual: makeAnalogySvg(
      { emoji: '🎸', count: 2 }, { emoji: '🎸', count: 9 },
      { emoji: '🦁', count: 4 },
      { bg: '#E3F2FD', stroke: '#1976D2' },
      { bg: '#FFF3E0', stroke: '#E65100' },
    ),
    options: [
      { id: 'a', label: '9 lions', visual: makeOptionSvg('🦁', 9) },
      { id: 'b', label: '10 lions', visual: makeOptionSvg('🦁', 10) },
      { id: 'c', label: '11 lions', visual: makeOptionSvg('🦁', 11) },
      { id: 'd', label: '12 lions', visual: makeOptionSvg('🦁', 12) },
    ],
    correctAnswerId: 'c',
    explanation: 'The top row goes from 2 guitars to 9 guitars (add 7). So the bottom row goes from 4 lions to 11 lions (add 7).',
    hint: 'Count how many more are in the second box of the top row.',
  },
  {
    id: 'na-h-015',
    category: 'number-analogies',
    difficulty: 'hard',
    prompt: 'Find the hidden rule and solve the puzzle.',
    visual: makeAnalogySvg(
      { emoji: '🍒', count: 11 }, { emoji: '🍒', count: 3 },
      { emoji: '🐼', count: 10 },
      { bg: '#E8F5E9', stroke: '#1B5E20' },
      { bg: '#FFF8E1', stroke: '#FF8F00' },
    ),
    options: [
      { id: 'a', label: '1 panda', visual: makeOptionSvg('🐼', 1) },
      { id: 'b', label: '2 pandas', visual: makeOptionSvg('🐼', 2) },
      { id: 'c', label: '3 pandas', visual: makeOptionSvg('🐼', 3) },
      { id: 'd', label: '4 pandas', visual: makeOptionSvg('🐼', 4) },
    ],
    correctAnswerId: 'b',
    explanation: 'The top row goes from 11 cherries to 3 cherries (subtract 8). So the bottom row goes from 10 pandas to 2 pandas (subtract 8).',
  },
  {
    id: 'na-h-016',
    category: 'number-analogies',
    difficulty: 'hard',
    prompt: 'Think carefully about the relationship in the top row. Solve the bottom row.',
    visual: makeAnalogySvg(
      { emoji: '🐘', count: 1 }, { emoji: '🐘', count: 9 },
      { emoji: '🍌', count: 3 },
      { bg: '#F3E5F5', stroke: '#4A148C' },
      { bg: '#E8F5E9', stroke: '#1B5E20' },
    ),
    options: [
      { id: 'a', label: '9 bananas', visual: makeOptionSvg('🍌', 9) },
      { id: 'b', label: '10 bananas', visual: makeOptionSvg('🍌', 10) },
      { id: 'c', label: '11 bananas', visual: makeOptionSvg('🍌', 11) },
      { id: 'd', label: '12 bananas', visual: makeOptionSvg('🍌', 12) },
    ],
    correctAnswerId: 'c',
    explanation: 'The top row goes from 1 elephant to 9 elephants (add 8). So the bottom row goes from 3 bananas to 11 bananas (add 8).',
  },
  {
    id: 'na-h-017',
    category: 'number-analogies',
    difficulty: 'hard',
    prompt: 'This one is challenging! What is the secret rule?',
    visual: makeAnalogySvg(
      { emoji: '🦜', count: 12 }, { emoji: '🦜', count: 3 },
      { emoji: '🍕', count: 11 },
      { bg: '#FFF9C4', stroke: '#F57F17' },
      { bg: '#E1F5FE', stroke: '#01579B' },
    ),
    options: [
      { id: 'a', label: '1 pizza', visual: makeOptionSvg('🍕', 1) },
      { id: 'b', label: '2 pizzas', visual: makeOptionSvg('🍕', 2) },
      { id: 'c', label: '3 pizzas', visual: makeOptionSvg('🍕', 3) },
      { id: 'd', label: '4 pizzas', visual: makeOptionSvg('🍕', 4) },
    ],
    correctAnswerId: 'b',
    explanation: 'The top row goes from 12 parrots to 3 parrots (subtract 9). So the bottom row goes from 11 pizzas to 2 pizzas (subtract 9).',
    hint: 'Count how many fewer are in the second box of the top row.',
  },
  {
    id: 'na-h-018',
    category: 'number-analogies',
    difficulty: 'hard',
    prompt: 'Look very carefully at both rows. What is the pattern?',
    visual: makeAnalogySvg(
      { emoji: '🦀', count: 3 }, { emoji: '🦀', count: 12 },
      { emoji: '🐬', count: 2 },
      { bg: '#ECEFF1', stroke: '#37474F' },
      { bg: '#FBE9E7', stroke: '#D84315' },
    ),
    options: [
      { id: 'a', label: '9 dolphins', visual: makeOptionSvg('🐬', 9) },
      { id: 'b', label: '10 dolphins', visual: makeOptionSvg('🐬', 10) },
      { id: 'c', label: '11 dolphins', visual: makeOptionSvg('🐬', 11) },
      { id: 'd', label: '12 dolphins', visual: makeOptionSvg('🐬', 12) },
    ],
    correctAnswerId: 'c',
    explanation: 'The top row goes from 3 crabs to 12 crabs (add 9). So the bottom row goes from 2 dolphins to 11 dolphins (add 9).',
  },
  {
    id: 'na-h-019',
    category: 'number-analogies',
    difficulty: 'hard',
    prompt: 'Find the tricky rule. Both rows follow the same pattern.',
    visual: makeAnalogySvg(
      { emoji: '🍇', count: 10 }, { emoji: '🍇', count: 4 },
      { emoji: '🎶', count: 12 },
      { bg: '#E0F7FA', stroke: '#006064' },
      { bg: '#FCE4EC', stroke: '#880E4F' },
    ),
    options: [
      { id: 'a', label: '4 notes', visual: makeOptionSvg('🎶', 4) },
      { id: 'b', label: '5 notes', visual: makeOptionSvg('🎶', 5) },
      { id: 'c', label: '6 notes', visual: makeOptionSvg('🎶', 6) },
      { id: 'd', label: '7 notes', visual: makeOptionSvg('🎶', 7) },
    ],
    correctAnswerId: 'c',
    explanation: 'The top row goes from 10 grapes to 4 grapes (subtract 6). So the bottom row goes from 12 notes to 6 notes (subtract 6).',
  },
  {
    id: 'na-h-020',
    category: 'number-analogies',
    difficulty: 'hard',
    prompt: 'This is a tough one! Figure out the rule and complete the bottom row.',
    visual: makeAnalogySvg(
      { emoji: '🐳', count: 4 }, { emoji: '🐳', count: 11 },
      { emoji: '🦉', count: 5 },
      { bg: '#E8EAF6', stroke: '#283593' },
      { bg: '#FFF3E0', stroke: '#E65100' },
    ),
    options: [
      { id: 'a', label: '10 owls', visual: makeOptionSvg('🦉', 10) },
      { id: 'b', label: '11 owls', visual: makeOptionSvg('🦉', 11) },
      { id: 'c', label: '12 owls', visual: makeOptionSvg('🦉', 12) },
      { id: 'd', label: '13 owls', visual: makeOptionSvg('🦉', 13) },
    ],
    correctAnswerId: 'c',
    explanation: 'The top row goes from 4 whales to 11 whales (add 7). So the bottom row goes from 5 owls to 12 owls (add 7).',
  },
  {
    id: 'na-h-021',
    category: 'number-analogies',
    difficulty: 'hard',
    prompt: 'Find the hidden rule and solve the puzzle.',
    visual: makeAnalogySvg(
      { emoji: '🎸', count: 11 }, { emoji: '🎸', count: 2 },
      { emoji: '🐼', count: 10 },
      { bg: '#FCE4EC', stroke: '#AD1457' },
      { bg: '#E8F5E9', stroke: '#2E7D32' },
    ),
    options: [
      { id: 'a', label: '1 panda', visual: makeOptionSvg('🐼', 1) },
      { id: 'b', label: '2 pandas', visual: makeOptionSvg('🐼', 2) },
      { id: 'c', label: '3 pandas', visual: makeOptionSvg('🐼', 3) },
      { id: 'd', label: '4 pandas', visual: makeOptionSvg('🐼', 4) },
    ],
    correctAnswerId: 'a',
    explanation: 'The top row goes from 11 guitars to 2 guitars (subtract 9). So the bottom row goes from 10 pandas to 1 panda (subtract 9).',
    hint: 'Count how many fewer are in the second box of the top row.',
  },
];
