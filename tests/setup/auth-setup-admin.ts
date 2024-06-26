import { test as setup, type Page } from '@playwright/test';
import uiPages from '../utils/uiPages';

const adminFile = '.auth/admin.json';

setup('authenticate as admin', async ({ page }) => {
  const user = process.env.USERNAME_ADMIN!;
  const password = process.env.PASSWORD!;
  const loginPage = new LoginPage(page);
  const baseURL = setup.info().project.use.baseURL!;
  
  await page.goto(baseURL!+uiPages.login);
  await page.waitForURL(baseURL+uiPages.login);
  await loginPage.doLogin(user, password);
  await loginPage.checkLoggedIn();

  await page.context().storageState({ path: adminFile });
});