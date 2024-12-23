const { test, expect } = require('@playwright/test');

//You are not authorize to view this order - test

test('security test request intercept', async ({ page }) => {

    const email = page.locator("#userEmail")
    await page.goto("https://rahulshettyacademy.com/client/")
    await email.fill("test@yopmail.com")
    await page.locator("#userPassword").fill("Farukmd494#")
    await page.locator('[value="Login"]').click()
    await page.waitForLoadState("networkidle")
    await page.locator("button[routerlink*='myorders']").click()

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6746e72eae2afd4c0bcf1111" })
    )

    await page.locator("button:has-text('View')").first().click()
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order")



})