const LoginPage = require('../../../nightwatch/page-objects/loginPage/LoginPage.js');
const utility = require('../../../nightwatch/helpers/utilities.js');

const { navigateToApp } = utility;

const loginPage = new LoginPage();

describe('Given the user visits the Sauce Demo site,', function() {
  this.tags = ['login', 'sanity'];

  beforeEach(() => {
    navigateToApp(browser);
  });

  afterEach(() => {
    browser.quit();
  });

  it('Verify all required elements on the login page', () => {
    const loginPageElements = [
      loginPage.loginLogo,
      loginPage.usernameField,
      loginPage.passwordField,
      loginPage.loginBtn,
      loginPage.loginCredential,
      loginPage.loginPassword
    ];

    for (const element of loginPageElements) {
      browser.waitForElementVisible(element);
      browser.element('css selector', element, (result) => {
        expect(result.value).to.exist.and.be.visible;
      });

      browser.element.find(element)
        .isVisible()
        .assert.equals(true, `Element, ${element}, is visible`);

      browser.expect.element(element)
        .to.be.present.and.visible;
    }
  });
})
