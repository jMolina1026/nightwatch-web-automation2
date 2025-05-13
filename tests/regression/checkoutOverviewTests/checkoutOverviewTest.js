const LoginPage = require('../../../nightwatch/page-objects/loginPage/LoginPage.js');
const HeaderPage = require('../../../nightwatch/page-objects/headerPage/headerPage.js');
const ProductsPage = require('../../../nightwatch/page-objects/productsPage/ProductsPage.js');
const ShoppingCartPage = require('../../../nightwatch/page-objects/shoppingCartPage/ShoppingCartPage.js');
const CheckoutInfoPage = require('../../../nightwatch/page-objects/checkoutInfoPage/CheckoutInfoPage.js');
const CheckoutOverviewPage = require('../../../nightwatch/page-objects/checkoutOverviewPage/CheckoutOverviewPage.js');
const constants = require('../../../nightwatch/helpers/data/products.constants.js');

const utility = require('../../../nightwatch/helpers/utilities.js');
const { inputFields } = constants

const { navigateToApp } = utility;

const loginPage = new LoginPage();
const headerPage = new HeaderPage();
const productsPage = new ProductsPage();
const shoppingCartPage = new ShoppingCartPage();
const checkoutInfoPage = new CheckoutInfoPage();
const checkoutOverviewPage = new CheckoutOverviewPage();

describe('Given the user has added items to the Shopping Cart and proceeded to final checkout,', () => {
  this.tags = ['checkoutOverview', 'checkoutOverviewRegression', 'Regression'];
  
  beforeEach(async () => {
    await navigateToApp(browser);
    loginPage.login(browser);

    const countOfItemsAdded = 3
    for (let i = 0; i < countOfItemsAdded; i++) {
      await productsPage.clickTheProductButton(browser, productsPage.productAddToCart, 0);
    }
    await headerPage.clickTheHeaderButton(browser, headerPage.shoppingCartButton);
    await shoppingCartPage.clickTheShoppingCartButton(browser, shoppingCartPage.detailsCheckoutBtn);

    for (let [key, value] of Object.entries(inputFields)) {
      await checkoutInfoPage.typeTextIntoInfoField(browser, checkoutInfoPage.getFieldElement(key), value);
    }
    await checkoutInfoPage.clickCheckoutInfoButton(browser, checkoutInfoPage.continueBtn);
    await browser.expect.element(headerPage.headerSecondTitle).to.have.text.equal('Checkout: Overview');
  });

  afterEach(async () => {
    await browser.quit();
  });

  it('Cancels the order', async () => {
    await checkoutOverviewPage.clickTheOverviewButton(browser, checkoutOverviewPage.cancelBtn);
    await browser.expect.element(headerPage.headerSecondTitle).to.have.text.equal('Products');
  });

  it('Finish the order', async () => {
    await checkoutOverviewPage.clickTheOverviewButton(browser, checkoutOverviewPage.finishBtn);
    await browser.expect.element(headerPage.headerSecondTitle).to.have.text.equal('Checkout: Complete!');
  })
});
