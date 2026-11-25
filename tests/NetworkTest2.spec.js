const { test, expect } = require('@playwright/test');

test('Security test Network Intercept', async ({ page }) => {
    const email = "wbaansari@gmail.com";
    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Orange@1");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState("networkidle");
    await page.locator(".card-body b").first().waitFor();

    await page.locator("button[routerlink*='myorders']").click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6a4e210185b6749b49d571cd' })
    )
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator(".blink_me"));
})