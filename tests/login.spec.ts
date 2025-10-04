// @ts-check
import { test } from '../fixtures/base';

test.describe('Main page tests', () => {
    test('Launch main page', async ({ homePage }) => {
        await homePage.navigate(); // Navigate to the login page
        await homePage.clickGetStarted();
        // await loginPage.login('invalidUser', 'invalidPass'); // Attempt to login with invalid credentials   
    })

})