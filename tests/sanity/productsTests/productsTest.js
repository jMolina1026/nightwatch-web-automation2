const LoginPage = require('../../../nightwatch/page-objects/loginPage/LoginPage.js');
const ProductsPage = require('../../../nightwatch/page-objects/productsPage/ProductsPage.js');
const utility = require('../../../nightwatch/helpers/utilities.js');
const productData = require('../../../nightwatch/helpers/data/products.constants.js');

const { navigateToApp, waitForElementAppearance, getElementText } = utility;
const { names, descriptions, prices, addToCartBtns  } = productData;

const loginPage = new LoginPage();
const productsPage = new ProductsPage();

describe('Given the user logs in and sees the Product Page,', () => {
  this.tags = ['product', 'productSanity', 'Sanity'];
  
  beforeEach(() => {
    navigateToApp(browser);
    loginPage.login(browser);
    productsPage.getProducts(browser);
  });

  afterEach(() => {
    browser.quit();
  });

  it('Verify that each product has a name', async () => {
    await waitForElementAppearance(browser, productsPage.productName);
   
    const productNames = await productsPage.products.productNames;
    const prodNamesLength = productNames.length;
    for (let i = 0; i < await prodNamesLength; i++) {
      // Source of Truth
      const productNamesText = Object.values(names)[i];

      // Grabs the elements actual text
      const productNamesElementText = await getElementText(browser, productsPage.productName, i);

      // Prints which selector is being used, the index position and the element's text
      console.log(`Selector = ${productsPage.productName}, index = ${i}, item text = ${productNamesElementText}`);

      // Assertions
      await browser.expect.element(productNames[i]).to.be.present.and.visible;
      await browser.expect.element(productNames[i]).to.have.text.equal(productNamesText);
    }
  });

  it('Verify that each product has a description', async () => {
    await waitForElementAppearance(browser, productsPage.productDesc);

    const productDescs = await productsPage.products.productDescs;
    const prodNamesLength = productDescs.length;
    for (let i = 0; i < await prodNamesLength; i++) {
      const productDescsText = Object.values(descriptions)[i];
      const productDescsElementText = await getElementText(browser, productsPage.productDesc, i);
      console.log(`Selector = ${productsPage.productDesc}, index = ${i}, item text = ${productDescsElementText}`);

      // Assertions
      await browser.expect.element(productDescs[i]).to.be.present.and.visible;
      await browser.expect.element(productDescs[i]).to.have.text.equal(productDescsText);
    }
  });

  it('Verify that each product has a Price', async () => {
    await waitForElementAppearance(browser, productsPage.productPrice);

    const productPrices = await productsPage.products.productPrices;
    const prodPricesLength = productPrices.length;
    for (let i = 0; i < await prodPricesLength; i++) {
      const productPricesText = Object.values(prices)[i];
      const productPricesElementText = await getElementText(browser, productsPage.productPrice, i);
      console.log(`Selector = ${productsPage.productPrice}, index = ${i}, item text = ${productPricesElementText}`);

      // Assertions
      await browser.expect.element(productPrices[i]).to.be.present.and.visible;
      await browser.expect.element(productPrices[i]).to.have.text.equal(productPricesText);
    }
  });

  it('Verify that each product has an Add-To-Cart Button', async () => {
    await waitForElementAppearance(browser, productsPage.productAddToCart);

    const productATCBtns = await productsPage.products.productATCBtns;
    const prodATCBtnsLength = productATCBtns.length;
    for (let i = 0; i < await prodATCBtnsLength; i++) {
      const productATCBtnsText = Object.values(addToCartBtns)[i];
      const productATCElementText = await getElementText(browser, productsPage.productAddToCart, i);
      console.log(`Selector = ${productsPage.productAddToCart}, index = ${i}, item text = ${productATCElementText}`);

      // Assertions
      await browser.expect.element(productATCBtns[i]).to.be.present.and.visible;
      await browser.expect.element(productATCBtns[i]).to.have.text.equal(productATCBtnsText);
    }
  });

  it('Verify that each product has an Image', async () => {
    await waitForElementAppearance(browser, productsPage.productImage);

    const productImages = await productsPage.products.productImages;
    const prodImagesLength = productImages.length;
    for (let i = 0; i < await prodImagesLength; i++) {
      console.log(`Selector = ${productsPage.productImage}, index = ${i}`);

      // Assertions
      await browser.expect.element(productImages[i]).to.be.present.and.visible;
    }
  });
});
