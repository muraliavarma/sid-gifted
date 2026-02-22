import { useState } from 'react';
import type { Category, Difficulty } from '../types';
import { CATEGORY_LABELS, CATEGORY_DESCRIPTIONS, CATEGORY_ICONS, DIFFICULTY_LABELS, DIFFICULTY_COLORS } from '../types';
import { getQuestionCounts, getSolvedQuestionIds } from '../data';

interface HomeScreenProps {
  onStartTest: (category: Category | 'mixed', difficulty: Difficulty | 'mixed', count: number, includeSolved: boolean) => void;
  onViewHistory: () => void;
}

const batteries: { label: string; categories: (Category | 'mixed')[] }[] = [
  { label: '', categories: ['mixed'] },
  {
    label: 'Verbal Battery',
    categories: ['picture-analogies', 'picture-classification', 'sentence-completion'],
  },
  {
    label: 'Quantitative Battery',
    categories: ['number-analogies', 'number-series', 'number-puzzles'],
  },
  {
    label: 'Nonverbal Battery',
    categories: ['figure-matrices', 'figure-classification', 'paper-folding'],
  },
];

const difficulties: (Difficulty | 'mixed')[] = ['mixed', 'easy', 'medium', 'hard'];

export function HomeScreen({ onStartTest, onViewHistory }: HomeScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'mixed'>('mixed');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'mixed'>('mixed');
  const [questionCount, setQuestionCount] = useState(10);
  const [includeSolved, setIncludeSolved] = useState(false);

  const solvedIds = getSolvedQuestionIds();
  const excludeIds = includeSolved ? undefined : solvedIds;
  const counts = getQuestionCounts(excludeIds);
  const totalCounts = getQuestionCounts(); // unfiltered for showing total

  const availableCount = selectedCategory === 'mixed'
    ? (selectedDifficulty === 'mixed' ? counts['all']['all'] : counts['all'][selectedDifficulty])
    : (selectedDifficulty === 'mixed' ? counts[selectedCategory]['all'] : counts[selectedCategory][selectedDifficulty]);

  const effectiveCount = Math.min(questionCount, availableCount);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '20px' }}>
      <header style={{ textAlign: 'center', marginBottom: 40 }}>
        <h1 style={{ fontSize: 32, color: '#1a237e', margin: 0 }}>
          Gifted Test Prep
        </h1>
        <p style={{ color: '#666', fontSize: 16, marginTop: 8 }}>
          CogAT-style practice for Kindergarten (Georgia Gifted Program)
        </p>
      </header>

      {/* Solved Toggle */}
      <section style={{ marginBottom: 24 }}>
        <label
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            cursor: 'pointer',
            padding: '10px 16px',
            background: includeSolved ? '#E8F5E9' : '#F5F5F5',
            border: includeSolved ? '2px solid #4CAF50' : '2px solid #e0e0e0',
            borderRadius: 10,
            transition: 'all 0.2s',
          }}
        >
          <input
            type="checkbox"
            checked={includeSolved}
            onChange={(e) => setIncludeSolved(e.target.checked)}
            style={{ width: 18, height: 18, cursor: 'pointer' }}
          />
          <span style={{ fontWeight: 600, fontSize: 14, color: '#333' }}>
            Include solved problems
          </span>
          <span style={{ fontSize: 13, color: '#888' }}>
            ({solvedIds.size} solved)
          </span>
        </label>
      </section>

      {/* Category Selection */}
      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 20, color: '#333', marginBottom: 16 }}>Choose a Category</h2>
        {batteries.map((battery) => (
          <div key={battery.label || 'mixed'} style={{ marginBottom: 16 }}>
            {battery.label && (
              <h3 style={{ fontSize: 14, color: '#888', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, marginTop: 0 }}>
                {battery.label}
              </h3>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
              {battery.categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                const icon = cat === 'mixed' ? '🎯' : CATEGORY_ICONS[cat];
                const label = cat === 'mixed' ? 'Mixed (All Categories)' : CATEGORY_LABELS[cat];
                const desc = cat === 'mixed' ? 'Questions from all categories' : CATEGORY_DESCRIPTIONS[cat];
                const count = cat === 'mixed'
                  ? counts['all'][selectedDifficulty === 'mixed' ? 'all' : selectedDifficulty]
                  : counts[cat][selectedDifficulty === 'mixed' ? 'all' : selectedDifficulty];
                const total = cat === 'mixed'
                  ? totalCounts['all'][selectedDifficulty === 'mixed' ? 'all' : selectedDifficulty]
                  : totalCounts[cat][selectedDifficulty === 'mixed' ? 'all' : selectedDifficulty];

                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      padding: '16px',
                      border: isSelected ? '3px solid #1976D2' : '2px solid #e0e0e0',
                      borderRadius: 12,
                      background: isSelected ? '#E3F2FD' : 'white',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s',
                      boxShadow: isSelected ? '0 2px 8px rgba(25,118,210,0.2)' : '0 1px 3px rgba(0,0,0,0.1)',
                    }}
                  >
                    <div style={{ fontSize: 28, marginBottom: 6 }}>{icon}</div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: '#333' }}>{label}</div>
                    <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>{desc}</div>
                    <div style={{ fontSize: 12, color: '#1976D2', marginTop: 6, fontWeight: 600 }}>
                      {count} available{!includeSolved && count !== total ? ` / ${total} total` : ''}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      {/* Difficulty Selection */}
      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 20, color: '#333', marginBottom: 16 }}>Choose Difficulty</h2>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {difficulties.map((diff) => {
            const isSelected = selectedDifficulty === diff;
            const color = diff === 'mixed' ? '#666' : DIFFICULTY_COLORS[diff];
            const label = diff === 'mixed' ? 'Mixed' : DIFFICULTY_LABELS[diff];
            const count = selectedCategory === 'mixed'
              ? (diff === 'mixed' ? counts['all']['all'] : counts['all'][diff])
              : (diff === 'mixed' ? counts[selectedCategory]['all'] : counts[selectedCategory][diff]);

            return (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                style={{
                  padding: '12px 24px',
                  border: isSelected ? `3px solid ${color}` : '2px solid #e0e0e0',
                  borderRadius: 10,
                  background: isSelected ? `${color}15` : 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  minWidth: 100,
                }}
              >
                <div style={{ fontWeight: 600, color, fontSize: 16 }}>{label}</div>
                <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>{count} Qs</div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Question Count */}
      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 20, color: '#333', marginBottom: 16 }}>Number of Questions</h2>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          {[5, 10, 15, 20].map((n) => (
            <button
              key={n}
              onClick={() => setQuestionCount(n)}
              style={{
                padding: '10px 20px',
                border: questionCount === n ? '3px solid #1976D2' : '2px solid #e0e0e0',
                borderRadius: 8,
                background: questionCount === n ? '#E3F2FD' : 'white',
                cursor: 'pointer',
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              {n}
            </button>
          ))}
          <span style={{ fontSize: 14, color: '#888' }}>
            ({availableCount} available)
          </span>
        </div>
      </section>

      {/* Start Button */}
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 40 }}>
        <button
          onClick={() => onStartTest(selectedCategory, selectedDifficulty, effectiveCount, includeSolved)}
          disabled={availableCount === 0}
          style={{
            padding: '16px 48px',
            fontSize: 20,
            fontWeight: 700,
            color: 'white',
            background: availableCount > 0
              ? 'linear-gradient(135deg, #1976D2, #1565C0)'
              : '#bdbdbd',
            border: 'none',
            borderRadius: 14,
            cursor: availableCount > 0 ? 'pointer' : 'not-allowed',
            boxShadow: availableCount > 0 ? '0 4px 12px rgba(25,118,210,0.3)' : 'none',
            transition: 'all 0.2s',
          }}
        >
          Start Test ({effectiveCount} questions)
        </button>
        <button
          onClick={onViewHistory}
          style={{
            padding: '16px 32px',
            fontSize: 16,
            fontWeight: 600,
            color: '#666',
            background: 'white',
            border: '2px solid #e0e0e0',
            borderRadius: 14,
            cursor: 'pointer',
          }}
        >
          View History
        </button>
      </div>

      {/* Info Banner */}
      <div style={{
        marginTop: 40,
        padding: 20,
        background: '#FFF8E1',
        borderRadius: 12,
        border: '1px solid #FFE082',
      }}>
        <h3 style={{ margin: '0 0 8px', color: '#F57F17', fontSize: 16 }}>About This Test</h3>
        <p style={{ margin: 0, fontSize: 14, color: '#666', lineHeight: 1.6 }}>
          This practice test mirrors the <strong>CogAT (Cognitive Abilities Test)</strong> format
          used in Georgia's gifted screening program. Questions are picture-based and designed for
          kindergarteners (age 5-6). <strong>Read the questions aloud</strong> to your child and
          let them pick the answer.
        </p>
      </div>
    </div>
  );
}
