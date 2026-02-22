import { useState, useCallback } from 'react';
import type { Category, Difficulty } from './types';
import type { Question } from './types';
import { getQuestions, getSolvedQuestionIds } from './data';
import { HomeScreen } from './components/HomeScreen';
import { TestScreen } from './components/TestScreen';
import { ResultScreen } from './components/ResultScreen';
import { HistoryScreen } from './components/HistoryScreen';

type Screen = 'home' | 'test' | 'results' | 'history';

function App() {
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
