import type { Question } from '../types';

/**
 * Sentence Completion (CogAT Verbal Battery style)
 *
 * Format: A parent reads a sentence aloud that has a blank.
 * The child picks the emoji picture that best completes the sentence.
 * E.g., "Fish live in the ___" -> water (ocean emoji).
 */

// Helper: builds the main question SVG showing a sentence with a highlighted blank
function makeSentenceSvg(beforeBlank: string, afterBlank: string): string {
  return `<svg viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="400" height="120" rx="16" fill="#FAFAFA"/>
    <text x="200" y="35" text-anchor="middle" font-size="15" fill="#888">Complete the sentence:</text>
    <text x="200" y="75" text-anchor="middle" font-size="20" fill="#333">
      <tspan>${beforeBlank}</tspan>
      <tspan fill="#E65100" font-weight="bold"> ___ </tspan>
      <tspan>${afterBlank}</tspan>
    </text>
  </svg>`;
}

// Helper: builds a small option SVG with a single emoji
function makeOptionEmoji(emoji: string): string {
  return `<svg viewBox="0 0 70 50" xmlns="http://www.w3.org/2000/svg"><text x="35" y="38" text-anchor="middle" font-size="30">${emoji}</text></svg>`;
}

export const sentenceCompletion: Question[] = [
  // ===== EASY (7 questions) =====

  // sc-e-001: Fish live in the ___
  {
    id: 'sc-e-001',
    category: 'sentence-completion',
    difficulty: 'easy',
    prompt: 'Fish live in the ___',
    visual: makeSentenceSvg('Fish live in the', ''),
    options: [
      { id: 'a', label: 'Water', visual: makeOptionEmoji('\u{1F30A}') },
      { id: 'b', label: 'Tree', visual: makeOptionEmoji('\u{1F333}') },
      { id: 'c', label: 'House', visual: makeOptionEmoji('\u{1F3E0}') },
      { id: 'd', label: 'Cloud', visual: makeOptionEmoji('\u{2601}\u{FE0F}') },
    ],
    correctAnswerId: 'a',
    explanation: 'Fish live in the water!',
    hint: 'Where do you see fish swimming?',
  },

  // sc-e-002: Birds fly in the ___
  {
    id: 'sc-e-002',
    category: 'sentence-completion',
    difficulty: 'easy',
    prompt: 'Birds fly in the ___',
    visual: makeSentenceSvg('Birds fly in the', ''),
    options: [
      { id: 'a', label: 'Ocean', visual: makeOptionEmoji('\u{1F30A}') },
      { id: 'b', label: 'Sky', visual: makeOptionEmoji('\u{1F324}\u{FE0F}') },
      { id: 'c', label: 'Mountain', visual: makeOptionEmoji('\u{1F3D4}\u{FE0F}') },
      { id: 'd', label: 'Box', visual: makeOptionEmoji('\u{1F4E6}') },
    ],
    correctAnswerId: 'b',
    explanation: 'Birds fly in the sky!',
    hint: 'Look up! Where do birds go?',
  },

  // sc-e-003: We sleep in a ___
  {
    id: 'sc-e-003',
    category: 'sentence-completion',
    difficulty: 'easy',
    prompt: 'We sleep in a ___',
    visual: makeSentenceSvg('We sleep in a', ''),
    options: [
      { id: 'a', label: 'Car', visual: makeOptionEmoji('\u{1F697}') },
      { id: 'b', label: 'Tree', visual: makeOptionEmoji('\u{1F333}') },
      { id: 'c', label: 'Bed', visual: makeOptionEmoji('\u{1F6CF}\u{FE0F}') },
      { id: 'd', label: 'Ball', visual: makeOptionEmoji('\u{26BD}') },
    ],
    correctAnswerId: 'c',
    explanation: 'We sleep in a bed!',
    hint: 'What do you lie down on at night?',
  },

  // sc-e-004: We cut paper with ___
  {
    id: 'sc-e-004',
    category: 'sentence-completion',
    difficulty: 'easy',
    prompt: 'We cut paper with ___',
    visual: makeSentenceSvg('We cut paper with', ''),
    options: [
      { id: 'a', label: 'Apple', visual: makeOptionEmoji('\u{1F34E}') },
      { id: 'b', label: 'Scissors', visual: makeOptionEmoji('\u{2702}\u{FE0F}') },
      { id: 'c', label: 'Book', visual: makeOptionEmoji('\u{1F4D6}') },
      { id: 'd', label: 'Guitar', visual: makeOptionEmoji('\u{1F3B8}') },
    ],
    correctAnswerId: 'b',
    explanation: 'We cut paper with scissors!',
    hint: 'What tool has two sharp blades?',
  },

  // sc-e-005: You write with a ___
  {
    id: 'sc-e-005',
    category: 'sentence-completion',
    difficulty: 'easy',
    prompt: 'You write with a ___',
    visual: makeSentenceSvg('You write with a', ''),
    options: [
      { id: 'a', label: 'Pizza', visual: makeOptionEmoji('\u{1F355}') },
      { id: 'b', label: 'Guitar', visual: makeOptionEmoji('\u{1F3B8}') },
      { id: 'c', label: 'Pencil', visual: makeOptionEmoji('\u{270F}\u{FE0F}') },
      { id: 'd', label: 'Car', visual: makeOptionEmoji('\u{1F697}') },
    ],
    correctAnswerId: 'c',
    explanation: 'You write with a pencil!',
    hint: 'What do you hold in your hand to draw letters?',
  },

  // sc-e-006: We eat food with a ___
  {
    id: 'sc-e-006',
    category: 'sentence-completion',
    difficulty: 'easy',
    prompt: 'We eat food with a ___',
    visual: makeSentenceSvg('We eat food with a', ''),
    options: [
      { id: 'a', label: 'Tennis ball', visual: makeOptionEmoji('\u{1F3BE}') },
      { id: 'b', label: 'Spoon', visual: makeOptionEmoji('\u{1F944}') },
      { id: 'c', label: 'Phone', visual: makeOptionEmoji('\u{1F4F1}') },
      { id: 'd', label: 'Key', visual: makeOptionEmoji('\u{1F511}') },
    ],
    correctAnswerId: 'b',
    explanation: 'We eat food with a spoon!',
    hint: 'What do you use to scoop up soup?',
  },

  // sc-e-007: Rain falls from the ___
  {
    id: 'sc-e-007',
    category: 'sentence-completion',
    difficulty: 'easy',
    prompt: 'Rain falls from the ___',
    visual: makeSentenceSvg('Rain falls from the', ''),
    options: [
      { id: 'a', label: 'Ocean', visual: makeOptionEmoji('\u{1F30A}') },
      { id: 'b', label: 'House', visual: makeOptionEmoji('\u{1F3E0}') },
      { id: 'c', label: 'Tree', visual: makeOptionEmoji('\u{1F333}') },
      { id: 'd', label: 'Clouds', visual: makeOptionEmoji('\u{2601}\u{FE0F}') },
    ],
    correctAnswerId: 'd',
    explanation: 'Rain falls from the clouds!',
    hint: 'What do you see in the sky when it rains?',
  },

  // ===== MEDIUM (8 questions) =====

  // sc-m-001: A farmer works on a ___
  {
    id: 'sc-m-001',
    category: 'sentence-completion',
    difficulty: 'medium',
    prompt: 'A farmer works on a ___',
    visual: makeSentenceSvg('A farmer works on a', ''),
    options: [
      { id: 'a', label: 'Farm', visual: makeOptionEmoji('\u{1F33E}') },
      { id: 'b', label: 'Office', visual: makeOptionEmoji('\u{1F3E2}') },
      { id: 'c', label: 'Ship', visual: makeOptionEmoji('\u{1F6A2}') },
      { id: 'd', label: 'Airplane', visual: makeOptionEmoji('\u{2708}\u{FE0F}') },
    ],
    correctAnswerId: 'a',
    explanation: 'A farmer works on a farm, growing food and taking care of animals!',
    hint: 'Where do farmers grow their crops?',
  },

  // sc-m-002: You read stories in a ___
  {
    id: 'sc-m-002',
    category: 'sentence-completion',
    difficulty: 'medium',
    prompt: 'You read stories in a ___',
    visual: makeSentenceSvg('You read stories in a', ''),
    options: [
      { id: 'a', label: 'Guitar', visual: makeOptionEmoji('\u{1F3B8}') },
      { id: 'b', label: 'Book', visual: makeOptionEmoji('\u{1F4D6}') },
      { id: 'c', label: 'Car', visual: makeOptionEmoji('\u{1F697}') },
      { id: 'd', label: 'Pizza', visual: makeOptionEmoji('\u{1F355}') },
    ],
    correctAnswerId: 'b',
    explanation: 'You read stories in a book!',
    hint: 'What has pages with words and pictures?',
  },

  // sc-m-003: When it is cold, you wear a ___
  {
    id: 'sc-m-003',
    category: 'sentence-completion',
    difficulty: 'medium',
    prompt: 'When it is cold, you wear a ___',
    visual: makeSentenceSvg('When it is cold, you wear a', ''),
    options: [
      { id: 'a', label: 'Shorts', visual: makeOptionEmoji('\u{1FA73}') },
      { id: 'b', label: 'Sunglasses', visual: makeOptionEmoji('\u{1F576}\u{FE0F}') },
      { id: 'c', label: 'Coat', visual: makeOptionEmoji('\u{1F9E5}') },
      { id: 'd', label: 'Beach', visual: makeOptionEmoji('\u{1F3D6}\u{FE0F}') },
    ],
    correctAnswerId: 'c',
    explanation: 'When it is cold, you wear a coat to stay warm!',
    hint: 'What keeps you warm in winter?',
  },

  // sc-m-004: A ___ gives us milk
  {
    id: 'sc-m-004',
    category: 'sentence-completion',
    difficulty: 'medium',
    prompt: 'A ___ gives us milk',
    visual: makeSentenceSvg('A', 'gives us milk'),
    options: [
      { id: 'a', label: 'Chicken', visual: makeOptionEmoji('\u{1F414}') },
      { id: 'b', label: 'Fish', visual: makeOptionEmoji('\u{1F41F}') },
      { id: 'c', label: 'Cow', visual: makeOptionEmoji('\u{1F404}') },
      { id: 'd', label: 'Lion', visual: makeOptionEmoji('\u{1F981}') },
    ],
    correctAnswerId: 'c',
    explanation: 'A cow gives us milk!',
    hint: 'Which animal do farmers milk?',
  },

  // sc-m-005: A firefighter drives a ___
  {
    id: 'sc-m-005',
    category: 'sentence-completion',
    difficulty: 'medium',
    prompt: 'A firefighter drives a ___',
    visual: makeSentenceSvg('A firefighter drives a', ''),
    options: [
      { id: 'a', label: 'Airplane', visual: makeOptionEmoji('\u{2708}\u{FE0F}') },
      { id: 'b', label: 'Fire truck', visual: makeOptionEmoji('\u{1F692}') },
      { id: 'c', label: 'Bicycle', visual: makeOptionEmoji('\u{1F6B2}') },
      { id: 'd', label: 'Scooter', visual: makeOptionEmoji('\u{1F6F4}') },
    ],
    correctAnswerId: 'b',
    explanation: 'A firefighter drives a fire truck to put out fires!',
    hint: 'What big red vehicle has a siren and a ladder?',
  },

  // sc-m-006: Bees make ___
  {
    id: 'sc-m-006',
    category: 'sentence-completion',
    difficulty: 'medium',
    prompt: 'Bees make ___',
    visual: makeSentenceSvg('Bees make', ''),
    options: [
      { id: 'a', label: 'Butter', visual: makeOptionEmoji('\u{1F9C8}') },
      { id: 'b', label: 'Milk', visual: makeOptionEmoji('\u{1F95B}') },
      { id: 'c', label: 'Honey', visual: makeOptionEmoji('\u{1F36F}') },
      { id: 'd', label: 'Pizza', visual: makeOptionEmoji('\u{1F355}') },
    ],
    correctAnswerId: 'c',
    explanation: 'Bees make honey! They collect nectar from flowers and turn it into sweet honey.',
    hint: 'What sweet, sticky food comes from a beehive?',
  },

  // sc-m-007: A ___ keeps you dry in the rain
  {
    id: 'sc-m-007',
    category: 'sentence-completion',
    difficulty: 'medium',
    prompt: 'A ___ keeps you dry in the rain',
    visual: makeSentenceSvg('A', 'keeps you dry in the rain'),
    options: [
      { id: 'a', label: 'Guitar', visual: makeOptionEmoji('\u{1F3B8}') },
      { id: 'b', label: 'Umbrella', visual: makeOptionEmoji('\u{2602}\u{FE0F}') },
      { id: 'c', label: 'Phone', visual: makeOptionEmoji('\u{1F4F1}') },
      { id: 'd', label: 'Apple', visual: makeOptionEmoji('\u{1F34E}') },
    ],
    correctAnswerId: 'b',
    explanation: 'An umbrella keeps you dry in the rain!',
    hint: 'What do you hold over your head when it rains?',
  },

  // sc-m-008: Leaves fall from ___
  {
    id: 'sc-m-008',
    category: 'sentence-completion',
    difficulty: 'medium',
    prompt: 'Leaves fall from ___',
    visual: makeSentenceSvg('Leaves fall from', ''),
    options: [
      { id: 'a', label: 'House', visual: makeOptionEmoji('\u{1F3E0}') },
      { id: 'b', label: 'Trees', visual: makeOptionEmoji('\u{1F333}') },
      { id: 'c', label: 'Ocean', visual: makeOptionEmoji('\u{1F30A}') },
      { id: 'd', label: 'Airplane', visual: makeOptionEmoji('\u{2708}\u{FE0F}') },
    ],
    correctAnswerId: 'b',
    explanation: 'Leaves fall from trees, especially in autumn!',
    hint: 'What tall plants have branches and leaves?',
  },

  // ===== HARD (7 questions) =====

  // sc-h-001: When you are sick, you go to the ___
  {
    id: 'sc-h-001',
    category: 'sentence-completion',
    difficulty: 'hard',
    prompt: 'When you are sick, you go to the ___',
    visual: makeSentenceSvg('When you are sick, you go to the', ''),
    options: [
      { id: 'a', label: 'Beach', visual: makeOptionEmoji('\u{1F3D6}\u{FE0F}') },
      { id: 'b', label: 'Circus', visual: makeOptionEmoji('\u{1F3AA}') },
      { id: 'c', label: 'Hospital', visual: makeOptionEmoji('\u{1F3E5}') },
      { id: 'd', label: 'Stadium', visual: makeOptionEmoji('\u{1F3DF}\u{FE0F}') },
    ],
    correctAnswerId: 'c',
    explanation: 'When you are sick, you go to the hospital where doctors help you feel better!',
    hint: 'Where do doctors and nurses work?',
  },

  // sc-h-002: You need ___ to see at night
  {
    id: 'sc-h-002',
    category: 'sentence-completion',
    difficulty: 'hard',
    prompt: 'You need ___ to see at night',
    visual: makeSentenceSvg('You need', 'to see at night'),
    options: [
      { id: 'a', label: 'Light', visual: makeOptionEmoji('\u{1F4A1}') },
      { id: 'b', label: 'Guitar', visual: makeOptionEmoji('\u{1F3B8}') },
      { id: 'c', label: 'Pizza', visual: makeOptionEmoji('\u{1F355}') },
      { id: 'd', label: 'Ocean', visual: makeOptionEmoji('\u{1F30A}') },
    ],
    correctAnswerId: 'a',
    explanation: 'You need light to see at night! A lamp or flashlight helps you see in the dark.',
    hint: 'What helps you see when it is dark?',
  },

  // sc-h-003: Ice cream melts when it is ___
  {
    id: 'sc-h-003',
    category: 'sentence-completion',
    difficulty: 'hard',
    prompt: 'Ice cream melts when it is ___',
    visual: makeSentenceSvg('Ice cream melts when it is', ''),
    options: [
      { id: 'a', label: 'Cold', visual: makeOptionEmoji('\u{2744}\u{FE0F}') },
      { id: 'b', label: 'Hot', visual: makeOptionEmoji('\u{2600}\u{FE0F}') },
      { id: 'c', label: 'Rainy', visual: makeOptionEmoji('\u{1F327}\u{FE0F}') },
      { id: 'd', label: 'Windy', visual: makeOptionEmoji('\u{1F4A8}') },
    ],
    correctAnswerId: 'b',
    explanation: 'Ice cream melts when it is hot! The sun warms it up and it turns into a liquid.',
    hint: 'What kind of weather makes things warm?',
  },

  // sc-h-004: After winter comes ___
  {
    id: 'sc-h-004',
    category: 'sentence-completion',
    difficulty: 'hard',
    prompt: 'After winter comes ___',
    visual: makeSentenceSvg('After winter comes', ''),
    options: [
      { id: 'a', label: 'Snow', visual: makeOptionEmoji('\u{2744}\u{FE0F}') },
      { id: 'b', label: 'Pumpkin', visual: makeOptionEmoji('\u{1F383}') },
      { id: 'c', label: 'Spring', visual: makeOptionEmoji('\u{1F338}') },
      { id: 'd', label: 'Christmas', visual: makeOptionEmoji('\u{1F384}') },
    ],
    correctAnswerId: 'c',
    explanation: 'After winter comes spring! Flowers bloom and the weather gets warmer.',
    hint: 'What season comes after the cold months when flowers start to bloom?',
  },

  // sc-h-005: A caterpillar turns into a ___
  {
    id: 'sc-h-005',
    category: 'sentence-completion',
    difficulty: 'hard',
    prompt: 'A caterpillar turns into a ___',
    visual: makeSentenceSvg('A caterpillar turns into a', ''),
    options: [
      { id: 'a', label: 'Fish', visual: makeOptionEmoji('\u{1F41F}') },
      { id: 'b', label: 'Snake', visual: makeOptionEmoji('\u{1F40D}') },
      { id: 'c', label: 'Butterfly', visual: makeOptionEmoji('\u{1F98B}') },
      { id: 'd', label: 'Lion', visual: makeOptionEmoji('\u{1F981}') },
    ],
    correctAnswerId: 'c',
    explanation: 'A caterpillar turns into a butterfly! It makes a cocoon and comes out with beautiful wings.',
    hint: 'What beautiful insect has colorful wings?',
  },

  // sc-h-006: The opposite of day is ___
  {
    id: 'sc-h-006',
    category: 'sentence-completion',
    difficulty: 'hard',
    prompt: 'The opposite of day is ___',
    visual: makeSentenceSvg('The opposite of day is', ''),
    options: [
      { id: 'a', label: 'Sun', visual: makeOptionEmoji('\u{2600}\u{FE0F}') },
      { id: 'b', label: 'Night', visual: makeOptionEmoji('\u{1F319}') },
      { id: 'c', label: 'Rainbow', visual: makeOptionEmoji('\u{1F308}') },
      { id: 'd', label: 'Star', visual: makeOptionEmoji('\u{2B50}') },
    ],
    correctAnswerId: 'b',
    explanation: 'The opposite of day is night! When the sun goes down, it becomes dark.',
    hint: 'When the sun goes away and it gets dark, what is it called?',
  },

  // sc-h-007: When you mix red and blue you get ___
  {
    id: 'sc-h-007',
    category: 'sentence-completion',
    difficulty: 'hard',
    prompt: 'When you mix red and blue you get ___',
    visual: makeSentenceSvg('When you mix red and blue you get', ''),
    options: [
      { id: 'a', label: 'Green', visual: makeOptionEmoji('\u{1F7E2}') },
      { id: 'b', label: 'Yellow', visual: makeOptionEmoji('\u{1F7E1}') },
      { id: 'c', label: 'Purple', visual: makeOptionEmoji('\u{1F7E3}') },
      { id: 'd', label: 'Orange', visual: makeOptionEmoji('\u{1F7E0}') },
    ],
    correctAnswerId: 'c',
    explanation: 'When you mix red and blue paint together, you get purple!',
    hint: 'Think about mixing paint colors. What new color do red and blue make?',
  },
];
