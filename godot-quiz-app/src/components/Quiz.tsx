import { useState, useCallback, type CSSProperties } from 'react';
import { questions } from '../data/questions';
import StartScreen from './StartScreen';
import QuestionCard from './QuestionCard';
import ProgressBar from './ProgressBar';
import ResultsScreen from './ResultsScreen';

interface QuizState {
  phase: 'start' | 'playing' | 'results';
  currentQuestionIndex: number;
  answers: (number | null)[];
  score: number;
  showFeedback: boolean;
}

function createInitialState(): QuizState {
  return {
    phase: 'start',
    currentQuestionIndex: 0,
    answers: new Array<number | null>(questions.length).fill(null),
    score: 0,
    showFeedback: false,
  };
}

export default function Quiz() {
  const [state, setState] = useState<QuizState>(createInitialState);

  const handleStart = useCallback(() => {
    setState((s) => ({ ...s, phase: 'playing' }));
  }, []);

  const handleAnswer = useCallback(
    (answerIndex: number) => {
      const currentQ = questions[state.currentQuestionIndex];
      const isCorrect = answerIndex === currentQ.correctAnswer;
      setState((s) => ({
        ...s,
        answers: s.answers.map((a, i) =>
          i === s.currentQuestionIndex ? answerIndex : a,
        ),
        score: isCorrect ? s.score + 1 : s.score,
        showFeedback: true,
      }));
    },
    [state.currentQuestionIndex],
  );

  const handleNext = useCallback(() => {
    setState((s) => {
      if (s.currentQuestionIndex >= questions.length - 1) {
        return { ...s, phase: 'results' };
      }
      return {
        ...s,
        currentQuestionIndex: s.currentQuestionIndex + 1,
        showFeedback: false,
      };
    });
  }, []);

  const handleRestart = useCallback(() => {
    setState(createInitialState());
  }, []);

  // Guard: no questions loaded
  if (questions.length === 0) {
    return (
      <div style={emptyStyle}>
        <h2>No questions loaded</h2>
        <p>The question data has not been added yet. Check src/data/questions.ts.</p>
      </div>
    );
  }

  // --- Render phases ---

  if (state.phase === 'start') {
    return (
      <div style={shellStyle}>
        <StartScreen
          onStart={handleStart}
          questionCount={questions.length}
        />
      </div>
    );
  }

  if (state.phase === 'results') {
    return (
      <div style={shellStyle}>
        <ResultsScreen
          score={state.score}
          totalQuestions={questions.length}
          questions={questions}
          answers={state.answers}
          onRestart={handleRestart}
        />
      </div>
    );
  }

  // phase === 'playing'
  const currentQuestion = questions[state.currentQuestionIndex];

  return (
    <div style={shellStyle}>
      <ProgressBar
        current={state.currentQuestionIndex + 1}
        total={questions.length}
      />
      <QuestionCard
        key={currentQuestion.id}
        question={currentQuestion}
        questionNumber={state.currentQuestionIndex + 1}
        totalQuestions={questions.length}
        selectedAnswer={state.answers[state.currentQuestionIndex]}
        showFeedback={state.showFeedback}
        onAnswer={handleAnswer}
        onNext={handleNext}
      />
    </div>
  );
}

/* ---------- styles ---------- */

const shellStyle: CSSProperties = {
  maxWidth: '760px',
  margin: '0 auto',
  padding: '20px 0',
};

const emptyStyle: CSSProperties = {
  textAlign: 'center',
  padding: '80px 24px',
  color: '#a0a0b8',
};
