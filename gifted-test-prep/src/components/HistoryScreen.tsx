import type { TestResult, Category } from '../types';
import { CATEGORY_ICONS } from '../types';

interface HistoryScreenProps {
  onGoHome: () => void;
}

export function HistoryScreen({ onGoHome }: HistoryScreenProps) {
  let history: TestResult[] = [];
  try {
    history = JSON.parse(localStorage.getItem('test-history') || '[]');
  } catch {
    // Ignore
  }

  const clearHistory = () => {
    if (confirm('Clear all test history?')) {
      localStorage.removeItem('test-history');
      window.location.reload();
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
        <button
          onClick={onGoHome}
          style={{
            padding: '8px 16px',
            border: '2px solid #e0e0e0',
            borderRadius: 8,
            background: 'white',
            cursor: 'pointer',
            fontSize: 14,
            color: '#666',
          }}
        >
          ← Back
        </button>
        <h1 style={{ margin: 0, fontSize: 24, color: '#333' }}>Test History</h1>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            style={{
              padding: '8px 16px',
              border: '2px solid #FFCDD2',
              borderRadius: 8,
              background: '#FFF5F5',
              cursor: 'pointer',
              fontSize: 14,
              color: '#E53935',
            }}
          >
            Clear
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: 60,
          color: '#999',
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📝</div>
          <p style={{ fontSize: 18 }}>No test history yet.</p>
          <p style={{ fontSize: 14 }}>Complete a test to see results here!</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 14 }}>
          {[...history].reverse().map((result, i) => (
            <div
              key={i}
              style={{
                padding: '18px 20px',
                background: 'white',
                borderRadius: 14,
                border: '2px solid #f0f0f0',
                boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontSize: 13, color: '#999' }}>
                  {formatDate(result.completedAt)}
                </span>
                <span style={{
                  fontSize: 24,
                  fontWeight: 800,
                  color: result.score >= 70 ? '#4CAF50' : result.score >= 50 ? '#FF9800' : '#f44336',
                }}>
                  {result.score}%
                </span>
              </div>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: 14, color: '#666' }}>
                <span>{result.correctAnswers}/{result.totalQuestions} correct</span>
                <span>•</span>
                <span>{formatTime(result.timeSpent)}</span>
              </div>
              {result.categoryBreakdown && (
                <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
                  {Object.entries(result.categoryBreakdown).map(([cat, data]) => (
                    <span
                      key={cat}
                      style={{
                        padding: '2px 8px',
                        background: '#F5F5F5',
                        borderRadius: 6,
                        fontSize: 12,
                        color: '#888',
                      }}
                    >
                      {CATEGORY_ICONS[cat as Category]} {data.correct}/{data.total}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
