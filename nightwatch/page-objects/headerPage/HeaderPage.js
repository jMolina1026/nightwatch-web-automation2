const commonSelectors = require('../../helpers/commonSelectors.js');
const utility = require('../../helpers/utilities.js');

const { commonHeaderElements } = commonSelectors;
const { clickTheElementButtonByIndex } = utility;

class HeaderPage {
  constructor () {
    /**
     * CSS selectors
     */
    this.burgerMenuButton = commonHeaderElements.burgerMenuButton;
    this.shoppingCartButton = commonHeaderElements.shoppingCartButton;
    this.shoppingCartBadge = commonHeaderElements.shoppingCartBadge;
    this.headerLogo = 'div.app_logo';
    this.headerSecondTitle = commonHeaderElements.secondaryTitle;
    this.headerSecondaryFilter = commonHeaderElements.sortContainer;
  }

  /**
   * @description Clicks any button on the header
   * @param {Object} browser - inserts the Nightwatch Browser Object
   * @param {String} element - locator used to identify the element
   * @returns 
   */
  clickTheHeaderButton(browser, element, index = 0) {
    return clickTheElementButtonByIndex(browser, element, index);
  }
}

module.exports = HeaderPage;
