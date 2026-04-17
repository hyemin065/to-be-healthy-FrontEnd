# Design Token System — 건강해짐

## Architecture Overview

```
┌──────────────────────────────┐
│  Figma Variables             │  ← 디자이너가 관리하는 원본
│  (Color, Typography, etc.)   │
└──────────────┬───────────────┘
               ▼
┌──────────────────────────────┐
│  Layer 1: Primitive Tokens   │  tokens/primitive.css
│  --color-blue-500: #1990ff   │  순수 값, 의미 없음
│  --font-size-xl: 16px        │
│  --spacing-6: 16px           │
└──────────────┬───────────────┘
               ▼
┌──────────────────────────────┐
│  Layer 2: Semantic Tokens    │  tokens/semantic.css
│  --surface-primary:          │  의도 기반 이름
│    var(--color-blue-500)     │
│  --text-accent:              │
│    var(--color-blue-500)     │
└──────────────┬───────────────┘
               ▼
┌──────────────────────────────┐
│  Tailwind Config             │  tailwind.config.js
│  theme.extend.colors:        │  CSS Variables → 유틸리티 클래스
│    surface: {                │
│      primary: var(--surface-primary) │
│    }                         │
└──────────────┬───────────────┘
               ▼
┌──────────────────────────────┐
│  Component (CVA)             │  shared/ui/*.tsx
│  bg-surface-secondary        │  Tailwind 클래스로 토큰 소비
│  text-interactive-primary    │
└──────────────────────────────┘
```

## Token Naming Convention

| Category | Pattern | Example |
|----------|---------|---------|
| Primitive Color | `--color-{hue}-{shade}` | `--color-blue-500` |
| Primitive Typography | `--font-size-{scale}` | `--font-size-xl` |
| Primitive Spacing | `--spacing-{n}` | `--spacing-6` |
| Semantic Surface | `--surface-{intent}` | `--surface-primary` |
| Semantic Text | `--text-{intent}` | `--text-accent` |
| Semantic Border | `--border-{intent}` | `--border-focus` |
| Semantic Interactive | `--interactive-{state}` | `--interactive-primary-hover` |

## Token Categories

### Color (19 primitive + 16 semantic)
- **Blue scale**: 50–900 (brand primary)
- **Gray scale**: 50–800 (neutral)
- **Red**: 500 (danger/point)
- **Semantic**: surface(6), text(7), border(4), interactive(6)

### Typography (10 sizes + 4 weights + 3 line-heights)
- **Font Size**: xs(10px) → 5xl(24px)
- **Font Weight**: regular(400), medium(500), semibold(600), bold(700)
- **Line Height**: tight(130%), normal(140%), relaxed(150%)
- **Typography Mixin**: 19 preset combinations (HEADING_1~5, TITLE_1~3, BODY_1~4)

### Spacing (12 steps)
Custom scale: 1(4px), 2(6px), 3(8px), 4(10px), 5(12px), 6(16px), 7(20px), 8(24px), 9(28px), 10(32px), 11(36px), 12(48px)

### Border Radius (3 semantic)
- radius-s(4px), radius-m(8px), radius-l(12px)

### Shadow (6 tokens)
- sm, md, lg, nav, card, calendar

## SSOT Chain: How a Color Change Propagates

### Before (hardcoded)
```tsx
// Button secondary - 하드코딩된 hex
<button className="bg-[#E2F1FF] text-[#1990FF]">
```

### After (tokenized)
```css
/* primitive.css */
--color-blue-50: #e2f1ff;    /* ← Figma에서 값 변경 시 여기만 수정 */

/* semantic.css */
--surface-secondary: var(--color-blue-50);

/* tailwind.config.js */
surface: { secondary: 'var(--surface-secondary)' }
```
```tsx
// Button - 토큰 참조
<button className="bg-surface-secondary text-interactive-primary">
```

Figma에서 `blue-50`이 `#D6ECFF`로 변경되면 `primitive.css`의 한 줄만 수정하면 모든 `surface-secondary` 사용처에 자동 반영됩니다.

## Dark Mode Support

semantic.css에서 `.dark` 셀렉터로 토큰 값만 교체하면 모든 컴포넌트가 자동으로 다크 모드를 지원합니다.

```css
.dark {
  --surface-primary: var(--color-blue-700);
  --surface-background: var(--color-gray-800);
  --text-primary: var(--color-gray-100);
}
```

## File Structure

```
src/app/_styles/
├── tokens/
│   ├── primitive.css     ← Layer 1: 원시값
│   └── semantic.css      ← Layer 2: 의미 기반
├── global.css            ← @import + shadcn compat + utilities
```
