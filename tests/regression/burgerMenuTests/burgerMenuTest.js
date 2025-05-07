const LoginPage = require('../../../nightwatch/page-objects/loginPage/LoginPage.js');
const BurgerMenuPage = require('../../../nightwatch/page-objects/burgerMenuPage/BurgerMenuPage.js');
const HeaderPage = require('../../../nightwatch/page-objects/headerPage/headerPage.js');
const ProductsPage = require('../../../nightwatch/page-objects/productsPage/ProductsPage.js');
const ProductDetailsPage = require('../../../nightwatch/page-objects/productDetailsPage/ProductDetailsPage.js');
const utility = require('../../../nightwatch/helpers/utilities.js');

const { navigateToApp, getElementFromList } = utility;

const loginPage = new LoginPage();
const headerPage = new HeaderPage();
const productsPage = new ProductsPage();
const productsDetailsPage = new ProductDetailsPage();
const burgerMenuPage = new BurgerMenuPage();

describe('Given the user logs in and opens the Burger Menu,', () => {
  this.tags = ['burgerMenu', 'burgerMenuRegression', 'Regression'];
  
  beforeEach(() => {
    navigateToApp(browser);
    loginPage.login(browser);
  });

  afterEach(() => {
    browser.quit();
  });

  it('Verify that the Hamburger Menu Option ALL ITEMS takes the user to the home page', async () => {
    await burgerMenuPage.clickTheBurgerMenuButton(browser, headerPage.burgerMenuButton);
    await burgerMenuPage.clickTheBurgerMenuButton(browser, burgerMenuPage.burgerMenuCloseBtn);

    await productsPage.clickTheProductButton(browser, productsPage.productName, 0);
    await browser.expect.element(productsDetailsPage.detailsBackToProductsBtn).to.have.text.equal('Back to products');
    await burgerMenuPage.clickTheBurgerMenuButton(browser, headerPage.burgerMenuButton);
    await burgerMenuPage.clickTheBurgerMenuButton(browser, burgerMenuPage.burgerMenuAllItems);
    await browser.expect.element(headerPage.headerSecondTitle).to.have.text.equal('Products');
    await browser.pause(500);
  });

  it('Verify that the Hamburger Menu Option ABOUT takes the about page for the site', async () => {
    await burgerMenuPage.clickTheBurgerMenuButton(browser, headerPage.burgerMenuButton);
    await browser.expect.url().to.equal(browser.launch_url + '/inventory.html');

    await burgerMenuPage.clickTheBurgerMenuButton(browser, burgerMenuPage.burgerMenuAbout);
    await browser.expect.url().to.equal('https://saucelabs.com/');
    await browser.pause(500);
  });

  it('Verify that the Hamburger Menu Option LOGOUT logs the user out of the site', async () => {
    await burgerMenuPage.clickTheBurgerMenuButton(browser, headerPage.burgerMenuButton);

    await burgerMenuPage.clickTheBurgerMenuButton(browser, burgerMenuPage.burgerMenuLogout);
    await browser.expect.url().to.equal(browser.launch_url + '/');
    await browser.expect.element(loginPage.loginLogo).to.have.text.equal('Swag Labs');
    await browser.pause(500);
  });

  it('Verify that the Hamburger Menu Option RESET APP STATE resets the site', async () => {
    await productsPage.clickTheProductButton(browser, productsPage.productAddToCart, 0);
    const removeBtn = await getElementFromList(browser, productsPage.productRemoveFromCart, 0);
    await browser.expect.element(removeBtn).to.be.present.and.be.visible;
    await browser.expect.element(headerPage.shoppingCartBadge).to.be.present.and.be.visible;
    await browser.expect.element(headerPage.shoppingCartBadge).to.have.text.equal('1');
    await burgerMenuPage.clickTheBurgerMenuButton(browser, headerPage.burgerMenuButton);
    await burgerMenuPage.clickTheBurgerMenuButton(browser, burgerMenuPage.burgerMenuReset);
    await browser.refresh();
    await browser.expect.element(productsPage.productRemoveFromCart).to.not.be.present;
    await browser.expect.element(headerPage.shoppingCartBadge).to.not.be.present;
    await browser.pause(500);
  });
});
