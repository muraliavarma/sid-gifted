import type { Question } from '../types';

/**
 * Figure Matrices (CogAT Nonverbal Battery style)
 *
 * Format: A 2×2 grid of shapes. Three cells are filled; one is empty.
 * The child identifies the transformation from left to right in the top row,
 * then applies the same transformation to the bottom row.
 *
 * Transformations: color change, size change, rotation, addition/removal of elements
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
function oTriangle(s: number, fill: string, dir: 'up' | 'down' = 'up', extra = ''): string {
  if (dir === 'up') {
    return opt(`<polygon points="35,${25 - s * 0.45} ${35 - s / 2},${25 + s * 0.35} ${35 + s / 2},${25 + s * 0.35}" fill="${fill}" stroke="#333" stroke-width="1.5"/>${extra}`);
  }
  return opt(`<polygon points="35,${25 + s * 0.45} ${35 - s / 2},${25 - s * 0.35} ${35 + s / 2},${25 - s * 0.35}" fill="${fill}" stroke="#333" stroke-width="1.5"/>${extra}`);
}
function oArrow(dir: 'up' | 'down' | 'left' | 'right', color: string): string {
  const m: Record<string, string> = {
    up: `<polygon points="35,8 20,30 50,30" fill="${color}" stroke="#333" stroke-width="1.5"/>`,
    down: `<polygon points="35,42 20,20 50,20" fill="${color}" stroke="#333" stroke-width="1.5"/>`,
    left: `<polygon points="10,25 32,10 32,40" fill="${color}" stroke="#333" stroke-width="1.5"/>`,
    right: `<polygon points="60,25 38,10 38,40" fill="${color}" stroke="#333" stroke-width="1.5"/>`,
  };
  return opt(m[dir]);
}
function oEmoji(text: string, fs = 24): string {
  return opt(`<text x="35" y="${25 + fs * 0.35}" text-anchor="middle" font-size="${fs}">${text}</text>`);
}

export const figureMatrices: Question[] = [
  // ===== EASY =====
  {
    id: 'fm-e-001',
    category: 'figure-matrices',
    difficulty: 'easy',
    prompt: 'Look at how the top shapes change. What should go in the empty box?',
    visual: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="300" height="300" rx="16" fill="#FAFAFA"/>
      <!-- Top left: small blue circle -->
      <rect x="10" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <circle cx="75" cy="75" r="25" fill="#2196F3" stroke="#333" stroke-width="2"/>
      <!-- Top right: large blue circle -->
      <rect x="160" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <circle cx="225" cy="75" r="45" fill="#2196F3" stroke="#333" stroke-width="2"/>
      <!-- Bottom left: small red circle -->
      <rect x="10" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <circle cx="75" cy="225" r="25" fill="#F44336" stroke="#333" stroke-width="2"/>
      <!-- Bottom right: ? -->
      <rect x="160" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <text x="225" y="235" text-anchor="middle" font-size="48" fill="#E65100" font-weight="bold">?</text>
      <text x="150" y="80" text-anchor="middle" font-size="24" fill="#1976D2">→</text>
      <text x="150" y="230" text-anchor="middle" font-size="24" fill="#E65100">→</text>
    </svg>`,
    options: [
      { id: 'a', label: 'Large red circle', visual: oCircle(18, '#F44336') },
      { id: 'b', label: 'Small red circle', visual: oCircle(10, '#F44336') },
      { id: 'c', label: 'Large blue circle', visual: oCircle(18, '#2196F3') },
      { id: 'd', label: 'Small blue square', visual: oSquare(18, '#2196F3') },
    ],
    correctAnswerId: 'a',
    explanation: 'The top row shows a small blue circle becoming a large blue circle (size increases). So the small red circle should become a large red circle.',
    hint: 'What changed about the circle in the top row? Only the size!',
  },
  {
    id: 'fm-e-002',
    category: 'figure-matrices',
    difficulty: 'easy',
    prompt: 'How does the shape change from left to right? Apply the same change to the bottom.',
    visual: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="300" height="300" rx="16" fill="#FAFAFA"/>
      <!-- Top left: blue square -->
      <rect x="10" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <rect x="45" y="45" width="60" height="60" fill="#2196F3" stroke="#333" stroke-width="2"/>
      <!-- Top right: red square -->
      <rect x="160" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <rect x="195" y="45" width="60" height="60" fill="#F44336" stroke="#333" stroke-width="2"/>
      <!-- Bottom left: blue triangle -->
      <rect x="10" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <polygon points="75,190 45,260 105,260" fill="#2196F3" stroke="#333" stroke-width="2"/>
      <!-- Bottom right: ? -->
      <rect x="160" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <text x="225" y="235" text-anchor="middle" font-size="48" fill="#E65100" font-weight="bold">?</text>
      <text x="150" y="80" text-anchor="middle" font-size="24" fill="#1976D2">→</text>
      <text x="150" y="230" text-anchor="middle" font-size="24" fill="#E65100">→</text>
    </svg>`,
    options: [
      { id: 'a', label: 'Red triangle', visual: oTriangle(30, '#F44336') },
      { id: 'b', label: 'Blue triangle', visual: oTriangle(30, '#2196F3') },
      { id: 'c', label: 'Red square', visual: oSquare(24, '#F44336') },
      { id: 'd', label: 'Green triangle', visual: oTriangle(30, '#4CAF50') },
    ],
    correctAnswerId: 'a',
    explanation: 'The top row: blue square becomes red square (color changes to red, shape stays). So blue triangle becomes red triangle.',
    hint: 'What changed? The color! The shape stayed the same.',
  },
  {
    id: 'fm-e-003',
    category: 'figure-matrices',
    difficulty: 'easy',
    prompt: 'What pattern do you see? Complete the grid.',
    visual: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="300" height="300" rx="16" fill="#FAFAFA"/>
      <!-- Top left: 1 star -->
      <rect x="10" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <text x="75" y="85" text-anchor="middle" font-size="40">⭐</text>
      <!-- Top right: 2 stars -->
      <rect x="160" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <text x="225" y="85" text-anchor="middle" font-size="40">⭐⭐</text>
      <!-- Bottom left: 1 heart -->
      <rect x="10" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <text x="75" y="235" text-anchor="middle" font-size="40">❤️</text>
      <!-- Bottom right: ? -->
      <rect x="160" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <text x="225" y="235" text-anchor="middle" font-size="48" fill="#E65100" font-weight="bold">?</text>
      <text x="150" y="80" text-anchor="middle" font-size="24" fill="#1976D2">→</text>
      <text x="150" y="230" text-anchor="middle" font-size="24" fill="#E65100">→</text>
    </svg>`,
    options: [
      { id: 'a', label: '1 heart', visual: oEmoji('❤️') },
      { id: 'b', label: '2 hearts', visual: oEmoji('❤️❤️') },
      { id: 'c', label: '3 hearts', visual: oEmoji('❤️❤️❤️', 18) },
      { id: 'd', label: '2 stars', visual: oEmoji('⭐⭐') },
    ],
    correctAnswerId: 'b',
    explanation: 'Top row: 1 star becomes 2 stars (quantity doubles). So 1 heart becomes 2 hearts.',
    hint: 'Count how many there are in each box of the top row.',
  },
  {
    id: 'fm-e-004',
    category: 'figure-matrices',
    difficulty: 'easy',
    prompt: 'Find the pattern and complete the grid.',
    visual: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="300" height="300" rx="16" fill="#FAFAFA"/>
      <!-- Top left: filled circle -->
      <rect x="10" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <circle cx="75" cy="75" r="35" fill="#333" stroke="#333" stroke-width="2"/>
      <!-- Top right: empty circle (outline) -->
      <rect x="160" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <circle cx="225" cy="75" r="35" fill="white" stroke="#333" stroke-width="3"/>
      <!-- Bottom left: filled square -->
      <rect x="10" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <rect x="40" y="190" width="70" height="70" fill="#333" stroke="#333" stroke-width="2"/>
      <!-- Bottom right: ? -->
      <rect x="160" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <text x="225" y="235" text-anchor="middle" font-size="48" fill="#E65100" font-weight="bold">?</text>
      <text x="150" y="80" text-anchor="middle" font-size="24" fill="#1976D2">→</text>
      <text x="150" y="230" text-anchor="middle" font-size="24" fill="#E65100">→</text>
    </svg>`,
    options: [
      { id: 'a', label: 'Empty square (outline only)', visual: oSquare(24, 'white') },
      { id: 'b', label: 'Filled square', visual: oSquare(24, '#333') },
      { id: 'c', label: 'Empty circle', visual: oCircle(14, 'white') },
      { id: 'd', label: 'Filled circle', visual: oCircle(14, '#333') },
    ],
    correctAnswerId: 'a',
    explanation: 'Top row: filled circle becomes empty circle (fill removed). So filled square becomes empty square.',
    hint: 'The shape on the right is the same but something about the filling changed.',
  },
  {
    id: 'fm-e-005',
    category: 'figure-matrices',
    difficulty: 'easy',
    prompt: 'Look carefully at the shapes. What goes in the empty box?',
    visual: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="300" height="300" rx="16" fill="#FAFAFA"/>
      <!-- Top left: circle -->
      <rect x="10" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <circle cx="75" cy="75" r="35" fill="#4CAF50" stroke="#333" stroke-width="2"/>
      <!-- Top right: circle with dot inside -->
      <rect x="160" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <circle cx="225" cy="75" r="35" fill="#4CAF50" stroke="#333" stroke-width="2"/>
      <circle cx="225" cy="75" r="8" fill="#333"/>
      <!-- Bottom left: square -->
      <rect x="10" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <rect x="40" y="190" width="70" height="70" fill="#FF9800" stroke="#333" stroke-width="2"/>
      <!-- Bottom right: ? -->
      <rect x="160" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <text x="225" y="235" text-anchor="middle" font-size="48" fill="#E65100" font-weight="bold">?</text>
      <text x="150" y="80" text-anchor="middle" font-size="24" fill="#1976D2">→</text>
      <text x="150" y="230" text-anchor="middle" font-size="24" fill="#E65100">→</text>
    </svg>`,
    options: [
      { id: 'a', label: 'Square with dot inside', visual: oSquare(24, '#FF9800', '<circle cx="35" cy="25" r="3" fill="#333"/>') },
      { id: 'b', label: 'Empty square', visual: oSquare(24, '#FF9800') },
      { id: 'c', label: 'Circle with dot inside', visual: oCircle(14, '#4CAF50', '<circle cx="35" cy="25" r="3" fill="#333"/>') },
      { id: 'd', label: 'Square with line inside', visual: oSquare(24, '#FF9800', '<line x1="23" y1="25" x2="47" y2="25" stroke="#333" stroke-width="2"/>') },
    ],
    correctAnswerId: 'a',
    explanation: 'Top row: green circle gets a dot inside. So the orange square should also get a dot inside.',
    hint: 'What was added to the circle? The same thing should be added to the square.',
  },
  {
    id: 'fm-e-006',
    category: 'figure-matrices',
    difficulty: 'easy',
    prompt: 'What rule changes the shapes from left to right?',
    visual: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="300" height="300" rx="16" fill="#FAFAFA"/>
      <!-- Top left: upward triangle -->
      <rect x="10" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <polygon points="75,30 40,110 110,110" fill="#9C27B0" stroke="#333" stroke-width="2"/>
      <!-- Top right: downward triangle -->
      <rect x="160" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <polygon points="225,110 190,30 260,30" fill="#9C27B0" stroke="#333" stroke-width="2"/>
      <!-- Bottom left: upward arrow -->
      <rect x="10" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <text x="75" y="235" text-anchor="middle" font-size="50">⬆️</text>
      <!-- Bottom right: ? -->
      <rect x="160" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <text x="225" y="235" text-anchor="middle" font-size="48" fill="#E65100" font-weight="bold">?</text>
      <text x="150" y="80" text-anchor="middle" font-size="24" fill="#1976D2">→</text>
      <text x="150" y="230" text-anchor="middle" font-size="24" fill="#E65100">→</text>
    </svg>`,
    options: [
      { id: 'a', label: 'Downward arrow ⬇️', visual: oArrow('down', '#9C27B0') },
      { id: 'b', label: 'Upward arrow ⬆️', visual: oArrow('up', '#9C27B0') },
      { id: 'c', label: 'Left arrow ⬅️', visual: oArrow('left', '#9C27B0') },
      { id: 'd', label: 'Right arrow ➡️', visual: oArrow('right', '#9C27B0') },
    ],
    correctAnswerId: 'a',
    explanation: 'Top row: upward triangle flips to downward triangle (flipped upside down). So upward arrow becomes downward arrow.',
    hint: 'The shape is flipped upside down!',
  },
  // ===== MEDIUM =====
  {
    id: 'fm-m-001',
    category: 'figure-matrices',
    difficulty: 'medium',
    prompt: 'Two things change from left to right. Find both changes and apply them.',
    visual: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="300" height="300" rx="16" fill="#FAFAFA"/>
      <!-- Top left: small blue circle -->
      <rect x="10" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <circle cx="75" cy="75" r="20" fill="#2196F3" stroke="#333" stroke-width="2"/>
      <!-- Top right: large red circle -->
      <rect x="160" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <circle cx="225" cy="75" r="45" fill="#F44336" stroke="#333" stroke-width="2"/>
      <!-- Bottom left: small blue square -->
      <rect x="10" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <rect x="55" y="205" width="40" height="40" fill="#2196F3" stroke="#333" stroke-width="2"/>
      <!-- Bottom right: ? -->
      <rect x="160" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <text x="225" y="235" text-anchor="middle" font-size="48" fill="#E65100" font-weight="bold">?</text>
      <text x="150" y="80" text-anchor="middle" font-size="24" fill="#1976D2">→</text>
      <text x="150" y="230" text-anchor="middle" font-size="24" fill="#E65100">→</text>
    </svg>`,
    options: [
      { id: 'a', label: 'Large red square', visual: oSquare(28, '#F44336') },
      { id: 'b', label: 'Large blue square', visual: oSquare(28, '#2196F3') },
      { id: 'c', label: 'Small red square', visual: oSquare(16, '#F44336') },
      { id: 'd', label: 'Large red circle', visual: oCircle(16, '#F44336') },
    ],
    correctAnswerId: 'a',
    explanation: 'Top row: small blue circle → large red circle. TWO changes: size gets bigger AND color changes to red. So small blue square → large red square.',
    hint: 'Two things change: the color AND the size.',
  },
  {
    id: 'fm-m-002',
    category: 'figure-matrices',
    difficulty: 'medium',
    prompt: 'Find the rule and apply it to complete the grid.',
    visual: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="300" height="300" rx="16" fill="#FAFAFA"/>
      <!-- Top left: 1 big circle -->
      <rect x="10" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <circle cx="75" cy="75" r="40" fill="#4CAF50" stroke="#333" stroke-width="2"/>
      <!-- Top right: 2 small circles -->
      <rect x="160" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <circle cx="205" cy="75" r="22" fill="#4CAF50" stroke="#333" stroke-width="2"/>
      <circle cx="248" cy="75" r="22" fill="#4CAF50" stroke="#333" stroke-width="2"/>
      <!-- Bottom left: 1 big square -->
      <rect x="10" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <rect x="30" y="185" width="80" height="80" fill="#FF9800" stroke="#333" stroke-width="2"/>
      <!-- Bottom right: ? -->
      <rect x="160" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <text x="225" y="235" text-anchor="middle" font-size="48" fill="#E65100" font-weight="bold">?</text>
      <text x="150" y="80" text-anchor="middle" font-size="24" fill="#1976D2">→</text>
      <text x="150" y="230" text-anchor="middle" font-size="24" fill="#E65100">→</text>
    </svg>`,
    options: [
      { id: 'a', label: '2 small squares', visual: opt('<rect x="14" y="17" width="16" height="16" fill="#FF9800" stroke="#333" stroke-width="1.5"/><rect x="40" y="17" width="16" height="16" fill="#FF9800" stroke="#333" stroke-width="1.5"/>') },
      { id: 'b', label: '1 large square', visual: oSquare(28, '#FF9800') },
      { id: 'c', label: '2 large squares', visual: opt('<rect x="6" y="10" width="24" height="24" fill="#FF9800" stroke="#333" stroke-width="1.5"/><rect x="40" y="10" width="24" height="24" fill="#FF9800" stroke="#333" stroke-width="1.5"/>') },
      { id: 'd', label: '1 small square', visual: oSquare(16, '#FF9800') },
    ],
    correctAnswerId: 'a',
    explanation: 'Top row: 1 big circle becomes 2 small circles (splits into two, size shrinks). So 1 big square becomes 2 small squares.',
  },
  {
    id: 'fm-m-003',
    category: 'figure-matrices',
    difficulty: 'medium',
    prompt: 'What happens to the shapes? Apply the same rule.',
    visual: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="300" height="300" rx="16" fill="#FAFAFA"/>
      <!-- Top left: circle with horizontal line -->
      <rect x="10" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <circle cx="75" cy="75" r="35" fill="#E1BEE7" stroke="#333" stroke-width="2"/>
      <line x1="40" y1="75" x2="110" y2="75" stroke="#333" stroke-width="3"/>
      <!-- Top right: circle with vertical line -->
      <rect x="160" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <circle cx="225" cy="75" r="35" fill="#E1BEE7" stroke="#333" stroke-width="2"/>
      <line x1="225" y1="40" x2="225" y2="110" stroke="#333" stroke-width="3"/>
      <!-- Bottom left: square with horizontal line -->
      <rect x="10" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <rect x="35" y="190" width="80" height="80" fill="#C8E6C9" stroke="#333" stroke-width="2"/>
      <line x1="35" y1="230" x2="115" y2="230" stroke="#333" stroke-width="3"/>
      <!-- Bottom right: ? -->
      <rect x="160" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <text x="225" y="235" text-anchor="middle" font-size="48" fill="#E65100" font-weight="bold">?</text>
      <text x="150" y="80" text-anchor="middle" font-size="24" fill="#1976D2">→</text>
      <text x="150" y="230" text-anchor="middle" font-size="24" fill="#E65100">→</text>
    </svg>`,
    options: [
      { id: 'a', label: 'Square with vertical line', visual: oSquare(26, '#C8E6C9', '<line x1="35" y1="12" x2="35" y2="38" stroke="#333" stroke-width="2"/>') },
      { id: 'b', label: 'Square with horizontal line', visual: oSquare(26, '#C8E6C9', '<line x1="22" y1="25" x2="48" y2="25" stroke="#333" stroke-width="2"/>') },
      { id: 'c', label: 'Circle with vertical line', visual: oCircle(15, '#E1BEE7', '<line x1="35" y1="10" x2="35" y2="40" stroke="#333" stroke-width="2"/>') },
      { id: 'd', label: 'Square with diagonal line', visual: oSquare(26, '#C8E6C9', '<line x1="22" y1="12" x2="48" y2="38" stroke="#333" stroke-width="2"/>') },
    ],
    correctAnswerId: 'a',
    explanation: 'Top row: the line inside the circle rotates from horizontal to vertical. So the line inside the square should also rotate from horizontal to vertical.',
    hint: 'Look at the line inside the shape. How does it change direction?',
  },
  {
    id: 'fm-m-004',
    category: 'figure-matrices',
    difficulty: 'medium',
    prompt: 'Discover the transformation and complete the matrix.',
    visual: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="300" height="300" rx="16" fill="#FAFAFA"/>
      <!-- Top left: 3 dots in a row -->
      <rect x="10" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <circle cx="45" cy="75" r="12" fill="#E91E63"/>
      <circle cx="75" cy="75" r="12" fill="#E91E63"/>
      <circle cx="105" cy="75" r="12" fill="#E91E63"/>
      <!-- Top right: 4 dots in a row -->
      <rect x="160" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <circle cx="185" cy="75" r="12" fill="#E91E63"/>
      <circle cx="210" cy="75" r="12" fill="#E91E63"/>
      <circle cx="235" cy="75" r="12" fill="#E91E63"/>
      <circle cx="260" cy="75" r="12" fill="#E91E63"/>
      <!-- Bottom left: 2 squares in a row -->
      <rect x="10" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <rect x="35" y="210" width="25" height="25" fill="#3F51B5" stroke="#333" stroke-width="1"/>
      <rect x="75" y="210" width="25" height="25" fill="#3F51B5" stroke="#333" stroke-width="1"/>
      <!-- Bottom right: ? -->
      <rect x="160" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <text x="225" y="235" text-anchor="middle" font-size="48" fill="#E65100" font-weight="bold">?</text>
      <text x="150" y="80" text-anchor="middle" font-size="24" fill="#1976D2">→</text>
      <text x="150" y="230" text-anchor="middle" font-size="24" fill="#E65100">→</text>
    </svg>`,
    options: [
      { id: 'a', label: '3 squares', visual: opt('<rect x="7" y="17" width="14" height="14" fill="#3F51B5" stroke="#333" stroke-width="1"/><rect x="28" y="17" width="14" height="14" fill="#3F51B5" stroke="#333" stroke-width="1"/><rect x="49" y="17" width="14" height="14" fill="#3F51B5" stroke="#333" stroke-width="1"/>') },
      { id: 'b', label: '2 squares', visual: opt('<rect x="14" y="17" width="16" height="16" fill="#3F51B5" stroke="#333" stroke-width="1"/><rect x="40" y="17" width="16" height="16" fill="#3F51B5" stroke="#333" stroke-width="1"/>') },
      { id: 'c', label: '4 squares', visual: opt('<rect x="3" y="17" width="12" height="12" fill="#3F51B5" stroke="#333" stroke-width="1"/><rect x="20" y="17" width="12" height="12" fill="#3F51B5" stroke="#333" stroke-width="1"/><rect x="37" y="17" width="12" height="12" fill="#3F51B5" stroke="#333" stroke-width="1"/><rect x="54" y="17" width="12" height="12" fill="#3F51B5" stroke="#333" stroke-width="1"/>') },
      { id: 'd', label: '1 square', visual: oSquare(16, '#3F51B5') },
    ],
    correctAnswerId: 'a',
    explanation: 'Top row: 3 dots become 4 dots (add 1). So 2 squares become 3 squares (add 1).',
  },
  {
    id: 'fm-m-005',
    category: 'figure-matrices',
    difficulty: 'medium',
    prompt: 'What changes and what stays the same?',
    visual: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="300" height="300" rx="16" fill="#FAFAFA"/>
      <!-- Top left: circle half shaded -->
      <rect x="10" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <circle cx="75" cy="75" r="35" fill="white" stroke="#333" stroke-width="2"/>
      <path d="M 75 40 A 35 35 0 0 1 75 110 Z" fill="#333"/>
      <!-- Top right: circle fully shaded -->
      <rect x="160" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <circle cx="225" cy="75" r="35" fill="#333" stroke="#333" stroke-width="2"/>
      <!-- Bottom left: triangle half shaded -->
      <rect x="10" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <polygon points="75,180 40,270 110,270" fill="white" stroke="#333" stroke-width="2"/>
      <polygon points="75,180 75,270 110,270" fill="#333"/>
      <!-- Bottom right: ? -->
      <rect x="160" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <text x="225" y="235" text-anchor="middle" font-size="48" fill="#E65100" font-weight="bold">?</text>
      <text x="150" y="80" text-anchor="middle" font-size="24" fill="#1976D2">→</text>
      <text x="150" y="230" text-anchor="middle" font-size="24" fill="#E65100">→</text>
    </svg>`,
    options: [
      { id: 'a', label: 'Fully shaded triangle', visual: oTriangle(32, '#333') },
      { id: 'b', label: 'Half shaded triangle', visual: opt('<polygon points="35,7 18,40 52,40" fill="white" stroke="#333" stroke-width="1.5"/><polygon points="35,7 35,40 52,40" fill="#333"/>') },
      { id: 'c', label: 'Fully shaded circle', visual: oCircle(15, '#333') },
      { id: 'd', label: 'Empty triangle', visual: oTriangle(32, 'white') },
    ],
    correctAnswerId: 'a',
    explanation: 'Top row: half-shaded circle becomes fully-shaded circle (shading completes). So half-shaded triangle becomes fully-shaded triangle.',
  },
  {
    id: 'fm-m-006',
    category: 'figure-matrices',
    difficulty: 'medium',
    prompt: 'Look at shapes AND patterns inside them.',
    visual: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="300" height="300" rx="16" fill="#FAFAFA"/>
      <!-- Top left: blue circle with 1 stripe -->
      <rect x="10" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <circle cx="75" cy="75" r="35" fill="#BBDEFB" stroke="#333" stroke-width="2"/>
      <line x1="75" y1="40" x2="75" y2="110" stroke="#333" stroke-width="2"/>
      <!-- Top right: blue circle with 2 stripes -->
      <rect x="160" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <circle cx="225" cy="75" r="35" fill="#BBDEFB" stroke="#333" stroke-width="2"/>
      <line x1="215" y1="40" x2="215" y2="110" stroke="#333" stroke-width="2"/>
      <line x1="235" y1="40" x2="235" y2="110" stroke="#333" stroke-width="2"/>
      <!-- Bottom left: green square with 2 stripes -->
      <rect x="10" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <rect x="35" y="190" width="80" height="80" fill="#C8E6C9" stroke="#333" stroke-width="2"/>
      <line x1="62" y1="190" x2="62" y2="270" stroke="#333" stroke-width="2"/>
      <line x1="88" y1="190" x2="88" y2="270" stroke="#333" stroke-width="2"/>
      <!-- Bottom right: ? -->
      <rect x="160" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <text x="225" y="235" text-anchor="middle" font-size="48" fill="#E65100" font-weight="bold">?</text>
      <text x="150" y="80" text-anchor="middle" font-size="24" fill="#1976D2">→</text>
      <text x="150" y="230" text-anchor="middle" font-size="24" fill="#E65100">→</text>
    </svg>`,
    options: [
      { id: 'a', label: 'Green square with 3 stripes', visual: oSquare(26, '#C8E6C9', '<line x1="27" y1="12" x2="27" y2="38" stroke="#333" stroke-width="1.5"/><line x1="35" y1="12" x2="35" y2="38" stroke="#333" stroke-width="1.5"/><line x1="43" y1="12" x2="43" y2="38" stroke="#333" stroke-width="1.5"/>') },
      { id: 'b', label: 'Green square with 1 stripe', visual: oSquare(26, '#C8E6C9', '<line x1="35" y1="12" x2="35" y2="38" stroke="#333" stroke-width="1.5"/>') },
      { id: 'c', label: 'Blue circle with 3 stripes', visual: oCircle(15, '#BBDEFB', '<line x1="27" y1="12" x2="27" y2="38" stroke="#333" stroke-width="1.5"/><line x1="35" y1="12" x2="35" y2="38" stroke="#333" stroke-width="1.5"/><line x1="43" y1="12" x2="43" y2="38" stroke="#333" stroke-width="1.5"/>') },
      { id: 'd', label: 'Green square with 2 stripes', visual: oSquare(26, '#C8E6C9', '<line x1="31" y1="12" x2="31" y2="38" stroke="#333" stroke-width="1.5"/><line x1="39" y1="12" x2="39" y2="38" stroke="#333" stroke-width="1.5"/>') },
    ],
    correctAnswerId: 'a',
    explanation: 'Top row: circle goes from 1 stripe to 2 stripes (add 1 stripe). So square goes from 2 stripes to 3 stripes (add 1 stripe).',
  },
  // ===== HARD =====
  {
    id: 'fm-h-001',
    category: 'figure-matrices',
    difficulty: 'hard',
    prompt: 'Multiple things change at once! Find all the changes.',
    visual: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="300" height="300" rx="16" fill="#FAFAFA"/>
      <!-- Top left: small black circle -->
      <rect x="10" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <circle cx="75" cy="75" r="20" fill="#333" stroke="#333" stroke-width="2"/>
      <!-- Top right: large white circle with dot -->
      <rect x="160" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <circle cx="225" cy="75" r="42" fill="white" stroke="#333" stroke-width="2"/>
      <circle cx="225" cy="75" r="6" fill="#333"/>
      <!-- Bottom left: small black triangle -->
      <rect x="10" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <polygon points="75,205 55,250 95,250" fill="#333" stroke="#333" stroke-width="2"/>
      <!-- Bottom right: ? -->
      <rect x="160" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <text x="225" y="235" text-anchor="middle" font-size="48" fill="#E65100" font-weight="bold">?</text>
      <text x="150" y="80" text-anchor="middle" font-size="24" fill="#1976D2">→</text>
      <text x="150" y="230" text-anchor="middle" font-size="24" fill="#E65100">→</text>
    </svg>`,
    options: [
      { id: 'a', label: 'Large white triangle with dot', visual: oTriangle(36, 'white', 'up', '<circle cx="35" cy="28" r="3" fill="#333"/>') },
      { id: 'b', label: 'Large black triangle', visual: oTriangle(36, '#333') },
      { id: 'c', label: 'Small white triangle with dot', visual: oTriangle(22, 'white', 'up', '<circle cx="35" cy="26" r="2.5" fill="#333"/>') },
      { id: 'd', label: 'Large white triangle', visual: oTriangle(36, 'white') },
    ],
    correctAnswerId: 'a',
    explanation: 'THREE changes: size grows, fill changes to white, and a dot is added inside. Small black triangle → large white triangle with dot.',
    hint: 'Look at every detail: size, color fill, and anything added inside.',
  },
  {
    id: 'fm-h-002',
    category: 'figure-matrices',
    difficulty: 'hard',
    prompt: 'This matrix has a tricky rule. Can you figure it out?',
    visual: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="300" height="300" rx="16" fill="#FAFAFA"/>
      <!-- Top left: red circle inside blue square -->
      <rect x="10" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <rect x="35" y="35" width="80" height="80" fill="#2196F3" stroke="#333" stroke-width="2"/>
      <circle cx="75" cy="75" r="25" fill="#F44336" stroke="#333" stroke-width="2"/>
      <!-- Top right: blue square inside red circle -->
      <rect x="160" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <circle cx="225" cy="75" r="40" fill="#F44336" stroke="#333" stroke-width="2"/>
      <rect x="200" y="50" width="50" height="50" fill="#2196F3" stroke="#333" stroke-width="2"/>
      <!-- Bottom left: yellow triangle inside green circle -->
      <rect x="10" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <circle cx="75" cy="225" r="40" fill="#4CAF50" stroke="#333" stroke-width="2"/>
      <polygon points="75,195 50,250 100,250" fill="#FFC107" stroke="#333" stroke-width="2"/>
      <!-- Bottom right: ? -->
      <rect x="160" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <text x="225" y="235" text-anchor="middle" font-size="48" fill="#E65100" font-weight="bold">?</text>
      <text x="150" y="80" text-anchor="middle" font-size="24" fill="#1976D2">→</text>
      <text x="150" y="230" text-anchor="middle" font-size="24" fill="#E65100">→</text>
    </svg>`,
    options: [
      { id: 'a', label: 'Green circle inside yellow triangle', visual: opt('<polygon points="35,5 10,42 60,42" fill="#FFC107" stroke="#333" stroke-width="1.5"/><circle cx="35" cy="30" r="11" fill="#4CAF50" stroke="#333" stroke-width="1.5"/>') },
      { id: 'b', label: 'Yellow triangle inside green circle', visual: opt('<circle cx="35" cy="25" r="18" fill="#4CAF50" stroke="#333" stroke-width="1.5"/><polygon points="35,12 24,35 46,35" fill="#FFC107" stroke="#333" stroke-width="1"/>') },
      { id: 'c', label: 'Green triangle inside yellow circle', visual: opt('<circle cx="35" cy="25" r="18" fill="#FFC107" stroke="#333" stroke-width="1.5"/><polygon points="35,12 24,35 46,35" fill="#4CAF50" stroke="#333" stroke-width="1"/>') },
      { id: 'd', label: 'Yellow circle inside green triangle', visual: opt('<polygon points="35,5 10,42 60,42" fill="#4CAF50" stroke="#333" stroke-width="1.5"/><circle cx="35" cy="30" r="11" fill="#FFC107" stroke="#333" stroke-width="1.5"/>') },
    ],
    correctAnswerId: 'a',
    explanation: 'The rule is: the inside and outside shapes swap! Circle inside square → square inside circle. Triangle inside circle → circle inside triangle.',
    hint: 'Which shape is inside and which is outside? What happens to them?',
  },
  {
    id: 'fm-h-003',
    category: 'figure-matrices',
    difficulty: 'hard',
    prompt: 'Watch how shapes rotate and change. What goes in the empty box?',
    visual: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="300" height="300" rx="16" fill="#FAFAFA"/>
      <!-- Top left: arrow pointing right -->
      <rect x="10" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <polygon points="50,55 100,75 50,95" fill="#673AB7" stroke="#333" stroke-width="2"/>
      <!-- Top right: arrow pointing down -->
      <rect x="160" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <polygon points="205,50 225,100 245,50" fill="#673AB7" stroke="#333" stroke-width="2"/>
      <!-- Bottom left: arrow pointing up -->
      <rect x="10" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <polygon points="55,260 75,210 95,260" fill="#009688" stroke="#333" stroke-width="2"/>
      <!-- Bottom right: ? -->
      <rect x="160" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <text x="225" y="235" text-anchor="middle" font-size="48" fill="#E65100" font-weight="bold">?</text>
      <text x="150" y="80" text-anchor="middle" font-size="24" fill="#1976D2">→</text>
      <text x="150" y="230" text-anchor="middle" font-size="24" fill="#E65100">→</text>
    </svg>`,
    options: [
      { id: 'a', label: 'Arrow pointing left', visual: oArrow('left', '#009688') },
      { id: 'b', label: 'Arrow pointing right', visual: oArrow('right', '#673AB7') },
      { id: 'c', label: 'Arrow pointing up', visual: oArrow('up', '#009688') },
      { id: 'd', label: 'Arrow pointing down', visual: oArrow('down', '#673AB7') },
    ],
    correctAnswerId: 'a',
    explanation: 'The arrow rotates 90 degrees clockwise: right → down. So up → left (also 90 degrees clockwise).',
    hint: 'Which way does the arrow turn? Clockwise like a clock!',
  },
  {
    id: 'fm-h-004',
    category: 'figure-matrices',
    difficulty: 'hard',
    prompt: 'Look at the patterns in both rows AND columns.',
    visual: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="300" height="300" rx="16" fill="#FAFAFA"/>
      <!-- Top left: 2 circles, 1 colored -->
      <rect x="10" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <circle cx="55" cy="75" r="20" fill="#FF5722" stroke="#333" stroke-width="2"/>
      <circle cx="95" cy="75" r="20" fill="white" stroke="#333" stroke-width="2"/>
      <!-- Top right: 2 circles, 2 colored -->
      <rect x="160" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <circle cx="205" cy="75" r="20" fill="#FF5722" stroke="#333" stroke-width="2"/>
      <circle cx="245" cy="75" r="20" fill="#FF5722" stroke="#333" stroke-width="2"/>
      <!-- Bottom left: 3 circles, 1 colored -->
      <rect x="10" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <circle cx="40" cy="225" r="18" fill="#3F51B5" stroke="#333" stroke-width="2"/>
      <circle cx="75" cy="225" r="18" fill="white" stroke="#333" stroke-width="2"/>
      <circle cx="110" cy="225" r="18" fill="white" stroke="#333" stroke-width="2"/>
      <!-- Bottom right: ? -->
      <rect x="160" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <text x="225" y="235" text-anchor="middle" font-size="48" fill="#E65100" font-weight="bold">?</text>
      <text x="150" y="80" text-anchor="middle" font-size="24" fill="#1976D2">→</text>
      <text x="150" y="230" text-anchor="middle" font-size="24" fill="#E65100">→</text>
    </svg>`,
    options: [
      { id: 'a', label: '3 circles, all colored', visual: opt('<circle cx="15" cy="25" r="10" fill="#3F51B5" stroke="#333" stroke-width="1.5"/><circle cx="35" cy="25" r="10" fill="#3F51B5" stroke="#333" stroke-width="1.5"/><circle cx="55" cy="25" r="10" fill="#3F51B5" stroke="#333" stroke-width="1.5"/>') },
      { id: 'b', label: '3 circles, 2 colored', visual: opt('<circle cx="15" cy="25" r="10" fill="#3F51B5" stroke="#333" stroke-width="1.5"/><circle cx="35" cy="25" r="10" fill="#3F51B5" stroke="#333" stroke-width="1.5"/><circle cx="55" cy="25" r="10" fill="white" stroke="#333" stroke-width="1.5"/>') },
      { id: 'c', label: '2 circles, all colored', visual: opt('<circle cx="22" cy="25" r="11" fill="#FF5722" stroke="#333" stroke-width="1.5"/><circle cx="48" cy="25" r="11" fill="#FF5722" stroke="#333" stroke-width="1.5"/>') },
      { id: 'd', label: '3 circles, 1 colored', visual: opt('<circle cx="15" cy="25" r="10" fill="#3F51B5" stroke="#333" stroke-width="1.5"/><circle cx="35" cy="25" r="10" fill="white" stroke="#333" stroke-width="1.5"/><circle cx="55" cy="25" r="10" fill="white" stroke="#333" stroke-width="1.5"/>') },
    ],
    correctAnswerId: 'b',
    explanation: 'Top row: 1 of 2 colored → 2 of 2 colored (+1 filled). Bottom: 1 of 3 colored → 2 of 3 colored (+1 filled).',
  },
  {
    id: 'fm-h-005',
    category: 'figure-matrices',
    difficulty: 'hard',
    prompt: 'A complex transformation! Find ALL the changes.',
    visual: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="300" height="300" rx="16" fill="#FAFAFA"/>
      <!-- Top left: small red square with cross -->
      <rect x="10" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <rect x="50" y="50" width="50" height="50" fill="#F44336" stroke="#333" stroke-width="2"/>
      <line x1="50" y1="50" x2="100" y2="100" stroke="white" stroke-width="2"/>
      <line x1="100" y1="50" x2="50" y2="100" stroke="white" stroke-width="2"/>
      <!-- Top right: large blue circle with cross -->
      <rect x="160" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <circle cx="225" cy="75" r="40" fill="#2196F3" stroke="#333" stroke-width="2"/>
      <line x1="197" y1="47" x2="253" y2="103" stroke="white" stroke-width="2"/>
      <line x1="253" y1="47" x2="197" y2="103" stroke="white" stroke-width="2"/>
      <!-- Bottom left: small blue triangle with cross -->
      <rect x="10" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <polygon points="75,190 45,260 105,260" fill="#2196F3" stroke="#333" stroke-width="2"/>
      <line x1="60" y1="205" x2="90" y2="255" stroke="white" stroke-width="2"/>
      <line x1="90" y1="205" x2="60" y2="255" stroke="white" stroke-width="2"/>
      <!-- Bottom right: ? -->
      <rect x="160" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <text x="225" y="235" text-anchor="middle" font-size="48" fill="#E65100" font-weight="bold">?</text>
      <text x="150" y="80" text-anchor="middle" font-size="24" fill="#1976D2">→</text>
      <text x="150" y="230" text-anchor="middle" font-size="24" fill="#E65100">→</text>
    </svg>`,
    options: [
      { id: 'a', label: 'Large red square with cross', visual: oSquare(28, '#F44336', '<line x1="21" y1="11" x2="49" y2="39" stroke="white" stroke-width="2"/><line x1="49" y1="11" x2="21" y2="39" stroke="white" stroke-width="2"/>') },
      { id: 'b', label: 'Large red circle with cross', visual: oCircle(16, '#F44336', '<line x1="23" y1="13" x2="47" y2="37" stroke="white" stroke-width="2"/><line x1="47" y1="13" x2="23" y2="37" stroke="white" stroke-width="2"/>') },
      { id: 'c', label: 'Large blue square with cross', visual: oSquare(28, '#2196F3', '<line x1="21" y1="11" x2="49" y2="39" stroke="white" stroke-width="2"/><line x1="49" y1="11" x2="21" y2="39" stroke="white" stroke-width="2"/>') },
      { id: 'd', label: 'Large green triangle with cross', visual: oTriangle(34, '#4CAF50', 'up', '<line x1="26" y1="18" x2="44" y2="36" stroke="white" stroke-width="2"/><line x1="44" y1="18" x2="26" y2="36" stroke="white" stroke-width="2"/>') },
    ],
    correctAnswerId: 'a',
    explanation: 'The rule: shape changes to square→circle→triangle→square (cycles), color swaps red↔blue, size grows, cross stays. So blue triangle → red square (large, with cross).',
    hint: 'Track each change separately: shape type, color, and size.',
  },
  // ===== NEW EASY (fm-e-007 to fm-e-010) =====
  {
    id: 'fm-e-007',
    category: 'figure-matrices',
    difficulty: 'easy',
    prompt: 'How does the shape change? Apply the same change below.',
    visual: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="300" height="300" rx="16" fill="#FAFAFA"/>
      <!-- Top left: large green square -->
      <rect x="10" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <rect x="30" y="30" width="80" height="80" fill="#4CAF50" stroke="#333" stroke-width="2"/>
      <!-- Top right: small green square -->
      <rect x="160" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <rect x="200" y="50" width="40" height="40" fill="#4CAF50" stroke="#333" stroke-width="2"/>
      <!-- Bottom left: large orange triangle -->
      <rect x="10" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <polygon points="75,175 30,275 120,275" fill="#FF9800" stroke="#333" stroke-width="2"/>
      <!-- Bottom right: ? -->
      <rect x="160" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <text x="225" y="235" text-anchor="middle" font-size="48" fill="#E65100" font-weight="bold">?</text>
      <text x="150" y="80" text-anchor="middle" font-size="24" fill="#1976D2">→</text>
      <text x="150" y="230" text-anchor="middle" font-size="24" fill="#E65100">→</text>
    </svg>`,
    options: [
      { id: 'a', label: 'Small orange triangle', visual: oTriangle(20, '#FF9800') },
      { id: 'b', label: 'Large orange triangle', visual: oTriangle(34, '#FF9800') },
      { id: 'c', label: 'Small green triangle', visual: oTriangle(20, '#4CAF50') },
      { id: 'd', label: 'Small orange square', visual: oSquare(16, '#FF9800') },
    ],
    correctAnswerId: 'a',
    explanation: 'The top row shows a large green square becoming a small green square (size decreases). So the large orange triangle should become a small orange triangle.',
    hint: 'Did the shape get bigger or smaller?',
  },
  {
    id: 'fm-e-008',
    category: 'figure-matrices',
    difficulty: 'easy',
    prompt: 'What changes from left to right? Complete the bottom row.',
    visual: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="300" height="300" rx="16" fill="#FAFAFA"/>
      <!-- Top left: red circle -->
      <rect x="10" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <circle cx="75" cy="75" r="35" fill="#F44336" stroke="#333" stroke-width="2"/>
      <!-- Top right: green circle -->
      <rect x="160" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <circle cx="225" cy="75" r="35" fill="#4CAF50" stroke="#333" stroke-width="2"/>
      <!-- Bottom left: red square -->
      <rect x="10" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <rect x="40" y="190" width="70" height="70" fill="#F44336" stroke="#333" stroke-width="2"/>
      <!-- Bottom right: ? -->
      <rect x="160" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <text x="225" y="235" text-anchor="middle" font-size="48" fill="#E65100" font-weight="bold">?</text>
      <text x="150" y="80" text-anchor="middle" font-size="24" fill="#1976D2">→</text>
      <text x="150" y="230" text-anchor="middle" font-size="24" fill="#E65100">→</text>
    </svg>`,
    options: [
      { id: 'a', label: 'Green square', visual: oSquare(24, '#4CAF50') },
      { id: 'b', label: 'Red square', visual: oSquare(24, '#F44336') },
      { id: 'c', label: 'Green circle', visual: oCircle(14, '#4CAF50') },
      { id: 'd', label: 'Blue square', visual: oSquare(24, '#2196F3') },
    ],
    correctAnswerId: 'a',
    explanation: 'The top row: red circle becomes green circle (color changes from red to green). So the red square becomes a green square.',
    hint: 'Only the color changes. The shape stays the same!',
  },
  {
    id: 'fm-e-009',
    category: 'figure-matrices',
    difficulty: 'easy',
    prompt: 'Look at the shapes carefully. What belongs in the empty box?',
    visual: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="300" height="300" rx="16" fill="#FAFAFA"/>
      <!-- Top left: circle -->
      <rect x="10" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <circle cx="75" cy="75" r="35" fill="#9C27B0" stroke="#333" stroke-width="2"/>
      <!-- Top right: circle (same, no change) -->
      <rect x="160" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <circle cx="225" cy="75" r="35" fill="#9C27B0" stroke="#333" stroke-width="2"/>
      <circle cx="225" cy="45" r="8" fill="#FFC107" stroke="#333" stroke-width="1"/>
      <!-- Bottom left: square -->
      <rect x="10" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <rect x="40" y="190" width="70" height="70" fill="#9C27B0" stroke="#333" stroke-width="2"/>
      <!-- Bottom right: ? -->
      <rect x="160" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <text x="225" y="235" text-anchor="middle" font-size="48" fill="#E65100" font-weight="bold">?</text>
      <text x="150" y="80" text-anchor="middle" font-size="24" fill="#1976D2">→</text>
      <text x="150" y="230" text-anchor="middle" font-size="24" fill="#E65100">→</text>
    </svg>`,
    options: [
      { id: 'a', label: 'Square with small circle on top', visual: oSquare(24, '#9C27B0', '<circle cx="35" cy="10" r="4" fill="#FFC107" stroke="#333" stroke-width="1"/>') },
      { id: 'b', label: 'Plain square', visual: oSquare(24, '#9C27B0') },
      { id: 'c', label: 'Circle with small circle on top', visual: oCircle(14, '#9C27B0', '<circle cx="35" cy="8" r="4" fill="#FFC107" stroke="#333" stroke-width="1"/>') },
      { id: 'd', label: 'Square with small square on top', visual: oSquare(24, '#9C27B0', '<rect x="31" y="6" width="8" height="8" fill="#FFC107" stroke="#333" stroke-width="1"/>') },
    ],
    correctAnswerId: 'a',
    explanation: 'The top row: a small yellow circle is added on top of the purple circle. So a small yellow circle should be added on top of the purple square.',
    hint: 'Something new appears on the shape in the top row. Add the same thing!',
  },
  {
    id: 'fm-e-010',
    category: 'figure-matrices',
    difficulty: 'easy',
    prompt: 'Find the pattern. What goes in the empty box?',
    visual: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="300" height="300" rx="16" fill="#FAFAFA"/>
      <!-- Top left: 3 stars -->
      <rect x="10" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <text x="75" y="85" text-anchor="middle" font-size="28">⭐⭐⭐</text>
      <!-- Top right: 2 stars -->
      <rect x="160" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <text x="225" y="85" text-anchor="middle" font-size="32">⭐⭐</text>
      <!-- Bottom left: 3 moons -->
      <rect x="10" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <text x="75" y="235" text-anchor="middle" font-size="28">🌙🌙🌙</text>
      <!-- Bottom right: ? -->
      <rect x="160" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <text x="225" y="235" text-anchor="middle" font-size="48" fill="#E65100" font-weight="bold">?</text>
      <text x="150" y="80" text-anchor="middle" font-size="24" fill="#1976D2">→</text>
      <text x="150" y="230" text-anchor="middle" font-size="24" fill="#E65100">→</text>
    </svg>`,
    options: [
      { id: 'a', label: '2 moons', visual: oEmoji('🌙🌙') },
      { id: 'b', label: '3 moons', visual: oEmoji('🌙🌙🌙', 18) },
      { id: 'c', label: '1 moon', visual: oEmoji('🌙') },
      { id: 'd', label: '2 stars', visual: oEmoji('⭐⭐') },
    ],
    correctAnswerId: 'a',
    explanation: 'Top row: 3 stars become 2 stars (one is removed). So 3 moons become 2 moons.',
    hint: 'Count how many there are. One is taken away!',
  },
  // ===== NEW MEDIUM (fm-m-007 to fm-m-012) =====
  {
    id: 'fm-m-007',
    category: 'figure-matrices',
    difficulty: 'medium',
    prompt: 'Two things change at once. Find both and apply them.',
    visual: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="300" height="300" rx="16" fill="#FAFAFA"/>
      <!-- Top left: small green triangle pointing up -->
      <rect x="10" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <polygon points="75,35 45,110 105,110" fill="#4CAF50" stroke="#333" stroke-width="2"/>
      <!-- Top right: large red triangle pointing up -->
      <rect x="160" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <polygon points="225,20 180,120 270,120" fill="#F44336" stroke="#333" stroke-width="2"/>
      <!-- Bottom left: small green circle -->
      <rect x="10" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <circle cx="75" cy="225" r="22" fill="#4CAF50" stroke="#333" stroke-width="2"/>
      <!-- Bottom right: ? -->
      <rect x="160" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <text x="225" y="235" text-anchor="middle" font-size="48" fill="#E65100" font-weight="bold">?</text>
      <text x="150" y="80" text-anchor="middle" font-size="24" fill="#1976D2">→</text>
      <text x="150" y="230" text-anchor="middle" font-size="24" fill="#E65100">→</text>
    </svg>`,
    options: [
      { id: 'a', label: 'Large red circle', visual: oCircle(18, '#F44336') },
      { id: 'b', label: 'Large green circle', visual: oCircle(18, '#4CAF50') },
      { id: 'c', label: 'Small red circle', visual: oCircle(10, '#F44336') },
      { id: 'd', label: 'Large red triangle', visual: oTriangle(34, '#F44336') },
    ],
    correctAnswerId: 'a',
    explanation: 'Top row: small green triangle becomes large red triangle (size increases AND color changes to red). So small green circle becomes large red circle.',
    hint: 'Both the size AND the color change!',
  },
  {
    id: 'fm-m-008',
    category: 'figure-matrices',
    difficulty: 'medium',
    prompt: 'What happens to the pattern inside the shape?',
    visual: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="300" height="300" rx="16" fill="#FAFAFA"/>
      <!-- Top left: circle with horizontal stripes -->
      <rect x="10" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <circle cx="75" cy="75" r="35" fill="#FFCDD2" stroke="#333" stroke-width="2"/>
      <line x1="42" y1="65" x2="108" y2="65" stroke="#333" stroke-width="2"/>
      <line x1="42" y1="85" x2="108" y2="85" stroke="#333" stroke-width="2"/>
      <!-- Top right: circle with vertical stripes -->
      <rect x="160" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <circle cx="225" cy="75" r="35" fill="#FFCDD2" stroke="#333" stroke-width="2"/>
      <line x1="215" y1="42" x2="215" y2="108" stroke="#333" stroke-width="2"/>
      <line x1="235" y1="42" x2="235" y2="108" stroke="#333" stroke-width="2"/>
      <!-- Bottom left: square with horizontal stripes -->
      <rect x="10" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <rect x="35" y="190" width="80" height="80" fill="#B3E5FC" stroke="#333" stroke-width="2"/>
      <line x1="35" y1="215" x2="115" y2="215" stroke="#333" stroke-width="2"/>
      <line x1="35" y1="245" x2="115" y2="245" stroke="#333" stroke-width="2"/>
      <!-- Bottom right: ? -->
      <rect x="160" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <text x="225" y="235" text-anchor="middle" font-size="48" fill="#E65100" font-weight="bold">?</text>
      <text x="150" y="80" text-anchor="middle" font-size="24" fill="#1976D2">→</text>
      <text x="150" y="230" text-anchor="middle" font-size="24" fill="#E65100">→</text>
    </svg>`,
    options: [
      { id: 'a', label: 'Square with vertical stripes', visual: oSquare(26, '#B3E5FC', '<line x1="30" y1="12" x2="30" y2="38" stroke="#333" stroke-width="1.5"/><line x1="40" y1="12" x2="40" y2="38" stroke="#333" stroke-width="1.5"/>') },
      { id: 'b', label: 'Square with horizontal stripes', visual: oSquare(26, '#B3E5FC', '<line x1="22" y1="20" x2="48" y2="20" stroke="#333" stroke-width="1.5"/><line x1="22" y1="30" x2="48" y2="30" stroke="#333" stroke-width="1.5"/>') },
      { id: 'c', label: 'Circle with vertical stripes', visual: oCircle(15, '#FFCDD2', '<line x1="31" y1="12" x2="31" y2="38" stroke="#333" stroke-width="1.5"/><line x1="39" y1="12" x2="39" y2="38" stroke="#333" stroke-width="1.5"/>') },
      { id: 'd', label: 'Square with diagonal stripes', visual: oSquare(26, '#B3E5FC', '<line x1="22" y1="12" x2="48" y2="38" stroke="#333" stroke-width="1.5"/><line x1="28" y1="12" x2="48" y2="32" stroke="#333" stroke-width="1.5"/>') },
    ],
    correctAnswerId: 'a',
    explanation: 'Top row: the stripes inside the circle rotate from horizontal to vertical. So the stripes inside the square should also rotate from horizontal to vertical.',
    hint: 'The stripes turn! Which direction do they go?',
  },
  {
    id: 'fm-m-009',
    category: 'figure-matrices',
    difficulty: 'medium',
    prompt: 'How does the shape transform? Complete the matrix.',
    visual: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="300" height="300" rx="16" fill="#FAFAFA"/>
      <!-- Top left: 1 large blue square -->
      <rect x="10" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <rect x="25" y="25" width="90" height="90" fill="#2196F3" stroke="#333" stroke-width="2"/>
      <!-- Top right: 4 small blue squares (split into grid) -->
      <rect x="160" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <rect x="178" y="30" width="35" height="35" fill="#2196F3" stroke="#333" stroke-width="1.5"/>
      <rect x="220" y="30" width="35" height="35" fill="#2196F3" stroke="#333" stroke-width="1.5"/>
      <rect x="178" y="72" width="35" height="35" fill="#2196F3" stroke="#333" stroke-width="1.5"/>
      <rect x="220" y="72" width="35" height="35" fill="#2196F3" stroke="#333" stroke-width="1.5"/>
      <!-- Bottom left: 1 large orange circle -->
      <rect x="10" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <circle cx="75" cy="225" r="42" fill="#FF9800" stroke="#333" stroke-width="2"/>
      <!-- Bottom right: ? -->
      <rect x="160" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <text x="225" y="235" text-anchor="middle" font-size="48" fill="#E65100" font-weight="bold">?</text>
      <text x="150" y="80" text-anchor="middle" font-size="24" fill="#1976D2">→</text>
      <text x="150" y="230" text-anchor="middle" font-size="24" fill="#E65100">→</text>
    </svg>`,
    options: [
      { id: 'a', label: '4 small orange circles', visual: opt('<circle cx="18" cy="15" r="9" fill="#FF9800" stroke="#333" stroke-width="1.5"/><circle cx="52" cy="15" r="9" fill="#FF9800" stroke="#333" stroke-width="1.5"/><circle cx="18" cy="35" r="9" fill="#FF9800" stroke="#333" stroke-width="1.5"/><circle cx="52" cy="35" r="9" fill="#FF9800" stroke="#333" stroke-width="1.5"/>') },
      { id: 'b', label: '2 small orange circles', visual: opt('<circle cx="22" cy="25" r="11" fill="#FF9800" stroke="#333" stroke-width="1.5"/><circle cx="48" cy="25" r="11" fill="#FF9800" stroke="#333" stroke-width="1.5"/>') },
      { id: 'c', label: '4 small blue circles', visual: opt('<circle cx="18" cy="15" r="9" fill="#2196F3" stroke="#333" stroke-width="1.5"/><circle cx="52" cy="15" r="9" fill="#2196F3" stroke="#333" stroke-width="1.5"/><circle cx="18" cy="35" r="9" fill="#2196F3" stroke="#333" stroke-width="1.5"/><circle cx="52" cy="35" r="9" fill="#2196F3" stroke="#333" stroke-width="1.5"/>') },
      { id: 'd', label: '1 large orange circle', visual: oCircle(18, '#FF9800') },
    ],
    correctAnswerId: 'a',
    explanation: 'Top row: 1 large square splits into 4 small squares in a 2x2 grid. So 1 large circle splits into 4 small circles in a 2x2 grid.',
    hint: 'The big shape is split into smaller pieces arranged in a grid!',
  },
  {
    id: 'fm-m-010',
    category: 'figure-matrices',
    difficulty: 'medium',
    prompt: 'Watch what happens to the shading. Apply it to the bottom.',
    visual: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="300" height="300" rx="16" fill="#FAFAFA"/>
      <!-- Top left: empty circle -->
      <rect x="10" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <circle cx="75" cy="75" r="35" fill="white" stroke="#333" stroke-width="2"/>
      <!-- Top right: quarter-shaded circle -->
      <rect x="160" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <circle cx="225" cy="75" r="35" fill="white" stroke="#333" stroke-width="2"/>
      <path d="M 225 75 L 225 40 A 35 35 0 0 1 260 75 Z" fill="#333"/>
      <!-- Bottom left: empty square -->
      <rect x="10" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <rect x="35" y="190" width="80" height="80" fill="white" stroke="#333" stroke-width="2"/>
      <!-- Bottom right: ? -->
      <rect x="160" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <text x="225" y="235" text-anchor="middle" font-size="48" fill="#E65100" font-weight="bold">?</text>
      <text x="150" y="80" text-anchor="middle" font-size="24" fill="#1976D2">→</text>
      <text x="150" y="230" text-anchor="middle" font-size="24" fill="#E65100">→</text>
    </svg>`,
    options: [
      { id: 'a', label: 'Square with top-right quarter shaded', visual: opt('<rect x="22" y="12" width="26" height="26" fill="white" stroke="#333" stroke-width="1.5"/><rect x="35" y="12" width="13" height="13" fill="#333"/>') },
      { id: 'b', label: 'Fully shaded square', visual: oSquare(26, '#333') },
      { id: 'c', label: 'Half-shaded square', visual: opt('<rect x="22" y="12" width="26" height="26" fill="white" stroke="#333" stroke-width="1.5"/><rect x="35" y="12" width="13" height="26" fill="#333"/>') },
      { id: 'd', label: 'Empty square', visual: oSquare(26, 'white') },
    ],
    correctAnswerId: 'a',
    explanation: 'Top row: empty circle gets one quarter shaded (top-right). So the empty square should also get one quarter shaded (top-right).',
    hint: 'How much of the circle got filled in? Apply the same fraction to the square.',
  },
  {
    id: 'fm-m-011',
    category: 'figure-matrices',
    difficulty: 'medium',
    prompt: 'Find what changes and what stays the same.',
    visual: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="300" height="300" rx="16" fill="#FAFAFA"/>
      <!-- Top left: blue circle with 1 dot below -->
      <rect x="10" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <circle cx="75" cy="60" r="28" fill="#2196F3" stroke="#333" stroke-width="2"/>
      <circle cx="75" cy="110" r="6" fill="#333"/>
      <!-- Top right: blue circle with 2 dots below -->
      <rect x="160" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <circle cx="225" cy="60" r="28" fill="#2196F3" stroke="#333" stroke-width="2"/>
      <circle cx="213" cy="110" r="6" fill="#333"/>
      <circle cx="237" cy="110" r="6" fill="#333"/>
      <!-- Bottom left: red triangle with 2 dots below -->
      <rect x="10" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <polygon points="75,175 45,235 105,235" fill="#F44336" stroke="#333" stroke-width="2"/>
      <circle cx="63" cy="260" r="6" fill="#333"/>
      <circle cx="87" cy="260" r="6" fill="#333"/>
      <!-- Bottom right: ? -->
      <rect x="160" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <text x="225" y="235" text-anchor="middle" font-size="48" fill="#E65100" font-weight="bold">?</text>
      <text x="150" y="80" text-anchor="middle" font-size="24" fill="#1976D2">→</text>
      <text x="150" y="230" text-anchor="middle" font-size="24" fill="#E65100">→</text>
    </svg>`,
    options: [
      { id: 'a', label: 'Red triangle with 3 dots', visual: opt('<polygon points="35,5 18,30 52,30" fill="#F44336" stroke="#333" stroke-width="1.5"/><circle cx="23" cy="40" r="3" fill="#333"/><circle cx="35" cy="40" r="3" fill="#333"/><circle cx="47" cy="40" r="3" fill="#333"/>') },
      { id: 'b', label: 'Red triangle with 1 dot', visual: opt('<polygon points="35,5 18,30 52,30" fill="#F44336" stroke="#333" stroke-width="1.5"/><circle cx="35" cy="40" r="3" fill="#333"/>') },
      { id: 'c', label: 'Blue circle with 3 dots', visual: opt('<circle cx="35" cy="16" r="12" fill="#2196F3" stroke="#333" stroke-width="1.5"/><circle cx="23" cy="40" r="3" fill="#333"/><circle cx="35" cy="40" r="3" fill="#333"/><circle cx="47" cy="40" r="3" fill="#333"/>') },
      { id: 'd', label: 'Red triangle with 2 dots', visual: opt('<polygon points="35,5 18,30 52,30" fill="#F44336" stroke="#333" stroke-width="1.5"/><circle cx="28" cy="40" r="3" fill="#333"/><circle cx="42" cy="40" r="3" fill="#333"/>') },
    ],
    correctAnswerId: 'a',
    explanation: 'Top row: 1 dot becomes 2 dots (add 1 dot). So 2 dots become 3 dots. The shape stays the same.',
    hint: 'Count the dots below the shape in each box of the top row.',
  },
  {
    id: 'fm-m-012',
    category: 'figure-matrices',
    difficulty: 'medium',
    prompt: 'Discover both changes and apply them to the bottom.',
    visual: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="300" height="300" rx="16" fill="#FAFAFA"/>
      <!-- Top left: small filled circle -->
      <rect x="10" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <circle cx="75" cy="75" r="22" fill="#E91E63" stroke="#333" stroke-width="2"/>
      <!-- Top right: large outlined circle -->
      <rect x="160" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <circle cx="225" cy="75" r="42" fill="white" stroke="#E91E63" stroke-width="3"/>
      <!-- Bottom left: small filled triangle -->
      <rect x="10" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <polygon points="75,200 55,250 95,250" fill="#3F51B5" stroke="#333" stroke-width="2"/>
      <!-- Bottom right: ? -->
      <rect x="160" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <text x="225" y="235" text-anchor="middle" font-size="48" fill="#E65100" font-weight="bold">?</text>
      <text x="150" y="80" text-anchor="middle" font-size="24" fill="#1976D2">→</text>
      <text x="150" y="230" text-anchor="middle" font-size="24" fill="#E65100">→</text>
    </svg>`,
    options: [
      { id: 'a', label: 'Large outlined triangle', visual: opt('<polygon points="35,2 8,44 62,44" fill="white" stroke="#3F51B5" stroke-width="2"/>') },
      { id: 'b', label: 'Large filled triangle', visual: oTriangle(36, '#3F51B5') },
      { id: 'c', label: 'Small outlined triangle', visual: opt('<polygon points="35,10 22,38 48,38" fill="white" stroke="#3F51B5" stroke-width="2"/>') },
      { id: 'd', label: 'Large outlined circle', visual: opt('<circle cx="35" cy="25" r="18" fill="white" stroke="#3F51B5" stroke-width="2"/>') },
    ],
    correctAnswerId: 'a',
    explanation: 'Top row: small filled circle becomes large outlined circle (size grows AND fill becomes outline only). So small filled triangle becomes large outlined triangle.',
    hint: 'Two things change: the size gets bigger AND the fill disappears leaving only an outline.',
  },
  // ===== NEW HARD (fm-h-006 to fm-h-015) =====
  {
    id: 'fm-h-006',
    category: 'figure-matrices',
    difficulty: 'hard',
    prompt: 'Three things change at once! Track them all carefully.',
    visual: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="300" height="300" rx="16" fill="#FAFAFA"/>
      <!-- Top left: small blue circle with no border -->
      <rect x="10" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <circle cx="75" cy="75" r="22" fill="#2196F3"/>
      <!-- Top right: large red circle with thick border -->
      <rect x="160" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <circle cx="225" cy="75" r="42" fill="#F44336" stroke="#333" stroke-width="4"/>
      <!-- Bottom left: small blue square with no border -->
      <rect x="10" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <rect x="50" y="200" width="45" height="45" fill="#2196F3"/>
      <!-- Bottom right: ? -->
      <rect x="160" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <text x="225" y="235" text-anchor="middle" font-size="48" fill="#E65100" font-weight="bold">?</text>
      <text x="150" y="80" text-anchor="middle" font-size="24" fill="#1976D2">→</text>
      <text x="150" y="230" text-anchor="middle" font-size="24" fill="#E65100">→</text>
    </svg>`,
    options: [
      { id: 'a', label: 'Large red square with border', visual: opt('<rect x="9" y="5" width="34" height="34" fill="#F44336" stroke="#333" stroke-width="3"/>') },
      { id: 'b', label: 'Large blue square with border', visual: opt('<rect x="9" y="5" width="34" height="34" fill="#2196F3" stroke="#333" stroke-width="3"/>') },
      { id: 'c', label: 'Large red square no border', visual: opt('<rect x="10" y="6" width="34" height="34" fill="#F44336"/>') },
      { id: 'd', label: 'Small red square with border', visual: opt('<rect x="18" y="12" width="20" height="20" fill="#F44336" stroke="#333" stroke-width="3"/>') },
    ],
    correctAnswerId: 'a',
    explanation: 'Three changes: size grows, color changes from blue to red, and a thick border is added. Apply all three to the small blue square.',
    hint: 'Track each change: size, color, and the border.',
  },
  {
    id: 'fm-h-007',
    category: 'figure-matrices',
    difficulty: 'hard',
    prompt: 'The inside and outside swap. Watch carefully!',
    visual: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="300" height="300" rx="16" fill="#FAFAFA"/>
      <!-- Top left: green triangle inside purple circle -->
      <rect x="10" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <circle cx="75" cy="75" r="40" fill="#9C27B0" stroke="#333" stroke-width="2"/>
      <polygon points="75,45 50,100 100,100" fill="#4CAF50" stroke="#333" stroke-width="1.5"/>
      <!-- Top right: purple circle inside green triangle -->
      <rect x="160" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <polygon points="225,25 175,120 275,120" fill="#4CAF50" stroke="#333" stroke-width="2"/>
      <circle cx="225" cy="85" r="22" fill="#9C27B0" stroke="#333" stroke-width="1.5"/>
      <!-- Bottom left: orange square inside blue circle -->
      <rect x="10" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <circle cx="75" cy="225" r="40" fill="#2196F3" stroke="#333" stroke-width="2"/>
      <rect x="50" y="205" width="50" height="40" fill="#FF9800" stroke="#333" stroke-width="1.5"/>
      <!-- Bottom right: ? -->
      <rect x="160" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <text x="225" y="235" text-anchor="middle" font-size="48" fill="#E65100" font-weight="bold">?</text>
      <text x="150" y="80" text-anchor="middle" font-size="24" fill="#1976D2">→</text>
      <text x="150" y="230" text-anchor="middle" font-size="24" fill="#E65100">→</text>
    </svg>`,
    options: [
      { id: 'a', label: 'Blue circle inside orange square', visual: opt('<rect x="10" y="5" width="40" height="40" fill="#FF9800" stroke="#333" stroke-width="1.5"/><circle cx="30" cy="25" r="13" fill="#2196F3" stroke="#333" stroke-width="1.5"/>') },
      { id: 'b', label: 'Orange square inside blue circle', visual: opt('<circle cx="35" cy="25" r="18" fill="#2196F3" stroke="#333" stroke-width="1.5"/><rect x="22" y="15" width="26" height="20" fill="#FF9800" stroke="#333" stroke-width="1"/>') },
      { id: 'c', label: 'Blue square inside orange circle', visual: opt('<circle cx="35" cy="25" r="18" fill="#FF9800" stroke="#333" stroke-width="1.5"/><rect x="22" y="15" width="26" height="20" fill="#2196F3" stroke="#333" stroke-width="1"/>') },
      { id: 'd', label: 'Orange circle inside blue square', visual: opt('<rect x="10" y="5" width="40" height="40" fill="#2196F3" stroke="#333" stroke-width="1.5"/><circle cx="30" cy="25" r="13" fill="#FF9800" stroke="#333" stroke-width="1.5"/>') },
    ],
    correctAnswerId: 'a',
    explanation: 'The rule is: inside and outside shapes swap positions. Triangle inside circle becomes circle inside triangle. So square inside circle becomes circle inside square.',
    hint: 'Which shape is inside and which is outside? They trade places!',
  },
  {
    id: 'fm-h-008',
    category: 'figure-matrices',
    difficulty: 'hard',
    prompt: 'Watch the rotation AND the color change together.',
    visual: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="300" height="300" rx="16" fill="#FAFAFA"/>
      <!-- Top left: red arrow pointing up -->
      <rect x="10" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <polygon points="75,30 50,90 100,90" fill="#F44336" stroke="#333" stroke-width="2"/>
      <rect x="63" y="90" width="24" height="30" fill="#F44336" stroke="#333" stroke-width="2"/>
      <!-- Top right: blue arrow pointing right -->
      <rect x="160" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <polygon points="260,75 200,50 200,100" fill="#2196F3" stroke="#333" stroke-width="2"/>
      <rect x="175" y="63" width="25" height="24" fill="#2196F3" stroke="#333" stroke-width="2"/>
      <!-- Bottom left: green arrow pointing left -->
      <rect x="10" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <polygon points="20,225 80,200 80,250" fill="#4CAF50" stroke="#333" stroke-width="2"/>
      <rect x="80" y="213" width="25" height="24" fill="#4CAF50" stroke="#333" stroke-width="2"/>
      <!-- Bottom right: ? -->
      <rect x="160" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <text x="225" y="235" text-anchor="middle" font-size="48" fill="#E65100" font-weight="bold">?</text>
      <text x="150" y="80" text-anchor="middle" font-size="24" fill="#1976D2">→</text>
      <text x="150" y="230" text-anchor="middle" font-size="24" fill="#E65100">→</text>
    </svg>`,
    options: [
      { id: 'a', label: 'Purple arrow pointing down', visual: opt('<polygon points="35,42 22,18 48,18" fill="#9C27B0" stroke="#333" stroke-width="1.5"/><rect x="29" y="5" width="12" height="13" fill="#9C27B0" stroke="#333" stroke-width="1.5"/>') },
      { id: 'b', label: 'Green arrow pointing down', visual: opt('<polygon points="35,42 22,18 48,18" fill="#4CAF50" stroke="#333" stroke-width="1.5"/><rect x="29" y="5" width="12" height="13" fill="#4CAF50" stroke="#333" stroke-width="1.5"/>') },
      { id: 'c', label: 'Purple arrow pointing up', visual: opt('<polygon points="35,8 22,32 48,32" fill="#9C27B0" stroke="#333" stroke-width="1.5"/><rect x="29" y="32" width="12" height="13" fill="#9C27B0" stroke="#333" stroke-width="1.5"/>') },
      { id: 'd', label: 'Blue arrow pointing down', visual: opt('<polygon points="35,42 22,18 48,18" fill="#2196F3" stroke="#333" stroke-width="1.5"/><rect x="29" y="5" width="12" height="13" fill="#2196F3" stroke="#333" stroke-width="1.5"/>') },
    ],
    correctAnswerId: 'a',
    explanation: 'Two changes: the arrow rotates 90 degrees clockwise (up→right) AND the color changes (red→blue, a new color). So left→down with a 90-degree clockwise turn, and green changes to a new color (purple).',
    hint: 'Track the direction the arrow turns AND notice the color is completely different.',
  },
  {
    id: 'fm-h-009',
    category: 'figure-matrices',
    difficulty: 'hard',
    prompt: 'Track the number of shapes AND their colors carefully.',
    visual: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="300" height="300" rx="16" fill="#FAFAFA"/>
      <!-- Top left: 2 red circles -->
      <rect x="10" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <circle cx="55" cy="75" r="22" fill="#F44336" stroke="#333" stroke-width="2"/>
      <circle cx="95" cy="75" r="22" fill="#F44336" stroke="#333" stroke-width="2"/>
      <!-- Top right: 3 blue circles -->
      <rect x="160" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <circle cx="192" cy="75" r="18" fill="#2196F3" stroke="#333" stroke-width="2"/>
      <circle cx="225" cy="75" r="18" fill="#2196F3" stroke="#333" stroke-width="2"/>
      <circle cx="258" cy="75" r="18" fill="#2196F3" stroke="#333" stroke-width="2"/>
      <!-- Bottom left: 1 green square -->
      <rect x="10" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <rect x="40" y="195" width="60" height="60" fill="#4CAF50" stroke="#333" stroke-width="2"/>
      <!-- Bottom right: ? -->
      <rect x="160" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <text x="225" y="235" text-anchor="middle" font-size="48" fill="#E65100" font-weight="bold">?</text>
      <text x="150" y="80" text-anchor="middle" font-size="24" fill="#1976D2">→</text>
      <text x="150" y="230" text-anchor="middle" font-size="24" fill="#E65100">→</text>
    </svg>`,
    options: [
      { id: 'a', label: '2 orange squares', visual: opt('<rect x="10" y="12" width="20" height="20" fill="#FF9800" stroke="#333" stroke-width="1.5"/><rect x="40" y="12" width="20" height="20" fill="#FF9800" stroke="#333" stroke-width="1.5"/>') },
      { id: 'b', label: '2 green squares', visual: opt('<rect x="10" y="12" width="20" height="20" fill="#4CAF50" stroke="#333" stroke-width="1.5"/><rect x="40" y="12" width="20" height="20" fill="#4CAF50" stroke="#333" stroke-width="1.5"/>') },
      { id: 'c', label: '3 orange squares', visual: opt('<rect x="5" y="14" width="16" height="16" fill="#FF9800" stroke="#333" stroke-width="1"/><rect x="27" y="14" width="16" height="16" fill="#FF9800" stroke="#333" stroke-width="1"/><rect x="49" y="14" width="16" height="16" fill="#FF9800" stroke="#333" stroke-width="1"/>') },
      { id: 'd', label: '1 orange square', visual: oSquare(20, '#FF9800') },
    ],
    correctAnswerId: 'a',
    explanation: 'Two changes: count increases by 1 (2→3) AND color changes (red→blue). So 1 green square: count increases by 1 (1→2) AND color changes (green→orange).',
    hint: 'Both the number of shapes AND their color change from left to right.',
  },
  {
    id: 'fm-h-010',
    category: 'figure-matrices',
    difficulty: 'hard',
    prompt: 'Look at the symmetry change from left to right.',
    visual: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="300" height="300" rx="16" fill="#FAFAFA"/>
      <!-- Top left: shape on left side only -->
      <rect x="10" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <line x1="75" y1="25" x2="75" y2="125" stroke="#999" stroke-width="1" stroke-dasharray="4"/>
      <circle cx="50" cy="75" r="22" fill="#E91E63" stroke="#333" stroke-width="2"/>
      <!-- Top right: shape mirrored on both sides -->
      <rect x="160" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <line x1="225" y1="25" x2="225" y2="125" stroke="#999" stroke-width="1" stroke-dasharray="4"/>
      <circle cx="200" cy="75" r="22" fill="#E91E63" stroke="#333" stroke-width="2"/>
      <circle cx="250" cy="75" r="22" fill="#E91E63" stroke="#333" stroke-width="2"/>
      <!-- Bottom left: triangle on left side only -->
      <rect x="10" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <line x1="75" y1="170" x2="75" y2="280" stroke="#999" stroke-width="1" stroke-dasharray="4"/>
      <polygon points="50,200 30,255 70,255" fill="#009688" stroke="#333" stroke-width="2"/>
      <!-- Bottom right: ? -->
      <rect x="160" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <text x="225" y="235" text-anchor="middle" font-size="48" fill="#E65100" font-weight="bold">?</text>
      <text x="150" y="80" text-anchor="middle" font-size="24" fill="#1976D2">→</text>
      <text x="150" y="230" text-anchor="middle" font-size="24" fill="#E65100">→</text>
    </svg>`,
    options: [
      { id: 'a', label: 'Two triangles mirrored', visual: opt('<line x1="35" y1="5" x2="35" y2="45" stroke="#999" stroke-width="1" stroke-dasharray="3"/><polygon points="22,10 12,38 32,38" fill="#009688" stroke="#333" stroke-width="1.5"/><polygon points="48,10 38,38 58,38" fill="#009688" stroke="#333" stroke-width="1.5"/>') },
      { id: 'b', label: 'One triangle on the left', visual: opt('<line x1="35" y1="5" x2="35" y2="45" stroke="#999" stroke-width="1" stroke-dasharray="3"/><polygon points="22,10 12,38 32,38" fill="#009688" stroke="#333" stroke-width="1.5"/>') },
      { id: 'c', label: 'Two circles mirrored', visual: opt('<line x1="35" y1="5" x2="35" y2="45" stroke="#999" stroke-width="1" stroke-dasharray="3"/><circle cx="20" cy="25" r="10" fill="#E91E63" stroke="#333" stroke-width="1.5"/><circle cx="50" cy="25" r="10" fill="#E91E63" stroke="#333" stroke-width="1.5"/>') },
      { id: 'd', label: 'One triangle on the right', visual: opt('<line x1="35" y1="5" x2="35" y2="45" stroke="#999" stroke-width="1" stroke-dasharray="3"/><polygon points="48,10 38,38 58,38" fill="#009688" stroke="#333" stroke-width="1.5"/>') },
    ],
    correctAnswerId: 'a',
    explanation: 'The dashed line is a mirror axis. Top row: one circle on the left becomes two circles mirrored across the axis. So one triangle on the left becomes two triangles mirrored across the axis.',
    hint: 'The dashed line is like a mirror. What does the shape look like reflected?',
  },
  {
    id: 'fm-h-011',
    category: 'figure-matrices',
    difficulty: 'hard',
    prompt: 'A nested transformation! The inside shape changes based on a rule.',
    visual: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="300" height="300" rx="16" fill="#FAFAFA"/>
      <!-- Top left: circle with small square inside -->
      <rect x="10" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <circle cx="75" cy="75" r="40" fill="#BBDEFB" stroke="#333" stroke-width="2"/>
      <rect x="60" y="60" width="30" height="30" fill="#FF5722" stroke="#333" stroke-width="1.5"/>
      <!-- Top right: circle with small triangle inside -->
      <rect x="160" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <circle cx="225" cy="75" r="40" fill="#BBDEFB" stroke="#333" stroke-width="2"/>
      <polygon points="225,50 205,95 245,95" fill="#FF5722" stroke="#333" stroke-width="1.5"/>
      <!-- Bottom left: square with small circle inside -->
      <rect x="10" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <rect x="25" y="180" width="90" height="90" fill="#C8E6C9" stroke="#333" stroke-width="2"/>
      <circle cx="70" cy="225" r="20" fill="#FF5722" stroke="#333" stroke-width="1.5"/>
      <!-- Bottom right: ? -->
      <rect x="160" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <text x="225" y="235" text-anchor="middle" font-size="48" fill="#E65100" font-weight="bold">?</text>
      <text x="150" y="80" text-anchor="middle" font-size="24" fill="#1976D2">→</text>
      <text x="150" y="230" text-anchor="middle" font-size="24" fill="#E65100">→</text>
    </svg>`,
    options: [
      { id: 'a', label: 'Square with small square inside', visual: opt('<rect x="10" y="5" width="36" height="36" fill="#C8E6C9" stroke="#333" stroke-width="1.5"/><rect x="19" y="14" width="18" height="18" fill="#FF5722" stroke="#333" stroke-width="1"/>') },
      { id: 'b', label: 'Square with small triangle inside', visual: opt('<rect x="10" y="5" width="36" height="36" fill="#C8E6C9" stroke="#333" stroke-width="1.5"/><polygon points="28,10 18,36 38,36" fill="#FF5722" stroke="#333" stroke-width="1"/>') },
      { id: 'c', label: 'Square with small circle inside', visual: opt('<rect x="10" y="5" width="36" height="36" fill="#C8E6C9" stroke="#333" stroke-width="1.5"/><circle cx="28" cy="23" r="10" fill="#FF5722" stroke="#333" stroke-width="1"/>') },
      { id: 'd', label: 'Circle with small circle inside', visual: opt('<circle cx="35" cy="25" r="18" fill="#BBDEFB" stroke="#333" stroke-width="1.5"/><circle cx="35" cy="25" r="8" fill="#FF5722" stroke="#333" stroke-width="1"/>') },
    ],
    correctAnswerId: 'a',
    explanation: 'The inside shape cycles: square→triangle→circle→square. Top row: square inside becomes triangle inside. Bottom row: circle inside becomes square inside. The outer shape stays the same.',
    hint: 'Focus on the small shape inside. It changes in a pattern: square, triangle, circle, and then back to...',
  },
  {
    id: 'fm-h-012',
    category: 'figure-matrices',
    difficulty: 'hard',
    prompt: 'The shapes, colors, and patterns all follow rules. Find them!',
    visual: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="300" height="300" rx="16" fill="#FAFAFA"/>
      <!-- Top left: red circle with 1 horizontal line -->
      <rect x="10" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <circle cx="75" cy="75" r="35" fill="#FFCDD2" stroke="#333" stroke-width="2"/>
      <line x1="42" y1="75" x2="108" y2="75" stroke="#333" stroke-width="2"/>
      <!-- Top right: blue circle with 2 horizontal lines -->
      <rect x="160" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <circle cx="225" cy="75" r="35" fill="#BBDEFB" stroke="#333" stroke-width="2"/>
      <line x1="192" y1="65" x2="258" y2="65" stroke="#333" stroke-width="2"/>
      <line x1="192" y1="85" x2="258" y2="85" stroke="#333" stroke-width="2"/>
      <!-- Bottom left: green square with 2 horizontal lines -->
      <rect x="10" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <rect x="30" y="185" width="80" height="80" fill="#C8E6C9" stroke="#333" stroke-width="2"/>
      <line x1="30" y1="215" x2="110" y2="215" stroke="#333" stroke-width="2"/>
      <line x1="30" y1="235" x2="110" y2="235" stroke="#333" stroke-width="2"/>
      <!-- Bottom right: ? -->
      <rect x="160" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <text x="225" y="235" text-anchor="middle" font-size="48" fill="#E65100" font-weight="bold">?</text>
      <text x="150" y="80" text-anchor="middle" font-size="24" fill="#1976D2">→</text>
      <text x="150" y="230" text-anchor="middle" font-size="24" fill="#E65100">→</text>
    </svg>`,
    options: [
      { id: 'a', label: 'Orange square with 3 lines', visual: oSquare(26, '#FFE0B2', '<line x1="22" y1="17" x2="48" y2="17" stroke="#333" stroke-width="1.5"/><line x1="22" y1="25" x2="48" y2="25" stroke="#333" stroke-width="1.5"/><line x1="22" y1="33" x2="48" y2="33" stroke="#333" stroke-width="1.5"/>') },
      { id: 'b', label: 'Green square with 3 lines', visual: oSquare(26, '#C8E6C9', '<line x1="22" y1="17" x2="48" y2="17" stroke="#333" stroke-width="1.5"/><line x1="22" y1="25" x2="48" y2="25" stroke="#333" stroke-width="1.5"/><line x1="22" y1="33" x2="48" y2="33" stroke="#333" stroke-width="1.5"/>') },
      { id: 'c', label: 'Orange square with 2 lines', visual: oSquare(26, '#FFE0B2', '<line x1="22" y1="20" x2="48" y2="20" stroke="#333" stroke-width="1.5"/><line x1="22" y1="30" x2="48" y2="30" stroke="#333" stroke-width="1.5"/>') },
      { id: 'd', label: 'Blue circle with 3 lines', visual: oCircle(15, '#BBDEFB', '<line x1="22" y1="17" x2="48" y2="17" stroke="#333" stroke-width="1.5"/><line x1="22" y1="25" x2="48" y2="25" stroke="#333" stroke-width="1.5"/><line x1="22" y1="33" x2="48" y2="33" stroke="#333" stroke-width="1.5"/>') },
    ],
    correctAnswerId: 'a',
    explanation: 'Two rules: the color changes (red→blue, green→orange) AND the number of lines increases by 1 (1→2, 2→3). The shape stays the same.',
    hint: 'Count the lines AND look at the color. Both change!',
  },
  {
    id: 'fm-h-013',
    category: 'figure-matrices',
    difficulty: 'hard',
    prompt: 'The shape inverts and transforms. Find the complete rule.',
    visual: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="300" height="300" rx="16" fill="#FAFAFA"/>
      <!-- Top left: large filled triangle pointing up -->
      <rect x="10" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <polygon points="75,25 30,115 120,115" fill="#673AB7" stroke="#333" stroke-width="2"/>
      <!-- Top right: small outlined triangle pointing down -->
      <rect x="160" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <polygon points="225,105 200,50 250,50" fill="white" stroke="#673AB7" stroke-width="3"/>
      <!-- Bottom left: large filled circle -->
      <rect x="10" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <circle cx="75" cy="225" r="42" fill="#E91E63" stroke="#333" stroke-width="2"/>
      <!-- Bottom right: ? -->
      <rect x="160" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <text x="225" y="235" text-anchor="middle" font-size="48" fill="#E65100" font-weight="bold">?</text>
      <text x="150" y="80" text-anchor="middle" font-size="24" fill="#1976D2">→</text>
      <text x="150" y="230" text-anchor="middle" font-size="24" fill="#E65100">→</text>
    </svg>`,
    options: [
      { id: 'a', label: 'Small outlined circle', visual: opt('<circle cx="35" cy="25" r="12" fill="white" stroke="#E91E63" stroke-width="2.5"/>') },
      { id: 'b', label: 'Large outlined circle', visual: opt('<circle cx="35" cy="25" r="18" fill="white" stroke="#E91E63" stroke-width="2.5"/>') },
      { id: 'c', label: 'Small filled circle', visual: oCircle(10, '#E91E63') },
      { id: 'd', label: 'Small outlined square', visual: opt('<rect x="22" y="12" width="22" height="22" fill="white" stroke="#E91E63" stroke-width="2.5"/>') },
    ],
    correctAnswerId: 'a',
    explanation: 'Three changes: size shrinks, fill becomes outline only (inverts), and triangle flips direction. Since a circle has no direction, apply the first two: large filled circle becomes small outlined circle.',
    hint: 'The shape gets smaller AND the fill changes to just an outline.',
  },
  {
    id: 'fm-h-014',
    category: 'figure-matrices',
    difficulty: 'hard',
    prompt: 'Watch the layering pattern carefully. What goes in the empty box?',
    visual: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="300" height="300" rx="16" fill="#FAFAFA"/>
      <!-- Top left: circle alone -->
      <rect x="10" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <circle cx="75" cy="75" r="32" fill="#2196F3" stroke="#333" stroke-width="2"/>
      <!-- Top right: circle + square overlapping (circle behind square) -->
      <rect x="160" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <circle cx="215" cy="75" r="32" fill="#2196F3" stroke="#333" stroke-width="2"/>
      <rect x="215" y="50" width="45" height="45" fill="#F44336" stroke="#333" stroke-width="2"/>
      <!-- Bottom left: triangle alone -->
      <rect x="10" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <polygon points="75,185 40,270 110,270" fill="#4CAF50" stroke="#333" stroke-width="2"/>
      <!-- Bottom right: ? -->
      <rect x="160" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <text x="225" y="235" text-anchor="middle" font-size="48" fill="#E65100" font-weight="bold">?</text>
      <text x="150" y="80" text-anchor="middle" font-size="24" fill="#1976D2">→</text>
      <text x="150" y="230" text-anchor="middle" font-size="24" fill="#E65100">→</text>
    </svg>`,
    options: [
      { id: 'a', label: 'Triangle + square overlapping', visual: opt('<polygon points="25,5 10,40 40,40" fill="#4CAF50" stroke="#333" stroke-width="1.5"/><rect x="30" y="12" width="22" height="22" fill="#F44336" stroke="#333" stroke-width="1.5"/>') },
      { id: 'b', label: 'Triangle + circle overlapping', visual: opt('<polygon points="25,5 10,40 40,40" fill="#4CAF50" stroke="#333" stroke-width="1.5"/><circle cx="45" cy="25" r="12" fill="#2196F3" stroke="#333" stroke-width="1.5"/>') },
      { id: 'c', label: 'Square + triangle overlapping', visual: opt('<rect x="10" y="12" width="22" height="22" fill="#F44336" stroke="#333" stroke-width="1.5"/><polygon points="45,5 30,40 60,40" fill="#4CAF50" stroke="#333" stroke-width="1.5"/>') },
      { id: 'd', label: 'Triangle alone (bigger)', visual: oTriangle(36, '#4CAF50') },
    ],
    correctAnswerId: 'a',
    explanation: 'Top row: a lone circle gains a red square overlapping it. So a lone triangle should also gain a red square overlapping it in the same way.',
    hint: 'What new shape appears in the top-right box? The same thing should be added to the bottom shape.',
  },
  {
    id: 'fm-h-015',
    category: 'figure-matrices',
    difficulty: 'hard',
    prompt: 'A complex pattern! The shape, fill, and an element all change.',
    visual: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="300" height="300" rx="16" fill="#FAFAFA"/>
      <!-- Top left: large red circle with 1 small white star inside -->
      <rect x="10" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <circle cx="75" cy="75" r="40" fill="#F44336" stroke="#333" stroke-width="2"/>
      <text x="75" y="83" text-anchor="middle" font-size="22" fill="white">★</text>
      <!-- Top right: small blue circle with 2 small white stars inside -->
      <rect x="160" y="10" width="130" height="130" rx="10" fill="#E3F2FD" stroke="#1976D2" stroke-width="2"/>
      <circle cx="225" cy="75" r="25" fill="#2196F3" stroke="#333" stroke-width="2"/>
      <text x="215" y="83" text-anchor="middle" font-size="16" fill="white">★</text>
      <text x="237" y="83" text-anchor="middle" font-size="16" fill="white">★</text>
      <!-- Bottom left: large green square with 2 small white stars inside -->
      <rect x="10" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <rect x="25" y="182" width="90" height="90" fill="#4CAF50" stroke="#333" stroke-width="2"/>
      <text x="55" y="233" text-anchor="middle" font-size="22" fill="white">★</text>
      <text x="85" y="233" text-anchor="middle" font-size="22" fill="white">★</text>
      <!-- Bottom right: ? -->
      <rect x="160" y="160" width="130" height="130" rx="10" fill="#FFF3E0" stroke="#E65100" stroke-width="2"/>
      <text x="225" y="235" text-anchor="middle" font-size="48" fill="#E65100" font-weight="bold">?</text>
      <text x="150" y="80" text-anchor="middle" font-size="24" fill="#1976D2">→</text>
      <text x="150" y="230" text-anchor="middle" font-size="24" fill="#E65100">→</text>
    </svg>`,
    options: [
      { id: 'a', label: 'Small purple square with 3 stars', visual: opt('<rect x="17" y="8" width="26" height="26" fill="#9C27B0" stroke="#333" stroke-width="1.5"/><text x="24" y="26" text-anchor="middle" font-size="10" fill="white">★</text><text x="35" y="26" text-anchor="middle" font-size="10" fill="white">★</text><text x="46" y="26" text-anchor="middle" font-size="10" fill="white">★</text>') },
      { id: 'b', label: 'Small green square with 3 stars', visual: opt('<rect x="17" y="8" width="26" height="26" fill="#4CAF50" stroke="#333" stroke-width="1.5"/><text x="24" y="26" text-anchor="middle" font-size="10" fill="white">★</text><text x="35" y="26" text-anchor="middle" font-size="10" fill="white">★</text><text x="46" y="26" text-anchor="middle" font-size="10" fill="white">★</text>') },
      { id: 'c', label: 'Large purple square with 3 stars', visual: opt('<rect x="9" y="5" width="36" height="36" fill="#9C27B0" stroke="#333" stroke-width="1.5"/><text x="18" y="28" text-anchor="middle" font-size="12" fill="white">★</text><text x="30" y="28" text-anchor="middle" font-size="12" fill="white">★</text><text x="42" y="28" text-anchor="middle" font-size="12" fill="white">★</text>') },
      { id: 'd', label: 'Small purple square with 2 stars', visual: opt('<rect x="17" y="8" width="26" height="26" fill="#9C27B0" stroke="#333" stroke-width="1.5"/><text x="28" y="26" text-anchor="middle" font-size="10" fill="white">★</text><text x="40" y="26" text-anchor="middle" font-size="10" fill="white">★</text>') },
    ],
    correctAnswerId: 'a',
    explanation: 'Three changes: size shrinks (large→small), color changes (red→blue means a shift, so green→purple), and stars increase by 1. So large green square with 2 stars → small purple square with 3 stars.',
    hint: 'Track all three: size, color, and the number of stars inside.',
  },
];
