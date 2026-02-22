import type { Question } from '../types';

/**
 * Picture Classification (CogAT Verbal Battery style)
 *
 * Format: Three real-world pictures (emojis) share a common trait.
 * The child picks which answer option (also an emoji) belongs with the group.
 * Unlike figure-classification (which uses geometric shapes), this uses
 * everyday objects and concepts.
 */

// Helper: builds the main question SVG with 3 emoji boxes
function makeClassificationSvg(emoji1: string, emoji2: string, emoji3: string): string {
  return `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="400" height="200" rx="16" fill="#FAFAFA"/>
    <text x="200" y="25" text-anchor="middle" font-size="16" fill="#666">These pictures are alike:</text>
    <rect x="20" y="35" width="110" height="90" rx="8" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
    <text x="75" y="92" text-anchor="middle" font-size="44">${emoji1}</text>
    <rect x="145" y="35" width="110" height="90" rx="8" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
    <text x="200" y="92" text-anchor="middle" font-size="44">${emoji2}</text>
    <rect x="270" y="35" width="110" height="90" rx="8" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
    <text x="325" y="92" text-anchor="middle" font-size="44">${emoji3}</text>
    <line x1="20" y1="138" x2="380" y2="138" stroke="#E0E0E0" stroke-width="1" stroke-dasharray="4,4"/>
    <text x="200" y="150" text-anchor="middle" font-size="14" fill="#888">Which one belongs?</text>
  </svg>`;
}

// Helper: builds a small option SVG with a single emoji
function makeOptionEmoji(emoji: string): string {
  return `<svg viewBox="0 0 70 50" xmlns="http://www.w3.org/2000/svg"><text x="35" y="38" text-anchor="middle" font-size="30">${emoji}</text></svg>`;
}

