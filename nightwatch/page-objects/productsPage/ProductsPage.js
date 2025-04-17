const utility = require('../../helpers/utilities.js');

const { clickTheElementButton } = utility;

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
  }

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
   * @returns 
   */
  clickTheProductButton(browser, element) {
    return clickTheElementButton(browser, element);
  }

}

module.exports = ProductsPage;
