const {test, expect, request}=require('@playwright/test');
const { create } = require('domain');
let webContext

test.beforeAll(async ({browser})=>{

    const context=await browser.newContext()
    const page=await context.newPage()
    await page.goto("https://rahulshettyacademy.com/client/")
    await page.locator("#userEmail").fill("test@yopmail.com")
    await page.locator("#userPassword").fill("Farukmd494#")
    await page.locator('[value="Login"]').click()
    await page.waitForLoadState("networkidle")
    await context.storageState({path:'state.json'})
    webContext=await browser.newContext({storageState:'state.json'})


})

test('browser contest playwright test 2',async ({})=>{

    const page=await webContext.newPage()
    await page.goto("https://rahulshettyacademy.com/client/")

    const products=page.locator(".card-body")
    const productName="ADIDAS ORIGINAL"
    const email=page.locator("#userEmail")


    // await page.waitForLoadState("networkidle")
    await page.locator(".card-body b").first().waitFor()
    const titles=await page.locator(".card-body b").allTextContents()
    console.log(titles)

    const count=await products.count()
    for(let i=0;i<count;++i)
    {
        if(await products.nth(i).locator("b").textContent() === productName){
            await products.nth(i).locator("text= Add To Cart").click()
            break
        }
    }

    // await page.pause()

    await page.locator('[routerlink*="cart"]').click()
    await page.locator("div li").first().waitFor()

    const bool=await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible()
    expect(bool).toBeTruthy()

    const element = page.locator('h1');
    await expect(element).toBeVisible();

    await page.locator("text=Checkout").click()
    
    await page.locator('[placeholder*="Country"]').pressSequentially("ind",{delay:100})
    const dropdowns=page.locator(".ta-results")
    await dropdowns.waitFor()
    const optioncount=await dropdowns.locator("button").count()
    for(let i=0;i<optioncount;++i)
    {
        const text=await dropdowns.locator("button").nth(i).textContent()
        if(text === " India")
        {
            await dropdowns.locator("button").nth(i).click()
            break
        }

    }
    // await page.pause()
    await page.locator(".input.ddl").first().selectOption('12')
    await page.locator(".input.ddl").last().selectOption('15')
    await page.locator('.field.small [type="text"]').first().fill("123")
    await page.locator(".field [class$='input txt']").last().fill("Visa Card")

    await page.locator('[name="coupon"]').fill("rahulshettyacademy")
    await page.locator('[type="submit"]').click()

    await expect(page.locator('.user__name.mt-5 [type="text"]').first()).toHaveText("test@yopmail.com")
    // await page.pause()
    await page.locator(".action__submit").click()
    await expect(page.locator('.hero-primary')).toHaveText(" Thankyou for the order. ")

    const orderid=await page.locator(".em-spacer-1 .ng-star-inserted").textContent()
    console.log(orderid)
    // await page.pause()

    await page.locator("button[routerlink*='myorders']").click()
    await page.locator("tbody").waitFor()

    const rows=await page.locator("tbody tr")
    for(let i=0;i<await rows.count();++i)
    {
        const rowOrderId=await rows.nth(i).locator("th").textContent()
        if(orderid.includes(rowOrderId))
        {
            await rows.nth(i).locator("button").first().click()
            break
        }

    }
    const sameOrderIb=await page.locator(".col-text").textContent()
    console.log(sameOrderIb)
    expect(orderid.includes(sameOrderIb)).toBeTruthy()

    const nameProduct=await page.locator(".artwork-card-info .title").textContent()
    console.log(nameProduct)
    await expect(page.locator(".artwork-card-info .title")).toHaveText(" ADIDAS ORIGINAL ")

    const emailold=await page.locator("p:has-text('test@yopmail.com')").last().textContent()
    console.log(emailold)
    await expect(page.locator("p:has-text(' test@yopmail.com ')").last()).toHaveText(" test@yopmail.com ")

    const countryName=await page.locator("p:has-text('Country - India')").last().textContent()
    console.log(countryName)
    await expect(page.locator("p:has-text(' Country - India ')").last()).toHaveText(" Country - India ")



});


test('browser contest playwright test 3',async ({})=>{

    const page=await webContext.newPage()
    await page.goto("https://rahulshettyacademy.com/client/")

    await page.locator(".card-body b").first().waitFor()
    const titles=await page.locator(".card-body b").allTextContents()
    console.log(titles)

})