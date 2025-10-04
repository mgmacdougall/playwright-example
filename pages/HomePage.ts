// @ts-check
import { Page, Locator } from '@playwright/test';
import config from "../configs/prod.json";
import { homePageLocators } from './HomePage.locators';

export class HomePage {
    readonly gettingStarted: Locator;

    constructor(private page: Page) {
        this.page = page;
        this.gettingStarted = page.locator(homePageLocators.gettingStarted.value);
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
}