# 🎭 Playwright Framework Display

A modular, scalable end-to-end testing framework built on [Microsoft Playwright](https://playwright.dev/). Designed for fast, reliable browser automation across Chromium, Firefox, and WebKit.

## 🚀 Features

- ✅ Cross-browser testing (Chromium, Firefox, WebKit) (Current configured for Chrome only)
- 🧪 Parallel test execution (disabled)
- 📸 Auto screenshots on failure (enabled)
- 📊 HTML and JSON reporting (enabled - results will show after each run)
- 🔐 Built-in authentication flows (not completed)
- 🧱 Modular test structure for maintainability

## 📦 Installation

```bash
npm install
npx playwright install
```

Project Structure

````
.
├── configs                     # ENV specific config files
│   ├── prod.json
│   └── ste.json
│   └── etc
├── fixtures/                       # Fixtures - to hold custom functions
│   ├── base.ts                     # base (page) - where all page objects are mapped to, allows use in test cases
├── pages/                          # POMs for each of the product pages
│   ├── HomePage.locators.ts        # Locators file for the HomePage.ts
│   ├── HomePage.ts                 # POM for HomePage.ts
│   ├── LogInPage.locators.ts       # Locators file for the HomePage.ts
│   ├── LogInPage.ts                # POM for HomePage.ts
├── playwright-report/              # Report directory for test results
│   └── index.html                  # html report viewed by ```npx playwright show-report``` command
├── reports/                        # eslint and various code quality reports
├── test-result/                    # test results json file
│   └── .last-run.json
├── test/                           # test case files
│   └── login.spec.ts               # example test case
├── utils/                          # Directory for common framework utils
│   └── setProxy.bat                # example utility file
├── package.json                    # Dependency file
├── playwright.config.ts            # Global config for playwright
├── ts.config.ts                    # ts config file
└── README.md
````

Directory details:

- fixtures - where the POMs are tied together, to enable them to be used
  in all test cases - configs - hold configuration for various test environments - the current example shows how to use for prod. - contains base url, and other settings (time outs etc.) -
  Current Configurations:

```
use: {
  headless: true,
  screenshot: 'only-on-failure',
  baseURL: 'https://your-app.com',
  trace: 'retain-on-failure',
}
```

To Run all tests:

```
# Run all tests
npx playwright test             // runs test in headless mode.
npx playwright test --debug     // runs debug mode
npx playwright test --headed    // runs test case in headed mode
npx playwright show-report      // shows html report for last run, configured to show by default
npx playwright test --ui        //shows UI for debugging

# Run specific file
npx playwright test tests/login.spec.ts

# Run with UI
npx playwright test --ui
```
