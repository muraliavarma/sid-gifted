import type { Question, Category, Difficulty } from '../types';
import { numberAnalogies } from './numberAnalogies';
import { numberSeries } from './numberSeries';
import { numberPuzzles } from './numberPuzzles';
import { figureMatrices } from './figureMatrices';
import { figureClassification } from './figureClassification';

/** All questions combined */
export const allQuestions: Question[] = [
  ...numberAnalogies,
  ...numberSeries,
  ...numberPuzzles,
  ...figureMatrices,
  ...figureClassification,
];

/** Get questions filtered by category and/or difficulty */
export function getQuestions(opts: {
  category?: Category | 'mixed';
  difficulty?: Difficulty | 'mixed';
  count?: number;
  shuffle?: boolean;
}): Question[] {
  let questions = [...allQuestions];

  if (opts.category && opts.category !== 'mixed') {
    questions = questions.filter((q) => q.category === opts.category);
  }

  if (opts.difficulty && opts.difficulty !== 'mixed') {
    questions = questions.filter((q) => q.difficulty === opts.difficulty);
  }

  if (opts.shuffle) {
    questions = shuffleArray(questions);
  }

  if (opts.count && opts.count > 0) {
    questions = questions.slice(0, opts.count);
  }

  return questions;
}

/** Get question counts by category and difficulty */
export function getQuestionCounts(): Record<
  Category | 'all',
  Record<Difficulty | 'all', number>
> {
  const categories: (Category | 'all')[] = [
    'number-analogies',
    'figure-matrices',
    'figure-classification',
    'number-series',
    'number-puzzles',
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
          (diff === 'all' || q.difficulty === diff)
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
