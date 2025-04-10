const LoginPage = require('../../../nightwatch/page-objects/loginPage/LoginPage.js');
const FooterPage = require('../../../nightwatch/page-objects/footerPage/footerPage.js');
const utility = require('../../../nightwatch/helpers/utilities.js');

const { navigateToApp, waitForElementAppearance, scrollElementIntoView } = utility;

const footerPage = new FooterPage()
const loginPage = new LoginPage();

describe('Given the user logs in and see the Footer,', () => {
  this.tags = ['footer', 'footerSanity', 'sanity'];
  
  beforeEach(() => {
    navigateToApp(browser);
    loginPage.login(browser);
  });

  afterEach(() => {
    browser.quit();
  });

  it('Verify that all Footer elements exist', () => {
    browser.waitForElementPresent(footerPage.copyRight);
    scrollElementIntoView(browser, footerPage.copyRight).pause(500);
    ;[
      footerPage.twitterIcon,
      footerPage.facebookIcon,
      footerPage.linkedInIcon,
      footerPage.copyRight
    ].forEach((element) => {
      browser.expect.element(element)
        .to.be.present.and.be.visible;
      
      if (element === footerPage.copyRight) {
        browser.expect.element(footerPage.copyRight)
          .to.have.text.equal('© 2025 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy');
      }
    });
  });
});
