const {test, expect} = require('@playwright/test');

test.only('First Playwright Test', async ({browser}) =>

{
    
    const context = await browser.newContext();
    const page = await context.newPage();
    //page.route('**/*.css', route => route.abort());
    //page.route('**/*.{jpg,png,jpeg}', route => route.abort());
    const username = page.locator("#username");
    const signIn = page.locator("#signInBtn");
    const allTitles = page.locator(".card-body a");
    // page.on('request', request => console.log(request.url()));
    // page.on('response', response => console.log(response.url(), response.status()));
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await username.fill("rahulshettyacademy");
    await page.locator("[type='password']").fill("Learning@830$3mK2");
    await signIn.click();
    // console.log(await page.locator("[style*='block']").textContent());
    // await expect(page.locator("[style*='block']")).toContainText('Incorrect username/password.');

    // await username.fill("");
    // await username.fill("rahulshettyacademy");
    // await signIn.click();
    // // console.log(await page.locator(".card-body a").nth(0).textContent());
    // // await page.waitForLoadState('networkidle');
    // await page.locator(".card-body a").first().waitFor();
    // const cardTitles = await allTitles.allTextContents();
    // console.log(cardTitles);
});

test('UI Controls', async ({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const username = page.locator("#username");
    const signIn = page.locator("#signInBtn");
    const docLink = page.locator("[href*='documents-request']");
    const dropDown = page.locator("select.form-control");
    await dropDown.selectOption("consult");
    await page.locator(".radiotextsty").nth(1).click();
    await page.locator("#okayBtn").click();
    console.log(await page.locator(".radiotextsty").nth(1).isChecked());
    expect(page.locator(".radiotextsty").nth(1)).toBeChecked();
    //await page.pause();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    await expect(page.locator("#terms").isChecked).toBeFalsy();
    await expect(docLink).toHaveAttribute("class","blinkingText");
});

test('Child Windows Handling', async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const docLink = page.locator("[href*='documents-request']");
    
    const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    docLink.click(),
    ])

    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    console.log(domain);

    await page.locator("#username").fill(domain);
    //await page.pause();
});