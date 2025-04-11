const utility = require('../../helpers/utilities.js');

const { clickTheElementButton } = utility;

class FooterPage {
  constructor () {
    /**
     * CSS selectors
     */
    this.twitterIcon = 'li.social_twitter';
    this.facebookIcon = 'li.social_facebook';
    this.linkedInIcon = 'li.social_linkedin';
    this.copyRight = 'div.footer_copy';

    // social media sites elements
    this.twitterXicon = 'h1[role="heading"] g';
    this.facebookPopUp = 'form#login_popup_cta_form span > span[style]';
    this.linkedInPopUp = 'h2.contextual-sign-in-modal__context-screen-title';
  }

  /**
   * @description Click on a social media button
   * @param {Object} browser - inserts the Nightwatch Browser Object 
   * @param {String} element - locator used to identify the element
   * @returns new social media site
   */
  clickSocialMediaIcon(browser, element) {
    return clickTheElementButton(browser, element)
  }
}

module.exports = FooterPage;
