const { By, Builder, until } = require('selenium-webdriver');
const { suite } = require('selenium-webdriver/testing');

var fs = require('fs');

//Create TestResults Directory if does not exist
var dir = './TestResults';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}


suite(function (env) {
    describe('Lush', function () {
        let driver;

        before(async function () {
            driver = await new Builder().forBrowser('safari').build();
        });

        after(async () => await driver.quit());

        it('Test', async function () {
            //Set window size
            await driver.manage().window().setRect({ width: 600, height: 1500 });
            //Navigate to the website
            await driver.get('https://www.lush.ca/');
            //Close popup
            let click = driver.findElement(By.className('close-popup'));
            const actions = driver.actions({ async: true });
            await actions.move({ origin: click }).click().perform();
            //Open the menu            
            let click2 = driver.findElement(By.className('navbar-toggler'));
            const actions2 = driver.actions({ async: true });
            await actions2.move({ origin: click2 }).click().perform();
            //Open category
            let click3 = driver.findElement(By.id('all-new'));
            const actions3 = driver.actions({ async: true });
            await actions3.move({ origin: click3 }).click().perform();
            //Choose category custom-link-all-new
            let click4 = driver.findElement(By.id('custom-link-all-new'));
            const actions4 = driver.actions({ async: true });
            await actions4.move({ origin: click4 }).click().perform();

            //Wait until the page to be loaded
            await driver.wait(until.elementLocated(By.xpath('//*[@id="product-search-results"]/div/div[2]/div[4]/div[2]/div/div/div[3]/div[5]/div[2]/button')));
            //Add to cart
            let click5 = await driver.findElement(By.xpath('//*[@id="product-search-results"]/div/div[2]/div[4]/div[2]/div/div/div[3]/div[5]/div[2]/button'));
            const actions5 = await driver.actions({ async: true });
            await actions5.move({ origin: click5 }).click().perform();
            //Wait for the popup
            await driver.wait(until.elementLocated(By.id('add-to-cart-modal')));
            await driver.navigate().refresh();
            //Add another thing to the cart
            let click7 = driver.findElement(By.xpath('//*[@id="product-search-results"]/div/div[2]/div[4]/div[1]/div/div/div[3]/div[5]/div[2]/button'));
            const actions7 = driver.actions({ async: true });
            await actions7.move({ origin: click7 }).click().perform();
            //Wait for the popup
            await driver.wait(until.elementLocated(By.id('add-to-cart-modal')));
            //Take screenshot for the shopping cart
            await driver.get('https://www.lush.ca/en/cart');
            let encodedString = await driver.takeScreenshot();
            await fs.writeFileSync('./TestResults/AutomationResult.png', encodedString, 'base64');
        });

    });
});