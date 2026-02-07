import { useMemo, type CSSProperties } from 'react';
import type { Question } from '../data/questions';

interface ResultsScreenProps {
  score: number;
  totalQuestions: number;
  questions: Question[];
  answers: (number | null)[];
  onRestart: () => void;
}

interface Tally {
  total: number;
  correct: number;
}

function getTier(pct: number): { title: string; color: string; message: string } {
  if (pct >= 90) {
    return {
      title: 'Godot Master',
      color: '#ffd700',
      message:
        'Incredible! You have mastered the Godot engine. Time to build your dream game!',
    };
  }
  if (pct >= 70) {
    return {
      title: 'Scene Tree Sage',
      color: '#4caf50',
      message:
        'Great job! You have a solid understanding of Godot. A little more practice and you will be a master.',
    };
  }
  if (pct >= 50) {
    return {
      title: 'Node Novice',
      color: '#ff9800',
      message:
        'Not bad! You know the basics. Review the lessons you missed and try again to level up.',
    };
  }
  return {
    title: 'Keep Learning!',
    color: '#f44336',
    message:
      'Every master was once a beginner. Review the lessons and give it another shot -- you will improve!',
  };
}

const LESSON_NAMES: Record<string, string> = {
  L01: 'Scene Tree & Nodes',
  L02: 'Signals',
  L03: 'Instancing & Scenes',
  L04: 'Collisions & Physics',
  L05: 'Game Systems',
  advanced: 'Advanced',
};

const DIFFICULTY_ORDER = ['easy', 'medium', 'hard'] as const;
const DIFF_COLORS: Record<string, string> = {
  easy: '#4caf50',
  medium: '#ff9800',
  hard: '#f44336',
};

