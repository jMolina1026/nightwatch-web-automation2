const LoginPage = require('../../../nightwatch/page-objects/loginPage/LoginPage.js');
const ProductsPage = require('../../../nightwatch/page-objects/productsPage/ProductsPage.js');
const ProductDetailsPage = require('../../../nightwatch/page-objects/productDetailsPage/ProductDetailsPage.js');
const utility = require('../../../nightwatch/helpers/utilities.js');

const { navigateToApp } = utility;

const loginPage = new LoginPage();
const productsPage = new ProductsPage();
const productsDetailsPage = new ProductDetailsPage

describe('Given the user logs in and sees the Product Details Page,', () => {
  this.tags = ['productDetails', 'productDetailsSanity', 'Sanity'];
  
  beforeEach(() => {
    navigateToApp(browser);
    loginPage.login(browser);
  });

  afterEach(() => {
    browser.quit();
  });

  it('Verify the Product Details Page', async () => {
    const productNameText = await productsPage.getProductText(browser, productsPage.productName);
    const productDescText = await productsPage.getProductText(browser, productsPage.productDesc);
    const productPriceText = await productsPage.getProductText(browser, productsPage.productPrice);
    await productsPage.clickTheProductButton(browser, productsPage.productName);

    await browser.expect.element(productsDetailsPage.detailsItemName).to.be.present.and.be.visible;
    await browser.expect.element(productsDetailsPage.detailsItemName).to.have.text.be.equal(productNameText);

    await browser.expect.element(productsDetailsPage.detailsItemDesc).to.be.present.and.be.visible;
    await browser.expect.element(productsDetailsPage.detailsItemDesc).to.have.text.be.equal(productDescText);

    await browser.expect.element(productsDetailsPage.detailsItemPrice).to.be.present.and.be.visible;
    await browser.expect.element(productsDetailsPage.detailsItemPrice).to.have.text.be.equal(productPriceText);

    await browser.expect.element(productsDetailsPage.detailsATCBtn).to.be.present.and.be.visible;
    await browser.expect.element(productsDetailsPage.detailsItemImage).to.be.present.and.be.visible;
    await browser.expect.element(productsDetailsPage.detailsBackToProductsBtn).to.be.present.and.be.visible;

    await browser.pause(500)
  });
});
