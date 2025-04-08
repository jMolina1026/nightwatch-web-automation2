/**
 * @description This is a global hook file for all tests.
 * Nightwatch supports a globals.js file where you can define hooks like:
 * 
 * before
 * after
 * beforeEach
 * afterEach
 * 
 * These run globally across all test suites, 
 * regardless of test style (classic or Mocha describe/it).
 */

const utility = require('../../nightwatch/helpers/utilities.js');
const LoginPage = require('../../nightwatch/page-objects/loginPage/LoginPage.js');
const { navigateToApp } = utility;

const loginPage = new LoginPage();

/**
 * ============================================================
 * HOOKS
 * ===========================================================
 */

module.exports = {
  beforeEach: function (done) {
    console.log('>>> Global beforeEach triggered');
    navigateToApp(browser)
      .waitForElementVisible(loginPage.usernameField)
      .perform(() => done());
  },

  afterEach: function (done) {
    console.log('>>> Global afterEach triggered');
    browser.quit(() => done());
    console.log('>>> Browser session has quit');
  }
};
