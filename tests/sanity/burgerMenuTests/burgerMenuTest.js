const LoginPage = require('../../../nightwatch/page-objects/loginPage/LoginPage.js');
const BurgerMenuPage = require('../../../nightwatch/page-objects/burgerMenuPage/BurgerMenuPage.js');
const HeaderPage = require('../../../nightwatch/page-objects/headerPage/headerPage.js');
const utility = require('../../../nightwatch/helpers/utilities.js');
const constants = require('../../../nightwatch/helpers/data/products.constants.js')

const { navigateToApp } = utility;
const { burgerMenuOptions } = constants;

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
    const menuItems = [
      burgerMenuPage.burgerMenuCloseBtn,
      burgerMenuPage.burgerMenuAllItems,
      burgerMenuPage.burgerMenuAbout,
      burgerMenuPage.burgerMenuLogout,
      burgerMenuPage.burgerMenuReset
    ];

    for (let i = 0; i < menuItems.length; i++) {
      const burgerMenuOption = menuItems[i];
      await browser.expect.element(burgerMenuOption).to.be.present.and.visible;
    
      if (burgerMenuOption !== burgerMenuPage.burgerMenuCloseBtn) {
        console.log('burgerOptions = ' + Object.values(burgerMenuOptions)[i] + " i = " + i);
        console.log('burgerMenuOption = ' + burgerMenuOption);
        await browser.expect.element(burgerMenuOption).to.have.text.equal(Object.values(burgerMenuOptions)[i - 1]);
      }
    }
    await browser.pause(500);
  });
});
