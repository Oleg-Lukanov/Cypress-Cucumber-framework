# Cypress-Cucumber-framework
`README.md` file for the Cypress Testing Project with Cucumber integration:

```markdown
# Cypress Testing Project

## Summary of Repo

This repository contains Cypress end-to-end tests for the [Conduit](https://conduit.realworld.how) application. The tests cover user registration, login, article creation, and various screen resolutions to ensure responsive design. The project is set up to run tests automatically in a CI/CD pipeline using GitHub Actions and to generate reports using the Cypress Dashboard.

## Requirements

- Node.js (version 14 or higher)
- npm (version 6 or higher)
- GitHub account with a repository to run CI/CD pipeline
- Cypress account for the Dashboard (to obtain the Cypress record key)

## Steps to Install

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. **Install Dependencies**

   Ensure you have Node.js and npm installed. Then, install the project dependencies:

   ```bash
   npm install
   ```

## Steps to Launch

### Running Cypress Tests Locally

1. **Open Cypress Test Runner**

   ```bash
   npm run cypress:open
   ```

   This command will open the Cypress Test Runner, allowing you to run tests interactively.

2. **Run Cypress Tests with Different Configurations**

   You can run tests for different screen resolutions using the following commands:

   - **Desktop Tests**

     ```bash
     npm run cypress:run:desktop
     ```

   - **Tablet Tests**

     ```bash
     npm run cypress:run:tablet
     ```

   - **Mobile Tests**

     ```bash
     npm run cypress:run:mobile
     ```

### Running Cypress Tests in CI/CD Pipeline

1. **GitHub Actions Workflow**

   The repository is configured to run Cypress tests in a GitHub Actions pipeline. The workflow file (`.github/workflows/cypress.yml`) includes steps to run tests for different screen resolutions.

2. **Add Cypress Record Key**

   To record test results on the Cypress Dashboard, add your Cypress record key to your GitHub repository secrets:

   - Go to your GitHub repository.
   - Click on `Settings`.
   - Click on `Secrets and variables` > `Actions`.
   - Click `New repository secret`.
   - Add `CYPRESS_RECORD_KEY` as the name and your Cypress record key as the value.

## Steps to Creating the Report

1. **Generate Cypress Dashboard Report**

   The Cypress Dashboard allows you to record and view test results. Ensure your tests are set to record by including the `--record` flag and your Cypress record key:

   ```bash
   npm run cypress:run:desktop -- --record --key $CYPRESS_RECORD_KEY
   npm run cypress:run:tablet -- --record --key $CYPRESS_RECORD_KEY
   npm run cypress:run:mobile -- --record --key $CYPRESS_RECORD_KEY
   ```

2. **View the Report on Cypress Dashboard**

   After the tests run, you can view the detailed report on the Cypress Dashboard:

   - Go to the [Cypress Dashboard](https://dashboard.cypress.io/).
   - Log in with your Cypress account.
   - Navigate to your project to see the test run results, including video recordings, screenshots, and logs.

## GitHub Actions Workflow File

Here's the GitHub Actions workflow file to run Cypress tests with different configurations:

```yaml
name: Cypress Tests

on: [push, pull_request]

jobs:
  cypress-tests:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        config: [desktop, tablet, mobile]

    steps:
    - name: Checkout repository
      uses: actions/checkout@v2

    - name: Set up Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '14'

    - name: Install dependencies
      run: npm install

    - name: Run Cypress Tests
      env:
        CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}
      run: npm run cypress:run:${{ matrix.config }} -- --record --key $CYPRESS_RECORD_KEY
```

## Cypress Configuration Files

Ensure you have the following configuration files in the `cypress/config` directory:

### cypress/config/desktop.js

```javascript
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://conduit.realworld.how',
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
});
```

### cypress/config/tablet.js

```javascript
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://conduit.realworld.how',
    viewportWidth: 768,
    viewportHeight: 1024,
  },
});
```

### cypress/config/mobile.js

```javascript
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://conduit.realworld.how',
    viewportWidth: 375,
    viewportHeight: 667,
  },
});
```

## Example Cypress Configuration with Cucumber

Create a `cypress.config.js` file with the following content:

```javascript
const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild").default;

module.exports = defineConfig({
  e2e: {
    specPattern: "**/*.feature",
    baseUrl: 'https://conduit.realworld.how',
    projectId: "jpspij",
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );
      return config;
    },
  },
});
```

## Example package.json

Ensure your `package.json` has the correct scripts and dependencies:

```json
{
  "name": "cypress-cucumber-project",
  "version": "1.0.0",
  "description": "Cypress and Cucumber project setup",
  "main": "index.js",
  "scripts": {
    "cypress:open": "cypress open",
    "cypress:run": "cypress run", 
    "cypress:run:desktop": "cypress run --config-file cypress/config/desktop.js",
    "cypress:run:tablet": "cypress run --config-file cypress/config/tablet.js",
    "cypress:run:mobile": "cypress run --config-file cypress/config/mobile.js"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@badeball/cypress-cucumber-preprocessor": "^12.0.0",
    "@bahmutov/cypress-esbuild-preprocessor": "^2.2.2",
    "@faker-js/faker": "^7.6.0",
    "cypress": "^13.13.1",
    "esbuild": "^0.17.19",
    "ts-loader": "^9.5.1"
  }
}
```

By following these steps, you will have a comprehensive setup for running Cypress tests locally and in a CI/CD pipeline, along with generating detailed reports on the Cypress Dashboard. Adjust the repository URL, GitHub username, and other placeholders as needed to match your actual project details.
```

This `README.md` provides a clear and detailed guide on how to set up, run, and generate reports for your Cypress testing project with Cucumber integration. Adjust the repository URL, GitHub username, and other placeholders as needed to match your actual project details.