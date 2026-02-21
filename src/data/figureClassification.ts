import type { Question } from '../types';

/**
 * Figure Classification (CogAT Nonverbal Battery style)
 *
 * Format: Three shapes in the top row share a common attribute.
 * The child picks the answer choice that belongs with the group.
 *
 * Attributes: shape, color, size, number of sides, fill pattern,
 * presence of internal elements, orientation.
 */

// Compact option SVG helpers for figure answer choices
function opt(inner: string): string {
  return `<svg viewBox="0 0 70 50" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
}
function oCircle(r: number, fill: string, extra = ''): string {
  return opt(`<circle cx="35" cy="25" r="${r}" fill="${fill}" stroke="#333" stroke-width="1.5"/>${extra}`);
}
function oSquare(s: number, fill: string, extra = ''): string {
  const x = 35 - s / 2, y = 25 - s / 2;
  return opt(`<rect x="${x}" y="${y}" width="${s}" height="${s}" fill="${fill}" stroke="#333" stroke-width="1.5"/>${extra}`);
}
function oRect(w: number, h: number, fill: string): string {
  return opt(`<rect x="${35 - w / 2}" y="${25 - h / 2}" width="${w}" height="${h}" fill="${fill}" stroke="#333" stroke-width="1.5"/>`);
}
function oTriangle(s: number, fill: string, dir: 'up' | 'down' = 'up', extra = ''): string {
  if (dir === 'up') {
    return opt(`<polygon points="35,${25 - s * 0.45} ${35 - s / 2},${25 + s * 0.35} ${35 + s / 2},${25 + s * 0.35}" fill="${fill}" stroke="#333" stroke-width="1.5"/>${extra}`);
  }
  return opt(`<polygon points="35,${25 + s * 0.45} ${35 - s / 2},${25 - s * 0.35} ${35 + s / 2},${25 - s * 0.35}" fill="${fill}" stroke="#333" stroke-width="1.5"/>${extra}`);
}
function oDiamond(s: number, fill: string, extra = ''): string {
  return opt(`<polygon points="35,${25 - s / 2} ${35 + s / 2},25 35,${25 + s / 2} ${35 - s / 2},25" fill="${fill}" stroke="#333" stroke-width="1.5"/>${extra}`);
}
function oPentagon(r: number, fill: string, extra = ''): string {
  const pts = [0, 1, 2, 3, 4].map(i => {
    const a = (i * 72 - 90) * Math.PI / 180;
    return `${35 + r * Math.cos(a)},${25 + r * Math.sin(a)}`;
  }).join(' ');
  return opt(`<polygon points="${pts}" fill="${fill}" stroke="#333" stroke-width="1.5"/>${extra}`);
}
function oHexagon(r: number, fill: string, extra = ''): string {
  const pts = [0, 1, 2, 3, 4, 5].map(i => {
    const a = (i * 60 - 90) * Math.PI / 180;
    return `${35 + r * Math.cos(a)},${25 + r * Math.sin(a)}`;
  }).join(' ');
  return opt(`<polygon points="${pts}" fill="${fill}" stroke="#333" stroke-width="1.5"/>${extra}`);
}
function oEmoji(text: string, fs = 24): string {
  return opt(`<text x="35" y="${25 + fs * 0.35}" text-anchor="middle" font-size="${fs}">${text}</text>`);
}

export const figureClassification: Question[] = [
  // ===== EASY =====
  {
    id: 'fc-e-001',
    category: 'figure-classification',
    difficulty: 'easy',
    prompt: 'These three shapes are alike. Which one belongs with them?',
    visual: `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="400" height="200" rx="16" fill="#FAFAFA"/>
      <text x="200" y="25" text-anchor="middle" font-size="16" fill="#666">These shapes are alike:</text>
      <!-- Group: all circles (different sizes/colors) -->
      <rect x="20" y="35" width="110" height="90" rx="8" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2"/>
      <circle cx="75" cy="80" r="25" fill="#F44336" stroke="#333" stroke-width="2"/>
      <rect x="145" y="35" width="110" height="90" rx="8" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2"/>
      <circle cx="200" cy="80" r="35" fill="#2196F3" stroke="#333" stroke-width="2"/>
      <rect x="270" y="35" width="110" height="90" rx="8" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2"/>
      <circle cx="325" cy="80" r="18" fill="#4CAF50" stroke="#333" stroke-width="2"/>
      <text x="200" y="150" text-anchor="middle" font-size="14" fill="#888">Which one belongs?</text>
      <line x1="20" y1="138" x2="380" y2="138" stroke="#E0E0E0" stroke-width="1" stroke-dasharray="4,4"/>
    </svg>`,
    options: [
      { id: 'a', label: 'Yellow circle', visual: oCircle(14, '#FFC107') },
      { id: 'b', label: 'Red square', visual: oSquare(22, '#F44336') },
      { id: 'c', label: 'Blue triangle', visual: oTriangle(28, '#2196F3') },
      { id: 'd', label: 'Green diamond', visual: oDiamond(24, '#4CAF50') },
    ],
    correctAnswerId: 'a',
    explanation: 'All three shapes in the group are circles (different sizes and colors). The yellow circle is also a circle, so it belongs!',
    hint: 'What shape are ALL three of them?',
  },
  {
    id: 'fc-e-002',
    category: 'figure-classification',
    difficulty: 'easy',
    prompt: 'What do these three shapes have in common? Find the one that matches.',
    visual: `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="400" height="200" rx="16" fill="#FAFAFA"/>
      <text x="200" y="25" text-anchor="middle" font-size="16" fill="#666">These shapes are alike:</text>
      <!-- Group: all red shapes (different types) -->
      <rect x="20" y="35" width="110" height="90" rx="8" fill="#FCE4EC" stroke="#E91E63" stroke-width="2"/>
      <rect x="50" y="55" width="50" height="50" fill="#F44336" stroke="#333" stroke-width="2"/>
      <rect x="145" y="35" width="110" height="90" rx="8" fill="#FCE4EC" stroke="#E91E63" stroke-width="2"/>
      <circle cx="200" cy="80" r="25" fill="#F44336" stroke="#333" stroke-width="2"/>
      <rect x="270" y="35" width="110" height="90" rx="8" fill="#FCE4EC" stroke="#E91E63" stroke-width="2"/>
      <polygon points="325,55 300,105 350,105" fill="#F44336" stroke="#333" stroke-width="2"/>
      <text x="200" y="150" text-anchor="middle" font-size="14" fill="#888">Which one belongs?</text>
      <line x1="20" y1="138" x2="380" y2="138" stroke="#E0E0E0" stroke-width="1" stroke-dasharray="4,4"/>
    </svg>`,
    options: [
      { id: 'a', label: 'Blue circle', visual: oCircle(14, '#2196F3') },
      { id: 'b', label: 'Red diamond', visual: oDiamond(24, '#F44336') },
      { id: 'c', label: 'Green square', visual: oSquare(22, '#4CAF50') },
      { id: 'd', label: 'Yellow triangle', visual: oTriangle(28, '#FFC107') },
    ],
    correctAnswerId: 'b',
    explanation: 'All three shapes are RED (but different shapes: square, circle, triangle). The red diamond is also red, so it belongs!',
    hint: 'Ignore the shapes for a moment. What COLOR are they all?',
  },
  {
    id: 'fc-e-003',
    category: 'figure-classification',
    difficulty: 'easy',
    prompt: 'These three go together. Which one should join them?',
    visual: `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="400" height="200" rx="16" fill="#FAFAFA"/>
      <text x="200" y="25" text-anchor="middle" font-size="16" fill="#666">These shapes are alike:</text>
      <!-- Group: all big/large shapes -->
      <rect x="20" y="35" width="110" height="90" rx="8" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <circle cx="75" cy="80" r="38" fill="#9C27B0" stroke="#333" stroke-width="2"/>
      <rect x="145" y="35" width="110" height="90" rx="8" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <rect x="160" y="45" width="80" height="70" fill="#FF9800" stroke="#333" stroke-width="2"/>
      <rect x="270" y="35" width="110" height="90" rx="8" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <polygon points="325,42 285,118 365,118" fill="#4CAF50" stroke="#333" stroke-width="2"/>
      <text x="200" y="150" text-anchor="middle" font-size="14" fill="#888">Which one belongs?</text>
      <line x1="20" y1="138" x2="380" y2="138" stroke="#E0E0E0" stroke-width="1" stroke-dasharray="4,4"/>
    </svg>`,
    options: [
      { id: 'a', label: 'Large blue star', visual: oEmoji('⭐', 28) },
      { id: 'b', label: 'Tiny red circle', visual: oCircle(7, '#F44336') },
      { id: 'c', label: 'Tiny blue square', visual: oSquare(12, '#2196F3') },
      { id: 'd', label: 'Tiny green triangle', visual: oTriangle(16, '#4CAF50') },
    ],
    correctAnswerId: 'a',
    explanation: 'All three shapes are LARGE. The large blue star is also large, so it belongs with the group!',
    hint: 'Look at the size of all three shapes. Are they big or small?',
  },
  {
    id: 'fc-e-004',
    category: 'figure-classification',
    difficulty: 'easy',
    prompt: 'Find what makes these three shapes the same.',
    visual: `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="400" height="200" rx="16" fill="#FAFAFA"/>
      <text x="200" y="25" text-anchor="middle" font-size="16" fill="#666">These shapes are alike:</text>
      <!-- Group: all have 4 sides (square, rectangle, diamond) -->
      <rect x="20" y="35" width="110" height="90" rx="8" fill="#FFF3E0" stroke="#FF9800" stroke-width="2"/>
      <rect x="50" y="55" width="50" height="50" fill="#42A5F5" stroke="#333" stroke-width="2"/>
      <rect x="145" y="35" width="110" height="90" rx="8" fill="#FFF3E0" stroke="#FF9800" stroke-width="2"/>
      <rect x="165" y="50" width="70" height="50" fill="#66BB6A" stroke="#333" stroke-width="2"/>
      <rect x="270" y="35" width="110" height="90" rx="8" fill="#FFF3E0" stroke="#FF9800" stroke-width="2"/>
      <polygon points="325,50 355,80 325,110 295,80" fill="#EF5350" stroke="#333" stroke-width="2"/>
      <text x="200" y="150" text-anchor="middle" font-size="14" fill="#888">Which one belongs?</text>
      <line x1="20" y1="138" x2="380" y2="138" stroke="#E0E0E0" stroke-width="1" stroke-dasharray="4,4"/>
    </svg>`,
    options: [
      { id: 'a', label: 'Circle', visual: oCircle(14, '#9C27B0') },
      { id: 'b', label: 'Parallelogram (4 sides)', visual: opt('<polygon points="18,35 28,15 52,15 42,35" fill="#FF9800" stroke="#333" stroke-width="1.5"/>') },
      { id: 'c', label: 'Triangle', visual: oTriangle(28, '#2196F3') },
      { id: 'd', label: 'Pentagon (5 sides)', visual: oPentagon(16, '#4CAF50') },
    ],
    correctAnswerId: 'b',
    explanation: 'All three shapes have exactly 4 sides (square, rectangle, diamond). A parallelogram also has 4 sides!',
    hint: 'Count the sides of each shape. How many does each have?',
  },
  {
    id: 'fc-e-005',
    category: 'figure-classification',
    difficulty: 'easy',
    prompt: 'These three shapes share something. Find the match!',
    visual: `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="400" height="200" rx="16" fill="#FAFAFA"/>
      <text x="200" y="25" text-anchor="middle" font-size="16" fill="#666">These shapes are alike:</text>
      <!-- Group: all have stripes -->
      <rect x="20" y="35" width="110" height="90" rx="8" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2"/>
      <circle cx="75" cy="80" r="30" fill="#BBDEFB" stroke="#333" stroke-width="2"/>
      <line x1="55" y1="65" x2="95" y2="65" stroke="#333" stroke-width="2"/>
      <line x1="50" y1="80" x2="100" y2="80" stroke="#333" stroke-width="2"/>
      <line x1="55" y1="95" x2="95" y2="95" stroke="#333" stroke-width="2"/>
      <rect x="145" y="35" width="110" height="90" rx="8" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2"/>
      <rect x="170" y="55" width="60" height="50" fill="#FFCCBC" stroke="#333" stroke-width="2"/>
      <line x1="170" y1="68" x2="230" y2="68" stroke="#333" stroke-width="2"/>
      <line x1="170" y1="80" x2="230" y2="80" stroke="#333" stroke-width="2"/>
      <line x1="170" y1="92" x2="230" y2="92" stroke="#333" stroke-width="2"/>
      <rect x="270" y="35" width="110" height="90" rx="8" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2"/>
      <polygon points="325,50 295,110 355,110" fill="#E1BEE7" stroke="#333" stroke-width="2"/>
      <line x1="310" y1="80" x2="340" y2="80" stroke="#333" stroke-width="2"/>
      <line x1="305" y1="92" x2="345" y2="92" stroke="#333" stroke-width="2"/>
      <line x1="300" y1="104" x2="350" y2="104" stroke="#333" stroke-width="2"/>
      <text x="200" y="150" text-anchor="middle" font-size="14" fill="#888">Which one belongs?</text>
      <line x1="20" y1="138" x2="380" y2="138" stroke="#E0E0E0" stroke-width="1" stroke-dasharray="4,4"/>
    </svg>`,
    options: [
      { id: 'a', label: 'Diamond with stripes', visual: oDiamond(26, '#E1BEE7', '<line x1="28" y1="20" x2="42" y2="20" stroke="#333" stroke-width="1.5"/><line x1="25" y1="25" x2="45" y2="25" stroke="#333" stroke-width="1.5"/><line x1="28" y1="30" x2="42" y2="30" stroke="#333" stroke-width="1.5"/>') },
      { id: 'b', label: 'Plain circle (no stripes)', visual: oCircle(14, '#BBDEFB') },
      { id: 'c', label: 'Dotted square', visual: oSquare(22, '#FFCCBC', '<circle cx="30" cy="20" r="2" fill="#333"/><circle cx="40" cy="20" r="2" fill="#333"/><circle cx="30" cy="30" r="2" fill="#333"/><circle cx="40" cy="30" r="2" fill="#333"/>') },
      { id: 'd', label: 'Plain triangle', visual: oTriangle(28, '#E1BEE7') },
    ],
    correctAnswerId: 'a',
    explanation: 'All three shapes have horizontal stripes inside them. The diamond with stripes also has stripes!',
    hint: 'Look inside each shape. What pattern do you see?',
  },
  {
    id: 'fc-e-006',
    category: 'figure-classification',
    difficulty: 'easy',
    prompt: 'What makes these three shapes part of the same group?',
    visual: `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="400" height="200" rx="16" fill="#FAFAFA"/>
      <text x="200" y="25" text-anchor="middle" font-size="16" fill="#666">These shapes are alike:</text>
      <!-- Group: all triangles (different colors, sizes, orientations) -->
      <rect x="20" y="35" width="110" height="90" rx="8" fill="#F3E5F5" stroke="#7B1FA2" stroke-width="2"/>
      <polygon points="75,45 45,115 105,115" fill="#F44336" stroke="#333" stroke-width="2"/>
      <rect x="145" y="35" width="110" height="90" rx="8" fill="#F3E5F5" stroke="#7B1FA2" stroke-width="2"/>
      <polygon points="200,50 175,105 225,105" fill="#2196F3" stroke="#333" stroke-width="2"/>
      <rect x="270" y="35" width="110" height="90" rx="8" fill="#F3E5F5" stroke="#7B1FA2" stroke-width="2"/>
      <polygon points="325,115 300,55 350,55" fill="#4CAF50" stroke="#333" stroke-width="2"/>
      <text x="200" y="150" text-anchor="middle" font-size="14" fill="#888">Which one belongs?</text>
      <line x1="20" y1="138" x2="380" y2="138" stroke="#E0E0E0" stroke-width="1" stroke-dasharray="4,4"/>
    </svg>`,
    options: [
      { id: 'a', label: 'Orange triangle', visual: oTriangle(28, '#FF9800') },
      { id: 'b', label: 'Red circle', visual: oCircle(14, '#F44336') },
      { id: 'c', label: 'Blue square', visual: oSquare(22, '#2196F3') },
      { id: 'd', label: 'Purple rectangle', visual: oRect(30, 18, '#9C27B0') },
    ],
    correctAnswerId: 'a',
    explanation: 'All three are triangles (different colors and orientations). Only the orange triangle is also a triangle.',
  },
  // ===== MEDIUM =====
  {
    id: 'fc-m-001',
    category: 'figure-classification',
    difficulty: 'medium',
    prompt: 'Look at TWO things these shapes have in common. Find the match!',
    visual: `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="400" height="200" rx="16" fill="#FAFAFA"/>
      <text x="200" y="25" text-anchor="middle" font-size="16" fill="#666">These shapes are alike:</text>
      <!-- Group: all small AND blue -->
      <rect x="20" y="35" width="110" height="90" rx="8" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <circle cx="75" cy="80" r="15" fill="#2196F3" stroke="#333" stroke-width="2"/>
      <rect x="145" y="35" width="110" height="90" rx="8" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <rect x="185" y="65" width="30" height="30" fill="#2196F3" stroke="#333" stroke-width="2"/>
      <rect x="270" y="35" width="110" height="90" rx="8" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <polygon points="325,62 310,98 340,98" fill="#2196F3" stroke="#333" stroke-width="2"/>
      <text x="200" y="150" text-anchor="middle" font-size="14" fill="#888">Which one belongs?</text>
      <line x1="20" y1="138" x2="380" y2="138" stroke="#E0E0E0" stroke-width="1" stroke-dasharray="4,4"/>
    </svg>`,
    options: [
      { id: 'a', label: 'Small blue diamond', visual: oDiamond(18, '#2196F3') },
      { id: 'b', label: 'Large blue circle', visual: oCircle(18, '#2196F3') },
      { id: 'c', label: 'Small red circle', visual: oCircle(8, '#F44336') },
      { id: 'd', label: 'Large red square', visual: oSquare(28, '#F44336') },
    ],
    correctAnswerId: 'a',
    explanation: 'All three are SMALL and BLUE. The small blue diamond matches both attributes!',
    hint: 'Look at the color AND the size. You need both to match!',
  },
  {
    id: 'fc-m-002',
    category: 'figure-classification',
    difficulty: 'medium',
    prompt: 'These shapes have a hidden rule. Can you find it?',
    visual: `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="400" height="200" rx="16" fill="#FAFAFA"/>
      <text x="200" y="25" text-anchor="middle" font-size="16" fill="#666">These shapes are alike:</text>
      <!-- Group: all have exactly 2 shapes inside -->
      <rect x="20" y="35" width="110" height="90" rx="8" fill="#FFF8E1" stroke="#FFC107" stroke-width="2"/>
      <circle cx="75" cy="80" r="35" fill="white" stroke="#333" stroke-width="2"/>
      <circle cx="65" cy="75" r="8" fill="#F44336"/>
      <circle cx="85" cy="85" r="8" fill="#2196F3"/>
      <rect x="145" y="35" width="110" height="90" rx="8" fill="#FFF8E1" stroke="#FFC107" stroke-width="2"/>
      <rect x="170" y="55" width="60" height="50" fill="white" stroke="#333" stroke-width="2"/>
      <rect x="180" y="65" width="12" height="12" fill="#4CAF50"/>
      <rect x="200" y="80" width="12" height="12" fill="#FF9800"/>
      <rect x="270" y="35" width="110" height="90" rx="8" fill="#FFF8E1" stroke="#FFC107" stroke-width="2"/>
      <polygon points="325,45 290,115 360,115" fill="white" stroke="#333" stroke-width="2"/>
      <circle cx="315" cy="85" r="7" fill="#9C27B0"/>
      <circle cx="335" cy="95" r="7" fill="#E91E63"/>
      <text x="200" y="150" text-anchor="middle" font-size="14" fill="#888">Which one belongs?</text>
      <line x1="20" y1="138" x2="380" y2="138" stroke="#E0E0E0" stroke-width="1" stroke-dasharray="4,4"/>
    </svg>`,
    options: [
      { id: 'a', label: 'Diamond with 2 dots inside', visual: oDiamond(26, 'white', '<circle cx="30" cy="25" r="3" fill="#F44336"/><circle cx="40" cy="25" r="3" fill="#2196F3"/>') },
      { id: 'b', label: 'Circle with 1 dot inside', visual: oCircle(15, 'white', '<circle cx="35" cy="25" r="3" fill="#F44336"/>') },
      { id: 'c', label: 'Square with 3 dots inside', visual: oSquare(24, 'white', '<circle cx="28" cy="22" r="3" fill="#4CAF50"/><circle cx="42" cy="22" r="3" fill="#FF9800"/><circle cx="35" cy="32" r="3" fill="#9C27B0"/>') },
      { id: 'd', label: 'Empty triangle', visual: oTriangle(28, 'white') },
    ],
    correctAnswerId: 'a',
    explanation: 'Each shape has exactly 2 small shapes inside it. Only the diamond with 2 dots matches!',
    hint: 'Count the small shapes inside each big shape.',
  },
  {
    id: 'fc-m-003',
    category: 'figure-classification',
    difficulty: 'medium',
    prompt: 'What is the shared rule? Find the shape that follows it.',
    visual: `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="400" height="200" rx="16" fill="#FAFAFA"/>
      <text x="200" y="25" text-anchor="middle" font-size="16" fill="#666">These shapes are alike:</text>
      <!-- Group: all have a dot in the center -->
      <rect x="20" y="35" width="110" height="90" rx="8" fill="#E0F7FA" stroke="#00BCD4" stroke-width="2"/>
      <circle cx="75" cy="80" r="30" fill="#FFECB3" stroke="#333" stroke-width="2"/>
      <circle cx="75" cy="80" r="6" fill="#333"/>
      <rect x="145" y="35" width="110" height="90" rx="8" fill="#E0F7FA" stroke="#00BCD4" stroke-width="2"/>
      <rect x="175" y="55" width="50" height="50" fill="#C8E6C9" stroke="#333" stroke-width="2"/>
      <circle cx="200" cy="80" r="6" fill="#333"/>
      <rect x="270" y="35" width="110" height="90" rx="8" fill="#E0F7FA" stroke="#00BCD4" stroke-width="2"/>
      <polygon points="325,48 295,112 355,112" fill="#F8BBD0" stroke="#333" stroke-width="2"/>
      <circle cx="325" cy="88" r="6" fill="#333"/>
      <text x="200" y="150" text-anchor="middle" font-size="14" fill="#888">Which one belongs?</text>
      <line x1="20" y1="138" x2="380" y2="138" stroke="#E0E0E0" stroke-width="1" stroke-dasharray="4,4"/>
    </svg>`,
    options: [
      { id: 'a', label: 'Star with dot in center', visual: oEmoji('⭐', 26) },
      { id: 'b', label: 'Circle with no dot', visual: oCircle(14, '#FFECB3') },
      { id: 'c', label: 'Square with stripe', visual: oSquare(22, '#C8E6C9', '<line x1="24" y1="14" x2="46" y2="14" stroke="#333" stroke-width="2"/>') },
      { id: 'd', label: 'Triangle with X inside', visual: oTriangle(28, '#F8BBD0', 'up', '<line x1="28" y1="22" x2="42" y2="34" stroke="#333" stroke-width="1.5"/><line x1="42" y1="22" x2="28" y2="34" stroke="#333" stroke-width="1.5"/>') },
    ],
    correctAnswerId: 'a',
    explanation: 'All shapes have a black dot in their center. The star with a dot also has this feature!',
  },
  {
    id: 'fc-m-004',
    category: 'figure-classification',
    difficulty: 'medium',
    prompt: 'Find the common trait and pick the matching shape.',
    visual: `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="400" height="200" rx="16" fill="#FAFAFA"/>
      <text x="200" y="25" text-anchor="middle" font-size="16" fill="#666">These shapes are alike:</text>
      <!-- Group: all point upward / have a point on top -->
      <rect x="20" y="35" width="110" height="90" rx="8" fill="#FBE9E7" stroke="#FF5722" stroke-width="2"/>
      <polygon points="75,42 45,115 105,115" fill="#FF5722" stroke="#333" stroke-width="2"/>
      <rect x="145" y="35" width="110" height="90" rx="8" fill="#FBE9E7" stroke="#FF5722" stroke-width="2"/>
      <polygon points="200,42 175,115 225,115 215,65 200,42 185,65" fill="#FF5722" stroke="#333" stroke-width="2"/>
      <rect x="270" y="35" width="110" height="90" rx="8" fill="#FBE9E7" stroke="#FF5722" stroke-width="2"/>
      <polygon points="325,42 300,80 308,80 308,115 342,115 342,80 350,80" fill="#FF5722" stroke="#333" stroke-width="2"/>
      <text x="200" y="150" text-anchor="middle" font-size="14" fill="#888">Which one belongs?</text>
      <line x1="20" y1="138" x2="380" y2="138" stroke="#E0E0E0" stroke-width="1" stroke-dasharray="4,4"/>
    </svg>`,
    options: [
      { id: 'a', label: 'Shape pointing up', visual: oTriangle(28, '#FF5722') },
      { id: 'b', label: 'Shape pointing down', visual: oTriangle(28, '#FF5722', 'down') },
      { id: 'c', label: 'Shape pointing left', visual: opt('<polygon points="10,25 40,10 40,40" fill="#FF5722" stroke="#333" stroke-width="1.5"/>') },
      { id: 'd', label: 'Round shape', visual: oCircle(14, '#FF5722') },
    ],
    correctAnswerId: 'a',
    explanation: 'All shapes point upward (they have a pointed top). Only the shape pointing up matches!',
    hint: 'Look at which direction the pointy part faces.',
  },
  {
    id: 'fc-m-005',
    category: 'figure-classification',
    difficulty: 'medium',
    prompt: 'What rule makes these three a group? Find another that fits.',
    visual: `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="400" height="200" rx="16" fill="#FAFAFA"/>
      <text x="200" y="25" text-anchor="middle" font-size="16" fill="#666">These shapes are alike:</text>
      <!-- Group: all half-filled (half colored, half white) -->
      <rect x="20" y="35" width="110" height="90" rx="8" fill="#E8EAF6" stroke="#3F51B5" stroke-width="2"/>
      <circle cx="75" cy="80" r="30" fill="white" stroke="#333" stroke-width="2"/>
      <path d="M 75 50 A 30 30 0 0 1 75 110 Z" fill="#3F51B5"/>
      <rect x="145" y="35" width="110" height="90" rx="8" fill="#E8EAF6" stroke="#3F51B5" stroke-width="2"/>
      <rect x="175" y="55" width="50" height="50" fill="white" stroke="#333" stroke-width="2"/>
      <rect x="175" y="55" width="25" height="50" fill="#E91E63"/>
      <rect x="270" y="35" width="110" height="90" rx="8" fill="#E8EAF6" stroke="#3F51B5" stroke-width="2"/>
      <polygon points="325,48 295,112 355,112" fill="white" stroke="#333" stroke-width="2"/>
      <polygon points="325,48 295,112 325,112" fill="#4CAF50"/>
      <text x="200" y="150" text-anchor="middle" font-size="14" fill="#888">Which one belongs?</text>
      <line x1="20" y1="138" x2="380" y2="138" stroke="#E0E0E0" stroke-width="1" stroke-dasharray="4,4"/>
    </svg>`,
    options: [
      { id: 'a', label: 'Half-filled diamond', visual: opt('<polygon points="35,10 50,25 35,40 20,25" fill="white" stroke="#333" stroke-width="1.5"/><polygon points="35,10 35,40 20,25" fill="#E91E63"/>') },
      { id: 'b', label: 'Fully filled circle', visual: oCircle(14, '#3F51B5') },
      { id: 'c', label: 'Empty square', visual: oSquare(22, 'white') },
      { id: 'd', label: 'Quarter-filled triangle', visual: oTriangle(28, 'white', 'up', '<polygon points="35,34 29,34 35,26" fill="#4CAF50"/>') },
    ],
    correctAnswerId: 'a',
    explanation: 'All shapes are exactly HALF filled with color. The half-filled diamond matches this rule!',
    hint: 'How much of each shape is colored in?',
  },
  {
    id: 'fc-m-006',
    category: 'figure-classification',
    difficulty: 'medium',
    prompt: 'These three shapes belong together. Which should join them?',
    visual: `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="400" height="200" rx="16" fill="#FAFAFA"/>
      <text x="200" y="25" text-anchor="middle" font-size="16" fill="#666">These shapes are alike:</text>
      <!-- Group: all contain exactly 3 sides (triangles of various types) -->
      <rect x="20" y="35" width="110" height="90" rx="8" fill="#E0F2F1" stroke="#009688" stroke-width="2"/>
      <polygon points="75,45 40,115 110,115" fill="#FF9800" stroke="#333" stroke-width="2"/>
      <rect x="145" y="35" width="110" height="90" rx="8" fill="#E0F2F1" stroke="#009688" stroke-width="2"/>
      <polygon points="175,115 200,45 250,115" fill="#9C27B0" stroke="#333" stroke-width="2"/>
      <rect x="270" y="35" width="110" height="90" rx="8" fill="#E0F2F1" stroke="#009688" stroke-width="2"/>
      <polygon points="290,80 340,50 365,115" fill="#2196F3" stroke="#333" stroke-width="2"/>
      <text x="200" y="150" text-anchor="middle" font-size="14" fill="#888">Which one belongs?</text>
      <line x1="20" y1="138" x2="380" y2="138" stroke="#E0E0E0" stroke-width="1" stroke-dasharray="4,4"/>
    </svg>`,
    options: [
      { id: 'a', label: 'Green triangle', visual: oTriangle(28, '#4CAF50') },
      { id: 'b', label: 'Red pentagon', visual: oPentagon(14, '#F44336') },
      { id: 'c', label: 'Blue rectangle', visual: oRect(30, 18, '#2196F3') },
      { id: 'd', label: 'Yellow hexagon', visual: oHexagon(14, '#FFC107') },
    ],
    correctAnswerId: 'a',
    explanation: 'All shapes have 3 sides (triangles). The green triangle also has 3 sides.',
    hint: 'Count the number of sides on each shape.',
  },
  // ===== HARD =====
  {
    id: 'fc-h-001',
    category: 'figure-classification',
    difficulty: 'hard',
    prompt: 'The common rule is tricky! Look at everything carefully.',
    visual: `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="400" height="200" rx="16" fill="#FAFAFA"/>
      <text x="200" y="25" text-anchor="middle" font-size="16" fill="#666">These shapes are alike:</text>
      <!-- Group: all have an odd number of sides (triangle=3, pentagon=5, heptagon=7-ish) -->
      <rect x="20" y="35" width="110" height="90" rx="8" fill="#F3E5F5" stroke="#7B1FA2" stroke-width="2"/>
      <polygon points="75,45 45,115 105,115" fill="#CE93D8" stroke="#333" stroke-width="2"/>
      <rect x="145" y="35" width="110" height="90" rx="8" fill="#F3E5F5" stroke="#7B1FA2" stroke-width="2"/>
      <polygon points="200,45 172,65 178,95 222,95 228,65" fill="#CE93D8" stroke="#333" stroke-width="2"/>
      <rect x="270" y="35" width="110" height="90" rx="8" fill="#F3E5F5" stroke="#7B1FA2" stroke-width="2"/>
      <polygon points="325,45 298,58 290,85 305,108 345,108 360,85 352,58" fill="#CE93D8" stroke="#333" stroke-width="2"/>
      <text x="200" y="150" text-anchor="middle" font-size="14" fill="#888">Which one belongs?</text>
      <line x1="20" y1="138" x2="380" y2="138" stroke="#E0E0E0" stroke-width="1" stroke-dasharray="4,4"/>
    </svg>`,
    options: [
      { id: 'a', label: 'Nonagon (9 sides)', visual: opt((() => { const pts = [0,1,2,3,4,5,6,7,8].map(i => { const a = (i * 40 - 90) * Math.PI / 180; return `${35 + 16 * Math.cos(a)},${25 + 16 * Math.sin(a)}`; }).join(' '); return `<polygon points="${pts}" fill="#CE93D8" stroke="#333" stroke-width="1.5"/>`; })()) },
      { id: 'b', label: 'Square (4 sides)', visual: oSquare(22, '#CE93D8') },
      { id: 'c', label: 'Hexagon (6 sides)', visual: oHexagon(14, '#CE93D8') },
      { id: 'd', label: 'Octagon (8 sides)', visual: opt((() => { const pts = [0,1,2,3,4,5,6,7].map(i => { const a = (i * 45 - 90) * Math.PI / 180; return `${35 + 16 * Math.cos(a)},${25 + 16 * Math.sin(a)}`; }).join(' '); return `<polygon points="${pts}" fill="#CE93D8" stroke="#333" stroke-width="1.5"/>`; })()) },
    ],
    correctAnswerId: 'a',
    explanation: 'Triangle=3, pentagon=5, heptagon=7. All have an ODD number of sides. Nonagon (9 sides) is also odd!',
    hint: 'Count the sides: 3, 5, 7. What pattern do you notice?',
  },
  {
    id: 'fc-h-002',
    category: 'figure-classification',
    difficulty: 'hard',
    prompt: 'Find the abstract rule that connects these shapes.',
    visual: `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="400" height="200" rx="16" fill="#FAFAFA"/>
      <text x="200" y="25" text-anchor="middle" font-size="16" fill="#666">These shapes are alike:</text>
      <!-- Group: shape inside is DIFFERENT from shape outside -->
      <rect x="20" y="35" width="110" height="90" rx="8" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2"/>
      <circle cx="75" cy="80" r="35" fill="#BBDEFB" stroke="#333" stroke-width="2"/>
      <rect x="58" y="63" width="34" height="34" fill="#FF8A65" stroke="#333" stroke-width="1.5"/>
      <rect x="145" y="35" width="110" height="90" rx="8" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2"/>
      <rect x="170" y="50" width="60" height="60" fill="#C8E6C9" stroke="#333" stroke-width="2"/>
      <polygon points="200,58 185,100 215,100" fill="#EF9A9A" stroke="#333" stroke-width="1.5"/>
      <rect x="270" y="35" width="110" height="90" rx="8" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2"/>
      <polygon points="325,45 290,115 360,115" fill="#E1BEE7" stroke="#333" stroke-width="2"/>
      <circle cx="325" cy="90" r="16" fill="#FFF59D" stroke="#333" stroke-width="1.5"/>
      <text x="200" y="150" text-anchor="middle" font-size="14" fill="#888">Which one belongs?</text>
      <line x1="20" y1="138" x2="380" y2="138" stroke="#E0E0E0" stroke-width="1" stroke-dasharray="4,4"/>
    </svg>`,
    options: [
      { id: 'a', label: 'Pentagon with triangle inside', visual: oPentagon(18, '#BBDEFB', '<polygon points="35,18 28,32 42,32" fill="#FF8A65" stroke="#333" stroke-width="1"/>') },
      { id: 'b', label: 'Circle with circle inside', visual: oCircle(16, '#BBDEFB', '<circle cx="35" cy="25" r="8" fill="#FF8A65" stroke="#333" stroke-width="1"/>') },
      { id: 'c', label: 'Square with square inside', visual: oSquare(26, '#C8E6C9', '<rect x="29" y="19" width="12" height="12" fill="#EF9A9A" stroke="#333" stroke-width="1"/>') },
      { id: 'd', label: 'Triangle with triangle inside', visual: oTriangle(32, '#E1BEE7', 'up', '<polygon points="35,20 30,30 40,30" fill="#FFF59D" stroke="#333" stroke-width="1"/>') },
    ],
    correctAnswerId: 'a',
    explanation: 'Each figure has a DIFFERENT shape inside than the shape outside (circle has square, square has triangle, triangle has circle). Pentagon with triangle = different shapes!',
    hint: 'Compare the outside shape to the inside shape. Are they the same or different?',
  },
  {
    id: 'fc-h-003',
    category: 'figure-classification',
    difficulty: 'hard',
    prompt: 'This classification has two rules at once!',
    visual: `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="400" height="200" rx="16" fill="#FAFAFA"/>
      <text x="200" y="25" text-anchor="middle" font-size="16" fill="#666">These shapes are alike:</text>
      <!-- Group: all outlined (not filled) AND have curved edges -->
      <rect x="20" y="35" width="110" height="90" rx="8" fill="#FFF3E0" stroke="#FF9800" stroke-width="2"/>
      <circle cx="75" cy="80" r="30" fill="none" stroke="#333" stroke-width="3"/>
      <rect x="145" y="35" width="110" height="90" rx="8" fill="#FFF3E0" stroke="#FF9800" stroke-width="2"/>
      <ellipse cx="200" cy="80" rx="40" ry="25" fill="none" stroke="#333" stroke-width="3"/>
      <rect x="270" y="35" width="110" height="90" rx="8" fill="#FFF3E0" stroke="#FF9800" stroke-width="2"/>
      <path d="M 310 60 Q 325 40 340 60 Q 355 80 340 100 Q 325 120 310 100 Q 295 80 310 60" fill="none" stroke="#333" stroke-width="3"/>
      <text x="200" y="150" text-anchor="middle" font-size="14" fill="#888">Which one belongs?</text>
      <line x1="20" y1="138" x2="380" y2="138" stroke="#E0E0E0" stroke-width="1" stroke-dasharray="4,4"/>
    </svg>`,
    options: [
      { id: 'a', label: 'Outlined semicircle (curved, not filled)', visual: opt('<path d="M 20 30 A 15 15 0 0 1 50 30" fill="none" stroke="#333" stroke-width="2.5"/>') },
      { id: 'b', label: 'Filled circle', visual: oCircle(14, '#333') },
      { id: 'c', label: 'Outlined triangle', visual: oTriangle(28, 'none') },
      { id: 'd', label: 'Filled oval', visual: opt('<ellipse cx="35" cy="25" rx="18" ry="13" fill="#333" stroke="#333" stroke-width="1.5"/>') },
    ],
    correctAnswerId: 'a',
    explanation: 'Two rules: (1) all are outlines (not filled) and (2) all have curved edges. Only the outlined semicircle matches BOTH rules.',
    hint: 'Look at two things: are they filled or just outlines? Do they have straight or curved edges?',
  },
  {
    id: 'fc-h-004',
    category: 'figure-classification',
    difficulty: 'hard',
    prompt: 'Study the shapes very carefully. What makes them special?',
    visual: `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="400" height="200" rx="16" fill="#FAFAFA"/>
      <text x="200" y="25" text-anchor="middle" font-size="16" fill="#666">These shapes are alike:</text>
      <!-- Group: all are symmetric (line of symmetry) -->
      <rect x="20" y="35" width="110" height="90" rx="8" fill="#E1F5FE" stroke="#0288D1" stroke-width="2"/>
      <polygon points="75,42 45,115 105,115" fill="#4FC3F7" stroke="#333" stroke-width="2"/>
      <line x1="75" y1="42" x2="75" y2="115" stroke="#333" stroke-width="1" stroke-dasharray="3,3"/>
      <rect x="145" y="35" width="110" height="90" rx="8" fill="#E1F5FE" stroke="#0288D1" stroke-width="2"/>
      <polygon points="180,80 200,48 220,80 200,112" fill="#4FC3F7" stroke="#333" stroke-width="2"/>
      <line x1="200" y1="48" x2="200" y2="112" stroke="#333" stroke-width="1" stroke-dasharray="3,3"/>
      <rect x="270" y="35" width="110" height="90" rx="8" fill="#E1F5FE" stroke="#0288D1" stroke-width="2"/>
      <rect x="300" y="55" width="50" height="50" fill="#4FC3F7" stroke="#333" stroke-width="2"/>
      <line x1="325" y1="55" x2="325" y2="105" stroke="#333" stroke-width="1" stroke-dasharray="3,3"/>
      <text x="200" y="150" text-anchor="middle" font-size="14" fill="#888">Which one belongs?</text>
      <line x1="20" y1="138" x2="380" y2="138" stroke="#E0E0E0" stroke-width="1" stroke-dasharray="4,4"/>
    </svg>`,
    options: [
      { id: 'a', label: 'Heart (symmetric)', visual: opt('<path d="M 35 38 C 20 28 12 18 20 12 C 28 6 35 14 35 18 C 35 14 42 6 50 12 C 58 18 50 28 35 38Z" fill="#F44336" stroke="#333" stroke-width="1.5"/>') },
      { id: 'b', label: 'Parallelogram (not symmetric)', visual: opt('<polygon points="18,35 28,12 52,12 42,35" fill="#4FC3F7" stroke="#333" stroke-width="1.5"/>') },
      { id: 'c', label: 'Lightning bolt (not symmetric)', visual: opt('<polygon points="38,5 25,22 33,22 28,45 45,24 36,24" fill="#FFC107" stroke="#333" stroke-width="1.5"/>') },
      { id: 'd', label: 'Curved swoosh (not symmetric)', visual: opt('<path d="M 15 35 Q 25 10 45 20 Q 55 25 55 15" fill="none" stroke="#333" stroke-width="3" stroke-linecap="round"/>') },
    ],
    correctAnswerId: 'a',
    explanation: 'All shapes have a vertical line of symmetry (they look the same on both sides). A heart is also symmetric!',
    hint: 'Imagine folding each shape in half. Do both sides match?',
  },
  {
    id: 'fc-h-005',
    category: 'figure-classification',
    difficulty: 'hard',
    prompt: 'This is a real brain teaser! What do these shapes share?',
    visual: `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="400" height="200" rx="16" fill="#FAFAFA"/>
      <text x="200" y="25" text-anchor="middle" font-size="16" fill="#666">These shapes are alike:</text>
      <!-- Group: number of sides matches number of dots inside -->
      <rect x="20" y="35" width="110" height="90" rx="8" fill="#EFEBE9" stroke="#795548" stroke-width="2"/>
      <polygon points="75,45 45,115 105,115" fill="#BCAAA4" stroke="#333" stroke-width="2"/>
      <circle cx="65" cy="85" r="5" fill="#333"/>
      <circle cx="85" cy="85" r="5" fill="#333"/>
      <circle cx="75" cy="70" r="5" fill="#333"/>
      <rect x="145" y="35" width="110" height="90" rx="8" fill="#EFEBE9" stroke="#795548" stroke-width="2"/>
      <rect x="175" y="55" width="50" height="50" fill="#BCAAA4" stroke="#333" stroke-width="2"/>
      <circle cx="188" cy="70" r="4" fill="#333"/>
      <circle cx="212" cy="70" r="4" fill="#333"/>
      <circle cx="188" cy="92" r="4" fill="#333"/>
      <circle cx="212" cy="92" r="4" fill="#333"/>
      <rect x="270" y="35" width="110" height="90" rx="8" fill="#EFEBE9" stroke="#795548" stroke-width="2"/>
      <polygon points="325,42 295,68 305,105 345,105 355,68" fill="#BCAAA4" stroke="#333" stroke-width="2"/>
      <circle cx="315" cy="72" r="4" fill="#333"/>
      <circle cx="335" cy="72" r="4" fill="#333"/>
      <circle cx="310" cy="92" r="4" fill="#333"/>
      <circle cx="340" cy="92" r="4" fill="#333"/>
      <circle cx="325" cy="60" r="4" fill="#333"/>
      <text x="200" y="150" text-anchor="middle" font-size="14" fill="#888">Which one belongs?</text>
      <line x1="20" y1="138" x2="380" y2="138" stroke="#E0E0E0" stroke-width="1" stroke-dasharray="4,4"/>
    </svg>`,
    options: [
      { id: 'a', label: 'Hexagon with 6 dots', visual: oHexagon(18, '#BCAAA4', '<circle cx="28" cy="20" r="2.5" fill="#333"/><circle cx="42" cy="20" r="2.5" fill="#333"/><circle cx="25" cy="28" r="2.5" fill="#333"/><circle cx="45" cy="28" r="2.5" fill="#333"/><circle cx="30" cy="35" r="2.5" fill="#333"/><circle cx="40" cy="35" r="2.5" fill="#333"/>') },
      { id: 'b', label: 'Hexagon with 4 dots', visual: oHexagon(18, '#BCAAA4', '<circle cx="29" cy="20" r="2.5" fill="#333"/><circle cx="41" cy="20" r="2.5" fill="#333"/><circle cx="29" cy="30" r="2.5" fill="#333"/><circle cx="41" cy="30" r="2.5" fill="#333"/>') },
      { id: 'c', label: 'Triangle with 5 dots', visual: oTriangle(32, '#BCAAA4', 'up', '<circle cx="35" cy="16" r="2.5" fill="#333"/><circle cx="28" cy="28" r="2.5" fill="#333"/><circle cx="42" cy="28" r="2.5" fill="#333"/><circle cx="24" cy="35" r="2.5" fill="#333"/><circle cx="46" cy="35" r="2.5" fill="#333"/>') },
      { id: 'd', label: 'Square with 3 dots', visual: oSquare(26, '#BCAAA4', '<circle cx="28" cy="22" r="2.5" fill="#333"/><circle cx="42" cy="22" r="2.5" fill="#333"/><circle cx="35" cy="32" r="2.5" fill="#333"/>') },
    ],
    correctAnswerId: 'a',
    explanation: 'Triangle has 3 sides and 3 dots. Square has 4 sides and 4 dots. Pentagon has 5 sides and 5 dots. The number of dots equals the number of sides! Hexagon with 6 dots follows this rule.',
    hint: 'Count the sides AND count the dots. What do you notice?',
  },
];
