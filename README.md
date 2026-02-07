# Godot Knowledge Quest

An interactive quiz app that tests your Godot 4 game development knowledge across Lessons 01-05 and beyond.

## Quick Start

```bash
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.

## What's Covered

**15 questions** across 6 categories, with progressive difficulty (easy -> medium -> hard):

| Lesson | Topic | Questions |
|--------|-------|-----------|
| L01 | Scene Tree & Nodes | 2 |
| L02 | Signals | 2 |
| L03 | Instancing & Scenes | 2 |
| L04 | Collision Detection | 3 |
| L05 | Health & Damage Systems | 3 |
| Advanced | Beyond L05 (state machines, hitbox/hurtbox, dangling refs) | 3 |

### Question Types

- **Multiple Choice** (5) - Concepts, best practices, API knowledge
- **Code Fill** (3) - Complete the GDScript snippet
- **Debug** (3) - Find the bug in the code
- **Scenario** (4) - "How would you implement X?"

## Features

- GDScript syntax highlighting in code questions
- Immediate feedback with explanations and fun facts after each answer
- Progress bar with color transitions
- Performance breakdown by lesson and difficulty
- Tiered results: Godot Master, Scene Tree Sage, Node Novice, Keep Learning!
- Smooth animations and a dark Godot-themed UI

## Tech Stack

- React 19 + TypeScript
- Vite 7
- No external UI libraries - all CSS-in-JS with inline styles
- All questions embedded in `src/data/questions.ts`

## Project Structure

```
src/
├── data/
│   └── questions.ts        # Question bank (types + 15 questions)
├── components/
│   ├── Quiz.tsx             # Main orchestrator & state management
│   ├── StartScreen.tsx      # Landing page
│   ├── QuestionCard.tsx     # Question display & answer selection
│   ├── CodeBlock.tsx        # GDScript syntax highlighter
│   ├── ProgressBar.tsx      # Progress indicator
│   └── ResultsScreen.tsx    # Final score & breakdowns
├── App.tsx
├── main.tsx
└── index.css                # Global styles & animation keyframes
```
