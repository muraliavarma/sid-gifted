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
];
