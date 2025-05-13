const utility = require('../../helpers/utilities.js');
const constants = require('../../helpers/data/products.constants.js');

const { names, descriptions, prices } = constants;
const { clickTheElementButtonByIndex, getElementText, getAttributeValue, typeText } = utility;

class CheckoutOverviewPage {
  constructor() {
    /**
     * CSS selectors
     */
    this.quantityLabel = 'div.cart_quantity_label';
    this.descLabel = 'div.cart_desc_label';
    this.itemName = 'div.inventory_item_name'; // <<< List
    this.itemDesc = 'div.inventory_item_desc'; // <<< List
    this.itemPrice = 'div.inventory_item_price'; // <<< List
    this.itemQuantity = 'div.cart_quantity'; // <<< List
    this.paymentInfoLabel = 'div[data-test="payment-info-label"]';
    this.paymentInfo = 'div[data-test="payment-info-value"]';
    this.shippingInfoLabel = 'div[data-test="shipping-info-label"]';
    this.shippingInfo = 'div[data-test="shipping-info-value"]';
    this.totalInfoLabel = 'div[data-test="total-info-label"]';
    this.subtotalInfo = 'div[data-test="subtotal-label"]';
    this.taxInfo = 'div[data-test="tax-label"]';
    this.totalInfo = 'div[data-test="total-label"]';
    this.cancelBtn = 'button#cancel';
    this.finishBtn = 'button#finish';
  }

  /**
   * @description Element selectors can return more than one element.
   * If an element selector does return more than one element, then this function will
   * use a switch case to determine which object to use.
   * Each case uses a different element selector to determine that object.  
   * Each object has the text of each part of a product.
   * If there is more than one product being bought, then there will be more items 
   * text like Name, Description, Prices.  
   * @param {String} element - locator used to identify the element
   * @returns Object
   */
  getItemTexts(element) {
    let objectText;
    switch(element) {
      case this.itemName: objectText = names;         break;
		  case this.itemDesc: objectText = descriptions;  break;
		  case this.itemPrice: objectText = prices;       break;
      case this.itemQuantity: objectText = { 
        itemQty1: '1', 
        itemQty2: '1', 
        itemQty3: '1'
      }         
      break;
      default: throw new Error('Wrong Element entered, check again');
    }
    return objectText;
  }

  /**
   * @description Get the text of any element on the checkout info page
   * @param {Object} browser - inserts the Nightwatch Browser Object
   * @param {String} element - locator used to identify the element
   * @param {Number} index - position of element in list
   * @returns element text
   */
  getOverviewText(browser, element, index = 0) {
    return getElementText(browser, element, index);
  }

  /**
   * @description Clicks any button on the overview page
   * @param {Object} browser - inserts the Nightwatch Browser Object
   * @param {String} element - locator used to identify the element
   * @returns 
   */
  clickTheFinishButton(browser, element, index = 0) {
    return clickTheElementButtonByIndex(browser, element, index);
  }


}

module.exports = CheckoutOverviewPage;
