import { test as setup, type Page } from '@playwright/test';
import LoginPage from '../ui/pages/login-page';
import uiPages from '../utils/uiPages';

const userFile = '.auth/user.json';

setup('authenticate as user', async ({ page }) => {
    const user = process.env.USERNAME_USER!;
    const password = process.env.PASSWORD!;
    const loginPage = new LoginPage(page);
    const baseURL = setup.info().project.use.baseURL!;
  
  await page.goto(baseURL!+uiPages.login);
  await page.waitForURL(baseURL+uiPages.login);
  await loginPage.doLogin(user, password);
  await loginPage.checkLoggedIn();
    
    await page.context().storageState({ path: userFile });
});
