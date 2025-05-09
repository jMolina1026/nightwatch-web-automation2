const utility = require('../../helpers/utilities.js');

const { clickTheElementButtonByIndex, getElementText } = utility;

class ShoppingCartPage {
  constructor() {
    /**
     * CSS selectors
     */
    this.detailsQuantityLabel = 'div.cart_quantity_label';
    this.detailsDescLabel = 'div.cart_desc_label';
    this.detailsItemName = 'div.inventory_item_name'; // <<< List
    this.detailsItemDesc = 'div.inventory_item_desc'; // <<< List
    this.detailsItemPrice = 'div.inventory_item_price'; // <<< List
    this.detailsItemQuantity = 'div.cart_quantity' // <<< List
    this.detailsRemoveItem = 'button.btn_secondary'; // <<< List
    this.detailsContinueShopping = 'button#continue-shopping';
    this.detailsCheckoutBtn = 'button#checkout';
  }

  /**
   * @description Get the text of any element on the checkout page
   * @param {Object} browser - inserts the Nightwatch Browser Object
   * @param {String} element - locator used to identify the element
   * @param {Number} index - position of element in list
   * @returns element text
   */
  getShoppingCartText(browser, element, index = 0) {
    return getElementText(browser, element, index);
  }

  /**
   * @description Clicks any button on the checkout page
   * @param {Object} browser - inserts the Nightwatch Browser Object
   * @param {String} element - locator used to identify the element
   * @returns 
   */
  clickTheShoppingCartButton(browser, element, index = 0) {
    return clickTheElementButtonByIndex(browser, element, index);
  }
}

module.exports = ShoppingCartPage;
