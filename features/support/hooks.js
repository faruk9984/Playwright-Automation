const { POManager } = require('../../pageobjects/POManager')
const playwright = require('@playwright/test');
const { Before, After, BeforeStep, AfterStep, Status } = require('@cucumber/cucumber');
const path = require('path');

Before({tags: "@foo"}, async function () {

    const browser = await playwright.chromium.launch({
        headless: false
    })
    const contest = await browser.newContext()
    this.page = await contest.newPage()
    this.poMnager = new POManager(this.page)

});



BeforeStep(function () {
    // This hook will be executed before all steps in a scenario with tag @foo
});


AfterStep(async function ({ result }) {
    // This hook will be executed after all steps, and take a screenshot on step failure
    if (result.status === Status.FAILED) {
        // await this.page.takeScreenshot({ path: 'screenshort11.png' });
        await this.page.screenshot({ path: 'screenshort11.png' });

    }
});




After(function () {
    // Assuming this.driver is a selenium webdriver
    // return this.driver.quit();
    console.log("I am last to execute")
});