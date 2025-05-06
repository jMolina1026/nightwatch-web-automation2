const LoginPage = require('../../../nightwatch/page-objects/loginPage/LoginPage.js');
const BurgerMenuPage = require('../../../nightwatch/page-objects/burgerMenuPage/BurgerMenuPage.js');
const HeaderPage = require('../../../nightwatch/page-objects/headerPage/headerPage.js');
const utility = require('../../../nightwatch/helpers/utilities.js');

const { navigateToApp } = utility;

const loginPage = new LoginPage();
const headerPage = new HeaderPage();
const burgerMenuPage = new BurgerMenuPage();

describe('Given the user logs in and opens the Burger Menu,', () => {
  this.tags = ['burgerMenu', 'burgerMenuSanity', 'Sanity'];
  
  beforeEach(() => {
    navigateToApp(browser);
    loginPage.login(browser);
  });

  afterEach(() => {
    browser.quit();
  });

  it('Verify the Burger Menu Options', async () => {
    await burgerMenuPage.clickTheBurgerMenuButton(browser, headerPage.burgerMenuButton);
    ;[
      burgerMenuPage.burgerMenuCloseBtn,
      burgerMenuPage.burgerMenuAllItems,
      burgerMenuPage.burgerMenuAbout,
      burgerMenuPage.burgerMenuLogout,
      burgerMenuPage.burgerMenuReset
    ].forEach(async (burgerMenuOption) => {
      await browser.expect.element(burgerMenuOption).to.be.present.and.visible;
    })
    await browser.pause(500);
  });
});
