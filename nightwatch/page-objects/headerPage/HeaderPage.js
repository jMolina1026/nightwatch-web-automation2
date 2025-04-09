const commonSelectors = require('../../helpers/commonSelectors.js');
const { commonHeaderElements } = commonSelectors;

class HeaderPage {
  constructor () {
    /**
     * CSS selectors
     */
    this.burgerMenuButton = commonHeaderElements.burgerMenuButton
    this.shoppingCartButton = commonHeaderElements.shoppingCartButton
    this.headerLogo = 'div.app_logo'
    this.headerSecondTitle = commonHeaderElements.secondaryTitle
    this.headerSecondaryFilter = commonHeaderElements.sortContainer
  }
}

module.exports = HeaderPage;
