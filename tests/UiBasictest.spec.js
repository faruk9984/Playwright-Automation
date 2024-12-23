const { test, expect } = require('@playwright/test');
const { request } = require('http');
const { type } = require('os');


test('browser contest playwright test', async ({ browser }) => {

    const contest = await browser.newContext()
    const page = await contest.newPage()

    const userName = page.locator("#username")
    const signIn = page.locator("#signInBtn")

    const cardTitles = page.locator(".card-body a")

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log(await page.title())
    // await page.pause();

    await userName.fill("rahulshetty")
    await page.locator('[type="password"]').fill("learning")
    await signIn.click()
    console.log(await page.locator("[style*='block']").textContent())
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    await userName.fill("")
    await userName.fill("rahulshettyacademy")
    await signIn.click()
    console.log(await cardTitles.first().textContent())
    console.log(await cardTitles.nth(1).textContent())
    const allTitles = await cardTitles.allTextContents()
    console.log(allTitles)

});


test('page playwright test', async ({ page }) => {

    // const contest=await browser.newContext()
    // const page=await contest.newPage()
    await page.goto("https://www.google.com/")
    console.log(await page.title())
    await expect(page).toHaveTitle("Google")
    // await page.pause();

});




test.only('browser contest validation running with no css, no images and status code', async ({ browser }) => {

    const contest = await browser.newContext()
    const page = await contest.newPage()
    
    const userName = page.locator("#username")
    const signIn = page.locator("#signInBtn")
    const cardTitles = page.locator(".card-body a")

    //running with no css, no images
    // page.route('**/*.{css,png,jpg,jpeg}',
    //     route=>route.abort())
    
    //running with all status code of the page
    page.on('request', request => console.log(request.url()))
    page.on('response', response => console.log(response.url(), response.status()))

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log(await page.title())
    // await page.pause();

    await userName.fill("rahulshetty")
    await page.locator('[type="password"]').fill("learning")
    await signIn.click()

    console.log(await page.locator("[style*='block']").textContent())
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    await userName.fill("")
    await userName.fill("rahulshettyacademy")
    await signIn.click()

    console.log(await cardTitles.first().textContent())
    console.log(await cardTitles.nth(1).textContent())
    const allTitles = await cardTitles.allTextContents()
    console.log(allTitles)
    await page.pause()

});