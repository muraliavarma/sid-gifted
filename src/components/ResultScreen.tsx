import { useEffect, useRef } from 'react';
import type { Question, Category, TestResult } from '../types';
import { CATEGORY_LABELS, CATEGORY_ICONS } from '../types';
import { markQuestionsSolved } from '../data';

interface ResultScreenProps {
  questions: Question[];
  answers: Record<string, string>;
  startTime: number;
  onGoHome: () => void;
  onRetry: () => void;
}

export function ResultScreen({ questions, answers, startTime, onGoHome, onRetry }: ResultScreenProps) {
  const savedRef = useRef(false);

  const totalQuestions = questions.length;
  const correctAnswers = questions.filter((q) => answers[q.id] === q.correctAnswerId).length;
  const score = Math.round((correctAnswers / totalQuestions) * 100);
  const timeSpent = Math.round((Date.now() - startTime) / 1000);

  // Category breakdown
  const categoryBreakdown: Record<string, { total: number; correct: number }> = {};
  questions.forEach((q) => {
    if (!categoryBreakdown[q.category]) {
      categoryBreakdown[q.category] = { total: 0, correct: 0 };
    }
    categoryBreakdown[q.category].total++;
    if (answers[q.id] === q.correctAnswerId) {
      categoryBreakdown[q.category].correct++;
    }
  });

  // Save to localStorage and mark solved (once)
  useEffect(() => {
    if (savedRef.current) return;
    savedRef.current = true;

    // Mark correctly answered questions as solved
    const correctIds = questions
      .filter((q) => answers[q.id] === q.correctAnswerId)
      .map((q) => q.id);
    markQuestionsSolved(correctIds);

    // Save test result
    const result: TestResult = {
      sessionId: `session-${Date.now()}`,
      totalQuestions,
      correctAnswers,
      score,
      timeSpent,
      categoryBreakdown: categoryBreakdown as Record<Category, { total: number; correct: number }>,
      completedAt: Date.now(),
    };

    try {
      const history = JSON.parse(localStorage.getItem('test-history') || '[]');
      history.push(result);
      localStorage.setItem('test-history', JSON.stringify(history));
    } catch {
      // Ignore
    }
  }, []);

  const getScoreEmoji = () => {
    if (score >= 90) return '🌟';
    if (score >= 70) return '🎉';
    if (score >= 50) return '👍';
    return '💪';
  };

  const getScoreMessage = () => {
    if (score >= 90) return 'Outstanding! Your child is a star!';
    if (score >= 70) return 'Great job! Keep practicing!';
    if (score >= 50) return 'Good effort! Room to grow!';
    return 'Keep practicing, you\'ll get there!';
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '20px' }}>
      {/* Score Header */}
      <div style={{
        textAlign: 'center',
        padding: '40px 20px',
        background: score >= 70
          ? 'linear-gradient(135deg, #E8F5E9, #C8E6C9)'
          : 'linear-gradient(135deg, #FFF3E0, #FFE0B2)',
        borderRadius: 20,
        marginBottom: 30,
      }}>
        <div style={{ fontSize: 64 }}>{getScoreEmoji()}</div>
        <div style={{ fontSize: 48, fontWeight: 800, color: score >= 70 ? '#2E7D32' : '#E65100' }}>
          {score}%
        </div>
        <div style={{ fontSize: 20, color: '#555', marginTop: 8 }}>
          {correctAnswers} out of {totalQuestions} correct
        </div>
        <div style={{ fontSize: 16, color: '#888', marginTop: 8 }}>
          {getScoreMessage()}
        </div>
        <div style={{ fontSize: 14, color: '#aaa', marginTop: 8 }}>
          Time: {formatTime(timeSpent)}
        </div>
      </div>

      {/* Category Breakdown */}
      <div style={{ marginBottom: 30 }}>
        <h2 style={{ fontSize: 20, color: '#333', marginBottom: 16 }}>Category Breakdown</h2>
        <div style={{ display: 'grid', gap: 10 }}>
          {Object.entries(categoryBreakdown).map(([cat, data]) => {
            const catScore = Math.round((data.correct / data.total) * 100);
            return (
              <div
                key={cat}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '14px 18px',
                  background: 'white',
                  borderRadius: 12,
                  border: '2px solid #f0f0f0',
                  gap: 14,
                }}
              >
                <span style={{ fontSize: 24 }}>{CATEGORY_ICONS[cat as Category]}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: '#333' }}>
                    {CATEGORY_LABELS[cat as Category]}
                  </div>
                  <div style={{
                    height: 6,
                    background: '#E0E0E0',
                    borderRadius: 3,
                    marginTop: 6,
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${catScore}%`,
                      background: catScore >= 70 ? '#4CAF50' : catScore >= 50 ? '#FF9800' : '#f44336',
                      borderRadius: 3,
                    }} />
                  </div>
                </div>
                <div style={{
                  fontWeight: 700,
                  fontSize: 16,
                  color: catScore >= 70 ? '#4CAF50' : catScore >= 50 ? '#FF9800' : '#f44336',
                }}>
                  {data.correct}/{data.total}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Question Review */}
      <div style={{ marginBottom: 30 }}>
        <h2 style={{ fontSize: 20, color: '#333', marginBottom: 16 }}>Question Review</h2>
        <div style={{ display: 'grid', gap: 8 }}>
          {questions.map((q, i) => {
            const userAnswer = answers[q.id];
            const isQCorrect = userAnswer === q.correctAnswerId;
            const userOption = q.options.find((o) => o.id === userAnswer);
            const correctOption = q.options.find((o) => o.id === q.correctAnswerId);

            return (
              <div
                key={q.id}
                style={{
                  padding: '12px 16px',
                  background: isQCorrect ? '#F1F8E9' : '#FFF3E0',
                  borderRadius: 10,
                  borderLeft: `4px solid ${isQCorrect ? '#4CAF50' : '#FF9800'}`,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 14, color: '#666' }}>
                    #{i + 1} {CATEGORY_LABELS[q.category]} {q.difficulty}
                  </span>
                  <span style={{ fontSize: 18 }}>{isQCorrect ? '✓' : '✗'}</span>
                </div>
                {!isQCorrect && (
                  <div style={{ fontSize: 13, color: '#888', marginTop: 6 }}>
                    Your answer: <strong style={{ color: '#E65100' }}>{userOption?.label}</strong>
                    {' → '}
                    Correct: <strong style={{ color: '#2E7D32' }}>{correctOption?.label}</strong>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
        <button
          onClick={onRetry}
          style={{
            padding: '14px 36px',
            fontSize: 17,
            fontWeight: 700,
            color: 'white',
            background: 'linear-gradient(135deg, #1976D2, #1565C0)',
            border: 'none',
            borderRadius: 12,
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(25,118,210,0.3)',
          }}
        >
          Try Again
        </button>
        <button
          onClick={onGoHome}
          style={{
            padding: '14px 36px',
            fontSize: 17,
            fontWeight: 600,
            color: '#666',
            background: 'white',
            border: '2px solid #e0e0e0',
            borderRadius: 12,
            cursor: 'pointer',
          }}
        >
          Home
        </button>
      </div>
    </div>
  );
}