export const pictureClassification: Question[] = [
  // ===== EASY (7 questions) =====

  // pc-e-001: Fruits
  {
    id: 'pc-e-001',
    category: 'picture-classification',
    difficulty: 'easy',
    prompt: 'These three pictures go together. Which one belongs with them?',
    visual: makeClassificationSvg('\u{1F34E}', '\u{1F34C}', '\u{1F347}'),
    options: [
      { id: 'a', label: 'Orange', visual: makeOptionEmoji('\u{1F34A}') },
      { id: 'b', label: 'Car', visual: makeOptionEmoji('\u{1F697}') },
      { id: 'c', label: 'Book', visual: makeOptionEmoji('\u{1F4D6}') },
      { id: 'd', label: 'Chair', visual: makeOptionEmoji('\u{1FA91}') },
    ],
    correctAnswerId: 'a',
    explanation: 'Apple, banana, and grapes are all fruits. Orange is also a fruit!',
    hint: 'What kind of food are these?',
  },

  // pc-e-002: Animals
  {
    id: 'pc-e-002',
    category: 'picture-classification',
    difficulty: 'easy',
    prompt: 'Look at these three pictures. Which one goes with them?',
    visual: makeClassificationSvg('\u{1F431}', '\u{1F436}', '\u{1F430}'),
    options: [
      { id: 'a', label: 'Flower', visual: makeOptionEmoji('\u{1F33A}') },
      { id: 'b', label: 'Hamster', visual: makeOptionEmoji('\u{1F439}') },
      { id: 'c', label: 'Bus', visual: makeOptionEmoji('\u{1F68C}') },
      { id: 'd', label: 'Pencil', visual: makeOptionEmoji('\u{270F}\u{FE0F}') },
    ],
    correctAnswerId: 'b',
    explanation: 'Cat, dog, and rabbit are all animals. Hamster is also an animal!',
    hint: 'These are all living things you might have as pets.',
  },

  // pc-e-003: Vehicles
  {
    id: 'pc-e-003',
    category: 'picture-classification',
    difficulty: 'easy',
    prompt: 'These three pictures are alike. Which one belongs with them?',
    visual: makeClassificationSvg('\u{1F697}', '\u{1F68C}', '\u{1F6B2}'),
    options: [
      { id: 'a', label: 'Pizza', visual: makeOptionEmoji('\u{1F355}') },
      { id: 'b', label: 'Tree', visual: makeOptionEmoji('\u{1F333}') },
      { id: 'c', label: 'Train', visual: makeOptionEmoji('\u{1F682}') },
      { id: 'd', label: 'Phone', visual: makeOptionEmoji('\u{1F4F1}') },
    ],
    correctAnswerId: 'c',
    explanation: 'Car, bus, and bicycle are all vehicles. Train is also a vehicle!',
    hint: 'How do people get from place to place?',
  },

  // pc-e-004: Musical instruments
  {
    id: 'pc-e-004',
    category: 'picture-classification',
    difficulty: 'easy',
    prompt: 'These three pictures go together. Which one belongs with them?',
    visual: makeClassificationSvg('\u{1F3B8}', '\u{1F941}', '\u{1F3B9}'),
    options: [
      { id: 'a', label: 'House', visual: makeOptionEmoji('\u{1F3E0}') },
      { id: 'b', label: 'Trumpet', visual: makeOptionEmoji('\u{1F3BA}') },
      { id: 'c', label: 'Fish', visual: makeOptionEmoji('\u{1F41F}') },
      { id: 'd', label: 'Box', visual: makeOptionEmoji('\u{1F4E6}') },
    ],
    correctAnswerId: 'b',
    explanation: 'Guitar, drum, and piano are all musical instruments. Trumpet is also a musical instrument!',
    hint: 'What do you use these to do?',
  },

  // pc-e-005: Flowers
  {
    id: 'pc-e-005',
    category: 'picture-classification',
    difficulty: 'easy',
    prompt: 'Look at these three pictures. Which one goes with them?',
    visual: makeClassificationSvg('\u{1F33A}', '\u{1F33B}', '\u{1F337}'),
    options: [
      { id: 'a', label: 'Soccer ball', visual: makeOptionEmoji('\u{26BD}') },
      { id: 'b', label: 'Tent', visual: makeOptionEmoji('\u{26FA}') },
      { id: 'c', label: 'Rose', visual: makeOptionEmoji('\u{1F339}') },
      { id: 'd', label: 'Key', visual: makeOptionEmoji('\u{1F511}') },
    ],
    correctAnswerId: 'c',
    explanation: 'Hibiscus, sunflower, and tulip are all flowers. Rose is also a flower!',
    hint: 'These all grow in a garden.',
  },

  // pc-e-006: Sea creatures
  {
    id: 'pc-e-006',
    category: 'picture-classification',
    difficulty: 'easy',
    prompt: 'These three pictures are alike. Which one belongs with them?',
    visual: makeClassificationSvg('\u{1F41F}', '\u{1F419}', '\u{1F980}'),
    options: [
      { id: 'a', label: 'Sun', visual: makeOptionEmoji('\u{2600}\u{FE0F}') },
      { id: 'b', label: 'Dolphin', visual: makeOptionEmoji('\u{1F42C}') },
      { id: 'c', label: 'Basketball', visual: makeOptionEmoji('\u{1F3C0}') },
      { id: 'd', label: 'Scissors', visual: makeOptionEmoji('\u{2702}\u{FE0F}') },
    ],
    correctAnswerId: 'b',
    explanation: 'Fish, octopus, and crab all live in the ocean. Dolphin also lives in the ocean!',
    hint: 'Where do these animals live?',
  },

  // pc-e-007: Clothing
  {
    id: 'pc-e-007',
    category: 'picture-classification',
    difficulty: 'easy',
    prompt: 'These three pictures go together. Which one belongs with them?',
    visual: makeClassificationSvg('\u{1F455}', '\u{1F457}', '\u{1F9E2}'),
    options: [
      { id: 'a', label: 'Cake', visual: makeOptionEmoji('\u{1F370}') },
      { id: 'b', label: 'Football', visual: makeOptionEmoji('\u{1F3C8}') },
      { id: 'c', label: 'TV', visual: makeOptionEmoji('\u{1F4FA}') },
      { id: 'd', label: 'Gloves', visual: makeOptionEmoji('\u{1F9E4}') },
    ],
    correctAnswerId: 'd',
    explanation: 'T-shirt, dress, and cap are all things you wear. Gloves are also something you wear!',
    hint: 'What do you do with all of these?',
  },

  // ===== MEDIUM (8 questions) =====

  // pc-m-001: Things you ride
  {
    id: 'pc-m-001',
    category: 'picture-classification',
    difficulty: 'medium',
    prompt: 'These three pictures go together in a special way. Which one belongs with them?',
    visual: makeClassificationSvg('\u{1F40E}', '\u{1F6B2}', '\u{1F6F4}'),
    options: [
      { id: 'a', label: 'Books', visual: makeOptionEmoji('\u{1F4DA}') },
      { id: 'b', label: 'Skateboard', visual: makeOptionEmoji('\u{1F6F9}') },
      { id: 'c', label: 'Pizza', visual: makeOptionEmoji('\u{1F355}') },
      { id: 'd', label: 'House', visual: makeOptionEmoji('\u{1F3E0}') },
    ],
    correctAnswerId: 'b',
    explanation: 'Horse, bicycle, and scooter are all things you can ride. You can ride a skateboard too!',
    hint: 'Think about what you can do with all of these.',
  },

  // pc-m-002: Kitchen items
  {
    id: 'pc-m-002',
    category: 'picture-classification',
    difficulty: 'medium',
    prompt: 'Look at these three pictures. Which one goes with them?',
    visual: makeClassificationSvg('\u{1F373}', '\u{1F944}', '\u{1F52A}'),
    options: [
      { id: 'a', label: 'Soccer ball', visual: makeOptionEmoji('\u{26BD}') },
      { id: 'b', label: 'Tree', visual: makeOptionEmoji('\u{1F333}') },
      { id: 'c', label: 'Plate', visual: makeOptionEmoji('\u{1F37D}\u{FE0F}') },
      { id: 'd', label: 'Book', visual: makeOptionEmoji('\u{1F4D6}') },
    ],
    correctAnswerId: 'c',
    explanation: 'Frying pan, spoon, and knife are all things you find in a kitchen. A plate is also in the kitchen!',
    hint: 'Where in the house would you find these?',
  },

  // pc-m-003: Things at school
  {
    id: 'pc-m-003',
    category: 'picture-classification',
    difficulty: 'medium',
    prompt: 'These three pictures are alike. Which one belongs with them?',
    visual: makeClassificationSvg('\u{1F4DA}', '\u{270F}\u{FE0F}', '\u{1F392}'),
    options: [
      { id: 'a', label: 'Pizza', visual: makeOptionEmoji('\u{1F355}') },
      { id: 'b', label: 'Ruler', visual: makeOptionEmoji('\u{1F4D0}') },
      { id: 'c', label: 'Dog', visual: makeOptionEmoji('\u{1F436}') },
      { id: 'd', label: 'Car', visual: makeOptionEmoji('\u{1F697}') },
    ],
    correctAnswerId: 'b',
    explanation: 'Books, pencil, and backpack are all things you use at school. A ruler is also used at school!',
    hint: 'Where do you use all of these things?',
  },

  // pc-m-004: Cold things
  {
    id: 'pc-m-004',
    category: 'picture-classification',
    difficulty: 'medium',
    prompt: 'These three pictures go together. Which one belongs with them?',
    visual: makeClassificationSvg('\u{1F9CA}', '\u{2744}\u{FE0F}', '\u{1F366}'),
    options: [
      { id: 'a', label: 'Snowman', visual: makeOptionEmoji('\u{2603}\u{FE0F}') },
      { id: 'b', label: 'Fire', visual: makeOptionEmoji('\u{1F525}') },
      { id: 'c', label: 'Sun', visual: makeOptionEmoji('\u{2600}\u{FE0F}') },
      { id: 'd', label: 'House', visual: makeOptionEmoji('\u{1F3E0}') },
    ],
    correctAnswerId: 'a',
    explanation: 'Ice, snowflake, and ice cream are all cold things. A snowman is also cold!',
    hint: 'How do these things feel when you touch them?',
  },

  // pc-m-005: Things in the sky
  {
    id: 'pc-m-005',
    category: 'picture-classification',
    difficulty: 'medium',
    prompt: 'Look at these three pictures. Which one goes with them?',
    visual: makeClassificationSvg('\u{2601}\u{FE0F}', '\u{2B50}', '\u{2708}\u{FE0F}'),
    options: [
      { id: 'a', label: 'Fish', visual: makeOptionEmoji('\u{1F41F}') },
      { id: 'b', label: 'Moon', visual: makeOptionEmoji('\u{1F319}') },
      { id: 'c', label: 'House', visual: makeOptionEmoji('\u{1F3E0}') },
      { id: 'd', label: 'Pizza', visual: makeOptionEmoji('\u{1F355}') },
    ],
    correctAnswerId: 'b',
    explanation: 'Cloud, star, and airplane are all things you see in the sky. The moon is also in the sky!',
    hint: 'Where can you see all of these?',
  },

  // pc-m-006: Things at a playground
  {
    id: 'pc-m-006',
    category: 'picture-classification',
    difficulty: 'medium',
    prompt: 'These three pictures are alike. Which one belongs with them?',
    visual: makeClassificationSvg('\u{26BD}', '\u{1F3C0}', '\u{1F3BE}'),
    options: [
      { id: 'a', label: 'Baseball', visual: makeOptionEmoji('\u{26BE}') },
      { id: 'b', label: 'Lamp', visual: makeOptionEmoji('\u{1F4A1}') },
      { id: 'c', label: 'Book', visual: makeOptionEmoji('\u{1F4D6}') },
      { id: 'd', label: 'Fork', visual: makeOptionEmoji('\u{1F374}') },
    ],
    correctAnswerId: 'a',
    explanation: 'Soccer ball, basketball, and tennis ball are all sports balls. Baseball is also a sports ball!',
    hint: 'What kind of game do you play with these?',
  },

  // pc-m-007: Tools
  {
    id: 'pc-m-007',
    category: 'picture-classification',
    difficulty: 'medium',
    prompt: 'These three pictures go together. Which one belongs with them?',
    visual: makeClassificationSvg('\u{1F528}', '\u{1FA9B}', '\u{1F527}'),
    options: [
      { id: 'a', label: 'Guitar', visual: makeOptionEmoji('\u{1F3B8}') },
      { id: 'b', label: 'Saw', visual: makeOptionEmoji('\u{1FA9A}') },
      { id: 'c', label: 'Apple', visual: makeOptionEmoji('\u{1F34E}') },
      { id: 'd', label: 'Phone', visual: makeOptionEmoji('\u{1F4F1}') },
    ],
    correctAnswerId: 'b',
    explanation: 'Hammer, screwdriver, and wrench are all tools. A saw is also a tool!',
    hint: 'What does a builder or fixer use?',
  },

  // pc-m-008: Things that light up
  {
    id: 'pc-m-008',
    category: 'picture-classification',
    difficulty: 'medium',
    prompt: 'Look at these three pictures. Which one goes with them?',
    visual: makeClassificationSvg('\u{1F4A1}', '\u{1F56F}\u{FE0F}', '\u{1F526}'),
    options: [
      { id: 'a', label: 'Rock', visual: makeOptionEmoji('\u{1FAA8}') },
      { id: 'b', label: 'Box', visual: makeOptionEmoji('\u{1F4E6}') },
      { id: 'c', label: 'Star', visual: makeOptionEmoji('\u{2B50}') },
      { id: 'd', label: 'Brick', visual: makeOptionEmoji('\u{1F9F1}') },
    ],
    correctAnswerId: 'c',
    explanation: 'Light bulb, candle, and flashlight all give off light. A star also gives off light!',
    hint: 'What do these all do when it is dark?',
  },

  // ===== HARD (8 questions) =====

  // pc-h-001: Things that are round
  {
    id: 'pc-h-001',
    category: 'picture-classification',
    difficulty: 'hard',
    prompt: 'These three pictures go together in a special way. Can you figure out which one belongs with them?',
    visual: makeClassificationSvg('\u{26BD}', '\u{1F34A}', '\u{1F319}'),
    options: [
      { id: 'a', label: 'Book', visual: makeOptionEmoji('\u{1F4D6}') },
      { id: 'b', label: 'Cookie', visual: makeOptionEmoji('\u{1F36A}') },
      { id: 'c', label: 'House', visual: makeOptionEmoji('\u{1F3E0}') },
      { id: 'd', label: 'Pencil', visual: makeOptionEmoji('\u{270F}\u{FE0F}') },
    ],
    correctAnswerId: 'b',
    explanation: 'Soccer ball, orange, and moon are all round shapes. A cookie is also round!',
    hint: 'Look at the shape of each one. What shape are they all?',
  },

  // pc-h-002: Things that grow
  {
    id: 'pc-h-002',
    category: 'picture-classification',
    difficulty: 'hard',
    prompt: 'These three pictures are alike in a special way. Which one belongs with them?',
    visual: makeClassificationSvg('\u{1F331}', '\u{1F423}', '\u{1F476}'),
    options: [
      { id: 'a', label: 'Seedling', visual: makeOptionEmoji('\u{1F33F}') },
      { id: 'b', label: 'Rock', visual: makeOptionEmoji('\u{1FAA8}') },
      { id: 'c', label: 'Brick', visual: makeOptionEmoji('\u{1F9F1}') },
      { id: 'd', label: 'Gear', visual: makeOptionEmoji('\u{2699}\u{FE0F}') },
    ],
    correctAnswerId: 'a',
    explanation: 'A seedling, baby chick, and baby all grow bigger over time. A herb/plant also grows!',
    hint: 'What happens to all of these over time?',
  },

  // pc-h-003: Things that make sound
  {
    id: 'pc-h-003',
    category: 'picture-classification',
    difficulty: 'hard',
    prompt: 'These three pictures go together. Can you figure out which one belongs with them?',
    visual: makeClassificationSvg('\u{1F514}', '\u{1F4EF}', '\u{1F941}'),
    options: [
      { id: 'a', label: 'Brick', visual: makeOptionEmoji('\u{1F9F1}') },
      { id: 'b', label: 'Book', visual: makeOptionEmoji('\u{1F4D6}') },
      { id: 'c', label: 'Megaphone', visual: makeOptionEmoji('\u{1F4E2}') },
      { id: 'd', label: 'Picture frame', visual: makeOptionEmoji('\u{1F5BC}\u{FE0F}') },
    ],
    correctAnswerId: 'c',
    explanation: 'Bell, horn, and drum all make loud sounds. A megaphone also makes loud sounds!',
    hint: 'What do your ears notice about these?',
  },

  // pc-h-004: Things with stripes
  {
    id: 'pc-h-004',
    category: 'picture-classification',
    difficulty: 'hard',
    prompt: 'Look at these three pictures carefully. Which one belongs with them?',
    visual: makeClassificationSvg('\u{1F993}', '\u{1F41D}', '\u{1F3F3}\u{FE0F}'),
    options: [
      { id: 'a', label: 'Tiger', visual: makeOptionEmoji('\u{1F42F}') },
      { id: 'b', label: 'Frog', visual: makeOptionEmoji('\u{1F438}') },
      { id: 'c', label: 'Apple', visual: makeOptionEmoji('\u{1F34E}') },
      { id: 'd', label: 'Soccer ball', visual: makeOptionEmoji('\u{26BD}') },
    ],
    correctAnswerId: 'a',
    explanation: 'Zebra, bee, and flag all have stripes. A tiger also has stripes!',
    hint: 'Look at the pattern on each one. What do you see?',
  },

  // pc-h-005: Things you open
  {
    id: 'pc-h-005',
    category: 'picture-classification',
    difficulty: 'hard',
    prompt: 'These three pictures are alike in a tricky way. Which one belongs with them?',
    visual: makeClassificationSvg('\u{1F4E6}', '\u{1F6AA}', '\u{1F4D6}'),
    options: [
      { id: 'a', label: 'Mountain', visual: makeOptionEmoji('\u{1F3D4}\u{FE0F}') },
      { id: 'b', label: 'Gift', visual: makeOptionEmoji('\u{1F381}') },
      { id: 'c', label: 'Star', visual: makeOptionEmoji('\u{2B50}') },
      { id: 'd', label: 'Moon', visual: makeOptionEmoji('\u{1F319}') },
    ],
    correctAnswerId: 'b',
    explanation: 'Box, door, and book are all things you can open. You can open a gift too!',
    hint: 'Think about what you can do with each of these.',
  },

  // pc-h-006: Things with wings
  {
    id: 'pc-h-006',
    category: 'picture-classification',
    difficulty: 'hard',
    prompt: 'These three pictures go together in a special way. Which one belongs with them?',
    visual: makeClassificationSvg('\u{1F985}', '\u{1F98B}', '\u{2708}\u{FE0F}'),
    options: [
      { id: 'a', label: 'Fish', visual: makeOptionEmoji('\u{1F41F}') },
      { id: 'b', label: 'Bee', visual: makeOptionEmoji('\u{1F41D}') },
      { id: 'c', label: 'Flower', visual: makeOptionEmoji('\u{1F33A}') },
      { id: 'd', label: 'House', visual: makeOptionEmoji('\u{1F3E0}') },
    ],
    correctAnswerId: 'b',
    explanation: 'Eagle, butterfly, and airplane all have wings. A bee also has wings!',
    hint: 'What body part or feature do they all share?',
  },

  // pc-h-007: Things at night
  {
    id: 'pc-h-007',
    category: 'picture-classification',
    difficulty: 'hard',
    prompt: 'Look at these three pictures. Can you figure out which one belongs with them?',
    visual: makeClassificationSvg('\u{1F319}', '\u{2B50}', '\u{1F989}'),
    options: [
      { id: 'a', label: 'Sunflower', visual: makeOptionEmoji('\u{1F33B}') },
      { id: 'b', label: 'Soccer ball', visual: makeOptionEmoji('\u{26BD}') },
      { id: 'c', label: 'Bat', visual: makeOptionEmoji('\u{1F987}') },
      { id: 'd', label: 'Book', visual: makeOptionEmoji('\u{1F4DA}') },
    ],
    correctAnswerId: 'c',
    explanation: 'Moon, star, and owl are all things you see at night. A bat also comes out at night!',
    hint: 'When do you see or find all of these?',
  },

  // pc-h-008: Things that float on water
  {
    id: 'pc-h-008',
    category: 'picture-classification',
    difficulty: 'hard',
    prompt: 'These three pictures are alike in a special way. Which one belongs with them?',
    visual: makeClassificationSvg('\u{1F6A2}', '\u{1F986}', '\u{1F3C4}'),
    options: [
      { id: 'a', label: 'Rock', visual: makeOptionEmoji('\u{1FAA8}') },
      { id: 'b', label: 'Sailboat', visual: makeOptionEmoji('\u{26F5}') },
      { id: 'c', label: 'Hammer', visual: makeOptionEmoji('\u{1F528}') },
      { id: 'd', label: 'House', visual: makeOptionEmoji('\u{1F3E0}') },
    ],
    correctAnswerId: 'b',
    explanation: 'Ship, duck, and surfer all float on water. A sailboat also floats on water!',
    hint: 'What can all of these do on water?',
  },
];
