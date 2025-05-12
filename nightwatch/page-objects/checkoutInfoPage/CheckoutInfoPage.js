const utility = require('../../helpers/utilities.js');

const { clickTheElementButtonByIndex, getElementText, getAttributeValue, typeText } = utility;

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
    this.errorMessageContainer = 'div.error-message-container > h3';
  }

  /**
   * @description Get an element from a list
   * @param {*} key 
   * @returns a single webElement from and object
   */
  getFieldElement(key) {
    const inputFieldElements = {
      firstName: this.firstName,
      lastName: this.lastName,
      zipCode: this.postalCode
    };
    return inputFieldElements[key];
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

  /**
   * 
   * @param {Object} browser - inserts the Nightwatch Browser Object
   * @param {String} element - locator used to identify the element
   * @param {String} text - string of text to be added
   * @returns 
   */
  typeTextIntoInfoField(browser, element, text = "test123") {
    return typeText(browser, element, text);
  }
}

module.exports = CheckoutInfoPage;
