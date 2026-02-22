import type { Question } from '../types';

/**
 * Picture Analogies (CogAT Verbal Battery style)
 *
 * Format: A 2x2 matrix where the top row shows two pictures (emojis)
 * with a relationship. The bottom row has one picture and a "?" --
 * the child must find the picture that completes the analogy using
 * the same relationship.
 *
 * Example: cat -> fish (cat eats fish), so dog -> ? = bone (dog eats bone)
 */

function makeAnalogySvg(topLeft: string, topRight: string, bottomLeft: string): string {
  const W = 400, H = 250;
  const cellW = 160, cellH = 100;
  const rx = 12;

  const topBg = '#E3F2FD';
  const topStroke = '#1976D2';
  const bottomBg = '#E8F5E9';
  const bottomStroke = '#2E7D32';

  let svg = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">`;

  // Top row cells
  svg += `<rect x="10" y="10" width="${cellW}" height="${cellH}" rx="${rx}" fill="${topBg}" stroke="${topStroke}" stroke-width="2"/>`;
  svg += `<rect x="230" y="10" width="${cellW}" height="${cellH}" rx="${rx}" fill="${topBg}" stroke="${topStroke}" stroke-width="2"/>`;

  // Bottom row cells
  svg += `<rect x="10" y="140" width="${cellW}" height="${cellH}" rx="${rx}" fill="${bottomBg}" stroke="${bottomStroke}" stroke-width="2"/>`;
  svg += `<rect x="230" y="140" width="${cellW}" height="${cellH}" rx="${rx}" fill="${bottomBg}" stroke="${bottomStroke}" stroke-width="2"/>`;

  // Top row emojis
  svg += `<text x="90" y="72" text-anchor="middle" font-size="44">${topLeft}</text>`;
  svg += `<text x="310" y="72" text-anchor="middle" font-size="44">${topRight}</text>`;

  // Bottom row emoji + question mark
  svg += `<text x="90" y="202" text-anchor="middle" font-size="44">${bottomLeft}</text>`;
  svg += `<text x="310" y="202" text-anchor="middle" font-size="40" fill="${bottomStroke}">❓</text>`;

  // Arrows between columns
  svg += `<text x="200" y="72" text-anchor="middle" font-size="28" fill="${topStroke}">&#x2192;</text>`;
  svg += `<text x="200" y="202" text-anchor="middle" font-size="28" fill="${bottomStroke}">&#x2192;</text>`;

  svg += `</svg>`;
  return svg;
}

function makeOptionEmoji(emoji: string): string {
  return `<svg viewBox="0 0 70 50" xmlns="http://www.w3.org/2000/svg"><text x="35" y="38" text-anchor="middle" font-size="30">${emoji}</text></svg>`;
}

