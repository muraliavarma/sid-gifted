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
  // ===== EASY (continued) =====
  {
    id: 'fc-e-007',
    category: 'figure-classification',
    difficulty: 'easy',
    prompt: 'These three shapes are alike. Which one belongs with them?',
    visual: `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="400" height="200" rx="16" fill="#FAFAFA"/>
      <text x="200" y="25" text-anchor="middle" font-size="16" fill="#666">These shapes are alike:</text>
      <!-- Group: all squares (different colors and sizes) -->
      <rect x="20" y="35" width="110" height="90" rx="8" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <rect x="45" y="50" width="60" height="60" fill="#FF9800" stroke="#333" stroke-width="2"/>
      <rect x="145" y="35" width="110" height="90" rx="8" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <rect x="180" y="60" width="40" height="40" fill="#9C27B0" stroke="#333" stroke-width="2"/>
      <rect x="270" y="35" width="110" height="90" rx="8" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <rect x="293" y="48" width="65" height="65" fill="#4CAF50" stroke="#333" stroke-width="2"/>
      <text x="200" y="150" text-anchor="middle" font-size="14" fill="#888">Which one belongs?</text>
      <line x1="20" y1="138" x2="380" y2="138" stroke="#E0E0E0" stroke-width="1" stroke-dasharray="4,4"/>
    </svg>`,
    options: [
      { id: 'a', label: 'Red circle', visual: oCircle(14, '#F44336') },
      { id: 'b', label: 'Blue square', visual: oSquare(22, '#2196F3') },
      { id: 'c', label: 'Yellow triangle', visual: oTriangle(28, '#FFC107') },
      { id: 'd', label: 'Pink diamond', visual: oDiamond(24, '#E91E63') },
    ],
    correctAnswerId: 'b',
    explanation: 'All three shapes are squares (different sizes and colors). The blue square is also a square, so it belongs!',
    hint: 'What shape are ALL three of them?',
  },
  {
    id: 'fc-e-008',
    category: 'figure-classification',
    difficulty: 'easy',
    prompt: 'What do these three shapes have in common? Find the one that matches.',
    visual: `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="400" height="200" rx="16" fill="#FAFAFA"/>
      <text x="200" y="25" text-anchor="middle" font-size="16" fill="#666">These shapes are alike:</text>
      <!-- Group: all green shapes (different types) -->
      <rect x="20" y="35" width="110" height="90" rx="8" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2"/>
      <circle cx="75" cy="80" r="30" fill="#4CAF50" stroke="#333" stroke-width="2"/>
      <rect x="145" y="35" width="110" height="90" rx="8" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2"/>
      <polygon points="200,48 175,112 225,112" fill="#4CAF50" stroke="#333" stroke-width="2"/>
      <rect x="270" y="35" width="110" height="90" rx="8" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2"/>
      <polygon points="325,55 355,80 325,105 295,80" fill="#4CAF50" stroke="#333" stroke-width="2"/>
      <text x="200" y="150" text-anchor="middle" font-size="14" fill="#888">Which one belongs?</text>
      <line x1="20" y1="138" x2="380" y2="138" stroke="#E0E0E0" stroke-width="1" stroke-dasharray="4,4"/>
    </svg>`,
    options: [
      { id: 'a', label: 'Red square', visual: oSquare(22, '#F44336') },
      { id: 'b', label: 'Blue circle', visual: oCircle(14, '#2196F3') },
      { id: 'c', label: 'Green pentagon', visual: oPentagon(16, '#4CAF50') },
      { id: 'd', label: 'Yellow hexagon', visual: oHexagon(14, '#FFC107') },
    ],
    correctAnswerId: 'c',
    explanation: 'All three shapes are GREEN (but different shapes: circle, triangle, diamond). The green pentagon is also green, so it belongs!',
    hint: 'Ignore the shapes for a moment. What COLOR are they all?',
  },
  {
    id: 'fc-e-009',
    category: 'figure-classification',
    difficulty: 'easy',
    prompt: 'These three go together. Which one should join them?',
    visual: `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="400" height="200" rx="16" fill="#FAFAFA"/>
      <text x="200" y="25" text-anchor="middle" font-size="16" fill="#666">These shapes are alike:</text>
      <!-- Group: all small shapes -->
      <rect x="20" y="35" width="110" height="90" rx="8" fill="#FFF3E0" stroke="#FF9800" stroke-width="2"/>
      <circle cx="75" cy="80" r="12" fill="#F44336" stroke="#333" stroke-width="2"/>
      <rect x="145" y="35" width="110" height="90" rx="8" fill="#FFF3E0" stroke="#FF9800" stroke-width="2"/>
      <rect x="190" y="70" width="20" height="20" fill="#2196F3" stroke="#333" stroke-width="2"/>
      <rect x="270" y="35" width="110" height="90" rx="8" fill="#FFF3E0" stroke="#FF9800" stroke-width="2"/>
      <polygon points="325,68 315,92 335,92" fill="#9C27B0" stroke="#333" stroke-width="2"/>
      <text x="200" y="150" text-anchor="middle" font-size="14" fill="#888">Which one belongs?</text>
      <line x1="20" y1="138" x2="380" y2="138" stroke="#E0E0E0" stroke-width="1" stroke-dasharray="4,4"/>
    </svg>`,
    options: [
      { id: 'a', label: 'Large blue circle', visual: oCircle(20, '#2196F3') },
      { id: 'b', label: 'Large red square', visual: oSquare(30, '#F44336') },
      { id: 'c', label: 'Small orange diamond', visual: oDiamond(14, '#FF9800') },
      { id: 'd', label: 'Large green triangle', visual: oTriangle(32, '#4CAF50') },
    ],
    correctAnswerId: 'c',
    explanation: 'All three shapes are SMALL. The small orange diamond is also small, so it belongs with the group!',
    hint: 'Look at the size of all three shapes. Are they big or small?',
  },
  {
    id: 'fc-e-010',
    category: 'figure-classification',
    difficulty: 'easy',
    prompt: 'Find what makes these three shapes the same.',
    visual: `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="400" height="200" rx="16" fill="#FAFAFA"/>
      <text x="200" y="25" text-anchor="middle" font-size="16" fill="#666">These shapes are alike:</text>
      <!-- Group: all have dashed outlines -->
      <rect x="20" y="35" width="110" height="90" rx="8" fill="#FCE4EC" stroke="#E91E63" stroke-width="2"/>
      <circle cx="75" cy="80" r="30" fill="#BBDEFB" stroke="#333" stroke-width="2.5" stroke-dasharray="6,4"/>
      <rect x="145" y="35" width="110" height="90" rx="8" fill="#FCE4EC" stroke="#E91E63" stroke-width="2"/>
      <rect x="175" y="55" width="50" height="50" fill="#C8E6C9" stroke="#333" stroke-width="2.5" stroke-dasharray="6,4"/>
      <rect x="270" y="35" width="110" height="90" rx="8" fill="#FCE4EC" stroke="#E91E63" stroke-width="2"/>
      <polygon points="325,48 295,112 355,112" fill="#FFF9C4" stroke="#333" stroke-width="2.5" stroke-dasharray="6,4"/>
      <text x="200" y="150" text-anchor="middle" font-size="14" fill="#888">Which one belongs?</text>
      <line x1="20" y1="138" x2="380" y2="138" stroke="#E0E0E0" stroke-width="1" stroke-dasharray="4,4"/>
    </svg>`,
    options: [
      { id: 'a', label: 'Solid outline diamond', visual: oDiamond(24, '#E1BEE7') },
      { id: 'b', label: 'Dashed outline pentagon', visual: oPentagon(16, '#FFCCBC', '<circle r="0"/>').replace('stroke-width="1.5"', 'stroke-width="2" stroke-dasharray="4,3"') },
      { id: 'c', label: 'Solid outline hexagon', visual: oHexagon(14, '#B2DFDB') },
      { id: 'd', label: 'Solid outline circle', visual: oCircle(14, '#FFECB3') },
    ],
    correctAnswerId: 'b',
    explanation: 'All three shapes have dashed outlines instead of solid outlines. The dashed pentagon also has a dashed outline!',
    hint: 'Look carefully at the edges of each shape. Are the lines solid or broken?',
  },
  // ===== MEDIUM (continued) =====
  {
    id: 'fc-m-007',
    category: 'figure-classification',
    difficulty: 'medium',
    prompt: 'Look at TWO things these shapes have in common. Find the match!',
    visual: `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="400" height="200" rx="16" fill="#FAFAFA"/>
      <text x="200" y="25" text-anchor="middle" font-size="16" fill="#666">These shapes are alike:</text>
      <!-- Group: all large AND red -->
      <rect x="20" y="35" width="110" height="90" rx="8" fill="#FFEBEE" stroke="#D32F2F" stroke-width="2"/>
      <circle cx="75" cy="80" r="35" fill="#F44336" stroke="#333" stroke-width="2"/>
      <rect x="145" y="35" width="110" height="90" rx="8" fill="#FFEBEE" stroke="#D32F2F" stroke-width="2"/>
      <rect x="160" y="45" width="80" height="70" fill="#F44336" stroke="#333" stroke-width="2"/>
      <rect x="270" y="35" width="110" height="90" rx="8" fill="#FFEBEE" stroke="#D32F2F" stroke-width="2"/>
      <polygon points="325,40 280,118 370,118" fill="#F44336" stroke="#333" stroke-width="2"/>
      <text x="200" y="150" text-anchor="middle" font-size="14" fill="#888">Which one belongs?</text>
      <line x1="20" y1="138" x2="380" y2="138" stroke="#E0E0E0" stroke-width="1" stroke-dasharray="4,4"/>
    </svg>`,
    options: [
      { id: 'a', label: 'Small red circle', visual: oCircle(8, '#F44336') },
      { id: 'b', label: 'Large blue square', visual: oSquare(28, '#2196F3') },
      { id: 'c', label: 'Large red diamond', visual: oDiamond(28, '#F44336') },
      { id: 'd', label: 'Small blue triangle', visual: oTriangle(18, '#2196F3') },
    ],
    correctAnswerId: 'c',
    explanation: 'All three are LARGE and RED. The large red diamond matches both attributes!',
    hint: 'Look at the color AND the size. You need both to match!',
  },
  {
    id: 'fc-m-008',
    category: 'figure-classification',
    difficulty: 'medium',
    prompt: 'These shapes share a pattern. Can you find which one belongs?',
    visual: `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="400" height="200" rx="16" fill="#FAFAFA"/>
      <text x="200" y="25" text-anchor="middle" font-size="16" fill="#666">These shapes are alike:</text>
      <!-- Group: all have dots (polka dots) inside -->
      <rect x="20" y="35" width="110" height="90" rx="8" fill="#F3E5F5" stroke="#7B1FA2" stroke-width="2"/>
      <circle cx="75" cy="80" r="32" fill="#E1BEE7" stroke="#333" stroke-width="2"/>
      <circle cx="62" cy="72" r="5" fill="#7B1FA2"/>
      <circle cx="82" cy="72" r="5" fill="#7B1FA2"/>
      <circle cx="72" cy="90" r="5" fill="#7B1FA2"/>
      <circle cx="88" cy="86" r="5" fill="#7B1FA2"/>
      <rect x="145" y="35" width="110" height="90" rx="8" fill="#F3E5F5" stroke="#7B1FA2" stroke-width="2"/>
      <rect x="170" y="52" width="60" height="55" fill="#E1BEE7" stroke="#333" stroke-width="2"/>
      <circle cx="185" cy="68" r="5" fill="#7B1FA2"/>
      <circle cx="210" cy="68" r="5" fill="#7B1FA2"/>
      <circle cx="185" cy="90" r="5" fill="#7B1FA2"/>
      <circle cx="210" cy="90" r="5" fill="#7B1FA2"/>
      <rect x="270" y="35" width="110" height="90" rx="8" fill="#F3E5F5" stroke="#7B1FA2" stroke-width="2"/>
      <polygon points="325,46 292,112 358,112" fill="#E1BEE7" stroke="#333" stroke-width="2"/>
      <circle cx="315" cy="88" r="5" fill="#7B1FA2"/>
      <circle cx="335" cy="88" r="5" fill="#7B1FA2"/>
      <circle cx="325" cy="72" r="5" fill="#7B1FA2"/>
      <text x="200" y="150" text-anchor="middle" font-size="14" fill="#888">Which one belongs?</text>
      <line x1="20" y1="138" x2="380" y2="138" stroke="#E0E0E0" stroke-width="1" stroke-dasharray="4,4"/>
    </svg>`,
    options: [
      { id: 'a', label: 'Hexagon with dots', visual: oHexagon(18, '#E1BEE7', '<circle cx="28" cy="22" r="3" fill="#7B1FA2"/><circle cx="42" cy="22" r="3" fill="#7B1FA2"/><circle cx="35" cy="32" r="3" fill="#7B1FA2"/>') },
      { id: 'b', label: 'Plain circle', visual: oCircle(14, '#E1BEE7') },
      { id: 'c', label: 'Square with stripes', visual: oSquare(22, '#E1BEE7', '<line x1="24" y1="18" x2="46" y2="18" stroke="#7B1FA2" stroke-width="2"/><line x1="24" y1="25" x2="46" y2="25" stroke="#7B1FA2" stroke-width="2"/><line x1="24" y1="32" x2="46" y2="32" stroke="#7B1FA2" stroke-width="2"/>') },
      { id: 'd', label: 'Diamond with cross', visual: oDiamond(24, '#E1BEE7', '<line x1="28" y1="25" x2="42" y2="25" stroke="#7B1FA2" stroke-width="2"/><line x1="35" y1="18" x2="35" y2="32" stroke="#7B1FA2" stroke-width="2"/>') },
    ],
    correctAnswerId: 'a',
    explanation: 'All three shapes have polka dots (small circles) inside them. The hexagon with dots also has dots!',
    hint: 'Look at the pattern inside each shape. Are they dots, lines, or something else?',
  },
  {
    id: 'fc-m-009',
    category: 'figure-classification',
    difficulty: 'medium',
    prompt: 'What is the shared rule? Find the shape that follows it.',
    visual: `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="400" height="200" rx="16" fill="#FAFAFA"/>
      <text x="200" y="25" text-anchor="middle" font-size="16" fill="#666">These shapes are alike:</text>
      <!-- Group: all have exactly 1 shape inside -->
      <rect x="20" y="35" width="110" height="90" rx="8" fill="#E0F2F1" stroke="#009688" stroke-width="2"/>
      <circle cx="75" cy="80" r="35" fill="white" stroke="#333" stroke-width="2"/>
      <rect x="60" y="65" width="30" height="30" fill="#FF5722"/>
      <rect x="145" y="35" width="110" height="90" rx="8" fill="#E0F2F1" stroke="#009688" stroke-width="2"/>
      <rect x="170" y="52" width="60" height="55" fill="white" stroke="#333" stroke-width="2"/>
      <circle cx="200" cy="80" r="15" fill="#3F51B5"/>
      <rect x="270" y="35" width="110" height="90" rx="8" fill="#E0F2F1" stroke="#009688" stroke-width="2"/>
      <polygon points="325,46 290,112 360,112" fill="white" stroke="#333" stroke-width="2"/>
      <polygon points="325,70 315,95 335,95" fill="#E91E63"/>
      <text x="200" y="150" text-anchor="middle" font-size="14" fill="#888">Which one belongs?</text>
      <line x1="20" y1="138" x2="380" y2="138" stroke="#E0E0E0" stroke-width="1" stroke-dasharray="4,4"/>
    </svg>`,
    options: [
      { id: 'a', label: 'Empty diamond', visual: oDiamond(24, 'white') },
      { id: 'b', label: 'Pentagon with 1 circle inside', visual: oPentagon(18, 'white', '<circle cx="35" cy="27" r="6" fill="#009688"/>') },
      { id: 'c', label: 'Hexagon with 3 dots inside', visual: oHexagon(18, 'white', '<circle cx="28" cy="22" r="3" fill="#333"/><circle cx="42" cy="22" r="3" fill="#333"/><circle cx="35" cy="32" r="3" fill="#333"/>') },
      { id: 'd', label: 'Circle with 2 squares inside', visual: oCircle(16, 'white', '<rect x="27" y="20" width="6" height="6" fill="#333"/><rect x="37" y="20" width="6" height="6" fill="#333"/>') },
    ],
    correctAnswerId: 'b',
    explanation: 'Each shape has exactly 1 shape inside it. Only the pentagon with 1 circle inside matches this rule!',
    hint: 'Count how many shapes are inside each big shape.',
  },
  {
    id: 'fc-m-010',
    category: 'figure-classification',
    difficulty: 'medium',
    prompt: 'Find the common trait and pick the matching shape.',
    visual: `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="400" height="200" rx="16" fill="#FAFAFA"/>
      <text x="200" y="25" text-anchor="middle" font-size="16" fill="#666">These shapes are alike:</text>
      <!-- Group: all shapes have a cross/plus sign inside -->
      <rect x="20" y="35" width="110" height="90" rx="8" fill="#FFF8E1" stroke="#FFC107" stroke-width="2"/>
      <circle cx="75" cy="80" r="32" fill="#FFECB3" stroke="#333" stroke-width="2"/>
      <line x1="55" y1="80" x2="95" y2="80" stroke="#333" stroke-width="2.5"/>
      <line x1="75" y1="60" x2="75" y2="100" stroke="#333" stroke-width="2.5"/>
      <rect x="145" y="35" width="110" height="90" rx="8" fill="#FFF8E1" stroke="#FFC107" stroke-width="2"/>
      <rect x="170" y="52" width="60" height="55" fill="#FFECB3" stroke="#333" stroke-width="2"/>
      <line x1="180" y1="80" x2="220" y2="80" stroke="#333" stroke-width="2.5"/>
      <line x1="200" y1="60" x2="200" y2="100" stroke="#333" stroke-width="2.5"/>
      <rect x="270" y="35" width="110" height="90" rx="8" fill="#FFF8E1" stroke="#FFC107" stroke-width="2"/>
      <polygon points="325,46 290,112 360,112" fill="#FFECB3" stroke="#333" stroke-width="2"/>
      <line x1="310" y1="85" x2="340" y2="85" stroke="#333" stroke-width="2.5"/>
      <line x1="325" y1="65" x2="325" y2="105" stroke="#333" stroke-width="2.5"/>
      <text x="200" y="150" text-anchor="middle" font-size="14" fill="#888">Which one belongs?</text>
      <line x1="20" y1="138" x2="380" y2="138" stroke="#E0E0E0" stroke-width="1" stroke-dasharray="4,4"/>
    </svg>`,
    options: [
      { id: 'a', label: 'Diamond with cross', visual: oDiamond(26, '#FFECB3', '<line x1="28" y1="25" x2="42" y2="25" stroke="#333" stroke-width="2"/><line x1="35" y1="18" x2="35" y2="32" stroke="#333" stroke-width="2"/>') },
      { id: 'b', label: 'Circle with single dot', visual: oCircle(14, '#FFECB3', '<circle cx="35" cy="25" r="3" fill="#333"/>') },
      { id: 'c', label: 'Square with diagonal line', visual: oSquare(22, '#FFECB3', '<line x1="24" y1="14" x2="46" y2="36" stroke="#333" stroke-width="2"/>') },
      { id: 'd', label: 'Pentagon with stripes', visual: oPentagon(16, '#FFECB3', '<line x1="28" y1="22" x2="42" y2="22" stroke="#333" stroke-width="1.5"/><line x1="26" y1="28" x2="44" y2="28" stroke="#333" stroke-width="1.5"/><line x1="28" y1="34" x2="42" y2="34" stroke="#333" stroke-width="1.5"/>') },
    ],
    correctAnswerId: 'a',
    explanation: 'All three shapes have a cross (plus sign) inside them. The diamond with a cross also has this feature!',
    hint: 'Look at the lines inside each shape. What pattern do they form?',
  },
  {
    id: 'fc-m-011',
    category: 'figure-classification',
    difficulty: 'medium',
    prompt: 'What rule makes these three a group? Find another that fits.',
    visual: `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="400" height="200" rx="16" fill="#FAFAFA"/>
      <text x="200" y="25" text-anchor="middle" font-size="16" fill="#666">These shapes are alike:</text>
      <!-- Group: all shapes point to the right -->
      <rect x="20" y="35" width="110" height="90" rx="8" fill="#E8EAF6" stroke="#3F51B5" stroke-width="2"/>
      <polygon points="50,80 90,55 90,105" fill="#3F51B5" stroke="#333" stroke-width="2" transform="rotate(180,75,80)"/>
      <rect x="145" y="35" width="110" height="90" rx="8" fill="#E8EAF6" stroke="#3F51B5" stroke-width="2"/>
      <polygon points="170,60 230,80 170,100" fill="#3F51B5" stroke="#333" stroke-width="2"/>
      <rect x="270" y="35" width="110" height="90" rx="8" fill="#E8EAF6" stroke="#3F51B5" stroke-width="2"/>
      <polygon points="295,60 355,80 315,60 355,80 315,100 295,100" fill="#3F51B5" stroke="#333" stroke-width="2"/>
      <text x="200" y="150" text-anchor="middle" font-size="14" fill="#888">Which one belongs?</text>
      <line x1="20" y1="138" x2="380" y2="138" stroke="#E0E0E0" stroke-width="1" stroke-dasharray="4,4"/>
    </svg>`,
    options: [
      { id: 'a', label: 'Arrow pointing left', visual: opt('<polygon points="50,25 20,25 30,15 20,25 30,35" fill="none" stroke="#3F51B5" stroke-width="2.5" stroke-linejoin="round"/>') },
      { id: 'b', label: 'Arrow pointing up', visual: opt('<polygon points="35,10 35,40 25,30 35,10 45,30 35,40" fill="none" stroke="#3F51B5" stroke-width="2.5" stroke-linejoin="round"/>') },
      { id: 'c', label: 'Arrow pointing right', visual: opt('<polygon points="15,25 55,25 45,15 55,25 45,35" fill="none" stroke="#3F51B5" stroke-width="2.5" stroke-linejoin="round"/>') },
      { id: 'd', label: 'Arrow pointing down', visual: opt('<polygon points="35,40 35,10 25,20 35,40 45,20 35,10" fill="none" stroke="#3F51B5" stroke-width="2.5" stroke-linejoin="round"/>') },
    ],
    correctAnswerId: 'c',
    explanation: 'All three shapes point to the RIGHT. Only the arrow pointing right matches this direction!',
    hint: 'Which direction does the pointy end of each shape face?',
  },
  {
    id: 'fc-m-012',
    category: 'figure-classification',
    difficulty: 'medium',
    prompt: 'These three shapes belong together. Which should join them?',
    visual: `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="400" height="200" rx="16" fill="#FAFAFA"/>
      <text x="200" y="25" text-anchor="middle" font-size="16" fill="#666">These shapes are alike:</text>
      <!-- Group: all have a thick border AND are yellow -->
      <rect x="20" y="35" width="110" height="90" rx="8" fill="#FFFDE7" stroke="#F9A825" stroke-width="2"/>
      <circle cx="75" cy="80" r="28" fill="#FFC107" stroke="#333" stroke-width="5"/>
      <rect x="145" y="35" width="110" height="90" rx="8" fill="#FFFDE7" stroke="#F9A825" stroke-width="2"/>
      <rect x="175" y="55" width="50" height="50" fill="#FFC107" stroke="#333" stroke-width="5"/>
      <rect x="270" y="35" width="110" height="90" rx="8" fill="#FFFDE7" stroke="#F9A825" stroke-width="2"/>
      <polygon points="325,48 298,108 352,108" fill="#FFC107" stroke="#333" stroke-width="5"/>
      <text x="200" y="150" text-anchor="middle" font-size="14" fill="#888">Which one belongs?</text>
      <line x1="20" y1="138" x2="380" y2="138" stroke="#E0E0E0" stroke-width="1" stroke-dasharray="4,4"/>
    </svg>`,
    options: [
      { id: 'a', label: 'Yellow diamond, thin border', visual: oDiamond(24, '#FFC107') },
      { id: 'b', label: 'Blue pentagon, thick border', visual: oPentagon(16, '#2196F3').replace('stroke-width="1.5"', 'stroke-width="4"') },
      { id: 'c', label: 'Yellow hexagon, thick border', visual: oHexagon(15, '#FFC107').replace('stroke-width="1.5"', 'stroke-width="4"') },
      { id: 'd', label: 'Red circle, thick border', visual: oCircle(12, '#F44336').replace('stroke-width="1.5"', 'stroke-width="4"') },
    ],
    correctAnswerId: 'c',
    explanation: 'All three shapes are YELLOW with a THICK border. The yellow hexagon with thick border matches both attributes!',
    hint: 'Look at two things: the color of the fill AND the thickness of the border.',
  },
  // ===== HARD (continued) =====
  {
    id: 'fc-h-006',
    category: 'figure-classification',
    difficulty: 'hard',
    prompt: 'The common rule is tricky! Look at everything carefully.',
    visual: `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="400" height="200" rx="16" fill="#FAFAFA"/>
      <text x="200" y="25" text-anchor="middle" font-size="16" fill="#666">These shapes are alike:</text>
      <!-- Group: all have an EVEN number of sides (square=4, hexagon=6, octagon=8) -->
      <rect x="20" y="35" width="110" height="90" rx="8" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2"/>
      <rect x="45" y="50" width="60" height="60" fill="#A5D6A7" stroke="#333" stroke-width="2"/>
      <rect x="145" y="35" width="110" height="90" rx="8" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2"/>
      <polygon points="200,48 228,62 228,98 200,112 172,98 172,62" fill="#A5D6A7" stroke="#333" stroke-width="2"/>
      <rect x="270" y="35" width="110" height="90" rx="8" fill="#E8F5E9" stroke="#4CAF50" stroke-width="2"/>
      <polygon points="325,46 348,56 358,78 348,100 325,110 302,100 292,78 302,56" fill="#A5D6A7" stroke="#333" stroke-width="2"/>
      <text x="200" y="150" text-anchor="middle" font-size="14" fill="#888">Which one belongs?</text>
      <line x1="20" y1="138" x2="380" y2="138" stroke="#E0E0E0" stroke-width="1" stroke-dasharray="4,4"/>
    </svg>`,
    options: [
      { id: 'a', label: 'Triangle (3 sides)', visual: oTriangle(28, '#A5D6A7') },
      { id: 'b', label: 'Pentagon (5 sides)', visual: oPentagon(16, '#A5D6A7') },
      { id: 'c', label: 'Decagon (10 sides)', visual: opt((() => { const pts = [0,1,2,3,4,5,6,7,8,9].map(i => { const a = (i * 36 - 90) * Math.PI / 180; return `${35 + 16 * Math.cos(a)},${25 + 16 * Math.sin(a)}`; }).join(' '); return `<polygon points="${pts}" fill="#A5D6A7" stroke="#333" stroke-width="1.5"/>`; })()) },
      { id: 'd', label: 'Heptagon (7 sides)', visual: opt((() => { const pts = [0,1,2,3,4,5,6].map(i => { const a = (i * 360 / 7 - 90) * Math.PI / 180; return `${35 + 16 * Math.cos(a)},${25 + 16 * Math.sin(a)}`; }).join(' '); return `<polygon points="${pts}" fill="#A5D6A7" stroke="#333" stroke-width="1.5"/>`; })()) },
    ],
    correctAnswerId: 'c',
    explanation: 'Square=4, hexagon=6, octagon=8. All have an EVEN number of sides. Decagon (10 sides) is also even!',
    hint: 'Count the sides: 4, 6, 8. What pattern do you notice with these numbers?',
  },
  {
    id: 'fc-h-007',
    category: 'figure-classification',
    difficulty: 'hard',
    prompt: 'Find the abstract rule that connects these shapes.',
    visual: `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="400" height="200" rx="16" fill="#FAFAFA"/>
      <text x="200" y="25" text-anchor="middle" font-size="16" fill="#666">These shapes are alike:</text>
      <!-- Group: all have both curved AND straight edges (semicircle, arch shape, D-shape) -->
      <rect x="20" y="35" width="110" height="90" rx="8" fill="#FCE4EC" stroke="#E91E63" stroke-width="2"/>
      <path d="M 45 105 L 45 70 A 30 30 0 0 1 105 70 L 105 105 Z" fill="#F48FB1" stroke="#333" stroke-width="2"/>
      <rect x="145" y="35" width="110" height="90" rx="8" fill="#FCE4EC" stroke="#E91E63" stroke-width="2"/>
      <path d="M 175 55 L 225 55 A 30 30 0 0 1 225 105 L 175 105 Z" fill="#F48FB1" stroke="#333" stroke-width="2"/>
      <rect x="270" y="35" width="110" height="90" rx="8" fill="#FCE4EC" stroke="#E91E63" stroke-width="2"/>
      <path d="M 300 80 L 325 50 L 350 80 A 25 25 0 0 1 300 80 Z" fill="#F48FB1" stroke="#333" stroke-width="2"/>
      <text x="200" y="150" text-anchor="middle" font-size="14" fill="#888">Which one belongs?</text>
      <line x1="20" y1="138" x2="380" y2="138" stroke="#E0E0E0" stroke-width="1" stroke-dasharray="4,4"/>
    </svg>`,
    options: [
      { id: 'a', label: 'Full circle (only curves)', visual: oCircle(16, '#F48FB1') },
      { id: 'b', label: 'Square (only straight)', visual: oSquare(22, '#F48FB1') },
      { id: 'c', label: 'Quarter-pie shape', visual: opt('<path d="M 20 35 L 20 15 A 20 20 0 0 1 40 35 Z" fill="#F48FB1" stroke="#333" stroke-width="1.5"/>') },
      { id: 'd', label: 'Triangle (only straight)', visual: oTriangle(28, '#F48FB1') },
    ],
    correctAnswerId: 'c',
    explanation: 'Each shape has BOTH curved edges and straight edges. The quarter-pie has two straight edges and one curved edge!',
    hint: 'Look at the edges. Are they all straight? All curved? Or a mix?',
  },
  {
    id: 'fc-h-008',
    category: 'figure-classification',
    difficulty: 'hard',
    prompt: 'This classification has two rules at once!',
    visual: `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="400" height="200" rx="16" fill="#FAFAFA"/>
      <text x="200" y="25" text-anchor="middle" font-size="16" fill="#666">These shapes are alike:</text>
      <!-- Group: all have rotational symmetry (look the same when rotated) AND are filled with gradient-like two-tone -->
      <rect x="20" y="35" width="110" height="90" rx="8" fill="#EDE7F6" stroke="#5E35B1" stroke-width="2"/>
      <rect x="45" y="50" width="60" height="60" fill="#B39DDB" stroke="#333" stroke-width="2"/>
      <rect x="45" y="50" width="30" height="30" fill="#7E57C2"/>
      <rect x="75" y="80" width="30" height="30" fill="#7E57C2"/>
      <rect x="145" y="35" width="110" height="90" rx="8" fill="#EDE7F6" stroke="#5E35B1" stroke-width="2"/>
      <polygon points="200,48 228,62 228,98 200,112 172,98 172,62" fill="#B39DDB" stroke="#333" stroke-width="2"/>
      <polygon points="200,48 228,62 200,80" fill="#7E57C2"/>
      <polygon points="200,112 172,98 200,80" fill="#7E57C2"/>
      <rect x="270" y="35" width="110" height="90" rx="8" fill="#EDE7F6" stroke="#5E35B1" stroke-width="2"/>
      <circle cx="325" cy="80" r="30" fill="#B39DDB" stroke="#333" stroke-width="2"/>
      <path d="M 325 50 A 30 30 0 0 1 355 80 L 325 80 Z" fill="#7E57C2"/>
      <path d="M 325 110 A 30 30 0 0 1 295 80 L 325 80 Z" fill="#7E57C2"/>
      <text x="200" y="150" text-anchor="middle" font-size="14" fill="#888">Which one belongs?</text>
      <line x1="20" y1="138" x2="380" y2="138" stroke="#E0E0E0" stroke-width="1" stroke-dasharray="4,4"/>
    </svg>`,
    options: [
      { id: 'a', label: 'Two-tone diamond with rotation symmetry', visual: opt('<polygon points="35,8 52,25 35,42 18,25" fill="#B39DDB" stroke="#333" stroke-width="1.5"/><polygon points="35,8 52,25 35,25" fill="#7E57C2"/><polygon points="35,42 18,25 35,25" fill="#7E57C2"/>') },
      { id: 'b', label: 'Half-colored triangle (no rotational symmetry)', visual: oTriangle(28, '#B39DDB', 'up', '<polygon points="35,14 28,30 35,30" fill="#7E57C2"/>') },
      { id: 'c', label: 'Solid purple square', visual: oSquare(22, '#7E57C2') },
      { id: 'd', label: 'Two-tone rectangle (mirror only)', visual: opt('<rect x="17" y="13" width="36" height="24" fill="#B39DDB" stroke="#333" stroke-width="1.5"/><rect x="17" y="13" width="18" height="24" fill="#7E57C2"/>') },
    ],
    correctAnswerId: 'a',
    explanation: 'All shapes have 180-degree rotational symmetry with alternating two-tone coloring. The two-tone diamond has the same property!',
    hint: 'Imagine spinning each shape halfway around. Does the color pattern look the same?',
  },
  {
    id: 'fc-h-009',
    category: 'figure-classification',
    difficulty: 'hard',
    prompt: 'Study the shapes very carefully. What makes them special?',
    visual: `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="400" height="200" rx="16" fill="#FAFAFA"/>
      <text x="200" y="25" text-anchor="middle" font-size="16" fill="#666">These shapes are alike:</text>
      <!-- Group: each shape is nested (shape within shape within shape, 3 levels) -->
      <rect x="20" y="35" width="110" height="90" rx="8" fill="#E0F7FA" stroke="#00ACC1" stroke-width="2"/>
      <circle cx="75" cy="80" r="35" fill="#B2EBF2" stroke="#333" stroke-width="2"/>
      <circle cx="75" cy="80" r="22" fill="#4DD0E1" stroke="#333" stroke-width="1.5"/>
      <circle cx="75" cy="80" r="10" fill="#00ACC1" stroke="#333" stroke-width="1"/>
      <rect x="145" y="35" width="110" height="90" rx="8" fill="#E0F7FA" stroke="#00ACC1" stroke-width="2"/>
      <rect x="165" y="48" width="70" height="62" fill="#B2EBF2" stroke="#333" stroke-width="2"/>
      <rect x="180" y="58" width="40" height="42" fill="#4DD0E1" stroke="#333" stroke-width="1.5"/>
      <rect x="190" y="68" width="20" height="22" fill="#00ACC1" stroke="#333" stroke-width="1"/>
      <rect x="270" y="35" width="110" height="90" rx="8" fill="#E0F7FA" stroke="#00ACC1" stroke-width="2"/>
      <polygon points="325,42 285,115 365,115" fill="#B2EBF2" stroke="#333" stroke-width="2"/>
      <polygon points="325,60 300,108 350,108" fill="#4DD0E1" stroke="#333" stroke-width="1.5"/>
      <polygon points="325,78 315,102 335,102" fill="#00ACC1" stroke="#333" stroke-width="1"/>
      <text x="200" y="150" text-anchor="middle" font-size="14" fill="#888">Which one belongs?</text>
      <line x1="20" y1="138" x2="380" y2="138" stroke="#E0E0E0" stroke-width="1" stroke-dasharray="4,4"/>
    </svg>`,
    options: [
      { id: 'a', label: 'Single diamond', visual: oDiamond(24, '#B2EBF2') },
      { id: 'b', label: 'Two nested pentagons', visual: oPentagon(18, '#B2EBF2', '<polygon points="35,16 27,27 30,35 40,35 43,27" fill="#4DD0E1" stroke="#333" stroke-width="1"/>') },
      { id: 'c', label: 'Three nested diamonds', visual: opt('<polygon points="35,5 55,25 35,45 15,25" fill="#B2EBF2" stroke="#333" stroke-width="1.5"/><polygon points="35,12 48,25 35,38 22,25" fill="#4DD0E1" stroke="#333" stroke-width="1"/><polygon points="35,18 41,25 35,32 29,25" fill="#00ACC1" stroke="#333" stroke-width="0.8"/>') },
      { id: 'd', label: 'Shape with dots inside', visual: oCircle(16, '#B2EBF2', '<circle cx="30" cy="22" r="3" fill="#333"/><circle cx="40" cy="22" r="3" fill="#333"/><circle cx="35" cy="30" r="3" fill="#333"/>') },
    ],
    correctAnswerId: 'c',
    explanation: 'All shapes have 3 nested levels (a shape within a shape within a shape). Only the three nested diamonds match this pattern!',
    hint: 'Count how many layers deep each shape goes.',
  },
  {
    id: 'fc-h-010',
    category: 'figure-classification',
    difficulty: 'hard',
    prompt: 'This is a real brain teaser! What do these shapes share?',
    visual: `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="400" height="200" rx="16" fill="#FAFAFA"/>
      <text x="200" y="25" text-anchor="middle" font-size="16" fill="#666">These shapes are alike:</text>
      <!-- Group: number of inner shapes increases by 1 (1, 2, 3) - progressive pattern -->
      <rect x="20" y="35" width="110" height="90" rx="8" fill="#FBE9E7" stroke="#FF5722" stroke-width="2"/>
      <rect x="40" y="48" width="70" height="65" fill="white" stroke="#333" stroke-width="2"/>
      <circle cx="75" cy="80" r="8" fill="#FF5722"/>
      <rect x="145" y="35" width="110" height="90" rx="8" fill="#FBE9E7" stroke="#FF5722" stroke-width="2"/>
      <rect x="165" y="48" width="70" height="65" fill="white" stroke="#333" stroke-width="2"/>
      <circle cx="190" cy="72" r="8" fill="#FF5722"/>
      <circle cx="210" cy="88" r="8" fill="#FF5722"/>
      <rect x="270" y="35" width="110" height="90" rx="8" fill="#FBE9E7" stroke="#FF5722" stroke-width="2"/>
      <rect x="290" y="48" width="70" height="65" fill="white" stroke="#333" stroke-width="2"/>
      <circle cx="310" cy="68" r="8" fill="#FF5722"/>
      <circle cx="335" cy="68" r="8" fill="#FF5722"/>
      <circle cx="322" cy="90" r="8" fill="#FF5722"/>
      <text x="200" y="150" text-anchor="middle" font-size="14" fill="#888">Which one belongs?</text>
      <line x1="20" y1="138" x2="380" y2="138" stroke="#E0E0E0" stroke-width="1" stroke-dasharray="4,4"/>
    </svg>`,
    options: [
      { id: 'a', label: 'Box with 4 dots (continues the sequence)', visual: opt('<rect x="12" y="8" width="46" height="34" fill="white" stroke="#333" stroke-width="1.5"/><circle cx="24" cy="18" r="4" fill="#FF5722"/><circle cx="46" cy="18" r="4" fill="#FF5722"/><circle cx="24" cy="32" r="4" fill="#FF5722"/><circle cx="46" cy="32" r="4" fill="#FF5722"/>') },
      { id: 'b', label: 'Box with 5 dots', visual: opt('<rect x="12" y="8" width="46" height="34" fill="white" stroke="#333" stroke-width="1.5"/><circle cx="22" cy="16" r="3.5" fill="#FF5722"/><circle cx="48" cy="16" r="3.5" fill="#FF5722"/><circle cx="22" cy="34" r="3.5" fill="#FF5722"/><circle cx="48" cy="34" r="3.5" fill="#FF5722"/><circle cx="35" cy="25" r="3.5" fill="#FF5722"/>') },
      { id: 'c', label: 'Box with 1 dot', visual: opt('<rect x="12" y="8" width="46" height="34" fill="white" stroke="#333" stroke-width="1.5"/><circle cx="35" cy="25" r="4" fill="#FF5722"/>') },
      { id: 'd', label: 'Empty box', visual: opt('<rect x="12" y="8" width="46" height="34" fill="white" stroke="#333" stroke-width="1.5"/>') },
    ],
    correctAnswerId: 'a',
    explanation: 'The boxes contain 1, 2, then 3 dots - a progressive counting pattern. The next one should have 4 dots!',
    hint: 'Count the dots in each box from left to right. What is the pattern?',
  },
  {
    id: 'fc-h-011',
    category: 'figure-classification',
    difficulty: 'hard',
    prompt: 'The common rule is tricky! Look at everything carefully.',
    visual: `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="400" height="200" rx="16" fill="#FAFAFA"/>
      <text x="200" y="25" text-anchor="middle" font-size="16" fill="#666">These shapes are alike:</text>
      <!-- Group: all shapes have a smaller DIFFERENT colored shape overlapping on the border -->
      <rect x="20" y="35" width="110" height="90" rx="8" fill="#FFF3E0" stroke="#FF9800" stroke-width="2"/>
      <circle cx="75" cy="80" r="30" fill="#42A5F5" stroke="#333" stroke-width="2"/>
      <rect x="90" y="68" width="18" height="18" fill="#FF9800" stroke="#333" stroke-width="1.5"/>
      <rect x="145" y="35" width="110" height="90" rx="8" fill="#FFF3E0" stroke="#FF9800" stroke-width="2"/>
      <rect x="170" y="52" width="60" height="55" fill="#66BB6A" stroke="#333" stroke-width="2"/>
      <circle cx="230" cy="80" r="12" fill="#FF9800" stroke="#333" stroke-width="1.5"/>
      <rect x="270" y="35" width="110" height="90" rx="8" fill="#FFF3E0" stroke="#FF9800" stroke-width="2"/>
      <polygon points="325,46 290,112 360,112" fill="#EF5350" stroke="#333" stroke-width="2"/>
      <polygon points="355,100 345,115 365,115" fill="#FF9800" stroke="#333" stroke-width="1.5"/>
      <text x="200" y="150" text-anchor="middle" font-size="14" fill="#888">Which one belongs?</text>
      <line x1="20" y1="138" x2="380" y2="138" stroke="#E0E0E0" stroke-width="1" stroke-dasharray="4,4"/>
    </svg>`,
    options: [
      { id: 'a', label: 'Pentagon with small circle on edge', visual: oPentagon(18, '#9C27B0', '<circle cx="50" cy="28" r="5" fill="#FF9800" stroke="#333" stroke-width="1"/>') },
      { id: 'b', label: 'Plain hexagon', visual: oHexagon(16, '#42A5F5') },
      { id: 'c', label: 'Diamond with same-color dot', visual: oDiamond(24, '#FF9800', '<circle cx="35" cy="25" r="5" fill="#FF9800"/>') },
      { id: 'd', label: 'Circle inside circle', visual: oCircle(16, '#42A5F5', '<circle cx="35" cy="25" r="8" fill="#66BB6A"/>') },
    ],
    correctAnswerId: 'a',
    explanation: 'All shapes have a small differently-colored shape sitting on their edge/border. The pentagon with a small circle on its edge follows this rule!',
    hint: 'Look at the edges of each main shape. What is sitting on the border?',
  },
  {
    id: 'fc-h-012',
    category: 'figure-classification',
    difficulty: 'hard',
    prompt: 'Find the abstract rule that connects these shapes.',
    visual: `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="400" height="200" rx="16" fill="#FAFAFA"/>
      <text x="200" y="25" text-anchor="middle" font-size="16" fill="#666">These shapes are alike:</text>
      <!-- Group: the inner shape has MORE sides than the outer shape (triangle outside, square inside; square outside, pentagon inside; pentagon outside, hexagon inside) -->
      <rect x="20" y="35" width="110" height="90" rx="8" fill="#E8EAF6" stroke="#3F51B5" stroke-width="2"/>
      <polygon points="75,42 40,115 110,115" fill="#C5CAE9" stroke="#333" stroke-width="2"/>
      <rect x="58" y="75" width="34" height="34" fill="#7986CB" stroke="#333" stroke-width="1.5"/>
      <rect x="145" y="35" width="110" height="90" rx="8" fill="#E8EAF6" stroke="#3F51B5" stroke-width="2"/>
      <rect x="170" y="48" width="60" height="62" fill="#C5CAE9" stroke="#333" stroke-width="2"/>
      <polygon points="200,58 182,70 188,92 212,92 218,70" fill="#7986CB" stroke="#333" stroke-width="1.5"/>
      <rect x="270" y="35" width="110" height="90" rx="8" fill="#E8EAF6" stroke="#3F51B5" stroke-width="2"/>
      <polygon points="325,44 298,60 298,100 325,116 352,100 352,60" fill="#C5CAE9" stroke="#333" stroke-width="2"/>
      <polygon points="325,58 310,66 306,84 316,98 334,98 344,84 340,66" fill="#7986CB" stroke="#333" stroke-width="1.5"/>
      <text x="200" y="150" text-anchor="middle" font-size="14" fill="#888">Which one belongs?</text>
      <line x1="20" y1="138" x2="380" y2="138" stroke="#E0E0E0" stroke-width="1" stroke-dasharray="4,4"/>
    </svg>`,
    options: [
      { id: 'a', label: 'Hexagon with heptagon inside', visual: oHexagon(18, '#C5CAE9', (() => { const pts = [0,1,2,3,4,5,6].map(i => { const a = (i * 360 / 7 - 90) * Math.PI / 180; return `${35 + 10 * Math.cos(a)},${25 + 10 * Math.sin(a)}`; }).join(' '); return `<polygon points="${pts}" fill="#7986CB" stroke="#333" stroke-width="1"/>`; })()) },
      { id: 'b', label: 'Pentagon with triangle inside', visual: oPentagon(18, '#C5CAE9', '<polygon points="35,20 29,32 41,32" fill="#7986CB" stroke="#333" stroke-width="1"/>') },
      { id: 'c', label: 'Hexagon with hexagon inside', visual: oHexagon(18, '#C5CAE9', '<polygon points="35,18 41,22 41,28 35,32 29,28 29,22" fill="#7986CB" stroke="#333" stroke-width="1"/>') },
      { id: 'd', label: 'Square with circle inside', visual: oSquare(28, '#C5CAE9', '<circle cx="35" cy="25" r="8" fill="#7986CB" stroke="#333" stroke-width="1"/>') },
    ],
    correctAnswerId: 'a',
    explanation: 'The inner shape always has exactly 1 more side than the outer shape: triangle(3) has square(4) inside, square(4) has pentagon(5) inside, pentagon(5) has hexagon(6) inside. Hexagon(6) with heptagon(7) inside continues this +1 pattern!',
    hint: 'Count the sides of the outer shape AND the inner shape. What is the relationship?',
  },
  {
    id: 'fc-h-013',
    category: 'figure-classification',
    difficulty: 'hard',
    prompt: 'This classification has a tricky hidden rule!',
    visual: `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="400" height="200" rx="16" fill="#FAFAFA"/>
      <text x="200" y="25" text-anchor="middle" font-size="16" fill="#666">These shapes are alike:</text>
      <!-- Group: all shapes have their color matching their number of sides (red=warm/3, blue=cool/4, green=5) - actually: all have diagonal lines going the same direction (top-left to bottom-right) -->
      <rect x="20" y="35" width="110" height="90" rx="8" fill="#EFEBE9" stroke="#795548" stroke-width="2"/>
      <circle cx="75" cy="80" r="32" fill="#FFCC80" stroke="#333" stroke-width="2"/>
      <line x1="50" y1="62" x2="90" y2="102" stroke="#333" stroke-width="2"/>
      <line x1="58" y1="55" x2="98" y2="95" stroke="#333" stroke-width="2"/>
      <line x1="60" y1="70" x2="92" y2="105" stroke="#333" stroke-width="2"/>
      <rect x="145" y="35" width="110" height="90" rx="8" fill="#EFEBE9" stroke="#795548" stroke-width="2"/>
      <rect x="172" y="52" width="56" height="56" fill="#A5D6A7" stroke="#333" stroke-width="2"/>
      <line x1="175" y1="58" x2="222" y2="105" stroke="#333" stroke-width="2"/>
      <line x1="185" y1="52" x2="228" y2="98" stroke="#333" stroke-width="2"/>
      <line x1="172" y1="70" x2="215" y2="108" stroke="#333" stroke-width="2"/>
      <rect x="270" y="35" width="110" height="90" rx="8" fill="#EFEBE9" stroke="#795548" stroke-width="2"/>
      <polygon points="325,46 290,112 360,112" fill="#90CAF9" stroke="#333" stroke-width="2"/>
      <line x1="310" y1="65" x2="345" y2="108" stroke="#333" stroke-width="2"/>
      <line x1="318" y1="58" x2="352" y2="100" stroke="#333" stroke-width="2"/>
      <line x1="305" y1="75" x2="338" y2="112" stroke="#333" stroke-width="2"/>
      <text x="200" y="150" text-anchor="middle" font-size="14" fill="#888">Which one belongs?</text>
      <line x1="20" y1="138" x2="380" y2="138" stroke="#E0E0E0" stroke-width="1" stroke-dasharray="4,4"/>
    </svg>`,
    options: [
      { id: 'a', label: 'Diamond with diagonal lines (top-left to bottom-right)', visual: oDiamond(26, '#CE93D8', '<line x1="28" y1="18" x2="42" y2="32" stroke="#333" stroke-width="1.5"/><line x1="24" y1="22" x2="38" y2="36" stroke="#333" stroke-width="1.5"/><line x1="32" y1="14" x2="46" y2="28" stroke="#333" stroke-width="1.5"/>') },
      { id: 'b', label: 'Pentagon with diagonal lines (bottom-left to top-right)', visual: oPentagon(16, '#CE93D8', '<line x1="28" y1="32" x2="42" y2="18" stroke="#333" stroke-width="1.5"/><line x1="24" y1="28" x2="38" y2="14" stroke="#333" stroke-width="1.5"/>') },
      { id: 'c', label: 'Hexagon with horizontal lines', visual: oHexagon(16, '#CE93D8', '<line x1="24" y1="22" x2="46" y2="22" stroke="#333" stroke-width="1.5"/><line x1="24" y1="28" x2="46" y2="28" stroke="#333" stroke-width="1.5"/>') },
      { id: 'd', label: 'Circle with vertical lines', visual: oCircle(16, '#CE93D8', '<line x1="30" y1="14" x2="30" y2="36" stroke="#333" stroke-width="1.5"/><line x1="40" y1="14" x2="40" y2="36" stroke="#333" stroke-width="1.5"/>') },
    ],
    correctAnswerId: 'a',
    explanation: 'All three shapes have diagonal lines going from top-left to bottom-right. Only the diamond has lines going the same direction!',
    hint: 'Look at the direction of the lines inside. Do they go the same way?',
  },
  {
    id: 'fc-h-014',
    category: 'figure-classification',
    difficulty: 'hard',
    prompt: 'Study the shapes very carefully. What makes them special?',
    visual: `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="400" height="200" rx="16" fill="#FAFAFA"/>
      <text x="200" y="25" text-anchor="middle" font-size="16" fill="#666">These shapes are alike:</text>
      <!-- Group: all have exactly 2 colors used, and the shape is divided into equal parts -->
      <rect x="20" y="35" width="110" height="90" rx="8" fill="#FFF3E0" stroke="#FF9800" stroke-width="2"/>
      <circle cx="75" cy="80" r="32" fill="#42A5F5" stroke="#333" stroke-width="2"/>
      <path d="M 75 48 A 32 32 0 0 0 75 112 Z" fill="#EF5350"/>
      <rect x="145" y="35" width="110" height="90" rx="8" fill="#FFF3E0" stroke="#FF9800" stroke-width="2"/>
      <rect x="170" y="50" width="60" height="60" fill="#42A5F5" stroke="#333" stroke-width="2"/>
      <rect x="170" y="80" width="60" height="30" fill="#EF5350"/>
      <rect x="170" y="50" width="60" height="60" fill="none" stroke="#333" stroke-width="2"/>
      <rect x="270" y="35" width="110" height="90" rx="8" fill="#FFF3E0" stroke="#FF9800" stroke-width="2"/>
      <polygon points="325,45 290,112 360,112" fill="#42A5F5" stroke="#333" stroke-width="2"/>
      <polygon points="325,78 290,112 360,112" fill="#EF5350"/>
      <polygon points="325,45 290,112 360,112" fill="none" stroke="#333" stroke-width="2"/>
      <text x="200" y="150" text-anchor="middle" font-size="14" fill="#888">Which one belongs?</text>
      <line x1="20" y1="138" x2="380" y2="138" stroke="#E0E0E0" stroke-width="1" stroke-dasharray="4,4"/>
    </svg>`,
    options: [
      { id: 'a', label: 'Three-color diamond', visual: opt('<polygon points="35,5 55,25 35,45 15,25" fill="#42A5F5" stroke="#333" stroke-width="1.5"/><polygon points="35,18 48,25 35,32" fill="#EF5350"/><polygon points="35,18 22,25 35,32" fill="#FFC107"/>') },
      { id: 'b', label: 'Two-color hexagon split in half', visual: opt('<polygon points="35,10 50,17 50,33 35,40 20,33 20,17" fill="#42A5F5" stroke="#333" stroke-width="1.5"/><polygon points="35,10 35,40 20,33 20,17" fill="#EF5350"/>') },
      { id: 'c', label: 'Solid one-color pentagon', visual: oPentagon(16, '#42A5F5') },
      { id: 'd', label: 'Four-color square', visual: opt('<rect x="18" y="8" width="34" height="34" fill="#42A5F5" stroke="#333" stroke-width="1.5"/><rect x="35" y="8" width="17" height="17" fill="#EF5350"/><rect x="18" y="25" width="17" height="17" fill="#FFC107"/><rect x="35" y="25" width="17" height="17" fill="#4CAF50"/>') },
    ],
    correctAnswerId: 'b',
    explanation: 'All shapes use exactly TWO colors and are split into two equal halves. Only the two-color hexagon matches both rules!',
    hint: 'Count how many colors are used in each shape and how the shape is divided.',
  },
  {
    id: 'fc-h-015',
    category: 'figure-classification',
    difficulty: 'hard',
    prompt: 'This is a real brain teaser! What do these shapes share?',
    visual: `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="400" height="200" rx="16" fill="#FAFAFA"/>
      <text x="200" y="25" text-anchor="middle" font-size="16" fill="#666">These shapes are alike:</text>
      <!-- Group: the border color matches the color of the inner shape (not the outer fill) -->
      <rect x="20" y="35" width="110" height="90" rx="8" fill="#E0F7FA" stroke="#00BCD4" stroke-width="2"/>
      <circle cx="75" cy="80" r="32" fill="#FFECB3" stroke="#F44336" stroke-width="3"/>
      <rect x="63" y="68" width="24" height="24" fill="#F44336"/>
      <rect x="145" y="35" width="110" height="90" rx="8" fill="#E0F7FA" stroke="#00BCD4" stroke-width="2"/>
      <rect x="172" y="52" width="56" height="56" fill="#C8E6C9" stroke="#2196F3" stroke-width="3"/>
      <circle cx="200" cy="80" r="14" fill="#2196F3"/>
      <rect x="270" y="35" width="110" height="90" rx="8" fill="#E0F7FA" stroke="#00BCD4" stroke-width="2"/>
      <polygon points="325,46 290,112 360,112" fill="#E1BEE7" stroke="#FF9800" stroke-width="3"/>
      <polygon points="325,72 315,92 335,92" fill="#FF9800"/>
      <text x="200" y="150" text-anchor="middle" font-size="14" fill="#888">Which one belongs?</text>
      <line x1="20" y1="138" x2="380" y2="138" stroke="#E0E0E0" stroke-width="1" stroke-dasharray="4,4"/>
    </svg>`,
    options: [
      { id: 'a', label: 'Diamond (green border, green circle inside)', visual: opt('<polygon points="35,5 55,25 35,45 15,25" fill="#FFCCBC" stroke="#4CAF50" stroke-width="2.5"/><circle cx="35" cy="25" r="6" fill="#4CAF50"/>') },
      { id: 'b', label: 'Pentagon (red border, blue dot inside)', visual: opt('<polygon points="35,10 49,20 44,36 26,36 21,20" fill="#FFCCBC" stroke="#F44336" stroke-width="2.5"/><circle cx="35" cy="27" r="5" fill="#2196F3"/>') },
      { id: 'c', label: 'Hexagon (blue fill, blue border)', visual: oHexagon(16, '#2196F3').replace('stroke="#333"', 'stroke="#2196F3"').replace('stroke-width="1.5"', 'stroke-width="2.5"') },
      { id: 'd', label: 'Circle (green border, no inner shape)', visual: oCircle(16, '#FFCCBC').replace('stroke="#333"', 'stroke="#4CAF50"').replace('stroke-width="1.5"', 'stroke-width="2.5"') },
    ],
    correctAnswerId: 'a',
    explanation: 'In each shape, the border color matches the color of the small shape inside it (red border = red inner, blue border = blue inner, orange border = orange inner). The diamond has a green border matching its green circle inside!',
    hint: 'Compare the border color of the big shape to the color of the shape inside it.',
  },
];
