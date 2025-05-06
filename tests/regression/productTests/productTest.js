const LoginPage = require('../../../nightwatch/page-objects/loginPage/LoginPage.js');
const ProductsPage = require('../../../nightwatch/page-objects/productsPage/ProductsPage.js');
const HeaderPage = require('../../../nightwatch/page-objects/headerPage/headerPage.js');
const utility = require('../../../nightwatch/helpers/utilities.js');
const productData = require('../../../nightwatch/helpers/data/products.constants.js');

const { navigateToApp, waitForElementAppearance } = utility;
const { names, prices, filterOptions  } = productData;

const loginPage = new LoginPage();
const productsPage = new ProductsPage();
const headerPage = new HeaderPage();

describe('Given the user logs in and sees the Product Page,', () => {
  this.tags = ['product', 'productRegression', 'Regression'];
  
  beforeEach(() => {
    navigateToApp(browser);
    loginPage.login(browser);
    productsPage.getProducts(browser);
  });

  afterEach(() => {
    browser.quit();
  });

  it('Click on the Add-To-Cart for each product, then Remove from cart', async () => {
    await waitForElementAppearance(browser, productsPage.productAddToCart);

    const atcElements = await browser.element.findAll(productsPage.productAddToCart);
    for (let i = 0; i < atcElements.length; i++) {
      await productsPage.clickTheProductButton(browser, productsPage.productAddToCart, 0);
      await browser.expect.element(productsPage.productShoppingCartBadge).to.be.visible.and.be.present;
      await browser.expect.element(productsPage.productShoppingCartBadge).to.have.text.that.equal(`${i + 1}`);
      await browser.pause(500);
    }

    const removeElements = await browser.element.findAll(productsPage.productRemoveFromCart);
    for (let j = removeElements.length; j > 0; j--) {
      await browser.expect.element(productsPage.productShoppingCartBadge).to.be.visible.and.be.present;
      await browser.expect.element(productsPage.productShoppingCartBadge).to.have.text.that.equal(`${j}`);
      await productsPage.clickTheProductButton(browser, productsPage.productRemoveFromCart, 0);
      await browser.pause(500);
    }
    await browser.expect.element(productsPage.productShoppingCartBadge).to.not.be.present;
  });

  it('Verify the Product Sort Options', async () => {
    await waitForElementAppearance(browser, headerPage.headerSecondaryFilter);

    let i = 0;
    const productNames = await browser.element.findAll(productsPage.productName);
    for (const filterOption in filterOptions) {
      const optionText = Object.values(filterOptions)[i];
      await productsPage.clickTheProductButton(browser, `${productsPage.productFilters}[value="${filterOption}"]`);
      await browser.expect.element(`${productsPage.productFilters}[value="${filterOption}"]`).to.have.text.equal(optionText);
      await browser.expect.element(productsPage.productFilterActive).to.have.text.equal(optionText);

      for (let j = 0; j < productNames.length; j++) {
        const productName = productsPage.getName(browser, productsPage.productName, j);
        const productPrice = productsPage.getPrice(browser, productsPage.productPrice, j);
        switch(filterOption) {
          case 'az': 
            await browser.expect.element(productName).to.have.text.equal(Object.values(names)[j]);
            break;
          case 'za': 
            const revNames = Object.values(names).sort().reverse();
            await browser.expect.element(productName).to.have.text.equal(Object.values(revNames)[j]);
            break;
          case 'lohi':
            const lohiPrices = Object.values(prices).sort((a, b) => 
              parseFloat(a.slice(1)) - parseFloat(b.slice(1)));
            await browser.expect.element(productPrice).to.have.text.equal(Object.values(lohiPrices)[j]);
            break;
          case 'hilo':
            const hiloPrices = Object.values(prices).sort((a, b) => 
              parseFloat(a.slice(1)) - parseFloat(b.slice(1))).reverse();
            await browser.expect.element(productPrice).to.have.text.equal(Object.values(hiloPrices)[j]);
            break;
          default: throw new Error('Nothing to sort');
        }
      }      
      await browser.pause(500);
      i++;
    }
  });
});
