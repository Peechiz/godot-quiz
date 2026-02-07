import type { CSSProperties } from 'react';

interface StartScreenProps {
  onStart: () => void;
  questionCount: number;
}

const SCENE_TREE = `  [Root]
  +-- World
  |   +-- Player
  |   |   +-- Sprite2D
  |   |   +-- CollisionShape2D
  |   +-- Level
  +-- UI
      +-- HUD`;

export default function StartScreen({ onStart, questionCount }: StartScreenProps) {
  const estimatedMinutes = Math.max(1, Math.ceil(questionCount * 1.2));

  return (
    <div style={containerStyle}>
      {/* Decorative scene tree */}
      <pre style={sceneTreeStyle}>{SCENE_TREE}</pre>

      {/* Title */}
      <h1 style={titleStyle}>
        Godot Knowledge Quest
      </h1>

      <p style={subtitleStyle}>
        Test your Godot 4 &amp; GDScript skills across Lessons 01 - 05 and
        beyond!
      </p>

      {/* Stats row */}
      <div style={statsRowStyle}>
        <div style={statCardStyle}>
          <span style={statNumberStyle}>{questionCount}</span>
          <span style={statLabelStyle}>Questions</span>
        </div>
        <div style={statCardStyle}>
          <span style={statNumberStyle}>~{estimatedMinutes}</span>
          <span style={statLabelStyle}>Minutes</span>
        </div>
        <div style={statCardStyle}>
          <span style={statNumberStyle}>3</span>
          <span style={statLabelStyle}>Difficulty Tiers</span>
        </div>
      </div>

      {/* Topics */}
      <div style={topicsStyle}>
        <span style={topicTagStyle}>Scene Tree</span>
        <span style={topicTagStyle}>Signals</span>
        <span style={topicTagStyle}>Instancing</span>
        <span style={topicTagStyle}>Collisions</span>
        <span style={topicTagStyle}>Game Systems</span>
        <span style={topicTagStyle}>Advanced</span>
      </div>

      {/* Start button */}
      <button
        onClick={onStart}
        style={startBtnStyle}
        onMouseEnter={(e) => {
          const el = e.currentTarget;
          el.style.transform = 'translateY(-3px) scale(1.03)';
          el.style.boxShadow = '0 8px 30px rgba(71,140,191,0.45)';
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget;
          el.style.transform = 'translateY(0) scale(1)';
          el.style.boxShadow = '0 4px 20px rgba(71,140,191,0.3)';
        }}
      >
        Start Quest
      </button>

      <p style={footerStyle}>
        Good luck, Godot Developer!
      </p>
    </div>
  );
}

/* ---------- styles ---------- */

const containerStyle: CSSProperties = {
  textAlign: 'center',
  padding: '40px 24px',
  animation: 'fadeIn 0.6s ease-out',
};

const sceneTreeStyle: CSSProperties = {
  display: 'inline-block',
  textAlign: 'left',
  color: '#478cbf',
  backgroundColor: '#0d1117',
  border: '1px solid #30363d',
  borderRadius: '10px',
  padding: '16px 24px',
  fontSize: '13px',
  fontFamily: "'Fira Code', 'Cascadia Code', Consolas, monospace",
  lineHeight: '1.5',
  marginBottom: '32px',
  animation: 'slideUp 0.5s ease-out',
};

const titleStyle: CSSProperties = {
  fontSize: '2.6rem',
  fontWeight: 800,
  color: '#478cbf',
  margin: '0 0 12px',
  letterSpacing: '-0.5px',
  animation: 'slideUp 0.6s ease-out',
};

const subtitleStyle: CSSProperties = {
  fontSize: '1.1rem',
  color: '#a0a0b8',
  margin: '0 0 32px',
  lineHeight: '1.5',
  maxWidth: '500px',
  marginLeft: 'auto',
  marginRight: 'auto',
  animation: 'slideUp 0.7s ease-out',
};

const statsRowStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
  marginBottom: '28px',
  flexWrap: 'wrap',
  animation: 'slideUp 0.8s ease-out',
};

const statCardStyle: CSSProperties = {
  backgroundColor: '#16213e',
  border: '1px solid #2a2a50',
  borderRadius: '12px',
  padding: '16px 24px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minWidth: '100px',
};

const statNumberStyle: CSSProperties = {
  fontSize: '1.8rem',
  fontWeight: 700,
  color: '#478cbf',
};

const statLabelStyle: CSSProperties = {
  fontSize: '0.8rem',
  color: '#7a7a9a',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  marginTop: '4px',
};

const topicsStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  gap: '10px',
  flexWrap: 'wrap',
  marginBottom: '36px',
  animation: 'slideUp 0.9s ease-out',
};

const topicTagStyle: CSSProperties = {
  backgroundColor: '#1e2a45',
  color: '#8ab4d6',
  padding: '6px 14px',
  borderRadius: '20px',
  fontSize: '0.82rem',
  border: '1px solid #2a3a5a',
};

const startBtnStyle: CSSProperties = {
  backgroundColor: '#478cbf',
  color: '#fff',
  border: 'none',
  borderRadius: '12px',
  padding: '16px 48px',
  fontSize: '1.25rem',
  fontWeight: 700,
  cursor: 'pointer',
  transition: 'all 0.25s ease',
  boxShadow: '0 4px 20px rgba(71,140,191,0.3)',
  animation: 'slideUp 1s ease-out',
  letterSpacing: '0.5px',
};

const footerStyle: CSSProperties = {
  marginTop: '24px',
  color: '#5a5a7a',
  fontSize: '0.9rem',
  animation: 'fadeIn 1.2s ease-out',
};
