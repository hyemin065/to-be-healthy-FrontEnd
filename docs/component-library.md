# Component Library — 건강해짐

## Design Principles

### 1. CVA (Class Variance Authority) for Variants
모든 변형 가능한 컴포넌트는 CVA로 variant를 정의하고, TypeScript `VariantProps`로 타입 안전성을 보장합니다.

```tsx
const buttonVariants = cva('base-classes', {
  variants: {
    variant: { default: '...', secondary: '...' },
    size: { sm: '...', md: '...', lg: '...' },
  },
  defaultVariants: { variant: 'default', size: 'md' },
});

export type ButtonVariants = VariantProps<typeof buttonVariants>;
```

### 2. forwardRef for Ref Forwarding
모든 UI 컴포넌트는 `React.forwardRef`를 사용하여 부모에서 DOM 접근이 가능합니다.

### 3. Compound Component Pattern
복합 컴포넌트는 세 가지 패턴을 상황에 맞게 사용합니다:

| Pattern | Use Case | Example |
|---------|----------|---------|
| **Context + Object.assign** | 상태 공유가 필요한 복합 컴포넌트 | FormField |
| **Object.assign only** | 독립적인 서브컴포넌트 조합 | DataList, Card, Dialog |
| **Children parsing** | 레이아웃 슬롯 기반 조합 | Layout |

### 4. Design Token Integration
모든 스타일 값은 디자인 토큰을 참조합니다. 하드코딩된 hex 값 대신 Tailwind semantic 클래스를 사용합니다.

## Component Inventory

### CVA Components (8)
| Component | Variants | Sizes | Features |
|-----------|----------|-------|----------|
| **Button** | 7 (default, secondary, destructive, outline, ghost, link, danger) | 6 (default, sm, lg, icon, full, auto) | loading state, asChild |
| **Input** | 3 (default, error, ghost) | 3 (sm, md, lg) | forwardRef |
| **Badge** | 5 (default, success, warning, error, info) | 2 (sm, md) | forwardRef |
| **Chip** | 2 (filled, outlined) | 2 (sm, md) | selected, removable, keyboard a11y |
| **Typography** | 15 variants + 6 colors | — | polymorphic `as` prop |
| **Progress** | 3 (default, success, warning) | 3 (sm, md, lg) | aria-valuenow |
| **Sheet** | 4 sides | — | CVA + Radix |
| **Toast** | 2 (default, destructive) | — | CVA + Radix |

### Compound Components (6)
| Component | Pattern | Sub-components |
|-----------|---------|----------------|
| **FormField** | Context + Object.assign | Label, Control, Description, Error |
| **DataList** | Object.assign | Item, Label, Value |
| **Layout** | Children parsing | Header, Contents, BottomArea |
| **Dialog** | Object.assign + Radix | Trigger, Content, Header, Footer, etc. |
| **Sheet** | Object.assign + Radix + CVA | Trigger, Content, Header, Footer, etc. |
| **Tabs** | Object.assign + Radix | List, Trigger, Content |

## Accessibility

- 모든 인터랙티브 컴포넌트에 `focus-visible` 스타일 적용
- FormField: `aria-invalid`, `aria-describedby` 자동 주입
- Chip: `role="option"`, `aria-selected`, 키보드(Enter/Space) 토글
- Progress: `role="progressbar"`, `aria-valuenow/min/max`
- Layout: semantic HTML (`header`, `main`, `footer`) + ARIA roles
- Skip navigation 링크 제공

## Storybook

```bash
npm run storybook  # http://localhost:6006
```

### Stories 구성
- **Design Tokens/Overview**: 색상 팔레트, 타이포 스케일, 스페이싱, 반경, 그림자
- **Components/***: 각 컴포넌트의 Controls, Actions, a11y addon, Play function

### Addon 구성
- `@storybook/addon-essentials`: Controls, Actions, Docs
- `@storybook/addon-a11y`: 접근성 자동 검사
- `@storybook/addon-interactions`: Play function 테스트
