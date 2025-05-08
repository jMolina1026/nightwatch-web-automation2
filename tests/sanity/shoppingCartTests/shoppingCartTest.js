const LoginPage = require('../../../nightwatch/page-objects/loginPage/LoginPage.js');
const HeaderPage = require('../../../nightwatch/page-objects/headerPage/headerPage.js');
const ProductsPage = require('../../../nightwatch/page-objects/productsPage/ProductsPage.js');
const ShoppingCartPage = require('../../../nightwatch/page-objects/shoppingCartPage/ShoppingCartPage.js');
const utility = require('../../../nightwatch/helpers/utilities.js');

const { navigateToApp } = utility;

const loginPage = new LoginPage();
const headerPage = new HeaderPage();
const productsPage = new ProductsPage();
const shoppingCartPage = new ShoppingCartPage();

describe('Given the user logs in, adds items and views the Shopping Cart,', () => {
  this.tags = ['shoppingCart', 'shoppingCartSanity', 'Sanity'];
  
  beforeEach(() => {
    navigateToApp(browser);
    loginPage.login(browser);
  });

  afterEach(() => {
    browser.quit();
  });

  it('Verify that items added are present in the cart', async () => {
    const productNameText = await productsPage.getProductText(browser, productsPage.productName, 0);
    const productDescText = await productsPage.getProductText(browser, productsPage.productDesc, 0);
    const productPriceText = await productsPage.getProductText(browser, productsPage.productPrice, 0);

    await productsPage.clickTheProductButton(browser, productsPage.productAddToCart, 0);
    await headerPage.clickTheHeaderButton(browser, headerPage.shoppingCartButton);

    const headerSelectorValues = Object.values(shoppingCartPage)
    for (let i = 0; i < headerSelectorValues.length; i++) {
      await browser.expect.element(headerSelectorValues[i]).to.be.present.and.be.visible;
    }

    await browser.expect.element(shoppingCartPage.detailsItemName).to.have.text.equal(productNameText);
    await browser.expect.element(shoppingCartPage.detailsItemDesc).to.have.text.equal(productDescText);
    await browser.expect.element(shoppingCartPage.detailsItemPrice).to.have.text.equal(productPriceText);

    await browser.pause(2000);
  });
});
