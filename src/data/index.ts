import type { Question, Category, Difficulty } from '../types';
import { numberAnalogies } from './numberAnalogies';
import { numberSeries } from './numberSeries';
import { numberPuzzles } from './numberPuzzles';
import { figureMatrices } from './figureMatrices';
import { figureClassification } from './figureClassification';
import { pictureAnalogies } from './pictureAnalogies';
import { pictureClassification } from './pictureClassification';
import { sentenceCompletion } from './sentenceCompletion';
import { paperFolding } from './paperFolding';

/** All questions combined */
export const allQuestions: Question[] = [
  ...numberAnalogies,
  ...numberSeries,
  ...numberPuzzles,
  ...figureMatrices,
  ...figureClassification,
  ...pictureAnalogies,
  ...pictureClassification,
  ...sentenceCompletion,
  ...paperFolding,
];

// ---- Solved question tracking via localStorage ----

const SOLVED_KEY = 'solved-questions';
const SOLVED_INIT_KEY = 'solved-questions-initialized';

/** IDs of all questions that existed before the solved feature was added.
 *  These are pre-marked as solved since the kid already completed them. */
const PRESOLVED_QUESTION_IDS: string[] = [
  // Number Analogies (19)
  'na-e-001','na-e-002','na-e-003','na-e-004','na-e-005','na-e-006','na-e-007',
  'na-m-001','na-m-002','na-m-003','na-m-004','na-m-005','na-m-006',
  'na-h-001','na-h-002','na-h-003','na-h-004','na-h-005','na-h-006',
  // Number Series (19)
  'ns-e-001','ns-e-002','ns-e-003','ns-e-004','ns-e-005','ns-e-006','ns-e-007',
  'ns-m-001','ns-m-002','ns-m-003','ns-m-004','ns-m-005','ns-m-006',
  'ns-h-001','ns-h-002','ns-h-003','ns-h-004','ns-h-005','ns-h-006',
  // Number Puzzles (19)
  'np-e-001','np-e-002','np-e-003','np-e-004','np-e-005','np-e-006','np-e-007',
  'np-m-001','np-m-002','np-m-003','np-m-004','np-m-005','np-m-006',
  'np-h-001','np-h-002','np-h-003','np-h-004','np-h-005','np-h-006',
  // Figure Matrices (17)
  'fm-e-001','fm-e-002','fm-e-003','fm-e-004','fm-e-005','fm-e-006',
  'fm-m-001','fm-m-002','fm-m-003','fm-m-004','fm-m-005','fm-m-006',
  'fm-h-001','fm-h-002','fm-h-003','fm-h-004','fm-h-005',
  // Figure Classification (17)
  'fc-e-001','fc-e-002','fc-e-003','fc-e-004','fc-e-005','fc-e-006',
  'fc-m-001','fc-m-002','fc-m-003','fc-m-004','fc-m-005','fc-m-006',
  'fc-h-001','fc-h-002','fc-h-003','fc-h-004','fc-h-005',
];

/** Get the set of solved question IDs from localStorage */
export function getSolvedQuestionIds(): Set<string> {
  try {
    if (!localStorage.getItem(SOLVED_INIT_KEY)) {
      // One-time migration: seed with presolved IDs
      const existing = localStorage.getItem(SOLVED_KEY);
      const ids = existing ? JSON.parse(existing) as string[] : [];
      const merged = new Set([...ids, ...PRESOLVED_QUESTION_IDS]);
      localStorage.setItem(SOLVED_KEY, JSON.stringify([...merged]));
      localStorage.setItem(SOLVED_INIT_KEY, '1');
      return merged;
    }
    const stored = localStorage.getItem(SOLVED_KEY);
    return stored ? new Set(JSON.parse(stored) as string[]) : new Set();
  } catch {
    return new Set();
  }
}

/** Mark question IDs as solved in localStorage */
export function markQuestionsSolved(questionIds: string[]): void {
  if (questionIds.length === 0) return;
  const current = getSolvedQuestionIds();
  for (const id of questionIds) {
    current.add(id);
  }
  try {
    localStorage.setItem(SOLVED_KEY, JSON.stringify([...current]));
  } catch {
    // ignore storage errors
  }
}

/** Get questions filtered by category, difficulty, and optionally excluding solved */
export function getQuestions(opts: {
  category?: Category | 'mixed';
  difficulty?: Difficulty | 'mixed';
  count?: number;
  shuffle?: boolean;
  excludeSolvedIds?: Set<string>;
}): Question[] {
  let questions = [...allQuestions];

  if (opts.category && opts.category !== 'mixed') {
    questions = questions.filter((q) => q.category === opts.category);
  }

  if (opts.difficulty && opts.difficulty !== 'mixed') {
    questions = questions.filter((q) => q.difficulty === opts.difficulty);
  }

  if (opts.excludeSolvedIds && opts.excludeSolvedIds.size > 0) {
    questions = questions.filter((q) => !opts.excludeSolvedIds!.has(q.id));
  }

  if (opts.shuffle) {
    questions = shuffleArray(questions);
  }

  if (opts.count && opts.count > 0) {
    questions = questions.slice(0, opts.count);
  }

  return questions;
}

/** Get question counts by category and difficulty, optionally excluding solved */
export function getQuestionCounts(excludeSolvedIds?: Set<string>): Record<
  Category | 'all',
  Record<Difficulty | 'all', number>
> {
  const categories: (Category | 'all')[] = [
    'number-analogies',
    'figure-matrices',
    'figure-classification',
    'number-series',
    'number-puzzles',
    'picture-analogies',
    'picture-classification',
    'sentence-completion',
    'paper-folding',
    'all',
  ];
  const difficulties: (Difficulty | 'all')[] = ['easy', 'medium', 'hard', 'all'];

  const counts = {} as Record<Category | 'all', Record<Difficulty | 'all', number>>;

  for (const cat of categories) {
    counts[cat] = {} as Record<Difficulty | 'all', number>;
    for (const diff of difficulties) {
      const filtered = allQuestions.filter(
        (q) =>
          (cat === 'all' || q.category === cat) &&
          (diff === 'all' || q.difficulty === diff) &&
          (!excludeSolvedIds || !excludeSolvedIds.has(q.id))
      );
      counts[cat][diff] = filtered.length;
    }
  }

  return counts;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
