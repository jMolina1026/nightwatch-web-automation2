const LoginPage = require('../../../nightwatch/page-objects/loginPage/LoginPage.js');
const HeaderPage = require('../../../nightwatch/page-objects/headerPage/headerPage.js');
const ProductsPage = require('../../../nightwatch/page-objects/productsPage/ProductsPage.js');
const ShoppingCartPage = require('../../../nightwatch/page-objects/shoppingCartPage/ShoppingCartPage.js');
const utility = require('../../../nightwatch/helpers/utilities.js');

const { navigateToApp, getLength } = utility;

const loginPage = new LoginPage();
const headerPage = new HeaderPage();
const productsPage = new ProductsPage();
const shoppingCartPage = new ShoppingCartPage();

describe('Given the user logs in, adds items and views the Shopping Cart,', () => {
  this.tags = ['shoppingCart', 'shoppingCartRegression', 'Regression'];
  
  beforeEach(() => {
    navigateToApp(browser);
    loginPage.login(browser);
  });

  afterEach(() => {
    browser.quit();
  });

  it('User is able to remove items from shopping cart', async () => {
    const countOfItemsAdded = 3
    for (let i = 0; i < countOfItemsAdded; i++) {
      await productsPage.clickTheProductButton(browser, productsPage.productAddToCart, 0);
    }

    await headerPage.clickTheHeaderButton(browser, headerPage.shoppingCartButton);
    await browser.expect.element(headerPage.headerSecondTitle).to.have.text.equal('Your Cart')
    const shoppingCartBadgeText = await shoppingCartPage.getShoppingCartText(browser, headerPage.shoppingCartBadge);
    const shoppingCartItemsAdded = await getLength(browser, shoppingCartPage.detailsItemName);
    browser.expect(parseInt(shoppingCartBadgeText)).to.equal(shoppingCartItemsAdded);

    await shoppingCartPage.clickTheShoppingCartButton(browser, shoppingCartPage.detailsRemoveItem, shoppingCartItemsAdded - 1);
    const shoppingCartBadgeText2 = await shoppingCartPage.getShoppingCartText(browser, headerPage.shoppingCartBadge);
    const shoppingCartItemsRemaining = await getLength(browser, shoppingCartPage.detailsItemName);

    browser.expect(parseInt(shoppingCartBadgeText2)).to.not.equal(shoppingCartItemsAdded, 'The values are not equal');
    browser.expect(parseInt(shoppingCartBadgeText2)).to.equal(shoppingCartItemsRemaining)
    await browser.pause(500);
  });

  it('User is able to continue shopping', async () => {
    const countOfItemsAdded = 3
    for (let i = 0; i < countOfItemsAdded; i++) {
      await productsPage.clickTheProductButton(browser, productsPage.productAddToCart, 0);
    }

    await headerPage.clickTheHeaderButton(browser, headerPage.shoppingCartButton);
    await browser.expect.element(headerPage.headerSecondTitle).to.have.text.equal('Your Cart')
    const shoppingCartBadgeText = await shoppingCartPage.getShoppingCartText(browser, headerPage.shoppingCartBadge);
    const shoppingCartItemsAdded = await getLength(browser, shoppingCartPage.detailsItemName);
    browser.expect(parseInt(shoppingCartBadgeText)).to.equal(shoppingCartItemsAdded);
    
    await shoppingCartPage.clickTheShoppingCartButton(browser, shoppingCartPage.detailsContinueShopping);
    await browser.expect.element(headerPage.headerSecondTitle).to.have.text.equal('Products')
    await browser.pause(500);
  });

  it('User is able to checkout', async () => {
    const countOfItemsAdded = 3
    for (let i = 0; i < countOfItemsAdded; i++) {
      await productsPage.clickTheProductButton(browser, productsPage.productAddToCart, 0);
    }

    await headerPage.clickTheHeaderButton(browser, headerPage.shoppingCartButton);
    await browser.expect.element(headerPage.headerSecondTitle).to.have.text.equal('Your Cart')
    const shoppingCartBadgeText = await shoppingCartPage.getShoppingCartText(browser, headerPage.shoppingCartBadge);
    const shoppingCartItemsAdded = await getLength(browser, shoppingCartPage.detailsItemName);
    browser.expect(parseInt(shoppingCartBadgeText)).to.equal(shoppingCartItemsAdded);
    
    await shoppingCartPage.clickTheShoppingCartButton(browser, shoppingCartPage.detailsCheckoutBtn);
    await browser.expect.element(headerPage.headerSecondTitle).to.have.text.equal('Checkout: Your Information')
    await browser.pause(500);
  });
});
