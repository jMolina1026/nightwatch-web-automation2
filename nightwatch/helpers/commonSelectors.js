/**
 * Additional Locators used across the site
 */
const commonHeaderElements = {
  burgerMenuButton: 'div.bm-burger-button',
  shoppingCartButton: 'a.shopping_cart_link',
  secondaryTitle: 'span.title',
  sortContainer: 'select.product_sort_container'
}

const commonLoginPageElements = {
  loginLogo: 'div.login_logo'
}

const commonProductsElements = {
  shoppingCartBadge: 'span.shopping_cart_badge',
  productAddToCartButtons: 'button.btn_primary'
}

module.exports = {
  commonHeaderElements,
  commonLoginPageElements,
  commonProductsElements
}
