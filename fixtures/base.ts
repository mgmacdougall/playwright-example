// @ts-check
import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';

export const test = base.extend<{
  loginPage: LoginPage;
  homePage: HomePage;
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
});

export { expect };
