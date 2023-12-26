import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';

const BASE_URL = `http://localhost:${process.env.PORT || 8001}`;

const testPage = (path: string, page: Page) => async () => {
  await page.goto(`${BASE_URL}${path}`);
  await page.waitForSelector('footer', { timeout: 2000 });
  const haveFooter = await page.evaluate(() => document.getElementsByTagName('footer').length > 0);
  expect(haveFooter).toBeTruthy();
};

const testSpaceComponent = async (page: Page, spaceSelector: string) => {
  const spaceElement = await page.waitForSelector(spaceSelector, { timeout: 5000 });
  expect(spaceElement).toBeTruthy();

  

  const childElements = await spaceElement.$$('.space-item');
  expect(childElements.length).toBeGreaterThan(1);
};

test('should display a Space component on the page', async ({ page }) => {
  await testPage('/your-page', page);
  await testSpaceComponent(page, '.space');
});


