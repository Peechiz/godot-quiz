import type { CSSProperties } from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;

  // Shift colour from Godot blue -> teal -> green as progress increases
  const barColor =
    pct < 34 ? '#478cbf' : pct < 67 ? '#3ea5a5' : '#4caf50';

  return (
    <div style={wrapperStyle}>
      <div style={labelRowStyle}>
        <span style={labelStyle}>
          Question <strong>{current}</strong> of <strong>{total}</strong>
        </span>
        <span style={pctStyle}>{pct}%</span>
      </div>

      <div style={trackStyle}>
        <div
          style={{
            ...fillStyle,
            width: `${pct}%`,
            backgroundColor: barColor,
          }}
        />
      </div>
    </div>
  );
}

/* ---------- styles ---------- */

const wrapperStyle: CSSProperties = {
  marginBottom: '24px',
  animation: 'fadeIn 0.3s ease-out',
};

const labelRowStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '8px',
};

const labelStyle: CSSProperties = {
  fontSize: '14px',
  color: '#a0a0b8',
};

const pctStyle: CSSProperties = {
  fontSize: '14px',
  color: '#a0a0b8',
  fontVariantNumeric: 'tabular-nums',
};

const trackStyle: CSSProperties = {
  height: '10px',
  borderRadius: '5px',
  backgroundColor: '#2a2a40',
  overflow: 'hidden',
};

const fillStyle: CSSProperties = {
  height: '100%',
  borderRadius: '5px',
  transition: 'width 0.5s ease-in-out, background-color 0.5s ease',
};
