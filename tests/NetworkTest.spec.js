const {test, expect, request}=require('@playwright/test');
const { create } = require('domain');
const { APiUtils } = require('./utils/APiUtils');


const loginPlayload={userEmail:"test@yopmail.com",userPassword:"Farukmd494#"}
const orderPlayload={orders:[{country:"Cuba",productOrderedId:"6581cade9fd99c85e8ee7ff5"}]}
let response
const fakePlayroadOrders={message:"No Product in Cart"}


test.beforeAll(async ()=>{
    const apiContext=await request.newContext();
    const apiUtials=new APiUtils(apiContext,loginPlayload)
    response=await apiUtials.createOrder(orderPlayload)
  
})


test('browser contest playwright test 2',async ({page})=>{

    page.addInitScript(value =>{
        window.localStorage.setItem('token',value)
    },response.token);

// No order Found Print if previous order exit
    await page.goto("https://rahulshettyacademy.com/client/")
    page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/62ab183ce26b7e1a10ede1d1",
        async route=>{
            const response=await page.request.fetch(route.request())
            let body=JSON.stringify(fakePlayroadOrders)
            route.fulfill({
                response,
                body,
            })
        }
    )

    await page.locator("button[routerlink*='myorders']").click()
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/62ab183ce26b7e1a10ede1d1")
    console.log(page.locator(".mt-4").textContent())

});
