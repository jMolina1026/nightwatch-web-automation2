# nightwatch-web-automation2

## Install NightwatchJS

- Pre-requisites:
  - Locally --> Chrome, Edge, Firefox, NodeJS, IDE, (Built on a Mac)
  - Bash/zsh file: set exports for username and password
     - export USERNME={_username_}
     - export PASSWORD={_password_}
     - These can also be set by entering as enviroment variables temporarily in you terminal
       - this.username = process.env.USERNME; --> USERNAME={_username_}
       - this.password = process.env.PASSWORD; --> PASSWORD={_password_}
  - Website: [saucedemo](https://www.saucedemo.com/)
- Clone this repo: [nightwatch-web-automation](https://github.com/jMolina1026/nightwatch-web-automation2.git)
- Run `npm install` in terminal

## Run Commands

-  Test the install and Run Single Test Suite:
   ```
    HEADLESS=false npx nightwatch tests/**/**/*.js --env chrome --tag loginSanity --output report
   ```
-  Run All Sanity Tests:
   ```
   HEADLESS=false npx nightwatch tests/**/**/*.js --env chrome --tag Sanity --output report
   ```
-  Run All Regression Tests:
   ```
   HEADLESS=false npx nightwatch tests/**/**/*.js --env chrome --tag Regression --output report
   ```

## Report

- Open report in cli:
  ```
  open report/nightwatch-html-report/index.html
  ```
