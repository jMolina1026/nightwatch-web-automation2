const LoginPage = require('../../../nightwatch/page-objects/loginPage/LoginPage.js');
const HeaderPage = require('../../../nightwatch/page-objects/headerPage/headerPage.js');
const ProductsPage = require('../../../nightwatch/page-objects/productsPage/ProductsPage.js');
const ShoppingCartPage = require('../../../nightwatch/page-objects/shoppingCartPage/ShoppingCartPage.js');
const CheckoutInfoPage = require('../../../nightwatch/page-objects/checkoutInfoPage/CheckoutInfoPage.js');
const CheckoutOverviewPage = require('../../../nightwatch/page-objects/checkoutOverviewPage/CheckoutOverviewPage.js');
const CompletedCheckoutPage = require('../../../nightwatch/page-objects/completedCheckoutPage/CompletedCheckoutPage.js');
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
const completedCheckoutPage = new CompletedCheckoutPage();

describe('Given the user has completed the purchase,', () => {
  this.tags = ['checkoutComplete', 'checkoutCompleteSanity', 'Sanity'];
  
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

    await checkoutOverviewPage.clickTheOverviewButton(browser, checkoutOverviewPage.finishBtn);
    await browser.expect.element(headerPage.headerSecondTitle).to.have.text.equal('Checkout: Complete!');
  });

  afterEach(async () => {
    await browser.quit();
  });

  it('Verify that the Completed Checkout page has all required elements', async () => {
    await browser.expect.element(completedCheckoutPage.checkMark).to.be.present.and.be.visible;

    await browser.expect.element(completedCheckoutPage.thankYouMsg).to.be.present.and.be.visible;
    await browser.expect.element(completedCheckoutPage.thankYouMsg).to.have.text.equal('Thank you for your order!');

    await browser.expect.element(completedCheckoutPage.orderDispatched).to.be.present.and.be.visible;
    await browser.expect.element(completedCheckoutPage.orderDispatched).to.have.text.equal('Your order has been dispatched, and will arrive just as fast as the pony can get there!');

    await browser.expect.element(completedCheckoutPage.backToHome).to.be.present.and.be.visible;
    await browser.expect.element(completedCheckoutPage.backToHome).to.have.text.equal('Back Home');
  });
});
