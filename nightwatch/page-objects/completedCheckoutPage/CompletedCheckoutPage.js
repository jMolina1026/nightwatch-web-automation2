const utility = require('../../helpers/utilities.js');

const { clickTheElementButtonByIndex, getElementText } = utility;

class CompletedCheckoutPage {
  constructor() {
    /**
     * CSS selectors
     */
    this.checkMark = 'img.pony_express';
    this.thankYouMsg = 'h2.complete-header';
    this.orderDispatched = 'div.complete-text';
    this.backToHome = 'button#back-to-products';
  }

  /**
   * @description Get the text of any element on the completed checkout page
   * @param {Object} browser - inserts the Nightwatch Browser Object
   * @param {String} element - locator used to identify the element
   * @param {Number} index - position of element in list
   * @returns element text
   */
  getOverviewText(browser, element, index = 0) {
    return getElementText(browser, element, index);
  }

  /**
   * @description Clicks any button on the completed checkout page
   * @param {Object} browser - inserts the Nightwatch Browser Object
   * @param {String} element - locator used to identify the element
   * @returns 
   */
  clickCompletedCheckoutButton(browser, element, index = 0) {
    return clickTheElementButtonByIndex(browser, element, index);
  }
}

module.exports = CompletedCheckoutPage;
