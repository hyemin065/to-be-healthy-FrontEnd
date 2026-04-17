<p align="center">
    <img src="https://github.com/to-be-healthy/FrontEnd/assets/102174146/f0629a08-f862-4b67-bf93-d52df57acb79" alt="건강해짐 로고 이미지" >
    <br />
    <h1 align="center">건강해짐</h1>
    <p align="center">피트니스 센터, 트레이너와 회원을 위한 일정 관리 앱</p>
    <br />
    <p align="center">
      <a href="https://main.to-be-healthy.shop/">웹 사이트</a>
<!--       .
      <a href="#">App</a> -->
    </p align="center">
</p>

<br />

## 서비스 개요

![건강해짐 배너 sns](https://github.com/to-be-healthy/FrontEnd/assets/102174146/d1682aea-4a3e-4c3e-84fc-9c55b3626547)

### PT 스케줄 관리

![건강해짐 배너 sns (1)](https://github.com/to-be-healthy/FrontEnd/assets/102174146/96784978-d903-47bf-832d-8433da311ae8)

아직도 트레이너가 수기로 일정을 메모하고 카카오톡 메신저로 회원 관리를 하나요?

건강해짐을 사용하면 트레이너는 헬스장 회원 스케줄 관리를 편하게 할 수 있어요.

헬스장 회원도 미리 트레이너 스케줄을 확인하고 등록할 수 있어요.

<br />

### 체계적인 회원 관리

![건강해짐 배너 sns (3)](https://github.com/to-be-healthy/FrontEnd/assets/102174146/05e70f40-4c75-4349-bfaa-fedc69cbc923)

스케줄 관리 뿐만 아니라 헬스장 회원에 대한 체계적인 관리도 가능해요.

회원에 대한 나만의 메모장, PT 피드백 그리고 수강권 관리까지!

좀 더 세심하게 회원을 관리할 수 있어요.

<br />

## 실행 방법

### Production

[운영 환경](https://main.to-be-healthy.shop/)

### Development

[개발 환경 데모](https://www.dev.to-be-healthy.shop/)

### 테스트계정

> 학생 계정 : healthy-student0 / 12345678a

> 트레이너 계정 : healthy-trainer0 / 12345678a

### Local

```
git clone https://github.com/to-be-healthy/FrontEnd.git

cd FrontEnd
npm i
npm run dev
```

<br />

## 프론트엔드

### 기술 스택

- Next.js
- shadcn-ui(radix ui + tailwind css + cva)
- zustand, tanstack-query, axios,
- PWA, FCM(Firebase Cloud Messaging)

### 인프라

.

### 프로젝트 구조

<img width="187" alt="image" src="https://github.com/to-be-healthy/FrontEnd/assets/102174146/3258f939-5113-4eef-85c0-907da1630b39">

<br />

FSD 아키텍처를 적용하여 책임 크기 단위로 계층을 분리하고, 기능 단위로 폴더를 나누었습니다.

코드의 복잡성이 증가함에 따라 발생할 수 있는 컴포넌트 간 순환 참조 발생 가능성을 크게 낮추었고, 코드를 분리하는 기준을 좀 더 명시적으로 정하여 협업할 수 있었습니다.

FSD 아키텍처의 app layer의 컨셉과 Next.js app router의 기능 간의 개념적인 충돌이 있었지만, 프로젝트 특성에 맞도록 최적화하여 구성했습니다.

---

## Design System

### Design Token Architecture (SSOT)

```
Figma Variables → primitive.css → semantic.css → tailwind.config.js → Component (CVA)
```

3계층 토큰 시스템으로 Figma 디자인 변경이 코드 전체에 자동 반영됩니다.

- **Primitive tokens**: 색상 28개, 타이포 17개, 스페이싱 12개, 반경 3개, 그림자 6개
- **Semantic tokens**: surface 6, text 7, border 4, interactive 6, status 8, overlay 1
- **상세 문서**: [Design Tokens](docs/design-tokens.md) | [Figma → Code Workflow](docs/figma-to-code-workflow.md)

### Component Library

| 카테고리 | 컴포넌트 | 패턴 |
|---------|---------|------|
| CVA Components | Button, Input, Badge, Chip, Typography, Progress, Sheet, Toast | CVA + forwardRef + VariantProps |
| Compound Components | FormField, DataList, Layout, Dialog, Sheet, Tabs | Context / Object.assign + forwardRef |

- **상세 문서**: [Component Library](docs/component-library.md)

### Storybook

```bash
npm run storybook          # 로컬 (http://localhost:6006)
npm run build-storybook    # 정적 빌드
```

Storybook 10 + `@storybook/nextjs-vite` 기반. Design Token 시각화, 컴포넌트 Controls/Actions, a11y 접근성 검사, Play function 인터랙션 테스트를 포함합니다.

**addon 구성**:
- `@storybook/addon-a11y` — WCAG 자동 검증
- 코어 통합 essentials/interactions — Controls, Actions, Docs, Play function

### Testing

```bash
npm test                   # Jest 단위 테스트 (53개)
npm run test:e2e           # Playwright E2E (Storybook 기반)
```

- **단위 테스트**: 7개 컴포넌트 53개 케이스 (Button, Input, Chip, FormField, Progress, Typography, Badge)
- **E2E 테스트**: Playwright + Storybook iframe 활용 — 키보드 접근성, ARIA 자동 주입 검증
- **접근성**: ESLint `jsx-a11y/recommended` + Storybook a11y addon + 글로벌 `focus-visible` 스타일 + Skip navigation 링크

### AI 활용

Claude Code를 아키텍처 설계 파트너로 활용합니다. 토큰 체계 설계, CVA 패턴, 접근성 감사, 테스트 전략을 AI와 협업하되 모든 결정은 직접 검토합니다. [AI Workflow](docs/ai-workflow.md)

### 포트폴리오 자료

| 자료 | 위치 |
|------|------|
| Design Token 설계 | [docs/design-tokens.md](docs/design-tokens.md) |
| Figma → Code 워크플로우 | [docs/figma-to-code-workflow.md](docs/figma-to-code-workflow.md) |
| 컴포넌트 라이브러리 | [docs/component-library.md](docs/component-library.md) |
| AI 활용 사례 | [docs/ai-workflow.md](docs/ai-workflow.md) |
| Storybook 코드 | [src/shared/ui/__stories__/](src/shared/ui/__stories__/) |
| 컴포넌트 코드 | [src/shared/ui/](src/shared/ui/) |
