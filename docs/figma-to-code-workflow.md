# Figma → Code Workflow — 건강해짐 Design System

디자이너의 Figma Variables가 프로덕션 컴포넌트에 도달하기까지의 전체 워크플로우입니다.

## 전체 흐름

```
Figma Variables (Designer)
    │
    ▼  ① Export / Inspect
tokens/primitive.css         ← Figma 변수를 CSS Custom Properties로 추출
    │
    ▼  ② Semantic Mapping
tokens/semantic.css          ← 의도 기반 이름으로 매핑
    │
    ▼  ③ Tailwind Integration
tailwind.config.js           ← CSS Variables를 유틸리티 클래스로 변환
    │
    ▼  ④ Component Consumption
shared/ui/*.tsx (CVA)        ← Tailwind 클래스로 토큰 소비
    │
    ▼  ⑤ Documentation & QA
Storybook + a11y addon       ← 시각적 검증 + 접근성 검사
```

---

## Step 1: Figma Variables 설정

Figma에서 Variables를 다음 구조로 정의합니다:

| Figma Collection | 변수 이름 | 값 | CSS 변수 |
|-----------------|----------|-----|---------|
| Color/Blue | blue/500 | #1990FF | `--color-blue-500` |
| Color/Gray | gray/800 | #2E3134 | `--color-gray-800` |
| Color/Red | red/500 | #FF4668 | `--color-red-500` |
| Typography | font-size/xl | 16px | `--font-size-xl` |
| Typography | font-weight/bold | 700 | `--font-weight-bold` |
| Spacing | spacing/6 | 16px | `--spacing-6` |
| Radius | radius/8 | 8px | `--radius-8` |

**네이밍 규칙**: Figma `collection/name` → CSS `--{collection}-{name}`

---

## Step 2: Primitive Tokens 추출

Figma Variables를 `primitive.css`에 1:1 매핑합니다.

```css
/* tokens/primitive.css — Figma에서 직접 추출한 원시값 */
:root {
  /* Figma: Color/Blue/500 → CSS: --color-blue-500 */
  --color-blue-500: #1990ff;

  /* Figma: Typography/font-size/xl → CSS: --font-size-xl */
  --font-size-xl: 16px;

  /* Figma: Spacing/6 → CSS: --spacing-6 */
  --spacing-6: 16px;
}
```

**핵심 원칙**: primitive 토큰은 Figma 값과 동일해야 합니다. 의미를 부여하지 않습니다.

---

## Step 3: Semantic Mapping

primitive 토큰에 **의도(intent)**를 부여합니다.

```css
/* tokens/semantic.css — 의도 기반 토큰 */
:root {
  /* "이 색은 주요 인터랙션에 사용된다" */
  --interactive-primary: var(--color-blue-500);

  /* "이 색은 보조 배경에 사용된다" */
  --surface-secondary: var(--color-blue-50);

  /* "이 색은 본문 텍스트에 사용된다" */
  --text-primary: var(--color-gray-800);

  /* "이 색은 성공 상태를 표현한다" */
  --status-success-bg: var(--color-green-50);
  --status-success-text: var(--color-green-700);
}
```

**이렇게 하면**: Figma Inspect에서 "이건 토큰 blue-500, 시멘틱으로는 interactive-primary"라고 바로 읽을 수 있습니다.

---

## Step 4: Tailwind Config 연결

semantic 토큰을 Tailwind 유틸리티 클래스로 변환합니다.

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        surface: {
          primary: 'var(--surface-primary)',       // → bg-surface-primary
          secondary: 'var(--surface-secondary)',   // → bg-surface-secondary
        },
        interactive: {
          primary: 'var(--interactive-primary)',   // → text-interactive-primary
        },
        status: {
          'success-bg': 'var(--status-success-bg)',   // → bg-status-success-bg
          'success-text': 'var(--status-success-text)', // → text-status-success-text
        },
      },
      fontWeight: {
        bold: 'var(--font-weight-bold)',       // → font-bold
        semibold: 'var(--font-weight-semibold)', // → font-semibold
      },
      spacing: {
        6: 'var(--spacing-6)',  // → p-6, m-6, gap-6
      },
    },
  },
};
```

---

## Step 5: CVA 컴포넌트에서 토큰 소비

### Before (하드코딩)

```tsx
// ❌ Figma 값을 직접 하드코딩
const buttonVariants = cva('...', {
  variants: {
    variant: {
      secondary: 'bg-[#E2F1FF] text-[#1990FF]',
    },
  },
});
```

### After (토큰 참조)

```tsx
// ✅ SSOT 체인을 통해 Figma 변수 참조
const buttonVariants = cva('...', {
  variants: {
    variant: {
      secondary: 'bg-surface-secondary text-interactive-primary',
    },
  },
});

export type ButtonVariants = VariantProps<typeof buttonVariants>;
```

**차이점**: Figma에서 `blue-50`을 `#D6ECFF`로 변경하면:
- Before: 코드 14곳을 수동 변경
- After: `primitive.css` 1줄만 변경 → 전체 자동 반영

---

## Step 6: Storybook 검증

### Controls로 variant 검증

```tsx
// button.stories.tsx
export const AllVariants: Story = {
  render: () => (
    // 모든 variant × size 조합을 시각적으로 확인
    {variants.map((variant) => (
      <Button variant={variant}>텍스트</Button>
    ))}
  ),
};
```

### a11y Addon으로 접근성 검증

- Color contrast 자동 검사
- ARIA 속성 누락 감지
- Keyboard navigation 테스트

### Play Function으로 인터랙션 검증

```tsx
export const KeyboardInteraction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.tab();
    await expect(canvas.getByRole('button')).toHaveFocus();
  },
};
```

---

## Figma Variables → CSS Variables 매핑 테이블

| Figma Variable | Primitive Token | Semantic Token | Tailwind Class |
|---------------|----------------|----------------|----------------|
| Color/Blue/50 | `--color-blue-50` | `--surface-secondary` | `bg-surface-secondary` |
| Color/Blue/500 | `--color-blue-500` | `--interactive-primary` | `bg-interactive-primary` |
| Color/Gray/800 | `--color-gray-800` | `--text-primary` | `text-text-token-primary` |
| Color/Red/500 | `--color-red-500` | `--interactive-destructive` | `bg-interactive-destructive` |
| Color/Green/50 | `--color-green-50` | `--status-success-bg` | `bg-status-success-bg` |
| Typography/font-size/xl | `--font-size-xl` | — | `text-xl` |
| Typography/font-weight/bold | `--font-weight-bold` | — | `font-bold` |
| Spacing/6 | `--spacing-6` | — | `p-6`, `gap-6` |
| Radius/8 | `--radius-8` | `--radius-m` | `rounded-md` |
| Shadow/sm | `--shadow-sm` | — | `shadow-sm` |

---

## 토큰 변경 시 영향 범위

### 케이스: 브랜드 컬러 변경 (Blue → Purple)

1. **Figma**: Variables에서 Blue 컬렉션 값 변경
2. **코드**: `primitive.css`의 `--color-blue-*` 값만 변경
3. **영향**: semantic 토큰 → Tailwind → 모든 컴포넌트 자동 반영
4. **검증**: Storybook에서 전체 컴포넌트 시각 확인

```css
/* primitive.css — 이 한 줄만 변경 */
--color-blue-500: #7c3aed; /* Blue → Purple */
```

→ `bg-surface-primary`, `bg-interactive-primary`, `text-text-accent` 등 모든 곳에 자동 적용
