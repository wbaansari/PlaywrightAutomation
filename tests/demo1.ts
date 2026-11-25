import { expect, type Locator, type Page } from '@playwright/test';

let message1 = "Hello"
let age: number = 2
console.log(age)
let bool:boolean = false

let numArr : number[] = [3,4,1]

//we can use any when not sure about datatype
let data : any = "This is good"
data = 42

//functions
function add(a:number, b:number): number //return type
{
    return(a+b)
}
add(3,5)

//Objects
let user: {name:string,age:number} = {name:"Basheer",age:38}

class CartPage
{
    page: Page;
    cartProducts: Locator;
constructor(page:any)
{
    
    this.page = page;
    this.cartProducts = page.locator("div li").first();
    this.productsText = page.locator(".card-body b");
    this.cart =  page.locator("[routerlink*='cart']");
    this.orders = page.locator("button[routerlink*='myorders']");
    this.checkout = page.locator("text=Checkout");

}