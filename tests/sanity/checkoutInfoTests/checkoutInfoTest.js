const LoginPage = require('../../../nightwatch/page-objects/loginPage/LoginPage.js');
const HeaderPage = require('../../../nightwatch/page-objects/headerPage/headerPage.js');
const ProductsPage = require('../../../nightwatch/page-objects/productsPage/ProductsPage.js');
const ShoppingCartPage = require('../../../nightwatch/page-objects/shoppingCartPage/ShoppingCartPage.js');
const CheckoutInfoPage = require('../../../nightwatch/page-objects/checkoutInfoPage/CheckoutInfoPage.js');
const constants = require('../../../nightwatch/helpers/data/products.constants.js');

const utility = require('../../../nightwatch/helpers/utilities.js');
const { chkoutInfoPlaceHolders } = constants

const { navigateToApp } = utility;

const loginPage = new LoginPage();
const headerPage = new HeaderPage();
const productsPage = new ProductsPage();
const shoppingCartPage = new ShoppingCartPage();
const checkoutInfoPage = new CheckoutInfoPage();

describe('Given the user has added items to the Shopping Cart,', () => {
  this.tags = ['checkoutInfo', 'checkoutInfoSanity', 'Sanity'];
  
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

  it('Verify the Checkout Info fields', async () => {
    const checkoutInfoElements = Object.values(checkoutInfoPage);
    const placeHolders = Object.values(chkoutInfoPlaceHolders);
    for (let i = 0; i < checkoutInfoElements.length; i++) {
      await browser.expect.element(checkoutInfoElements[i]).to.be.present.and.be.visible;
      
      if (checkoutInfoElements[i] === checkoutInfoPage.cancelBtn) {
        await browser.expect.element(checkoutInfoElements[i]).to.have.text.equal(placeHolders[i]);
      } else if (checkoutInfoElements[i] === checkoutInfoPage.continueBtn) {
        await browser.expect.element(checkoutInfoElements[i]).to.have.value.equal(placeHolders[i]);
      } else {
        await browser.expect.element(checkoutInfoElements[i]).to.have.attribute('placeholder').which.equals(placeHolders[i]);
      }
    }
    await browser.pause(500);
  });
});
