/**
 * @description This is a helper module that contains global variables
 * and aux functions used across this Layout Manager Project.
 */

// import TestDelays from '../helpers/testDelays.js'
// import * as infoObjects from '../helpers/infoObjects.js'
// const { productsObject } = infoObjects

/**
 * ============================================================
 *  ARRAYS, MAPS, CONSTANTS, VARIABLES, OBJECTS...
 * ===========================================================
 */

const loginValidations = {
  wrongUsername: 'WrongUsername',
  wrongPassword: 'WrongPassword',
  invalidCredentials: 'Epic sadface: Username and password do not match any user in this service',
  requiredUsername: 'Epic sadface: Username is required',
  requriedPassword: 'Epic sadface: Password is required'
}

/**
* ============================================================
*  FUNCTIONS
* ===========================================================
*/

/**
 * @description Gets the base URL
 * @param {Object} browser - inserts the Nightwatch Browser Object
 * @returns Launch Url
 */
function getBaseUrl(browser) {
  return browser.launch_url;
}

/**
 * @description Navigate to the test web app
 * @param {Object} browser - inserts the Nightwatch Browser Object
 * @param {String} url - url string
 */
function navigateToApp (browser, url = browser.launch_url) {
  console.log(`>>> Navigating to: ${url}`);
  return browser.navigateTo(url);
}

/**
 * @description Random Number Generator
 * @param {Number} min - the lower end of the range
 * @param {Number} max - the higher end of the range
 * @returns {Number} random number
 */
function randomNumber (min, max) {
  return Math.floor((Math.random() * (max - min) + min));
}

/**
 * @description Scrolls the element into view
 * @param {Object} browser - inserts the Nightwatch Browser Object 
 * @param {String} element - locator used to identify the element
 */
function scrollElementIntoView(browser, element) {
  return browser.execute(function(selector) {
    document.querySelector(selector).scrollIntoView({behavior: 'smooth', block: 'center'});
  }, [element]);
}

/**
 * @description Wait for element to exist and be visible
 * @param {Object} browser - inserts the Nightwatch Browser Object
 * @param {String} element - locator used to identify the element
 * @returns element presence
 */
function waitForElementAppearance(browser, element) {
  return browser
    .waitForElementPresent(element)
    .waitForElementVisible(element);
}

/**
 * @desc This will interact with an element by clicking
 * the associated feature and revealing more elements.
 * Repeats in various other components.
 * @param {Object} browser - inserts the Nightwatch Browser Object 
 * @param {String} element - locator used to identify the element
 */
function clickTheElementButton (browser, element) {
  waitForElementAppearance(browser, element)
  return browser
    .element.find(element)
    .click();
}

/**
 * @desc This will interact with an element by clicking
 * the associated feature and revealing more elements.
 * Repeats in various other components.
 * @param {Object} browser - inserts the Nightwatch Browser Object
 * @param {String} element - locator used to identify the element
 * @param {Number} index - position of element in list
 * @returns click on element 
 */
function clickTheElementButtonByIndex (browser, element, index = 0) {
  waitForElementAppearance(browser, element)
  return browser
    .element.findAll(element)
    .nth(index)
    .click();
}

/**
 * @description Grabs an elements text
 * @param {Object} browser - inserts the Nightwatch Browser Object
 * @param {String} element - locator used to identify the element
 * @param {Number} index - position of element in a list
 * @returns - element text
 */
function getElementText(browser, element, index = 0) {
  return browser
    .waitForElementPresent(element)
    .waitForElementVisible(element)
    .element.findAll(element)
    .nth(index)
    .getText();
}

/**
 * @description Grab all available handles to use for switching between 
 * @param {Object} browser - inserts the Nightwatch Browser Object
 * @returns all session tab handles
 */
function getAllTabHandles(browser) {
  return new Promise((resolve) => {
    browser.window.getAllHandles((result) => {
      resolve(result.value);
    });
  });
}

/**
 * @description Switches between all tabs in current browser session
 * @param {Object} browser - inserts the Nightwatch Browser Object
 * @param {String} handle - tab handle to switch to 
 * @returns 
 */
function switchTabs(browser, handle) {
  return browser.window.switchTo(handle);
}

/**
 * @description Closes the currently focused tab
 * @param {Object} browser - inserts the Nightwatch Browser Object
 * @returns closed tab
 */
function closeCurrentTab(browser) {
  return browser.window.close();
}

/**
 * @description Obtains an array of WebElements and selects one
 * @param {Object} browser - inserts the Nightwatch Browser Object
 * @param {String} element - locator used to identify the element
 * @param {Number} index - position of element in list
 * @returns a single webElement
 */
function getElementFromList(browser, element = '', index = 0) {
  return browser.element.findAll(element)
    .nth(index);
}

/**
 * @description get the length of a list of elements
 * @param {Object} browser - inserts the Nightwatch Browser Object
 * @param {String} element - locator used to identify the element
 * @returns element list size
 */
async function getLength(browser, element) {
  const elements = await browser.element.findAll(element);
  return elements.length;
}

/**
 * @description get the value of an attribute for an element
 * @param {Object} browser - inserts the Nightwatch Browser Object
 * @param {String} element - locator used to identify the element
 * @param {String} attribute - element attribute
 * @returns element attribute value
 */
function getAttributeValue(browser, element, attribute) {
  return browser.getAttribute(element, attribute);
}

/**
 * @description function to type text into an input field
 * @param {Object} browser - inserts the Nightwatch Browser Object
 * @param {String} element - locator used to identify the element
 * @param {String} text - text to type into a field
 * @returns 
 */
function typeText(browser, element, text) {
  waitForElementAppearance(browser, element);
  return browser.element.find(element).sendKeys(text);
}

// To make any method or variable private, just remove it from the list of exported items
module.exports = {
  loginValidations,
  getBaseUrl,
  navigateToApp,
  randomNumber,
  scrollElementIntoView,
  clickTheElementButton,
  clickTheElementButtonByIndex,
  getElementText,
  waitForElementAppearance,
  getAllTabHandles,
  switchTabs,
  closeCurrentTab,
  getElementFromList,
  getLength,
  getAttributeValue,
  typeText
}
