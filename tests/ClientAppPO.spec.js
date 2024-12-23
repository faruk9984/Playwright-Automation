const { test, expect } = require('@playwright/test');
const exp = require('constants');
const { LoginPage } = require('../pageobjects/LoginPage')
const { DashboardPage } = require('../pageobjects/DashboardPage')
const { POManager } = require('../pageobjects/POManager')
// json -> string -> js object
const dataset = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")))
const { customtest } = require('../utils/test-base')


// one ony create and run
for (const data of dataset) {

    test(`Client app login for ${data.productName}`, async ({ page }) => {

        const poMnager = new POManager(page)

        // const loginPage = new LoginPage(page)
        const loginPage = poMnager.getLoginPage()
        await loginPage.goTo()
        await loginPage.validLogin(data.username, data.password)
        // const dashboardPage = new DashboardPage(page)
        const dashboardPage = poMnager.getDashBoardPage()
        await dashboardPage.searchProductAddCart(data.productName)
        await dashboardPage.navigateToCart()

        const cartPage = poMnager.getCartPage()
        await cartPage.VerifyProductIsDisplayed(data.productName)
        await cartPage.Checkout()

        const ordersReviewPage = poMnager.getOrdersReviewPage();
        await ordersReviewPage.searchCountryAndSelect("ind", "India");
        const orderId = await ordersReviewPage.SubmitAndGetOrderId();
        console.log(orderId);

        await dashboardPage.navigateToOrders();
        const ordersHistoryPage = poMnager.getOrdersHistoryPage();
        await ordersHistoryPage.searchOrderAndSelect(orderId);
        expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

    });

}


// 2nd way create and run
customtest.only('Client app', async ({ page, testDataForOrder }) => {

    const poMnager = new POManager(page)

    // const loginPage = new LoginPage(page)
    const loginPage = poMnager.getLoginPage()
    await loginPage.goTo()
    await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password)
    // const dashboardPage = new DashboardPage(page)
    const dashboardPage = poMnager.getDashBoardPage()
    await dashboardPage.searchProductAddCart(testDataForOrder.productName)
    await dashboardPage.navigateToCart()

    const cartPage = poMnager.getCartPage()
    await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName)
    await cartPage.Checkout()

});
