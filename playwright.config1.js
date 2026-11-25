// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  retries: 1,
  workers: 2, //by default it will support upto 5
  timeout: 100 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter: 'html',
  projects: [
    {
      name: 'Safari',
      use: {
        browserName: 'webkit',
        headless: false,
        screenshot: 'off',
        trace: 'retain-on-failure',         
        ...devices['iPhone 11']  //To open based on device
      }
    },
    {
      name: 'Chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
        ignoreHTTPSErrors: true,  //To overcome cert issues
        permissions: ['geolocation'],  //To allow permission eg.Location
        trace: 'retain-on-failure',
        //viewport : {width:720,height:720}  //To open browser with specific dimension
      }

    }
  ],
});


