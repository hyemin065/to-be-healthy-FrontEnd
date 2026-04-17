import { defineConfig, devices } from '@playwright/test';

/**
 * Storybook 기반 E2E 테스트 설정
 * - Storybook dev 서버를 자동 실행
 * - 컴포넌트 인터랙션 + 접근성 검증
 */
export default defineConfig({
  testDir: './e2e',
  timeout: 30 * 1000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:6006',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run storybook',
    url: 'http://localhost:6006',
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
});
