const {test, expect, request}=require('@playwright/test');
const { create } = require('domain');


// login using token

const loginPlayload={userEmail:"test@yopmail.com",userPassword:"Farukmd494#"}
const orderPlayload={orders:[{country:"Cuba",productOrderedId:"6581cade9fd99c85e8ee7ff5"}]}
let token;
let orderId;


test.beforeAll(async ()=>{
    const apiContext=await request.newContext();
    const loginResponse=await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data:loginPlayload
        }
    )
    // 200, 201
    expect(loginResponse.ok()).toBeTruthy()
    const loginResponseJson=await loginResponse.json()
    token=loginResponseJson.token
    console.log("token: ",token)


    const orderResponse=await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data:orderPlayload,
            headers:{
                'authorization':token,
                'content-type':'application/json'
            },
        }
    )
    const orderResponseJson=await orderResponse.json()
    console.log(orderResponseJson)
    orderId=orderResponseJson.orders[0]
    
})

test.beforeEach( ()=>{

})

test('browser contest playwright test 2',async ({page})=>{

    page.addInitScript(value =>{
        window.localStorage.setItem('token',value)

    },token);

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
        if(orderId.includes(rowOrderId))
        {
            await rows.nth(i).locator("button").first().click()
            break
        }

    }

    const orderIdDetails=await page.locator(".col-text").textContent()
    console.log(orderIdDetails)
    await page.pause()
    expect(orderId.includes(orderIdDetails)).toBeTruthy()
 

});
