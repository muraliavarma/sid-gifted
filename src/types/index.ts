export type Category =
  | 'number-analogies'
  | 'figure-matrices'
  | 'figure-classification'
  | 'number-series'
  | 'number-puzzles'
  | 'picture-analogies'
  | 'picture-classification'
  | 'sentence-completion'
  | 'paper-folding';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface AnswerOption {
  id: string;
  /** For visual questions, this can be SVG markup or emoji-based representation */
  label: string;
  /** Optional visual content (SVG string) */
  visual?: string;
}

export interface Question {
  id: string;
  category: Category;
  difficulty: Difficulty;
  /** The question prompt text (read aloud by parent) */
  prompt: string;
  /** Visual representation of the question (SVG or structured data) */
  visual?: string;
  /** Answer options */
  options: AnswerOption[];
  /** ID of the correct answer option */
  correctAnswerId: string;
  /** Explanation shown after answering */
  explanation: string;
  /** Optional hint */
  hint?: string;
}

export interface TestSession {
  id: string;
  category: Category | 'mixed';
  difficulty: Difficulty | 'mixed';
  questions: Question[];
  answers: Record<string, string>; // questionId -> selectedOptionId
  currentIndex: number;
  startedAt: number;
  completedAt?: number;
}

export interface TestResult {
  sessionId: string;
  totalQuestions: number;
  correctAnswers: number;
  score: number; // percentage
  timeSpent: number; // seconds
  categoryBreakdown: Record<Category, { total: number; correct: number }>;
  completedAt: number;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  'number-analogies': 'Number Analogies',
  'figure-matrices': 'Figure Matrices',
  'figure-classification': 'Figure Classification',
  'number-series': 'Number Series',
  'number-puzzles': 'Number Puzzles',
  'picture-analogies': 'Picture Analogies',
  'picture-classification': 'Picture Classification',
  'sentence-completion': 'Sentence Completion',
  'paper-folding': 'Paper Folding',
};

export const CATEGORY_DESCRIPTIONS: Record<Category, string> = {
  'number-analogies': 'Find the pattern between numbers and apply it (like CogAT Quantitative)',
  'figure-matrices': 'Complete the 2×2 grid by finding how shapes change (like CogAT Nonverbal)',
  'figure-classification': 'Find which shape belongs with the group (like CogAT Nonverbal)',
  'number-series': 'Find the next number in the sequence (like CogAT Quantitative)',
  'number-puzzles': 'Balance both sides by finding the missing number (like CogAT Quantitative)',
  'picture-analogies': 'Find how two pictures relate and apply the same rule (like CogAT Verbal)',
  'picture-classification': 'Find which picture belongs with the group (like CogAT Verbal)',
  'sentence-completion': 'Pick the picture that completes the sentence (like CogAT Verbal)',
  'paper-folding': 'Figure out what the paper looks like after folding (like CogAT Nonverbal)',
};

export const CATEGORY_ICONS: Record<Category, string> = {
  'number-analogies': '🔢',
  'figure-matrices': '🔲',
  'figure-classification': '🔷',
  'number-series': '📊',
  'number-puzzles': '🧩',
  'picture-analogies': '🖼️',
  'picture-classification': '🏷️',
  'sentence-completion': '💬',
  'paper-folding': '📄',
};

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
};

export const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  easy: '#4CAF50',
  medium: '#FF9800',
  hard: '#f44336',
};
