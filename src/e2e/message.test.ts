import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';

const BASE_URL = `http://localhost:${process.env.PORT || 8001}`;

const testPage = (path: string, page: Page) => async () => {
  await page.goto(`${BASE_URL}${path}`);
  await page.waitForSelector('footer', { timeout: 2000 });
  const haveFooter = await page.evaluate(() => document.getElementsByTagName('footer').length > 0);
  expect(haveFooter).toBeTruthy();
};

const testMessageComponent = async (page: Page, messageSelector: string, expectedMessage: string) => {
  const messageElement = await page.waitForSelector(messageSelector, { timeout: 5000 });
  expect(messageElement).toBeTruthy();

  // 获取 Message 组件的文本内容并进行断言
  const messageText = await messageElement.innerText();
  expect(messageText).toContain(expectedMessage);
};

test('should display a Message component on the page', async ({ page }) => {
  await testPage('/your-page', page);
  await testMessageComponent(page, '.message', 'Your expected message text');
});


