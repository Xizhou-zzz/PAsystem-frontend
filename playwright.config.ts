// playwright.config.ts
import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  use: {
    trace: 'on-first-retry',

  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
  reporter: [
    // 添加 reporter 插件
    ['list'],
    ['json', { outputFile: 'test-results/report.json' }], // 配置 JSON 报告
    ['junit', { outputFile: 'test-results/junit.xml' }], // 配置 JUnit 报告
  ],
  
};
export default config;
