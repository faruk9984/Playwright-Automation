// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  // retries: 1, //kono test case fail hole abr run hobe
  // workers: 2, // at a time 2ta browser open hobe

  timeout:30 * 1000,
  expect:{
    timeout:5000
  },
  /* Run tests in files in parallel */
  fullyParallel: true, 
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  // use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    // trace: 'retain-on-failure',
    // browserName: 'webkit',
    // headless: true,
    // screenshot: 'on',
    // viewport:{width:720,height:720},
    // ...devices['iPhone 11'],
    // ignoreHTTPSErrors:true,
    // permissions:['geolocation'],
    // video:'retain-on-failure',
  // },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], headless: false, screenshot: 'on', trace: 'on', 
        ignoreHTTPSErrors:true, 
        permissions:['geolocation'], 
        video:'retain-on-failure',
        // viewport:{width:720,height:720}
      },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'], headless: false, screenshot: 'on', trace: 'on' , viewport:{width:720,height:720},...devices['iPhone 11']},
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'], headless: false, screenshot: 'on', trace: 'on', ...devices['iPhone 11'], ignoreHTTPSErrors:true}, permissions:['geolocation']},
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

