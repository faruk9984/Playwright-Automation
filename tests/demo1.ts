import { expect, type Locator, type Page } from '@playwright/test';


let messege1: string = "Hello";
messege1 = "bye"
console.log(messege1)
let age1: number = 20
console.log(age1)
let isActive: boolean = false
let numbers: number[] = [1, 2, 3, 4, 5]

let data: any = "this could be anything";
data = 42;

function add(a:number,b:number):number
{
    return a+b
}
add(3,4)


class CartPage {
    page:Page;
    cartProducts:Locator
    productsText:Locator
    cart:Locator
    orders:Locator
    checkout:Locator

    constructor(page) {
        this.page = page;
        this.cartProducts = page.locator("div li").first();
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.orders = page.locator("button[routerlink*='myorders']");
        this.checkout = page.locator("text=Checkout");

    }
}