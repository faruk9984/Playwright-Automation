import {test, expect} from '@playwright/test';


 

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
        
    // await page.pause()

})






 