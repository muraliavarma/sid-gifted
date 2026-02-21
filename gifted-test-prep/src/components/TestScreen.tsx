import { useState, useCallback } from 'react';
import type { Question } from '../types';
import { CATEGORY_LABELS, CATEGORY_ICONS, DIFFICULTY_COLORS } from '../types';

interface TestScreenProps {
  questions: Question[];
  onComplete: (answers: Record<string, string>) => void;
  onQuit: () => void;
}

export function TestScreen({ questions, onComplete, onQuit }: TestScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const question = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const isCorrect = selectedOption === question.correctAnswerId;
  const progress = ((currentIndex + (showResult ? 1 : 0)) / questions.length) * 100;

  const handleSelectOption = useCallback((optionId: string) => {
    if (showResult) return;
    setSelectedOption(optionId);
  }, [showResult]);

  const handleSubmit = useCallback(() => {
    if (!selectedOption) return;
    setAnswers((prev) => ({ ...prev, [question.id]: selectedOption }));
    setShowResult(true);
  }, [selectedOption, question.id]);

  const handleNext = useCallback(() => {
    if (isLastQuestion) {
      const finalAnswers = { ...answers, [question.id]: selectedOption! };
      onComplete(finalAnswers);
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setShowResult(false);
      setShowHint(false);
    }
  }, [isLastQuestion, answers, question.id, selectedOption, onComplete]);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '16px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <button
          onClick={onQuit}
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
          Quit
        </button>
        <div style={{ fontSize: 16, fontWeight: 600, color: '#333' }}>
          Question {currentIndex + 1} of {questions.length}
        </div>
        <div style={{
          padding: '4px 12px',
          borderRadius: 6,
          background: `${DIFFICULTY_COLORS[question.difficulty]}20`,
          color: DIFFICULTY_COLORS[question.difficulty],
          fontWeight: 600,
          fontSize: 13,
        }}>
          {question.difficulty.toUpperCase()}
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ height: 8, background: '#E0E0E0', borderRadius: 4, marginBottom: 20, overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #4CAF50, #66BB6A)',
          borderRadius: 4,
          transition: 'width 0.4s ease',
        }} />
      </div>

      {/* Category Tag */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '4px 12px',
        background: '#F5F5F5',
        borderRadius: 20,
        fontSize: 13,
        color: '#666',
        marginBottom: 16,
      }}>
        {CATEGORY_ICONS[question.category]} {CATEGORY_LABELS[question.category]}
      </div>

      {/* Question Prompt */}
      <div style={{
        padding: 20,
        background: '#E3F2FD',
        borderRadius: 14,
        marginBottom: 20,
        border: '2px solid #BBDEFB',
      }}>
        <div style={{ fontSize: 12, color: '#1976D2', marginBottom: 6, fontWeight: 600 }}>
          READ ALOUD TO YOUR CHILD:
        </div>
        <p style={{ fontSize: 20, color: '#1a237e', margin: 0, fontWeight: 600, lineHeight: 1.5 }}>
          {question.prompt}
        </p>
      </div>

      {/* Visual */}
      {question.visual && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: 24,
          padding: 16,
          background: 'white',
          borderRadius: 14,
          border: '2px solid #e0e0e0',
        }}>
          <div
            style={{ maxWidth: '100%', width: 400 }}
            dangerouslySetInnerHTML={{ __html: question.visual }}
          />
        </div>
      )}

      {/* Hint */}
      {question.hint && !showResult && (
        <div style={{ marginBottom: 16, textAlign: 'center' }}>
          {showHint ? (
            <div style={{
              padding: 14,
              background: '#FFF8E1',
              borderRadius: 10,
              border: '1px solid #FFE082',
              fontSize: 15,
              color: '#F57F17',
            }}>
              💡 {question.hint}
            </div>
          ) : (
            <button
              onClick={() => setShowHint(true)}
              style={{
                padding: '8px 20px',
                border: '1px solid #FFE082',
                borderRadius: 8,
                background: '#FFFDE7',
                cursor: 'pointer',
                fontSize: 14,
                color: '#F57F17',
              }}
            >
              Need a hint? 💡
            </button>
          )}
        </div>
      )}

      {/* Options */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 24 }}>
        {question.options.map((option) => {
          const isSelected = selectedOption === option.id;
          const isCorrectOption = option.id === question.correctAnswerId;

          let borderColor = '#e0e0e0';
          let bgColor = 'white';
          let textColor = '#333';

          if (showResult) {
            if (isCorrectOption) {
              borderColor = '#4CAF50';
              bgColor = '#E8F5E9';
              textColor = '#2E7D32';
            } else if (isSelected && !isCorrectOption) {
              borderColor = '#f44336';
              bgColor = '#FFEBEE';
              textColor = '#C62828';
            }
          } else if (isSelected) {
            borderColor = '#1976D2';
            bgColor = '#E3F2FD';
            textColor = '#1565C0';
          }

          return (
            <button
              key={option.id}
              onClick={() => handleSelectOption(option.id)}
              style={{
                padding: '16px',
                border: `3px solid ${borderColor}`,
                borderRadius: 12,
                background: bgColor,
                cursor: showResult ? 'default' : 'pointer',
                textAlign: 'center',
                transition: 'all 0.2s',
                fontSize: 17,
                fontWeight: 600,
                color: textColor,
                position: 'relative',
              }}
            >
              <span style={{
                position: 'absolute',
                top: 6,
                left: 10,
                fontSize: 13,
                color: '#999',
                fontWeight: 400,
              }}>
                {option.id.toUpperCase()}
              </span>
              {option.label}
              {showResult && isCorrectOption && (
                <span style={{ marginLeft: 8 }}>✓</span>
              )}
              {showResult && isSelected && !isCorrectOption && (
                <span style={{ marginLeft: 8 }}>✗</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Result/Explanation */}
      {showResult && (
        <div style={{
          padding: 20,
          borderRadius: 14,
          marginBottom: 20,
          background: isCorrect ? '#E8F5E9' : '#FFF3E0',
          border: `2px solid ${isCorrect ? '#A5D6A7' : '#FFE0B2'}`,
        }}>
          <div style={{
            fontSize: 20,
            fontWeight: 700,
            marginBottom: 8,
            color: isCorrect ? '#2E7D32' : '#E65100',
          }}>
            {isCorrect ? '🎉 Correct!' : '😊 Not quite!'}
          </div>
          <p style={{ margin: 0, fontSize: 15, color: '#555', lineHeight: 1.6 }}>
            {question.explanation}
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
        {!showResult ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedOption}
            style={{
              padding: '14px 48px',
              fontSize: 18,
              fontWeight: 700,
              color: 'white',
              background: selectedOption
                ? 'linear-gradient(135deg, #1976D2, #1565C0)'
                : '#bdbdbd',
              border: 'none',
              borderRadius: 12,
              cursor: selectedOption ? 'pointer' : 'not-allowed',
              boxShadow: selectedOption ? '0 4px 12px rgba(25,118,210,0.3)' : 'none',
            }}
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            style={{
              padding: '14px 48px',
              fontSize: 18,
              fontWeight: 700,
              color: 'white',
              background: 'linear-gradient(135deg, #4CAF50, #388E3C)',
              border: 'none',
              borderRadius: 12,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(76,175,80,0.3)',
            }}
          >
            {isLastQuestion ? 'See Results' : 'Next Question →'}
          </button>
        )}
      </div>
    </div>
  );
}
