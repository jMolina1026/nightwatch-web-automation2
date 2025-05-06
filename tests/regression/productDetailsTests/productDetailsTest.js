const LoginPage = require('../../../nightwatch/page-objects/loginPage/LoginPage.js');
const ProductsPage = require('../../../nightwatch/page-objects/productsPage/ProductsPage.js');
const ProductDetailsPage = require('../../../nightwatch/page-objects/productDetailsPage/ProductDetailsPage.js');
const HeaderPage = require('../../../nightwatch/page-objects/headerPage/headerPage.js');
const utility = require('../../../nightwatch/helpers/utilities.js');

const { navigateToApp, waitForElementAppearance } = utility;

const loginPage = new LoginPage();
const productsPage = new ProductsPage();
const productsDetailsPage = new ProductDetailsPage();
const headerPage = new HeaderPage();

describe('Given the user logs in and sees the Product Details Page,', () => {
  this.tags = ['productDetails', 'productDetailsRegression', 'Regression'];
  
  beforeEach(() => {
    navigateToApp(browser);
    loginPage.login(browser);
  });

  afterEach(() => {
    browser.quit();
  });

  it('Verify user can add item to cart from Product Details Page', async () => {
    await productsPage.clickTheProductButton(browser, productsPage.productName);
    await waitForElementAppearance(browser, productsDetailsPage.detailsItemName);
    await productsDetailsPage.clickTheProductDetailsButton(browser, productsDetailsPage.detailsATCBtn);
    await browser.expect.element(headerPage.shoppingCartBadge).to.be.present.and.be.visible;
    await browser.expect.element(headerPage.shoppingCartBadge).to.have.text.equal("1");

    await productsPage.clickTheProductButton(browser, productsDetailsPage.detailsRemoveBtn);
    await browser.expect.element(headerPage.shoppingCartBadge).to.not.be.present;
  });

  it('Verify user can navigate back to the product page', async () => {
    await productsPage.clickTheProductButton(browser, productsPage.productName);
    await waitForElementAppearance(browser, productsDetailsPage.detailsItemName);
    await productsDetailsPage.clickTheProductDetailsButton(browser, productsDetailsPage.detailsBackToProductsBtn);
    await browser.expect.element(headerPage.headerSecondTitle).to.be.present.and.be.visible;
    await browser.expect.element(headerPage.headerSecondTitle).to.have.text.equal("Products");
  });
});
