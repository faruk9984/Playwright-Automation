const {test, expect}=require('@playwright/test');
const exp = require('constants');
const { type } = require('os');
const { text } = require('stream/consumers');


test('browser contest playwright test',async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/client/")
    await page.locator("#userEmail").fill("test@yopmail.com")
    await page.locator("#userPassword").fill("Farukmd494#")
    await page.locator('[value="Login"]').click()

    // await page.waitForLoadState("networkidle")
    await page.locator(".card-body b").first().waitFor()
    const titles=await page.locator(".card-body b").allTextContents()
    console.log(titles)
 
});


test('UI Controls',async ({page})=>{

    // const contest=await browser.newContext()
    // const page=await contest.newPage()

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    const userName=page.locator("#username")
    const signIn=page.locator("#signInBtn")
    const dropdown=page.locator("select.form-control")
    dropdown.selectOption("consult")
    await page.locator(".radiotextsty").last().click()
    await page.locator("#okayBtn").click()

    console.log(await page.locator(".radiotextsty").last().isChecked())
    await expect(page.locator(".radiotextsty").last()).toBeChecked()
    
    await page.locator("#terms").click()
    await expect(page.locator("#terms")).toBeChecked()
    await page.locator("#terms").uncheck()
    expect(await page.locator("#terms").isChecked()).toBeFalsy()

    const documentLink=page.locator("[href*='documents-request']")
    await expect(documentLink).toHaveAttribute("class","blinkingText")



    // await page.pause();
 

});


test('child window handle',async({browser})=>{

    const contest=await browser.newContext()
    const page=await contest.newPage()

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    const documentLink=page.locator("[href*='documents-request']")
    // open a new tab    
    const [newPage,newPage2]=await Promise.all([
    contest.waitForEvent('page'),
    documentLink.click(),
    ])

    const text=await newPage.locator(".red").textContent()
    console.log(text) 
    // email collect
    const arrayText=text.split("@")
    const domain=arrayText[1].split(" ")[0]
    console.log(domain)

    const userName=page.locator("#username")
    await page.locator("#username").fill(domain)
    await page.pause();
    console.log(await page.locator("#username").textContent())

 
})




test('test', async ({ page }) => {
    await page.goto('https://www.google.com/');
    await page.getByLabel('সার্চ করুন', { exact: true }).click();
    await page.getByLabel('সার্চ করুন', { exact: true }).fill('selise bangladesh');
    await page.goto('https://www.google.com/search?q=selise+bangladesh&sca_esv=8d771920c62c0cac&source=hp&ei=_QA8Z9SNKYa6seMPu8WPqQ4&iflsig=AL9hbdgAAAAAZzwPDZasL8NJuiLMmZ3UUXGXfDHHSsOf&ved=0ahUKEwiUgPuwteeJAxUGXWwGHbviI-UQ4dUDCA0&uact=5&oq=selise+bangladesh&gs_lp=Egdnd3Mtd2l6IhFzZWxpc2UgYmFuZ2xhZGVzaDINEC4YgAQYExjHARivATIHEAAYgAQYEzIHEAAYgAQYEzIIEAAYExgWGB4yCBAAGIAEGKIEMggQABiABBiiBDIIEAAYgAQYogQyCBAAGIAEGKIESPdJUNsfWLBCcAF4AJABAJgBnAGgAa4SqgEEMC4xN7gBA8gBAPgBAZgCEqAC9hKoAgrCAgoQABgDGOoCGI8BwgIMEAAYAxjqAhgKGI8BwgILEC4YgAQYsQMYigXCAg4QABiABBixAxiDARiKBcICCxAAGIAEGLEDGIoFwgIIEAAYgAQYsQPCAgsQABiABBixAxiDAcICCxAuGIAEGNEDGMcBwgIFEAAYgATCAgQQABgDwgILEC4YgAQYsQMYgwHCAgsQLhiABBjHARivAcICBRAuGIAEwgIJEAAYgAQYExgKwgIPEC4YgAQYExjHARgNGK8BwgIKEAAYExgWGAoYHsICBhAAGBYYHsICCRAAGIAEGBMYDZgDB5IHBDEuMTegB4F-&sclient=gws-wiz');
    await page.getByRole('link', { name: 'SELISE Digital Platforms:' }).click();
    await page.getByRole('button', { name: 'Deny' }).click();
    await page.getByRole('link', { name: 'Join the Team' }).click();
    await page.goto('https://selisegroup.com/join-the-team/');
    await page.locator('div:nth-child(2) > div:nth-child(2) > .elementor-widget-wrap').click();
    await page.locator('#results div').filter({ hasText: 'Apply Automation QA' }).getByRole('link').click();
  });





