const utility = require('../../helpers/utilities.js');

const { clickTheElementButton, getElementText } = utility;

class LoginPage {
  constructor () {
    this.username = process.env.USERNME;
    this.password = process.env.PASSWORD;
    
    /**
     * CSS selectors
     */
    this.usernameField = 'input#user-name';
    this.passwordField = 'input#password';
    this.loginBtn = 'input#login-button';
    this.headerLogo = 'div.app_logo';
    this.errorMessageBox = 'h3[data-test="error"]';
    this.loginLogo = 'div.login_logo'; //commonLoginPageElements.loginLogo
    this.loginCredential = 'div#login_credentials';
    this.loginPassword = 'div.login_password';
  }

  /**
   * Enters an email into the email field
   * @param {String} username - enter a username
   */
  enterUsername (browser, username = this.username) {
    return browser
      .waitForElementVisible(this.usernameField)
      .element.find(this.usernameField)
      .sendKeys(username);
  }

  /**
   * Enteres a password into the passwored field
   * @param {String} password - enter a password
   */
  enterPassword (browser, password = this.password) {
    return browser
      .waitForElementVisible(this.passwordField)
      .element.find(this.passwordField)
      .sendKeys(password);
  }

  /**
   * @description Enter the credentials into the login fields
   * @param {String} username - username credential
   * @param {String} password - password credential
   */
  enterCredentials (browser, username = this.username, password = this.password) {
    this.enterUsername(browser, username)
    this.enterPassword(browser, password);
  }

  /**
   * @description Clicks the login button
   */
  clickTheLoginButton (browser, loginBtn = this.loginBtn) {
    return clickTheElementButton(browser, loginBtn);
  }

  /**
   * @description Login to the website under test
   * @param {String} url - url string
   * @param {String} username - username credential
   * @param {String} password - password credential
   */
  login (browser, username = this.username, password = this.password) {
    this.enterCredentials(browser, username, password)
    this.clickTheLoginButton(browser);
  }

  /** Gets the element text on the login page
   * @param {Object} browser - inserts the Nightwatch Browser Object
   * @param {String} element - locator used to identify the element
   * @param {Number} index - position of element in a list
   */
  // getLoginMessageText(browser, element = 'wrong element found', index = 0) {
  //   return getElementText(browser, element, index).then((text) => {
  //     return text;
  //   })
  // }

}

module.exports = LoginPage;
