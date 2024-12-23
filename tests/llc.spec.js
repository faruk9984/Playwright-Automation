import {test, expect} from '@playwright/test';


test('playwright special locator',async ({page}) =>{

    await page.goto("https://rahulshettyacademy.com/angularpractice/")

    await page.getByLabel("Check me out if you Love IceCreams!").click()
    await page.getByLabel("Employed").check()
    await page.getByLabel("Gender").selectOption("Female")
    await page.getByPlaceholder("Password").fill('password123')
    await page.getByRole("button",{name: 'Submit'}).click()
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible()
    await page.getByRole("link",{name:"Shop"}).click()
    await page.locator("app-card").filter({hasText:'Nokia Edge'}).getByRole("button").click()
    await page.pause()

})


test('playwright special locator 2233',async ({page}) =>{

    const products=page.locator(".card-body")
    const productName="ADIDAS ORIGINAL"
    const email=page.locator("#userEmail")
    const Email1="test@yopmail.com"

    await page.goto("https://rahulshettyacademy.com/client/")

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
    await page.pause()

})



test('calender validation',async ({page}) =>{

    const monthNumber='6'
    const date='15'
    const year ='2027'
    const expectedList=[monthNumber,date,year]
    
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers")
    await page.locator(".react-date-picker__inputGroup").click()
    await page.locator(".react-calendar__navigation__label").click()
    await page.locator(".react-calendar__navigation__label").click()
    page.getByText(year).click()
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click()
    // await page.locator(".react-calendar__month-view__days__day").nth(Number(date)).click()
    await page.locator("//abbr[contains(.,'"+date+"')]").click()


    const inputs=page.locator(".react-date-picker__inputGroup input")
    for(let index=0;index<inputs;index++)
    {
        const value=inputs[index].getAttribute("value")
        expect(value).toEqual(expectedList[index])

    }
        
    await page.pause()

})




test('popup validation',async ({page}) =>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    // await page.goto("https://google.com/")
    // await page.goBack()
    // await page.goForward()
    await expect(page.locator("#displayed-text")).toBeVisible()
    await page.locator("#hide-textbox").click()
    await expect(page.locator("#displayed-text")).toBeHidden()

    //dialog box handle
    page.on('dialog',dialog=>dialog.accept())
    // page.on('dialog',dialog=>dialog.dismiss())
    await page.locator("#confirmbtn").click()
    //mouse hover handle
    await page.locator("#mousehover").hover()

    //iframe handle
    const frameSpace=page.frameLocator("#courses-iframe")
    await frameSpace.locator("li a[href*='lifetime-access']:visible").click()
    const textCheck=await frameSpace.locator(".text h2").textContent()
    console.log(textCheck.split(" ")[0])
    console.log("Total: "+textCheck.split(" ")[1])
    console.log(textCheck.split(" ")[2])
    console.log(textCheck.split(" ")[3]) 

})




test('screenshort and visial comparaision',async ({page}) =>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    await expect(page.locator("#displayed-text")).toBeVisible()
    await page.screenshot({path:'screenshot1.png'})
    await page.locator("#displayed-text").screenshot({path:'patrialScreenshot.png'})
    await page.locator("#hide-textbox").click()
    await page.screenshot({path:'screenshot.png'})
    await expect(page.locator("#displayed-text")).toBeHidden()


})

test.only('visial comparaision',async ({page}) =>{

    await page.goto("https://google.com/")
    expect(await page.screenshot()).toMatchSnapshot('landing.png')
})