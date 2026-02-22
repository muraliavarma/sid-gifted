import { useState, useCallback, useMemo } from 'react';
import type { Category, Difficulty } from './types';
import type { Question } from './types';
import { CATEGORY_LABELS, DIFFICULTY_COLORS } from './types';
import { allQuestions, getQuestions, getSolvedQuestionIds } from './data';
import { HomeScreen } from './components/HomeScreen';
import { TestScreen } from './components/TestScreen';
import { ResultScreen } from './components/ResultScreen';
import { HistoryScreen } from './components/HistoryScreen';

function DebugView({ category }: { category: string }) {
  const questions = useMemo(
    () => allQuestions.filter((q) => q.category === category),
    [category]
  );

  if (questions.length === 0) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <h2>No questions found for category: {category}</h2>
        <p>Valid categories: {Object.keys(CATEGORY_LABELS).join(', ')}</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 20 }}>
      <h1 style={{ fontSize: 24, color: '#1a237e' }}>
        Debug: {CATEGORY_LABELS[category as Category] ?? category} ({questions.length} questions)
      </h1>
      {questions.map((q, i) => (
        <div
          key={q.id}
          style={{
            border: '1px solid #ddd',
            borderRadius: 12,
            padding: 20,
            marginBottom: 20,
            background: '#fff',
          }}
        >
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontWeight: 700, fontSize: 16 }}>#{i + 1}</span>
            <span style={{ fontSize: 13, color: '#888' }}>{q.id}</span>
            <span
              style={{
                fontSize: 12,
                padding: '2px 8px',
                borderRadius: 6,
                color: '#fff',
                background: DIFFICULTY_COLORS[q.difficulty],
              }}
            >
              {q.difficulty}
            </span>
          </div>
          <p style={{ fontSize: 14, color: '#333', margin: '8px 0' }}>{q.prompt}</p>
          {q.visual && (
            <div
              style={{ maxWidth: 500, margin: '12px 0' }}
              dangerouslySetInnerHTML={{ __html: q.visual }}
            />
          )}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, maxWidth: 500 }}>
            {q.options.map((opt) => (
              <div
                key={opt.id}
                style={{
                  border: opt.id === q.correctAnswerId ? '3px solid #4CAF50' : '1px solid #ddd',
                  borderRadius: 8,
                  padding: 8,
                  background: opt.id === q.correctAnswerId ? '#E8F5E9' : '#fafafa',
                  textAlign: 'center',
                }}
              >
                {opt.visual && (
                  <div dangerouslySetInnerHTML={{ __html: opt.visual }} style={{ maxWidth: 100, margin: '0 auto' }} />
                )}
                <div style={{ fontSize: 12, color: '#555' }}>
                  {opt.id.toUpperCase()}: {opt.label}
                  {opt.id === q.correctAnswerId && ' ✓'}
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: '#666', marginTop: 8, fontStyle: 'italic' }}>
            {q.explanation}
          </p>
        </div>
      ))}
    </div>
  );
}

type Screen = 'home' | 'test' | 'results' | 'history';

function App() {
  const debugCategory = new URLSearchParams(window.location.search).get('debug');

  const [screen, setScreen] = useState<Screen>('home');
  const [testQuestions, setTestQuestions] = useState<Question[]>([]);
  const [testAnswers, setTestAnswers] = useState<Record<string, string>>({});
  const [testStartTime, setTestStartTime] = useState(0);

  const handleStartTest = useCallback(
    (category: Category | 'mixed', difficulty: Difficulty | 'mixed', count: number, includeSolved: boolean) => {
      const excludeSolvedIds = includeSolved ? undefined : getSolvedQuestionIds();
      const questions = getQuestions({ category, difficulty, count, shuffle: true, excludeSolvedIds });
      if (questions.length === 0) return;
      setTestQuestions(questions);
      setTestAnswers({});
      setTestStartTime(Date.now());
      setScreen('test');
    },
    []
  );

  const handleCompleteTest = useCallback((answers: Record<string, string>) => {
    setTestAnswers(answers);
    setScreen('results');
  }, []);

  const handleRetry = useCallback(() => {
    setTestAnswers({});
    setTestStartTime(Date.now());
    setScreen('test');
  }, []);

  if (debugCategory) {
    return (
      <div style={{ minHeight: '100vh', background: '#f8f9fa', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
        <DebugView category={debugCategory} />
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f8f9fa',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {screen === 'home' && (
        <HomeScreen
          onStartTest={handleStartTest}
          onViewHistory={() => setScreen('history')}
        />
      )}
      {screen === 'test' && (
        <TestScreen
          questions={testQuestions}
          onComplete={handleCompleteTest}
          onQuit={() => setScreen('home')}
        />
      )}
      {screen === 'results' && (
        <ResultScreen
          questions={testQuestions}
          answers={testAnswers}
          startTime={testStartTime}
          onGoHome={() => setScreen('home')}
          onRetry={handleRetry}
        />
      )}
      {screen === 'history' && (
        <HistoryScreen onGoHome={() => setScreen('home')} />
      )}
    </div>
  );
}

export default App;
