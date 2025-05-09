const utility = require('../../helpers/utilities.js');

const { clickTheElementButtonByIndex, getElementText, getAttributeValue } = utility;

class CheckoutInfoPage {
  constructor() {
    /**
     * CSS selectors
     */
    this.firstName = 'input#first-name';
    this.lastName = 'input#last-name';
    this.postalCode = 'input#postal-code';
    this.cancelBtn = 'button#cancel';
    this.continueBtn = 'input#continue';
  }

  /**
   * @description Get the value of an attribute for an element
   * @param {Object} browser - inserts the Nightwatch Browser Object
   * @param {String} element - locator used to identify the element
   * @param {String} attribute - element attribute
   * @returns element attribute value
   */
  getCheckoutInfoAttributeValue(browser, element, attribute) {
    return getAttributeValue(browser, element, attribute);
  }

  /**
   * @description Get the text of any element on the checkout info page
   * @param {Object} browser - inserts the Nightwatch Browser Object
   * @param {String} element - locator used to identify the element
   * @param {Number} index - position of element in list
   * @returns element text
   */
  getCheckoutInfoText(browser, element, index = 0) {
    return getElementText(browser, element, index);
  }

  /**
   * @description Clicks any button on the checkout info page
   * @param {Object} browser - inserts the Nightwatch Browser Object
   * @param {String} element - locator used to identify the element
   * @returns 
   */
  clickCheckoutInfoButton(browser, element, index = 0) {
    return clickTheElementButtonByIndex(browser, element, index);
  }
}

module.exports = CheckoutInfoPage;
