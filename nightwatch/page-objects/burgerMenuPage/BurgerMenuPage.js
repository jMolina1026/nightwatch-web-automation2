const utility = require('../../helpers/utilities.js');

const { clickTheElementButtonByIndex, getElementText } = utility;

class BurgerMenuPage {
  constructor() {
    /**
     * CSS selectors
     */
    this.burgerMenuCloseBtn = 'button#react-burger-cross-btn';
    this.burgerMenuAllItems = 'a#inventory_sidebar_link';
    this.burgerMenuAbout = 'a#about_sidebar_link';
    this.burgerMenuLogout = 'a#logout_sidebar_link';
    this.burgerMenuReset = 'a#reset_sidebar_link';
  }

  /**
   * @description Get the text of any element on the burgerMenu page
   * @param {Object} browser - inserts the Nightwatch Browser Object
   * @param {String} element - locator used to identify the element
   * @param {Number} index - position of element in list
   * @returns element text
   */
  getBurgerMenuOptionText(browser, element, index = 0) {
    return getElementText(browser, element, index);
  }

  /**
   * @description Clicks any button on the burger menu
   * @param {Object} browser - inserts the Nightwatch Browser Object
   * @param {String} element - locator used to identify the element
   * @returns 
   */
  clickTheBurgerMenuButton(browser, element, index = 0) {
    return clickTheElementButtonByIndex(browser, element, index);
  }
}

module.exports = BurgerMenuPage;
