const LoginPage = require('../../../nightwatch/page-objects/loginPage/LoginPage.js');
const FooterPage = require('../../../nightwatch/page-objects/footerPage/footerPage.js');
const utility = require('../../../nightwatch/helpers/utilities.js');

const { navigateToApp, scrollElementIntoView, getAllTabHandles, closeCurrentTab, switchTabs } = utility;

const footerPage = new FooterPage()
const loginPage = new LoginPage();

describe('Given the user logs in and see the Footer,', () => {
  this.tags = ['footer', 'footerRegression', 'Regression'];
  
  beforeEach(() => {
    navigateToApp(browser);
    loginPage.login(browser);
  });

  afterEach(() => {
    browser.quit();
  });

  it('Verify that clicking each social media icon executes proper site navigation', () => {
    browser.waitForElementPresent(footerPage.copyRight);
    scrollElementIntoView(browser, footerPage.copyRight).pause(500);

    const socialButtonsArray = [
      footerPage.twitterIcon,
      footerPage.facebookIcon,
      footerPage.linkedInIcon
    ];

    const socialArray = [
      footerPage.twitterXicon, 
      footerPage.facebookPopUp, 
      footerPage.linkedInPopUp];

    let i = 0;
    socialButtonsArray.forEach((element) => {
      if (element !== footerPage.copyRight) {
        footerPage.clickSocialMediaIcon(browser, element);

        browser.window.getAllHandles((handles) => {
          browser.window.switchTo(handles.value[1]);
          browser.waitForElementVisible(socialArray[i]);
          browser.expect.element(socialArray[i]).to.be.present;
          browser.window.close();
          browser.window.switchTo(handles.value[0]);
          i++;
        });
      };
    });
  });

  it('Verify that clicking each social media icon executes proper site navigation - V2', async () => {
    await browser.waitForElementPresent(footerPage.copyRight);
    await scrollElementIntoView(browser, footerPage.copyRight).pause(500);

    const socialButtonsArray = [
      footerPage.twitterIcon,
      footerPage.facebookIcon,
      footerPage.linkedInIcon
    ];

    const socialArray = [
      footerPage.twitterXicon, 
      footerPage.facebookPopUp, 
      footerPage.linkedInPopUp];


    for (let i = 0; i < socialButtonsArray.length; i++) {
      const button = socialButtonsArray[i];
      const expectedPopupElement = socialArray[i];
      
      await footerPage.clickSocialMediaIcon(browser, button);
      
      const handles = await getAllTabHandles(browser);
      // console.log('Handles:', handles);
      // console.log(handles[1])

      await switchTabs(browser, handles[1]);
      await browser.waitForElementVisible(expectedPopupElement);
      await browser.expect.element(expectedPopupElement).to.be.present;

      await closeCurrentTab(browser);
      await switchTabs(browser, handles[0]);
    }
  });
});