export default function ResultsScreen({
  score,
  totalQuestions,
  questions,
  answers,
  onRestart,
}: ResultsScreenProps) {
  const pct = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  const tier = getTier(pct);

  const lessonBreakdown = useMemo(() => {
    const map: Record<string, Tally> = {};
    questions.forEach((q, i) => {
      if (!map[q.lesson]) map[q.lesson] = { total: 0, correct: 0 };
      map[q.lesson].total++;
      if (answers[i] === q.correctAnswer) map[q.lesson].correct++;
    });
    return map;
  }, [questions, answers]);

  const diffBreakdown = useMemo(() => {
    const map: Record<string, Tally> = {};
    questions.forEach((q, i) => {
      if (!map[q.difficulty]) map[q.difficulty] = { total: 0, correct: 0 };
      map[q.difficulty].total++;
      if (answers[i] === q.correctAnswer) map[q.difficulty].correct++;
    });
    return map;
  }, [questions, answers]);

  return (
    <div style={containerStyle}>
      {/* Score */}
      <div style={scoreCircleStyle}>
        <span style={scoreNumStyle}>{score}</span>
        <span style={scoreDividerStyle}>/ {totalQuestions}</span>
      </div>
      <p style={pctTextStyle}>{pct}% Correct</p>

      {/* Tier */}
      <h2 style={{ ...tierTitleStyle, color: tier.color }}>{tier.title}</h2>
      <p style={tierMsgStyle}>{tier.message}</p>

      {/* Lesson breakdown */}
      <div style={sectionStyle}>
        <h3 style={sectionHeadingStyle}>By Lesson</h3>
        <div style={breakdownGridStyle}>
          {Object.entries(lessonBreakdown).map(([lesson, tally]) => {
            const lPct =
              tally.total > 0
                ? Math.round((tally.correct / tally.total) * 100)
                : 0;
            return (
              <div key={lesson} style={breakdownCardStyle}>
                <div style={breakdownLabelRowStyle}>
                  <span style={breakdownLabelStyle}>{lesson}</span>
                  <span style={breakdownSubLabelStyle}>
                    {LESSON_NAMES[lesson] ?? ''}
                  </span>
                </div>
                <div style={miniBarTrackStyle}>
                  <div
                    style={{
                      ...miniBarFillStyle,
                      width: `${lPct}%`,
                      backgroundColor:
                        lPct >= 80
                          ? '#4caf50'
                          : lPct >= 50
                            ? '#ff9800'
                            : '#f44336',
                    }}
                  />
                </div>
                <span style={breakdownScoreStyle}>
                  {tally.correct}/{tally.total}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Difficulty breakdown */}
      <div style={sectionStyle}>
        <h3 style={sectionHeadingStyle}>By Difficulty</h3>
        <div style={breakdownGridStyle}>
          {DIFFICULTY_ORDER.map((diff) => {
            const tally = diffBreakdown[diff];
            if (!tally) return null;
            const dPct =
              tally.total > 0
                ? Math.round((tally.correct / tally.total) * 100)
                : 0;
            return (
              <div key={diff} style={breakdownCardStyle}>
                <div style={breakdownLabelRowStyle}>
                  <span
                    style={{
                      ...diffDotStyle,
                      backgroundColor: DIFF_COLORS[diff],
                    }}
                  />
                  <span style={breakdownLabelStyle}>
                    {diff.charAt(0).toUpperCase() + diff.slice(1)}
                  </span>
                </div>
                <div style={miniBarTrackStyle}>
                  <div
                    style={{
                      ...miniBarFillStyle,
                      width: `${dPct}%`,
                      backgroundColor: DIFF_COLORS[diff],
                    }}
                  />
                </div>
                <span style={breakdownScoreStyle}>
                  {tally.correct}/{tally.total}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Restart */}
      <button
        onClick={onRestart}
        style={restartBtnStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
          e.currentTarget.style.boxShadow = '0 8px 30px rgba(71,140,191,0.45)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(71,140,191,0.3)';
        }}
      >
        Try Again
      </button>
    </div>
  );
}

/* ---------- styles ---------- */

const containerStyle: CSSProperties = {
  textAlign: 'center',
  padding: '40px 24px',
  animation: 'fadeIn 0.5s ease-out',
};

const scoreCircleStyle: CSSProperties = {
  display: 'inline-flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '160px',
  height: '160px',
  borderRadius: '50%',
  border: '4px solid #478cbf',
  backgroundColor: '#16213e',
  marginBottom: '16px',
  animation: 'bounceIn 0.6s ease-out',
};

const scoreNumStyle: CSSProperties = {
  fontSize: '3.2rem',
  fontWeight: 800,
  color: '#478cbf',
  lineHeight: 1,
};

const scoreDividerStyle: CSSProperties = {
  fontSize: '1.1rem',
  color: '#6a6a8a',
  marginTop: '4px',
};

const pctTextStyle: CSSProperties = {
  fontSize: '1.1rem',
  color: '#a0a0b8',
  margin: '0 0 24px',
};

const tierTitleStyle: CSSProperties = {
  fontSize: '2rem',
  fontWeight: 800,
  margin: '0 0 8px',
  animation: 'slideUp 0.5s ease-out',
};

const tierMsgStyle: CSSProperties = {
  fontSize: '1rem',
  color: '#a0a0b8',
  lineHeight: '1.6',
  maxWidth: '500px',
  margin: '0 auto 36px',
  animation: 'slideUp 0.6s ease-out',
};

const sectionStyle: CSSProperties = {
  marginBottom: '32px',
  animation: 'slideUp 0.7s ease-out',
};

const sectionHeadingStyle: CSSProperties = {
  fontSize: '1rem',
  fontWeight: 700,
  color: '#7a7a9a',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  marginBottom: '16px',
};

const breakdownGridStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  maxWidth: '480px',
  margin: '0 auto',
};

const breakdownCardStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  backgroundColor: '#16213e',
  border: '1px solid #2a2a50',
  borderRadius: '10px',
  padding: '12px 16px',
};

const breakdownLabelRowStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  minWidth: '140px',
  textAlign: 'left',
};

const breakdownLabelStyle: CSSProperties = {
  fontSize: '0.9rem',
  fontWeight: 600,
  color: '#e0e0e0',
};

const breakdownSubLabelStyle: CSSProperties = {
  fontSize: '0.75rem',
  color: '#6a6a8a',
};

const miniBarTrackStyle: CSSProperties = {
  flex: 1,
  height: '8px',
  borderRadius: '4px',
  backgroundColor: '#2a2a40',
  overflow: 'hidden',
};

const miniBarFillStyle: CSSProperties = {
  height: '100%',
  borderRadius: '4px',
  transition: 'width 0.8s ease-out',
};

const breakdownScoreStyle: CSSProperties = {
  fontSize: '0.9rem',
  fontWeight: 700,
  color: '#a0a0b8',
  minWidth: '36px',
  textAlign: 'right',
  fontVariantNumeric: 'tabular-nums',
};

const diffDotStyle: CSSProperties = {
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  flexShrink: 0,
};

const restartBtnStyle: CSSProperties = {
  backgroundColor: '#478cbf',
  color: '#fff',
  border: 'none',
  borderRadius: '12px',
  padding: '14px 48px',
  fontSize: '1.1rem',
  fontWeight: 700,
  cursor: 'pointer',
  transition: 'all 0.25s ease',
  boxShadow: '0 4px 20px rgba(71,140,191,0.3)',
  marginTop: '8px',
  fontFamily: 'inherit',
};
