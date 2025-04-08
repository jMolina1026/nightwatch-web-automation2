const { ElementLocator } = require('nightwatch');
const utility = require('../../../nightwatch/helpers/utilities.js');
const HeaderPage = require('../../../nightwatch/page-objects/headerPage/headerPage.js');
const LoginPage = require('../../../nightwatch/page-objects/loginPage/LoginPage.js');

const { navigateToApp, loginValidations } = utility;

const headerPage = new HeaderPage();
const loginPage = new LoginPage();

describe('Given the user logs into the Sauce Demo site,', function() {
  this.tags = ['headerSanity', 'sanity'];
  
  beforeEach(() => {
    navigateToApp(browser);
    loginPage.login(browser);
  });

  afterEach(() => {
    browser.quit();
  });

  it('Verify that all Header elements exist', () => {
    const headerItemsArray = [
      headerPage.burgerMenuButton,
      headerPage.shoppingCartButton,
      headerPage.headerLogo,
      headerPage.headerSecondTitle,
      headerPage.headerSecondaryFilter
    ];

    headerItemsArray.forEach((element) => {
      browser.expect.element(element).to.be.present.and.visible;
      if (element === headerPage.headerLogo) {
        browser.expect.element(element).to.have.text.equal('Swag Labs');
      }
    })
  });
});
