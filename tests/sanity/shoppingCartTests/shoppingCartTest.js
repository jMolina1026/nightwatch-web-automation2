const LoginPage = require('../../../nightwatch/page-objects/loginPage/LoginPage.js');
const HeaderPage = require('../../../nightwatch/page-objects/headerPage/headerPage.js');
const ProductsPage = require('../../../nightwatch/page-objects/productsPage/ProductsPage.js');
const ShoppingCartPage = require('../../../nightwatch/page-objects/shoppingCartPage/ShoppingCartPage.js');
const utility = require('../../../nightwatch/helpers/utilities.js');
const constants = require('../../../nightwatch/helpers/data/products.constants.js');

const { navigateToApp } = utility;
const { shoppingCartTexts } = constants

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
    await browser.expect.element(headerPage.headerSecondTitle).to.have.text.equal('Your Cart')

    const shoppingCartTextsArray = [
      shoppingCartTexts.qty,
      shoppingCartTexts.desc,
      productNameText,
      productDescText,
      productPriceText,
      shoppingCartTexts.itemQty,
      shoppingCartTexts.itemRemove,
      shoppingCartTexts.contShopping,
      shoppingCartTexts.checkout,
    ];

    const shoppingCartElements = Object.values(shoppingCartPage)
    for (let i = 0; i < shoppingCartElements.length; i++) {
      await browser.expect.element(shoppingCartElements[i]).to.be.present.and.be.visible;
      await browser.expect.element(shoppingCartElements[i]).to.have.text.equal(shoppingCartTextsArray[i]);
    }
    await browser.pause(500);
  });
});
