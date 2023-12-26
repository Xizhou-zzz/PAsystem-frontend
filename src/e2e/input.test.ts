import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';

const BASE_URL = `http://localhost:${process.env.PORT || 8001}`;

const testPage = (path: string, page: Page) => async () => {
  await page.goto(`${BASE_URL}${path}`);
  await page.waitForSelector('footer', { timeout: 2000 });
  const haveFooter = await page.evaluate(() => document.getElementsByTagName('footer').length > 0);
  expect(haveFooter).toBeTruthy();
};

const testInput = async (page: Page, inputSelector: string) => {
  const input = await page.waitForSelector(inputSelector, { timeout: 5000 });
  expect(input).toBeTruthy();

  // 在输入框中输入内容
  await input.type('Your input text');

  // 获取输入框的值并断言
  const inputValue = await input.inputValue();
  expect(inputValue).toBe('Your input text');
};

test('should have an input field on the page', async ({ page }) => {
  await testPage('/your-page', page);
  await testInput(page, 'input[type="text"]');
});

// 添加更多测试用例...
