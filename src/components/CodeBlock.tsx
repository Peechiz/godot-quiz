import { useMemo, type CSSProperties } from 'react';

interface CodeBlockProps {
  code: string;
}

const GD_KEYWORDS = new Set([
  'func', 'var', 'signal', 'extends', 'class_name', 'if', 'else', 'elif',
  'for', 'while', 'return', 'true', 'false', 'null', 'self', 'preload',
  'load', 'const', 'enum', 'match', 'pass', 'break', 'continue', 'class',
  'static', 'void', 'int', 'float', 'bool', 'and', 'or', 'not', 'in',
  'is', 'as', 'yield', 'await', 'super',
]);

const GD_ANNOTATIONS = new Set(['@onready', '@export', '@tool', '@icon']);

const GD_BUILTINS = new Set([
  'print', 'push_back', 'append', 'remove', 'size', 'len', 'str', 'abs',
  'min', 'max', 'clamp', 'lerp', 'range', 'ready', 'process', 'input',
  'Vector2', 'Vector3', 'Color', 'Array', 'Dictionary', 'String',
  'Node', 'Node2D', 'Node3D', 'CharacterBody2D', 'CharacterBody3D',
  'Sprite2D', 'Sprite3D', 'Area2D', 'Area3D', 'RigidBody2D', 'RigidBody3D',
  'CollisionShape2D', 'CollisionShape3D', 'Timer', 'AnimationPlayer',
  'PackedScene', 'Resource', 'Callable', 'StaticBody2D',
]);

type TokenKind = 'keyword' | 'annotation' | 'builtin' | 'string' | 'comment' | 'number' | 'plain';

interface Token {
  kind: TokenKind;
  text: string;
}

function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < line.length) {
    const ch = line[i];

    // Comment
    if (ch === '#') {
      tokens.push({ kind: 'comment', text: line.substring(i) });
      return tokens;
    }

    // String (double quote)
    if (ch === '"') {
      let j = i + 1;
      while (j < line.length && line[j] !== '"') {
        if (line[j] === '\\') j++;
        j++;
      }
      tokens.push({ kind: 'string', text: line.substring(i, j + 1) });
      i = j + 1;
      continue;
    }

    // String (single quote)
    if (ch === "'") {
      let j = i + 1;
      while (j < line.length && line[j] !== "'") {
        if (line[j] === '\\') j++;
        j++;
      }
      tokens.push({ kind: 'string', text: line.substring(i, j + 1) });
      i = j + 1;
      continue;
    }

    // Annotation (@onready, @export, etc.)
    if (ch === '@') {
      let j = i + 1;
      while (j < line.length && /[a-zA-Z_]/.test(line[j])) j++;
      const word = line.substring(i, j);
      tokens.push({
        kind: GD_ANNOTATIONS.has(word) ? 'annotation' : 'plain',
        text: word,
      });
      i = j;
      continue;
    }

    // Word (keyword, builtin, or plain identifier)
    if (/[a-zA-Z_]/.test(ch)) {
      let j = i;
      while (j < line.length && /[a-zA-Z_0-9]/.test(line[j])) j++;
      const word = line.substring(i, j);
      let kind: TokenKind = 'plain';
      if (GD_KEYWORDS.has(word)) kind = 'keyword';
      else if (GD_BUILTINS.has(word)) kind = 'builtin';
      tokens.push({ kind, text: word });
      i = j;
      continue;
    }

    // Number
    if (/[0-9]/.test(ch)) {
      let j = i;
      while (j < line.length && /[0-9.x]/.test(line[j])) j++;
      tokens.push({ kind: 'number', text: line.substring(i, j) });
      i = j;
      continue;
    }

    // Everything else (operators, whitespace, punctuation)
    tokens.push({ kind: 'plain', text: ch });
    i++;
  }

  return tokens;
}

const TOKEN_COLORS: Record<TokenKind, string> = {
  keyword: '#569cd6',
  annotation: '#c586c0',
  builtin: '#4ec9b0',
  string: '#ce9178',
  comment: '#6a9955',
  number: '#b5cea8',
  plain: '#d4d4d4',
};

export default function CodeBlock({ code }: CodeBlockProps) {
  const lines = useMemo(() => code.split('\n'), [code]);
  const lineNumWidth = String(lines.length).length;

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <span style={dotStyle('#ff5f56')} />
        <span style={dotStyle('#ffbd2e')} />
        <span style={dotStyle('#27c93f')} />
        <span style={headerTextStyle}>GDScript</span>
      </div>
      <pre style={preStyle}>
        <code>
          {lines.map((line, i) => (
            <div key={i} style={lineStyle}>
              <span style={lineNumberStyle(lineNumWidth)}>{i + 1}</span>
              <span style={lineContentStyle}>
                {tokenizeLine(line).map((token, j) => (
                  <span key={j} style={{ color: TOKEN_COLORS[token.kind] }}>
                    {token.text}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}

/* ---------- styles ---------- */

const containerStyle: CSSProperties = {
  backgroundColor: '#0d1117',
  borderRadius: '8px',
  overflow: 'hidden',
  margin: '16px 0',
  border: '1px solid #30363d',
  fontSize: '14px',
};

const headerStyle: CSSProperties = {
  backgroundColor: '#161b22',
  padding: '8px 12px',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  borderBottom: '1px solid #30363d',
};

function dotStyle(color: string): CSSProperties {
  return {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: color,
    display: 'inline-block',
  };
}

const headerTextStyle: CSSProperties = {
  color: '#8b949e',
  fontSize: '12px',
  marginLeft: '8px',
  fontFamily: 'monospace',
};

const preStyle: CSSProperties = {
  margin: 0,
  padding: '16px',
  overflowX: 'auto',
  fontFamily:
    "'Fira Code', 'Cascadia Code', 'JetBrains Mono', Consolas, monospace",
  lineHeight: '1.6',
};

const lineStyle: CSSProperties = {
  display: 'flex',
  minHeight: '1.6em',
};

function lineNumberStyle(width: number): CSSProperties {
  return {
    color: '#484f58',
    textAlign: 'right',
    paddingRight: '16px',
    userSelect: 'none',
    minWidth: `${width + 1}ch`,
    flexShrink: 0,
  };
}

const lineContentStyle: CSSProperties = {
  flex: 1,
  whiteSpace: 'pre',
};
