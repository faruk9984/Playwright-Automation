
const exp = require('constants');

import {test, expect} from '@playwright/test'
import { POManager }from '../pageobjects_ts/POManager'
import { LoginPage }from '../pageobjects_ts/LoginPage'
import { DashboardPage }from '../pageobjects_ts/DashboardPage'


// json -> string -> js object
const dataset = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")))
import{customTest}from '../utils_ts/test-base'


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
        let orderId:any
        orderId = await ordersReviewPage.SubmitAndGetOrderId();
        console.log(orderId);

        await dashboardPage.navigateToOrders();
        const ordersHistoryPage = poMnager.getOrdersHistoryPage();
        await ordersHistoryPage.searchOrderAndSelect(orderId);
        expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

    });

}


// 2nd way create and run
customTest.only('Client app', async ({ page, testDataForOrder }) => {

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
