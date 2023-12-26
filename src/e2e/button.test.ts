import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
const { uniq } = require('lodash');
const RouterConfig = require('../../config/routes').default;

const BASE_URL = `http://localhost:${process.env.PORT || 8001}`;

function formatter(routes: any, parentPath = ''): string[] {
  const fixedParentPath = parentPath.replace(/\/{1,}/g, '/');
  let result: string[] = [];
  routes.forEach((item: { path: string; routes: string }) => {
    if (item.path && !item.path.startsWith('/')) {
      result.push(`${fixedParentPath}/${item.path}`.replace(/\/{1,}/g, '/'));
    }
    if (item.path && item.path.startsWith('/')) {
      result.push(`${item.path}`.replace(/\/{1,}/g, '/'));
    }
    if (item.routes) {
      result = result.concat(
        formatter(item.routes, item.path ? `${fixedParentPath}/${item.path}` : parentPath),
      );
    }
  });
  return uniq(result.filter((item) => !!item));
}

const testPage = (path: string, page: Page) => async () => {
  await page.evaluate(() => {
    localStorage.setItem('antd-pro-authority', '["admin"]');
  });
  await page.goto(`${BASE_URL}${path}`);

  await page.waitForLoadState('load');
  await page.waitForLoadState('networkidle');
  const submitButton = await page.waitForSelector('button[type="submit"]', { timeout: 5000 });
  expect(submitButton).toBeTruthy();
};

const routers = formatter(RouterConfig);

// 在这里定义顶层的测试用例
routers.forEach((route) => {
  test(`should have a dashed button on route ${route}`, async ({ page }) => {
    await testPage(route, page);
  });
});