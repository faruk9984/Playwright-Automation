const {test, expect, request}=require('@playwright/test');
const { create } = require('domain');
const { APiUtils } = require('./utils/APiUtils');

const loginPlayload={userEmail:"test@yopmail.com",userPassword:"Farukmd494#"}
const orderPlayload={orders:[{country:"Cuba",productOrderedId:"6581cade9fd99c85e8ee7ff5"}]}
let response


test.beforeAll(async ()=>{
    const apiContext=await request.newContext();
    const apiUtials=new APiUtils(apiContext,loginPlayload)
    response=await apiUtials.createOrder(orderPlayload)
  
})


test('browser contest playwright test 2',async ({page})=>{

    page.addInitScript(value =>{
        window.localStorage.setItem('token',value)

    },response.token);

    await page.goto("https://rahulshettyacademy.com/client/")


    await page.locator(".card-body b").first().waitFor()
    const titles=await page.locator(".card-body b").allTextContents()
    console.log(titles)

    await page.locator("button[routerlink*='myorders']").click()
    await page.locator("tbody").waitFor()

    const rows=await page.locator("tbody tr")
    for(let i=0;i<await rows.count();++i)
    {
        const rowOrderId=await rows.nth(i).locator("th").textContent()
        if(response.orderId.includes(rowOrderId))
        {
            await rows.nth(i).locator("button").first().click()
            break
        }

    }

    const orderIdDetails=await page.locator(".col-text").textContent()
    console.log(orderIdDetails)
    await page.pause()
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy()
 

});
