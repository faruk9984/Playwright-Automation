const { When, Then, Given } = require('@cucumber/cucumber')
const { POManager } = require('../../pageobjects/POManager')
const { expect } = require('@playwright/test');
const playwright = require('@playwright/test');

Given('a login to Ecommerce application with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {

    const browser = await playwright.chromium.launch({
        headless: false
    })
    const contest = await browser.newContext()
    const page = await contest.newPage()

    this.poMnager = new POManager(page)

    // const loginPage = new LoginPage(page)
    const loginPage = this.poMnager.getLoginPage()
    await loginPage.goTo()
    await loginPage.validLogin(username, password)
});


When('Add {string} to cart', async function (productName) {
    this.dashboardPage = this.poMnager.getDashBoardPage()
    await this.dashboardPage.searchProductAddCart(productName)
    await this.dashboardPage.navigateToCart()
});


Then('Verify {string} is displayed in the cart', async function (productName) {
    const cartPage = this.poMnager.getCartPage()
    await cartPage.VerifyProductIsDisplayed(productName)
    await cartPage.Checkout()
});

When('enter valid details and place the order', async function () {
    const ordersReviewPage = this.poMnager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
});

Then('Verify the order in present in the Orderhistory', async function () {
    this.dashboardPage.navigateToOrders();
    const ordersHistoryPage = this.poMnager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});




Given('a login to Ecommerce2 application with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {

    const userName = this.page.locator("#username")
    const signIn = this.page.locator("#signInBtn")

    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log(await this.page.title())
    // await page.pause();

    await userName.fill(username)
    await this.page.locator('[type="password"]').fill(password)
    await signIn.click()
});



Then('Verify Error message is displayed', async function () {
    console.log(await this.page.locator("[style*='block']").textContent())
    await expect(this.page.locator("[style*='block']")).toContainText('Incorrect');
  });

 

