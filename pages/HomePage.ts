// @ts-check
import { Locator, Page } from '@playwright/test';
import config from '../configs/prod.json';
import { homePageLocators } from './HomePage.locators';

export class HomePage {
  readonly gettingStarted: Locator;
  readonly apiPageTitle: Locator;
  readonly apiLink: Locator;
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    this.gettingStarted = page.locator(homePageLocators.gettingStarted.value);
    this.apiPageTitle = page.locator(homePageLocators.apiPageTitle.value);
    this.apiLink = page.locator(homePageLocators.apiLnk.value);
  }

  async navigate() {
    await this.page.goto(config.baseURL);
  }

  async getErrorMessage() {
    return this.page.textContent('.error-message');
  }

  async clickGetStarted() {
    await this.gettingStarted.click();
  }

  async clickLink(linkText: string) {
    await this.apiLink.click();
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('load');
  }

  async validatePageTItle(expectedTitle: string) {
    const actualTitle = await this.apiPageTitle.textContent();
    console.log(`Actual Title: "${actualTitle}"`);
    if (actualTitle?.trim() !== expectedTitle) {
      throw new Error(
        `Page title does not match. Expected: "${expectedTitle}", Actual: "${actualTitle?.trim()}"`
      );
    } else {
      console.log(`Page title matches: "${expectedTitle}"`);
    }
  }
}
