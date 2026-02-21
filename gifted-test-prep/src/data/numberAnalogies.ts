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
 * We represent them with emoji groups and clear number labels.
 */
export const numberAnalogies: Question[] = [
  // ===== EASY =====
  {
    id: 'na-e-001',
    category: 'number-analogies',
    difficulty: 'easy',
    prompt: 'Look at the top row. How do the numbers change? Now do the same thing to the bottom row.',
    visual: `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="180" height="100" rx="12" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <rect x="210" y="10" width="180" height="100" rx="12" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <rect x="10" y="130" width="180" height="100" rx="12" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <rect x="210" y="130" width="180" height="100" rx="12" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <text x="100" y="70" text-anchor="middle" font-size="36">⭐⭐</text>
      <text x="300" y="70" text-anchor="middle" font-size="36">⭐⭐⭐</text>
      <text x="100" y="190" text-anchor="middle" font-size="36">🔵🔵🔵🔵</text>
      <text x="300" y="190" text-anchor="middle" font-size="40" fill="#E65100">❓</text>
      <text x="195" y="70" text-anchor="middle" font-size="28" fill="#1976D2">→</text>
      <text x="195" y="190" text-anchor="middle" font-size="28" fill="#E65100">→</text>
    </svg>`,
    options: [
      { id: 'a', label: '3 circles' },
      { id: 'b', label: '5 circles' },
      { id: 'c', label: '4 circles' },
      { id: 'd', label: '6 circles' },
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
    visual: `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="180" height="100" rx="12" fill="#E8F5E9" stroke="#2E7D32" stroke-width="2"/>
      <rect x="210" y="10" width="180" height="100" rx="12" fill="#E8F5E9" stroke="#2E7D32" stroke-width="2"/>
      <rect x="10" y="130" width="180" height="100" rx="12" fill="#FCE4EC" stroke="#C62828" stroke-width="2"/>
      <rect x="210" y="130" width="180" height="100" rx="12" fill="#FCE4EC" stroke="#C62828" stroke-width="2"/>
      <text x="100" y="70" text-anchor="middle" font-size="36">🌸</text>
      <text x="300" y="70" text-anchor="middle" font-size="36">🌸🌸</text>
      <text x="100" y="190" text-anchor="middle" font-size="36">🦋🦋🦋</text>
      <text x="300" y="190" text-anchor="middle" font-size="40" fill="#C62828">❓</text>
      <text x="195" y="70" text-anchor="middle" font-size="28" fill="#2E7D32">→</text>
      <text x="195" y="190" text-anchor="middle" font-size="28" fill="#C62828">→</text>
    </svg>`,
    options: [
      { id: 'a', label: '2 butterflies' },
      { id: 'b', label: '3 butterflies' },
      { id: 'c', label: '4 butterflies' },
      { id: 'd', label: '5 butterflies' },
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
    visual: `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="180" height="100" rx="12" fill="#F3E5F5" stroke="#7B1FA2" stroke-width="2"/>
      <rect x="210" y="10" width="180" height="100" rx="12" fill="#F3E5F5" stroke="#7B1FA2" stroke-width="2"/>
      <rect x="10" y="130" width="180" height="100" rx="12" fill="#E0F7FA" stroke="#00838F" stroke-width="2"/>
      <rect x="210" y="130" width="180" height="100" rx="12" fill="#E0F7FA" stroke="#00838F" stroke-width="2"/>
      <text x="100" y="70" text-anchor="middle" font-size="36">🍎🍎🍎</text>
      <text x="300" y="70" text-anchor="middle" font-size="36">🍎🍎🍎🍎</text>
      <text x="100" y="190" text-anchor="middle" font-size="36">🐟🐟</text>
      <text x="300" y="190" text-anchor="middle" font-size="40" fill="#00838F">❓</text>
      <text x="195" y="70" text-anchor="middle" font-size="28" fill="#7B1FA2">→</text>
      <text x="195" y="190" text-anchor="middle" font-size="28" fill="#00838F">→</text>
    </svg>`,
    options: [
      { id: 'a', label: '1 fish' },
      { id: 'b', label: '2 fish' },
      { id: 'c', label: '3 fish' },
      { id: 'd', label: '4 fish' },
    ],
    correctAnswerId: 'c',
    explanation: 'The top row goes from 3 apples to 4 apples (add 1). So the bottom row goes from 2 fish to 3 fish (add 1).',
  },
  {
    id: 'na-e-004',
    category: 'number-analogies',
    difficulty: 'easy',
    prompt: 'Find the pattern in the top row and use it to solve the bottom row.',
    visual: `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="180" height="100" rx="12" fill="#FFF9C4" stroke="#F9A825" stroke-width="2"/>
      <rect x="210" y="10" width="180" height="100" rx="12" fill="#FFF9C4" stroke="#F9A825" stroke-width="2"/>
      <rect x="10" y="130" width="180" height="100" rx="12" fill="#E8EAF6" stroke="#283593" stroke-width="2"/>
      <rect x="210" y="130" width="180" height="100" rx="12" fill="#E8EAF6" stroke="#283593" stroke-width="2"/>
      <text x="100" y="70" text-anchor="middle" font-size="36">🌙🌙🌙🌙🌙</text>
      <text x="300" y="70" text-anchor="middle" font-size="36">🌙🌙🌙🌙</text>
      <text x="100" y="190" text-anchor="middle" font-size="36">❤️❤️❤️</text>
      <text x="300" y="190" text-anchor="middle" font-size="40" fill="#283593">❓</text>
      <text x="195" y="70" text-anchor="middle" font-size="28" fill="#F9A825">→</text>
      <text x="195" y="190" text-anchor="middle" font-size="28" fill="#283593">→</text>
    </svg>`,
    options: [
      { id: 'a', label: '2 hearts' },
      { id: 'b', label: '3 hearts' },
      { id: 'c', label: '4 hearts' },
      { id: 'd', label: '1 heart' },
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
    visual: `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="180" height="100" rx="12" fill="#E0F2F1" stroke="#00695C" stroke-width="2"/>
      <rect x="210" y="10" width="180" height="100" rx="12" fill="#E0F2F1" stroke="#00695C" stroke-width="2"/>
      <rect x="10" y="130" width="180" height="100" rx="12" fill="#FBE9E7" stroke="#BF360C" stroke-width="2"/>
      <rect x="210" y="130" width="180" height="100" rx="12" fill="#FBE9E7" stroke="#BF360C" stroke-width="2"/>
      <text x="100" y="70" text-anchor="middle" font-size="36">🎈🎈</text>
      <text x="300" y="70" text-anchor="middle" font-size="36">🎈🎈🎈🎈</text>
      <text x="100" y="190" text-anchor="middle" font-size="36">🐱🐱🐱</text>
      <text x="300" y="190" text-anchor="middle" font-size="40" fill="#BF360C">❓</text>
      <text x="195" y="70" text-anchor="middle" font-size="28" fill="#00695C">→</text>
      <text x="195" y="190" text-anchor="middle" font-size="28" fill="#BF360C">→</text>
    </svg>`,
    options: [
      { id: 'a', label: '4 cats' },
      { id: 'b', label: '5 cats' },
      { id: 'c', label: '6 cats' },
      { id: 'd', label: '7 cats' },
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
    visual: `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="180" height="100" rx="12" fill="#E3F2FD" stroke="#1565C0" stroke-width="2"/>
      <rect x="210" y="10" width="180" height="100" rx="12" fill="#E3F2FD" stroke="#1565C0" stroke-width="2"/>
      <rect x="10" y="130" width="180" height="100" rx="12" fill="#F1F8E9" stroke="#33691E" stroke-width="2"/>
      <rect x="210" y="130" width="180" height="100" rx="12" fill="#F1F8E9" stroke="#33691E" stroke-width="2"/>
      <text x="100" y="70" text-anchor="middle" font-size="36">🔵🔵🔵🔵</text>
      <text x="300" y="70" text-anchor="middle" font-size="36">🔵🔵</text>
      <text x="100" y="190" text-anchor="middle" font-size="36">🌺🌺🌺🌺🌺🌺</text>
      <text x="300" y="190" text-anchor="middle" font-size="40" fill="#33691E">❓</text>
      <text x="195" y="70" text-anchor="middle" font-size="28" fill="#1565C0">→</text>
      <text x="195" y="190" text-anchor="middle" font-size="28" fill="#33691E">→</text>
    </svg>`,
    options: [
      { id: 'a', label: '2 flowers' },
      { id: 'b', label: '3 flowers' },
      { id: 'c', label: '4 flowers' },
      { id: 'd', label: '5 flowers' },
    ],
    correctAnswerId: 'c',
    explanation: 'The top row goes from 4 circles to 2 circles (subtract 2). So the bottom row goes from 6 flowers to 4 flowers (subtract 2).',
  },
  {
    id: 'na-e-007',
    category: 'number-analogies',
    difficulty: 'easy',
    prompt: 'Look at the pattern. What number completes the bottom row?',
    visual: `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="180" height="100" rx="12" fill="#FCE4EC" stroke="#AD1457" stroke-width="2"/>
      <rect x="210" y="10" width="180" height="100" rx="12" fill="#FCE4EC" stroke="#AD1457" stroke-width="2"/>
      <rect x="10" y="130" width="180" height="100" rx="12" fill="#E8F5E9" stroke="#2E7D32" stroke-width="2"/>
      <rect x="210" y="130" width="180" height="100" rx="12" fill="#E8F5E9" stroke="#2E7D32" stroke-width="2"/>
      <text x="100" y="70" text-anchor="middle" font-size="36">🌟</text>
      <text x="300" y="70" text-anchor="middle" font-size="36">🌟🌟🌟</text>
      <text x="100" y="190" text-anchor="middle" font-size="36">🐸🐸</text>
      <text x="300" y="190" text-anchor="middle" font-size="40" fill="#2E7D32">❓</text>
      <text x="195" y="70" text-anchor="middle" font-size="28" fill="#AD1457">→</text>
      <text x="195" y="190" text-anchor="middle" font-size="28" fill="#2E7D32">→</text>
    </svg>`,
    options: [
      { id: 'a', label: '3 frogs' },
      { id: 'b', label: '4 frogs' },
      { id: 'c', label: '5 frogs' },
      { id: 'd', label: '6 frogs' },
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
    visual: `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="180" height="100" rx="12" fill="#E8EAF6" stroke="#283593" stroke-width="2"/>
      <rect x="210" y="10" width="180" height="100" rx="12" fill="#E8EAF6" stroke="#283593" stroke-width="2"/>
      <rect x="10" y="130" width="180" height="100" rx="12" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <rect x="210" y="130" width="180" height="100" rx="12" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <text x="100" y="70" text-anchor="middle" font-size="36">🔶🔶🔶</text>
      <text x="300" y="70" text-anchor="middle" font-size="36">🔶🔶🔶🔶🔶🔶</text>
      <text x="100" y="190" text-anchor="middle" font-size="36">🐝🐝🐝🐝</text>
      <text x="300" y="190" text-anchor="middle" font-size="40" fill="#E65100">❓</text>
      <text x="195" y="70" text-anchor="middle" font-size="28" fill="#283593">→</text>
      <text x="195" y="190" text-anchor="middle" font-size="28" fill="#E65100">→</text>
    </svg>`,
    options: [
      { id: 'a', label: '6 bees' },
      { id: 'b', label: '7 bees' },
      { id: 'c', label: '8 bees' },
      { id: 'd', label: '5 bees' },
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
    visual: `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="180" height="100" rx="12" fill="#F3E5F5" stroke="#6A1B9A" stroke-width="2"/>
      <rect x="210" y="10" width="180" height="100" rx="12" fill="#F3E5F5" stroke="#6A1B9A" stroke-width="2"/>
      <rect x="10" y="130" width="180" height="100" rx="12" fill="#E0F7FA" stroke="#00695C" stroke-width="2"/>
      <rect x="210" y="130" width="180" height="100" rx="12" fill="#E0F7FA" stroke="#00695C" stroke-width="2"/>
      <text x="100" y="70" text-anchor="middle" font-size="30">🍭🍭🍭🍭🍭🍭</text>
      <text x="300" y="70" text-anchor="middle" font-size="36">🍭🍭🍭</text>
      <text x="100" y="190" text-anchor="middle" font-size="30">🎀🎀🎀🎀🎀🎀🎀🎀</text>
      <text x="300" y="190" text-anchor="middle" font-size="40" fill="#00695C">❓</text>
      <text x="195" y="70" text-anchor="middle" font-size="28" fill="#6A1B9A">→</text>
      <text x="195" y="190" text-anchor="middle" font-size="28" fill="#00695C">→</text>
    </svg>`,
    options: [
      { id: 'a', label: '3 bows' },
      { id: 'b', label: '4 bows' },
      { id: 'c', label: '5 bows' },
      { id: 'd', label: '6 bows' },
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
    visual: `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="180" height="100" rx="12" fill="#E8F5E9" stroke="#1B5E20" stroke-width="2"/>
      <rect x="210" y="10" width="180" height="100" rx="12" fill="#E8F5E9" stroke="#1B5E20" stroke-width="2"/>
      <rect x="10" y="130" width="180" height="100" rx="12" fill="#FFF8E1" stroke="#FF8F00" stroke-width="2"/>
      <rect x="210" y="130" width="180" height="100" rx="12" fill="#FFF8E1" stroke="#FF8F00" stroke-width="2"/>
      <text x="100" y="70" text-anchor="middle" font-size="36">🐞🐞</text>
      <text x="300" y="70" text-anchor="middle" font-size="36">🐞🐞🐞🐞🐞</text>
      <text x="100" y="190" text-anchor="middle" font-size="36">🌈🌈🌈</text>
      <text x="300" y="190" text-anchor="middle" font-size="40" fill="#FF8F00">❓</text>
      <text x="195" y="70" text-anchor="middle" font-size="28" fill="#1B5E20">→</text>
      <text x="195" y="190" text-anchor="middle" font-size="28" fill="#FF8F00">→</text>
    </svg>`,
    options: [
      { id: 'a', label: '5 rainbows' },
      { id: 'b', label: '6 rainbows' },
      { id: 'c', label: '7 rainbows' },
      { id: 'd', label: '4 rainbows' },
    ],
    correctAnswerId: 'b',
    explanation: 'The top row goes from 2 ladybugs to 5 ladybugs (add 3). So the bottom row goes from 3 rainbows to 6 rainbows (add 3).',
  },
  {
    id: 'na-m-004',
    category: 'number-analogies',
    difficulty: 'medium',
    prompt: 'Find the number rule in the top row. Use it on the bottom row.',
    visual: `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="180" height="100" rx="12" fill="#EFEBE9" stroke="#4E342E" stroke-width="2"/>
      <rect x="210" y="10" width="180" height="100" rx="12" fill="#EFEBE9" stroke="#4E342E" stroke-width="2"/>
      <rect x="10" y="130" width="180" height="100" rx="12" fill="#E1F5FE" stroke="#0277BD" stroke-width="2"/>
      <rect x="210" y="130" width="180" height="100" rx="12" fill="#E1F5FE" stroke="#0277BD" stroke-width="2"/>
      <text x="100" y="70" text-anchor="middle" font-size="28">🎯🎯🎯🎯🎯🎯🎯</text>
      <text x="300" y="70" text-anchor="middle" font-size="36">🎯🎯🎯🎯</text>
      <text x="100" y="190" text-anchor="middle" font-size="28">🦊🦊🦊🦊🦊🦊🦊🦊🦊</text>
      <text x="300" y="190" text-anchor="middle" font-size="40" fill="#0277BD">❓</text>
      <text x="195" y="70" text-anchor="middle" font-size="28" fill="#4E342E">→</text>
      <text x="195" y="190" text-anchor="middle" font-size="28" fill="#0277BD">→</text>
    </svg>`,
    options: [
      { id: 'a', label: '5 foxes' },
      { id: 'b', label: '6 foxes' },
      { id: 'c', label: '7 foxes' },
      { id: 'd', label: '8 foxes' },
    ],
    correctAnswerId: 'b',
    explanation: 'The top row goes from 7 targets to 4 targets (subtract 3). So the bottom row goes from 9 foxes to 6 foxes (subtract 3).',
  },
  {
    id: 'na-m-005',
    category: 'number-analogies',
    difficulty: 'medium',
    prompt: 'How do the top numbers relate? Apply the same to the bottom.',
    visual: `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="180" height="100" rx="12" fill="#F9FBE7" stroke="#827717" stroke-width="2"/>
      <rect x="210" y="10" width="180" height="100" rx="12" fill="#F9FBE7" stroke="#827717" stroke-width="2"/>
      <rect x="10" y="130" width="180" height="100" rx="12" fill="#EDE7F6" stroke="#4527A0" stroke-width="2"/>
      <rect x="210" y="130" width="180" height="100" rx="12" fill="#EDE7F6" stroke="#4527A0" stroke-width="2"/>
      <text x="100" y="70" text-anchor="middle" font-size="36">🎈</text>
      <text x="300" y="70" text-anchor="middle" font-size="36">🎈🎈🎈</text>
      <text x="100" y="190" text-anchor="middle" font-size="36">🍀🍀🍀</text>
      <text x="300" y="190" text-anchor="middle" font-size="40" fill="#4527A0">❓</text>
      <text x="195" y="70" text-anchor="middle" font-size="28" fill="#827717">→</text>
      <text x="195" y="190" text-anchor="middle" font-size="28" fill="#4527A0">→</text>
    </svg>`,
    options: [
      { id: 'a', label: '6 clovers' },
      { id: 'b', label: '7 clovers' },
      { id: 'c', label: '8 clovers' },
      { id: 'd', label: '9 clovers' },
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
    visual: `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="180" height="100" rx="12" fill="#E0F2F1" stroke="#004D40" stroke-width="2"/>
      <rect x="210" y="10" width="180" height="100" rx="12" fill="#E0F2F1" stroke="#004D40" stroke-width="2"/>
      <rect x="10" y="130" width="180" height="100" rx="12" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <rect x="210" y="130" width="180" height="100" rx="12" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <text x="100" y="70" text-anchor="middle" font-size="30">🍓🍓🍓🍓🍓</text>
      <text x="300" y="70" text-anchor="middle" font-size="28">🍓🍓🍓🍓🍓🍓🍓🍓</text>
      <text x="100" y="190" text-anchor="middle" font-size="36">🐣🐣🐣🐣</text>
      <text x="300" y="190" text-anchor="middle" font-size="40" fill="#E65100">❓</text>
      <text x="195" y="70" text-anchor="middle" font-size="28" fill="#004D40">→</text>
      <text x="195" y="190" text-anchor="middle" font-size="28" fill="#E65100">→</text>
    </svg>`,
    options: [
      { id: 'a', label: '6 chicks' },
      { id: 'b', label: '7 chicks' },
      { id: 'c', label: '8 chicks' },
      { id: 'd', label: '5 chicks' },
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
    visual: `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="180" height="100" rx="12" fill="#FCE4EC" stroke="#880E4F" stroke-width="2"/>
      <rect x="210" y="10" width="180" height="100" rx="12" fill="#FCE4EC" stroke="#880E4F" stroke-width="2"/>
      <rect x="10" y="130" width="180" height="100" rx="12" fill="#E8EAF6" stroke="#1A237E" stroke-width="2"/>
      <rect x="210" y="130" width="180" height="100" rx="12" fill="#E8EAF6" stroke="#1A237E" stroke-width="2"/>
      <text x="100" y="70" text-anchor="middle" font-size="36">🔴🔴</text>
      <text x="300" y="70" text-anchor="middle" font-size="28">🔴🔴🔴🔴🔴🔴</text>
      <text x="100" y="190" text-anchor="middle" font-size="36">🌻🌻🌻</text>
      <text x="300" y="190" text-anchor="middle" font-size="40" fill="#1A237E">❓</text>
      <text x="195" y="70" text-anchor="middle" font-size="28" fill="#880E4F">→</text>
      <text x="195" y="190" text-anchor="middle" font-size="28" fill="#1A237E">→</text>
    </svg>`,
    options: [
      { id: 'a', label: '6 sunflowers' },
      { id: 'b', label: '7 sunflowers' },
      { id: 'c', label: '8 sunflowers' },
      { id: 'd', label: '9 sunflowers' },
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
    visual: `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="180" height="100" rx="12" fill="#E0F7FA" stroke="#006064" stroke-width="2"/>
      <rect x="210" y="10" width="180" height="100" rx="12" fill="#E0F7FA" stroke="#006064" stroke-width="2"/>
      <rect x="10" y="130" width="180" height="100" rx="12" fill="#FBE9E7" stroke="#BF360C" stroke-width="2"/>
      <rect x="210" y="130" width="180" height="100" rx="12" fill="#FBE9E7" stroke="#BF360C" stroke-width="2"/>
      <text x="100" y="70" text-anchor="middle" font-size="28">🎪🎪🎪🎪🎪🎪🎪🎪</text>
      <text x="300" y="70" text-anchor="middle" font-size="36">🎪🎪🎪🎪</text>
      <text x="100" y="190" text-anchor="middle" font-size="28">🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺</text>
      <text x="300" y="190" text-anchor="middle" font-size="40" fill="#BF360C">❓</text>
      <text x="195" y="70" text-anchor="middle" font-size="28" fill="#006064">→</text>
      <text x="195" y="190" text-anchor="middle" font-size="28" fill="#BF360C">→</text>
    </svg>`,
    options: [
      { id: 'a', label: '4 flowers' },
      { id: 'b', label: '5 flowers' },
      { id: 'c', label: '6 flowers' },
      { id: 'd', label: '7 flowers' },
    ],
    correctAnswerId: 'b',
    explanation: 'The top row goes from 8 tents to 4 tents (halved/÷2). So the bottom row goes from 10 flowers to 5 flowers (halved/÷2).',
  },
  {
    id: 'na-h-003',
    category: 'number-analogies',
    difficulty: 'hard',
    prompt: 'Think carefully about the relationship in the top row. Solve the bottom row.',
    visual: `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="180" height="100" rx="12" fill="#F3E5F5" stroke="#4A148C" stroke-width="2"/>
      <rect x="210" y="10" width="180" height="100" rx="12" fill="#F3E5F5" stroke="#4A148C" stroke-width="2"/>
      <rect x="10" y="130" width="180" height="100" rx="12" fill="#E8F5E9" stroke="#1B5E20" stroke-width="2"/>
      <rect x="210" y="130" width="180" height="100" rx="12" fill="#E8F5E9" stroke="#1B5E20" stroke-width="2"/>
      <text x="100" y="70" text-anchor="middle" font-size="36">🎲🎲🎲</text>
      <text x="300" y="70" text-anchor="middle" font-size="28">🎲🎲🎲🎲🎲🎲🎲</text>
      <text x="100" y="190" text-anchor="middle" font-size="36">🐢🐢🐢🐢</text>
      <text x="300" y="190" text-anchor="middle" font-size="40" fill="#1B5E20">❓</text>
      <text x="195" y="70" text-anchor="middle" font-size="28" fill="#4A148C">→</text>
      <text x="195" y="190" text-anchor="middle" font-size="28" fill="#1B5E20">→</text>
    </svg>`,
    options: [
      { id: 'a', label: '7 turtles' },
      { id: 'b', label: '8 turtles' },
      { id: 'c', label: '9 turtles' },
      { id: 'd', label: '10 turtles' },
    ],
    correctAnswerId: 'b',
    explanation: 'The top row goes from 3 dice to 7 dice (add 4). So the bottom row goes from 4 turtles to 8 turtles (add 4).',
  },
  {
    id: 'na-h-004',
    category: 'number-analogies',
    difficulty: 'hard',
    prompt: 'This one is challenging! What is the secret rule?',
    visual: `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="180" height="100" rx="12" fill="#FFF8E1" stroke="#F57F17" stroke-width="2"/>
      <rect x="210" y="10" width="180" height="100" rx="12" fill="#FFF8E1" stroke="#F57F17" stroke-width="2"/>
      <rect x="10" y="130" width="180" height="100" rx="12" fill="#E1F5FE" stroke="#01579B" stroke-width="2"/>
      <rect x="210" y="130" width="180" height="100" rx="12" fill="#E1F5FE" stroke="#01579B" stroke-width="2"/>
      <text x="100" y="70" text-anchor="middle" font-size="36">🎵🎵🎵🎵🎵</text>
      <text x="300" y="70" text-anchor="middle" font-size="28">🎵🎵🎵🎵🎵🎵🎵🎵🎵🎵</text>
      <text x="100" y="190" text-anchor="middle" font-size="36">🦋🦋🦋</text>
      <text x="300" y="190" text-anchor="middle" font-size="40" fill="#01579B">❓</text>
      <text x="195" y="70" text-anchor="middle" font-size="28" fill="#F57F17">→</text>
      <text x="195" y="190" text-anchor="middle" font-size="28" fill="#01579B">→</text>
    </svg>`,
    options: [
      { id: 'a', label: '5 butterflies' },
      { id: 'b', label: '6 butterflies' },
      { id: 'c', label: '8 butterflies' },
      { id: 'd', label: '4 butterflies' },
    ],
    correctAnswerId: 'b',
    explanation: 'The top row goes from 5 notes to 10 notes (double/×2). So the bottom row goes from 3 butterflies to 6 butterflies (double/×2).',
  },
  {
    id: 'na-h-005',
    category: 'number-analogies',
    difficulty: 'hard',
    prompt: 'Look very carefully at both rows. What is the pattern?',
    visual: `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="180" height="100" rx="12" fill="#ECEFF1" stroke="#37474F" stroke-width="2"/>
      <rect x="210" y="10" width="180" height="100" rx="12" fill="#ECEFF1" stroke="#37474F" stroke-width="2"/>
      <rect x="10" y="130" width="180" height="100" rx="12" fill="#FBE9E7" stroke="#D84315" stroke-width="2"/>
      <rect x="210" y="130" width="180" height="100" rx="12" fill="#FBE9E7" stroke="#D84315" stroke-width="2"/>
      <text x="100" y="70" text-anchor="middle" font-size="28">🎁🎁🎁🎁🎁🎁🎁🎁🎁</text>
      <text x="300" y="70" text-anchor="middle" font-size="36">🎁🎁🎁</text>
      <text x="100" y="190" text-anchor="middle" font-size="28">🐙🐙🐙🐙🐙🐙</text>
      <text x="300" y="190" text-anchor="middle" font-size="40" fill="#D84315">❓</text>
      <text x="195" y="70" text-anchor="middle" font-size="28" fill="#37474F">→</text>
      <text x="195" y="190" text-anchor="middle" font-size="28" fill="#D84315">→</text>
    </svg>`,
    options: [
      { id: 'a', label: '1 octopus' },
      { id: 'b', label: '2 octopi' },
      { id: 'c', label: '3 octopi' },
      { id: 'd', label: '4 octopi' },
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
    visual: `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="180" height="100" rx="12" fill="#E8F5E9" stroke="#2E7D32" stroke-width="2"/>
      <rect x="210" y="10" width="180" height="100" rx="12" fill="#E8F5E9" stroke="#2E7D32" stroke-width="2"/>
      <rect x="10" y="130" width="180" height="100" rx="12" fill="#F3E5F5" stroke="#7B1FA2" stroke-width="2"/>
      <rect x="210" y="130" width="180" height="100" rx="12" fill="#F3E5F5" stroke="#7B1FA2" stroke-width="2"/>
      <text x="100" y="70" text-anchor="middle" font-size="36">🐝🐝</text>
      <text x="300" y="70" text-anchor="middle" font-size="28">🐝🐝🐝🐝🐝🐝🐝</text>
      <text x="100" y="190" text-anchor="middle" font-size="36">🍎🍎🍎</text>
      <text x="300" y="190" text-anchor="middle" font-size="40" fill="#7B1FA2">❓</text>
      <text x="195" y="70" text-anchor="middle" font-size="28" fill="#2E7D32">→</text>
      <text x="195" y="190" text-anchor="middle" font-size="28" fill="#7B1FA2">→</text>
    </svg>`,
    options: [
      { id: 'a', label: '7 apples' },
      { id: 'b', label: '8 apples' },
      { id: 'c', label: '9 apples' },
      { id: 'd', label: '10 apples' },
    ],
    correctAnswerId: 'b',
    explanation: 'The top row goes from 2 bees to 7 bees (add 5). So the bottom row goes from 3 apples to 8 apples (add 5).',
  },
];
