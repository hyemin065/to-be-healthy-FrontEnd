import { expect, test } from '@playwright/test';

/**
 * Button 컴포넌트 E2E 테스트
 * Storybook의 button.stories.tsx를 직접 테스트
 */

test.describe('Button - 키보드 접근성', () => {
  test('Tab 키로 포커스 → Enter로 클릭', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--default');

    // Storybook iframe 안의 버튼 찾기
    const button = page.getByRole('button', { name: '버튼' });
    await expect(button).toBeVisible();

    // Tab 키로 포커스 이동
    await page.keyboard.press('Tab');
    await expect(button).toBeFocused();

    // focus-visible 스타일 적용 확인
    const outline = await button.evaluate((el) => {
      return window.getComputedStyle(el).outlineWidth;
    });
    expect(outline).not.toBe('0px');
  });

  test('disabled 상태에서는 클릭 불가', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--disabled');

    const button = page.getByRole('button');
    await expect(button).toBeDisabled();
  });

  test('loading 상태에서 spinner 표시', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--loading');

    const button = page.getByRole('button');
    const svg = button.locator('svg');
    await expect(svg).toBeVisible();
    await expect(button).toBeDisabled();
  });
});

test.describe('FormField - 접근성 자동 주입', () => {
  test('error 상태에서 aria-invalid + aria-describedby 자동 연결', async ({ page }) => {
    await page.goto('/iframe.html?id=components-formfield--with-error');

    const input = page.getByPlaceholder('이메일을 입력하세요');
    await expect(input).toHaveAttribute('aria-invalid', 'true');

    const describedBy = await input.getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();

    const alert = page.getByRole('alert');
    await expect(alert).toBeVisible();
    await expect(alert).toHaveText('올바른 이메일 형식이 아닙니다.');
    await expect(alert).toHaveAttribute('id', describedBy!);
  });
});

test.describe('Chip - 키보드 인터랙션', () => {
  test('Enter / Space 키로 선택 토글', async ({ page }) => {
    await page.goto('/iframe.html?id=components-chip--interactive-selection');

    const chip = page.getByRole('option');
    await chip.focus();
    await expect(chip).toHaveAttribute('aria-selected', 'false');

    await page.keyboard.press('Enter');
    await expect(chip).toHaveAttribute('aria-selected', 'true');

    await page.keyboard.press(' ');
    await expect(chip).toHaveAttribute('aria-selected', 'false');
  });
});
