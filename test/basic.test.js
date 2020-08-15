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

describe('Guest UI tests', function() {
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

    it('Logging in with invalid credentials should show error message', async() =>{
        //click on Login
        await driver.findElement(By.css('#container nav a')).click();

        const invalidUser = 'wrong';
        const invalidPassword = 'wrong';
        // Fill in the form and submit
        await driver.findElement(By.id("usernameInput")).click();
        await driver.findElement(By.id("usernameInput")).sendKeys(invalidUser);
        await driver.findElement(By.id("passwordInput")).click();
        await driver.findElement(By.id("passwordInput")).sendKeys(invalidPassword);
        await driver.findElement(By.css(".login-button")).click();

        let errorText = await driver.findElement(By.css("div.errors")).getText();
        return expect(errorText).include("Oops!");
    })

    it('Trying to add an item will have the basket do nothing', async() => {
        await driver.findElement(By.css('.main-home .breakout form input[type="submit"]')).click();
        await driver.findElement(By.css('.main-listing .restaurants a')).click();
        await driver.findElement(By.css('.main-single .menu-section .menu a')).click();

        let basketText = await driver.findElement(By.css("div.basket")).getText();
        return expect(basketText).include("Log in");
    })





});

describe('User UI tests', function() {
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

    it('Logging with correct user credentials should take you to the listing page', async() =>{

        //Logging in
        await driver.findElement(By.css('#container nav a')).click();
        const validUser = 'adam';
        const validPassword = 'adam';
        await driver.findElement(By.id("usernameInput")).click();
        await driver.findElement(By.id("usernameInput")).sendKeys(validUser);
        await driver.findElement(By.id("passwordInput")).click();
        await driver.findElement(By.id("passwordInput")).sendKeys(validPassword);
        await driver.findElement(By.css(".login-button")).click();

        let pageTitle = await driver.findElement(By.id("suburb-title")).getText();
        return expect(pageTitle).include("Restaurants");
    })

    it('While logged in, adding an item from a restaurant should populate the basket with that restaurant name', async() => {

        //Logging in
        await driver.findElement(By.css('#container nav a')).click();
        const validUser = 'adam';
        const validPassword = 'adam';
        await driver.findElement(By.id("usernameInput")).click();
        await driver.findElement(By.id("usernameInput")).sendKeys(validUser);
        await driver.findElement(By.id("passwordInput")).click();
        await driver.findElement(By.id("passwordInput")).sendKeys(validPassword);
        await driver.findElement(By.css(".login-button")).click();

        let restaurantName = await driver.findElement(By.css(".main-listing .restaurants .content h4")).getText();

        await driver.findElement(By.css('.main-listing .restaurants a')).click();
        await driver.findElement(By.css('.main-single .menu-section .menu a')).click();

        let e = await driver.wait(until.elementLocated(By.css('.basket .cart-contents h5'))).getText();
        return expect(e).include(e,restaurantName);
    })

    it('Checking out with cash should instantly take user to status page with order Processing', async() => {

        //Logging in
        await driver.findElement(By.css('#container nav a')).click();
        const validUser = 'adam';
        const validPassword = 'adam';
        await driver.findElement(By.id("usernameInput")).click();
        await driver.findElement(By.id("usernameInput")).sendKeys(validUser);
        await driver.findElement(By.id("passwordInput")).click();
        await driver.findElement(By.id("passwordInput")).sendKeys(validPassword);
        await driver.findElement(By.css(".login-button")).click();

        //adding to cart and clicking checkout
        await driver.findElement(By.css('.main-listing .restaurants a')).click();
        await driver.findElement(By.css('.main-single .menu-section .menu a')).click();
        await driver.findElement(By.css("div.checkout-button")).click();

        await driver.findElement(By.css('#payment-method>option[value="cash"]')).click();
        await driver.findElement(By.css('input.dbe-button')).click();


        let e = await driver.wait(until.elementLocated(By.css('.main-status h1'))).getText();
        return expect(e).include(e,"Processing");
    })

})

describe('Admin UI tests', function() {
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

    it('Logging as admin should lead to admin stats page', async() =>{

        //Logging in
        await driver.findElement(By.css('#container nav a')).click();
        const validUser = 'admin';
        const validPassword = 'admin';
        await driver.findElement(By.id("usernameInput")).click();
        await driver.findElement(By.id("usernameInput")).sendKeys(validUser);
        await driver.findElement(By.id("passwordInput")).click();
        await driver.findElement(By.id("passwordInput")).sendKeys(validPassword);
        await driver.findElement(By.css(".login-button")).click();

        let pageTitle = await driver.findElement(By.css(".main-admin-stats .header h3")).getText();
        return expect(pageTitle).include("Statistics");
    })

    it('Admin should be able to navigate into each order by their ID on the order page', async() =>{

        //Logging in
        await driver.findElement(By.css('#container nav a')).click();
        const validUser = 'admin';
        const validPassword = 'admin';
        await driver.findElement(By.id("usernameInput")).click();
        await driver.findElement(By.id("usernameInput")).sendKeys(validUser);
        await driver.findElement(By.id("passwordInput")).click();
        await driver.findElement(By.id("passwordInput")).sendKeys(validPassword);
        await driver.findElement(By.css(".login-button")).click();
        await driver.findElement(By.css('nav a')).click();

        let orderID = await driver.findElement(By.css('table tr td a')).getText();
        await driver.findElement(By.css('table tr td a ')).click();

        let orderTitle = await driver.findElement(By.css(".single-order .order-details .header h3")).getText();
        return expect(orderTitle).include(orderID);
    })

})