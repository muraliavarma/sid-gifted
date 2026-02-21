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
      { id: 'a', label: 'Large red circle' },
      { id: 'b', label: 'Small red circle' },
      { id: 'c', label: 'Large blue circle' },
      { id: 'd', label: 'Small blue square' },
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
      { id: 'a', label: 'Red triangle' },
      { id: 'b', label: 'Blue triangle' },
      { id: 'c', label: 'Red square' },
      { id: 'd', label: 'Green triangle' },
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
      { id: 'a', label: '1 heart' },
      { id: 'b', label: '2 hearts' },
      { id: 'c', label: '3 hearts' },
      { id: 'd', label: '2 stars' },
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
      { id: 'a', label: 'Empty square (outline only)' },
      { id: 'b', label: 'Filled square' },
      { id: 'c', label: 'Empty circle' },
      { id: 'd', label: 'Filled circle' },
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
      { id: 'a', label: 'Square with dot inside' },
      { id: 'b', label: 'Empty square' },
      { id: 'c', label: 'Circle with dot inside' },
      { id: 'd', label: 'Square with line inside' },
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
      { id: 'a', label: 'Downward arrow ⬇️' },
      { id: 'b', label: 'Upward arrow ⬆️' },
      { id: 'c', label: 'Left arrow ⬅️' },
      { id: 'd', label: 'Right arrow ➡️' },
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
      { id: 'a', label: 'Large red square' },
      { id: 'b', label: 'Large blue square' },
      { id: 'c', label: 'Small red square' },
      { id: 'd', label: 'Large red circle' },
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
      { id: 'a', label: '2 small squares' },
      { id: 'b', label: '1 large square' },
      { id: 'c', label: '2 large squares' },
      { id: 'd', label: '1 small square' },
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
      { id: 'a', label: 'Square with vertical line' },
      { id: 'b', label: 'Square with horizontal line' },
      { id: 'c', label: 'Circle with vertical line' },
      { id: 'd', label: 'Square with diagonal line' },
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
      { id: 'a', label: '3 squares' },
      { id: 'b', label: '2 squares' },
      { id: 'c', label: '4 squares' },
      { id: 'd', label: '1 square' },
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
      { id: 'a', label: 'Fully shaded triangle' },
      { id: 'b', label: 'Half shaded triangle' },
      { id: 'c', label: 'Fully shaded circle' },
      { id: 'd', label: 'Empty triangle' },
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
      { id: 'a', label: 'Green square with 3 stripes' },
      { id: 'b', label: 'Green square with 1 stripe' },
      { id: 'c', label: 'Blue circle with 3 stripes' },
      { id: 'd', label: 'Green square with 2 stripes' },
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
      { id: 'a', label: 'Large white triangle with dot' },
      { id: 'b', label: 'Large black triangle' },
      { id: 'c', label: 'Small white triangle with dot' },
      { id: 'd', label: 'Large white triangle' },
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
      { id: 'a', label: 'Green circle inside yellow triangle' },
      { id: 'b', label: 'Yellow triangle inside green circle' },
      { id: 'c', label: 'Green triangle inside yellow circle' },
      { id: 'd', label: 'Yellow circle inside green triangle' },
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
      { id: 'a', label: 'Arrow pointing left' },
      { id: 'b', label: 'Arrow pointing right' },
      { id: 'c', label: 'Arrow pointing up' },
      { id: 'd', label: 'Arrow pointing down' },
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
      { id: 'a', label: '3 circles, all colored' },
      { id: 'b', label: '3 circles, 2 colored' },
      { id: 'c', label: '2 circles, all colored' },
      { id: 'd', label: '3 circles, 1 colored' },
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
      { id: 'a', label: 'Large red square with cross' },
      { id: 'b', label: 'Large red circle with cross' },
      { id: 'c', label: 'Large blue square with cross' },
      { id: 'd', label: 'Large green triangle with cross' },
    ],
    correctAnswerId: 'a',
    explanation: 'The rule: shape changes to square→circle→triangle→square (cycles), color swaps red↔blue, size grows, cross stays. So blue triangle → red square (large, with cross).',
    hint: 'Track each change separately: shape type, color, and size.',
  },
];
