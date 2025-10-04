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

## Project Structure

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

## Directory details:

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

## To Run all tests:
### CLI running playwright directly:

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

### Running various tasks and executions
Running npm scripts via the command line:
```
    npm run test - use to run all tests
    test:smoke - used to run the smoke test headless
    test:smoke:debug - used to debug smoke test
    test:smoke:headed - run smoke test with browser(s)
    test:smoke:report - display the last run report
    test:smoke:report:open - open the last run report for local run
    test:smoke:report:ci - open the ci last run report
    lint - check for linting/syntax errors
    lint:fix - fix linting and formatting errors
    lint:report - display the json report for linting/formatting errors
    format - format the project
    format:check - run a format check on the project
    format:list - list the formatting problems found
```

### Other commands:
Various other commands:
```
    prepare - prepares the Husky commit directory and files
    check-types - runs tsc without generating output, needed for various build steps
    test-all - this is a script used in the pre-commit hook to run linter, prettier checks

```

# Husky
## Husky Config and details
Husky is a build utility that is used in conjuntcion with Prettier/TSC/ESLint 
to validate formatting, and styling of files being checked in.
In the current implementation, there is only the pre-commit hook that is set up.
The pre-commit hook will check for linting and code errors and will block the submitter
from completing the ```git commit``` command.
The rationale for this is to avoid any code inconsitencies between team members.
In the '.husky' directory the pre-commit file contains the following:
```
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run check-types ||(
    echo "TypeScript type check failed. Commit aborted."
    exit 1
)
npm run lint || (
    echo "ESLint check failed. Commit aborted."
    exit 1
) 
npm run format:check || (
    echo "Prettier check failed. Commit aborted."
    exit 1
)

echo "All checks passed. Proceeding with commit."
```
### Breakdown of Commands
The pre-commit hook will do the follwing checks in order, and if any fail
the commit will be blocked the code is corrected.
The pre-commit checks are completed in the following order:

1. npm run check-types - will run a compile check on ts to verify it is valid
2. npm run lint - runs eslint on the code being checked in
3. npm run format:check - runs a format check before checked

If all three pre-commit tests pass, then the commit can proceed, otherwise the commit
will inform the developer of the problems.  No codde is changed in the commit so the 
developer can make changes.