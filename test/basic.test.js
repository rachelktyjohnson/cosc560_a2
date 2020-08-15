require('geckodriver');
const { describe, it, after, before, beforeEach } = require('mocha');
const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until,
    Capabilities = webdriver.Capabilities;
const caps = new Capabilities();
caps.setPageLoadStrategy("normal");
const firefox = require('selenium-webdriver/firefox');
const fs = require('fs');
const path = require('path');
// custom async forEach function
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}
// change URL to match your dev URL
const myURL = 'http://localhost:8080/';

// Do nothing for unhandled rejection
process.on('unhandledRejection', () => {});

describe('UI test', function() {
    let driver;

    before(() => {
        driver = new webdriver.Builder()
            .withCapabilities(caps)
            .forBrowser('firefox')
            .build();
    });
    beforeEach(() => {
        driver.get(myURL);
    })

    after(() => {
        driver.close();
    });


    it('Click edit button, filling it in', async() => {
        // click the Edit button
        await driver.findElement(By.css('#expense_1 .edit_expense')).click();

        // Maximise the browser window
        await driver.manage().window().maximize();

        // We will find the element by css, then fill in the value
        // Define elements here, so we can use a for loop
        let elements = [{
            css: '#expense_1 input[name=expense_date]',
            value: '2020-08-01'
        },
            {
                css: '#expense_1 input[name=category]',
                value: 'AAAAA'
            },
            {
                css: '#expense_1 input[name=amount]',
                value: '11.11'
            },
            {
                css: '#expense_1 input[name=description]',
                value: 'bbbbbb'
            }
        ];

        for (let i = 0; i < elements.length; i++) {
            // Find the element
            let e = await driver.findElement(By.css(elements[i].css));
            // Clear the input and fill in the values
            await e.clear();
            await e.sendKeys(elements[i].value);
        }


        // Take a screenshot
        let encodedString = await driver.takeScreenshot();
        // Save it as 'screenshots/{time}.png'
        let filename = (new Date()).getTime() + '.png';
        fs.writeFileSync(path.join(__dirname, 'screenshots', filename), encodedString, 'base64');

        let e = await driver.findElement(By.css(elements[0].css));
        let text = await e.getAttribute("value");

        // Normally we would like to check every input that we have filled in.
        // For demostration, we only check the date input here.
        return expect(text).include(elements[0].value);
    })
    it('should return -1 when the value is not present', function () {
        assert.equal([1, 2, 3].indexOf(4), -1);
    });


});
