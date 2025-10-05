// @ts-check
import { test } from '../fixtures/base';

test('E2E Soke Test', async ({ homePage, loginPage }) => {
  await homePage.navigate();
  await homePage.validatePageTItle(
    'Playwright enables reliable end-to-end testing for modern web apps.'
  );
  // await homePage.clickLink('API');
  // await homePage.waitForPageLoad();
  // await homePage.validatePageTItle('Playwright API');
  // await loginPage.getErrorMessage();
});
