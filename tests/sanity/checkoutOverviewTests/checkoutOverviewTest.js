const LoginPage = require('../../../nightwatch/page-objects/loginPage/LoginPage.js');
const HeaderPage = require('../../../nightwatch/page-objects/headerPage/headerPage.js');
const ProductsPage = require('../../../nightwatch/page-objects/productsPage/ProductsPage.js');
const ShoppingCartPage = require('../../../nightwatch/page-objects/shoppingCartPage/ShoppingCartPage.js');
const CheckoutInfoPage = require('../../../nightwatch/page-objects/checkoutInfoPage/CheckoutInfoPage.js');
const CheckoutOverviewPage = require('../../../nightwatch/page-objects/checkoutOverviewPage/CheckoutOverviewPage.js');
const constants = require('../../../nightwatch/helpers/data/products.constants.js');

const utility = require('../../../nightwatch/helpers/utilities.js');
const { inputFields, finalOverviewTexts } = constants;

const { navigateToApp, getLength, getElementFromList } = utility;

const loginPage = new LoginPage();
const headerPage = new HeaderPage();
const productsPage = new ProductsPage();
const shoppingCartPage = new ShoppingCartPage();
const checkoutInfoPage = new CheckoutInfoPage();
const checkoutOverviewPage = new CheckoutOverviewPage();

describe('Given the user has added items to the Shopping Cart and proceeded to final checkout,', () => {
  this.tags = ['checkoutOverview', 'checkoutOverviewSanity', 'Sanity'];
  
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

  it('Verify that the final checkout has all required elements', async () => {
    let d = 0;
    for (let chkoutElement of Object.values(checkoutOverviewPage)) {
      if (await getLength(browser, chkoutElement) > 1) {
        for (let k = 0; k < 3; k++) {
        await browser.expect.element(await getElementFromList(browser, chkoutElement, k)).to.be.present.and.visible;
        await browser.expect.element(await getElementFromList(browser, chkoutElement, k))
          .to.have.text.equal(Object.values(checkoutOverviewPage.getItemTexts(chkoutElement))[k]);
        }
      } else {
        await browser.expect.element(chkoutElement).to.be.present.and.visible;
        const overviewText = await browser.element.find(chkoutElement).getText();
        if (!overviewText.includes('$')) {
          await browser.expect.element(chkoutElement).to.have.text.equal(Object.values(finalOverviewTexts)[d]);
        }
        d++;
      }   
    }
    await browser.pause(500);
  });

  it('Verify that the correct total price is acheived', async () => {
    let subTotal = 0;
    const taxPercentage = 0.08; // the percentage difference between the tax and subtotal
    for (let i = 0; i < await getLength(browser, checkoutOverviewPage.itemPrice); i++) {
      const eachItemPrice = await checkoutOverviewPage.getOverviewText(browser, checkoutOverviewPage.itemPrice, i);
      console.log('eachItemPrice = ' + parseFloat(eachItemPrice.substring(1)));
      subTotal = subTotal + parseFloat(eachItemPrice.substring(1));
    }
    const tax = (subTotal * taxPercentage);
    const total = (subTotal + tax);

    await browser.expect.element(checkoutOverviewPage.subtotalInfo).to.have.text.equal(finalOverviewTexts.subTotal + subTotal.toFixed(2));
    await browser.expect.element(checkoutOverviewPage.taxInfo).to.have.text.equal(finalOverviewTexts.tax + tax.toFixed(2));
    await browser.expect.element(checkoutOverviewPage.totalInfo).to.have.text.equal(finalOverviewTexts.total + total.toFixed(2));
  })
});
