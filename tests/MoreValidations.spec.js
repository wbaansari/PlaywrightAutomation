const {test,expect} = require("@playwright/test");
const { waitForDebugger } = require("node:inspector");

test("Popup Validations",async({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    //await page.goBack();
    await page.locator("#displayed-text").isVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    await page.pause();
    page.on("dialog",dialog => dialog.dismiss());
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();
    const framesPage = page.frameLocator("#courses-iframe");
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck = await framesPage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);
});

test("Screenshots & Visual Comparison", async({page}) => 
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.locator("#displayed-text").isVisible();
    await page.locator("#displayed-text").screenshot({path: "partialss.png"});
    await page.locator("#hide-textbox").click();
    await page.screenshot({path: "screenshot.png"});
    await expect(page.locator("#displayed-text")).toBeHidden();
})

//To match screenshot with existing one
test.only('Visual', async({page}) => 
{
    await page.goto("https://www.rediff.com/");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');
})