test.only('browser contest playwright test 22',async ({page})=>{

    const products=page.locator(".card-body")
    const productName="ADIDAS ORIGINAL"
    const email=page.locator("#userEmail")
    const Email1="test@yopmail.com"

    await page.goto("https://rahulshettyacademy.com/client/")
    // await email.fill("test@yopmail.com")
    // await page.locator("#userPassword").fill("Farukmd494#")
    // await page.locator('[value="Login"]').click()

    await page.getByPlaceholder("email@example.com").fill(Email1)
    await page.getByPlaceholder("enter your passsword").fill("Farukmd494#")
    await page.getByRole("button",{name:'Login'}).click()

    // await page.waitForLoadState("networkidle")
    await page.locator(".card-body b").first().waitFor()
    const titles=await page.locator(".card-body b").allTextContents()
    console.log(titles)

    await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).getByRole("button",{name:' Add To Cart'}).click()
    await page.getByRole("listitem").getByRole("button",{name:'Cart'}).click()

    await page.locator("div li").first().waitFor()
    await expect(page.getByText("ZARA COAT 3")).toBeVisible()
    await page.getByRole("button",{name:'Checkout'}).click()

    await page.getByPlaceholder("Select Country").pressSequentially("ind",{delay:100})
    await page.getByRole("button",{name:"India"}).nth(1).click()
    await page.getByText("PLACE ORDER").click()
    await expect(page.getByText(" Thankyou for the order. ")).toBeVisible()
    await page.getByRole("listitem").getByRole("button",{name:'ORDERS'}).click()
    await page.locator("tbody").waitFor()
    await page.locator("tbody tr").filter({hasText:"ZARA COAT 3"}).getByRole("button",{name:'View'}).nth(0).click()
    const sameOrderIb=await page.locator(".col-text").textContent()
    console.log(sameOrderIb)
    await expect(page.getByText("ZARA COAT 3")).toBeVisible()
    await page.pause()


    // const count=await products.count()
    // for(let i=0;i<count;++i)
    // {
    //     if(await products.nth(i).locator("b").textContent() === productName){
    //         await products.nth(i).locator("text= Add To Cart").click()
    //         break
    //     }
    // }



    // await page.locator('[routerlink*="cart"]').click()
    // const bool=await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible()
    // expect(bool).toBeTruthy()
    // await page.locator("text=checkout").click()


    // const element = page.locator('h1');
    // await expect(element).toBeVisible();
    // await page.locator("text=Checkout").click()
    // await page.locator('[placeholder*="Country"]').pressSequentially("ind",{delay:100})
    // const dropdowns=page.locator(".ta-results")
    // await dropdowns.waitFor()
    // const optioncount=await dropdowns.locator("button").count()
    // for(let i=0;i<optioncount;++i)
    // {
    //     const text=await dropdowns.locator("button").nth(i).textContent()
    //     if(text === " India")
    //     {
    //         await dropdowns.locator("button").nth(i).click()
    //         break
    //     }

    // }


    // await page.pause()
    // await page.locator(".input.ddl").first().selectOption('12')
    // await page.locator(".input.ddl").last().selectOption('15')
    // await page.locator('.field.small [type="text"]').first().fill("123")
    // await page.locator(".field [class$='input txt']").last().fill("Visa Card")
    // await page.locator('[name="coupon"]').fill("rahulshettyacademy")
    // await page.locator('[type="submit"]').click()
    // await expect(page.locator('.user__name.mt-5 [type="text"]').first()).toHaveText("test@yopmail.com")
    // await page.locator(".action__submit").click()
    // await expect(page.locator('.hero-primary')).toHaveText(" Thankyou for the order. ")

    // const orderid=await page.locator(".em-spacer-1 .ng-star-inserted").textContent()
    // console.log(orderid)
    // await page.pause()

    // await page.locator("button[routerlink*='myorders']").click()
    // await page.locator("tbody").waitFor()

    // const rows=await page.locator("tbody tr")
    // for(let i=0;i<await rows.count();++i)
    // {
    //     const rowOrderId=await rows.nth(i).locator("th").textContent()
    //     if(orderid.includes(rowOrderId))
    //     {
    //         await rows.nth(i).locator("button").first().click()
    //         break
    //     }

    // }
    // const sameOrderIb=await page.locator(".col-text").textContent()
    // console.log(sameOrderIb)
    // expect(orderid.includes(sameOrderIb)).toBeTruthy()

    // const nameProduct=await page.locator(".artwork-card-info .title").textContent()
    // console.log(nameProduct)
    // await expect(page.locator(".artwork-card-info .title")).toHaveText(" ADIDAS ORIGINAL ")

    // const emailold=await page.locator("p:has-text('test@yopmail.com')").last().textContent()
    // console.log(emailold)
    // await expect(page.locator("p:has-text(' test@yopmail.com ')").last()).toHaveText(" test@yopmail.com ")

    // const countryName=await page.locator("p:has-text('Country - India')").last().textContent()
    // console.log(countryName)
    // await expect(page.locator("p:has-text(' Country - India ')").last()).toHaveText(" Country - India ")



});