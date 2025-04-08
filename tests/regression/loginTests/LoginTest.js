const LoginPage = require('../../../nightwatch/page-objects/loginPage/LoginPage.js');
const utility = require('../../../nightwatch/helpers/utilities.js');
const HeaderPage = require('../../../nightwatch/page-objects/headerPage/headerPage.js');

const { navigateToApp, loginValidations } = utility;

const loginPage = new LoginPage();
const headerPage = new HeaderPage()

describe('Given the user visits the Sauce Demo site,', function() {
  this.tags = ['login', 'regression'];
  
  beforeEach(() => {
    navigateToApp(browser);
  });

  afterEach(() => {
    browser.quit();
  });

  it('User can login with valid credentials', () => {
    loginPage.login(browser);

    browser.expect.element(headerPage.headerLogo) //comes from the home page
      .to.be.present.and.visible;
  });

  it('User attempts to login with an invalid username', () => {
    loginPage.enterCredentials(browser, loginValidations.wrongUsername);
    loginPage.clickTheLoginButton(browser);

    browser
      .waitForElementPresent(loginPage.errorMessageBox)
      .waitForElementVisible(loginPage.errorMessageBox)
      .expect.element(loginPage.errorMessageBox).to.have.text.equal(loginValidations.invalidCredentials);
  })

  it('and attempts to login with an invalid password', () => {
    loginPage.enterCredentials(browser, loginPage.username, loginValidations.wrongPassword);
    loginPage.clickTheLoginButton(browser);

    browser
      .waitForElementPresent(loginPage.errorMessageBox)
      .waitForElementVisible(loginPage.errorMessageBox)
      .expect.element(loginPage.errorMessageBox).to.have.text.equal(loginValidations.invalidCredentials);
  })

  it('and verifies if a username has been added to the email field', () => {
    loginPage.clickTheLoginButton(browser);

    browser
      .waitForElementPresent(loginPage.errorMessageBox)
      .waitForElementVisible(loginPage.errorMessageBox)
      .expect.element(loginPage.errorMessageBox).to.have.text.equal(loginValidations.requiredUsername);
  })

  it('and verifies if a password has been added to the password field', () => {
    loginPage.enterUsername(browser, loginValidations.wrongUsername);
    loginPage.clickTheLoginButton(browser);
    browser
      .waitForElementPresent(loginPage.errorMessageBox)
      .waitForElementVisible(loginPage.errorMessageBox)
      .expect.element(loginPage.errorMessageBox).to.have.text.equal(loginValidations.requriedPassword);
  })
});
