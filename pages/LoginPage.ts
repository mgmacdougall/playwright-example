// @ts-check
import { Page, Locator } from '@playwright/test';
import config from "../configs/prod.json";
import { LoginPageLocators } from './LoginPage.locators';
export class LoginPage {


    constructor(private page: Page) { }



    async login(username: string, password: string) {
        await this.page.fill('#username', username);
        await this.page.fill('#password', password);
        await this.page.click('button[type="submit"]');
    }

    async getErrorMessage() {
        return this.page.textContent('.error-message');
    }
}