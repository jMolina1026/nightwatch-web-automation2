const utility = require('../../helpers/utilities.js');
const commonSelectors = require('../../helpers/commonSelectors.js');

const { commonHeaderElements } = commonSelectors;
const { getElementText, getElementFromList, clickTheElementButtonByIndex } = utility;

class ProductsPage {
  constructor() {
    /**
     * CSS selectors
     */
    this.productName = 'div.inventory_item_name';
    this.productDesc = 'div.inventory_item_desc';
    this.productPrice = 'div.inventory_item_price';
    this.productAddToCart = 'button.btn_primary';
    this.productRemoveFromCart = 'button.btn_secondary';
    this.productImage = 'img.inventory_item_img';
    this.productShoppingCartBadge = commonHeaderElements.shoppingCartBadge;

    this.productFilters = commonHeaderElements.sortContainer + ' > option';
    this.productFilterActive = 'span.active_option';
  }

  /**
   * @description Retrieves a list of webElements from an object
   * When using NWJS, in order to gain access to an object who's properties are NWJS API actions
   * we need to use a getter function to retrieve desired list.
   * Must be accompanied by async/await
   * @param {*} browser 
   * @returns webElements
   */
  async getProducts(browser) {
    return this.products = {
      productNames: await browser.element.findAll(this.productName),
      productDescs: await browser.element.findAll(this.productDesc),
      productPrices: await browser.element.findAll(this.productPrice),
      productATCBtns: await browser.element.findAll(this.productAddToCart),
      productImages: await browser.element.findAll(this.productImage)
    };
  }

  /**
   * @description Clicks any button on the product page
   * @param {Object} browser - inserts the Nightwatch Browser Object
   * @param {String} element - locator used to identify the element
   * @param {Number} index - position of element in list
   * @returns 
   */
  clickTheProductButton(browser, element, index = 0) {
    return clickTheElementButtonByIndex(browser, element, index);
  }

  /**
   * @description Get the text of any element on the products page
   * @param {Object} browser - inserts the Nightwatch Browser Object
   * @param {String} element - locator used to identify the element
   * @param {Number} index - position of element in list
   * @returns element text
   */
  getProductText(browser, element, index = 0) {
    return getElementText(browser, element, index);
  }

  /**
   * @description Obtains a webElement from a list of webElements 
   * for the Name of the products
   * @param {Object} browser - inserts the Nightwatch Browser Object
   * @param {String} element - locator used to identify the element
   * @param {Number} index - position of element in list
   * @returns a single webElement from product names
   */
  getName(browser, element = '', index = 0) {
    return getElementFromList(browser, element, index);
  }

  /**
   * @description Obtains a webElement from a list of webElements 
   * for the Price of the products
   * @param {Object} browser - inserts the Nightwatch Browser Object
   * @param {String} element - locator used to identify the element
   * @param {Number} index - position of element in list
   * @returns a single webElement from product prices
   */
  getPrice(browser, element = '', index = 0) {
    return getElementFromList(browser, element, index);
  }
}

module.exports = ProductsPage;
