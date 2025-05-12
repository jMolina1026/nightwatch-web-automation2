const LoginPage = require('../../../nightwatch/page-objects/loginPage/LoginPage.js');
const HeaderPage = require('../../../nightwatch/page-objects/headerPage/headerPage.js');
const ProductsPage = require('../../../nightwatch/page-objects/productsPage/ProductsPage.js');
const ShoppingCartPage = require('../../../nightwatch/page-objects/shoppingCartPage/ShoppingCartPage.js');
const CheckoutInfoPage = require('../../../nightwatch/page-objects/checkoutInfoPage/CheckoutInfoPage.js');
const constants = require('../../../nightwatch/helpers/data/products.constants.js');

const utility = require('../../../nightwatch/helpers/utilities.js');
const { inputFields } = constants

const { navigateToApp } = utility;

const loginPage = new LoginPage();
const headerPage = new HeaderPage();
const productsPage = new ProductsPage();
const shoppingCartPage = new ShoppingCartPage();
const checkoutInfoPage = new CheckoutInfoPage();

describe('Given the user has added items to the Shopping Cart,', () => {
  this.tags = ['checkoutInfo', 'checkoutInfoRegression', 'Regression'];
  
  beforeEach(async () => {
    await navigateToApp(browser);
    loginPage.login(browser);

    const countOfItemsAdded = 3
    for (let i = 0; i < countOfItemsAdded; i++) {
      await productsPage.clickTheProductButton(browser, productsPage.productAddToCart, 0);
    }
    await headerPage.clickTheHeaderButton(browser, headerPage.shoppingCartButton);
    await browser.expect.element(headerPage.headerSecondTitle).to.have.text.equal('Your Cart');
    await shoppingCartPage.clickTheShoppingCartButton(browser, shoppingCartPage.detailsCheckoutBtn);
    await browser.expect.element(headerPage.headerSecondTitle).to.have.text.equal('Checkout: Your Information');
  });

  afterEach(async () => {
    await browser.quit();
  });

  it('Fill out all required Fields and continue to final step', async () => {
    for (let [key, value] of Object.entries(inputFields)) {
      await checkoutInfoPage.typeTextIntoInfoField(browser, checkoutInfoPage.getFieldElement(key), value);
      await browser.expect.element(checkoutInfoPage.getFieldElement(key)).to.have.value.equal(value);
    }

    await checkoutInfoPage.clickCheckoutInfoButton(browser, checkoutInfoPage.continueBtn);
    await browser.expect.element(headerPage.headerSecondTitle).to.have.text.equal('Checkout: Overview');
    await browser.pause(500);
  });

  it('Cancel the Checkout Information input', async () => {
    for (let [key, value] of Object.entries(inputFields)) {
      await checkoutInfoPage.typeTextIntoInfoField(browser, checkoutInfoPage.getFieldElement(key), value);
    }
    
    await checkoutInfoPage.clickCheckoutInfoButton(browser, checkoutInfoPage.cancelBtn);
    await browser.expect.element(headerPage.headerSecondTitle).to.have.text.equal('Your Cart');
  })

  it('Verify Error validations in info form', async () => {
    await checkoutInfoPage.clickCheckoutInfoButton(browser, checkoutInfoPage.continueBtn);
    await browser.expect.element(checkoutInfoPage.errorMessageContainer).to.have.text.equal('Error: First Name is required');
    await checkoutInfoPage.typeTextIntoInfoField(browser, checkoutInfoPage.firstName, inputFields.firstName);
    
    await checkoutInfoPage.clickCheckoutInfoButton(browser, checkoutInfoPage.continueBtn);
    await browser.expect.element(checkoutInfoPage.errorMessageContainer).to.have.text.equal('Error: Last Name is required');
    await checkoutInfoPage.typeTextIntoInfoField(browser, checkoutInfoPage.lastName, inputFields.lastName);

    await checkoutInfoPage.clickCheckoutInfoButton(browser, checkoutInfoPage.continueBtn);
    await browser.expect.element(checkoutInfoPage.errorMessageContainer).to.have.text.equal('Error: Postal Code is required');
  })
});
