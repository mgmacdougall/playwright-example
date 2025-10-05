// @ts-check

/**
 * Base test with page objects,
 * where we can initialize all the page objects
 *
 */
import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';

export const test = base.extend<{
  homePage: HomePage;
  loginPage: LoginPage;
}>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

export { expect };
