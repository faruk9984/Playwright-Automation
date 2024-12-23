// @ts-check
const { test, expect } = require('@playwright/test');


test.describe.configure({mode:'parallel'}) //sob gula eksathe run
test.describe.configure({mode:'serial'}) // if fail others test case are skip


test('has title 1', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.waitForLoadState("networkidle")

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('Playwright');
});


test('get started link 1', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.waitForLoadState("networkidle")

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});


test('get started link 2', async ({ page }) => {
  await page.goto('https://google.com/');
  await page.waitForLoadState("networkidle")
  expect(await page.screenshot()).toMatchSnapshot('landing.png')
 
});


test('@Web Check homepage', async ({ page }) => {
  await page.goto('https://example.com');
  await page.waitForLoadState("networkidle")
});
