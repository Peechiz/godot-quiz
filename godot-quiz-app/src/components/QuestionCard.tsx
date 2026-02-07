import { useState, type CSSProperties } from 'react';
import type { Question } from '../data/questions';
import CodeBlock from './CodeBlock';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (index: number) => void;
  onNext: () => void;
  selectedAnswer: number | null;
  showFeedback: boolean;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: '#4caf50',
  medium: '#ff9800',
  hard: '#f44336',
};

const TYPE_LABELS: Record<string, string> = {
  'multiple-choice': 'Multiple Choice',
  'code-fill': 'Code Fill',
  debug: 'Debug',
  scenario: 'Scenario',
};

export default function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  onNext,
  selectedAnswer,
  showFeedback,
}: QuestionCardProps) {
  const [hoveredOption, setHoveredOption] = useState<number | null>(null);

  const isCorrect = selectedAnswer === question.correctAnswer;

  function getOptionStyle(index: number): CSSProperties {
    const isSelected = selectedAnswer === index;
    const isRight = index === question.correctAnswer;
    const isHovered = hoveredOption === index && !showFeedback;

    let bg = '#16213e';
    let border = '2px solid #2a2a50';
    let color = '#e0e0e0';

    if (showFeedback) {
      if (isRight) {
        bg = 'rgba(76,175,80,0.15)';
        border = '2px solid #4caf50';
        color = '#4caf50';
      } else if (isSelected && !isRight) {
        bg = 'rgba(244,67,54,0.15)';
        border = '2px solid #f44336';
        color = '#f44336';
      } else {
        bg = '#16213e';
        border = '2px solid #1e2a45';
        color = '#6a6a8a';
      }
    } else if (isHovered) {
      bg = '#1e2a45';
      border = '2px solid #478cbf';
    }

    return {
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      padding: '14px 18px',
      borderRadius: '10px',
      backgroundColor: bg,
      border,
      color,
      cursor: showFeedback ? 'default' : 'pointer',
      transition: 'all 0.2s ease',
      fontSize: '1rem',
      lineHeight: '1.5',
      textAlign: 'left',
      width: '100%',
      fontFamily: 'inherit',
      fontWeight: 500,
      animation: `slideInLeft 0.3s ease-out ${index * 0.08}s both`,
    };
  }

  function getLetterBadgeStyle(index: number): CSSProperties {
    const isRight = index === question.correctAnswer;
    const isSelected = selectedAnswer === index;
    let bg = '#2a2a50';
    let clr = '#a0a0b8';

    if (showFeedback) {
      if (isRight) {
        bg = '#4caf50';
        clr = '#fff';
      } else if (isSelected) {
        bg = '#f44336';
        clr = '#fff';
      }
    }

    return {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      backgroundColor: bg,
      color: clr,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 700,
      fontSize: '0.85rem',
      flexShrink: 0,
      transition: 'all 0.2s ease',
    };
  }

  return (
    <div style={cardStyle}>
      {/* Header badges */}
      <div style={badgeRowStyle}>
        <span style={questionNumStyle}>
          {questionNumber}/{totalQuestions}
        </span>
        <span
          style={{
            ...diffBadgeStyle,
            backgroundColor: `${DIFFICULTY_COLORS[question.difficulty]}22`,
            color: DIFFICULTY_COLORS[question.difficulty],
            borderColor: DIFFICULTY_COLORS[question.difficulty],
          }}
        >
          {question.difficulty.charAt(0).toUpperCase() +
            question.difficulty.slice(1)}
        </span>
        <span style={lessonBadgeStyle}>{question.lesson}</span>
        <span style={typeBadgeStyle}>
          {TYPE_LABELS[question.type] ?? question.type}
        </span>
      </div>

      {/* Title */}
      <h2 style={titleStyle}>{question.title}</h2>

      {/* Question text */}
      <p style={questionTextStyle}>{question.question}</p>

      {/* Code snippet */}
      {question.codeSnippet && <CodeBlock code={question.codeSnippet} />}

      {/* Options */}
      <div style={optionsContainerStyle}>
        {question.options.map((option, i) => (
          <button
            key={i}
            style={getOptionStyle(i)}
            onClick={() => {
              if (!showFeedback) onAnswer(i);
            }}
            onMouseEnter={() => setHoveredOption(i)}
            onMouseLeave={() => setHoveredOption(null)}
            disabled={showFeedback}
          >
            <span style={getLetterBadgeStyle(i)}>{OPTION_LETTERS[i]}</span>
            <span>{option}</span>
          </button>
        ))}
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div style={feedbackContainerStyle}>
          <div
            style={{
              ...feedbackBannerStyle,
              backgroundColor: isCorrect
                ? 'rgba(76,175,80,0.12)'
                : 'rgba(244,67,54,0.12)',
              borderLeft: `4px solid ${isCorrect ? '#4caf50' : '#f44336'}`,
            }}
          >
            <span style={feedbackIconStyle}>
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </span>
            <p style={explanationStyle}>{question.explanation}</p>
            {question.funFact && (
              <p style={funFactStyle}>
                <strong>Fun fact:</strong> {question.funFact}
              </p>
            )}
          </div>

          <button
            onClick={onNext}
            style={nextBtnStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#3a7aaa';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#478cbf';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {questionNumber < totalQuestions
              ? 'Next Question'
              : 'See Results'}
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------- styles ---------- */

const cardStyle: CSSProperties = {
  backgroundColor: '#16213e',
  borderRadius: '16px',
  padding: '32px',
  border: '1px solid #2a2a50',
  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
  animation: 'slideUp 0.4s ease-out',
};

const badgeRowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  marginBottom: '16px',
  flexWrap: 'wrap',
};

const questionNumStyle: CSSProperties = {
  color: '#6a6a8a',
  fontSize: '0.85rem',
  fontWeight: 600,
};

const diffBadgeStyle: CSSProperties = {
  fontSize: '0.75rem',
  fontWeight: 700,
  padding: '3px 10px',
  borderRadius: '20px',
  border: '1px solid',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
};

const lessonBadgeStyle: CSSProperties = {
  fontSize: '0.75rem',
  fontWeight: 700,
  padding: '3px 10px',
  borderRadius: '20px',
  backgroundColor: 'rgba(71,140,191,0.15)',
  color: '#478cbf',
  border: '1px solid #478cbf',
  letterSpacing: '0.5px',
};

const typeBadgeStyle: CSSProperties = {
  fontSize: '0.75rem',
  fontWeight: 600,
  padding: '3px 10px',
  borderRadius: '20px',
  backgroundColor: 'rgba(160,160,184,0.1)',
  color: '#a0a0b8',
  border: '1px solid #3a3a5a',
};

const titleStyle: CSSProperties = {
  fontSize: '1.4rem',
  fontWeight: 700,
  color: '#e0e0e0',
  margin: '0 0 12px',
};

const questionTextStyle: CSSProperties = {
  fontSize: '1.05rem',
  color: '#c0c0d8',
  lineHeight: '1.65',
  margin: '0 0 20px',
};

const optionsContainerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  marginTop: '8px',
};

const feedbackContainerStyle: CSSProperties = {
  marginTop: '24px',
  animation: 'fadeIn 0.4s ease-out',
};

const feedbackBannerStyle: CSSProperties = {
  borderRadius: '10px',
  padding: '20px',
  marginBottom: '20px',
};

const feedbackIconStyle: CSSProperties = {
  fontSize: '1.1rem',
  fontWeight: 700,
  display: 'block',
  marginBottom: '10px',
};

const explanationStyle: CSSProperties = {
  fontSize: '0.95rem',
  color: '#c0c0d8',
  lineHeight: '1.6',
  margin: 0,
};

const funFactStyle: CSSProperties = {
  fontSize: '0.88rem',
  color: '#8ab4d6',
  lineHeight: '1.5',
  marginTop: '12px',
  marginBottom: 0,
  paddingTop: '12px',
  borderTop: '1px solid rgba(255,255,255,0.08)',
};

const nextBtnStyle: CSSProperties = {
  backgroundColor: '#478cbf',
  color: '#fff',
  border: 'none',
  borderRadius: '10px',
  padding: '12px 32px',
  fontSize: '1rem',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  width: '100%',
  fontFamily: 'inherit',
};
