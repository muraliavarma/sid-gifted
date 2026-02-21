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
      { id: 'a', label: 'Yellow circle' },
      { id: 'b', label: 'Red square' },
      { id: 'c', label: 'Blue triangle' },
      { id: 'd', label: 'Green diamond' },
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
      { id: 'a', label: 'Blue circle' },
      { id: 'b', label: 'Red diamond' },
      { id: 'c', label: 'Green square' },
      { id: 'd', label: 'Yellow triangle' },
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
      { id: 'a', label: 'Large blue star' },
      { id: 'b', label: 'Tiny red circle' },
      { id: 'c', label: 'Tiny blue square' },
      { id: 'd', label: 'Tiny green triangle' },
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
      { id: 'a', label: 'Circle' },
      { id: 'b', label: 'Parallelogram (4 sides)' },
      { id: 'c', label: 'Triangle' },
      { id: 'd', label: 'Pentagon (5 sides)' },
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
      { id: 'a', label: 'Diamond with stripes' },
      { id: 'b', label: 'Plain circle (no stripes)' },
      { id: 'c', label: 'Dotted square' },
      { id: 'd', label: 'Plain triangle' },
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
      { id: 'a', label: 'Orange triangle' },
      { id: 'b', label: 'Red circle' },
      { id: 'c', label: 'Blue square' },
      { id: 'd', label: 'Purple rectangle' },
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
      { id: 'a', label: 'Small blue diamond' },
      { id: 'b', label: 'Large blue circle' },
      { id: 'c', label: 'Small red circle' },
      { id: 'd', label: 'Large red square' },
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
      { id: 'a', label: 'Diamond with 2 dots inside' },
      { id: 'b', label: 'Circle with 1 dot inside' },
      { id: 'c', label: 'Square with 3 dots inside' },
      { id: 'd', label: 'Empty triangle' },
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
      { id: 'a', label: 'Star with dot in center' },
      { id: 'b', label: 'Circle with no dot' },
      { id: 'c', label: 'Square with stripe' },
      { id: 'd', label: 'Triangle with X inside' },
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
      { id: 'a', label: 'Shape pointing up' },
      { id: 'b', label: 'Shape pointing down' },
      { id: 'c', label: 'Shape pointing left' },
      { id: 'd', label: 'Round shape' },
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
      { id: 'a', label: 'Half-filled diamond' },
      { id: 'b', label: 'Fully filled circle' },
      { id: 'c', label: 'Empty square' },
      { id: 'd', label: 'Quarter-filled triangle' },
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
      { id: 'a', label: 'Green triangle' },
      { id: 'b', label: 'Red pentagon' },
      { id: 'c', label: 'Blue rectangle' },
      { id: 'd', label: 'Yellow hexagon' },
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
      { id: 'a', label: 'Nonagon (9 sides)' },
      { id: 'b', label: 'Square (4 sides)' },
      { id: 'c', label: 'Hexagon (6 sides)' },
      { id: 'd', label: 'Octagon (8 sides)' },
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
      { id: 'a', label: 'Pentagon with triangle inside' },
      { id: 'b', label: 'Circle with circle inside' },
      { id: 'c', label: 'Square with square inside' },
      { id: 'd', label: 'Triangle with triangle inside' },
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
      { id: 'a', label: 'Outlined semicircle (curved, not filled)' },
      { id: 'b', label: 'Filled circle' },
      { id: 'c', label: 'Outlined triangle' },
      { id: 'd', label: 'Filled oval' },
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
      { id: 'a', label: 'Heart (symmetric)' },
      { id: 'b', label: 'Parallelogram (not symmetric vertically)' },
      { id: 'c', label: 'Lightning bolt (not symmetric)' },
      { id: 'd', label: 'Curved swoosh (not symmetric)' },
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
      { id: 'a', label: 'Hexagon with 6 dots' },
      { id: 'b', label: 'Hexagon with 4 dots' },
      { id: 'c', label: 'Triangle with 5 dots' },
      { id: 'd', label: 'Square with 3 dots' },
    ],
    correctAnswerId: 'a',
    explanation: 'Triangle has 3 sides and 3 dots. Square has 4 sides and 4 dots. Pentagon has 5 sides and 5 dots. The number of dots equals the number of sides! Hexagon with 6 dots follows this rule.',
    hint: 'Count the sides AND count the dots. What do you notice?',
  },
];
