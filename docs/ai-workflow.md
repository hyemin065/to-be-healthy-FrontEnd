# AI Code Assistant 활용 워크플로우 — 건강해짐

Claude Code를 단순 자동완성이 아닌 **아키텍처 설계 파트너**로 활용한 사례입니다.

## 1. 디자인 토큰 체계 설계

### 활용 방식

기존 `global.css`에 flat하게 나열된 CSS Variables를 **primitive/semantic 2계층**으로 분리하는 작업에서 Claude Code를 활용했습니다.

**요청**: "현재 global.css의 CSS Variables를 Figma Variables 구조에 맞게 primitive(원시값)과 semantic(의도 기반) 2단계로 분리해줘. SSOT 체인이 끊기지 않도록 하위 호환성도 유지해야 해."

**AI 결과물 검토 후 직접 수정한 부분**:
- AI가 semantic 토큰에 `--bg-primary`를 제안했으나, `--surface-primary`로 변경 (SKT 디자인 시스템의 surface/text/interactive 분류 체계에 맞춤)
- AI가 누락한 `--overlay-bg` 토큰을 직접 추가 (dialog/sheet의 backdrop 용도)
- status 색상(success/warning/error/info)을 별도 카테고리로 분리 — AI 제안에는 없었음

### 교훈

AI는 일반적인 토큰 구조를 잘 제안하지만, **프로젝트 고유의 분류 체계**는 직접 설계해야 합니다.

---

## 2. CVA 컴포넌트 패턴 설계

### 활용 방식

기존 shadcn/ui Button 컴포넌트(3 variant)를 확장하면서 TypeScript 타입 안전성을 유지하는 패턴을 AI와 협업했습니다.

**요청**: "Button에 loading 상태를 추가하되, disabled와 loading이 동시에 적용될 때 CVA compoundVariants로 처리해줘."

**AI 결과물 검토 후 직접 수정한 부분**:
- AI가 `loading` variant를 `disabled`와 별도로 만들었는데, 실제로는 `loading: true`일 때 `disabled` 속성도 함께 적용해야 함 → `disabled={loading || props.disabled}` 로직 직접 추가
- AI가 생성한 spinner SVG의 `aria-hidden="true"` 누락 → 접근성 검토 후 직접 추가
- `ButtonVariants` 타입을 별도 export하도록 변경 — AI 기본 제안에서는 inline

---

## 3. Compound Component 접근성 자동화

### 활용 방식

FormField 컴파운드 컴포넌트에서 Context를 통해 aria 속성을 자동 주입하는 패턴을 설계했습니다.

**요청**: "FormField 컴파운드 컴포넌트에서 Label, Control, Error 간의 aria 연결을 Context로 자동화해줘. 개발자가 aria-invalid나 aria-describedby를 수동으로 지정하지 않아도 되게."

**AI 결과물 검토 후 직접 수정한 부분**:
- AI가 `useId()` 대신 `Math.random()`으로 id를 생성 → React 18의 `useId()` hook으로 교체 (SSR 호환)
- AI가 `FormFieldControl`에서 `React.cloneElement`로 aria 주입할 때 타입 에러 발생 → `as React.ReactElement<Record<string, unknown>>` 타입 단언 직접 추가
- `FormField.Error`가 error 없을 때도 빈 `<p>` 렌더 → `if (!error) return null` 조건부 렌더로 변경

---

## 4. 접근성 감사 및 개선

### 활용 방식

`eslint-plugin-jsx-a11y`를 추가한 뒤 발생하는 위반 사항을 분석하고 수정 전략을 수립했습니다.

**요청**: "현재 프로젝트의 접근성 상태를 감사하고, WAI-ARIA 패턴이 누락된 컴포넌트를 찾아줘."

**AI 감사 결과 → 직접 실행한 작업**:
- Chip 컴포넌트에 `role="option"`, `aria-selected`, 키보드 핸들러(Enter/Space) 추가
- Progress에 `role="progressbar"`, `aria-valuenow/min/max` 추가
- Toast에 `aria-live="polite"`, `role="status"` 추가 — AI가 `aria-live="assertive"` 제안했으나, Toast는 긴급하지 않으므로 `"polite"`로 변경
- Layout에 semantic role(`banner`, `main`, `contentinfo`) 추가
- Skip navigation 링크 추가

---

## 5. 테스트 전략 수립

### 활용 방식

컴포넌트별 테스트 케이스를 AI와 브레인스토밍한 뒤, 실제로 의미 있는 케이스만 선별했습니다.

**AI가 제안한 테스트 → 직접 판단 후 제거한 것**:
- "Button 텍스트가 렌더링되는지" → 너무 trivial, 제거
- "className이 전달되는지" → cn() 유틸리티가 이미 검증됨, 제거
- "snapshot 테스트" → 유지보수 비용 대비 가치 낮음, 제거

**직접 추가한 테스트**:
- FormField의 `aria-describedby`가 description/error id와 정확히 연결되는지 검증
- Chip의 Enter/Space 키보드 이벤트가 동일하게 동작하는지
- Progress의 `translateX` 계산이 value에 따라 정확한지

---

## 6. 코드 리뷰: AI가 낸 코드의 문제점 식별

### 사례: Typography 컴포넌트 타입 에러

AI가 생성한 Typography 컴포넌트에서 `color` prop이 `HTMLAttributes<HTMLElement>`의 기본 `color` 속성과 충돌하는 타입 에러가 발생했습니다.

```tsx
// ❌ AI 원본 — 타입 에러 발생
export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    TypographyVariants { ... }
// Error: Interface cannot simultaneously extend types
// Named property 'color' are not identical
```

```tsx
// ✅ 직접 수정 — Omit으로 충돌 해결
export interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    TypographyVariants { ... }
```

### 사례: Tailwind CSS Variable 호환성

AI가 Typography mixin을 토큰화할 때 `text-[var(--font-size-5xl)]/[var(--line-height-tight)]` 패턴을 사용했는데, Tailwind의 arbitrary value 문법이 올바르게 컴파일되는지 직접 검증했습니다.

---

## 원칙: AI 활용의 경계

| AI에게 맡기는 것 | 직접 하는 것 |
|----------------|------------|
| 반복적인 boilerplate 생성 | 아키텍처 결정 (토큰 분류 체계) |
| 코드 패턴 탐색 및 제안 | 도메인 특화 설계 (fitness 앱의 role 분리) |
| 접근성 위반 사항 탐지 | aria-live 수준 결정 (assertive vs polite) |
| 테스트 케이스 브레인스토밍 | 의미 있는 테스트 선별 |
| 문서 초안 작성 | 최종 문서의 정확성 검증 |

> "AI 도구를 잘 쓰되, AI가 낸 코드를 맹목적으로 믿지 않는다."
> — 모든 AI 생성 코드는 TypeScript 컴파일, ESLint, Jest 테스트를 통과해야만 반영합니다.