export const pictureAnalogies: Question[] = [
  // ===== EASY (pa-e-001 through pa-e-007) =====
  {
    id: 'pa-e-001',
    category: 'picture-analogies',
    difficulty: 'easy',
    prompt: 'Look at the top pictures. They go together in a way. Find the picture that goes with the bottom one the same way.',
    visual: makeAnalogySvg('🐱', '🐟', '🐶'),
    options: [
      { id: 'a', label: 'Bone', visual: makeOptionEmoji('🦴') },
      { id: 'b', label: 'Fish', visual: makeOptionEmoji('🐟') },
      { id: 'c', label: 'Tree', visual: makeOptionEmoji('🌳') },
      { id: 'd', label: 'Car', visual: makeOptionEmoji('🚗') },
    ],
    correctAnswerId: 'a',
    explanation: 'A cat eats fish. A dog eats a bone!',
  },
  {
    id: 'pa-e-002',
    category: 'picture-analogies',
    difficulty: 'easy',
    prompt: 'The top pictures go together. Which picture goes with the bottom one in the same way?',
    visual: makeAnalogySvg('☀️', '🌻', '💧'),
    options: [
      { id: 'a', label: 'Star', visual: makeOptionEmoji('⭐') },
      { id: 'b', label: 'Wave', visual: makeOptionEmoji('🌊') },
      { id: 'c', label: 'Moon', visual: makeOptionEmoji('🌙') },
      { id: 'd', label: 'Apple', visual: makeOptionEmoji('🍎') },
    ],
    correctAnswerId: 'b',
    explanation: 'The sun helps a sunflower grow. Water makes a wave!',
  },
  {
    id: 'pa-e-003',
    category: 'picture-analogies',
    difficulty: 'easy',
    prompt: 'See how the top two pictures go together? Pick the picture that goes with the bottom one the same way.',
    visual: makeAnalogySvg('🐔', '🥚', '🐄'),
    options: [
      { id: 'a', label: 'Bread', visual: makeOptionEmoji('🍞') },
      { id: 'b', label: 'Grass', visual: makeOptionEmoji('🌿') },
      { id: 'c', label: 'Milk', visual: makeOptionEmoji('🥛') },
      { id: 'd', label: 'Hat', visual: makeOptionEmoji('🎩') },
    ],
    correctAnswerId: 'c',
    explanation: 'A chicken gives us eggs. A cow gives us milk!',
  },
  {
    id: 'pa-e-004',
    category: 'picture-analogies',
    difficulty: 'easy',
    prompt: 'Look at how the top pictures are related. Find the picture that matches the bottom one the same way.',
    visual: makeAnalogySvg('🔑', '🔒', '🖊️'),
    options: [
      { id: 'a', label: 'Paper', visual: makeOptionEmoji('📝') },
      { id: 'b', label: 'Scissors', visual: makeOptionEmoji('✂️') },
      { id: 'c', label: 'Cup', visual: makeOptionEmoji('🥤') },
      { id: 'd', label: 'Ball', visual: makeOptionEmoji('⚽') },
    ],
    correctAnswerId: 'a',
    explanation: 'A key is used with a lock. A pen is used with paper!',
  },
  {
    id: 'pa-e-005',
    category: 'picture-analogies',
    difficulty: 'easy',
    prompt: 'The top two pictures are a pair. Which picture makes a pair with the bottom one?',
    visual: makeAnalogySvg('👨', '👩', '👦'),
    options: [
      { id: 'a', label: 'Dog', visual: makeOptionEmoji('🐶') },
      { id: 'b', label: 'Girl', visual: makeOptionEmoji('👧') },
      { id: 'c', label: 'Baby', visual: makeOptionEmoji('👶') },
      { id: 'd', label: 'House', visual: makeOptionEmoji('🏠') },
    ],
    correctAnswerId: 'b',
    explanation: 'A man goes with a woman. A boy goes with a girl!',
  },
  {
    id: 'pa-e-006',
    category: 'picture-analogies',
    difficulty: 'easy',
    prompt: 'How do the top pictures go together? Find the one that goes with the bottom picture the same way.',
    visual: makeAnalogySvg('☂️', '🌧️', '🧤'),
    options: [
      { id: 'a', label: 'Snowflake', visual: makeOptionEmoji('❄️') },
      { id: 'b', label: 'Sun', visual: makeOptionEmoji('☀️') },
      { id: 'c', label: 'Flower', visual: makeOptionEmoji('🌸') },
      { id: 'd', label: 'Rainbow', visual: makeOptionEmoji('🌈') },
    ],
    correctAnswerId: 'a',
    explanation: 'You use an umbrella when it rains. You wear gloves when it snows!',
  },
  {
    id: 'pa-e-007',
    category: 'picture-analogies',
    difficulty: 'easy',
    prompt: 'Look at the top row. The pictures go together. Which picture goes with the bottom one in the same way?',
    visual: makeAnalogySvg('👂', '🎵', '👁️'),
    options: [
      { id: 'a', label: 'Nose', visual: makeOptionEmoji('👃') },
      { id: 'b', label: 'Book', visual: makeOptionEmoji('📖') },
      { id: 'c', label: 'Hand', visual: makeOptionEmoji('✋') },
      { id: 'd', label: 'Shoe', visual: makeOptionEmoji('👟') },
    ],
    correctAnswerId: 'b',
    explanation: 'You use your ears to hear music. You use your eyes to read a book!',
  },

  // ===== MEDIUM (pa-m-001 through pa-m-008) =====
  {
    id: 'pa-m-001',
    category: 'picture-analogies',
    difficulty: 'medium',
    prompt: 'Think about how the top pictures go together. Pick the picture that goes with the bottom one the same way.',
    visual: makeAnalogySvg('✈️', '🧑‍✈️', '🏫'),
    options: [
      { id: 'a', label: 'Teacher', visual: makeOptionEmoji('👩‍🏫') },
      { id: 'b', label: 'Student', visual: makeOptionEmoji('🧑‍🎓') },
      { id: 'c', label: 'Bus', visual: makeOptionEmoji('🚌') },
      { id: 'd', label: 'Book', visual: makeOptionEmoji('📚') },
    ],
    correctAnswerId: 'a',
    explanation: 'A pilot works in an airplane. A teacher works in a school!',
  },
  {
    id: 'pa-m-002',
    category: 'picture-analogies',
    difficulty: 'medium',
    prompt: 'The top pictures are connected. Find the picture that connects with the bottom one the same way.',
    visual: makeAnalogySvg('🐦', '🪺', '🐝'),
    options: [
      { id: 'a', label: 'Flower', visual: makeOptionEmoji('🌸') },
      { id: 'b', label: 'Honey', visual: makeOptionEmoji('🍯') },
      { id: 'c', label: 'Ant', visual: makeOptionEmoji('🐜') },
      { id: 'd', label: 'Cloud', visual: makeOptionEmoji('☁️') },
    ],
    correctAnswerId: 'b',
    explanation: 'A bird makes a nest. A bee makes honey!',
  },
  {
    id: 'pa-m-003',
    category: 'picture-analogies',
    difficulty: 'medium',
    prompt: 'How are the top two pictures related? Choose the picture that relates to the bottom one in the same way.',
    visual: makeAnalogySvg('🌊', '🐟', '🌲'),
    options: [
      { id: 'a', label: 'Squirrel', visual: makeOptionEmoji('🐿️') },
      { id: 'b', label: 'Boat', visual: makeOptionEmoji('⛵') },
      { id: 'c', label: 'Rock', visual: makeOptionEmoji('🪨') },
      { id: 'd', label: 'Kite', visual: makeOptionEmoji('🪁') },
    ],
    correctAnswerId: 'a',
    explanation: 'A fish lives in the ocean. A squirrel lives in the forest!',
  },
  {
    id: 'pa-m-004',
    category: 'picture-analogies',
    difficulty: 'medium',
    prompt: 'See the pattern in the top pictures? Which picture completes the bottom the same way?',
    visual: makeAnalogySvg('🌙', '🌃', '☀️'),
    options: [
      { id: 'a', label: 'Moon', visual: makeOptionEmoji('🌙') },
      { id: 'b', label: 'Beach', visual: makeOptionEmoji('🏖️') },
      { id: 'c', label: 'Lamp', visual: makeOptionEmoji('💡') },
      { id: 'd', label: 'Bed', visual: makeOptionEmoji('🛏️') },
    ],
    correctAnswerId: 'b',
    explanation: 'The moon comes out at night. The sun shines during a day at the beach!',
  },
  {
    id: 'pa-m-005',
    category: 'picture-analogies',
    difficulty: 'medium',
    prompt: 'Look at how the top two go together. Pick what goes with the bottom one the same way.',
    visual: makeAnalogySvg('🎨', '🖌️', '🎵'),
    options: [
      { id: 'a', label: 'Drum', visual: makeOptionEmoji('🥁') },
      { id: 'b', label: 'Guitar', visual: makeOptionEmoji('🎸') },
      { id: 'c', label: 'Singer', visual: makeOptionEmoji('🧑‍🎤') },
      { id: 'd', label: 'TV', visual: makeOptionEmoji('📺') },
    ],
    correctAnswerId: 'b',
    explanation: 'You use a paintbrush to make art. You use a guitar to make music!',
  },
  {
    id: 'pa-m-006',
    category: 'picture-analogies',
    difficulty: 'medium',
    prompt: 'The top pictures show something changing. What does the bottom picture change into the same way?',
    visual: makeAnalogySvg('🌱', '🌳', '🐣'),
    options: [
      { id: 'a', label: 'Egg', visual: makeOptionEmoji('🥚') },
      { id: 'b', label: 'Chicken', visual: makeOptionEmoji('🐔') },
      { id: 'c', label: 'Nest', visual: makeOptionEmoji('🪺') },
      { id: 'd', label: 'Worm', visual: makeOptionEmoji('🪱') },
    ],
    correctAnswerId: 'b',
    explanation: 'A seed grows into a tree. A chick grows into a chicken!',
  },
  {
    id: 'pa-m-007',
    category: 'picture-analogies',
    difficulty: 'medium',
    prompt: 'Think about what connects the top pictures. Which picture connects to the bottom one the same way?',
    visual: makeAnalogySvg('🐛', '🦋', '🌑'),
    options: [
      { id: 'a', label: 'Star', visual: makeOptionEmoji('⭐') },
      { id: 'b', label: 'Sun', visual: makeOptionEmoji('☀️') },
      { id: 'c', label: 'Full Moon', visual: makeOptionEmoji('🌕') },
      { id: 'd', label: 'Cloud', visual: makeOptionEmoji('☁️') },
    ],
    correctAnswerId: 'c',
    explanation: 'A caterpillar changes into a butterfly. A new moon changes into a full moon!',
  },
  {
    id: 'pa-m-008',
    category: 'picture-analogies',
    difficulty: 'medium',
    prompt: 'The top pictures go together. Find the one that goes with the bottom picture the same way.',
    visual: makeAnalogySvg('🔥', '🧯', '🤒'),
    options: [
      { id: 'a', label: 'Medicine', visual: makeOptionEmoji('💊') },
      { id: 'b', label: 'Bed', visual: makeOptionEmoji('🛏️') },
      { id: 'c', label: 'Thermometer', visual: makeOptionEmoji('🌡️') },
      { id: 'd', label: 'Bandage', visual: makeOptionEmoji('🩹') },
    ],
    correctAnswerId: 'a',
    explanation: 'A fire extinguisher stops a fire. Medicine helps when you are sick!',
  },

  // ===== HARD (pa-h-001 through pa-h-008) =====
  {
    id: 'pa-h-001',
    category: 'picture-analogies',
    difficulty: 'hard',
    prompt: 'This one is tricky! Figure out how the top pictures relate. Then pick the picture that relates to the bottom one the same way.',
    visual: makeAnalogySvg('🐘', '🐭', '🌳'),
    options: [
      { id: 'a', label: 'Leaf', visual: makeOptionEmoji('🍃') },
      { id: 'b', label: 'Seedling', visual: makeOptionEmoji('🌱') },
      { id: 'c', label: 'Forest', visual: makeOptionEmoji('🌲') },
      { id: 'd', label: 'Flower', visual: makeOptionEmoji('🌺') },
    ],
    correctAnswerId: 'b',
    explanation: 'An elephant is big and a mouse is small. A tree is big and a seedling is small!',
  },
  {
    id: 'pa-h-002',
    category: 'picture-analogies',
    difficulty: 'hard',
    prompt: 'Think carefully! How do the top pictures go together? Find the one that matches the bottom picture the same way.',
    visual: makeAnalogySvg('🐢', '🐇', '🧊'),
    options: [
      { id: 'a', label: 'Water', visual: makeOptionEmoji('💧') },
      { id: 'b', label: 'Snowman', visual: makeOptionEmoji('⛄') },
      { id: 'c', label: 'Fire', visual: makeOptionEmoji('🔥') },
      { id: 'd', label: 'Wind', visual: makeOptionEmoji('💨') },
    ],
    correctAnswerId: 'c',
    explanation: 'A turtle is slow and a rabbit is fast. Ice is cold and fire is hot -- they are opposites!',
  },
  {
    id: 'pa-h-003',
    category: 'picture-analogies',
    difficulty: 'hard',
    prompt: 'Look at the top row carefully. The pictures are opposites in a way. Which picture is the opposite of the bottom one the same way?',
    visual: makeAnalogySvg('🌞', '🌙', '📖'),
    options: [
      { id: 'a', label: 'Closed Book', visual: makeOptionEmoji('📕') },
      { id: 'b', label: 'Pencil', visual: makeOptionEmoji('✏️') },
      { id: 'c', label: 'Library', visual: makeOptionEmoji('📚') },
      { id: 'd', label: 'Paper', visual: makeOptionEmoji('📄') },
    ],
    correctAnswerId: 'a',
    explanation: 'The sun is out during the day and the moon is out at night -- they are opposites. An open book and a closed book are opposites!',
  },
  {
    id: 'pa-h-004',
    category: 'picture-analogies',
    difficulty: 'hard',
    prompt: 'This is a tough one! Think about where the top pictures come from. Which picture connects to the bottom one the same way?',
    visual: makeAnalogySvg('🍎', '🌳', '🧈'),
    options: [
      { id: 'a', label: 'Bread', visual: makeOptionEmoji('🍞') },
      { id: 'b', label: 'Cow', visual: makeOptionEmoji('🐄') },
      { id: 'c', label: 'Knife', visual: makeOptionEmoji('🔪') },
      { id: 'd', label: 'Plate', visual: makeOptionEmoji('🍽️') },
    ],
    correctAnswerId: 'b',
    explanation: 'An apple comes from a tree. Butter comes from a cow!',
  },
  {
    id: 'pa-h-005',
    category: 'picture-analogies',
    difficulty: 'hard',
    prompt: 'Think about where each thing belongs. Which picture goes with the bottom one the same way?',
    visual: makeAnalogySvg('👑', '🏰', '🎓'),
    options: [
      { id: 'a', label: 'School', visual: makeOptionEmoji('🏫') },
      { id: 'b', label: 'Hat', visual: makeOptionEmoji('🎩') },
      { id: 'c', label: 'Trophy', visual: makeOptionEmoji('🏆') },
      { id: 'd', label: 'Star', visual: makeOptionEmoji('⭐') },
    ],
    correctAnswerId: 'a',
    explanation: 'A crown belongs in a castle (where a king lives). A graduation cap belongs at a school!',
  },
  {
    id: 'pa-h-006',
    category: 'picture-analogies',
    difficulty: 'hard',
    prompt: 'Think about where each animal lives. Pick the place that goes with the bottom animal the same way.',
    visual: makeAnalogySvg('🐟', '🌊', '🐪'),
    options: [
      { id: 'a', label: 'Mountain', visual: makeOptionEmoji('🏔️') },
      { id: 'b', label: 'Desert', visual: makeOptionEmoji('🏜️') },
      { id: 'c', label: 'Farm', visual: makeOptionEmoji('🏡') },
      { id: 'd', label: 'City', visual: makeOptionEmoji('🏙️') },
    ],
    correctAnswerId: 'b',
    explanation: 'A fish lives in the ocean. A camel lives in the desert!',
  },
  {
    id: 'pa-h-007',
    category: 'picture-analogies',
    difficulty: 'hard',
    prompt: 'The top pictures are about a special time. What goes with the bottom picture in the same way?',
    visual: makeAnalogySvg('🎂', '🎉', '🎄'),
    options: [
      { id: 'a', label: 'Present', visual: makeOptionEmoji('🎁') },
      { id: 'b', label: 'Snowman', visual: makeOptionEmoji('⛄') },
      { id: 'c', label: 'Star', visual: makeOptionEmoji('⭐') },
      { id: 'd', label: 'Cookie', visual: makeOptionEmoji('🍪') },
    ],
    correctAnswerId: 'a',
    explanation: 'A cake goes with a party (birthday celebration). A Christmas tree goes with presents!',
  },
  {
    id: 'pa-h-008',
    category: 'picture-analogies',
    difficulty: 'hard',
    prompt: 'Think about what covers each animal. Which picture goes with the bottom animal the same way?',
    visual: makeAnalogySvg('🦁', '🐾', '🦅'),
    options: [
      { id: 'a', label: 'Wing', visual: makeOptionEmoji('🪽') },
      { id: 'b', label: 'Feather', visual: makeOptionEmoji('🪶') },
      { id: 'c', label: 'Egg', visual: makeOptionEmoji('🥚') },
      { id: 'd', label: 'Sky', visual: makeOptionEmoji('🌤️') },
    ],
    correctAnswerId: 'b',
    explanation: 'A lion has paws with paw prints. An eagle has feathers!',
  },
];
